// export interface IAssetsTree {}
export type IAssetsTree = string[];

export interface IPortfolioStore {
  assetsTree: IAssetsTree;
  addCathegory: (item: string) => void;
  addAsset: () => void;
}
