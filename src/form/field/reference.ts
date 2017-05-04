import { isBoolean, isEmpty, isString } from 'lodash';

import { Field } from './field';


export const ReferenceType = "reference";

export class Reference extends Field {
  form: string;

  type(): string {
    return ReferenceType;
  }

  serialize(): any {
    return {
      ...super.serialize(),
      form: this.form,
    };
  }

  deserialize(obj: any): Reference {
    super.deserialize(obj);
    this.form = obj.form;
    return this;
  }
}
