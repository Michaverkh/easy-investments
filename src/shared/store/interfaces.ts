import { IPortfolioStore } from "../../modules/portfolio/store/interfaces";
import { IUserStore } from "../../modules/user/store/interfaces";

export interface IStore {
  portfolioStore: IPortfolioStore;
  userStore: IUserStore;
}
