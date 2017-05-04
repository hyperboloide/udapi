import { isNil, toSafeInteger, isEmpty, isString } from 'lodash';

import { ChoiceField, ChoiceValue } from './choice';
import { ValidableObject } from '../../interfaces';


export class RadioOptions extends ValidableObject {
  display: string = 'list';

  serialize():any {
    return {
      ...super.serialize(),
      display: this.display,
    };
  }

  deserialize(obj: any): RadioOptions {
    super.deserialize(obj);
    this.display = 'list';
    if (!isNil(obj) && isString(obj.display)) {
      this.display = obj.display;
    }
    return this;
  }
}

export const RadioType = "radio";

export class Radio extends ChoiceField {

  options: RadioOptions = new RadioOptions();
  default: number;

  type(): string {
    return RadioType;
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
    res['options'] = this.options.serialize();
    return res;
  }

  deserialize(obj: any): Radio {
    super.deserialize(obj);
    this.options = new RadioOptions().deserialize(obj.options);
    if (!isNil(obj.default)) {
      this.default = toSafeInteger(obj.default);
    }
    return this;
  }
}
