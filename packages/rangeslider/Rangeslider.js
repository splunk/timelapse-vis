module.exports =
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
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
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
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/Rangeslider.jsx");
/******/ })
/************************************************************************/
/******/ ({

/***/ "../../node_modules/buffer/index.js":
/*!************************************************************************************!*\
  !*** /Users/roconnor/Desktop/gitclones/timelapse-vis/node_modules/buffer/index.js ***!
  \************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global) {/*!
 * The buffer module from node.js, for the browser.
 *
 * @author   Feross Aboukhadijeh <http://feross.org>
 * @license  MIT
 */
/* eslint-disable no-proto */



var base64 = __webpack_require__(/*! base64-js */ "base64-js")
var ieee754 = __webpack_require__(/*! ieee754 */ "ieee754")
var isArray = __webpack_require__(/*! isarray */ "isarray")

exports.Buffer = Buffer
exports.SlowBuffer = SlowBuffer
exports.INSPECT_MAX_BYTES = 50

/**
 * If `Buffer.TYPED_ARRAY_SUPPORT`:
 *   === true    Use Uint8Array implementation (fastest)
 *   === false   Use Object implementation (most compatible, even IE6)
 *
 * Browsers that support typed arrays are IE 10+, Firefox 4+, Chrome 7+, Safari 5.1+,
 * Opera 11.6+, iOS 4.2+.
 *
 * Due to various browser bugs, sometimes the Object implementation will be used even
 * when the browser supports typed arrays.
 *
 * Note:
 *
 *   - Firefox 4-29 lacks support for adding new properties to `Uint8Array` instances,
 *     See: https://bugzilla.mozilla.org/show_bug.cgi?id=695438.
 *
 *   - Chrome 9-10 is missing the `TypedArray.prototype.subarray` function.
 *
 *   - IE10 has a broken `TypedArray.prototype.subarray` function which returns arrays of
 *     incorrect length in some situations.

 * We detect these buggy browsers and set `Buffer.TYPED_ARRAY_SUPPORT` to `false` so they
 * get the Object implementation, which is slower but behaves correctly.
 */
Buffer.TYPED_ARRAY_SUPPORT = global.TYPED_ARRAY_SUPPORT !== undefined
  ? global.TYPED_ARRAY_SUPPORT
  : typedArraySupport()

/*
 * Export kMaxLength after typed array support is determined.
 */
exports.kMaxLength = kMaxLength()

function typedArraySupport () {
  try {
    var arr = new Uint8Array(1)
    arr.__proto__ = {__proto__: Uint8Array.prototype, foo: function () { return 42 }}
    return arr.foo() === 42 && // typed array instances can be augmented
        typeof arr.subarray === 'function' && // chrome 9-10 lack `subarray`
        arr.subarray(1, 1).byteLength === 0 // ie10 has broken `subarray`
  } catch (e) {
    return false
  }
}

function kMaxLength () {
  return Buffer.TYPED_ARRAY_SUPPORT
    ? 0x7fffffff
    : 0x3fffffff
}

function createBuffer (that, length) {
  if (kMaxLength() < length) {
    throw new RangeError('Invalid typed array length')
  }
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    // Return an augmented `Uint8Array` instance, for best performance
    that = new Uint8Array(length)
    that.__proto__ = Buffer.prototype
  } else {
    // Fallback: Return an object instance of the Buffer class
    if (that === null) {
      that = new Buffer(length)
    }
    that.length = length
  }

  return that
}

/**
 * The Buffer constructor returns instances of `Uint8Array` that have their
 * prototype changed to `Buffer.prototype`. Furthermore, `Buffer` is a subclass of
 * `Uint8Array`, so the returned instances will have all the node `Buffer` methods
 * and the `Uint8Array` methods. Square bracket notation works as expected -- it
 * returns a single octet.
 *
 * The `Uint8Array` prototype remains unmodified.
 */

function Buffer (arg, encodingOrOffset, length) {
  if (!Buffer.TYPED_ARRAY_SUPPORT && !(this instanceof Buffer)) {
    return new Buffer(arg, encodingOrOffset, length)
  }

  // Common case.
  if (typeof arg === 'number') {
    if (typeof encodingOrOffset === 'string') {
      throw new Error(
        'If encoding is specified then the first argument must be a string'
      )
    }
    return allocUnsafe(this, arg)
  }
  return from(this, arg, encodingOrOffset, length)
}

Buffer.poolSize = 8192 // not used by this implementation

// TODO: Legacy, not needed anymore. Remove in next major version.
Buffer._augment = function (arr) {
  arr.__proto__ = Buffer.prototype
  return arr
}

function from (that, value, encodingOrOffset, length) {
  if (typeof value === 'number') {
    throw new TypeError('"value" argument must not be a number')
  }

  if (typeof ArrayBuffer !== 'undefined' && value instanceof ArrayBuffer) {
    return fromArrayBuffer(that, value, encodingOrOffset, length)
  }

  if (typeof value === 'string') {
    return fromString(that, value, encodingOrOffset)
  }

  return fromObject(that, value)
}

/**
 * Functionally equivalent to Buffer(arg, encoding) but throws a TypeError
 * if value is a number.
 * Buffer.from(str[, encoding])
 * Buffer.from(array)
 * Buffer.from(buffer)
 * Buffer.from(arrayBuffer[, byteOffset[, length]])
 **/
Buffer.from = function (value, encodingOrOffset, length) {
  return from(null, value, encodingOrOffset, length)
}

if (Buffer.TYPED_ARRAY_SUPPORT) {
  Buffer.prototype.__proto__ = Uint8Array.prototype
  Buffer.__proto__ = Uint8Array
  if (typeof Symbol !== 'undefined' && Symbol.species &&
      Buffer[Symbol.species] === Buffer) {
    // Fix subarray() in ES2016. See: https://github.com/feross/buffer/pull/97
    Object.defineProperty(Buffer, Symbol.species, {
      value: null,
      configurable: true
    })
  }
}

function assertSize (size) {
  if (typeof size !== 'number') {
    throw new TypeError('"size" argument must be a number')
  } else if (size < 0) {
    throw new RangeError('"size" argument must not be negative')
  }
}

function alloc (that, size, fill, encoding) {
  assertSize(size)
  if (size <= 0) {
    return createBuffer(that, size)
  }
  if (fill !== undefined) {
    // Only pay attention to encoding if it's a string. This
    // prevents accidentally sending in a number that would
    // be interpretted as a start offset.
    return typeof encoding === 'string'
      ? createBuffer(that, size).fill(fill, encoding)
      : createBuffer(that, size).fill(fill)
  }
  return createBuffer(that, size)
}

/**
 * Creates a new filled Buffer instance.
 * alloc(size[, fill[, encoding]])
 **/
Buffer.alloc = function (size, fill, encoding) {
  return alloc(null, size, fill, encoding)
}

function allocUnsafe (that, size) {
  assertSize(size)
  that = createBuffer(that, size < 0 ? 0 : checked(size) | 0)
  if (!Buffer.TYPED_ARRAY_SUPPORT) {
    for (var i = 0; i < size; ++i) {
      that[i] = 0
    }
  }
  return that
}

/**
 * Equivalent to Buffer(num), by default creates a non-zero-filled Buffer instance.
 * */
Buffer.allocUnsafe = function (size) {
  return allocUnsafe(null, size)
}
/**
 * Equivalent to SlowBuffer(num), by default creates a non-zero-filled Buffer instance.
 */
Buffer.allocUnsafeSlow = function (size) {
  return allocUnsafe(null, size)
}

function fromString (that, string, encoding) {
  if (typeof encoding !== 'string' || encoding === '') {
    encoding = 'utf8'
  }

  if (!Buffer.isEncoding(encoding)) {
    throw new TypeError('"encoding" must be a valid string encoding')
  }

  var length = byteLength(string, encoding) | 0
  that = createBuffer(that, length)

  var actual = that.write(string, encoding)

  if (actual !== length) {
    // Writing a hex string, for example, that contains invalid characters will
    // cause everything after the first invalid character to be ignored. (e.g.
    // 'abxxcd' will be treated as 'ab')
    that = that.slice(0, actual)
  }

  return that
}

function fromArrayLike (that, array) {
  var length = array.length < 0 ? 0 : checked(array.length) | 0
  that = createBuffer(that, length)
  for (var i = 0; i < length; i += 1) {
    that[i] = array[i] & 255
  }
  return that
}

function fromArrayBuffer (that, array, byteOffset, length) {
  array.byteLength // this throws if `array` is not a valid ArrayBuffer

  if (byteOffset < 0 || array.byteLength < byteOffset) {
    throw new RangeError('\'offset\' is out of bounds')
  }

  if (array.byteLength < byteOffset + (length || 0)) {
    throw new RangeError('\'length\' is out of bounds')
  }

  if (byteOffset === undefined && length === undefined) {
    array = new Uint8Array(array)
  } else if (length === undefined) {
    array = new Uint8Array(array, byteOffset)
  } else {
    array = new Uint8Array(array, byteOffset, length)
  }

  if (Buffer.TYPED_ARRAY_SUPPORT) {
    // Return an augmented `Uint8Array` instance, for best performance
    that = array
    that.__proto__ = Buffer.prototype
  } else {
    // Fallback: Return an object instance of the Buffer class
    that = fromArrayLike(that, array)
  }
  return that
}

function fromObject (that, obj) {
  if (Buffer.isBuffer(obj)) {
    var len = checked(obj.length) | 0
    that = createBuffer(that, len)

    if (that.length === 0) {
      return that
    }

    obj.copy(that, 0, 0, len)
    return that
  }

  if (obj) {
    if ((typeof ArrayBuffer !== 'undefined' &&
        obj.buffer instanceof ArrayBuffer) || 'length' in obj) {
      if (typeof obj.length !== 'number' || isnan(obj.length)) {
        return createBuffer(that, 0)
      }
      return fromArrayLike(that, obj)
    }

    if (obj.type === 'Buffer' && isArray(obj.data)) {
      return fromArrayLike(that, obj.data)
    }
  }

  throw new TypeError('First argument must be a string, Buffer, ArrayBuffer, Array, or array-like object.')
}

function checked (length) {
  // Note: cannot use `length < kMaxLength()` here because that fails when
  // length is NaN (which is otherwise coerced to zero.)
  if (length >= kMaxLength()) {
    throw new RangeError('Attempt to allocate Buffer larger than maximum ' +
                         'size: 0x' + kMaxLength().toString(16) + ' bytes')
  }
  return length | 0
}

function SlowBuffer (length) {
  if (+length != length) { // eslint-disable-line eqeqeq
    length = 0
  }
  return Buffer.alloc(+length)
}

Buffer.isBuffer = function isBuffer (b) {
  return !!(b != null && b._isBuffer)
}

Buffer.compare = function compare (a, b) {
  if (!Buffer.isBuffer(a) || !Buffer.isBuffer(b)) {
    throw new TypeError('Arguments must be Buffers')
  }

  if (a === b) return 0

  var x = a.length
  var y = b.length

  for (var i = 0, len = Math.min(x, y); i < len; ++i) {
    if (a[i] !== b[i]) {
      x = a[i]
      y = b[i]
      break
    }
  }

  if (x < y) return -1
  if (y < x) return 1
  return 0
}

Buffer.isEncoding = function isEncoding (encoding) {
  switch (String(encoding).toLowerCase()) {
    case 'hex':
    case 'utf8':
    case 'utf-8':
    case 'ascii':
    case 'latin1':
    case 'binary':
    case 'base64':
    case 'ucs2':
    case 'ucs-2':
    case 'utf16le':
    case 'utf-16le':
      return true
    default:
      return false
  }
}

Buffer.concat = function concat (list, length) {
  if (!isArray(list)) {
    throw new TypeError('"list" argument must be an Array of Buffers')
  }

  if (list.length === 0) {
    return Buffer.alloc(0)
  }

  var i
  if (length === undefined) {
    length = 0
    for (i = 0; i < list.length; ++i) {
      length += list[i].length
    }
  }

  var buffer = Buffer.allocUnsafe(length)
  var pos = 0
  for (i = 0; i < list.length; ++i) {
    var buf = list[i]
    if (!Buffer.isBuffer(buf)) {
      throw new TypeError('"list" argument must be an Array of Buffers')
    }
    buf.copy(buffer, pos)
    pos += buf.length
  }
  return buffer
}

function byteLength (string, encoding) {
  if (Buffer.isBuffer(string)) {
    return string.length
  }
  if (typeof ArrayBuffer !== 'undefined' && typeof ArrayBuffer.isView === 'function' &&
      (ArrayBuffer.isView(string) || string instanceof ArrayBuffer)) {
    return string.byteLength
  }
  if (typeof string !== 'string') {
    string = '' + string
  }

  var len = string.length
  if (len === 0) return 0

  // Use a for loop to avoid recursion
  var loweredCase = false
  for (;;) {
    switch (encoding) {
      case 'ascii':
      case 'latin1':
      case 'binary':
        return len
      case 'utf8':
      case 'utf-8':
      case undefined:
        return utf8ToBytes(string).length
      case 'ucs2':
      case 'ucs-2':
      case 'utf16le':
      case 'utf-16le':
        return len * 2
      case 'hex':
        return len >>> 1
      case 'base64':
        return base64ToBytes(string).length
      default:
        if (loweredCase) return utf8ToBytes(string).length // assume utf8
        encoding = ('' + encoding).toLowerCase()
        loweredCase = true
    }
  }
}
Buffer.byteLength = byteLength

function slowToString (encoding, start, end) {
  var loweredCase = false

  // No need to verify that "this.length <= MAX_UINT32" since it's a read-only
  // property of a typed array.

  // This behaves neither like String nor Uint8Array in that we set start/end
  // to their upper/lower bounds if the value passed is out of range.
  // undefined is handled specially as per ECMA-262 6th Edition,
  // Section 13.3.3.7 Runtime Semantics: KeyedBindingInitialization.
  if (start === undefined || start < 0) {
    start = 0
  }
  // Return early if start > this.length. Done here to prevent potential uint32
  // coercion fail below.
  if (start > this.length) {
    return ''
  }

  if (end === undefined || end > this.length) {
    end = this.length
  }

  if (end <= 0) {
    return ''
  }

  // Force coersion to uint32. This will also coerce falsey/NaN values to 0.
  end >>>= 0
  start >>>= 0

  if (end <= start) {
    return ''
  }

  if (!encoding) encoding = 'utf8'

  while (true) {
    switch (encoding) {
      case 'hex':
        return hexSlice(this, start, end)

      case 'utf8':
      case 'utf-8':
        return utf8Slice(this, start, end)

      case 'ascii':
        return asciiSlice(this, start, end)

      case 'latin1':
      case 'binary':
        return latin1Slice(this, start, end)

      case 'base64':
        return base64Slice(this, start, end)

      case 'ucs2':
      case 'ucs-2':
      case 'utf16le':
      case 'utf-16le':
        return utf16leSlice(this, start, end)

      default:
        if (loweredCase) throw new TypeError('Unknown encoding: ' + encoding)
        encoding = (encoding + '').toLowerCase()
        loweredCase = true
    }
  }
}

// The property is used by `Buffer.isBuffer` and `is-buffer` (in Safari 5-7) to detect
// Buffer instances.
Buffer.prototype._isBuffer = true

function swap (b, n, m) {
  var i = b[n]
  b[n] = b[m]
  b[m] = i
}

Buffer.prototype.swap16 = function swap16 () {
  var len = this.length
  if (len % 2 !== 0) {
    throw new RangeError('Buffer size must be a multiple of 16-bits')
  }
  for (var i = 0; i < len; i += 2) {
    swap(this, i, i + 1)
  }
  return this
}

Buffer.prototype.swap32 = function swap32 () {
  var len = this.length
  if (len % 4 !== 0) {
    throw new RangeError('Buffer size must be a multiple of 32-bits')
  }
  for (var i = 0; i < len; i += 4) {
    swap(this, i, i + 3)
    swap(this, i + 1, i + 2)
  }
  return this
}

Buffer.prototype.swap64 = function swap64 () {
  var len = this.length
  if (len % 8 !== 0) {
    throw new RangeError('Buffer size must be a multiple of 64-bits')
  }
  for (var i = 0; i < len; i += 8) {
    swap(this, i, i + 7)
    swap(this, i + 1, i + 6)
    swap(this, i + 2, i + 5)
    swap(this, i + 3, i + 4)
  }
  return this
}

Buffer.prototype.toString = function toString () {
  var length = this.length | 0
  if (length === 0) return ''
  if (arguments.length === 0) return utf8Slice(this, 0, length)
  return slowToString.apply(this, arguments)
}

Buffer.prototype.equals = function equals (b) {
  if (!Buffer.isBuffer(b)) throw new TypeError('Argument must be a Buffer')
  if (this === b) return true
  return Buffer.compare(this, b) === 0
}

Buffer.prototype.inspect = function inspect () {
  var str = ''
  var max = exports.INSPECT_MAX_BYTES
  if (this.length > 0) {
    str = this.toString('hex', 0, max).match(/.{2}/g).join(' ')
    if (this.length > max) str += ' ... '
  }
  return '<Buffer ' + str + '>'
}

Buffer.prototype.compare = function compare (target, start, end, thisStart, thisEnd) {
  if (!Buffer.isBuffer(target)) {
    throw new TypeError('Argument must be a Buffer')
  }

  if (start === undefined) {
    start = 0
  }
  if (end === undefined) {
    end = target ? target.length : 0
  }
  if (thisStart === undefined) {
    thisStart = 0
  }
  if (thisEnd === undefined) {
    thisEnd = this.length
  }

  if (start < 0 || end > target.length || thisStart < 0 || thisEnd > this.length) {
    throw new RangeError('out of range index')
  }

  if (thisStart >= thisEnd && start >= end) {
    return 0
  }
  if (thisStart >= thisEnd) {
    return -1
  }
  if (start >= end) {
    return 1
  }

  start >>>= 0
  end >>>= 0
  thisStart >>>= 0
  thisEnd >>>= 0

  if (this === target) return 0

  var x = thisEnd - thisStart
  var y = end - start
  var len = Math.min(x, y)

  var thisCopy = this.slice(thisStart, thisEnd)
  var targetCopy = target.slice(start, end)

  for (var i = 0; i < len; ++i) {
    if (thisCopy[i] !== targetCopy[i]) {
      x = thisCopy[i]
      y = targetCopy[i]
      break
    }
  }

  if (x < y) return -1
  if (y < x) return 1
  return 0
}

// Finds either the first index of `val` in `buffer` at offset >= `byteOffset`,
// OR the last index of `val` in `buffer` at offset <= `byteOffset`.
//
// Arguments:
// - buffer - a Buffer to search
// - val - a string, Buffer, or number
// - byteOffset - an index into `buffer`; will be clamped to an int32
// - encoding - an optional encoding, relevant is val is a string
// - dir - true for indexOf, false for lastIndexOf
function bidirectionalIndexOf (buffer, val, byteOffset, encoding, dir) {
  // Empty buffer means no match
  if (buffer.length === 0) return -1

  // Normalize byteOffset
  if (typeof byteOffset === 'string') {
    encoding = byteOffset
    byteOffset = 0
  } else if (byteOffset > 0x7fffffff) {
    byteOffset = 0x7fffffff
  } else if (byteOffset < -0x80000000) {
    byteOffset = -0x80000000
  }
  byteOffset = +byteOffset  // Coerce to Number.
  if (isNaN(byteOffset)) {
    // byteOffset: it it's undefined, null, NaN, "foo", etc, search whole buffer
    byteOffset = dir ? 0 : (buffer.length - 1)
  }

  // Normalize byteOffset: negative offsets start from the end of the buffer
  if (byteOffset < 0) byteOffset = buffer.length + byteOffset
  if (byteOffset >= buffer.length) {
    if (dir) return -1
    else byteOffset = buffer.length - 1
  } else if (byteOffset < 0) {
    if (dir) byteOffset = 0
    else return -1
  }

  // Normalize val
  if (typeof val === 'string') {
    val = Buffer.from(val, encoding)
  }

  // Finally, search either indexOf (if dir is true) or lastIndexOf
  if (Buffer.isBuffer(val)) {
    // Special case: looking for empty string/buffer always fails
    if (val.length === 0) {
      return -1
    }
    return arrayIndexOf(buffer, val, byteOffset, encoding, dir)
  } else if (typeof val === 'number') {
    val = val & 0xFF // Search for a byte value [0-255]
    if (Buffer.TYPED_ARRAY_SUPPORT &&
        typeof Uint8Array.prototype.indexOf === 'function') {
      if (dir) {
        return Uint8Array.prototype.indexOf.call(buffer, val, byteOffset)
      } else {
        return Uint8Array.prototype.lastIndexOf.call(buffer, val, byteOffset)
      }
    }
    return arrayIndexOf(buffer, [ val ], byteOffset, encoding, dir)
  }

  throw new TypeError('val must be string, number or Buffer')
}

function arrayIndexOf (arr, val, byteOffset, encoding, dir) {
  var indexSize = 1
  var arrLength = arr.length
  var valLength = val.length

  if (encoding !== undefined) {
    encoding = String(encoding).toLowerCase()
    if (encoding === 'ucs2' || encoding === 'ucs-2' ||
        encoding === 'utf16le' || encoding === 'utf-16le') {
      if (arr.length < 2 || val.length < 2) {
        return -1
      }
      indexSize = 2
      arrLength /= 2
      valLength /= 2
      byteOffset /= 2
    }
  }

  function read (buf, i) {
    if (indexSize === 1) {
      return buf[i]
    } else {
      return buf.readUInt16BE(i * indexSize)
    }
  }

  var i
  if (dir) {
    var foundIndex = -1
    for (i = byteOffset; i < arrLength; i++) {
      if (read(arr, i) === read(val, foundIndex === -1 ? 0 : i - foundIndex)) {
        if (foundIndex === -1) foundIndex = i
        if (i - foundIndex + 1 === valLength) return foundIndex * indexSize
      } else {
        if (foundIndex !== -1) i -= i - foundIndex
        foundIndex = -1
      }
    }
  } else {
    if (byteOffset + valLength > arrLength) byteOffset = arrLength - valLength
    for (i = byteOffset; i >= 0; i--) {
      var found = true
      for (var j = 0; j < valLength; j++) {
        if (read(arr, i + j) !== read(val, j)) {
          found = false
          break
        }
      }
      if (found) return i
    }
  }

  return -1
}

Buffer.prototype.includes = function includes (val, byteOffset, encoding) {
  return this.indexOf(val, byteOffset, encoding) !== -1
}

Buffer.prototype.indexOf = function indexOf (val, byteOffset, encoding) {
  return bidirectionalIndexOf(this, val, byteOffset, encoding, true)
}

Buffer.prototype.lastIndexOf = function lastIndexOf (val, byteOffset, encoding) {
  return bidirectionalIndexOf(this, val, byteOffset, encoding, false)
}

function hexWrite (buf, string, offset, length) {
  offset = Number(offset) || 0
  var remaining = buf.length - offset
  if (!length) {
    length = remaining
  } else {
    length = Number(length)
    if (length > remaining) {
      length = remaining
    }
  }

  // must be an even number of digits
  var strLen = string.length
  if (strLen % 2 !== 0) throw new TypeError('Invalid hex string')

  if (length > strLen / 2) {
    length = strLen / 2
  }
  for (var i = 0; i < length; ++i) {
    var parsed = parseInt(string.substr(i * 2, 2), 16)
    if (isNaN(parsed)) return i
    buf[offset + i] = parsed
  }
  return i
}

function utf8Write (buf, string, offset, length) {
  return blitBuffer(utf8ToBytes(string, buf.length - offset), buf, offset, length)
}

function asciiWrite (buf, string, offset, length) {
  return blitBuffer(asciiToBytes(string), buf, offset, length)
}

function latin1Write (buf, string, offset, length) {
  return asciiWrite(buf, string, offset, length)
}

function base64Write (buf, string, offset, length) {
  return blitBuffer(base64ToBytes(string), buf, offset, length)
}

function ucs2Write (buf, string, offset, length) {
  return blitBuffer(utf16leToBytes(string, buf.length - offset), buf, offset, length)
}

Buffer.prototype.write = function write (string, offset, length, encoding) {
  // Buffer#write(string)
  if (offset === undefined) {
    encoding = 'utf8'
    length = this.length
    offset = 0
  // Buffer#write(string, encoding)
  } else if (length === undefined && typeof offset === 'string') {
    encoding = offset
    length = this.length
    offset = 0
  // Buffer#write(string, offset[, length][, encoding])
  } else if (isFinite(offset)) {
    offset = offset | 0
    if (isFinite(length)) {
      length = length | 0
      if (encoding === undefined) encoding = 'utf8'
    } else {
      encoding = length
      length = undefined
    }
  // legacy write(string, encoding, offset, length) - remove in v0.13
  } else {
    throw new Error(
      'Buffer.write(string, encoding, offset[, length]) is no longer supported'
    )
  }

  var remaining = this.length - offset
  if (length === undefined || length > remaining) length = remaining

  if ((string.length > 0 && (length < 0 || offset < 0)) || offset > this.length) {
    throw new RangeError('Attempt to write outside buffer bounds')
  }

  if (!encoding) encoding = 'utf8'

  var loweredCase = false
  for (;;) {
    switch (encoding) {
      case 'hex':
        return hexWrite(this, string, offset, length)

      case 'utf8':
      case 'utf-8':
        return utf8Write(this, string, offset, length)

      case 'ascii':
        return asciiWrite(this, string, offset, length)

      case 'latin1':
      case 'binary':
        return latin1Write(this, string, offset, length)

      case 'base64':
        // Warning: maxLength not taken into account in base64Write
        return base64Write(this, string, offset, length)

      case 'ucs2':
      case 'ucs-2':
      case 'utf16le':
      case 'utf-16le':
        return ucs2Write(this, string, offset, length)

      default:
        if (loweredCase) throw new TypeError('Unknown encoding: ' + encoding)
        encoding = ('' + encoding).toLowerCase()
        loweredCase = true
    }
  }
}

Buffer.prototype.toJSON = function toJSON () {
  return {
    type: 'Buffer',
    data: Array.prototype.slice.call(this._arr || this, 0)
  }
}

function base64Slice (buf, start, end) {
  if (start === 0 && end === buf.length) {
    return base64.fromByteArray(buf)
  } else {
    return base64.fromByteArray(buf.slice(start, end))
  }
}

function utf8Slice (buf, start, end) {
  end = Math.min(buf.length, end)
  var res = []

  var i = start
  while (i < end) {
    var firstByte = buf[i]
    var codePoint = null
    var bytesPerSequence = (firstByte > 0xEF) ? 4
      : (firstByte > 0xDF) ? 3
      : (firstByte > 0xBF) ? 2
      : 1

    if (i + bytesPerSequence <= end) {
      var secondByte, thirdByte, fourthByte, tempCodePoint

      switch (bytesPerSequence) {
        case 1:
          if (firstByte < 0x80) {
            codePoint = firstByte
          }
          break
        case 2:
          secondByte = buf[i + 1]
          if ((secondByte & 0xC0) === 0x80) {
            tempCodePoint = (firstByte & 0x1F) << 0x6 | (secondByte & 0x3F)
            if (tempCodePoint > 0x7F) {
              codePoint = tempCodePoint
            }
          }
          break
        case 3:
          secondByte = buf[i + 1]
          thirdByte = buf[i + 2]
          if ((secondByte & 0xC0) === 0x80 && (thirdByte & 0xC0) === 0x80) {
            tempCodePoint = (firstByte & 0xF) << 0xC | (secondByte & 0x3F) << 0x6 | (thirdByte & 0x3F)
            if (tempCodePoint > 0x7FF && (tempCodePoint < 0xD800 || tempCodePoint > 0xDFFF)) {
              codePoint = tempCodePoint
            }
          }
          break
        case 4:
          secondByte = buf[i + 1]
          thirdByte = buf[i + 2]
          fourthByte = buf[i + 3]
          if ((secondByte & 0xC0) === 0x80 && (thirdByte & 0xC0) === 0x80 && (fourthByte & 0xC0) === 0x80) {
            tempCodePoint = (firstByte & 0xF) << 0x12 | (secondByte & 0x3F) << 0xC | (thirdByte & 0x3F) << 0x6 | (fourthByte & 0x3F)
            if (tempCodePoint > 0xFFFF && tempCodePoint < 0x110000) {
              codePoint = tempCodePoint
            }
          }
      }
    }

    if (codePoint === null) {
      // we did not generate a valid codePoint so insert a
      // replacement char (U+FFFD) and advance only 1 byte
      codePoint = 0xFFFD
      bytesPerSequence = 1
    } else if (codePoint > 0xFFFF) {
      // encode to utf16 (surrogate pair dance)
      codePoint -= 0x10000
      res.push(codePoint >>> 10 & 0x3FF | 0xD800)
      codePoint = 0xDC00 | codePoint & 0x3FF
    }

    res.push(codePoint)
    i += bytesPerSequence
  }

  return decodeCodePointsArray(res)
}

// Based on http://stackoverflow.com/a/22747272/680742, the browser with
// the lowest limit is Chrome, with 0x10000 args.
// We go 1 magnitude less, for safety
var MAX_ARGUMENTS_LENGTH = 0x1000

function decodeCodePointsArray (codePoints) {
  var len = codePoints.length
  if (len <= MAX_ARGUMENTS_LENGTH) {
    return String.fromCharCode.apply(String, codePoints) // avoid extra slice()
  }

  // Decode in chunks to avoid "call stack size exceeded".
  var res = ''
  var i = 0
  while (i < len) {
    res += String.fromCharCode.apply(
      String,
      codePoints.slice(i, i += MAX_ARGUMENTS_LENGTH)
    )
  }
  return res
}

function asciiSlice (buf, start, end) {
  var ret = ''
  end = Math.min(buf.length, end)

  for (var i = start; i < end; ++i) {
    ret += String.fromCharCode(buf[i] & 0x7F)
  }
  return ret
}

function latin1Slice (buf, start, end) {
  var ret = ''
  end = Math.min(buf.length, end)

  for (var i = start; i < end; ++i) {
    ret += String.fromCharCode(buf[i])
  }
  return ret
}

function hexSlice (buf, start, end) {
  var len = buf.length

  if (!start || start < 0) start = 0
  if (!end || end < 0 || end > len) end = len

  var out = ''
  for (var i = start; i < end; ++i) {
    out += toHex(buf[i])
  }
  return out
}

function utf16leSlice (buf, start, end) {
  var bytes = buf.slice(start, end)
  var res = ''
  for (var i = 0; i < bytes.length; i += 2) {
    res += String.fromCharCode(bytes[i] + bytes[i + 1] * 256)
  }
  return res
}

Buffer.prototype.slice = function slice (start, end) {
  var len = this.length
  start = ~~start
  end = end === undefined ? len : ~~end

  if (start < 0) {
    start += len
    if (start < 0) start = 0
  } else if (start > len) {
    start = len
  }

  if (end < 0) {
    end += len
    if (end < 0) end = 0
  } else if (end > len) {
    end = len
  }

  if (end < start) end = start

  var newBuf
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    newBuf = this.subarray(start, end)
    newBuf.__proto__ = Buffer.prototype
  } else {
    var sliceLen = end - start
    newBuf = new Buffer(sliceLen, undefined)
    for (var i = 0; i < sliceLen; ++i) {
      newBuf[i] = this[i + start]
    }
  }

  return newBuf
}

