'use strict';

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

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
    /******/return __webpack_require__(__webpack_require__.s = 13);
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
    __export(__webpack_require__(8));

    /***/
},
/* 2 */
/***/function (module, exports, __webpack_require__) {

    "use strict";

    Object.defineProperty(exports, "__esModule", { value: true });
    var lodash_1 = __webpack_require__(0);
    var errors_1 = __webpack_require__(1);

    var Field = function () {
        function Field(id) {
            _classCallCheck(this, Field);

            this.name = "";
            this.help = "";
            this.mandatory = false;
            this.id = id;
        }

        _createClass(Field, [{
            key: 'setErrors',
            value: function setErrors(errors) {
                this.errors = errors;
            }
        }, {
            key: 'removeErrors',
            value: function removeErrors() {
                delete this.errors;
            }
        }, {
            key: 'hasErrors',
            value: function hasErrors() {
                return !lodash_1.isEmpty(this.errors);
            }
        }, {
            key: 'serialize',
            value: function serialize() {
                var res = {
                    name: this.name,
                    type: this.type(),
                    help: this.help,
                    mandatory: this.mandatory
                };
                if (this.errors.hasError()) {
                    res['errors'] = this.errors.serialize();
                }
                return res;
            }
        }, {
            key: 'deserialize',
            value: function deserialize(obj) {
                if (lodash_1.isEmpty(obj)) {
                    return this;
                }
                this.name = obj.name;
                this.help = obj.help;
                this.mandatory = obj.mandatory;
                if (lodash_1.isArray(obj.errors) && !lodash_1.isEmpty(obj.errors)) {
                    this.errors = new errors_1.ValidationList().deserialize(obj.errors);
                }
                return this;
            }
        }]);

        return Field;
    }();

    exports.Field = Field;

    /***/
},
/* 3 */
/***/function (module, exports, __webpack_require__) {

    "use strict";

    Object.defineProperty(exports, "__esModule", { value: true });
    var fsm_1 = __webpack_require__(12);
    exports.FSM = fsm_1.FSM;
    var state_1 = __webpack_require__(4);
    exports.State = state_1.State;

    /***/
},
/* 4 */
/***/function (module, exports, __webpack_require__) {

    "use strict";

    Object.defineProperty(exports, "__esModule", { value: true });
    var lodash_1 = __webpack_require__(0);

    var State = function () {
        function State(id) {
            _classCallCheck(this, State);

            this.id = id;
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
                return {
                    name: this.name,
                    fields: this.fields,
                    nexts: this.nexts
                };
            }
        }, {
            key: 'deserialize',
            value: function deserialize(obj) {
                if (lodash_1.isObject(obj)) {
                    this.name = obj.name;
                    this.fields = obj.fields;
                    this.nexts = obj.nexts;
                }
                return this;
            }
        }]);

        return State;
    }();

    exports.State = State;

    /***/
},
/* 5 */
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
/* 6 */
/***/function (module, exports, __webpack_require__) {

    "use strict";

    function __export(m) {
        for (var p in m) {
            if (!exports.hasOwnProperty(p)) exports[p] = m[p];
        }
    }
    Object.defineProperty(exports, "__esModule", { value: true });
    var form_1 = __webpack_require__(11);
    exports.Form = form_1.Form;
    __export(__webpack_require__(3));
    __export(__webpack_require__(10));

    /***/
},
/* 7 */
/***/function (module, exports, __webpack_require__) {

    "use strict";

    Object.defineProperty(exports, "__esModule", { value: true });
    var user_1 = __webpack_require__(5);
    exports.User = user_1.User;

    /***/
},
/* 8 */
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
        }

        _createClass(ValidationList, [{
            key: 'hasError',
            value: function hasError() {
                return this.errors.length > 0;
            }
        }, {
            key: 'first',
            value: function first() {
                if (this.hasError()) {
                    return this.errors[0];
                }
            }
        }, {
            key: 'serialize',
            value: function serialize() {
                var res = [];
                var _iteratorNormalCompletion = true;
                var _didIteratorError = false;
                var _iteratorError = undefined;

                try {
                    for (var _iterator = this.errors[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                        var e = _step.value;

                        res.push(e.serialize());
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

                return res;
            }
        }, {
            key: 'deserialize',
            value: function deserialize(obj) {
                var _this = this;

                this.errors = new Array();
                if (lodash_1.isArray(obj)) {
                    lodash_1.each(obj, function (e) {
                        return _this.errors.push(new ValidationError().deserialize(e));
                    });
                }
                return this;
            }
        }]);

        return ValidationList;
    }();

    exports.ValidationList = ValidationList;

    var ValidationMap = function () {
        function ValidationMap() {
            _classCallCheck(this, ValidationMap);
        }

        _createClass(ValidationMap, [{
            key: 'hasError',
            value: function hasError() {
                return this.errors.size > 0;
            }
        }, {
            key: 'serialize',
            value: function serialize() {
                var res = {};
                this.errors.forEach(function (e, id) {
                    return res['' + id] = e.serialize();
                });
                return res;
            }
        }, {
            key: 'deserialize',
            value: function deserialize(obj) {
                var _this2 = this;

                this.errors = new Map();
                if (lodash_1.isObject(obj)) {
                    lodash_1.each(obj, function (v, k) {
                        var id = lodash_1.toSafeInteger(k);
                        _this2.errors.set(id, new ValidationError().deserialize(v));
                    });
                }
                return this;
            }
        }]);

        return ValidationMap;
    }();

    exports.ValidationMap = ValidationMap;

    /***/
},
/* 9 */
/***/function (module, exports, __webpack_require__) {

    "use strict";

    Object.defineProperty(exports, "__esModule", { value: true });
    var field_1 = __webpack_require__(2);

    var Boolean = function (_field_1$Field) {
        _inherits(Boolean, _field_1$Field);

        function Boolean() {
            _classCallCheck(this, Boolean);

            var _this3 = _possibleConstructorReturn(this, (Boolean.__proto__ || Object.getPrototypeOf(Boolean)).apply(this, arguments));

            _this3.label = "";
            _this3.default = false;
            return _this3;
        }

        _createClass(Boolean, [{
            key: 'type',
            value: function type() {
                return "boolean";
            }
        }, {
            key: 'serialize',
            value: function serialize() {
                return Object.assign({}, _get(Boolean.prototype.__proto__ || Object.getPrototypeOf(Boolean.prototype), 'serialize', this).call(this), { label: this.label, default: this.default });
            }
        }, {
            key: 'deserialize',
            value: function deserialize(obj) {
                _get(Boolean.prototype.__proto__ || Object.getPrototypeOf(Boolean.prototype), 'deserialize', this).call(this, obj);
                this.label = obj.label;
                this.default = obj.default;
                return this;
            }
        }]);

        return Boolean;
    }(field_1.Field);

    exports.Boolean = Boolean;

    /***/
},
/* 10 */
/***/function (module, exports, __webpack_require__) {

    "use strict";

    Object.defineProperty(exports, "__esModule", { value: true });
    var field_1 = __webpack_require__(2);
    exports.Field = field_1.Field;
    var boolean_1 = __webpack_require__(9);
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

    /***/
},
/* 11 */
/***/function (module, exports, __webpack_require__) {

    "use strict";

    Object.defineProperty(exports, "__esModule", { value: true });
    var lodash_1 = __webpack_require__(0);
    var user_1 = __webpack_require__(5);
    var fsm_1 = __webpack_require__(3);

    var Form = function () {
        function Form() {
            _classCallCheck(this, Form);
        }

        _createClass(Form, [{
            key: 'serialize',
            value: function serialize() {
                return {
                    url: this.url,
                    owner: this.owner.serialize(),
                    created: this.created.toJSON(),
                    updated: this.updated.toJSON(),
                    proto: this.proto,
                    version: this.version,
                    states: this.states,
                    name: this.name,
                    description: this.description,
                    fsm: this.fsm.serialize()
                };
            }
        }, {
            key: 'deserialize',
            value: function deserialize(obj) {
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
                if (lodash_1.isObject(obj.fsm)) {
                    this.fsm = new fsm_1.FSM().deserialize(obj.fsm);
                }
                return this;
            }
        }]);

        return Form;
    }();

    exports.Form = Form;

    /***/
},
/* 12 */
/***/function (module, exports, __webpack_require__) {

    "use strict";

    Object.defineProperty(exports, "__esModule", { value: true });
    var lodash_1 = __webpack_require__(0);
    var state_1 = __webpack_require__(4);

    var FSM = function () {
        function FSM() {
            _classCallCheck(this, FSM);
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
                var _iteratorNormalCompletion2 = true;
                var _didIteratorError2 = false;
                var _iteratorError2 = undefined;

                try {
                    for (var _iterator2 = this.states.values()[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
                        var s = _step2.value;

                        if (s.hasField(field)) {
                            return true;
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
                var _iteratorNormalCompletion3 = true;
                var _didIteratorError3 = false;
                var _iteratorError3 = undefined;

                try {
                    for (var _iterator3 = this.states.values()[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
                        var s = _step3.value;

                        if (s.hasField(field)) {
                            res.push(s);
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

                return res;
            }
        }, {
            key: 'serialize',
            value: function serialize() {
                var tmp = {};
                this.states.forEach(function (s, id) {
                    return tmp['' + id] = s.serialize();
                });
                return {
                    initial: this.initial.id,
                    states: tmp
                };
            }
        }, {
            key: 'deserialize',
            value: function deserialize(obj) {
                var _this4 = this;

                this.states = new Map();
                if (lodash_1.isObject(obj.states)) {
                    lodash_1.each(obj.states, function (v, k) {
                        var id = lodash_1.toSafeInteger(k);
                        _this4.states.set(id, new state_1.State(id).deserialize(v));
                    });
                    this.initial = this.states.get(lodash_1.toSafeInteger(obj.initial));
                }
                return this;
            }
        }]);

        return FSM;
    }();

    exports.FSM = FSM;

    /***/
},
/* 13 */
/***/function (module, exports, __webpack_require__) {

    "use strict";

    function __export(m) {
        for (var p in m) {
            if (!exports.hasOwnProperty(p)) exports[p] = m[p];
        }
    }
    Object.defineProperty(exports, "__esModule", { value: true });
    __export(__webpack_require__(1));
    __export(__webpack_require__(6));
    __export(__webpack_require__(7));

    /***/
}]);

//# sourceMappingURL=bundle.js.map