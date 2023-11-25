import {
  action,
  computed,
  makeObservable,
  observable,
  runInAction,
} from "mobx";
import {
  EAssetsType,
  IAddAssetValues,
  IAssetForTopUp,
  IAssetsItem,
  IAssetsItemValues,
  IPortfolioStore,
} from "./interfaces";
import { PortfolioRepository } from "./repository";
import { IOption } from "../../../shared/interfaces";
import { EServerErrors } from "../../../shared/api/enums";
import { EErrorMessages } from "../../../shared/globalErrorCollector/constants";

export class PortfolioStore implements IPortfolioStore {
  _assetsTree: IAssetsItem[] = [];
  _loading: boolean = false;
  _isAssetsTreeUpdated: boolean = false;
  _totalBalance: number = 0;
  _portfolioRepository: PortfolioRepository = {} as PortfolioRepository;
  _portfolioErrorMessage: string = "";

  get assetsTree() {
    return this._assetsTree;
  }

  get isLoading() {
    return this._loading;
  }

  get isAssetsTreeUpdated() {
    return this._isAssetsTreeUpdated;
  }

  get totalBalance() {
    return this._totalBalance;
  }

  get portfolioErrorMessage() {
    return this._portfolioErrorMessage;
  }

  constructor() {
    this._portfolioRepository = new PortfolioRepository();
    makeObservable<
      IPortfolioStore,
      | "_assetsTree"
      | "_loading"
      | "_isAssetsTreeUpdated"
      | "_totalBalance"
      | "_portfolioErrorMessage"
    >(this, {
      _assetsTree: observable,
      _loading: observable,
      _isAssetsTreeUpdated: observable,
      _totalBalance: observable,
      _portfolioErrorMessage: observable,

      assetsTree: computed,
      isLoading: computed,
      isAssetsTreeUpdated: computed,
      totalBalance: computed,
      portfolioErrorMessage: computed,

      addAsset: action.bound,
      loadAssetsTree: action.bound,
      updateAsset: action.bound,
      removeAsset: action.bound,
      getAssetsForTopUp: action.bound,
      topUpPortfolio: action.bound,
    });
  }

  async loadAssetsTree(): Promise<void> {
    try {
      this._loading = true;
      const { totalBalance, items } =
        await this._portfolioRepository.loadAssetsTree();
      this._assetsTree = items;
      this._totalBalance = totalBalance;
    } catch (err: any) {
      console.log("AssetError", err.message);
    } finally {
      this._loading = false;
    }
  }

  async updateAsset(newAssetItem: IAssetsItemValues): Promise<void> {
    try {
      this._loading = true;
      const { totalBalance, items } =
        await this._portfolioRepository.updateAsset(newAssetItem);
      this._assetsTree = items;
      this._totalBalance = totalBalance;
    } catch (err: any) {
      console.log("AssetError", err.message);
    } finally {
      this._loading = false;
    }
  }

  async addAsset(newAssetItem: IAddAssetValues): Promise<void> {
    try {
      this._loading = true;
      const { totalBalance, items } = await this._portfolioRepository.addAsset(
        newAssetItem
      );
      this._assetsTree = items;
      this._totalBalance = totalBalance;
    } catch (err: any) {
      switch (err.message) {
        case EServerErrors.ASSET_ALREADY_EXISTS:
          runInAction(
            () =>
              (this._portfolioErrorMessage =
                EErrorMessages.ASSET_ALREADY_EXISTS)
          );
          return;
        default:
          console.log("AssetError", err.message);
      }
    } finally {
      this._loading = false;
    }
  }

  async removeAsset(assetName: string): Promise<void> {
    try {
      this._loading = true;
      const { totalBalance, items } =
        await this._portfolioRepository.removeAsset(assetName);
      this._assetsTree = items;
      this._totalBalance = totalBalance;
    } catch (err: any) {
      console.log("AssetError", err.message);
    } finally {
      this._loading = false;
    }
  }

  getAssetsForTopUp(): IAssetForTopUp {
    const assetItems: IOption[] = [];
    const initialValues: Record<string, number> = {};

    this._assetsTree.forEach((asset) => {
      if (asset.type === EAssetsType.ASSETS) {
        assetItems.push({
          name: asset.name,
          value: asset.paymentPerMonth || 0,
        });

        initialValues[asset.name] = asset.paymentPerMonth || 0;
      }
    });

    return { initialValues, assetItems };
  }

  async topUpPortfolio(
    assetsValuesDelta: Record<string, number>
  ): Promise<void> {
    try {
      this._loading = true;
      const { totalBalance, items } =
        await this._portfolioRepository.topUpPortfolio(assetsValuesDelta);
      this._assetsTree = items;
      this._totalBalance = totalBalance;
    } catch (err: any) {
      console.log("AssetError", err.message);
    } finally {
      this._loading = false;
    }
  }
}

/*
Старые методы обновления стора. Пригодятся при создании сервиса на беке

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
    this._isAssetsTreeUpdated = !this._isAssetsTreeUpdated;
  }
*/
