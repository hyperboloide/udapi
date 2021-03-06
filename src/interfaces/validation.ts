import { Serializable } from './basic';

import { each, isArray, isObject, toSafeInteger, isEmpty, isNil } from 'lodash';

export interface ValidationContainer {
  errors: any;
  hasErrors(): boolean;
  setErrors(errors: any);
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

export class ValidationList implements ValidationContainer {
  errors: Array<ValidationError> = new Array();

  hasErrors(): boolean {
    return this.errors.length > 0;
  }

  setErrors(obj: any) {
    this._extract(obj);
  }

  first(): ValidationError {
    if (this.hasErrors()) {
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
    return this._extract(obj);
  }

  private _extract(obj: any): ValidationList {
    this.errors = new Array();
    if (isArray(obj)) {
      each(obj, (e) =>
        this.errors.push(new ValidationError().deserialize(e)));
    }
    return this;
  }

}

export class ValidableObject implements ValidationContainer, Serializable {
  errors: Map<string, ValidationList> = new Map();

  hasErrors(): boolean {
    return this.errors.size > 0;
  }

  hasChildErrors(): boolean {
    return false;
  }

  setErrors(obj: any) {
    this._extract(obj);
  }

  serialize(): any {
    let res = {};
    this.errors.forEach((e, id) => res[`${id}`] = e.serialize());
    if (isEmpty(res)) {
      return {};
    }
    return {errors: res};
  }

  deserialize(obj: any): ValidableObject {
    if (!isEmpty(obj)) {
        this._extract(obj.errors);
    }
    return this;
  }

  private _extract(obj: any): ValidableObject {
    this.errors = new Map();
    if (isObject(obj)) {
      each(obj, (v, k) => {
        let id = toSafeInteger(k);
        let l = new ValidationList().deserialize(v);
        if (l.hasErrors()) {
            this.errors.set(k, l);
        }
      });
    }
    return this;
  }
}

export class ValidableProperty implements ValidationContainer {
  errors: ValidationContainer = new ValidationList();

  hasErrors(): boolean {
    return !isNil(this.errors) && this.errors.hasErrors();
  }

  hasChildErrors(): boolean {
    return false;
  }

  setErrors(obj: any) {
    this.errors = new ValidationList().deserialize(obj);
  }
}
