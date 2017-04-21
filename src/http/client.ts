
// export interface HTTPAPIResponse<T> {
//   errors?: any;
//   data?: T;
// }

export interface HTTPTransformer {
  (data: any): any
}

export interface HTTPConfig {
  url?: string;
  method?: string;
  baseURL?: string;
  transformRequest?: HTTPTransformer | HTTPTransformer[];
  transformResponse?: HTTPTransformer | HTTPTransformer[];
  headers?: any;
  params?: any;
  data?: any;
  responseType?: string;
}

export interface HTTPResponse {
  data: HTTPAPIResponse;
  status: number;
  statusText: string;
  headers: any;
  config: HTTPConfig;
}

export interface HTTPError extends Error {
  config: HTTPConfig;
  code?: string;
  response?: HTTPResponse;
}

export interface HTTPPromise extends Promise<HTTPResponse> {
}

export interface HTTPClient {
  defaults: HTTPConfig;
  request(config: HTTPConfig): HTTPPromise;
}
