import { Schema } from "yup";
import { IConnection, IFetchDataOptions } from "./interfaces";
import { EHttpMethods } from "./enums";
import { ValidationError } from "../globalErrorCollector/errors/ValidationError";
import { ValidationError as YupValidationError } from "yup";
import { ServerError } from "../globalErrorCollector/errors/ServerError";
class ApiService {
  private connections: IConnection[] = [];

  constructor(private baseUrl: string, private timeout: number = 4000) {}

  /**
   * прерываем выполнение запроса если он уже выполняется
   * @param path
   */
  public cancelRequestsFromPath(path: string): void {
    this.connections
      .filter((conn) => conn.path === path)
      .map((conn): void => {
        return conn.abort();
      });
    this.connections = this.connections.filter((conn) => conn.path !== path);
  }

  /**
   * прерываем запрос по метке (tag)
   * @param tag
   */
  public cancelRequestsFromTag(tag: string): void {
    this.connections
      .filter((conn) => conn.tag === tag)
      .map((conn): void => {
        return conn.abort();
      });
    this.connections = this.connections.filter((conn) => conn.tag !== tag);
  }

  public cancelRequest(path: string, tag?: string) {
    if (tag) {
      this.cancelRequestsFromTag(tag);

      return;
    }

    this.cancelRequestsFromPath(path);
  }

  /**
   * создаем контроллер отмены запроса
   * @param path
   * @param tag
   * @returns
   */
  private createSignal(path: string, tag: string = ""): AbortSignal {
    const controller = new AbortController();
    const signal = controller.signal;
    this.connections.push({
      path,
      tag,
      signal,
      abort: () => controller.abort(),
    });

    return signal;
  }

  /**
   * проверяем запрос
   * @param requestObj
   * @param requestSchema
   */
  private async validateRequest<P>(
    requestObj: P,
    requestSchema: Schema<P>
  ): Promise<void> {
    try {
      await requestSchema.validate(requestObj);
    } catch (e) {
      throw new ValidationError(e as YupValidationError, "url");
    }
  }

  /**
   * проверяем ответ
   * @param data
   * @param responseSchema
   * @returns
   */
  private async castResponse<R>(
    data: any,
    responseSchema: Schema<R>
  ): Promise<void> {
    try {
      (await responseSchema.validate(data)) as R;
    } catch (e) {
      console.log("Validation ERROR: ", e);
      throw new ValidationError(e as YupValidationError, "url_path");
    }
  }

  private getUrlString<P>(
    method: EHttpMethods,
    path: string,
    requestObj: P | null
  ): string {
    const url = new URL(`${this.baseUrl}${path}`);

    if (method === EHttpMethods.GET && requestObj) {
      Object.keys(requestObj).forEach((key) =>
        // @ts-ignore
        url.searchParams.append(key, requestObj[key])
      );
    }

    return url.toString();
  }

  private getJson<P>(
    method: EHttpMethods,
    requestObj: P | null
  ): string | undefined {
    return method === EHttpMethods.GET ? undefined : JSON.stringify(requestObj);
  }

  public async getData<P, R>(
    url: string,
    requestObj: P | null,
    options: IFetchDataOptions<P, R>,
    headers?: HeadersInit
  ): Promise<R> {
    //прерываем предыдущие запросы
    // this.cancelRequest(url, options.tag);

    const result: R = await this.fetchRequest<P, R>(
      EHttpMethods.GET,
      url,
      requestObj,
      options,
      headers
    );

    return result;
  }

  public async postData<P, R>(
    url: string,
    requestObj: P | null,
    options: IFetchDataOptions<P, R>,
    headers?: HeadersInit
  ): Promise<R> {
    this.cancelRequest(url, options.tag);

    const result: R = await this.fetchRequest<P, R>(
      EHttpMethods.POST,
      url,
      requestObj,
      options,
      headers
    );

    return result;
  }

  async fetchRequest<P, R>(
    method: EHttpMethods,
    path: string,
    requestObj: P | null = null,
    options: IFetchDataOptions<P, R>,
    headers?: HeadersInit
  ): Promise<R> {
    // Валидируем requestObj если передали
    if (options.requestValidationSchema && requestObj) {
      await this.validateRequest(requestObj, options.requestValidationSchema);
    }

    const signal = this.createSignal(path, options.tag);
    const url = this.getUrlString<P>(method, path, requestObj);
    const body = this.getJson<P>(method, requestObj);

    // если период ожидания превышает таймаут - прерываем
    const timeoutId = setTimeout(() => {
      this.cancelRequest(url, options.tag);
    }, this.timeout);

    return fetch(url, {
      method,
      body,
      signal,
      headers,
    })
      .then(async (response: Response) => {
        const resData = await response.json();

        if ([200, 201].includes(response.status)) {
          //валидируем полноту ответа
          if (options.responseValidationSchema) {
            this.castResponse(resData, options.responseValidationSchema);
          }

          return resData;
        }
      })
      .catch((e: any) => {
        throw new ServerError(e as YupValidationError);
      })
      .finally(() => {
        clearTimeout(timeoutId);
        this.connections = this.connections.filter(
          (connection) => connection.signal !== signal
        );
      });
  }
}

export default ApiService;
