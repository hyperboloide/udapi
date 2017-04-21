
export type HTTPAPITransformer<T> = (obj: any) => T;

export interface HTTPAPIResponse<T> {
  errors?: any;
  data?: T;
}

export interface HTTPAPIDownloadResponse<T> {
  errors?: any;
  data?: T;
}

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

export interface HTTPResponse<T> {
  data: HTTPAPIResponse<T>;
  status: number;
  statusText: string;
  headers: any;
  config: HTTPConfig;
}

export interface HTTPPromise<T> extends Promise<HTTPResponse<T>> {
}

export interface HTTPClient {
  defaults: HTTPConfig;
  request<T>(config: HTTPConfig): HTTPPromise<T>;
}
