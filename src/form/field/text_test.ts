import { expect } from 'chai';
import { isEqual, isEmpty, isNil } from 'lodash';

import { Field } from './field';
import { Text, TextOptions } from './text';
import { ChoiceValue } from './choice';

export const exampleTextOptions = {
  textarea: true,
  rows: 5,
};

export const exampleText = {
  name: "example",
  help: "help",
  mandatory: true,
  type: "text",
  default: "some text",
  options: {
    textarea: true,
    rows: 5,
  },
}

describe('field text', () => {

  describe('TextOptions', () => {
    it('should deserialize', () => {
      let ro = new TextOptions().deserialize(exampleTextOptions);
      expect(ro.textarea).to.equal(true);
      expect(ro.rows).to.equal(5);
    });

    it('should serialize', () => {
      let ro = new TextOptions().deserialize(exampleTextOptions);
      let obj = ro.serialize();
      expect(isEqual(obj, exampleTextOptions)).to.equal(true);
    });
  })

  it('should deserialize', () => {
    let f = new Text(42).deserialize(exampleText);
    expect(f.type()).to.equal("text");
    expect(f.default).to.equal("some text");
    expect(f.options.textarea).to.equal(true);
    expect(f.options.rows).to.equal(5);
  });

  it('should serialize', () => {
    let f = new Text(42).deserialize(exampleText);
    let obj = f.serialize();
    expect(isEqual(obj, exampleText)).to.equal(true);
  });

});
