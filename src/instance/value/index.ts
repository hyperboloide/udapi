import * as field from "../../form/field";
import { Value } from "./value";
import { Number } from "./number";
import { State } from '../../form';

export {
  Value,
  Number,
}

export interface ValueContainer {
  values: Map<number, Value>;

  isEmpty(): boolean;
  hasValue(v: number | field.Field): boolean;
  getValue(v: number | field.Field): Value;
  removeValue(v: number | field.Field);
  transition(s: State);
}

export function create(f: field.Field): Value {
  switch(f.type()) {
    case field.NumberType:
      return new Number(f);
    default:
      return null;
  }
}
