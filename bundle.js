exports["udApi"] =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 24);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

module.exports = require("lodash");

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
;
__export(__webpack_require__(25));


/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const lodash_1 = __webpack_require__(0);
const interfaces_1 = __webpack_require__(1);
class Field extends interfaces_1.ValidableObject {
    constructor(id) {
        super();
        this.name = "";
        this.help = "";
        this.mandatory = false;
        this.id = id;
    }
    serialize() {
        let res = Object.assign({}, super.serialize(), { name: this.name, type: this.type(), mandatory: this.mandatory });
        if (!lodash_1.isEmpty(this.help)) {
            res['help'] = this.help;
        }
        return res;
    }
    deserialize(obj) {
        super.deserialize(obj);
        if (lodash_1.isEmpty(obj)) {
            return this;
        }
        this.name = obj.name;
        if (!lodash_1.isEmpty(obj.help)) {
            this.help = obj.help;
        }
        if (lodash_1.isBoolean(obj.mandatory)) {
            this.mandatory = obj.mandatory;
        }
        return this;
    }
}
exports.Field = Field;


/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const lodash_1 = __webpack_require__(0);
class Display {
    constructor() {
        this.items = new Array();
    }
    index(obj) {
        return this.items.findIndex((id) => id == obj.id);
    }
    has(obj) {
        return this.index(obj) != -1;
    }
    add(obj) {
        if (!this.has(obj)) {
            this.items.push(obj.id);
        }
    }
    canMoveDown(obj) {
        return this.has(obj) && obj.id != lodash_1.last(this.items);
    }
    canMoveUp(obj) {
        return this.has(obj) && obj.id != lodash_1.head(this.items);
    }
    moveUp(d) {
        if (this.canMoveUp(d)) {
            let idx = this.index(d);
            let tmp = this.items[idx];
            this.items[idx] = this.items[idx - 1];
            this.items[idx - 1] = tmp;
        }
    }
    moveDown(d) {
        if (this.canMoveDown(d)) {
            let idx = this.index(d);
            let tmp = this.items[idx];
            this.items[idx] = this.items[idx + 1];
            this.items[idx + 1] = tmp;
        }
    }
    remove(d) {
        let idx = this.index(d);
        this.items.splice(idx, 1);
    }
    serialize() {
        return this.items;
    }
    deserialize(obj) {
        this.items = new Array();
        lodash_1.each(obj, (v) => this.items.push(lodash_1.toSafeInteger(v)));
        return this;
    }
}
exports.Display = Display;


/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const lodash_1 = __webpack_require__(0);
const field_1 = __webpack_require__(2);
const display_1 = __webpack_require__(3);
const interfaces_1 = __webpack_require__(1);
class ChoiceValue extends interfaces_1.ValidableObject {
    constructor(id) {
        super();
        this.id = id;
    }
    serialize() {
        return Object.assign({}, super.serialize(), { id: this.id, label: this.label });
    }
    deserialize(obj) {
        super.deserialize(obj);
        this.label = obj.label;
        return this;
    }
}
exports.ChoiceValue = ChoiceValue;
class ChoiceField extends field_1.Field {
    constructor() {
        super(...arguments);
        this.values = new Map();
        this.display = new display_1.Display();
    }
    isEmpty() {
        return this.values.size == 0;
    }
    getValue(id) {
        return this.values.get(id);
    }
    createValue(id, label = '') {
        let v = new ChoiceValue(id);
        v.label = label;
        this.values.set(id, v);
        this.display.add(v);
        return v;
    }
    valueIndex(v) {
        return this.display.index(v);
    }
    removeValue(v) {
        this.values.delete(v.id);
        this.display.remove(v);
    }
    serialize() {
        return Object.assign({}, super.serialize(), { values: lodash_1.map(this.display.items, (id) => this.getValue(id).serialize()) });
    }
    deserialize(obj) {
        super.deserialize(obj);
        this.values = new Map();
        this.display = new display_1.Display();
        for (let v of obj.values) {
            const id = lodash_1.toSafeInteger(v.id);
            const cv = new ChoiceValue(id).deserialize(v);
            this.values.set(id, cv);
            this.display.add(cv);
        }
        return this;
    }
}
exports.ChoiceField = ChoiceField;


