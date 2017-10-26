var m3 =
/******/ (function(modules) { // webpackBootstrap
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
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _merge = __webpack_require__(1);

/**
 * @default
 */
var defaults = {
    tickRate: 1 / 64 * 1000
};

/**
 * Scheduler using standard setTimeout function
 * @private
 * @param {function} cb 
 */
/**
 * @module M3
 * @description A simple libarry to queue and perform DOM all at once.
 * @author Moss Pakhapoca
 */

function sched(cb) {
    return window.setTimeout(cb, defaults.tickRate);
}

function exec(cb, _cb) {
    var self = this;
    cb.call(null, self.scope);
    sched(_cb.bind(null, self.scope));
}

/**
 * Default constructor
 * @param {object} obj 
 */
var m3 = function m3(obj) {
    this.conf = _merge.mo.deep(defaults, obj);
    this.instance = [];
    this.scope = Object.create(null);
};

/**
 * @public
 */
m3.prototype.run = function () {
    var self = this;
    var curr = void 0,
        cb = void 0,
        _cb = void 0;
    while (curr = self.instance.shift()) {
        cb = curr.read;
        _cb = curr.manip;
        try {
            sched(exec.bind(self, cb, _cb));
        } catch (err) {
            console.error('Unable to execute function', err);
        }
    }
    return self;
};

/**
 * @public
 */
m3.prototype.clear = function () {
    var self = this;
    while (self.instance.length > 1) {
        self.instance.pop();
    }return self;
};

/**
 * @public
 * @param {array} args Array of arguments
 * @param {string} name [optional] Name of the function
 */
m3.prototype.enqueue = function (obj) {
    var self = this;
    if (!obj) {
        return self;
    }
    if (obj.callback === void 0) {
        if (obj.read === void 0 || obj.manip === void 0) {
            throw new Error("One or two functions callback are missing. Unable to add to queue");
        }
    }

    self.instance.push(obj);

    return self;
};

/**
 * @public
 */
m3.prototype.dequeue = function () {
    if (this.instance.length > 1) this.instance.shift();else console.error('Queue is empty. Unable to de-queue');
    return this;
};

module.exports = m3;

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

/**
 * @module mo
 * @desc A library for merging Javascript objects.
 * @author Moss Pakhapoca
 */

/**
 * 
 */
var isObj = function isObj(a) {
    return _typeof(!!a) && a === 'object' && Object.prototype.toString.call(a) !== '[object RegExp]' && Object.prototype.toString.call(a) !== '[object Date]';
};

/**
 * @private
 * @param {*} a 
 * @return {boolean}
 */
var isEmpty = function isEmpty(a) {
    return Array.isArray(a) ? [] : {};
};

/**
 * @public
 * @param {object} o1 
 * @param {object} o2 
 * @return {object}
 */
function deep(o1, o2) {
    // Deep copy objects, does not merge array
    var _m = function _m(o) {
        Object.keys(o).forEach(function (key, i) {
            if (Object.prototype.hasOwnProperty.call(o, key)) {
                if (isObj(o[key])) out[key] = mo.deep(out[key], o[key]);else out[key] = o[key];
            }
        });
    };
    var out = isObj(o1) ? Object.assign({}, o1) : {};
    var _oa = void 0,
        i = 0;
    if (arguments.length > 2) {
        _oa = Array.from(arguments);
    } else if (!o2) return o1;
    if (_oa) {
        while (_oa.length > 0) {
            _m(_oa.shift());
        }
    } else {
        _m(o2);
    }
    return out;
}

var mo = exports.mo = {
    isObj: isObj,
    deep: deep
};

/***/ })
/******/ ]);