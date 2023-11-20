import { action, computed, makeObservable, observable } from "mobx";
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

export class PortfolioStore implements IPortfolioStore {
  _assetsTree: IAssetsItem[] = [];
  _loading: boolean = false;
  _isAssetsTreeUpdated: boolean = false;
  _totalBalance: number = 0;
  _portfolioRepository: PortfolioRepository = {} as PortfolioRepository;

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

  constructor() {
    this._portfolioRepository = new PortfolioRepository();
    makeObservable<
      IPortfolioStore,
      "_assetsTree" | "_loading" | "_isAssetsTreeUpdated" | "_totalBalance"
    >(this, {
      _assetsTree: observable,
      _loading: observable,
      _isAssetsTreeUpdated: observable,
      _totalBalance: observable,

      assetsTree: computed,
      isLoading: computed,
      isAssetsTreeUpdated: computed,
      totalBalance: computed,

      addAsset: action.bound,
      loadAssetsTree: action.bound,
      updateAsset: action.bound,
      removeAsset: action.bound,
      getAssetsForTopUp: action.bound,
    });
  }

  async loadAssetsTree(): Promise<void> {
    try {
      this._loading = true;
      const { totalBalance, items } =
        await this._portfolioRepository.loadAssetsTree();
      this._assetsTree = items;
      this._totalBalance = totalBalance;
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
