export enum EAssetsType {
  CATHEGORY = "cathegory",
  ASSETS = "assets",
}

export interface IAssetsItem {
  type: EAssetsType;
  name: string;
  valueInPortfolio: number;
  factualShare: number;
  targetShare: number;
  paymentPerMonth?: number;
  parent?: string;
}

export interface IAssetsItems {
  items: IAssetsItem[];
}

export interface IPortfolioStore {
  assetsTree: IAssetsItem[];
  isLoading: boolean;
  addCathegory: () => void;
  addAsset: () => void;
  loadAssetsTree: () => Promise<void>;
}