/*
 * Need to make sure that buffer isn't trying to write out of bounds.
 */
function checkOffset (offset, ext, length) {
  if ((offset % 1) !== 0 || offset < 0) throw new RangeError('offset is not uint')
  if (offset + ext > length) throw new RangeError('Trying to access beyond buffer length')
}

Buffer.prototype.readUIntLE = function readUIntLE (offset, byteLength, noAssert) {
  offset = offset | 0
  byteLength = byteLength | 0
  if (!noAssert) checkOffset(offset, byteLength, this.length)

  var val = this[offset]
  var mul = 1
  var i = 0
  while (++i < byteLength && (mul *= 0x100)) {
    val += this[offset + i] * mul
  }

  return val
}

Buffer.prototype.readUIntBE = function readUIntBE (offset, byteLength, noAssert) {
  offset = offset | 0
  byteLength = byteLength | 0
  if (!noAssert) {
    checkOffset(offset, byteLength, this.length)
  }

  var val = this[offset + --byteLength]
  var mul = 1
  while (byteLength > 0 && (mul *= 0x100)) {
    val += this[offset + --byteLength] * mul
  }

  return val
}

Buffer.prototype.readUInt8 = function readUInt8 (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 1, this.length)
  return this[offset]
}

Buffer.prototype.readUInt16LE = function readUInt16LE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 2, this.length)
  return this[offset] | (this[offset + 1] << 8)
}

