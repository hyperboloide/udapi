import { expect } from 'chai';
import { isEqual } from 'lodash';

import { Field } from "./field";
import { File } from "./file";

export const exampleFile = {
  name: "example",
  help: "help",
  mandatory: true,
  type: "file",
}

describe('field file', () => {

  it('should deserialize', () => {
    let f = new File(42).deserialize(exampleFile);
    expect(f.type()).to.equal("file");
  });

  it('should serialize', () => {
    let f = new File(42).deserialize(exampleFile);
    let obj = f.serialize();
    expect(isEqual(obj, exampleFile)).to.equal(true);
  });

});
