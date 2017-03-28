import { expect } from 'chai';
import { isEqual } from 'lodash';

import { Form } from "./form";

export const ExampleForm = {
  url: "test-form",
  owner: {
    id: 42,
    name: "test",
    picture: "img.jpg",
  },
  created: "2017-02-17T13:06:32.096Z",
  updated: "2017-03-17T13:06:32.096Z",
  proto: 2,
  version: 4,
  states: true,
  name: "test form",
  description: "some test form.",
  fields: {
    "3": {
      name: "example",
      help: "help",
      mandatory: true,
      type: "boolean",
      errors:
        {
          name: [{code: "some.error.code", data: {id: 42}}],
          help: [{code: "some.error.code", data: {id: 32}}],
        }
    }
  },
  sections: {
    "4": { html: "<h1>Section</h1>" },
  },
  display: [3],
  fsm: {
    initial: 1,
    states: {
      "1": {
        name: "example state1",
        fields: [3],
        nexts: [2],
      },
      "2": {
        name: "example state 2",
        fields: [],
        nexts: [],
      }
    },
  }
}

describe('form', () => {
  it('should deserialize', () => {
    let f = new Form().deserialize(ExampleForm);
    expect(f.url).to.equal("test-form");
    expect(f.created.getMonth()).to.equal(1);
    expect(f.updated.getMonth()).to.equal(2);
  });

  it('should serialize', () => {
    let f = new Form().deserialize(ExampleForm)
    let obj = f.serialize()
    expect(isEqual(obj, ExampleForm)).to.equal(true);
  });

});
