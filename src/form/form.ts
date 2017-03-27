import { isEmpty, isObject } from 'lodash';

import { User } from '../user/user';
import { Field } from './fields';

export class Form {
  url: string;
  owner: User;
  created: Date;
  updated: Date;
  proto: number;
  version: number;
  states: boolean;
  name: string;
  description: string;

  fields: Map<number, Field>;

  serialize(): any {
    return {
      url: this.url,
      owner: this.owner,
      created: this.created.toJSON(),
      updated: this.updated,
      proto: this.proto,
      version: this.version,
      states: this.states,
      name: this.name,
      description: this.description,
    }
  }

  deserialize(obj: any): Form {
    if (isEmpty(obj)) {
      return this;
    }
    this.url = obj.url;
    if (isObject(obj.owner)) {
      this.owner = new User().deserialize(obj.owner);
    }
    if (!isEmpty('created')) {
      this.created = new Date(obj.created);
    }
    if (!isEmpty('updated')) {
      this.updated = new Date(obj.updated);
    }

    this.proto = obj.proto;
    this.version = obj.version;
    this.states = obj.states;
    this.name = obj.name;
    this.description = obj.description;

    let tmp = new Map<number, Field>();


    return this;
  }
}
