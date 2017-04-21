export * from './field';
export * from './fsm';

export * from './display';
export * from './form';
export * from './section';

import { Session, HTTPPromise } from '../http';

export const url = "/forms"
// 
// export function Insert(s: Session, form: Form) Promise<Form> {
//
//   return new Promise<Form>((resolve, reject) => {
//     s.post(form.serialize(), '/forms').then(
//       (resp) => {
//         new Form().deserialize(resp.data.data)
//
//       },
//       (resp) => {
//
//       }
//     )
//   })
// }
