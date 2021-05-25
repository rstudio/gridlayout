(function() {
  var __create = Object.create;
  var __defProp = Object.defineProperty;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __getProtoOf = Object.getPrototypeOf;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __markAsModule = function(target) {
    return __defProp(target, "__esModule", { value: true });
  };
  var __commonJS = function(cb, mod) {
    return function __require() {
      return mod || (0, cb[Object.keys(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
    };
  };
  var __reExport = function(target, module, desc) {
    if (module && typeof module === "object" || typeof module === "function")
      for (var keys2 = __getOwnPropNames(module), i = 0, n = keys2.length, key; i < n; i++) {
        key = keys2[i];
        if (!__hasOwnProp.call(target, key) && key !== "default")
          __defProp(target, key, { get: function(k) {
            return module[k];
          }.bind(null, key), enumerable: !(desc = __getOwnPropDesc(module, key)) || desc.enumerable });
      }
    return target;
  };
  var __toModule = function(module) {
    return __reExport(__markAsModule(__defProp(module != null ? __create(__getProtoOf(module)) : {}, "default", module && module.__esModule && "default" in module ? { get: function() {
      return module.default;
    }, enumerable: true } : { value: module, enumerable: true })), module);
  };

  // node_modules/core-js/internals/global.js
  var require_global = __commonJS({
    "node_modules/core-js/internals/global.js": function(exports, module) {
      var check = function(it) {
        return it && it.Math == Math && it;
      };
      module.exports = check(typeof globalThis == "object" && globalThis) || check(typeof window == "object" && window) || check(typeof self == "object" && self) || check(typeof global == "object" && global) || function() {
        return this;
      }() || Function("return this")();
    }
  });

  // node_modules/core-js/internals/fails.js
  var require_fails = __commonJS({
    "node_modules/core-js/internals/fails.js": function(exports, module) {
      module.exports = function(exec) {
        try {
          return !!exec();
        } catch (error) {
          return true;
        }
      };
    }
  });

  // node_modules/core-js/internals/descriptors.js
  var require_descriptors = __commonJS({
    "node_modules/core-js/internals/descriptors.js": function(exports, module) {
      var fails7 = require_fails();
      module.exports = !fails7(function() {
        return Object.defineProperty({}, 1, { get: function() {
          return 7;
        } })[1] != 7;
      });
    }
  });

  // node_modules/core-js/internals/object-property-is-enumerable.js
  var require_object_property_is_enumerable = __commonJS({
    "node_modules/core-js/internals/object-property-is-enumerable.js": function(exports) {
      "use strict";
      var $propertyIsEnumerable2 = {}.propertyIsEnumerable;
      var getOwnPropertyDescriptor4 = Object.getOwnPropertyDescriptor;
      var NASHORN_BUG = getOwnPropertyDescriptor4 && !$propertyIsEnumerable2.call({ 1: 2 }, 1);
      exports.f = NASHORN_BUG ? function propertyIsEnumerable2(V) {
        var descriptor = getOwnPropertyDescriptor4(this, V);
        return !!descriptor && descriptor.enumerable;
      } : $propertyIsEnumerable2;
    }
  });

  // node_modules/core-js/internals/create-property-descriptor.js
  var require_create_property_descriptor = __commonJS({
    "node_modules/core-js/internals/create-property-descriptor.js": function(exports, module) {
      module.exports = function(bitmap, value) {
        return {
          enumerable: !(bitmap & 1),
          configurable: !(bitmap & 2),
          writable: !(bitmap & 4),
          value: value
        };
      };
    }
  });

  // node_modules/core-js/internals/classof-raw.js
  var require_classof_raw = __commonJS({
    "node_modules/core-js/internals/classof-raw.js": function(exports, module) {
      var toString2 = {}.toString;
      module.exports = function(it) {
        return toString2.call(it).slice(8, -1);
      };
    }
  });

  // node_modules/core-js/internals/indexed-object.js
  var require_indexed_object = __commonJS({
    "node_modules/core-js/internals/indexed-object.js": function(exports, module) {
      var fails7 = require_fails();
      var classof2 = require_classof_raw();
      var split = "".split;
      module.exports = fails7(function() {
        return !Object("z").propertyIsEnumerable(0);
      }) ? function(it) {
        return classof2(it) == "String" ? split.call(it, "") : Object(it);
      } : Object;
    }
  });

  // node_modules/core-js/internals/require-object-coercible.js
  var require_require_object_coercible = __commonJS({
    "node_modules/core-js/internals/require-object-coercible.js": function(exports, module) {
      module.exports = function(it) {
        if (it == void 0)
          throw TypeError("Can't call method on " + it);
        return it;
      };
    }
  });

  // node_modules/core-js/internals/to-indexed-object.js
  var require_to_indexed_object = __commonJS({
    "node_modules/core-js/internals/to-indexed-object.js": function(exports, module) {
      var IndexedObject2 = require_indexed_object();
      var requireObjectCoercible5 = require_require_object_coercible();
      module.exports = function(it) {
        return IndexedObject2(requireObjectCoercible5(it));
      };
    }
  });

  // node_modules/core-js/internals/is-object.js
  var require_is_object = __commonJS({
    "node_modules/core-js/internals/is-object.js": function(exports, module) {
      module.exports = function(it) {
        return typeof it === "object" ? it !== null : typeof it === "function";
      };
    }
  });

  // node_modules/core-js/internals/to-primitive.js
  var require_to_primitive = __commonJS({
    "node_modules/core-js/internals/to-primitive.js": function(exports, module) {
      var isObject5 = require_is_object();
      module.exports = function(input, PREFERRED_STRING) {
        if (!isObject5(input))
          return input;
        var fn, val;
        if (PREFERRED_STRING && typeof (fn = input.toString) == "function" && !isObject5(val = fn.call(input)))
          return val;
        if (typeof (fn = input.valueOf) == "function" && !isObject5(val = fn.call(input)))
          return val;
        if (!PREFERRED_STRING && typeof (fn = input.toString) == "function" && !isObject5(val = fn.call(input)))
          return val;
        throw TypeError("Can't convert object to primitive value");
      };
    }
  });

  // node_modules/core-js/internals/to-object.js
  var require_to_object = __commonJS({
    "node_modules/core-js/internals/to-object.js": function(exports, module) {
      var requireObjectCoercible5 = require_require_object_coercible();
      module.exports = function(argument) {
        return Object(requireObjectCoercible5(argument));
      };
    }
  });

  // node_modules/core-js/internals/has.js
  var require_has = __commonJS({
    "node_modules/core-js/internals/has.js": function(exports, module) {
      var toObject5 = require_to_object();
      var hasOwnProperty = {}.hasOwnProperty;
      module.exports = function hasOwn(it, key) {
        return hasOwnProperty.call(toObject5(it), key);
      };
    }
  });

  // node_modules/core-js/internals/document-create-element.js
  var require_document_create_element = __commonJS({
    "node_modules/core-js/internals/document-create-element.js": function(exports, module) {
      var global7 = require_global();
      var isObject5 = require_is_object();
      var document2 = global7.document;
      var EXISTS = isObject5(document2) && isObject5(document2.createElement);
      module.exports = function(it) {
        return EXISTS ? document2.createElement(it) : {};
      };
    }
  });

  // node_modules/core-js/internals/ie8-dom-define.js
  var require_ie8_dom_define = __commonJS({
    "node_modules/core-js/internals/ie8-dom-define.js": function(exports, module) {
      var DESCRIPTORS9 = require_descriptors();
      var fails7 = require_fails();
      var createElement = require_document_create_element();
      module.exports = !DESCRIPTORS9 && !fails7(function() {
        return Object.defineProperty(createElement("div"), "a", {
          get: function() {
            return 7;
          }
        }).a != 7;
      });
    }
  });

  // node_modules/core-js/internals/object-get-own-property-descriptor.js
  var require_object_get_own_property_descriptor = __commonJS({
    "node_modules/core-js/internals/object-get-own-property-descriptor.js": function(exports) {
      var DESCRIPTORS9 = require_descriptors();
      var propertyIsEnumerableModule2 = require_object_property_is_enumerable();
      var createPropertyDescriptor2 = require_create_property_descriptor();
      var toIndexedObject6 = require_to_indexed_object();
      var toPrimitive3 = require_to_primitive();
      var has4 = require_has();
      var IE8_DOM_DEFINE = require_ie8_dom_define();
      var $getOwnPropertyDescriptor2 = Object.getOwnPropertyDescriptor;
      exports.f = DESCRIPTORS9 ? $getOwnPropertyDescriptor2 : function getOwnPropertyDescriptor4(O, P) {
        O = toIndexedObject6(O);
        P = toPrimitive3(P, true);
        if (IE8_DOM_DEFINE)
          try {
            return $getOwnPropertyDescriptor2(O, P);
          } catch (error) {
          }
        if (has4(O, P))
          return createPropertyDescriptor2(!propertyIsEnumerableModule2.f.call(O, P), O[P]);
      };
    }
  });

  // node_modules/core-js/internals/an-object.js
  var require_an_object = __commonJS({
    "node_modules/core-js/internals/an-object.js": function(exports, module) {
      var isObject5 = require_is_object();
      module.exports = function(it) {
        if (!isObject5(it)) {
          throw TypeError(String(it) + " is not an object");
        }
        return it;
      };
    }
  });

  // node_modules/core-js/internals/object-define-property.js
  var require_object_define_property = __commonJS({
    "node_modules/core-js/internals/object-define-property.js": function(exports) {
      var DESCRIPTORS9 = require_descriptors();
      var IE8_DOM_DEFINE = require_ie8_dom_define();
      var anObject6 = require_an_object();
      var toPrimitive3 = require_to_primitive();
      var $defineProperty2 = Object.defineProperty;
      exports.f = DESCRIPTORS9 ? $defineProperty2 : function defineProperty5(O, P, Attributes) {
        anObject6(O);
        P = toPrimitive3(P, true);
        anObject6(Attributes);
        if (IE8_DOM_DEFINE)
          try {
            return $defineProperty2(O, P, Attributes);
          } catch (error) {
          }
        if ("get" in Attributes || "set" in Attributes)
          throw TypeError("Accessors not supported");
        if ("value" in Attributes)
          O[P] = Attributes.value;
        return O;
      };
    }
  });

  // node_modules/core-js/internals/create-non-enumerable-property.js
  var require_create_non_enumerable_property = __commonJS({
    "node_modules/core-js/internals/create-non-enumerable-property.js": function(exports, module) {
      var DESCRIPTORS9 = require_descriptors();
      var definePropertyModule2 = require_object_define_property();
      var createPropertyDescriptor2 = require_create_property_descriptor();
      module.exports = DESCRIPTORS9 ? function(object, key, value) {
        return definePropertyModule2.f(object, key, createPropertyDescriptor2(1, value));
      } : function(object, key, value) {
        object[key] = value;
        return object;
      };
    }
  });

  // node_modules/core-js/internals/set-global.js
  var require_set_global = __commonJS({
    "node_modules/core-js/internals/set-global.js": function(exports, module) {
      var global7 = require_global();
      var createNonEnumerableProperty4 = require_create_non_enumerable_property();
      module.exports = function(key, value) {
        try {
          createNonEnumerableProperty4(global7, key, value);
        } catch (error) {
          global7[key] = value;
        }
        return value;
      };
    }
  });

  // node_modules/core-js/internals/shared-store.js
  var require_shared_store = __commonJS({
    "node_modules/core-js/internals/shared-store.js": function(exports, module) {
      var global7 = require_global();
      var setGlobal = require_set_global();
      var SHARED = "__core-js_shared__";
      var store = global7[SHARED] || setGlobal(SHARED, {});
      module.exports = store;
    }
  });

  // node_modules/core-js/internals/inspect-source.js
  var require_inspect_source = __commonJS({
    "node_modules/core-js/internals/inspect-source.js": function(exports, module) {
      var store = require_shared_store();
      var functionToString = Function.toString;
      if (typeof store.inspectSource != "function") {
        store.inspectSource = function(it) {
          return functionToString.call(it);
        };
      }
      module.exports = store.inspectSource;
    }
  });

  // node_modules/core-js/internals/native-weak-map.js
  var require_native_weak_map = __commonJS({
    "node_modules/core-js/internals/native-weak-map.js": function(exports, module) {
      var global7 = require_global();
      var inspectSource = require_inspect_source();
      var WeakMap = global7.WeakMap;
      module.exports = typeof WeakMap === "function" && /native code/.test(inspectSource(WeakMap));
    }
  });

  // node_modules/core-js/internals/is-pure.js
  var require_is_pure = __commonJS({
    "node_modules/core-js/internals/is-pure.js": function(exports, module) {
      module.exports = false;
    }
  });

  // node_modules/core-js/internals/shared.js
  var require_shared = __commonJS({
    "node_modules/core-js/internals/shared.js": function(exports, module) {
      var IS_PURE2 = require_is_pure();
      var store = require_shared_store();
      (module.exports = function(key, value) {
        return store[key] || (store[key] = value !== void 0 ? value : {});
      })("versions", []).push({
        version: "3.12.1",
        mode: IS_PURE2 ? "pure" : "global",
        copyright: "\xA9 2021 Denis Pushkarev (zloirock.ru)"
      });
    }
  });

  // node_modules/core-js/internals/uid.js
  var require_uid = __commonJS({
    "node_modules/core-js/internals/uid.js": function(exports, module) {
      var id = 0;
      var postfix = Math.random();
      module.exports = function(key) {
        return "Symbol(" + String(key === void 0 ? "" : key) + ")_" + (++id + postfix).toString(36);
      };
    }
  });

  // node_modules/core-js/internals/shared-key.js
  var require_shared_key = __commonJS({
    "node_modules/core-js/internals/shared-key.js": function(exports, module) {
      var shared2 = require_shared();
      var uid2 = require_uid();
      var keys2 = shared2("keys");
      module.exports = function(key) {
        return keys2[key] || (keys2[key] = uid2(key));
      };
    }
  });

  // node_modules/core-js/internals/hidden-keys.js
  var require_hidden_keys = __commonJS({
    "node_modules/core-js/internals/hidden-keys.js": function(exports, module) {
      module.exports = {};
    }
  });

  // node_modules/core-js/internals/internal-state.js
  var require_internal_state = __commonJS({
    "node_modules/core-js/internals/internal-state.js": function(exports, module) {
      var NATIVE_WEAK_MAP = require_native_weak_map();
      var global7 = require_global();
      var isObject5 = require_is_object();
      var createNonEnumerableProperty4 = require_create_non_enumerable_property();
      var objectHas = require_has();
      var shared2 = require_shared_store();
      var sharedKey2 = require_shared_key();
      var hiddenKeys2 = require_hidden_keys();
      var OBJECT_ALREADY_INITIALIZED = "Object already initialized";
      var WeakMap = global7.WeakMap;
      var set;
      var get;
      var has4;
      var enforce = function(it) {
        return has4(it) ? get(it) : set(it, {});
      };
      var getterFor = function(TYPE) {
        return function(it) {
          var state;
          if (!isObject5(it) || (state = get(it)).type !== TYPE) {
            throw TypeError("Incompatible receiver, " + TYPE + " required");
          }
          return state;
        };
      };
      if (NATIVE_WEAK_MAP || shared2.state) {
        store = shared2.state || (shared2.state = new WeakMap());
        wmget = store.get;
        wmhas = store.has;
        wmset = store.set;
        set = function(it, metadata) {
          if (wmhas.call(store, it))
            throw new TypeError(OBJECT_ALREADY_INITIALIZED);
          metadata.facade = it;
          wmset.call(store, it, metadata);
          return metadata;
        };
        get = function(it) {
          return wmget.call(store, it) || {};
        };
        has4 = function(it) {
          return wmhas.call(store, it);
        };
      } else {
        STATE = sharedKey2("state");
        hiddenKeys2[STATE] = true;
        set = function(it, metadata) {
          if (objectHas(it, STATE))
            throw new TypeError(OBJECT_ALREADY_INITIALIZED);
          metadata.facade = it;
          createNonEnumerableProperty4(it, STATE, metadata);
          return metadata;
        };
        get = function(it) {
          return objectHas(it, STATE) ? it[STATE] : {};
        };
        has4 = function(it) {
          return objectHas(it, STATE);
        };
      }
      var store;
      var wmget;
      var wmhas;
      var wmset;
      var STATE;
      module.exports = {
        set: set,
        get: get,
        has: has4,
        enforce: enforce,
        getterFor: getterFor
      };
    }
  });

  // node_modules/core-js/internals/redefine.js
  var require_redefine = __commonJS({
    "node_modules/core-js/internals/redefine.js": function(exports, module) {
      var global7 = require_global();
      var createNonEnumerableProperty4 = require_create_non_enumerable_property();
      var has4 = require_has();
      var setGlobal = require_set_global();
      var inspectSource = require_inspect_source();
      var InternalStateModule3 = require_internal_state();
      var getInternalState3 = InternalStateModule3.get;
      var enforceInternalState = InternalStateModule3.enforce;
      var TEMPLATE = String(String).split("String");
      (module.exports = function(O, key, value, options) {
        var unsafe = options ? !!options.unsafe : false;
        var simple = options ? !!options.enumerable : false;
        var noTargetGet = options ? !!options.noTargetGet : false;
        var state;
        if (typeof value == "function") {
          if (typeof key == "string" && !has4(value, "name")) {
            createNonEnumerableProperty4(value, "name", key);
          }
          state = enforceInternalState(value);
          if (!state.source) {
            state.source = TEMPLATE.join(typeof key == "string" ? key : "");
          }
        }
        if (O === global7) {
          if (simple)
            O[key] = value;
          else
            setGlobal(key, value);
          return;
        } else if (!unsafe) {
          delete O[key];
        } else if (!noTargetGet && O[key]) {
          simple = true;
        }
        if (simple)
          O[key] = value;
        else
          createNonEnumerableProperty4(O, key, value);
      })(Function.prototype, "toString", function toString2() {
        return typeof this == "function" && getInternalState3(this).source || inspectSource(this);
      });
    }
  });

  // node_modules/core-js/internals/path.js
  var require_path = __commonJS({
    "node_modules/core-js/internals/path.js": function(exports, module) {
      var global7 = require_global();
      module.exports = global7;
    }
  });

  // node_modules/core-js/internals/get-built-in.js
  var require_get_built_in = __commonJS({
    "node_modules/core-js/internals/get-built-in.js": function(exports, module) {
      var path = require_path();
      var global7 = require_global();
      var aFunction = function(variable) {
        return typeof variable == "function" ? variable : void 0;
      };
      module.exports = function(namespace, method) {
        return arguments.length < 2 ? aFunction(path[namespace]) || aFunction(global7[namespace]) : path[namespace] && path[namespace][method] || global7[namespace] && global7[namespace][method];
      };
    }
  });

  // node_modules/core-js/internals/to-integer.js
  var require_to_integer = __commonJS({
    "node_modules/core-js/internals/to-integer.js": function(exports, module) {
      var ceil = Math.ceil;
      var floor = Math.floor;
      module.exports = function(argument) {
        return isNaN(argument = +argument) ? 0 : (argument > 0 ? floor : ceil)(argument);
      };
    }
  });

  // node_modules/core-js/internals/to-length.js
  var require_to_length = __commonJS({
    "node_modules/core-js/internals/to-length.js": function(exports, module) {
      var toInteger3 = require_to_integer();
      var min4 = Math.min;
      module.exports = function(argument) {
        return argument > 0 ? min4(toInteger3(argument), 9007199254740991) : 0;
      };
    }
  });

  // node_modules/core-js/internals/to-absolute-index.js
  var require_to_absolute_index = __commonJS({
    "node_modules/core-js/internals/to-absolute-index.js": function(exports, module) {
      var toInteger3 = require_to_integer();
      var max4 = Math.max;
      var min4 = Math.min;
      module.exports = function(index, length) {
        var integer = toInteger3(index);
        return integer < 0 ? max4(integer + length, 0) : min4(integer, length);
      };
    }
  });

  // node_modules/core-js/internals/array-includes.js
  var require_array_includes = __commonJS({
    "node_modules/core-js/internals/array-includes.js": function(exports, module) {
      var toIndexedObject6 = require_to_indexed_object();
      var toLength7 = require_to_length();
      var toAbsoluteIndex3 = require_to_absolute_index();
      var createMethod = function(IS_INCLUDES) {
        return function($this, el, fromIndex) {
          var O = toIndexedObject6($this);
          var length = toLength7(O.length);
          var index = toAbsoluteIndex3(fromIndex, length);
          var value;
          if (IS_INCLUDES && el != el)
            while (length > index) {
              value = O[index++];
              if (value != value)
                return true;
            }
          else
            for (; length > index; index++) {
              if ((IS_INCLUDES || index in O) && O[index] === el)
                return IS_INCLUDES || index || 0;
            }
          return !IS_INCLUDES && -1;
        };
      };
      module.exports = {
        includes: createMethod(true),
        indexOf: createMethod(false)
      };
    }
  });

  // node_modules/core-js/internals/object-keys-internal.js
  var require_object_keys_internal = __commonJS({
    "node_modules/core-js/internals/object-keys-internal.js": function(exports, module) {
      var has4 = require_has();
      var toIndexedObject6 = require_to_indexed_object();
      var indexOf = require_array_includes().indexOf;
      var hiddenKeys2 = require_hidden_keys();
      module.exports = function(object, names) {
        var O = toIndexedObject6(object);
        var i = 0;
        var result = [];
        var key;
        for (key in O)
          !has4(hiddenKeys2, key) && has4(O, key) && result.push(key);
        while (names.length > i)
          if (has4(O, key = names[i++])) {
            ~indexOf(result, key) || result.push(key);
          }
        return result;
      };
    }
  });

  // node_modules/core-js/internals/enum-bug-keys.js
  var require_enum_bug_keys = __commonJS({
    "node_modules/core-js/internals/enum-bug-keys.js": function(exports, module) {
      module.exports = [
        "constructor",
        "hasOwnProperty",
        "isPrototypeOf",
        "propertyIsEnumerable",
        "toLocaleString",
        "toString",
        "valueOf"
      ];
    }
  });

  // node_modules/core-js/internals/object-get-own-property-names.js
  var require_object_get_own_property_names = __commonJS({
    "node_modules/core-js/internals/object-get-own-property-names.js": function(exports) {
      var internalObjectKeys = require_object_keys_internal();
      var enumBugKeys = require_enum_bug_keys();
      var hiddenKeys2 = enumBugKeys.concat("length", "prototype");
      exports.f = Object.getOwnPropertyNames || function getOwnPropertyNames3(O) {
        return internalObjectKeys(O, hiddenKeys2);
      };
    }
  });

  // node_modules/core-js/internals/object-get-own-property-symbols.js
  var require_object_get_own_property_symbols = __commonJS({
    "node_modules/core-js/internals/object-get-own-property-symbols.js": function(exports) {
      exports.f = Object.getOwnPropertySymbols;
    }
  });

  // node_modules/core-js/internals/own-keys.js
  var require_own_keys = __commonJS({
    "node_modules/core-js/internals/own-keys.js": function(exports, module) {
      var getBuiltIn2 = require_get_built_in();
      var getOwnPropertyNamesModule2 = require_object_get_own_property_names();
      var getOwnPropertySymbolsModule2 = require_object_get_own_property_symbols();
      var anObject6 = require_an_object();
      module.exports = getBuiltIn2("Reflect", "ownKeys") || function ownKeys5(it) {
        var keys2 = getOwnPropertyNamesModule2.f(anObject6(it));
        var getOwnPropertySymbols3 = getOwnPropertySymbolsModule2.f;
        return getOwnPropertySymbols3 ? keys2.concat(getOwnPropertySymbols3(it)) : keys2;
      };
    }
  });

  // node_modules/core-js/internals/copy-constructor-properties.js
  var require_copy_constructor_properties = __commonJS({
    "node_modules/core-js/internals/copy-constructor-properties.js": function(exports, module) {
      var has4 = require_has();
      var ownKeys5 = require_own_keys();
      var getOwnPropertyDescriptorModule3 = require_object_get_own_property_descriptor();
      var definePropertyModule2 = require_object_define_property();
      module.exports = function(target, source) {
        var keys2 = ownKeys5(source);
        var defineProperty5 = definePropertyModule2.f;
        var getOwnPropertyDescriptor4 = getOwnPropertyDescriptorModule3.f;
        for (var i = 0; i < keys2.length; i++) {
          var key = keys2[i];
          if (!has4(target, key))
            defineProperty5(target, key, getOwnPropertyDescriptor4(source, key));
        }
      };
    }
  });

  // node_modules/core-js/internals/is-forced.js
  var require_is_forced = __commonJS({
    "node_modules/core-js/internals/is-forced.js": function(exports, module) {
      var fails7 = require_fails();
      var replacement = /#|\.prototype\./;
      var isForced2 = function(feature, detection) {
        var value = data[normalize(feature)];
        return value == POLYFILL ? true : value == NATIVE ? false : typeof detection == "function" ? fails7(detection) : !!detection;
      };
      var normalize = isForced2.normalize = function(string) {
        return String(string).replace(replacement, ".").toLowerCase();
      };
      var data = isForced2.data = {};
      var NATIVE = isForced2.NATIVE = "N";
      var POLYFILL = isForced2.POLYFILL = "P";
      module.exports = isForced2;
    }
  });

  // node_modules/core-js/internals/export.js
  var require_export = __commonJS({
    "node_modules/core-js/internals/export.js": function(exports, module) {
      var global7 = require_global();
      var getOwnPropertyDescriptor4 = require_object_get_own_property_descriptor().f;
      var createNonEnumerableProperty4 = require_create_non_enumerable_property();
      var redefine6 = require_redefine();
      var setGlobal = require_set_global();
      var copyConstructorProperties2 = require_copy_constructor_properties();
      var isForced2 = require_is_forced();
      module.exports = function(options, source) {
        var TARGET = options.target;
        var GLOBAL = options.global;
        var STATIC = options.stat;
        var FORCED3, target, key, targetProperty, sourceProperty, descriptor;
        if (GLOBAL) {
          target = global7;
        } else if (STATIC) {
          target = global7[TARGET] || setGlobal(TARGET, {});
        } else {
          target = (global7[TARGET] || {}).prototype;
        }
        if (target)
          for (key in source) {
            sourceProperty = source[key];
            if (options.noTargetGet) {
              descriptor = getOwnPropertyDescriptor4(target, key);
              targetProperty = descriptor && descriptor.value;
            } else
              targetProperty = target[key];
            FORCED3 = isForced2(GLOBAL ? key : TARGET + (STATIC ? "." : "#") + key, options.forced);
            if (!FORCED3 && targetProperty !== void 0) {
              if (typeof sourceProperty === typeof targetProperty)
                continue;
              copyConstructorProperties2(sourceProperty, targetProperty);
            }
            if (options.sham || targetProperty && targetProperty.sham) {
              createNonEnumerableProperty4(sourceProperty, "sham", true);
            }
            redefine6(target, key, sourceProperty, options);
          }
      };
    }
  });

  // node_modules/core-js/internals/a-function.js
  var require_a_function = __commonJS({
    "node_modules/core-js/internals/a-function.js": function(exports, module) {
      module.exports = function(it) {
        if (typeof it != "function") {
          throw TypeError(String(it) + " is not a function");
        }
        return it;
      };
    }
  });

  // node_modules/core-js/internals/function-bind-context.js
  var require_function_bind_context = __commonJS({
    "node_modules/core-js/internals/function-bind-context.js": function(exports, module) {
      var aFunction = require_a_function();
      module.exports = function(fn, that, length) {
        aFunction(fn);
        if (that === void 0)
          return fn;
        switch (length) {
          case 0:
            return function() {
              return fn.call(that);
            };
          case 1:
            return function(a) {
              return fn.call(that, a);
            };
          case 2:
            return function(a, b) {
              return fn.call(that, a, b);
            };
          case 3:
            return function(a, b, c) {
              return fn.call(that, a, b, c);
            };
        }
        return function() {
          return fn.apply(that, arguments);
        };
      };
    }
  });

  // node_modules/core-js/internals/is-array.js
  var require_is_array = __commonJS({
    "node_modules/core-js/internals/is-array.js": function(exports, module) {
      var classof2 = require_classof_raw();
      module.exports = Array.isArray || function isArray5(arg) {
        return classof2(arg) == "Array";
      };
    }
  });

  // node_modules/core-js/internals/engine-user-agent.js
  var require_engine_user_agent = __commonJS({
    "node_modules/core-js/internals/engine-user-agent.js": function(exports, module) {
      var getBuiltIn2 = require_get_built_in();
      module.exports = getBuiltIn2("navigator", "userAgent") || "";
    }
  });

  // node_modules/core-js/internals/engine-v8-version.js
  var require_engine_v8_version = __commonJS({
    "node_modules/core-js/internals/engine-v8-version.js": function(exports, module) {
      var global7 = require_global();
      var userAgent = require_engine_user_agent();
      var process = global7.process;
      var versions = process && process.versions;
      var v8 = versions && versions.v8;
      var match;
      var version;
      if (v8) {
        match = v8.split(".");
        version = match[0] < 4 ? 1 : match[0] + match[1];
      } else if (userAgent) {
        match = userAgent.match(/Edge\/(\d+)/);
        if (!match || match[1] >= 74) {
          match = userAgent.match(/Chrome\/(\d+)/);
          if (match)
            version = match[1];
        }
      }
      module.exports = version && +version;
    }
  });

  // node_modules/core-js/internals/native-symbol.js
  var require_native_symbol = __commonJS({
    "node_modules/core-js/internals/native-symbol.js": function(exports, module) {
      var V8_VERSION2 = require_engine_v8_version();
      var fails7 = require_fails();
      module.exports = !!Object.getOwnPropertySymbols && !fails7(function() {
        return !String(Symbol()) || !Symbol.sham && V8_VERSION2 && V8_VERSION2 < 41;
      });
    }
  });

  // node_modules/core-js/internals/use-symbol-as-uid.js
  var require_use_symbol_as_uid = __commonJS({
    "node_modules/core-js/internals/use-symbol-as-uid.js": function(exports, module) {
      var NATIVE_SYMBOL2 = require_native_symbol();
      module.exports = NATIVE_SYMBOL2 && !Symbol.sham && typeof Symbol.iterator == "symbol";
    }
  });

  // node_modules/core-js/internals/well-known-symbol.js
  var require_well_known_symbol = __commonJS({
    "node_modules/core-js/internals/well-known-symbol.js": function(exports, module) {
      var global7 = require_global();
      var shared2 = require_shared();
      var has4 = require_has();
      var uid2 = require_uid();
      var NATIVE_SYMBOL2 = require_native_symbol();
      var USE_SYMBOL_AS_UID2 = require_use_symbol_as_uid();
      var WellKnownSymbolsStore2 = shared2("wks");
      var Symbol2 = global7.Symbol;
      var createWellKnownSymbol = USE_SYMBOL_AS_UID2 ? Symbol2 : Symbol2 && Symbol2.withoutSetter || uid2;
      module.exports = function(name) {
        if (!has4(WellKnownSymbolsStore2, name) || !(NATIVE_SYMBOL2 || typeof WellKnownSymbolsStore2[name] == "string")) {
          if (NATIVE_SYMBOL2 && has4(Symbol2, name)) {
            WellKnownSymbolsStore2[name] = Symbol2[name];
          } else {
            WellKnownSymbolsStore2[name] = createWellKnownSymbol("Symbol." + name);
          }
        }
        return WellKnownSymbolsStore2[name];
      };
    }
  });

  // node_modules/core-js/internals/array-species-create.js
  var require_array_species_create = __commonJS({
    "node_modules/core-js/internals/array-species-create.js": function(exports, module) {
      var isObject5 = require_is_object();
      var isArray5 = require_is_array();
      var wellKnownSymbol5 = require_well_known_symbol();
      var SPECIES2 = wellKnownSymbol5("species");
      module.exports = function(originalArray, length) {
        var C;
        if (isArray5(originalArray)) {
          C = originalArray.constructor;
          if (typeof C == "function" && (C === Array || isArray5(C.prototype)))
            C = void 0;
          else if (isObject5(C)) {
            C = C[SPECIES2];
            if (C === null)
              C = void 0;
          }
        }
        return new (C === void 0 ? Array : C)(length === 0 ? 0 : length);
      };
    }
  });

  // node_modules/core-js/internals/array-iteration.js
  var require_array_iteration = __commonJS({
    "node_modules/core-js/internals/array-iteration.js": function(exports, module) {
      var bind = require_function_bind_context();
      var IndexedObject2 = require_indexed_object();
      var toObject5 = require_to_object();
      var toLength7 = require_to_length();
      var arraySpeciesCreate3 = require_array_species_create();
      var push = [].push;
      var createMethod = function(TYPE) {
        var IS_MAP = TYPE == 1;
        var IS_FILTER = TYPE == 2;
        var IS_SOME = TYPE == 3;
        var IS_EVERY = TYPE == 4;
        var IS_FIND_INDEX = TYPE == 6;
        var IS_FILTER_OUT = TYPE == 7;
        var NO_HOLES = TYPE == 5 || IS_FIND_INDEX;
        return function($this, callbackfn, that, specificCreate) {
          var O = toObject5($this);
          var self2 = IndexedObject2(O);
          var boundFunction = bind(callbackfn, that, 3);
          var length = toLength7(self2.length);
          var index = 0;
          var create3 = specificCreate || arraySpeciesCreate3;
          var target = IS_MAP ? create3($this, length) : IS_FILTER || IS_FILTER_OUT ? create3($this, 0) : void 0;
          var value, result;
          for (; length > index; index++)
            if (NO_HOLES || index in self2) {
              value = self2[index];
              result = boundFunction(value, index, O);
              if (TYPE) {
                if (IS_MAP)
                  target[index] = result;
                else if (result)
                  switch (TYPE) {
                    case 3:
                      return true;
                    case 5:
                      return value;
                    case 6:
                      return index;
                    case 2:
                      push.call(target, value);
                  }
                else
                  switch (TYPE) {
                    case 4:
                      return false;
                    case 7:
                      push.call(target, value);
                  }
              }
            }
          return IS_FIND_INDEX ? -1 : IS_SOME || IS_EVERY ? IS_EVERY : target;
        };
      };
      module.exports = {
        forEach: createMethod(0),
        map: createMethod(1),
        filter: createMethod(2),
        some: createMethod(3),
        every: createMethod(4),
        find: createMethod(5),
        findIndex: createMethod(6),
        filterOut: createMethod(7)
      };
    }
  });

  // node_modules/core-js/internals/array-method-is-strict.js
  var require_array_method_is_strict = __commonJS({
    "node_modules/core-js/internals/array-method-is-strict.js": function(exports, module) {
      "use strict";
      var fails7 = require_fails();
      module.exports = function(METHOD_NAME, argument) {
        var method = [][METHOD_NAME];
        return !!method && fails7(function() {
          method.call(null, argument || function() {
            throw 1;
          }, 1);
        });
      };
    }
  });

  // node_modules/core-js/internals/array-for-each.js
  var require_array_for_each = __commonJS({
    "node_modules/core-js/internals/array-for-each.js": function(exports, module) {
      "use strict";
      var $forEach2 = require_array_iteration().forEach;
      var arrayMethodIsStrict3 = require_array_method_is_strict();
      var STRICT_METHOD3 = arrayMethodIsStrict3("forEach");
      module.exports = !STRICT_METHOD3 ? function forEach3(callbackfn) {
        return $forEach2(this, callbackfn, arguments.length > 1 ? arguments[1] : void 0);
      } : [].forEach;
    }
  });

  // node_modules/core-js/internals/dom-iterables.js
  var require_dom_iterables = __commonJS({
    "node_modules/core-js/internals/dom-iterables.js": function(exports, module) {
      module.exports = {
        CSSRuleList: 0,
        CSSStyleDeclaration: 0,
        CSSValueList: 0,
        ClientRectList: 0,
        DOMRectList: 0,
        DOMStringList: 0,
        DOMTokenList: 1,
        DataTransferItemList: 0,
        FileList: 0,
        HTMLAllCollection: 0,
        HTMLCollection: 0,
        HTMLFormElement: 0,
        HTMLSelectElement: 0,
        MediaList: 0,
        MimeTypeArray: 0,
        NamedNodeMap: 0,
        NodeList: 1,
        PaintRequestList: 0,
        Plugin: 0,
        PluginArray: 0,
        SVGLengthList: 0,
        SVGNumberList: 0,
        SVGPathSegList: 0,
        SVGPointList: 0,
        SVGStringList: 0,
        SVGTransformList: 0,
        SourceBufferList: 0,
        StyleSheetList: 0,
        TextTrackCueList: 0,
        TextTrackList: 0,
        TouchList: 0
      };
    }
  });

  // node_modules/core-js/internals/regexp-flags.js
  var require_regexp_flags = __commonJS({
    "node_modules/core-js/internals/regexp-flags.js": function(exports, module) {
      "use strict";
      var anObject6 = require_an_object();
      module.exports = function() {
        var that = anObject6(this);
        var result = "";
        if (that.global)
          result += "g";
        if (that.ignoreCase)
          result += "i";
        if (that.multiline)
          result += "m";
        if (that.dotAll)
          result += "s";
        if (that.unicode)
          result += "u";
        if (that.sticky)
          result += "y";
        return result;
      };
    }
  });

  // node_modules/core-js/internals/regexp-sticky-helpers.js
  var require_regexp_sticky_helpers = __commonJS({
    "node_modules/core-js/internals/regexp-sticky-helpers.js": function(exports) {
      "use strict";
      var fails7 = require_fails();
      function RE(s, f) {
        return RegExp(s, f);
      }
      exports.UNSUPPORTED_Y = fails7(function() {
        var re = RE("a", "y");
        re.lastIndex = 2;
        return re.exec("abcd") != null;
      });
      exports.BROKEN_CARET = fails7(function() {
        var re = RE("^r", "gy");
        re.lastIndex = 2;
        return re.exec("str") != null;
      });
    }
  });

  // node_modules/core-js/internals/regexp-exec.js
  var require_regexp_exec = __commonJS({
    "node_modules/core-js/internals/regexp-exec.js": function(exports, module) {
      "use strict";
      var regexpFlags = require_regexp_flags();
      var stickyHelpers2 = require_regexp_sticky_helpers();
      var shared2 = require_shared();
      var nativeExec = RegExp.prototype.exec;
      var nativeReplace = shared2("native-string-replace", String.prototype.replace);
      var patchedExec = nativeExec;
      var UPDATES_LAST_INDEX_WRONG = function() {
        var re1 = /a/;
        var re2 = /b*/g;
        nativeExec.call(re1, "a");
        nativeExec.call(re2, "a");
        return re1.lastIndex !== 0 || re2.lastIndex !== 0;
      }();
      var UNSUPPORTED_Y2 = stickyHelpers2.UNSUPPORTED_Y || stickyHelpers2.BROKEN_CARET;
      var NPCG_INCLUDED = /()??/.exec("")[1] !== void 0;
      var PATCH = UPDATES_LAST_INDEX_WRONG || NPCG_INCLUDED || UNSUPPORTED_Y2;
      if (PATCH) {
        patchedExec = function exec(str) {
          var re = this;
          var lastIndex, reCopy, match, i;
          var sticky = UNSUPPORTED_Y2 && re.sticky;
          var flags2 = regexpFlags.call(re);
          var source = re.source;
          var charsAdded = 0;
          var strCopy = str;
          if (sticky) {
            flags2 = flags2.replace("y", "");
            if (flags2.indexOf("g") === -1) {
              flags2 += "g";
            }
            strCopy = String(str).slice(re.lastIndex);
            if (re.lastIndex > 0 && (!re.multiline || re.multiline && str[re.lastIndex - 1] !== "\n")) {
              source = "(?: " + source + ")";
              strCopy = " " + strCopy;
              charsAdded++;
            }
            reCopy = new RegExp("^(?:" + source + ")", flags2);
          }
          if (NPCG_INCLUDED) {
            reCopy = new RegExp("^" + source + "$(?!\\s)", flags2);
          }
          if (UPDATES_LAST_INDEX_WRONG)
            lastIndex = re.lastIndex;
          match = nativeExec.call(sticky ? reCopy : re, strCopy);
          if (sticky) {
            if (match) {
              match.input = match.input.slice(charsAdded);
              match[0] = match[0].slice(charsAdded);
              match.index = re.lastIndex;
              re.lastIndex += match[0].length;
            } else
              re.lastIndex = 0;
          } else if (UPDATES_LAST_INDEX_WRONG && match) {
            re.lastIndex = re.global ? match.index + match[0].length : lastIndex;
          }
          if (NPCG_INCLUDED && match && match.length > 1) {
            nativeReplace.call(match[0], reCopy, function() {
              for (i = 1; i < arguments.length - 2; i++) {
                if (arguments[i] === void 0)
                  match[i] = void 0;
              }
            });
          }
          return match;
        };
      }
      module.exports = patchedExec;
    }
  });

  // node_modules/core-js/modules/es.regexp.exec.js
  var require_es_regexp_exec = __commonJS({
    "node_modules/core-js/modules/es.regexp.exec.js": function() {
      "use strict";
      var $23 = require_export();
      var exec = require_regexp_exec();
      $23({ target: "RegExp", proto: true, forced: /./.exec !== exec }, {
        exec: exec
      });
    }
  });

  // node_modules/core-js/internals/fix-regexp-well-known-symbol-logic.js
  var require_fix_regexp_well_known_symbol_logic = __commonJS({
    "node_modules/core-js/internals/fix-regexp-well-known-symbol-logic.js": function(exports, module) {
      "use strict";
      require_es_regexp_exec();
      var redefine6 = require_redefine();
      var regexpExec2 = require_regexp_exec();
      var fails7 = require_fails();
      var wellKnownSymbol5 = require_well_known_symbol();
      var createNonEnumerableProperty4 = require_create_non_enumerable_property();
      var SPECIES2 = wellKnownSymbol5("species");
      var RegExpPrototype2 = RegExp.prototype;
      var REPLACE_SUPPORTS_NAMED_GROUPS = !fails7(function() {
        var re = /./;
        re.exec = function() {
          var result = [];
          result.groups = { a: "7" };
          return result;
        };
        return "".replace(re, "$<a>") !== "7";
      });
      var REPLACE_KEEPS_$0 = function() {
        return "a".replace(/./, "$0") === "$0";
      }();
      var REPLACE = wellKnownSymbol5("replace");
      var REGEXP_REPLACE_SUBSTITUTES_UNDEFINED_CAPTURE = function() {
        if (/./[REPLACE]) {
          return /./[REPLACE]("a", "$0") === "";
        }
        return false;
      }();
      var SPLIT_WORKS_WITH_OVERWRITTEN_EXEC = !fails7(function() {
        var re = /(?:)/;
        var originalExec = re.exec;
        re.exec = function() {
          return originalExec.apply(this, arguments);
        };
        var result = "ab".split(re);
        return result.length !== 2 || result[0] !== "a" || result[1] !== "b";
      });
      module.exports = function(KEY, length, exec, sham) {
        var SYMBOL2 = wellKnownSymbol5(KEY);
        var DELEGATES_TO_SYMBOL = !fails7(function() {
          var O = {};
          O[SYMBOL2] = function() {
            return 7;
          };
          return ""[KEY](O) != 7;
        });
        var DELEGATES_TO_EXEC = DELEGATES_TO_SYMBOL && !fails7(function() {
          var execCalled = false;
          var re = /a/;
          if (KEY === "split") {
            re = {};
            re.constructor = {};
            re.constructor[SPECIES2] = function() {
              return re;
            };
            re.flags = "";
            re[SYMBOL2] = /./[SYMBOL2];
          }
          re.exec = function() {
            execCalled = true;
            return null;
          };
          re[SYMBOL2]("");
          return !execCalled;
        });
        if (!DELEGATES_TO_SYMBOL || !DELEGATES_TO_EXEC || KEY === "replace" && !(REPLACE_SUPPORTS_NAMED_GROUPS && REPLACE_KEEPS_$0 && !REGEXP_REPLACE_SUBSTITUTES_UNDEFINED_CAPTURE) || KEY === "split" && !SPLIT_WORKS_WITH_OVERWRITTEN_EXEC) {
          var nativeRegExpMethod = /./[SYMBOL2];
          var methods = exec(SYMBOL2, ""[KEY], function(nativeMethod, regexp, str, arg2, forceStringMethod) {
            var $exec = regexp.exec;
            if ($exec === regexpExec2 || $exec === RegExpPrototype2.exec) {
              if (DELEGATES_TO_SYMBOL && !forceStringMethod) {
                return { done: true, value: nativeRegExpMethod.call(regexp, str, arg2) };
              }
              return { done: true, value: nativeMethod.call(str, regexp, arg2) };
            }
            return { done: false };
          }, {
            REPLACE_KEEPS_$0: REPLACE_KEEPS_$0,
            REGEXP_REPLACE_SUBSTITUTES_UNDEFINED_CAPTURE: REGEXP_REPLACE_SUBSTITUTES_UNDEFINED_CAPTURE
          });
          var stringMethod = methods[0];
          var regexMethod = methods[1];
          redefine6(String.prototype, KEY, stringMethod);
          redefine6(RegExpPrototype2, SYMBOL2, length == 2 ? function(string, arg) {
            return regexMethod.call(string, this, arg);
          } : function(string) {
            return regexMethod.call(string, this);
          });
        }
        if (sham)
          createNonEnumerableProperty4(RegExpPrototype2[SYMBOL2], "sham", true);
      };
    }
  });

  // node_modules/core-js/internals/is-regexp.js
  var require_is_regexp = __commonJS({
    "node_modules/core-js/internals/is-regexp.js": function(exports, module) {
      var isObject5 = require_is_object();
      var classof2 = require_classof_raw();
      var wellKnownSymbol5 = require_well_known_symbol();
      var MATCH = wellKnownSymbol5("match");
      module.exports = function(it) {
        var isRegExp2;
        return isObject5(it) && ((isRegExp2 = it[MATCH]) !== void 0 ? !!isRegExp2 : classof2(it) == "RegExp");
      };
    }
  });

  // node_modules/core-js/internals/species-constructor.js
  var require_species_constructor = __commonJS({
    "node_modules/core-js/internals/species-constructor.js": function(exports, module) {
      var anObject6 = require_an_object();
      var aFunction = require_a_function();
      var wellKnownSymbol5 = require_well_known_symbol();
      var SPECIES2 = wellKnownSymbol5("species");
      module.exports = function(O, defaultConstructor) {
        var C = anObject6(O).constructor;
        var S;
        return C === void 0 || (S = anObject6(C)[SPECIES2]) == void 0 ? defaultConstructor : aFunction(S);
      };
    }
  });

  // node_modules/core-js/internals/string-multibyte.js
  var require_string_multibyte = __commonJS({
    "node_modules/core-js/internals/string-multibyte.js": function(exports, module) {
      var toInteger3 = require_to_integer();
      var requireObjectCoercible5 = require_require_object_coercible();
      var createMethod = function(CONVERT_TO_STRING) {
        return function($this, pos) {
          var S = String(requireObjectCoercible5($this));
          var position = toInteger3(pos);
          var size = S.length;
          var first, second;
          if (position < 0 || position >= size)
            return CONVERT_TO_STRING ? "" : void 0;
          first = S.charCodeAt(position);
          return first < 55296 || first > 56319 || position + 1 === size || (second = S.charCodeAt(position + 1)) < 56320 || second > 57343 ? CONVERT_TO_STRING ? S.charAt(position) : first : CONVERT_TO_STRING ? S.slice(position, position + 2) : (first - 55296 << 10) + (second - 56320) + 65536;
        };
      };
      module.exports = {
        codeAt: createMethod(false),
        charAt: createMethod(true)
      };
    }
  });

  // node_modules/core-js/internals/advance-string-index.js
  var require_advance_string_index = __commonJS({
    "node_modules/core-js/internals/advance-string-index.js": function(exports, module) {
      "use strict";
      var charAt2 = require_string_multibyte().charAt;
      module.exports = function(S, index, unicode) {
        return index + (unicode ? charAt2(S, index).length : 1);
      };
    }
  });

  // node_modules/core-js/internals/regexp-exec-abstract.js
  var require_regexp_exec_abstract = __commonJS({
    "node_modules/core-js/internals/regexp-exec-abstract.js": function(exports, module) {
      var classof2 = require_classof_raw();
      var regexpExec2 = require_regexp_exec();
      module.exports = function(R, S) {
        var exec = R.exec;
        if (typeof exec === "function") {
          var result = exec.call(R, S);
          if (typeof result !== "object") {
            throw TypeError("RegExp exec method returned something other than an Object or null");
          }
          return result;
        }
        if (classof2(R) !== "RegExp") {
          throw TypeError("RegExp#exec called on incompatible receiver");
        }
        return regexpExec2.call(R, S);
      };
    }
  });

  // node_modules/core-js/internals/get-substitution.js
  var require_get_substitution = __commonJS({
    "node_modules/core-js/internals/get-substitution.js": function(exports, module) {
      var toObject5 = require_to_object();
      var floor = Math.floor;
      var replace = "".replace;
      var SUBSTITUTION_SYMBOLS = /\$([$&'`]|\d{1,2}|<[^>]*>)/g;
      var SUBSTITUTION_SYMBOLS_NO_NAMED = /\$([$&'`]|\d{1,2})/g;
      module.exports = function(matched, str, position, captures, namedCaptures, replacement) {
        var tailPos = position + matched.length;
        var m = captures.length;
        var symbols = SUBSTITUTION_SYMBOLS_NO_NAMED;
        if (namedCaptures !== void 0) {
          namedCaptures = toObject5(namedCaptures);
          symbols = SUBSTITUTION_SYMBOLS;
        }
        return replace.call(replacement, symbols, function(match, ch) {
          var capture;
          switch (ch.charAt(0)) {
            case "$":
              return "$";
            case "&":
              return matched;
            case "`":
              return str.slice(0, position);
            case "'":
              return str.slice(tailPos);
            case "<":
              capture = namedCaptures[ch.slice(1, -1)];
              break;
            default:
              var n = +ch;
              if (n === 0)
                return match;
              if (n > m) {
                var f = floor(n / 10);
                if (f === 0)
                  return match;
                if (f <= m)
                  return captures[f - 1] === void 0 ? ch.charAt(1) : captures[f - 1] + ch.charAt(1);
                return match;
              }
              capture = captures[n - 1];
          }
          return capture === void 0 ? "" : capture;
        });
      };
    }
  });

  // node_modules/core-js/internals/object-keys.js
  var require_object_keys = __commonJS({
    "node_modules/core-js/internals/object-keys.js": function(exports, module) {
      var internalObjectKeys = require_object_keys_internal();
      var enumBugKeys = require_enum_bug_keys();
      module.exports = Object.keys || function keys2(O) {
        return internalObjectKeys(O, enumBugKeys);
      };
    }
  });

  // node_modules/core-js/internals/object-define-properties.js
  var require_object_define_properties = __commonJS({
    "node_modules/core-js/internals/object-define-properties.js": function(exports, module) {
      var DESCRIPTORS9 = require_descriptors();
      var definePropertyModule2 = require_object_define_property();
      var anObject6 = require_an_object();
      var objectKeys2 = require_object_keys();
      module.exports = DESCRIPTORS9 ? Object.defineProperties : function defineProperties3(O, Properties) {
        anObject6(O);
        var keys2 = objectKeys2(Properties);
        var length = keys2.length;
        var index = 0;
        var key;
        while (length > index)
          definePropertyModule2.f(O, key = keys2[index++], Properties[key]);
        return O;
      };
    }
  });

  // node_modules/core-js/internals/html.js
  var require_html = __commonJS({
    "node_modules/core-js/internals/html.js": function(exports, module) {
      var getBuiltIn2 = require_get_built_in();
      module.exports = getBuiltIn2("document", "documentElement");
    }
  });

  // node_modules/core-js/internals/object-create.js
  var require_object_create = __commonJS({
    "node_modules/core-js/internals/object-create.js": function(exports, module) {
      var anObject6 = require_an_object();
      var defineProperties3 = require_object_define_properties();
      var enumBugKeys = require_enum_bug_keys();
      var hiddenKeys2 = require_hidden_keys();
      var html = require_html();
      var documentCreateElement = require_document_create_element();
      var sharedKey2 = require_shared_key();
      var GT = ">";
      var LT = "<";
      var PROTOTYPE2 = "prototype";
      var SCRIPT = "script";
      var IE_PROTO = sharedKey2("IE_PROTO");
      var EmptyConstructor = function() {
      };
      var scriptTag = function(content) {
        return LT + SCRIPT + GT + content + LT + "/" + SCRIPT + GT;
      };
      var NullProtoObjectViaActiveX = function(activeXDocument2) {
        activeXDocument2.write(scriptTag(""));
        activeXDocument2.close();
        var temp = activeXDocument2.parentWindow.Object;
        activeXDocument2 = null;
        return temp;
      };
      var NullProtoObjectViaIFrame = function() {
        var iframe = documentCreateElement("iframe");
        var JS = "java" + SCRIPT + ":";
        var iframeDocument;
        iframe.style.display = "none";
        html.appendChild(iframe);
        iframe.src = String(JS);
        iframeDocument = iframe.contentWindow.document;
        iframeDocument.open();
        iframeDocument.write(scriptTag("document.F=Object"));
        iframeDocument.close();
        return iframeDocument.F;
      };
      var activeXDocument;
      var NullProtoObject = function() {
        try {
          activeXDocument = document.domain && new ActiveXObject("htmlfile");
        } catch (error) {
        }
        NullProtoObject = activeXDocument ? NullProtoObjectViaActiveX(activeXDocument) : NullProtoObjectViaIFrame();
        var length = enumBugKeys.length;
        while (length--)
          delete NullProtoObject[PROTOTYPE2][enumBugKeys[length]];
        return NullProtoObject();
      };
      hiddenKeys2[IE_PROTO] = true;
      module.exports = Object.create || function create3(O, Properties) {
        var result;
        if (O !== null) {
          EmptyConstructor[PROTOTYPE2] = anObject6(O);
          result = new EmptyConstructor();
          EmptyConstructor[PROTOTYPE2] = null;
          result[IE_PROTO] = O;
        } else
          result = NullProtoObject();
        return Properties === void 0 ? result : defineProperties3(result, Properties);
      };
    }
  });

  // node_modules/core-js/internals/add-to-unscopables.js
  var require_add_to_unscopables = __commonJS({
    "node_modules/core-js/internals/add-to-unscopables.js": function(exports, module) {
      var wellKnownSymbol5 = require_well_known_symbol();
      var create3 = require_object_create();
      var definePropertyModule2 = require_object_define_property();
      var UNSCOPABLES = wellKnownSymbol5("unscopables");
      var ArrayPrototype = Array.prototype;
      if (ArrayPrototype[UNSCOPABLES] == void 0) {
        definePropertyModule2.f(ArrayPrototype, UNSCOPABLES, {
          configurable: true,
          value: create3(null)
        });
      }
      module.exports = function(key) {
        ArrayPrototype[UNSCOPABLES][key] = true;
      };
    }
  });

  // node_modules/core-js/internals/create-property.js
  var require_create_property = __commonJS({
    "node_modules/core-js/internals/create-property.js": function(exports, module) {
      "use strict";
      var toPrimitive3 = require_to_primitive();
      var definePropertyModule2 = require_object_define_property();
      var createPropertyDescriptor2 = require_create_property_descriptor();
      module.exports = function(object, key, value) {
        var propertyKey = toPrimitive3(key);
        if (propertyKey in object)
          definePropertyModule2.f(object, propertyKey, createPropertyDescriptor2(0, value));
        else
          object[propertyKey] = value;
      };
    }
  });

  // node_modules/core-js/internals/array-method-has-species-support.js
  var require_array_method_has_species_support = __commonJS({
    "node_modules/core-js/internals/array-method-has-species-support.js": function(exports, module) {
      var fails7 = require_fails();
      var wellKnownSymbol5 = require_well_known_symbol();
      var V8_VERSION2 = require_engine_v8_version();
      var SPECIES2 = wellKnownSymbol5("species");
      module.exports = function(METHOD_NAME) {
        return V8_VERSION2 >= 51 || !fails7(function() {
          var array = [];
          var constructor = array.constructor = {};
          constructor[SPECIES2] = function() {
            return { foo: 1 };
          };
          return array[METHOD_NAME](Boolean).foo !== 1;
        });
      };
    }
  });

  // node_modules/core-js/internals/object-assign.js
  var require_object_assign = __commonJS({
    "node_modules/core-js/internals/object-assign.js": function(exports, module) {
      "use strict";
      var DESCRIPTORS9 = require_descriptors();
      var fails7 = require_fails();
      var objectKeys2 = require_object_keys();
      var getOwnPropertySymbolsModule2 = require_object_get_own_property_symbols();
      var propertyIsEnumerableModule2 = require_object_property_is_enumerable();
      var toObject5 = require_to_object();
      var IndexedObject2 = require_indexed_object();
      var $assign = Object.assign;
      var defineProperty5 = Object.defineProperty;
      module.exports = !$assign || fails7(function() {
        if (DESCRIPTORS9 && $assign({ b: 1 }, $assign(defineProperty5({}, "a", {
          enumerable: true,
          get: function() {
            defineProperty5(this, "b", {
              value: 3,
              enumerable: false
            });
          }
        }), { b: 2 })).b !== 1)
          return true;
        var A = {};
        var B = {};
        var symbol = Symbol();
        var alphabet = "abcdefghijklmnopqrst";
        A[symbol] = 7;
        alphabet.split("").forEach(function(chr) {
          B[chr] = chr;
        });
        return $assign({}, A)[symbol] != 7 || objectKeys2($assign({}, B)).join("") != alphabet;
      }) ? function assign2(target, source) {
        var T = toObject5(target);
        var argumentsLength = arguments.length;
        var index = 1;
        var getOwnPropertySymbols3 = getOwnPropertySymbolsModule2.f;
        var propertyIsEnumerable2 = propertyIsEnumerableModule2.f;
        while (argumentsLength > index) {
          var S = IndexedObject2(arguments[index++]);
          var keys2 = getOwnPropertySymbols3 ? objectKeys2(S).concat(getOwnPropertySymbols3(S)) : objectKeys2(S);
          var length = keys2.length;
          var j = 0;
          var key;
          while (length > j) {
            key = keys2[j++];
            if (!DESCRIPTORS9 || propertyIsEnumerable2.call(S, key))
              T[key] = S[key];
          }
        }
        return T;
      } : $assign;
    }
  });

  // node_modules/core-js/internals/array-reduce.js
  var require_array_reduce = __commonJS({
    "node_modules/core-js/internals/array-reduce.js": function(exports, module) {
      var aFunction = require_a_function();
      var toObject5 = require_to_object();
      var IndexedObject2 = require_indexed_object();
      var toLength7 = require_to_length();
      var createMethod = function(IS_RIGHT) {
        return function(that, callbackfn, argumentsLength, memo) {
          aFunction(callbackfn);
          var O = toObject5(that);
          var self2 = IndexedObject2(O);
          var length = toLength7(O.length);
          var index = IS_RIGHT ? length - 1 : 0;
          var i = IS_RIGHT ? -1 : 1;
          if (argumentsLength < 2)
            while (true) {
              if (index in self2) {
                memo = self2[index];
                index += i;
                break;
              }
              index += i;
              if (IS_RIGHT ? index < 0 : length <= index) {
                throw TypeError("Reduce of empty array with no initial value");
              }
            }
          for (; IS_RIGHT ? index >= 0 : length > index; index += i)
            if (index in self2) {
              memo = callbackfn(memo, self2[index], index, O);
            }
          return memo;
        };
      };
      module.exports = {
        left: createMethod(false),
        right: createMethod(true)
      };
    }
  });

  // node_modules/core-js/internals/engine-is-node.js
  var require_engine_is_node = __commonJS({
    "node_modules/core-js/internals/engine-is-node.js": function(exports, module) {
      var classof2 = require_classof_raw();
      var global7 = require_global();
      module.exports = classof2(global7.process) == "process";
    }
  });

  // node_modules/core-js/internals/object-get-own-property-names-external.js
  var require_object_get_own_property_names_external = __commonJS({
    "node_modules/core-js/internals/object-get-own-property-names-external.js": function(exports, module) {
      var toIndexedObject6 = require_to_indexed_object();
      var $getOwnPropertyNames2 = require_object_get_own_property_names().f;
      var toString2 = {}.toString;
      var windowNames = typeof window == "object" && window && Object.getOwnPropertyNames ? Object.getOwnPropertyNames(window) : [];
      var getWindowNames = function(it) {
        try {
          return $getOwnPropertyNames2(it);
        } catch (error) {
          return windowNames.slice();
        }
      };
      module.exports.f = function getOwnPropertyNames3(it) {
        return windowNames && toString2.call(it) == "[object Window]" ? getWindowNames(it) : $getOwnPropertyNames2(toIndexedObject6(it));
      };
    }
  });

  // node_modules/core-js/internals/well-known-symbol-wrapped.js
  var require_well_known_symbol_wrapped = __commonJS({
    "node_modules/core-js/internals/well-known-symbol-wrapped.js": function(exports) {
      var wellKnownSymbol5 = require_well_known_symbol();
      exports.f = wellKnownSymbol5;
    }
  });

  // node_modules/core-js/internals/define-well-known-symbol.js
  var require_define_well_known_symbol = __commonJS({
    "node_modules/core-js/internals/define-well-known-symbol.js": function(exports, module) {
      var path = require_path();
      var has4 = require_has();
      var wrappedWellKnownSymbolModule2 = require_well_known_symbol_wrapped();
      var defineProperty5 = require_object_define_property().f;
      module.exports = function(NAME2) {
        var Symbol2 = path.Symbol || (path.Symbol = {});
        if (!has4(Symbol2, NAME2))
          defineProperty5(Symbol2, NAME2, {
            value: wrappedWellKnownSymbolModule2.f(NAME2)
          });
      };
    }
  });

  // node_modules/core-js/internals/set-to-string-tag.js
  var require_set_to_string_tag = __commonJS({
    "node_modules/core-js/internals/set-to-string-tag.js": function(exports, module) {
      var defineProperty5 = require_object_define_property().f;
      var has4 = require_has();
      var wellKnownSymbol5 = require_well_known_symbol();
      var TO_STRING_TAG2 = wellKnownSymbol5("toStringTag");
      module.exports = function(it, TAG, STATIC) {
        if (it && !has4(it = STATIC ? it : it.prototype, TO_STRING_TAG2)) {
          defineProperty5(it, TO_STRING_TAG2, { configurable: true, value: TAG });
        }
      };
    }
  });

  // node_modules/core-js/internals/to-string-tag-support.js
  var require_to_string_tag_support = __commonJS({
    "node_modules/core-js/internals/to-string-tag-support.js": function(exports, module) {
      var wellKnownSymbol5 = require_well_known_symbol();
      var TO_STRING_TAG2 = wellKnownSymbol5("toStringTag");
      var test = {};
      test[TO_STRING_TAG2] = "z";
      module.exports = String(test) === "[object z]";
    }
  });

  // node_modules/core-js/internals/classof.js
  var require_classof = __commonJS({
    "node_modules/core-js/internals/classof.js": function(exports, module) {
      var TO_STRING_TAG_SUPPORT2 = require_to_string_tag_support();
      var classofRaw = require_classof_raw();
      var wellKnownSymbol5 = require_well_known_symbol();
      var TO_STRING_TAG2 = wellKnownSymbol5("toStringTag");
      var CORRECT_ARGUMENTS = classofRaw(function() {
        return arguments;
      }()) == "Arguments";
      var tryGet = function(it, key) {
        try {
          return it[key];
        } catch (error) {
        }
      };
      module.exports = TO_STRING_TAG_SUPPORT2 ? classofRaw : function(it) {
        var O, tag, result;
        return it === void 0 ? "Undefined" : it === null ? "Null" : typeof (tag = tryGet(O = Object(it), TO_STRING_TAG2)) == "string" ? tag : CORRECT_ARGUMENTS ? classofRaw(O) : (result = classofRaw(O)) == "Object" && typeof O.callee == "function" ? "Arguments" : result;
      };
    }
  });

  // node_modules/core-js/internals/object-to-string.js
  var require_object_to_string = __commonJS({
    "node_modules/core-js/internals/object-to-string.js": function(exports, module) {
      "use strict";
      var TO_STRING_TAG_SUPPORT2 = require_to_string_tag_support();
      var classof2 = require_classof();
      module.exports = TO_STRING_TAG_SUPPORT2 ? {}.toString : function toString2() {
        return "[object " + classof2(this) + "]";
      };
    }
  });

  // node_modules/core-js/internals/iterators.js
  var require_iterators = __commonJS({
    "node_modules/core-js/internals/iterators.js": function(exports, module) {
      module.exports = {};
    }
  });

  // node_modules/core-js/internals/correct-prototype-getter.js
  var require_correct_prototype_getter = __commonJS({
    "node_modules/core-js/internals/correct-prototype-getter.js": function(exports, module) {
      var fails7 = require_fails();
      module.exports = !fails7(function() {
        function F() {
        }
        F.prototype.constructor = null;
        return Object.getPrototypeOf(new F()) !== F.prototype;
      });
    }
  });

  // node_modules/core-js/internals/object-get-prototype-of.js
  var require_object_get_prototype_of = __commonJS({
    "node_modules/core-js/internals/object-get-prototype-of.js": function(exports, module) {
      var has4 = require_has();
      var toObject5 = require_to_object();
      var sharedKey2 = require_shared_key();
      var CORRECT_PROTOTYPE_GETTER = require_correct_prototype_getter();
      var IE_PROTO = sharedKey2("IE_PROTO");
      var ObjectPrototype2 = Object.prototype;
      module.exports = CORRECT_PROTOTYPE_GETTER ? Object.getPrototypeOf : function(O) {
        O = toObject5(O);
        if (has4(O, IE_PROTO))
          return O[IE_PROTO];
        if (typeof O.constructor == "function" && O instanceof O.constructor) {
          return O.constructor.prototype;
        }
        return O instanceof Object ? ObjectPrototype2 : null;
      };
    }
  });

  // node_modules/core-js/internals/iterators-core.js
  var require_iterators_core = __commonJS({
    "node_modules/core-js/internals/iterators-core.js": function(exports, module) {
      "use strict";
      var fails7 = require_fails();
      var getPrototypeOf = require_object_get_prototype_of();
      var createNonEnumerableProperty4 = require_create_non_enumerable_property();
      var has4 = require_has();
      var wellKnownSymbol5 = require_well_known_symbol();
      var IS_PURE2 = require_is_pure();
      var ITERATOR2 = wellKnownSymbol5("iterator");
      var BUGGY_SAFARI_ITERATORS = false;
      var returnThis = function() {
        return this;
      };
      var IteratorPrototype;
      var PrototypeOfArrayIteratorPrototype;
      var arrayIterator;
      if ([].keys) {
        arrayIterator = [].keys();
        if (!("next" in arrayIterator))
          BUGGY_SAFARI_ITERATORS = true;
        else {
          PrototypeOfArrayIteratorPrototype = getPrototypeOf(getPrototypeOf(arrayIterator));
          if (PrototypeOfArrayIteratorPrototype !== Object.prototype)
            IteratorPrototype = PrototypeOfArrayIteratorPrototype;
        }
      }
      var NEW_ITERATOR_PROTOTYPE = IteratorPrototype == void 0 || fails7(function() {
        var test = {};
        return IteratorPrototype[ITERATOR2].call(test) !== test;
      });
      if (NEW_ITERATOR_PROTOTYPE)
        IteratorPrototype = {};
      if ((!IS_PURE2 || NEW_ITERATOR_PROTOTYPE) && !has4(IteratorPrototype, ITERATOR2)) {
        createNonEnumerableProperty4(IteratorPrototype, ITERATOR2, returnThis);
      }
      module.exports = {
        IteratorPrototype: IteratorPrototype,
        BUGGY_SAFARI_ITERATORS: BUGGY_SAFARI_ITERATORS
      };
    }
  });

  // node_modules/core-js/internals/create-iterator-constructor.js
  var require_create_iterator_constructor = __commonJS({
    "node_modules/core-js/internals/create-iterator-constructor.js": function(exports, module) {
      "use strict";
      var IteratorPrototype = require_iterators_core().IteratorPrototype;
      var create3 = require_object_create();
      var createPropertyDescriptor2 = require_create_property_descriptor();
      var setToStringTag2 = require_set_to_string_tag();
      var Iterators = require_iterators();
      var returnThis = function() {
        return this;
      };
      module.exports = function(IteratorConstructor, NAME2, next2) {
        var TO_STRING_TAG2 = NAME2 + " Iterator";
        IteratorConstructor.prototype = create3(IteratorPrototype, { next: createPropertyDescriptor2(1, next2) });
        setToStringTag2(IteratorConstructor, TO_STRING_TAG2, false, true);
        Iterators[TO_STRING_TAG2] = returnThis;
        return IteratorConstructor;
      };
    }
  });

  // node_modules/core-js/internals/a-possible-prototype.js
  var require_a_possible_prototype = __commonJS({
    "node_modules/core-js/internals/a-possible-prototype.js": function(exports, module) {
      var isObject5 = require_is_object();
      module.exports = function(it) {
        if (!isObject5(it) && it !== null) {
          throw TypeError("Can't set " + String(it) + " as a prototype");
        }
        return it;
      };
    }
  });

  // node_modules/core-js/internals/object-set-prototype-of.js
  var require_object_set_prototype_of = __commonJS({
    "node_modules/core-js/internals/object-set-prototype-of.js": function(exports, module) {
      var anObject6 = require_an_object();
      var aPossiblePrototype = require_a_possible_prototype();
      module.exports = Object.setPrototypeOf || ("__proto__" in {} ? function() {
        var CORRECT_SETTER = false;
        var test = {};
        var setter;
        try {
          setter = Object.getOwnPropertyDescriptor(Object.prototype, "__proto__").set;
          setter.call(test, []);
          CORRECT_SETTER = test instanceof Array;
        } catch (error) {
        }
        return function setPrototypeOf(O, proto) {
          anObject6(O);
          aPossiblePrototype(proto);
          if (CORRECT_SETTER)
            setter.call(O, proto);
          else
            O.__proto__ = proto;
          return O;
        };
      }() : void 0);
    }
  });

  // node_modules/core-js/internals/define-iterator.js
  var require_define_iterator = __commonJS({
    "node_modules/core-js/internals/define-iterator.js": function(exports, module) {
      "use strict";
      var $23 = require_export();
      var createIteratorConstructor = require_create_iterator_constructor();
      var getPrototypeOf = require_object_get_prototype_of();
      var setPrototypeOf = require_object_set_prototype_of();
      var setToStringTag2 = require_set_to_string_tag();
      var createNonEnumerableProperty4 = require_create_non_enumerable_property();
      var redefine6 = require_redefine();
      var wellKnownSymbol5 = require_well_known_symbol();
      var IS_PURE2 = require_is_pure();
      var Iterators = require_iterators();
      var IteratorsCore = require_iterators_core();
      var IteratorPrototype = IteratorsCore.IteratorPrototype;
      var BUGGY_SAFARI_ITERATORS = IteratorsCore.BUGGY_SAFARI_ITERATORS;
      var ITERATOR2 = wellKnownSymbol5("iterator");
      var KEYS = "keys";
      var VALUES = "values";
      var ENTRIES = "entries";
      var returnThis = function() {
        return this;
      };
      module.exports = function(Iterable, NAME2, IteratorConstructor, next2, DEFAULT, IS_SET, FORCED3) {
        createIteratorConstructor(IteratorConstructor, NAME2, next2);
        var getIterationMethod = function(KIND) {
          if (KIND === DEFAULT && defaultIterator)
            return defaultIterator;
          if (!BUGGY_SAFARI_ITERATORS && KIND in IterablePrototype)
            return IterablePrototype[KIND];
          switch (KIND) {
            case KEYS:
              return function keys2() {
                return new IteratorConstructor(this, KIND);
              };
            case VALUES:
              return function values() {
                return new IteratorConstructor(this, KIND);
              };
            case ENTRIES:
              return function entries() {
                return new IteratorConstructor(this, KIND);
              };
          }
          return function() {
            return new IteratorConstructor(this);
          };
        };
        var TO_STRING_TAG2 = NAME2 + " Iterator";
        var INCORRECT_VALUES_NAME = false;
        var IterablePrototype = Iterable.prototype;
        var nativeIterator = IterablePrototype[ITERATOR2] || IterablePrototype["@@iterator"] || DEFAULT && IterablePrototype[DEFAULT];
        var defaultIterator = !BUGGY_SAFARI_ITERATORS && nativeIterator || getIterationMethod(DEFAULT);
        var anyNativeIterator = NAME2 == "Array" ? IterablePrototype.entries || nativeIterator : nativeIterator;
        var CurrentIteratorPrototype, methods, KEY;
        if (anyNativeIterator) {
          CurrentIteratorPrototype = getPrototypeOf(anyNativeIterator.call(new Iterable()));
          if (IteratorPrototype !== Object.prototype && CurrentIteratorPrototype.next) {
            if (!IS_PURE2 && getPrototypeOf(CurrentIteratorPrototype) !== IteratorPrototype) {
              if (setPrototypeOf) {
                setPrototypeOf(CurrentIteratorPrototype, IteratorPrototype);
              } else if (typeof CurrentIteratorPrototype[ITERATOR2] != "function") {
                createNonEnumerableProperty4(CurrentIteratorPrototype, ITERATOR2, returnThis);
              }
            }
            setToStringTag2(CurrentIteratorPrototype, TO_STRING_TAG2, true, true);
            if (IS_PURE2)
              Iterators[TO_STRING_TAG2] = returnThis;
          }
        }
        if (DEFAULT == VALUES && nativeIterator && nativeIterator.name !== VALUES) {
          INCORRECT_VALUES_NAME = true;
          defaultIterator = function values() {
            return nativeIterator.call(this);
          };
        }
        if ((!IS_PURE2 || FORCED3) && IterablePrototype[ITERATOR2] !== defaultIterator) {
          createNonEnumerableProperty4(IterablePrototype, ITERATOR2, defaultIterator);
        }
        Iterators[NAME2] = defaultIterator;
        if (DEFAULT) {
          methods = {
            values: getIterationMethod(VALUES),
            keys: IS_SET ? defaultIterator : getIterationMethod(KEYS),
            entries: getIterationMethod(ENTRIES)
          };
          if (FORCED3)
            for (KEY in methods) {
              if (BUGGY_SAFARI_ITERATORS || INCORRECT_VALUES_NAME || !(KEY in IterablePrototype)) {
                redefine6(IterablePrototype, KEY, methods[KEY]);
              }
            }
          else
            $23({ target: NAME2, proto: true, forced: BUGGY_SAFARI_ITERATORS || INCORRECT_VALUES_NAME }, methods);
        }
        return methods;
      };
    }
  });

  // node_modules/core-js/modules/es.array.iterator.js
  var require_es_array_iterator = __commonJS({
    "node_modules/core-js/modules/es.array.iterator.js": function(exports, module) {
      "use strict";
      var toIndexedObject6 = require_to_indexed_object();
      var addToUnscopables4 = require_add_to_unscopables();
      var Iterators = require_iterators();
      var InternalStateModule3 = require_internal_state();
      var defineIterator2 = require_define_iterator();
      var ARRAY_ITERATOR = "Array Iterator";
      var setInternalState3 = InternalStateModule3.set;
      var getInternalState3 = InternalStateModule3.getterFor(ARRAY_ITERATOR);
      module.exports = defineIterator2(Array, "Array", function(iterated, kind) {
        setInternalState3(this, {
          type: ARRAY_ITERATOR,
          target: toIndexedObject6(iterated),
          index: 0,
          kind: kind
        });
      }, function() {
        var state = getInternalState3(this);
        var target = state.target;
        var kind = state.kind;
        var index = state.index++;
        if (!target || index >= target.length) {
          state.target = void 0;
          return { value: void 0, done: true };
        }
        if (kind == "keys")
          return { value: index, done: false };
        if (kind == "values")
          return { value: target[index], done: false };
        return { value: [index, target[index]], done: false };
      }, "values");
      Iterators.Arguments = Iterators.Array;
      addToUnscopables4("keys");
      addToUnscopables4("values");
      addToUnscopables4("entries");
    }
  });

  // node_modules/core-js/internals/iterator-close.js
  var require_iterator_close = __commonJS({
    "node_modules/core-js/internals/iterator-close.js": function(exports, module) {
      var anObject6 = require_an_object();
      module.exports = function(iterator) {
        var returnMethod = iterator["return"];
        if (returnMethod !== void 0) {
          return anObject6(returnMethod.call(iterator)).value;
        }
      };
    }
  });

  // node_modules/core-js/internals/call-with-safe-iteration-closing.js
  var require_call_with_safe_iteration_closing = __commonJS({
    "node_modules/core-js/internals/call-with-safe-iteration-closing.js": function(exports, module) {
      var anObject6 = require_an_object();
      var iteratorClose = require_iterator_close();
      module.exports = function(iterator, fn, value, ENTRIES) {
        try {
          return ENTRIES ? fn(anObject6(value)[0], value[1]) : fn(value);
        } catch (error) {
          iteratorClose(iterator);
          throw error;
        }
      };
    }
  });

  // node_modules/core-js/internals/is-array-iterator-method.js
  var require_is_array_iterator_method = __commonJS({
    "node_modules/core-js/internals/is-array-iterator-method.js": function(exports, module) {
      var wellKnownSymbol5 = require_well_known_symbol();
      var Iterators = require_iterators();
      var ITERATOR2 = wellKnownSymbol5("iterator");
      var ArrayPrototype = Array.prototype;
      module.exports = function(it) {
        return it !== void 0 && (Iterators.Array === it || ArrayPrototype[ITERATOR2] === it);
      };
    }
  });

  // node_modules/core-js/internals/get-iterator-method.js
  var require_get_iterator_method = __commonJS({
    "node_modules/core-js/internals/get-iterator-method.js": function(exports, module) {
      var classof2 = require_classof();
      var Iterators = require_iterators();
      var wellKnownSymbol5 = require_well_known_symbol();
      var ITERATOR2 = wellKnownSymbol5("iterator");
      module.exports = function(it) {
        if (it != void 0)
          return it[ITERATOR2] || it["@@iterator"] || Iterators[classof2(it)];
      };
    }
  });

  // node_modules/core-js/internals/array-from.js
  var require_array_from = __commonJS({
    "node_modules/core-js/internals/array-from.js": function(exports, module) {
      "use strict";
      var bind = require_function_bind_context();
      var toObject5 = require_to_object();
      var callWithSafeIterationClosing = require_call_with_safe_iteration_closing();
      var isArrayIteratorMethod = require_is_array_iterator_method();
      var toLength7 = require_to_length();
      var createProperty5 = require_create_property();
      var getIteratorMethod = require_get_iterator_method();
      module.exports = function from2(arrayLike) {
        var O = toObject5(arrayLike);
        var C = typeof this == "function" ? this : Array;
        var argumentsLength = arguments.length;
        var mapfn = argumentsLength > 1 ? arguments[1] : void 0;
        var mapping = mapfn !== void 0;
        var iteratorMethod = getIteratorMethod(O);
        var index = 0;
        var length, result, step, iterator, next2, value;
        if (mapping)
          mapfn = bind(mapfn, argumentsLength > 2 ? arguments[2] : void 0, 2);
        if (iteratorMethod != void 0 && !(C == Array && isArrayIteratorMethod(iteratorMethod))) {
          iterator = iteratorMethod.call(O);
          next2 = iterator.next;
          result = new C();
          for (; !(step = next2.call(iterator)).done; index++) {
            value = mapping ? callWithSafeIterationClosing(iterator, mapfn, [step.value, index], true) : step.value;
            createProperty5(result, index, value);
          }
        } else {
          length = toLength7(O.length);
          result = new C(length);
          for (; length > index; index++) {
            value = mapping ? mapfn(O[index], index) : O[index];
            createProperty5(result, index, value);
          }
        }
        result.length = index;
        return result;
      };
    }
  });

  // node_modules/core-js/internals/check-correctness-of-iteration.js
  var require_check_correctness_of_iteration = __commonJS({
    "node_modules/core-js/internals/check-correctness-of-iteration.js": function(exports, module) {
      var wellKnownSymbol5 = require_well_known_symbol();
      var ITERATOR2 = wellKnownSymbol5("iterator");
      var SAFE_CLOSING = false;
      try {
        called = 0;
        iteratorWithReturn = {
          next: function() {
            return { done: !!called++ };
          },
          "return": function() {
            SAFE_CLOSING = true;
          }
        };
        iteratorWithReturn[ITERATOR2] = function() {
          return this;
        };
        Array.from(iteratorWithReturn, function() {
          throw 2;
        });
      } catch (error) {
      }
      var called;
      var iteratorWithReturn;
      module.exports = function(exec, SKIP_CLOSING) {
        if (!SKIP_CLOSING && !SAFE_CLOSING)
          return false;
        var ITERATION_SUPPORT = false;
        try {
          var object = {};
          object[ITERATOR2] = function() {
            return {
              next: function() {
                return { done: ITERATION_SUPPORT = true };
              }
            };
          };
          exec(object);
        } catch (error) {
        }
        return ITERATION_SUPPORT;
      };
    }
  });

  // node_modules/core-js/internals/not-a-regexp.js
  var require_not_a_regexp = __commonJS({
    "node_modules/core-js/internals/not-a-regexp.js": function(exports, module) {
      var isRegExp2 = require_is_regexp();
      module.exports = function(it) {
        if (isRegExp2(it)) {
          throw TypeError("The method doesn't accept regular expressions");
        }
        return it;
      };
    }
  });

  // node_modules/core-js/internals/correct-is-regexp-logic.js
  var require_correct_is_regexp_logic = __commonJS({
    "node_modules/core-js/internals/correct-is-regexp-logic.js": function(exports, module) {
      var wellKnownSymbol5 = require_well_known_symbol();
      var MATCH = wellKnownSymbol5("match");
      module.exports = function(METHOD_NAME) {
        var regexp = /./;
        try {
          "/./"[METHOD_NAME](regexp);
        } catch (error1) {
          try {
            regexp[MATCH] = false;
            return "/./"[METHOD_NAME](regexp);
          } catch (error2) {
          }
        }
        return false;
      };
    }
  });

  // node_modules/core-js/internals/inherit-if-required.js
  var require_inherit_if_required = __commonJS({
    "node_modules/core-js/internals/inherit-if-required.js": function(exports, module) {
      var isObject5 = require_is_object();
      var setPrototypeOf = require_object_set_prototype_of();
      module.exports = function($this, dummy, Wrapper) {
        var NewTarget, NewTargetPrototype;
        if (setPrototypeOf && typeof (NewTarget = dummy.constructor) == "function" && NewTarget !== Wrapper && isObject5(NewTargetPrototype = NewTarget.prototype) && NewTargetPrototype !== Wrapper.prototype)
          setPrototypeOf($this, NewTargetPrototype);
        return $this;
      };
    }
  });

  // node_modules/core-js/internals/whitespaces.js
  var require_whitespaces = __commonJS({
    "node_modules/core-js/internals/whitespaces.js": function(exports, module) {
      module.exports = "	\n\v\f\r \xA0\u1680\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200A\u202F\u205F\u3000\u2028\u2029\uFEFF";
    }
  });

  // node_modules/core-js/internals/string-trim.js
  var require_string_trim = __commonJS({
    "node_modules/core-js/internals/string-trim.js": function(exports, module) {
      var requireObjectCoercible5 = require_require_object_coercible();
      var whitespaces = require_whitespaces();
      var whitespace = "[" + whitespaces + "]";
      var ltrim = RegExp("^" + whitespace + whitespace + "*");
      var rtrim = RegExp(whitespace + whitespace + "*$");
      var createMethod = function(TYPE) {
        return function($this) {
          var string = String(requireObjectCoercible5($this));
          if (TYPE & 1)
            string = string.replace(ltrim, "");
          if (TYPE & 2)
            string = string.replace(rtrim, "");
          return string;
        };
      };
      module.exports = {
        start: createMethod(1),
        end: createMethod(2),
        trim: createMethod(3)
      };
    }
  });

  // node_modules/core-js/modules/es.array.for-each.js
  "use strict";
  var $ = require_export();
  var forEach = require_array_for_each();
  $({ target: "Array", proto: true, forced: [].forEach != forEach }, {
    forEach: forEach
  });

  // node_modules/core-js/modules/web.dom-collections.for-each.js
  var global2 = require_global();
  var DOMIterables = require_dom_iterables();
  var forEach2 = require_array_for_each();
  var createNonEnumerableProperty = require_create_non_enumerable_property();
  for (var COLLECTION_NAME in DOMIterables) {
    Collection = global2[COLLECTION_NAME];
    CollectionPrototype = Collection && Collection.prototype;
    if (CollectionPrototype && CollectionPrototype.forEach !== forEach2)
      try {
        createNonEnumerableProperty(CollectionPrototype, "forEach", forEach2);
      } catch (error) {
        CollectionPrototype.forEach = forEach2;
      }
  }
  var Collection;
  var CollectionPrototype;

  // App_State.ts
  var import_es_regexp_exec6 = __toModule(require_es_regexp_exec());

  // node_modules/core-js/modules/es.string.split.js
  "use strict";
  var fixRegExpWellKnownSymbolLogic = require_fix_regexp_well_known_symbol_logic();
  var isRegExp = require_is_regexp();
  var anObject = require_an_object();
  var requireObjectCoercible = require_require_object_coercible();
  var speciesConstructor = require_species_constructor();
  var advanceStringIndex = require_advance_string_index();
  var toLength = require_to_length();
  var callRegExpExec = require_regexp_exec_abstract();
  var regexpExec = require_regexp_exec();
  var stickyHelpers = require_regexp_sticky_helpers();
  var UNSUPPORTED_Y = stickyHelpers.UNSUPPORTED_Y;
  var arrayPush = [].push;
  var min = Math.min;
  var MAX_UINT32 = 4294967295;
  fixRegExpWellKnownSymbolLogic("split", 2, function(SPLIT, nativeSplit, maybeCallNative) {
    var internalSplit;
    if ("abbc".split(/(b)*/)[1] == "c" || "test".split(/(?:)/, -1).length != 4 || "ab".split(/(?:ab)*/).length != 2 || ".".split(/(.?)(.?)/).length != 4 || ".".split(/()()/).length > 1 || "".split(/.?/).length) {
      internalSplit = function(separator, limit) {
        var string = String(requireObjectCoercible(this));
        var lim = limit === void 0 ? MAX_UINT32 : limit >>> 0;
        if (lim === 0)
          return [];
        if (separator === void 0)
          return [string];
        if (!isRegExp(separator)) {
          return nativeSplit.call(string, separator, lim);
        }
        var output = [];
        var flags2 = (separator.ignoreCase ? "i" : "") + (separator.multiline ? "m" : "") + (separator.unicode ? "u" : "") + (separator.sticky ? "y" : "");
        var lastLastIndex = 0;
        var separatorCopy = new RegExp(separator.source, flags2 + "g");
        var match, lastIndex, lastLength;
        while (match = regexpExec.call(separatorCopy, string)) {
          lastIndex = separatorCopy.lastIndex;
          if (lastIndex > lastLastIndex) {
            output.push(string.slice(lastLastIndex, match.index));
            if (match.length > 1 && match.index < string.length)
              arrayPush.apply(output, match.slice(1));
            lastLength = match[0].length;
            lastLastIndex = lastIndex;
            if (output.length >= lim)
              break;
          }
          if (separatorCopy.lastIndex === match.index)
            separatorCopy.lastIndex++;
        }
        if (lastLastIndex === string.length) {
          if (lastLength || !separatorCopy.test(""))
            output.push("");
        } else
          output.push(string.slice(lastLastIndex));
        return output.length > lim ? output.slice(0, lim) : output;
      };
    } else if ("0".split(void 0, 0).length) {
      internalSplit = function(separator, limit) {
        return separator === void 0 && limit === 0 ? [] : nativeSplit.call(this, separator, limit);
      };
    } else
      internalSplit = nativeSplit;
    return [
      function split(separator, limit) {
        var O = requireObjectCoercible(this);
        var splitter = separator == void 0 ? void 0 : separator[SPLIT];
        return splitter !== void 0 ? splitter.call(separator, O, limit) : internalSplit.call(String(O), separator, limit);
      },
      function(regexp, limit) {
        var res = maybeCallNative(internalSplit, regexp, this, limit, internalSplit !== nativeSplit);
        if (res.done)
          return res.value;
        var rx = anObject(regexp);
        var S = String(this);
        var C = speciesConstructor(rx, RegExp);
        var unicodeMatching = rx.unicode;
        var flags2 = (rx.ignoreCase ? "i" : "") + (rx.multiline ? "m" : "") + (rx.unicode ? "u" : "") + (UNSUPPORTED_Y ? "g" : "y");
        var splitter = new C(UNSUPPORTED_Y ? "^(?:" + rx.source + ")" : rx, flags2);
        var lim = limit === void 0 ? MAX_UINT32 : limit >>> 0;
        if (lim === 0)
          return [];
        if (S.length === 0)
          return callRegExpExec(splitter, S) === null ? [S] : [];
        var p = 0;
        var q = 0;
        var A = [];
        while (q < S.length) {
          splitter.lastIndex = UNSUPPORTED_Y ? 0 : q;
          var z = callRegExpExec(splitter, UNSUPPORTED_Y ? S.slice(q) : S);
          var e;
          if (z === null || (e = min(toLength(splitter.lastIndex + (UNSUPPORTED_Y ? q : 0)), S.length)) === p) {
            q = advanceStringIndex(S, q, unicodeMatching);
          } else {
            A.push(S.slice(p, q));
            if (A.length === lim)
              return A;
            for (var i = 1; i <= z.length - 1; i++) {
              A.push(z[i]);
              if (A.length === lim)
                return A;
            }
            q = p = e;
          }
        }
        A.push(S.slice(p));
        return A;
      }
    ];
  }, UNSUPPORTED_Y);

  // node_modules/core-js/modules/es.string.replace.js
  "use strict";
  var fixRegExpWellKnownSymbolLogic2 = require_fix_regexp_well_known_symbol_logic();
  var anObject2 = require_an_object();
  var toLength2 = require_to_length();
  var toInteger = require_to_integer();
  var requireObjectCoercible2 = require_require_object_coercible();
  var advanceStringIndex2 = require_advance_string_index();
  var getSubstitution = require_get_substitution();
  var regExpExec = require_regexp_exec_abstract();
  var max = Math.max;
  var min2 = Math.min;
  var maybeToString = function(it) {
    return it === void 0 ? it : String(it);
  };
  fixRegExpWellKnownSymbolLogic2("replace", 2, function(REPLACE, nativeReplace, maybeCallNative, reason) {
    var REGEXP_REPLACE_SUBSTITUTES_UNDEFINED_CAPTURE = reason.REGEXP_REPLACE_SUBSTITUTES_UNDEFINED_CAPTURE;
    var REPLACE_KEEPS_$0 = reason.REPLACE_KEEPS_$0;
    var UNSAFE_SUBSTITUTE = REGEXP_REPLACE_SUBSTITUTES_UNDEFINED_CAPTURE ? "$" : "$0";
    return [
      function replace(searchValue, replaceValue) {
        var O = requireObjectCoercible2(this);
        var replacer = searchValue == void 0 ? void 0 : searchValue[REPLACE];
        return replacer !== void 0 ? replacer.call(searchValue, O, replaceValue) : nativeReplace.call(String(O), searchValue, replaceValue);
      },
      function(regexp, replaceValue) {
        if (!REGEXP_REPLACE_SUBSTITUTES_UNDEFINED_CAPTURE && REPLACE_KEEPS_$0 || typeof replaceValue === "string" && replaceValue.indexOf(UNSAFE_SUBSTITUTE) === -1) {
          var res = maybeCallNative(nativeReplace, regexp, this, replaceValue);
          if (res.done)
            return res.value;
        }
        var rx = anObject2(regexp);
        var S = String(this);
        var functionalReplace = typeof replaceValue === "function";
        if (!functionalReplace)
          replaceValue = String(replaceValue);
        var global7 = rx.global;
        if (global7) {
          var fullUnicode = rx.unicode;
          rx.lastIndex = 0;
        }
        var results = [];
        while (true) {
          var result = regExpExec(rx, S);
          if (result === null)
            break;
          results.push(result);
          if (!global7)
            break;
          var matchStr = String(result[0]);
          if (matchStr === "")
            rx.lastIndex = advanceStringIndex2(S, toLength2(rx.lastIndex), fullUnicode);
        }
        var accumulatedResult = "";
        var nextSourcePosition = 0;
        for (var i = 0; i < results.length; i++) {
          result = results[i];
          var matched = String(result[0]);
          var position = max(min2(toInteger(result.index), S.length), 0);
          var captures = [];
          for (var j = 1; j < result.length; j++)
            captures.push(maybeToString(result[j]));
          var namedCaptures = result.groups;
          if (functionalReplace) {
            var replacerArgs = [matched].concat(captures, position, S);
            if (namedCaptures !== void 0)
              replacerArgs.push(namedCaptures);
            var replacement = String(replaceValue.apply(void 0, replacerArgs));
          } else {
            replacement = getSubstitution(matched, S, position, captures, namedCaptures, replaceValue);
          }
          if (position >= nextSourcePosition) {
            accumulatedResult += S.slice(nextSourcePosition, position) + replacement;
            nextSourcePosition = position + matched.length;
          }
        }
        return accumulatedResult + S.slice(nextSourcePosition);
      }
    ];
  });

  // node_modules/core-js/modules/es.array.find-index.js
  "use strict";
  var $2 = require_export();
  var $findIndex = require_array_iteration().findIndex;
  var addToUnscopables = require_add_to_unscopables();
  var FIND_INDEX = "findIndex";
  var SKIPS_HOLES = true;
  if (FIND_INDEX in [])
    Array(1)[FIND_INDEX](function() {
      SKIPS_HOLES = false;
    });
  $2({ target: "Array", proto: true, forced: SKIPS_HOLES }, {
    findIndex: function findIndex(callbackfn) {
      return $findIndex(this, callbackfn, arguments.length > 1 ? arguments[1] : void 0);
    }
  });
  addToUnscopables(FIND_INDEX);

  // node_modules/core-js/modules/es.array.splice.js
  "use strict";
  var $3 = require_export();
  var toAbsoluteIndex = require_to_absolute_index();
  var toInteger2 = require_to_integer();
  var toLength3 = require_to_length();
  var toObject = require_to_object();
  var arraySpeciesCreate = require_array_species_create();
  var createProperty = require_create_property();
  var arrayMethodHasSpeciesSupport = require_array_method_has_species_support();
  var HAS_SPECIES_SUPPORT = arrayMethodHasSpeciesSupport("splice");
  var max2 = Math.max;
  var min3 = Math.min;
  var MAX_SAFE_INTEGER = 9007199254740991;
  var MAXIMUM_ALLOWED_LENGTH_EXCEEDED = "Maximum allowed length exceeded";
  $3({ target: "Array", proto: true, forced: !HAS_SPECIES_SUPPORT }, {
    splice: function splice(start, deleteCount) {
      var O = toObject(this);
      var len = toLength3(O.length);
      var actualStart = toAbsoluteIndex(start, len);
      var argumentsLength = arguments.length;
      var insertCount, actualDeleteCount, A, k, from2, to;
      if (argumentsLength === 0) {
        insertCount = actualDeleteCount = 0;
      } else if (argumentsLength === 1) {
        insertCount = 0;
        actualDeleteCount = len - actualStart;
      } else {
        insertCount = argumentsLength - 2;
        actualDeleteCount = min3(max2(toInteger2(deleteCount), 0), len - actualStart);
      }
      if (len + insertCount - actualDeleteCount > MAX_SAFE_INTEGER) {
        throw TypeError(MAXIMUM_ALLOWED_LENGTH_EXCEEDED);
      }
      A = arraySpeciesCreate(O, actualDeleteCount);
      for (k = 0; k < actualDeleteCount; k++) {
        from2 = actualStart + k;
        if (from2 in O)
          createProperty(A, k, O[from2]);
      }
      A.length = actualDeleteCount;
      if (insertCount < actualDeleteCount) {
        for (k = actualStart; k < len - actualDeleteCount; k++) {
          from2 = k + actualDeleteCount;
          to = k + insertCount;
          if (from2 in O)
            O[to] = O[from2];
          else
            delete O[to];
        }
        for (k = len; k > len - actualDeleteCount + insertCount; k--)
          delete O[k - 1];
      } else if (insertCount > actualDeleteCount) {
        for (k = len - actualDeleteCount; k > actualStart; k--) {
          from2 = k + actualDeleteCount - 1;
          to = k + insertCount - 1;
          if (from2 in O)
            O[to] = O[from2];
          else
            delete O[to];
        }
      }
      for (k = 0; k < insertCount; k++) {
        O[k + actualStart] = arguments[k + 2];
      }
      O.length = len - actualDeleteCount + insertCount;
      return A;
    }
  });

  // node_modules/core-js/modules/es.array.filter.js
  "use strict";
  var $4 = require_export();
  var $filter = require_array_iteration().filter;
  var arrayMethodHasSpeciesSupport2 = require_array_method_has_species_support();
  var HAS_SPECIES_SUPPORT2 = arrayMethodHasSpeciesSupport2("filter");
  $4({ target: "Array", proto: true, forced: !HAS_SPECIES_SUPPORT2 }, {
    filter: function filter(callbackfn) {
      return $filter(this, callbackfn, arguments.length > 1 ? arguments[1] : void 0);
    }
  });

  // node_modules/core-js/modules/es.object.assign.js
  var $5 = require_export();
  var assign = require_object_assign();
  $5({ target: "Object", stat: true, forced: Object.assign !== assign }, {
    assign: assign
  });

  // node_modules/core-js/modules/es.array.concat.js
  "use strict";
  var $6 = require_export();
  var fails = require_fails();
  var isArray = require_is_array();
  var isObject = require_is_object();
  var toObject2 = require_to_object();
  var toLength4 = require_to_length();
  var createProperty2 = require_create_property();
  var arraySpeciesCreate2 = require_array_species_create();
  var arrayMethodHasSpeciesSupport3 = require_array_method_has_species_support();
  var wellKnownSymbol = require_well_known_symbol();
  var V8_VERSION = require_engine_v8_version();
  var IS_CONCAT_SPREADABLE = wellKnownSymbol("isConcatSpreadable");
  var MAX_SAFE_INTEGER2 = 9007199254740991;
  var MAXIMUM_ALLOWED_INDEX_EXCEEDED = "Maximum allowed index exceeded";
  var IS_CONCAT_SPREADABLE_SUPPORT = V8_VERSION >= 51 || !fails(function() {
    var array = [];
    array[IS_CONCAT_SPREADABLE] = false;
    return array.concat()[0] !== array;
  });
  var SPECIES_SUPPORT = arrayMethodHasSpeciesSupport3("concat");
  var isConcatSpreadable = function(O) {
    if (!isObject(O))
      return false;
    var spreadable = O[IS_CONCAT_SPREADABLE];
    return spreadable !== void 0 ? !!spreadable : isArray(O);
  };
  var FORCED = !IS_CONCAT_SPREADABLE_SUPPORT || !SPECIES_SUPPORT;
  $6({ target: "Array", proto: true, forced: FORCED }, {
    concat: function concat(arg) {
      var O = toObject2(this);
      var A = arraySpeciesCreate2(O, 0);
      var n = 0;
      var i, k, length, len, E;
      for (i = -1, length = arguments.length; i < length; i++) {
        E = i === -1 ? O : arguments[i];
        if (isConcatSpreadable(E)) {
          len = toLength4(E.length);
          if (n + len > MAX_SAFE_INTEGER2)
            throw TypeError(MAXIMUM_ALLOWED_INDEX_EXCEEDED);
          for (k = 0; k < len; k++, n++)
            if (k in E)
              createProperty2(A, n, E[k]);
        } else {
          if (n >= MAX_SAFE_INTEGER2)
            throw TypeError(MAXIMUM_ALLOWED_INDEX_EXCEEDED);
          createProperty2(A, n++, E);
        }
      }
      A.length = n;
      return A;
    }
  });

  // node_modules/core-js/modules/es.array.map.js
  "use strict";
  var $7 = require_export();
  var $map = require_array_iteration().map;
  var arrayMethodHasSpeciesSupport4 = require_array_method_has_species_support();
  var HAS_SPECIES_SUPPORT3 = arrayMethodHasSpeciesSupport4("map");
  $7({ target: "Array", proto: true, forced: !HAS_SPECIES_SUPPORT3 }, {
    map: function map(callbackfn) {
      return $map(this, callbackfn, arguments.length > 1 ? arguments[1] : void 0);
    }
  });

  // node_modules/core-js/modules/es.array.find.js
  "use strict";
  var $8 = require_export();
  var $find = require_array_iteration().find;
  var addToUnscopables2 = require_add_to_unscopables();
  var FIND = "find";
  var SKIPS_HOLES2 = true;
  if (FIND in [])
    Array(1)[FIND](function() {
      SKIPS_HOLES2 = false;
    });
  $8({ target: "Array", proto: true, forced: SKIPS_HOLES2 }, {
    find: function find(callbackfn) {
      return $find(this, callbackfn, arguments.length > 1 ? arguments[1] : void 0);
    }
  });
  addToUnscopables2(FIND);

  // node_modules/core-js/modules/es.string.match.js
  "use strict";
  var fixRegExpWellKnownSymbolLogic3 = require_fix_regexp_well_known_symbol_logic();
  var anObject3 = require_an_object();
  var toLength5 = require_to_length();
  var requireObjectCoercible3 = require_require_object_coercible();
  var advanceStringIndex3 = require_advance_string_index();
  var regExpExec2 = require_regexp_exec_abstract();
  fixRegExpWellKnownSymbolLogic3("match", 1, function(MATCH, nativeMatch, maybeCallNative) {
    return [
      function match(regexp) {
        var O = requireObjectCoercible3(this);
        var matcher = regexp == void 0 ? void 0 : regexp[MATCH];
        return matcher !== void 0 ? matcher.call(regexp, O) : new RegExp(regexp)[MATCH](String(O));
      },
      function(regexp) {
        var res = maybeCallNative(nativeMatch, regexp, this);
        if (res.done)
          return res.value;
        var rx = anObject3(regexp);
        var S = String(this);
        if (!rx.global)
          return regExpExec2(rx, S);
        var fullUnicode = rx.unicode;
        rx.lastIndex = 0;
        var A = [];
        var n = 0;
        var result;
        while ((result = regExpExec2(rx, S)) !== null) {
          var matchStr = String(result[0]);
          A[n] = matchStr;
          if (matchStr === "")
            rx.lastIndex = advanceStringIndex3(S, toLength5(rx.lastIndex), fullUnicode);
          n++;
        }
        return n === 0 ? null : A;
      }
    ];
  });

  // node_modules/core-js/modules/es.array.reduce.js
  "use strict";
  var $9 = require_export();
  var $reduce = require_array_reduce().left;
  var arrayMethodIsStrict = require_array_method_is_strict();
  var CHROME_VERSION = require_engine_v8_version();
  var IS_NODE = require_engine_is_node();
  var STRICT_METHOD = arrayMethodIsStrict("reduce");
  var CHROME_BUG = !IS_NODE && CHROME_VERSION > 79 && CHROME_VERSION < 83;
  $9({ target: "Array", proto: true, forced: !STRICT_METHOD || CHROME_BUG }, {
    reduce: function reduce(callbackfn) {
      return $reduce(this, callbackfn, arguments.length, arguments.length > 1 ? arguments[1] : void 0);
    }
  });

  // node_modules/core-js/modules/es.object.define-property.js
  var $10 = require_export();
  var DESCRIPTORS = require_descriptors();
  var objectDefinePropertyModile = require_object_define_property();
  $10({ target: "Object", stat: true, forced: !DESCRIPTORS, sham: !DESCRIPTORS }, {
    defineProperty: objectDefinePropertyModile.f
  });

  // node_modules/core-js/modules/es.object.keys.js
  var $11 = require_export();
  var toObject3 = require_to_object();
  var nativeKeys = require_object_keys();
  var fails2 = require_fails();
  var FAILS_ON_PRIMITIVES = fails2(function() {
    nativeKeys(1);
  });
  $11({ target: "Object", stat: true, forced: FAILS_ON_PRIMITIVES }, {
    keys: function keys(it) {
      return nativeKeys(toObject3(it));
    }
  });

  // node_modules/core-js/modules/es.symbol.js
  "use strict";
  var $12 = require_export();
  var global3 = require_global();
  var getBuiltIn = require_get_built_in();
  var IS_PURE = require_is_pure();
  var DESCRIPTORS2 = require_descriptors();
  var NATIVE_SYMBOL = require_native_symbol();
  var USE_SYMBOL_AS_UID = require_use_symbol_as_uid();
  var fails3 = require_fails();
  var has = require_has();
  var isArray2 = require_is_array();
  var isObject2 = require_is_object();
  var anObject4 = require_an_object();
  var toObject4 = require_to_object();
  var toIndexedObject = require_to_indexed_object();
  var toPrimitive = require_to_primitive();
  var createPropertyDescriptor = require_create_property_descriptor();
  var nativeObjectCreate = require_object_create();
  var objectKeys = require_object_keys();
  var getOwnPropertyNamesModule = require_object_get_own_property_names();
  var getOwnPropertyNamesExternal = require_object_get_own_property_names_external();
  var getOwnPropertySymbolsModule = require_object_get_own_property_symbols();
  var getOwnPropertyDescriptorModule = require_object_get_own_property_descriptor();
  var definePropertyModule = require_object_define_property();
  var propertyIsEnumerableModule = require_object_property_is_enumerable();
  var createNonEnumerableProperty2 = require_create_non_enumerable_property();
  var redefine = require_redefine();
  var shared = require_shared();
  var sharedKey = require_shared_key();
  var hiddenKeys = require_hidden_keys();
  var uid = require_uid();
  var wellKnownSymbol2 = require_well_known_symbol();
  var wrappedWellKnownSymbolModule = require_well_known_symbol_wrapped();
  var defineWellKnownSymbol = require_define_well_known_symbol();
  var setToStringTag = require_set_to_string_tag();
  var InternalStateModule = require_internal_state();
  var $forEach = require_array_iteration().forEach;
  var HIDDEN = sharedKey("hidden");
  var SYMBOL = "Symbol";
  var PROTOTYPE = "prototype";
  var TO_PRIMITIVE = wellKnownSymbol2("toPrimitive");
  var setInternalState = InternalStateModule.set;
  var getInternalState = InternalStateModule.getterFor(SYMBOL);
  var ObjectPrototype = Object[PROTOTYPE];
  var $Symbol = global3.Symbol;
  var $stringify = getBuiltIn("JSON", "stringify");
  var nativeGetOwnPropertyDescriptor = getOwnPropertyDescriptorModule.f;
  var nativeDefineProperty = definePropertyModule.f;
  var nativeGetOwnPropertyNames = getOwnPropertyNamesExternal.f;
  var nativePropertyIsEnumerable = propertyIsEnumerableModule.f;
  var AllSymbols = shared("symbols");
  var ObjectPrototypeSymbols = shared("op-symbols");
  var StringToSymbolRegistry = shared("string-to-symbol-registry");
  var SymbolToStringRegistry = shared("symbol-to-string-registry");
  var WellKnownSymbolsStore = shared("wks");
  var QObject = global3.QObject;
  var USE_SETTER = !QObject || !QObject[PROTOTYPE] || !QObject[PROTOTYPE].findChild;
  var setSymbolDescriptor = DESCRIPTORS2 && fails3(function() {
    return nativeObjectCreate(nativeDefineProperty({}, "a", {
      get: function() {
        return nativeDefineProperty(this, "a", { value: 7 }).a;
      }
    })).a != 7;
  }) ? function(O, P, Attributes) {
    var ObjectPrototypeDescriptor = nativeGetOwnPropertyDescriptor(ObjectPrototype, P);
    if (ObjectPrototypeDescriptor)
      delete ObjectPrototype[P];
    nativeDefineProperty(O, P, Attributes);
    if (ObjectPrototypeDescriptor && O !== ObjectPrototype) {
      nativeDefineProperty(ObjectPrototype, P, ObjectPrototypeDescriptor);
    }
  } : nativeDefineProperty;
  var wrap = function(tag, description) {
    var symbol = AllSymbols[tag] = nativeObjectCreate($Symbol[PROTOTYPE]);
    setInternalState(symbol, {
      type: SYMBOL,
      tag: tag,
      description: description
    });
    if (!DESCRIPTORS2)
      symbol.description = description;
    return symbol;
  };
  var isSymbol = USE_SYMBOL_AS_UID ? function(it) {
    return typeof it == "symbol";
  } : function(it) {
    return Object(it) instanceof $Symbol;
  };
  var $defineProperty = function defineProperty(O, P, Attributes) {
    if (O === ObjectPrototype)
      $defineProperty(ObjectPrototypeSymbols, P, Attributes);
    anObject4(O);
    var key = toPrimitive(P, true);
    anObject4(Attributes);
    if (has(AllSymbols, key)) {
      if (!Attributes.enumerable) {
        if (!has(O, HIDDEN))
          nativeDefineProperty(O, HIDDEN, createPropertyDescriptor(1, {}));
        O[HIDDEN][key] = true;
      } else {
        if (has(O, HIDDEN) && O[HIDDEN][key])
          O[HIDDEN][key] = false;
        Attributes = nativeObjectCreate(Attributes, { enumerable: createPropertyDescriptor(0, false) });
      }
      return setSymbolDescriptor(O, key, Attributes);
    }
    return nativeDefineProperty(O, key, Attributes);
  };
  var $defineProperties = function defineProperties(O, Properties) {
    anObject4(O);
    var properties = toIndexedObject(Properties);
    var keys2 = objectKeys(properties).concat($getOwnPropertySymbols(properties));
    $forEach(keys2, function(key) {
      if (!DESCRIPTORS2 || $propertyIsEnumerable.call(properties, key))
        $defineProperty(O, key, properties[key]);
    });
    return O;
  };
  var $create = function create(O, Properties) {
    return Properties === void 0 ? nativeObjectCreate(O) : $defineProperties(nativeObjectCreate(O), Properties);
  };
  var $propertyIsEnumerable = function propertyIsEnumerable(V) {
    var P = toPrimitive(V, true);
    var enumerable = nativePropertyIsEnumerable.call(this, P);
    if (this === ObjectPrototype && has(AllSymbols, P) && !has(ObjectPrototypeSymbols, P))
      return false;
    return enumerable || !has(this, P) || !has(AllSymbols, P) || has(this, HIDDEN) && this[HIDDEN][P] ? enumerable : true;
  };
  var $getOwnPropertyDescriptor = function getOwnPropertyDescriptor(O, P) {
    var it = toIndexedObject(O);
    var key = toPrimitive(P, true);
    if (it === ObjectPrototype && has(AllSymbols, key) && !has(ObjectPrototypeSymbols, key))
      return;
    var descriptor = nativeGetOwnPropertyDescriptor(it, key);
    if (descriptor && has(AllSymbols, key) && !(has(it, HIDDEN) && it[HIDDEN][key])) {
      descriptor.enumerable = true;
    }
    return descriptor;
  };
  var $getOwnPropertyNames = function getOwnPropertyNames(O) {
    var names = nativeGetOwnPropertyNames(toIndexedObject(O));
    var result = [];
    $forEach(names, function(key) {
      if (!has(AllSymbols, key) && !has(hiddenKeys, key))
        result.push(key);
    });
    return result;
  };
  var $getOwnPropertySymbols = function getOwnPropertySymbols(O) {
    var IS_OBJECT_PROTOTYPE = O === ObjectPrototype;
    var names = nativeGetOwnPropertyNames(IS_OBJECT_PROTOTYPE ? ObjectPrototypeSymbols : toIndexedObject(O));
    var result = [];
    $forEach(names, function(key) {
      if (has(AllSymbols, key) && (!IS_OBJECT_PROTOTYPE || has(ObjectPrototype, key))) {
        result.push(AllSymbols[key]);
      }
    });
    return result;
  };
  if (!NATIVE_SYMBOL) {
    $Symbol = function Symbol2() {
      if (this instanceof $Symbol)
        throw TypeError("Symbol is not a constructor");
      var description = !arguments.length || arguments[0] === void 0 ? void 0 : String(arguments[0]);
      var tag = uid(description);
      var setter = function(value) {
        if (this === ObjectPrototype)
          setter.call(ObjectPrototypeSymbols, value);
        if (has(this, HIDDEN) && has(this[HIDDEN], tag))
          this[HIDDEN][tag] = false;
        setSymbolDescriptor(this, tag, createPropertyDescriptor(1, value));
      };
      if (DESCRIPTORS2 && USE_SETTER)
        setSymbolDescriptor(ObjectPrototype, tag, { configurable: true, set: setter });
      return wrap(tag, description);
    };
    redefine($Symbol[PROTOTYPE], "toString", function toString2() {
      return getInternalState(this).tag;
    });
    redefine($Symbol, "withoutSetter", function(description) {
      return wrap(uid(description), description);
    });
    propertyIsEnumerableModule.f = $propertyIsEnumerable;
    definePropertyModule.f = $defineProperty;
    getOwnPropertyDescriptorModule.f = $getOwnPropertyDescriptor;
    getOwnPropertyNamesModule.f = getOwnPropertyNamesExternal.f = $getOwnPropertyNames;
    getOwnPropertySymbolsModule.f = $getOwnPropertySymbols;
    wrappedWellKnownSymbolModule.f = function(name) {
      return wrap(wellKnownSymbol2(name), name);
    };
    if (DESCRIPTORS2) {
      nativeDefineProperty($Symbol[PROTOTYPE], "description", {
        configurable: true,
        get: function description() {
          return getInternalState(this).description;
        }
      });
      if (!IS_PURE) {
        redefine(ObjectPrototype, "propertyIsEnumerable", $propertyIsEnumerable, { unsafe: true });
      }
    }
  }
  $12({ global: true, wrap: true, forced: !NATIVE_SYMBOL, sham: !NATIVE_SYMBOL }, {
    Symbol: $Symbol
  });
  $forEach(objectKeys(WellKnownSymbolsStore), function(name) {
    defineWellKnownSymbol(name);
  });
  $12({ target: SYMBOL, stat: true, forced: !NATIVE_SYMBOL }, {
    "for": function(key) {
      var string = String(key);
      if (has(StringToSymbolRegistry, string))
        return StringToSymbolRegistry[string];
      var symbol = $Symbol(string);
      StringToSymbolRegistry[string] = symbol;
      SymbolToStringRegistry[symbol] = string;
      return symbol;
    },
    keyFor: function keyFor(sym) {
      if (!isSymbol(sym))
        throw TypeError(sym + " is not a symbol");
      if (has(SymbolToStringRegistry, sym))
        return SymbolToStringRegistry[sym];
    },
    useSetter: function() {
      USE_SETTER = true;
    },
    useSimple: function() {
      USE_SETTER = false;
    }
  });
  $12({ target: "Object", stat: true, forced: !NATIVE_SYMBOL, sham: !DESCRIPTORS2 }, {
    create: $create,
    defineProperty: $defineProperty,
    defineProperties: $defineProperties,
    getOwnPropertyDescriptor: $getOwnPropertyDescriptor
  });
  $12({ target: "Object", stat: true, forced: !NATIVE_SYMBOL }, {
    getOwnPropertyNames: $getOwnPropertyNames,
    getOwnPropertySymbols: $getOwnPropertySymbols
  });
  $12({ target: "Object", stat: true, forced: fails3(function() {
    getOwnPropertySymbolsModule.f(1);
  }) }, {
    getOwnPropertySymbols: function getOwnPropertySymbols2(it) {
      return getOwnPropertySymbolsModule.f(toObject4(it));
    }
  });
  if ($stringify) {
    FORCED_JSON_STRINGIFY = !NATIVE_SYMBOL || fails3(function() {
      var symbol = $Symbol();
      return $stringify([symbol]) != "[null]" || $stringify({ a: symbol }) != "{}" || $stringify(Object(symbol)) != "{}";
    });
    $12({ target: "JSON", stat: true, forced: FORCED_JSON_STRINGIFY }, {
      stringify: function stringify(it, replacer, space) {
        var args = [it];
        var index = 1;
        var $replacer;
        while (arguments.length > index)
          args.push(arguments[index++]);
        $replacer = replacer;
        if (!isObject2(replacer) && it === void 0 || isSymbol(it))
          return;
        if (!isArray2(replacer))
          replacer = function(key, value) {
            if (typeof $replacer == "function")
              value = $replacer.call(this, key, value);
            if (!isSymbol(value))
              return value;
          };
        args[1] = replacer;
        return $stringify.apply(null, args);
      }
    });
  }
  var FORCED_JSON_STRINGIFY;
  if (!$Symbol[PROTOTYPE][TO_PRIMITIVE]) {
    createNonEnumerableProperty2($Symbol[PROTOTYPE], TO_PRIMITIVE, $Symbol[PROTOTYPE].valueOf);
  }
  setToStringTag($Symbol, SYMBOL);
  hiddenKeys[HIDDEN] = true;

  // node_modules/core-js/modules/es.object.get-own-property-descriptor.js
  var $13 = require_export();
  var fails4 = require_fails();
  var toIndexedObject2 = require_to_indexed_object();
  var nativeGetOwnPropertyDescriptor2 = require_object_get_own_property_descriptor().f;
  var DESCRIPTORS3 = require_descriptors();
  var FAILS_ON_PRIMITIVES2 = fails4(function() {
    nativeGetOwnPropertyDescriptor2(1);
  });
  var FORCED2 = !DESCRIPTORS3 || FAILS_ON_PRIMITIVES2;
  $13({ target: "Object", stat: true, forced: FORCED2, sham: !DESCRIPTORS3 }, {
    getOwnPropertyDescriptor: function getOwnPropertyDescriptor2(it, key) {
      return nativeGetOwnPropertyDescriptor2(toIndexedObject2(it), key);
    }
  });

  // node_modules/core-js/modules/es.object.get-own-property-descriptors.js
  var $14 = require_export();
  var DESCRIPTORS4 = require_descriptors();
  var ownKeys = require_own_keys();
  var toIndexedObject3 = require_to_indexed_object();
  var getOwnPropertyDescriptorModule2 = require_object_get_own_property_descriptor();
  var createProperty3 = require_create_property();
  $14({ target: "Object", stat: true, sham: !DESCRIPTORS4 }, {
    getOwnPropertyDescriptors: function getOwnPropertyDescriptors(object) {
      var O = toIndexedObject3(object);
      var getOwnPropertyDescriptor4 = getOwnPropertyDescriptorModule2.f;
      var keys2 = ownKeys(O);
      var result = {};
      var index = 0;
      var key, descriptor;
      while (keys2.length > index) {
        descriptor = getOwnPropertyDescriptor4(O, key = keys2[index++]);
        if (descriptor !== void 0)
          createProperty3(result, key, descriptor);
      }
      return result;
    }
  });

  // node_modules/core-js/modules/es.object.define-properties.js
  var $15 = require_export();
  var DESCRIPTORS5 = require_descriptors();
  var defineProperties2 = require_object_define_properties();
  $15({ target: "Object", stat: true, forced: !DESCRIPTORS5, sham: !DESCRIPTORS5 }, {
    defineProperties: defineProperties2
  });

  // node_modules/core-js/modules/es.array.is-array.js
  var $16 = require_export();
  var isArray3 = require_is_array();
  $16({ target: "Array", stat: true }, {
    isArray: isArray3
  });

  // node_modules/core-js/modules/es.symbol.description.js
  "use strict";
  var $17 = require_export();
  var DESCRIPTORS6 = require_descriptors();
  var global4 = require_global();
  var has2 = require_has();
  var isObject3 = require_is_object();
  var defineProperty2 = require_object_define_property().f;
  var copyConstructorProperties = require_copy_constructor_properties();
  var NativeSymbol = global4.Symbol;
  if (DESCRIPTORS6 && typeof NativeSymbol == "function" && (!("description" in NativeSymbol.prototype) || NativeSymbol().description !== void 0)) {
    EmptyStringDescriptionStore = {};
    SymbolWrapper = function Symbol2() {
      var description = arguments.length < 1 || arguments[0] === void 0 ? void 0 : String(arguments[0]);
      var result = this instanceof SymbolWrapper ? new NativeSymbol(description) : description === void 0 ? NativeSymbol() : NativeSymbol(description);
      if (description === "")
        EmptyStringDescriptionStore[result] = true;
      return result;
    };
    copyConstructorProperties(SymbolWrapper, NativeSymbol);
    symbolPrototype = SymbolWrapper.prototype = NativeSymbol.prototype;
    symbolPrototype.constructor = SymbolWrapper;
    symbolToString = symbolPrototype.toString;
    native = String(NativeSymbol("test")) == "Symbol(test)";
    regexp = /^Symbol\((.*)\)[^)]+$/;
    defineProperty2(symbolPrototype, "description", {
      configurable: true,
      get: function description() {
        var symbol = isObject3(this) ? this.valueOf() : this;
        var string = symbolToString.call(symbol);
        if (has2(EmptyStringDescriptionStore, symbol))
          return "";
        var desc = native ? string.slice(7, -1) : string.replace(regexp, "$1");
        return desc === "" ? void 0 : desc;
      }
    });
    $17({ global: true, forced: true }, {
      Symbol: SymbolWrapper
    });
  }
  var EmptyStringDescriptionStore;
  var SymbolWrapper;
  var symbolPrototype;
  var symbolToString;
  var native;
  var regexp;

  // node_modules/core-js/modules/es.object.to-string.js
  var TO_STRING_TAG_SUPPORT = require_to_string_tag_support();
  var redefine2 = require_redefine();
  var toString = require_object_to_string();
  if (!TO_STRING_TAG_SUPPORT) {
    redefine2(Object.prototype, "toString", toString, { unsafe: true });
  }

  // node_modules/core-js/modules/es.symbol.iterator.js
  var defineWellKnownSymbol2 = require_define_well_known_symbol();
  defineWellKnownSymbol2("iterator");

  // App_State.ts
  var import_es_array_iterator8 = __toModule(require_es_array_iterator());

  // node_modules/core-js/modules/es.string.iterator.js
  "use strict";
  var charAt = require_string_multibyte().charAt;
  var InternalStateModule2 = require_internal_state();
  var defineIterator = require_define_iterator();
  var STRING_ITERATOR = "String Iterator";
  var setInternalState2 = InternalStateModule2.set;
  var getInternalState2 = InternalStateModule2.getterFor(STRING_ITERATOR);
  defineIterator(String, "String", function(iterated) {
    setInternalState2(this, {
      type: STRING_ITERATOR,
      string: String(iterated),
      index: 0
    });
  }, function next() {
    var state = getInternalState2(this);
    var string = state.string;
    var index = state.index;
    var point;
    if (index >= string.length)
      return { value: void 0, done: true };
    point = charAt(string, index);
    state.index += point.length;
    return { value: point, done: false };
  });

  // node_modules/core-js/modules/web.dom-collections.iterator.js
  var global5 = require_global();
  var DOMIterables2 = require_dom_iterables();
  var ArrayIteratorMethods = require_es_array_iterator();
  var createNonEnumerableProperty3 = require_create_non_enumerable_property();
  var wellKnownSymbol3 = require_well_known_symbol();
  var ITERATOR = wellKnownSymbol3("iterator");
  var TO_STRING_TAG = wellKnownSymbol3("toStringTag");
  var ArrayValues = ArrayIteratorMethods.values;
  for (var COLLECTION_NAME in DOMIterables2) {
    Collection = global5[COLLECTION_NAME];
    CollectionPrototype = Collection && Collection.prototype;
    if (CollectionPrototype) {
      if (CollectionPrototype[ITERATOR] !== ArrayValues)
        try {
          createNonEnumerableProperty3(CollectionPrototype, ITERATOR, ArrayValues);
        } catch (error) {
          CollectionPrototype[ITERATOR] = ArrayValues;
        }
      if (!CollectionPrototype[TO_STRING_TAG]) {
        createNonEnumerableProperty3(CollectionPrototype, TO_STRING_TAG, COLLECTION_NAME);
      }
      if (DOMIterables2[COLLECTION_NAME])
        for (METHOD_NAME in ArrayIteratorMethods) {
          if (CollectionPrototype[METHOD_NAME] !== ArrayIteratorMethods[METHOD_NAME])
            try {
              createNonEnumerableProperty3(CollectionPrototype, METHOD_NAME, ArrayIteratorMethods[METHOD_NAME]);
            } catch (error) {
              CollectionPrototype[METHOD_NAME] = ArrayIteratorMethods[METHOD_NAME];
            }
        }
    }
  }
  var Collection;
  var CollectionPrototype;
  var METHOD_NAME;

  // node_modules/core-js/modules/es.array.from.js
  var $18 = require_export();
  var from = require_array_from();
  var checkCorrectnessOfIteration = require_check_correctness_of_iteration();
  var INCORRECT_ITERATION = !checkCorrectnessOfIteration(function(iterable) {
    Array.from(iterable);
  });
  $18({ target: "Array", stat: true, forced: INCORRECT_ITERATION }, {
    from: from
  });

  // node_modules/core-js/modules/es.array.slice.js
  "use strict";
  var $19 = require_export();
  var isObject4 = require_is_object();
  var isArray4 = require_is_array();
  var toAbsoluteIndex2 = require_to_absolute_index();
  var toLength6 = require_to_length();
  var toIndexedObject4 = require_to_indexed_object();
  var createProperty4 = require_create_property();
  var wellKnownSymbol4 = require_well_known_symbol();
  var arrayMethodHasSpeciesSupport5 = require_array_method_has_species_support();
  var HAS_SPECIES_SUPPORT4 = arrayMethodHasSpeciesSupport5("slice");
  var SPECIES = wellKnownSymbol4("species");
  var nativeSlice = [].slice;
  var max3 = Math.max;
  $19({ target: "Array", proto: true, forced: !HAS_SPECIES_SUPPORT4 }, {
    slice: function slice(start, end) {
      var O = toIndexedObject4(this);
      var length = toLength6(O.length);
      var k = toAbsoluteIndex2(start, length);
      var fin = toAbsoluteIndex2(end === void 0 ? length : end, length);
      var Constructor, result, n;
      if (isArray4(O)) {
        Constructor = O.constructor;
        if (typeof Constructor == "function" && (Constructor === Array || isArray4(Constructor.prototype))) {
          Constructor = void 0;
        } else if (isObject4(Constructor)) {
          Constructor = Constructor[SPECIES];
          if (Constructor === null)
            Constructor = void 0;
        }
        if (Constructor === Array || Constructor === void 0) {
          return nativeSlice.call(O, k, fin);
        }
      }
      result = new (Constructor === void 0 ? Array : Constructor)(max3(fin - k, 0));
      for (n = 0; k < fin; k++, n++)
        if (k in O)
          createProperty4(result, n, O[k]);
      result.length = n;
      return result;
    }
  });

  // node_modules/core-js/modules/es.function.name.js
  var DESCRIPTORS7 = require_descriptors();
  var defineProperty3 = require_object_define_property().f;
  var FunctionPrototype = Function.prototype;
  var FunctionPrototypeToString = FunctionPrototype.toString;
  var nameRE = /^\s*function ([^ (]*)/;
  var NAME = "name";
  if (DESCRIPTORS7 && !(NAME in FunctionPrototype)) {
    defineProperty3(FunctionPrototype, NAME, {
      configurable: true,
      get: function() {
        try {
          return FunctionPrototypeToString.call(this).match(nameRE)[1];
        } catch (error) {
          return "";
        }
      }
    });
  }

  // node_modules/core-js/modules/es.array.includes.js
  "use strict";
  var $20 = require_export();
  var $includes = require_array_includes().includes;
  var addToUnscopables3 = require_add_to_unscopables();
  $20({ target: "Array", proto: true }, {
    includes: function includes(el) {
      return $includes(this, el, arguments.length > 1 ? arguments[1] : void 0);
    }
  });
  addToUnscopables3("includes");

  // node_modules/core-js/modules/es.string.includes.js
  "use strict";
  var $21 = require_export();
  var notARegExp = require_not_a_regexp();
  var requireObjectCoercible4 = require_require_object_coercible();
  var correctIsRegExpLogic = require_correct_is_regexp_logic();
  $21({ target: "String", proto: true, forced: !correctIsRegExpLogic("includes") }, {
    includes: function includes2(searchString) {
      return !!~String(requireObjectCoercible4(this)).indexOf(notARegExp(searchString), arguments.length > 1 ? arguments[1] : void 0);
    }
  });

  // utils-grid.ts
  var import_es_regexp_exec = __toModule(require_es_regexp_exec());

  // node_modules/core-js/modules/es.date.to-string.js
  var redefine3 = require_redefine();
  var DatePrototype = Date.prototype;
  var INVALID_DATE = "Invalid Date";
  var TO_STRING = "toString";
  var nativeDateToString = DatePrototype[TO_STRING];
  var getTime = DatePrototype.getTime;
  if (new Date(NaN) + "" != INVALID_DATE) {
    redefine3(DatePrototype, TO_STRING, function toString2() {
      var value = getTime.call(this);
      return value === value ? nativeDateToString.call(this) : INVALID_DATE;
    });
  }

  // node_modules/core-js/modules/es.regexp.to-string.js
  "use strict";
  var redefine4 = require_redefine();
  var anObject5 = require_an_object();
  var fails5 = require_fails();
  var flags = require_regexp_flags();
  var TO_STRING2 = "toString";
  var RegExpPrototype = RegExp.prototype;
  var nativeToString = RegExpPrototype[TO_STRING2];
  var NOT_GENERIC = fails5(function() {
    return nativeToString.call({ source: "a", flags: "b" }) != "/a/b";
  });
  var INCORRECT_NAME = nativeToString.name != TO_STRING2;
  if (NOT_GENERIC || INCORRECT_NAME) {
    redefine4(RegExp.prototype, TO_STRING2, function toString2() {
      var R = anObject5(this);
      var p = String(R.source);
      var rf = R.flags;
      var f = String(rf === void 0 && R instanceof RegExp && !("flags" in RegExpPrototype) ? flags.call(R) : rf);
      return "/" + p + "/" + f;
    }, { unsafe: true });
  }

  // utils-grid.ts
  var import_es_array_iterator2 = __toModule(require_es_array_iterator());

  // node_modules/core-js/modules/es.array.join.js
  "use strict";
  var $22 = require_export();
  var IndexedObject = require_indexed_object();
  var toIndexedObject5 = require_to_indexed_object();
  var arrayMethodIsStrict2 = require_array_method_is_strict();
  var nativeJoin = [].join;
  var ES3_STRINGS = IndexedObject != Object;
  var STRICT_METHOD2 = arrayMethodIsStrict2("join", ",");
  $22({ target: "Array", proto: true, forced: ES3_STRINGS || !STRICT_METHOD2 }, {
    join: function join(separator) {
      return nativeJoin.call(toIndexedObject5(this), separator === void 0 ? "," : separator);
    }
  });

  // utils-misc.ts
  var import_es_array_iterator = __toModule(require_es_array_iterator());
  function _toConsumableArray(arr) {
    return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread();
  }
  function _nonIterableSpread() {
    throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
  }
  function _iterableToArray(iter) {
    if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null)
      return Array.from(iter);
  }
  function _arrayWithoutHoles(arr) {
    if (Array.isArray(arr))
      return _arrayLikeToArray(arr);
  }
  function ownKeys2(object, enumerableOnly) {
    var keys2 = Object.keys(object);
    if (Object.getOwnPropertySymbols) {
      var symbols = Object.getOwnPropertySymbols(object);
      if (enumerableOnly) {
        symbols = symbols.filter(function(sym) {
          return Object.getOwnPropertyDescriptor(object, sym).enumerable;
        });
      }
      keys2.push.apply(keys2, symbols);
    }
    return keys2;
  }
  function _objectSpread(target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i] != null ? arguments[i] : {};
      if (i % 2) {
        ownKeys2(Object(source), true).forEach(function(key) {
          _defineProperty(target, key, source[key]);
        });
      } else if (Object.getOwnPropertyDescriptors) {
        Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
      } else {
        ownKeys2(Object(source)).forEach(function(key) {
          Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
        });
      }
    }
    return target;
  }
  function _defineProperty(obj, key, value) {
    if (key in obj) {
      Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });
    } else {
      obj[key] = value;
    }
    return obj;
  }
  function _slicedToArray(arr, i) {
    return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest();
  }
  function _nonIterableRest() {
    throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
  }
  function _unsupportedIterableToArray(o, minLen) {
    if (!o)
      return;
    if (typeof o === "string")
      return _arrayLikeToArray(o, minLen);
    var n = Object.prototype.toString.call(o).slice(8, -1);
    if (n === "Object" && o.constructor)
      n = o.constructor.name;
    if (n === "Map" || n === "Set")
      return Array.from(o);
    if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))
      return _arrayLikeToArray(o, minLen);
  }
  function _arrayLikeToArray(arr, len) {
    if (len == null || len > arr.length)
      len = arr.length;
    for (var i = 0, arr2 = new Array(len); i < len; i++) {
      arr2[i] = arr[i];
    }
    return arr2;
  }
  function _iterableToArrayLimit(arr, i) {
    var _i = arr && (typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]);
    if (_i == null)
      return;
    var _arr = [];
    var _n = true;
    var _d = false;
    var _s, _e;
    try {
      for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) {
        _arr.push(_s.value);
        if (i && _arr.length === i)
          break;
      }
    } catch (err) {
      _d = true;
      _e = err;
    } finally {
      try {
        if (!_n && _i["return"] != null)
          _i["return"]();
      } finally {
        if (_d)
          throw _e;
      }
    }
    return _arr;
  }
  function _arrayWithHoles(arr) {
    if (Array.isArray(arr))
      return arr;
  }
  function concat_nl() {
    for (var _len = arguments.length, component_strings = new Array(_len), _key = 0; _key < _len; _key++) {
      component_strings[_key] = arguments[_key];
    }
    return component_strings.join("\n");
  }
  function as_array(content) {
    if (content instanceof Array) {
      return content;
    } else {
      return [content];
    }
  }
  function compare_w_missing(compare_fn, maybe_a, b) {
    return maybe_a ? compare_fn(maybe_a, b) : b;
  }
  function min_w_missing(maybe_a, b) {
    return compare_w_missing(Math.min, maybe_a, b);
  }
  function max_w_missing(maybe_a, b) {
    return compare_w_missing(Math.max, maybe_a, b);
  }
  function get_bounding_rect(el) {
    if (el.offsetParent === null) {
      return null;
    }
    var top = el.offsetTop;
    var left = el.offsetLeft;
    var height = el.offsetHeight;
    var width = el.offsetWidth;
    return {
      left: left,
      right: left + width,
      top: top,
      bottom: top + height
    };
  }
  function boxes_overlap(box_a, box_b) {
    var horizontal_overlap = intervals_overlap([box_a.left, box_a.right], [box_b.left, box_b.right]);
    var vertical_overlap = intervals_overlap([box_a.top, box_a.bottom], [box_b.top, box_b.bottom]);
    return horizontal_overlap && vertical_overlap;
    function intervals_overlap(_ref, _ref2) {
      var _ref3 = _slicedToArray(_ref, 2), a_start = _ref3[0], a_end = _ref3[1];
      var _ref4 = _slicedToArray(_ref2, 2), b_start = _ref4[0], b_end = _ref4[1];
      var a_contains_b_endpoint = a_start >= b_start && a_start <= b_end || a_end >= b_start && a_end <= b_end;
      var b_covers_a = a_start <= b_start && a_end >= b_end;
      return a_contains_b_endpoint || b_covers_a;
    }
  }
  function update_rect_with_delta(rect, delta, dir) {
    var new_rect = _objectSpread({}, rect);
    if (dir === "top-left") {
      new_rect.left = new_rect.left + delta.x;
      new_rect.top = new_rect.top + delta.y;
    } else if (dir === "bottom-right") {
      new_rect.right = new_rect.right + delta.x, new_rect.left;
      new_rect.bottom = new_rect.bottom + delta.y, new_rect.top;
    } else {
      new_rect.left += delta.x;
      new_rect.top += delta.y;
      new_rect.right += delta.x;
      new_rect.bottom += delta.y;
    }
    if (new_rect.left > new_rect.right) {
      var left = new_rect.left, right = new_rect.right;
      new_rect.right = left;
      new_rect.left = right;
    }
    if (new_rect.top > new_rect.bottom) {
      var top = new_rect.top, bottom = new_rect.bottom;
      new_rect.bottom = top;
      new_rect.top = bottom;
    }
    return new_rect;
  }
  function flatten(arr) {
    var _ref5;
    return (_ref5 = []).concat.apply(_ref5, _toConsumableArray(arr));
  }
  function set_class(elements, class_name) {
    elements.forEach(function(el) {
      el.classList.add(class_name);
    });
  }
  var filler_text = '\n<div class = "filler_text">\n  This filler text demonstrates how the height of an element spanning an "auto"\n  row is influenced by its content. While you\'re here...\n  Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, \n  when an unknown printer took a galley of type and scrambled it to make a type \n  specimen book.\n</div>';

  // utils-grid.ts
  function make_template_start_end(start, end) {
    var negative_index = start < 0;
    end = end ? end + 1 : start + (negative_index ? -1 : 1);
    return "".concat(start, " / ").concat(end);
  }
  function set_element_in_grid(el, grid_bounds) {
    if (grid_bounds.start_row) {
      el.style.gridRowStart = grid_bounds.start_row.toString();
    }
    if (grid_bounds.end_row) {
      el.style.gridRowEnd = (grid_bounds.end_row + 1).toString();
    }
    if (grid_bounds.start_col) {
      el.style.gridColumnStart = grid_bounds.start_col.toString();
    }
    if (grid_bounds.end_col) {
      el.style.gridColumnEnd = (grid_bounds.end_col + 1).toString();
    }
    el.style.display = "block";
  }
  function get_pos_on_grid(grid_el) {
    var el_styles = getComputedStyle(grid_el);
    return {
      start_row: +el_styles.gridRowStart,
      start_col: +el_styles.gridColumnStart,
      end_row: +el_styles.gridRowEnd - 1,
      end_col: +el_styles.gridColumnEnd - 1
    };
  }
  function get_drag_extent_on_grid(app_state, selection_rect) {
    var sel_bounds = {
      start_col: null,
      end_col: null,
      start_row: null,
      end_row: null
    };
    app_state.current_cells.forEach(function(el) {
      if (boxes_overlap(get_bounding_rect(el), selection_rect)) {
        var el_row = +el.dataset.row;
        var el_col = +el.dataset.col;
        sel_bounds.start_row = min_w_missing(sel_bounds.start_row, el_row);
        sel_bounds.end_row = max_w_missing(sel_bounds.end_row, el_row);
        sel_bounds.start_col = min_w_missing(sel_bounds.start_col, el_col);
        sel_bounds.end_col = max_w_missing(sel_bounds.end_col, el_col);
      }
    });
    return sel_bounds;
  }
  function bounding_rect_to_css_pos(rect) {
    return {
      left: "".concat(rect.left, "px"),
      top: "".concat(rect.top, "px"),
      width: "".concat(rect.right - rect.left, "px"),
      height: "".concat(rect.bottom - rect.top, "px")
    };
  }
  function get_gap_size(style) {
    var gap_size_vec = (typeof style === "string" ? style : style.gap).split(" ");
    return gap_size_vec[0];
  }
  function grid_position_of_el(el) {
    var grid_area = el.style.gridArea.split(" / ");
    return {
      start_row: +grid_area[0],
      start_col: +grid_area[1],
      end_row: +grid_area[2] - 1,
      end_col: +grid_area[3] - 1
    };
  }
  function make_start_end_for_dir(dir) {
    if (dir === "cols") {
      return {
        start_id: "start_col",
        end_id: "end_col"
      };
    } else {
      return {
        start_id: "start_row",
        end_id: "end_row"
      };
    }
  }

  // Grid_Item.ts
  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }
  function _defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor)
        descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }
  function _createClass(Constructor, protoProps, staticProps) {
    if (protoProps)
      _defineProperties(Constructor.prototype, protoProps);
    if (staticProps)
      _defineProperties(Constructor, staticProps);
    return Constructor;
  }
  function _defineProperty2(obj, key, value) {
    if (key in obj) {
      Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });
    } else {
      obj[key] = value;
    }
    return obj;
  }
  var Grid_Item = /* @__PURE__ */ function() {
    function Grid_Item2(opts) {
      _classCallCheck(this, Grid_Item2);
      _defineProperty2(this, "el", void 0);
      _defineProperty2(this, "mirrored_el", void 0);
      _defineProperty2(this, "sibling_el", void 0);
      _defineProperty2(this, "parent_layout", void 0);
      Object.assign(this, opts);
    }
    _createClass(Grid_Item2, [{
      key: "position",
      get: function get() {
        return get_pos_on_grid(this.el);
      },
      set: function set(pos) {
        set_element_in_grid(this.el, pos);
        if (this.has_mirrored) {
          set_element_in_grid(this.mirrored_el, pos);
        }
        this.fill_if_in_auto_row();
      }
    }, {
      key: "bounding_rect",
      get: function get() {
        return get_bounding_rect(this.el);
      }
    }, {
      key: "has_mirrored",
      get: function get() {
        return typeof this.mirrored_el !== "undefined";
      }
    }, {
      key: "style",
      get: function get() {
        return this.el.style;
      }
    }, {
      key: "fill_if_in_auto_row",
      value: function fill_if_in_auto_row() {
        var in_auto_row = this.parent_layout.item_row_sizes(this.position).includes("auto");
        if (in_auto_row) {
          this.el.classList.add("in-auto-row");
        } else {
          this.el.classList.remove("in-auto-row");
        }
      }
    }, {
      key: "remove",
      value: function remove() {
        this.el.remove();
        if (this.has_mirrored) {
          this.mirrored_el.remove();
        }
        if (this.sibling_el) {
          this.sibling_el.remove();
        }
      }
    }]);
    return Grid_Item2;
  }();

  // Grid_Layout.ts
  var import_es_regexp_exec2 = __toModule(require_es_regexp_exec());
  var import_es_array_iterator3 = __toModule(require_es_array_iterator());
  function _typeof(obj) {
    "@babel/helpers - typeof";
    if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
      _typeof = function _typeof2(obj2) {
        return typeof obj2;
      };
    } else {
      _typeof = function _typeof2(obj2) {
        return obj2 && typeof Symbol === "function" && obj2.constructor === Symbol && obj2 !== Symbol.prototype ? "symbol" : typeof obj2;
      };
    }
    return _typeof(obj);
  }
  function _classCallCheck2(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }
  function _defineProperties2(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor)
        descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }
  function _createClass2(Constructor, protoProps, staticProps) {
    if (protoProps)
      _defineProperties2(Constructor.prototype, protoProps);
    if (staticProps)
      _defineProperties2(Constructor, staticProps);
    return Constructor;
  }
  function _defineProperty3(obj, key, value) {
    if (key in obj) {
      Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });
    } else {
      obj[key] = value;
    }
    return obj;
  }
  var Grid_Layout = /* @__PURE__ */ function() {
    function Grid_Layout2(container) {
      _classCallCheck2(this, Grid_Layout2);
      _defineProperty3(this, "styles", void 0);
      _defineProperty3(this, "container", void 0);
      this.container = container;
      this.styles = container.style;
      console.log("Initialized Grid_Layout with parcel 2");
    }
    _createClass2(Grid_Layout2, [{
      key: "rows",
      get: function get() {
        return this.styles.gridTemplateRows.split(" ");
      },
      set: function set(new_rows) {
        if (typeof new_rows === "undefined")
          return;
        this.styles.gridTemplateRows = new_rows.join(" ");
      }
    }, {
      key: "num_rows",
      get: function get() {
        return this.rows.length;
      }
    }, {
      key: "cols",
      get: function get() {
        return this.styles.gridTemplateColumns.split(" ");
      },
      set: function set(new_cols) {
        if (typeof new_cols === "undefined")
          return;
        this.styles.gridTemplateColumns = new_cols.join(" ");
      }
    }, {
      key: "num_cols",
      get: function get() {
        return this.cols.length;
      }
    }, {
      key: "gap",
      get: function get() {
        return get_gap_size(this.styles.gap);
      },
      set: function set(new_gap) {
        if (typeof new_gap === "undefined")
          return;
        this.container.parentElement.style.setProperty("--grid-gap", new_gap);
        this.styles.gap = new_gap;
        this.styles.padding = new_gap;
      }
    }, {
      key: "attrs",
      get: function get() {
        return {
          rows: this.rows,
          cols: this.cols,
          gap: this.gap
        };
      }
    }, {
      key: "is_updated_val",
      value: function is_updated_val(attr, values) {
        if (typeof values === "undefined")
          return false;
        if (attr === "gap") {
          return values !== this.gap;
        } else if (_typeof(values) === "object") {
          return !equal_arrays(this[attr], values);
        }
      }
    }, {
      key: "sizes_for_tract",
      value: function sizes_for_tract(item_pos, dir) {
        var _item_pos$, _item_pos$2;
        var start_index = (_item_pos$ = item_pos["start_".concat(dir)]) !== null && _item_pos$ !== void 0 ? _item_pos$ : item_pos["end_".concat(dir)];
        var end_index = (_item_pos$2 = item_pos["end_".concat(dir)]) !== null && _item_pos$2 !== void 0 ? _item_pos$2 : item_pos["start_".concat(dir)];
        var tract_sizes = dir === "row" ? this.rows : this.cols;
        return tract_sizes.filter(function(val, i) {
          return i + 1 >= start_index && i + 1 <= end_index;
        });
      }
    }, {
      key: "item_row_sizes",
      value: function item_row_sizes(item_pos) {
        return this.sizes_for_tract(item_pos, "row");
      }
    }]);
    return Grid_Layout2;
  }();
  function equal_arrays(a, b) {
    if (a.length !== b.length)
      return false;
    for (var i = 0; i < a.length; ++i) {
      if (a[i] !== b[i])
        return false;
    }
    return true;
  }

  // make-css_unit_input.ts
  var import_es_regexp_exec4 = __toModule(require_es_regexp_exec());

  // node_modules/core-js/modules/es.number.constructor.js
  "use strict";
  var DESCRIPTORS8 = require_descriptors();
  var global6 = require_global();
  var isForced = require_is_forced();
  var redefine5 = require_redefine();
  var has3 = require_has();
  var classof = require_classof_raw();
  var inheritIfRequired = require_inherit_if_required();
  var toPrimitive2 = require_to_primitive();
  var fails6 = require_fails();
  var create2 = require_object_create();
  var getOwnPropertyNames2 = require_object_get_own_property_names().f;
  var getOwnPropertyDescriptor3 = require_object_get_own_property_descriptor().f;
  var defineProperty4 = require_object_define_property().f;
  var trim = require_string_trim().trim;
  var NUMBER = "Number";
  var NativeNumber = global6[NUMBER];
  var NumberPrototype = NativeNumber.prototype;
  var BROKEN_CLASSOF = classof(create2(NumberPrototype)) == NUMBER;
  var toNumber = function(argument) {
    var it = toPrimitive2(argument, false);
    var first, third, radix, maxCode, digits, length, index, code;
    if (typeof it == "string" && it.length > 2) {
      it = trim(it);
      first = it.charCodeAt(0);
      if (first === 43 || first === 45) {
        third = it.charCodeAt(2);
        if (third === 88 || third === 120)
          return NaN;
      } else if (first === 48) {
        switch (it.charCodeAt(1)) {
          case 66:
          case 98:
            radix = 2;
            maxCode = 49;
            break;
          case 79:
          case 111:
            radix = 8;
            maxCode = 55;
            break;
          default:
            return +it;
        }
        digits = it.slice(2);
        length = digits.length;
        for (index = 0; index < length; index++) {
          code = digits.charCodeAt(index);
          if (code < 48 || code > maxCode)
            return NaN;
        }
        return parseInt(digits, radix);
      }
    }
    return +it;
  };
  if (isForced(NUMBER, !NativeNumber(" 0o1") || !NativeNumber("0b1") || NativeNumber("+0x1"))) {
    NumberWrapper = function Number2(value) {
      var it = arguments.length < 1 ? 0 : value;
      var dummy = this;
      return dummy instanceof NumberWrapper && (BROKEN_CLASSOF ? fails6(function() {
        NumberPrototype.valueOf.call(dummy);
      }) : classof(dummy) != NUMBER) ? inheritIfRequired(new NativeNumber(toNumber(it)), dummy, NumberWrapper) : toNumber(it);
    };
    for (keys2 = DESCRIPTORS8 ? getOwnPropertyNames2(NativeNumber) : "MAX_VALUE,MIN_VALUE,NaN,NEGATIVE_INFINITY,POSITIVE_INFINITY,EPSILON,isFinite,isInteger,isNaN,isSafeInteger,MAX_SAFE_INTEGER,MIN_SAFE_INTEGER,parseFloat,parseInt,isInteger,fromString,range".split(","), j = 0; keys2.length > j; j++) {
      if (has3(NativeNumber, key = keys2[j]) && !has3(NumberWrapper, key)) {
        defineProperty4(NumberWrapper, key, getOwnPropertyDescriptor3(NativeNumber, key));
      }
    }
    NumberWrapper.prototype = NumberPrototype;
    NumberPrototype.constructor = NumberWrapper;
    redefine5(global6, NUMBER, NumberWrapper);
  }
  var NumberWrapper;
  var keys2;
  var j;
  var key;

  // make-css_unit_input.ts
  var import_es_array_iterator5 = __toModule(require_es_array_iterator());

  // utils-icons.ts
  var vertical_drag_icon = '<svg style="width:24px;height:24px" viewBox="0 0 24 24">\n<path fill="currentColor" d="M21 11H3V9H21V11M21 13H3V15H21V13Z" />\n</svg>';
  var horizontal_drag_icon = '<svg style="width:24px;height:24px;max-height:100%;" viewBox="0 0 24 24">\n<path fill="currentColor" d="M11 21H9V3H11V21M15 3H13V21H15V3Z" />\n</svg>';
  var trashcan_icon = '<svg style="width:24px;height:24px" viewBox="0 0 24 24">\n<path fill="currentColor" d="M19,4H15.5L14.5,3H9.5L8.5,4H5V6H19M6,19A2,2 0 0,0 8,21H16A2,2 0 0,0 18,19V7H6V19Z" />\n</svg>';
  var se_arrow = '<svg style="width:24px;height:24px" viewBox="0 0 24 24">\n<path fill="currentColor" d="M5,6.41L6.41,5L17,15.59V9H19V19H9V17H15.59L5,6.41Z" />\n</svg>';
  var nw_arrow = '<svg style="width:24px;height:24px" viewBox="0 0 24 24">\n<path fill="currentColor" d="M19,17.59L17.59,19L7,8.41V15H5V5H15V7H8.41L19,17.59Z" />\n</svg>';
  var drag_icon = '<svg style="width:24px;height:24px" viewBox="0 0 24 24">\n<path fill="currentColor" d="M22.67,12L18.18,16.5L15.67,14L17.65,12L15.67,10.04L18.18,7.53L22.67,12M12,1.33L16.47,5.82L13.96,8.33L12,6.35L10,8.33L7.5,5.82L12,1.33M12,22.67L7.53,18.18L10.04,15.67L12,17.65L14,15.67L16.5,18.18L12,22.67M1.33,12L5.82,7.5L8.33,10L6.35,12L8.33,13.96L5.82,16.47L1.33,12M12,10A2,2 0 0,1 14,12A2,2 0 0,1 12,14A2,2 0 0,1 10,12A2,2 0 0,1 12,10Z" />\n</svg>';
  var plus_icon = '<svg style="width:24px;height:24px" viewBox="0 0 24 24">\n<path fill="currentColor" d="M19,13H13V19H11V13H5V11H11V5H13V11H19V13Z" />\n</svg>';
  var settings_icon = '<svg style="width:24px;height:24px" viewBox="0 0 24 24">\n<path fill="currentColor" d="M12,15.5A3.5,3.5 0 0,1 8.5,12A3.5,3.5 0 0,1 12,8.5A3.5,3.5 0 0,1 15.5,12A3.5,3.5 0 0,1 12,15.5M19.43,12.97C19.47,12.65 19.5,12.33 19.5,12C19.5,11.67 19.47,11.34 19.43,11L21.54,9.37C21.73,9.22 21.78,8.95 21.66,8.73L19.66,5.27C19.54,5.05 19.27,4.96 19.05,5.05L16.56,6.05C16.04,5.66 15.5,5.32 14.87,5.07L14.5,2.42C14.46,2.18 14.25,2 14,2H10C9.75,2 9.54,2.18 9.5,2.42L9.13,5.07C8.5,5.32 7.96,5.66 7.44,6.05L4.95,5.05C4.73,4.96 4.46,5.05 4.34,5.27L2.34,8.73C2.21,8.95 2.27,9.22 2.46,9.37L4.57,11C4.53,11.34 4.5,11.67 4.5,12C4.5,12.33 4.53,12.65 4.57,12.97L2.46,14.63C2.27,14.78 2.21,15.05 2.34,15.27L4.34,18.73C4.46,18.95 4.73,19.03 4.95,18.95L7.44,17.94C7.96,18.34 8.5,18.68 9.13,18.93L9.5,21.58C9.54,21.82 9.75,22 10,22H14C14.25,22 14.46,21.82 14.5,21.58L14.87,18.93C15.5,18.67 16.04,18.34 16.56,17.94L19.05,18.95C19.27,19.03 19.54,18.95 19.66,18.73L21.66,15.27C21.78,15.05 21.73,14.78 21.54,14.63L19.43,12.97Z" />\n</svg>';
  var instructions_icon = '<svg style="width:24px;height:24px" viewBox="0 0 24 24">\n<path fill="currentColor" d="M10,19H13V22H10V19M12,2C17.35,2.22 19.68,7.62 16.5,11.67C15.67,12.67 14.33,13.33 13.67,14.17C13,15 13,16 13,17H10C10,15.33 10,13.92 10.67,12.92C11.33,11.92 12.67,11.33 13.5,10.67C15.92,8.43 15.32,5.26 12,5A3,3 0 0,0 9,8H6A6,6 0 0,1 12,2Z" />\n</svg>';
  var elements_icon = '<svg style="width:24px;height:24px" viewBox="0 0 24 24">\n<path fill="currentColor" d="M12,18.54L19.37,12.8L21,14.07L12,21.07L3,14.07L4.62,12.81L12,18.54M12,16L3,9L12,2L21,9L12,16M12,4.53L6.26,9L12,13.47L17.74,9L12,4.53Z" />\n</svg>';
  var browser_header_html = '<div id="buttons-container">\n  <div></div>\n  <div></div>\n  <div></div>\n</div>\n<div id="url-box">\n  <span> www.myShinyApp.com </span>\n</div>';

  // make-elements.ts
  var import_es_regexp_exec3 = __toModule(require_es_regexp_exec());
  var import_es_array_iterator4 = __toModule(require_es_array_iterator());
  function _toConsumableArray2(arr) {
    return _arrayWithoutHoles2(arr) || _iterableToArray2(arr) || _unsupportedIterableToArray2(arr) || _nonIterableSpread2();
  }
  function _nonIterableSpread2() {
    throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
  }
  function _unsupportedIterableToArray2(o, minLen) {
    if (!o)
      return;
    if (typeof o === "string")
      return _arrayLikeToArray2(o, minLen);
    var n = Object.prototype.toString.call(o).slice(8, -1);
    if (n === "Object" && o.constructor)
      n = o.constructor.name;
    if (n === "Map" || n === "Set")
      return Array.from(o);
    if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))
      return _arrayLikeToArray2(o, minLen);
  }
  function _iterableToArray2(iter) {
    if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null)
      return Array.from(iter);
  }
  function _arrayWithoutHoles2(arr) {
    if (Array.isArray(arr))
      return _arrayLikeToArray2(arr);
  }
  function _arrayLikeToArray2(arr, len) {
    if (len == null || len > arr.length)
      len = arr.length;
    for (var i = 0, arr2 = new Array(len); i < len; i++) {
      arr2[i] = arr[i];
    }
    return arr2;
  }
  function extract_id(sel_txt) {
    var id_match = sel_txt.match(/#([^\.]+)/g);
    return id_match ? id_match[0].replace("#", "") : null;
  }
  function extract_classes(sel_txt) {
    var class_list = sel_txt.match(/\.([^\.#]+)/g);
    return class_list ? _toConsumableArray2(class_list).map(function(c) {
      return c.replace(".", "");
    }) : null;
  }
  function parse_selector_text(sel_txt) {
    return {
      tag_type: sel_txt.match(/^([^#\.]+)+/g)[0],
      el_id: extract_id(sel_txt),
      class_list: extract_classes(sel_txt)
    };
  }
  function make_el(parent, sel_txt) {
    var opts = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {};
    var el = parent.querySelector(sel_txt);
    if (!el) {
      el = El({
        sel_txt: sel_txt
      });
      if (opts.props) {
        Object.assign(el, opts.props);
      }
      parent.appendChild(el);
    }
    if (opts.event_listener) {
      as_array(opts.event_listener).forEach(function(listener) {
        return el["on" + listener.event] = listener.func;
      });
    }
    if (opts.styles) {
      Object.assign(el.style, opts.styles);
    }
    if (opts.innerHTML) {
      el.innerHTML = opts.innerHTML;
    }
    if (opts.data_props) {
      Object.assign(el.dataset, opts.data_props);
    }
    if (opts.grid_pos) {
      set_element_in_grid(el, opts.grid_pos);
    }
    return el;
  }
  function remove_elements(els_to_remove) {
    els_to_remove.forEach(function(e) {
      return e.remove();
    });
  }
  function Shadow_El(sel_txt) {
    var shadow_holder = Block_El(sel_txt);
    shadow_holder.attachShadow({
      mode: "open"
    });
    var style_sheet = document.createElement("style");
    shadow_holder.shadowRoot.appendChild(style_sheet);
    for (var _len = arguments.length, children = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      children[_key - 1] = arguments[_key];
    }
    children.forEach(function(child_el) {
      return shadow_holder.shadowRoot.appendChild(child_el);
    });
    return {
      el: shadow_holder,
      style_sheet: style_sheet
    };
  }
  function El(opts) {
    var _parse_selector_text = parse_selector_text(opts.sel_txt), tag_type = _parse_selector_text.tag_type, el_id = _parse_selector_text.el_id, class_list = _parse_selector_text.class_list;
    var el = document.createElement(tag_type);
    if (el_id)
      el.id = el_id;
    if (class_list) {
      class_list.forEach(function(x) {
        return el.classList.add(x);
      });
    }
    if (opts.text) {
      el.innerHTML = opts.text;
    }
    if (opts.children) {
      opts.children.forEach(function(child_el) {
        return el.appendChild(child_el);
      });
    }
    return el;
  }
  function Block_El(sel_txt) {
    for (var _len2 = arguments.length, children = new Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
      children[_key2 - 1] = arguments[_key2];
    }
    return El({
      sel_txt: sel_txt,
      children: children
    });
  }
  function Text_El(sel_txt, text) {
    return El({
      sel_txt: sel_txt,
      text: text
    });
  }
  function incrementer_button(opts) {
    var parent_el = opts.parent_el, selector_text = opts.selector_text, up_or_down = opts.up_or_down, on_click = opts.on_click, additional_styles = opts.additional_styles, _opts$label = opts.label, label = _opts$label === void 0 ? up_or_down === "up" ? "Add" : "Remove" : _opts$label;
    var button = make_el(parent_el, "button.incrementer-button".concat(selector_text), {
      innerHTML: up_or_down === "up" ? plus_icon : trashcan_icon,
      styles: additional_styles,
      event_listener: {
        event: "click",
        func: on_click
      },
      props: {
        title: label
      }
    });
    return button;
  }

  // make-css_unit_input.ts
  function _createForOfIteratorHelper(o, allowArrayLike) {
    var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"];
    if (!it) {
      if (Array.isArray(o) || (it = _unsupportedIterableToArray3(o)) || allowArrayLike && o && typeof o.length === "number") {
        if (it)
          o = it;
        var i = 0;
        var F = function F2() {
        };
        return { s: F, n: function n() {
          if (i >= o.length)
            return { done: true };
          return { done: false, value: o[i++] };
        }, e: function e(_e) {
          throw _e;
        }, f: F };
      }
      throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
    }
    var normalCompletion = true, didErr = false, err;
    return { s: function s() {
      it = it.call(o);
    }, n: function n() {
      var step = it.next();
      normalCompletion = step.done;
      return step;
    }, e: function e(_e2) {
      didErr = true;
      err = _e2;
    }, f: function f() {
      try {
        if (!normalCompletion && it["return"] != null)
          it["return"]();
      } finally {
        if (didErr)
          throw err;
      }
    } };
  }
  function _unsupportedIterableToArray3(o, minLen) {
    if (!o)
      return;
    if (typeof o === "string")
      return _arrayLikeToArray3(o, minLen);
    var n = Object.prototype.toString.call(o).slice(8, -1);
    if (n === "Object" && o.constructor)
      n = o.constructor.name;
    if (n === "Map" || n === "Set")
      return Array.from(o);
    if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))
      return _arrayLikeToArray3(o, minLen);
  }
  function _arrayLikeToArray3(arr, len) {
    if (len == null || len > arr.length)
      len = arr.length;
    for (var i = 0, arr2 = new Array(len); i < len; i++) {
      arr2[i] = arr[i];
    }
    return arr2;
  }
  var default_values = {
    fr: "1",
    px: "100",
    rem: "2"
  };
  function get_css_unit(css_size) {
    return css_size.match(/(px|\%|rem|fr|auto)/g)[0] || "px";
  }
  function get_css_value(css_size) {
    var value = css_size.match(/^[\d|\.]*/g)[0];
    return value === "" ? null : Number(value);
  }
  function make_css_unit_input(_ref) {
    var parent_el = _ref.parent_el, _ref$selector = _ref.selector, selector = _ref$selector === void 0 ? "" : _ref$selector, _ref$start_val = _ref.start_val, start_val = _ref$start_val === void 0 ? 1 : _ref$start_val, _ref$start_unit = _ref.start_unit, start_unit = _ref$start_unit === void 0 ? "fr" : _ref$start_unit, _ref$on_change = _ref.on_change, on_change = _ref$on_change === void 0 ? function(x) {
      return console.log("css unit change", x);
    } : _ref$on_change, _ref$allowed_units = _ref.allowed_units, allowed_units = _ref$allowed_units === void 0 ? ["fr", "px", "rem", "auto"] : _ref$allowed_units;
    var current_unit = start_unit;
    var form = make_el(parent_el, "form".concat(selector, ".css-unit-input"), {
      event_listener: [{
        event: "change",
        func: on_update
      }, {
        event: "submit",
        func: function func(e) {
          e.preventDefault();
        }
      }]
    });
    var value_input = make_el(form, "input.css-unit-input-value", {
      props: {
        type: "number",
        min: 0,
        value: start_val,
        step: 1,
        "aria-live": "polite"
      }
    });
    var unit_selector = make_el(form, "select.css-unit-input-select", {
      props: {
        name: "units"
      }
    });
    allowed_units.forEach(function(unit_type2) {
      var unit_option = make_el(unit_selector, "option.".concat(unit_type2), {
        props: {
          value: unit_type2
        },
        innerHTML: unit_type2
      });
      if (unit_type2 === start_unit) {
        unit_option.selected = true;
      }
    });
    function unit_type() {
      return unit_selector.value;
    }
    function num_units() {
      return value_input.value;
    }
    function current_value() {
      if (unit_type() === "auto")
        return "auto";
      return "".concat(num_units()).concat(unit_type());
    }
    function on_update() {
      var val = current_value();
      update_value(val);
      on_change(val);
    }
    function update_value(new_value) {
      var units = get_css_unit(new_value);
      var count = get_css_value(new_value);
      if (count === null && units === "auto") {
        value_input.classList.add("disabled");
        value_input.value = "";
      } else {
        value_input.classList.remove("disabled");
        var using_old_units_default = value_input.value === default_values[current_unit];
        value_input.value = count === null || using_old_units_default ? default_values[units] : count.toString();
      }
      var _iterator = _createForOfIteratorHelper(unit_selector.children), _step;
      try {
        for (_iterator.s(); !(_step = _iterator.n()).done; ) {
          var opt = _step.value;
          opt.selected = opt.value === units;
        }
      } catch (err) {
        _iterator.e(err);
      } finally {
        _iterator.f();
      }
      current_unit = units;
    }
    update_value("".concat(start_val).concat(start_unit));
    return {
      form: form,
      current_value: current_value,
      update_value: update_value
    };
  }
  function make_grid_tract_control(holder, app_state, opts) {
    var size = opts.size, dir = opts.dir, tract_index = opts.tract_index;
    var unit_input = make_css_unit_input({
      parent_el: holder,
      selector: ".unit-input",
      start_val: get_css_value(size),
      start_unit: get_css_unit(size),
      on_change: function on_change(new_val) {
        show_or_hide_dragger(new_val);
        send_update();
      }
    });
    function send_update() {
      var to_shiny = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : true;
      app_state.update_tract({
        tract_index: tract_index,
        dir: dir,
        new_value: unit_input.current_value(),
        dont_send_to_shiny: !to_shiny
      });
    }
    var value_input = unit_input.form.querySelector(".css-unit-input-value");
    var drag_dir = dir === "rows" ? "y" : "x";
    var resizer = make_el(holder, "div.css-unit-input-dragger", {
      innerHTML: dir === "rows" ? vertical_drag_icon : horizontal_drag_icon
    });
    make_el(resizer, "div.css-unit-input-drag-detector", {
      props: {
        draggable: true
      },
      event_listener: [{
        event: "dragstart",
        func: function func(event) {
          this.dataset.baseline = value_input.value;
          this.dataset.start = event[drag_dir];
        }
      }, {
        event: "drag",
        func: function func(event) {
          var drag_pos = event[drag_dir];
          if (drag_pos === 0)
            return;
          var new_value = Math.max(0, +this.dataset.baseline + (event[drag_dir] - this.dataset.start));
          value_input.value = new_value.toString();
          send_update(false);
        }
      }, {
        event: "dragend",
        func: function func(event) {
          send_update();
        }
      }]
    });
    incrementer_button({
      parent_el: holder,
      selector_text: ".removeThis",
      up_or_down: "down",
      label: "Remove ".concat(dir === "rows" ? "row" : "col"),
      on_click: function on_click() {
        return app_state.remove_tract(dir, tract_index);
      }
    });
    function show_or_hide_dragger(curr_val) {
      if (get_css_unit(curr_val) === "px") {
        holder.classList.add("with-drag");
      } else {
        holder.classList.remove("with-drag");
      }
    }
    show_or_hide_dragger(unit_input.current_value());
    return unit_input;
  }

  // make-focused_modal.ts
  var import_es_regexp_exec5 = __toModule(require_es_regexp_exec());
  function focused_modal(opts) {
    var background = make_el(document.querySelector("#grided__holder"), "div.background-blurrer", {
      event_listener: opts.background_callbacks
    });
    var modal = make_el(background, "div.focused_modal", {
      event_listener: opts.modal_callbacks
    });
    if (opts.header_text) {
      make_el(modal, "div.focused_modal_header", {
        innerHTML: opts.header_text,
        styles: {
          paddingBottom: "1rem"
        }
      });
    }
    return {
      background: background,
      modal: modal,
      remove: function remove() {
        return background.remove();
      }
    };
  }
  function show_code(message, code_blocks) {
    var code_modal = focused_modal({
      header_text: "".concat(message),
      modal_callbacks: {
        event: "click",
        func: function func(event) {
          event.stopPropagation();
        }
      },
      background_callbacks: {
        event: "click",
        func: close_modal
      }
    });
    as_array(code_blocks).forEach(function(code_to_show) {
      var num_of_lines = code_to_show.code.match(/\n/g).length;
      var code_section = make_el(code_modal.modal, "div#".concat(code_to_show.type, ".code_chunk"), {
        styles: {
          display: "grid",
          gridTemplateColumns: "repeat(2, 1fr)",
          gridTemplateRows: "1fr, auto",
          gap: "4px",
          gridTemplateAreas: concat_nl('"code_type copy_btn"', '"code_text code_text"')
        }
      });
      var code_text;
      make_el(code_section, "strong", {
        innerHTML: code_to_show.type,
        styles: {
          gridArea: "code_type"
        }
      });
      make_el(code_section, "button#copy_code", {
        innerHTML: "Copy to clipboard",
        styles: {
          gridArea: "copy_btn"
        },
        event_listener: {
          event: "click",
          func: function func() {
            code_text.select();
            document.execCommand("copy");
          }
        }
      });
      code_text = make_el(code_section, "textarea#code_for_layout", {
        innerHTML: code_to_show.code,
        props: {
          rows: num_of_lines + 3
        },
        styles: {
          width: "100%",
          background: "#f3f2f2",
          fontFamily: "monospace",
          display: "block",
          padding: "0.75rem",
          marginBottom: "10px",
          borderRadius: "5px",
          gridArea: "code_text"
        }
      });
    });
    var action_buttons = make_el(code_modal.modal, "div#action_buttons", {
      styles: {
        display: "flex",
        justifyContent: "space-around"
      }
    });
    make_el(action_buttons, "button#close_code_model", {
      innerHTML: "Close",
      event_listener: {
        event: "click",
        func: close_modal
      }
    });
    function close_modal() {
      code_modal.remove();
    }
  }

  // utils-cssom.ts
  var import_es_array_iterator6 = __toModule(require_es_array_iterator());
  function _toConsumableArray3(arr) {
    return _arrayWithoutHoles3(arr) || _iterableToArray3(arr) || _unsupportedIterableToArray4(arr) || _nonIterableSpread3();
  }
  function _nonIterableSpread3() {
    throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
  }
  function _unsupportedIterableToArray4(o, minLen) {
    if (!o)
      return;
    if (typeof o === "string")
      return _arrayLikeToArray4(o, minLen);
    var n = Object.prototype.toString.call(o).slice(8, -1);
    if (n === "Object" && o.constructor)
      n = o.constructor.name;
    if (n === "Map" || n === "Set")
      return Array.from(o);
    if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))
      return _arrayLikeToArray4(o, minLen);
  }
  function _iterableToArray3(iter) {
    if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null)
      return Array.from(iter);
  }
  function _arrayWithoutHoles3(arr) {
    if (Array.isArray(arr))
      return _arrayLikeToArray4(arr);
  }
  function _arrayLikeToArray4(arr, len) {
    if (len == null || len > arr.length)
      len = arr.length;
    for (var i = 0, arr2 = new Array(len); i < len; i++) {
      arr2[i] = arr[i];
    }
    return arr2;
  }
  function get_all_style_rules() {
    return flatten(_toConsumableArray3(document.styleSheets).map(function(x) {
      return _toConsumableArray3(x.cssRules);
    }));
  }
  function find_selector_by_property(property_id, property_value) {
    var all_styles = get_all_style_rules();
    var first_rule_w_prop = all_styles.filter(function(rule) {
      return rule.style && rule.style[property_id] == property_value;
    }).find(function(rule) {
      return document.querySelector(rule.selectorText);
    });
    var rule_exists = Boolean(first_rule_w_prop);
    return {
      rule_exists: rule_exists,
      first_rule_w_prop: first_rule_w_prop,
      selector: rule_exists ? first_rule_w_prop.selectorText : ""
    };
  }

  // utils-shiny.ts
  function ownKeys3(object, enumerableOnly) {
    var keys2 = Object.keys(object);
    if (Object.getOwnPropertySymbols) {
      var symbols = Object.getOwnPropertySymbols(object);
      if (enumerableOnly) {
        symbols = symbols.filter(function(sym) {
          return Object.getOwnPropertyDescriptor(object, sym).enumerable;
        });
      }
      keys2.push.apply(keys2, symbols);
    }
    return keys2;
  }
  function _objectSpread2(target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i] != null ? arguments[i] : {};
      if (i % 2) {
        ownKeys3(Object(source), true).forEach(function(key) {
          _defineProperty4(target, key, source[key]);
        });
      } else if (Object.getOwnPropertyDescriptors) {
        Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
      } else {
        ownKeys3(Object(source)).forEach(function(key) {
          Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
        });
      }
    }
    return target;
  }
  function _defineProperty4(obj, key, value) {
    if (key in obj) {
      Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });
    } else {
      obj[key] = value;
    }
    return obj;
  }
  function setShinyInput(input_id, input_value) {
    var _Shiny$setInputValue;
    var is_event = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : false;
    Shiny === null || Shiny === void 0 ? void 0 : (_Shiny$setInputValue = Shiny.setInputValue) === null || _Shiny$setInputValue === void 0 ? void 0 : _Shiny$setInputValue.call(Shiny, input_id, input_value, is_event ? {
      priority: "event"
    } : {});
  }
  function add_shiny_listener(event_id, callback_func) {
    Shiny === null || Shiny === void 0 ? void 0 : Shiny.addCustomMessageHandler(event_id, callback_func);
  }
  function send_grid_sizing_to_shiny(grid_attrs) {
    setShinyInput("grid_sizing", grid_attrs);
  }
  function send_elements_to_shiny(elements) {
    var elements_by_id = {};
    elements.forEach(function(el) {
      elements_by_id[el.id] = _objectSpread2({
        id: el.id
      }, el.grid_pos);
    });
    setShinyInput("elements", elements_by_id);
  }

  // wrap_in_grided.ts
  var import_es_array_iterator7 = __toModule(require_es_array_iterator());

  // make-toggle_switch.ts
  function make_toggle_switch(off_text, on_text, on_change) {
    var container = Block_El("div.toggle-switch");
    make_el(container, "span.off-text", {
      innerHTML: off_text
    });
    var label = make_el(container, "label.switch");
    make_el(container, "span.on-text", {
      innerHTML: on_text
    });
    make_el(label, "input", {
      props: {
        type: "checkbox"
      },
      event_listener: {
        event: "change",
        func: function func(event) {
          on_change(event.target.checked);
        }
      }
    });
    make_el(label, "span.slider");
    var _Shadow_El = Shadow_El("div.toggle-switch", container), el = _Shadow_El.el, style_sheet = _Shadow_El.style_sheet;
    style_sheet.innerHTML = toggle_styles;
    return el;
  }
  var toggle_styles = '\ndiv.toggle-switch {\n  display: inline-grid;\n  grid-template-columns: 1fr auto 1fr;\n  grid-gap: 3px;\n  width: 180px;\n  align-items: center;\n  justify-items: center;\n  padding-left: 4px;\n  padding-right: 4px;\n}\n\n.toggle-switch > span {\n  font-size: 1rem;\n}\n\n.toggle-switch > .off-text {\n  text-align: end;\n}\n\n.switch {\n  position: relative;\n  display: inline-block;\n  width: 60px;\n  height: 34px;\n}\n\n.switch input {\n  opacity: 0;\n  width: 0;\n  height: 0;\n}\n\n.slider {\n  position: absolute;\n  cursor: pointer;\n  top: 0;\n  left: 0;\n  right: 0;\n  bottom: 0;\n  border-radius: 34px;\n  background-color: #ccc;\n  -webkit-transition: .4s;\n  transition: .4s;\n}\n\n.slider:before {\n  position: absolute;\n  content: "";\n  height: 26px;\n  width: 26px;\n  left: 4px;\n  bottom: 4px;\n  border-radius: 50%;\n  background-color: white;\n  -webkit-transition: .4s;\n  transition: .4s;\n}\n\ninput:checked + .slider {\n  background-color: #2196F3;\n}\n\ninput:focus + .slider {\n  box-shadow: 0 0 1px #2196F3;\n}\n\ninput:checked + .slider:before {\n  -webkit-transform: translateX(26px);\n  -ms-transform: translateX(26px);\n  transform: translateX(26px);\n}\n';

  // wrap_in_grided.ts
  function _toConsumableArray4(arr) {
    return _arrayWithoutHoles4(arr) || _iterableToArray4(arr) || _unsupportedIterableToArray5(arr) || _nonIterableSpread4();
  }
  function _nonIterableSpread4() {
    throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
  }
  function _unsupportedIterableToArray5(o, minLen) {
    if (!o)
      return;
    if (typeof o === "string")
      return _arrayLikeToArray5(o, minLen);
    var n = Object.prototype.toString.call(o).slice(8, -1);
    if (n === "Object" && o.constructor)
      n = o.constructor.name;
    if (n === "Map" || n === "Set")
      return Array.from(o);
    if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))
      return _arrayLikeToArray5(o, minLen);
  }
  function _iterableToArray4(iter) {
    if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null)
      return Array.from(iter);
  }
  function _arrayWithoutHoles4(arr) {
    if (Array.isArray(arr))
      return _arrayLikeToArray5(arr);
  }
  function _arrayLikeToArray5(arr, len) {
    if (len == null || len > arr.length)
      len = arr.length;
    for (var i = 0, arr2 = new Array(len); i < len; i++) {
      arr2[i] = arr[i];
    }
    return arr2;
  }
  function wrap_in_grided(app_state) {
    var grid_is_filled = app_state.container.hasChildNodes();
    var buttons = [action_button("get_code", "Get layout code"), action_button("update_code", "Update app")];
    if (grid_is_filled) {
      buttons.push(make_toggle_switch("Edit layout", "Interact mode", toggle_interaction_mode));
    }
    var settings_panel_el = Block_El("div.panel-body");
    var gap_size_setting = make_css_unit_input({
      parent_el: make_el(settings_panel_el, "div#gap_size_chooser.plus_minus_input.settings-grid", {
        innerHTML: '<span class = "input-label">Panel gap size</span>'
      }),
      selector: "#gap_size_chooser",
      on_change: function on_change(x) {
        return app_state.update_grid({
          gap: x
        });
      },
      allowed_units: ["px", "rem"]
    });
    var grided_ui = Block_El("div#grided__holder", Block_El("div#grided__header", Text_El("h2", "GridEd<sub>(itor)</sub>: Build a grid layout for your Shiny app"), Block_El.apply(void 0, ["div.code_btns"].concat(buttons))), Block_El("div#grided__settings", Text_El("h3", "".concat(settings_icon, " Settings")), settings_panel_el), Block_El("div#grided__instructions", Text_El("h3", "".concat(instructions_icon, " Instructions")), Text_El("div.panel-body", '\n      <strong>Add an element:</strong>\n      <ul>\n        <li>Click and drag over the grid to define a region</li>\n        <li>Enter id of element in popup</li>\n      </ul>\n      <strong>Edit an element:</strong>\n      <ul>\n        <li>Drag the upper left, middle, or bottom right corners of the element to reposition</li>\n      </ul>\n      <strong>Remove an element:</strong>\n      <ul>\n        <li>Find element entry in "Added elements" panel and click the '.concat(trashcan_icon, " icon</li>\n      </ul>"))), Block_El("div#grided__elements", Text_El("h3", "".concat(elements_icon, " Added elements")), Block_El("div.panel-body", Block_El("div#added_elements"))), Block_El("div#grided__editor", Block_El("div#editor-wrapper", Text_El("div#editor-browser-header", browser_header_html), Block_El("div#editor-app-window", app_state.container))));
    document.querySelector("body").appendChild(grided_ui);
    app_state.grid_styles.height = "100%";
    app_state.grid_styles.width = "100%";
    app_state.grid_styles.display = "grid";
    app_state.grid_styles.maxWidth = "100%";
    if (grid_is_filled) {
      app_state.grid_styles.gap = "1rem";
      app_state.grid_styles.padding = "1rem";
    }
    function toggle_interaction_mode(interact_is_on) {
      [].concat(_toConsumableArray4(app_state.container.querySelectorAll(".added-element")), _toConsumableArray4(app_state.container.querySelectorAll(".grid-cell")), [grided_ui.querySelector("#added_elements"), grided_ui.querySelector("#drag_canvas")]).forEach(function(el) {
        if (interact_is_on) {
          el.classList.add("disabled");
        } else {
          el.classList.remove("disabled");
        }
      });
    }
    function action_button(id, label) {
      var button_el = Text_El("button#".concat(id), label);
      button_el.addEventListener("click", function(event) {
        setShinyInput(id, 1, true);
      });
      return button_el;
    }
    _toConsumableArray4(app_state.container.children).forEach(function(el) {
      var bbox = el.getBoundingClientRect();
      if (bbox.width === 0 && bbox.height === 0)
        return;
      app_state.add_element({
        id: el.id,
        grid_pos: get_pos_on_grid(el),
        mirrored_element: el
      });
    });
    return {
      gap_size_setting: gap_size_setting,
      grid_is_filled: grid_is_filled
    };
  }

  // App_State.ts
  function _createForOfIteratorHelper2(o, allowArrayLike) {
    var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"];
    if (!it) {
      if (Array.isArray(o) || (it = _unsupportedIterableToArray6(o)) || allowArrayLike && o && typeof o.length === "number") {
        if (it)
          o = it;
        var i = 0;
        var F = function F2() {
        };
        return { s: F, n: function n() {
          if (i >= o.length)
            return { done: true };
          return { done: false, value: o[i++] };
        }, e: function e(_e) {
          throw _e;
        }, f: F };
      }
      throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
    }
    var normalCompletion = true, didErr = false, err;
    return { s: function s() {
      it = it.call(o);
    }, n: function n() {
      var step = it.next();
      normalCompletion = step.done;
      return step;
    }, e: function e(_e2) {
      didErr = true;
      err = _e2;
    }, f: function f() {
      try {
        if (!normalCompletion && it["return"] != null)
          it["return"]();
      } finally {
        if (didErr)
          throw err;
      }
    } };
  }
  function _toConsumableArray5(arr) {
    return _arrayWithoutHoles5(arr) || _iterableToArray5(arr) || _unsupportedIterableToArray6(arr) || _nonIterableSpread5();
  }
  function _nonIterableSpread5() {
    throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
  }
  function _unsupportedIterableToArray6(o, minLen) {
    if (!o)
      return;
    if (typeof o === "string")
      return _arrayLikeToArray6(o, minLen);
    var n = Object.prototype.toString.call(o).slice(8, -1);
    if (n === "Object" && o.constructor)
      n = o.constructor.name;
    if (n === "Map" || n === "Set")
      return Array.from(o);
    if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))
      return _arrayLikeToArray6(o, minLen);
  }
  function _iterableToArray5(iter) {
    if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null)
      return Array.from(iter);
  }
  function _arrayWithoutHoles5(arr) {
    if (Array.isArray(arr))
      return _arrayLikeToArray6(arr);
  }
  function _arrayLikeToArray6(arr, len) {
    if (len == null || len > arr.length)
      len = arr.length;
    for (var i = 0, arr2 = new Array(len); i < len; i++) {
      arr2[i] = arr[i];
    }
    return arr2;
  }
  function ownKeys4(object, enumerableOnly) {
    var keys2 = Object.keys(object);
    if (Object.getOwnPropertySymbols) {
      var symbols = Object.getOwnPropertySymbols(object);
      if (enumerableOnly) {
        symbols = symbols.filter(function(sym) {
          return Object.getOwnPropertyDescriptor(object, sym).enumerable;
        });
      }
      keys2.push.apply(keys2, symbols);
    }
    return keys2;
  }
  function _objectSpread3(target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i] != null ? arguments[i] : {};
      if (i % 2) {
        ownKeys4(Object(source), true).forEach(function(key) {
          _defineProperty5(target, key, source[key]);
        });
      } else if (Object.getOwnPropertyDescriptors) {
        Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
      } else {
        ownKeys4(Object(source)).forEach(function(key) {
          Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
        });
      }
    }
    return target;
  }
  function _classCallCheck3(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }
  function _defineProperties3(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor)
        descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }
  function _createClass3(Constructor, protoProps, staticProps) {
    if (protoProps)
      _defineProperties3(Constructor.prototype, protoProps);
    if (staticProps)
      _defineProperties3(Constructor, staticProps);
    return Constructor;
  }
  function _defineProperty5(obj, key, value) {
    if (key in obj) {
      Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });
    } else {
      obj[key] = value;
    }
    return obj;
  }
  var tract_dirs = ["rows", "cols"];
  var App_State = /* @__PURE__ */ function() {
    function App_State2() {
      _classCallCheck3(this, App_State2);
      _defineProperty5(this, "gap_size_setting", void 0);
      _defineProperty5(this, "current_cells", []);
      _defineProperty5(this, "elements", []);
      _defineProperty5(this, "container_selector", void 0);
      _defineProperty5(this, "container", void 0);
      _defineProperty5(this, "grid_styles", void 0);
      _defineProperty5(this, "mode", void 0);
      _defineProperty5(this, "grid_layout", void 0);
      _defineProperty5(this, "tract_controls", void 0);
      var grid_layout_rule = find_selector_by_property("display", "grid");
      this.container_selector = grid_layout_rule.rule_exists ? grid_layout_rule.selector : "#grid_page";
      this.container = grid_layout_rule.rule_exists ? document.querySelector(this.container_selector) : Block_El("div#grid_page");
      this.grid_styles = this.container.style;
      this.grid_layout = new Grid_Layout(this.container);
      var _wrap_in_grided = wrap_in_grided(this), grid_is_filled = _wrap_in_grided.grid_is_filled, gap_size_setting = _wrap_in_grided.gap_size_setting;
      this.gap_size_setting = gap_size_setting;
      this.mode = grid_is_filled ? "Existing" : "New";
      if (grid_is_filled) {
        var current_grid_props = grid_layout_rule.first_rule_w_prop.style;
        this.update_grid({
          rows: current_grid_props.gridTemplateRows.split(" "),
          cols: current_grid_props.gridTemplateColumns.split(" "),
          gap: get_gap_size(current_grid_props.gap),
          force: true
        });
      }
    }
    _createClass3(App_State2, [{
      key: "next_color",
      get: function get() {
        var colors = ["#e41a1c", "#377eb8", "#4daf4a", "#984ea3", "#ff7f00", "#a65628", "#f781bf"];
        return colors[this.elements.length % colors.length];
      }
    }, {
      key: "current_elements",
      get: function get() {
        this.elements.forEach(function(el) {
          el.grid_pos = grid_position_of_el(el.grid_el);
        });
        return this.elements;
      }
    }, {
      key: "add_element",
      value: function add_element(el_props) {
        if (el_props.mirrored_element) {
          el_props.id = el_props.id.replace(/^.+?__/g, "");
        }
        var grid_item = draw_elements(this, {
          id: el_props.id,
          mirrored_el: el_props.mirrored_element
        });
        grid_item.position = el_props.grid_pos;
        var new_element_entry = _objectSpread3(_objectSpread3({}, el_props), {}, {
          grid_el: grid_item.el,
          list_el: grid_item.sibling_el,
          grid_item: grid_item
        });
        this.elements.push(new_element_entry);
        send_elements_to_shiny(this.current_elements);
      }
    }, {
      key: "remove_elements",
      value: function remove_elements2(ids) {
        var _this = this;
        as_array(ids).forEach(function(el_id) {
          var entry_index = _this.elements.findIndex(function(el) {
            return el.id === el_id;
          });
          _this.elements[entry_index].grid_item.remove();
          _this.elements.splice(entry_index, 1);
        });
        send_elements_to_shiny(this.current_elements);
      }
    }, {
      key: "add_tract",
      value: function add_tract(dir, new_index) {
        this.elements.forEach(function(el) {
          var start_id = dir === "rows" ? "start_row" : "start_col";
          var end_id = dir === "rows" ? "end_row" : "end_col";
          var el_position = el.grid_item.position;
          if (new_index >= el_position[end_id]) {
          } else if (new_index < el_position[start_id]) {
            el_position[start_id]++;
            el_position[end_id]++;
          } else {
            el.grid_item[end_id] = el_position[end_id]++;
          }
          el.grid_item.position = el_position;
        });
        var tract_sizes = this.grid_layout[dir];
        tract_sizes.splice(new_index, 0, "1fr");
        this.update_grid(_defineProperty5({}, dir, tract_sizes));
      }
    }, {
      key: "remove_tract",
      value: function remove_tract(dir, index) {
        var trouble_elements = this.elements.filter(function(el) {
          var _make_start_end_for_d = make_start_end_for_dir(dir), start_id = _make_start_end_for_d.start_id, end_id = _make_start_end_for_d.end_id;
          var el_position = el.grid_item.position;
          return el_position[start_id] === el_position[end_id] && el_position[start_id] === index;
        });
        if (trouble_elements.length > 0) {
          show_conflict_popup(trouble_elements);
          return;
        }
        this.elements.forEach(function(el) {
          var _make_start_end_for_d2 = make_start_end_for_dir(dir), start_id = _make_start_end_for_d2.start_id, end_id = _make_start_end_for_d2.end_id;
          var el_position = el.grid_item.position;
          if (el_position[start_id] > index) {
            el_position[start_id]--;
          }
          if (el_position[end_id] >= index) {
            el_position[end_id]--;
          }
          el.grid_item.position = el_position;
        });
        var tract_sizes = this.grid_layout[dir];
        tract_sizes.splice(index - 1, 1);
        this.update_grid(_defineProperty5({}, dir, tract_sizes));
      }
    }, {
      key: "make_el",
      value: function make_el2(sel_txt, opts) {
        return make_el(this.container, sel_txt, opts);
      }
    }, {
      key: "setup_drag",
      value: function setup_drag(opts) {
        var _this2 = this;
        var drag_feedback_rect;
        var start_rect;
        var start_loc;
        var editor_el = document.querySelector("#grided__editor");
        var update_grid_pos = function update_grid_pos2(grid_item, bounding_rect) {
          var grid_extent = get_drag_extent_on_grid(_this2, bounding_rect);
          grid_item.position = grid_extent;
          return grid_extent;
        };
        opts.watching_element.onmousedown = function(event) {
          var _opts$grid_item;
          start_loc = event;
          _this2.container.appendChild(opts.grid_item.el);
          start_rect = ((_opts$grid_item = opts.grid_item) === null || _opts$grid_item === void 0 ? void 0 : _opts$grid_item.bounding_rect) || {
            left: event.offsetX,
            right: event.offsetX,
            top: event.offsetY,
            bottom: event.offsetY
          };
          drag_feedback_rect = make_el(_this2.container.querySelector("#drag_canvas"), "div.drag-feedback-rect", {
            styles: _objectSpread3({}, bounding_rect_to_css_pos(start_rect))
          });
          update_grid_pos(opts.grid_item, start_rect);
          if (opts.on_start)
            opts.on_start(start_loc);
          editor_el.addEventListener("mousemove", drag);
          editor_el.addEventListener("mouseup", drag_end);
        };
        function drag(event) {
          var curr_loc = event;
          if (curr_loc.x === 0 && curr_loc.y === 0)
            return;
          var new_rect = update_rect_with_delta(start_rect, {
            x: curr_loc.x - start_loc.x,
            y: curr_loc.y - start_loc.y
          }, opts.drag_dir);
          Object.assign(drag_feedback_rect.style, bounding_rect_to_css_pos(new_rect));
          var grid_extent = update_grid_pos(opts.grid_item, new_rect);
          if (opts.on_drag)
            opts.on_drag({
              xy: curr_loc,
              grid: grid_extent
            });
        }
        function drag_end(event) {
          var _opts$grid_item2;
          var end_loc = event;
          drag_feedback_rect.remove();
          start_rect = null;
          start_loc = null;
          if (opts.on_end)
            opts.on_end({
              xy: end_loc,
              grid: ((_opts$grid_item2 = opts.grid_item) === null || _opts$grid_item2 === void 0 ? void 0 : _opts$grid_item2.position) || get_pos_on_grid(this.parentElement)
            });
          editor_el.removeEventListener("mousemove", drag);
          editor_el.removeEventListener("mouseup", drag_end);
        }
      }
    }, {
      key: "update_tract",
      value: function update_tract(opts) {
        var _this$update_grid3;
        var tract_index = opts.tract_index, dir = opts.dir, new_value = opts.new_value, _opts$dont_send_to_sh = opts.dont_send_to_shiny, dont_send_to_shiny = _opts$dont_send_to_sh === void 0 ? false : _opts$dont_send_to_sh;
        var tract_values = this.grid_layout[dir];
        tract_values[tract_index - 1] = new_value;
        this.update_grid((_this$update_grid3 = {}, _defineProperty5(_this$update_grid3, dir, tract_values), _defineProperty5(_this$update_grid3, "dont_send_to_shiny", dont_send_to_shiny), _this$update_grid3));
      }
    }, {
      key: "update_grid",
      value: function update_grid(opts) {
        var _opts$force, _opts$force2;
        var new_num_cells = (_opts$force = opts.force) !== null && _opts$force !== void 0 ? _opts$force : false;
        var rows_and_cols_updated = (_opts$force2 = opts.force) !== null && _opts$force2 !== void 0 ? _opts$force2 : false;
        if (this.grid_layout.is_updated_val("rows", opts.rows)) {
          if (this.grid_layout.num_rows !== opts.rows.length)
            new_num_cells = true;
          rows_and_cols_updated = true;
          this.grid_layout.rows = opts.rows;
        }
        if (this.grid_layout.is_updated_val("cols", opts.cols)) {
          if (this.grid_layout.num_cols !== opts.cols.length)
            new_num_cells = true;
          rows_and_cols_updated = true;
          this.grid_layout.cols = opts.cols;
        }
        if (this.grid_layout.is_updated_val("gap", opts.gap)) {
          this.grid_layout.gap = opts.gap;
          this.gap_size_setting.update_value(opts.gap);
        }
        if (new_num_cells) {
          fill_grid_cells(this);
          setup_new_item_drag(this);
        }
        if (rows_and_cols_updated) {
          this.current_elements.forEach(function(el) {
            el.grid_item.fill_if_in_auto_row();
          });
          this.tract_controls.update_positions();
        }
        if (!opts.dont_send_to_shiny) {
          send_grid_sizing_to_shiny(this.grid_layout.attrs);
        }
      }
    }]);
    return App_State2;
  }();
  function fill_grid_cells(app_state) {
    remove_elements(app_state.current_cells);
    app_state.current_cells = [];
    for (var row_i = 1; row_i <= app_state.grid_layout.num_rows; row_i++) {
      for (var col_i = 1; col_i <= app_state.grid_layout.num_cols; col_i++) {
        app_state.current_cells.push(app_state.make_el("div.r".concat(row_i, ".c").concat(col_i, ".grid-cell"), {
          data_props: {
            row: row_i,
            col: col_i
          },
          grid_pos: {
            start_row: row_i,
            end_row: row_i,
            start_col: col_i,
            end_col: col_i
          }
        }));
      }
    }
    if (app_state.mode === "Existing") {
      set_class(app_state.current_cells, "transparent");
    }
    app_state.tract_controls = build_tract_controls(app_state);
  }
  function setup_new_item_drag(app_state) {
    var current_selection_box = new Grid_Item({
      el: app_state.make_el("div#current_selection_box.added-element"),
      parent_layout: app_state.grid_layout
    });
    var drag_canvas = app_state.make_el("div#drag_canvas");
    app_state.setup_drag({
      watching_element: drag_canvas,
      grid_item: current_selection_box,
      drag_dir: "bottom-right",
      on_start: function on_start() {
        current_selection_box.style.borderColor = app_state.next_color;
      },
      on_end: function on_end(_ref) {
        var grid = _ref.grid;
        element_naming_ui(app_state, {
          grid_pos: grid,
          selection_box: current_selection_box
        });
      }
    });
    [drag_canvas].concat(_toConsumableArray5(app_state.container.querySelectorAll(".added-element"))).forEach(function(el) {
      return app_state.container.appendChild(el);
    });
  }
  function build_tract_controls(app_state) {
    var editor_container = document.querySelector("#grided__editor");
    editor_container.querySelectorAll(".tract-controls").forEach(function(el) {
      return el.remove();
    });
    app_state.container.querySelectorAll("button.tract-add").forEach(function(el) {
      return el.remove();
    });
    var controls = {
      rows: build_controls_for_dir("rows"),
      cols: build_controls_for_dir("cols")
    };
    function build_controls_for_dir(dir) {
      var target_class = dir === "rows" ? "c1" : "r1";
      var dir_singular = dir === "rows" ? "row" : "col";
      setup_tract_add_buttons(dir);
      return app_state.current_cells.filter(function(el) {
        return el.classList.contains(target_class);
      }).map(function(el) {
        var tract_index = +el.dataset[dir_singular];
        var holder_el = make_el(editor_container, "div#controller_for_".concat(dir_singular, "_").concat(tract_index, ".").concat(dir, "-controls.tract-controls"));
        return {
          matched_cell: el,
          el: holder_el,
          controller: make_grid_tract_control(holder_el, app_state, {
            dir: dir,
            size: app_state.grid_layout[dir][tract_index - 1],
            tract_index: tract_index
          })
        };
      });
    }
    function setup_tract_add_buttons(dir) {
      var _loop = function _loop2(index2) {
        var final_btn = index2 === 0;
        var tract_index = final_btn ? 1 : index2;
        var styles_for_holder = {
          position: "absolute"
        };
        var size = "2.5em";
        var offset_to_gap = "calc(-1 * (var(--grid-gap) + ".concat(size, ")/2)");
        var offset_outside_editor = "calc(-".concat(size, " - var(--grid-gap) - 0.5rem)");
        if (dir === "rows") {
          Object.assign(styles_for_holder, _defineProperty5({
            gridRow: make_template_start_end(tract_index),
            gridColumn: "1 / 2",
            justifyContent: final_btn ? "end" : "start",
            left: offset_outside_editor
          }, final_btn ? "top" : "bottom", offset_to_gap));
        } else {
          Object.assign(styles_for_holder, _defineProperty5({
            gridColumn: make_template_start_end(tract_index),
            gridRow: "1 / 2",
            alignContent: "end",
            top: "calc(-".concat(size, " - var(--grid-gap) - var(--browser-menu-height) - 0.5rem)")
          }, final_btn ? "left" : "right", offset_to_gap));
        }
        incrementer_button({
          parent_el: app_state.container,
          selector_text: ".addButton.tract-add.".concat(dir, "_").concat(index2),
          up_or_down: "up",
          label: "Add a ".concat(dir === "rows" ? "row" : "col"),
          on_click: function on_click() {
            return app_state.add_tract(dir, index2);
          },
          additional_styles: styles_for_holder
        });
      };
      for (var index = app_state.grid_layout["num_".concat(dir)]; index >= 0; index--) {
        _loop(index);
      }
    }
    update_positions();
    function update_positions() {
      var _iterator = _createForOfIteratorHelper2(tract_dirs), _step;
      try {
        var _loop2 = function _loop22() {
          var dir = _step.value;
          controls[dir].forEach(function(_ref2) {
            var matched_cell = _ref2.matched_cell, el = _ref2.el;
            var bounding_rect = matched_cell.getBoundingClientRect();
            Object.assign(el.style, dir === "cols" ? {
              left: bounding_rect.left + "px",
              width: bounding_rect.width + "px",
              top: "calc(".concat(bounding_rect.top, "px - var(--editor-top-pad) - var(--browser-menu-height) - ").concat(app_state.grid_layout.attrs.gap, ")")
            } : {
              top: bounding_rect.top + "px",
              height: bounding_rect.height + "px",
              left: "calc(".concat(bounding_rect.left, "px - var(--editor-left-pad) - ").concat(app_state.grid_layout.attrs.gap, " - 2px)")
            });
          });
        };
        for (_iterator.s(); !(_step = _iterator.n()).done; ) {
          _loop2();
        }
      } catch (err) {
        _iterator.e(err);
      } finally {
        _iterator.f();
      }
    }
    return {
      update_positions: update_positions
    };
  }
  function element_naming_ui(app_state, _ref3) {
    var grid_pos = _ref3.grid_pos, selection_box = _ref3.selection_box;
    var modal_divs = focused_modal({
      background_callbacks: {
        event: "click",
        func: reset_el_creation
      },
      modal_callbacks: {
        event: "click",
        func: function func(event) {
          event.stopPropagation();
        }
      }
    });
    var modal_div = modal_divs.modal;
    make_el(modal_div, "div.instructions", {
      innerHTML: "\n    <h2>Name your element:</h2>\n    <p>This name will be used to place items in your app.\n    For instance if you want to place a plot in this element,\n    this name will match the label of the plot output\n    </p>\n    "
    });
    var name_form = make_el(modal_div, "form#name_form", {
      event_listener: {
        event: "submit",
        func: function func(event) {
          event.preventDefault();
          var id = this["name_input"].value.replace(/\s/g, "_");
          var element_exists = !!app_state.current_elements.find(function(el) {
            return el.id === id;
          });
          if (element_exists) {
            warn_about_bad_id("You already have an element with the id ".concat(id, ", all ids need to be unique."));
            return;
          }
          if (id.match(/^[^a-zA-Z]/g)) {
            warn_about_bad_id("Valid ids need to start with a character.");
            return;
          }
          app_state.add_element({
            id: id,
            grid_pos: grid_pos
          });
          reset_el_creation();
        }
      }
    });
    make_el(name_form, "input#cancel_btn", {
      props: {
        type: "button",
        value: "cancel"
      },
      event_listener: {
        event: "click",
        func: reset_el_creation
      }
    });
    make_el(name_form, "input#name_input", {
      props: {
        type: "text"
      },
      event_listener: {
        event: "input",
        func: hide_warning_msg
      }
    }).focus();
    make_el(name_form, "input#name_submit", {
      props: {
        type: "submit"
      }
    });
    function warn_about_bad_id(msg) {
      make_el(modal_div, "span#bad_id_msg.notice-text", {
        innerHTML: msg,
        styles: {
          color: "orangered"
        }
      });
    }
    function hide_warning_msg() {
      var warn_msg = modal_div.querySelector("span#bad_id_msg");
      if (warn_msg) {
        warn_msg.remove();
      }
    }
    function reset_el_creation() {
      modal_divs.remove();
      selection_box.style.display = "none";
    }
  }
  function draw_elements(app_state, el_info) {
    var id = el_info.id, mirrored_el = el_info.mirrored_el;
    var el_color = app_state.next_color;
    var mirrors_existing = typeof mirrored_el !== "undefined";
    var grid_el = app_state.make_el("div#".concat(id, ".el_").concat(id, ".added-element"), {
      innerHTML: filler_text,
      styles: {
        borderColor: app_state.next_color,
        position: "relative"
      }
    });
    var list_el = make_el(document.querySelector("#added_elements"), "div.el_".concat(id, ".added-element"), {
      innerHTML: id,
      styles: {
        borderColor: el_color
      },
      event_listener: [{
        event: "mouseover",
        func: function func() {
          this.classList.add("hovered");
          grid_el.classList.add("hovered");
        }
      }, {
        event: "mouseout",
        func: function func() {
          this.classList.remove("hovered");
          grid_el.classList.remove("hovered");
        }
      }]
    });
    var grid_item = new Grid_Item({
      el: grid_el,
      mirrored_el: mirrored_el,
      sibling_el: list_el,
      parent_layout: app_state.grid_layout
    });
    ["top-left", "bottom-right", "center"].forEach(function(handle_type) {
      app_state.setup_drag({
        watching_element: make_el(grid_el, "div.dragger.visible.".concat(handle_type), {
          styles: {
            background: el_color
          },
          innerHTML: handle_type === "center" ? drag_icon : handle_type === "bottom-right" ? se_arrow : nw_arrow
        }),
        grid_item: grid_item,
        drag_dir: handle_type,
        on_end: function on_end() {
          send_elements_to_shiny(app_state.current_elements);
        }
      });
    });
    if (!mirrors_existing) {
      make_el(list_el, "button.remove_el", {
        innerHTML: trashcan_icon,
        event_listener: {
          event: "click",
          func: function func() {
            app_state.remove_elements(id);
          }
        }
      });
    }
    return grid_item;
  }
  function show_conflict_popup(conflicting_elements) {
    var conflicting_elements_list = conflicting_elements.reduce(function(id_list, el) {
      return "\n    ".concat(id_list, "\n    <li> ").concat(el.id, " </li>\n    ");
    }, "<ul>") + "</ul>";
    var message_model = focused_modal({
      header_text: "\n  <h2>Sorry! Can't make that update</h2> \n  <p> This is because it would result in the following elements being removed from your app:</p>\n  ".concat(conflicting_elements_list, "\n  <p> Either re-arrange these elements to not reside in the removed grid or column or remove them from your app before running grided.</p>\n  ")
    });
    make_el(message_model.modal, "button#accept_result", {
      innerHTML: "Okay",
      event_listener: {
        event: "click",
        func: function func() {
          message_model.remove();
        }
      }
    });
  }

  // index.ts
  var Shiny = window.Shiny;
  var debug_messages = true;
  window.onload = function() {
    var app_state = new App_State();
    add_shiny_listener("shiny-loaded", function(x) {
      if (debug_messages)
        console.log("connected to shiny");
      x;
      send_elements_to_shiny(app_state.current_elements);
      send_grid_sizing_to_shiny(app_state.grid_layout.attrs);
    });
    add_shiny_listener("finish-button-text", function(label_text) {
      document.querySelector("button#update_code").innerHTML = label_text;
    });
    if (app_state.mode === "New") {
      add_shiny_listener("update-grid", function(opts) {
        return app_state.update_grid(opts);
      });
      add_shiny_listener("add-elements", function(elements_to_add) {
        elements_to_add.forEach(function(el_msg) {
          var start_row = el_msg.start_row, end_row = el_msg.end_row, start_col = el_msg.start_col, end_col = el_msg.end_col;
          app_state.add_element({
            id: el_msg.id,
            grid_pos: {
              start_row: start_row,
              end_row: end_row,
              start_col: start_col,
              end_col: end_col
            }
          });
        });
      });
    }
    add_shiny_listener("code_modal", function(code_to_show) {
      show_code("Paste the following code into your app to update the layout", {
        type: "R",
        code: code_to_show
      });
    });
    add_shiny_listener("code_update_problem", function(code_to_show) {
      show_code("Sorry, Couldn't find your layout to update. Make sure it's in the foreground of RStudio. Here's the code to paste in case all else fails.", {
        type: "R",
        code: code_to_show
      });
    });
  };
})();
//# sourceMappingURL=index.js.map
