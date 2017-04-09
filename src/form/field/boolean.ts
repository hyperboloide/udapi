import { isBoolean, isEmpty, isString } from 'lodash';

import { Field } from './field';

export class Boolean extends Field {
  label: string;
  default: boolean;

  type(): string {
    return "boolean";
  }

  serialize(): any {
    let res = super.serialize();
    if (!isEmpty(this.label)) {
      res['label'] = this.label;
    }
    if (isBoolean(this.default)) {
      res['default'] = this.default;
    }
    return res;
  }

  deserialize(obj: any): Boolean {
    super.deserialize(obj);
    if (!isEmpty(obj.label) && isString(obj.label)) {
      this.label = obj.label;
    }
    if (isBoolean(obj.default)) {
      this.default = obj.default;
    }
    return this;
  }
}
