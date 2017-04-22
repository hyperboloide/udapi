import { expect } from 'chai';
import { isEqual, isEmpty, isNil, isInteger } from 'lodash';

import * as field from '../../form/field';
import { exampleNumber } from '../../form/field/number_test';
import { Number } from './number';

describe('value number', () => {

  describe('float', () =>{
    it('should deserialize float', () => {
      let f = new field.Number(1).deserialize(exampleNumber);
      f.options.integer = false;

      let v = new Number(f).deserialize(42.7)
      expect(v.type()).to.equal("number");
      expect(v.value).to.equal(42.7);
      expect(isInteger(v.value)).to.equal(false);
    });

    it('should serialize float', () => {
      let f = new field.Number(1).deserialize(exampleNumber);
      f.options.integer = false;

      let v = new Number(f).deserialize(42.7)
      expect(v.type()).to.equal("number");
      expect(v.serialize()).to.equal(42.7);
      expect(isInteger(v.value)).to.equal(false);
    });
  })

  describe('integer', () =>{
    it('should deserialize float', () => {
      let f = new field.Number(1).deserialize(exampleNumber);
      f.options.integer = true;

      let v = new Number(f).deserialize(42.7)
      expect(v.type()).to.equal("number");
      expect(v.value).to.equal(42);
      expect(isInteger(v.value)).to.equal(true);
    });

    it('should serialize float', () => {
      let f = new field.Number(1).deserialize(exampleNumber);
      f.options.integer = true;

      let v = new Number(f).deserialize(42.7)
      expect(v.type()).to.equal("number");
      expect(v.serialize()).to.equal(42);
      expect(isInteger(v.value)).to.equal(true);
    });
  })



  // it('should serialize', () => {
  //   let f = new Number(42).deserialize(exampleNumber);
  //   let obj = f.serialize();
  //   expect(isEqual(obj, exampleNumber)).to.equal(true);
  // });

});
