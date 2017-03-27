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
}

describe('fsm', () => {
  it('should deserialize', () => {
    let fsm = new FSM().deserialize(example);
    expect(fsm.initial).to.equal(fsm.get(1));
  });

  it('should serialize', () => {
    let fsm = new FSM().deserialize(example);
    let obj = fsm.serialize();
    expect(isEqual(obj, example)).to.equal(true);
  });

});
