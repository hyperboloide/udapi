import { isEmpty, toSafeInteger, isObject, each, isNumber } from 'lodash';

import { Field, extract } from '.';
import { Display } from '../display';
import { ValidableObject } from '../../interfaces';

export class EmbeddedOptions extends ValidableObject {
  max: number = 99;
  min: number = 1;

  serialize(): any {
    return {
      ...super.serialize(),
      min: this.min,
      max: this.max,
    };
  }

  deserialize(obj: any): EmbeddedOptions {
    super.deserialize(obj);
    if (isObject(obj)) {
      if (isNumber(obj.min)) {
        this.min = toSafeInteger(obj.min)
      }
      if (isNumber(obj.max)) {
        this.max = toSafeInteger(obj.max)
      }
    }
    return this;
  }
}

export class Embedded extends Field {

  fields: Map<number, Field> = new Map();
  display: Display = new Display();
  options: EmbeddedOptions = new EmbeddedOptions();

  type(): string {
    return "embedded";
  }

  isEmpty(): boolean {
    return this.fields.size == 0;
  }

  hasField(id: number): boolean {
    return this.fields.has(id);
  }

  getField(id: number): Field {
    return this.fields.get(id);
  }

  serialize(): any {
    let fields = {};
    this.fields.forEach((f, id) => fields[`${id}`] = f.serialize());
    return {
      ...super.serialize(),
      options: this.options.serialize(),
      fields: fields,
      display: this.display.serialize(),
    };
  }

  deserialize(obj: any): Embedded {
    super.deserialize(obj);

    this.fields = new Map();
    each(obj.fields, (v, k) => {
      let id = toSafeInteger(k);
      this.fields.set(id, extract(id, v));
    })

    this.display = new Display().deserialize(obj.display);
    this.options = new EmbeddedOptions().deserialize(obj.options);
    return this;
  }

}
