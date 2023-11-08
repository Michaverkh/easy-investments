import { object, string } from "yup";

export const userAuthResponseSchema = object({
  token: string().notRequired().default(""),
});
