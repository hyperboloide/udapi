/*!
 * Usine Data API client.
 * Copyright © 2015-2017 Hyperboloide. All rights reserved.
 */
(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require(undefined));
	else if(typeof define === 'function' && define.amd)
		define(["lodash"], factory);
	else if(typeof exports === 'object')
		exports["udapi"] = factory(require("lodash"));
	else
		root["udapi"] = factory(root["_"]);
})(this, function(__WEBPACK_EXTERNAL_MODULE_0__) {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
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
/******/ 	return __webpack_require__(__webpack_require__.s = 26);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_0__;

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
;
__export(__webpack_require__(27));


/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
var lodash_1 = __webpack_require__(0);
var interfaces_1 = __webpack_require__(1);
var Field = (function (_super) {
    __extends(Field, _super);
    function Field(id) {
        var _this = _super.call(this) || this;
        _this.name = "";
        _this.help = "";
        _this.mandatory = false;
        _this.id = id;
        return _this;
    }
    Field.prototype.serialize = function () {
        var res = __assign({}, _super.prototype.serialize.call(this), { name: this.name, type: this.type(), mandatory: this.mandatory });
        if (!lodash_1.isEmpty(this.help)) {
            res['help'] = this.help;
        }
        return res;
    };
    Field.prototype.deserialize = function (obj) {
        _super.prototype.deserialize.call(this, obj);
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
    };
    return Field;
}(interfaces_1.ValidableObject));
exports.Field = Field;


/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var lodash_1 = __webpack_require__(0);
var Display = (function () {
    function Display() {
        this.items = new Array();
    }
    Display.prototype.index = function (obj) {
        return this.items.findIndex(function (id) { return id == obj.id; });
    };
    Display.prototype.has = function (obj) {
        return this.index(obj) != -1;
    };
    Display.prototype.add = function (obj) {
        if (!this.has(obj)) {
            this.items.push(obj.id);
        }
    };
    Display.prototype.canMoveDown = function (obj) {
        return this.has(obj) && obj.id != lodash_1.last(this.items);
    };
    Display.prototype.canMoveUp = function (obj) {
        return this.has(obj) && obj.id != lodash_1.head(this.items);
    };
    Display.prototype.moveUp = function (d) {
        if (this.canMoveUp(d)) {
            var idx = this.index(d);
            var tmp = this.items[idx];
            this.items[idx] = this.items[idx - 1];
            this.items[idx - 1] = tmp;
        }
    };
    Display.prototype.moveDown = function (d) {
        if (this.canMoveDown(d)) {
            var idx = this.index(d);
            var tmp = this.items[idx];
            this.items[idx] = this.items[idx + 1];
            this.items[idx + 1] = tmp;
        }
    };
    Display.prototype.remove = function (d) {
        var idx = this.index(d);
        this.items.splice(idx, 1);
    };
    Display.prototype.serialize = function () {
        return this.items;
    };
    Display.prototype.deserialize = function (obj) {
        var _this = this;
        this.items = new Array();
        lodash_1.each(obj, function (v) { return _this.items.push(lodash_1.toSafeInteger(v)); });
        return this;
    };
    return Display;
}());
exports.Display = Display;


/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
var __values = (this && this.__values) || function (o) {
    var m = typeof Symbol === "function" && o[Symbol.iterator], i = 0;
    if (m) return m.call(o);
    return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
};
Object.defineProperty(exports, "__esModule", { value: true });
var lodash_1 = __webpack_require__(0);
var field_1 = __webpack_require__(2);
var display_1 = __webpack_require__(3);
var interfaces_1 = __webpack_require__(1);
var ChoiceValue = (function (_super) {
    __extends(ChoiceValue, _super);
    function ChoiceValue(id) {
        var _this = _super.call(this) || this;
        _this.id = id;
        return _this;
    }
    ChoiceValue.prototype.serialize = function () {
        return __assign({}, _super.prototype.serialize.call(this), { id: this.id, label: this.label });
    };
    ChoiceValue.prototype.deserialize = function (obj) {
        _super.prototype.deserialize.call(this, obj);
        this.label = obj.label;
        return this;
    };
    return ChoiceValue;
}(interfaces_1.ValidableObject));
exports.ChoiceValue = ChoiceValue;
var ChoiceField = (function (_super) {
    __extends(ChoiceField, _super);
    function ChoiceField() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.values = new Map();
        _this.display = new display_1.Display();
        return _this;
    }
    ChoiceField.prototype.isEmpty = function () {
        return this.values.size == 0;
    };
    ChoiceField.prototype.getValue = function (id) {
        return this.values.get(id);
    };
    ChoiceField.prototype.createValue = function (id, label) {
        if (label === void 0) { label = ''; }
        var v = new ChoiceValue(id);
        v.label = label;
        this.values.set(id, v);
        this.display.add(v);
        return v;
    };
    ChoiceField.prototype.valueIndex = function (v) {
        return this.display.index(v);
    };
    ChoiceField.prototype.removeValue = function (v) {
        this.values.delete(v.id);
        this.display.remove(v);
    };
    ChoiceField.prototype.serialize = function () {
        var _this = this;
        return __assign({}, _super.prototype.serialize.call(this), { values: lodash_1.map(this.display.items, function (id) { return _this.getValue(id).serialize(); }) });
    };
    ChoiceField.prototype.deserialize = function (obj) {
        _super.prototype.deserialize.call(this, obj);
        this.values = new Map();
        this.display = new display_1.Display();
        try {
            for (var _a = __values(obj.values), _b = _a.next(); !_b.done; _b = _a.next()) {
                var v = _b.value;
                var id = lodash_1.toSafeInteger(v.id);
                var cv = new ChoiceValue(id).deserialize(v);
                this.values.set(id, cv);
                this.display.add(cv);
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (_b && !_b.done && (_c = _a.return)) _c.call(_a);
            }
            finally { if (e_1) throw e_1.error; }
        }
        return this;
        var e_1, _c;
    };
    return ChoiceField;
}(field_1.Field));
exports.ChoiceField = ChoiceField;


/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
var lodash_1 = __webpack_require__(0);
var field_1 = __webpack_require__(2);
exports.Field = field_1.Field;
var boolean_1 = __webpack_require__(15);
exports.Boolean = boolean_1.Boolean;
exports.BooleanType = boolean_1.BooleanType;
var date_1 = __webpack_require__(16);
exports.DateField = date_1.DateField;
exports.DateFieldType = date_1.DateFieldType;
var embedded_1 = __webpack_require__(17);
exports.Embedded = embedded_1.Embedded;
exports.EmbeddedType = embedded_1.EmbeddedType;
var file_1 = __webpack_require__(18);
exports.File = file_1.File;
exports.FileType = file_1.FileType;
var multiple_1 = __webpack_require__(19);
exports.Multiple = multiple_1.Multiple;
exports.MultipleType = multiple_1.MultipleType;
var number_1 = __webpack_require__(20);
exports.Number = number_1.Number;
exports.NumberType = number_1.NumberType;
var radio_1 = __webpack_require__(21);
exports.Radio = radio_1.Radio;
exports.RadioType = radio_1.RadioType;
var reference_1 = __webpack_require__(22);
exports.Reference = reference_1.Reference;
exports.ReferenceType = reference_1.ReferenceType;
var text_1 = __webpack_require__(23);
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
    var res = create(id, obj.type);
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
var managed_1 = __webpack_require__(10);
exports.url = "/forms";
function Get(s, formUrl) {
    var tr = function (obj) { return new managed_1.EditableForm(s).deserialize(obj); };
    return s.GET(tr, exports.url, '/', formUrl);
}
exports.Get = Get;
function Insert(s, form) {
    var tr = function (obj) { return new managed_1.EditableForm(s).deserialize(obj); };
    return s.POST(tr, form.serialize(), exports.url);
}
exports.Insert = Insert;
function Update(s, form) {
    var tr = function (obj) { return new managed_1.EditableForm(s).deserialize(obj); };
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

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
var __values = (this && this.__values) || function (o) {
    var m = typeof Symbol === "function" && o[Symbol.iterator], i = 0;
    if (m) return m.call(o);
    return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
};
var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
Object.defineProperty(exports, "__esModule", { value: true });
var lodash_1 = __webpack_require__(0);
var interfaces_1 = __webpack_require__(1);
var user_1 = __webpack_require__(12);
var section_1 = __webpack_require__(11);
var field_1 = __webpack_require__(5);
var fsm_1 = __webpack_require__(8);
var display_1 = __webpack_require__(3);
var Form = (function (_super) {
    __extends(Form, _super);
    function Form() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.url = "";
        _this.proto = 2;
        _this.version = 0;
        _this.states = false;
        _this.name = "";
        _this.description = "";
        _this.fields = new Map();
        _this.sections = new Map();
        _this.display = new display_1.Display();
        _this.fsm = new fsm_1.FSM();
        _this._nextid = 0;
        return _this;
    }
    Form.prototype.nextid = function () {
        return this._nextid += 1;
    };
    Form.prototype.isNew = function () {
        return this.version == 0;
    };
    Form.prototype.isEmpty = function () {
        return this.fields.size == 0;
    };
    Form.prototype.hasField = function (id) {
        return this.fields.has(id);
    };
    Form.prototype.hasEmbeddedField = function (id) {
        try {
            for (var _a = __values(this.getEmbeddeds()), _b = _a.next(); !_b.done; _b = _a.next()) {
                var emb = _b.value;
                if (emb.hasField(id)) {
                    return true;
                }
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (_b && !_b.done && (_c = _a.return)) _c.call(_a);
            }
            finally { if (e_1) throw e_1.error; }
        }
        return false;
        var e_1, _c;
    };
    Form.prototype.hasFieldsOfType = function (t) {
        try {
            for (var _a = __values(this.fields), _b = _a.next(); !_b.done; _b = _a.next()) {
                var _c = __read(_b.value, 2), id = _c[0], field = _c[1];
                if (field.type() == t) {
                    return true;
                }
            }
        }
        catch (e_2_1) { e_2 = { error: e_2_1 }; }
        finally {
            try {
                if (_b && !_b.done && (_d = _a.return)) _d.call(_a);
            }
            finally { if (e_2) throw e_2.error; }
        }
        return false;
        var e_2, _d;
    };
    Form.prototype.hasEmbeddedFieldsOfType = function (t) {
        try {
            for (var _a = __values(this.getEmbeddeds()), _b = _a.next(); !_b.done; _b = _a.next()) {
                var emb = _b.value;
                if (emb.hasFieldsOfType(t)) {
                    return true;
                }
            }
        }
        catch (e_3_1) { e_3 = { error: e_3_1 }; }
        finally {
            try {
                if (_b && !_b.done && (_c = _a.return)) _c.call(_a);
            }
            finally { if (e_3) throw e_3.error; }
        }
        return false;
        var e_3, _c;
    };
    Form.prototype.addField = function (type, name, state) {
        if (name === void 0) { name = ''; }
        var f = field_1.create(this.nextid(), type);
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
    };
    Form.prototype.addEmbeddedField = function (emb, type, name) {
        if (name === void 0) { name = ''; }
        if (!this.hasField(emb.id)) {
            return;
        }
        var f = field_1.create(this.nextid(), type);
        f.name = name;
        emb.fields.set(f.id, f);
        emb.display.add(f);
        this.fsm.addField(f);
        return f;
    };
    Form.prototype.getField = function (id) {
        return this.fields.get(id);
    };
    Form.prototype.getFieldsOfType = function (t) {
        var res = new Array();
        try {
            for (var _a = __values(this.fields), _b = _a.next(); !_b.done; _b = _a.next()) {
                var _c = __read(_b.value, 2), id = _c[0], field = _c[1];
                if (field.type() == t) {
                    res.push(field);
                }
            }
        }
        catch (e_4_1) { e_4 = { error: e_4_1 }; }
        finally {
            try {
                if (_b && !_b.done && (_d = _a.return)) _d.call(_a);
            }
            finally { if (e_4) throw e_4.error; }
        }
        return res;
        var e_4, _d;
    };
    Form.prototype.getEmbeddedField = function (id) {
        try {
            for (var _a = __values(this.getEmbeddeds()), _b = _a.next(); !_b.done; _b = _a.next()) {
                var emb = _b.value;
                if (emb.hasField(id)) {
                    return [emb, emb.getField(id)];
                }
            }
        }
        catch (e_5_1) { e_5 = { error: e_5_1 }; }
        finally {
            try {
                if (_b && !_b.done && (_c = _a.return)) _c.call(_a);
            }
            finally { if (e_5) throw e_5.error; }
        }
        return [null, null];
        var e_5, _c;
    };
    Form.prototype.getEmbeddeds = function () {
        var res = new Array();
        try {
            for (var _a = __values(this.fields), _b = _a.next(); !_b.done; _b = _a.next()) {
                var _c = __read(_b.value, 2), id = _c[0], field = _c[1];
                if (field.type() == "embedded" && field) {
                    res.push(field);
                }
            }
        }
        catch (e_6_1) { e_6 = { error: e_6_1 }; }
        finally {
            try {
                if (_b && !_b.done && (_d = _a.return)) _d.call(_a);
            }
            finally { if (e_6) throw e_6.error; }
        }
        return res;
        var e_6, _d;
    };
    Form.prototype.removeField = function (f) {
        var _this = this;
        if (this.hasField(f.id)) {
            if (f.type() == "embedded") {
                var emb = f;
                emb.fields.forEach(function (f) { return _this.removeField(f); });
            }
            this.fields.delete(f.id);
            this.display.remove(f);
        }
        else {
            var _a = __read(this.getEmbeddedField(f.id), 2), emb = _a[0], res = _a[1];
            if (!lodash_1.isEmpty(f)) {
                emb.fields.delete(res.id);
                emb.display.remove(res);
            }
        }
        this.fsm.removeField(f);
    };
    Form.prototype.getSection = function (id) {
        return this.sections.get(id);
    };
    Form.prototype.addSection = function () {
        var s = new section_1.Section(this.nextid());
        this.sections.set(s.id, s);
        this.display.add(s);
        return s;
    };
    Form.prototype.removeSection = function (s) {
        this.sections.delete(s.id);
        this.display.remove(s);
    };
    Form.prototype.addState = function (name) {
        var s = new fsm_1.State(this.nextid());
        s.name = name;
        this.fsm.add(s);
        return s;
    };
    Form.prototype.serialize = function () {
        var fields = {};
        this.fields.forEach(function (f, id) { return fields["" + id] = f.serialize(); });
        var sections = {};
        this.sections.forEach(function (s, id) { return sections["" + id] = s.serialize(); });
        return lodash_1.omitBy(__assign({}, _super.prototype.serialize.call(this), { url: this.url, owner: this.owner ? this.owner.serialize() : null, created: this.created ? this.created.toJSON() : null, updated: this.updated ? this.updated.toJSON() : null, proto: this.proto, version: this.version, states: this.states, name: this.name, description: this.description, fields: fields, sections: sections, display: this.display.serialize(), fsm: this.fsm.serialize(), nextid: this._nextid }), lodash_1.isNil);
    };
    Form.prototype.deserialize = function (obj) {
        var _this = this;
        _super.prototype.deserialize.call(this, obj);
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
        lodash_1.each(obj.fields, function (v, k) {
            var id = lodash_1.toSafeInteger(k);
            _this.fields.set(id, field_1.extract(id, v));
        });
        this.sections = new Map();
        lodash_1.each(obj.sections, function (v, k) {
            var id = lodash_1.toSafeInteger(k);
            _this.sections.set(id, new section_1.Section(id).deserialize(v));
        });
        this.display = new display_1.Display().deserialize(obj.display);
        if (lodash_1.isObject(obj.fsm)) {
            this.fsm = new fsm_1.FSM().deserialize(obj.fsm);
        }
        this._nextid = lodash_1.toSafeInteger(obj.nextid);
        return this;
    };
    return Form;
}(interfaces_1.ValidableObject));
exports.Form = Form;


/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
__export(__webpack_require__(24));
__export(__webpack_require__(9));


/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
var lodash_1 = __webpack_require__(0);
var interfaces_1 = __webpack_require__(1);
var State = (function (_super) {
    __extends(State, _super);
    function State(id) {
        var _this = _super.call(this) || this;
        _this.fields = new Array();
        _this.nexts = new Array();
        _this.id = id;
        return _this;
    }
    State.prototype.hasField = function (field) {
        return lodash_1.includes(this.fields, field.id);
    };
    State.prototype.addField = function (field) {
        if (!this.hasField(field)) {
            this.fields.push(field.id);
        }
    };
    State.prototype.removeField = function (field) {
        this.fields = lodash_1.without(this.fields, field.id);
    };
    State.prototype.hasNext = function (state) {
        return lodash_1.includes(this.nexts, state.id);
    };
    State.prototype.addNext = function (state) {
        if (!this.hasNext(state)) {
            this.nexts.push(state.id);
        }
    };
    State.prototype.removeNext = function (state) {
        this.nexts = lodash_1.without(this.nexts, state.id);
    };
    State.prototype.isTerminal = function () {
        return this.nexts.length == 0;
    };
    State.prototype.serialize = function () {
        return __assign({}, _super.prototype.serialize.call(this), { name: this.name, fields: this.fields, nexts: this.nexts });
    };
    State.prototype.deserialize = function (obj) {
        _super.prototype.deserialize.call(this, obj);
        if (lodash_1.isObject(obj)) {
            this.name = obj.name;
            this.fields = obj.fields;
            this.nexts = obj.nexts;
        }
        return this;
    };
    return State;
}(interfaces_1.ValidableObject));
exports.State = State;


/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var index_1 = __webpack_require__(6);
var form_1 = __webpack_require__(7);
var EditableForm = (function (_super) {
    __extends(EditableForm, _super);
    function EditableForm(s) {
        var _this = _super.call(this) || this;
        _this.s = s;
        return _this;
    }
    EditableForm.prototype.update = function () {
        return index_1.Update(this.s, this);
    };
    EditableForm.prototype.remove = function () {
        return index_1.Remove(this.s, this.url);
    };
    return EditableForm;
}(form_1.Form));
exports.EditableForm = EditableForm;


/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
var interfaces_1 = __webpack_require__(1);
var Section = (function (_super) {
    __extends(Section, _super);
    function Section(id) {
        var _this = _super.call(this) || this;
        _this.id = id;
        return _this;
    }
    Section.prototype.serialize = function () {
        return __assign({}, _super.prototype.serialize.call(this), { html: this.html });
    };
    Section.prototype.deserialize = function (obj) {
        _super.prototype.deserialize.call(this, obj);
        this.html = obj.html;
        return this;
    };
    return Section;
}(interfaces_1.ValidableObject));
exports.Section = Section;


/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var User = (function () {
    function User() {
    }
    User.prototype.equal = function (u) {
        return u.id == this.id;
    };
    User.prototype.serialize = function () {
        return {
            id: this.id,
            name: this.name,
            picture: this.picture,
        };
    };
    User.prototype.deserialize = function (obj) {
        this.id = obj.id;
        this.name = obj.name;
        this.picture = obj.picture;
        return this;
    };
    return User;
}());
exports.User = User;


/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
__export(__webpack_require__(25));


/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
__export(__webpack_require__(12));


/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var lodash_1 = __webpack_require__(0);
var field_1 = __webpack_require__(2);
exports.BooleanType = "boolean";
var Boolean = (function (_super) {
    __extends(Boolean, _super);
    function Boolean() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Boolean.prototype.type = function () {
        return exports.BooleanType;
    };
    Boolean.prototype.serialize = function () {
        var res = _super.prototype.serialize.call(this);
        if (!lodash_1.isEmpty(this.label)) {
            res['label'] = this.label;
        }
        if (lodash_1.isBoolean(this.default)) {
            res['default'] = this.default;
        }
        return res;
    };
    Boolean.prototype.deserialize = function (obj) {
        _super.prototype.deserialize.call(this, obj);
        if (!lodash_1.isEmpty(obj.label) && lodash_1.isString(obj.label)) {
            this.label = obj.label;
        }
        if (lodash_1.isBoolean(obj.default)) {
            this.default = obj.default;
        }
        return this;
    };
    return Boolean;
}(field_1.Field));
exports.Boolean = Boolean;


/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var lodash_1 = __webpack_require__(0);
var field_1 = __webpack_require__(2);
exports.DateFieldType = "date";
var DateField = (function (_super) {
    __extends(DateField, _super);
    function DateField() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    DateField.prototype.type = function () {
        return exports.DateFieldType;
    };
    DateField.prototype.serialize = function () {
        var res = _super.prototype.serialize.call(this);
        if (lodash_1.isDate(this.default)) {
            res['default'] = this.default.toJSON();
        }
        return res;
    };
    DateField.prototype.deserialize = function (obj) {
        _super.prototype.deserialize.call(this, obj);
        if (!lodash_1.isEmpty(obj.default)) {
            this.default = new Date(obj.default);
        }
        return this;
    };
    return DateField;
}(field_1.Field));
exports.DateField = DateField;


/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
var __values = (this && this.__values) || function (o) {
    var m = typeof Symbol === "function" && o[Symbol.iterator], i = 0;
    if (m) return m.call(o);
    return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
};
var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
Object.defineProperty(exports, "__esModule", { value: true });
var lodash_1 = __webpack_require__(0);
var _1 = __webpack_require__(5);
var display_1 = __webpack_require__(3);
var interfaces_1 = __webpack_require__(1);
var EmbeddedOptions = (function (_super) {
    __extends(EmbeddedOptions, _super);
    function EmbeddedOptions() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.max = 99;
        _this.min = 1;
        return _this;
    }
    EmbeddedOptions.prototype.serialize = function () {
        return __assign({}, _super.prototype.serialize.call(this), { min: this.min, max: this.max });
    };
    EmbeddedOptions.prototype.deserialize = function (obj) {
        _super.prototype.deserialize.call(this, obj);
        if (lodash_1.isObject(obj)) {
            if (lodash_1.isNumber(obj.min)) {
                this.min = lodash_1.toSafeInteger(obj.min);
            }
            if (lodash_1.isNumber(obj.max)) {
                this.max = lodash_1.toSafeInteger(obj.max);
            }
        }
        return this;
    };
    return EmbeddedOptions;
}(interfaces_1.ValidableObject));
exports.EmbeddedOptions = EmbeddedOptions;
exports.EmbeddedType = "embedded";
var Embedded = (function (_super) {
    __extends(Embedded, _super);
    function Embedded() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.fields = new Map();
        _this.display = new display_1.Display();
        _this.options = new EmbeddedOptions();
        return _this;
    }
    Embedded.prototype.type = function () {
        return exports.EmbeddedType;
    };
    Embedded.prototype.isEmpty = function () {
        return this.fields.size == 0;
    };
    Embedded.prototype.hasField = function (id) {
        return this.fields.has(id);
    };
    Embedded.prototype.hasFieldsOfType = function (t) {
        try {
            for (var _a = __values(this.fields), _b = _a.next(); !_b.done; _b = _a.next()) {
                var _c = __read(_b.value, 2), id = _c[0], field = _c[1];
                if (field.type() == t) {
                    return true;
                }
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (_b && !_b.done && (_d = _a.return)) _d.call(_a);
            }
            finally { if (e_1) throw e_1.error; }
        }
        return false;
        var e_1, _d;
    };
    Embedded.prototype.getField = function (id) {
        return this.fields.get(id);
    };
    Embedded.prototype.getFieldsOfType = function (t) {
        var res = new Array();
        try {
            for (var _a = __values(this.fields), _b = _a.next(); !_b.done; _b = _a.next()) {
                var _c = __read(_b.value, 2), id = _c[0], field = _c[1];
                if (field.type() == t) {
                    res.push(field);
                }
            }
        }
        catch (e_2_1) { e_2 = { error: e_2_1 }; }
        finally {
            try {
                if (_b && !_b.done && (_d = _a.return)) _d.call(_a);
            }
            finally { if (e_2) throw e_2.error; }
        }
        return res;
        var e_2, _d;
    };
    Embedded.prototype.hasChildErrors = function () {
        try {
            for (var _a = __values(this.fields.values()), _b = _a.next(); !_b.done; _b = _a.next()) {
                var child = _b.value;
                if (child.hasErrors()) {
                    return true;
                }
            }
        }
        catch (e_3_1) { e_3 = { error: e_3_1 }; }
        finally {
            try {
                if (_b && !_b.done && (_c = _a.return)) _c.call(_a);
            }
            finally { if (e_3) throw e_3.error; }
        }
        return false;
        var e_3, _c;
    };
    Embedded.prototype.setErrors = function (obj) {
        var _this = this;
        _super.prototype.setErrors.call(this, obj);
        if (lodash_1.has(obj, 'fields.items')) {
            var items = obj.fields.items;
            lodash_1.each(items, function (v, k) {
                var id = lodash_1.toSafeInteger(k);
                if (_this.hasField(id)) {
                    _this.getField(id).setErrors(v);
                }
            });
        }
    };
    Embedded.prototype.serialize = function () {
        var fields = {};
        this.fields.forEach(function (f, id) { return fields["" + id] = f.serialize(); });
        return __assign({}, _super.prototype.serialize.call(this), { options: this.options.serialize(), fields: fields, display: this.display.serialize() });
    };
    Embedded.prototype.deserialize = function (obj) {
        var _this = this;
        _super.prototype.deserialize.call(this, obj);
        this.fields = new Map();
        lodash_1.each(obj.fields, function (v, k) {
            var id = lodash_1.toSafeInteger(k);
            _this.fields.set(id, _1.extract(id, v));
        });
        this.display = new display_1.Display().deserialize(obj.display);
        this.options = new EmbeddedOptions().deserialize(obj.options);
        return this;
    };
    return Embedded;
}(_1.Field));
exports.Embedded = Embedded;


