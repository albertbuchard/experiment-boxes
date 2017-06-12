import math from 'experiment-mathjs'
import { DEBUG_MODE_ON } from '../config'

/*
isNumeric function in Javascript
*/
function isNumeric(n) {
  return !isNaN(parseFloat(n)) && isFinite(n)
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
const debuglog = DEBUG_MODE_ON ? console.log.bind(console) : noop
const debugWarn = DEBUG_MODE_ON ? console.warn.bind(console) : noop
const debugError = DEBUG_MODE_ON ? console.error.bind(console) : noop

/**
 * Allows to return an error for missing parameters.
 * @param  {String} param Optional string to add after the error.
 */
function mandatory(param = '') {
  throw new Error(`Missing parameter ${param}`)
}

/**
 * Checks the type of all given parameters, return an error if one is undefined.
 * @param  {...object} args List of arguments to checks
 * @return {bool}      true if all arguments are defined
 */

function mustBeDefined(...args) {
  for (let i = 0; i < args.length; i++) {
    if (typeof args[i] === 'undefined') {
      throw new Error(`Argument ${i} is undefined.`)
    }
  }

  return true
}

/**
 * Checks the constructor of all given parameters, return an error if one is not as specified.
 * @param  {object} constructorObject constructor
 * @param  {...object} args         list of arguments to check
 * @return {bool}                   true if all arguments have specified constructorObject as constructor
 */

function mustHaveConstructor(constructorObject, ...args) {
  if (args.allHaveConstructor(constructorObject) === false) {
    throw new Error('Wrong constructor in arguments.')
  }

  return true
}

/**
 * Returns true if o looks like a promise. From the es-promisify package.
 * https://github.com/digitaldesignlabs/es6-promisify/
 * @param  {object} o Object to test
 * @return {bool}   True if looks like a promise, false otherwise
 */
function looksLikeAPromise(o) {
  return o && typeof o.then === 'function' && typeof o.catch === 'function'
}


/**
 * From http://www.datchley.name/promise-patterns-anti-patterns/
 * @param  {int} ms delay in ms
 * @return {promise} promise which will resolve in delay ms
 */
function delay(ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms)
  })
}

/**
 * ©Adam Jurczyk ; https://stackoverflow.com/questions/7582828/how-to-check-if-a-string-is-a-legal-dd-mm-yyyy-date
 * @method parseDate
 * @param  {[type]}  str [description]
 * @return {[type]}      [description]
 */
function parseDate(str) {
  const t = str.match(/^(\d{2})\/(\d{2})\/(\d{4})$/)
  if (t !== null) {
    const d = +t[1]
    const m = +t[2]
    const y = +t[3]
    const date = new Date(y, m - 1, d)
    if (date.getFullYear() === y && date.getMonth() === m - 1) {
      return date
    }
  }

  return null
}

/**
 * From https://stackoverflow.com/questions/948172/password-strength-meter
 * @method scorePassword
 * @param  {string}      pass password to scorePassword
 * @return {Number}           Score (>80 is strong)
 */
function scorePassword(pass) {
  let score = 0
  if (!pass) { return score }

    // award every unique letter until 5 repetitions
  const letters = {}
  for (let i = 0; i < pass.length; i++) {
    letters[pass[i]] = (letters[pass[i]] || 0) + 1
    score += 5.0 / letters[pass[i]]
  }

    // bonus points for mixing it up
  const variations = {
    digits: /\d/.test(pass),
    lower: /[a-z]/.test(pass),
    upper: /[A-Z]/.test(pass),
    nonWords: /\W/.test(pass),
  }

  let variationCount = 0
  for (const check in variations) {
    if (variations.hasOwnProperty(check)) {
      variationCount += (variations[check] === true) ? 1 : 0
    }
  }
  score += (variationCount - 1) * 10

  return parseInt(score, 10)
}

/**
 * @param  {int} min min delay in ms
 * @param  {int} max max delay in ms
 * @return {promise} promise which will resolve in delay ms
 */
function jitter(min = mandatory(), max = mandatory()) {
  return new Promise((resolve) => {
    const randomDuration = (Math.rand * (max - min)) + min
    setTimeout(resolve, randomDuration)
  })
}

/**
 * From https://stackoverflow.com/questions/948172/password-strength-meter
 * @method checkPassStrength
 * @param  {String}          pass  password
 * @return {String}                Either weak, good, or strong
 */
function passwordStrength(pass) {
  const score = scorePassword(pass)
  if (score > 80) { return 'strong' }
  if (score > 60) { return 'good' }
  if (score >= 30) { return 'weak' }

  return ''
}

/**
 * Recurse on a given promise chain
 * @param  {Promise} promise Promise to recurse on
 * @param  {numeric} amount  amount of time to recurse
 * @return {Promise}         Promise
 */
function recurse(promiseGenerator = mandatory(),
  amount = mandatory(),
  target = this, args = [],
  concatOnArray = []) {
  // Base case - just return the promisified result
  if (amount === 0) {
    return new Promise((resolve) => {
      resolve(concatOnArray)
    })
  }


  const next = promiseGenerator.apply(target, args).then((r) => {
    concatOnArray = concatOnArray.concat(r)
    return (recurse(promiseGenerator, amount - 1, target, args, concatOnArray))
  })

  return next
}

/**
 * Compatible helper to replace the now defunc Promise.defer()
 * @method Deferred
 */