/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
const lodash_1 = __webpack_require__(0);
const field_1 = __webpack_require__(2);
exports.Field = field_1.Field;
const boolean_1 = __webpack_require__(14);
exports.Boolean = boolean_1.Boolean;
exports.BooleanType = boolean_1.BooleanType;
const date_1 = __webpack_require__(15);
exports.DateField = date_1.DateField;
exports.DateFieldType = date_1.DateFieldType;
const embedded_1 = __webpack_require__(16);
exports.Embedded = embedded_1.Embedded;
exports.EmbeddedType = embedded_1.EmbeddedType;
const file_1 = __webpack_require__(17);
exports.File = file_1.File;
exports.FileType = file_1.FileType;
const multiple_1 = __webpack_require__(18);
exports.Multiple = multiple_1.Multiple;
exports.MultipleType = multiple_1.MultipleType;
const number_1 = __webpack_require__(19);
exports.Number = number_1.Number;
exports.NumberType = number_1.NumberType;
const radio_1 = __webpack_require__(20);
exports.Radio = radio_1.Radio;
exports.RadioType = radio_1.RadioType;
const reference_1 = __webpack_require__(21);
exports.Reference = reference_1.Reference;
exports.ReferenceType = reference_1.ReferenceType;
const text_1 = __webpack_require__(22);
exports.Text = text_1.Text;
exports.TextType = text_1.TextType;
__export(__webpack_require__(4));
function create(id, type) {
    switch (type) {
        case boolean_1.BooleanType:
            return new boolean_1.Boolean(id);
        case date_1.DateFieldType:
            return new date_1.DateField(id);
        case embedded_1.EmbeddedType:
            return new embedded_1.Embedded(id);
        case file_1.FileType:
            return new file_1.File(id);
        case multiple_1.MultipleType:
            return new multiple_1.Multiple(id);
        case number_1.NumberType:
            return new number_1.Number(id);
        case radio_1.RadioType:
            return new radio_1.Radio(id);
        case reference_1.ReferenceType:
            return new reference_1.Reference(id);
        case text_1.TextType:
            return new text_1.Text(id);
        default:
            return null;
    }
}
exports.create = create;
function extract(id, obj) {
    if (!lodash_1.isString(obj.type)) {
        return null;
    }
    let res = create(id, obj.type);
    if (!lodash_1.isEmpty(res)) {
        res.deserialize(obj);
    }
    return res;
}
exports.extract = extract;


/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
__export(__webpack_require__(5));
__export(__webpack_require__(8));
__export(__webpack_require__(3));
__export(__webpack_require__(7));
__export(__webpack_require__(10));
__export(__webpack_require__(11));
const managed_1 = __webpack_require__(10);
exports.url = "/forms";
function Get(s, formUrl) {
    let tr = (obj) => new managed_1.EditableForm(s).deserialize(obj);
    return s.GET(tr, exports.url, '/', formUrl);
}
exports.Get = Get;
function Insert(s, form) {
    let tr = (obj) => new managed_1.EditableForm(s).deserialize(obj);
    return s.POST(tr, form.serialize(), exports.url);
}
exports.Insert = Insert;
function Update(s, form) {
    let tr = (obj) => new managed_1.EditableForm(s).deserialize(obj);
    return s.PUT(tr, form.serialize(), exports.url, '/', form.url);
}
exports.Update = Update;
function Remove(s, formUrl) {
    return s.DELETE(exports.url, '/', formUrl);
}
exports.Remove = Remove;


