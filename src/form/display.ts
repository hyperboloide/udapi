import { isEmpty, isObject, each, toSafeInteger, map, last, head } from 'lodash';

import { Serializable } from '../interfaces';
import { Field } from './field';

export interface Displayable {
  id: number;
}

export class Display implements Serializable {

  items: Array<number> = new Array();

  index(obj: Displayable): number {
    return this.items.findIndex((id) => id == obj.id);
  }

  has(obj: Displayable): boolean {
    return this.index(obj) != -1;
  }

  add(obj: Displayable) {
    if (!this.has(obj)) {
      this.items.push(obj.id);
    }
  }

  canMoveDown(obj: Displayable): boolean {
    return this.has(obj) && obj.id != last(this.items);
  }

  canMoveUp(obj: Displayable): boolean {
     return this.has(obj) && obj.id != head(this.items);
  }

  moveUp(d: Displayable) {
    if (this.canMoveUp(d)) {
      let idx = this.index(d);
      let tmp = this.items[idx];
      this.items[idx] =  this.items[idx - 1];
      this.items[idx - 1] = tmp;
    }
  }

  moveDown(d: Displayable) {
    if (this.canMoveDown(d)) {
      let idx = this.index(d);
      let tmp = this.items[idx];
      this.items[idx] = this.items[idx + 1];
      this.items[idx + 1] = tmp;
    }
  }

  remove(d :Displayable) {
    let idx = this.index(d);
    this.items.splice(idx, 1);
  }

  serialize(): any {
    return this.items;
  }

  deserialize(obj: any): Display {
    this.items = new Array();
    each(obj, (v) => this.items.push(toSafeInteger(v)))
    return this;
  }

}
