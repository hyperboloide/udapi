import { expect } from 'chai';
import { isEqual, isEmpty, isNil } from 'lodash';
import axios from 'axios';

import { Session } from '../http';
import { Form } from "./form";
import { Embedded, Boolean } from "./field";
import { Insert, Update, Get, Remove } from './index';
import { EditableForm } from './managed';

describe('form static api functions', () => {

  let s: Session;

  before(function () {
    if (isEmpty(process.env.UD_API_URL)) {
      this.skip();
    } else {
      let config = {
        baseURL: process.env.UD_API_URL,
        apiKey: process.env.UD_API_USER_KEY,
      }
      s = new Session(config, axios.create());
    }
  })

  let formUrl: string;

  it('should insert a form', () => {
    let form = new Form();
    form.name = "test form";
    form.addState('first');
    form.addField('text', 'name');

    return Insert(s, form).then((resp) => {
      expect(isNil(resp.data.errors)).to.equal(true);
      expect(isEmpty(resp.data.data.url)).to.equal(false);
      expect(resp.data.data instanceof EditableForm).to.equal(true);
      formUrl = resp.data.data.url;
    })
  });

  it('should get a form', () => {
    return Get(s, formUrl).then((resp) => {
      expect(resp.data.data.name).to.equal('test form');
      expect(resp.data.data instanceof EditableForm).to.equal(true);
    });
  });

  it('should update a form', () => {
    return Get(s, formUrl).then((resp) => {
      resp.data.data.name = 'updated';
      return Update(s, resp.data.data).then((resp) => {
        expect(resp.data.data.name).to.equal('updated');
        expect(resp.data.data instanceof EditableForm).to.equal(true);
      });
    })
  });

  it('should remove a form', () => {
    return Remove(s, formUrl).then((resp) => {
      return Get(s, formUrl).then(
        (resp) => expect(false).to.equal(true), // fail
        (err) => expect(err.response.status).to.equal(404),
      );
    });
  });

});