/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const lodash_1 = __webpack_require__(0);
const interfaces_1 = __webpack_require__(1);
const user_1 = __webpack_require__(12);
const section_1 = __webpack_require__(11);
const field_1 = __webpack_require__(5);
const fsm_1 = __webpack_require__(8);
const display_1 = __webpack_require__(3);
class Form extends interfaces_1.ValidableObject {
    constructor() {
        super(...arguments);
        this.url = "";
        this.proto = 2;
        this.version = 0;
        this.states = false;
        this.name = "";
        this.description = "";
        this.fields = new Map();
        this.sections = new Map();
        this.display = new display_1.Display();
        this.fsm = new fsm_1.FSM();
        this._nextid = 0;
    }
    nextid() {
        return this._nextid += 1;
    }
    isNew() {
        return this.version == 0;
    }
    isEmpty() {
        return this.fields.size == 0;
    }
    hasField(id) {
        return this.fields.has(id);
    }
    hasEmbeddedField(id) {
        for (let emb of this.getEmbeddeds()) {
            if (emb.hasField(id)) {
                return true;
            }
        }
        return false;
    }
    hasFieldsOfType(t) {
        for (let [id, field] of this.fields) {
            if (field.type() == t) {
                return true;
            }
        }
        return false;
    }
    hasEmbeddedFieldsOfType(t) {
        for (let emb of this.getEmbeddeds()) {
            if (emb.hasFieldsOfType(t)) {
                return true;
            }
        }
        return false;
    }
    addField(type, name = '', state) {
        let f = field_1.create(this.nextid(), type);
        f.name = name;
        this.fields.set(f.id, f);
        this.display.add(f);
        if (lodash_1.isNil(state)) {
            this.fsm.addField(f);
        }
        else {
            state.addField(f);
        }
        return f;
    }
    addEmbeddedField(emb, type, name = '') {
        if (!this.hasField(emb.id)) {
            return;
        }
        let f = field_1.create(this.nextid(), type);
        f.name = name;
        emb.fields.set(f.id, f);
        emb.display.add(f);
        this.fsm.addField(f);
        return f;
    }
    getField(id) {
        return this.fields.get(id);
    }
    getFieldsOfType(t) {
        let res = new Array();
        for (let [id, field] of this.fields) {
            if (field.type() == t) {
                res.push(field);
            }
        }
        return res;
    }
    getEmbeddedField(id) {
        for (let emb of this.getEmbeddeds()) {
            if (emb.hasField(id)) {
                return [emb, emb.getField(id)];
            }
        }
        return [null, null];
    }
    getEmbeddeds() {
        let res = new Array();
        for (let [id, field] of this.fields) {
            if (field.type() == "embedded" && field) {
                res.push(field);
            }
        }
        return res;
    }
    removeField(f) {
        if (this.hasField(f.id)) {
            if (f.type() == "embedded") {
                let emb = f;
                emb.fields.forEach((f) => this.removeField(f));
            }
            this.fields.delete(f.id);
            this.display.remove(f);
        }
        else {
            let [emb, res] = this.getEmbeddedField(f.id);
            if (!lodash_1.isEmpty(f)) {
                emb.fields.delete(res.id);
                emb.display.remove(res);
            }
        }
        this.fsm.removeField(f);
    }
    getSection(id) {
        return this.sections.get(id);
    }
    addSection() {
        let s = new section_1.Section(this.nextid());
        this.sections.set(s.id, s);
        this.display.add(s);
        return s;
    }
    removeSection(s) {
        this.sections.delete(s.id);
        this.display.remove(s);
    }
    addState(name) {
        let s = new fsm_1.State(this.nextid());
        s.name = name;
        this.fsm.add(s);
        return s;
    }
    serialize() {
        let fields = {};
        this.fields.forEach((f, id) => fields[`${id}`] = f.serialize());
        let sections = {};
        this.sections.forEach((s, id) => sections[`${id}`] = s.serialize());
        return lodash_1.omitBy(Object.assign({}, super.serialize(), { url: this.url, owner: this.owner ? this.owner.serialize() : null, created: this.created ? this.created.toJSON() : null, updated: this.updated ? this.updated.toJSON() : null, proto: this.proto, version: this.version, states: this.states, name: this.name, description: this.description, fields: fields, sections: sections, display: this.display.serialize(), fsm: this.fsm.serialize(), nextid: this._nextid }), lodash_1.isNil);
    }
    deserialize(obj) {
        super.deserialize(obj);
        if (lodash_1.isEmpty(obj)) {
            return this;
        }
        this.url = obj.url;
        if (lodash_1.isObject(obj.owner)) {
            this.owner = new user_1.User().deserialize(obj.owner);
        }
        if (!lodash_1.isNil(obj.created)) {
            this.created = new Date(obj.created);
        }
        if (!lodash_1.isNil(obj.updated)) {
            this.updated = new Date(obj.updated);
        }
        this.proto = obj.proto;
        this.version = obj.version;
        this.states = obj.states;
        this.name = obj.name;
        if (!lodash_1.isNil(obj.description)) {
            this.description = obj.description;
        }
        this.fields = new Map();
        lodash_1.each(obj.fields, (v, k) => {
            let id = lodash_1.toSafeInteger(k);
            this.fields.set(id, field_1.extract(id, v));
        });
        this.sections = new Map();
        lodash_1.each(obj.sections, (v, k) => {
            let id = lodash_1.toSafeInteger(k);
            this.sections.set(id, new section_1.Section(id).deserialize(v));
        });
        this.display = new display_1.Display().deserialize(obj.display);
        if (lodash_1.isObject(obj.fsm)) {
            this.fsm = new fsm_1.FSM().deserialize(obj.fsm);
        }
        this._nextid = lodash_1.toSafeInteger(obj.nextid);
        return this;
    }
}
exports.Form = Form;


