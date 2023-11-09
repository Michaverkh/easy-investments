import { InferType } from "yup";
import { userAuthResponseSchema, userResponseSchema } from "../validators";

export type IUserAuthResponseDTO = InferType<typeof userAuthResponseSchema>;

export type IUserResponseDTO = InferType<typeof userResponseSchema>;

export interface IUserRequestDTO {
  email: string;
  password: string;
}
