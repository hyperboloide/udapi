import { expect, use } from 'chai';
import { isEqual, isEmpty, isObject, isNil } from 'lodash';
import axios from 'axios';

import { Session } from './session';
import { Form, State } from '../form';


describe('http session - on server', () => {

  let config = {
    baseURL: process.env.UD_API_URL,
    apiKey: process.env.UD_API_USER_KEY,
  }

  before(function () {
    if (isEmpty(process.env.UD_API_URL)) {
      this.skip();
    }
  })

  it('should create a form', () => {
    let form = new Form();
    form.name = "http test form";
    form.addState('first');
    form.addField('text', 'name');

    let session = new Session(config, axios.create());
    let tr = (obj) => new Form().deserialize(obj);
    return session.POST(tr, form.serialize(), '/forms').then((resp) => {
      expect(isNil(resp.data.errors)).to.equal(true);
      expect(isEmpty(resp.data.data.url)).to.equal(false);
      expect(resp.data.data instanceof Form).to.equal(true)
    })
  });

})
