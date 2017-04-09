import { expect } from 'chai';
import { isEqual } from 'lodash';

import { Field } from "./field";
import { Boolean } from "./boolean";

export const exampleField = {
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

describe('field', () => {
  it('should deserialize', () => {
    let f = new Boolean(42).deserialize(exampleField);
    expect(f.id).to.equal(42);
    expect(f.name).to.equal("example");
    expect(f.help).to.equal("help");
    expect(f.mandatory).to.equal(true);
    expect(f.type()).to.equal("boolean");
    expect(f.hasErrors()).to.equal(true);

    expect(f.errors.get('name').first().code).to.equal("some.error.code");
    expect(isEqual(f.errors.get('name').first().data, {id: 42})).to.equal(true);
  });

  it('should serialize', () => {
    let f = new Boolean(42).deserialize(exampleField);
    let obj = f.serialize();
    expect(isEqual(obj, exampleField)).to.equal(true);
  });

});
