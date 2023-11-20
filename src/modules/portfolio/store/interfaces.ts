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

export interface IPortfolio {
  totalBalance: number;
  items: IAssetsItem[];
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
  totalBalance: number;
  addAsset: (newAssetItem: IAddAssetValues) => Promise<void>;
  loadAssetsTree: () => Promise<void>;
  updateAsset: (newAssetItem: IAssetsItemValues) => Promise<void>;
  removeAsset: (assetName: string) => Promise<void>;
}

export interface IAddAssetValues extends IAssetsItemValues {
  isAsset: boolean;
  parent: string | undefined;
}
