import { isString, isEmpty } from 'lodash';

import  { Field } from "./field";
import  { Boolean } from "./boolean";
import  { Embedded } from "./embedded";


export {
  Field,
  Boolean,
  Embedded,
}

export interface FieldContainer {
  fields: Map<number, Field>;

  isEmpty(): boolean;
  hasField(id: number): boolean;
  hasFieldsOfType(t: string): boolean;
  getField(id: number): Field;
  getFieldsOfType(t: string): Array<Field>;
}

export function create(id: number, type: string): Field {
  switch(type) {
    case "boolean":
      return new Boolean(id);
    case "embedded":
      return new Embedded(id);
    default:
      return null;
  }
}

export function extract(id: number, obj: any): Field {
  if (!isString(obj.type)) {
    return null
  }
  let res = create(id, obj.type);
  if (!isEmpty(res)) {
    res.deserialize(obj);
  }
  return res
}