/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
__export(__webpack_require__(23));
__export(__webpack_require__(9));


/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const lodash_1 = __webpack_require__(0);
const interfaces_1 = __webpack_require__(1);
class State extends interfaces_1.ValidableObject {
    constructor(id) {
        super();
        this.fields = new Array();
        this.nexts = new Array();
        this.id = id;
    }
    hasField(field) {
        return lodash_1.includes(this.fields, field.id);
    }
    addField(field) {
        if (!this.hasField(field)) {
            this.fields.push(field.id);
        }
    }
    removeField(field) {
        this.fields = lodash_1.without(this.fields, field.id);
    }
    hasNext(state) {
        return lodash_1.includes(this.nexts, state.id);
    }
    addNext(state) {
        if (!this.hasNext(state)) {
            this.nexts.push(state.id);
        }
    }
    removeNext(state) {
        this.nexts = lodash_1.without(this.nexts, state.id);
    }
    isTerminal() {
        return this.nexts.length == 0;
    }
    serialize() {
        return Object.assign({}, super.serialize(), { name: this.name, fields: this.fields, nexts: this.nexts });
    }
    deserialize(obj) {
        super.deserialize(obj);
        if (lodash_1.isObject(obj)) {
            this.name = obj.name;
            this.fields = obj.fields;
            this.nexts = obj.nexts;
        }
        return this;
    }
}
exports.State = State;


/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = __webpack_require__(6);
const form_1 = __webpack_require__(7);
class EditableForm extends form_1.Form {
    constructor(s) {
        super();
        this.s = s;
    }
    update() {
        return index_1.Update(this.s, this);
    }
    remove() {
        return index_1.Remove(this.s, this.url);
    }
}
exports.EditableForm = EditableForm;


/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const interfaces_1 = __webpack_require__(1);
class Section extends interfaces_1.ValidableObject {
    constructor(id) {
        super();
        this.id = id;
    }
    serialize() {
        return Object.assign({}, super.serialize(), { html: this.html });
    }
    deserialize(obj) {
        super.deserialize(obj);
        this.html = obj.html;
        return this;
    }
}
exports.Section = Section;


