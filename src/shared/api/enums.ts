export enum EEndpoints {
  GET_ASSETS_INFO = "assets/info",
  UPDATE_ASSET = "assets/update",
  ADD_ASSET = "assets/add",
  REMOVE_ASSET = "assets/remove",
  TOP_UP_PORTFOLIO = "assets/top-up",

  LOGIN = "login",
  REGISTRATION = "registration",
  CHECK_AUTH = "refresh",
}

export enum EHttpMethods {
  GET = "get",
  POST = "post",
  PUT = "put",
  DELETE = "delete",
}

export enum EServerErrors {
  //User service
  INCORRECT_PASSWORD = "501",
  INCORRECT_EMAIL = "502",
  USER_ALREADY_EXISTS = "503",

  //Portfolio service
  ASSET_ALREADY_EXISTS = "504",
}
