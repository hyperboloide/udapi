import { isEmpty, } from 'lodash';

import { Field } from './field';

export class Boolean extends Field {
  label: string = "";
  default: boolean = false;

  type(): string {
    return "boolean";
  }

  serialize(): any {
    let res = super.serialize();
    if (!isEmpty(this.label)) {
      res['label'] = this.label;
    }
    if (!isEmpty(this.default)) {
      res['default'] = this.default;
    }
    return res;
  }

  deserialize(obj: any): Boolean {
    super.deserialize(obj);
    this.label = obj.label;
    this.default = obj.default;
    return this;
  }
}
