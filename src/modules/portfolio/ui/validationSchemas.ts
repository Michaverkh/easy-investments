import { object, string, number } from "yup";

export const assetsFormSchema = object().shape({
  name: string().required(),
  valueInPortfolio: number().required().positive(),
  factualShare: number().required().positive(),
  targetShare: number().required().positive(),
  paymentPerMonth: number().notRequired(),
});
