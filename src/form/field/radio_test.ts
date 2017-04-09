import { expect } from 'chai';
import { isEqual, isEmpty, isNil } from 'lodash';

import { Field } from './field';
import { Radio, RadioOptions } from './radio';
import { ChoiceValue } from './choice';

export const exampleRadioOptions = {display: 'select'};

export const exampleRadio = {
  name: "example",
  help: "help",
  mandatory: true,
  type: "radio",
  values: [
    {id: 1, label:"value 1"},
    {id: 2, label:"value 2"},
    {id: 3, label:"value 3"},
    {id: 4, label:"value 4"},
  ],
  default: 2,
  options: {
    display: 'select'
  }
}

describe('field radio', () => {

  describe('RadioOptions', () => {
    it('should deserialize', () => {
      let ro = new RadioOptions().deserialize(exampleRadioOptions);
      expect(ro.display).to.equal("select");
    });

    it('should serialize', () => {
      let ro = new RadioOptions().deserialize(exampleRadioOptions);
      let obj = ro.serialize();
      expect(isEqual(obj, exampleRadioOptions)).to.equal(true);
    });
  })

  it('should deserialize', () => {
    let f = new Radio(42).deserialize(exampleRadio);
    expect(f.type()).to.equal("radio");
    expect(f.default).to.equal(2);
    expect(f.options.display).to.equal('select');
  });

  it('should serialize', () => {
    let f = new Radio(42).deserialize(exampleRadio);
    let obj = f.serialize();
    expect(isEqual(obj, exampleRadio)).to.equal(true);
  });

  it('should removeValue', () => {
    let f = new Radio(42).deserialize(exampleRadio);
    let v = f.getValue(2);
    expect(f.isDefault(v)).to.equal(true);

    f.removeValue(v);
    expect(f.isDefault(v)).to.equal(false);
    expect(isNil(f.default)).to.equal(true);
  });

  it('should isDefault', () => {
    let f = new Radio(42).deserialize(exampleRadio);

    expect(f.isDefault(f.getValue(2))).to.equal(true);
    expect(f.isDefault(f.getValue(3))).to.equal(false);
  });

  it('should setDefault', () => {
    let f = new Radio(42).deserialize(exampleRadio);
    let v = f.getValue(2);
    expect(f.isDefault(v)).to.equal(true);

    f.setDefault(null)
    expect(f.isDefault(v)).to.equal(false);
    f.setDefault(v)
    expect(f.isDefault(v)).to.equal(true);
  });

});
