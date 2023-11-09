import { makeAutoObservable } from "mobx";
import { PortfolioStore } from "../../modules/portfolio/store";
import { IPortfolioStore } from "../../modules/portfolio/store/interfaces";
import { IStore } from "./interfaces";
import { IUserStore } from "../../modules/user/store/interfaces";
import { UserStore } from "../../modules/user/store";

export class Store implements IStore {
  _portfolioStore: IPortfolioStore;
  _userStore: IUserStore;

  get portfolioStore() {
    return this._portfolioStore;
  }

  get userStore() {
    return this._userStore;
  }

  constructor() {
    this._portfolioStore = new PortfolioStore();
    this._userStore = new UserStore();
    makeAutoObservable(this);
  }
}
