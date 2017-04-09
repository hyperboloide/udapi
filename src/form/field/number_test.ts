import { expect } from 'chai';
import { isEqual, isEmpty, isNil } from 'lodash';

import { Field } from './field';
import { Number, NumberOptions } from './number';
import { ChoiceValue } from './choice';

export const exampleNumberOptions = {integer: true};

export const exampleNumber = {
  name: "example",
  help: "help",
  mandatory: true,
  type: "number",
  default: 2,
  options: {integer: true},
}

describe('field number', () => {

  describe('NumberOptions', () => {
    it('should deserialize', () => {
      let ro = new NumberOptions().deserialize(exampleNumberOptions);
      expect(ro.integer).to.equal(true);
    });

    it('should serialize', () => {
      let ro = new NumberOptions().deserialize(exampleNumberOptions);
      let obj = ro.serialize();
      expect(isEqual(obj, exampleNumberOptions)).to.equal(true);
    });
  })

  it('should deserialize', () => {
    let f = new Number(42).deserialize(exampleNumber);
    expect(f.type()).to.equal("number");
    expect(f.default).to.equal(2);
    expect(f.options.integer).to.equal(true);
  });

  it('should serialize', () => {
    let f = new Number(42).deserialize(exampleNumber);
    let obj = f.serialize();
    expect(isEqual(obj, exampleNumber)).to.equal(true);
  });

});
