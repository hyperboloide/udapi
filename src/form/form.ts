import { isEmpty, isObject, each, toSafeInteger } from 'lodash';

import { User } from '../user/user';
import { Field, extract } from './fields';
import { FSM } from './fsm';

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
  fsm: FSM;

  serialize(): any {
    let fields = {};
    this.fields.forEach((f, id) => fields[`${id}`] = f.serialize());
    return {
      url: this.url,
      owner: this.owner.serialize(),
      created: this.created.toJSON(),
      updated: this.updated.toJSON(),
      proto: this.proto,
      version: this.version,
      states: this.states,
      name: this.name,
      description: this.description,
      fsm: this.fsm.serialize(),
      fields: fields,
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

    this.fields = new Map<number, Field>();
    each(obj.fields, (v, k) => {
      let id = toSafeInteger(k);
      this.fields.set(id, extract(id, v));
    })

    if (isObject(obj.fsm)) {
      this.fsm = new FSM().deserialize(obj.fsm);
    }

    return this;
  }
}