/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var field_1 = __webpack_require__(2);
exports.FileType = "file";
var File = (function (_super) {
    __extends(File, _super);
    function File() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    File.prototype.type = function () {
        return exports.FileType;
    };
    return File;
}(field_1.Field));
exports.File = File;


/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __values = (this && this.__values) || function (o) {
    var m = typeof Symbol === "function" && o[Symbol.iterator], i = 0;
    if (m) return m.call(o);
    return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
};
Object.defineProperty(exports, "__esModule", { value: true });
var lodash_1 = __webpack_require__(0);
var choice_1 = __webpack_require__(4);
exports.MultipleType = "multiple";
var Multiple = (function (_super) {
    __extends(Multiple, _super);
    function Multiple() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.default = new Array();
        return _this;
    }
    Multiple.prototype.type = function () {
        return exports.MultipleType;
    };
    Multiple.prototype.removeValue = function (v) {
        _super.prototype.removeValue.call(this, v);
        if (this.isDefault(v)) {
            this.toggleDefault(v);
        }
    };
    Multiple.prototype.isDefault = function (v) {
        return this.default.indexOf(v.id) != -1;
    };
    Multiple.prototype.toggleDefault = function (v) {
        var idx = this.default.indexOf(v.id);
        if (idx != -1) {
            this.default.splice(idx, 1);
        }
        else {
            this.default.push(v.id);
        }
    };
    Multiple.prototype.serialize = function () {
        var res = _super.prototype.serialize.call(this);
        if (!lodash_1.isEmpty(this.default)) {
            res['default'] = this.default;
        }
        return res;
    };
    Multiple.prototype.deserialize = function (obj) {
        _super.prototype.deserialize.call(this, obj);
        if (!lodash_1.isEmpty(obj.default)) {
            this.default = new Array();
            try {
                for (var _a = __values(obj.default), _b = _a.next(); !_b.done; _b = _a.next()) {
                    var id = _b.value;
                    this.default.push(lodash_1.toSafeInteger(id));
                }
            }
            catch (e_1_1) { e_1 = { error: e_1_1 }; }
            finally {
                try {
                    if (_b && !_b.done && (_c = _a.return)) _c.call(_a);
                }
                finally { if (e_1) throw e_1.error; }
            }
        }
        return this;
        var e_1, _c;
    };
    return Multiple;
}(choice_1.ChoiceField));
exports.Multiple = Multiple;