Buffer.prototype.readUInt16BE = function readUInt16BE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 2, this.length)
  return (this[offset] << 8) | this[offset + 1]
}

Buffer.prototype.readUInt32LE = function readUInt32LE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length)

  return ((this[offset]) |
      (this[offset + 1] << 8) |
      (this[offset + 2] << 16)) +
      (this[offset + 3] * 0x1000000)
}

Buffer.prototype.readUInt32BE = function readUInt32BE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length)

  return (this[offset] * 0x1000000) +
    ((this[offset + 1] << 16) |
    (this[offset + 2] << 8) |
    this[offset + 3])
}

Buffer.prototype.readIntLE = function readIntLE (offset, byteLength, noAssert) {
  offset = offset | 0
  byteLength = byteLength | 0
  if (!noAssert) checkOffset(offset, byteLength, this.length)

  var val = this[offset]
  var mul = 1
  var i = 0
  while (++i < byteLength && (mul *= 0x100)) {
    val += this[offset + i] * mul
  }
  mul *= 0x80

  if (val >= mul) val -= Math.pow(2, 8 * byteLength)

  return val
}

Buffer.prototype.readIntBE = function readIntBE (offset, byteLength, noAssert) {
  offset = offset | 0
  byteLength = byteLength | 0
  if (!noAssert) checkOffset(offset, byteLength, this.length)

  var i = byteLength
  var mul = 1
  var val = this[offset + --i]
  while (i > 0 && (mul *= 0x100)) {
    val += this[offset + --i] * mul
  }
  mul *= 0x80

  if (val >= mul) val -= Math.pow(2, 8 * byteLength)

  return val
}

Buffer.prototype.readInt8 = function readInt8 (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 1, this.length)
  if (!(this[offset] & 0x80)) return (this[offset])
  return ((0xff - this[offset] + 1) * -1)
}

Buffer.prototype.readInt16LE = function readInt16LE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 2, this.length)
  var val = this[offset] | (this[offset + 1] << 8)
  return (val & 0x8000) ? val | 0xFFFF0000 : val
}

Buffer.prototype.readInt16BE = function readInt16BE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 2, this.length)
  var val = this[offset + 1] | (this[offset] << 8)
  return (val & 0x8000) ? val | 0xFFFF0000 : val
}

Buffer.prototype.readInt32LE = function readInt32LE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length)

  return (this[offset]) |
    (this[offset + 1] << 8) |
    (this[offset + 2] << 16) |
    (this[offset + 3] << 24)
}

Buffer.prototype.readInt32BE = function readInt32BE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length)

  return (this[offset] << 24) |
    (this[offset + 1] << 16) |
    (this[offset + 2] << 8) |
    (this[offset + 3])
}

