import { isNumber, toSafeInteger, get, toNumber, isNil } from 'lodash';

import { Value } from './value';
import {Number as NumberField } from '../../form/field';

export class Number extends Value {
  field: NumberField;
  value: number

  deserialize(obj: any): Number {
    this.value = null;
    if (!isNil(obj) && isNumber(obj)) {
      if(get(this.field, 'options.integer')) {
        this.value = toSafeInteger(obj);
      } else {
        this.value = toNumber(obj);
      }
    }
    return this;
  }

  serialize(): any {
    return this.value;
  }

}