/***/ }),
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
var lodash_1 = __webpack_require__(0);
var field_1 = __webpack_require__(2);
var interfaces_1 = __webpack_require__(1);
var NumberOptions = (function (_super) {
    __extends(NumberOptions, _super);
    function NumberOptions() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.integer = false;
        return _this;
    }
    NumberOptions.prototype.serialize = function () {
        return __assign({}, _super.prototype.serialize.call(this), { integer: this.integer });
    };
    NumberOptions.prototype.deserialize = function (obj) {
        _super.prototype.deserialize.call(this, obj);
        this.integer = false;
        if (lodash_1.isBoolean(obj.integer)) {
            this.integer = obj.integer;
        }
        return this;
    };
    return NumberOptions;
}(interfaces_1.ValidableObject));
exports.NumberOptions = NumberOptions;
exports.NumberType = "number";
var Number = (function (_super) {
    __extends(Number, _super);
    function Number() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.options = new NumberOptions();
        return _this;
    }
    Number.prototype.type = function () {
        return exports.NumberType;
    };
    Number.prototype.serialize = function () {
        var res = __assign({}, _super.prototype.serialize.call(this), { options: this.options.serialize() });
        if (!lodash_1.isNil(this.default)) {
            res['default'] = this.default;
        }
        return res;
    };
    Number.prototype.deserialize = function (obj) {
        _super.prototype.deserialize.call(this, obj);
        if (!lodash_1.isEmpty(obj.options)) {
            this.options = new NumberOptions().deserialize(obj.options);
        }
        if (lodash_1.isNumber(obj.default)) {
            this.default = lodash_1.toNumber(obj.default);
        }
        return this;
    };
    return Number;
}(field_1.Field));
exports.Number = Number;