Buffer.prototype.readFloatLE = function readFloatLE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length)
  return ieee754.read(this, offset, true, 23, 4)
}

Buffer.prototype.readFloatBE = function readFloatBE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length)
  return ieee754.read(this, offset, false, 23, 4)
}

Buffer.prototype.readDoubleLE = function readDoubleLE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 8, this.length)
  return ieee754.read(this, offset, true, 52, 8)
}

Buffer.prototype.readDoubleBE = function readDoubleBE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 8, this.length)
  return ieee754.read(this, offset, false, 52, 8)
}

function checkInt (buf, value, offset, ext, max, min) {
  if (!Buffer.isBuffer(buf)) throw new TypeError('"buffer" argument must be a Buffer instance')
  if (value > max || value < min) throw new RangeError('"value" argument is out of bounds')
  if (offset + ext > buf.length) throw new RangeError('Index out of range')
}

Buffer.prototype.writeUIntLE = function writeUIntLE (value, offset, byteLength, noAssert) {
  value = +value
  offset = offset | 0
  byteLength = byteLength | 0
  if (!noAssert) {
    var maxBytes = Math.pow(2, 8 * byteLength) - 1
    checkInt(this, value, offset, byteLength, maxBytes, 0)
  }

  var mul = 1
  var i = 0
  this[offset] = value & 0xFF
  while (++i < byteLength && (mul *= 0x100)) {
    this[offset + i] = (value / mul) & 0xFF
  }

  return offset + byteLength
}

Buffer.prototype.writeUIntBE = function writeUIntBE (value, offset, byteLength, noAssert) {
  value = +value
  offset = offset | 0
  byteLength = byteLength | 0
  if (!noAssert) {
    var maxBytes = Math.pow(2, 8 * byteLength) - 1
    checkInt(this, value, offset, byteLength, maxBytes, 0)
  }

  var i = byteLength - 1
  var mul = 1
  this[offset + i] = value & 0xFF
  while (--i >= 0 && (mul *= 0x100)) {
    this[offset + i] = (value / mul) & 0xFF
  }

  return offset + byteLength
}

Buffer.prototype.writeUInt8 = function writeUInt8 (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 1, 0xff, 0)
  if (!Buffer.TYPED_ARRAY_SUPPORT) value = Math.floor(value)
  this[offset] = (value & 0xff)
  return offset + 1
}

function objectWriteUInt16 (buf, value, offset, littleEndian) {
  if (value < 0) value = 0xffff + value + 1
  for (var i = 0, j = Math.min(buf.length - offset, 2); i < j; ++i) {
    buf[offset + i] = (value & (0xff << (8 * (littleEndian ? i : 1 - i)))) >>>
      (littleEndian ? i : 1 - i) * 8
  }
}

Buffer.prototype.writeUInt16LE = function writeUInt16LE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 2, 0xffff, 0)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value & 0xff)
    this[offset + 1] = (value >>> 8)
  } else {
    objectWriteUInt16(this, value, offset, true)
  }
  return offset + 2
}

Buffer.prototype.writeUInt16BE = function writeUInt16BE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 2, 0xffff, 0)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value >>> 8)
    this[offset + 1] = (value & 0xff)
  } else {
    objectWriteUInt16(this, value, offset, false)
  }
  return offset + 2
}

function objectWriteUInt32 (buf, value, offset, littleEndian) {
  if (value < 0) value = 0xffffffff + value + 1
  for (var i = 0, j = Math.min(buf.length - offset, 4); i < j; ++i) {
    buf[offset + i] = (value >>> (littleEndian ? i : 3 - i) * 8) & 0xff
  }
}

Buffer.prototype.writeUInt32LE = function writeUInt32LE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 4, 0xffffffff, 0)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset + 3] = (value >>> 24)
    this[offset + 2] = (value >>> 16)
    this[offset + 1] = (value >>> 8)
    this[offset] = (value & 0xff)
  } else {
    objectWriteUInt32(this, value, offset, true)
  }
  return offset + 4
}

Buffer.prototype.writeUInt32BE = function writeUInt32BE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 4, 0xffffffff, 0)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value >>> 24)
    this[offset + 1] = (value >>> 16)
    this[offset + 2] = (value >>> 8)
    this[offset + 3] = (value & 0xff)
  } else {
    objectWriteUInt32(this, value, offset, false)
  }
  return offset + 4
}

Buffer.prototype.writeIntLE = function writeIntLE (value, offset, byteLength, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) {
    var limit = Math.pow(2, 8 * byteLength - 1)

    checkInt(this, value, offset, byteLength, limit - 1, -limit)
  }

  var i = 0
  var mul = 1
  var sub = 0
  this[offset] = value & 0xFF
  while (++i < byteLength && (mul *= 0x100)) {
    if (value < 0 && sub === 0 && this[offset + i - 1] !== 0) {
      sub = 1
    }
    this[offset + i] = ((value / mul) >> 0) - sub & 0xFF
  }

  return offset + byteLength
}

Buffer.prototype.writeIntBE = function writeIntBE (value, offset, byteLength, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) {
    var limit = Math.pow(2, 8 * byteLength - 1)

    checkInt(this, value, offset, byteLength, limit - 1, -limit)
  }

  var i = byteLength - 1
  var mul = 1
  var sub = 0
  this[offset + i] = value & 0xFF
  while (--i >= 0 && (mul *= 0x100)) {
    if (value < 0 && sub === 0 && this[offset + i + 1] !== 0) {
      sub = 1
    }
    this[offset + i] = ((value / mul) >> 0) - sub & 0xFF
  }

  return offset + byteLength
}

Buffer.prototype.writeInt8 = function writeInt8 (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 1, 0x7f, -0x80)
  if (!Buffer.TYPED_ARRAY_SUPPORT) value = Math.floor(value)
  if (value < 0) value = 0xff + value + 1
  this[offset] = (value & 0xff)
  return offset + 1
}

Buffer.prototype.writeInt16LE = function writeInt16LE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 2, 0x7fff, -0x8000)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value & 0xff)
    this[offset + 1] = (value >>> 8)
  } else {
    objectWriteUInt16(this, value, offset, true)
  }
  return offset + 2
}

Buffer.prototype.writeInt16BE = function writeInt16BE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 2, 0x7fff, -0x8000)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value >>> 8)
    this[offset + 1] = (value & 0xff)
  } else {
    objectWriteUInt16(this, value, offset, false)
  }
  return offset + 2
}

Buffer.prototype.writeInt32LE = function writeInt32LE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 4, 0x7fffffff, -0x80000000)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value & 0xff)
    this[offset + 1] = (value >>> 8)
    this[offset + 2] = (value >>> 16)
    this[offset + 3] = (value >>> 24)
  } else {
    objectWriteUInt32(this, value, offset, true)
  }
  return offset + 4
}

Buffer.prototype.writeInt32BE = function writeInt32BE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 4, 0x7fffffff, -0x80000000)
  if (value < 0) value = 0xffffffff + value + 1
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value >>> 24)
    this[offset + 1] = (value >>> 16)
    this[offset + 2] = (value >>> 8)
    this[offset + 3] = (value & 0xff)
  } else {
    objectWriteUInt32(this, value, offset, false)
  }
  return offset + 4
}

function checkIEEE754 (buf, value, offset, ext, max, min) {
  if (offset + ext > buf.length) throw new RangeError('Index out of range')
  if (offset < 0) throw new RangeError('Index out of range')
}

function writeFloat (buf, value, offset, littleEndian, noAssert) {
  if (!noAssert) {
    checkIEEE754(buf, value, offset, 4, 3.4028234663852886e+38, -3.4028234663852886e+38)
  }
  ieee754.write(buf, value, offset, littleEndian, 23, 4)
  return offset + 4
}

Buffer.prototype.writeFloatLE = function writeFloatLE (value, offset, noAssert) {
  return writeFloat(this, value, offset, true, noAssert)
}

Buffer.prototype.writeFloatBE = function writeFloatBE (value, offset, noAssert) {
  return writeFloat(this, value, offset, false, noAssert)
}

function writeDouble (buf, value, offset, littleEndian, noAssert) {
  if (!noAssert) {
    checkIEEE754(buf, value, offset, 8, 1.7976931348623157E+308, -1.7976931348623157E+308)
  }
  ieee754.write(buf, value, offset, littleEndian, 52, 8)
  return offset + 8
}

Buffer.prototype.writeDoubleLE = function writeDoubleLE (value, offset, noAssert) {
  return writeDouble(this, value, offset, true, noAssert)
}

Buffer.prototype.writeDoubleBE = function writeDoubleBE (value, offset, noAssert) {
  return writeDouble(this, value, offset, false, noAssert)
}

// copy(targetBuffer, targetStart=0, sourceStart=0, sourceEnd=buffer.length)
Buffer.prototype.copy = function copy (target, targetStart, start, end) {
  if (!start) start = 0
  if (!end && end !== 0) end = this.length
  if (targetStart >= target.length) targetStart = target.length
  if (!targetStart) targetStart = 0
  if (end > 0 && end < start) end = start

  // Copy 0 bytes; we're done
  if (end === start) return 0
  if (target.length === 0 || this.length === 0) return 0

  // Fatal error conditions
  if (targetStart < 0) {
    throw new RangeError('targetStart out of bounds')
  }
  if (start < 0 || start >= this.length) throw new RangeError('sourceStart out of bounds')
  if (end < 0) throw new RangeError('sourceEnd out of bounds')

  // Are we oob?
  if (end > this.length) end = this.length
  if (target.length - targetStart < end - start) {
    end = target.length - targetStart + start
  }

  var len = end - start
  var i

  if (this === target && start < targetStart && targetStart < end) {
    // descending copy from end
    for (i = len - 1; i >= 0; --i) {
      target[i + targetStart] = this[i + start]
    }
  } else if (len < 1000 || !Buffer.TYPED_ARRAY_SUPPORT) {
    // ascending copy from start
    for (i = 0; i < len; ++i) {
      target[i + targetStart] = this[i + start]
    }
  } else {
    Uint8Array.prototype.set.call(
      target,
      this.subarray(start, start + len),
      targetStart
    )
  }

  return len
}

// Usage:
//    buffer.fill(number[, offset[, end]])
//    buffer.fill(buffer[, offset[, end]])
//    buffer.fill(string[, offset[, end]][, encoding])
Buffer.prototype.fill = function fill (val, start, end, encoding) {
  // Handle string cases:
  if (typeof val === 'string') {
    if (typeof start === 'string') {
      encoding = start
      start = 0
      end = this.length
    } else if (typeof end === 'string') {
      encoding = end
      end = this.length
    }
    if (val.length === 1) {
      var code = val.charCodeAt(0)
      if (code < 256) {
        val = code
      }
    }
    if (encoding !== undefined && typeof encoding !== 'string') {
      throw new TypeError('encoding must be a string')
    }
    if (typeof encoding === 'string' && !Buffer.isEncoding(encoding)) {
      throw new TypeError('Unknown encoding: ' + encoding)
    }
  } else if (typeof val === 'number') {
    val = val & 255
  }

  // Invalid ranges are not set to a default, so can range check early.
  if (start < 0 || this.length < start || this.length < end) {
    throw new RangeError('Out of range index')
  }

  if (end <= start) {
    return this
  }

  start = start >>> 0
  end = end === undefined ? this.length : end >>> 0

  if (!val) val = 0

  var i
  if (typeof val === 'number') {
    for (i = start; i < end; ++i) {
      this[i] = val
    }
  } else {
    var bytes = Buffer.isBuffer(val)
      ? val
      : utf8ToBytes(new Buffer(val, encoding).toString())
    var len = bytes.length
    for (i = 0; i < end - start; ++i) {
      this[i + start] = bytes[i % len]
    }
  }

  return this
}

// HELPER FUNCTIONS
// ================

var INVALID_BASE64_RE = /[^+\/0-9A-Za-z-_]/g

