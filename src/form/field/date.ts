import { isEmpty, isDate } from 'lodash';

import { Field } from './field';


export const DateFieldType = "date";

export class DateField extends Field {
  default: Date;

  type(): string {
    return DateFieldType;
  }

  serialize(): any {
    let res = super.serialize();
    if (isDate(this.default)) {
      res['default'] = this.default.toJSON();
    }
    return res;
  }

  deserialize(obj: any): DateField {
    super.deserialize(obj);
    if (!isEmpty(obj.default)) {
      this.default = new Date(obj.default);
    }
    return this;
  }
}
