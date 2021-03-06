import { isEmpty, isObject, each, toSafeInteger, omitBy, isNil } from 'lodash';

import { ValidableObject } from '../interfaces';
import { User } from '../user/user';
import { Section } from './section';
import { Field, FieldContainer, extract, create, Embedded } from './field';
import { FSM, State } from './fsm';
import { Displayable, Display } from './display';


export class Form extends ValidableObject implements FieldContainer {
  url: string = "";
  owner: User;
  created?: Date;
  updated?: Date;
  proto: number = 2;
  version: number = 0;
  states: boolean = false;
  name: string = "";
  description: string = "";

  fields: Map<number, Field> = new Map();
  sections: Map<number, Section> = new Map();
  display: Display = new Display();
  fsm: FSM = new FSM();

  private _nextid: number = 0;

  nextid(): number {
    return this._nextid += 1;
  }

  isNew(): boolean {
    return this.version == 0;
  }

  isEmpty(): boolean {
    return this.fields.size == 0;
  }

  hasField(id: number): boolean {
    return this.fields.has(id);
  }

  hasEmbeddedField(id: number): boolean {
    for (let emb of this.getEmbeddeds()) {
      if (emb.hasField(id)) {
        return true;
      }
    }
    return false;
  }

  hasFieldsOfType(t: string): boolean {
    for (let [id, field] of this.fields) {
      if (field.type() == t) {
        return true;
      }
    }
    return false;
  }

  hasEmbeddedFieldsOfType(t: string): boolean {
    for (let emb of this.getEmbeddeds()) {
      if (emb.hasFieldsOfType(t)) {
        return true;
      }
    }
    return false;
  }

  addField(type, name: string = '', state?: State): Field {
    let f = create(this.nextid(), type);
    f.name = name;
    this.fields.set(f.id, f);
    this.display.add(f);

    if (isNil(state)) {
      this.fsm.addField(f);
    } else {
      state.addField(f);
    }
    return f;
  }

  addEmbeddedField(emb: Embedded, type, name: string = ''): Field {
    if (!this.hasField(emb.id)) {
      return;
    }
    let f = create(this.nextid(), type);
    f.name = name;
    emb.fields.set(f.id, f);
    emb.display.add(f);

    this.fsm.addField(f);
    return f;

  }

  getField(id: number): Field {
    return this.fields.get(id);
  }

  getFieldsOfType(t: string): Array<Field> {
    let res = new Array<Field>();
    for (let [id, field] of this.fields) {
      if (field.type() == t) {
        res.push(field);
      }
    }
    return res;
  }

  getEmbeddedField(id: number): [Embedded, Field] {
    for (let emb of this.getEmbeddeds()) {
      if (emb.hasField(id)) {
        return [emb, emb.getField(id)];
      }
    }
    return [null, null];
  }

  getEmbeddeds(): Array<Embedded> {
    let res = new Array<Embedded>();
    for (let [id, field] of this.fields) {
      if (field.type() == "embedded" && (<Embedded>field)) {
        res.push((<Embedded>field));
      }
    }
    return res;
  }

  removeField(f: Field) {
    if (this.hasField(f.id)) {
      if (f.type() == "embedded") {
        let emb = (<Embedded>f);
         emb.fields.forEach((f) => this.removeField(f));
      }
      this.fields.delete(f.id);
      this.display.remove(f);
    } else {
      let [emb, res] = this.getEmbeddedField(f.id);
      if (!isEmpty(f)) {
        emb.fields.delete(res.id);
        emb.display.remove(res);
      }
    }
    this.fsm.removeField(f);
  }

  getSection(id: number): Section {
    return this.sections.get(id);
  }

  addSection(): Section {
    let s = new Section(this.nextid());
    this.sections.set(s.id, s);
    this.display.add(s);
    return s;
  }

  removeSection(s :Section) {
    this.sections.delete(s.id);
    this.display.remove(s);
  }

  addState(name: string): State {
    let s = new State(this.nextid());
    s.name = name;
    this.fsm.add(s);
    return s;
  }

  serialize(): any {
    let fields = {};
    this.fields.forEach((f, id) => fields[`${id}`] = f.serialize());

    let sections = {};
    this.sections.forEach((s, id) => sections[`${id}`] = s.serialize());

    return omitBy({
      ...super.serialize(),
      url: this.url,
      owner: this.owner ? this.owner.serialize() : null,
      created: this.created ? this.created.toJSON() : null,
      updated: this.updated? this.updated.toJSON() : null,
      proto: this.proto,
      version: this.version,
      states: this.states,
      name: this.name,
      description: this.description,
      fields: fields,
      sections: sections,
      display: this.display.serialize(),
      fsm: this.fsm.serialize(),
      nextid: this._nextid,
    }, isNil)
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
    if (!isNil(obj.created)) {
      this.created = new Date(obj.created);
    }
    if (!isNil(obj.updated)) {
      this.updated = new Date(obj.updated);
    }

    this.proto = obj.proto;
    this.version = obj.version;
    this.states = obj.states;
    this.name = obj.name;
    if (!isNil(obj.description)) {
      this.description = obj.description;
    }

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

    this.display = new Display().deserialize(obj.display);

    if (isObject(obj.fsm)) {
      this.fsm = new FSM().deserialize(obj.fsm);
    }

    this._nextid = toSafeInteger(obj.nextid);

    return this;
  }
}