function base64clean (str) {
  // Node strips out invalid characters like \n and \t from the string, base64-js does not
  str = stringtrim(str).replace(INVALID_BASE64_RE, '')
  // Node converts strings with length < 2 to ''
  if (str.length < 2) return ''
  // Node allows for non-padded base64 strings (missing trailing ===), base64-js does not
  while (str.length % 4 !== 0) {
    str = str + '='
  }
  return str
}

function stringtrim (str) {
  if (str.trim) return str.trim()
  return str.replace(/^\s+|\s+$/g, '')
}

function toHex (n) {
  if (n < 16) return '0' + n.toString(16)
  return n.toString(16)
}

function utf8ToBytes (string, units) {
  units = units || Infinity
  var codePoint
  var length = string.length
  var leadSurrogate = null
  var bytes = []

  for (var i = 0; i < length; ++i) {
    codePoint = string.charCodeAt(i)

    // is surrogate component
    if (codePoint > 0xD7FF && codePoint < 0xE000) {
      // last char was a lead
      if (!leadSurrogate) {
        // no lead yet
        if (codePoint > 0xDBFF) {
          // unexpected trail
          if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
          continue
        } else if (i + 1 === length) {
          // unpaired lead
          if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
          continue
        }

        // valid lead
        leadSurrogate = codePoint

        continue
      }

      // 2 leads in a row
      if (codePoint < 0xDC00) {
        if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
        leadSurrogate = codePoint
        continue
      }

      // valid surrogate pair
      codePoint = (leadSurrogate - 0xD800 << 10 | codePoint - 0xDC00) + 0x10000
    } else if (leadSurrogate) {
      // valid bmp char, but last char was a lead
      if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
    }

    leadSurrogate = null

    // encode utf8
    if (codePoint < 0x80) {
      if ((units -= 1) < 0) break
      bytes.push(codePoint)
    } else if (codePoint < 0x800) {
      if ((units -= 2) < 0) break
      bytes.push(
        codePoint >> 0x6 | 0xC0,
        codePoint & 0x3F | 0x80
      )
    } else if (codePoint < 0x10000) {
      if ((units -= 3) < 0) break
      bytes.push(
        codePoint >> 0xC | 0xE0,
        codePoint >> 0x6 & 0x3F | 0x80,
        codePoint & 0x3F | 0x80
      )
    } else if (codePoint < 0x110000) {
      if ((units -= 4) < 0) break
      bytes.push(
        codePoint >> 0x12 | 0xF0,
        codePoint >> 0xC & 0x3F | 0x80,
        codePoint >> 0x6 & 0x3F | 0x80,
        codePoint & 0x3F | 0x80
      )
    } else {
      throw new Error('Invalid code point')
    }
  }

  return bytes
}

function asciiToBytes (str) {
  var byteArray = []
  for (var i = 0; i < str.length; ++i) {
    // Node's code seems to be doing this and not & 0x7F..
    byteArray.push(str.charCodeAt(i) & 0xFF)
  }
  return byteArray
}

function utf16leToBytes (str, units) {
  var c, hi, lo
  var byteArray = []
  for (var i = 0; i < str.length; ++i) {
    if ((units -= 2) < 0) break

    c = str.charCodeAt(i)
    hi = c >> 8
    lo = c % 256
    byteArray.push(lo)
    byteArray.push(hi)
  }

  return byteArray
}

function base64ToBytes (str) {
  return base64.toByteArray(base64clean(str))
}

function blitBuffer (src, dst, offset, length) {
  for (var i = 0; i < length; ++i) {
    if ((i + offset >= dst.length) || (i >= src.length)) break
    dst[i + offset] = src[i]
  }
  return i
}

function isnan (val) {
  return val !== val // eslint-disable-line no-self-compare
}

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../webpack/buildin/global.js */ "../../node_modules/webpack/buildin/global.js")))

/***/ }),

/***/ "../../node_modules/webpack/buildin/global.js":
/*!***********************************!*\
  !*** (webpack)/buildin/global.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

var g;

// This works in non-strict mode
g = (function() {
	return this;
})();

try {
	// This works if eval is allowed (see CSP)
	g = g || new Function("return this")();
} catch (e) {
	// This works if the window reference is available
	if (typeof window === "object") g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;


/***/ }),

/***/ "./src/Rangeslider.jsx":
/*!*****************************!*\
  !*** ./src/Rangeslider.jsx ***!
  \*****************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(Buffer) {/* harmony import */ var _splunk_dashboard_context__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @splunk/dashboard-context */ "@splunk/dashboard-context");
/* harmony import */ var _splunk_dashboard_context__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_splunk_dashboard_context__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _splunk_dashboard_context_GeoJsonProvider__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @splunk/dashboard-context/GeoJsonProvider */ "@splunk/dashboard-context/GeoJsonProvider");
/* harmony import */ var _splunk_dashboard_context_GeoJsonProvider__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_splunk_dashboard_context_GeoJsonProvider__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _splunk_dashboard_context_GeoRegistry__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @splunk/dashboard-context/GeoRegistry */ "@splunk/dashboard-context/GeoRegistry");
/* harmony import */ var _splunk_dashboard_context_GeoRegistry__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_splunk_dashboard_context_GeoRegistry__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _splunk_dashboard_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @splunk/dashboard-core */ "@splunk/dashboard-core");
/* harmony import */ var _splunk_dashboard_core__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_splunk_dashboard_core__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _splunk_dashboard_presets_EnterprisePreset__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @splunk/dashboard-presets/EnterprisePreset */ "@splunk/dashboard-presets/EnterprisePreset");
/* harmony import */ var _splunk_dashboard_presets_EnterprisePreset__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_splunk_dashboard_presets_EnterprisePreset__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _splunk_react_ui_Button__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @splunk/react-ui/Button */ "@splunk/react-ui/Button");
/* harmony import */ var _splunk_react_ui_Button__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_splunk_react_ui_Button__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _splunk_react_ui_Switch__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @splunk/react-ui/Switch */ "@splunk/react-ui/Switch");
/* harmony import */ var _splunk_react_ui_Switch__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(_splunk_react_ui_Switch__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var _splunk_react_ui_Paragraph__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @splunk/react-ui/Paragraph */ "@splunk/react-ui/Paragraph");
/* harmony import */ var _splunk_react_ui_Paragraph__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(_splunk_react_ui_Paragraph__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var _splunk_react_ui_Heading__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @splunk/react-ui/Heading */ "@splunk/react-ui/Heading");
/* harmony import */ var _splunk_react_ui_Heading__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(_splunk_react_ui_Heading__WEBPACK_IMPORTED_MODULE_8__);
/* harmony import */ var _splunk_react_ui_Message__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @splunk/react-ui/Message */ "@splunk/react-ui/Message");
/* harmony import */ var _splunk_react_ui_Message__WEBPACK_IMPORTED_MODULE_9___default = /*#__PURE__*/__webpack_require__.n(_splunk_react_ui_Message__WEBPACK_IMPORTED_MODULE_9__);
/* harmony import */ var _splunk_react_ui_Accordion__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @splunk/react-ui/Accordion */ "@splunk/react-ui/Accordion");
/* harmony import */ var _splunk_react_ui_Accordion__WEBPACK_IMPORTED_MODULE_10___default = /*#__PURE__*/__webpack_require__.n(_splunk_react_ui_Accordion__WEBPACK_IMPORTED_MODULE_10__);
/* harmony import */ var _splunk_react_ui_WaitSpinner__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @splunk/react-ui/WaitSpinner */ "@splunk/react-ui/WaitSpinner");
/* harmony import */ var _splunk_react_ui_WaitSpinner__WEBPACK_IMPORTED_MODULE_11___default = /*#__PURE__*/__webpack_require__.n(_splunk_react_ui_WaitSpinner__WEBPACK_IMPORTED_MODULE_11__);
/* harmony import */ var _splunk_react_ui_SidePanel__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! @splunk/react-ui/SidePanel */ "@splunk/react-ui/SidePanel");
/* harmony import */ var _splunk_react_ui_SidePanel__WEBPACK_IMPORTED_MODULE_12___default = /*#__PURE__*/__webpack_require__.n(_splunk_react_ui_SidePanel__WEBPACK_IMPORTED_MODULE_12__);
/* harmony import */ var _splunk_react_ui_Link__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! @splunk/react-ui/Link */ "@splunk/react-ui/Link");
/* harmony import */ var _splunk_react_ui_Link__WEBPACK_IMPORTED_MODULE_13___default = /*#__PURE__*/__webpack_require__.n(_splunk_react_ui_Link__WEBPACK_IMPORTED_MODULE_13__);
/* harmony import */ var _splunk_react_icons_Bell__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! @splunk/react-icons/Bell */ "@splunk/react-icons/Bell");
/* harmony import */ var _splunk_react_icons_Bell__WEBPACK_IMPORTED_MODULE_14___default = /*#__PURE__*/__webpack_require__.n(_splunk_react_icons_Bell__WEBPACK_IMPORTED_MODULE_14__);
/* harmony import */ var date_fns__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! date-fns */ "date-fns");
/* harmony import */ var date_fns__WEBPACK_IMPORTED_MODULE_15___default = /*#__PURE__*/__webpack_require__.n(date_fns__WEBPACK_IMPORTED_MODULE_15__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_16___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_16__);
/* harmony import */ var react_timeline_range_slider__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! react-timeline-range-slider */ "react-timeline-range-slider");
/* harmony import */ var react_timeline_range_slider__WEBPACK_IMPORTED_MODULE_17___default = /*#__PURE__*/__webpack_require__.n(react_timeline_range_slider__WEBPACK_IMPORTED_MODULE_17__);
/* harmony import */ var _splunk_themes__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! @splunk/themes */ "@splunk/themes");
/* harmony import */ var _splunk_themes__WEBPACK_IMPORTED_MODULE_18___default = /*#__PURE__*/__webpack_require__.n(_splunk_themes__WEBPACK_IMPORTED_MODULE_18__);
/* harmony import */ var _splunk_search_job__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! @splunk/search-job */ "@splunk/search-job");
/* harmony import */ var _splunk_search_job__WEBPACK_IMPORTED_MODULE_19___default = /*#__PURE__*/__webpack_require__.n(_splunk_search_job__WEBPACK_IMPORTED_MODULE_19__);
function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }




















 //Initialize Variables as empty

var selectedInterval = [];
var disabledIntervals = [];
var timelineInterval = [];
var geoRegistry = _splunk_dashboard_context_GeoRegistry__WEBPACK_IMPORTED_MODULE_2___default.a.create();
geoRegistry.addDefaultProvider(new _splunk_dashboard_context_GeoJsonProvider__WEBPACK_IMPORTED_MODULE_1___default.a()); //Get the Time Ranges from the URL Params

var search = window.location.search;
var params = new URLSearchParams(search);
var rangeStart = Math.round(Date.now().valueOf() / 1000);
var rangeEnd = Math.round(Date.now().valueOf() / 1000);
var error_no_timetype_select = false;

function setRelative(startdelta) {
  rangeStart = Math.round((Date.now() - startdelta).valueOf() / 1000);
  rangeEnd = Math.round(Date.now().valueOf() / 1000);
}

var tz = params.get('tz');

if (params.get('timerangetype') === 'explicit') {
  rangeStart = Math.round(Date.parse(params.get('rangeStart')).valueOf() / 1000);
  rangeEnd = Math.round(Date.parse(params.get('rangeEnd')).valueOf() / 1000);
} else if (params.get('timerangetype') === 'relative') {
  var rel = params.get('relativetime');

  if (rel == '30min') {
    setRelative(1000 * 60 * 30);
  }

  if (rel == '1h') {
    setRelative(1000 * 60 * 60);
  }

  if (rel == '6h') {
    setRelative(1000 * 60 * 60 * 6);
  }

  if (rel == '12h') {
    setRelative(1000 * 60 * 60 * 12);
  }

  if (rel == '1d') {
    setRelative(1000 * 60 * 60 * 24);
  }

  if (rel == '7d') {
    setRelative(1000 * 60 * 60 * 24 * 7);
  }

  if (rel == '14d') {
    setRelative(1000 * 60 * 60 * 24 * 14);
  }

  if (rel == '30d') {
    setRelative(1000 * 60 * 60 * 24 * 30);
  }

  if (rel == '180d') {
    setRelative(1000 * 60 * 60 * 24 * 180);
  }

  if (rel == '365d') {
    setRelative(1000 * 60 * 60 * 24 * 365);
  }
} else {
  setRelative(1000 * 60 * 60 * 24);
  error_no_timetype_select = true;
}

