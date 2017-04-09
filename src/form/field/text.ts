import { isBoolean, isEmpty, isInteger, toNumber, isNil } from 'lodash';

import { Field } from './field';
import { ValidableObject } from '../../interfaces';


export class TextOptions extends ValidableObject {
  textarea: boolean = false;
  rows: number = 1;

  serialize():any {
    return {
      ...super.serialize(),
      textarea: this.textarea,
      rows: this.rows,
    };
  }

  deserialize(obj: any): TextOptions {
    super.deserialize(obj);

    this.textarea = false;
    if (isBoolean(obj.textarea)) {
      this.textarea = obj.textarea;
    }
    if (isInteger(obj.rows)) {
      this.rows = obj.rows;
    }
    return this;
  }
}

export const TextType = "text"

export class Text extends Field {

  options: TextOptions = new TextOptions();
  default: string;

  type(): string {
    return TextType;
  }

  serialize(): any {
    let res = {
      ...super.serialize(),
      options: this.options.serialize(),
    };
    if (!isEmpty(this.default)) {
      res['default'] = this.default;
    }
    return res;
  }

  deserialize(obj: any): Text {
    super.deserialize(obj);

    if (!isEmpty(obj.options)) {
      this.options = new TextOptions().deserialize(obj.options);
    }
    if (!isEmpty(obj.default)) {
      this.default = obj.default;
    }
    return this;
  }
}
