'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

exports["udApi"] =
/******/function (modules) {
    // webpackBootstrap
    /******/ // The module cache
    /******/var installedModules = {};
    /******/
    /******/ // The require function
    /******/function __webpack_require__(moduleId) {
        /******/
        /******/ // Check if module is in cache
        /******/if (installedModules[moduleId])
            /******/return installedModules[moduleId].exports;
        /******/
        /******/ // Create a new module (and put it into the cache)
        /******/var module = installedModules[moduleId] = {
            /******/i: moduleId,
            /******/l: false,
            /******/exports: {}
            /******/ };
        /******/
        /******/ // Execute the module function
        /******/modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
        /******/
        /******/ // Flag the module as loaded
        /******/module.l = true;
        /******/
        /******/ // Return the exports of the module
        /******/return module.exports;
        /******/
    }
    /******/
    /******/
    /******/ // expose the modules object (__webpack_modules__)
    /******/__webpack_require__.m = modules;
    /******/
    /******/ // expose the module cache
    /******/__webpack_require__.c = installedModules;
    /******/
    /******/ // identity function for calling harmony imports with the correct context
    /******/__webpack_require__.i = function (value) {
        return value;
    };
    /******/
    /******/ // define getter function for harmony exports
    /******/__webpack_require__.d = function (exports, name, getter) {
        /******/if (!__webpack_require__.o(exports, name)) {
            /******/Object.defineProperty(exports, name, {
                /******/configurable: false,
                /******/enumerable: true,
                /******/get: getter
                /******/ });
            /******/
        }
        /******/
    };
    /******/
    /******/ // getDefaultExport function for compatibility with non-harmony modules
    /******/__webpack_require__.n = function (module) {
        /******/var getter = module && module.__esModule ?
        /******/function getDefault() {
            return module['default'];
        } :
        /******/function getModuleExports() {
            return module;
        };
        /******/__webpack_require__.d(getter, 'a', getter);
        /******/return getter;
        /******/
    };
    /******/
    /******/ // Object.prototype.hasOwnProperty.call
    /******/__webpack_require__.o = function (object, property) {
        return Object.prototype.hasOwnProperty.call(object, property);
    };
    /******/
    /******/ // __webpack_public_path__
    /******/__webpack_require__.p = "";
    /******/
    /******/ // Load entry module and return exports
    /******/return __webpack_require__(__webpack_require__.s = 14);
    /******/
}(
/************************************************************************/
/******/[
/* 0 */
/***/function (module, exports) {

    module.exports = require("lodash");

    /***/
},
/* 1 */
/***/function (module, exports, __webpack_require__) {

    "use strict";

    function __export(m) {
        for (var p in m) {
            if (!exports.hasOwnProperty(p)) exports[p] = m[p];
        }
    }
    Object.defineProperty(exports, "__esModule", { value: true });
    ;
    __export(__webpack_require__(15));

    /***/
},
/* 2 */
/***/function (module, exports, __webpack_require__) {

    "use strict";

    Object.defineProperty(exports, "__esModule", { value: true });
    var lodash_1 = __webpack_require__(0);
    var interfaces_1 = __webpack_require__(1);

    var Field = function (_interfaces_1$Validab) {
        _inherits(Field, _interfaces_1$Validab);

        function Field(id) {
            _classCallCheck(this, Field);

            var _this = _possibleConstructorReturn(this, (Field.__proto__ || Object.getPrototypeOf(Field)).call(this));

            _this.name = "";
            _this.help = "";
            _this.mandatory = false;
            _this.id = id;
            return _this;
        }

        _createClass(Field, [{
            key: 'serialize',
            value: function serialize() {
                var res = Object.assign({}, _get(Field.prototype.__proto__ || Object.getPrototypeOf(Field.prototype), 'serialize', this).call(this), { name: this.name, type: this.type(), mandatory: this.mandatory });
                if (!lodash_1.isEmpty(this.help)) {
                    res['help'] = this.help;
                }
                return res;
            }
        }, {
            key: 'deserialize',
            value: function deserialize(obj) {
                _get(Field.prototype.__proto__ || Object.getPrototypeOf(Field.prototype), 'deserialize', this).call(this, obj);
                if (lodash_1.isEmpty(obj)) {
                    return this;
                }
                this.name = obj.name;
                this.help = obj.help;
                this.mandatory = obj.mandatory;
                return this;
            }
        }]);

        return Field;
    }(interfaces_1.ValidableObject);

    exports.Field = Field;

    /***/
},
/* 3 */
/***/function (module, exports, __webpack_require__) {

    "use strict";

    Object.defineProperty(exports, "__esModule", { value: true });
    var lodash_1 = __webpack_require__(0);
    var field_1 = __webpack_require__(2);
    exports.Field = field_1.Field;
    var boolean_1 = __webpack_require__(11);
    exports.Boolean = boolean_1.Boolean;
    function create(id, type) {
        switch (type) {
            case "boolean":
                return new boolean_1.Boolean(id);
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

    /***/
},
/* 4 */
/***/function (module, exports, __webpack_require__) {

    "use strict";

    function __export(m) {
        for (var p in m) {
            if (!exports.hasOwnProperty(p)) exports[p] = m[p];
        }
    }
    Object.defineProperty(exports, "__esModule", { value: true });
    __export(__webpack_require__(13));
    __export(__webpack_require__(5));

    /***/
},
/* 5 */
/***/function (module, exports, __webpack_require__) {

    "use strict";

    Object.defineProperty(exports, "__esModule", { value: true });
    var lodash_1 = __webpack_require__(0);
    var interfaces_1 = __webpack_require__(1);

    var State = function (_interfaces_1$Validab2) {
        _inherits(State, _interfaces_1$Validab2);

        function State(id) {
            _classCallCheck(this, State);

            var _this2 = _possibleConstructorReturn(this, (State.__proto__ || Object.getPrototypeOf(State)).call(this));

            _this2.id = id;
            return _this2;
        }

        _createClass(State, [{
            key: 'hasField',
            value: function hasField(field) {
                return lodash_1.includes(this.fields, field.id);
            }
        }, {
            key: 'addField',
            value: function addField(field) {
                if (!this.hasField(field)) {
                    this.fields.push(field.id);
                }
            }
        }, {
            key: 'removeField',
            value: function removeField(field) {
                this.fields = lodash_1.without(this.fields, field.id);
            }
        }, {
            key: 'hasNext',
            value: function hasNext(state) {
                return lodash_1.includes(this.nexts, state.id);
            }
        }, {
            key: 'addNext',
            value: function addNext(state) {
                if (!this.hasNext(state)) {
                    this.nexts.push(state.id);
                }
            }
        }, {
            key: 'removeNext',
            value: function removeNext(state) {
                this.nexts = lodash_1.without(this.nexts, state.id);
            }
        }, {
            key: 'isTerminal',
            value: function isTerminal() {
                return this.nexts.length == 0;
            }
        }, {
            key: 'serialize',
            value: function serialize() {
                return Object.assign({}, _get(State.prototype.__proto__ || Object.getPrototypeOf(State.prototype), 'serialize', this).call(this), { name: this.name, fields: this.fields, nexts: this.nexts });
            }
        }, {
            key: 'deserialize',
            value: function deserialize(obj) {
                _get(State.prototype.__proto__ || Object.getPrototypeOf(State.prototype), 'deserialize', this).call(this, obj);
                if (lodash_1.isObject(obj)) {
                    this.name = obj.name;
                    this.fields = obj.fields;
                    this.nexts = obj.nexts;
                }
                return this;
            }
        }]);

        return State;
    }(interfaces_1.ValidableObject);

    exports.State = State;

    /***/
},
/* 6 */
/***/function (module, exports, __webpack_require__) {

    "use strict";

    Object.defineProperty(exports, "__esModule", { value: true });
    var interfaces_1 = __webpack_require__(1);

    var Section = function (_interfaces_1$Validab3) {
        _inherits(Section, _interfaces_1$Validab3);

        function Section(id) {
            _classCallCheck(this, Section);

            var _this3 = _possibleConstructorReturn(this, (Section.__proto__ || Object.getPrototypeOf(Section)).call(this));

            _this3.id = id;
            return _this3;
        }

        _createClass(Section, [{
            key: 'serialize',
            value: function serialize() {
                return Object.assign({}, _get(Section.prototype.__proto__ || Object.getPrototypeOf(Section.prototype), 'serialize', this).call(this), { html: this.html });
            }
        }, {
            key: 'deserialize',
            value: function deserialize(obj) {
                _get(Section.prototype.__proto__ || Object.getPrototypeOf(Section.prototype), 'deserialize', this).call(this, obj);
                this.html = obj.html;
                return this;
            }
        }]);

        return Section;
    }(interfaces_1.ValidableObject);

    exports.Section = Section;

    /***/
},
/* 7 */
/***/function (module, exports, __webpack_require__) {

    "use strict";

    Object.defineProperty(exports, "__esModule", { value: true });

    var User = function () {
        function User() {
            _classCallCheck(this, User);
        }

        _createClass(User, [{
            key: 'equal',
            value: function equal(u) {
                return u.id == this.id;
            }
        }, {
            key: 'serialize',
            value: function serialize() {
                return {
                    id: this.id,
                    name: this.name,
                    picture: this.picture
                };
            }
        }, {
            key: 'deserialize',
            value: function deserialize(obj) {
                this.id = obj.id;
                this.name = obj.name;
                this.picture = obj.picture;
                return this;
            }
        }]);

        return User;
    }();

    exports.User = User;

    /***/
},
/* 8 */
/***/function (module, exports, __webpack_require__) {

    "use strict";

    function __export(m) {
        for (var p in m) {
            if (!exports.hasOwnProperty(p)) exports[p] = m[p];
        }
    }
    Object.defineProperty(exports, "__esModule", { value: true });
    __export(__webpack_require__(3));
    __export(__webpack_require__(4));
    __export(__webpack_require__(10));
    // export * from './editable';
    __export(__webpack_require__(12));
    __export(__webpack_require__(6));

    /***/
},
/* 9 */
/***/function (module, exports, __webpack_require__) {

    "use strict";

    function __export(m) {
        for (var p in m) {
            if (!exports.hasOwnProperty(p)) exports[p] = m[p];
        }
    }
    Object.defineProperty(exports, "__esModule", { value: true });
    __export(__webpack_require__(7));

    /***/
},
/* 10 */
/***/function (module, exports, __webpack_require__) {

    "use strict";

    Object.defineProperty(exports, "__esModule", { value: true });
    var lodash_1 = __webpack_require__(0);

    var DisplayableContainer = function () {
        function DisplayableContainer() {
            _classCallCheck(this, DisplayableContainer);

            this.display = new Array();
        }

        _createClass(DisplayableContainer, [{
            key: 'displayIndex',
            value: function displayIndex(obj) {
                return this.display.findIndex(function (id) {
                    return id == obj.id;
                });
            }
        }, {
            key: 'displayHas',
            value: function displayHas(id) {
                return this.displayIndex({ id: id }) != -1;
            }
        }, {
            key: 'displayCanMoveDown',
            value: function displayCanMoveDown(obj) {
                return obj.id != lodash_1.last(this.display);
            }
        }, {
            key: 'displayCanMoveUp',
            value: function displayCanMoveUp(obj) {
                return obj.id != lodash_1.head(this.display);
            }
        }]);

        return DisplayableContainer;
    }();

    exports.DisplayableContainer = DisplayableContainer;

    var EdiableDisplayableContainer = function (_DisplayableContainer) {
        _inherits(EdiableDisplayableContainer, _DisplayableContainer);

        function EdiableDisplayableContainer() {
            _classCallCheck(this, EdiableDisplayableContainer);

            return _possibleConstructorReturn(this, (EdiableDisplayableContainer.__proto__ || Object.getPrototypeOf(EdiableDisplayableContainer)).apply(this, arguments));
        }

        _createClass(EdiableDisplayableContainer, [{
            key: 'displayMoveUp',
            value: function displayMoveUp(d) {
                if (this.displayCanMoveUp(d)) {
                    var idx = this.displayIndex(d);
                    var tmp = this.display[idx];
                    this.display[idx] = this.display[idx - 1];
                    this.display[idx - 1] = tmp;
                }
            }
        }, {
            key: 'displayMoveDown',
            value: function displayMoveDown(d) {
                if (this.displayCanMoveDown(d)) {
                    var idx = this.displayIndex(d);
                    var tmp = this.display[idx];
                    this.display[idx] = this.display[idx + 1];
                    this.display[idx + 1] = tmp;
                }
            }
        }, {
            key: 'displayRemove',
            value: function displayRemove(d) {
                var idx = this.displayIndex(d);
                this.display.splice(idx, 1);
            }
        }]);

        return EdiableDisplayableContainer;
    }(DisplayableContainer);

    /***/
},
/* 11 */
/***/function (module, exports, __webpack_require__) {

    "use strict";

    Object.defineProperty(exports, "__esModule", { value: true });
    var lodash_1 = __webpack_require__(0);
    var field_1 = __webpack_require__(2);

    var Boolean = function (_field_1$Field) {
        _inherits(Boolean, _field_1$Field);

        function Boolean() {
            _classCallCheck(this, Boolean);

            return _possibleConstructorReturn(this, (Boolean.__proto__ || Object.getPrototypeOf(Boolean)).apply(this, arguments));
        }

        _createClass(Boolean, [{
            key: 'type',
            value: function type() {
                return "boolean";
            }
        }, {
            key: 'serialize',
            value: function serialize() {
                var res = _get(Boolean.prototype.__proto__ || Object.getPrototypeOf(Boolean.prototype), 'serialize', this).call(this);
                if (!lodash_1.isEmpty(this.label)) {
                    res['label'] = this.label;
                }
                if (!lodash_1.isEmpty(this.default)) {
                    res['default'] = this.default;
                }
                return res;
            }
        }, {
            key: 'deserialize',
            value: function deserialize(obj) {
                _get(Boolean.prototype.__proto__ || Object.getPrototypeOf(Boolean.prototype), 'deserialize', this).call(this, obj);
                if (!lodash_1.isEmpty(this.label)) {
                    this.label = obj.label;
                }
                if (!lodash_1.isEmpty(this.default)) {
                    this.default = obj.default;
                }
                return this;
            }
        }]);

        return Boolean;
    }(field_1.Field);

    exports.Boolean = Boolean;

    /***/
},
/* 12 */
/***/function (module, exports, __webpack_require__) {

    "use strict";

    Object.defineProperty(exports, "__esModule", { value: true });
    var lodash_1 = __webpack_require__(0);
    var interfaces_1 = __webpack_require__(1);
    var user_1 = __webpack_require__(7);
    var section_1 = __webpack_require__(6);
    var field_1 = __webpack_require__(3);
    var fsm_1 = __webpack_require__(4);

    var Form = function (_interfaces_1$Validab4) {
        _inherits(Form, _interfaces_1$Validab4);

        function Form() {
            _classCallCheck(this, Form);

            var _this6 = _possibleConstructorReturn(this, (Form.__proto__ || Object.getPrototypeOf(Form)).apply(this, arguments));

            _this6.url = "";
            _this6.proto = 2;
            _this6.version = 0;
            _this6.states = false;
            _this6.name = "";
            _this6.description = "";
            _this6.fields = new Map();
            _this6.sections = new Map();
            _this6.display = new Array();
            return _this6;
        }

        _createClass(Form, [{
            key: 'isEmpty',
            value: function isEmpty() {
                return this.fields.size == 0;
            }
        }, {
            key: 'isNew',
            value: function isNew() {
                return this.version == 0;
            }
        }, {
            key: 'hasField',
            value: function hasField(id) {
                return this.fields.has(id);
            }
        }, {
            key: 'getField',
            value: function getField(id) {
                return this.fields.get(id);
            }
        }, {
            key: 'getSection',
            value: function getSection(id) {
                return this.sections.get(id);
            }
        }, {
            key: 'displayIndex',
            value: function displayIndex(obj) {
                return this.display.findIndex(function (id) {
                    return id == obj.id;
                });
            }
        }, {
            key: 'displayCanMoveDown',
            value: function displayCanMoveDown(obj) {
                return obj.id != lodash_1.last(this.display);
            }
        }, {
            key: 'displayCanMoveUp',
            value: function displayCanMoveUp(obj) {
                return obj.id != lodash_1.head(this.display);
            }
        }, {
            key: 'serialize',
            value: function serialize() {
                var fields = {};
                this.fields.forEach(function (f, id) {
                    return fields['' + id] = f.serialize();
                });
                var sections = {};
                this.sections.forEach(function (s, id) {
                    return sections['' + id] = s.serialize();
                });
                return Object.assign({}, _get(Form.prototype.__proto__ || Object.getPrototypeOf(Form.prototype), 'serialize', this).call(this), { url: this.url, owner: this.owner.serialize(), created: this.created.toJSON(), updated: this.updated.toJSON(), proto: this.proto, version: this.version, states: this.states, name: this.name, description: this.description, fields: fields, sections: sections, display: this.display, fsm: this.fsm.serialize() });
            }
        }, {
            key: 'deserialize',
            value: function deserialize(obj) {
                var _this7 = this;

                _get(Form.prototype.__proto__ || Object.getPrototypeOf(Form.prototype), 'deserialize', this).call(this, obj);
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
                this.fields = new Map();
                lodash_1.each(obj.fields, function (v, k) {
                    var id = lodash_1.toSafeInteger(k);
                    _this7.fields.set(id, field_1.extract(id, v));
                });
                this.sections = new Map();
                lodash_1.each(obj.sections, function (v, k) {
                    var id = lodash_1.toSafeInteger(k);
                    _this7.sections.set(id, new section_1.Section(id).deserialize(v));
                });
                this.display = lodash_1.map(obj.display, lodash_1.toSafeInteger);
                if (lodash_1.isObject(obj.fsm)) {
                    this.fsm = new fsm_1.FSM().deserialize(obj.fsm);
                }
                return this;
            }
        }]);

        return Form;
    }(interfaces_1.ValidableObject);

    exports.Form = Form;

    /***/
},
/* 13 */
/***/function (module, exports, __webpack_require__) {

    "use strict";

    Object.defineProperty(exports, "__esModule", { value: true });
    var lodash_1 = __webpack_require__(0);
    var interfaces_1 = __webpack_require__(1);
    var state_1 = __webpack_require__(5);

    var FSM = function (_interfaces_1$Validab5) {
        _inherits(FSM, _interfaces_1$Validab5);

        function FSM() {
            _classCallCheck(this, FSM);

            return _possibleConstructorReturn(this, (FSM.__proto__ || Object.getPrototypeOf(FSM)).apply(this, arguments));
        }

        _createClass(FSM, [{
            key: 'has',
            value: function has(id) {
                return this.states.has(id);
            }
        }, {
            key: 'length',
            value: function length() {
                return this.states.size;
            }
        }, {
            key: 'get',
            value: function get(id) {
                return this.states.get(id);
            }
        }, {
            key: 'all',
            value: function all() {
                return this.states.values();
            }
        }, {
            key: 'add',
            value: function add(state) {
                if (!this.has(state.id)) {
                    this.states.set(state.id, state);
                }
            }
        }, {
            key: 'remove',
            value: function remove(state) {
                this.states.delete(state.id);
            }
        }, {
            key: 'hasField',
            value: function hasField(field) {
                var _iteratorNormalCompletion = true;
                var _didIteratorError = false;
                var _iteratorError = undefined;

                try {
                    for (var _iterator = this.states.values()[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                        var s = _step.value;

                        if (s.hasField(field)) {
                            return true;
                        }
                    }
                } catch (err) {
                    _didIteratorError = true;
                    _iteratorError = err;
                } finally {
                    try {
                        if (!_iteratorNormalCompletion && _iterator.return) {
                            _iterator.return();
                        }
                    } finally {
                        if (_didIteratorError) {
                            throw _iteratorError;
                        }
                    }
                }

                return false;
            }
        }, {
            key: 'addField',
            value: function addField(field) {
                this.states.forEach(function (v) {
                    return v.addField(field);
                });
            }
        }, {
            key: 'removeField',
            value: function removeField(field) {
                this.states.forEach(function (v) {
                    return v.removeField(field);
                });
            }
        }, {
            key: 'statesFor',
            value: function statesFor(field) {
                var res = new Array();
                var _iteratorNormalCompletion2 = true;
                var _didIteratorError2 = false;
                var _iteratorError2 = undefined;

                try {
                    for (var _iterator2 = this.states.values()[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
                        var s = _step2.value;

                        if (s.hasField(field)) {
                            res.push(s);
                        }
                    }
                } catch (err) {
                    _didIteratorError2 = true;
                    _iteratorError2 = err;
                } finally {
                    try {
                        if (!_iteratorNormalCompletion2 && _iterator2.return) {
                            _iterator2.return();
                        }
                    } finally {
                        if (_didIteratorError2) {
                            throw _iteratorError2;
                        }
                    }
                }

                return res;
            }
        }, {
            key: 'hasChildErrors',
            value: function hasChildErrors() {
                var _iteratorNormalCompletion3 = true;
                var _didIteratorError3 = false;
                var _iteratorError3 = undefined;

                try {
                    for (var _iterator3 = this.states.values()[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
                        var child = _step3.value;

                        if (child.hasErrors()) {
                            return true;
                        }
                    }
                } catch (err) {
                    _didIteratorError3 = true;
                    _iteratorError3 = err;
                } finally {
                    try {
                        if (!_iteratorNormalCompletion3 && _iterator3.return) {
                            _iterator3.return();
                        }
                    } finally {
                        if (_didIteratorError3) {
                            throw _iteratorError3;
                        }
                    }
                }

                return false;
            }
        }, {
            key: 'setErrors',
            value: function setErrors(obj) {
                var _this9 = this;

                _get(FSM.prototype.__proto__ || Object.getPrototypeOf(FSM.prototype), 'setErrors', this).call(this, obj);
                if (lodash_1.has(obj, 'states.items')) {
                    var items = obj.states.items;
                    lodash_1.each(items, function (v, k) {
                        var id = lodash_1.toSafeInteger(k);
                        if (_this9.has(id)) {
                            _this9.get(id).setErrors(v);
                        }
                    });
                }
            }
        }, {
            key: 'serialize',
            value: function serialize() {
                var tmp = {};
                this.states.forEach(function (s, id) {
                    return tmp['' + id] = s.serialize();
                });
                return Object.assign({}, _get(FSM.prototype.__proto__ || Object.getPrototypeOf(FSM.prototype), 'serialize', this).call(this), { initial: this.initial.id, states: tmp });
            }
        }, {
            key: 'deserialize',
            value: function deserialize(obj) {
                var _this10 = this;

                _get(FSM.prototype.__proto__ || Object.getPrototypeOf(FSM.prototype), 'deserialize', this).call(this, obj);
                this.states = new Map();
                if (lodash_1.isObject(obj.states)) {
                    lodash_1.each(obj.states, function (v, k) {
                        var id = lodash_1.toSafeInteger(k);
                        _this10.states.set(id, new state_1.State(id).deserialize(v));
                    });
                    this.initial = this.states.get(lodash_1.toSafeInteger(obj.initial));
                }
                return this;
            }
        }]);

        return FSM;
    }(interfaces_1.ValidableObject);

    exports.FSM = FSM;

    /***/
},
/* 14 */
/***/function (module, exports, __webpack_require__) {

    "use strict";

    function __export(m) {
        for (var p in m) {
            if (!exports.hasOwnProperty(p)) exports[p] = m[p];
        }
    }
    Object.defineProperty(exports, "__esModule", { value: true });
    __export(__webpack_require__(8));
    __export(__webpack_require__(1));
    __export(__webpack_require__(9));

    /***/
},
/* 15 */
/***/function (module, exports, __webpack_require__) {

    "use strict";

    Object.defineProperty(exports, "__esModule", { value: true });
    var lodash_1 = __webpack_require__(0);

    var ValidationError = function () {
        function ValidationError() {
            _classCallCheck(this, ValidationError);
        }

        _createClass(ValidationError, [{
            key: 'serialize',
            value: function serialize() {
                return {
                    code: this.code,
                    data: this.data
                };
            }
        }, {
            key: 'deserialize',
            value: function deserialize(obj) {
                this.code = obj.code;
                this.data = obj.data;
                return this;
            }
        }]);

        return ValidationError;
    }();

    exports.ValidationError = ValidationError;

    var ValidationList = function () {
        function ValidationList() {
            _classCallCheck(this, ValidationList);

            this.errors = new Array();
        }

        _createClass(ValidationList, [{
            key: 'hasErrors',
            value: function hasErrors() {
                return this.errors.length > 0;
            }
        }, {
            key: 'setErrors',
            value: function setErrors(obj) {
                this._extract(obj);
            }
        }, {
            key: 'first',
            value: function first() {
                if (this.hasErrors()) {
                    return this.errors[0];
                }
            }
        }, {
            key: 'serialize',
            value: function serialize() {
                var res = [];
                var _iteratorNormalCompletion4 = true;
                var _didIteratorError4 = false;
                var _iteratorError4 = undefined;

                try {
                    for (var _iterator4 = this.errors[Symbol.iterator](), _step4; !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
                        var e = _step4.value;

                        res.push(e.serialize());
                    }
                } catch (err) {
                    _didIteratorError4 = true;
                    _iteratorError4 = err;
                } finally {
                    try {
                        if (!_iteratorNormalCompletion4 && _iterator4.return) {
                            _iterator4.return();
                        }
                    } finally {
                        if (_didIteratorError4) {
                            throw _iteratorError4;
                        }
                    }
                }

                return res;
            }
        }, {
            key: 'deserialize',
            value: function deserialize(obj) {
                return this._extract(obj);
            }
        }, {
            key: '_extract',
            value: function _extract(obj) {
                var _this11 = this;

                this.errors = new Array();
                if (lodash_1.isArray(obj)) {
                    lodash_1.each(obj, function (e) {
                        return _this11.errors.push(new ValidationError().deserialize(e));
                    });
                }
                return this;
            }
        }]);

        return ValidationList;
    }();

    exports.ValidationList = ValidationList;

    var ValidableObject = function () {
        function ValidableObject() {
            _classCallCheck(this, ValidableObject);

            this.errors = new Map();
        }

        _createClass(ValidableObject, [{
            key: 'hasErrors',
            value: function hasErrors() {
                return this.errors.size > 0;
            }
        }, {
            key: 'hasChildErrors',
            value: function hasChildErrors() {
                return false;
            }
        }, {
            key: 'setErrors',
            value: function setErrors(obj) {
                this._extract(obj);
            }
        }, {
            key: 'serialize',
            value: function serialize() {
                var res = {};
                this.errors.forEach(function (e, id) {
                    return res['' + id] = e.serialize();
                });
                if (lodash_1.isEmpty(res)) {
                    return {};
                }
                return { errors: res };
            }
        }, {
            key: 'deserialize',
            value: function deserialize(obj) {
                return this._extract(obj.errors);
            }
        }, {
            key: '_extract',
            value: function _extract(obj) {
                var _this12 = this;

                this.errors = new Map();
                if (lodash_1.isObject(obj)) {
                    lodash_1.each(obj, function (v, k) {
                        var id = lodash_1.toSafeInteger(k);
                        var l = new ValidationList().deserialize(v);
                        if (l.hasErrors()) {
                            _this12.errors.set(k, l);
                        }
                    });
                }
                return this;
            }
        }]);

        return ValidableObject;
    }();

    exports.ValidableObject = ValidableObject;
    //
    // export class ValidationList implements ValidationContainer, Serializable{
    //   errors: Array<ValidationError>;
    //
    //   hasErrors(): boolean {
    //     return this.errors.length > 0;
    //   }
    //
    //   setErrors(errs: any) {
    //     this.errors = new Array<ValidationError>();
    //     if (isArray(obj)) {
    //       each(obj, (e) =>
    //         this.errors.push(new ValidationError().deserialize(e)));
    //     }
    //   }
    //
    //   // first(): ValidationError {
    //   //   if (this.hasErrors()) {
    //   //     return this.errors[0];
    //   //   }
    //   // }
    //
    //   serialize(): any {
    //     let res = [];
    //     for (let e of this.errors) {
    //       res.push(e.serialize());
    //     }
    //     return res;
    //   }
    //
    //
    //   deserialize(obj: any): ValidationList {
    //     this.errors = new Array<ValidationError>();
    //     if (isArray(obj)) {
    //       each(obj, (e) =>
    //         this.errors.push(new ValidationError().deserialize(e)));
    //     }
    //     return this;
    //   }
    // }


    /***/
}]);

//# sourceMappingURL=bundle.js.map