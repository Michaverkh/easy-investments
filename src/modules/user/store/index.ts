import { action, computed, makeObservable, observable } from "mobx";
import { IUser, IUserStore } from "./interfaces";
import { apiModule } from "../../..";
import { EEndpoints } from "../../../shared/api/enums";
import { IUserAuthResponseDTO, IUserRequestDTO } from "./dto";
import { userAuthResponseSchema } from "./validators";
import { userAuthMapper } from "./mappers";
import { EErrorMessages } from "../../../shared/globalErrorCollector/constants";

export class UserStore implements IUserStore {
  _loading: boolean = false;
  _isAuth: boolean = false;
  _user = {} as IUser;
  _authErrorMessage: string = "";

  get isLoading() {
    return this._loading;
  }

  get isAuth() {
    return this._isAuth;
  }

  get user() {
    return this._user;
  }

  get authErrorMessage() {
    return this._authErrorMessage;
  }

  constructor() {
    makeObservable<
      IUserStore,
      "_loading" | "_isAuth" | "_user" | "_authErrorMessage"
    >(this, {
      _loading: observable,
      _isAuth: observable,
      _user: observable,
      _authErrorMessage: observable,

      isLoading: computed,
      isAuth: computed,
      user: computed,

      login: action.bound,
      registration: action.bound,
    });
  }

  async login(requestParams: IUserRequestDTO): Promise<void> {
    try {
      this._loading = true;

      const result = await apiModule.postData<
        IUserRequestDTO,
        IUserAuthResponseDTO
      >(`${EEndpoints.LOGIN}`, requestParams, {
        responseValidationSchema: userAuthResponseSchema,
      });

      const mappedResult = await userAuthMapper(result);

      if (mappedResult.token) {
        localStorage.setItem("token", mappedResult.token);
        this._isAuth = true;
        this._authErrorMessage = "";
      } else {
        this._isAuth = false;
        this._authErrorMessage = EErrorMessages.INCORRECT_AUTH_DATA;
      }
    } finally {
      this._loading = false;
    }
  }

  async registration(requestParams: IUserRequestDTO): Promise<void> {
    try {
      this._loading = true;

      const result = await apiModule.postData<
        IUserRequestDTO,
        IUserAuthResponseDTO
      >(`${EEndpoints.REGISTRATION}`, requestParams, {
        responseValidationSchema: userAuthResponseSchema,
      });

      const mappedResult = await userAuthMapper(result);

      if (mappedResult.token) {
        localStorage.setItem("token", mappedResult.token);
        this._isAuth = true;
        this._authErrorMessage = "";
      } else {
        this._isAuth = false;
        this._authErrorMessage = EErrorMessages.USER_ALREADY_EXISTS;
      }
    } finally {
      this._loading = false;
    }
  }

  async logout(requestParams: IUserRequestDTO): Promise<void> {
    this._isAuth = false;
    localStorage.removeItem("");
  }
}
