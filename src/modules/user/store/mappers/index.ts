import { morphism, Schema } from "morphism";
import { IUserAuthResponseDTO, IUserResponseDTO } from "../dto";
import { IUser, IUserAuth } from "../interfaces";

const userMapper = (source: IUserResponseDTO): IUser => {
  type UserSchema = Schema<IUser, IUserResponseDTO>;

  const schema: UserSchema = {
    id: "id",
    email: "email",
  };

  return morphism<UserSchema>(schema, source);
};

export const userAuthMapper = async (
  source: IUserAuthResponseDTO
): Promise<IUserAuth> => {
  type UserAuthSchema = Schema<IUserAuth, IUserAuthResponseDTO>;

  const schema: UserAuthSchema = {
    token: "token",
    user: (value) => userMapper(value.user),
  };

  return await new Promise((res) =>
    res(morphism<UserAuthSchema>(schema, source))
  );
};
