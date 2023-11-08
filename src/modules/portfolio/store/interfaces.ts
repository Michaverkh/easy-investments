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
  rate: number;
  paymentPerMonth?: number;
  parent?: string;
}

export interface IAssetsItemValues
  extends Omit<
    Required<IAssetsItem>,
    "parent" | "type" | "factualShare" | "paymentPerMonth" | "rate"
  > {}

export interface IAssetsItems {
  items: IAssetsItem[];
}

export interface IPortfolioStore {
  assetsTree: IAssetsItem[];
  isLoading: boolean;
  isAssetsTreeUpdated: boolean;
  addCategory: () => void;
  addAsset: (assetItem: IAddAssetValues) => void;
  loadAssetsTree: () => Promise<void>;
  updateAsset: (assetItem: IAssetsItemValues) => void;
  isNameAlreadyExisted: (name: string) => boolean;
}

export interface IAddAssetValues extends IAssetsItemValues {
  isAsset: boolean;
  parent: string | undefined;
}
