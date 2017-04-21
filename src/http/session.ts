import { isArray, isNil, isObject, clone } from 'lodash';

import { HTTPClient, HTTPPromise, HTTPConfig, HTTPTransformer, HTTPAPITransformer, HTTPAPIResponse } from './client';
import { Serializable } from '../interfaces';

export interface SessionConfig {
  baseURL: string;
  apiKey?: string;
}

export class Session {

  config: SessionConfig;
  client: HTTPClient;
  defaultTransformers: Array<HTTPTransformer> = new Array();

  constructor(config: SessionConfig, client: HTTPClient) {
    this.config = config;
    this.client = client;
    let defaults = client.defaults.transformResponse;
    this.defaultTransformers = isArray(defaults) ? defaults : [defaults];
  }

  private wrapTransform<T>(tr?: HTTPAPITransformer<T>): HTTPTransformer[] {
    let defaults = clone(this.defaultTransformers);
    defaults.push((data) => this.toHTTPAPIResponse(tr, data));
    return defaults
  }

  private voidTransform(data): void {
    return;
  }

  private toHTTPAPIResponse<T>(tr: HTTPAPITransformer<T>, data: any): HTTPAPIResponse<T>{
    if (isNil(data) || !isObject(data)) {
      return {errors: null, data: null };
    } else if (isNil(data.data)) {
      return {
        errors: null,
        data: tr(data),
      };
    } else {
      return {
        errors: data.errors,
        data: !isNil(data.data) && isObject(data.data) ? tr(data.data) : null,
      };
    }
  }

  private clientConfig(tr?: HTTPTransformer): HTTPConfig {
    let headers = {
      'X-Requested-With': 'XMLHttpRequest',
      'Accept': 'application/json',
    };
    if (this.config.apiKey != null) {
      headers['ApiKey'] = this.config.apiKey;
    }

    let transform = this.client.defaults.transformResponse;
    if (!isNil(tr)) {
      transform = this.wrapTransform(tr)
    }

    return {
      baseURL: `${this.config.baseURL}/api`,
      headers: headers,
      responseType: 'json',
      transformResponse: transform,
    }
  }

  private joinUrlFragments(...uf: Array<string>): string {
    return uf.reduce((acc, p) => `${acc}${p}`);
  }

  GET<T>(tr: HTTPAPITransformer<T>, ...urlFragments: Array<string>): HTTPPromise<T> {
    return this.client.request({
      ...this.clientConfig(),
      method: 'GET',
      url: this.joinUrlFragments(...urlFragments),
      transformResponse: this.wrapTransform(tr),
    });
  }

  POST<T>(tr: HTTPAPITransformer<T>, obj: any, ...urlFragments: Array<string>): HTTPPromise<T> {
    return this.client.request({
      ...this.clientConfig(),
      method: 'POST',
      url: this.joinUrlFragments(...urlFragments),
      data: obj,
      transformResponse: this.wrapTransform(tr),
    });
  }

  PUT<T>(tr: HTTPAPITransformer<T>, obj: any, ...urlFragments: Array<string>): HTTPPromise<T> {
    return this.client.request({
      ...this.clientConfig(),
      method: 'PUT',
      url: this.joinUrlFragments(...urlFragments),
      data: obj,
      transformResponse: this.wrapTransform(tr),
    });
  }

  DELETE(...urlFragments: Array<string>): HTTPPromise<any> {
    return this.client.request({
      ...this.clientConfig(),
      method: 'DELETE',
      url: this.joinUrlFragments(...urlFragments),
      transformResponse: this.wrapTransform(this.voidTransform),
    });
  }
}