var timeinterval = params.get('timeinterval');
var error_invalid_interval = false;
var step = 1000 * 60 * 60 * 24;

if (timeinterval == '1sec') {
  step = 1000;
} else if (timeinterval == '1min') {
  step = 1000 * 60;
} else if (timeinterval == '15min') {
  step = 1000 * 15 * 60;
} else if (timeinterval == '30min') {
  step = 1000 * 30 * 60;
} else if (timeinterval == 'days') {
  step = 1000 * 60 * 60 * 24;
} else if (timeinterval == 'hours') {
  step = 1000 * 60 * 60;
} else if (timeinterval == 'years') {
  step = 1000 * 60 * 60 * 24 * 365;
} else {
  error_invalid_interval = true;
}

timelineInterval = [rangeStart * 1000, rangeEnd * 1000];
selectedInterval = timelineInterval;
var seenImages = {};

function parseDataUri(dataUri) {
  if (!dataUri.startsWith('data:')) {
    throw new Error('Invalid data URI');
  }

  var semiIdx = dataUri.indexOf(';');

  if (semiIdx < 0) {
    throw new Error('Invalid data URI');
  }

  var mime = dataUri.slice(5, semiIdx);

  if (!dataUri.slice(semiIdx + 1, 7) === 'base64,') {
    throw new Error('Unsupported data URI encoding');
  }

  var data = Buffer.from(dataUri.slice(semiIdx + 8), 'base64');
  return [mime, data];
}

function getImage(_x, _x2) {
  return _getImage.apply(this, arguments);
}

function _getImage() {
  _getImage = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(assetType, id) {
    var body;
    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.next = 2;
            return fetch("/splunkd/__raw/servicesNS/nobody/splunk-dashboard-studio/storage/collections/data/splunk-dashboard-".concat(assetType, "/").concat(encodeURIComponent(id)), {
              credentials: 'include'
            }).then(function (res) {
              return res.json();
            }).then(function (data) {
              var body = data;
              return body;
            });

          case 2:
            body = _context3.sent;
            return _context3.abrupt("return", body);

          case 4:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3);
  }));
  return _getImage.apply(this, arguments);
}

function downloadImage(_x3, _x4) {
  return _downloadImage.apply(this, arguments);
} //SplunkTimeRangeSlider Class


function _downloadImage() {
  _downloadImage = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(src, assetType) {
    var _src$split, _src$split2, type, id, res, data, mimeType, imgData, _parseDataUri, _parseDataUri2, _mimeType, _data;

    return regeneratorRuntime.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            if (src) {
              _context4.next = 2;
              break;
            }

            return _context4.abrupt("return", src);

          case 2:
            if (!(src in seenImages)) {
              _context4.next = 4;
              break;
            }

            return _context4.abrupt("return", seenImages[src]);

          case 4:
            if (!src.startsWith('data:image')) {
              _context4.next = 6;
              break;
            }

            return _context4.abrupt("return", src);

          case 6:
            if (!src.startsWith('<svg ')) {
              _context4.next = 8;
              break;
            }

            return _context4.abrupt("return", src);

          case 8:
            _src$split = src.split('://'), _src$split2 = _slicedToArray(_src$split, 2), type = _src$split2[0], id = _src$split2[1];

            if (!(type === 'https' || type === 'http')) {
              _context4.next = 14;
              break;
            }

            res = fetch(src);
            data = res.buffer();
            mimeType = res.headers.get('Content-Type');
            return _context4.abrupt("return", src);

          case 14:
            if (!(type === 'splunk-enterprise-kvstore')) {
              _context4.next = 28;
              break;
            }

            imgData = {
              dataURI: 'null'
            };
            _context4.prev = 16;
            _context4.next = 19;
            return getImage(assetType, id).then(function (blob) {
              return blob;
            });

          case 19:
            imgData = _context4.sent;
            _context4.next = 26;
            break;

          case 22:
            _context4.prev = 22;
            _context4.t0 = _context4["catch"](16);
            console.log(_context4.t0);
            console.log('Cannot find image');

          case 26:
            if (imgData.dataURI == 'null') {
              imgData.dataURI == src;
            } else {
              _parseDataUri = parseDataUri(imgData.dataURI), _parseDataUri2 = _slicedToArray(_parseDataUri, 2), _mimeType = _parseDataUri2[0], _data = _parseDataUri2[1];
            }

            return _context4.abrupt("return", imgData.dataURI);

          case 28:
            throw new Error("Unexpected image type: ".concat(type));

          case 29:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4, null, [[16, 22]]);
  }));
  return _downloadImage.apply(this, arguments);
}

