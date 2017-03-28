import { Section } from "./section";
import { expect } from 'chai';
import { isEqual } from 'lodash';

export const ExampleSection = {
  html: "<h1>Section</h1>",
};

describe('section', () => {
  it('should deserialize', () => {
    let s = new Section(42).deserialize(ExampleSection);
    expect(s.html).to.equal("<h1>Section</h1>");
    expect(s.id).to.equal(42);
  });

  it('should serialize', () => {
    let s = new Section(42).deserialize(ExampleSection);
    let obj = s.serialize()
    expect(isEqual(obj, ExampleSection)).to.equal(true);
  });

});
