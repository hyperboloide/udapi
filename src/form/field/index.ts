import { isString, isEmpty } from 'lodash';

import  { Field } from "./field";
import  { Boolean } from "./boolean";
import  { DateField } from "./date";
import  { Embedded } from "./embedded";
import  { File } from "./file";
import  { Multiple } from "./multiple";

export * from './choice';

export {
  Field,
  Boolean,
  DateField,
  Embedded,
  File,
  Multiple,
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
    case "date":
      return new DateField(id);
    case "embedded":
      return new Embedded(id);
    case "File":
      return new File(id);
    case "multiple":
      return new Multiple(id);
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
