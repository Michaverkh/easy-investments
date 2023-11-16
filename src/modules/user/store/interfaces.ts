import { IUserRequestDTO } from "./dto";

export interface IUser {
  id: string;
  email: string;
}

export interface IUserAuth {
  token: string;
  user: IUser;
}

export interface IUserStore {
  isLoading: boolean;
  isAuth: boolean;
  user: IUser;
  authErrorMessage: string;
  login: (requestParams: IUserRequestDTO) => Promise<void>;
  registration: (requestParams: IUserRequestDTO) => Promise<void>;
  logout: () => Promise<void>;
  setAuth: (isAuth: boolean) => void;
  checkAuth: (token: string) => void;
}

export interface IUserAuthInitialValues extends IUserRequestDTO {
  repeatPassword?: string;
}
