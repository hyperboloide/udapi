// import { toSafeInteger} from 'lodash';
//
// import { Field, create } from './field';
// import { Section } from './section';
// import { Form } from './form';
// import { Displayable } from './display;'
//
// export class EditableForm extends Form {
//
//   private _nextid: number = 0;
//
//   nextid(): number {
//     return this._nextid += 1;
//   }
//
//   createField(type, name: string = ''): Field {
//     let f = create(this.nextid(), type);
//     f.name = name;
//     this.fields.set(f.id, f);
//     this.fsm.addField(f);
//     this.display.push(f.id);
//     return f;
//   }
//
//   addSection(): Section {
//     let s = new Section(this.nextid());
//     this.sections.set(s.id, s);
//     this.display.push(s.id);
//     return s;
//   }
//
//   removeSection(s :Section) {
//     this.sections.delete(s.id);
//     this.displayRemove(s);
//   }
//
//   displayMoveUp(d: Displayable) {
//     if (this.displayCanMoveUp(d)) {
//       let idx = this.displayIndex(d);
//       let tmp = this.display[idx];
//       this.display[idx] =  this.display[idx - 1];
//       this.display[idx - 1] = tmp;
//     }
//   }
//
//   displayMoveDown(d: Displayable) {
//     if (this.displayCanMoveDown(d)) {
//       let idx = this.displayIndex(d);
//       let tmp = this.display[idx];
//       this.display[idx] = this.display[idx + 1];
//       this.display[idx + 1] = tmp;
//     }
//   }
//
//   private displayRemove(d :Displayable) {
//     let idx = this.displayIndex(d);
//     this.display.splice(idx, 1);
//   }
//
//   serialize(): any {
//     return {
//       ...super.serialize(),
//       nextid: this._nextid,
//     };
//   }
//
//   deserialize(obj: any): EditableForm {
//     super.deserialize(obj);
//     this._nextid = toSafeInteger(obj.nextid);
//     return this;
//   }
//
// }
