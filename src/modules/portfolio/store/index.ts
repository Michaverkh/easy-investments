import { action, computed, makeObservable, observable } from "mobx";
import { IAssetsItem, IAssetsItemValues, IPortfolioStore } from "./interfaces";
import { apiModule } from "../../..";
import { IAssetsItemsResponseDTO } from "./dto";
import { EEndpoints } from "../../../shared/api/enums";
import { assetsItemsResponseSchema } from "./validators";
import { assetsItemsMapper } from "./mappers";

export class PortfolioStore implements IPortfolioStore {
  _assetsTree: IAssetsItem[] = [];
  _loading: boolean = false;

  get assetsTree() {
    return this._assetsTree;
  }

  get isLoading() {
    return this._loading;
  }

  constructor() {
    makeObservable<IPortfolioStore, "_assetsTree" | "_loading">(this, {
      _assetsTree: observable,
      _loading: observable,

      assetsTree: computed,
      isLoading: computed,

      addCategory: action.bound,
      addAsset: action.bound,
      loadAssetsTree: action.bound,
      updateAsset: action.bound,
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
    const {
      name,
      targetShare,
      factualShare,
      valueInPortfolio,
      paymentPerMonth,
    } = assetItem;

    const targetIndex = this._assetsTree.findIndex(
      (asset) => asset.name === name
    );

    if (targetIndex) {
      const targetElement = this._assetsTree[targetIndex];

      targetElement.factualShare = factualShare;
      targetElement.valueInPortfolio = valueInPortfolio;
      targetElement.targetShare = targetShare;
      targetElement.paymentPerMonth = paymentPerMonth;
    } else {
      throw new Error("element is not found");
    }
  }

  addCategory() {}
  addAsset() {}
}

/*
  valueInPortfolio: number;
  factualShare: number;
  targetShare: number;
  paymentPerMonth?: number;
*/
