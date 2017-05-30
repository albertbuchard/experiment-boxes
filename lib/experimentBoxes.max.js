(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("jQuery"), require("chartjs"), require("experiment-mathjs"));
	else if(typeof define === 'function' && define.amd)
		define("experimentBoxes", ["jQuery", "chartjs", "experiment-mathjs"], factory);
	else if(typeof exports === 'object')
		exports["experimentBoxes"] = factory(require("jQuery"), require("chartjs"), require("experiment-mathjs"));
	else
		root["experimentBoxes"] = factory(root["jQuery"], root["Chart"], root["math"]);
})(this, function(__WEBPACK_EXTERNAL_MODULE_0__, __WEBPACK_EXTERNAL_MODULE_11__, __WEBPACK_EXTERNAL_MODULE_12__) {
return /******/ (function(modules) { // webpackBootstrap
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
/******/ 	return __webpack_require__(__webpack_require__.s = 8);
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


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isNumeric = exports.extend = exports.findAllIndices = exports.noop = exports.debugError = exports.debugWarn = exports.debuglog = exports.mandatory = exports.mustBeDefined = exports.mustHaveConstructor = exports.looksLikeAPromise = exports.delay = exports.jitter = exports.recurse = exports.Deferred = exports.rep = exports.samplePermutation = exports.matrix = exports.getRow = exports.rowSum = exports.diag = undefined;

var _experimentMathjs = __webpack_require__(12);

var _experimentMathjs2 = _interopRequireDefault(_experimentMathjs);

var _config = __webpack_require__(9);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
isNumeric function in Javascript
*/
function isNumeric(n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
}

/**
 * noop - just your friendly empty function
 *
 * @returns {undefined}
 */
function noop() {}

/**
 * Debug functions
 */
var debuglog = _config.DEBUG_MODE_ON ? console.log.bind(console) : noop;
var debugWarn = _config.DEBUG_MODE_ON ? console.warn.bind(console) : noop;
var debugError = _config.DEBUG_MODE_ON ? console.error.bind(console) : noop;

/**
 * Allows to return an error for missing parameters.
 * @param  {String} param Optional string to add after the error.
 */
function mandatory() {
  var param = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';

  throw new Error('Missing parameter ' + param);
}

/**
 * Checks the type of all given parameters, return an error if one is undefined.
 * @param  {...object} args List of arguments to checks
 * @return {bool}      true if all arguments are defined
 */

function mustBeDefined() {
  for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
    args[_key] = arguments[_key];
  }

  for (var i = 0; i < args.length; i++) {
    if (typeof args[i] === 'undefined') {
      throw new Error('Argument ' + i + ' is undefined.');
    }
  }

  return true;
}

/**
 * Checks the constructor of all given parameters, return an error if one is not as specified.
 * @param  {object} constructorObject constructor
 * @param  {...object} args         list of arguments to check
 * @return {bool}                   true if all arguments have specified constructorObject as constructor
 */

function mustHaveConstructor(constructorObject) {
  for (var _len2 = arguments.length, args = Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
    args[_key2 - 1] = arguments[_key2];
  }

  if (args.allHaveConstructor(constructorObject) === false) {
    throw new Error('Wrong constructor in arguments.');
  }

  return true;
}

/**
 * Returns true if o looks like a promise. From the es-promisify package.
 * https://github.com/digitaldesignlabs/es6-promisify/
 * @param  {object} o Object to test
 * @return {bool}   True if looks like a promise, false otherwise
 */
function looksLikeAPromise(o) {
  return o && typeof o.then === 'function' && typeof o.catch === 'function';
}

/**
 * From http://www.datchley.name/promise-patterns-anti-patterns/
 * @param  {int} ms delay in ms
 * @return {promise} promise which will resolve in delay ms
 */
function delay(ms) {
  return new Promise(function (resolve) {
    setTimeout(resolve, ms);
  });
}

/**
 * @param  {int} min min delay in ms
 * @param  {int} max max delay in ms
 * @return {promise} promise which will resolve in delay ms
 */
function jitter() {
  var min = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : mandatory();
  var max = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : mandatory();

  return new Promise(function (resolve) {
    var randomDuration = Math.rand * (max - min) + min;
    setTimeout(resolve, randomDuration);
  });
}

/**
 * Recurse on a given promise chain
 * @param  {Promise} promise Promise to recurse on
 * @param  {numeric} amount  amount of time to recurse
 * @return {Promise}         Promise
 */
function recurse() {
  var promiseGenerator = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : mandatory();
  var amount = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : mandatory();
  var target = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : this;
  var args = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : [];
  var concatOnArray = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : [];

  // Base case - just return the promisified result
  if (amount === 0) {
    return new Promise(function (resolve) {
      resolve(concatOnArray);
    });
  }

  var next = promiseGenerator.apply(target, args).then(function (r) {
    concatOnArray = concatOnArray.concat(r);
    return recurse(promiseGenerator, amount - 1, target, args, concatOnArray);
  });

  return next;
}

/**
 * Compatible helper to replace the now defunc Promise.defer()
 * @method Deferred
 */
function Deferred() {
  var _this = this;

  // update 062115 for typeof
  // if (typeof (Promise) !== 'undefined' && Promise.defer) {
  //   //need import of Promise.jsm for example: Cu.import('resource:/gree/modules/Promise.jsm');
  //   return Promise.defer();
  // } else if (typeof (PromiseUtils) != 'undefined' && PromiseUtils.defer) {
  //   //need import of PromiseUtils.jsm for example: Cu.import('resource:/gree/modules/PromiseUtils.jsm');
  //   return PromiseUtils.defer();
  // } else {
  /* A method to resolve the associated Promise with the value passed.
   * If the promise is already settled it does nothing.
   *
   * @param {anything} value : This value is used to resolve the promise
   * If the value is a Promise then the associated promise assumes the state
   * of Promise passed as value.
   */
  this.resolve = null;

  /* A method to reject the assocaited Promise with the value passed.
   * If the promise is already settled it does nothing.
   *
   * @param {anything} reason: The reason for the rejection of the Promise.
   * Generally its an Error object. If however a Promise is passed, then the Promise
   * itself will be the reason for rejection no matter the state of the Promise.
   */
  this.reject = null;

  /* A newly created Pomise object.
   * Initially in pending state.
   */
  this.promise = new Promise(function (resolve, reject) {
    _this.resolve = resolve;
    _this.reject = reject;
  });
  Object.freeze(this);
  // }
}

/**
 * From http://stackoverflow.com/questions/3751520/how-to-generate-sequence-of-numbers-chars-in-javascript
 * TODO Pull request math js
 * @param  {object} content Repeated sequence
 * @param  {int} count   Number of time the sequence must be repeat
 * @return {array}       Array with repeated sequence
 */
function rep() {
  var content = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : mandatory();
  var count = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : mandatory();

  var result = [];
  if (typeof content === 'function') {
    for (var i = 0; i < count; i++) {
      result = result.concat(content(i));
    }
  } else {
    for (var _i = 0; _i < count; _i++) {
      result = result.concat(content);
    }
  }
  return result;
}

function samplePermutation() {
  var sequence = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : mandatory();
  var repetition = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
  var n = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;

  if (sequence.constructor !== Array) {
    throw new Error('samplePermutation: sequence needs to be an array.');
  }

  if (n === null) {
    n = sequence.length;
  }

  var copy = sequence.slice(0);
  var permutation = [];
  var add = void 0;
  while (repetition && permutation.length < n || !repetition && copy.length) {
    var index = Math.floor(Math.random() * copy.length);
    if (repetition) {
      add = copy[index];
    } else {
      add = copy.splice(index, 1);
    }
    permutation = permutation.concat(add);
  }

  return permutation;
}

/* =============== Personalized Matrix Functions =============== */
function matrix() {
  var rows = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : mandatory();
  var cols = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : mandatory();
  var fill = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;

  var matrixObject = [];

  for (var i = 0; i < rows; i++) {
    matrixObject[i] = [];
    for (var j = 0; j < cols; j++) {
      matrixObject[i][j] = fill;
    }
  }

  return matrixObject;
}

function getRow() {
  var matrixObject = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : mandatory();
  var rowIndex = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : mandatory();

  matrixObject = _experimentMathjs2.default.matrix(matrixObject);
  var size = matrixObject.size()[0];
  var row = _experimentMathjs2.default.subset(matrixObject, _experimentMathjs2.default.index(rowIndex, _experimentMathjs2.default.range(0, size)));

  return row;
}

function rowSum() {
  var matrixObject = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : mandatory();
  var rows = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;

  matrixObject = _experimentMathjs2.default.matrix(matrixObject);
  var size = matrixObject.size()[0];
  if (rows === null) {
    rows = _experimentMathjs2.default.range(0, size - 1);
  }
  if (rows.constructor !== Array) {
    rows = [rows];
  }

  var rowSumArray = [];
  for (var i = 0; i < rows.length; i++) {
    rowSumArray.push(_experimentMathjs2.default.sum(getRow(matrixObject, rows[i])));
  }

  return rowSumArray;
}

// set or get the diagonal of a matrix
function diag() {
  var matrixObject = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : mandatory();
  var setTo = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;

  var rows = matrixObject.length;
  // const cols = matrixObject[0].length

  var diagonalValues = [];

  for (var i = 0; i < rows; i++) {
    if (setTo) {
      matrixObject[i][i] = setTo;
    }
    diagonalValues.push(matrixObject[i][i]);
  }

  return [diagonalValues, matrixObject];
}

/**
 * Find all the positions of a needle in a haystack string
 * @param  {string} needle   string to find
 * @param  {string} haystack string to scan
 * @return {Array}  Either -1 if no match is found or an array containing the indicies
 */
function findAllIndices() {
  var needle = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : mandatory();
  var haystack = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : mandatory();

  var indices = [];
  for (var i = 0; i < haystack.length; i++) {
    if (haystack.substr(i, needle.length) === needle) {
      indices.push(i);
    }
  }

  if (indices.length) {
    return indices;
  }
  return -1;
}

function extend() {
  // Variables
  var extended = {};
  var deep = false;
  var i = 0;
  var length = arguments.length;

  // Check if a deep merge
  if (Object.prototype.toString.call(arguments.length <= 0 ? undefined : arguments[0]) === '[object Boolean]') {
    deep = arguments.length <= 0 ? undefined : arguments[0];
    i += 1;
  }

  // Merge the object into the extended object
  var merge = function merge(obj) {
    for (var prop in obj) {
      if (Object.prototype.hasOwnProperty.call(obj, prop)) {
        // If deep merge and property is an object, merge properties
        if (deep && Object.prototype.toString.call(obj[prop]) === '[object Object]') {
          extended[prop] = extend(true, extended[prop], obj[prop]);
        } else {
          extended[prop] = obj[prop];
        }
      }
    }
  };

  // Loop through each object and conduct a merge
  for (; i < length; i++) {
    var obj = arguments.length <= i ? undefined : arguments[i];
    merge(obj);
  }

  return extended;
}

exports.diag = diag;
exports.rowSum = rowSum;
exports.getRow = getRow;
exports.matrix = matrix;
exports.samplePermutation = samplePermutation;
exports.rep = rep;
exports.Deferred = Deferred;
exports.recurse = recurse;
exports.jitter = jitter;
exports.delay = delay;
exports.looksLikeAPromise = looksLikeAPromise;
exports.mustHaveConstructor = mustHaveConstructor;
exports.mustBeDefined = mustBeDefined;
exports.mandatory = mandatory;
exports.debuglog = debuglog;
exports.debugWarn = debugWarn;
exports.debugError = debugError;
exports.noop = noop;
exports.findAllIndices = findAllIndices;
exports.extend = extend;
exports.isNumeric = isNumeric;

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global) {

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _jquery = __webpack_require__(0);

var _jquery2 = _interopRequireDefault(_jquery);

var _utilities = __webpack_require__(1);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/** Dragable div - Parent class suporting the toolbox  */
var DragBox = function () {
  function DragBox() {
    var boxElement = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
    var width = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
    var height = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;

    _classCallCheck(this, DragBox);

    // mock window if in node
    if (typeof window === 'undefined') {
      global.window = {};
    }

    this.freeHeight = true;
    if (height !== null) {
      this.freeHeight = false;
    }
    // constants
    this.MAX_BINDED_PROPERTIES = 15;
    this.INIT_WIDTH = width || 400;
    this.INIT_HEIGHT = height || 300;
    this.TITLE_HEIGHT = 36;
    this.FOOTER_HEIGHT = 34;
    this.DEFAULT_BOX_THEME = 'dragbox-gray';
    this.DEFAULT_DRAGGABLE = true;
    this.DEFAULT_STICKINESS_TYPE = 'magnetized';

    // ui variables
    this.boxId = null;
    this.boxElement = boxElement;
    this.draggable = this.DEFAULT_DRAGGABLE;
    this.boxHTML = null;

    // stickness
    this.shouldStick = null;
    this.shouldMagnetize = null;
    this.isStickingX = null;
    this.isStickingY = null;

    this.stickiness = this.DEFAULT_STICKINESS_TYPE;

    // private
    this._beingDragged = false;
    this._visibility = 'hidden';
    this._overflow = 'hidden';
    this._boxClass = this.DEFAULT_BOX_THEME;
    this._width = this.INIT_WIDTH;
    this._height = this.INIT_HEIGHT;

    // keyboard variables
    // maps the keys pressed with either true on kedown or false on keyup
    this.map = [];

    // keep mouse position at all times
    this.currentMousePos = {
      x: -1,
      y: -1
    };

    var thisObject = this;

    (0, _jquery2.default)(document).mousemove(function (event) {
      thisObject.currentMousePos.x = event.pageX;
      thisObject.currentMousePos.y = event.pageY;
    });

    // check if the box already exists, else create it
    if (!this.boxElement) {
      // get a unique ID for the box
      this.boxId = 'dragbox' + ((0, _jquery2.default)('div[id*="dragbox"]').length + 1);

      // html for creation
      this.boxHTML = '<div id="' + this.boxId + '" class="dragbox ' + this._boxClass + '" style="display:none;" draggable="false">\n          <div class="col-xs-12 dragbox-container">\n            <div class="col-xs-12 dragbox-title centered"><h3>Dragbox</h3></div>\n          <div class="col-xs-12 dragbox-content"></div>\n          <div class="col-xs-12 dragbox-footer"></div>\n        </div>';

      (0, _jquery2.default)(document.body).append(this.boxHTML);
      this.boxElement = (0, _jquery2.default)('#' + this.boxId);
    } else {
      this.boxId = (0, _jquery2.default)(this.boxElement).attr('id');
    }

    // set class
    this.boxClass = (0, _jquery2.default)(this.boxElement).attr('class');

    // set size
    this.width = this._width;
    this.height = this._height;

    // set overflow
    this.overflow = 'hidden';

    // keyboard show hide hotkeys events
    (0, _jquery2.default)(document.body).keydown(function (e) {
      thisObject.keyfunction(e);
    });
    (0, _jquery2.default)(document.body).keyup(function (e) {
      thisObject.keyfunction(e);
    });

    // when clicked bring  dragbox
    (0, _jquery2.default)(this.boxElement).click(function () {
      (0, _jquery2.default)('.dragbox').css('zIndex', 10);
      (0, _jquery2.default)(thisObject.boxElement).css('zIndex', 100);
    });

    (0, _jquery2.default)(this.boxElement).find('.dragbox-title').mousedown(function (e) {
      thisObject.startDrag(e);
    });
    (0, _jquery2.default)(this.boxElement).find('.dragbox-title').mouseup(function (e) {
      thisObject.stopDrag(e);
    });

    // draggin cleanUp event
    (0, _jquery2.default)(document).click(function (e) {
      thisObject.stopDrag(e);
    });

    /* --- Load the query string if reload and import was used --- */
    this.queryString = DragBox.getQueryString();
  }
  // destroy


  _createClass(DragBox, [{
    key: 'destroy',
    value: function destroy() {
      // fade out and remove from DOM
      var thisObject = this;
      (0, _jquery2.default)(this.boxElement).animate({
        opacity: 0
      }, 25, function () {
        (0, _jquery2.default)(thisObject.boxElement).remove();
      });
    }

    // size methods

  }, {
    key: 'updateSize',
    value: function updateSize() {
      (0, _jquery2.default)(this.boxElement).width(this.width);
      if (!this.freeHeight) {
        var currentHeight = this.boxElement.height();
        var currentContentHeight = this.boxElement.find('.dragbox-content').height();
        var difference = currentHeight - this.height;
        (0, _jquery2.default)(this.boxElement).find('.dragbox-content').css({
          height: currentContentHeight - difference
        });
        // $(this.boxElement).height(this.height)
        // const contentHeight = this.height - this.TITLE_HEIGHT - this.FOOTER_HEIGHT - 7
        // $(this.boxElement).css({
        //   height: this.height,
        //   width: this.width,
        // })
        // $(this.boxElement)
        //   .find('.dragbox-container')
        //   .css({
        //     height: this.height,
        //   })
        // $(this.boxElement)
        //   .find('.dragbox-content')
        //   .css({
        //     height: contentHeight,
        //   })
      } else {
        (0, _jquery2.default)(this.boxElement).css({
          width: this.width
        });
      }
    }

    // drag methods

  }, {
    key: 'startDrag',
    value: function startDrag(e) {
      // prevent classic dragging from happening
      e.preventDefault();

      // check if already being dragged, stop the dragging if so
      if (this.beingDragged) {
        this.beingDragged = false;
        return null;
      }

      if (!this.draggable) {
        return null;
      }

      // calculate X and Y offset of the mouse compare to the top left corner of the box
      var offset = {
        x: e.clientX - (0, _jquery2.default)(this.boxElement).offset().left,
        y: e.clientY - (0, _jquery2.default)(this.boxElement).offset().top
      };

      // set the beingdragged flag to true
      this.beingDragged = true;

      // start the update loop for smooth dragging
      this.loopDrag(offset);

      // another way of preventing default, just in case
      return false;
    }
  }, {
    key: 'stopDrag',
    value: function stopDrag() {
      this.beingDragged = false;
    }
  }, {
    key: 'loopDrag',
    value: function loopDrag(offset) {
      if (this.beingDragged === true) {
        var newPosX = this.currentMousePos.x - offset.x;
        var newPosY = this.currentMousePos.y - offset.y;

        var element = {
          offsetLeft: newPosX,
          offsetTop: newPosY,
          offsetWidth: (0, _jquery2.default)(this.boxElement).width(),
          offsetHeigth: (0, _jquery2.default)(this.boxElement).height()
        };

        // maintain box totally visible and check for sticky borders
        var constrainedPosition = DragBox.stayInWindow(element);
        var constrainedPositionX = constrainedPosition.x;
        var constrainedPositionY = constrainedPosition.y;

        // stickiness
        // glue
        if (this.shouldStick) {
          // make the box sticky if collided with x border
          if (constrainedPosition.stickyX === -2 || constrainedPosition.stickyX === 2) {
            this.isStickingX = true;
          }

          // for sticky window, check if the box got out of the sticky x aera before authorizing movement in x
          if (this.isStickingX && constrainedPosition.stickyX !== 0) {
            constrainedPositionX = constrainedPosition.leftSticky; // stick to the window
          }

          // make sure stickiness disapears when out of the sticky zone
          if (constrainedPosition.stickyX === 0) {
            this.isStickingX = false;
          }

          // make the box sticky if collided with y border
          if (constrainedPosition.stickyY === -2 || constrainedPosition.stickyY === 2) {
            this.isStickingY = true;
          }

          // for sticky window, check if the box got out of the sticky y aera before authorizing movement in y
          if (this.isStickingY && constrainedPosition.stickyY !== 0) {
            constrainedPositionY = constrainedPosition.topSticky; // stick to the window
          }

          // make sure stickiness disapears when out of the sticky zone
          if (constrainedPosition.stickyY === 0) {
            this.isStickingY = false;
          }
        }

        // magnet
        if (this.shouldMagnetize) {
          constrainedPositionX = constrainedPosition.leftSticky;
          constrainedPositionY = constrainedPosition.topSticky;
        }

        var thisObject = this;
        (0, _jquery2.default)(this.boxElement).animate({
          left: constrainedPositionX,
          top: constrainedPositionY
        }, 25, function () {
          thisObject.loopDrag(offset);
        });
      }
    }

    // keyboard functions

  }, {
    key: 'keyfunction',
    value: function keyfunction() {
      // check if shift + P hotkeys were stroke and toggle visibility if so
      (0, _utilities.debuglog)('dragbox: keyfunction() called.', this);
    }

    // visibility functions

  }, {
    key: 'toggle',
    value: function toggle() {
      // toggle box visibility
      if (this.visibility === 'hidden') {
        this.visibility = 'visible';
      } else {
        this.visibility = 'hidden';
      }
    }
  }, {
    key: 'show',
    value: function show() {
      this.visibility = 'visible';
    }
  }, {
    key: 'hide',
    value: function hide() {
      this.visibility = 'hidden';
    }

    // content function
    /**
     * Add the specified html code to the specified target.
     * If wrapInDivClass is set, a div of specified class is created around the html code. This could be usefull to set grid class like 'col-xs-12'.
     * @param  {string} html           html to append to the target
     * @param  {String} to             target identifier eg .target-class or #targetID
     * @param  {String} wrapInDivClass Null by default. If set, creates a div with specified class wrapping the html code.
     */

  }, {
    key: 'append',
    value: function append(html) {
      var to = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '.dragbox-content';
      var wrapInDivClass = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;

      // TODO Convert all element creation to pure javascript -- make a react version
      // append html to the selected child element of the dragbox
      if (this.boxElement) {
        if (wrapInDivClass !== null) {
          html = '<div class="' + wrapInDivClass + '" >' + html + '</div>';
        }

        if (to !== 'container') {
          this.boxElement.find(to).append(html);
        } else {
          this.boxElement.append(html);
        }
      }
    }

    /**
     * set or get html of the selected child element of the DragBox
     * @param  {String} child child selector
     * @param  {?string} value Either null if you want to get the html or a string to set the html of the node
     * @return {?string}       If value is null, returns a string of the html content of the node.
     */

  }, {
    key: 'html',
    value: function html() {
      var child = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '.dragbox-content';
      var value = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;

      if (this.boxElement) {
        var target = child !== 'container' ? this.boxElement.find(child) : this.boxElement;

        if (value !== null) {
          target.html(value);
          return value;
        }

        return target.html();
      }

      return null;
    }

    /* ======== Setters and getters ======== */

  }, {
    key: 'width',
    set: function set(width) {
      this._width = width;
      this.updateSize();
    },
    get: function get() {
      return this._width;
    }
  }, {
    key: 'height',
    set: function set(height) {
      this._height = height;
      this.updateSize();
    },
    get: function get() {
      return this._height;
    }
  }, {
    key: 'beingDragged',
    set: function set(dragged) {
      this._beingDragged = dragged;
      (0, _jquery2.default)(this.boxElement).attr('beingDragged', dragged);
    },
    get: function get() {
      return this._beingDragged;
    }
  }, {
    key: 'boxClass',
    set: function set(newClass) {
      if (this.boxElement) {
        if (typeof newClass !== 'string') {
          throw new Error('newClass must be a string');
        }

        // if there is more than one class in the string take the first one
        // var spacePos = newClass.indexOf(" ");
        // if (spacePos != -1) {
        //   newClass = newClass.substr(0, spacePos);
        // }
        // remove the old class from the boxElement and add the new class
        this.boxElement.removeClass(this.boxClass).addClass(newClass);
        this._boxClass = newClass;
      }
    },
    get: function get() {
      if (this.boxElement) {
        return this._boxClass;
      }
      return null;
    }
  }, {
    key: 'visibility',
    set: function set(visibility) {
      this._visibility = visibility;
      if (visibility === 'visible') {
        // $(this.boxElement).animate({
        //   opacity: 1.0
        // }, 150);
        (0, _jquery2.default)(this.boxElement).show();
      } else {
        // $(this.boxElement).animate({
        //   opacity: 0.0
        // }, 150);
        (0, _jquery2.default)(this.boxElement).hide();
      }
    },
    get: function get() {
      return this._visibility;
    }
  }, {
    key: 'overflow',
    set: function set(overflow) {
      this._overflow = overflow;
      (0, _jquery2.default)(this.boxElement).find('.dragbox-content').css('overflow-y', overflow);
    },
    get: function get() {
      return this._overflow;
    }

    /**
     * Variable defining how the box behaves near screen limit, weither it stick "glue", it magnetize "magnetized" or it has no interaction "none".
     * @return {string} Either glue, or magnetized
     */

  }, {
    key: 'contentElement',
    get: function get() {
      return (0, _jquery2.default)(this.boxElement).find('.dragbox-content');
    },
    set: function set(element) {
      console.warn('DragBox.contentElement: read-only for now');
    }
  }, {
    key: 'stickiness',
    get: function get() {
      return this._stickiness;
    },
    set: function set(type) {
      // different type of stickyness for the box : "none", "glue", "magnetized"
      switch (type) {
        case 'glue':
          this.shouldStick = true;
          this.shouldMagnetize = false;
          (0, _utilities.debuglog)('stickiness set to glue');
          break;
        case 'magnetized':
          this.shouldStick = false;
          this.shouldMagnetize = true;
          (0, _utilities.debuglog)('stickiness set to magnetized');
          break;
        default:
          this.shouldMagnetize = false;
          this.shouldStick = false;
          (0, _utilities.debuglog)('Parambox: stickiness set to none');
      }
      this._stickiness = type;
    }
  }, {
    key: 'title',
    get: function get() {
      if (this.boxElement) {
        (0, _jquery2.default)(this.boxElement).find('.dragbox-title').html();
      }
    },
    set: function set(html) {
      if (this.boxElement) {
        (0, _jquery2.default)(this.boxElement).find('.dragbox-title').html(html);
        this.updateSize();
      }
    }
  }, {
    key: 'content',
    set: function set(html) {
      if (this.boxElement) {
        this.contentDiv.html(html);
        this.updateSize();
      }
    },
    get: function get() {
      if (this.boxElement) {
        return this.contentDiv.html();
      }

      return null;
    }
  }, {
    key: 'contentDiv',
    get: function get() {
      if (this.boxElement) {
        return (0, _jquery2.default)(this.boxElement).find('.dragbox-content');
      }

      return null;
    }

    /* =============== Helper functions =============== */
    /**
     * From http://stackoverflow.com/questions/979975/how-to-get-the-value-from-the-get-parameters?page=1&tab=votes#tab-top
     * @return {Array} Array containing variables of the location string.
     */

  }], [{
    key: 'getQueryString',
    value: function getQueryString() {
      // This function is anonymous, is executed immediately and
      // the return value is assigned to QueryString!
      var queryString = {};
      var query = window.location.search.substring(1);
      var vars = query.split('&');
      for (var i = 0; i < vars.length; i++) {
        var pair = vars[i].split('=');
        // If first entry with this name
        if (typeof queryString[pair[0]] === 'undefined') {
          queryString[pair[0]] = decodeURIComponent(pair[1]);
          // If second entry with this name
        } else if (typeof queryString[pair[0]] === 'string') {
          var arr = [queryString[pair[0]], decodeURIComponent(pair[1])];
          queryString[pair[0]] = arr;
          // If third or later entry with this name
        } else {
          queryString[pair[0]].push(decodeURIComponent(pair[1]));
        }
      }
      return queryString;
    }

    /* ======== Static ======== */
    // TODO make non static probably
    // some static helper functions

  }, {
    key: 'stayInWindow',
    value: function stayInWindow(element) {
      if (typeof element === 'undefined') {
        throw new Error('element is undefined');
      }

      // constants
      var STOP_BEING_STICKY_AFTER = 0.15;

      // times the size in distance
      // coordinates
      var left = element.offsetLeft;
      var right = element.offsetLeft + element.offsetWidth;
      var top = element.offsetTop;
      var bottom = element.offsetTop + element.offsetHeigth;

      var maxLeft = window.innerWidth - element.offsetWidth;
      var maxTop = window.innerHeight - element.offsetHeigth;

      // TODO Clarify the integer constants and do not use nested ternary if possible
      return {
        x: left < 0 ? 0 : right > window.innerWidth ? maxLeft : left,
        y: top < 0 ? 0 : bottom > window.innerHeight ? maxTop : top,
        stickyX: left <= 0 ? -2 : left <= STOP_BEING_STICKY_AFTER * element.offsetWidth ? -1 : right >= window.innerWidth ? 2 : right >= window.innerWidth - STOP_BEING_STICKY_AFTER * element.offsetWidth ? 1 : 0,
        stickyY: top <= 0 ? -2 : top <= STOP_BEING_STICKY_AFTER * element.offsetHeigth ? -1 : bottom >= window.innerHeight ? 2 : bottom >= window.innerHeight - STOP_BEING_STICKY_AFTER * element.offsetHeigth ? 1 : 0,
        leftSticky: left <= 0 ? 0 : left <= STOP_BEING_STICKY_AFTER * element.offsetWidth ? 0 : right >= window.innerWidth ? window.innerWidth - element.offsetWidth : right >= window.innerWidth - STOP_BEING_STICKY_AFTER * element.offsetWidth ? window.innerWidth - element.offsetWidth : left,
        topSticky: top <= 0 ? 0 : top <= STOP_BEING_STICKY_AFTER * element.offsetHeigth ? 0 : bottom >= window.innerHeight ? window.innerHeight - element.offsetHeigth : bottom >= window.innerHeight - STOP_BEING_STICKY_AFTER * element.offsetHeigth ? window.innerHeight - element.offsetHeigth : top
      };
    }
  }, {
    key: 'getCoordinateInWindow',
    value: function getCoordinateInWindow(element) {
      var left = element.offsetLeft;
      var right = element.offsetLeft + element.offsetWidth;
      var top = element.offsetTop;
      var bottom = element.offsetTop + element.offsetHeigth;

      var maxLeft = window.innerWidth - element.offsetWidth;
      var maxTop = window.innerHeight - element.offsetHeigth;

      return {
        left: left,
        right: right,
        top: top,
        bottom: bottom,
        maxLeft: maxLeft,
        maxTop: maxTop
      };
    }
  }, {
    key: 'stickiness',
    get: function get() {/**/}
  }, {
    key: 'title',
    get: function get() {/**/}
  }]);

  return DragBox;
}();

exports.default = DragBox;
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(10)))

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _jquery = __webpack_require__(0);

var _jquery2 = _interopRequireDefault(_jquery);

var _BindedProperty2 = __webpack_require__(4);

var _BindedProperty3 = _interopRequireDefault(_BindedProperty2);

var _utilities = __webpack_require__(1);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var BindedField = function (_BindedProperty) {
  _inherits(BindedField, _BindedProperty);

  // this class holds an active input field (select, text input, slider component)
  // it creates a field from the selected type and bind a binded property to it
  function BindedField() {
    var object = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : (0, _utilities.mandatory)('object');
    var property = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : (0, _utilities.mandatory)('property');
    var parent = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
    var fieldType = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 'input';
    var allowedValues = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : null;
    var hierarchy = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : null;

    var _ref = arguments.length > 6 && arguments[6] !== undefined ? arguments[6] : {},
        _ref$constraints = _ref.constraints,
        constraints = _ref$constraints === undefined ? '' : _ref$constraints,
        _ref$title = _ref.title,
        title = _ref$title === undefined ? null : _ref$title;

    _classCallCheck(this, BindedField);

    // constant
    var _this = _possibleConstructorReturn(this, (BindedField.__proto__ || Object.getPrototypeOf(BindedField)).call(this, object, property, hierarchy));

    _this.VALID_FIELD_TYPE = ['input', 'select', 'slider', 'radio'];

    // field
    _this._field = undefined;
    _this.fieldType = fieldType;
    _this.fieldHTML = null;
    _this.allowedValues = allowedValues;
    _this.constraints = constraints || '';
    _this.tempClass = 'binded-' + (typeof object === 'undefined' ? 'undefined' : _typeof(object)) + property;
    _this.subfields = [];
    _this.errorDiv = null;
    _this.title = (title || property).replace(/(^|\s)[a-z]/g, function (f) {
      return f.toUpperCase();
    });

    // parent
    _this.parent = parent;

    // build the field html based on the fieldType: input, select, textaera, slider, radio
    var html = '';
    switch (_this.fieldType) {
      case 'input':
        _this.fieldHTML = '<div class="form-group"><label class="bindedfield-label">' + _this.title + '</label>\n        <input type="text" class="form-control ' + _this.tempClass + '" data-binded="' + property + '">\n          <div class="col-sm-10 bindedfield-errordiv ' + _this.tempClass + '-error" >\n\n            <i class="glyphicon glyphicon-remove"></i><span class="bindedfield-error"></span>\n          </div>\n        </div>';
        break;
      case 'select':
        if (!allowedValues) {
          throw new Error('fieldType selector needs at least one allowedValues');
        }

        html += '<div class="form-group">\n        <label class="bindedfield-label">' + _this.title + '</label>\n        <select class="form-control ' + _this.tempClass + '" data-binded="' + property + '">';

        for (var i = 0; i < _this.allowedValues.length; i++) {
          html += _this.fieldHTML + '<option value="' + _this.allowedValues[i] + '">' + _this.allowedValues[i] + '</option>';
        }
        _this.fieldHTML = html + '</select>\n        <div class="col-sm-10 bindedfield-errordiv ' + _this.tempClass + '-error" >\n\n          <i class="glyphicon glyphicon-remove"></i><span class="bindedfield-error"></span>\n        </div>\n      </div>';
        break;
      case 'textaera':
        _this.fieldHTML = '<div class="form-group"><label class="bindedfield-label">' + _this.title + '</label>\n                            <textarea class="form-control ' + _this.tempClass + '" rows="3" data-binded="' + property + '"></textarea>\n                            <div class="col-sm-10 bindedfield-errordiv ' + _this.tempClass + '-error" >\n\n                              <i class="glyphicon glyphicon-remove"></i><span class="bindedfield-error"></span>\n                            </div>\n                          </div>';
        break;
      case 'slider':
        _this.fieldHTML = '<div class="form-group"><label class="bindedfield-label">' + _this.title + '</label>\n      <input type="range" data-binded="' + property + '" class="form-control ' + _this.tempClass + '" min="' + _this.allowedValues[0] + '" max="' + _this.allowedValues[1] + '" step="' + _this.allowedValues[2] + '" />\n      <div class="col-sm-10 bindedfield-errordiv ' + _this.tempClass + '-error" >\n        <i class="glyphicon glyphicon-remove"></i><span class="bindedfield-error"></span>\n      </div>\n      </div>';
        break;
      case 'radio':
        html = '<fieldset class="form-group"><label class="bindedfield-label">' + _this.title + '</label>';
        var _iteratorNormalCompletion = true;
        var _didIteratorError = false;
        var _iteratorError = undefined;

        try {
          for (var _iterator = _this.allowedValues[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
            var value = _step.value;

            html += '<div class="form-check">\n            <label class="form-check-label">\n              <input type="radio" class="form-check-input ' + _this.tempClass + '" name="' + property + '" value="' + value + '" data-binded="' + property + '" checked>\n              ' + value + '\n            </label>\n          </div> ';
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

        _this.fieldHTML = html + '\n          <div class="col-sm-10 bindedfield-errordiv ' + _this.tempClass + '-error" >\n            <i class="glyphicon glyphicon-remove"></i><span class="bindedfield-error"></span>\n          </div>\n        </fieldset>';
        break;
      default:
        throw new Error('fieldType is invalid : input, selector and slider are the only valid type for now');
    }

    if (parent) {
      _this.placeInParent();
    }
    return _this;
  }

  // ui function


  _createClass(BindedField, [{
    key: 'placeInParent',
    value: function placeInParent() {
      var _this2 = this;

      var parent = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;

      if (parent) {
        this.parent = parent;
      }

      // appends html to the parent
      (0, _jquery2.default)(this.parent).append(this.fieldHTML);

      // radio type has several fields
      if (this.fieldType === 'radio') {
        var fields = (0, _jquery2.default)('.' + this.tempClass);
        var valueWasIn = false;
        var lastValue = '';
        var _iteratorNormalCompletion2 = true;
        var _didIteratorError2 = false;
        var _iteratorError2 = undefined;

        try {
          for (var _iterator2 = fields[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
            var field = _step2.value;

            (0, _jquery2.default)(field).removeClass('' + this.tempClass);
            if (field.value === this.value) {
              valueWasIn = true;
              field.checked = true;
            }
            this.subfields.push((0, _jquery2.default)(field));
            // add event listener on change
            (0, _jquery2.default)(field).change(function () {
              _this2.update('field');
            });

            lastValue = field.value;
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

        if (!valueWasIn && !this.value) {
          this.value = lastValue;
        }
      } else {
        this.field = (0, _jquery2.default)('.' + this.tempClass);
        this.field.removeClass('' + this.tempClass);

        if (this.allowedValues) {
          if (this.allowedValues.constructor === Array) {
            if (this.fieldType === 'slider') {
              if (!this.value) {
                this.value = this.allowedValues[0];
              }
              if (this.value < this.allowedValues[0]) {
                this.value = this.allowedValues[0];
              }
              if (this.value > this.allowedValues[1]) {
                this.value = this.allowedValues[1];
              }
              if (this.value % this.allowedValues[2] !== 0) {
                this.value = this.allowedValues[2] * Math.floor(this.value / this.allowedValues[2]);
              }
              this.field.val(this.value);
            } else if (this.allowedValues.indexOf(this.value) !== -1) {
              this.field.val(this.value);
            } else {
              this.value = this.allowedValues[0];
            }
          } else {
            this.field.val(this.value);
          }
        } else {
          this.field.val(this.value);
        }

        this.errorDiv = (0, _jquery2.default)('.' + this.tempClass + '-error');
        if (this.errorDiv.length) {
          this.errorDiv.removeClass(this.tempClass + '-error');
          this.errorDiv.hide();
        } else {
          this.errorDiv = null;
        }

        // add event listener on change
        this.field.change(function () {
          _this2.update('field');
        });

        this.field.keydown(function (e) {
          switch (e.keyCode) {
            case 13:
              /* Pressed enter */
              _this2.update('field');
              break;
            default:
            /**/
          }
        });
      }
    }
  }, {
    key: 'delete',
    value: function _delete() {
      // delete the div
      this.field.parent().remove();
      this.property = null;
      this.object = null;
    }
  }, {
    key: 'update',
    value: function update() {
      var origin = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'field';

      if (typeof this.field === 'undefined') {
        (0, _utilities.debugError)('BindedField.update: undefined field.');
      } else if (origin === 'field') {
        if (this.value !== this.field.val()) {
          this.value = this.field.val();

          var _verify = this.verify(),
              _verify2 = _slicedToArray(_verify, 2),
              valid = _verify2[0],
              msg = _verify2[1];

          if (valid) {
            this.correct();
          } else {
            this.incorrect(msg);
          }
        }
        (0, _jquery2.default)(this.field).get(0).blur();
      } else if (this.field.val() !== String(this.value)) {
        this.field.val(this.value);

        var _verify3 = this.verify(),
            _verify4 = _slicedToArray(_verify3, 2),
            _valid = _verify4[0],
            _msg = _verify4[1];

        if (_valid) {
          this.correct();
        } else {
          this.incorrect(_msg);
        }
      }
    }
  }, {
    key: 'correct',
    value: function correct() {
      // remove incorrect class
      this.field.removeClass('bindedfield-incorrect');
      this.error = '';
    }
  }, {
    key: 'incorrect',
    value: function incorrect() {
      var msg = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'Field does not match constraints';

      // add incorrect class
      this.field.addClass('bindedfield-incorrect');
      this.error = msg;
    }

    /**
     * Verifies that the current value respect the constraints
     * @method verify
     * @return {bool}
     */

  }, {
    key: 'verify',
    value: function verify() {
      // TODO Finish implementation of constraints
      // TODO think of creating a parser for the constraints when all is gut --- if necessary... or not
      if (typeof this.constraints === 'string' && this.constraints !== '') {
        var constraintsArray = this.constraints.split(';');
        var _iteratorNormalCompletion3 = true;
        var _didIteratorError3 = false;
        var _iteratorError3 = undefined;

        try {
          for (var _iterator3 = constraintsArray[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
            var constraint = _step3.value;

            var keyVal = constraint.split(':');
            if (keyVal.length > 2) {
              (0, _utilities.debugError)('BindedField.parsedConstraints: Invalid constraint - ' + constraint);
            } else if (keyVal.length === 2) {
              var key = keyVal[0].trim();
              var val = keyVal[1].split(',');

              switch (key) {
                case 'length':
                  val[0] = Number(val[0].trim());
                  if (isNaN(val[0])) {
                    (0, _utilities.debugError)('BindedField.parsedConstraints: Invalid constraint value - ' + constraint);
                  } else if (val.length === 1 && this.value.length !== val[0]) {
                    return [false, 'Length must be ' + val[0]];
                  } else if (val.length === 2) {
                    val[1] = Number(val[1].trim());
                    if (isNaN(val[1])) {
                      (0, _utilities.debugError)('BindedField.parsedConstraints: Invalid constraint value - ' + constraint);
                    } else if (this.value.length < val[0] || this.value.length > val[1]) {
                      return [false, 'Length out of bounds: [' + val[0] + ', ' + val[1] + ']'];
                    }
                  }
                  break;
                default:
                  (0, _utilities.debugError)('BindedField.parsedConstraints: Invalid constraint - ' + constraint);
              }
            } else {
              constraint = constraint.trim();
              // single word constraint
              switch (constraint) {
                case 'mandatory':
                  if (this.value === '' || this.value === null) {
                    return [false, 'Field is mandatory'];
                  }
                  break;
                case 'alpha':
                  if (this.value !== '' && /^[a-zA-Z]+$/.test(this.value) === false) {
                    return [false, 'Value must contain only alphabetic characters'];
                  }
                  break;
                case 'numeric':
                  if (!(0, _utilities.isNumeric)(this.value)) {
                    return [false, 'Value must contain only numeric characters'];
                  }
                  break;
                default:
                  (0, _utilities.debugError)('BindedField.parsedConstraints: Invalid constraint - ' + constraint);
              }
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
      }

      if (this.allowedValues !== null) {
        if (this.allowedValues.constructor === Array) {
          if (this.fieldType === 'slider' && (this.value < this.allowedValues[0] || this.value > this.allowedValues[1] || this.value % this.allowedValues[2] !== 0)) {
            return [false, 'Value not allowed'];
          } else if (this.fieldType !== 'slider' && !this.allowedValues.includes(this.value)) {
            return [false, 'Value not allowed'];
          }
        }
        if (this.allowedValues.constructor === String && this.allowedValues !== this.value) {
          return [false, 'Value not allowed'];
        }
      }

      return [true, 'Ok'];
    }

    // getters and setters

  }, {
    key: 'value',
    set: function set(value) {
      if (typeof this.object[this.property] === 'undefined') {
        throw new Error('The variable you are trying to bind is undefined - either this object or the property is incorrect');
      } else {
        this.object[this.property] = this.convertToType(value);
        this.update('setter');
      }
    },
    get: function get() {
      if (typeof this.object[this.property] === 'undefined') {
        throw new Error('The variable you are trying to bind is undefined - either this object or the property is incorrect');
      } else {
        return this.object[this.property];
      }
    }
  }, {
    key: 'field',
    get: function get() {
      if (this.subfields.length) {
        var _iteratorNormalCompletion4 = true;
        var _didIteratorError4 = false;
        var _iteratorError4 = undefined;

        try {
          for (var _iterator4 = this.subfields[Symbol.iterator](), _step4; !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
            var field = _step4.value;

            if ((0, _jquery2.default)(field)[0].checked) {
              return (0, _jquery2.default)(field);
            }
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
      }
      return (0, _jquery2.default)(this._field);
    },
    set: function set(field) {
      this._field = field;
    }
  }, {
    key: 'error',
    set: function set(message) {
      if (this.errorDiv !== null) {
        if (message) {
          this.errorDiv.find('.bindedfield-error').text(message);
          this.errorDiv.show();
        } else {
          this.errorDiv.find('.bindedfield-error').text('');
          this.errorDiv.hide();
        }
      }
    },
    get: function get() {
      return null;
    }
  }, {
    key: 'parsedConstraints',
    get: function get() {
      // TODO
    },
    set: function set(constraints) {
      (0, _utilities.debugError)('BindedField.parsedConstraints: read-only');
    }
  }]);

  return BindedField;
}(_BindedProperty3.default);

exports.default = BindedField;

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var BindedProperty = function () {
  function BindedProperty() {
    var object = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
    var property = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
    var hierarchy = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;

    _classCallCheck(this, BindedProperty);

    // constants
    this.HANDLED_VARIABLE_TYPES = ['number', 'string', 'boolean'];

    // data properties
    this.property = property;
    this.object = object;
    this.propagate = false;
    // to add ? chain propagation? a subscription system maybe...
    this.type = null;

    // export value as hierarchy if set, else set as property name
    this.hierarchy = hierarchy !== null ? hierarchy : property;
    this.exportName = this.hierarchy.replace(/\./g, '');

    if (!this.object) {
      // if parent object is not set consider that the binding is with a variable in the global scope
      this.object = window;
    }

    if (property !== null) {
      this.bind(object, property);
    }
  }

  /* ======== Binding function ======== */


  _createClass(BindedProperty, [{
    key: 'bind',
    value: function bind(object, property) {
      var propertyType = _typeof(this.object[this.property]);
      if (propertyType === 'undefined') {
        throw new Error('Parambox: The variable \'' + property + '\' you are trying to bind is undefined - either this object or the property is not defined');
      } else {
        if (this.HANDLED_VARIABLE_TYPES.indexOf(propertyType) === -1) {
          throw new Error('The variable you are trying to bind is of a non-handled type (string, number or boolean)');
        }

        /**
         * Binded property key
         * @type {string}
         */
        this.property = property;

        /**
         * Parent object
         * @type {object}
         */
        this.object = object;

        /**
         * Binded property type constructor
         * @type {function}
         */
        this.type = this.object[this.property].constructor;
      }
    }
  }, {
    key: 'convertToType',
    value: function convertToType(value) {
      if (this.type) {
        if (this.type === Boolean) {
          switch (String(value).toUpperCase()) {
            case '0':
              return false;
            case '1':
              return true;
            case 'FALSE':
              return false;
            case 'TRUE':
              return true;
            default:
              throw new Error('BindedProperty.convertToType: invalid string value for boolean type');
          }
        }
        return this.type(value);
      }
      throw new Error('You are trying to convert a value to a the type of the binded property but the object has no property binded to it (or no type)');
    }
    // getters and setters

  }, {
    key: 'value',
    set: function set(value) {
      if (typeof this.object[this.property] === 'undefined') {
        throw new Error('The variable you are trying to bind is undefined - either this object or the property is incorrect');
      } else {
        this.object[this.property] = this.convertToType(value);
      }
    },
    get: function get() {
      if (typeof this.object[this.property] === 'undefined') {
        throw new Error('The variable you are trying to bind is undefined - either this object or the property is incorrect');
      } else {
        return this.object[this.property];
      }
    }
  }]);

  return BindedProperty;
}();

exports.default = BindedProperty;

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _jquery = __webpack_require__(0);

var _jquery2 = _interopRequireDefault(_jquery);

var _DragBox2 = __webpack_require__(2);

var _DragBox3 = _interopRequireDefault(_DragBox2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/** Helper class creating modals */
var SmartModal = function (_DragBox) {
  _inherits(SmartModal, _DragBox);

  function SmartModal() {
    var formatType = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'across';
    var callback = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
    var buttonType = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'closebutton';
    var boxElement = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : null;

    _classCallCheck(this, SmartModal);

    // constants
    var _this = _possibleConstructorReturn(this, (SmartModal.__proto__ || Object.getPrototypeOf(SmartModal)).call(this, boxElement));
    // call super constructor


    _this.DEFAULT_BUTTON_ROW_HTML = '<div class="col-xs-12 dragbox-row smartmodal-buttonrow"></div>';
    _this.DEFAULT_BUTTON_HTML = {
      closebutton: '<button type="button" class="btn btn-secondary dragbox-button  smartmodal-closebutton">Close</button>',
      nextbutton: '<button type="button" class="btn btn-secondary dragbox-button smartmodal-nextbutton">Next</button>',
      blankbutton: '<button type="button" class="btn btn-secondary dragbox-button smartmodal-blankbutton"></button>',
      sendbutton: '<button type="button" class="btn btn-secondary dragbox-button smartmodal-sendbutton">Send</button>'
    };
    _this.DEFAULT_FORMAT_TYPES = {
      // format type desribe the topOffset, width, and height of the modal in proportion
      // updatePosition is called when the window is resized
      centralSmall: [0.2, 0.4, 0.3],
      centralLarge: [0.2, 0.7, 0.6],
      across: [0.3, 1, 0.4],
      overlay: [0.1, 0.8, 0.8]
    };

    // callback
    _this.callback = callback;

    // ui
    _this.draggable = false;
    _this.formatType = formatType;
    _this.buttonRowHtml = _this.DEFAULT_BUTTON_ROW_HTML;

    if (!(buttonType in _this.DEFAULT_BUTTON_HTML)) {
      throw new Error('buttonType invalid');
    }
    _this.buttonType = buttonType;

    // row hold the row object in dom as well as the bindedField object {rowDom: row, bindedField: bindedField}
    _this.rows = [];

    // set dragbox title
    _this.title = '<center><h5>Smart Modal</h5></center>';

    // setup the button
    _this.append(_this.buttonRowHtml, '.dragbox-footer');
    _this.append(_this.DEFAULT_BUTTON_HTML[_this.buttonType], '.smartmodal-buttonrow');

    _this.button = (0, _jquery2.default)(_this.boxElement).find('.smartmodal-' + _this.buttonType);

    // update position to fit the screen adequatly and show
    _this.callAfterConstructor();

    // event listener for window resize updates the size and position.
    var smartModalObject = _this;
    (0, _jquery2.default)(window).resize(function () {
      smartModalObject.updatePosition();
    });

    // event listener on the button
    (0, _jquery2.default)(_this.button).click(function () {
      smartModalObject.callThenDestroy();
    });
    return _this;
  }

  // after setup life cycle function


  _createClass(SmartModal, [{
    key: 'callAfterConstructor',
    value: function callAfterConstructor() {
      // update position to fit the screen adequatly and show
      this.updatePosition();
      this.updateSize();
      this.show();
    }

    // look for a callback then destroy

  }, {
    key: 'callThenDestroy',
    value: function callThenDestroy() {
      if (this.callback) {
        this.callback();
      }

      this.destroy();
    }

    // position function

  }, {
    key: 'updatePosition',
    value: function updatePosition() {
      // var coordinates = Dragbox.getCoordinateInWindow(this.boxElement);
      var innerHeight = window.innerHeight;
      var innerWidth = window.innerWidth;
      var format = this.DEFAULT_FORMAT_TYPES[this.formatType];
      var topPos = format[0] * innerHeight;
      var leftPos = innerWidth * ((1 - format[1]) / 2);
      var width = innerWidth * format[1];
      var height = innerHeight * format[2];

      this.width = width;
      this.height = height;

      (0, _jquery2.default)(this.boxElement).css({
        left: leftPos,
        top: topPos
      });
      // $(this.boxElement).animate({
      //   left: leftPos,
      //   top: topPos,
      // }, 25, () => {})
      return false;
    }
  }]);

  return SmartModal;
}(_DragBox3.default);

exports.default = SmartModal;

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _jquery = __webpack_require__(0);

var _jquery2 = _interopRequireDefault(_jquery);

var _DragBox2 = __webpack_require__(2);

var _DragBox3 = _interopRequireDefault(_DragBox2);

var _BindedField = __webpack_require__(3);

var _BindedField2 = _interopRequireDefault(_BindedField);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/** Dragable box holding double binded parameters for live development */
var ParamBox = function (_DragBox) {
  _inherits(ParamBox, _DragBox);

  function ParamBox() {
    var boxElement = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;

    _classCallCheck(this, ParamBox);

    // constants
    var _this = _possibleConstructorReturn(this, (ParamBox.__proto__ || Object.getPrototypeOf(ParamBox)).call(this, boxElement));
    // call super constructor


    _this.DEFAULT_ROW_HTML = '<div class="col-md-12 dragbox-row paramboxtmprow"></div>';

    _this.PARAMBOX_EMPTY_SUBTITLE_ROW_HTML = '<div class="col-md-12 dragbox-row paramboxtmprow"><a class="parambox-subtitle">Subtitle</a></div>';

    _this.PARAMBOX_EMPTY_ROW_HTML = '<div class="col-md-12 dragbox-row parambox-empty"><center>No parameters binded.</center></div>';

    _this.DEFAULT_BUTTON_ROW_HTML = '<div class="col-xs-12 dragbox-row parambox-buttonrow"></div>';
    _this.DEFAULT_BUTTON_HTML = {
      savebutton: '<button type="button" class="btn btn-secondary btn-block dragbox-button parambox-savebutton">Save</button>',
      importbutton: '<button type="button" class="btn btn-secondary  btn-block dragbox-button parambox-importbutton">Import</button>',
      reloadbutton: '<button type="button" class="btn btn-secondary btn-block dragbox-button parambox-reloadbutton">Reload</button>'
    };

    // setup the buttons
    _this.append(_this.DEFAULT_BUTTON_ROW_HTML, '.dragbox-footer');
    _this.append(_this.DEFAULT_BUTTON_HTML.savebutton, '.parambox-buttonrow', 'col-xs-4');
    _this.append(_this.DEFAULT_BUTTON_HTML.importbutton, '.parambox-buttonrow', 'col-xs-4');
    _this.append(_this.DEFAULT_BUTTON_HTML.reloadbutton, '.parambox-buttonrow', 'col-xs-4');

    var thisObject = _this;
    _this.boxElement[0].getElementsByClassName('parambox-savebutton')[0].addEventListener('click', function (e) {
      thisObject.save(e);
    });
    _this.boxElement[0].getElementsByClassName('parambox-importbutton')[0].addEventListener('click', function (e) {
      thisObject.import(e);
    });
    _this.boxElement[0].getElementsByClassName('parambox-reloadbutton')[0].addEventListener('click', function (e) {
      thisObject.reloadAndImport(e);
    });

    (0, _jquery2.default)(document).on('click', '.parambox-subtitle', function clicked() {
      var id = (0, _jquery2.default)(this).attr('subtitle-id');
      (0, _jquery2.default)('[parambox-belong-to=\'' + id + '\']').slideToggle(250);
    });

    // ui
    _this.rowHtml = _this.DEFAULT_ROW_HTML;
    _this.subtitleHtml = _this.PARAMBOX_EMPTY_SUBTITLE_ROW_HTML;

    // row hold the row object in dom as well as the bindedField object {rowDom: row, bindedField: bindedField}
    _this.rows = [];

    _this.subtitleRows = {};

    // set dragbox title
    _this.title = '<h4><i class="fa fa-cog fa-1x"></i> Parameter Box</h4>';

    // set overflow
    _this.overflow = 'scroll';

    // set prefix for exports TODO: IMPLEMENT IT IN EXPORTS
    if (typeof window.paramPrefixIncrement === 'undefined') {
      window.paramPrefixIncrement = 0;
    } else {
      window.paramPrefixIncrement += 1;
    }

    _this.prefix = 'paramBox' + window.paramPrefixIncrement;

    // update size and refreshView
    _this.updateSize();

    _this.refreshView();
    return _this;
  }

  // binding methods


  _createClass(ParamBox, [{
    key: 'bind',
    value: function bind(object, properties) {
      var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;

      if (typeof object === 'undefined') {
        throw new Error('object is undefined');
      }

      var objectHierarchy = null;

      if (properties.constructor !== Array) {
        properties = [properties];
      }

      for (var i = 0; i < properties.length; i++) {
        objectHierarchy = this.getDescendantProp(object, properties[i]);
        // TODO use lodash ?
        var objectTemp = objectHierarchy[0];
        var property = objectHierarchy[1];

        var underscoredHierarchy = properties[i].replace(/\./g, '');
        var subtitle = properties[i].substring(0, properties[i].lastIndexOf('.'));

        var rowDom = this.newRowInDom(subtitle);
        var bindedField = null;

        /* --- look for a value in the query string for this property --- */
        var initialValue = null;
        if (typeof this.queryString[underscoredHierarchy] !== 'undefined') {
          initialValue = this.queryString[underscoredHierarchy];
        }

        // look for a constrained field
        if (options !== null && typeof options[properties[i]] !== 'undefined') {
          var type = options[properties[i]].type || 'input';
          var constraintValues = null;
          if (options[properties[i]].constructor === Array) {
            constraintValues = options[properties[i]];
            type = options[properties[i]].type || 'select';
          } else if (typeof options[properties[i]].values !== 'undefined') {
            constraintValues = options[properties[i]].values;
            type = options[properties[i]].type || 'select';
          }

          if (initialValue !== null) {
            if (constraintValues !== null && type !== 'slider' && constraintValues.indexOf(initialValue) === -1) {
              throw new Error('ParamBox.bind: cannot set initial value to query string value of ' + initialValue + ' because it is not in the options array.');
            }

            objectTemp[property] = objectTemp[property].constructor(initialValue);
          }

          bindedField = new _BindedField2.default(objectTemp, property, rowDom, type, constraintValues, properties[i]);
        }

        // if no constrained field found, create the most relevant type of field
        if (bindedField === null) {
          if (initialValue !== null) {
            objectTemp[property] = objectTemp[property].constructor(initialValue);
          }

          if (objectTemp[property].constructor === Boolean) {
            bindedField = new _BindedField2.default(objectTemp, property, rowDom, 'select', ['TRUE', 'FALSE'], properties[i]);
          } else {
            bindedField = new _BindedField2.default(objectTemp, property, rowDom, 'input', null, properties[i]);
          }
        }

        this.rows.push(this.getBindedRow(rowDom, bindedField));
      }

      this.refreshView();
    }
  }, {
    key: 'unbind',
    value: function unbind(object, property) {
      for (var i = 0; i < this.rows.length; i++) {
        var bindedField = this.rows[i].bindedField;

        if (bindedField.object === object && bindedField.property === property) {
          this.rows.splice(i, 1);
          bindedField.delete();
        }
      }

      this.refreshView();
    }

    // ui methods

  }, {
    key: 'newRowInDom',
    value: function newRowInDom() {
      var subtitle = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';

      if (subtitle !== '') {
        if (!(subtitle in this.subtitleRows)) {
          var subtitleRow = null;
          (0, _jquery2.default)(this.boxElement).find('.dragbox-content').append(this.subtitleHtml);
          subtitleRow = this.boxElement.find('.paramboxtmprow');
          (0, _jquery2.default)(subtitleRow).removeClass('paramboxtmprow').find('a').attr('subtitle-id', subtitle).text(subtitle);
          this.subtitleRows[subtitle] = (0, _jquery2.default)(subtitleRow);
        }
      }

      var row = null;
      (0, _jquery2.default)(this.boxElement).find('.dragbox-content').append(this.rowHtml);
      row = this.boxElement.find('.paramboxtmprow');
      (0, _jquery2.default)(row).removeClass('paramboxtmprow').attr('parambox-belong-to', subtitle);

      return row;
    }
  }, {
    key: 'getBindedRow',
    value: function getBindedRow(rowDom, bindedField) {
      // eslint-disable-line
      return {
        rowDom: rowDom,
        bindedField: bindedField
      };
    }
  }, {
    key: 'refreshView',
    value: function refreshView() {
      // TODO: maybe check if all binded field are displayed in the paramBox. if not add them. get rid of unbinded field
      /* --- Add an export button if there is at least one binded property --- */
      if (this.rows.length) {
        this.boxElement[0].getElementsByClassName('parambox-buttonrow')[0].style.visibility = 'visible';
      } else {
        this.boxElement[0].getElementsByClassName('parambox-buttonrow')[0].style.visibility = 'hidden';
        // TODO: add empty message
      }

      /* --- Adapt the box's height to the number of parameters --- */
      var height = 80 + this.rows.length * 75;
      if (height > 600) {
        height = 600;
      }

      this.height = height;
    }
  }, {
    key: 'keyfunction',
    value: function keyfunction(e) {
      // check if shift + P hotkeys were stroke and toggle visibility if so
      this.map[e.keyCode] = e.type === 'keydown';

      // hide and show parameter box
      if (this.map[16] && this.map[80]) {
        // 16 == Shift - 80 == P
        // make sure to reset value in case keyup event is ignored (keep shift true for rapid toggle)
        this.map[80] = false;

        // toggle box visibility
        this.toggle();

        // prevent default action if any
        e.preventDefault();
      }
    }

    /* ======== Import/Export functions ======== */

  }, {
    key: 'getSummaryArray',
    value: function getSummaryArray() {
      var summaryArray = [];
      for (var i = 0; i < this.rows.length; i++) {
        var bindedField = this.rows[i].bindedField;
        summaryArray.push({
          property: bindedField.property,
          value: bindedField.value,
          hierarchy: bindedField.hierarchy,
          exportName: bindedField.exportName
        });
      }

      return summaryArray;
    }
  }, {
    key: 'import',
    value: function _import() {
      // make it a smart form
      // but while smart forms are finished use a simple prompt
      var importedString = prompt('Enter a JSON string:');
      var importedJSON = null;
      try {
        importedJSON = JSON.parse(importedString);
      } catch (e) {
        console.error('ParamBox.import: Invalid JSON string - Parsing error:', e);
      }

      if (importedJSON !== null) {
        if (importedJSON.constructor !== Array) {
          console.error('ParamBox.import: Invalid JSON string - the parent object needs to be of the same structure as the summaryArray');
        }

        for (var i = 0; i < importedJSON.length; i++) {
          if (typeof importedJSON[i].property === 'undefined') {
            console.error('ParamBox.import: importedJSON[' + i + '].property is undefined. Invalid JSON string - the parent object needs to be of the same structure as the summaryArray.');
          }
          if (typeof importedJSON[i].value === 'undefined') {
            console.error('ParamBox.import: importedJSON[' + i + '].value is undefined. Invalid JSON string - the parent object needs to be of the same structure as the summaryArray.');
          }

          this.setProperty(importedJSON[i].property, importedJSON[i].value);
        }
      }
    }
  }, {
    key: 'save',
    value: function save() {
      // get summary array
      var summaryArray = this.getSummaryArray();

      // stringify summary object
      var stringified = JSON.stringify(summaryArray, null, 2);

      // opens a new window with the stringified json
      var height = 30 + summaryArray.length * 70;
      if (height > 500) {
        height = 500;
      }
      window.open('data:application/json;' + (window.btoa ? 'base64,' + btoa(stringified) : stringified), 'ParamBox.save', 'width=400,height=' + height);
    }
  }, {
    key: 'reloadAndImport',
    value: function reloadAndImport() {
      /* --- Serialize the parameters in URL format --- */
      var summaryArray = this.getSummaryArray();
      var str = '';
      for (var i = 0; i < summaryArray.length; i++) {
        if (str !== '') {
          str += '&';
        }
        str += summaryArray[i].exportName + '=' + encodeURIComponent(summaryArray[i].value);
      }

      /* --- Append the parameters and reload the page --- */
      var url = window.location.href;
      var questionPosition = url.indexOf('?');
      if (questionPosition !== -1) {
        // delete arguments from the URL
        url = url.substring(0, questionPosition);
      }
      url += '?' + str;
      window.location.href = url;
    }

    /**
     * Gets the last object and property from a string description of object hierachy
     * @param  {object} object      Top object from which the hierarchy starts
     * @param  {string} description String describing the object hierachy (e.g this.object.has.property )
     * @return {array}             [parentObject, lastProperty, propertyValue]
     */

  }, {
    key: 'getDescendantProp',
    value: function getDescendantProp(object, description) {
      // eslint-disable-line
      var arr = description.split('.');
      var parentObject = null;
      var lastProperty = null;

      while (arr.length) {
        parentObject = object;
        lastProperty = arr.shift();

        if (typeof object[lastProperty] === 'undefined') {
          throw new Error('object property ' + lastProperty + ' is undefined');
        }

        object = object[lastProperty];
      }

      /* the last object of the while is the value of the specified property */
      var propertyValue = object;

      return [parentObject, lastProperty, propertyValue];
    }
  }, {
    key: 'setProperty',
    value: function setProperty(property, value) {
      if (property.constructor !== String) {
        throw new Error('ParamBox.setProperty: property needs to be a string.');
      }

      var found = false;
      for (var i = 0; i < this.rows.length; i++) {
        if (this.rows[i].bindedField.property === property) {
          this.rows[i].bindedField.value = value;
          found = true;
        }
      }

      if (found === false) {
        console.warn('ParamBox.setProperty: did not find property ' + property);
      }
    }
  }]);

  return ParamBox;
}(_DragBox3.default);

exports.default = ParamBox;

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _chartjs = __webpack_require__(11);

var _chartjs2 = _interopRequireDefault(_chartjs);

var _jquery = __webpack_require__(0);

var _jquery2 = _interopRequireDefault(_jquery);

var _SmartModal2 = __webpack_require__(5);

var _SmartModal3 = _interopRequireDefault(_SmartModal2);

var _utilities = __webpack_require__(1);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/** Wrapper class for easy chart creation using chart.js and SmartModal */
var SmartChart = function (_SmartModal) {
  _inherits(SmartChart, _SmartModal);

  function SmartChart() {
    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : (0, _utilities.mandatory)();
    var callback = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
    var boxElement = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;

    _classCallCheck(this, SmartChart);

    if (typeof _chartjs2.default === 'undefined') {
      throw new Error('SmartChart.constructor: Chart.js is not loaded.');
    }

    if (options.constructor !== Object) {
      throw new Error('SmartChart.constructor: options needs to be an object (chart.js chart options)');
    }

    // save options
    var _this = _possibleConstructorReturn(this, (SmartChart.__proto__ || Object.getPrototypeOf(SmartChart)).call(this, 'overlay', callback, 'closebutton', boxElement));

    _this.chartOptions = _jquery2.default.extend(true, {}, options);

    // set dragbox title
    _this.title = '<center><h5>Smart Chart</h5></center>';

    // Create canvas
    var canvasID = 'chart-canvas' + ((0, _jquery2.default)('canvas').length + 1);
    _this.content = '<canvas id="' + canvasID + '" class="chart-canvas"></canvas>';
    _this.canvas = document.getElementById(canvasID);

    if (typeof options.options.title.text !== 'undefined') {
      options.options.title.display = false;
      _this.title = '<center><h5>' + options.options.title.text + '</h5></center>';
    }

    // Create chart
    try {
      _chartjs2.default.defaults.global.responsive = true;
      _chartjs2.default.defaults.global.maintainAspectRatio = false;
      _this.chart = new _chartjs2.default(_this.canvas, options);
    } catch (e) {
      throw new Error('SmartChart.constructor: could not build the chart. Error: ' + e);
    }

    _this.canvas.style.background = 'white';
    _this.boxClass = 'dragbox dragbox-white-boxshadow';

    // setup footer and buttons
    _this.DEFAULT_BUTTON_ROW_HTML = '<div class="col-xs-12 dragbox-row smartchart-buttonrow"><div class="col-xs-10"></div></div>';
    _this.DEFAULT_BUTTON_HTML = {
      closebutton: '<button type="button" class="btn btn-secondary dragbox-button  smartchart-closebutton">Close</button>',
      savebutton: '<button type="button" class="btn btn-secondary dragbox-button smartchart-savebutton">Save</button>'
    };

    _this.html('.dragbox-footer', _this.DEFAULT_BUTTON_ROW_HTML);

    _this.append(_this.DEFAULT_BUTTON_HTML.savebutton, '.smartchart-buttonrow', 'col-xs-1 centered');
    _this.append(_this.DEFAULT_BUTTON_HTML.closebutton, '.smartchart-buttonrow', 'col-xs-1 centered');

    _this.closeButton = (0, _jquery2.default)(_this.boxElement).find('.smartchart-closebutton');
    _this.saveButton = (0, _jquery2.default)(_this.boxElement).find('.smartchart-savebutton');
    _this.button = _this.closeButton;

    // event listener on the button
    (0, _jquery2.default)(_this.closeButton).click(function () {
      _this.callThenDestroy();
    });

    (0, _jquery2.default)(_this.saveButton).click(function () {
      _this.save();
    });

    _this.updatePosition();
    _this.updateSize();

    setTimeout(function () {
      _this.chart.resize();
      _this.show();
    }, 250);
    return _this;
  }

  // eslint-disable-next-line class-methods-use-this


  _createClass(SmartChart, [{
    key: 'callAfterConstructor',
    value: function callAfterConstructor() {} /* Overides super */

    /** Overides SmartModal.callThenDestroy() function */

  }, {
    key: 'callThenDestroy',
    value: function callThenDestroy() {
      // look for a callback then destroy
      if (this.callback) {
        this.callback();
      }

      // if chart destroy the chart .destroy()
      if (typeof this.chart !== 'undefined' && typeof _chartjs2.default !== 'undefined') {
        if (this.chart.constructor === _chartjs2.default) {
          this.chart.destroy();
        }
      }
      // call Dragbox.destroy()
      this.destroy();
    }
  }, {
    key: 'save',
    value: function save() {
      // stringify summary object
      var stringified = JSON.stringify(this.chartOptions, null, 2);

      // opens a new window with the stringified json
      var height = 150 + this.chartOptions.data.datasets.length * 150;
      if (height > 500) {
        height = 500;
      }

      window.open('data:application/json;' + (window.btoa ? 'base64,' + btoa(stringified) : stringified), 'SmartChart.save', 'width=400,height=' + height);
    }
  }]);

  return SmartChart;
}(_SmartModal3.default);

exports.default = SmartChart;

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.BindedField = exports.BindedProperty = exports.SmartChart = exports.SmartForm = exports.SmartModal = exports.ParamBox = exports.DragBox = undefined;

var _DragBox = __webpack_require__(2);

var _DragBox2 = _interopRequireDefault(_DragBox);

var _ParamBox = __webpack_require__(6);

var _ParamBox2 = _interopRequireDefault(_ParamBox);

var _SmartModal = __webpack_require__(5);

var _SmartModal2 = _interopRequireDefault(_SmartModal);

var _SmartChart = __webpack_require__(7);

var _SmartChart2 = _interopRequireDefault(_SmartChart);

var _SmartForm = __webpack_require__(14);

var _SmartForm2 = _interopRequireDefault(_SmartForm);

var _BindedProperty = __webpack_require__(4);

var _BindedProperty2 = _interopRequireDefault(_BindedProperty);

var _BindedField = __webpack_require__(3);

var _BindedField2 = _interopRequireDefault(_BindedField);

var _utilities = __webpack_require__(1);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Experiment-boxes
 * Created. 2016
 *
 * Plug and play tools for easy development in js. Part of the experiment.js toolbox.
 *
 * Authors. Albert Buchard
 *
 * Requires: bootstrap and jQuery
 *
 * LICENSE MIT
 */

if (typeof window !== 'undefined') {
  window.DragBox = _DragBox2.default;
  window.ParamBox = _ParamBox2.default;
  window.SmartModal = _SmartModal2.default;
  window.SmartChart = _SmartChart2.default;
  window.SmartForm = _SmartForm2.default;
  window.BindedProperty = _BindedProperty2.default;
  window.BindedField = _BindedField2.default;

  /* === Get the absolute path of the library === */
  var paramBoxFullpath = './';
  var scripts = document.getElementsByTagName('script');
  if (scripts.length) {
    paramBoxFullpath = scripts[scripts.length - 1].src;
    var delimiterIndices = (0, _utilities.findAllIndices)('/', paramBoxFullpath);
    paramBoxFullpath = paramBoxFullpath.substr(0, delimiterIndices[delimiterIndices.length - 1]);
  }

  /* === Add the paramBox css once the page is loaded === */
  document.addEventListener('DOMContentLoaded', function () {
    var head = document.getElementsByTagName('head')[0];
    var link = document.createElement('link');
    link.rel = 'stylesheet';
    link.type = 'text/css';
    link.href = paramBoxFullpath + '/experimentBoxes.css';
    head.appendChild(link);
  });
}

exports.DragBox = _DragBox2.default;
exports.ParamBox = _ParamBox2.default;
exports.SmartModal = _SmartModal2.default;
exports.SmartForm = _SmartForm2.default;
exports.SmartChart = _SmartChart2.default;
exports.BindedProperty = _BindedProperty2.default;
exports.BindedField = _BindedField2.default;

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
var DEBUG_MODE_ON = true;

exports.DEBUG_MODE_ON = DEBUG_MODE_ON;

/***/ }),
/* 10 */
/***/ (function(module, exports) {

var g;

// This works in non-strict mode
g = (function() {
	return this;
})();

try {
	// This works if eval is allowed (see CSP)
	g = g || Function("return this")() || (1,eval)("this");
} catch(e) {
	// This works if the window reference is available
	if(typeof window === "object")
		g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;


/***/ }),
/* 11 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_11__;

/***/ }),
/* 12 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_12__;

/***/ }),
/* 13 */,
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _jquery = __webpack_require__(0);

var _jquery2 = _interopRequireDefault(_jquery);

var _DragBox2 = __webpack_require__(2);

var _DragBox3 = _interopRequireDefault(_DragBox2);

var _BindedField = __webpack_require__(3);

var _BindedField2 = _interopRequireDefault(_BindedField);

var _utilities = __webpack_require__(1);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

// TODO: Class generating a form based on preset fields and managing */
var SmartForm = function (_DragBox) {
  _inherits(SmartForm, _DragBox);

  /**
   * Smart form receives two parameters SmartForm({options}, boxElement)
   * @method constructor
   * options = {
   * @param  {Object}       [fields=mandatory()]     type = null : input, select, textaera, slider, radio
   *                                                 constraints =  null : list of constraints that will be automatically verified: mandatory; alpha; numeric; lenght:XX; contains:a,b,@,.;
   *                                                 authorizedValues: '': authorized values TODO maybe merge it with constraints
   *                                                 value: '': field value / initial value
   * @param  {String}       [format='overlay']       [description]
   * @param  {Numeric}      [height=null]           [description]
   * @param  {Numeric}      [width=null]            [description]
   * @param  {Function}     [callback=null]        [description]
   * @param  {String}       [url=null]               [description]
   * @param  {Function}     [verificationFunction=() => true }] [description]
   * }
   * @param  {Object}       [boxElement=null]        [description]
   * @return {SmartForm}                             [description]
   */
  function SmartForm(_ref) {
    var _ref$fields = _ref.fields,
        fields = _ref$fields === undefined ? (0, _utilities.mandatory)() : _ref$fields,
        _ref$title = _ref.title,
        title = _ref$title === undefined ? 'Form' : _ref$title,
        _ref$format = _ref.format,
        format = _ref$format === undefined ? 'overlay' : _ref$format,
        _ref$height = _ref.height,
        height = _ref$height === undefined ? null : _ref$height,
        _ref$width = _ref.width,
        width = _ref$width === undefined ? null : _ref$width,
        _ref$callback = _ref.callback,
        callback = _ref$callback === undefined ? null : _ref$callback,
        _ref$url = _ref.url,
        url = _ref$url === undefined ? null : _ref$url,
        _ref$target = _ref.target,
        target = _ref$target === undefined ? '_blank' : _ref$target,
        _ref$verificationFunc = _ref.verificationFunction,
        verificationFunction = _ref$verificationFunc === undefined ? function () {
      return true;
    } : _ref$verificationFunc,
        _ref$freeHeight = _ref.freeHeight,
        freeHeight = _ref$freeHeight === undefined ? true : _ref$freeHeight,
        _ref$noPageScroll = _ref.noPageScroll,
        noPageScroll = _ref$noPageScroll === undefined ? true : _ref$noPageScroll;
    var boxElement = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;

    _classCallCheck(this, SmartForm);

    if (fields.constructor !== Object) {
      throw new Error('SmartForm: fields is not an object.');
    }
    /* --- Create the DragBox for the form --- */

    // constants
    var _this = _possibleConstructorReturn(this, (SmartForm.__proto__ || Object.getPrototypeOf(SmartForm)).call(this, boxElement));

    _this.DEFAULT_ROW_HTML = '<div class="col-md-12 dragbox-row smartformtmprow"></div>';

    _this.EMPTY_SUBTITLE_ROW_HTML = '<div class="col-md-12 dragbox-row smartformtmprow"><a class="smartform-subtitle">Subtitle</a></div>';

    _this.smartform_EMPTY_ROW_HTML = '<div class="col-md-12 dragbox-row smartform-empty"><center>No parameters binded.</center></div>';
    _this.DEFAULT_BUTTON_ROW_HTML = '<div class="col-xs-12 dragbox-row smartform-buttonrow"></div>';
    _this.DEFAULT_BUTTON_HTML = {
      sendbutton: '<button type="button" class="btn btn-secondary dragbox-button smartform-sendbutton">Send</button>'
    };
    _this.DEFAULT_FORMAT_TYPES = {
      // format type desribe the topOffset, width, and height of the modal in proportion
      // updatePosition is called when the window is resized
      centralSmall: [0.2, 0.4, 0.3],
      centralLarge: [0.2, 0.7, 0.6],
      across: [0.3, 1, 0.4],
      overlay: [0.1, 0.8, 0.8],
      topCentralSmall: [0.1, 0.4, 0.3],
      topCentralLarge: [0.1, 0.7, 0.6]
    };

    // ui
    _this.rowHtml = _this.DEFAULT_ROW_HTML;
    _this.subtitleHtml = _this.EMPTY_SUBTITLE_ROW_HTML;

    // TODO Create the form element IF url !== null, else only use the callback to handle data.
    // constraints can be functions like checkPassword(x) { return (bool) }
    // There is constraint function by default
    _this.formElement = null;
    _this.formId = null;
    if (url !== null) {
      _this.formId = 'smartform-' + _this.boxId;
      _this.append('<form id=\'' + _this.formId + '\' action="' + url + '" method="post" target="' + target + '">');
      _this.formElement = _this.boxElement.find('#' + _this.formId).get();
    }

    /**
     * Holds a reference to the fields by key
     * @type {Object}
     */
    _this.fields = {};
    var keys = Object.keys(fields);
    for (var i = 0; i < keys.length; i++) {
      var key = keys[i];
      // fields needs to have a name and type property
      if (typeof fields[key].type === 'undefined') {
        throw new Error('SmartForm: field[' + i + '].type is undefinned');
      }
      var baseField = {
        type: null,
        constraints: null, // list of constraints that will be automatically verified: mandatory; alpha; numeric; lenght:XX; contains:a,b,@,.;
        authorizedValues: '', // athorized values
        bindedField: null,
        parent: null,
        value: '',
        row: null,
        title: key
      };
      fields[key] = (0, _utilities.extend)(baseField, fields[key]); // TODO Either migrate to lodash or rewrite an extend function as well a a keys function
      _this.fields[key] = fields[key];
      // TODO Create a form row
      _this.fields[key].row = _this.newRowInDom(_this.fields[key].parent);
      _this.fields[key].bindedField = new _BindedField2.default(_this.fields[key], 'value', _this.fields[key].row, _this.fields[key].type, _this.fields[key].authorizedValues, null, { constraints: _this.fields[key].constraints, title: _this.fields[key].title }); // TODO transform the call to an option object with parameters
    }
    if (url !== null) {
      _this.append('</form>');
    }

    // callback
    _this.callback = typeof callback === 'function' ? callback : function (fields) {
      (0, _utilities.debuglog)(fields);
    };
    _this.verificationFunction = verificationFunction;

    // ui
    _this.draggable = false;
    _this.overflow = 'scroll';
    _this.freeHeight = freeHeight;
    _this.initialFreeHeigth = freeHeight;
    _this.noPageScroll = noPageScroll;
    _this.formatType = format; // TODO add height/width custom definition
    _this.buttonRowHtml = _this.DEFAULT_BUTTON_ROW_HTML;

    _this.buttonType = 'sendbutton';

    // set dragbox title
    _this.title = '<center><h5>' + title + '</h5></center>';

    // setup the button
    _this.append(_this.buttonRowHtml, '.dragbox-footer');
    _this.append(_this.DEFAULT_BUTTON_HTML[_this.buttonType], '.smartform-buttonrow');

    _this.button = (0, _jquery2.default)(_this.boxElement).find('.smartform-' + _this.buttonType);

    // update position to fit the screen adequatly and show
    _this.callAfterConstructor();

    // event listener for window resize updates the size and position.
    (0, _jquery2.default)(window).resize(function () {
      _this.updatePosition();
    });

    // event listener on the button
    (0, _jquery2.default)(_this.button).click(function () {
      if (_this.verify() && _this.verificationFunction()) {
        _this.callThenDestroy();
      }
    });

    (0, _jquery2.default)(document).on('click', '.smartform-subtitle', function clicked() {
      var id = (0, _jquery2.default)(this).attr('subtitle-id');
      (0, _jquery2.default)('[smartform-belong-to=\'' + id + '\']').slideToggle(250);
    });
    return _this;
  }

  /* ======= Verification methods ======= */


  _createClass(SmartForm, [{
    key: 'verify',
    value: function verify() {
      var returnValue = true;
      for (var field in this.fields) {
        if (this.fields[field].hasOwnProperty('bindedField')) {
          var _fields$field$bindedF = this.fields[field].bindedField.verify(),
              _fields$field$bindedF2 = _slicedToArray(_fields$field$bindedF, 2),
              valid = _fields$field$bindedF2[0],
              msg = _fields$field$bindedF2[1];

          if (!valid) {
            this.fields[field].bindedField.incorrect(msg);
            returnValue = false;
          } else {
            this.fields[field].bindedField.correct();
          }
        }
      }
      return returnValue;
    }

    // after setup life cycle function

  }, {
    key: 'callAfterConstructor',
    value: function callAfterConstructor() {
      // update position to fit the screen adequatly and show
      this.updatePosition();
      this.updateSize();
      this.show();
    }

    // look for a callback then destroy

  }, {
    key: 'callThenDestroy',
    value: function callThenDestroy() {
      if (this.callback) {
        this.callback(this.fields);
      }

      if (this.formElement !== null) {
        this.formElement.submit();
      }

      this.destroy();
    }

    /* ======= UI Methods ======= */

  }, {
    key: 'newRowInDom',
    value: function newRowInDom() {
      var subtitle = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';

      if (subtitle) {
        if (!(subtitle in this.subtitleRows)) {
          var subtitleRow = null;
          this.contentElement.append(this.subtitleHtml);
          subtitleRow = this.boxElement.find('.smartformtmprow');
          (0, _jquery2.default)(subtitleRow).removeClass('smartformtmprow').find('a').attr('subtitle-id', subtitle).text(subtitle);
          this.subtitleRows[subtitle] = (0, _jquery2.default)(subtitleRow);
        }
      }

      var row = null;
      this.contentElement.append(this.rowHtml);
      row = this.boxElement.find('.smartformtmprow');
      (0, _jquery2.default)(row).removeClass('smartformtmprow').attr('smartform-belong-to', subtitle);

      return row;
    }

    // position function

  }, {
    key: 'updatePosition',
    value: function updatePosition() {
      var _this2 = this;

      // var coordinates = Dragbox.getCoordinateInWindow(this.boxElement);
      var innerHeight = window.innerHeight;
      var innerWidth = window.innerWidth;
      var format = this.DEFAULT_FORMAT_TYPES[this.formatType];
      var topPos = format[0] * innerHeight;
      var leftPos = innerWidth * ((1 - format[1]) / 2);
      (0, _jquery2.default)(this.boxElement).css({
        left: leftPos,
        top: topPos
      });
      (0, _utilities.delay)(10).then(function () {
        var width = innerWidth * format[1];
        if (!_this2.initialFreeHeigth) {
          _this2.height = innerHeight * format[2];
        } else if (_this2.initialFreeHeigth && _this2.noPageScroll && _this2.boxElement.height() + topPos > innerHeight - 20) {
          _this2.freeHeight = false;
          _this2.height = innerHeight - 20 - topPos;
        }

        _this2.width = width;
      });
      // $(this.boxElement).animate({
      //   left: leftPos,
      //   top: topPos,
      // }, 25, () => {})
      return false;
    }
  }]);

  return SmartForm;
}(_DragBox3.default);

exports.default = SmartForm;

/***/ })
/******/ ]);
});
//# sourceMappingURL=experimentBoxes.max.js.map