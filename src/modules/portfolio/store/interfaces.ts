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

export interface IAssetsItemValues
  extends Omit<Required<IAssetsItem>, "parent" | "type"> {}

export interface IAssetsItems {
  items: IAssetsItem[];
}

export interface IPortfolioStore {
  assetsTree: IAssetsItem[];
  isLoading: boolean;
  isAssetsTreeUpdated: boolean;
  addCategory: () => void;
  addAsset: () => void;
  loadAssetsTree: () => Promise<void>;
  updateAsset: (assetItem: IAssetsItemValues) => void;
}
