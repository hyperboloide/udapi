import { isArray, isNil } from 'lodash';

import { HTTPClient, HTTPPromise, HTTPConfig, HTTPTransformer } from './client';
import { Serializable } from '../interfaces';

export interface SessionConfig {
  baseURL: string;
  apiKey?: string;
}

export class Session {

  config: SessionConfig;
  client: HTTPClient;

  constructor(config: SessionConfig, client: HTTPClient) {
    this.config = config;
    this.client = client;
  }

  private wrapTransform(tr: HTTPTransformer): HTTPTransformer[] {
    let defaults = this.client.defaults.transformResponse;
    let res = isArray(defaults) ? defaults : [defaults];
    res.push(tr);
    return res;
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

  get(...urlFragments: Array<string>): HTTPPromise {
    return this.client.request({
      ...this.clientConfig(),
      method: 'GET',
      url: this.joinUrlFragments(...urlFragments),
    });
  }

  post(obj: any, ...urlFragments: Array<string>): HTTPPromise {
    return this.client.request({
      ...this.clientConfig(),
      method: 'POST',
      url: this.joinUrlFragments(...urlFragments),
      data: obj,
    });
  }
}
