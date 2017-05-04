// import { isBoolean, get, toNumber, isNil } from 'lodash';
//
// import { Value } from './value';
// import * as field from '../../form/field';
//
// export class Boolean extends Value<number, field.Boolean> {
//
//   deserialize(obj: any): Number {
//     this.value = null;
//     if (!isNil(obj) && isNumber(obj)) {
//       if(get(this.field, 'options.integer')) {
//         this.value = toSafeInteger(obj);
//       } else {
//         this.value = toNumber(obj);
//       }
//     }
//     return this;
//   }
//
//   serialize(): any {
//     return this.value;
//   }
//
// }