function Deferred() {
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
  this.resolve = null

  /* A method to reject the assocaited Promise with the value passed.
   * If the promise is already settled it does nothing.
   *
   * @param {anything} reason: The reason for the rejection of the Promise.
   * Generally its an Error object. If however a Promise is passed, then the Promise
   * itself will be the reason for rejection no matter the state of the Promise.
   */
  this.reject = null

  /* A newly created Pomise object.
   * Initially in pending state.
   */
  this.promise = new Promise((resolve, reject) => {
    this.resolve = resolve
    this.reject = reject
  })
  Object.freeze(this)
  // }
}

function hasConstructor(constructorObject, testObject) {
  if ((typeof testObject === 'undefined') || (testObject === null) || (testObject.constructor !== constructorObject)) {
    return false
  }
  return true
}


/**
 * From http://stackoverflow.com/questions/3751520/how-to-generate-sequence-of-numbers-chars-in-javascript
 * TODO Pull request math js
 * @param  {object} content Repeated sequence
 * @param  {int} count   Number of time the sequence must be repeat
 * @return {array}       Array with repeated sequence
 */
function rep(content = mandatory(), count = mandatory()) {
  let result = []
  if (typeof (content) === 'function') {
    for (let i = 0; i < count; i++) {
      result = result.concat(content(i))
    }
  } else {
    for (let i = 0; i < count; i++) {
      result = result.concat(content)
    }
  }
  return result
}

function samplePermutation(sequence = mandatory(), repetition = false, n = null) {
  if (sequence.constructor !== Array) {
    throw new Error('samplePermutation: sequence needs to be an array.')
  }

  if (n === null) {
    n = sequence.length
  }

  const copy = sequence.slice(0)
  let permutation = []
  let add
  while ((repetition && (permutation.length < n)) || ((!repetition) && (copy.length))) {
    const index = Math.floor(Math.random() * copy.length)
    if (repetition) {
      add = copy[index]
    } else {
      add = copy.splice(index, 1)
    }
    permutation = permutation.concat(add)
  }

  return (permutation)
}

/* =============== Personalized Matrix Functions =============== */
function matrix(rows = mandatory(), cols = mandatory(), fill = 0) {
  const matrixObject = []

  for (let i = 0; i < rows; i++) {
    matrixObject[i] = []
    for (let j = 0; j < cols; j++) {
      matrixObject[i][j] = fill
    }
  }

  return (matrixObject)
}

function getRow(matrixObject = mandatory(), rowIndex = mandatory()) {
  matrixObject = math.matrix(matrixObject)
  const size = (matrixObject.size())[0]
  const row = math.subset(matrixObject, math.index(rowIndex, math.range(0, size)))

  return (row)
}

function rowSum(matrixObject = mandatory(), rows = null) {
  matrixObject = math.matrix(matrixObject)
  const size = (matrixObject.size())[0]
  if (rows === null) {
    rows = math.range(0, size - 1)
  }
  if (rows.constructor !== Array) {
    rows = [rows]
  }

  const rowSumArray = []
  for (let i = 0; i < rows.length; i++) {
    rowSumArray.push(math.sum(getRow(matrixObject, rows[i])))
  }

  return (rowSumArray)
}

// set or get the diagonal of a matrix
function diag(matrixObject = mandatory(), setTo = null) {
  const rows = matrixObject.length
  // const cols = matrixObject[0].length

  const diagonalValues = []

  for (let i = 0; i < rows; i++) {
    if (setTo) {
      matrixObject[i][i] = setTo
    }
    diagonalValues.push(matrixObject[i][i])
  }

  return ([diagonalValues, matrixObject])
}

/**
 * Find all the positions of a needle in a haystack string
 * @param  {string} needle   string to find
 * @param  {string} haystack string to scan
 * @return {Array}  Either -1 if no match is found or an array containing the indicies
 */
function findAllIndices(needle = mandatory(), haystack = mandatory()) {
  const indices = []
  for (let i = 0; i < haystack.length; i++) {
    if (haystack.substr(i, needle.length) === needle) {
      indices.push(i)
    }
  }

  if (indices.length) {
    return indices
  }
  return -1
}

function extend(...args) {
    // Variables
  const extended = {}
  let deep = false
  let i = 0
  const length = args.length

    // Check if a deep merge
  if (Object.prototype.toString.call(args[0]) === '[object Boolean]') {
    deep = args[0]
    i += 1
  }

    // Merge the object into the extended object
  const merge = function (obj) {
    for (const prop in obj) {
      if (Object.prototype.hasOwnProperty.call(obj, prop)) {
                // If deep merge and property is an object, merge properties
        if (deep && Object.prototype.toString.call(obj[prop]) === '[object Object]') {
          extended[prop] = extend(true, extended[prop], obj[prop])
        } else {
          extended[prop] = obj[prop]
        }
      }
    }
  }

    // Loop through each object and conduct a merge
  for (; i < length; i++) {
    const obj = args[i]
    merge(obj)
  }

  return extended
}

export { diag,
  rowSum,
  getRow,
  matrix,
  samplePermutation,
  rep,
  Deferred,
  recurse,
  jitter,
  delay,
  looksLikeAPromise,
  mustHaveConstructor,
  mustBeDefined,
  mandatory,
  debuglog,
  debugWarn,
  debugError,
  noop,
  findAllIndices,
  extend,
  isNumeric,
  hasConstructor,
  parseDate,
  passwordStrength,
  scorePassword,
}
