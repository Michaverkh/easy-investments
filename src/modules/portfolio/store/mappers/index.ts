import { IAssetsItemResponseDTO, IAssetsItemsResponseDTO } from "../dto";
import { IAssetsItems, IAssetsItem } from "../interfaces";
import { morphism, Schema } from "morphism";

// const calculateRate = (asset: IAssetsItemResponseDTO): number => {
//   if (!asset.parent) {

//   }
//  }

const assetsItemMapper = (source: IAssetsItemResponseDTO[]): IAssetsItem[] => {
  type AssetsItemSchema = Schema<IAssetsItem, IAssetsItemResponseDTO>;

  const schema: AssetsItemSchema = {
    type: "type",
    name: "name",
    valueInPortfolio: "valueInPortfolio",
    factualShare: "factualShare",
    targetShare: "targetShare",
    paymentPerMonth: "paymentPerMonth",
    parent: "parent",
    rate: (value: IAssetsItemResponseDTO) => value.factualShare || 0,
  };

  return morphism<AssetsItemSchema>(schema, source);
};

export const assetsItemsMapper = async (
  source: IAssetsItemsResponseDTO
): Promise<IAssetsItem[]> => {
  type AssetsItemsSchema = Schema<IAssetsItems, IAssetsItemsResponseDTO>;

  const schema: AssetsItemsSchema = {
    items: (value) => assetsItemMapper(value.items),
  };

  return await new Promise((res) =>
    res(morphism<AssetsItemsSchema>(schema, source).items)
  );
};
