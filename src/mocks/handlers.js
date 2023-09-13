import { rest } from "msw";
import assetsTree from "./data/assetsTree.json";
import { EEndpoints } from "../shared/api/enums";

export const handlers = [
  rest.get(EEndpoints.GET_ASSETS_INFO, (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(assetsTree), ctx.delay(2000));
  }),
];