/***/ }),
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
var lodash_1 = __webpack_require__(0);
var choice_1 = __webpack_require__(4);
var interfaces_1 = __webpack_require__(1);
var RadioOptions = (function (_super) {
    __extends(RadioOptions, _super);
    function RadioOptions() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.display = 'list';
        return _this;
    }
    RadioOptions.prototype.serialize = function () {
        return __assign({}, _super.prototype.serialize.call(this), { display: this.display });
    };
    RadioOptions.prototype.deserialize = function (obj) {
        _super.prototype.deserialize.call(this, obj);
        this.display = 'list';
        if (!lodash_1.isNil(obj) && lodash_1.isString(obj.display)) {
            this.display = obj.display;
        }
        return this;
    };
    return RadioOptions;
}(interfaces_1.ValidableObject));
exports.RadioOptions = RadioOptions;
exports.RadioType = "radio";
var Radio = (function (_super) {
    __extends(Radio, _super);
    function Radio() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.options = new RadioOptions();
        return _this;
    }
    Radio.prototype.type = function () {
        return exports.RadioType;
    };
    Radio.prototype.removeValue = function (v) {
        _super.prototype.removeValue.call(this, v);
        if (this.isDefault(v)) {
            this.setDefault(null);
        }
    };
    Radio.prototype.isDefault = function (v) {
        if (!lodash_1.isNil(this.default)) {
            return this.default == v.id;
        }
        return false;
    };
    Radio.prototype.setDefault = function (v) {
        if (lodash_1.isEmpty(v)) {
            this.default = null;
        }
        else {
            this.default = v.id;
        }
    };
    Radio.prototype.serialize = function () {
        var res = _super.prototype.serialize.call(this);
        if (!lodash_1.isNil(this.default)) {
            res['default'] = this.default;
        }
        res['options'] = this.options.serialize();
        return res;
    };
    Radio.prototype.deserialize = function (obj) {
        _super.prototype.deserialize.call(this, obj);
        this.options = new RadioOptions().deserialize(obj.options);
        if (!lodash_1.isNil(obj.default)) {
            this.default = lodash_1.toSafeInteger(obj.default);
        }
        return this;
    };
    return Radio;
}(choice_1.ChoiceField));
exports.Radio = Radio;


