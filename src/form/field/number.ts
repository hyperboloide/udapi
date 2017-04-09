import { isBoolean, isEmpty, isNumber, toNumber, isNil } from 'lodash';

import { Field } from './field';
import { ValidableObject } from '../../interfaces';


export class NumberOptions extends ValidableObject {
  integer: boolean = false;

  serialize():any {
    return {
      ...super.serialize(),
      integer: this.integer,
    };
  }

  deserialize(obj: any): NumberOptions {
    super.deserialize(obj);
    this.integer = false;
    if (isBoolean(obj.integer)) {
      this.integer = obj.integer;
    }
    return this;
  }
}

export const NumberType = "number"

export class Number extends Field {

  options: NumberOptions = new NumberOptions();
  default: number;

  type(): string {
    return NumberType;
  }

  serialize(): any {
    let res = {
      ...super.serialize(),
      options: this.options.serialize(),
    };
    if (!isNil(this.default)) {
      res['default'] = this.default;
    }
    return res;
  }

  deserialize(obj: any): Number {
    super.deserialize(obj);
    if (!isEmpty(obj.options)) {
      this.options = new NumberOptions().deserialize(obj.options);
    }
    if (isNumber(obj.default)) {
      this.default = toNumber(obj.default);
    }
    return this;
  }
}
