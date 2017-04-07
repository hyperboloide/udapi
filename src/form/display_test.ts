import { expect } from 'chai';
import { isEqual, isEmpty } from 'lodash';

import { Form } from "./form";
import { ExampleForm } from "./form_test";
import { Display } from "./display";

export const ExampleDisplay = [1, 2, 3]

describe('display', () => {

  it('should deserialize', () => {
    let d = new Display().deserialize(ExampleDisplay);
    expect(d.index({id: 1})).to.equal(0);
    expect(d.index({id: 2})).to.equal(1);
    expect(d.index({id: 3})).to.equal(2);
  });

  it('should serialize', () => {
    let d = new Display().deserialize(ExampleDisplay);
    let obj = d.serialize()
    expect(isEqual(obj, ExampleDisplay)).to.equal(true);
  });

  it('should index', () => {
    let d = new Display().deserialize(ExampleDisplay);
    expect(d.index({id: 1})).to.equal(0);
    expect(d.index({id: 42})).to.equal(-1);
  });

  it('should has', () => {
    let d = new Display().deserialize(ExampleDisplay);
    expect(d.has({id: 1})).to.equal(true);
    expect(d.has({id:42})).to.equal(false);
  });

  it('should add', () => {
    let d = new Display().deserialize(ExampleDisplay);
    d.add({id: 42})
    expect(d.has({id: 42})).to.equal(true);
    expect(d.index({id: 42})).to.equal(3);
  });

  it('should canMoveDown', () => {
    let d = new Display().deserialize(ExampleDisplay);
    expect(d.canMoveDown({id: 1})).to.equal(true);
    expect(d.canMoveDown({id: 2})).to.equal(true);
    expect(d.canMoveDown({id: 42})).to.equal(false);
    expect(d.canMoveDown({id: 3})).to.equal(false);
  });

  it('should canMoveUp', () => {
    let d = new Display().deserialize(ExampleDisplay);
    expect(d.canMoveUp({id: 2})).to.equal(true);
    expect(d.canMoveUp({id: 3})).to.equal(true);
    expect(d.canMoveUp({id: 42})).to.equal(false);
    expect(d.canMoveUp({id: 1})).to.equal(false);
  });

  it('should moveUp', () => {
    let d = new Display().deserialize(ExampleDisplay);
    d.moveUp({id: 1});
    expect(d.index({id: 1})).to.equal(0);
    d.moveUp({id: 2});
    expect(d.index({id: 2})).to.equal(0);
    expect(d.index({id: 1})).to.equal(1);
    expect(d.index({id: 3})).to.equal(2);
  });

  it('should moveDown', () => {
    let d = new Display().deserialize(ExampleDisplay);
    d.moveDown({id: 3});
    expect(d.index({id: 3})).to.equal(2);
    d.moveDown({id: 2});
    expect(d.index({id: 2})).to.equal(2);
    expect(d.index({id: 3})).to.equal(1);
  });

  it('should remove', () => {
    let d = new Display().deserialize(ExampleDisplay);
    d.remove({id: 1});
    expect(d.index({id: 1})).to.equal(-1);
    expect(d.index({id: 2})).to.equal(0);
    expect(d.index({id: 3})).to.equal(1);
  });

})
