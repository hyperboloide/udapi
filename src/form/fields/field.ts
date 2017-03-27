import { isEmpty } from 'lodash';

export abstract class Field {
  readonly id: number;
  name: string = "";
  help: string = "";
  mandatory: boolean = false;
  errors: any;

  abstract type(): string;

  constructor(id: number) {
    this.id = id;
  }

  setErrors(errors: any) {
    this.errors = errors;
  }

  removeErrors() {
    delete this.errors;
  }

  hasErrors() {
    return !isEmpty(this.errors);
  }

  serialize(): any {
    return {
      name: this.name,
      type: this.type(),
      help: this.help,
      mandatory: this.mandatory,
    }
  }

  deserialize(obj: any): Field {
    if (isEmpty(obj)) {
      return this;
    }
    this.name = obj.name;
    this.help = obj.help;
    this.mandatory = obj.mandatory;

    return this;
  }
}
