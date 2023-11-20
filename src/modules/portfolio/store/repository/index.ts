import { apiModule } from "../../../..";
import { EEndpoints } from "../../../../shared/api/enums";
import { IAssetsItemsResponseDTO } from "../dto";
import { IAddAssetValues, IAssetsItemValues, IPortfolio } from "../interfaces";
import { assetsItemsMapper } from "../mappers";
import { assetsItemsResponseSchema } from "../validators";

export class PortfolioRepository {
  public async loadAssetsTree(): Promise<IPortfolio> {
    const result = await apiModule.getData<null, IAssetsItemsResponseDTO>(
      `${EEndpoints.GET_ASSETS_INFO}`,
      null,
      { responseValidationSchema: assetsItemsResponseSchema }
    );

    return await assetsItemsMapper(result);
  }

  public async updateAsset(
    newAssetItem: IAssetsItemValues
  ): Promise<IPortfolio> {
    const result = await apiModule.postData<
      IAssetsItemValues,
      IAssetsItemsResponseDTO
    >(`${EEndpoints.UPDATE_ASSET}`, newAssetItem, {
      responseValidationSchema: assetsItemsResponseSchema,
    });

    return await assetsItemsMapper(result);
  }

  public async addAsset(newAssetItem: IAddAssetValues): Promise<IPortfolio> {
    const result = await apiModule.postData<
      IAddAssetValues,
      IAssetsItemsResponseDTO
    >(`${EEndpoints.ADD_ASSET}`, newAssetItem, {
      responseValidationSchema: assetsItemsResponseSchema,
    });

    return await assetsItemsMapper(result);
  }

  public async removeAsset(assetName: string): Promise<IPortfolio> {
    const result = await apiModule.getData<null, IAssetsItemsResponseDTO>(
      `${EEndpoints.REMOVE_ASSET}?assetName=${assetName}`,
      null,
      { responseValidationSchema: assetsItemsResponseSchema }
    );

    return await assetsItemsMapper(result);
  }
}
