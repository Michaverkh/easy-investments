import { action, makeObservable, observable } from "mobx";
import { IPortfolioStore } from "./interfaces";

export class PortfolioStore implements IPortfolioStore {
  _assetsTree = ["1", "2"];

  get assetsTree() {
    return this._assetsTree;
  }

  constructor() {
    makeObservable<IPortfolioStore, "_assetsTree">(this, {
      _assetsTree: observable,

      addCathegory: action.bound,
      addAsset: action.bound,
    });
  }

  addCathegory(item: string) {
    this._assetsTree.push(item);
  }
  addAsset() {}
}
