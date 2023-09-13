import { action, computed, makeObservable, observable } from "mobx";
import { IAssetsItem, IPortfolioStore } from "./interfaces";

export class PortfolioStore implements IPortfolioStore {
  _assetsTree: IAssetsItem[] = [];

  get assetsTree() {
    return this._assetsTree;
  }

  constructor() {
    makeObservable<IPortfolioStore, "_assetsTree">(this, {
      _assetsTree: observable,

      assetsTree: computed,

      addCathegory: action.bound,
      addAsset: action.bound,
    });
  }

  async loadAssetsTree(): Promise<void> {
    //EEndpoints.GET_ASSETS_INFO
  }

  addCathegory() {}
  addAsset() {}
}
