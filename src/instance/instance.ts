import { isNil, omitBy, isEmpty, toSafeInteger, isObject, each } from 'lodash';

import { Form, State } from '../form';
import { Field } from '../form/field';
import { User } from '../user';
import { Value, ValueContainer, create } from './value';
import { ValidableObject } from '../interfaces';

export class Instance extends ValidableObject implements ValueContainer {
  readonly form: Form;

  id?: string;
  created?: Date;
  updated?: Date;
  proto: number = 2;
  formVersion: number;
  version: number = 0;
  creator?: User;
  updater?: User;
  state: number;
  values: Map<number, Value> = new Map();

  constructor(form: Form) {
    super();
    this.form = form;
    this.formVersion = form.version;
    this.state = form.fsm.initial.id;
  }

  isEmpty(): boolean {
    return this.values.size == 0;
  }

  hasValue(v: number | Field): boolean {
    if (v instanceof Field) return this.values.has(v.id);
    else this.values.has(v);
  }

  getValue(v: number | Field): Value {
    if (v instanceof Field) return this.values.get(v.id);
    else this.values.get(v);
  }

  removeValue(v: number | Field) {
    if (v instanceof Field) return this.values.delete(v.id);
    else this.values.delete(v);
  }

  transition(s: State) {}

  serialize(): any {
    let values = {};
    this.values.forEach((v, id) => values[`${id}`] = v.serialize());

    return omitBy({
      ...super.serialize(),
      id: this.id,
      created: this.created ? this.created.toJSON() : null,
      updated: this.updated? this.updated.toJSON() : null,
      proto: this.proto,
      formVersion: this.formVersion,
      version: this.version,
      creator: this.creator ? this.creator.serialize() : null,
      updater: this.updater ? this.updater.serialize() : null,
      state: this.state,
      values: values,
    }, isNil)
  }

  deserialize(obj: any): Instance {
    super.deserialize(obj);
    if (isEmpty(obj)) return this;

    this.id = obj.id;
    if (!isNil(obj.created)) {
      this.created = new Date(obj.created);
    }
    if (!isNil(obj.updated)) {
      this.updated = new Date(obj.updated);
    }
    this.proto = obj.proto;
    this.formVersion = obj.formVersion;
    this.version = obj.version;
    if (isObject(obj.creator)) {
      this.creator = new User().deserialize(obj.creator);
    }
    if (isObject(obj.updater)) {
      this.updater = new User().deserialize(obj.updater);
    }
    this.state = obj.state;

    this.values = new Map();
    each(obj.values, (v, k) => {
      let id = toSafeInteger(k);
      let f = this.form.getField(id);
      if (!isNil(f)) {
        this.values.set(id, create(f).deserialize(v));
      }
    })
    return this;
  }

}