/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
class User {
    equal(u) {
        return u.id == this.id;
    }
    serialize() {
        return {
            id: this.id,
            name: this.name,
            picture: this.picture,
        };
    }
    deserialize(obj) {
        this.id = obj.id;
        this.name = obj.name;
        this.picture = obj.picture;
        return this;
    }
}
exports.User = User;


/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
__export(__webpack_require__(12));


/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const lodash_1 = __webpack_require__(0);
const field_1 = __webpack_require__(2);
exports.BooleanType = "boolean";
class Boolean extends field_1.Field {
    type() {
        return exports.BooleanType;
    }
    serialize() {
        let res = super.serialize();
        if (!lodash_1.isEmpty(this.label)) {
            res['label'] = this.label;
        }
        if (lodash_1.isBoolean(this.default)) {
            res['default'] = this.default;
        }
        return res;
    }
    deserialize(obj) {
        super.deserialize(obj);
        if (!lodash_1.isEmpty(obj.label) && lodash_1.isString(obj.label)) {
            this.label = obj.label;
        }
        if (lodash_1.isBoolean(obj.default)) {
            this.default = obj.default;
        }
        return this;
    }
}
exports.Boolean = Boolean;


/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const lodash_1 = __webpack_require__(0);
const field_1 = __webpack_require__(2);
exports.DateFieldType = "date";
class DateField extends field_1.Field {
    type() {
        return exports.DateFieldType;
    }
    serialize() {
        let res = super.serialize();
        if (lodash_1.isDate(this.default)) {
            res['default'] = this.default.toJSON();
        }
        return res;
    }
    deserialize(obj) {
        super.deserialize(obj);
        if (!lodash_1.isEmpty(obj.default)) {
            this.default = new Date(obj.default);
        }
        return this;
    }
}
exports.DateField = DateField;


/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const lodash_1 = __webpack_require__(0);
const _1 = __webpack_require__(5);
const display_1 = __webpack_require__(3);
const interfaces_1 = __webpack_require__(1);
class EmbeddedOptions extends interfaces_1.ValidableObject {
    constructor() {
        super(...arguments);
        this.max = 99;
        this.min = 1;
    }
    serialize() {
        return Object.assign({}, super.serialize(), { min: this.min, max: this.max });
    }
    deserialize(obj) {
        super.deserialize(obj);
        if (lodash_1.isObject(obj)) {
            if (lodash_1.isNumber(obj.min)) {
                this.min = lodash_1.toSafeInteger(obj.min);
            }
            if (lodash_1.isNumber(obj.max)) {
                this.max = lodash_1.toSafeInteger(obj.max);
            }
        }
        return this;
    }
}
exports.EmbeddedOptions = EmbeddedOptions;
exports.EmbeddedType = "embedded";
class Embedded extends _1.Field {
    constructor() {
        super(...arguments);
        this.fields = new Map();
        this.display = new display_1.Display();
        this.options = new EmbeddedOptions();
    }
    type() {
        return exports.EmbeddedType;
    }
    isEmpty() {
        return this.fields.size == 0;
    }
    hasField(id) {
        return this.fields.has(id);
    }
    hasFieldsOfType(t) {
        for (let [id, field] of this.fields) {
            if (field.type() == t) {
                return true;
            }
        }
        return false;
    }
    getField(id) {
        return this.fields.get(id);
    }
    getFieldsOfType(t) {
        let res = new Array();
        for (let [id, field] of this.fields) {
            if (field.type() == t) {
                res.push(field);
            }
        }
        return res;
    }
    hasChildErrors() {
        for (let child of this.fields.values()) {
            if (child.hasErrors()) {
                return true;
            }
        }
        return false;
    }
    setErrors(obj) {
        super.setErrors(obj);
        if (lodash_1.has(obj, 'fields.items')) {
            let items = obj.fields.items;
            lodash_1.each(items, (v, k) => {
                let id = lodash_1.toSafeInteger(k);
                if (this.hasField(id)) {
                    this.getField(id).setErrors(v);
                }
            });
        }
    }
    serialize() {
        let fields = {};
        this.fields.forEach((f, id) => fields[`${id}`] = f.serialize());
        return Object.assign({}, super.serialize(), { options: this.options.serialize(), fields: fields, display: this.display.serialize() });
    }
    deserialize(obj) {
        super.deserialize(obj);
        this.fields = new Map();
        lodash_1.each(obj.fields, (v, k) => {
            let id = lodash_1.toSafeInteger(k);
            this.fields.set(id, _1.extract(id, v));
        });
        this.display = new display_1.Display().deserialize(obj.display);
        this.options = new EmbeddedOptions().deserialize(obj.options);
        return this;
    }
}
exports.Embedded = Embedded;


