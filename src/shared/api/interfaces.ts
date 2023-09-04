import { Schema } from "yup";

export interface IFetchDataOptions<P = any, R = any> {
  requestValidationSchema?: Schema<P>;
  responseValidationSchema?: Schema<R>;
  tag?: string;
}

export interface IConnection {
  path: string;
  signal: any;
  abort: () => void;
  tag: string;
}
