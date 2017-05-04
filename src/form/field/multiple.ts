import { isEmpty, toSafeInteger } from 'lodash';

import { ChoiceField, ChoiceValue } from './choice';


export const MultipleType = "multiple";

export class Multiple extends ChoiceField {

  default: Array<number> = new Array();

  type(): string {
    return MultipleType;
  }

  removeValue(v: ChoiceValue) {
    super.removeValue(v);
    if (this.isDefault(v)) {
      this.toggleDefault(v);
    }
  }

  isDefault(v: ChoiceValue) {
    return this.default.indexOf(v.id) != -1;
  }

  toggleDefault(v: ChoiceValue) {
    let idx = this.default.indexOf(v.id);
    if (idx != -1) {
      this.default.splice(idx, 1);
    } else {
      this.default.push(v.id);
    }
  }

  serialize(): any {
    let res = super.serialize();
    if (!isEmpty(this.default)) {
      res['default'] = this.default;
    }
    return res;
  }

  deserialize(obj: any): Multiple {
    super.deserialize(obj);

    if (!isEmpty(obj.default)) {
      this.default = new Array();
      for (let id of obj.default) {
        this.default.push(toSafeInteger(id));
      }
    }
    return this;
  }
}
