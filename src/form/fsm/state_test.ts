import { State } from "./state";
import { expect } from 'chai';
import { isEqual } from 'lodash';

const example = {
  name: "example state",
  fields: [1, 2, 3],
  nexts: [4, 5, 6],
}

describe('state', () => {
  it('should deserialize', () => {
    let s = new State(42).deserialize(example);
    expect(s.name).to.equal(example.name);
  });

  it('should serialize', () => {
    let s = new State(42).deserialize(example);
    let obj = s.serialize();
    expect(isEqual(obj, example)).to.equal(true);
  });

});
