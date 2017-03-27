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
/******/ 	return __webpack_require__(__webpack_require__.s = 11);
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

Object.defineProperty(exports, "__esModule", { value: true });
const lodash_1 = __webpack_require__(0);
class Field {
    constructor(id) {
        this.name = "";
        this.help = "";
        this.mandatory = false;
        this.id = id;
    }
    setErrors(errors) {
        this.errors = errors;
    }
    removeErrors() {
        delete this.errors;
    }
    hasErrors() {
        return !lodash_1.isEmpty(this.errors);
    }
    serialize() {
        return {
            name: this.name,
            type: this.type(),
            help: this.help,
            mandatory: this.mandatory,
        };
    }
    deserialize(obj) {
        if (lodash_1.isEmpty(obj)) {
            return this;
        }
        this.name = obj.name;
        this.help = obj.help;
        this.mandatory = obj.mandatory;
        return this;
    }
}
exports.Field = Field;


/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const lodash_1 = __webpack_require__(0);
class State {
    constructor(id) {
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
        return {
            name: this.name,
            fields: this.fields,
            nexts: this.nexts,
        };
    }
    deserialize(obj) {
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
/* 3 */
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
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
var form_1 = __webpack_require__(8);
exports.Form = form_1.Form;
__export(__webpack_require__(10));
__export(__webpack_require__(7));


/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var user_1 = __webpack_require__(3);
exports.User = user_1.User;


/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const field_1 = __webpack_require__(1);
class Boolean extends field_1.Field {
    constructor() {
        super(...arguments);
        this.label = "";
        this.default = false;
    }
    type() {
        return "boolean";
    }
    serialize() {
        return Object.assign({}, super.serialize(), { label: this.label, default: this.default });
    }
    deserialize(obj) {
        super.deserialize(obj);
        this.label = obj.label;
        this.default = obj.default;
        return this;
    }
}
exports.Boolean = Boolean;


/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var field_1 = __webpack_require__(1);
exports.Field = field_1.Field;
var boolean_1 = __webpack_require__(6);
exports.Boolean = boolean_1.Boolean;
function create(id, type) {
    switch (type) {
        case "boolean":
            return new Boolean(id);
        default:
            return null;
    }
}
exports.create = create;


/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const lodash_1 = __webpack_require__(0);
const user_1 = __webpack_require__(3);
class Form {
    serialize() {
        return {
            url: this.url,
            owner: this.owner,
            created: this.created.toJSON(),
            updated: this.updated,
            proto: this.proto,
            version: this.version,
            states: this.states,
            name: this.name,
            description: this.description,
        };
    }
    deserialize(obj) {
        if (lodash_1.isEmpty(obj)) {
            return this;
        }
        this.url = obj.url;
        if (lodash_1.isObject(obj.owner)) {
            this.owner = new user_1.User().deserialize(obj.owner);
        }
        if (!lodash_1.isEmpty('created')) {
            this.created = new Date(obj.created);
        }
        if (!lodash_1.isEmpty('updated')) {
            this.updated = new Date(obj.updated);
        }
        this.proto = obj.proto;
        this.version = obj.version;
        this.states = obj.states;
        this.name = obj.name;
        this.description = obj.description;
        let tmp = new Map();
        return this;
    }
}
exports.Form = Form;


/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const lodash_1 = __webpack_require__(0);
const state_1 = __webpack_require__(2);
class FSM {
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
    serialize() {
        let tmp = {};
        this.states.forEach((id, s) => tmp[`${id}`] = s);
        return {
            initial: this.initial.id,
            states: tmp,
        };
    }
    deserialize(obj) {
        this.states = new Map();
        if (lodash_1.isObject(obj)) {
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
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var fsm_1 = __webpack_require__(9);
exports.FSM = fsm_1.FSM;
var state_1 = __webpack_require__(2);
exports.State = state_1.State;


/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
__export(__webpack_require__(5));
__export(__webpack_require__(4));


/***/ })
/******/ ]);