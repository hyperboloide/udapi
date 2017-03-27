import { isEmpty, isArray } from 'lodash';

import { ValidableWithList } from '../../interfaces';

export abstract class Field extends ValidableWithList {
  readonly id: number;
  name: string = "";
  help: string = "";
  mandatory: boolean = false;

  abstract type(): string;

  constructor(id: number) {
    super();
    this.id = id;
  }

  serialize(): any {
    let res = {
      ...super.serialize(),
      name: this.name,
      type: this.type(),
      mandatory: this.mandatory,
    }
    if (!isEmpty(this.help)) {
      res['help'] = this.help;
    }
    return res
  }

  deserialize(obj: any): Field {
    super.deserialize(obj);
    if (isEmpty(obj)) {
      return this;
    }
    this.name = obj.name;
    this.help = obj.help;
    this.mandatory = obj.mandatory;
    return this;
  }
}
