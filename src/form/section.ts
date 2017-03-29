import { isObject, } from 'lodash';

import { ValidableObject } from '../interfaces';
import { Displayable } from './display';

export class Section extends ValidableObject implements Displayable {
  readonly id: number;
  html: string;

  constructor(id: number) {
    super();
    this.id = id;
  }

  serialize(): any {
    return {
      ...super.serialize(),
      html: this.html,
    }
  }

  deserialize(obj: any): Section {
    super.deserialize(obj);
    this.html = obj.html;
    return this;
  }
}
