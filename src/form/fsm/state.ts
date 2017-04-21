import { includes, without, isObject } from 'lodash';

import { ValidableObject } from '../../interfaces';
import { Field } from '../field';

export class State extends ValidableObject {
  readonly id: number;
  name: string;
  fields: Array<number> = new Array();
  nexts: Array<number> = new Array();

  constructor(id: number) {
    super();
    this.id = id;
  }

  hasField(field: Field): boolean {
    return includes(this.fields, field.id);
  }

  addField(field: Field) {
    if (!this.hasField(field)) {
      this.fields.push(field.id);
    }
  }

  removeField(field: Field) {
    this.fields = without(this.fields, field.id);
  }

  hasNext(state: State) {
    return includes(this.nexts, state.id);
  }

  addNext(state: State) {
    if (!this.hasNext(state)) {
      this.nexts.push(state.id);
    }
  }

  removeNext(state: State) {
    this.nexts = without(this.nexts, state.id);
  }

  isTerminal(): boolean {
    return this.nexts.length == 0;
  }

  serialize(): any {
    return {
      ...super.serialize(),
      name: this.name,
      fields: this.fields,
      nexts: this.nexts,
    };
  }

  deserialize(obj: any): State {
    super.deserialize(obj);
    if (isObject(obj)) {
      this.name = obj.name;
      this.fields = obj.fields;
      this.nexts = obj.nexts;
    }
    return this;
  }
}
