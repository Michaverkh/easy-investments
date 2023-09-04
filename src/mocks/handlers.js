import { rest } from "msw";
import receptions from "./data/receptions.json";
import dashboardItems from "./data/dashboardItems.json";
import importDataSetResponse from "./data/importDataSetResponse.json";
import detailed from "./data/detailed.json";
import { EEndpoints } from "shared/api/enums";

export const handlers = [
  rest.get(EEndpoints.GET_RECEPTIONS_LIST, (req, res, ctx) => {
    const response = receptions;

    const totalSize = req.url.searchParams.get("totalSize") || "12";
    const offset = req.url.searchParams.get("offset") || "0";
    const limit = req.url.searchParams.get("limit") || "10";
    const sort = req.url.searchParams.get("sortDirection") || "asc";

    response.offset = parseInt(offset, 10);
    response.totalSize = parseInt(totalSize, 10);
    response.limit = parseInt(limit, 10);

    if (sort === "desk") {
      response.items.reverse();
    }
    return res(ctx.status(200), ctx.json(response), ctx.delay(1000));
  }),
  rest.get(EEndpoints.GET_DASHBOARD_LIST, (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(dashboardItems), ctx.delay(2000));
  }),
  rest.get(EEndpoints.GET_REPORT_EXPORT_FILE, (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(dashboardItems), ctx.delay(2000));
  }),
  rest.post(EEndpoints.POST_UPLOAD_DATASET, (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json(importDataSetResponse),
      ctx.delay(1000)
    );
  }),
  rest.get(`${EEndpoints.GET_DETAILED_INFO}/:id`, (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(detailed), ctx.delay(2000));
  }),
];
