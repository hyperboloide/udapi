import { expect } from 'chai';
import { isEqual, isEmpty } from 'lodash';

import { Field } from './field';
import { Multiple } from './multiple';
import { ChoiceValue } from './choice';

export const exampleMultiple = {
  name: "example",
  help: "help",
  mandatory: true,
  type: "multiple",
  values: [
    {id: 1, label:"value 1"},
    {id: 2, label:"value 2"},
    {id: 3, label:"value 3"},
    {id: 4, label:"value 4"},
  ],
  default: [2,3],
}

describe('field multiple', () => {

  it('should deserialize', () => {
    let f = new Multiple(42).deserialize(exampleMultiple);
    expect(f.type()).to.equal("multiple");
    expect(isEqual(f.default, [2, 3])).to.equal(true);
  });

  it('should serialize', () => {
    let f = new Multiple(42).deserialize(exampleMultiple);
    let obj = f.serialize();
    expect(isEqual(obj, exampleMultiple)).to.equal(true);
  });

  it('should removeValue', () => {
    let f = new Multiple(42).deserialize(exampleMultiple);
    let v = f.getValue(2);
    expect(f.isDefault(v)).to.equal(true);

    f.removeValue(v);
    expect(f.isDefault(v)).to.equal(false);
    expect(isEmpty(f.getValue(2))).to.equal(true);
  });

  it('should isDefault', () => {
    let f = new Multiple(42).deserialize(exampleMultiple);

    expect(f.isDefault(f.getValue(1))).to.equal(false);
    expect(f.isDefault(f.getValue(2))).to.equal(true);
  });

  it('should toggleDefault', () => {
    let f = new Multiple(42).deserialize(exampleMultiple);
    let v = f.getValue(1);

    expect(f.isDefault(v)).to.equal(false);
    f.toggleDefault(v);
    expect(f.isDefault(v)).to.equal(true);
    f.toggleDefault(v);
    expect(f.isDefault(v)).to.equal(false);
  });


});
