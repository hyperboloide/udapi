import { person } from "./person";
import { expect } from 'chai';


describe('person struct', () => {
  it('should have firstName', () => {
    expect(person.firstName).to.equal('David');
  });

  it('should have lastName', () => {
    expect(person.lastName).to.equal('Barreto');
  });
});
