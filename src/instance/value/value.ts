import { isNil } from 'lodash';

import { Serializable, ValidableProperty } from '../../interfaces';
import { Field } from '../../form/field';


export abstract class Value extends ValidableProperty implements Serializable {
  readonly field: Field;
  value?: any;

  abstract serialize(): any;
  abstract deserialize(obj: any): Value;

  constructor(field: Field) {
    super();
    this.field = field;
  }

  type(): string {
    return this.field.type();
  }

  id(): number {
    return this.field.id;
  }

  isEmpty(): boolean {
    return isNil(this.value)
  }

  get(): any {
    return this.value;
  }

  set(value: any) {
    this.value = value;
  }

  reset(): Value {
    this.value = null;
    return this;
  }

}