var SplunkTimeRangeSliderInput = /*#__PURE__*/function (_React$Component) {
  _inherits(SplunkTimeRangeSliderInput, _React$Component);

  var _super = _createSuper(SplunkTimeRangeSliderInput);

  function SplunkTimeRangeSliderInput(props) {
    var _this$state;

    var _this;

    _classCallCheck(this, SplunkTimeRangeSliderInput);

    _this = _super.call(this, props);

    _defineProperty(_assertThisInitialized(_this), "fetchDefinition", /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
      var search, params, dashboardid, def, _i, _Object$values, viz, src, definition, results, input, datasource, earliest, latest, query, defUpdate;

      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              search = window.location.search;
              params = new URLSearchParams(search);
              dashboardid = params.get('dashboardid');
              _context.next = 5;
              return fetch("/splunkd/servicesNS/-/-/data/ui/views/".concat(dashboardid, "?output_mode=json"), {
                credentials: 'include'
              }).then(function (res) {
                return res.json();
              }).then(function (data) {
                var xml = new DOMParser().parseFromString(data.entry[0].content['eai:data'], 'application/xml');
                var def = JSON.parse(xml.getElementsByTagName('definition')[0].textContent);
                return def;
              })["catch"](function (e) {
                //If there is an error, and demo==true, apply the demo dashboard.
                _this.setState({
                  error_no_dash: true
                });

                console.error('Error during definition retrieval/parsing', e);
              });

            case 5:
              def = _context.sent;
              _i = 0, _Object$values = Object.values(def.visualizations || {});

            case 7:
              if (!(_i < _Object$values.length)) {
                _context.next = 40;
                break;
              }

              viz = _Object$values[_i];
              src = '';
              _context.prev = 10;

              if (!(viz.type === 'viz.singlevalueicon')) {
                _context.next = 15;
                break;
              }

              _context.next = 14;
              return downloadImage(viz.options.icon, 'icons');

            case 14:
              viz.options.icon = _context.sent;

            case 15:
              if (!(viz.type === 'splunk.singlevalueicon')) {
                _context.next = 19;
                break;
              }

              _context.next = 18;
              return downloadImage(viz.options.icon, 'icons');

            case 18:
              viz.options.icon = _context.sent;

            case 19:
              if (!(viz.type === 'viz.img')) {
                _context.next = 23;
                break;
              }

              _context.next = 22;
              return downloadImage(viz.options.src, 'images');

            case 22:
              viz.options.src = _context.sent;

            case 23:
              if (!(viz.type === 'splunk.choropleth.svg')) {
                _context.next = 27;
                break;
              }

              _context.next = 26;
              return downloadImage(viz.options.svg, 'images');

            case 26:
              viz.options.svg = _context.sent;

            case 27:
              if (!(viz.type === 'viz.choropleth.svg')) {
                _context.next = 31;
                break;
              }

              _context.next = 30;
              return downloadImage(viz.options.svg, 'images');

            case 30:
              viz.options.svg = _context.sent;

            case 31:
              _context.next = 37;
              break;

            case 33:
              _context.prev = 33;
              _context.t0 = _context["catch"](10);
              console.log('Failed to load image with src: ' + src);
              console.log(_context.t0);

            case 37:
              _i++;
              _context.next = 7;
              break;

            case 40:
              if (!def.layout.options.backgroundImage) {
                _context.next = 50;
                break;
              }

              _context.prev = 41;
              _context.next = 44;
              return downloadImage(def.layout.options.backgroundImage.src, 'images');

            case 44:
              def.layout.options.backgroundImage.src = _context.sent;
              _context.next = 50;
              break;

            case 47:
              _context.prev = 47;
              _context.t1 = _context["catch"](41);
              console.log(_context.t1);

            case 50:
              _this.setState({
                def: def
              });

              definition = _this.state.def;
              results = '';

              for (input in definition.inputs) {
                _this.setState({
                  warn_inputs_exist: [].concat(_toConsumableArray(_this.state.warn_inputs_exist), [input])
                });
              } //Start to Loop through Searches


              for (datasource in definition.dataSources) {
                //Handle a ds.search
                if (definition.dataSources[datasource].type == 'ds.search') {
                  _this.setState({
                    numberOfSearches: _this.state.numberOfSearches + 1
                  });
                }
              } //Start to Loop through Searches


              _context.t2 = regeneratorRuntime.keys(definition.dataSources);

            case 56:
              if ((_context.t3 = _context.t2()).done) {
                _context.next = 77;
                break;
              }

              datasource = _context.t3.value;

              _this.setState({
                currentds: datasource
              }); //Handle a ds.search


              if (!(definition.dataSources[_this.state.currentds].type == 'ds.search')) {
                _context.next = 75;
                break;
              }

              _this.setState({
                numberOfSearchesComplete: _this.state.numberOfSearchesComplete + 1
              });

              definition.dataSources[_this.state.currentds].type = 'ds.test';
              earliest = '';
              latest = '';
              query = '';
              results = '';
              query = definition.dataSources[_this.state.currentds].options.query; //If there are query parameters in the dataSource

              if (definition.dataSources[_this.state.currentds].options.queryParameters) {
                if (definition.dataSources[_this.state.currentds].options.queryParameters.earliest) {
                  earliest = definition.dataSources[_this.state.currentds].options.queryParameters.earliest;
                }

                if (definition.dataSources[_this.state.currentds].options.queryParameters.latest) {
                  latest = definition.dataSources[_this.state.currentds].options.queryParameters.latest;
                }
              } //If there are NO query parameters in the dataSource
              else {
                //Check the defaults of the definition
                //else just return -24h as the default
                earliest = '-24h@h';
                latest = 'now';
              }

              _context.next = 70;
              return _splunk_search_job__WEBPACK_IMPORTED_MODULE_19___default.a.create({
                search: query,
                earliest_time: earliest,
                latest_time: latest
              }).getResults({
                output_mode: 'json_cols',
                count: 0
              }).first().toPromise();

            case 70:
              results = _context.sent;
              defUpdate = _this.state.def;
              defUpdate.dataSources[_this.state.currentds].options = {
                data: {
                  fields: results.fields,
                  columns: results.columns
                }
              };

              if (results.fields.indexOf('_time') < 0) {
                console.log('Missing _time field');

                _this.setState({
                  error_ds_no__time: [].concat(_toConsumableArray(_this.state.error_ds_no__time), [_this.state.currentds])
                });
              }

              _this.setState({
                def: defUpdate
              });

            case 75:
              _context.next = 56;
              break;

            case 77:
              _this.setState({
                defOrig: _this.state.def
              });

              _this.setState({
                hasNotBeenFetched: false
              });

            case 79:
            case "end":
              return _context.stop();
          }
        }
      }, _callee, null, [[10, 33], [41, 47]]);
    })));

    _defineProperty(_assertThisInitialized(_this), "errorHandler", function (_ref2) {
      var error = _ref2.error;
      return _this.setState({
        error: error
      });
    });

    _defineProperty(_assertThisInitialized(_this), "onChangeCallback", /*#__PURE__*/function () {
      var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(selectedInterval) {
        var definition_new, v, indexes, time, currTime, n;
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                //Update the selectedInterval variable with the new start and end times
                selectedInterval.map(function (d, i) {
                  if (i == 0) {
                    _this.start_range = d;
                  }

                  if (i == 1) {
                    _this.end_range = d;
                  }
                }); //For each dataSource in the dashboard, append a where clause to limit the start/end time

                definition_new = JSON.parse(JSON.stringify(_this.state.defOrig));

                for (v in definition_new.dataSources) {
                  indexes = [];

                  if (definition_new.dataSources[v].options.data.fields.indexOf('_time') >= 0) {
                    //Iterate through the time column, whereever it exists
                    for (time in definition_new.dataSources[v].options.data.columns[definition_new.dataSources[v].options.data.fields.indexOf('_time')]) {
                      currTime = new Date(definition_new.dataSources[v].options.data.columns[definition_new.dataSources[v].options.data.fields.indexOf('_time')][time]); //If the currentTime is less than selected

                      if (currTime > _this.start_range && currTime < _this.end_range) {
                        for (n in definition_new.dataSources[v].options.data.columns) {
                          if (n != 'extend') {
                            indexes.push(time);
                          }
                        }
                      }
                    }

                    for (n in definition_new.dataSources[v].options.data.columns) {
                      try {
                        definition_new.dataSources[v].options.data.columns[n] = definition_new.dataSources[v].options.data.columns[n].slice(indexes[0], indexes[indexes.length - 1]);
                      } catch (error) {//console.log('ERROR');
                        // expected output: ReferenceError: nonExistentFunction is not defined
                        // Note - error messages will vary depending on browser
                      }
                    }
                  }
                } //Set the state variable of selectedInterval with the new values


                _this.setState({
                  selectedInterval: selectedInterval
                });

                _this.setState({
                  def: definition_new
                }); //definition = definition_new


                _this.state.hasNotBeenFetched = false;

              case 6:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2);
      }));

      return function (_x5) {
        return _ref3.apply(this, arguments);
      };
    }());

    var darktheme = false;

    if (params.get('theme') == 'dark') {
      darktheme = true;
    }

    _this.state = (_this$state = {
      error: false,
      selectedInterval: selectedInterval,
      def: _this.props.dash.props.definition,
      hasNotBeenFetched: true,
      startTime: rangeStart,
      endTime: rangeEnd
    }, _defineProperty(_this$state, "def", {}), _defineProperty(_this$state, "time", rangeStart * 1000), _defineProperty(_this$state, "def", _this.props.dash.props.definition), _defineProperty(_this$state, "playbackMultiplier", '4'), _defineProperty(_this$state, "value", 1), _defineProperty(_this$state, "hasNotBeenFetched", true), _defineProperty(_this$state, "dataSources", {}), _defineProperty(_this$state, "width", 0), _defineProperty(_this$state, "height", 0), _defineProperty(_this$state, "dark", darktheme), _defineProperty(_this$state, "leftOpen", false), _defineProperty(_this$state, "error_ds_no__time", []), _defineProperty(_this$state, "error_no_dash", false), _defineProperty(_this$state, "error_invalid_interval", error_invalid_interval), _defineProperty(_this$state, "error_no_timetype_select", error_no_timetype_select), _defineProperty(_this$state, "warn_inputs_exist", []), _defineProperty(_this$state, "openPanelId", 2), _defineProperty(_this$state, "openInputsPanelId", 2), _defineProperty(_this$state, "numberOfSearches", 0), _defineProperty(_this$state, "numberOfSearchesComplete", 0), _defineProperty(_this$state, "dashboardID", params.get('dashboardid')), _this$state);

    _this.fetchDefinition();

    _this.updateWindowDimensions = _this.updateWindowDimensions.bind(_assertThisInitialized(_this));
    _this.updateDataSources = _this.updateDataSources.bind(_assertThisInitialized(_this));
    _this.handleDarkModeClick = _this.handleDarkModeClick.bind(_assertThisInitialized(_this));
    _this.openLeftPanel = _this.openLeftPanel.bind(_assertThisInitialized(_this));
    _this.handleRequestOpen = _this.handleRequestOpen.bind(_assertThisInitialized(_this));
    _this.handlePanelChange = _this.handlePanelChange.bind(_assertThisInitialized(_this));
    _this.handleInputsPanelChange = _this.handleInputsPanelChange.bind(_assertThisInitialized(_this));
    _this.handleRequestClose = _this.handleRequestClose.bind(_assertThisInitialized(_this));
    return _this;
  }

  _createClass(SplunkTimeRangeSliderInput, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      this.updateWindowDimensions();
      window.addEventListener('resize', this.updateWindowDimensions);
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      window.removeEventListener('resize', this.updateWindowDimensions);
    }
  }, {
    key: "updateWindowDimensions",
    value: function updateWindowDimensions() {
      this.setState({
        width: window.innerWidth,
        height: window.innerHeight
      });
    }
  }, {
    key: "updateDataSources",
    value: function updateDataSources() {
      hackDisableProgressiveRender();
      var definition_new = JSON.parse(JSON.stringify(this.state.defOrig));
      var selectedTime = new Date(this.state.time);

      for (var v in definition_new.dataSources) {
        if (definition_new.dataSources[v].options.data.fields.indexOf('_time') >= 0) {
          //Iterate through the time column, whereever it exists
          for (var time in definition_new.dataSources[v].options.data.columns[definition_new.dataSources[v].options.data.fields.indexOf('_time')]) {
            var currTime = new Date(definition_new.dataSources[v].options.data.columns[definition_new.dataSources[v].options.data.fields.indexOf('_time')][time]); //If the currentTime is less than selected

            if (currTime > selectedTime) {
              for (var n in definition_new.dataSources[v].options.data.columns) {
                if (n != 'extend') {
                  try {
                    definition_new.dataSources[v].options.data.columns[n] = definition_new.dataSources[v].options.data.columns[n].slice(0, time);
                  } catch (error) {//console.log('ERROR');
                    // expected output: ReferenceError: nonExistentFunction is not defined
                    // Note - error messages will vary depending on browser
                  }
                }
              }

              break;
            }
          }
        }
      }

      this.setState({
        def: definition_new
      });
    }
  }, {
    key: "handleDarkModeClick",
    value: function handleDarkModeClick(event) {
      this.setState({
        dark: !this.state.dark
      });
    }
  }, {
    key: "handleRequestOpen",
    value: function handleRequestOpen(dockPosition) {
      if (dockPosition === 'bottomOpen') {
        setBottomOpen(true);
      } else if (dockPosition === 'leftOpen') {
        this.setState({
          leftOpen: true
        });
      } else if (dockPosition === 'rightOpen') {
        setRightOpen(true);
      } else if (dockPosition === 'topOpen') {
        setTopOpen(true);
      }
    }
  }, {
    key: "openLeftPanel",
    value: function openLeftPanel() {
      this.handleRequestOpen('leftOpen');
    }
  }, {
    key: "handleRequestClose",
    value: function handleRequestClose() {
      this.setState({
        leftOpen: false
      });
    }
  }, {
    key: "handlePanelChange",
    value: function handlePanelChange(e, _ref4) {
      var panelValue = _ref4.panelId;
      this.setState({
        openPanelId: panelValue
      });
    }
  }, {
    key: "handleInputsPanelChange",
    value: function handleInputsPanelChange(e, _ref5) {
      var panelValue = _ref5.panelId;
      this.setState({
        openInputsPanelId: panelValue
      });
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;

      var colStyle = {
        border: "0px solid black",
        padding: 10,
        paddingRight: 20,
        whiteSpace: 'nowrap',
        textAlign: 'center'
      };
      var textStyle = {
        textAlign: 'center'
      };
      var dash = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_16___default.a.createElement(_splunk_dashboard_context__WEBPACK_IMPORTED_MODULE_0__["DashboardContextProvider"], {
        geoRegistry: geoRegistry
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_16___default.a.createElement(_splunk_dashboard_core__WEBPACK_IMPORTED_MODULE_3___default.a, {
        width: "100%",
        height: "calc(100vh - 78px)",
        definition: this.state.def,
        preset: _splunk_dashboard_presets_EnterprisePreset__WEBPACK_IMPORTED_MODULE_4___default.a,
        initialMode: "view"
      }));
      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_16___default.a.createElement("div", {
        style: this.state.dark ? {
          textAlign: 'center',
          margin: 'auto',
          align: 'center',
          width: '100%',
          backgroundColor: '#171D21'
        } : {
          textAlign: 'center',
          margin: 'auto',
          align: 'center',
          width: '100%',
          backgroundColor: '#FFFFFF'
        }
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_16___default.a.createElement(_splunk_themes__WEBPACK_IMPORTED_MODULE_18__["SplunkThemeProvider"], {
        family: "enterprise",
        colorScheme: this.state.dark ? 'dark' : 'light',
        density: "compact"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_16___default.a.createElement("table", {
        style: {
          textAlign: 'center',
          margin: 'auto',
          align: 'center',
          width: this.state.width
        }
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_16___default.a.createElement("tbody", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_16___default.a.createElement("tr", {
        style: {
          paddingBottom: '10px'
        }
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_16___default.a.createElement("td", {
        style: _objectSpread(_objectSpread({}, colStyle), {}, {
          width: '25%',
          padding: '30px',
          paddingTop: '0px',
          paddingBottom: '10px'
        })
      }, this.state.hasNotBeenFetched == true ? /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_16___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_16___default.a.Fragment, null) : /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_16___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_16___default.a.Fragment, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_16___default.a.createElement(_splunk_react_ui_Heading__WEBPACK_IMPORTED_MODULE_8___default.a, {
        style: textStyle,
        level: 2
      }, ' ', "Selected Interval:", ' '), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_16___default.a.createElement(_splunk_react_ui_Paragraph__WEBPACK_IMPORTED_MODULE_7___default.a, {
        style: textStyle
      }, new Date(this.state.selectedInterval[0]).toLocaleString('en-US', {
        timeZone: tz
      }), ' ', "through", ' ', new Date(this.state.selectedInterval[1]).toLocaleString('en-US', {
        timeZone: tz
      }), ' ')), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_16___default.a.createElement(_splunk_react_ui_SidePanel__WEBPACK_IMPORTED_MODULE_12___default.a, {
        open: this.state.leftOpen,
        dockPosition: "left",
        onRequestClose: this.handleRequestClose,
        innerStyle: {
          width: 300
        }
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_16___default.a.createElement("div", {
        style: {
          padding: '10px'
        }
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_16___default.a.createElement(_splunk_react_ui_Heading__WEBPACK_IMPORTED_MODULE_8___default.a, {
        level: 2
      }, "Configuration:"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_16___default.a.createElement(_splunk_react_ui_Heading__WEBPACK_IMPORTED_MODULE_8___default.a, {
        level: 3
      }, "Theme:"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_16___default.a.createElement(_splunk_react_ui_Switch__WEBPACK_IMPORTED_MODULE_6___default.a, {
        value: "darkMode",
        onClick: this.handleDarkModeClick,
        selected: this.state.dark,
        appearance: 'toggle'
      }, "Dark Mode"), ' ', /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_16___default.a.createElement(_splunk_react_ui_Heading__WEBPACK_IMPORTED_MODULE_8___default.a, {
        level: 3
      }, "Dashboard Information"), this.state.error_ds_no__time.length > 0 ? /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_16___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_16___default.a.Fragment, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_16___default.a.createElement(_splunk_react_ui_Accordion__WEBPACK_IMPORTED_MODULE_10___default.a, {
        openPanelId: this.state.openPanelId,
        onChange: this.handlePanelChange
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_16___default.a.createElement(_splunk_react_ui_Accordion__WEBPACK_IMPORTED_MODULE_10___default.a.Panel, {
        panelId: 1,
        title: /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_16___default.a.createElement(_splunk_react_ui_Message__WEBPACK_IMPORTED_MODULE_9___default.a, {
          type: "error"
        }, String(this.state.error_ds_no__time.length) + ' Searches missing a _time field')
      }, this.state.error_ds_no__time.map(function (k, v) {
        return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_16___default.a.createElement(_splunk_react_ui_Paragraph__WEBPACK_IMPORTED_MODULE_7___default.a, null, _this2.state.error_ds_no__time[v]);
      })))) : /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_16___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_16___default.a.Fragment, null), this.state.warn_inputs_exist.length > 0 ? /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_16___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_16___default.a.Fragment, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_16___default.a.createElement(_splunk_react_ui_Accordion__WEBPACK_IMPORTED_MODULE_10___default.a, {
        openPanelId: this.state.openInputsPanelId,
        onChange: this.handleInputsPanelChange
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_16___default.a.createElement(_splunk_react_ui_Accordion__WEBPACK_IMPORTED_MODULE_10___default.a.Panel, {
        panelId: 1,
        title: /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_16___default.a.createElement(_splunk_react_ui_Message__WEBPACK_IMPORTED_MODULE_9___default.a, {
          type: "warning"
        }, String(this.state.warn_inputs_exist.length) + ' Inputs Exist Which May Not Work with Timelapse')
      }, this.state.warn_inputs_exist.map(function (k, v) {
        return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_16___default.a.createElement(_splunk_react_ui_Paragraph__WEBPACK_IMPORTED_MODULE_7___default.a, null, _this2.state.warn_inputs_exist[v]);
      })))) : /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_16___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_16___default.a.Fragment, null), this.state.error_invalid_interval ? /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_16___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_16___default.a.Fragment, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_16___default.a.createElement(_splunk_react_ui_Message__WEBPACK_IMPORTED_MODULE_9___default.a, {
        type: "error"
      }, "Unsupported Time Interval Specified:", ' ', timeinterval)) : /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_16___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_16___default.a.Fragment, null), this.state.error_no_timetype_select ? /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_16___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_16___default.a.Fragment, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_16___default.a.createElement(_splunk_react_ui_Message__WEBPACK_IMPORTED_MODULE_9___default.a, {
        type: "error"
      }, "Missing time type selector. Please go back to the", ' ', /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_16___default.a.createElement(_splunk_react_ui_Link__WEBPACK_IMPORTED_MODULE_13___default.a, {
        to: "/app/splunk-timelapse-visualizations/start"
      }, "start"), ' ', "and select a time type.")) : /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_16___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_16___default.a.Fragment, null))), (this.state.error_ds_no__time.length > 0 || this.state.error_no_dash || this.state.error_invalid_interval || this.state.error_no_timetype_select || this.state.warn_inputs_exist.length > 0) && this.state.hasNotBeenFetched == false ? /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_16___default.a.createElement(_splunk_react_ui_Button__WEBPACK_IMPORTED_MODULE_5___default.a, {
        key: "notifications",
        onClick: this.openLeftPanel,
        label: /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_16___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_16___default.a.Fragment, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_16___default.a.createElement(_splunk_react_icons_Bell__WEBPACK_IMPORTED_MODULE_14___default.a, {
          size: 1.5
        }), " \xA0\xA0", String(this.state.error_ds_no__time.length + this.state.error_no_dash + this.state.error_invalid_interval + this.state.error_no_timetype_select + this.state.warn_inputs_exist.length)),
        appearance: "pill"
      }) : /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_16___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_16___default.a.Fragment, null), this.state.hasNotBeenFetched == true ? /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_16___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_16___default.a.Fragment, null) : /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_16___default.a.createElement(_splunk_react_ui_Button__WEBPACK_IMPORTED_MODULE_5___default.a, {
        key: "configure",
        onClick: this.openLeftPanel,
        label: "Configure"
      })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_16___default.a.createElement("td", {
        style: _objectSpread(_objectSpread({}, colStyle), {}, {
          width: '100%',
          paddingRight: '0px',
          paddingTop: '0px',
          paddingBottom: '0px'
        })
      }, this.state.hasNotBeenFetched == true ? /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_16___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_16___default.a.Fragment, null) : /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_16___default.a.createElement(react_timeline_range_slider__WEBPACK_IMPORTED_MODULE_17___default.a, {
        error: this.state.error,
        step: step,
        selectedInterval: selectedInterval,
        timelineInterval: timelineInterval,
        onUpdateCallback: this.errorHandler,
        onChangeCallback: this.onChangeCallback,
        disabledIntervals: disabledIntervals,
        formatTick: function formatTick(ms) {
          return Object(date_fns__WEBPACK_IMPORTED_MODULE_15__["format"])(new Date(ms), ' ');
        }
      }))), this.state.hasNotBeenFetched && this.state.error_no_dash != true ? /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_16___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_16___default.a.Fragment, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_16___default.a.createElement("tr", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_16___default.a.createElement("td", {
        colSpan: "2",
        style: _objectSpread(_objectSpread({}, colStyle), {}, {
          width: '100%',
          paddingTop: '0px',
          paddingBottom: '0px',
          height: '100px',
          textAlign: 'center',
          verticalAlign: 'text-bottom'
        })
      }, ' ', /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_16___default.a.createElement(_splunk_react_ui_Heading__WEBPACK_IMPORTED_MODULE_8___default.a, {
        level: 1,
        style: {
          width: '100%',
          textAlign: 'center',
          margin: 'auto'
        }
      }, "Creating Rangeslider Datasource", ' ', this.state.numberOfSearchesComplete, "/", this.state.numberOfSearches), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_16___default.a.createElement("br", null))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_16___default.a.createElement("tr", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_16___default.a.createElement("td", {
        colSpan: "2",
        style: _objectSpread(_objectSpread({}, colStyle), {}, {
          width: '100%',
          paddingTop: '0px',
          paddingBottom: '0px',
          height: '200px',
          textAlign: 'center'
        })
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_16___default.a.createElement("div", {
        style: {
          width: '100%',
          textAlign: 'center',
          transform: 'scale(5)'
        }
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_16___default.a.createElement(_splunk_react_ui_WaitSpinner__WEBPACK_IMPORTED_MODULE_11___default.a, {
        style: {},
        size: "large"
      }))))) : /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_16___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_16___default.a.Fragment, null), this.state.hasNotBeenFetched == true ? /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_16___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_16___default.a.Fragment, null) : /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_16___default.a.createElement("tr", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_16___default.a.createElement("td", {
        colSpan: "2",
        style: _objectSpread(_objectSpread({}, colStyle), {}, {
          width: '100%',
          paddingTop: '0px',
          paddingBottom: '0px'
        })
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_16___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_16___default.a.Fragment, null, dash))), this.state.error_no_dash == true ? /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_16___default.a.createElement("tr", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_16___default.a.createElement("td", {
        colSpan: "2",
        style: _objectSpread(_objectSpread({}, colStyle), {}, {
          width: '100%',
          paddingTop: '0px',
          paddingBottom: '0px'
        })
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_16___default.a.createElement("div", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_16___default.a.createElement(_splunk_react_ui_Message__WEBPACK_IMPORTED_MODULE_9___default.a, {
        appearance: "fill",
        type: "error"
      }, "Cannot load dashboard with ID:", ' ', this.state.dashboardID, ".")))) : /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_16___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_16___default.a.Fragment, null)))));
    }
  }]);

  return SplunkTimeRangeSliderInput;
}(react__WEBPACK_IMPORTED_MODULE_16___default.a.Component);

