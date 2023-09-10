export enum EAssetsType {
  CATHEGORY = "cathegory",
  ASSETS = "assets",
}

export interface IAssetsItems {
  type: EAssetsType;
  name: string;
  valueInPortfolio: number;
  factualShare: number;
  targetShare: number;
  paymentPerMonth?: number;
  children?: IAssetsItems[];
}

export interface IPortfolioStore {
  assetsTree: IAssetsItems[];
  addCathegory: () => void;
  addAsset: () => void;
}
