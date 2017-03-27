import { User } from "./user";
import { expect } from 'chai';
import { isEqual } from 'lodash';

const example = {
  id: 42,
  name: "test",
  picture: "img.jpg",
};

describe('user', () => {
  it('should deserialize', () => {
    let u = new User().deserialize(example);
    expect(u.id).to.equal(42);
    expect(u.name).to.equal("test");
    expect(u.picture).to.equal("img.jpg");
  });

  it('should serialize', () => {
    let u = new User().deserialize(example);
    let obj = u.serialize()
    expect(isEqual(obj, example)).to.equal(true);
  });

  it('should equal', () => {
    let u1 = new User().deserialize(example)

    let obj = u1.serialize()
    let u2 = new User().deserialize(obj)

    expect(u1.equal(u2)).to.equal(true);

    let u3 = new User().deserialize({
      id: 1,
      name: "test",
      picture: "img.jpg",
    })
    expect(u1.equal(u3)).to.equal(false);
  });
});