/***/ }),
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
var field_1 = __webpack_require__(2);
exports.ReferenceType = "reference";
var Reference = (function (_super) {
    __extends(Reference, _super);
    function Reference() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Reference.prototype.type = function () {
        return exports.ReferenceType;
    };
    Reference.prototype.serialize = function () {
        return __assign({}, _super.prototype.serialize.call(this), { form: this.form });
    };
    Reference.prototype.deserialize = function (obj) {
        _super.prototype.deserialize.call(this, obj);
        this.form = obj.form;
        return this;
    };
    return Reference;
}(field_1.Field));
exports.Reference = Reference;


/***/ }),
/* 23 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
var lodash_1 = __webpack_require__(0);
var field_1 = __webpack_require__(2);
var interfaces_1 = __webpack_require__(1);
var TextOptions = (function (_super) {
    __extends(TextOptions, _super);
    function TextOptions() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.textarea = false;
        _this.rows = 1;
        return _this;
    }
    TextOptions.prototype.serialize = function () {
        return __assign({}, _super.prototype.serialize.call(this), { textarea: this.textarea, rows: this.rows });
    };
    TextOptions.prototype.deserialize = function (obj) {
        _super.prototype.deserialize.call(this, obj);
        this.textarea = false;
        if (lodash_1.isBoolean(obj.textarea)) {
            this.textarea = obj.textarea;
        }
        if (lodash_1.isInteger(obj.rows)) {
            this.rows = obj.rows;
        }
        return this;
    };
    return TextOptions;
}(interfaces_1.ValidableObject));
exports.TextOptions = TextOptions;
exports.TextType = "text";
var Text = (function (_super) {
    __extends(Text, _super);
    function Text() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.options = new TextOptions();
        return _this;
    }
    Text.prototype.type = function () {
        return exports.TextType;
    };
    Text.prototype.serialize = function () {
        var res = __assign({}, _super.prototype.serialize.call(this), { options: this.options.serialize() });
        if (!lodash_1.isEmpty(this.default)) {
            res['default'] = this.default;
        }
        return res;
    };
    Text.prototype.deserialize = function (obj) {
        _super.prototype.deserialize.call(this, obj);
        if (!lodash_1.isEmpty(obj.options)) {
            this.options = new TextOptions().deserialize(obj.options);
        }
        if (!lodash_1.isEmpty(obj.default)) {
            this.default = obj.default;
        }
        return this;
    };
    return Text;
}(field_1.Field));
exports.Text = Text;


/***/ }),
/* 24 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
var __values = (this && this.__values) || function (o) {
    var m = typeof Symbol === "function" && o[Symbol.iterator], i = 0;
    if (m) return m.call(o);
    return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
};
Object.defineProperty(exports, "__esModule", { value: true });
var lodash_1 = __webpack_require__(0);
var interfaces_1 = __webpack_require__(1);
var state_1 = __webpack_require__(9);
var FSM = (function (_super) {
    __extends(FSM, _super);
    function FSM() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.states = new Map();
        return _this;
    }
    FSM.prototype.has = function (id) {
        return this.states.has(id);
    };
    FSM.prototype.length = function () {
        return this.states.size;
    };
    FSM.prototype.get = function (id) {
        return this.states.get(id);
    };
    FSM.prototype.all = function () {
        return this.states.values();
    };
    FSM.prototype.add = function (state) {
        if (!this.has(state.id)) {
            this.states.set(state.id, state);
            if (lodash_1.isNil(this.initial)) {
                this.initial = state;
            }
        }
    };
    FSM.prototype.remove = function (state) {
        this.states.delete(state.id);
    };
    FSM.prototype.hasField = function (field) {
        try {
            for (var _a = __values(this.states.values()), _b = _a.next(); !_b.done; _b = _a.next()) {
                var s = _b.value;
                if (s.hasField(field)) {
                    return true;
                }
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (_b && !_b.done && (_c = _a.return)) _c.call(_a);
            }
            finally { if (e_1) throw e_1.error; }
        }
        return false;
        var e_1, _c;
    };
    FSM.prototype.addField = function (field) {
        this.states.forEach(function (v) { return v.addField(field); });
    };
    FSM.prototype.removeField = function (field) {
        this.states.forEach(function (v) { return v.removeField(field); });
    };
    FSM.prototype.statesFor = function (field) {
        var res = new Array();
        try {
            for (var _a = __values(this.states.values()), _b = _a.next(); !_b.done; _b = _a.next()) {
                var s = _b.value;
                if (s.hasField(field)) {
                    res.push(s);
                }
            }
        }
        catch (e_2_1) { e_2 = { error: e_2_1 }; }
        finally {
            try {
                if (_b && !_b.done && (_c = _a.return)) _c.call(_a);
            }
            finally { if (e_2) throw e_2.error; }
        }
        return res;
        var e_2, _c;
    };
    FSM.prototype.hasChildErrors = function () {
        try {
            for (var _a = __values(this.states.values()), _b = _a.next(); !_b.done; _b = _a.next()) {
                var child = _b.value;
                if (child.hasErrors()) {
                    return true;
                }
            }
        }
        catch (e_3_1) { e_3 = { error: e_3_1 }; }
        finally {
            try {
                if (_b && !_b.done && (_c = _a.return)) _c.call(_a);
            }
            finally { if (e_3) throw e_3.error; }
        }
        return false;
        var e_3, _c;
    };
    FSM.prototype.setErrors = function (obj) {
        var _this = this;
        _super.prototype.setErrors.call(this, obj);
        if (lodash_1.has(obj, 'states.items')) {
            var items = obj.states.items;
            lodash_1.each(items, function (v, k) {
                var id = lodash_1.toSafeInteger(k);
                if (_this.has(id)) {
                    _this.get(id).setErrors(v);
                }
            });
        }
    };
    FSM.prototype.serialize = function () {
        var tmp = {};
        this.states.forEach(function (s, id) { return tmp["" + id] = s.serialize(); });
        return __assign({}, _super.prototype.serialize.call(this), { initial: this.initial.id, states: tmp });
    };
    FSM.prototype.deserialize = function (obj) {
        var _this = this;
        _super.prototype.deserialize.call(this, obj);
        this.states = new Map();
        if (lodash_1.isObject(obj.states)) {
            lodash_1.each(obj.states, function (v, k) {
                var id = lodash_1.toSafeInteger(k);
                _this.states.set(id, new state_1.State(id).deserialize(v));
            });
            this.initial = this.states.get(lodash_1.toSafeInteger(obj.initial));
        }
        return this;
    };
    return FSM;
}(interfaces_1.ValidableObject));
exports.FSM = FSM;


/***/ }),
/* 25 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
var __spread = (this && this.__spread) || function () {
    for (var ar = [], i = 0; i < arguments.length; i++) ar = ar.concat(__read(arguments[i]));
    return ar;
};
Object.defineProperty(exports, "__esModule", { value: true });
var lodash_1 = __webpack_require__(0);
var Session = (function () {
    function Session(config, client) {
        this.defaultTransformers = new Array();
        this.config = config;
        this.client = client;
        var defaults = client.defaults.transformResponse;
        this.defaultTransformers = lodash_1.isArray(defaults) ? defaults : [defaults];
    }
    Session.prototype.wrapTransform = function (tr) {
        var _this = this;
        var defaults = lodash_1.clone(this.defaultTransformers);
        defaults.push(function (data) { return _this.toHTTPAPIResponse(tr, data); });
        return defaults;
    };
    Session.prototype.voidTransform = function (data) {
        return;
    };
    Session.prototype.toHTTPAPIResponse = function (tr, data) {
        if (lodash_1.isNil(data) || !lodash_1.isObject(data)) {
            return { errors: null, data: null };
        }
        else if (lodash_1.isNil(data.data)) {
            return {
                errors: null,
                data: tr(data),
            };
        }
        else {
            return {
                errors: data.errors,
                data: !lodash_1.isNil(data.data) && lodash_1.isObject(data.data) ? tr(data.data) : null,
            };
        }
    };
    Session.prototype.clientConfig = function (tr) {
        var headers = {
            'X-Requested-With': 'XMLHttpRequest',
            'Accept': 'application/json',
        };
        if (this.config.apiKey != null) {
            headers['ApiKey'] = this.config.apiKey;
        }
        var transform = this.client.defaults.transformResponse;
        if (!lodash_1.isNil(tr)) {
            transform = this.wrapTransform(tr);
        }
        return {
            baseURL: this.config.baseURL + "/api",
            headers: headers,
            responseType: 'json',
            transformResponse: transform,
        };
    };
    Session.prototype.joinUrlFragments = function () {
        var uf = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            uf[_i] = arguments[_i];
        }
        return uf.reduce(function (acc, p) { return "" + acc + p; });
    };
    Session.prototype.GET = function (tr) {
        var urlFragments = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            urlFragments[_i - 1] = arguments[_i];
        }
        return this.client.request(__assign({}, this.clientConfig(), { method: 'GET', url: this.joinUrlFragments.apply(this, __spread(urlFragments)), transformResponse: this.wrapTransform(tr) }));
    };
    Session.prototype.POST = function (tr, obj) {
        var urlFragments = [];
        for (var _i = 2; _i < arguments.length; _i++) {
            urlFragments[_i - 2] = arguments[_i];
        }
        return this.client.request(__assign({}, this.clientConfig(), { method: 'POST', url: this.joinUrlFragments.apply(this, __spread(urlFragments)), data: obj, transformResponse: this.wrapTransform(tr) }));
    };
    Session.prototype.PUT = function (tr, obj) {
        var urlFragments = [];
        for (var _i = 2; _i < arguments.length; _i++) {
            urlFragments[_i - 2] = arguments[_i];
        }
        return this.client.request(__assign({}, this.clientConfig(), { method: 'PUT', url: this.joinUrlFragments.apply(this, __spread(urlFragments)), data: obj, transformResponse: this.wrapTransform(tr) }));
    };
    Session.prototype.DELETE = function () {
        var urlFragments = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            urlFragments[_i] = arguments[_i];
        }
        return this.client.request(__assign({}, this.clientConfig(), { method: 'DELETE', url: this.joinUrlFragments.apply(this, __spread(urlFragments)), transformResponse: this.wrapTransform(this.voidTransform) }));
    };
    return Session;
}());
exports.Session = Session;


/***/ }),
/* 26 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
__export(__webpack_require__(6));
__export(__webpack_require__(13));
__export(__webpack_require__(1));
__export(__webpack_require__(14));


/***/ }),
/* 27 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __values = (this && this.__values) || function (o) {
    var m = typeof Symbol === "function" && o[Symbol.iterator], i = 0;
    if (m) return m.call(o);
    return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
};
Object.defineProperty(exports, "__esModule", { value: true });
var lodash_1 = __webpack_require__(0);
var ValidationError = (function () {
    function ValidationError() {
    }
    ValidationError.prototype.serialize = function () {
        return {
            code: this.code,
            data: this.data,
        };
    };
    ValidationError.prototype.deserialize = function (obj) {
        this.code = obj.code;
        this.data = obj.data;
        return this;
    };
    return ValidationError;
}());
exports.ValidationError = ValidationError;
var ValidationList = (function () {
    function ValidationList() {
        this.errors = new Array();
    }
    ValidationList.prototype.hasErrors = function () {
        return this.errors.length > 0;
    };
    ValidationList.prototype.setErrors = function (obj) {
        this._extract(obj);
    };
    ValidationList.prototype.first = function () {
        if (this.hasErrors()) {
            return this.errors[0];
        }
    };
    ValidationList.prototype.serialize = function () {
        var res = [];
        try {
            for (var _a = __values(this.errors), _b = _a.next(); !_b.done; _b = _a.next()) {
                var e = _b.value;
                res.push(e.serialize());
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (_b && !_b.done && (_c = _a.return)) _c.call(_a);
            }
            finally { if (e_1) throw e_1.error; }
        }
        return res;
        var e_1, _c;
    };
    ValidationList.prototype.deserialize = function (obj) {
        return this._extract(obj);
    };
    ValidationList.prototype._extract = function (obj) {
        var _this = this;
        this.errors = new Array();
        if (lodash_1.isArray(obj)) {
            lodash_1.each(obj, function (e) {
                return _this.errors.push(new ValidationError().deserialize(e));
            });
        }
        return this;
    };
    return ValidationList;
}());
exports.ValidationList = ValidationList;
var ValidableObject = (function () {
    function ValidableObject() {
        this.errors = new Map();
    }
    ValidableObject.prototype.hasErrors = function () {
        return this.errors.size > 0;
    };
    ValidableObject.prototype.hasChildErrors = function () {
        return false;
    };
    ValidableObject.prototype.setErrors = function (obj) {
        this._extract(obj);
    };
    ValidableObject.prototype.serialize = function () {
        var res = {};
        this.errors.forEach(function (e, id) { return res["" + id] = e.serialize(); });
        if (lodash_1.isEmpty(res)) {
            return {};
        }
        return { errors: res };
    };
    ValidableObject.prototype.deserialize = function (obj) {
        if (!lodash_1.isEmpty(obj)) {
            this._extract(obj.errors);
        }
        return this;
    };
    ValidableObject.prototype._extract = function (obj) {
        var _this = this;
        this.errors = new Map();
        if (lodash_1.isObject(obj)) {
            lodash_1.each(obj, function (v, k) {
                var id = lodash_1.toSafeInteger(k);
                var l = new ValidationList().deserialize(v);
                if (l.hasErrors()) {
                    _this.errors.set(k, l);
                }
            });
        }
        return this;
    };
    return ValidableObject;
}());
exports.ValidableObject = ValidableObject;
var ValidableProperty = (function () {
    function ValidableProperty() {
        this.errors = new ValidationList();
    }
    ValidableProperty.prototype.hasErrors = function () {
        return !lodash_1.isNil(this.errors) && this.errors.hasErrors();
    };
    ValidableProperty.prototype.hasChildErrors = function () {
        return false;
    };
    ValidableProperty.prototype.setErrors = function (obj) {
        this.errors = new ValidationList().deserialize(obj);
    };
    return ValidableProperty;
}());
exports.ValidableProperty = ValidableProperty;


/***/ })
/******/ ]);
});
//# sourceMappingURL=udapi.js.map