import { isNil, toSafeInteger, isEmpty } from 'lodash';

import { ChoiceField, ChoiceValue } from './choice';

export class Radio extends ChoiceField {

  default: number;

  type(): string {
    return "radio";
  }

  removeValue(v: ChoiceValue) {
    super.removeValue(v);
    if (this.isDefault(v)) {
      this.setDefault(null);
    }
  }

  isDefault(v: ChoiceValue) {
    if (!isNil(this.default)) {
      return this.default == v.id;
    }
    return false;
  }

  setDefault(v: ChoiceValue) {
    if (isEmpty(v)) {
      this.default = null;
    } else {
      this.default = v.id;
    }
  }

  serialize(): any {
    let res = super.serialize();
    if (!isNil(this.default)) {
      res['default'] = this.default;
    }
    return res;
  }

  deserialize(obj: any): Radio {
    super.deserialize(obj);
    if (!isNil(obj.default)) {
      this.default = toSafeInteger(obj.default);
    }
    return this;
  }
}
