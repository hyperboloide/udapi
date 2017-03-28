import { each, toSafeInteger, isObject, has } from 'lodash';

import { ValidableObject } from '../../interfaces';
import { State } from './state';
import { Field } from '../field';

export class FSM extends ValidableObject {
  initial: State;
  states: Map<number, State>;

  has(id: number): boolean {
    return this.states.has(id);
  }

  length(): Number {
    return this.states.size;
  }

  get(id: number): State {
    return this.states.get(id);
  }

  all(): IterableIterator<State> {
    return this.states.values();
  }

  add(state: State) {
    if (!this.has(state.id)) {
      this.states.set(state.id, state);
    }
  }

  remove(state: State) {
    this.states.delete(state.id);
  }

  hasField(field: Field): boolean {
    for (let s of this.states.values()) {
      if (s.hasField(field)) {
        return true;
      }
    }
    return false;
  }

  addField(field: Field) {
    this.states.forEach((v) => v.addField(field));
  }

  removeField(field: Field) {
    this.states.forEach((v) => v.removeField(field));
  }

  statesFor(field: Field): Array<State>{
    let res = new Array<State>();
    for (let s of this.states.values()) {
      if (s.hasField(field)) {
        res.push(s);
      }
    }
    return res;
  }

  hasChildErrors(): boolean {
    for (let child of this.states.values()) {
      if (child.hasErrors()) {
          return true;
        }
    }
    return false;
  }

  setErrors(obj: any) {
    super.setErrors(obj);
    if (has(obj, 'states.items')) {
      let items = obj.states.items;
      each(items, (v, k) => {
        let id = toSafeInteger(k)
        if (this.has(id)) {
          this.get(id).setErrors(v);
        }
      });
    }
  }

  serialize(): any {
    let tmp = {};
    this.states.forEach((s, id) => tmp[`${id}`] = s.serialize());
    return {
      ...super.serialize(),
      initial: this.initial.id,
      states: tmp,
    };
  }

  deserialize(obj: any): FSM {
    super.deserialize(obj);
    this.states = new Map();
    if (isObject(obj.states)) {
      each(obj.states, (v, k) => {
        let id = toSafeInteger(k);
        this.states.set(id, new State(id).deserialize(v));
      });
      this.initial = this.states.get(toSafeInteger(obj.initial));
    }
    return this;
  }
}
