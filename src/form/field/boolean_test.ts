import { expect } from 'chai';
import { isEqual } from 'lodash';

import { Field } from "./field";
import { Boolean } from "./boolean";

export const exampleBoolean = {
  name: "example",
  help: "help",
  mandatory: true,
  type: "boolean",
  label: "lalalala",
  default: true,
}

describe('field boolean', () => {
  it('should deserialize', () => {
    let f = new Boolean(42).deserialize(exampleBoolean);
    expect(f.type()).to.equal("boolean");
    expect(f.label).to.equal("lalalala");
    expect(f.default).to.equal(true);
  });

  it('should serialize', () => {
    let f = new Boolean(42).deserialize(exampleBoolean);
    let obj = f.serialize();
    expect(isEqual(obj, exampleBoolean)).to.equal(true);
  });

});
