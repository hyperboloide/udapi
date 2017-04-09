import { isString, isEmpty } from 'lodash';

import  { Field } from "./field";
import  { Boolean, BooleanType } from "./boolean";
import  { DateField, DateFieldType } from "./date";
import  { Embedded, EmbeddedType } from "./embedded";
import  { File, FileType } from "./file";
import  { Multiple, MultipleType } from "./multiple";
import  { Number, NumberType } from "./number";
import  { Radio, RadioType } from "./radio";
import  { Reference, ReferenceType } from "./reference";
import  { Text, TextType } from "./text";

export * from './choice';
export {
  Field,
  Boolean,    BooleanType,
  DateField,  DateFieldType,
  Embedded,   EmbeddedType,
  File,       FileType,
  Multiple,   MultipleType,
  Number,     NumberType,
  Radio,      RadioType,
  Reference,  ReferenceType,
  Text,       TextType,
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
    case BooleanType:
      return new Boolean(id);
    case DateFieldType:
      return new DateField(id);
    case EmbeddedType:
      return new Embedded(id);
    case FileType:
      return new File(id);
    case MultipleType:
      return new Multiple(id);
    case NumberType:
      return new Number(id);
    case RadioType:
      return new Radio(id);
    case ReferenceType:
      return new Reference(id);
    case TextType:
      return new Text(id);
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
