import {
  action,
  computed,
  makeObservable,
  observable,
  runInAction,
} from "mobx";
import { IUser, IUserStore } from "./interfaces";
import { EServerErrors } from "../../../shared/api/enums";
import { IUserRequestDTO } from "./dto";
import { EErrorMessages } from "../../../shared/globalErrorCollector/constants";
import { UserRepository } from "./repository";

export class UserStore implements IUserStore {
  _loading: boolean = false;
  _isAuth: boolean = false;
  _user = {} as IUser;
  _authErrorMessage: string = "";
  _userRepository: UserRepository = {} as UserRepository;

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
    this._userRepository = new UserRepository();
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

      const result = await this._userRepository.login(requestParams);

      if (result.token) {
        localStorage.setItem("token", result.token);
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

      const result = await this._userRepository.registration(requestParams);

      if (result.token) {
        localStorage.setItem("token", result.token);
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
      await this._userRepository.checkAuth(token);

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
