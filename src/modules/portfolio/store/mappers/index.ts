import { IAssetsItemResponseDTO, IAssetsItemsResponseDTO } from "../dto";
import { IAssetsItem, IPortfolio } from "../interfaces";
import { morphism, Schema } from "morphism";

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
): Promise<IPortfolio> => {
  type AssetsItemsSchema = Schema<IPortfolio, IAssetsItemsResponseDTO>;

  const schema: AssetsItemsSchema = {
    totalBalance: "totalBalance",
    items: (value) => assetsItemMapper(value.items),
  };

  return await new Promise((res) =>
    res(morphism<AssetsItemsSchema>(schema, source))
  );
};