/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const field_1 = __webpack_require__(2);
exports.FileType = "file";
class File extends field_1.Field {
    type() {
        return exports.FileType;
    }
}
exports.File = File;


/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const lodash_1 = __webpack_require__(0);
const choice_1 = __webpack_require__(4);
exports.MultipleType = "multiple";
class Multiple extends choice_1.ChoiceField {
    constructor() {
        super(...arguments);
        this.default = new Array();
    }
    type() {
        return exports.MultipleType;
    }
    removeValue(v) {
        super.removeValue(v);
        if (this.isDefault(v)) {
            this.toggleDefault(v);
        }
    }
    isDefault(v) {
        return this.default.indexOf(v.id) != -1;
    }
    toggleDefault(v) {
        let idx = this.default.indexOf(v.id);
        if (idx != -1) {
            this.default.splice(idx, 1);
        }
        else {
            this.default.push(v.id);
        }
    }
    serialize() {
        let res = super.serialize();
        if (!lodash_1.isEmpty(this.default)) {
            res['default'] = this.default;
        }
        return res;
    }
    deserialize(obj) {
        super.deserialize(obj);
        if (!lodash_1.isEmpty(obj.default)) {
            this.default = new Array();
            for (let id of obj.default) {
                this.default.push(lodash_1.toSafeInteger(id));
            }
        }
        return this;
    }
}
exports.Multiple = Multiple;


/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const lodash_1 = __webpack_require__(0);
const field_1 = __webpack_require__(2);
const interfaces_1 = __webpack_require__(1);
class NumberOptions extends interfaces_1.ValidableObject {
    constructor() {
        super(...arguments);
        this.integer = false;
    }
    serialize() {
        return Object.assign({}, super.serialize(), { integer: this.integer });
    }
    deserialize(obj) {
        super.deserialize(obj);
        this.integer = false;
        if (lodash_1.isBoolean(obj.integer)) {
            this.integer = obj.integer;
        }
        return this;
    }
}
exports.NumberOptions = NumberOptions;
exports.NumberType = "number";
class Number extends field_1.Field {
    constructor() {
        super(...arguments);
        this.options = new NumberOptions();
    }
    type() {
        return exports.NumberType;
    }
    serialize() {
        let res = Object.assign({}, super.serialize(), { options: this.options.serialize() });
        if (!lodash_1.isNil(this.default)) {
            res['default'] = this.default;
        }
        return res;
    }
    deserialize(obj) {
        super.deserialize(obj);
        if (!lodash_1.isEmpty(obj.options)) {
            this.options = new NumberOptions().deserialize(obj.options);
        }
        if (lodash_1.isNumber(obj.default)) {
            this.default = lodash_1.toNumber(obj.default);
        }
        return this;
    }
}
exports.Number = Number;


