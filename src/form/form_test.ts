import { expect } from 'chai';
import { isEqual, isEmpty } from 'lodash';

import { Form } from "./form";
import { Embedded, Boolean } from "./field";

export const ExampleForm = {
  url: "test-form",
  owner: {
    id: 42,
    name: "test",
    picture: "img.jpg",
  },
  created: "2017-02-17T13:06:32.096Z",
  updated: "2017-03-17T13:06:32.096Z",
  proto: 2,
  version: 4,
  states: true,
  name: "test form",
  description: "some test form.",
  fields: {
    "3": {
      name: "boolean field",
      help: "help",
      mandatory: true,
      type: "boolean",
      label: "lalalala",
      default: true,
    },
    "4": {
      name: "embedded field",
      mandatory: false,
      type: "embedded",
      options: {min: 2, max: 10},
      display:[5],
      fields: {
        "5": {
          name: "boolean embedded field",
          mandatory: true,
          type: "boolean",
        }
      }
    },
  },
  sections: {
    "6": { html: "<h1>Section</h1>" },
  },
  display: [3, 4, 6],
  fsm: {
    initial: 1,
    states: {
      "1": {
        name: "example state1",
        fields: [3, 4],
        nexts: [2],
      },
      "2": {
        name: "example state 2",
        fields: [5],
        nexts: [],
      }
    },
  },
  nextid: 42,
}

describe('form', () => {

  it('should deserialize', () => {
    let f = new Form().deserialize(ExampleForm);
    expect(f.url).to.equal("test-form");
    expect(f.created.getMonth()).to.equal(1);
    expect(f.updated.getMonth()).to.equal(2);
  });

  it('should serialize', () => {
    let f = new Form().deserialize(ExampleForm)
    let obj = f.serialize()
    expect(isEqual(obj, ExampleForm)).to.equal(true);
  });

  it('should nextid', () => {
    let f = new Form().deserialize(ExampleForm);
    expect(f.nextid()).to.equal(43);
    expect(f.nextid()).to.equal(44);
    let obj = f.serialize()
    expect(obj.nextid).to.equal(44);
  })

  it('should isNew', () => {
    let f = new Form()
    expect(f.isNew()).to.equal(true);
    f.deserialize(ExampleForm);
    expect(f.isNew()).to.equal(false);
  })

  describe('fields', () => {

    it('should addField', () => {
      let f = new Form().deserialize(ExampleForm);
      let field  = f.addField('boolean', 'created field');
      expect(field.id).to.equal(43);
      expect(f.hasField(field.id)).to.equal(true);
      expect(f.display.has(field)).to.equal(true);
      expect(f.fsm.hasField(field)).to.equal(true);
    })

    it('should addEmbeddedField', () => {
      let f = new Form().deserialize(ExampleForm);
      let emb = (<Embedded>f.getField(4));
      let field  = f.addEmbeddedField(emb, 'boolean', 'created field');
      expect(field.id).to.equal(43);
      expect(f.hasField(field.id)).to.equal(false);
      expect(f.display.has(field)).to.equal(false);
      expect(f.fsm.hasField(field)).to.equal(true);
      expect(emb.hasField(field.id)).to.equal(true);
      expect(emb.display.has(field)).to.equal(true);
    })

    it('should getField', () => {
      let f = new Form().deserialize(ExampleForm);
      expect(f.getField(3).id).to.equal(3);
      expect(isEmpty(f.getField(42))).to.equal(true);
    })

    it('should getEmbeddedField', () => {
      let f = new Form().deserialize(ExampleForm);
      expect(isEqual(f.getEmbeddedField(42), [null, null])).to.equal(true);
      let [emb, field] = f.getEmbeddedField(5)
      expect(isEqual([emb, field], [null, null])).to.equal(false);
      expect(isEqual(emb, f.getField(4))).to.equal(true);
      expect(isEqual(field, emb.getField(5))).to.equal(true);
    })

    it('should getEmbeddeds', () => {
      let f = new Form().deserialize(ExampleForm);
      let embeddeds = f.getEmbeddeds();
      expect(embeddeds.length).to.equal(1);
      expect(isEqual(embeddeds, [(<Embedded>f.getField(4))])).to.equal(true);
    })

    describe('has', () => {
      it('should hasField', () => {
        let f = new Form().deserialize(ExampleForm);
        expect(f.hasField(3)).to.equal(true);
        expect(f.hasField(4)).to.equal(true);
        expect(f.hasField(5)).to.equal(false);
      })

      it('should hasEmbeddedField', () => {
        let f = new Form().deserialize(ExampleForm);
        expect(f.hasEmbeddedField(5)).to.equal(true);
        expect(f.hasEmbeddedField(4)).to.equal(false);
        expect(f.hasEmbeddedField(3)).to.equal(false);
      })

      it('should hasFieldOfType', () => {
        let f = new Form().deserialize(ExampleForm);
        expect(f.hasFieldsOfType("embedded")).to.equal(true);
        expect(f.hasFieldsOfType("boolean")).to.equal(true);

        f.removeField(f.getField(3));
        expect(f.hasFieldsOfType("boolean")).to.equal(false);
      })

      it('should hasEmbeddedFieldsOfType', () => {
        let f = new Form().deserialize(ExampleForm);
        expect(f.hasEmbeddedFieldsOfType("embedded")).to.equal(false);
        expect(f.hasEmbeddedFieldsOfType("boolean")).to.equal(true);
      })

    })

    describe('removeField', () => {

      it('should remove simple', () => {
        let f = new Form().deserialize(ExampleForm);
        let normalField = f.getField(3);
        f.removeField(normalField);
        expect(f.hasField(normalField.id)).to.equal(false);
        expect(f.fsm.hasField(normalField)).to.equal(false);
        expect(f.display.has(normalField)).to.equal(false);
      })

      it('should remove embedded child', () => {
        let f = new Form().deserialize(ExampleForm);
        let [embd, field] = f.getEmbeddedField(5);
        expect(isEmpty(embd)).to.equal(false);
        expect(isEmpty(field)).to.equal(false);

        f.removeField(field);
        expect(f.hasEmbeddedField(field.id)).to.equal(false);
        expect(f.fsm.hasField(field)).to.equal(false);
        expect(embd.display.has(field)).to.equal(false);
      })

      it('should remove embedded', () => {
        let f = new Form().deserialize(ExampleForm);
        let [embd, field] = f.getEmbeddedField(5);


        f.removeField(embd);
        expect(f.hasField(embd.id)).to.equal(false);
        expect(f.fsm.hasField(embd)).to.equal(false);
        expect(f.display.has(embd)).to.equal(false);

        expect(f.hasEmbeddedField(field.id)).to.equal(false);
        expect(f.fsm.hasField(field)).to.equal(false);
      })

    })

  })

  describe('sections', () => {

    it('should getSection', () => {
      let f = new Form().deserialize(ExampleForm);
      expect(f.getSection(6).id).to.equal(6);
      expect(f.getSection(6).html).to.equal("<h1>Section</h1>");
      expect(isEmpty(f.getSection(42))).to.equal(true);
    })

    it('should addSection', () => {
      let f = new Form().deserialize(ExampleForm);
      let s = f.addSection();
      expect(s.id).to.equal(43);
      expect(f.getSection(s.id)).to.equal(s);
      expect(f.display.has(s)).to.equal(true);
    })

    it('should removeSection', () => {
      let f = new Form().deserialize(ExampleForm);
      let s = f.getSection(6);
      f.removeSection(s);
      expect(isEmpty(f.getSection(s.id))).to.equal(true);
      expect(f.display.has(s)).to.equal(false);
    })


  })

});
