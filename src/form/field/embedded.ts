// 
// import { Field } from './field';
// import { Displayable } from '../form';
//
// export class EmbeddedOptions {
//   max: number = 99;
//   min: number = 1;
// }
//
// export class Embedded extends Field {
//
//   options: EmbeddedOptions = new EmbeddedOptions();
//
//   type(): string {
//     return "embedded";
//   }
//
//   hasField(id: number): boolean {
//     return this.fields.has(id);
//   }
//
//   getField(id: number): Field {
//     return this.fields.get(id);
//   }
//
//   displayIndex(obj: Displayable): number {
//     return this.display.findIndex((id) => id == obj.id);
//   }
//
//   displayCanMoveDown(obj: Displayable): boolean {
//     return obj.id != last(this.display);
//   }
//
//   displayCanMoveUp(obj: Displayable): boolean {
//      return obj.id != head(this.display);
//   }
// }
