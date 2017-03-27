import { Field } from './field';

export class Boolean extends Field {
  label: string = "";
  default: boolean = false;

  type(): string {
    return "boolean";
  }

  serialize(): any {
    return {
      ...super.serialize(),
      label: this.label,
      default: this.default,
    }
  }

  deserialize(obj: any): Boolean {
    super.deserialize(obj);
    this.label = obj.label;
    this.default = obj.default;

    return this;
  }
}
