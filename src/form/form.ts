import { isEmpty, isObject, each, toSafeInteger, map, last, head } from 'lodash';

import { ValidableObject } from '../interfaces';
import { User } from '../user/user';
import { Section } from './section';
import { Field, extract } from './field';
import { FSM } from './fsm';
import { Displayable } from './displayable';


export class Form extends ValidableObject {
  url: string = "";
  owner: User;
  created: Date;
  updated: Date;
  proto: number = 2;
  version: number = 0;
  states: boolean = false;
  name: string = "";
  description: string = "";

  fields: Map<number, Field> = new Map();
  sections: Map<number, Section> = new Map();
  display: Array<number> = new Array();
  fsm: FSM;

  isEmpty(): boolean {
    return this.fields.size == 0;
  }

  isNew(): boolean {
    return this.version == 0;
  }

  hasField(id: number): boolean {
    return this.fields.has(id);
  }

  getField(id: number): Field {
    return this.fields.get(id);
  }

  getSection(id: number): Section {
    return this.sections.get(id);
  }

  displayIndex(obj: Displayable): number {
    return this.display.findIndex((id) => id == obj.id);
  }

  displayCanMoveDown(obj: Displayable): boolean {
    return obj.id != last(this.display);
  }

  displayCanMoveUp(obj: Displayable): boolean {
     return obj.id != head(this.display);
  }

  serialize(): any {
    let fields = {};
    this.fields.forEach((f, id) => fields[`${id}`] = f.serialize());

    let sections = {};
    this.sections.forEach((s, id) => sections[`${id}`] = s.serialize());

    return {
      ...super.serialize(),
      url: this.url,
      owner: this.owner.serialize(),
      created: this.created.toJSON(),
      updated: this.updated.toJSON(),
      proto: this.proto,
      version: this.version,
      states: this.states,
      name: this.name,
      description: this.description,
      fields: fields,
      sections: sections,
      display: this.display,
      fsm: this.fsm.serialize(),
    }
  }

  deserialize(obj: any): Form {
    super.deserialize(obj);

    if (isEmpty(obj)) {
      return this;
    }
    this.url = obj.url;
    if (isObject(obj.owner)) {
      this.owner = new User().deserialize(obj.owner);
    }
    if (!isEmpty('created')) {
      this.created = new Date(obj.created);
    }
    if (!isEmpty('updated')) {
      this.updated = new Date(obj.updated);
    }

    this.proto = obj.proto;
    this.version = obj.version;
    this.states = obj.states;
    this.name = obj.name;
    this.description = obj.description;

    this.fields = new Map();
    each(obj.fields, (v, k) => {
      let id = toSafeInteger(k);
      this.fields.set(id, extract(id, v));
    })

    this.sections = new Map();
    each(obj.sections, (v, k) => {
      let id = toSafeInteger(k);
      this.sections.set(id, new Section(id).deserialize(v));
    })

    this.display = map(obj.display, toSafeInteger);

    if (isObject(obj.fsm)) {
      this.fsm = new FSM().deserialize(obj.fsm);
    }

    return this;
  }
}
