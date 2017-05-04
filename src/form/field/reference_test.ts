import { expect } from 'chai';
import { isEqual } from 'lodash';

import { Field } from "./field";
import { Reference } from "./reference";

export const exampleReference = {
  name: "example",
  help: "help",
  mandatory: true,
  type: "reference",
  form: "some-form-url",
}

describe('field reference', () => {

  it('should deserialize', () => {
    let f = new Reference(42).deserialize(exampleReference);
    expect(f.type()).to.equal("reference");
  });

  it('should serialize', () => {
    let f = new Reference(42).deserialize(exampleReference);
    let obj = f.serialize();
    expect(isEqual(obj, exampleReference)).to.equal(true);
  });

});
