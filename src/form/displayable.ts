import { isEmpty, isObject, each, toSafeInteger, map, last, head } from 'lodash';

import { Field } from './field';

export interface Displayable {
  id: number;
}

export class DisplayableContainer {

  display: Array<number> = new Array();

  displayIndex(obj: Displayable): number {
    return this.display.findIndex((id) => id == obj.id);
  }

  displayHas(id: number): boolean {
    return this.displayIndex({id: id}) != -1;
  }

  displayCanMoveDown(obj: Displayable): boolean {
    return obj.id != last(this.display);
  }

  displayCanMoveUp(obj: Displayable): boolean {
     return obj.id != head(this.display);
  }

}

class EdiableDisplayableContainer extends DisplayableContainer {

  displayMoveUp(d: Displayable) {
    if (this.displayCanMoveUp(d)) {
      let idx = this.displayIndex(d);
      let tmp = this.display[idx];
      this.display[idx] =  this.display[idx - 1];
      this.display[idx - 1] = tmp;
    }
  }

  displayMoveDown(d: Displayable) {
    if (this.displayCanMoveDown(d)) {
      let idx = this.displayIndex(d);
      let tmp = this.display[idx];
      this.display[idx] = this.display[idx + 1];
      this.display[idx + 1] = tmp;
    }
  }

  protected displayRemove(d :Displayable) {
    let idx = this.displayIndex(d);
    this.display.splice(idx, 1);
  }
}
