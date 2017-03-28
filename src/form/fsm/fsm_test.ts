import { FSM } from "./fsm";
import { expect } from 'chai';
import { isEqual } from 'lodash';

const example = {
  initial: 1,
  states: {
    "1": {
      name: "example state1",
      fields: [1, 2, 3],
      nexts: [2],
    },
    "2": {
      name: "example state 2",
      fields: [1, 2, 3],
      nexts: [],
    }
  },
  errors: { initial: [{code: "some.error.code", data: {id: 42}}] }
}

describe('fsm', () => {
  it('should deserialize', () => {
    let fsm = new FSM().deserialize(example);
    expect(fsm.initial).to.equal(fsm.get(1));
    expect(fsm.hasErrors()).to.equal(true);
  });

  it('should serialize', () => {
    let fsm = new FSM().deserialize(example);
    let obj = fsm.serialize();
    expect(isEqual(obj, example)).to.equal(true);
  });

  it('should setErrors', () => {
    let fsm = new FSM().deserialize(example);
    expect(fsm.hasErrors()).to.equal(true);
    expect(isEqual(fsm.errors.get('initial').first().data,{id: 42})).to.equal(true);
    expect(fsm.get(2).hasErrors()).to.equal(false);


    fsm.setErrors({
      states: {
        items: {
          "2": { name: [{code: "some.error.code", data: {id: 42}}] }
        }
      }
    });
    expect(fsm.get(2).hasErrors()).to.equal(true);
    expect(fsm.hasErrors()).to.equal(false);
    expect(fsm.hasChildErrors()).to.equal(true);
  })

});
