import { expect } from 'chai';
import { isEqual } from 'lodash';

import { Field } from "./field";
import { DateField } from "./date";

export const exampleDateField = {
  name: "example",
  help: "help",
  mandatory: true,
  type: "date",
  default: "2017-02-17T13:06:32.096Z",
}

describe('field date', () => {

  it('should deserialize', () => {
    let f = new DateField(42).deserialize(exampleDateField);
    expect(f.type()).to.equal("date");
    expect(f.default.getTime()).to.equal(new Date("2017-02-17T13:06:32.096Z").getTime());
  });

  it('should serialize', () => {
    let f = new DateField(42).deserialize(exampleDateField);
    let obj = f.serialize();
    expect(isEqual(obj, exampleDateField)).to.equal(true);
  });

});
