import { isString, isEmpty } from 'lodash';

import  { Field } from "./field";
import  { Boolean } from "./boolean";
import  { Embedded } from "./embedded";

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

export {
  Field,

  Boolean,
  Embedded,
}
