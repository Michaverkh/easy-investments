import { array, object, string } from "yup";

export const userResponseSchema = object({
  id: string().defined(),
  email: string().notRequired().default(""),
});

export const userAuthResponseSchema = object({
  token: string().notRequired().default(""),
  user: userResponseSchema.required(),
});
