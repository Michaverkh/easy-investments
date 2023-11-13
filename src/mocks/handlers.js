import { rest } from "msw";
import assetsTree from "./data/assetsTree.json";
import authUserSuccess from "./data/authUserSuccess.json";
import authUserError from "./data/authUserError.json";
import { EEndpoints } from "../shared/api/enums";

export const handlers = [
  rest.get(EEndpoints.GET_ASSETS_INFO, (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(assetsTree), ctx.delay(500));
  }),

  rest.post(EEndpoints.LOGIN, (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(authUserSuccess), ctx.delay(500));
  }),
];