/***/ }),
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const lodash_1 = __webpack_require__(0);
const choice_1 = __webpack_require__(4);
const interfaces_1 = __webpack_require__(1);
class RadioOptions extends interfaces_1.ValidableObject {
    constructor() {
        super(...arguments);
        this.display = 'list';
    }
    serialize() {
        return Object.assign({}, super.serialize(), { display: this.display });
    }
    deserialize(obj) {
        super.deserialize(obj);
        this.display = 'list';
        if (!lodash_1.isNil(obj) && lodash_1.isString(obj.display)) {
            this.display = obj.display;
        }
        return this;
    }
}
exports.RadioOptions = RadioOptions;
exports.RadioType = "radio";
class Radio extends choice_1.ChoiceField {
    constructor() {
        super(...arguments);
        this.options = new RadioOptions();
    }
    type() {
        return exports.RadioType;
    }
    removeValue(v) {
        super.removeValue(v);
        if (this.isDefault(v)) {
            this.setDefault(null);
        }
    }
    isDefault(v) {
        if (!lodash_1.isNil(this.default)) {
            return this.default == v.id;
        }
        return false;
    }
    setDefault(v) {
        if (lodash_1.isEmpty(v)) {
            this.default = null;
        }
        else {
            this.default = v.id;
        }
    }
    serialize() {
        let res = super.serialize();
        if (!lodash_1.isNil(this.default)) {
            res['default'] = this.default;
        }
        res['options'] = this.options.serialize();
        return res;
    }
    deserialize(obj) {
        super.deserialize(obj);
        this.options = new RadioOptions().deserialize(obj.options);
        if (!lodash_1.isNil(obj.default)) {
            this.default = lodash_1.toSafeInteger(obj.default);
        }
        return this;
    }
}
exports.Radio = Radio;


/***/ }),
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const field_1 = __webpack_require__(2);
exports.ReferenceType = "reference";
class Reference extends field_1.Field {
    type() {
        return exports.ReferenceType;
    }
    serialize() {
        return Object.assign({}, super.serialize(), { form: this.form });
    }
    deserialize(obj) {
        super.deserialize(obj);
        this.form = obj.form;
        return this;
    }
}
exports.Reference = Reference;


/***/ }),
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const lodash_1 = __webpack_require__(0);
const field_1 = __webpack_require__(2);
const interfaces_1 = __webpack_require__(1);
class TextOptions extends interfaces_1.ValidableObject {
    constructor() {
        super(...arguments);
        this.textarea = false;
        this.rows = 1;
    }
    serialize() {
        return Object.assign({}, super.serialize(), { textarea: this.textarea, rows: this.rows });
    }
    deserialize(obj) {
        super.deserialize(obj);
        this.textarea = false;
        if (lodash_1.isBoolean(obj.textarea)) {
            this.textarea = obj.textarea;
        }
        if (lodash_1.isInteger(obj.rows)) {
            this.rows = obj.rows;
        }
        return this;
    }
}
exports.TextOptions = TextOptions;
exports.TextType = "text";
class Text extends field_1.Field {
    constructor() {
        super(...arguments);
        this.options = new TextOptions();
    }
    type() {
        return exports.TextType;
    }
    serialize() {
        let res = Object.assign({}, super.serialize(), { options: this.options.serialize() });
        if (!lodash_1.isEmpty(this.default)) {
            res['default'] = this.default;
        }
        return res;
    }
    deserialize(obj) {
        super.deserialize(obj);
        if (!lodash_1.isEmpty(obj.options)) {
            this.options = new TextOptions().deserialize(obj.options);
        }
        if (!lodash_1.isEmpty(obj.default)) {
            this.default = obj.default;
        }
        return this;
    }
}
exports.Text = Text;


