import { action, computed, makeObservable, observable } from "mobx";
import {
  EAssetsType,
  IAddAssetValues,
  IAssetsItem,
  IAssetsItemValues,
  IPortfolioStore,
} from "./interfaces";
import { apiModule } from "../../..";
import { IAssetsItemsResponseDTO } from "./dto";
import { EEndpoints } from "../../../shared/api/enums";
import { assetsItemsResponseSchema } from "./validators";
import { assetsItemsMapper } from "./mappers";

export class PortfolioStore implements IPortfolioStore {
  _assetsTree: IAssetsItem[] = [];
  _loading: boolean = false;
  _isAssetsTreeUpdated: boolean = false;

  get assetsTree() {
    return this._assetsTree;
  }

  get isLoading() {
    return this._loading;
  }

  get isAssetsTreeUpdated() {
    return this._isAssetsTreeUpdated;
  }

  constructor() {
    makeObservable<
      IPortfolioStore,
      "_assetsTree" | "_loading" | "_isAssetsTreeUpdated"
    >(this, {
      _assetsTree: observable,
      _loading: observable,
      _isAssetsTreeUpdated: observable,

      assetsTree: computed,
      isLoading: computed,
      isAssetsTreeUpdated: computed,

      addCategory: action.bound,
      addAsset: action.bound,
      loadAssetsTree: action.bound,
      updateAsset: action.bound,
      isNameAlreadyExisted: action.bound,
    });
  }

  async loadAssetsTree(): Promise<void> {
    try {
      this._loading = true;
      const result = await apiModule.getData<null, IAssetsItemsResponseDTO>(
        `${EEndpoints.GET_ASSETS_INFO}`,
        null,
        { responseValidationSchema: assetsItemsResponseSchema }
      );

      this._assetsTree = await assetsItemsMapper(result);
    } finally {
      this._loading = false;
    }
  }

  updateAsset(assetItem: IAssetsItemValues): void {
    const { name, targetShare, valueInPortfolio } = assetItem;

    const targetIndex = this._assetsTree.findIndex(
      (asset) => asset.name === name
    );

    if (targetIndex !== -1) {
      const targetElement = this._assetsTree[targetIndex];

      targetElement.valueInPortfolio = valueInPortfolio;
      targetElement.targetShare = targetShare;

      this._isAssetsTreeUpdated = !this._isAssetsTreeUpdated;
    } else {
      throw new Error("element is not found");
    }
  }

  isNameAlreadyExisted(name: string): boolean {
    const targetIndex = this._assetsTree.findIndex(
      (asset) => asset.name.toUpperCase() === name.toUpperCase()
    );

    return targetIndex >= 0;
  }

  addAsset(newAssetItem: IAddAssetValues): void {
    const asset: IAssetsItem = {
      ...newAssetItem,
      type: newAssetItem.isAsset ? EAssetsType.ASSETS : EAssetsType.CATHEGORY,
      factualShare: 0,
      rate: 0,
    };

    this._assetsTree.push(asset);
  }

  addCategory() {}
}
