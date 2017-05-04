import { expect } from 'chai';
import { isEqual, isEmpty } from 'lodash';

import { Field } from './field';
import { Multiple } from './multiple';
import { ChoiceValue } from './choice';

export const exampleChoiceValue = {
  id: 1, label:"value 1",
}

export const exampleChoice = {
  name: "example",
  help: "help",
  mandatory: true,
  type: "multiple",
  values: [
    {id: 1, label:"value 1"},
    {id: 2, label:"value 2"},
    {id: 3, label:"value 3"},
    {id: 4, label:"value 4"},
  ]
}

describe('field choice', () => {

  describe('ChoiceValue', () => {

    it('should deserialize', () => {
      let cv = new ChoiceValue(1).deserialize(exampleChoiceValue);
      expect(cv.id).to.equal(1);
      expect(cv.label).to.equal("value 1");
    });

    it('should serialize', () => {
      let cv = new ChoiceValue(1).deserialize(exampleChoiceValue);
      let obj = cv.serialize();
      expect(isEqual(obj, exampleChoiceValue)).to.equal(true);
    });
  })

  it('should deserialize', () => {
    let f = new Multiple(42).deserialize(exampleChoice);
    expect(f.type()).to.equal("multiple");
    expect(f.isEmpty()).to.equal(false);
    expect(f.values.size).to.equal(4);
    const cmp = isEqual(f.values.get(1).serialize(), {id: 1, label:"value 1"});
    expect(cmp).to.equal(true);
  });
  //
  it('should serialize', () => {
    let f = new Multiple(42).deserialize(exampleChoice);
    let obj = f.serialize();
    expect(isEqual(obj, exampleChoice)).to.equal(true);
  });

  it('should isEmpty', () => {
    let f = new Multiple(42).deserialize(exampleChoice);
    expect(f.isEmpty()).to.equal(false);

    let fEmpty = new Multiple(42).deserialize({
      name: "example",
      help: "help",
      mandatory: true,
      type: "multiple",
      values: [],
    });
    expect(fEmpty.isEmpty()).to.equal(true);
  });

  it("should getValue", () => {
    let f = new Multiple(42).deserialize(exampleChoice);
    const cmp = isEqual(f.getValue(1).serialize(), {id: 1, label:"value 1"});
    expect(cmp).to.equal(true);
  })

  it("should createValue", () => {
    let f = new Multiple(42).deserialize(exampleChoice);
    let v = f.createValue(5, 'test');
    expect(v.id).to.equal(5);
    expect(v.label).to.equal('test');
    expect(isEmpty(f.getValue(v.id))).to.equal(false);
    expect(f.display.has(v)).to.equal(true);
  })

  it("should removeValue", () => {
    let f = new Multiple(42).deserialize(exampleChoice);
    let v = f.getValue(1);

    f.removeValue(v);
    expect(isEmpty(f.getValue(1))).to.equal(true);
    expect(f.display.has(v)).to.equal(false);
  })

  it("should valueIndex", () => {
    let f = new Multiple(42).deserialize(exampleChoice);
    let v = f.getValue(1);

    expect(f.valueIndex(f.getValue(1))).to.equal(0);
    expect(f.valueIndex(f.getValue(4))).to.equal(3);
  })

});
