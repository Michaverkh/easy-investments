import { InferType } from "yup";
import {
  assetsItemResponseSchema,
  assetsItemsResponseSchema,
} from "../validators";

export type IAssetsItemsResponseDTO = InferType<
  typeof assetsItemsResponseSchema
>;

export type IAssetsItemResponseDTO = InferType<typeof assetsItemResponseSchema>;
