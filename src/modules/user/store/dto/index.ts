import { InferType } from "yup";
import { userAuthResponseSchema } from "../validators";

export type IUserAuthResponseDTO = InferType<typeof userAuthResponseSchema>;
