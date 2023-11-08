export interface IUserAuth {
  token: string;
}

export interface IUserStore {
  isLoading: boolean;
  login: () => Promise<void>;
  registration: () => Promise<void>;
}
