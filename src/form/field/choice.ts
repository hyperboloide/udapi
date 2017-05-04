import { isEmpty, toSafeInteger, map } from 'lodash';

import { Field } from './field';
import { Display, Displayable } from '../display';
import { ValidableObject } from '../../interfaces';


export class ChoiceValue extends ValidableObject implements Displayable {
  readonly id: number;
  label: string;

  constructor(id: number) {
    super();
    this.id = id;
  }

  serialize(): any {
    return {
      ...super.serialize(),
      id: this.id,
      label: this.label,
    };
  }

  deserialize(obj: any): ChoiceValue {
    super.deserialize(obj);
    this.label = obj.label;
    return this;
  }
}

export abstract class ChoiceField extends Field {
  values: Map<number, ChoiceValue> = new Map();
  display: Display = new Display();

  isEmpty():boolean {
    return this.values.size == 0;
  }

  getValue(id: number): ChoiceValue {
    return this.values.get(id);
  }

  createValue(id: number, label: string = ''): ChoiceValue {
    let v = new ChoiceValue(id);
    v.label = label;
    this.values.set(id, v);
    this.display.add(v);
    return v;
  }

  valueIndex(v: ChoiceValue): number {
    return this.display.index(v);
  }

  removeValue(v: ChoiceValue) {
    this.values.delete(v.id);
    this.display.remove(v);
  }

  serialize(): any {
    return {
      ...super.serialize(),
      values: map(this.display.items, (id) => this.getValue(id).serialize())
    };
  }

  deserialize(obj: any): ChoiceField {
    super.deserialize(obj);
    this.values = new Map();
    this.display = new Display();

    for (let v of obj.values) {
      const id = toSafeInteger(v.id);
      const cv = new ChoiceValue(id).deserialize(v);
      this.values.set(id, cv);
      this.display.add(cv);
    }
    return this;
  }
}