/* harmony default export */ __webpack_exports__["default"] = (SplunkTimeRangeSliderInput);
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../node_modules/buffer/index.js */ "../../node_modules/buffer/index.js").Buffer))

/***/ }),

/***/ "@splunk/dashboard-context":
/*!********************************************!*\
  !*** external "@splunk/dashboard-context" ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("@splunk/dashboard-context");

/***/ }),

/***/ "@splunk/dashboard-context/GeoJsonProvider":
/*!************************************************************!*\
  !*** external "@splunk/dashboard-context/GeoJsonProvider" ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("@splunk/dashboard-context/GeoJsonProvider");

/***/ }),

/***/ "@splunk/dashboard-context/GeoRegistry":
/*!********************************************************!*\
  !*** external "@splunk/dashboard-context/GeoRegistry" ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("@splunk/dashboard-context/GeoRegistry");

/***/ }),

/***/ "@splunk/dashboard-core":
/*!*****************************************!*\
  !*** external "@splunk/dashboard-core" ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("@splunk/dashboard-core");

/***/ }),

/***/ "@splunk/dashboard-presets/EnterprisePreset":
/*!*************************************************************!*\
  !*** external "@splunk/dashboard-presets/EnterprisePreset" ***!
  \*************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("@splunk/dashboard-presets/EnterprisePreset");

/***/ }),

/***/ "@splunk/react-icons/Bell":
/*!*******************************************!*\
  !*** external "@splunk/react-icons/Bell" ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("@splunk/react-icons/Bell");

/***/ }),

/***/ "@splunk/react-ui/Accordion":
/*!*********************************************!*\
  !*** external "@splunk/react-ui/Accordion" ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("@splunk/react-ui/Accordion");

/***/ }),

/***/ "@splunk/react-ui/Button":
/*!******************************************!*\
  !*** external "@splunk/react-ui/Button" ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("@splunk/react-ui/Button");

/***/ }),

/***/ "@splunk/react-ui/Heading":
/*!*******************************************!*\
  !*** external "@splunk/react-ui/Heading" ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("@splunk/react-ui/Heading");

/***/ }),

/***/ "@splunk/react-ui/Link":
/*!****************************************!*\
  !*** external "@splunk/react-ui/Link" ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("@splunk/react-ui/Link");

/***/ }),

/***/ "@splunk/react-ui/Message":
/*!*******************************************!*\
  !*** external "@splunk/react-ui/Message" ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("@splunk/react-ui/Message");

/***/ }),

/***/ "@splunk/react-ui/Paragraph":
/*!*********************************************!*\
  !*** external "@splunk/react-ui/Paragraph" ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("@splunk/react-ui/Paragraph");

/***/ }),

/***/ "@splunk/react-ui/SidePanel":
/*!*********************************************!*\
  !*** external "@splunk/react-ui/SidePanel" ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("@splunk/react-ui/SidePanel");

/***/ }),

/***/ "@splunk/react-ui/Switch":
/*!******************************************!*\
  !*** external "@splunk/react-ui/Switch" ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("@splunk/react-ui/Switch");

/***/ }),

/***/ "@splunk/react-ui/WaitSpinner":
/*!***********************************************!*\
  !*** external "@splunk/react-ui/WaitSpinner" ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("@splunk/react-ui/WaitSpinner");

/***/ }),

/***/ "@splunk/search-job":
/*!*************************************!*\
  !*** external "@splunk/search-job" ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("@splunk/search-job");

/***/ }),

/***/ "@splunk/themes":
/*!*********************************!*\
  !*** external "@splunk/themes" ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("@splunk/themes");

/***/ }),

/***/ "base64-js":
/*!****************************!*\
  !*** external "base64-js" ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("base64-js");

/***/ }),

/***/ "date-fns":
/*!***************************!*\
  !*** external "date-fns" ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("date-fns");

/***/ }),

/***/ "ieee754":
/*!**************************!*\
  !*** external "ieee754" ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("ieee754");

/***/ }),

/***/ "isarray":
/*!**************************!*\
  !*** external "isarray" ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("isarray");

/***/ }),

/***/ "react":
/*!************************!*\
  !*** external "react" ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("react");

/***/ }),

/***/ "react-timeline-range-slider":
/*!**********************************************!*\
  !*** external "react-timeline-range-slider" ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("react-timeline-range-slider");

/***/ })

/******/ });