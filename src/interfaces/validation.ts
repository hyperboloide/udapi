import { Serializable } from './basic';

import { each, isArray, isObject, toSafeInteger, isEmpty } from 'lodash';

export interface ValidationContainer extends Serializable {
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
    return this._extract(obj);
  }

  private _extract(obj: any): ValidableObject {
    this.errors = new Map();
    if (isObject(obj.errors)) {
      each(obj.errors, (v, k) => {
        let id = toSafeInteger(k);
        this.errors.set(k, new ValidationList().deserialize(v));
      });
    }
    return this;
  }
}


//
// export class ValidationList implements ValidationContainer, Serializable{
//   errors: Array<ValidationError>;
//
//   hasErrors(): boolean {
//     return this.errors.length > 0;
//   }
//
//   setErrors(errs: any) {
//     this.errors = new Array<ValidationError>();
//     if (isArray(obj)) {
//       each(obj, (e) =>
//         this.errors.push(new ValidationError().deserialize(e)));
//     }
//   }
//
//   // first(): ValidationError {
//   //   if (this.hasErrors()) {
//   //     return this.errors[0];
//   //   }
//   // }
//
//   serialize(): any {
//     let res = [];
//     for (let e of this.errors) {
//       res.push(e.serialize());
//     }
//     return res;
//   }
//
//
//   deserialize(obj: any): ValidationList {
//     this.errors = new Array<ValidationError>();
//     if (isArray(obj)) {
//       each(obj, (e) =>
//         this.errors.push(new ValidationError().deserialize(e)));
//     }
//     return this;
//   }
// }
