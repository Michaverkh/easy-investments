import { apiModule } from "../../../..";
import { EEndpoints } from "../../../../shared/api/enums";
import { IUserRequestDTO, IUserAuthResponseDTO } from "../dto";
import { IUserAuth } from "../interfaces";
import { userAuthMapper } from "../mappers";
import { userAuthResponseSchema } from "../validators";

export class UserRepository {
  public async login(requestParams: IUserRequestDTO): Promise<IUserAuth> {
    const result = await apiModule.postData<
      IUserRequestDTO,
      IUserAuthResponseDTO
    >(`${EEndpoints.LOGIN}`, requestParams, {
      responseValidationSchema: userAuthResponseSchema,
    });

    return await userAuthMapper(result);
  }

  public async registration(
    requestParams: IUserRequestDTO
  ): Promise<IUserAuth> {
    const result = await apiModule.postData<
      IUserRequestDTO,
      IUserAuthResponseDTO
    >(`${EEndpoints.REGISTRATION}`, requestParams, {
      responseValidationSchema: userAuthResponseSchema,
    });

    return await userAuthMapper(result);
  }

  public async checkAuth(token: string): Promise<void> {
    await apiModule.getData(`${EEndpoints.CHECK_AUTH}`, null, {});
  }
}
