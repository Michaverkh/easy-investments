import { rest } from "msw";
import assetsTree from "./data/assetsTree.json";
import assetsTreeUpdated from "./data/assetsTreeUpdated.json";
import authUserSuccess from "./data/authUserSuccess.json";
import authUserError from "./data/authUserError.json";
import { EEndpoints } from "../shared/api/enums";

export const handlers = [
  // portfolio service
  rest.get(EEndpoints.GET_ASSETS_INFO, (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(assetsTree), ctx.delay(500));
  }),
  rest.post(EEndpoints.UPDATE_ASSET, (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(assetsTreeUpdated), ctx.delay(500));
  }),
  rest.post(EEndpoints.ADD_ASSET, (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(assetsTreeUpdated), ctx.delay(500));
  }),
  rest.get(EEndpoints.REMOVE_ASSET, (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(assetsTreeUpdated), ctx.delay(500));
  }),
  rest.post(EEndpoints.TOP_UP_PORTFOLIO, (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(assetsTreeUpdated), ctx.delay(500));
  }),

  // user service
  rest.post(EEndpoints.LOGIN, (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(authUserSuccess), ctx.delay(500));
  }),

  rest.post(EEndpoints.REGISTRATION, (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(authUserSuccess), ctx.delay(500));
  }),

  rest.get(EEndpoints.CHECK_AUTH, (req, res, ctx) => {
    return res(ctx.status(200), ctx.json({}), ctx.delay(500));
  }),
];
