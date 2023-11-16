import {
  action,
  computed,
  makeObservable,
  observable,
  runInAction,
} from "mobx";
import { IUser, IUserStore } from "./interfaces";
import { apiModule } from "../../..";
import { EEndpoints, EServerErrors } from "../../../shared/api/enums";
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
      logout: action.bound,
      setAuth: action.bound,
      checkAuth: action.bound,
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
        runInAction(() => (this._isAuth = true));
        runInAction(() => (this._authErrorMessage = ""));
      }
    } catch (err: any) {
      switch (err.message) {
        case EServerErrors.INCORRECT_PASSWORD:
          runInAction(
            () => (this._authErrorMessage = EErrorMessages.INCORRECT_PASSWORD)
          );
          return;
        case EServerErrors.INCORRECT_EMAIL:
          runInAction(
            () => (this._authErrorMessage = EErrorMessages.INCORRECT_EMAIL)
          );
          return;
        default:
          console.log("AuthError", err.message);
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
        runInAction(() => (this._isAuth = true));
        runInAction(() => (this._authErrorMessage = ""));
      }
    } catch (err: any) {
      switch (err.message) {
        case EServerErrors.USER_ALREADY_EXISTS:
          runInAction(
            () => (this._authErrorMessage = EErrorMessages.USER_ALREADY_EXISTS)
          );
          return;
        default:
          console.log("AuthError", err.message);
      }
    } finally {
      this._loading = false;
    }
  }

  async logout(): Promise<void> {
    this._isAuth = false;
    localStorage.removeItem("token");
    this._user = {} as IUser;
  }

  async checkAuth(token: string) {
    this._loading = true;

    try {
      await apiModule.getData(
        `${EEndpoints.CHECK_AUTH}`,
        null,
        {},
        { Authorization: `Bearer ${token}` }
      );

      runInAction(() => (this._isAuth = true));
    } catch (err: any) {
      console.log(err);
    } finally {
      this._loading = false;
    }
  }

  setAuth(isAuth: boolean): void {
    this._isAuth = isAuth;
  }
}