/***/ }),
/* 23 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const lodash_1 = __webpack_require__(0);
const interfaces_1 = __webpack_require__(1);
const state_1 = __webpack_require__(9);
class FSM extends interfaces_1.ValidableObject {
    constructor() {
        super(...arguments);
        this.states = new Map();
    }
    has(id) {
        return this.states.has(id);
    }
    length() {
        return this.states.size;
    }
    get(id) {
        return this.states.get(id);
    }
    all() {
        return this.states.values();
    }
    add(state) {
        if (!this.has(state.id)) {
            this.states.set(state.id, state);
            if (lodash_1.isNil(this.initial)) {
                this.initial = state;
            }
        }
    }
    remove(state) {
        this.states.delete(state.id);
    }
    hasField(field) {
        for (let s of this.states.values()) {
            if (s.hasField(field)) {
                return true;
            }
        }
        return false;
    }
    addField(field) {
        this.states.forEach((v) => v.addField(field));
    }
    removeField(field) {
        this.states.forEach((v) => v.removeField(field));
    }
    statesFor(field) {
        let res = new Array();
        for (let s of this.states.values()) {
            if (s.hasField(field)) {
                res.push(s);
            }
        }
        return res;
    }
    hasChildErrors() {
        for (let child of this.states.values()) {
            if (child.hasErrors()) {
                return true;
            }
        }
        return false;
    }
    setErrors(obj) {
        super.setErrors(obj);
        if (lodash_1.has(obj, 'states.items')) {
            let items = obj.states.items;
            lodash_1.each(items, (v, k) => {
                let id = lodash_1.toSafeInteger(k);
                if (this.has(id)) {
                    this.get(id).setErrors(v);
                }
            });
        }
    }
    serialize() {
        let tmp = {};
        this.states.forEach((s, id) => tmp[`${id}`] = s.serialize());
        return Object.assign({}, super.serialize(), { initial: this.initial.id, states: tmp });
    }
    deserialize(obj) {
        super.deserialize(obj);
        this.states = new Map();
        if (lodash_1.isObject(obj.states)) {
            lodash_1.each(obj.states, (v, k) => {
                let id = lodash_1.toSafeInteger(k);
                this.states.set(id, new state_1.State(id).deserialize(v));
            });
            this.initial = this.states.get(lodash_1.toSafeInteger(obj.initial));
        }
        return this;
    }
}
exports.FSM = FSM;


/***/ }),
/* 24 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
__export(__webpack_require__(6));
__export(__webpack_require__(1));
__export(__webpack_require__(13));


/***/ }),
/* 25 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const lodash_1 = __webpack_require__(0);
class ValidationError {
    serialize() {
        return {
            code: this.code,
            data: this.data,
        };
    }
    deserialize(obj) {
        this.code = obj.code;
        this.data = obj.data;
        return this;
    }
}
exports.ValidationError = ValidationError;
class ValidationList {
    constructor() {
        this.errors = new Array();
    }
    hasErrors() {
        return this.errors.length > 0;
    }
    setErrors(obj) {
        this._extract(obj);
    }
    first() {
        if (this.hasErrors()) {
            return this.errors[0];
        }
    }
    serialize() {
        let res = [];
        for (let e of this.errors) {
            res.push(e.serialize());
        }
        return res;
    }
    deserialize(obj) {
        return this._extract(obj);
    }
    _extract(obj) {
        this.errors = new Array();
        if (lodash_1.isArray(obj)) {
            lodash_1.each(obj, (e) => this.errors.push(new ValidationError().deserialize(e)));
        }
        return this;
    }
}
exports.ValidationList = ValidationList;
class ValidableObject {
    constructor() {
        this.errors = new Map();
    }
    hasErrors() {
        return this.errors.size > 0;
    }
    hasChildErrors() {
        return false;
    }
    setErrors(obj) {
        this._extract(obj);
    }
    serialize() {
        let res = {};
        this.errors.forEach((e, id) => res[`${id}`] = e.serialize());
        if (lodash_1.isEmpty(res)) {
            return {};
        }
        return { errors: res };
    }
    deserialize(obj) {
        if (!lodash_1.isEmpty(obj)) {
            this._extract(obj.errors);
        }
        return this;
    }
    _extract(obj) {
        this.errors = new Map();
        if (lodash_1.isObject(obj)) {
            lodash_1.each(obj, (v, k) => {
                let id = lodash_1.toSafeInteger(k);
                let l = new ValidationList().deserialize(v);
                if (l.hasErrors()) {
                    this.errors.set(k, l);
                }
            });
        }
        return this;
    }
}
exports.ValidableObject = ValidableObject;


/***/ })
/******/ ]);