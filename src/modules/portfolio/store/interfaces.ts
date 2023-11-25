import { IOption } from "../../../shared/interfaces";
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
  portfolioErrorMessage: string;
  addAsset: (newAssetItem: IAddAssetValues) => Promise<void>;
  loadAssetsTree: () => Promise<void>;
  updateAsset: (newAssetItem: IAssetsItemValues) => Promise<void>;
  removeAsset: (assetName: string) => Promise<void>;
  getAssetsForTopUp(): IAssetForTopUp;
  topUpPortfolio: (assetsValuesDelta: Record<string, number>) => Promise<void>;
}

export interface IAddAssetValues extends IAssetsItemValues {
  isAsset: boolean;
  parent: string | undefined;
}

export interface IAssetForTopUp {
  initialValues: Record<string, number>;
  assetItems: IOption[];
}
