import { Form } from "./form";
import { expect } from 'chai';
import { isEqual } from 'lodash';

const example = {
  url: "test-form",
  owner: {
    id: 42,
    name: "test",
    picture: "img.jpg",
  },
  created: "2017-02-17T13:06:32.096363Z",
  updated: "2017-03-17T13:06:32.096363Z",
  proto: 2,
  version: 4,
  states: true,
  name: "test form",
  description: "some test form."
}

describe('form', () => {
  it('should deserialize', () => {
    let f = new Form().deserialize(example);
    expect(f.url).to.equal("test-form");
    expect(f.created.getMonth()).to.equal(1);
    expect(f.updated.getMonth()).to.equal(2);
  });

  it('should serialize', () => {
    let f = new Form().deserialize(example)
    let obj = f.serialize()

    // expect(obj.created).to.equal(example.created);
    // expect(isEqual(obj, example)).to.equal(true);
  });

});
