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
      var fails10 = require_fails();
      module.exports = !fails10(function() {
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
      var fails10 = require_fails();
      var classof2 = require_classof_raw();
      var split = "".split;
      module.exports = fails10(function() {
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
      var isObject7 = require_is_object();
      module.exports = function(input, PREFERRED_STRING) {
        if (!isObject7(input))
          return input;
        var fn, val;
        if (PREFERRED_STRING && typeof (fn = input.toString) == "function" && !isObject7(val = fn.call(input)))
          return val;
        if (typeof (fn = input.valueOf) == "function" && !isObject7(val = fn.call(input)))
          return val;
        if (!PREFERRED_STRING && typeof (fn = input.toString) == "function" && !isObject7(val = fn.call(input)))
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
      var toObject6 = require_to_object();
      var hasOwnProperty = {}.hasOwnProperty;
      module.exports = function hasOwn(it, key) {
        return hasOwnProperty.call(toObject6(it), key);
      };
    }
  });

  // node_modules/core-js/internals/document-create-element.js
  var require_document_create_element = __commonJS({
    "node_modules/core-js/internals/document-create-element.js": function(exports, module) {
      var global8 = require_global();
      var isObject7 = require_is_object();
      var document2 = global8.document;
      var EXISTS = isObject7(document2) && isObject7(document2.createElement);
      module.exports = function(it) {
        return EXISTS ? document2.createElement(it) : {};
      };
    }
  });

  // node_modules/core-js/internals/ie8-dom-define.js
  var require_ie8_dom_define = __commonJS({
    "node_modules/core-js/internals/ie8-dom-define.js": function(exports, module) {
      var DESCRIPTORS10 = require_descriptors();
      var fails10 = require_fails();
      var createElement = require_document_create_element();
      module.exports = !DESCRIPTORS10 && !fails10(function() {
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
      var DESCRIPTORS10 = require_descriptors();
      var propertyIsEnumerableModule2 = require_object_property_is_enumerable();
      var createPropertyDescriptor2 = require_create_property_descriptor();
      var toIndexedObject6 = require_to_indexed_object();
      var toPrimitive3 = require_to_primitive();
      var has4 = require_has();
      var IE8_DOM_DEFINE = require_ie8_dom_define();
      var $getOwnPropertyDescriptor2 = Object.getOwnPropertyDescriptor;
      exports.f = DESCRIPTORS10 ? $getOwnPropertyDescriptor2 : function getOwnPropertyDescriptor4(O, P) {
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
      var isObject7 = require_is_object();
      module.exports = function(it) {
        if (!isObject7(it)) {
          throw TypeError(String(it) + " is not an object");
        }
        return it;
      };
    }
  });

  // node_modules/core-js/internals/object-define-property.js
  var require_object_define_property = __commonJS({
    "node_modules/core-js/internals/object-define-property.js": function(exports) {
      var DESCRIPTORS10 = require_descriptors();
      var IE8_DOM_DEFINE = require_ie8_dom_define();
      var anObject7 = require_an_object();
      var toPrimitive3 = require_to_primitive();
      var $defineProperty2 = Object.defineProperty;
      exports.f = DESCRIPTORS10 ? $defineProperty2 : function defineProperty5(O, P, Attributes) {
        anObject7(O);
        P = toPrimitive3(P, true);
        anObject7(Attributes);
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
      var DESCRIPTORS10 = require_descriptors();
      var definePropertyModule2 = require_object_define_property();
      var createPropertyDescriptor2 = require_create_property_descriptor();
      module.exports = DESCRIPTORS10 ? function(object, key, value) {
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
      var global8 = require_global();
      var createNonEnumerableProperty4 = require_create_non_enumerable_property();
      module.exports = function(key, value) {
        try {
          createNonEnumerableProperty4(global8, key, value);
        } catch (error) {
          global8[key] = value;
        }
        return value;
      };
    }
  });

  // node_modules/core-js/internals/shared-store.js
  var require_shared_store = __commonJS({
    "node_modules/core-js/internals/shared-store.js": function(exports, module) {
      var global8 = require_global();
      var setGlobal = require_set_global();
      var SHARED = "__core-js_shared__";
      var store = global8[SHARED] || setGlobal(SHARED, {});
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
      var global8 = require_global();
      var inspectSource = require_inspect_source();
      var WeakMap2 = global8.WeakMap;
      module.exports = typeof WeakMap2 === "function" && /native code/.test(inspectSource(WeakMap2));
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
      var global8 = require_global();
      var isObject7 = require_is_object();
      var createNonEnumerableProperty4 = require_create_non_enumerable_property();
      var objectHas = require_has();
      var shared2 = require_shared_store();
      var sharedKey2 = require_shared_key();
      var hiddenKeys2 = require_hidden_keys();
      var OBJECT_ALREADY_INITIALIZED = "Object already initialized";
      var WeakMap2 = global8.WeakMap;
      var set;
      var get;
      var has4;
      var enforce = function(it) {
        return has4(it) ? get(it) : set(it, {});
      };
      var getterFor = function(TYPE) {
        return function(it) {
          var state;
          if (!isObject7(it) || (state = get(it)).type !== TYPE) {
            throw TypeError("Incompatible receiver, " + TYPE + " required");
          }
          return state;
        };
      };
      if (NATIVE_WEAK_MAP || shared2.state) {
        store = shared2.state || (shared2.state = new WeakMap2());
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
      var global8 = require_global();
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
        if (O === global8) {
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
      var global8 = require_global();
      module.exports = global8;
    }
  });

  // node_modules/core-js/internals/get-built-in.js
  var require_get_built_in = __commonJS({
    "node_modules/core-js/internals/get-built-in.js": function(exports, module) {
      var path = require_path();
      var global8 = require_global();
      var aFunction2 = function(variable) {
        return typeof variable == "function" ? variable : void 0;
      };
      module.exports = function(namespace, method) {
        return arguments.length < 2 ? aFunction2(path[namespace]) || aFunction2(global8[namespace]) : path[namespace] && path[namespace][method] || global8[namespace] && global8[namespace][method];
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
      module.exports = function(index, length2) {
        var integer = toInteger3(index);
        return integer < 0 ? max4(integer + length2, 0) : min4(integer, length2);
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
          var length2 = toLength7(O.length);
          var index = toAbsoluteIndex3(fromIndex, length2);
          var value;
          if (IS_INCLUDES && el != el)
            while (length2 > index) {
              value = O[index++];
              if (value != value)
                return true;
            }
          else
            for (; length2 > index; index++) {
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
      var indexOf2 = require_array_includes().indexOf;
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
            ~indexOf2(result, key) || result.push(key);
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
      var getBuiltIn3 = require_get_built_in();
      var getOwnPropertyNamesModule2 = require_object_get_own_property_names();
      var getOwnPropertySymbolsModule2 = require_object_get_own_property_symbols();
      var anObject7 = require_an_object();
      module.exports = getBuiltIn3("Reflect", "ownKeys") || function ownKeys6(it) {
        var keys2 = getOwnPropertyNamesModule2.f(anObject7(it));
        var getOwnPropertySymbols3 = getOwnPropertySymbolsModule2.f;
        return getOwnPropertySymbols3 ? keys2.concat(getOwnPropertySymbols3(it)) : keys2;
      };
    }
  });

  // node_modules/core-js/internals/copy-constructor-properties.js
  var require_copy_constructor_properties = __commonJS({
    "node_modules/core-js/internals/copy-constructor-properties.js": function(exports, module) {
      var has4 = require_has();
      var ownKeys6 = require_own_keys();
      var getOwnPropertyDescriptorModule3 = require_object_get_own_property_descriptor();
      var definePropertyModule2 = require_object_define_property();
      module.exports = function(target, source) {
        var keys2 = ownKeys6(source);
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
      var fails10 = require_fails();
      var replacement = /#|\.prototype\./;
      var isForced2 = function(feature, detection) {
        var value = data[normalize(feature)];
        return value == POLYFILL ? true : value == NATIVE ? false : typeof detection == "function" ? fails10(detection) : !!detection;
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
      var global8 = require_global();
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
        var FORCED4, target, key, targetProperty, sourceProperty, descriptor;
        if (GLOBAL) {
          target = global8;
        } else if (STATIC) {
          target = global8[TARGET] || setGlobal(TARGET, {});
        } else {
          target = (global8[TARGET] || {}).prototype;
        }
        if (target)
          for (key in source) {
            sourceProperty = source[key];
            if (options.noTargetGet) {
              descriptor = getOwnPropertyDescriptor4(target, key);
              targetProperty = descriptor && descriptor.value;
            } else
              targetProperty = target[key];
            FORCED4 = isForced2(GLOBAL ? key : TARGET + (STATIC ? "." : "#") + key, options.forced);
            if (!FORCED4 && targetProperty !== void 0) {
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

  // node_modules/core-js/internals/engine-user-agent.js
  var require_engine_user_agent = __commonJS({
    "node_modules/core-js/internals/engine-user-agent.js": function(exports, module) {
      var getBuiltIn3 = require_get_built_in();
      module.exports = getBuiltIn3("navigator", "userAgent") || "";
    }
  });

  // node_modules/core-js/internals/engine-v8-version.js
  var require_engine_v8_version = __commonJS({
    "node_modules/core-js/internals/engine-v8-version.js": function(exports, module) {
      var global8 = require_global();
      var userAgent2 = require_engine_user_agent();
      var process2 = global8.process;
      var versions = process2 && process2.versions;
      var v8 = versions && versions.v8;
      var match2;
      var version;
      if (v8) {
        match2 = v8.split(".");
        version = match2[0] < 4 ? 1 : match2[0] + match2[1];
      } else if (userAgent2) {
        match2 = userAgent2.match(/Edge\/(\d+)/);
        if (!match2 || match2[1] >= 74) {
          match2 = userAgent2.match(/Chrome\/(\d+)/);
          if (match2)
            version = match2[1];
        }
      }
      module.exports = version && +version;
    }
  });

  // node_modules/core-js/internals/native-symbol.js
  var require_native_symbol = __commonJS({
    "node_modules/core-js/internals/native-symbol.js": function(exports, module) {
      var V8_VERSION2 = require_engine_v8_version();
      var fails10 = require_fails();
      module.exports = !!Object.getOwnPropertySymbols && !fails10(function() {
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

  // node_modules/core-js/internals/is-array.js
  var require_is_array = __commonJS({
    "node_modules/core-js/internals/is-array.js": function(exports, module) {
      var classof2 = require_classof_raw();
      module.exports = Array.isArray || function isArray5(arg) {
        return classof2(arg) == "Array";
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
      var DESCRIPTORS10 = require_descriptors();
      var definePropertyModule2 = require_object_define_property();
      var anObject7 = require_an_object();
      var objectKeys2 = require_object_keys();
      module.exports = DESCRIPTORS10 ? Object.defineProperties : function defineProperties3(O, Properties) {
        anObject7(O);
        var keys2 = objectKeys2(Properties);
        var length2 = keys2.length;
        var index = 0;
        var key;
        while (length2 > index)
          definePropertyModule2.f(O, key = keys2[index++], Properties[key]);
        return O;
      };
    }
  });

  // node_modules/core-js/internals/html.js
  var require_html = __commonJS({
    "node_modules/core-js/internals/html.js": function(exports, module) {
      var getBuiltIn3 = require_get_built_in();
      module.exports = getBuiltIn3("document", "documentElement");
    }
  });

  // node_modules/core-js/internals/object-create.js
  var require_object_create = __commonJS({
    "node_modules/core-js/internals/object-create.js": function(exports, module) {
      var anObject7 = require_an_object();
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
        var length2 = enumBugKeys.length;
        while (length2--)
          delete NullProtoObject[PROTOTYPE2][enumBugKeys[length2]];
        return NullProtoObject();
      };
      hiddenKeys2[IE_PROTO] = true;
      module.exports = Object.create || function create5(O, Properties) {
        var result;
        if (O !== null) {
          EmptyConstructor[PROTOTYPE2] = anObject7(O);
          result = new EmptyConstructor();
          EmptyConstructor[PROTOTYPE2] = null;
          result[IE_PROTO] = O;
        } else
          result = NullProtoObject();
        return Properties === void 0 ? result : defineProperties3(result, Properties);
      };
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

  // node_modules/core-js/internals/well-known-symbol.js
  var require_well_known_symbol = __commonJS({
    "node_modules/core-js/internals/well-known-symbol.js": function(exports, module) {
      var global8 = require_global();
      var shared2 = require_shared();
      var has4 = require_has();
      var uid2 = require_uid();
      var NATIVE_SYMBOL2 = require_native_symbol();
      var USE_SYMBOL_AS_UID2 = require_use_symbol_as_uid();
      var WellKnownSymbolsStore2 = shared2("wks");
      var Symbol2 = global8.Symbol;
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
      var aFunction2 = require_a_function();
      module.exports = function(fn, that, length2) {
        aFunction2(fn);
        if (that === void 0)
          return fn;
        switch (length2) {
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

  // node_modules/core-js/internals/array-species-create.js
  var require_array_species_create = __commonJS({
    "node_modules/core-js/internals/array-species-create.js": function(exports, module) {
      var isObject7 = require_is_object();
      var isArray5 = require_is_array();
      var wellKnownSymbol5 = require_well_known_symbol();
      var SPECIES2 = wellKnownSymbol5("species");
      module.exports = function(originalArray, length2) {
        var C;
        if (isArray5(originalArray)) {
          C = originalArray.constructor;
          if (typeof C == "function" && (C === Array || isArray5(C.prototype)))
            C = void 0;
          else if (isObject7(C)) {
            C = C[SPECIES2];
            if (C === null)
              C = void 0;
          }
        }
        return new (C === void 0 ? Array : C)(length2 === 0 ? 0 : length2);
      };
    }
  });

  // node_modules/core-js/internals/array-iteration.js
  var require_array_iteration = __commonJS({
    "node_modules/core-js/internals/array-iteration.js": function(exports, module) {
      var bind3 = require_function_bind_context();
      var IndexedObject2 = require_indexed_object();
      var toObject6 = require_to_object();
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
          var O = toObject6($this);
          var self2 = IndexedObject2(O);
          var boundFunction = bind3(callbackfn, that, 3);
          var length2 = toLength7(self2.length);
          var index = 0;
          var create5 = specificCreate || arraySpeciesCreate3;
          var target = IS_MAP ? create5($this, length2) : IS_FILTER || IS_FILTER_OUT ? create5($this, 0) : void 0;
          var value, result;
          for (; length2 > index; index++)
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

  // node_modules/core-js/internals/array-method-has-species-support.js
  var require_array_method_has_species_support = __commonJS({
    "node_modules/core-js/internals/array-method-has-species-support.js": function(exports, module) {
      var fails10 = require_fails();
      var wellKnownSymbol5 = require_well_known_symbol();
      var V8_VERSION2 = require_engine_v8_version();
      var SPECIES2 = wellKnownSymbol5("species");
      module.exports = function(METHOD_NAME) {
        return V8_VERSION2 >= 51 || !fails10(function() {
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

  // node_modules/core-js/internals/array-method-is-strict.js
  var require_array_method_is_strict = __commonJS({
    "node_modules/core-js/internals/array-method-is-strict.js": function(exports, module) {
      "use strict";
      var fails10 = require_fails();
      module.exports = function(METHOD_NAME, argument) {
        var method = [][METHOD_NAME];
        return !!method && fails10(function() {
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
      var arrayMethodIsStrict5 = require_array_method_is_strict();
      var STRICT_METHOD5 = arrayMethodIsStrict5("forEach");
      module.exports = !STRICT_METHOD5 ? function forEach3(callbackfn) {
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

  // node_modules/core-js/internals/freezing.js
  var require_freezing = __commonJS({
    "node_modules/core-js/internals/freezing.js": function(exports, module) {
      var fails10 = require_fails();
      module.exports = !fails10(function() {
        return Object.isExtensible(Object.preventExtensions({}));
      });
    }
  });

  // node_modules/core-js/internals/internal-metadata.js
  var require_internal_metadata = __commonJS({
    "node_modules/core-js/internals/internal-metadata.js": function(exports, module) {
      var hiddenKeys2 = require_hidden_keys();
      var isObject7 = require_is_object();
      var has4 = require_has();
      var defineProperty5 = require_object_define_property().f;
      var uid2 = require_uid();
      var FREEZING2 = require_freezing();
      var METADATA = uid2("meta");
      var id = 0;
      var isExtensible = Object.isExtensible || function() {
        return true;
      };
      var setMetadata = function(it) {
        defineProperty5(it, METADATA, { value: {
          objectID: "O" + ++id,
          weakData: {}
        } });
      };
      var fastKey = function(it, create5) {
        if (!isObject7(it))
          return typeof it == "symbol" ? it : (typeof it == "string" ? "S" : "P") + it;
        if (!has4(it, METADATA)) {
          if (!isExtensible(it))
            return "F";
          if (!create5)
            return "E";
          setMetadata(it);
        }
        return it[METADATA].objectID;
      };
      var getWeakData = function(it, create5) {
        if (!has4(it, METADATA)) {
          if (!isExtensible(it))
            return true;
          if (!create5)
            return false;
          setMetadata(it);
        }
        return it[METADATA].weakData;
      };
      var onFreeze2 = function(it) {
        if (FREEZING2 && meta.REQUIRED && isExtensible(it) && !has4(it, METADATA))
          setMetadata(it);
        return it;
      };
      var meta = module.exports = {
        REQUIRED: false,
        fastKey: fastKey,
        getWeakData: getWeakData,
        onFreeze: onFreeze2
      };
      hiddenKeys2[METADATA] = true;
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

  // node_modules/core-js/internals/add-to-unscopables.js
  var require_add_to_unscopables = __commonJS({
    "node_modules/core-js/internals/add-to-unscopables.js": function(exports, module) {
      var wellKnownSymbol5 = require_well_known_symbol();
      var create5 = require_object_create();
      var definePropertyModule2 = require_object_define_property();
      var UNSCOPABLES = wellKnownSymbol5("unscopables");
      var ArrayPrototype = Array.prototype;
      if (ArrayPrototype[UNSCOPABLES] == void 0) {
        definePropertyModule2.f(ArrayPrototype, UNSCOPABLES, {
          configurable: true,
          value: create5(null)
        });
      }
      module.exports = function(key) {
        ArrayPrototype[UNSCOPABLES][key] = true;
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
      var fails10 = require_fails();
      module.exports = !fails10(function() {
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
      var toObject6 = require_to_object();
      var sharedKey2 = require_shared_key();
      var CORRECT_PROTOTYPE_GETTER2 = require_correct_prototype_getter();
      var IE_PROTO = sharedKey2("IE_PROTO");
      var ObjectPrototype2 = Object.prototype;
      module.exports = CORRECT_PROTOTYPE_GETTER2 ? Object.getPrototypeOf : function(O) {
        O = toObject6(O);
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
      var fails10 = require_fails();
      var getPrototypeOf2 = require_object_get_prototype_of();
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
          PrototypeOfArrayIteratorPrototype = getPrototypeOf2(getPrototypeOf2(arrayIterator));
          if (PrototypeOfArrayIteratorPrototype !== Object.prototype)
            IteratorPrototype = PrototypeOfArrayIteratorPrototype;
        }
      }
      var NEW_ITERATOR_PROTOTYPE = IteratorPrototype == void 0 || fails10(function() {
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
      var create5 = require_object_create();
      var createPropertyDescriptor2 = require_create_property_descriptor();
      var setToStringTag2 = require_set_to_string_tag();
      var Iterators = require_iterators();
      var returnThis = function() {
        return this;
      };
      module.exports = function(IteratorConstructor, NAME2, next3) {
        var TO_STRING_TAG2 = NAME2 + " Iterator";
        IteratorConstructor.prototype = create5(IteratorPrototype, { next: createPropertyDescriptor2(1, next3) });
        setToStringTag2(IteratorConstructor, TO_STRING_TAG2, false, true);
        Iterators[TO_STRING_TAG2] = returnThis;
        return IteratorConstructor;
      };
    }
  });

  // node_modules/core-js/internals/a-possible-prototype.js
  var require_a_possible_prototype = __commonJS({
    "node_modules/core-js/internals/a-possible-prototype.js": function(exports, module) {
      var isObject7 = require_is_object();
      module.exports = function(it) {
        if (!isObject7(it) && it !== null) {
          throw TypeError("Can't set " + String(it) + " as a prototype");
        }
        return it;
      };
    }
  });

  // node_modules/core-js/internals/object-set-prototype-of.js
  var require_object_set_prototype_of = __commonJS({
    "node_modules/core-js/internals/object-set-prototype-of.js": function(exports, module) {
      var anObject7 = require_an_object();
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
        return function setPrototypeOf2(O, proto) {
          anObject7(O);
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
      var $33 = require_export();
      var createIteratorConstructor = require_create_iterator_constructor();
      var getPrototypeOf2 = require_object_get_prototype_of();
      var setPrototypeOf2 = require_object_set_prototype_of();
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
      module.exports = function(Iterable, NAME2, IteratorConstructor, next3, DEFAULT, IS_SET, FORCED4) {
        createIteratorConstructor(IteratorConstructor, NAME2, next3);
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
          CurrentIteratorPrototype = getPrototypeOf2(anyNativeIterator.call(new Iterable()));
          if (IteratorPrototype !== Object.prototype && CurrentIteratorPrototype.next) {
            if (!IS_PURE2 && getPrototypeOf2(CurrentIteratorPrototype) !== IteratorPrototype) {
              if (setPrototypeOf2) {
                setPrototypeOf2(CurrentIteratorPrototype, IteratorPrototype);
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
        if ((!IS_PURE2 || FORCED4) && IterablePrototype[ITERATOR2] !== defaultIterator) {
          createNonEnumerableProperty4(IterablePrototype, ITERATOR2, defaultIterator);
        }
        Iterators[NAME2] = defaultIterator;
        if (DEFAULT) {
          methods = {
            values: getIterationMethod(VALUES),
            keys: IS_SET ? defaultIterator : getIterationMethod(KEYS),
            entries: getIterationMethod(ENTRIES)
          };
          if (FORCED4)
            for (KEY in methods) {
              if (BUGGY_SAFARI_ITERATORS || INCORRECT_VALUES_NAME || !(KEY in IterablePrototype)) {
                redefine6(IterablePrototype, KEY, methods[KEY]);
              }
            }
          else
            $33({ target: NAME2, proto: true, forced: BUGGY_SAFARI_ITERATORS || INCORRECT_VALUES_NAME }, methods);
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

  // node_modules/core-js/internals/string-multibyte.js
  var require_string_multibyte = __commonJS({
    "node_modules/core-js/internals/string-multibyte.js": function(exports, module) {
      var toInteger3 = require_to_integer();
      var requireObjectCoercible5 = require_require_object_coercible();
      var createMethod = function(CONVERT_TO_STRING) {
        return function($this, pos) {
          var S = String(requireObjectCoercible5($this));
          var position2 = toInteger3(pos);
          var size = S.length;
          var first, second;
          if (position2 < 0 || position2 >= size)
            return CONVERT_TO_STRING ? "" : void 0;
          first = S.charCodeAt(position2);
          return first < 55296 || first > 56319 || position2 + 1 === size || (second = S.charCodeAt(position2 + 1)) < 56320 || second > 57343 ? CONVERT_TO_STRING ? S.charAt(position2) : first : CONVERT_TO_STRING ? S.slice(position2, position2 + 2) : (first - 55296 << 10) + (second - 56320) + 65536;
        };
      };
      module.exports = {
        codeAt: createMethod(false),
        charAt: createMethod(true)
      };
    }
  });

  // node_modules/core-js/internals/iterator-close.js
  var require_iterator_close = __commonJS({
    "node_modules/core-js/internals/iterator-close.js": function(exports, module) {
      var anObject7 = require_an_object();
      module.exports = function(iterator) {
        var returnMethod = iterator["return"];
        if (returnMethod !== void 0) {
          return anObject7(returnMethod.call(iterator)).value;
        }
      };
    }
  });

  // node_modules/core-js/internals/call-with-safe-iteration-closing.js
  var require_call_with_safe_iteration_closing = __commonJS({
    "node_modules/core-js/internals/call-with-safe-iteration-closing.js": function(exports, module) {
      var anObject7 = require_an_object();
      var iteratorClose = require_iterator_close();
      module.exports = function(iterator, fn, value, ENTRIES) {
        try {
          return ENTRIES ? fn(anObject7(value)[0], value[1]) : fn(value);
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
      var bind3 = require_function_bind_context();
      var toObject6 = require_to_object();
      var callWithSafeIterationClosing = require_call_with_safe_iteration_closing();
      var isArrayIteratorMethod = require_is_array_iterator_method();
      var toLength7 = require_to_length();
      var createProperty5 = require_create_property();
      var getIteratorMethod = require_get_iterator_method();
      module.exports = function from3(arrayLike) {
        var O = toObject6(arrayLike);
        var C = typeof this == "function" ? this : Array;
        var argumentsLength = arguments.length;
        var mapfn = argumentsLength > 1 ? arguments[1] : void 0;
        var mapping = mapfn !== void 0;
        var iteratorMethod = getIteratorMethod(O);
        var index = 0;
        var length2, result, step, iterator, next3, value;
        if (mapping)
          mapfn = bind3(mapfn, argumentsLength > 2 ? arguments[2] : void 0, 2);
        if (iteratorMethod != void 0 && !(C == Array && isArrayIteratorMethod(iteratorMethod))) {
          iterator = iteratorMethod.call(O);
          next3 = iterator.next;
          result = new C();
          for (; !(step = next3.call(iterator)).done; index++) {
            value = mapping ? callWithSafeIterationClosing(iterator, mapfn, [step.value, index], true) : step.value;
            createProperty5(result, index, value);
          }
        } else {
          length2 = toLength7(O.length);
          result = new C(length2);
          for (; length2 > index; index++) {
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

  // node_modules/core-js/internals/regexp-flags.js
  var require_regexp_flags = __commonJS({
    "node_modules/core-js/internals/regexp-flags.js": function(exports, module) {
      "use strict";
      var anObject7 = require_an_object();
      module.exports = function() {
        var that = anObject7(this);
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
      var fails10 = require_fails();
      function RE(s, f) {
        return RegExp(s, f);
      }
      exports.UNSUPPORTED_Y = fails10(function() {
        var re = RE("a", "y");
        re.lastIndex = 2;
        return re.exec("abcd") != null;
      });
      exports.BROKEN_CARET = fails10(function() {
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
          var lastIndex, reCopy, match2, i;
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
          match2 = nativeExec.call(sticky ? reCopy : re, strCopy);
          if (sticky) {
            if (match2) {
              match2.input = match2.input.slice(charsAdded);
              match2[0] = match2[0].slice(charsAdded);
              match2.index = re.lastIndex;
              re.lastIndex += match2[0].length;
            } else
              re.lastIndex = 0;
          } else if (UPDATES_LAST_INDEX_WRONG && match2) {
            re.lastIndex = re.global ? match2.index + match2[0].length : lastIndex;
          }
          if (NPCG_INCLUDED && match2 && match2.length > 1) {
            nativeReplace.call(match2[0], reCopy, function() {
              for (i = 1; i < arguments.length - 2; i++) {
                if (arguments[i] === void 0)
                  match2[i] = void 0;
              }
            });
          }
          return match2;
        };
      }
      module.exports = patchedExec;
    }
  });

  // node_modules/core-js/modules/es.regexp.exec.js
  var require_es_regexp_exec = __commonJS({
    "node_modules/core-js/modules/es.regexp.exec.js": function() {
      "use strict";
      var $33 = require_export();
      var exec = require_regexp_exec();
      $33({ target: "RegExp", proto: true, forced: /./.exec !== exec }, {
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
      var fails10 = require_fails();
      var wellKnownSymbol5 = require_well_known_symbol();
      var createNonEnumerableProperty4 = require_create_non_enumerable_property();
      var SPECIES2 = wellKnownSymbol5("species");
      var RegExpPrototype2 = RegExp.prototype;
      var REPLACE_SUPPORTS_NAMED_GROUPS = !fails10(function() {
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
      var SPLIT_WORKS_WITH_OVERWRITTEN_EXEC = !fails10(function() {
        var re = /(?:)/;
        var originalExec = re.exec;
        re.exec = function() {
          return originalExec.apply(this, arguments);
        };
        var result = "ab".split(re);
        return result.length !== 2 || result[0] !== "a" || result[1] !== "b";
      });
      module.exports = function(KEY, length2, exec, sham) {
        var SYMBOL2 = wellKnownSymbol5(KEY);
        var DELEGATES_TO_SYMBOL = !fails10(function() {
          var O = {};
          O[SYMBOL2] = function() {
            return 7;
          };
          return ""[KEY](O) != 7;
        });
        var DELEGATES_TO_EXEC = DELEGATES_TO_SYMBOL && !fails10(function() {
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
          redefine6(RegExpPrototype2, SYMBOL2, length2 == 2 ? function(string, arg) {
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
      var isObject7 = require_is_object();
      var classof2 = require_classof_raw();
      var wellKnownSymbol5 = require_well_known_symbol();
      var MATCH = wellKnownSymbol5("match");
      module.exports = function(it) {
        var isRegExp2;
        return isObject7(it) && ((isRegExp2 = it[MATCH]) !== void 0 ? !!isRegExp2 : classof2(it) == "RegExp");
      };
    }
  });

  // node_modules/core-js/internals/species-constructor.js
  var require_species_constructor = __commonJS({
    "node_modules/core-js/internals/species-constructor.js": function(exports, module) {
      var anObject7 = require_an_object();
      var aFunction2 = require_a_function();
      var wellKnownSymbol5 = require_well_known_symbol();
      var SPECIES2 = wellKnownSymbol5("species");
      module.exports = function(O, defaultConstructor) {
        var C = anObject7(O).constructor;
        var S;
        return C === void 0 || (S = anObject7(C)[SPECIES2]) == void 0 ? defaultConstructor : aFunction2(S);
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
      var toObject6 = require_to_object();
      var floor = Math.floor;
      var replace2 = "".replace;
      var SUBSTITUTION_SYMBOLS = /\$([$&'`]|\d{1,2}|<[^>]*>)/g;
      var SUBSTITUTION_SYMBOLS_NO_NAMED = /\$([$&'`]|\d{1,2})/g;
      module.exports = function(matched, str, position2, captures, namedCaptures, replacement) {
        var tailPos = position2 + matched.length;
        var m = captures.length;
        var symbols = SUBSTITUTION_SYMBOLS_NO_NAMED;
        if (namedCaptures !== void 0) {
          namedCaptures = toObject6(namedCaptures);
          symbols = SUBSTITUTION_SYMBOLS;
        }
        return replace2.call(replacement, symbols, function(match2, ch) {
          var capture;
          switch (ch.charAt(0)) {
            case "$":
              return "$";
            case "&":
              return matched;
            case "`":
              return str.slice(0, position2);
            case "'":
              return str.slice(tailPos);
            case "<":
              capture = namedCaptures[ch.slice(1, -1)];
              break;
            default:
              var n = +ch;
              if (n === 0)
                return match2;
              if (n > m) {
                var f = floor(n / 10);
                if (f === 0)
                  return match2;
                if (f <= m)
                  return captures[f - 1] === void 0 ? ch.charAt(1) : captures[f - 1] + ch.charAt(1);
                return match2;
              }
              capture = captures[n - 1];
          }
          return capture === void 0 ? "" : capture;
        });
      };
    }
  });

  // node_modules/core-js/internals/object-assign.js
  var require_object_assign = __commonJS({
    "node_modules/core-js/internals/object-assign.js": function(exports, module) {
      "use strict";
      var DESCRIPTORS10 = require_descriptors();
      var fails10 = require_fails();
      var objectKeys2 = require_object_keys();
      var getOwnPropertySymbolsModule2 = require_object_get_own_property_symbols();
      var propertyIsEnumerableModule2 = require_object_property_is_enumerable();
      var toObject6 = require_to_object();
      var IndexedObject2 = require_indexed_object();
      var $assign = Object.assign;
      var defineProperty5 = Object.defineProperty;
      module.exports = !$assign || fails10(function() {
        if (DESCRIPTORS10 && $assign({ b: 1 }, $assign(defineProperty5({}, "a", {
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
        var T = toObject6(target);
        var argumentsLength = arguments.length;
        var index = 1;
        var getOwnPropertySymbols3 = getOwnPropertySymbolsModule2.f;
        var propertyIsEnumerable2 = propertyIsEnumerableModule2.f;
        while (argumentsLength > index) {
          var S = IndexedObject2(arguments[index++]);
          var keys2 = getOwnPropertySymbols3 ? objectKeys2(S).concat(getOwnPropertySymbols3(S)) : objectKeys2(S);
          var length2 = keys2.length;
          var j = 0;
          var key;
          while (length2 > j) {
            key = keys2[j++];
            if (!DESCRIPTORS10 || propertyIsEnumerable2.call(S, key))
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
      var aFunction2 = require_a_function();
      var toObject6 = require_to_object();
      var IndexedObject2 = require_indexed_object();
      var toLength7 = require_to_length();
      var createMethod = function(IS_RIGHT) {
        return function(that, callbackfn, argumentsLength, memo) {
          aFunction2(callbackfn);
          var O = toObject6(that);
          var self2 = IndexedObject2(O);
          var length2 = toLength7(O.length);
          var index = IS_RIGHT ? length2 - 1 : 0;
          var i = IS_RIGHT ? -1 : 1;
          if (argumentsLength < 2)
            while (true) {
              if (index in self2) {
                memo = self2[index];
                index += i;
                break;
              }
              index += i;
              if (IS_RIGHT ? index < 0 : length2 <= index) {
                throw TypeError("Reduce of empty array with no initial value");
              }
            }
          for (; IS_RIGHT ? index >= 0 : length2 > index; index += i)
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
      var global8 = require_global();
      module.exports = classof2(global8.process) == "process";
    }
  });

  // node_modules/core-js/internals/redefine-all.js
  var require_redefine_all = __commonJS({
    "node_modules/core-js/internals/redefine-all.js": function(exports, module) {
      var redefine6 = require_redefine();
      module.exports = function(target, src, options) {
        for (var key in src)
          redefine6(target, key, src[key], options);
        return target;
      };
    }
  });

  // node_modules/core-js/internals/iterate.js
  var require_iterate = __commonJS({
    "node_modules/core-js/internals/iterate.js": function(exports, module) {
      var anObject7 = require_an_object();
      var isArrayIteratorMethod = require_is_array_iterator_method();
      var toLength7 = require_to_length();
      var bind3 = require_function_bind_context();
      var getIteratorMethod = require_get_iterator_method();
      var iteratorClose = require_iterator_close();
      var Result = function(stopped, result) {
        this.stopped = stopped;
        this.result = result;
      };
      module.exports = function(iterable, unboundFunction, options) {
        var that = options && options.that;
        var AS_ENTRIES = !!(options && options.AS_ENTRIES);
        var IS_ITERATOR = !!(options && options.IS_ITERATOR);
        var INTERRUPTED = !!(options && options.INTERRUPTED);
        var fn = bind3(unboundFunction, that, 1 + AS_ENTRIES + INTERRUPTED);
        var iterator, iterFn, index, length2, result, next3, step;
        var stop = function(condition) {
          if (iterator)
            iteratorClose(iterator);
          return new Result(true, condition);
        };
        var callFn = function(value) {
          if (AS_ENTRIES) {
            anObject7(value);
            return INTERRUPTED ? fn(value[0], value[1], stop) : fn(value[0], value[1]);
          }
          return INTERRUPTED ? fn(value, stop) : fn(value);
        };
        if (IS_ITERATOR) {
          iterator = iterable;
        } else {
          iterFn = getIteratorMethod(iterable);
          if (typeof iterFn != "function")
            throw TypeError("Target is not iterable");
          if (isArrayIteratorMethod(iterFn)) {
            for (index = 0, length2 = toLength7(iterable.length); length2 > index; index++) {
              result = callFn(iterable[index]);
              if (result && result instanceof Result)
                return result;
            }
            return new Result(false);
          }
          iterator = iterFn.call(iterable);
        }
        next3 = iterator.next;
        while (!(step = next3.call(iterator)).done) {
          try {
            result = callFn(step.value);
          } catch (error) {
            iteratorClose(iterator);
            throw error;
          }
          if (typeof result == "object" && result && result instanceof Result)
            return result;
        }
        return new Result(false);
      };
    }
  });

  // node_modules/core-js/internals/an-instance.js
  var require_an_instance = __commonJS({
    "node_modules/core-js/internals/an-instance.js": function(exports, module) {
      module.exports = function(it, Constructor, name) {
        if (!(it instanceof Constructor)) {
          throw TypeError("Incorrect " + (name ? name + " " : "") + "invocation");
        }
        return it;
      };
    }
  });

  // node_modules/core-js/internals/inherit-if-required.js
  var require_inherit_if_required = __commonJS({
    "node_modules/core-js/internals/inherit-if-required.js": function(exports, module) {
      var isObject7 = require_is_object();
      var setPrototypeOf2 = require_object_set_prototype_of();
      module.exports = function($this, dummy, Wrapper) {
        var NewTarget, NewTargetPrototype;
        if (setPrototypeOf2 && typeof (NewTarget = dummy.constructor) == "function" && NewTarget !== Wrapper && isObject7(NewTargetPrototype = NewTarget.prototype) && NewTargetPrototype !== Wrapper.prototype)
          setPrototypeOf2($this, NewTargetPrototype);
        return $this;
      };
    }
  });

  // node_modules/core-js/internals/collection.js
  var require_collection = __commonJS({
    "node_modules/core-js/internals/collection.js": function(exports, module) {
      "use strict";
      var $33 = require_export();
      var global8 = require_global();
      var isForced2 = require_is_forced();
      var redefine6 = require_redefine();
      var InternalMetadataModule = require_internal_metadata();
      var iterate = require_iterate();
      var anInstance = require_an_instance();
      var isObject7 = require_is_object();
      var fails10 = require_fails();
      var checkCorrectnessOfIteration2 = require_check_correctness_of_iteration();
      var setToStringTag2 = require_set_to_string_tag();
      var inheritIfRequired2 = require_inherit_if_required();
      module.exports = function(CONSTRUCTOR_NAME, wrapper, common) {
        var IS_MAP = CONSTRUCTOR_NAME.indexOf("Map") !== -1;
        var IS_WEAK = CONSTRUCTOR_NAME.indexOf("Weak") !== -1;
        var ADDER = IS_MAP ? "set" : "add";
        var NativeConstructor = global8[CONSTRUCTOR_NAME];
        var NativePrototype = NativeConstructor && NativeConstructor.prototype;
        var Constructor = NativeConstructor;
        var exported = {};
        var fixMethod = function(KEY) {
          var nativeMethod = NativePrototype[KEY];
          redefine6(NativePrototype, KEY, KEY == "add" ? function add(value) {
            nativeMethod.call(this, value === 0 ? 0 : value);
            return this;
          } : KEY == "delete" ? function(key) {
            return IS_WEAK && !isObject7(key) ? false : nativeMethod.call(this, key === 0 ? 0 : key);
          } : KEY == "get" ? function get(key) {
            return IS_WEAK && !isObject7(key) ? void 0 : nativeMethod.call(this, key === 0 ? 0 : key);
          } : KEY == "has" ? function has4(key) {
            return IS_WEAK && !isObject7(key) ? false : nativeMethod.call(this, key === 0 ? 0 : key);
          } : function set(key, value) {
            nativeMethod.call(this, key === 0 ? 0 : key, value);
            return this;
          });
        };
        var REPLACE = isForced2(CONSTRUCTOR_NAME, typeof NativeConstructor != "function" || !(IS_WEAK || NativePrototype.forEach && !fails10(function() {
          new NativeConstructor().entries().next();
        })));
        if (REPLACE) {
          Constructor = common.getConstructor(wrapper, CONSTRUCTOR_NAME, IS_MAP, ADDER);
          InternalMetadataModule.REQUIRED = true;
        } else if (isForced2(CONSTRUCTOR_NAME, true)) {
          var instance = new Constructor();
          var HASNT_CHAINING = instance[ADDER](IS_WEAK ? {} : -0, 1) != instance;
          var THROWS_ON_PRIMITIVES = fails10(function() {
            instance.has(1);
          });
          var ACCEPT_ITERABLES = checkCorrectnessOfIteration2(function(iterable) {
            new NativeConstructor(iterable);
          });
          var BUGGY_ZERO = !IS_WEAK && fails10(function() {
            var $instance = new NativeConstructor();
            var index = 5;
            while (index--)
              $instance[ADDER](index, index);
            return !$instance.has(-0);
          });
          if (!ACCEPT_ITERABLES) {
            Constructor = wrapper(function(dummy, iterable) {
              anInstance(dummy, Constructor, CONSTRUCTOR_NAME);
              var that = inheritIfRequired2(new NativeConstructor(), dummy, Constructor);
              if (iterable != void 0)
                iterate(iterable, that[ADDER], { that: that, AS_ENTRIES: IS_MAP });
              return that;
            });
            Constructor.prototype = NativePrototype;
            NativePrototype.constructor = Constructor;
          }
          if (THROWS_ON_PRIMITIVES || BUGGY_ZERO) {
            fixMethod("delete");
            fixMethod("has");
            IS_MAP && fixMethod("get");
          }
          if (BUGGY_ZERO || HASNT_CHAINING)
            fixMethod(ADDER);
          if (IS_WEAK && NativePrototype.clear)
            delete NativePrototype.clear;
        }
        exported[CONSTRUCTOR_NAME] = Constructor;
        $33({ global: true, forced: Constructor != NativeConstructor }, exported);
        setToStringTag2(Constructor, CONSTRUCTOR_NAME);
        if (!IS_WEAK)
          common.setStrong(Constructor, CONSTRUCTOR_NAME, IS_MAP);
        return Constructor;
      };
    }
  });

  // node_modules/core-js/internals/collection-weak.js
  var require_collection_weak = __commonJS({
    "node_modules/core-js/internals/collection-weak.js": function(exports, module) {
      "use strict";
      var redefineAll = require_redefine_all();
      var getWeakData = require_internal_metadata().getWeakData;
      var anObject7 = require_an_object();
      var isObject7 = require_is_object();
      var anInstance = require_an_instance();
      var iterate = require_iterate();
      var ArrayIterationModule = require_array_iteration();
      var $has = require_has();
      var InternalStateModule3 = require_internal_state();
      var setInternalState3 = InternalStateModule3.set;
      var internalStateGetterFor = InternalStateModule3.getterFor;
      var find2 = ArrayIterationModule.find;
      var findIndex2 = ArrayIterationModule.findIndex;
      var id = 0;
      var uncaughtFrozenStore = function(store) {
        return store.frozen || (store.frozen = new UncaughtFrozenStore());
      };
      var UncaughtFrozenStore = function() {
        this.entries = [];
      };
      var findUncaughtFrozen = function(store, key) {
        return find2(store.entries, function(it) {
          return it[0] === key;
        });
      };
      UncaughtFrozenStore.prototype = {
        get: function(key) {
          var entry = findUncaughtFrozen(this, key);
          if (entry)
            return entry[1];
        },
        has: function(key) {
          return !!findUncaughtFrozen(this, key);
        },
        set: function(key, value) {
          var entry = findUncaughtFrozen(this, key);
          if (entry)
            entry[1] = value;
          else
            this.entries.push([key, value]);
        },
        "delete": function(key) {
          var index = findIndex2(this.entries, function(it) {
            return it[0] === key;
          });
          if (~index)
            this.entries.splice(index, 1);
          return !!~index;
        }
      };
      module.exports = {
        getConstructor: function(wrapper, CONSTRUCTOR_NAME, IS_MAP, ADDER) {
          var C = wrapper(function(that, iterable) {
            anInstance(that, C, CONSTRUCTOR_NAME);
            setInternalState3(that, {
              type: CONSTRUCTOR_NAME,
              id: id++,
              frozen: void 0
            });
            if (iterable != void 0)
              iterate(iterable, that[ADDER], { that: that, AS_ENTRIES: IS_MAP });
          });
          var getInternalState3 = internalStateGetterFor(CONSTRUCTOR_NAME);
          var define = function(that, key, value) {
            var state = getInternalState3(that);
            var data = getWeakData(anObject7(key), true);
            if (data === true)
              uncaughtFrozenStore(state).set(key, value);
            else
              data[state.id] = value;
            return that;
          };
          redefineAll(C.prototype, {
            "delete": function(key) {
              var state = getInternalState3(this);
              if (!isObject7(key))
                return false;
              var data = getWeakData(key);
              if (data === true)
                return uncaughtFrozenStore(state)["delete"](key);
              return data && $has(data, state.id) && delete data[state.id];
            },
            has: function has4(key) {
              var state = getInternalState3(this);
              if (!isObject7(key))
                return false;
              var data = getWeakData(key);
              if (data === true)
                return uncaughtFrozenStore(state).has(key);
              return data && $has(data, state.id);
            }
          });
          redefineAll(C.prototype, IS_MAP ? {
            get: function get(key) {
              var state = getInternalState3(this);
              if (isObject7(key)) {
                var data = getWeakData(key);
                if (data === true)
                  return uncaughtFrozenStore(state).get(key);
                return data ? data[state.id] : void 0;
              }
            },
            set: function set(key, value) {
              return define(this, key, value);
            }
          } : {
            add: function add(value) {
              return define(this, value, true);
            }
          });
          return C;
        }
      };
    }
  });

  // node_modules/core-js/modules/es.weak-map.js
  var require_es_weak_map = __commonJS({
    "node_modules/core-js/modules/es.weak-map.js": function(exports, module) {
      "use strict";
      var global8 = require_global();
      var redefineAll = require_redefine_all();
      var InternalMetadataModule = require_internal_metadata();
      var collection = require_collection();
      var collectionWeak = require_collection_weak();
      var isObject7 = require_is_object();
      var enforceIternalState = require_internal_state().enforce;
      var NATIVE_WEAK_MAP = require_native_weak_map();
      var IS_IE11 = !global8.ActiveXObject && "ActiveXObject" in global8;
      var isExtensible = Object.isExtensible;
      var InternalWeakMap;
      var wrapper = function(init) {
        return function WeakMap2() {
          return init(this, arguments.length ? arguments[0] : void 0);
        };
      };
      var $WeakMap = module.exports = collection("WeakMap", wrapper, collectionWeak);
      if (NATIVE_WEAK_MAP && IS_IE11) {
        InternalWeakMap = collectionWeak.getConstructor(wrapper, "WeakMap", true);
        InternalMetadataModule.REQUIRED = true;
        WeakMapPrototype = $WeakMap.prototype;
        nativeDelete = WeakMapPrototype["delete"];
        nativeHas = WeakMapPrototype.has;
        nativeGet = WeakMapPrototype.get;
        nativeSet = WeakMapPrototype.set;
        redefineAll(WeakMapPrototype, {
          "delete": function(key) {
            if (isObject7(key) && !isExtensible(key)) {
              var state = enforceIternalState(this);
              if (!state.frozen)
                state.frozen = new InternalWeakMap();
              return nativeDelete.call(this, key) || state.frozen["delete"](key);
            }
            return nativeDelete.call(this, key);
          },
          has: function has4(key) {
            if (isObject7(key) && !isExtensible(key)) {
              var state = enforceIternalState(this);
              if (!state.frozen)
                state.frozen = new InternalWeakMap();
              return nativeHas.call(this, key) || state.frozen.has(key);
            }
            return nativeHas.call(this, key);
          },
          get: function get(key) {
            if (isObject7(key) && !isExtensible(key)) {
              var state = enforceIternalState(this);
              if (!state.frozen)
                state.frozen = new InternalWeakMap();
              return nativeHas.call(this, key) ? nativeGet.call(this, key) : state.frozen.get(key);
            }
            return nativeGet.call(this, key);
          },
          set: function set(key, value) {
            if (isObject7(key) && !isExtensible(key)) {
              var state = enforceIternalState(this);
              if (!state.frozen)
                state.frozen = new InternalWeakMap();
              nativeHas.call(this, key) ? nativeSet.call(this, key, value) : state.frozen.set(key, value);
            } else
              nativeSet.call(this, key, value);
            return this;
          }
        });
      }
      var WeakMapPrototype;
      var nativeDelete;
      var nativeHas;
      var nativeGet;
      var nativeSet;
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
      var whitespace2 = "[" + whitespaces + "]";
      var ltrim = RegExp("^" + whitespace2 + whitespace2 + "*");
      var rtrim = RegExp(whitespace2 + whitespace2 + "*$");
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

  // node_modules/core-js/internals/string-trim-forced.js
  var require_string_trim_forced = __commonJS({
    "node_modules/core-js/internals/string-trim-forced.js": function(exports, module) {
      var fails10 = require_fails();
      var whitespaces = require_whitespaces();
      var non = "\u200B\x85\u180E";
      module.exports = function(METHOD_NAME) {
        return fails10(function() {
          return !!whitespaces[METHOD_NAME]() || non[METHOD_NAME]() != non || whitespaces[METHOD_NAME].name !== METHOD_NAME;
        });
      };
    }
  });

  // node_modules/core-js/internals/function-bind.js
  var require_function_bind = __commonJS({
    "node_modules/core-js/internals/function-bind.js": function(exports, module) {
      "use strict";
      var aFunction2 = require_a_function();
      var isObject7 = require_is_object();
      var slice4 = [].slice;
      var factories = {};
      var construct2 = function(C, argsLength, args) {
        if (!(argsLength in factories)) {
          for (var list = [], i = 0; i < argsLength; i++)
            list[i] = "a[" + i + "]";
          factories[argsLength] = Function("C,a", "return new C(" + list.join(",") + ")");
        }
        return factories[argsLength](C, args);
      };
      module.exports = Function.bind || function bind3(that) {
        var fn = aFunction2(this);
        var partArgs = slice4.call(arguments, 1);
        var boundFunction = function bound() {
          var args = partArgs.concat(slice4.call(arguments));
          return this instanceof boundFunction ? construct2(fn, args.length, args) : fn.apply(that, args);
        };
        if (isObject7(fn.prototype))
          boundFunction.prototype = fn.prototype;
        return boundFunction;
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

  // node_modules/core-js/internals/set-species.js
  var require_set_species = __commonJS({
    "node_modules/core-js/internals/set-species.js": function(exports, module) {
      "use strict";
      var getBuiltIn3 = require_get_built_in();
      var definePropertyModule2 = require_object_define_property();
      var wellKnownSymbol5 = require_well_known_symbol();
      var DESCRIPTORS10 = require_descriptors();
      var SPECIES2 = wellKnownSymbol5("species");
      module.exports = function(CONSTRUCTOR_NAME) {
        var Constructor = getBuiltIn3(CONSTRUCTOR_NAME);
        var defineProperty5 = definePropertyModule2.f;
        if (DESCRIPTORS10 && Constructor && !Constructor[SPECIES2]) {
          defineProperty5(Constructor, SPECIES2, {
            configurable: true,
            get: function() {
              return this;
            }
          });
        }
      };
    }
  });

  // node_modules/core-js/internals/collection-strong.js
  var require_collection_strong = __commonJS({
    "node_modules/core-js/internals/collection-strong.js": function(exports, module) {
      "use strict";
      var defineProperty5 = require_object_define_property().f;
      var create5 = require_object_create();
      var redefineAll = require_redefine_all();
      var bind3 = require_function_bind_context();
      var anInstance = require_an_instance();
      var iterate = require_iterate();
      var defineIterator2 = require_define_iterator();
      var setSpecies = require_set_species();
      var DESCRIPTORS10 = require_descriptors();
      var fastKey = require_internal_metadata().fastKey;
      var InternalStateModule3 = require_internal_state();
      var setInternalState3 = InternalStateModule3.set;
      var internalStateGetterFor = InternalStateModule3.getterFor;
      module.exports = {
        getConstructor: function(wrapper, CONSTRUCTOR_NAME, IS_MAP, ADDER) {
          var C = wrapper(function(that, iterable) {
            anInstance(that, C, CONSTRUCTOR_NAME);
            setInternalState3(that, {
              type: CONSTRUCTOR_NAME,
              index: create5(null),
              first: void 0,
              last: void 0,
              size: 0
            });
            if (!DESCRIPTORS10)
              that.size = 0;
            if (iterable != void 0)
              iterate(iterable, that[ADDER], { that: that, AS_ENTRIES: IS_MAP });
          });
          var getInternalState3 = internalStateGetterFor(CONSTRUCTOR_NAME);
          var define = function(that, key, value) {
            var state = getInternalState3(that);
            var entry = getEntry(that, key);
            var previous, index;
            if (entry) {
              entry.value = value;
            } else {
              state.last = entry = {
                index: index = fastKey(key, true),
                key: key,
                value: value,
                previous: previous = state.last,
                next: void 0,
                removed: false
              };
              if (!state.first)
                state.first = entry;
              if (previous)
                previous.next = entry;
              if (DESCRIPTORS10)
                state.size++;
              else
                that.size++;
              if (index !== "F")
                state.index[index] = entry;
            }
            return that;
          };
          var getEntry = function(that, key) {
            var state = getInternalState3(that);
            var index = fastKey(key);
            var entry;
            if (index !== "F")
              return state.index[index];
            for (entry = state.first; entry; entry = entry.next) {
              if (entry.key == key)
                return entry;
            }
          };
          redefineAll(C.prototype, {
            clear: function clear() {
              var that = this;
              var state = getInternalState3(that);
              var data = state.index;
              var entry = state.first;
              while (entry) {
                entry.removed = true;
                if (entry.previous)
                  entry.previous = entry.previous.next = void 0;
                delete data[entry.index];
                entry = entry.next;
              }
              state.first = state.last = void 0;
              if (DESCRIPTORS10)
                state.size = 0;
              else
                that.size = 0;
            },
            "delete": function(key) {
              var that = this;
              var state = getInternalState3(that);
              var entry = getEntry(that, key);
              if (entry) {
                var next3 = entry.next;
                var prev2 = entry.previous;
                delete state.index[entry.index];
                entry.removed = true;
                if (prev2)
                  prev2.next = next3;
                if (next3)
                  next3.previous = prev2;
                if (state.first == entry)
                  state.first = next3;
                if (state.last == entry)
                  state.last = prev2;
                if (DESCRIPTORS10)
                  state.size--;
                else
                  that.size--;
              }
              return !!entry;
            },
            forEach: function forEach3(callbackfn) {
              var state = getInternalState3(this);
              var boundFunction = bind3(callbackfn, arguments.length > 1 ? arguments[1] : void 0, 3);
              var entry;
              while (entry = entry ? entry.next : state.first) {
                boundFunction(entry.value, entry.key, this);
                while (entry && entry.removed)
                  entry = entry.previous;
              }
            },
            has: function has4(key) {
              return !!getEntry(this, key);
            }
          });
          redefineAll(C.prototype, IS_MAP ? {
            get: function get(key) {
              var entry = getEntry(this, key);
              return entry && entry.value;
            },
            set: function set(key, value) {
              return define(this, key === 0 ? 0 : key, value);
            }
          } : {
            add: function add(value) {
              return define(this, value = value === 0 ? 0 : value, value);
            }
          });
          if (DESCRIPTORS10)
            defineProperty5(C.prototype, "size", {
              get: function() {
                return getInternalState3(this).size;
              }
            });
          return C;
        },
        setStrong: function(C, CONSTRUCTOR_NAME, IS_MAP) {
          var ITERATOR_NAME = CONSTRUCTOR_NAME + " Iterator";
          var getInternalCollectionState = internalStateGetterFor(CONSTRUCTOR_NAME);
          var getInternalIteratorState = internalStateGetterFor(ITERATOR_NAME);
          defineIterator2(C, CONSTRUCTOR_NAME, function(iterated, kind) {
            setInternalState3(this, {
              type: ITERATOR_NAME,
              target: iterated,
              state: getInternalCollectionState(iterated),
              kind: kind,
              last: void 0
            });
          }, function() {
            var state = getInternalIteratorState(this);
            var kind = state.kind;
            var entry = state.last;
            while (entry && entry.removed)
              entry = entry.previous;
            if (!state.target || !(state.last = entry = entry ? entry.next : state.state.first)) {
              state.target = void 0;
              return { value: void 0, done: true };
            }
            if (kind == "keys")
              return { value: entry.key, done: false };
            if (kind == "values")
              return { value: entry.value, done: false };
            return { value: [entry.key, entry.value], done: false };
          }, IS_MAP ? "entries" : "values", !IS_MAP, true);
          setSpecies(CONSTRUCTOR_NAME);
        }
      };
    }
  });

  // node_modules/core-js/modules/es.map.js
  var require_es_map = __commonJS({
    "node_modules/core-js/modules/es.map.js": function(exports, module) {
      "use strict";
      var collection = require_collection();
      var collectionStrong = require_collection_strong();
      module.exports = collection("Map", function(init) {
        return function Map2() {
          return init(this, arguments.length ? arguments[0] : void 0);
        };
      }, collectionStrong);
    }
  });

  // node_modules/core-js/modules/es.symbol.js
  "use strict";
  var $ = require_export();
  var global2 = require_global();
  var getBuiltIn = require_get_built_in();
  var IS_PURE = require_is_pure();
  var DESCRIPTORS = require_descriptors();
  var NATIVE_SYMBOL = require_native_symbol();
  var USE_SYMBOL_AS_UID = require_use_symbol_as_uid();
  var fails = require_fails();
  var has = require_has();
  var isArray = require_is_array();
  var isObject = require_is_object();
  var anObject = require_an_object();
  var toObject = require_to_object();
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
  var createNonEnumerableProperty = require_create_non_enumerable_property();
  var redefine = require_redefine();
  var shared = require_shared();
  var sharedKey = require_shared_key();
  var hiddenKeys = require_hidden_keys();
  var uid = require_uid();
  var wellKnownSymbol = require_well_known_symbol();
  var wrappedWellKnownSymbolModule = require_well_known_symbol_wrapped();
  var defineWellKnownSymbol = require_define_well_known_symbol();
  var setToStringTag = require_set_to_string_tag();
  var InternalStateModule = require_internal_state();
  var $forEach = require_array_iteration().forEach;
  var HIDDEN = sharedKey("hidden");
  var SYMBOL = "Symbol";
  var PROTOTYPE = "prototype";
  var TO_PRIMITIVE = wellKnownSymbol("toPrimitive");
  var setInternalState = InternalStateModule.set;
  var getInternalState = InternalStateModule.getterFor(SYMBOL);
  var ObjectPrototype = Object[PROTOTYPE];
  var $Symbol = global2.Symbol;
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
  var QObject = global2.QObject;
  var USE_SETTER = !QObject || !QObject[PROTOTYPE] || !QObject[PROTOTYPE].findChild;
  var setSymbolDescriptor = DESCRIPTORS && fails(function() {
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
    if (!DESCRIPTORS)
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
    anObject(O);
    var key = toPrimitive(P, true);
    anObject(Attributes);
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
    anObject(O);
    var properties = toIndexedObject(Properties);
    var keys2 = objectKeys(properties).concat($getOwnPropertySymbols(properties));
    $forEach(keys2, function(key) {
      if (!DESCRIPTORS || $propertyIsEnumerable.call(properties, key))
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
      if (DESCRIPTORS && USE_SETTER)
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
      return wrap(wellKnownSymbol(name), name);
    };
    if (DESCRIPTORS) {
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
  $({ global: true, wrap: true, forced: !NATIVE_SYMBOL, sham: !NATIVE_SYMBOL }, {
    Symbol: $Symbol
  });
  $forEach(objectKeys(WellKnownSymbolsStore), function(name) {
    defineWellKnownSymbol(name);
  });
  $({ target: SYMBOL, stat: true, forced: !NATIVE_SYMBOL }, {
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
  $({ target: "Object", stat: true, forced: !NATIVE_SYMBOL, sham: !DESCRIPTORS }, {
    create: $create,
    defineProperty: $defineProperty,
    defineProperties: $defineProperties,
    getOwnPropertyDescriptor: $getOwnPropertyDescriptor
  });
  $({ target: "Object", stat: true, forced: !NATIVE_SYMBOL }, {
    getOwnPropertyNames: $getOwnPropertyNames,
    getOwnPropertySymbols: $getOwnPropertySymbols
  });
  $({ target: "Object", stat: true, forced: fails(function() {
    getOwnPropertySymbolsModule.f(1);
  }) }, {
    getOwnPropertySymbols: function getOwnPropertySymbols2(it) {
      return getOwnPropertySymbolsModule.f(toObject(it));
    }
  });
  if ($stringify) {
    FORCED_JSON_STRINGIFY = !NATIVE_SYMBOL || fails(function() {
      var symbol = $Symbol();
      return $stringify([symbol]) != "[null]" || $stringify({ a: symbol }) != "{}" || $stringify(Object(symbol)) != "{}";
    });
    $({ target: "JSON", stat: true, forced: FORCED_JSON_STRINGIFY }, {
      stringify: function stringify2(it, replacer, space) {
        var args = [it];
        var index = 1;
        var $replacer;
        while (arguments.length > index)
          args.push(arguments[index++]);
        $replacer = replacer;
        if (!isObject(replacer) && it === void 0 || isSymbol(it))
          return;
        if (!isArray(replacer))
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
    createNonEnumerableProperty($Symbol[PROTOTYPE], TO_PRIMITIVE, $Symbol[PROTOTYPE].valueOf);
  }
  setToStringTag($Symbol, SYMBOL);
  hiddenKeys[HIDDEN] = true;

  // node_modules/core-js/modules/es.symbol.description.js
  "use strict";
  var $2 = require_export();
  var DESCRIPTORS2 = require_descriptors();
  var global3 = require_global();
  var has2 = require_has();
  var isObject2 = require_is_object();
  var defineProperty2 = require_object_define_property().f;
  var copyConstructorProperties = require_copy_constructor_properties();
  var NativeSymbol = global3.Symbol;
  if (DESCRIPTORS2 && typeof NativeSymbol == "function" && (!("description" in NativeSymbol.prototype) || NativeSymbol().description !== void 0)) {
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
        var symbol = isObject2(this) ? this.valueOf() : this;
        var string = symbolToString.call(symbol);
        if (has2(EmptyStringDescriptionStore, symbol))
          return "";
        var desc = native ? string.slice(7, -1) : string.replace(regexp, "$1");
        return desc === "" ? void 0 : desc;
      }
    });
    $2({ global: true, forced: true }, {
      Symbol: SymbolWrapper
    });
  }
  var EmptyStringDescriptionStore;
  var SymbolWrapper;
  var symbolPrototype;
  var symbolToString;
  var native;
  var regexp;

  // node_modules/core-js/modules/es.object.define-property.js
  var $3 = require_export();
  var DESCRIPTORS3 = require_descriptors();
  var objectDefinePropertyModile = require_object_define_property();
  $3({ target: "Object", stat: true, forced: !DESCRIPTORS3, sham: !DESCRIPTORS3 }, {
    defineProperty: objectDefinePropertyModile.f
  });

  // node_modules/core-js/modules/es.object.keys.js
  var $4 = require_export();
  var toObject2 = require_to_object();
  var nativeKeys = require_object_keys();
  var fails2 = require_fails();
  var FAILS_ON_PRIMITIVES = fails2(function() {
    nativeKeys(1);
  });
  $4({ target: "Object", stat: true, forced: FAILS_ON_PRIMITIVES }, {
    keys: function keys(it) {
      return nativeKeys(toObject2(it));
    }
  });

  // node_modules/core-js/modules/es.array.filter.js
  "use strict";
  var $5 = require_export();
  var $filter = require_array_iteration().filter;
  var arrayMethodHasSpeciesSupport = require_array_method_has_species_support();
  var HAS_SPECIES_SUPPORT = arrayMethodHasSpeciesSupport("filter");
  $5({ target: "Array", proto: true, forced: !HAS_SPECIES_SUPPORT }, {
    filter: function filter(callbackfn) {
      return $filter(this, callbackfn, arguments.length > 1 ? arguments[1] : void 0);
    }
  });

  // node_modules/core-js/modules/es.object.get-own-property-descriptor.js
  var $6 = require_export();
  var fails3 = require_fails();
  var toIndexedObject2 = require_to_indexed_object();
  var nativeGetOwnPropertyDescriptor2 = require_object_get_own_property_descriptor().f;
  var DESCRIPTORS4 = require_descriptors();
  var FAILS_ON_PRIMITIVES2 = fails3(function() {
    nativeGetOwnPropertyDescriptor2(1);
  });
  var FORCED = !DESCRIPTORS4 || FAILS_ON_PRIMITIVES2;
  $6({ target: "Object", stat: true, forced: FORCED, sham: !DESCRIPTORS4 }, {
    getOwnPropertyDescriptor: function getOwnPropertyDescriptor2(it, key) {
      return nativeGetOwnPropertyDescriptor2(toIndexedObject2(it), key);
    }
  });

  // node_modules/core-js/modules/es.array.for-each.js
  "use strict";
  var $7 = require_export();
  var forEach = require_array_for_each();
  $7({ target: "Array", proto: true, forced: [].forEach != forEach }, {
    forEach: forEach
  });

  // node_modules/core-js/modules/web.dom-collections.for-each.js
  var global4 = require_global();
  var DOMIterables = require_dom_iterables();
  var forEach2 = require_array_for_each();
  var createNonEnumerableProperty2 = require_create_non_enumerable_property();
  for (var COLLECTION_NAME in DOMIterables) {
    Collection = global4[COLLECTION_NAME];
    CollectionPrototype = Collection && Collection.prototype;
    if (CollectionPrototype && CollectionPrototype.forEach !== forEach2)
      try {
        createNonEnumerableProperty2(CollectionPrototype, "forEach", forEach2);
      } catch (error) {
        CollectionPrototype.forEach = forEach2;
      }
  }
  var Collection;
  var CollectionPrototype;

  // node_modules/core-js/modules/es.object.get-own-property-descriptors.js
  var $8 = require_export();
  var DESCRIPTORS5 = require_descriptors();
  var ownKeys = require_own_keys();
  var toIndexedObject3 = require_to_indexed_object();
  var getOwnPropertyDescriptorModule2 = require_object_get_own_property_descriptor();
  var createProperty = require_create_property();
  $8({ target: "Object", stat: true, sham: !DESCRIPTORS5 }, {
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
          createProperty(result, key, descriptor);
      }
      return result;
    }
  });

  // node_modules/core-js/modules/es.object.define-properties.js
  var $9 = require_export();
  var DESCRIPTORS6 = require_descriptors();
  var defineProperties2 = require_object_define_properties();
  $9({ target: "Object", stat: true, forced: !DESCRIPTORS6, sham: !DESCRIPTORS6 }, {
    defineProperties: defineProperties2
  });

  // node_modules/core-js/modules/es.array.slice.js
  "use strict";
  var $10 = require_export();
  var isObject3 = require_is_object();
  var isArray2 = require_is_array();
  var toAbsoluteIndex = require_to_absolute_index();
  var toLength = require_to_length();
  var toIndexedObject4 = require_to_indexed_object();
  var createProperty2 = require_create_property();
  var wellKnownSymbol2 = require_well_known_symbol();
  var arrayMethodHasSpeciesSupport2 = require_array_method_has_species_support();
  var HAS_SPECIES_SUPPORT2 = arrayMethodHasSpeciesSupport2("slice");
  var SPECIES = wellKnownSymbol2("species");
  var nativeSlice = [].slice;
  var max = Math.max;
  $10({ target: "Array", proto: true, forced: !HAS_SPECIES_SUPPORT2 }, {
    slice: function slice(start, end) {
      var O = toIndexedObject4(this);
      var length2 = toLength(O.length);
      var k = toAbsoluteIndex(start, length2);
      var fin = toAbsoluteIndex(end === void 0 ? length2 : end, length2);
      var Constructor, result, n;
      if (isArray2(O)) {
        Constructor = O.constructor;
        if (typeof Constructor == "function" && (Constructor === Array || isArray2(Constructor.prototype))) {
          Constructor = void 0;
        } else if (isObject3(Constructor)) {
          Constructor = Constructor[SPECIES];
          if (Constructor === null)
            Constructor = void 0;
        }
        if (Constructor === Array || Constructor === void 0) {
          return nativeSlice.call(O, k, fin);
        }
      }
      result = new (Constructor === void 0 ? Array : Constructor)(max(fin - k, 0));
      for (n = 0; k < fin; k++, n++)
        if (k in O)
          createProperty2(result, n, O[k]);
      result.length = n;
      return result;
    }
  });

  // node_modules/core-js/modules/es.object.freeze.js
  var $11 = require_export();
  var FREEZING = require_freezing();
  var fails4 = require_fails();
  var isObject4 = require_is_object();
  var onFreeze = require_internal_metadata().onFreeze;
  var $freeze = Object.freeze;
  var FAILS_ON_PRIMITIVES3 = fails4(function() {
    $freeze(1);
  });
  $11({ target: "Object", stat: true, forced: FAILS_ON_PRIMITIVES3, sham: !FREEZING }, {
    freeze: function freeze(it) {
      return $freeze && isObject4(it) ? $freeze(onFreeze(it)) : it;
    }
  });

  // node_modules/core-js/modules/es.array.is-array.js
  var $12 = require_export();
  var isArray3 = require_is_array();
  $12({ target: "Array", stat: true }, {
    isArray: isArray3
  });

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

  // Layout_Editor.ts
  var import_es_array_iterator14 = __toModule(require_es_array_iterator());

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
  var $13 = require_export();
  var from = require_array_from();
  var checkCorrectnessOfIteration = require_check_correctness_of_iteration();
  var INCORRECT_ITERATION = !checkCorrectnessOfIteration(function(iterable) {
    Array.from(iterable);
  });
  $13({ target: "Array", stat: true, forced: INCORRECT_ITERATION }, {
    from: from
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

  // Layout_Editor.ts
  var import_es_regexp_exec10 = __toModule(require_es_regexp_exec());

  // node_modules/core-js/modules/es.string.split.js
  "use strict";
  var fixRegExpWellKnownSymbolLogic = require_fix_regexp_well_known_symbol_logic();
  var isRegExp = require_is_regexp();
  var anObject2 = require_an_object();
  var requireObjectCoercible = require_require_object_coercible();
  var speciesConstructor = require_species_constructor();
  var advanceStringIndex = require_advance_string_index();
  var toLength2 = require_to_length();
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
        var match2, lastIndex, lastLength;
        while (match2 = regexpExec.call(separatorCopy, string)) {
          lastIndex = separatorCopy.lastIndex;
          if (lastIndex > lastLastIndex) {
            output.push(string.slice(lastLastIndex, match2.index));
            if (match2.length > 1 && match2.index < string.length)
              arrayPush.apply(output, match2.slice(1));
            lastLength = match2[0].length;
            lastLastIndex = lastIndex;
            if (output.length >= lim)
              break;
          }
          if (separatorCopy.lastIndex === match2.index)
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
        var rx = anObject2(regexp);
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
          if (z === null || (e = min(toLength2(splitter.lastIndex + (UNSUPPORTED_Y ? q : 0)), S.length)) === p) {
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

  // node_modules/core-js/modules/es.array.find.js
  "use strict";
  var $14 = require_export();
  var $find = require_array_iteration().find;
  var addToUnscopables = require_add_to_unscopables();
  var FIND = "find";
  var SKIPS_HOLES = true;
  if (FIND in [])
    Array(1)[FIND](function() {
      SKIPS_HOLES = false;
    });
  $14({ target: "Array", proto: true, forced: SKIPS_HOLES }, {
    find: function find(callbackfn) {
      return $find(this, callbackfn, arguments.length > 1 ? arguments[1] : void 0);
    }
  });
  addToUnscopables(FIND);

  // node_modules/core-js/modules/es.array.map.js
  "use strict";
  var $15 = require_export();
  var $map = require_array_iteration().map;
  var arrayMethodHasSpeciesSupport3 = require_array_method_has_species_support();
  var HAS_SPECIES_SUPPORT3 = arrayMethodHasSpeciesSupport3("map");
  $15({ target: "Array", proto: true, forced: !HAS_SPECIES_SUPPORT3 }, {
    map: function map(callbackfn) {
      return $map(this, callbackfn, arguments.length > 1 ? arguments[1] : void 0);
    }
  });

  // node_modules/core-js/modules/es.string.replace.js
  "use strict";
  var fixRegExpWellKnownSymbolLogic2 = require_fix_regexp_well_known_symbol_logic();
  var anObject3 = require_an_object();
  var toLength3 = require_to_length();
  var toInteger = require_to_integer();
  var requireObjectCoercible2 = require_require_object_coercible();
  var advanceStringIndex2 = require_advance_string_index();
  var getSubstitution = require_get_substitution();
  var regExpExec = require_regexp_exec_abstract();
  var max2 = Math.max;
  var min2 = Math.min;
  var maybeToString = function(it) {
    return it === void 0 ? it : String(it);
  };
  fixRegExpWellKnownSymbolLogic2("replace", 2, function(REPLACE, nativeReplace, maybeCallNative, reason) {
    var REGEXP_REPLACE_SUBSTITUTES_UNDEFINED_CAPTURE = reason.REGEXP_REPLACE_SUBSTITUTES_UNDEFINED_CAPTURE;
    var REPLACE_KEEPS_$0 = reason.REPLACE_KEEPS_$0;
    var UNSAFE_SUBSTITUTE = REGEXP_REPLACE_SUBSTITUTES_UNDEFINED_CAPTURE ? "$" : "$0";
    return [
      function replace2(searchValue, replaceValue) {
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
        var rx = anObject3(regexp);
        var S = String(this);
        var functionalReplace = typeof replaceValue === "function";
        if (!functionalReplace)
          replaceValue = String(replaceValue);
        var global8 = rx.global;
        if (global8) {
          var fullUnicode = rx.unicode;
          rx.lastIndex = 0;
        }
        var results = [];
        while (true) {
          var result = regExpExec(rx, S);
          if (result === null)
            break;
          results.push(result);
          if (!global8)
            break;
          var matchStr = String(result[0]);
          if (matchStr === "")
            rx.lastIndex = advanceStringIndex2(S, toLength3(rx.lastIndex), fullUnicode);
        }
        var accumulatedResult = "";
        var nextSourcePosition = 0;
        for (var i = 0; i < results.length; i++) {
          result = results[i];
          var matched = String(result[0]);
          var position2 = max2(min2(toInteger(result.index), S.length), 0);
          var captures = [];
          for (var j = 1; j < result.length; j++)
            captures.push(maybeToString(result[j]));
          var namedCaptures = result.groups;
          if (functionalReplace) {
            var replacerArgs = [matched].concat(captures, position2, S);
            if (namedCaptures !== void 0)
              replacerArgs.push(namedCaptures);
            var replacement = String(replaceValue.apply(void 0, replacerArgs));
          } else {
            replacement = getSubstitution(matched, S, position2, captures, namedCaptures, replaceValue);
          }
          if (position2 >= nextSourcePosition) {
            accumulatedResult += S.slice(nextSourcePosition, position2) + replacement;
            nextSourcePosition = position2 + matched.length;
          }
        }
        return accumulatedResult + S.slice(nextSourcePosition);
      }
    ];
  });

  // node_modules/core-js/modules/es.array.find-index.js
  "use strict";
  var $16 = require_export();
  var $findIndex = require_array_iteration().findIndex;
  var addToUnscopables2 = require_add_to_unscopables();
  var FIND_INDEX = "findIndex";
  var SKIPS_HOLES2 = true;
  if (FIND_INDEX in [])
    Array(1)[FIND_INDEX](function() {
      SKIPS_HOLES2 = false;
    });
  $16({ target: "Array", proto: true, forced: SKIPS_HOLES2 }, {
    findIndex: function findIndex(callbackfn) {
      return $findIndex(this, callbackfn, arguments.length > 1 ? arguments[1] : void 0);
    }
  });
  addToUnscopables2(FIND_INDEX);

  // node_modules/core-js/modules/es.array.splice.js
  "use strict";
  var $17 = require_export();
  var toAbsoluteIndex2 = require_to_absolute_index();
  var toInteger2 = require_to_integer();
  var toLength4 = require_to_length();
  var toObject3 = require_to_object();
  var arraySpeciesCreate = require_array_species_create();
  var createProperty3 = require_create_property();
  var arrayMethodHasSpeciesSupport4 = require_array_method_has_species_support();
  var HAS_SPECIES_SUPPORT4 = arrayMethodHasSpeciesSupport4("splice");
  var max3 = Math.max;
  var min3 = Math.min;
  var MAX_SAFE_INTEGER = 9007199254740991;
  var MAXIMUM_ALLOWED_LENGTH_EXCEEDED = "Maximum allowed length exceeded";
  $17({ target: "Array", proto: true, forced: !HAS_SPECIES_SUPPORT4 }, {
    splice: function splice(start, deleteCount) {
      var O = toObject3(this);
      var len = toLength4(O.length);
      var actualStart = toAbsoluteIndex2(start, len);
      var argumentsLength = arguments.length;
      var insertCount, actualDeleteCount, A, k, from3, to;
      if (argumentsLength === 0) {
        insertCount = actualDeleteCount = 0;
      } else if (argumentsLength === 1) {
        insertCount = 0;
        actualDeleteCount = len - actualStart;
      } else {
        insertCount = argumentsLength - 2;
        actualDeleteCount = min3(max3(toInteger2(deleteCount), 0), len - actualStart);
      }
      if (len + insertCount - actualDeleteCount > MAX_SAFE_INTEGER) {
        throw TypeError(MAXIMUM_ALLOWED_LENGTH_EXCEEDED);
      }
      A = arraySpeciesCreate(O, actualDeleteCount);
      for (k = 0; k < actualDeleteCount; k++) {
        from3 = actualStart + k;
        if (from3 in O)
          createProperty3(A, k, O[from3]);
      }
      A.length = actualDeleteCount;
      if (insertCount < actualDeleteCount) {
        for (k = actualStart; k < len - actualDeleteCount; k++) {
          from3 = k + actualDeleteCount;
          to = k + insertCount;
          if (from3 in O)
            O[to] = O[from3];
          else
            delete O[to];
        }
        for (k = len; k > len - actualDeleteCount + insertCount; k--)
          delete O[k - 1];
      } else if (insertCount > actualDeleteCount) {
        for (k = len - actualDeleteCount; k > actualStart; k--) {
          from3 = k + actualDeleteCount - 1;
          to = k + insertCount - 1;
          if (from3 in O)
            O[to] = O[from3];
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

  // node_modules/core-js/modules/es.object.assign.js
  var $18 = require_export();
  var assign = require_object_assign();
  $18({ target: "Object", stat: true, forced: Object.assign !== assign }, {
    assign: assign
  });

  // node_modules/core-js/modules/es.array.concat.js
  "use strict";
  var $19 = require_export();
  var fails5 = require_fails();
  var isArray4 = require_is_array();
  var isObject5 = require_is_object();
  var toObject4 = require_to_object();
  var toLength5 = require_to_length();
  var createProperty4 = require_create_property();
  var arraySpeciesCreate2 = require_array_species_create();
  var arrayMethodHasSpeciesSupport5 = require_array_method_has_species_support();
  var wellKnownSymbol4 = require_well_known_symbol();
  var V8_VERSION = require_engine_v8_version();
  var IS_CONCAT_SPREADABLE = wellKnownSymbol4("isConcatSpreadable");
  var MAX_SAFE_INTEGER2 = 9007199254740991;
  var MAXIMUM_ALLOWED_INDEX_EXCEEDED = "Maximum allowed index exceeded";
  var IS_CONCAT_SPREADABLE_SUPPORT = V8_VERSION >= 51 || !fails5(function() {
    var array = [];
    array[IS_CONCAT_SPREADABLE] = false;
    return array.concat()[0] !== array;
  });
  var SPECIES_SUPPORT = arrayMethodHasSpeciesSupport5("concat");
  var isConcatSpreadable = function(O) {
    if (!isObject5(O))
      return false;
    var spreadable = O[IS_CONCAT_SPREADABLE];
    return spreadable !== void 0 ? !!spreadable : isArray4(O);
  };
  var FORCED2 = !IS_CONCAT_SPREADABLE_SUPPORT || !SPECIES_SUPPORT;
  $19({ target: "Array", proto: true, forced: FORCED2 }, {
    concat: function concat(arg) {
      var O = toObject4(this);
      var A = arraySpeciesCreate2(O, 0);
      var n = 0;
      var i, k, length2, len, E;
      for (i = -1, length2 = arguments.length; i < length2; i++) {
        E = i === -1 ? O : arguments[i];
        if (isConcatSpreadable(E)) {
          len = toLength5(E.length);
          if (n + len > MAX_SAFE_INTEGER2)
            throw TypeError(MAXIMUM_ALLOWED_INDEX_EXCEEDED);
          for (k = 0; k < len; k++, n++)
            if (k in E)
              createProperty4(A, n, E[k]);
        } else {
          if (n >= MAX_SAFE_INTEGER2)
            throw TypeError(MAXIMUM_ALLOWED_INDEX_EXCEEDED);
          createProperty4(A, n++, E);
        }
      }
      A.length = n;
      return A;
    }
  });

  // node_modules/core-js/modules/web.timers.js
  var $20 = require_export();
  var global6 = require_global();
  var userAgent = require_engine_user_agent();
  var slice2 = [].slice;
  var MSIE = /MSIE .\./.test(userAgent);
  var wrap2 = function(scheduler) {
    return function(handler, timeout) {
      var boundArgs = arguments.length > 2;
      var args = boundArgs ? slice2.call(arguments, 2) : void 0;
      return scheduler(boundArgs ? function() {
        (typeof handler == "function" ? handler : Function(handler)).apply(this, args);
      } : handler, timeout);
    };
  };
  $20({ global: true, bind: true, forced: MSIE }, {
    setTimeout: wrap2(global6.setTimeout),
    setInterval: wrap2(global6.setInterval)
  });

  // node_modules/core-js/modules/es.string.match.js
  "use strict";
  var fixRegExpWellKnownSymbolLogic3 = require_fix_regexp_well_known_symbol_logic();
  var anObject4 = require_an_object();
  var toLength6 = require_to_length();
  var requireObjectCoercible3 = require_require_object_coercible();
  var advanceStringIndex3 = require_advance_string_index();
  var regExpExec2 = require_regexp_exec_abstract();
  fixRegExpWellKnownSymbolLogic3("match", 1, function(MATCH, nativeMatch, maybeCallNative) {
    return [
      function match2(regexp) {
        var O = requireObjectCoercible3(this);
        var matcher = regexp == void 0 ? void 0 : regexp[MATCH];
        return matcher !== void 0 ? matcher.call(regexp, O) : new RegExp(regexp)[MATCH](String(O));
      },
      function(regexp) {
        var res = maybeCallNative(nativeMatch, regexp, this);
        if (res.done)
          return res.value;
        var rx = anObject4(regexp);
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
            rx.lastIndex = advanceStringIndex3(S, toLength6(rx.lastIndex), fullUnicode);
          n++;
        }
        return n === 0 ? null : A;
      }
    ];
  });

  // node_modules/core-js/modules/es.array.reduce.js
  "use strict";
  var $21 = require_export();
  var $reduce = require_array_reduce().left;
  var arrayMethodIsStrict = require_array_method_is_strict();
  var CHROME_VERSION = require_engine_v8_version();
  var IS_NODE = require_engine_is_node();
  var STRICT_METHOD = arrayMethodIsStrict("reduce");
  var CHROME_BUG = !IS_NODE && CHROME_VERSION > 79 && CHROME_VERSION < 83;
  $21({ target: "Array", proto: true, forced: !STRICT_METHOD || CHROME_BUG }, {
    reduce: function reduce(callbackfn) {
      return $reduce(this, callbackfn, arguments.length, arguments.length > 1 ? arguments[1] : void 0);
    }
  });

  // node_modules/@emotion/cache/dist/emotion-cache.browser.esm.js
  var import_es_array_iterator2 = __toModule(require_es_array_iterator());
  var import_es_weak_map2 = __toModule(require_es_weak_map());
  var import_es_regexp_exec2 = __toModule(require_es_regexp_exec());

  // node_modules/core-js/modules/es.array.index-of.js
  "use strict";
  var $22 = require_export();
  var $indexOf = require_array_includes().indexOf;
  var arrayMethodIsStrict2 = require_array_method_is_strict();
  var nativeIndexOf = [].indexOf;
  var NEGATIVE_ZERO = !!nativeIndexOf && 1 / [1].indexOf(1, -0) < 0;
  var STRICT_METHOD2 = arrayMethodIsStrict2("indexOf");
  $22({ target: "Array", proto: true, forced: NEGATIVE_ZERO || !STRICT_METHOD2 }, {
    indexOf: function indexOf(searchElement) {
      return NEGATIVE_ZERO ? nativeIndexOf.apply(this, arguments) || 0 : $indexOf(this, searchElement, arguments.length > 1 ? arguments[1] : void 0);
    }
  });

  // node_modules/@emotion/sheet/dist/emotion-sheet.browser.esm.js
  function sheetForTag(tag) {
    if (tag.sheet) {
      return tag.sheet;
    }
    for (var i = 0; i < document.styleSheets.length; i++) {
      if (document.styleSheets[i].ownerNode === tag) {
        return document.styleSheets[i];
      }
    }
  }
  function createStyleElement(options) {
    var tag = document.createElement("style");
    tag.setAttribute("data-emotion", options.key);
    if (options.nonce !== void 0) {
      tag.setAttribute("nonce", options.nonce);
    }
    tag.appendChild(document.createTextNode(""));
    tag.setAttribute("data-s", "");
    return tag;
  }
  var StyleSheet = /* @__PURE__ */ function() {
    function StyleSheet2(options) {
      var _this = this;
      this._insertTag = function(tag) {
        var before;
        if (_this.tags.length === 0) {
          before = _this.prepend ? _this.container.firstChild : _this.before;
        } else {
          before = _this.tags[_this.tags.length - 1].nextSibling;
        }
        _this.container.insertBefore(tag, before);
        _this.tags.push(tag);
      };
      this.isSpeedy = options.speedy === void 0 ? false : options.speedy;
      this.tags = [];
      this.ctr = 0;
      this.nonce = options.nonce;
      this.key = options.key;
      this.container = options.container;
      this.prepend = options.prepend;
      this.before = null;
    }
    var _proto = StyleSheet2.prototype;
    _proto.hydrate = function hydrate2(nodes) {
      nodes.forEach(this._insertTag);
    };
    _proto.insert = function insert(rule) {
      if (this.ctr % (this.isSpeedy ? 65e3 : 1) === 0) {
        this._insertTag(createStyleElement(this));
      }
      var tag = this.tags[this.tags.length - 1];
      if (true) {
        var isImportRule3 = rule.charCodeAt(0) === 64 && rule.charCodeAt(1) === 105;
        if (isImportRule3 && this._alreadyInsertedOrderInsensitiveRule) {
          console.error("You're attempting to insert the following rule:\n" + rule + "\n\n`@import` rules must be before all other types of rules in a stylesheet but other rules have already been inserted. Please ensure that `@import` rules are before all other rules.");
        }
        this._alreadyInsertedOrderInsensitiveRule = this._alreadyInsertedOrderInsensitiveRule || !isImportRule3;
      }
      if (this.isSpeedy) {
        var sheet2 = sheetForTag(tag);
        try {
          sheet2.insertRule(rule, sheet2.cssRules.length);
        } catch (e) {
          if (!/:(-moz-placeholder|-ms-input-placeholder|-moz-read-write|-moz-read-only){/.test(rule)) {
            console.error('There was a problem inserting the following rule: "' + rule + '"', e);
          }
        }
      } else {
        tag.appendChild(document.createTextNode(rule));
      }
      this.ctr++;
    };
    _proto.flush = function flush2() {
      this.tags.forEach(function(tag) {
        return tag.parentNode.removeChild(tag);
      });
      this.tags = [];
      this.ctr = 0;
      if (true) {
        this._alreadyInsertedOrderInsensitiveRule = false;
      }
    };
    return StyleSheet2;
  }();

  // node_modules/stylis/src/Enum.js
  var MS = "-ms-";
  var MOZ = "-moz-";
  var WEBKIT = "-webkit-";
  var COMMENT = "comm";
  var RULESET = "rule";
  var DECLARATION = "decl";
  var IMPORT = "@import";
  var KEYFRAMES = "@keyframes";

  // node_modules/core-js/modules/es.string.trim.js
  "use strict";
  var $23 = require_export();
  var $trim = require_string_trim().trim;
  var forcedStringTrimMethod = require_string_trim_forced();
  $23({ target: "String", proto: true, forced: forcedStringTrimMethod("trim") }, {
    trim: function trim() {
      return $trim(this);
    }
  });

  // node_modules/stylis/src/Utility.js
  var import_es_regexp_exec = __toModule(require_es_regexp_exec());

  // node_modules/core-js/modules/es.array.join.js
  "use strict";
  var $24 = require_export();
  var IndexedObject = require_indexed_object();
  var toIndexedObject5 = require_to_indexed_object();
  var arrayMethodIsStrict3 = require_array_method_is_strict();
  var nativeJoin = [].join;
  var ES3_STRINGS = IndexedObject != Object;
  var STRICT_METHOD3 = arrayMethodIsStrict3("join", ",");
  $24({ target: "Array", proto: true, forced: ES3_STRINGS || !STRICT_METHOD3 }, {
    join: function join(separator) {
      return nativeJoin.call(toIndexedObject5(this), separator === void 0 ? "," : separator);
    }
  });

  // node_modules/stylis/src/Utility.js
  var abs = Math.abs;
  var from2 = String.fromCharCode;
  function hash(value, length2) {
    return (((length2 << 2 ^ charat(value, 0)) << 2 ^ charat(value, 1)) << 2 ^ charat(value, 2)) << 2 ^ charat(value, 3);
  }
  function trim2(value) {
    return value.trim();
  }
  function match(value, pattern) {
    return (value = pattern.exec(value)) ? value[0] : value;
  }
  function replace(value, pattern, replacement) {
    return value.replace(pattern, replacement);
  }
  function indexof(value, search) {
    return value.indexOf(search);
  }
  function charat(value, index) {
    return value.charCodeAt(index) | 0;
  }
  function substr(value, begin, end) {
    return value.slice(begin, end);
  }
  function strlen(value) {
    return value.length;
  }
  function sizeof(value) {
    return value.length;
  }
  function append(value, array) {
    return array.push(value), value;
  }
  function combine(array, callback) {
    return array.map(callback).join("");
  }

  // node_modules/stylis/src/Tokenizer.js
  var line = 1;
  var column = 1;
  var length = 0;
  var position = 0;
  var character = 0;
  var characters = "";
  function node(value, root, parent, type, props, children, length2) {
    return {
      value: value,
      root: root,
      parent: parent,
      type: type,
      props: props,
      children: children,
      line: line,
      column: column,
      length: length2,
      "return": ""
    };
  }
  function copy(value, root, type) {
    return node(value, root.root, root.parent, type, root.props, root.children, 0);
  }
  function _char() {
    return character;
  }
  function prev() {
    character = position > 0 ? charat(characters, --position) : 0;
    if (column--, character === 10)
      column = 1, line--;
    return character;
  }
  function next2() {
    character = position < length ? charat(characters, position++) : 0;
    if (column++, character === 10)
      column = 1, line++;
    return character;
  }
  function peek() {
    return charat(characters, position);
  }
  function caret() {
    return position;
  }
  function slice3(begin, end) {
    return substr(characters, begin, end);
  }
  function token(type) {
    switch (type) {
      case 0:
      case 9:
      case 10:
      case 13:
      case 32:
        return 5;
      case 33:
      case 43:
      case 44:
      case 47:
      case 62:
      case 64:
      case 126:
      case 59:
      case 123:
      case 125:
        return 4;
      case 58:
        return 3;
      case 34:
      case 39:
      case 40:
      case 91:
        return 2;
      case 41:
      case 93:
        return 1;
    }
    return 0;
  }
  function alloc(value) {
    return line = column = 1, length = strlen(characters = value), position = 0, [];
  }
  function dealloc(value) {
    return characters = "", value;
  }
  function delimit(type) {
    return trim2(slice3(position - 1, delimiter(type === 91 ? type + 2 : type === 40 ? type + 1 : type)));
  }
  function whitespace(type) {
    while (character = peek()) {
      if (character < 33)
        next2();
      else
        break;
    }
    return token(type) > 2 || token(character) > 3 ? "" : " ";
  }
  function escaping(index, count) {
    while (--count && next2()) {
      if (character < 48 || character > 102 || character > 57 && character < 65 || character > 70 && character < 97)
        break;
    }
    return slice3(index, caret() + (count < 6 && peek() == 32 && next2() == 32));
  }
  function delimiter(type) {
    while (next2()) {
      switch (character) {
        case type:
          return position;
        case 34:
        case 39:
          return delimiter(type === 34 || type === 39 ? type : character);
        case 40:
          if (type === 41)
            delimiter(type);
          break;
        case 92:
          next2();
          break;
      }
    }
    return position;
  }
  function commenter(type, index) {
    while (next2()) {
      if (type + character === 47 + 10)
        break;
      else if (type + character === 42 + 42 && peek() === 47)
        break;
    }
    return "/*" + slice3(index, position - 1) + "*" + from2(type === 47 ? type : next2());
  }
  function identifier(index) {
    while (!token(peek())) {
      next2();
    }
    return slice3(index, position);
  }

  // node_modules/stylis/src/Parser.js
  function compile(value) {
    return dealloc(parse("", null, null, null, [""], value = alloc(value), 0, [0], value));
  }
  function parse(value, root, parent, rule, rules, rulesets, pseudo, points, declarations) {
    var index = 0;
    var offset = 0;
    var length2 = pseudo;
    var atrule = 0;
    var property = 0;
    var previous = 0;
    var variable = 1;
    var scanning = 1;
    var ampersand = 1;
    var character2 = 0;
    var type = "";
    var props = rules;
    var children = rulesets;
    var reference = rule;
    var characters2 = type;
    while (scanning) {
      switch (previous = character2, character2 = next2()) {
        case 34:
        case 39:
        case 91:
        case 40:
          characters2 += delimit(character2);
          break;
        case 9:
        case 10:
        case 13:
        case 32:
          characters2 += whitespace(previous);
          break;
        case 92:
          characters2 += escaping(caret() - 1, 7);
          continue;
        case 47:
          switch (peek()) {
            case 42:
            case 47:
              append(comment(commenter(next2(), caret()), root, parent), declarations);
              break;
            default:
              characters2 += "/";
          }
          break;
        case 123 * variable:
          points[index++] = strlen(characters2) * ampersand;
        case 125 * variable:
        case 59:
        case 0:
          switch (character2) {
            case 0:
            case 125:
              scanning = 0;
            case 59 + offset:
              if (property > 0 && strlen(characters2) - length2)
                append(property > 32 ? declaration(characters2 + ";", rule, parent, length2 - 1) : declaration(replace(characters2, " ", "") + ";", rule, parent, length2 - 2), declarations);
              break;
            case 59:
              characters2 += ";";
            default:
              append(reference = ruleset(characters2, root, parent, index, offset, rules, points, type, props = [], children = [], length2), rulesets);
              if (character2 === 123)
                if (offset === 0)
                  parse(characters2, root, reference, reference, props, rulesets, length2, points, children);
                else
                  switch (atrule) {
                    case 100:
                    case 109:
                    case 115:
                      parse(value, reference, reference, rule && append(ruleset(value, reference, reference, 0, 0, rules, points, type, rules, props = [], length2), children), rules, children, length2, points, rule ? props : children);
                      break;
                    default:
                      parse(characters2, reference, reference, reference, [""], children, length2, points, children);
                  }
          }
          index = offset = property = 0, variable = ampersand = 1, type = characters2 = "", length2 = pseudo;
          break;
        case 58:
          length2 = 1 + strlen(characters2), property = previous;
        default:
          if (variable < 1) {
            if (character2 == 123)
              --variable;
            else if (character2 == 125 && variable++ == 0 && prev() == 125)
              continue;
          }
          switch (characters2 += from2(character2), character2 * variable) {
            case 38:
              ampersand = offset > 0 ? 1 : (characters2 += "\f", -1);
              break;
            case 44:
              points[index++] = (strlen(characters2) - 1) * ampersand, ampersand = 1;
              break;
            case 64:
              if (peek() === 45)
                characters2 += delimit(next2());
              atrule = peek(), offset = strlen(type = characters2 += identifier(caret())), character2++;
              break;
            case 45:
              if (previous === 45 && strlen(characters2) == 2)
                variable = 0;
          }
      }
    }
    return rulesets;
  }
  function ruleset(value, root, parent, index, offset, rules, points, type, props, children, length2) {
    var post = offset - 1;
    var rule = offset === 0 ? rules : [""];
    var size = sizeof(rule);
    for (var i = 0, j = 0, k = 0; i < index; ++i) {
      for (var x = 0, y = substr(value, post + 1, post = abs(j = points[i])), z = value; x < size; ++x) {
        if (z = trim2(j > 0 ? rule[x] + " " + y : replace(y, /&\f/g, rule[x])))
          props[k++] = z;
      }
    }
    return node(value, root, parent, offset === 0 ? RULESET : type, props, children, length2);
  }
  function comment(value, root, parent) {
    return node(value, root, parent, COMMENT, from2(_char()), substr(value, 2, -2), 0);
  }
  function declaration(value, root, parent, length2) {
    return node(value, root, parent, DECLARATION, substr(value, 0, length2), substr(value, length2 + 1, -1), length2);
  }

  // node_modules/stylis/src/Prefixer.js
  function prefix(value, length2) {
    switch (hash(value, length2)) {
      case 5103:
        return WEBKIT + "print-" + value + value;
      case 5737:
      case 4201:
      case 3177:
      case 3433:
      case 1641:
      case 4457:
      case 2921:
      case 5572:
      case 6356:
      case 5844:
      case 3191:
      case 6645:
      case 3005:
      case 6391:
      case 5879:
      case 5623:
      case 6135:
      case 4599:
      case 4855:
      case 4215:
      case 6389:
      case 5109:
      case 5365:
      case 5621:
      case 3829:
        return WEBKIT + value + value;
      case 5349:
      case 4246:
      case 4810:
      case 6968:
      case 2756:
        return WEBKIT + value + MOZ + value + MS + value + value;
      case 6828:
      case 4268:
        return WEBKIT + value + MS + value + value;
      case 6165:
        return WEBKIT + value + MS + "flex-" + value + value;
      case 5187:
        return WEBKIT + value + replace(value, /(\w+).+(:[^]+)/, WEBKIT + "box-$1$2" + MS + "flex-$1$2") + value;
      case 5443:
        return WEBKIT + value + MS + "flex-item-" + replace(value, /flex-|-self/, "") + value;
      case 4675:
        return WEBKIT + value + MS + "flex-line-pack" + replace(value, /align-content|flex-|-self/, "") + value;
      case 5548:
        return WEBKIT + value + MS + replace(value, "shrink", "negative") + value;
      case 5292:
        return WEBKIT + value + MS + replace(value, "basis", "preferred-size") + value;
      case 6060:
        return WEBKIT + "box-" + replace(value, "-grow", "") + WEBKIT + value + MS + replace(value, "grow", "positive") + value;
      case 4554:
        return WEBKIT + replace(value, /([^-])(transform)/g, "$1" + WEBKIT + "$2") + value;
      case 6187:
        return replace(replace(replace(value, /(zoom-|grab)/, WEBKIT + "$1"), /(image-set)/, WEBKIT + "$1"), value, "") + value;
      case 5495:
      case 3959:
        return replace(value, /(image-set\([^]*)/, WEBKIT + "$1$`$1");
      case 4968:
        return replace(replace(value, /(.+:)(flex-)?(.*)/, WEBKIT + "box-pack:$3" + MS + "flex-pack:$3"), /s.+-b[^;]+/, "justify") + WEBKIT + value + value;
      case 4095:
      case 3583:
      case 4068:
      case 2532:
        return replace(value, /(.+)-inline(.+)/, WEBKIT + "$1$2") + value;
      case 8116:
      case 7059:
      case 5753:
      case 5535:
      case 5445:
      case 5701:
      case 4933:
      case 4677:
      case 5533:
      case 5789:
      case 5021:
      case 4765:
        if (strlen(value) - 1 - length2 > 6)
          switch (charat(value, length2 + 1)) {
            case 109:
              if (charat(value, length2 + 4) !== 45)
                break;
            case 102:
              return replace(value, /(.+:)(.+)-([^]+)/, "$1" + WEBKIT + "$2-$3$1" + MOZ + (charat(value, length2 + 3) == 108 ? "$3" : "$2-$3")) + value;
            case 115:
              return ~indexof(value, "stretch") ? prefix(replace(value, "stretch", "fill-available"), length2) + value : value;
          }
        break;
      case 4949:
        if (charat(value, length2 + 1) !== 115)
          break;
      case 6444:
        switch (charat(value, strlen(value) - 3 - (~indexof(value, "!important") && 10))) {
          case 107:
            return replace(value, ":", ":" + WEBKIT) + value;
          case 101:
            return replace(value, /(.+:)([^;!]+)(;|!.+)?/, "$1" + WEBKIT + (charat(value, 14) === 45 ? "inline-" : "") + "box$3$1" + WEBKIT + "$2$3$1" + MS + "$2box$3") + value;
        }
        break;
      case 5936:
        switch (charat(value, length2 + 11)) {
          case 114:
            return WEBKIT + value + MS + replace(value, /[svh]\w+-[tblr]{2}/, "tb") + value;
          case 108:
            return WEBKIT + value + MS + replace(value, /[svh]\w+-[tblr]{2}/, "tb-rl") + value;
          case 45:
            return WEBKIT + value + MS + replace(value, /[svh]\w+-[tblr]{2}/, "lr") + value;
        }
        return WEBKIT + value + MS + value + value;
    }
    return value;
  }

  // node_modules/stylis/src/Serializer.js
  function serialize(children, callback) {
    var output = "";
    var length2 = sizeof(children);
    for (var i = 0; i < length2; i++) {
      output += callback(children[i], i, children, callback) || "";
    }
    return output;
  }
  function stringify(element, index, children, callback) {
    switch (element.type) {
      case IMPORT:
      case DECLARATION:
        return element["return"] = element["return"] || element.value;
      case COMMENT:
        return "";
      case RULESET:
        element.value = element.props.join(",");
    }
    return strlen(children = serialize(element.children, callback)) ? element["return"] = element.value + "{" + children + "}" : "";
  }

  // node_modules/stylis/src/Middleware.js
  function middleware(collection) {
    var length2 = sizeof(collection);
    return function(element, index, children, callback) {
      var output = "";
      for (var i = 0; i < length2; i++) {
        output += collection[i](element, index, children, callback) || "";
      }
      return output;
    };
  }
  function prefixer(element, index, children, callback) {
    if (!element["return"])
      switch (element.type) {
        case DECLARATION:
          element["return"] = prefix(element.value, element.length);
          break;
        case KEYFRAMES:
          return serialize([copy(replace(element.value, "@", "@" + WEBKIT), element, "")], callback);
        case RULESET:
          if (element.length)
            return combine(element.props, function(value) {
              switch (match(value, /(::plac\w+|:read-\w+)/)) {
                case ":read-only":
                case ":read-write":
                  return serialize([copy(replace(value, /:(read-\w+)/, ":" + MOZ + "$1"), element, "")], callback);
                case "::placeholder":
                  return serialize([copy(replace(value, /:(plac\w+)/, ":" + WEBKIT + "input-$1"), element, ""), copy(replace(value, /:(plac\w+)/, ":" + MOZ + "$1"), element, ""), copy(replace(value, /:(plac\w+)/, MS + "input-$1"), element, "")], callback);
              }
              return "";
            });
      }
  }

  // node_modules/@emotion/weak-memoize/dist/weak-memoize.browser.esm.js
  var import_es_array_iterator = __toModule(require_es_array_iterator());
  var import_es_weak_map = __toModule(require_es_weak_map());

  // node_modules/core-js/modules/es.object.create.js
  var $25 = require_export();
  var DESCRIPTORS8 = require_descriptors();
  var create2 = require_object_create();
  $25({ target: "Object", stat: true, sham: !DESCRIPTORS8 }, {
    create: create2
  });

  // node_modules/@emotion/memoize/dist/emotion-memoize.browser.esm.js
  function memoize(fn) {
    var cache2 = Object.create(null);
    return function(arg) {
      if (cache2[arg] === void 0)
        cache2[arg] = fn(arg);
      return cache2[arg];
    };
  }
  var emotion_memoize_browser_esm_default = memoize;

  // node_modules/@emotion/cache/dist/emotion-cache.browser.esm.js
  var last = function last2(arr) {
    return arr.length ? arr[arr.length - 1] : null;
  };
  var toRules = function toRules2(parsed, points) {
    var index = -1;
    var character2 = 44;
    do {
      switch (token(character2)) {
        case 0:
          if (character2 === 38 && peek() === 12) {
            points[index] = 1;
          }
          parsed[index] += identifier(position - 1);
          break;
        case 2:
          parsed[index] += delimit(character2);
          break;
        case 4:
          if (character2 === 44) {
            parsed[++index] = peek() === 58 ? "&\f" : "";
            points[index] = parsed[index].length;
            break;
          }
        default:
          parsed[index] += from2(character2);
      }
    } while (character2 = next2());
    return parsed;
  };
  var getRules = function getRules2(value, points) {
    return dealloc(toRules(alloc(value), points));
  };
  var fixedElements = /* @__PURE__ */ new WeakMap();
  var compat = function compat2(element) {
    if (element.type !== "rule" || !element.parent || !element.length) {
      return;
    }
    var value = element.value, parent = element.parent;
    var isImplicitRule = element.column === parent.column && element.line === parent.line;
    while (parent.type !== "rule") {
      parent = parent.parent;
      if (!parent)
        return;
    }
    if (element.props.length === 1 && value.charCodeAt(0) !== 58 && !fixedElements.get(parent)) {
      return;
    }
    if (isImplicitRule) {
      return;
    }
    fixedElements.set(element, true);
    var points = [];
    var rules = getRules(value, points);
    var parentRules = parent.props;
    for (var i = 0, k = 0; i < rules.length; i++) {
      for (var j = 0; j < parentRules.length; j++, k++) {
        element.props[k] = points[i] ? rules[i].replace(/&\f/g, parentRules[j]) : parentRules[j] + " " + rules[i];
      }
    }
  };
  var removeLabel = function removeLabel2(element) {
    if (element.type === "decl") {
      var value = element.value;
      if (value.charCodeAt(0) === 108 && value.charCodeAt(2) === 98) {
        element["return"] = "";
        element.value = "";
      }
    }
  };
  var ignoreFlag = "emotion-disable-server-rendering-unsafe-selector-warning-please-do-not-use-this-the-warning-exists-for-a-reason";
  var isIgnoringComment = function isIgnoringComment2(element) {
    return !!element && element.type === "comm" && element.children.indexOf(ignoreFlag) > -1;
  };
  var createUnsafeSelectorsAlarm = function createUnsafeSelectorsAlarm2(cache2) {
    return function(element, index, children) {
      if (element.type !== "rule")
        return;
      var unsafePseudoClasses = element.value.match(/(:first|:nth|:nth-last)-child/g);
      if (unsafePseudoClasses && cache2.compat !== true) {
        var prevElement = index > 0 ? children[index - 1] : null;
        if (prevElement && isIgnoringComment(last(prevElement.children))) {
          return;
        }
        unsafePseudoClasses.forEach(function(unsafePseudoClass) {
          console.error('The pseudo class "' + unsafePseudoClass + '" is potentially unsafe when doing server-side rendering. Try changing it to "' + unsafePseudoClass.split("-child")[0] + '-of-type".');
        });
      }
    };
  };
  var isImportRule = function isImportRule2(element) {
    return element.type.charCodeAt(1) === 105 && element.type.charCodeAt(0) === 64;
  };
  var isPrependedWithRegularRules = function isPrependedWithRegularRules2(index, children) {
    for (var i = index - 1; i >= 0; i--) {
      if (!isImportRule(children[i])) {
        return true;
      }
    }
    return false;
  };
  var nullifyElement = function nullifyElement2(element) {
    element.type = "";
    element.value = "";
    element["return"] = "";
    element.children = "";
    element.props = "";
  };
  var incorrectImportAlarm = function incorrectImportAlarm2(element, index, children) {
    if (!isImportRule(element)) {
      return;
    }
    if (element.parent) {
      console.error("`@import` rules can't be nested inside other rules. Please move it to the top level and put it before regular rules. Keep in mind that they can only be used within global styles.");
      nullifyElement(element);
    } else if (isPrependedWithRegularRules(index, children)) {
      console.error("`@import` rules can't be after other rules. Please put your `@import` rules before your other rules.");
      nullifyElement(element);
    }
  };
  var defaultStylisPlugins = [prefixer];
  var createCache = function createCache2(options) {
    var key = options.key;
    if (!key) {
      throw new Error("You have to configure `key` for your cache. Please make sure it's unique (and not equal to 'css') as it's used for linking styles to your cache.\nIf multiple caches share the same key they might \"fight\" for each other's style elements.");
    }
    if (key === "css") {
      var ssrStyles = document.querySelectorAll("style[data-emotion]:not([data-s])");
      Array.prototype.forEach.call(ssrStyles, function(node2) {
        var dataEmotionAttribute = node2.getAttribute("data-emotion");
        if (dataEmotionAttribute.indexOf(" ") === -1) {
          return;
        }
        document.head.appendChild(node2);
        node2.setAttribute("data-s", "");
      });
    }
    var stylisPlugins = options.stylisPlugins || defaultStylisPlugins;
    if (true) {
      if (/[^a-z-]/.test(key)) {
        throw new Error('Emotion key must only contain lower case alphabetical characters and - but "' + key + '" was passed');
      }
    }
    var inserted = {};
    var container;
    var nodesToHydrate = [];
    {
      container = options.container || document.head;
      Array.prototype.forEach.call(document.querySelectorAll('style[data-emotion^="' + key + ' "]'), function(node2) {
        var attrib = node2.getAttribute("data-emotion").split(" ");
        for (var i = 1; i < attrib.length; i++) {
          inserted[attrib[i]] = true;
        }
        nodesToHydrate.push(node2);
      });
    }
    var _insert;
    var omnipresentPlugins = [compat, removeLabel];
    if (true) {
      omnipresentPlugins.push(createUnsafeSelectorsAlarm({
        get compat() {
          return cache2.compat;
        }
      }), incorrectImportAlarm);
    }
    {
      var currentSheet;
      var finalizingPlugins = [stringify, true ? function(element) {
        if (!element.root) {
          if (element["return"]) {
            currentSheet.insert(element["return"]);
          } else if (element.value && element.type !== COMMENT) {
            currentSheet.insert(element.value + "{}");
          }
        }
      } : rulesheet(function(rule) {
        currentSheet.insert(rule);
      })];
      var serializer = middleware(omnipresentPlugins.concat(stylisPlugins, finalizingPlugins));
      var stylis = function stylis2(styles) {
        return serialize(compile(styles), serializer);
      };
      _insert = function insert(selector, serialized, sheet2, shouldCache) {
        currentSheet = sheet2;
        if (serialized.map !== void 0) {
          currentSheet = {
            insert: function insert2(rule) {
              sheet2.insert(rule + serialized.map);
            }
          };
        }
        stylis(selector ? selector + "{" + serialized.styles + "}" : serialized.styles);
        if (shouldCache) {
          cache2.inserted[serialized.name] = true;
        }
      };
    }
    var cache2 = {
      key: key,
      sheet: new StyleSheet({
        key: key,
        container: container,
        nonce: options.nonce,
        speedy: options.speedy,
        prepend: options.prepend
      }),
      nonce: options.nonce,
      inserted: inserted,
      registered: {},
      insert: _insert
    };
    cache2.sheet.hydrate(nodesToHydrate);
    return cache2;
  };
  var emotion_cache_browser_esm_default = createCache;

  // node_modules/@emotion/serialize/dist/emotion-serialize.browser.esm.js
  var import_es_regexp_exec3 = __toModule(require_es_regexp_exec());

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
  var fails6 = require_fails();
  var flags = require_regexp_flags();
  var TO_STRING2 = "toString";
  var RegExpPrototype = RegExp.prototype;
  var nativeToString = RegExpPrototype[TO_STRING2];
  var NOT_GENERIC = fails6(function() {
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

  // node_modules/@emotion/serialize/dist/emotion-serialize.browser.esm.js
  var import_es_array_iterator3 = __toModule(require_es_array_iterator());

  // node_modules/@emotion/hash/dist/hash.browser.esm.js
  function murmur2(str) {
    var h = 0;
    var k, i = 0, len = str.length;
    for (; len >= 4; ++i, len -= 4) {
      k = str.charCodeAt(i) & 255 | (str.charCodeAt(++i) & 255) << 8 | (str.charCodeAt(++i) & 255) << 16 | (str.charCodeAt(++i) & 255) << 24;
      k = (k & 65535) * 1540483477 + ((k >>> 16) * 59797 << 16);
      k ^= k >>> 24;
      h = (k & 65535) * 1540483477 + ((k >>> 16) * 59797 << 16) ^ (h & 65535) * 1540483477 + ((h >>> 16) * 59797 << 16);
    }
    switch (len) {
      case 3:
        h ^= (str.charCodeAt(i + 2) & 255) << 16;
      case 2:
        h ^= (str.charCodeAt(i + 1) & 255) << 8;
      case 1:
        h ^= str.charCodeAt(i) & 255;
        h = (h & 65535) * 1540483477 + ((h >>> 16) * 59797 << 16);
    }
    h ^= h >>> 13;
    h = (h & 65535) * 1540483477 + ((h >>> 16) * 59797 << 16);
    return ((h ^ h >>> 15) >>> 0).toString(36);
  }
  var hash_browser_esm_default = murmur2;

  // node_modules/@emotion/unitless/dist/unitless.browser.esm.js
  var unitlessKeys = {
    animationIterationCount: 1,
    borderImageOutset: 1,
    borderImageSlice: 1,
    borderImageWidth: 1,
    boxFlex: 1,
    boxFlexGroup: 1,
    boxOrdinalGroup: 1,
    columnCount: 1,
    columns: 1,
    flex: 1,
    flexGrow: 1,
    flexPositive: 1,
    flexShrink: 1,
    flexNegative: 1,
    flexOrder: 1,
    gridRow: 1,
    gridRowEnd: 1,
    gridRowSpan: 1,
    gridRowStart: 1,
    gridColumn: 1,
    gridColumnEnd: 1,
    gridColumnSpan: 1,
    gridColumnStart: 1,
    msGridRow: 1,
    msGridRowSpan: 1,
    msGridColumn: 1,
    msGridColumnSpan: 1,
    fontWeight: 1,
    lineHeight: 1,
    opacity: 1,
    order: 1,
    orphans: 1,
    tabSize: 1,
    widows: 1,
    zIndex: 1,
    zoom: 1,
    WebkitLineClamp: 1,
    fillOpacity: 1,
    floodOpacity: 1,
    stopOpacity: 1,
    strokeDasharray: 1,
    strokeDashoffset: 1,
    strokeMiterlimit: 1,
    strokeOpacity: 1,
    strokeWidth: 1
  };
  var unitless_browser_esm_default = unitlessKeys;

  // node_modules/@emotion/serialize/dist/emotion-serialize.browser.esm.js
  function _typeof(obj) {
    "@babel/helpers - typeof";
    if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
      _typeof = function _typeof8(obj2) {
        return typeof obj2;
      };
    } else {
      _typeof = function _typeof8(obj2) {
        return obj2 && typeof Symbol === "function" && obj2.constructor === Symbol && obj2 !== Symbol.prototype ? "symbol" : typeof obj2;
      };
    }
    return _typeof(obj);
  }
  var ILLEGAL_ESCAPE_SEQUENCE_ERROR = "You have illegal escape sequence in your template literal, most likely inside content's property value.\nBecause you write your CSS inside a JavaScript string you actually have to do double escaping, so for example \"content: '\\00d7';\" should become \"content: '\\\\00d7';\".\nYou can read more about this here:\nhttps://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals#ES2018_revision_of_illegal_escape_sequences";
  var UNDEFINED_AS_OBJECT_KEY_ERROR = "You have passed in falsy value as style object's key (can happen when in example you pass unexported component as computed key).";
  var hyphenateRegex = /[A-Z]|^ms/g;
  var animationRegex = /_EMO_([^_]+?)_([^]*?)_EMO_/g;
  var isCustomProperty = function isCustomProperty2(property) {
    return property.charCodeAt(1) === 45;
  };
  var isProcessableValue = function isProcessableValue2(value) {
    return value != null && typeof value !== "boolean";
  };
  var processStyleName = /* @__PURE__ */ emotion_memoize_browser_esm_default(function(styleName) {
    return isCustomProperty(styleName) ? styleName : styleName.replace(hyphenateRegex, "-$&").toLowerCase();
  });
  var processStyleValue = function processStyleValue2(key, value) {
    switch (key) {
      case "animation":
      case "animationName": {
        if (typeof value === "string") {
          return value.replace(animationRegex, function(match2, p1, p2) {
            cursor = {
              name: p1,
              styles: p2,
              next: cursor
            };
            return p1;
          });
        }
      }
    }
    if (unitless_browser_esm_default[key] !== 1 && !isCustomProperty(key) && typeof value === "number" && value !== 0) {
      return value + "px";
    }
    return value;
  };
  if (true) {
    contentValuePattern = /(attr|counters?|url|(((repeating-)?(linear|radial))|conic)-gradient)\(|(no-)?(open|close)-quote/;
    contentValues = ["normal", "none", "initial", "inherit", "unset"];
    oldProcessStyleValue = processStyleValue;
    msPattern = /^-ms-/;
    hyphenPattern = /-(.)/g;
    hyphenatedCache = {};
    processStyleValue = function processStyleValue3(key, value) {
      if (key === "content") {
        if (typeof value !== "string" || contentValues.indexOf(value) === -1 && !contentValuePattern.test(value) && (value.charAt(0) !== value.charAt(value.length - 1) || value.charAt(0) !== '"' && value.charAt(0) !== "'")) {
          throw new Error("You seem to be using a value for 'content' without quotes, try replacing it with `content: '\"" + value + "\"'`");
        }
      }
      var processed = oldProcessStyleValue(key, value);
      if (processed !== "" && !isCustomProperty(key) && key.indexOf("-") !== -1 && hyphenatedCache[key] === void 0) {
        hyphenatedCache[key] = true;
        console.error("Using kebab-case for css properties in objects is not supported. Did you mean " + key.replace(msPattern, "ms-").replace(hyphenPattern, function(str, _char2) {
          return _char2.toUpperCase();
        }) + "?");
      }
      return processed;
    };
  }
  var contentValuePattern;
  var contentValues;
  var oldProcessStyleValue;
  var msPattern;
  var hyphenPattern;
  var hyphenatedCache;
  function handleInterpolation(mergedProps, registered, interpolation) {
    if (interpolation == null) {
      return "";
    }
    if (interpolation.__emotion_styles !== void 0) {
      if (interpolation.toString() === "NO_COMPONENT_SELECTOR") {
        throw new Error("Component selectors can only be used in conjunction with @emotion/babel-plugin.");
      }
      return interpolation;
    }
    switch (_typeof(interpolation)) {
      case "boolean": {
        return "";
      }
      case "object": {
        if (interpolation.anim === 1) {
          cursor = {
            name: interpolation.name,
            styles: interpolation.styles,
            next: cursor
          };
          return interpolation.name;
        }
        if (interpolation.styles !== void 0) {
          var next3 = interpolation.next;
          if (next3 !== void 0) {
            while (next3 !== void 0) {
              cursor = {
                name: next3.name,
                styles: next3.styles,
                next: cursor
              };
              next3 = next3.next;
            }
          }
          var styles = interpolation.styles + ";";
          if (interpolation.map !== void 0) {
            styles += interpolation.map;
          }
          return styles;
        }
        return createStringFromObject(mergedProps, registered, interpolation);
      }
      case "function": {
        if (mergedProps !== void 0) {
          var previousCursor = cursor;
          var result = interpolation(mergedProps);
          cursor = previousCursor;
          return handleInterpolation(mergedProps, registered, result);
        } else if (true) {
          console.error("Functions that are interpolated in css calls will be stringified.\nIf you want to have a css call based on props, create a function that returns a css call like this\nlet dynamicStyle = (props) => css`color: ${props.color}`\nIt can be called directly with props or interpolated in a styled call like this\nlet SomeComponent = styled('div')`${dynamicStyle}`");
        }
        break;
      }
      case "string":
        if (true) {
          var matched = [];
          var replaced = interpolation.replace(animationRegex, function(match2, p1, p2) {
            var fakeVarName = "animation" + matched.length;
            matched.push("const " + fakeVarName + " = keyframes`" + p2.replace(/^@keyframes animation-\w+/, "") + "`");
            return "${" + fakeVarName + "}";
          });
          if (matched.length) {
            console.error("`keyframes` output got interpolated into plain string, please wrap it with `css`.\n\nInstead of doing this:\n\n" + [].concat(matched, ["`" + replaced + "`"]).join("\n") + "\n\nYou should wrap it with `css` like this:\n\n" + ("css`" + replaced + "`"));
          }
        }
        break;
    }
    if (registered == null) {
      return interpolation;
    }
    var cached = registered[interpolation];
    return cached !== void 0 ? cached : interpolation;
  }
  function createStringFromObject(mergedProps, registered, obj) {
    var string = "";
    if (Array.isArray(obj)) {
      for (var i = 0; i < obj.length; i++) {
        string += handleInterpolation(mergedProps, registered, obj[i]) + ";";
      }
    } else {
      for (var _key in obj) {
        var value = obj[_key];
        if (_typeof(value) !== "object") {
          if (registered != null && registered[value] !== void 0) {
            string += _key + "{" + registered[value] + "}";
          } else if (isProcessableValue(value)) {
            string += processStyleName(_key) + ":" + processStyleValue(_key, value) + ";";
          }
        } else {
          if (_key === "NO_COMPONENT_SELECTOR" && true) {
            throw new Error("Component selectors can only be used in conjunction with @emotion/babel-plugin.");
          }
          if (Array.isArray(value) && typeof value[0] === "string" && (registered == null || registered[value[0]] === void 0)) {
            for (var _i = 0; _i < value.length; _i++) {
              if (isProcessableValue(value[_i])) {
                string += processStyleName(_key) + ":" + processStyleValue(_key, value[_i]) + ";";
              }
            }
          } else {
            var interpolated = handleInterpolation(mergedProps, registered, value);
            switch (_key) {
              case "animation":
              case "animationName": {
                string += processStyleName(_key) + ":" + interpolated + ";";
                break;
              }
              default: {
                if (_key === "undefined") {
                  console.error(UNDEFINED_AS_OBJECT_KEY_ERROR);
                }
                string += _key + "{" + interpolated + "}";
              }
            }
          }
        }
      }
    }
    return string;
  }
  var labelPattern = /label:\s*([^\s;\n{]+)\s*(;|$)/g;
  var sourceMapPattern;
  if (true) {
    sourceMapPattern = /\/\*#\ssourceMappingURL=data:application\/json;\S+\s+\*\//g;
  }
  var cursor;
  var serializeStyles = function serializeStyles2(args, registered, mergedProps) {
    if (args.length === 1 && _typeof(args[0]) === "object" && args[0] !== null && args[0].styles !== void 0) {
      return args[0];
    }
    var stringMode = true;
    var styles = "";
    cursor = void 0;
    var strings = args[0];
    if (strings == null || strings.raw === void 0) {
      stringMode = false;
      styles += handleInterpolation(mergedProps, registered, strings);
    } else {
      if (strings[0] === void 0) {
        console.error(ILLEGAL_ESCAPE_SEQUENCE_ERROR);
      }
      styles += strings[0];
    }
    for (var i = 1; i < args.length; i++) {
      styles += handleInterpolation(mergedProps, registered, args[i]);
      if (stringMode) {
        if (strings[i] === void 0) {
          console.error(ILLEGAL_ESCAPE_SEQUENCE_ERROR);
        }
        styles += strings[i];
      }
    }
    var sourceMap;
    if (true) {
      styles = styles.replace(sourceMapPattern, function(match3) {
        sourceMap = match3;
        return "";
      });
    }
    labelPattern.lastIndex = 0;
    var identifierName = "";
    var match2;
    while ((match2 = labelPattern.exec(styles)) !== null) {
      identifierName += "-" + match2[1];
    }
    var name = hash_browser_esm_default(styles) + identifierName;
    if (true) {
      return {
        name: name,
        styles: styles,
        map: sourceMap,
        next: cursor,
        toString: function toString2() {
          return "You have tried to stringify object returned from `css` function. It isn't supposed to be used directly (e.g. as value of the `className` prop), but rather handed to emotion so it can handle it (e.g. as value of `css` prop).";
        }
      };
    }
    return {
      name: name,
      styles: styles,
      next: cursor
    };
  };

  // node_modules/@emotion/utils/dist/emotion-utils.browser.esm.js
  var import_es_regexp_exec4 = __toModule(require_es_regexp_exec());
  var isBrowser = true;
  function getRegisteredStyles(registered, registeredStyles, classNames) {
    var rawClassName = "";
    classNames.split(" ").forEach(function(className) {
      if (registered[className] !== void 0) {
        registeredStyles.push(registered[className] + ";");
      } else {
        rawClassName += className + " ";
      }
    });
    return rawClassName;
  }
  var insertStyles = function insertStyles2(cache2, serialized, isStringTag) {
    var className = cache2.key + "-" + serialized.name;
    if ((isStringTag === false || isBrowser === false) && cache2.registered[className] === void 0) {
      cache2.registered[className] = serialized.styles;
    }
    if (cache2.inserted[serialized.name] === void 0) {
      var current = serialized;
      do {
        var maybeStyles = cache2.insert(serialized === current ? "." + className : "", current, cache2.sheet, true);
        current = current.next;
      } while (current !== void 0);
    }
  };

  // node_modules/core-js/modules/es.function.bind.js
  var $26 = require_export();
  var bind = require_function_bind();
  $26({ target: "Function", proto: true }, {
    bind: bind
  });

  // node_modules/@emotion/css/create-instance/dist/emotion-css-create-instance.esm.js
  var import_es_array_iterator4 = __toModule(require_es_array_iterator());
  function _typeof2(obj) {
    "@babel/helpers - typeof";
    if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
      _typeof2 = function _typeof8(obj2) {
        return typeof obj2;
      };
    } else {
      _typeof2 = function _typeof8(obj2) {
        return obj2 && typeof Symbol === "function" && obj2.constructor === Symbol && obj2 !== Symbol.prototype ? "symbol" : typeof obj2;
      };
    }
    return _typeof2(obj);
  }
  function insertWithoutScoping(cache2, serialized) {
    if (cache2.inserted[serialized.name] === void 0) {
      return cache2.insert("", serialized, cache2.sheet, true);
    }
  }
  function merge(registered, css2, className) {
    var registeredStyles = [];
    var rawClassName = getRegisteredStyles(registered, registeredStyles, className);
    if (registeredStyles.length < 2) {
      return className;
    }
    return rawClassName + css2(registeredStyles);
  }
  var createEmotion = function createEmotion2(options) {
    var cache2 = emotion_cache_browser_esm_default(options);
    cache2.sheet.speedy = function(value) {
      if (this.ctr !== 0) {
        throw new Error("speedy must be changed before any rules are inserted");
      }
      this.isSpeedy = value;
    };
    cache2.compat = true;
    var css2 = function css3() {
      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }
      var serialized = serializeStyles(args, cache2.registered, void 0);
      insertStyles(cache2, serialized, false);
      return cache2.key + "-" + serialized.name;
    };
    var keyframes2 = function keyframes3() {
      for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
        args[_key2] = arguments[_key2];
      }
      var serialized = serializeStyles(args, cache2.registered);
      var animation = "animation-" + serialized.name;
      insertWithoutScoping(cache2, {
        name: serialized.name,
        styles: "@keyframes " + animation + "{" + serialized.styles + "}"
      });
      return animation;
    };
    var injectGlobal2 = function injectGlobal3() {
      for (var _len3 = arguments.length, args = new Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
        args[_key3] = arguments[_key3];
      }
      var serialized = serializeStyles(args, cache2.registered);
      insertWithoutScoping(cache2, serialized);
    };
    var cx2 = function cx3() {
      for (var _len4 = arguments.length, args = new Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {
        args[_key4] = arguments[_key4];
      }
      return merge(cache2.registered, css2, classnames(args));
    };
    return {
      css: css2,
      cx: cx2,
      injectGlobal: injectGlobal2,
      keyframes: keyframes2,
      hydrate: function hydrate2(ids) {
        ids.forEach(function(key) {
          cache2.inserted[key] = true;
        });
      },
      flush: function flush2() {
        cache2.registered = {};
        cache2.inserted = {};
        cache2.sheet.flush();
      },
      sheet: cache2.sheet,
      cache: cache2,
      getRegisteredStyles: getRegisteredStyles.bind(null, cache2.registered),
      merge: merge.bind(null, cache2.registered, css2)
    };
  };
  var classnames = function classnames2(args) {
    var cls = "";
    for (var i = 0; i < args.length; i++) {
      var arg = args[i];
      if (arg == null)
        continue;
      var toAdd = void 0;
      switch (_typeof2(arg)) {
        case "boolean":
          break;
        case "object": {
          if (Array.isArray(arg)) {
            toAdd = classnames2(arg);
          } else {
            toAdd = "";
            for (var k in arg) {
              if (arg[k] && k) {
                toAdd && (toAdd += " ");
                toAdd += k;
              }
            }
          }
          break;
        }
        default: {
          toAdd = arg;
        }
      }
      if (toAdd) {
        cls && (cls += " ");
        cls += toAdd;
      }
    }
    return cls;
  };
  var emotion_css_create_instance_esm_default = createEmotion;

  // node_modules/@emotion/css/dist/emotion-css.esm.js
  var _createEmotion = emotion_css_create_instance_esm_default({
    key: "css"
  });
  var flush = _createEmotion.flush;
  var hydrate = _createEmotion.hydrate;
  var cx = _createEmotion.cx;
  var merge2 = _createEmotion.merge;
  var getRegisteredStyles2 = _createEmotion.getRegisteredStyles;
  var injectGlobal = _createEmotion.injectGlobal;
  var keyframes = _createEmotion.keyframes;
  var css = _createEmotion.css;
  var sheet = _createEmotion.sheet;
  var cache = _createEmotion.cache;

  // node_modules/core-js/modules/es.array.includes.js
  "use strict";
  var $27 = require_export();
  var $includes = require_array_includes().includes;
  var addToUnscopables3 = require_add_to_unscopables();
  $27({ target: "Array", proto: true }, {
    includes: function includes(el) {
      return $includes(this, el, arguments.length > 1 ? arguments[1] : void 0);
    }
  });
  addToUnscopables3("includes");

  // node_modules/core-js/modules/es.string.includes.js
  "use strict";
  var $28 = require_export();
  var notARegExp = require_not_a_regexp();
  var requireObjectCoercible4 = require_require_object_coercible();
  var correctIsRegExpLogic = require_correct_is_regexp_logic();
  $28({ target: "String", proto: true, forced: !correctIsRegExpLogic("includes") }, {
    includes: function includes2(searchString) {
      return !!~String(requireObjectCoercible4(this)).indexOf(notARegExp(searchString), arguments.length > 1 ? arguments[1] : void 0);
    }
  });

  // utils-grid.ts
  var import_es_regexp_exec5 = __toModule(require_es_regexp_exec());
  var import_es_array_iterator6 = __toModule(require_es_array_iterator());

  // utils-misc.ts
  var import_es_array_iterator5 = __toModule(require_es_array_iterator());
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
  function set_class(elements, class_name) {
    elements.forEach(function(el) {
      el.classList.add(class_name);
    });
  }
  var filler_text = '\n<div class = "filler_text">\n  This filler text demonstrates how the height of an element spanning an "auto"\n  row is influenced by its content. While you\'re here...\n  Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, \n  when an unknown printer took a galley of type and scrambled it to make a type \n  specimen book.\n</div>';
  function pos_relative_to_container(container, child_el) {
    var pos = child_el.getBoundingClientRect();
    return {
      top: pos.top - container.top,
      bottom: pos.bottom - container.bottom,
      left: pos.left - container.left,
      right: pos.right - container.right,
      height: pos.height,
      width: pos.width
    };
  }

  // utils-grid.ts
  function _toConsumableArray(arr) {
    return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray2(arr) || _nonIterableSpread();
  }
  function _nonIterableSpread() {
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
  function _iterableToArray(iter) {
    if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null)
      return Array.from(iter);
  }
  function _arrayWithoutHoles(arr) {
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
  function find_first_grid_node() {
    var grid_node;
    var current_node = document.body;
    var node_queue = _toConsumableArray(current_node.children);
    var num_checks = 0;
    var check_max = 100;
    while (typeof grid_node === "undefined" && node_queue.length > 0 && num_checks++ < check_max) {
      current_node = node_queue.shift();
      node_queue = [].concat(_toConsumableArray(node_queue), _toConsumableArray(current_node.children));
      if (getComputedStyle(current_node).display === "grid") {
        grid_node = current_node;
      }
    }
    if (typeof grid_node === "undefined" && num_checks < check_max) {
      var _grid_node = document.createElement("div");
      current_node.appendChild(_grid_node);
    } else if (num_checks === check_max) {
      alert("Could not find a grid-layout element to edit -- Sorry!");
    }
    grid_node.classList.add("wrapped-existing-app");
    return grid_node;
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

  // GridItem.ts
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
          _defineProperty2(target, key, source[key]);
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
  var GridItem = /* @__PURE__ */ function() {
    function GridItem2(opts) {
      _classCallCheck(this, GridItem2);
      _defineProperty2(this, "id", void 0);
      _defineProperty2(this, "el", void 0);
      _defineProperty2(this, "mirrored_el", void 0);
      _defineProperty2(this, "sibling_el", void 0);
      _defineProperty2(this, "parent_layout", void 0);
      Object.assign(this, opts);
    }
    _createClass(GridItem2, [{
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
      key: "info",
      get: function get() {
        return _objectSpread2({
          id: this.id
        }, this.position);
      }
    }, {
      key: "fill_if_in_auto_row",
      value: function fill_if_in_auto_row() {
        var in_auto_row = this.parent_layout.item_row_sizes(this.position).includes("auto");
        if (in_auto_row && !this.has_mirrored) {
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
    return GridItem2;
  }();

  // GridLayout.ts
  var import_es_regexp_exec6 = __toModule(require_es_regexp_exec());
  var import_es_array_iterator7 = __toModule(require_es_array_iterator());
  function _typeof3(obj) {
    "@babel/helpers - typeof";
    if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
      _typeof3 = function _typeof8(obj2) {
        return typeof obj2;
      };
    } else {
      _typeof3 = function _typeof8(obj2) {
        return obj2 && typeof Symbol === "function" && obj2.constructor === Symbol && obj2 !== Symbol.prototype ? "symbol" : typeof obj2;
      };
    }
    return _typeof3(obj);
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
  var GridLayout = /* @__PURE__ */ function() {
    function GridLayout2(container) {
      _classCallCheck2(this, GridLayout2);
      _defineProperty3(this, "styles", void 0);
      _defineProperty3(this, "container", void 0);
      this.container = container;
      this.styles = container.style;
    }
    _createClass2(GridLayout2, [{
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
        document.querySelector("body").style.setProperty("--grid-gap", new_gap);
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
        } else if (_typeof3(values) === "object") {
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
    return GridLayout2;
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
  var import_es_array_iterator9 = __toModule(require_es_array_iterator());
  var import_es_regexp_exec8 = __toModule(require_es_regexp_exec());

  // node_modules/core-js/modules/es.number.constructor.js
  "use strict";
  var DESCRIPTORS9 = require_descriptors();
  var global7 = require_global();
  var isForced = require_is_forced();
  var redefine5 = require_redefine();
  var has3 = require_has();
  var classof = require_classof_raw();
  var inheritIfRequired = require_inherit_if_required();
  var toPrimitive2 = require_to_primitive();
  var fails7 = require_fails();
  var create3 = require_object_create();
  var getOwnPropertyNames2 = require_object_get_own_property_names().f;
  var getOwnPropertyDescriptor3 = require_object_get_own_property_descriptor().f;
  var defineProperty4 = require_object_define_property().f;
  var trim3 = require_string_trim().trim;
  var NUMBER = "Number";
  var NativeNumber = global7[NUMBER];
  var NumberPrototype = NativeNumber.prototype;
  var BROKEN_CLASSOF = classof(create3(NumberPrototype)) == NUMBER;
  var toNumber = function(argument) {
    var it = toPrimitive2(argument, false);
    var first, third, radix, maxCode, digits, length2, index, code;
    if (typeof it == "string" && it.length > 2) {
      it = trim3(it);
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
        length2 = digits.length;
        for (index = 0; index < length2; index++) {
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
      return dummy instanceof NumberWrapper && (BROKEN_CLASSOF ? fails7(function() {
        NumberPrototype.valueOf.call(dummy);
      }) : classof(dummy) != NUMBER) ? inheritIfRequired(new NativeNumber(toNumber(it)), dummy, NumberWrapper) : toNumber(it);
    };
    for (keys2 = DESCRIPTORS9 ? getOwnPropertyNames2(NativeNumber) : "MAX_VALUE,MIN_VALUE,NaN,NEGATIVE_INFINITY,POSITIVE_INFINITY,EPSILON,isFinite,isInteger,isNaN,isSafeInteger,MAX_SAFE_INTEGER,MIN_SAFE_INTEGER,parseFloat,parseInt,isInteger,fromString,range".split(","), j = 0; keys2.length > j; j++) {
      if (has3(NativeNumber, key = keys2[j]) && !has3(NumberWrapper, key)) {
        defineProperty4(NumberWrapper, key, getOwnPropertyDescriptor3(NativeNumber, key));
      }
    }
    NumberWrapper.prototype = NumberPrototype;
    NumberPrototype.constructor = NumberWrapper;
    redefine5(global7, NUMBER, NumberWrapper);
  }
  var NumberWrapper;
  var keys2;
  var j;
  var key;

  // make-elements.ts
  var import_es_array_iterator8 = __toModule(require_es_array_iterator());
  var import_es_regexp_exec7 = __toModule(require_es_regexp_exec());

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
  var clipboard_icon = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">\n<path d="M16 1H4c-1.1 0-2 .9-2 2v14h2V3h12V1zm3 4H8c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h11c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm0 16H8V7h11v14z"/>\n</svg>';
  var close_icon = '<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18"><path d="M14.53 4.53l-1.06-1.06L9 7.94 4.53 3.47 3.47 4.53 7.94 9l-4.47 4.47 1.06 1.06L9 10.06l4.47 4.47 1.06-1.06L10.06 9z"/></svg>';
  var browser_header_html = '<div id="buttons-container">\n  <div></div>\n  <div></div>\n  <div></div>\n</div>\n<div id="url-box">\n  <span> www.myShinyApp.com </span>\n</div>';

  // make-elements.ts
  var _templateObject;
  function _taggedTemplateLiteral(strings, raw) {
    if (!raw) {
      raw = strings.slice(0);
    }
    return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } }));
  }
  function _toConsumableArray2(arr) {
    return _arrayWithoutHoles2(arr) || _iterableToArray2(arr) || _unsupportedIterableToArray3(arr) || _nonIterableSpread2();
  }
  function _nonIterableSpread2() {
    throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
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
  function _iterableToArray2(iter) {
    if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null)
      return Array.from(iter);
  }
  function _arrayWithoutHoles2(arr) {
    if (Array.isArray(arr))
      return _arrayLikeToArray3(arr);
  }
  function _arrayLikeToArray3(arr, len) {
    if (len == null || len > arr.length)
      len = arr.length;
    for (var i = 0, arr2 = new Array(len); i < len; i++) {
      arr2[i] = arr[i];
    }
    return arr2;
  }
  function parse_selector_text(sel_txt) {
    var id_match = sel_txt.match(/#([^\.]+)/g);
    var el_id = id_match ? id_match[0].replace("#", "") : null;
    var all_classes = sel_txt.match(/\.([^\.#]+)/g);
    var class_list = all_classes ? _toConsumableArray2(all_classes).map(function(c) {
      return c.replace(".", "");
    }) : null;
    return {
      tag_type: sel_txt.match(/^([^#\.]+)+/g)[0],
      el_id: el_id,
      class_list: class_list
    };
  }
  function make_el(parent, sel_txt) {
    var opts = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {};
    var el = parent.querySelector(sel_txt);
    if (!el) {
      el = create_el({
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
  function shadow_el(sel_txt) {
    var shadow_holder = block_el(sel_txt);
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
  function create_el(opts) {
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
    if (opts.styles) {
      Object.assign(el.style, opts.styles);
    }
    if (opts.props) {
      Object.assign(el, opts.props);
    }
    if (opts.event_listener) {
      as_array(opts.event_listener).forEach(function(listener) {
        return el["on" + listener.event] = listener.func;
      });
    }
    return el;
  }
  function block_el(sel_txt) {
    for (var _len2 = arguments.length, children = new Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
      children[_key2 - 1] = arguments[_key2];
    }
    return create_el({
      sel_txt: sel_txt,
      children: children
    });
  }
  function text_el(sel_txt, text) {
    return create_el({
      sel_txt: sel_txt,
      text: text
    });
  }
  var incrementer_button_class = css(_templateObject || (_templateObject = _taggedTemplateLiteral(["\n  font-size: 15px;\n  height: 2em;\n  width: 2em;\n  border-radius: 50%;\n  background-color: rgba(255, 255, 255, 0);\n  border: 1px solid rgba(255, 255, 255, 0);\n  padding: 0;\n  color: var(--dark-gray, gray);\n  transition: color 0.2s, background-color 0.2s;\n\n  &.remove-col {\n    font-size: 12px;\n  }\n\n  &.add-row,\n  &.add-col {\n    /* This offset is enough to place the button on the outside of the row/column\n      spanning div and centered in the grid tract */\n    --incrementer-offset: calc(-1em - var(--grid-gap) / 2);\n    position: absolute;\n    right: 2px;\n    bottom: 2px;\n  }\n\n  &.add-row {\n    bottom: var(--incrementer-offset);\n  }\n  &.add-col {\n    right: var(--incrementer-offset);\n  }\n\n  &:hover {\n    background-color: var(--dark-gray);\n    color: white;\n  }\n\n  & > svg {\n    max-height: 100%;\n    max-width: 100%;\n  }\n"])));
  function tract_add_or_remove_button(app_state, opts) {
    var parent_el = opts.parent_el, add_or_remove = opts.add_or_remove, dir = opts.dir, tract_index = opts.tract_index, additional_styles = opts.additional_styles;
    var dir_singular = dir === "rows" ? "row" : "col";
    var label = add_or_remove === "add" ? "Add a ".concat(dir_singular) : "Remove ".concat(dir_singular);
    var button = make_el(parent_el, "button.".concat(incrementer_button_class, ".").concat(add_or_remove, "-").concat(dir_singular, ".").concat(dir, "_").concat(tract_index), {
      innerHTML: add_or_remove === "add" ? plus_icon : trashcan_icon,
      styles: additional_styles,
      event_listener: {
        event: "click",
        func: function func() {
          if (add_or_remove === "add") {
            app_state.add_tract(dir, tract_index);
          } else {
            app_state.remove_tract(dir, tract_index);
          }
        }
      },
      props: {
        title: label
      }
    });
    return button;
  }
  function click_button(selector, label, on_finish) {
    var button = text_el("button".concat(selector), label);
    button.addEventListener("click", function(event) {
      on_finish(event);
    });
    return button;
  }

  // make-css_unit_input.ts
  var _templateObject2;
  var _templateObject22;
  function _defineProperty4(obj, key, value) {
    if (key in obj) {
      Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });
    } else {
      obj[key] = value;
    }
    return obj;
  }
  function _createForOfIteratorHelper(o, allowArrayLike) {
    var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"];
    if (!it) {
      if (Array.isArray(o) || (it = _unsupportedIterableToArray4(o)) || allowArrayLike && o && typeof o.length === "number") {
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
  function _arrayLikeToArray4(arr, len) {
    if (len == null || len > arr.length)
      len = arr.length;
    for (var i = 0, arr2 = new Array(len); i < len; i++) {
      arr2[i] = arr[i];
    }
    return arr2;
  }
  function _taggedTemplateLiteral2(strings, raw) {
    if (!raw) {
      raw = strings.slice(0);
    }
    return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } }));
  }
  var css_unit_input = css(_templateObject2 || (_templateObject2 = _taggedTemplateLiteral2(["\n  display: grid;\n  grid-template-columns: repeat(2, 55px);\n  justify-content: center; /* Make sure to sit in middle of control */\n  grid-gap: 2px;\n  padding: 0.5rem;\n  pointer-events: none;\n  /* Prevents card styling when set to every child from spilling into input divs */\n  box-shadow: none !important;\n\n  &.cols-sizing {\n    width: 90%;\n    grid-template-columns: repeat(auto-fit, 55px);\n  }\n\n  & > * {\n    pointer-events: all;\n  }\n\n  select,\n  input {\n    align-self: stretch;\n    justify-self: stretch;\n    height: 1.75rem;\n    font-size: 1.1rem;\n  }\n\n  .value_input.disabled {\n    opacity: 0.15;\n    pointer-events: none;\n  }\n"])));
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
    } : _ref$on_change, _ref$allowed_units = _ref.allowed_units, allowed_units = _ref$allowed_units === void 0 ? ["fr", "px", "rem", "auto"] : _ref$allowed_units, _ref$snap_to_defaults = _ref.snap_to_defaults, snap_to_defaults = _ref$snap_to_defaults === void 0 ? true : _ref$snap_to_defaults;
    var current_unit = start_unit;
    var form = make_el(parent_el, "form".concat(selector, ".").concat(css_unit_input), {
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
    var value_input = make_el(form, "input.value-input", {
      props: {
        type: "number",
        min: 0,
        value: start_val,
        step: 1,
        "aria-live": "polite"
      }
    });
    var unit_selector = make_el(form, "select.unit-selector", {
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
        var using_old_units_default = value_input.value === default_values[current_unit] && snap_to_defaults;
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
  var tract_controls = css(_templateObject22 || (_templateObject22 = _taggedTemplateLiteral2(['\n  display: grid;\n  gap: 0.25rem;\n  position: absolute;\n\n  &.disabled {\n    display: none;\n  }\n\n  &.cols-controls {\n    height: var(--editor-top-pad);\n    padding-bottom: 5px;\n    grid-template-areas:\n      ".        remove-tract  .       "\n      "cssInput cssInput    cssInput"\n      "dragger  dragger     dragger ";\n    grid-template-columns: repeat(3, 1fr);\n    justify-content: center;\n    justify-items: center;\n    align-content: end;\n  }\n\n  &.cols-controls .css-unit-input {\n    width: 90%;\n    grid-template-columns: repeat(auto-fit, 55px);\n  }\n\n  &.rows-controls {\n    width: var(--editor-left-pad);\n    padding-right: 0.5rem;\n    align-items: center;\n    grid-template-areas:\n      "remove-tract cssInput"\n      "remove-tract dragger ";\n    /* grid-template-columns: auto minmax(50px, 200px); */\n    justify-content: end;\n    align-content: center;\n  }\n\n  .remove-row,\n  .remove-col {\n    grid-area: remove-tract;\n  }\n\n  .unit-input {\n    padding: 0;\n    grid-area: cssInput;\n  }\n\n  .dragger {\n    display: none;\n    justify-content: center;\n    align-items: center;\n    cursor: grab;\n    border: 1px solid var(--dark-gray);\n    border-radius: 4px;\n    color: var(--off-black);\n    height: 15px;\n    grid-area: dragger;\n    position: relative; /* So the drag detector div can be sized correctly */\n  }\n  .dragger:active {\n    cursor: grabbing;\n  }\n\n  &.with-drag .dragger {\n    display: flex;\n    width: 100%;\n    max-width: 80px;\n    justify-self: center;\n  }\n\n  .drag-detector {\n    position: absolute;\n    width: 100%;\n    height: 100%;\n    top: 0;\n    left: 0;\n    background: steelblue;\n    opacity: 0;\n  }\n'])));
  function build_controls_for_dir(app_state, dir, editor_container) {
    var target_class = dir === "rows" ? "c1" : "r1";
    var dir_singular = dir === "rows" ? "row" : "col";
    editor_container.querySelectorAll(".".concat(dir, "-controls")).forEach(function(el) {
      return el.remove();
    });
    return app_state.current_cells.filter(function(el) {
      return el.classList.contains(target_class);
    }).map(function(el) {
      var tract_index = +el.dataset[dir_singular];
      var holder_el = make_el(editor_container, "div#controller_for_".concat(dir_singular, "_").concat(tract_index, ".tract-controls.").concat(tract_controls, ".").concat(dir, "-controls"));
      if (tract_index === 1) {
        tract_add_or_remove_button(app_state, {
          parent_el: holder_el,
          add_or_remove: "add",
          dir: dir,
          tract_index: 0,
          additional_styles: _defineProperty4({}, dir === "rows" ? "top" : "left", "var(--incrementer-offset)")
        });
      }
      tract_add_or_remove_button(app_state, {
        parent_el: holder_el,
        add_or_remove: "add",
        dir: dir,
        tract_index: tract_index
      });
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
  function make_grid_tract_control(holder, app_state, opts) {
    var size = opts.size, dir = opts.dir, tract_index = opts.tract_index;
    function send_update(_ref2) {
      var is_dragging = _ref2.is_dragging;
      app_state.update_tract({
        tract_index: tract_index,
        dir: dir,
        new_value: unit_input.current_value(),
        is_dragging: is_dragging
      });
    }
    var unit_input = make_css_unit_input({
      parent_el: holder,
      selector: ".unit-input.".concat(dir, "-sizing"),
      start_val: get_css_value(size),
      start_unit: get_css_unit(size),
      on_change: function on_change(new_val) {
        show_or_hide_dragger(new_val);
        send_update({
          is_dragging: false
        });
      }
    });
    var value_input = unit_input.form.querySelector(".value-input");
    var drag_dir = dir === "rows" ? "y" : "x";
    var resizer = make_el(holder, "div.dragger", {
      innerHTML: dir === "rows" ? vertical_drag_icon : horizontal_drag_icon
    });
    make_el(resizer, "div.drag-detector", {
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
          send_update({
            is_dragging: true
          });
        }
      }, {
        event: "dragend",
        func: function func(event) {
          send_update({
            is_dragging: false
          });
        }
      }]
    });
    tract_add_or_remove_button(app_state, {
      parent_el: holder,
      add_or_remove: "remove",
      dir: dir,
      tract_index: tract_index
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

  // node_modules/core-js/modules/es.array.every.js
  "use strict";
  var $29 = require_export();
  var $every = require_array_iteration().every;
  var arrayMethodIsStrict4 = require_array_method_is_strict();
  var STRICT_METHOD4 = arrayMethodIsStrict4("every");
  $29({ target: "Array", proto: true, forced: !STRICT_METHOD4 }, {
    every: function every(callbackfn) {
      return $every(this, callbackfn, arguments.length > 1 ? arguments[1] : void 0);
    }
  });

  // utils-cssom.ts
  var import_es_array_iterator10 = __toModule(require_es_array_iterator());
  function _toConsumableArray3(arr) {
    return _arrayWithoutHoles3(arr) || _iterableToArray3(arr) || _unsupportedIterableToArray5(arr) || _nonIterableSpread3();
  }
  function _nonIterableSpread3() {
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
  function _iterableToArray3(iter) {
    if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null)
      return Array.from(iter);
  }
  function _arrayWithoutHoles3(arr) {
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
  function get_styles_for_selector_with_targets(selector_text, target_properties) {
    var defines_ruleset = function defines_ruleset2(selector_text2) {
      return function(rule) {
        return rule.selectorText === selector_text2;
      };
    };
    var all_rules_for_selector = _toConsumableArray3(document.styleSheets).filter(function(style_sheet) {
      return _toConsumableArray3(style_sheet.rules).find(defines_ruleset(selector_text));
    }).map(function(x) {
      return _toConsumableArray3(x.cssRules).find(defines_ruleset(selector_text)).style;
    });
    return all_rules_for_selector.find(function(rule) {
      return target_properties.every(function(x) {
        return rule[x];
      });
    });
  }

  // utils-shiny.ts
  var Shiny = window.Shiny;
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

  // node_modules/core-js/modules/es.object.set-prototype-of.js
  var $30 = require_export();
  var setPrototypeOf = require_object_set_prototype_of();
  $30({ target: "Object", stat: true }, {
    setPrototypeOf: setPrototypeOf
  });

  // node_modules/core-js/modules/es.object.get-prototype-of.js
  var $31 = require_export();
  var fails8 = require_fails();
  var toObject5 = require_to_object();
  var nativeGetPrototypeOf = require_object_get_prototype_of();
  var CORRECT_PROTOTYPE_GETTER = require_correct_prototype_getter();
  var FAILS_ON_PRIMITIVES4 = fails8(function() {
    nativeGetPrototypeOf(1);
  });
  $31({ target: "Object", stat: true, forced: FAILS_ON_PRIMITIVES4, sham: !CORRECT_PROTOTYPE_GETTER }, {
    getPrototypeOf: function getPrototypeOf(it) {
      return nativeGetPrototypeOf(toObject5(it));
    }
  });

  // node_modules/core-js/modules/es.reflect.construct.js
  var $32 = require_export();
  var getBuiltIn2 = require_get_built_in();
  var aFunction = require_a_function();
  var anObject6 = require_an_object();
  var isObject6 = require_is_object();
  var create4 = require_object_create();
  var bind2 = require_function_bind();
  var fails9 = require_fails();
  var nativeConstruct = getBuiltIn2("Reflect", "construct");
  var NEW_TARGET_BUG = fails9(function() {
    function F() {
    }
    return !(nativeConstruct(function() {
    }, [], F) instanceof F);
  });
  var ARGS_BUG = !fails9(function() {
    nativeConstruct(function() {
    });
  });
  var FORCED3 = NEW_TARGET_BUG || ARGS_BUG;
  $32({ target: "Reflect", stat: true, forced: FORCED3, sham: FORCED3 }, {
    construct: function construct(Target, args) {
      aFunction(Target);
      anObject6(args);
      var newTarget = arguments.length < 3 ? Target : aFunction(arguments[2]);
      if (ARGS_BUG && !NEW_TARGET_BUG)
        return nativeConstruct(Target, args, newTarget);
      if (Target == newTarget) {
        switch (args.length) {
          case 0:
            return new Target();
          case 1:
            return new Target(args[0]);
          case 2:
            return new Target(args[0], args[1]);
          case 3:
            return new Target(args[0], args[1], args[2]);
          case 4:
            return new Target(args[0], args[1], args[2], args[3]);
        }
        var $args = [null];
        $args.push.apply($args, args);
        return new (bind2.apply(Target, $args))();
      }
      var proto = newTarget.prototype;
      var instance = create4(isObject6(proto) ? proto : Object.prototype);
      var result = Function.apply.call(Target, instance, args);
      return isObject6(result) ? result : instance;
    }
  });

  // web-components/focus-modal.ts
  var import_es_array_iterator12 = __toModule(require_es_array_iterator());
  var import_es_map2 = __toModule(require_es_map());

  // web-components/copy-code.ts
  var import_es_regexp_exec9 = __toModule(require_es_regexp_exec());
  var import_es_array_iterator11 = __toModule(require_es_array_iterator());
  var import_es_map = __toModule(require_es_map());
  function _typeof4(obj) {
    "@babel/helpers - typeof";
    if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
      _typeof4 = function _typeof8(obj2) {
        return typeof obj2;
      };
    } else {
      _typeof4 = function _typeof8(obj2) {
        return obj2 && typeof Symbol === "function" && obj2.constructor === Symbol && obj2 !== Symbol.prototype ? "symbol" : typeof obj2;
      };
    }
    return _typeof4(obj);
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
  function _inherits(subClass, superClass) {
    if (typeof superClass !== "function" && superClass !== null) {
      throw new TypeError("Super expression must either be null or a function");
    }
    subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } });
    if (superClass)
      _setPrototypeOf(subClass, superClass);
  }
  function _createSuper(Derived) {
    var hasNativeReflectConstruct = _isNativeReflectConstruct();
    return function _createSuperInternal() {
      var Super = _getPrototypeOf(Derived), result;
      if (hasNativeReflectConstruct) {
        var NewTarget = _getPrototypeOf(this).constructor;
        result = Reflect.construct(Super, arguments, NewTarget);
      } else {
        result = Super.apply(this, arguments);
      }
      return _possibleConstructorReturn(this, result);
    };
  }
  function _possibleConstructorReturn(self2, call) {
    if (call && (_typeof4(call) === "object" || typeof call === "function")) {
      return call;
    }
    return _assertThisInitialized(self2);
  }
  function _assertThisInitialized(self2) {
    if (self2 === void 0) {
      throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    }
    return self2;
  }
  function _wrapNativeSuper(Class) {
    var _cache = typeof Map === "function" ? new Map() : void 0;
    _wrapNativeSuper = function _wrapNativeSuper5(Class2) {
      if (Class2 === null || !_isNativeFunction(Class2))
        return Class2;
      if (typeof Class2 !== "function") {
        throw new TypeError("Super expression must either be null or a function");
      }
      if (typeof _cache !== "undefined") {
        if (_cache.has(Class2))
          return _cache.get(Class2);
        _cache.set(Class2, Wrapper);
      }
      function Wrapper() {
        return _construct(Class2, arguments, _getPrototypeOf(this).constructor);
      }
      Wrapper.prototype = Object.create(Class2.prototype, { constructor: { value: Wrapper, enumerable: false, writable: true, configurable: true } });
      return _setPrototypeOf(Wrapper, Class2);
    };
    return _wrapNativeSuper(Class);
  }
  function _construct(Parent, args, Class) {
    if (_isNativeReflectConstruct()) {
      _construct = Reflect.construct;
    } else {
      _construct = function _construct5(Parent2, args2, Class2) {
        var a = [null];
        a.push.apply(a, args2);
        var Constructor = Function.bind.apply(Parent2, a);
        var instance = new Constructor();
        if (Class2)
          _setPrototypeOf(instance, Class2.prototype);
        return instance;
      };
    }
    return _construct.apply(null, arguments);
  }
  function _isNativeReflectConstruct() {
    if (typeof Reflect === "undefined" || !Reflect.construct)
      return false;
    if (Reflect.construct.sham)
      return false;
    if (typeof Proxy === "function")
      return true;
    try {
      Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {
      }));
      return true;
    } catch (e) {
      return false;
    }
  }
  function _isNativeFunction(fn) {
    return Function.toString.call(fn).indexOf("[native code]") !== -1;
  }
  function _setPrototypeOf(o, p) {
    _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf5(o2, p2) {
      o2.__proto__ = p2;
      return o2;
    };
    return _setPrototypeOf(o, p);
  }
  function _getPrototypeOf(o) {
    _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf5(o2) {
      return o2.__proto__ || Object.getPrototypeOf(o2);
    };
    return _getPrototypeOf(o);
  }
  function _defineProperty5(obj, key, value) {
    if (key in obj) {
      Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });
    } else {
      obj[key] = value;
    }
    return obj;
  }
  var CopyCode = /* @__PURE__ */ function(_HTMLElement) {
    _inherits(CopyCode2, _HTMLElement);
    var _super = _createSuper(CopyCode2);
    function CopyCode2(code) {
      var _code$match$length;
      var _this;
      _classCallCheck3(this, CopyCode2);
      _this = _super.call(this);
      _defineProperty5(_assertThisInitialized(_this), "code", void 0);
      _defineProperty5(_assertThisInitialized(_this), "num_of_lines", void 0);
      _this.code = code;
      _this.num_of_lines = Math.min((_code$match$length = code.match(/\n/g).length) !== null && _code$match$length !== void 0 ? _code$match$length : 1, 25);
      _this.attachShadow({
        mode: "open"
      });
      return _this;
    }
    _createClass3(CopyCode2, [{
      key: "connectedCallback",
      value: function connectedCallback() {
        this.shadowRoot.innerHTML = '\n    <style>\n       * { box-sizing: border-box; }\n   \n       :host {\n         width: 100%;\n         display: grid;\n         grid-template-columns: repeat(2, 1fr);\n         grid-template-rows: 40px auto;\n         gap: 4px;\n         grid-template-areas:\n           "type      copy-btn"\n           "code-text code-text";\n       }\n       \n       textarea {\n         grid-area: code-text;\n         font-family: monospace;\n         width: 100%;\n       }\n       #type { \n         grid-area: type; \n         font-size: 1.5rem;\n         font-weight: bold;\n         place-self: center;\n        }\n       #copy { \n         grid-area: copy-btn; \n         justify-self: end;\n         align-self: center;\n         padding: 5px 8px;\n         display: inline-flex;\n         align-items: center;\n       }\n   \n       #copy > svg {\n         transform: scale(0.8);\n       }\n     </style>\n     <textarea id = \'code\' rows = '.concat(this.num_of_lines + 1, ">").concat(this.code, "</textarea>\n     <div id = \"type\"> R </div>\n     <button id = 'copy'> ").concat(clipboard_icon, " Copy Code </button>\n   ");
        var code_el = this.shadowRoot.getElementById("code");
        this.shadowRoot.getElementById("copy").addEventListener("click", function() {
          code_el.select();
          document.execCommand("copy");
        });
      }
    }, {
      key: "disconnectedCallback",
      value: function disconnectedCallback() {
      }
    }]);
    return CopyCode2;
  }(/* @__PURE__ */ _wrapNativeSuper(HTMLElement));
  customElements.define("copy-code", CopyCode);
  function copy_code(code) {
    return new CopyCode(code);
  }

  // web-components/focus-modal.ts
  function _typeof5(obj) {
    "@babel/helpers - typeof";
    if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
      _typeof5 = function _typeof8(obj2) {
        return typeof obj2;
      };
    } else {
      _typeof5 = function _typeof8(obj2) {
        return obj2 && typeof Symbol === "function" && obj2.constructor === Symbol && obj2 !== Symbol.prototype ? "symbol" : typeof obj2;
      };
    }
    return _typeof5(obj);
  }
  function _classCallCheck4(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }
  function _defineProperties4(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor)
        descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }
  function _createClass4(Constructor, protoProps, staticProps) {
    if (protoProps)
      _defineProperties4(Constructor.prototype, protoProps);
    if (staticProps)
      _defineProperties4(Constructor, staticProps);
    return Constructor;
  }
  function _inherits2(subClass, superClass) {
    if (typeof superClass !== "function" && superClass !== null) {
      throw new TypeError("Super expression must either be null or a function");
    }
    subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } });
    if (superClass)
      _setPrototypeOf2(subClass, superClass);
  }
  function _createSuper2(Derived) {
    var hasNativeReflectConstruct = _isNativeReflectConstruct2();
    return function _createSuperInternal() {
      var Super = _getPrototypeOf2(Derived), result;
      if (hasNativeReflectConstruct) {
        var NewTarget = _getPrototypeOf2(this).constructor;
        result = Reflect.construct(Super, arguments, NewTarget);
      } else {
        result = Super.apply(this, arguments);
      }
      return _possibleConstructorReturn2(this, result);
    };
  }
  function _possibleConstructorReturn2(self2, call) {
    if (call && (_typeof5(call) === "object" || typeof call === "function")) {
      return call;
    }
    return _assertThisInitialized2(self2);
  }
  function _assertThisInitialized2(self2) {
    if (self2 === void 0) {
      throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    }
    return self2;
  }
  function _wrapNativeSuper2(Class) {
    var _cache = typeof Map === "function" ? new Map() : void 0;
    _wrapNativeSuper2 = function _wrapNativeSuper5(Class2) {
      if (Class2 === null || !_isNativeFunction2(Class2))
        return Class2;
      if (typeof Class2 !== "function") {
        throw new TypeError("Super expression must either be null or a function");
      }
      if (typeof _cache !== "undefined") {
        if (_cache.has(Class2))
          return _cache.get(Class2);
        _cache.set(Class2, Wrapper);
      }
      function Wrapper() {
        return _construct2(Class2, arguments, _getPrototypeOf2(this).constructor);
      }
      Wrapper.prototype = Object.create(Class2.prototype, { constructor: { value: Wrapper, enumerable: false, writable: true, configurable: true } });
      return _setPrototypeOf2(Wrapper, Class2);
    };
    return _wrapNativeSuper2(Class);
  }
  function _construct2(Parent, args, Class) {
    if (_isNativeReflectConstruct2()) {
      _construct2 = Reflect.construct;
    } else {
      _construct2 = function _construct5(Parent2, args2, Class2) {
        var a = [null];
        a.push.apply(a, args2);
        var Constructor = Function.bind.apply(Parent2, a);
        var instance = new Constructor();
        if (Class2)
          _setPrototypeOf2(instance, Class2.prototype);
        return instance;
      };
    }
    return _construct2.apply(null, arguments);
  }
  function _isNativeReflectConstruct2() {
    if (typeof Reflect === "undefined" || !Reflect.construct)
      return false;
    if (Reflect.construct.sham)
      return false;
    if (typeof Proxy === "function")
      return true;
    try {
      Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {
      }));
      return true;
    } catch (e) {
      return false;
    }
  }
  function _isNativeFunction2(fn) {
    return Function.toString.call(fn).indexOf("[native code]") !== -1;
  }
  function _setPrototypeOf2(o, p) {
    _setPrototypeOf2 = Object.setPrototypeOf || function _setPrototypeOf5(o2, p2) {
      o2.__proto__ = p2;
      return o2;
    };
    return _setPrototypeOf2(o, p);
  }
  function _getPrototypeOf2(o) {
    _getPrototypeOf2 = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf5(o2) {
      return o2.__proto__ || Object.getPrototypeOf(o2);
    };
    return _getPrototypeOf2(o);
  }
  function _defineProperty6(obj, key, value) {
    if (key in obj) {
      Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });
    } else {
      obj[key] = value;
    }
    return obj;
  }
  var FocusModal = /* @__PURE__ */ function(_HTMLElement) {
    _inherits2(FocusModal2, _HTMLElement);
    var _super = _createSuper2(FocusModal2);
    function FocusModal2() {
      var _this;
      _classCallCheck4(this, FocusModal2);
      _this = _super.call(this);
      _defineProperty6(_assertThisInitialized2(_this), "_on_close", void 0);
      _defineProperty6(_assertThisInitialized2(_this), "_title", void 0);
      _defineProperty6(_assertThisInitialized2(_this), "_max_width", "450px");
      _defineProperty6(_assertThisInitialized2(_this), "_children", []);
      _defineProperty6(_assertThisInitialized2(_this), "_description", void 0);
      _defineProperty6(_assertThisInitialized2(_this), "has_rendered", false);
      _this.attachShadow({
        mode: "open"
      });
      return _this;
    }
    _createClass4(FocusModal2, [{
      key: "set_title",
      value: function set_title(title) {
        this._title = title;
        return this;
      }
    }, {
      key: "description",
      value: function description(_description) {
        this._description = _description;
        return this;
      }
    }, {
      key: "max_width",
      value: function max_width(width) {
        this._max_width = width;
        return this;
      }
    }, {
      key: "add_element",
      value: function add_element(el) {
        if (this.has_rendered) {
          this.shadowRoot.getElementById("content").appendChild(el);
          return this;
        }
        this._children.push(el);
        return this;
      }
    }, {
      key: "on_close",
      value: function on_close(callback) {
        this._on_close = callback;
        return this;
      }
    }, {
      key: "focus_on",
      value: function focus_on(el_id) {
        this.shadowRoot.getElementById(el_id).focus();
        return this;
      }
    }, {
      key: "setup_close_callbacks",
      value: function setup_close_callbacks() {
        var _this2 = this;
        var exit_fn = function exit_fn2() {
          var _this2$_on_close;
          (_this2$_on_close = _this2._on_close) === null || _this2$_on_close === void 0 ? void 0 : _this2$_on_close.call(_this2);
          _this2.remove();
        };
        this.shadowRoot.getElementById("close").addEventListener("click", exit_fn);
        this.addEventListener("click", exit_fn);
        this.shadowRoot.getElementById("content").addEventListener("click", function(event) {
          event.stopPropagation();
        });
      }
    }, {
      key: "add_to_page",
      value: function add_to_page() {
        document.body.appendChild(this);
        this.has_rendered = true;
        return this;
      }
    }, {
      key: "connectedCallback",
      value: function connectedCallback() {
        this.shadowRoot.innerHTML = "\n    <style>\n       :host {\n         position: absolute;\n         top: 0;\n         left: 0;\n         display: grid;\n         place-content: center;\n         outline: 1px solid red;\n         width: 100%;\n         height: 100vh;\n         background-color: rgba(255, 255, 255, .8);\n         z-index: 990;\n       }\n   \n       /* if backdrop-filter support: make transparent and blurred */\n       @supports ((-webkit-backdrop-filter: blur(4px)) or (backdrop-filter: blur(4px))) {\n         :host {\n           background-color: rgba(255, 255, 255, .05);\n           -webkit-backdrop-filter: blur(4px);\n           backdrop-filter: blur(4px);\n         }\n       }\n   \n       #content {\n         border: 1px solid #bababa;\n         border-radius: 4px;\n         width: 95%;\n         min-width: 400px;\n         max-width: ".concat(this._max_width, ';\n         background: white;\n         padding: 2rem 3rem;\n         position: relative;\n       }\n   \n       #footer {\n         padding-top: 1rem;\n         display: grid;\n         grid-template-columns: repeat(auto-fit, 150px);\n         justify-content: center;\n         gap: 2rem;\n       }\n       \n       #title {\n         margin: 0;\n       }\n   \n       copy-code {\n         margin-top: 0.5rem;\n         margin-bottom: 0.5rem;\n       }\n   \n       #close {\n         padding: 0;\n         display: inline-flex;\n         align-items: center;\n         position: absolute;\n         right: 4px;\n         top: 4px;\n       }\n   \n       .centered {\n         margin-left: auto;\n         margin-right: auto;\n       }\n     </style>\n     <div id="content">\n       ').concat(this._title ? "<h2 id = 'title'> ".concat(this._title, " </h2>") : "", "\n       <button id = 'close'> ").concat(close_icon, " </button>\n       ").concat(this._description ? '<div id = "description">'.concat(this._description, "</div>") : "", "\n     </div>\n   ");
        var content = this.shadowRoot.getElementById("content");
        this._children.forEach(function(el) {
          content.appendChild(el);
        });
        this.setup_close_callbacks();
      }
    }]);
    return FocusModal2;
  }(/* @__PURE__ */ _wrapNativeSuper2(HTMLElement));
  customElements.define("focus-modal", FocusModal);
  function create_focus_modal() {
    return new FocusModal();
  }

  // wrap_in_grided.ts
  var import_es_array_iterator13 = __toModule(require_es_array_iterator());

  // make-toggle_switch.ts
  function make_toggle_switch(off_text, on_text, on_change) {
    var container = block_el("div.toggle-switch");
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
    var _shadow_el = shadow_el("div.toggle-switch", container), el = _shadow_el.el, style_sheet = _shadow_el.style_sheet;
    style_sheet.innerHTML = '\n  div.toggle-switch {\n    display: inline-grid;\n    grid-template-columns: 1fr auto 1fr;\n    grid-gap: 3px;\n    width: 180px;\n    align-items: center;\n    justify-items: center;\n    padding-left: 4px;\n    padding-right: 4px;\n  }\n  \n  .toggle-switch > span {\n    font-size: 1rem;\n  }\n  \n  .toggle-switch > .off-text {\n    text-align: end;\n  }\n  \n  .switch {\n    position: relative;\n    display: inline-block;\n    width: 60px;\n    height: 34px;\n  }\n  \n  .switch input {\n    opacity: 0;\n    width: 0;\n    height: 0;\n  }\n  \n  .slider {\n    position: absolute;\n    cursor: pointer;\n    top: 0;\n    left: 0;\n    right: 0;\n    bottom: 0;\n    border-radius: 34px;\n    background-color: #ccc;\n    -webkit-transition: .4s;\n    transition: .4s;\n  }\n  \n  .slider:before {\n    position: absolute;\n    content: "";\n    height: 26px;\n    width: 26px;\n    left: 4px;\n    bottom: 4px;\n    border-radius: 50%;\n    background-color: white;\n    -webkit-transition: .4s;\n    transition: .4s;\n  }\n  \n  input:checked + .slider {\n    background-color: #2196F3;\n  }\n  \n  input:focus + .slider {\n    box-shadow: 0 0 1px #2196F3;\n  }\n  \n  input:checked + .slider:before {\n    -webkit-transform: translateX(26px);\n    -ms-transform: translateX(26px);\n    transform: translateX(26px);\n  }\n  ';
    return el;
  }

  // wrap_in_grided.ts
  function _toConsumableArray4(arr) {
    return _arrayWithoutHoles4(arr) || _iterableToArray4(arr) || _unsupportedIterableToArray6(arr) || _nonIterableSpread4();
  }
  function _nonIterableSpread4() {
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
  function _iterableToArray4(iter) {
    if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null)
      return Array.from(iter);
  }
  function _arrayWithoutHoles4(arr) {
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
  function wrap_in_grided(app_state, finish_btn) {
    var grid_is_filled = app_state.container.hasChildNodes();
    var buttons = [click_button("#see-layout-code", "Code for layout", function() {
      return setShinyInput("see_layout_code", app_state.current_layout, true);
    }), click_button("#done", finish_btn.label, function() {
      return finish_btn.on_done(app_state.current_layout);
    })];
    if (grid_is_filled) {
      buttons.push(make_toggle_switch("Edit layout", "Interact mode", toggle_interaction_mode));
    }
    var settings_panel_el = block_el("div#grided_gap_size_controls.settings.panel-body");
    var grided_ui = block_el("div#grided__holder", block_el("div#grided__header", text_el("h2", "GridEd<sub>(itor)</sub>: Build a grid layout for your Shiny app"), block_el.apply(void 0, ["div.code_btns"].concat(buttons))), block_el("div#grided__settings", text_el("h3", "".concat(settings_icon, " Settings")), settings_panel_el), block_el("div#grided__instructions", text_el("h3", "".concat(instructions_icon, " Instructions")), text_el("div.panel-body", "\n      <strong>Add or remove a row/column:</strong>\n      <ul> \n        <li> Click the ".concat(plus_icon, " in gaps between rows and columns to add a row or column at that location </li>\n        <li> Click the ").concat(trashcan_icon, ' next to the row/column sizing controls to remove it</li>\n      </ul>\n      <strong>Add an element:</strong>\n      <ul>\n        <li>Click and drag over the grid to define a region</li>\n        <li>Enter id of element in popup</li>\n      </ul>\n      <strong>Edit an element:</strong>\n      <ul>\n        <li>Drag the upper left, middle, or bottom right corners of the element to reposition</li>\n      </ul>\n      <strong>Remove an element:</strong>\n      <ul>\n        <li>Find element entry in "Added elements" panel and click the ').concat(trashcan_icon, " icon</li>\n        <li>You can't remove elements are part of a running app</li>\n      </ul>"))), block_el("div#grided__elements", text_el("h3", "".concat(elements_icon, " Added elements")), block_el("div.panel-body", block_el("div#added_elements"))), block_el("div#grided__editor", block_el("div#editor-wrapper", text_el("div#editor-browser-header", browser_header_html), block_el("div#editor-app-window", app_state.container))));
    document.querySelector("body").appendChild(grided_ui);
    app_state.container.style.height = "100%";
    app_state.container.style.width = "100%";
    app_state.container.style.display = "grid";
    app_state.container.style.maxWidth = "100%";
    function toggle_interaction_mode(interact_is_on) {
      [].concat(_toConsumableArray4(app_state.container.querySelectorAll(".added-element")), _toConsumableArray4(app_state.container.querySelectorAll(".grid-cell")), _toConsumableArray4(grided_ui.querySelectorAll(".tract-controls")), [grided_ui.querySelector("#grided__settings .panel-body"), grided_ui.querySelector("#added_elements"), grided_ui.querySelector("#drag_canvas")]).forEach(function(el) {
        if (interact_is_on) {
          el.classList.add("disabled");
        } else {
          el.classList.remove("disabled");
        }
      });
    }
    if (grid_is_filled) {
      app_state.container.style.gap = "1rem";
      app_state.container.style.padding = "1rem";
    }
  }
  function cleanup_grided_ui() {
    [].concat(_toConsumableArray4(document.querySelectorAll(".grid-cell")), _toConsumableArray4(document.querySelectorAll(".added-element")), _toConsumableArray4(document.querySelectorAll(".tract-controls")), [document.querySelector(".drag_selection_box"), document.getElementById("drag_canvas")]).forEach(function(el) {
      return el.remove();
    });
  }
  function add_existing_elements_to_app(app_state) {
    _toConsumableArray4(app_state.container.children).forEach(function(el) {
      var bbox = el.getBoundingClientRect();
      if (bbox.width === 0 && bbox.height === 0)
        return;
      if (el.classList.contains("grid-cell") || el.classList.contains("drag_selection_box") || el.classList.contains("added-element") || el.id === "drag_canvas") {
        el.remove();
        return;
      }
      app_state.add_element({
        id: el.id,
        grid_pos: get_pos_on_grid(el),
        mirrored_element: el
      }, false);
    });
  }
  function hookup_gap_size_controls(app_state, settings_panel_el, starting_gap) {
    var css_input = make_css_unit_input({
      parent_el: make_el(settings_panel_el, "div#gap_size_chooser.plus_minus_input.settings-grid", {
        innerHTML: '<span class = "input-label">Panel gap size</span>'
      }),
      selector: "#gap_size_chooser",
      on_change: function on_change(x) {
        return app_state.update_grid({
          gap: x
        });
      },
      allowed_units: ["px", "rem"],
      snap_to_defaults: false
    });
    if (starting_gap) {
      css_input.update_value(starting_gap);
    }
    return css_input;
  }

  // Layout_Editor.ts
  var _templateObject3;
  var _templateObject23;
  var _templateObject32;
  var _templateObject4;
  var _templateObject5;
  function _createForOfIteratorHelper2(o, allowArrayLike) {
    var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"];
    if (!it) {
      if (Array.isArray(o) || (it = _unsupportedIterableToArray7(o)) || allowArrayLike && o && typeof o.length === "number") {
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
    return _arrayWithoutHoles5(arr) || _iterableToArray5(arr) || _unsupportedIterableToArray7(arr) || _nonIterableSpread5();
  }
  function _nonIterableSpread5() {
    throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
  }
  function _unsupportedIterableToArray7(o, minLen) {
    if (!o)
      return;
    if (typeof o === "string")
      return _arrayLikeToArray7(o, minLen);
    var n = Object.prototype.toString.call(o).slice(8, -1);
    if (n === "Object" && o.constructor)
      n = o.constructor.name;
    if (n === "Map" || n === "Set")
      return Array.from(o);
    if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))
      return _arrayLikeToArray7(o, minLen);
  }
  function _iterableToArray5(iter) {
    if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null)
      return Array.from(iter);
  }
  function _arrayWithoutHoles5(arr) {
    if (Array.isArray(arr))
      return _arrayLikeToArray7(arr);
  }
  function _arrayLikeToArray7(arr, len) {
    if (len == null || len > arr.length)
      len = arr.length;
    for (var i = 0, arr2 = new Array(len); i < len; i++) {
      arr2[i] = arr[i];
    }
    return arr2;
  }
  function _taggedTemplateLiteral3(strings, raw) {
    if (!raw) {
      raw = strings.slice(0);
    }
    return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } }));
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
          _defineProperty7(target, key, source[key]);
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
  function _classCallCheck5(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }
  function _defineProperties5(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor)
        descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }
  function _createClass5(Constructor, protoProps, staticProps) {
    if (protoProps)
      _defineProperties5(Constructor.prototype, protoProps);
    if (staticProps)
      _defineProperties5(Constructor, staticProps);
    return Constructor;
  }
  function _defineProperty7(obj, key, value) {
    if (key in obj) {
      Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });
    } else {
      obj[key] = value;
    }
    return obj;
  }
  var LayoutEditor = /* @__PURE__ */ function() {
    function LayoutEditor2(_ref) {
      var _this = this;
      var entry_type = _ref.entry_type, starting_grid = _ref.grid, starting_elements = _ref.elements, finish_btn = _ref.finish_btn, on_update = _ref.on_update;
      _classCallCheck5(this, LayoutEditor2);
      _defineProperty7(this, "gap_size_setting", void 0);
      _defineProperty7(this, "current_cells", []);
      _defineProperty7(this, "elements", []);
      _defineProperty7(this, "on_update", void 0);
      _defineProperty7(this, "container_selector", void 0);
      _defineProperty7(this, "container", void 0);
      _defineProperty7(this, "grid_styles", void 0);
      _defineProperty7(this, "mode", void 0);
      _defineProperty7(this, "grid_layout", void 0);
      _defineProperty7(this, "tract_controls", void 0);
      _defineProperty7(this, "entry_type", void 0);
      this.entry_type = entry_type;
      var existing_wrapped_app = document.querySelector(".wrapped-existing-app");
      if (existing_wrapped_app) {
        this.container = existing_wrapped_app;
      } else {
        this.container = entry_type === "edit-existing-app" ? find_first_grid_node() : block_el("div#grid_page");
      }
      this.grid_layout = new GridLayout(this.container);
      if (!existing_wrapped_app) {
        wrap_in_grided(this, finish_btn);
      } else {
        cleanup_grided_ui();
      }
      add_existing_elements_to_app(this);
      this.gap_size_setting = hookup_gap_size_controls(this, document.getElementById("grided_gap_size_controls"), starting_grid === null || starting_grid === void 0 ? void 0 : starting_grid.gap);
      this.grid_styles = this.container.style;
      this.mode = entry_type === "edit-existing-app" ? "Existing" : "New";
      this.on_update = on_update;
      if (entry_type !== "edit-existing-app") {
        this.update_grid(_objectSpread3(_objectSpread3({}, starting_grid), {}, {
          dont_update_history: true
        }));
        starting_elements.forEach(function(el_msg) {
          var start_row = el_msg.start_row, end_row = el_msg.end_row, start_col = el_msg.start_col, end_col = el_msg.end_col;
          _this.add_element({
            id: el_msg.id,
            grid_pos: {
              start_row: start_row,
              end_row: end_row,
              start_col: start_col,
              end_col: end_col
            }
          }, false);
        });
      } else if (entry_type === "edit-existing-app" && !existing_wrapped_app) {
        var current_grid_props = get_styles_for_selector_with_targets("#".concat(this.container.id), ["gridTemplateColumns", "gridTemplateRows"]);
        this.update_grid({
          rows: current_grid_props.gridTemplateRows.split(" "),
          cols: current_grid_props.gridTemplateColumns.split(" "),
          gap: get_gap_size(current_grid_props.gap)
        });
      } else if (entry_type === "edit-existing-app" && existing_wrapped_app) {
        this.elements.forEach(function(grid_el) {
          var id = grid_el.id;
          var element_def = starting_elements.find(function(el) {
            return el.id === id;
          });
          grid_el.position = element_def;
        });
        this.update_grid(_objectSpread3(_objectSpread3({}, starting_grid), {}, {
          dont_update_history: true,
          force: true
        }));
      } else {
        console.error("Neither starting layout was provided nor is there an existing grid app");
      }
      if (entry_type !== "layout-gallery") {
        setShinyInput("starting_layout", this.current_layout, true);
      }
    }
    _createClass5(LayoutEditor2, [{
      key: "current_layout",
      get: function get() {
        return {
          grid: this.grid_layout.attrs,
          elements: this.elements.map(function(el) {
            return el.info;
          })
        };
      }
    }, {
      key: "next_color",
      get: function get() {
        var colors = ["#e41a1c", "#377eb8", "#4daf4a", "#984ea3", "#ff7f00", "#a65628", "#f781bf"];
        return colors[this.elements.length % colors.length];
      }
    }, {
      key: "add_element",
      value: function add_element(el_props) {
        var send_update = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : true;
        if (el_props.mirrored_element) {
          el_props.id = el_props.id.replace(/^.+?__/g, "");
        }
        var grid_item = draw_elements(this, {
          id: el_props.id,
          mirrored_el: el_props.mirrored_element
        });
        grid_item.position = el_props.grid_pos;
        this.elements.push(grid_item);
        if (send_update) {
          this.send_update();
        }
      }
    }, {
      key: "remove_elements",
      value: function remove_elements(ids) {
        var _this2 = this;
        as_array(ids).forEach(function(el_id) {
          var entry_index = _this2.elements.findIndex(function(el) {
            return el.id === el_id;
          });
          _this2.elements[entry_index].remove();
          _this2.elements.splice(entry_index, 1);
        });
        this.send_update();
      }
    }, {
      key: "add_tract",
      value: function add_tract(dir, new_index) {
        this.elements.forEach(function(el) {
          var start_id = dir === "rows" ? "start_row" : "start_col";
          var end_id = dir === "rows" ? "end_row" : "end_col";
          var el_position = el.position;
          if (new_index >= el_position[end_id]) {
          } else if (new_index < el_position[start_id]) {
            el_position[start_id]++;
            el_position[end_id]++;
          } else {
            el[end_id] = el_position[end_id]++;
          }
          el.position = el_position;
        });
        var tract_sizes = this.grid_layout[dir];
        tract_sizes.splice(new_index, 0, "1fr");
        this.update_grid(_defineProperty7({}, dir, tract_sizes));
      }
    }, {
      key: "remove_tract",
      value: function remove_tract(dir, index) {
        var trouble_elements = this.elements.filter(function(el) {
          var _make_start_end_for_d = make_start_end_for_dir(dir), start_id = _make_start_end_for_d.start_id, end_id = _make_start_end_for_d.end_id;
          var el_position = el.position;
          return el_position[start_id] === el_position[end_id] && el_position[start_id] === index;
        });
        if (trouble_elements.length > 0) {
          show_conflict_popup(trouble_elements);
          return;
        }
        this.elements.forEach(function(el) {
          var _make_start_end_for_d2 = make_start_end_for_dir(dir), start_id = _make_start_end_for_d2.start_id, end_id = _make_start_end_for_d2.end_id;
          var el_position = el.position;
          if (el_position[start_id] > index) {
            el_position[start_id]--;
          }
          if (el_position[end_id] >= index) {
            el_position[end_id]--;
          }
          el.position = el_position;
        });
        var tract_sizes = this.grid_layout[dir];
        tract_sizes.splice(index - 1, 1);
        this.update_grid(_defineProperty7({}, dir, tract_sizes));
      }
    }, {
      key: "make_el",
      value: function make_el2(sel_txt, opts) {
        return make_el(this.container, sel_txt, opts);
      }
    }, {
      key: "setup_drag",
      value: function setup_drag(opts) {
        var _this3 = this;
        var drag_feedback_rect;
        var start_rect;
        var start_loc;
        var editor_el = document.querySelector("#grided__editor");
        var update_grid_pos = function update_grid_pos2(grid_item, bounding_rect) {
          var grid_extent = get_drag_extent_on_grid(_this3, bounding_rect);
          grid_item.position = grid_extent;
          return grid_extent;
        };
        opts.watching_element.onmousedown = function(event) {
          var _opts$grid_item;
          start_loc = event;
          _this3.container.appendChild(opts.grid_item.el);
          start_rect = ((_opts$grid_item = opts.grid_item) === null || _opts$grid_item === void 0 ? void 0 : _opts$grid_item.bounding_rect) || {
            left: event.offsetX,
            right: event.offsetX,
            top: event.offsetY,
            bottom: event.offsetY
          };
          drag_feedback_rect = make_el(_this3.container.querySelector("#drag_canvas"), "div.drag-feedback-rect", {
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
      key: "send_update",
      value: function send_update() {
        this.on_update(_objectSpread3({
          entry_type: this.entry_type
        }, this.current_layout));
      }
    }, {
      key: "update_tract",
      value: function update_tract(opts) {
        var _this$update_grid3;
        var tract_index = opts.tract_index, dir = opts.dir, new_value = opts.new_value, is_dragging = opts.is_dragging;
        var tract_values = this.grid_layout[dir];
        tract_values[tract_index - 1] = new_value;
        this.update_grid((_this$update_grid3 = {}, _defineProperty7(_this$update_grid3, dir, tract_values), _defineProperty7(_this$update_grid3, "dont_update_history", is_dragging), _this$update_grid3));
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
          this.elements.forEach(function(el) {
            el.fill_if_in_auto_row();
          });
        }
        this.tract_controls.update_positions();
        if (!opts.dont_update_history) {
          this.send_update();
        }
      }
    }]);
    return LayoutEditor2;
  }();
  var grid_cell_styles = css(_templateObject3 || (_templateObject3 = _taggedTemplateLiteral3(["\n  background: var(--off-white, grey);\n  border: 1px solid var(--gray, grey);\n  box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;\n  border-radius: var(--element_roundness);\n\n  &.transparent {\n    background: none;\n  }\n\n  &.selected {\n    background: currentColor;\n    border: 2px solid var(--light-gray);\n  }\n"])));
  function fill_grid_cells(app_state) {
    app_state.current_cells.forEach(function(e) {
      return e.remove();
    });
    app_state.current_cells = [];
    for (var row_i = 1; row_i <= app_state.grid_layout.num_rows; row_i++) {
      for (var col_i = 1; col_i <= app_state.grid_layout.num_cols; col_i++) {
        app_state.current_cells.push(app_state.make_el("div.r".concat(row_i, ".c").concat(col_i, ".grid-cell.").concat(grid_cell_styles), {
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
    app_state.tract_controls = setup_tract_controls(app_state);
  }
  var added_element_styles = css(_templateObject23 || (_templateObject23 = _taggedTemplateLiteral3(["\n  border-radius: var(--element_roundness);\n  border-width: 3px;\n  border-style: solid;\n  transition: border-width 0.2s ease-in-out;\n  background: none;\n  position: relative;\n\n  &.in-list {\n    height: 35px;\n    margin: 0 0 5px 0;\n    padding: 0.65rem 1rem;\n    display: flex;\n    justify-content: space-between;\n    align-items: center;\n  }\n\n  .hovered {\n    border-width: 7px;\n  }\n\n  &.in-list.hovered {\n    /* Emphasize by making a bit bigger */\n    transform: scale(1.05);\n  }\n\n  /* This is filler text to make auto sizing work. It's invisible to the user\n     so it doesn't distract. Not sure if this is the best way to do it but I think\n     it's worth a go. \n  */\n  .filler_text {\n    color: rgba(128, 128, 128, 0.5);\n    user-select: none;\n    display: none;\n  }\n\n  &.in-auto-row .filler_text {\n    display: block;\n  }\n"])));
  var dragger_handle = css(_templateObject32 || (_templateObject32 = _taggedTemplateLiteral3(["\n  --radius: 18px;\n  font-size: 12px;\n  position: absolute;\n  height: var(--radius);\n  width: var(--radius);\n  cursor: grab;\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  color: var(--off-white);\n  opacity: 0.5;\n\n  & > svg {\n    transform: scale(0.85);\n  }\n\n  &.top-left {\n    top: -2px;\n    left: -2px;\n    cursor: nw-resize;\n  }\n  &.bottom-right {\n    bottom: -2px;\n    right: -2px;\n    cursor: se-resize;\n  }\n\n  &.center {\n    top: calc(50% - var(--radius) / 2);\n    right: calc(50% - var(--radius) / 2);\n    border-radius: var(--element_roundness);\n    cursor: grab;\n  }\n  &.center:active {\n    cursor: grabbing;\n  }\n\n  i {\n    display: inline-block;\n  }\n\n  &.top-left i {\n    transform: rotate(315deg);\n  }\n  &.bottom-right i {\n    transform: rotate(135deg);\n  }\n\n  &.top-left,\n  &.bottom-right {\n    border-radius: var(--element_roundness) 0;\n  }\n"])));
  var current_sel_box = css(_templateObject4 || (_templateObject4 = _taggedTemplateLiteral3(["\n  border-style: dashed;\n  display: none;\n  pointer-events: none;\n"])));
  var drag_canvas_styles = css(_templateObject5 || (_templateObject5 = _taggedTemplateLiteral3(["\n  margin-left: calc(-1 * var(--grid-gap));\n  margin-top: calc(-1 * var(--grid-gap));\n  width: calc(100% + 2 * var(--grid-gap));\n  height: calc(100% + 2 * var(--grid-gap));\n  grid-row: 1/-1;\n  grid-column: 1/-1;\n  position: relative;\n\n  .drag-feedback-rect {\n    pointer-events: none;\n    position: absolute;\n    background: linear-gradient(90deg, var(--dark-gray) 50%, transparent 50%),\n      linear-gradient(90deg, var(--dark-gray) 50%, transparent 50%),\n      linear-gradient(0deg, var(--dark-gray) 50%, transparent 50%),\n      linear-gradient(0deg, var(--dark-gray) 50%, transparent 50%);\n    background-repeat: repeat-x, repeat-x, repeat-y, repeat-y;\n    background-size: 15px 4px, 15px 4px, 4px 15px, 4px 15px;\n    animation: border-dance 16s infinite linear;\n  }\n\n  @keyframes border-dance {\n    0% {\n      background-position: 0 0, 100% 100%, 0 100%, 100% 0;\n    }\n    100% {\n      background-position: 100% 0, 0 100%, 0 0, 100% 100%;\n    }\n  }\n"])));
  function setup_new_item_drag(app_state) {
    var current_selection_box = new GridItem({
      id: "selection box",
      el: app_state.make_el("div.drag_selection_box.".concat(added_element_styles, ".").concat(current_sel_box)),
      parent_layout: app_state.grid_layout
    });
    var drag_canvas = app_state.make_el("div#drag_canvas.".concat(drag_canvas_styles));
    app_state.setup_drag({
      watching_element: drag_canvas,
      grid_item: current_selection_box,
      drag_dir: "bottom-right",
      on_start: function on_start() {
        current_selection_box.style.borderColor = app_state.next_color;
      },
      on_end: function on_end(_ref2) {
        var grid = _ref2.grid;
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
  function setup_tract_controls(app_state) {
    var editor_container = document.querySelector("#grided__editor");
    var controls = {
      rows: build_controls_for_dir(app_state, "rows", editor_container),
      cols: build_controls_for_dir(app_state, "cols", editor_container)
    };
    update_positions();
    editor_container.querySelector("#editor-app-window").onscroll = function() {
      return update_positions(["rows"]);
    };
    var resize_timeout;
    window.addEventListener("resize", function() {
      clearTimeout(resize_timeout);
      resize_timeout = window.setTimeout(function() {
        return update_positions();
      }, 300);
    });
    function update_positions() {
      var which_dirs = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : ["rows", "cols"];
      var editor_pos = editor_container.getBoundingClientRect();
      var wrapper_pos = pos_relative_to_container(editor_pos, editor_container.querySelector("#editor-wrapper"));
      var _iterator = _createForOfIteratorHelper2(which_dirs), _step;
      try {
        var _loop = function _loop2() {
          var dir = _step.value;
          controls[dir].forEach(function(_ref3) {
            var matched_cell = _ref3.matched_cell, el = _ref3.el;
            var bounding_rect = pos_relative_to_container(editor_pos, matched_cell);
            Object.assign(el.style, dir === "cols" ? {
              left: "calc(".concat(bounding_rect.left, "px)"),
              width: "calc(".concat(bounding_rect.width, "px)"),
              top: "calc(".concat(wrapper_pos.top, "px - var(--editor-top-pad))")
            } : {
              top: "calc(".concat(bounding_rect.top, "px)"),
              height: "calc(".concat(bounding_rect.height, "px)"),
              left: "calc(".concat(bounding_rect.left, "px - var(--editor-left-pad) - ").concat(app_state.grid_layout.attrs.gap, " - 2px)")
            });
          });
        };
        for (_iterator.s(); !(_step = _iterator.n()).done; ) {
          _loop();
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
  function element_naming_ui(app_state, _ref4) {
    var grid_pos = _ref4.grid_pos, selection_box = _ref4.selection_box;
    var name_form = create_el({
      sel_txt: "form#name_form.centered",
      styles: {
        width: "100%",
        display: "grid",
        gridTemplateColumns: "50% 100px",
        gap: "1rem",
        justifyContent: "center"
      },
      children: [create_el({
        sel_txt: "input#name_input",
        props: {
          type: "text"
        },
        event_listener: {
          event: "input",
          func: hide_warning_msg
        }
      }), create_el({
        sel_txt: "input#name_submit",
        props: {
          type: "submit"
        }
      })],
      event_listener: {
        event: "submit",
        func: function func(event) {
          event.preventDefault();
          var id = this["name_input"].value.replace(/\s/g, "_");
          var element_exists = !!app_state.elements.find(function(el) {
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
    var modal = create_focus_modal().set_title("Name your element:").description("\n      This name will be used to place items in your app.\n      For instance if you want to place a plot in this element,\n      this name will match the label of the plot output\n    ").add_element(name_form).on_close(reset_el_creation).add_to_page().focus_on("name_input");
    var warning_msg;
    function warn_about_bad_id(msg) {
      warning_msg = create_el({
        sel_txt: "span#bad_id_msg",
        text: msg,
        styles: {
          color: "orangered",
          fontStyle: "italic",
          fontWeight: "lighter",
          fontSize: "0.9rem"
        }
      });
      modal.add_element(warning_msg);
    }
    function hide_warning_msg() {
      if (warning_msg) {
        warning_msg.remove();
      }
    }
    function reset_el_creation() {
      modal.remove();
      selection_box.style.display = "none";
    }
  }
  function draw_elements(app_state, el_info) {
    var id = el_info.id, mirrored_el = el_info.mirrored_el;
    var el_color = app_state.next_color;
    var mirrors_existing = typeof mirrored_el !== "undefined";
    var grid_el = app_state.make_el("div#".concat(id, ".el_").concat(id, ".added-element.").concat(added_element_styles), {
      innerHTML: filler_text,
      styles: {
        borderColor: app_state.next_color,
        position: "relative"
      }
    });
    var list_el = make_el(document.querySelector("#added_elements"), "div.el_".concat(id, ".added-element.").concat(added_element_styles, ".in-list"), {
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
    var grid_item = new GridItem({
      id: id,
      el: grid_el,
      mirrored_el: mirrored_el,
      sibling_el: list_el,
      parent_layout: app_state.grid_layout
    });
    ["top-left", "bottom-right", "center"].forEach(function(handle_type) {
      app_state.setup_drag({
        watching_element: make_el(grid_el, "div.dragger.visible.".concat(dragger_handle, ".").concat(handle_type), {
          styles: {
            background: el_color
          },
          innerHTML: handle_type === "center" ? drag_icon : handle_type === "bottom-right" ? se_arrow : nw_arrow
        }),
        grid_item: grid_item,
        drag_dir: handle_type,
        on_end: function on_end() {
          app_state.send_update();
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
      return "\n    ".concat(id_list, "\n    <li> <strong style='font-size: 1.65rem;'> ").concat(el.id, " </strong> </li>\n    ");
    }, "<ul>") + "</ul>";
    var modal = create_focus_modal().set_title("Sorry! Can't make that update").description("<p> This is because it would result in the following elements \n    being removed from your app:</p>\n    ".concat(conflicting_elements_list, "\n    <p> Either re-arrange these elements to not reside in the removed grid or \n    column or remove them from your app before running grided.</p>\n    "));
    modal.add_element(create_el({
      sel_txt: "button#accept_result",
      text: "Okay",
      event_listener: {
        event: "click",
        func: function func() {
          modal.remove();
        }
      }
    }));
    modal.add_to_page();
  }

  // state_tracking.ts
  var save_gallery_history = function save_gallery_history2(layouts, selected) {
    var opts = {
      layouts: layouts
    };
    if (selected) {
      opts.selected = selected;
    }
    var state_dump = {
      type: "layout_chooser",
      data: opts
    };
    window.history.pushState(state_dump, null, null);
  };
  var save_editor_history = function save_editor_history2(_ref) {
    var entry_type = _ref.entry_type, grid = _ref.grid, elements = _ref.elements;
    var state_dump = {
      type: "layout_edit",
      data: {
        entry_type: entry_type,
        grid: grid,
        elements: elements
      }
    };
    window.history.pushState(state_dump, null, null);
  };

  // web-components/layout-gallery.ts
  var import_es_array_iterator16 = __toModule(require_es_array_iterator());
  var import_es_map4 = __toModule(require_es_map());

  // web-components/grid-preview.ts
  var import_es_array_iterator15 = __toModule(require_es_array_iterator());
  var import_es_map3 = __toModule(require_es_map());
  function _typeof6(obj) {
    "@babel/helpers - typeof";
    if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
      _typeof6 = function _typeof8(obj2) {
        return typeof obj2;
      };
    } else {
      _typeof6 = function _typeof8(obj2) {
        return obj2 && typeof Symbol === "function" && obj2.constructor === Symbol && obj2 !== Symbol.prototype ? "symbol" : typeof obj2;
      };
    }
    return _typeof6(obj);
  }
  function _classCallCheck6(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }
  function _defineProperties6(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor)
        descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }
  function _createClass6(Constructor, protoProps, staticProps) {
    if (protoProps)
      _defineProperties6(Constructor.prototype, protoProps);
    if (staticProps)
      _defineProperties6(Constructor, staticProps);
    return Constructor;
  }
  function _inherits3(subClass, superClass) {
    if (typeof superClass !== "function" && superClass !== null) {
      throw new TypeError("Super expression must either be null or a function");
    }
    subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } });
    if (superClass)
      _setPrototypeOf3(subClass, superClass);
  }
  function _createSuper3(Derived) {
    var hasNativeReflectConstruct = _isNativeReflectConstruct3();
    return function _createSuperInternal() {
      var Super = _getPrototypeOf3(Derived), result;
      if (hasNativeReflectConstruct) {
        var NewTarget = _getPrototypeOf3(this).constructor;
        result = Reflect.construct(Super, arguments, NewTarget);
      } else {
        result = Super.apply(this, arguments);
      }
      return _possibleConstructorReturn3(this, result);
    };
  }
  function _possibleConstructorReturn3(self2, call) {
    if (call && (_typeof6(call) === "object" || typeof call === "function")) {
      return call;
    }
    return _assertThisInitialized3(self2);
  }
  function _assertThisInitialized3(self2) {
    if (self2 === void 0) {
      throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    }
    return self2;
  }
  function _wrapNativeSuper3(Class) {
    var _cache = typeof Map === "function" ? new Map() : void 0;
    _wrapNativeSuper3 = function _wrapNativeSuper5(Class2) {
      if (Class2 === null || !_isNativeFunction3(Class2))
        return Class2;
      if (typeof Class2 !== "function") {
        throw new TypeError("Super expression must either be null or a function");
      }
      if (typeof _cache !== "undefined") {
        if (_cache.has(Class2))
          return _cache.get(Class2);
        _cache.set(Class2, Wrapper);
      }
      function Wrapper() {
        return _construct3(Class2, arguments, _getPrototypeOf3(this).constructor);
      }
      Wrapper.prototype = Object.create(Class2.prototype, { constructor: { value: Wrapper, enumerable: false, writable: true, configurable: true } });
      return _setPrototypeOf3(Wrapper, Class2);
    };
    return _wrapNativeSuper3(Class);
  }
  function _construct3(Parent, args, Class) {
    if (_isNativeReflectConstruct3()) {
      _construct3 = Reflect.construct;
    } else {
      _construct3 = function _construct5(Parent2, args2, Class2) {
        var a = [null];
        a.push.apply(a, args2);
        var Constructor = Function.bind.apply(Parent2, a);
        var instance = new Constructor();
        if (Class2)
          _setPrototypeOf3(instance, Class2.prototype);
        return instance;
      };
    }
    return _construct3.apply(null, arguments);
  }
  function _isNativeReflectConstruct3() {
    if (typeof Reflect === "undefined" || !Reflect.construct)
      return false;
    if (Reflect.construct.sham)
      return false;
    if (typeof Proxy === "function")
      return true;
    try {
      Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {
      }));
      return true;
    } catch (e) {
      return false;
    }
  }
  function _isNativeFunction3(fn) {
    return Function.toString.call(fn).indexOf("[native code]") !== -1;
  }
  function _setPrototypeOf3(o, p) {
    _setPrototypeOf3 = Object.setPrototypeOf || function _setPrototypeOf5(o2, p2) {
      o2.__proto__ = p2;
      return o2;
    };
    return _setPrototypeOf3(o, p);
  }
  function _getPrototypeOf3(o) {
    _getPrototypeOf3 = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf5(o2) {
      return o2.__proto__ || Object.getPrototypeOf(o2);
    };
    return _getPrototypeOf3(o);
  }
  function _defineProperty8(obj, key, value) {
    if (key in obj) {
      Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });
    } else {
      obj[key] = value;
    }
    return obj;
  }
  var GridPreview = /* @__PURE__ */ function(_HTMLElement) {
    _inherits3(GridPreview2, _HTMLElement);
    var _super = _createSuper3(GridPreview2);
    function GridPreview2() {
      var _this;
      _classCallCheck6(this, GridPreview2);
      _this = _super.call(this);
      _defineProperty8(_assertThisInitialized3(_this), "grid", void 0);
      _defineProperty8(_assertThisInitialized3(_this), "_render_size", void 0);
      _defineProperty8(_assertThisInitialized3(_this), "_shown_size", void 0);
      _defineProperty8(_assertThisInitialized3(_this), "name", void 0);
      _defineProperty8(_assertThisInitialized3(_this), "elements", void 0);
      _defineProperty8(_assertThisInitialized3(_this), "hover_animation", void 0);
      _defineProperty8(_assertThisInitialized3(_this), "_on_select", void 0);
      _this.attachShadow({
        mode: "open"
      });
      _this.grid = {
        rows: ["1fr"],
        cols: ["1fr"],
        gap: "1rem"
      };
      _this.elements = [];
      _this._render_size = 1250;
      _this._shown_size = 250;
      _this._on_select = function() {
        return console.log("Selected ".concat(_this.name));
      };
      _this.hover_animation = true;
      return _this;
    }
    _createClass6(GridPreview2, [{
      key: "connectedCallback",
      value: function connectedCallback() {
        var _this2 = this;
        var scale = this._render_size / this._shown_size;
        var scale_units = function scale_units2(unit) {
          if (unit.includes("fr") || unit.includes("auto"))
            return unit;
          return "calc(".concat(unit, "/ ").concat(scale, ")");
        };
        var build_tract_definition = function build_tract_definition2(tract_sizing) {
          if (!(tract_sizing instanceof Array)) {
            tract_sizing = [tract_sizing];
          }
          return tract_sizing.map(function(x) {
            return scale_units(x);
          }).join(" ");
        };
        var corner_radius = "".concat(20 / scale, "px");
        this.shadowRoot.innerHTML = "\n    <style>\n      * { box-sizing: border-box; }\n\n      #layout {\n        box-shadow: rgb(50 50 93 / 25%) 0px 2px 8px 1px;\n        border-radius: ".concat(corner_radius, ";\n        width: ").concat(this._shown_size, "px;\n        height: ").concat(this._shown_size, "px;\n        display: grid;\n        grid-template-rows: ").concat(build_tract_definition(this.grid.rows), ";\n        grid-template-columns: ").concat(build_tract_definition(this.grid.cols), ";\n        gap: ").concat(scale_units(this.grid.gap), ";\n        padding: ").concat(30 / scale, "px;\n        background-color: white;\n        margin-left: auto;\n        margin-right: auto;\n        overflow: scroll;\n      }\n      ").concat(this.hover_animation ? "\n          #layout:hover {\n            transition: transform 1s ease;\n            transform: rotate(1deg)  scale(1.05);\n            cursor: pointer;\n          }\n          @keyframes wiggle {\n            50%  { transform: rotate(1deg)  scale(1.05);  }\n            100%  { transform: rotate(-1deg) scale(1.05);  }\n          }" : "", "\n      #layout > div {\n        width: 100%;\n        height: 100%;\n        border: 1px solid #bababa;\n        border-radius: ").concat(corner_radius, ";\n        display: grid;\n        place-content: center;\n        background-color: darksalmon;\n      }\n\n      #layout > div > div {\n        display: none;\n      }\n      \n      .flipped { transform: rotate(-90deg); }\n    </style>\n      ").concat(this.name ? "<h3> ".concat(this.name, " </h3>") : "", '\n    <div id="layout"> ').concat(this.element_divs, " </div>\n    ");
        this.shadowRoot.getElementById("layout").addEventListener("click", function(event) {
          event.stopPropagation();
          _this2._on_select({
            name: _this2.name,
            elements: _this2.elements,
            grid: _this2.grid
          });
        });
      }
    }, {
      key: "layout",
      value: function layout(_layout) {
        var _layout$elements, _layout$name;
        Object.assign(this.grid, _layout.grid);
        this.elements = (_layout$elements = _layout.elements) !== null && _layout$elements !== void 0 ? _layout$elements : [];
        this.name = (_layout$name = _layout.name) !== null && _layout$name !== void 0 ? _layout$name : this.name;
        return this;
      }
    }, {
      key: "render_size",
      value: function render_size(new_size) {
        this._render_size = new_size;
        return this;
      }
    }, {
      key: "shown_size",
      value: function shown_size(new_size) {
        this._shown_size = new_size;
        return this;
      }
    }, {
      key: "on_select",
      value: function on_select(_on_select) {
        this._on_select = _on_select;
        return this;
      }
    }, {
      key: "hide_name",
      value: function hide_name() {
        this.name = null;
        return this;
      }
    }, {
      key: "turnoff_animation",
      value: function turnoff_animation() {
        this.hover_animation = false;
        return this;
      }
    }, {
      key: "element_divs",
      get: function get() {
        var element_divs = "";
        this.elements.forEach(function(_ref) {
          var id = _ref.id, start_row = _ref.start_row, start_col = _ref.start_col, end_row = _ref.end_row, end_col = _ref.end_col, _ref$flip_id = _ref.flip_id, flip_id = _ref$flip_id === void 0 ? false : _ref$flip_id;
          var grid_area = [start_row, start_col, end_row + 1, end_col + 1].join("/");
          element_divs += "\n      <div style='grid-area:".concat(grid_area, "'>\n        <div ").concat(flip_id ? "class=flipped" : "", ">").concat(id, "</div>\n      </div>\n    ");
        });
        return element_divs;
      }
    }]);
    return GridPreview2;
  }(/* @__PURE__ */ _wrapNativeSuper3(HTMLElement));
  function grid_preview() {
    return new GridPreview();
  }
  customElements.define("grid-preview", GridPreview);

  // web-components/layout-gallery.ts
  function _typeof7(obj) {
    "@babel/helpers - typeof";
    if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
      _typeof7 = function _typeof8(obj2) {
        return typeof obj2;
      };
    } else {
      _typeof7 = function _typeof8(obj2) {
        return obj2 && typeof Symbol === "function" && obj2.constructor === Symbol && obj2 !== Symbol.prototype ? "symbol" : typeof obj2;
      };
    }
    return _typeof7(obj);
  }
  function _toConsumableArray6(arr) {
    return _arrayWithoutHoles6(arr) || _iterableToArray6(arr) || _unsupportedIterableToArray8(arr) || _nonIterableSpread6();
  }
  function _nonIterableSpread6() {
    throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
  }
  function _unsupportedIterableToArray8(o, minLen) {
    if (!o)
      return;
    if (typeof o === "string")
      return _arrayLikeToArray8(o, minLen);
    var n = Object.prototype.toString.call(o).slice(8, -1);
    if (n === "Object" && o.constructor)
      n = o.constructor.name;
    if (n === "Map" || n === "Set")
      return Array.from(o);
    if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))
      return _arrayLikeToArray8(o, minLen);
  }
  function _iterableToArray6(iter) {
    if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null)
      return Array.from(iter);
  }
  function _arrayWithoutHoles6(arr) {
    if (Array.isArray(arr))
      return _arrayLikeToArray8(arr);
  }
  function _arrayLikeToArray8(arr, len) {
    if (len == null || len > arr.length)
      len = arr.length;
    for (var i = 0, arr2 = new Array(len); i < len; i++) {
      arr2[i] = arr[i];
    }
    return arr2;
  }
  function _classCallCheck7(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }
  function _defineProperties7(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor)
        descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }
  function _createClass7(Constructor, protoProps, staticProps) {
    if (protoProps)
      _defineProperties7(Constructor.prototype, protoProps);
    if (staticProps)
      _defineProperties7(Constructor, staticProps);
    return Constructor;
  }
  function _inherits4(subClass, superClass) {
    if (typeof superClass !== "function" && superClass !== null) {
      throw new TypeError("Super expression must either be null or a function");
    }
    subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } });
    if (superClass)
      _setPrototypeOf4(subClass, superClass);
  }
  function _createSuper4(Derived) {
    var hasNativeReflectConstruct = _isNativeReflectConstruct4();
    return function _createSuperInternal() {
      var Super = _getPrototypeOf4(Derived), result;
      if (hasNativeReflectConstruct) {
        var NewTarget = _getPrototypeOf4(this).constructor;
        result = Reflect.construct(Super, arguments, NewTarget);
      } else {
        result = Super.apply(this, arguments);
      }
      return _possibleConstructorReturn4(this, result);
    };
  }
  function _possibleConstructorReturn4(self2, call) {
    if (call && (_typeof7(call) === "object" || typeof call === "function")) {
      return call;
    }
    return _assertThisInitialized4(self2);
  }
  function _assertThisInitialized4(self2) {
    if (self2 === void 0) {
      throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    }
    return self2;
  }
  function _wrapNativeSuper4(Class) {
    var _cache = typeof Map === "function" ? new Map() : void 0;
    _wrapNativeSuper4 = function _wrapNativeSuper5(Class2) {
      if (Class2 === null || !_isNativeFunction4(Class2))
        return Class2;
      if (typeof Class2 !== "function") {
        throw new TypeError("Super expression must either be null or a function");
      }
      if (typeof _cache !== "undefined") {
        if (_cache.has(Class2))
          return _cache.get(Class2);
        _cache.set(Class2, Wrapper);
      }
      function Wrapper() {
        return _construct4(Class2, arguments, _getPrototypeOf4(this).constructor);
      }
      Wrapper.prototype = Object.create(Class2.prototype, { constructor: { value: Wrapper, enumerable: false, writable: true, configurable: true } });
      return _setPrototypeOf4(Wrapper, Class2);
    };
    return _wrapNativeSuper4(Class);
  }
  function _construct4(Parent, args, Class) {
    if (_isNativeReflectConstruct4()) {
      _construct4 = Reflect.construct;
    } else {
      _construct4 = function _construct5(Parent2, args2, Class2) {
        var a = [null];
        a.push.apply(a, args2);
        var Constructor = Function.bind.apply(Parent2, a);
        var instance = new Constructor();
        if (Class2)
          _setPrototypeOf4(instance, Class2.prototype);
        return instance;
      };
    }
    return _construct4.apply(null, arguments);
  }
  function _isNativeReflectConstruct4() {
    if (typeof Reflect === "undefined" || !Reflect.construct)
      return false;
    if (Reflect.construct.sham)
      return false;
    if (typeof Proxy === "function")
      return true;
    try {
      Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {
      }));
      return true;
    } catch (e) {
      return false;
    }
  }
  function _isNativeFunction4(fn) {
    return Function.toString.call(fn).indexOf("[native code]") !== -1;
  }
  function _setPrototypeOf4(o, p) {
    _setPrototypeOf4 = Object.setPrototypeOf || function _setPrototypeOf5(o2, p2) {
      o2.__proto__ = p2;
      return o2;
    };
    return _setPrototypeOf4(o, p);
  }
  function _getPrototypeOf4(o) {
    _getPrototypeOf4 = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf5(o2) {
      return o2.__proto__ || Object.getPrototypeOf(o2);
    };
    return _getPrototypeOf4(o);
  }
  function _defineProperty9(obj, key, value) {
    if (key in obj) {
      Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });
    } else {
      obj[key] = value;
    }
    return obj;
  }
  var LayoutGallery = /* @__PURE__ */ function(_HTMLElement) {
    _inherits4(LayoutGallery2, _HTMLElement);
    var _super = _createSuper4(LayoutGallery2);
    function LayoutGallery2(layouts) {
      var _this;
      _classCallCheck7(this, LayoutGallery2);
      _this = _super.call(this);
      _defineProperty9(_assertThisInitialized4(_this), "layouts", void 0);
      _defineProperty9(_assertThisInitialized4(_this), "preselected_layout_name", void 0);
      _defineProperty9(_assertThisInitialized4(_this), "on_edit_fn", void 0);
      _defineProperty9(_assertThisInitialized4(_this), "on_go_fn", void 0);
      _defineProperty9(_assertThisInitialized4(_this), "on_cancel_fn", void 0);
      _defineProperty9(_assertThisInitialized4(_this), "on_select_fn", void 0);
      _this.attachShadow({
        mode: "open"
      });
      _this.layouts = layouts;
      return _this;
    }
    _createClass7(LayoutGallery2, [{
      key: "connectedCallback",
      value: function connectedCallback() {
        var _this$shadowRoot$getE, _this2 = this;
        this.shadowRoot.innerHTML = '\n    <style>\n      :host {\n        background-color: #edf2f7;\n        width: 100%;\n        height: 100vh;\n        display: block;\n        position: absolute;\n      }\n      \n      #container {\n        display: block;\n        max-width: 1000px;\n        margin-left: auto;\n        margin-right: auto;\n        padding-left: 1rem;\n        padding-right: 1rem;\n      }\n\n      #layouts {\n        width: 100%;\n        display: grid;\n        grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));\n        grid-gap: 1rem;\n        justify-items: center;\n      }\n      #chooser-modal {\n        position: absolute;\n        top: 0;\n        bottom: 0;\n        right: 0;\n        left: 0;\n        display: grid;\n        grid-template-areas: \n          "main main"\n          "go   edit";\n        grid-template-columns: 1fr 1fr;\n        grid-template-rows: repeat(2, auto);\n        gap: 1rem;\n        justify-items: center;\n        align-content: center;\n        background-color: white;\n        opacity: 0.9;\n      }\n      \n      #chooser-modal > button {\n        width: 150px;\n      }\n      #chooser-modal > grid-preview {\n        grid-area: main;\n      }\n      #chooser-modal > .go {\n        grid-area: go;\n        justify-self: end;\n      }\n      #chooser-modal > .edit {\n        grid-area: edit;\n        justify-self: start;\n      }\n      #chooser-modal.hidden {\n        display: none;\n      }\n    </style>\n    <div id = "container">\n      <h2> Select the layout for your app: </h2>\n      <div id = "layouts"></div>\n      <div id = "chooser-modal" class = "hidden"> </div>\n    </div>\n    ';
        (_this$shadowRoot$getE = this.shadowRoot.getElementById("layouts")).append.apply(_this$shadowRoot$getE, _toConsumableArray6(this.layouts.map(function(layout) {
          return grid_preview().layout(layout).shown_size(100).on_select(function(x) {
            return _this2.focus_on_layout(x);
          });
        })));
        if (this.preselected_layout_name) {
          this.focus_on_layout(this.layouts.find(function(layout) {
            return layout.name === _this2.preselected_layout_name;
          }), false);
        }
      }
    }, {
      key: "on_edit",
      value: function on_edit(on_edit_fn) {
        this.on_edit_fn = on_edit_fn;
        return this;
      }
    }, {
      key: "on_go",
      value: function on_go(on_go_fn) {
        this.on_go_fn = on_go_fn;
        return this;
      }
    }, {
      key: "on_cancel",
      value: function on_cancel(on_cancel_fn) {
        this.on_cancel_fn = on_cancel_fn;
        return this;
      }
    }, {
      key: "select_layout",
      value: function select_layout(name) {
        if (name) {
          this.preselected_layout_name = name;
        }
        return this;
      }
    }, {
      key: "on_select",
      value: function on_select(fn) {
        this.on_select_fn = fn;
        return this;
      }
    }, {
      key: "focus_on_layout",
      value: function focus_on_layout(selected_layout) {
        var _this3 = this;
        var fire_on_select = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : true;
        var modal = create_focus_modal().set_title(selected_layout.name).max_width("95%").on_close(this.on_cancel_fn).add_element(grid_preview().layout(selected_layout).shown_size(650).turnoff_animation().hide_name());
        var close_gallery = function close_gallery2(event) {
          event.stopPropagation();
          _this3.remove();
          modal.remove();
        };
        modal.add_element(create_el({
          sel_txt: "div#footer",
          children: [click_button(".go", "Create app with this layout", function(event) {
            close_gallery(event);
            _this3.on_go_fn(selected_layout);
          }), click_button(".edit", "Edit this layout", function(event) {
            close_gallery(event);
            _this3.on_edit_fn(selected_layout);
          })]
        }));
        modal.add_to_page();
        if (fire_on_select) {
          this.on_select_fn(selected_layout.name);
        }
      }
    }]);
    return LayoutGallery2;
  }(/* @__PURE__ */ _wrapNativeSuper4(HTMLElement));
  function layout_gallery(layouts) {
    return new LayoutGallery(layouts);
  }
  customElements.define("layout-gallery", LayoutGallery);

  // index.ts
  function ownKeys5(object, enumerableOnly) {
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
  function _objectSpread4(target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i] != null ? arguments[i] : {};
      if (i % 2) {
        ownKeys5(Object(source), true).forEach(function(key) {
          _defineProperty10(target, key, source[key]);
        });
      } else if (Object.getOwnPropertyDescriptors) {
        Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
      } else {
        ownKeys5(Object(source)).forEach(function(key) {
          Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
        });
      }
    }
    return target;
  }
  function _defineProperty10(obj, key, value) {
    if (key in obj) {
      Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });
    } else {
      obj[key] = value;
    }
    return obj;
  }
  var clear_page = function clear_page2() {
    return document.body.innerHTML = "";
  };
  var start_layout_gallery = function start_layout_gallery2(opts) {
    var save_history = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : true;
    clear_page();
    if (save_history) {
      save_gallery_history(opts.layouts);
    }
    var gallery = layout_gallery(opts.layouts).on_select(function(selected) {
      save_gallery_history(opts.layouts, selected);
    }).on_cancel(function() {
      save_gallery_history(opts.layouts);
    }).on_go(function(selected_layout) {
      setShinyInput("build_app_template", selected_layout);
    }).on_edit(function(selected_layout) {
      start_layout_editor(_objectSpread4({
        entry_type: "layout-gallery"
      }, selected_layout), true);
    }).select_layout(opts.selected);
    return document.body.appendChild(gallery);
  };
  var start_layout_editor = function start_layout_editor2(opts, save_history) {
    if (save_history) {
      save_editor_history(opts);
    }
    if (opts.entry_type !== "edit-existing-app") {
      clear_page();
    }
    opts.finish_btn = opts.entry_type === "layout-gallery" ? {
      label: "Create app",
      on_done: function on_done(layout) {
        setShinyInput("build_app_template", layout);
      }
    } : {
      label: "Update app layout",
      on_done: function on_done(layout) {
        setShinyInput("update_layout", layout);
      }
    };
    opts.on_update = function(opts2) {
      save_editor_history(opts2);
    };
    return new LayoutEditor(opts);
  };
  window.onload = function() {
    add_shiny_listener("layout-gallery", function(layouts) {
      start_layout_gallery({
        layouts: layouts
      });
    });
    add_shiny_listener("edit-layout", function(layout_info) {
      start_layout_editor(_objectSpread4({
        entry_type: "edit-layout"
      }, layout_info), true);
    });
    add_shiny_listener("edit-existing-app", function(layout_info) {
      start_layout_editor({
        entry_type: "edit-existing-app"
      }, true);
    });
    add_shiny_listener("show-code-popup", function(opts) {
      create_focus_modal().set_title(opts.title).description(opts.description).add_element(copy_code(opts.code)).add_to_page();
    });
  };
  window.addEventListener("popstate", function(e) {
    var state = e.state;
    switch (state.type) {
      case "layout_chooser":
        start_layout_gallery(state.data, false);
        break;
      case "layout_edit":
        start_layout_editor(state.data, false);
        break;
      default:
        console.error("How did you get to that state?");
    }
  });
})();
//# sourceMappingURL=index.js.map
