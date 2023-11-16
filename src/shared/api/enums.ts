export enum EEndpoints {
  GET_ASSETS_INFO = "assetsTree/info",
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
  INCORRECT_PASSWORD = "501",
  INCORRECT_EMAIL = "502",
  USER_ALREADY_EXISTS = "503",
}
