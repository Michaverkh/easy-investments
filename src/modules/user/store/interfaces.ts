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
}
