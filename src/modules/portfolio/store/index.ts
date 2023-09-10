import { action, computed, makeObservable, observable } from "mobx";
import { IAssetsItems, IPortfolioStore } from "./interfaces";

export class PortfolioStore implements IPortfolioStore {
  _assetsTree: IAssetsItems[] = [];

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

  addCathegory() {}
  addAsset() {}
}
