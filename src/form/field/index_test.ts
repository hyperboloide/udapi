import { expect } from 'chai';
import { isEqual, isEmpty } from 'lodash';

import { Field } from "./field";
import { create, extract } from "./index";


export const exampleField = {
  name: "embedded field",
  mandatory: false,
  type: "embedded",
  options: {min: 2, max: 10},
  display:[1],
  fields: {
    "1": {
      name: "boolean embedded field",
      mandatory: true,
      type: "boolean",
    }
  }
}

describe('field / index', () => {

  it('should create', () => {
    expect(isEmpty(create(1, "wrong"))).to.equal(true);

    expect(create(1, "boolean").type()).to.equal("boolean");
    expect(create(1, "date").type()).to.equal("date");
    expect(create(1, "embedded").type()).to.equal("embedded");
    expect(create(1, "file").type()).to.equal("file");
    expect(create(1, "multiple").type()).to.equal("multiple");
    expect(create(1, "number").type()).to.equal("number");
    expect(create(1, "radio").type()).to.equal("radio");
    expect(create(1, "reference").type()).to.equal("reference");
    expect(create(1, "text").type()).to.equal("text");
  });

  it('should extract', () => {
    let f = extract(42, exampleField);

    expect(f.type()).to.equal("embedded");
    expect(f.id).to.equal(42);
  });

});
