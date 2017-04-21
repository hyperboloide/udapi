import { Serializable } from '../../interfaces';
import { Field } from '../../form/field';


export abstract class Value<T> implements Serializable {
  readonly field: Field;

  value?: T;

  abstract type(): string;
  abstract isEmpty(): boolean;
  abstract serialize(): any;
  abstract deserialize(obj: any): Serializable;

  constructor(field: Field) {
    this.field = field;
  }

  id(): number {
    return this.field.id;
  }

  get(): T {
    return this.value;
  }

  set(value: T) {
    this.value = value;
  }

  reset() {
    this.value = null;
  }

}
