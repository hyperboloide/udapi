import { expect, use } from 'chai';
import { isEqual, isEmpty, isObject } from 'lodash';
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
    let state = form.addState('first');
    let field = form.addField('text', 'name');

    let session = new Session(config, axios.create());
    return session.post(form.serialize(), '/forms').then((resp) =>
      expect(isEmpty(resp.data.data.url)).to.equal(false));
  });

})
