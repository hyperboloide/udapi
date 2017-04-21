export * from './field';
export * from './fsm';

export * from './display';
export * from './form';
export * from './managed';
export * from './section';


import { Session, HTTPPromise } from '../http';
import { Form } from './form';
import { EditableForm } from './managed';

export const url = "/forms"

export function Get(s: Session, formUrl: string): HTTPPromise<EditableForm> {
  let tr = (obj) => new EditableForm(s).deserialize(obj);
  return s.GET(tr, url, '/', formUrl);
}

export function Insert(s: Session, form: Form): HTTPPromise<EditableForm> {
  let tr = (obj) => new EditableForm(s).deserialize(obj);
  return s.POST(tr, form.serialize(), url);
}

export function Update(s: Session, form: Form): HTTPPromise<EditableForm> {
  let tr = (obj) => new EditableForm(s).deserialize(obj);
  return s.PUT(tr, form.serialize(), url, '/', form.url);
}

export function Remove(s: Session, formUrl: string): HTTPPromise<any> {
    return s.DELETE(url, '/', formUrl);
}
