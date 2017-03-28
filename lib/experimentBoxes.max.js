(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("jQuery"), require("chartjs"), require("experiment-mathjs"), require("lodash"));
	else if(typeof define === 'function' && define.amd)
		define("experimentBoxes", ["jQuery", "chartjs", "experiment-mathjs", "lodash"], factory);
	else if(typeof exports === 'object')
		exports["experimentBoxes"] = factory(require("jQuery"), require("chartjs"), require("experiment-mathjs"), require("lodash"));
	else
		root["experimentBoxes"] = factory(root["jQuery"], root["Chart"], root["math"], root["_"]);
})(this, function(__WEBPACK_EXTERNAL_MODULE_0__, __WEBPACK_EXTERNAL_MODULE_11__, __WEBPACK_EXTERNAL_MODULE_12__, __WEBPACK_EXTERNAL_MODULE_13__) {
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
exports.findAllIndices = exports.noop = exports.debugError = exports.debugWarn = exports.debuglog = exports.mandatory = exports.mustBeDefined = exports.mustHaveConstructor = exports.looksLikeAPromise = exports.delay = exports.jitter = exports.recurse = exports.Deferred = exports.rep = exports.samplePermutation = exports.matrix = exports.getRow = exports.rowSum = exports.diag = undefined;

var _lodash = __webpack_require__(13);

var _lodash2 = _interopRequireDefault(_lodash);

var _experimentMathjs = __webpack_require__(12);

var _experimentMathjs2 = _interopRequireDefault(_experimentMathjs);

var _config = __webpack_require__(9);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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
    var randomDuration = _lodash2.default.random(min, max);
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
      this.boxHTML = '<div id="' + this.boxId + '" class="dragbox ' + this._boxClass + '" style="display:none;" draggable="false">\n          <div class="col-xs-12 dragbox-container">\n            <div class="col-xs-12 dragbox-title"><center><h3>Dragbox</h3></center>\n          </div>\n          <div class="col-xs-12 dragbox-content"></div>\n          <div class="col-xs-12 dragbox-footer"></div>\n        </div>';

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
      (0, _jquery2.default)(this.boxElement).height(this.height);

      var contentHeight = this.height - this.TITLE_HEIGHT - this.FOOTER_HEIGHT - 7;

      var thisObject = this;
      (0, _jquery2.default)(this.boxElement).animate({
        height: thisObject.height,
        width: thisObject.width
      }, 25, function () {});

      (0, _jquery2.default)(this.boxElement).find('.dragbox-container').animate({
        height: thisObject.height
      }, 25, function () {});
      (0, _jquery2.default)(this.boxElement).find('.dragbox-content').animate({
        height: contentHeight
      }, 25, function () {});
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

    _classCallCheck(this, BindedField);

    // constant
    var _this = _possibleConstructorReturn(this, (BindedField.__proto__ || Object.getPrototypeOf(BindedField)).call(this, object, property, hierarchy));

    _this.VALID_FIELD_TYPE = ['input', 'selector', 'slider'];

    // field
    _this.field = null;
    _this.fieldType = fieldType;
    _this.fieldHTML = null;
    _this.allowedValues = allowedValues;
    _this.tempClass = 'binded-' + (typeof object === 'undefined' ? 'undefined' : _typeof(object)) + property;

    // parent
    _this.parent = parent;

    // build the field html
    switch (_this.fieldType) {
      case 'input':
        _this.fieldHTML = '<fieldset class="form-group"><label>' + property + '</label>\n        <input type="text" class="form-control ' + _this.tempClass + '" data-binded="' + property + '">\n        </fieldset>';
        break;
      case 'selector':
        if (!allowedValues) {
          throw new Error('fieldType selector needs at least one allowedValues');
        }

        _this.fieldHTML = '<fieldset class="form-group">\n        <label>' + property + '</label>\n        <select class="form-control ' + _this.tempClass + '" data-binded="' + property + '">';

        for (var i = 0; i < _this.allowedValues.length; i++) {
          _this.fieldHTML = _this.fieldHTML + '<option value="' + _this.allowedValues[i] + '">' + _this.allowedValues[i] + '</option>';
        }
        _this.fieldHTML = _this.fieldHTML + '</select></fieldset>';
        break;
      case 'slider':
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
      var parent = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;

      if (parent) {
        this.parent = parent;
      }

      (0, _jquery2.default)(this.parent).append(this.fieldHTML);
      this.field = (0, _jquery2.default)('.' + this.tempClass);
      this.field.removeClass('.' + this.tempClass);

      if (this.allowedValues) {
        if (this.allowedValues.constructor === Array) {
          if (this.allowedValues.indexOf(this.value) !== -1) {
            this.field.val(this.value);
          } else {
            this.field.val(this.allowedValues[0]);
          }
        } else {
          this.field.val(this.value);
        }
      } else {
        this.field.val(this.value);
      }

      var thisObject = this;

      // add event listener on change
      this.field.change(function () {
        thisObject.update('field');
      });
      this.field.keydown(function (e) {
        switch (e.keyCode) {
          case 13:
            /* Pressed enter */
            thisObject.update('field');
            break;
          default:
          /**/
        }
      });
    }
  }, {
    key: 'delete',
    value: function _delete() {
      // delete the fieldset
      this.field.parent().remove();
      this.property = null;
      this.object = null;
    }
  }, {
    key: 'update',
    value: function update() {
      var origin = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'field';

      if (origin === 'field') {
        this.value = (0, _jquery2.default)(this.field).val();
        (0, _jquery2.default)(this.field).get(0).blur();
      } else if ((0, _jquery2.default)(this.field).val().toUpperCase() !== String(this.value).toUpperCase()) {
        (0, _jquery2.default)(this.field).val(this.value);
      }
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
    this.exportName = this.hierarchy.replace(/\./g, '_');

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

      (0, _jquery2.default)(this.boxElement).animate({
        left: leftPos,
        top: topPos
      }, 25, function () {});
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
    _this.title = '<h5><i class="fa fa-cog fa-1x"></i> Parameter Box</h5>';

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
      var constraints = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;

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

        var underscoredHierarchy = properties[i].replace(/\./g, '_');
        var subtitle = properties[i].substring(0, properties[i].lastIndexOf('.'));

        var rowDom = this.newRowInDom(subtitle);
        var bindedField = null;

        /* --- look for a value in the query string for this property --- */
        var initialValue = null;
        if (typeof this.queryString[underscoredHierarchy] !== 'undefined') {
          initialValue = this.queryString[underscoredHierarchy];
        }

        // look for a constrained field
        if (constraints !== null) {
          if (typeof constraints[properties[i]] !== 'undefined') {
            var constraintValues = constraints[properties[i]];

            if (initialValue !== null) {
              if (constraintValues.indexOf(initialValue) === -1) {
                throw new Error('ParamBox.bind: cannot set initial value to query string value of ' + initialValue + ' because it is not in the constraints array.');
              }

              objectTemp[property] = objectTemp[property].constructor(initialValue);
            }

            bindedField = new _BindedField2.default(objectTemp, property, rowDom, 'selector', constraintValues, properties[i]);
          }
        }

        // if no constrained field found, create the most relevant type of field
        if (bindedField === null) {
          if (initialValue !== null) {
            objectTemp[property] = objectTemp[property].constructor(initialValue);
          }

          if (objectTemp[property].constructor === Boolean) {
            bindedField = new _BindedField2.default(objectTemp, property, rowDom, 'selector', ['TRUE', 'FALSE'], properties[i]);
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
exports.BindedField = exports.BindedProperty = exports.SmartChart = exports.SmartModal = exports.ParamBox = exports.DragBox = undefined;

var _DragBox = __webpack_require__(2);

var _DragBox2 = _interopRequireDefault(_DragBox);

var _ParamBox = __webpack_require__(6);

var _ParamBox2 = _interopRequireDefault(_ParamBox);

var _SmartModal = __webpack_require__(5);

var _SmartModal2 = _interopRequireDefault(_SmartModal);

var _SmartChart = __webpack_require__(7);

var _SmartChart2 = _interopRequireDefault(_SmartChart);

var _BindedProperty = __webpack_require__(4);

var _BindedProperty2 = _interopRequireDefault(_BindedProperty);

var _BindedField = __webpack_require__(3);

var _BindedField2 = _interopRequireDefault(_BindedField);

var _utilities = __webpack_require__(1);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

if (typeof window !== 'undefined') {
  window.DragBox = _DragBox2.default;
  window.ParamBox = _ParamBox2.default;
  window.SmartModal = _SmartModal2.default;
  window.SmartChart = _SmartChart2.default;
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
} /**
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

exports.DragBox = _DragBox2.default;
exports.ParamBox = _ParamBox2.default;
exports.SmartModal = _SmartModal2.default;
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
/* 13 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_13__;

/***/ })
/******/ ]);
});
//# sourceMappingURL=experimentBoxes.max.js.map