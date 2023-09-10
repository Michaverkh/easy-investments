import { makeAutoObservable } from "mobx";
import { PortfolioStore } from "../../modules/portfolio/store";
import { IPortfolioStore } from "../../modules/portfolio/store/interfaces";
import { IStore } from "./interfaces";

export class Store implements IStore {
  _portfolioStore: IPortfolioStore;

  get portfolioStore() {
    return this._portfolioStore;
  }

  constructor() {
    this._portfolioStore = new PortfolioStore();
    makeAutoObservable(this);
  }
}
