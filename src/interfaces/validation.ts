import { Serializable } from './serializable';

import { each, isArray, isObject, toSafeInteger, isEmpty } from 'lodash';

export interface ValidationContainer {
  hasError(): boolean
}

export interface Validable extends Serializable {
  setErrors(errors: any);
  hasErrors(): boolean;
  clearErrors();
}

export class ValidationError implements Serializable {
  code: string;
  data: any;

  serialize(): any {
    return {
      code: this.code,
      data: this.data,
    }
  }

  deserialize(obj: any): ValidationError {
    this.code = obj.code;
    this.data = obj.data;
    return this;
  }

}

export class ValidationList implements ValidationContainer, Serializable{
  errors: Array<ValidationError>;

  hasError(): boolean {
    return this.errors.length > 0;
  }

  first(): ValidationError {
    if (this.hasError()) {
      return this.errors[0];
    }
  }

  serialize(): any {
    let res = [];
    for (let e of this.errors) {
      res.push(e.serialize());
    }
    return res;
  }


  deserialize(obj: any): ValidationList {
    this.errors = new Array<ValidationError>();
    if (isArray(obj)) {
      each(obj, (e) =>
        this.errors.push(new ValidationError().deserialize(e)));
    }
    return this;
  }
}

export class ValidationMap implements ValidationContainer, Serializable {
  errors: Map<number, ValidationError>;

  hasError(): boolean {
    return this.errors.size > 0;
  }

  serialize(): any {
    let res = {};
    this.errors.forEach((e, id) => res[`${id}`] = e.serialize());
    return res;
  }


  deserialize(obj: any): ValidationMap {
    this.errors = new Map();
    if (isObject(obj)) {
      each(obj, (v, k) => {
        let id = toSafeInteger(k);
        this.errors.set(id, new ValidationError().deserialize(v));
      });
    }
    return this;
  }
}

export abstract class ValidableWithList implements Validable {
  errors: ValidationList;

  constructor() {
    this.errors = new ValidationList();
  }

  setErrors(obj: any) {
    this.errors = new ValidationList();
    if (!isEmpty(obj) || isArray(obj)) {
      this.errors.deserialize(obj)
    }
  }

  clearErrors() {
    delete this.errors;
  }

  hasErrors(): boolean {
    return !isEmpty(this.errors) && this.errors.hasError();
  }

  serialize(): any {
    if (this.hasErrors()) {
      return {errors: this.errors.serialize()};
    }
    return {}
  }

  deserialize(obj: any): ValidableWithList {
    this.setErrors(obj.errors);
    return this;
  }

}
