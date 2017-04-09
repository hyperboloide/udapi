import { expect } from 'chai';
import { isEqual, isEmpty } from 'lodash';

import { Field } from "./field";
import { Embedded, EmbeddedType, EmbeddedOptions } from "./embedded";


export const exampleEmbeddedOptions = {min: 2, max: 10};

export const exampleEmbedded = {
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

describe('field embedded', () => {

  describe('EmbeddedOptions', () => {
    it('should deserialize', () => {
      let ro = new EmbeddedOptions().deserialize(exampleEmbeddedOptions);
      expect(ro.min).to.equal(2);
      expect(ro.max).to.equal(10);
    });

    it('should serialize', () => {
      let ro = new EmbeddedOptions().deserialize(exampleEmbeddedOptions);
      let obj = ro.serialize();
      expect(isEqual(obj, exampleEmbeddedOptions)).to.equal(true);
    });
  })

  it('should deserialize', () => {
    let f = new Embedded(42).deserialize(exampleEmbedded);
    expect(f.type()).to.equal("embedded");
    expect(f.options.min).to.equal(2);
  });

  it('should serialize', () => {
    let f = new Embedded(42).deserialize(exampleEmbedded);
    let obj = f.serialize();
    expect(isEqual(obj, exampleEmbedded)).to.equal(true);
  });

  it('should isEmpty', () => {
    let f = new Embedded(42).deserialize(exampleEmbedded);
    expect(f.isEmpty()).to.equal(false);
  });

  it('should hasField', () => {
    let f = new Embedded(42).deserialize(exampleEmbedded);
    expect(f.hasField(1)).to.equal(true);
    expect(f.hasField(2)).to.equal(false);
  });

  it('should hasFieldsOfType', () => {
    let f = new Embedded(42).deserialize(exampleEmbedded);
    expect(f.hasFieldsOfType("boolean")).to.equal(true);
    expect(f.hasFieldsOfType("file")).to.equal(false);
  });

  it('should getField', () => {
    let f = new Embedded(42).deserialize(exampleEmbedded);
    expect(f.getField(1).type()).to.equal("boolean");
    expect(isEmpty(f.getField(2))).to.equal(true);
  });

  it('should getFieldsOfType', () => {
    let f = new Embedded(42).deserialize(exampleEmbedded);
    expect(f.getFieldsOfType("boolean").length).to.equal(1);
    expect(f.getFieldsOfType("boolean")[0].id).to.equal(1);
    expect(f.getFieldsOfType("reference").length).to.equal(0);
  });

});
