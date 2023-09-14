import { array, number, object, string } from "yup";

export const assetsItemResponseSchema = object({
  type: string().notRequired().default(""),
  name: string().notRequired().default(""),
  valueInPortfolio: number().notRequired().default(0),
  factualShare: number().notRequired().default(0),
  targetShare: number().notRequired().default(0),
  paymentPerMonth: number().optional(),
  parent: string().optional(),
});

export const assetsItemsResponseSchema = object({
  items: array().of(assetsItemResponseSchema).required(),
});
