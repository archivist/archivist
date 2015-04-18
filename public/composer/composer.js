(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
"use strict";
  
var app = require("archivist-composer/src/app");

$(function() {

  // Create a new Lens app instance
  // --------
  //
  // Injects itself into body

  // var app = new window.SubstanceComposer({});
  // window.app = app;
  // var app = window.app;

  // launch it
  app.start();
});


},{"archivist-composer/src/app":191}],2:[function(require,module,exports){
var sampleDoc = {
  "id": "9cc2e4def8b39bc234bf5e186bafa743",
  "schema": [
    "substance-interview",
    "0.1.0"
  ],
  "nodes": {
    "document": {
      "id": "document",
      "type": "document",
      "containers": [
        "content"
      ],
      "guid": "9cc2e4def8b39bc234bf5e186bafa743",
      "creator": "",
      "title": "Test document",
      "abstract": "Test",
      "created_at": "2015-03-04T10:56:18.229Z",
      "updated_at": "2015-03-04T10:56:47.425Z",
      "interview_subject_name": "Please enter interview subject name.",
      "interview_subject_bio": "Please enter interview subject bio.",
      "published_on": "2015-03-04T10:56:18.230Z"
    },
    "content": {
      "type": "container",
      "id": "content",
      "nodes": [
        "text_1",
        "text_2",
        "text_3",
        "text_4",
        "text_5"
      ]
    },
    "text_1": {
      "type": "text",
      "id": "text_1",
      "content": 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus quis scelerisque ligula. Proin tristique ligula id magna finibus rhoncus. Quisque dictum viverra sapien, vel elementum metus condimentum nec. Donec ac tellus nunc. Nullam fermentum pharetra justo, accumsan tristique quam tempus a. Quisque vitae luctus velit. Praesent lacinia enim ex, sed pulvinar neque dictum ultricies. Sed est metus, bibendum sed suscipit ut, cursus ut mi. Pellentesque sagittis mi nisi, eu blandit metus congue id. Pellentesque eget magna porta, rutrum odio et, commodo lacus. Sed vitae vehicula ante. Quisque suscipit iaculis est, vitae aliquet lacus dictum ut. Nulla enim dolor, pulvinar at odio vitae, sollicitudin eleifend ex. Maecenas eget ligula eget sem efficitur consectetur nec vel sem. In massa mauris, consequat vitae enim eget, vehicula aliquet turpis.'
    },

    "text_2": {
      "type": "text",
      "id": "text_2",
      "content": 'Proin in luctus sapien, ultrices commodo augue. Phasellus ultrices commodo augue, in blandit nibh euismod nibh vitae erat luctus ac. Aliquam euismod nibh vitae erat pulvinar, at semper libero tincidunt. Nulla finibus est ac consequat consequat. Sed at condimentum purus. Aliquam vulputate ipsum ut justo posuere, quis varius risus finibus. Ut scelerisque laoreet vehicula. Nullam gravida fringilla justo, nec efficitur nunc sagittis et. Suspendisse nibh ligula, imperdiet id interdum et, sollicitudin non mauris. Suspendisse potenti. Suspendisse luctus iaculis nulla sed efficitur. Nullam sed viverra metus. Etiam dictum blandit enim tincidunt maximus. Nullam tempus nibh at varius interdum.'
    },

    "entity_reference_1": {
      "id": "entity_reference_1",
      "type": "entity_reference",
      "path": [
        "text_2",
        "content"
      ],
      "target": "54ef1331afda2d3c024e4817", // this is an external object
      "range": [
        24,
        47
      ]
    },

    "subject_reference_1": {
      "id": "subject_reference_1",
      "type": "subject_reference",
      "container": "content",
      "startPath": ["text_2", "content"],
      "startOffset": 100,
      "endPath": ["text_4", "content"],
      "endOffset": 40,
      "target": ["54bae4cda868bc6fab4bcd0e", "54bae99ca868bc3ec7fb5ad8"]
    },


    "subject_reference_2": {
      "id": "subject_reference_2",
      "type": "subject_reference",
      "container": "content",
      "startPath": ["text_1", "content"],
      "startOffset": 100,
      "endPath": ["text_2", "content"],
      "endOffset": 40,
      "target": ["54bae99ca868bc3ec7fb5ad8"]
    },

    "text_3": {
      "type": "text",
      "id": "text_3",
      "content": 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus quis scelerisque ligula. Proin tristique ligula id magna finibus rhoncus. Quisque dictum viverra sapien, vel elementum metus condimentum nec. Donec ac tellus nunc. Nullam fermentum pharetra justo, accumsan tristique quam tempus a. Quisque vitae luctus velit. Praesent lacinia enim ex, sed pulvinar neque dictum ultricies. Sed est metus, bibendum sed suscipit ut, cursus ut mi. Pellentesque sagittis mi nisi, eu blandit metus congue id. Pellentesque eget magna porta, rutrum odio et, commodo lacus. Sed vitae vehicula ante. Quisque suscipit iaculis est, vitae aliquet lacus dictum ut. Nulla enim dolor, pulvinar at odio vitae, sollicitudin eleifend ex. Maecenas eget ligula eget sem efficitur consectetur nec vel sem. In massa mauris, consequat vitae enim eget, vehicula aliquet turpis.'
    },

    "text_4": {
      "type": "text",
      "id": "text_4",
      "content": 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus quis scelerisque ligula. Proin tristique ligula id magna finibus rhoncus. Quisque dictum viverra sapien, vel elementum metus condimentum nec. Donec ac tellus nunc. Nullam fermentum pharetra justo, accumsan tristique quam tempus a. Quisque vitae luctus velit. Praesent lacinia enim ex, sed pulvinar neque dictum ultricies. Sed est metus, bibendum sed suscipit ut, cursus ut mi. Pellentesque sagittis mi nisi, eu blandit metus congue id. Pellentesque eget magna porta, rutrum odio et, commodo lacus. Sed vitae vehicula ante. Quisque suscipit iaculis est, vitae aliquet lacus dictum ut. Nulla enim dolor, pulvinar at odio vitae, sollicitudin eleifend ex. Maecenas eget ligula eget sem efficitur consectetur nec vel sem. In massa mauris, consequat vitae enim eget, vehicula aliquet turpis.'
    },

    "text_5": {
      "type": "text",
      "id": "text_5",
      "content": 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus quis scelerisque ligula. Proin tristique ligula id magna finibus rhoncus. Quisque dictum viverra sapien, vel elementum metus condimentum nec. Donec ac tellus nunc. Nullam fermentum pharetra justo, accumsan tristique quam tempus a. Quisque vitae luctus velit. Praesent lacinia enim ex, sed pulvinar neque dictum ultricies. Sed est metus, bibendum sed suscipit ut, cursus ut mi. Pellentesque sagittis mi nisi, eu blandit metus congue id. Pellentesque eget magna porta, rutrum odio et, commodo lacus. Sed vitae vehicula ante. Quisque suscipit iaculis est, vitae aliquet lacus dictum ut. Nulla enim dolor, pulvinar at odio vitae, sollicitudin eleifend ex. Maecenas eget ligula eget sem efficitur consectetur nec vel sem. In massa mauris, consequat vitae enim eget, vehicula aliquet turpis.'
    }

  }
};

module.exports = sampleDoc;
},{}],3:[function(require,module,exports){
module.exports = require('./src/article');

},{"./src/article":110}],4:[function(require,module,exports){
module.exports = require('./src/basics/helpers');

},{"./src/basics/helpers":121}],5:[function(require,module,exports){

var Substance = require('./src/basics');

Substance.Data = require('./src/data');
Substance.Document = require('./src/document');
Substance.Operator = require('./src/operator');
Substance.Surface = require('./src/surface');

module.exports = Substance;

},{"./src/basics":122,"./src/data":129,"./src/document":150,"./src/operator":160,"./src/surface":170}],6:[function(require,module,exports){
/**
 * Creates an array with all falsey values removed. The values `false`, `null`,
 * `0`, `""`, `undefined`, and `NaN` are falsey.
 *
 * @static
 * @memberOf _
 * @category Array
 * @param {Array} array The array to compact.
 * @returns {Array} Returns the new array of filtered values.
 * @example
 *
 * _.compact([0, 1, false, 2, '', 3]);
 * // => [1, 2, 3]
 */
function compact(array) {
  var index = -1,
      length = array ? array.length : 0,
      resIndex = -1,
      result = [];

  while (++index < length) {
    var value = array[index];
    if (value) {
      result[++resIndex] = value;
    }
  }
  return result;
}

module.exports = compact;

},{}],7:[function(require,module,exports){
/**
 * Gets the first element of `array`.
 *
 * @static
 * @memberOf _
 * @alias head
 * @category Array
 * @param {Array} array The array to query.
 * @returns {*} Returns the first element of `array`.
 * @example
 *
 * _.first([1, 2, 3]);
 * // => 1
 *
 * _.first([]);
 * // => undefined
 */
function first(array) {
  return array ? array[0] : undefined;
}

module.exports = first;

},{}],8:[function(require,module,exports){
var baseIndexOf = require('../internal/baseIndexOf'),
    cacheIndexOf = require('../internal/cacheIndexOf'),
    createCache = require('../internal/createCache'),
    isArguments = require('../lang/isArguments'),
    isArray = require('../lang/isArray');

/**
 * Creates an array of unique values in all provided arrays using `SameValueZero`
 * for equality comparisons.
 *
 * **Note:** `SameValueZero` comparisons are like strict equality comparisons,
 * e.g. `===`, except that `NaN` matches `NaN`. See the
 * [ES spec](https://people.mozilla.org/~jorendorff/es6-draft.html#sec-samevaluezero)
 * for more details.
 *
 * @static
 * @memberOf _
 * @category Array
 * @param {...Array} [arrays] The arrays to inspect.
 * @returns {Array} Returns the new array of shared values.
 * @example
 * _.intersection([1, 2], [4, 2], [2, 1]);
 * // => [2]
 */
function intersection() {
  var args = [],
      argsIndex = -1,
      argsLength = arguments.length,
      caches = [],
      indexOf = baseIndexOf,
      isCommon = true;

  while (++argsIndex < argsLength) {
    var value = arguments[argsIndex];
    if (isArray(value) || isArguments(value)) {
      args.push(value);
      caches.push((isCommon && value.length >= 120) ? createCache(argsIndex && value) : null);
    }
  }
  argsLength = args.length;
  var array = args[0],
      index = -1,
      length = array ? array.length : 0,
      result = [],
      seen = caches[0];

  outer:
  while (++index < length) {
    value = array[index];
    if ((seen ? cacheIndexOf(seen, value) : indexOf(result, value)) < 0) {
      argsIndex = argsLength;
      while (--argsIndex) {
        var cache = caches[argsIndex];
        if ((cache ? cacheIndexOf(cache, value) : indexOf(args[argsIndex], value)) < 0) {
          continue outer;
        }
      }
      if (seen) {
        seen.push(value);
      }
      result.push(value);
    }
  }
  return result;
}

module.exports = intersection;

},{"../internal/baseIndexOf":38,"../internal/cacheIndexOf":54,"../internal/createCache":61,"../lang/isArguments":89,"../lang/isArray":90}],9:[function(require,module,exports){
/**
 * Gets the last element of `array`.
 *
 * @static
 * @memberOf _
 * @category Array
 * @param {Array} array The array to query.
 * @returns {*} Returns the last element of `array`.
 * @example
 *
 * _.last([1, 2, 3]);
 * // => 3
 */
function last(array) {
  var length = array ? array.length : 0;
  return length ? array[length - 1] : undefined;
}

module.exports = last;

},{}],10:[function(require,module,exports){
var baseFlatten = require('../internal/baseFlatten'),
    baseUniq = require('../internal/baseUniq');

/**
 * Creates an array of unique values, in order, of the provided arrays using
 * `SameValueZero` for equality comparisons.
 *
 * **Note:** `SameValueZero` comparisons are like strict equality comparisons,
 * e.g. `===`, except that `NaN` matches `NaN`. See the
 * [ES spec](https://people.mozilla.org/~jorendorff/es6-draft.html#sec-samevaluezero)
 * for more details.
 *
 * @static
 * @memberOf _
 * @category Array
 * @param {...Array} [arrays] The arrays to inspect.
 * @returns {Array} Returns the new array of combined values.
 * @example
 *
 * _.union([1, 2], [4, 2], [2, 1]);
 * // => [1, 2, 4]
 */
function union() {
  return baseUniq(baseFlatten(arguments, false, true));
}

module.exports = union;

},{"../internal/baseFlatten":35,"../internal/baseUniq":50}],11:[function(require,module,exports){
var baseCallback = require('../internal/baseCallback'),
    baseUniq = require('../internal/baseUniq'),
    isIterateeCall = require('../internal/isIterateeCall'),
    sortedUniq = require('../internal/sortedUniq');

/**
 * Creates a duplicate-value-free version of an array using `SameValueZero`
 * for equality comparisons. Providing `true` for `isSorted` performs a faster
 * search algorithm for sorted arrays. If an iteratee function is provided it
 * is invoked for each value in the array to generate the criterion by which
 * uniqueness is computed. The `iteratee` is bound to `thisArg` and invoked
 * with three arguments; (value, index, array).
 *
 * If a property name is provided for `predicate` the created `_.property`
 * style callback returns the property value of the given element.
 *
 * If a value is also provided for `thisArg` the created `_.matchesProperty`
 * style callback returns `true` for elements that have a matching property
 * value, else `false`.
 *
 * If an object is provided for `predicate` the created `_.matches` style
 * callback returns `true` for elements that have the properties of the given
 * object, else `false`.
 *
 * **Note:** `SameValueZero` comparisons are like strict equality comparisons,
 * e.g. `===`, except that `NaN` matches `NaN`. See the
 * [ES spec](https://people.mozilla.org/~jorendorff/es6-draft.html#sec-samevaluezero)
 * for more details.
 *
 * @static
 * @memberOf _
 * @alias unique
 * @category Array
 * @param {Array} array The array to inspect.
 * @param {boolean} [isSorted] Specify the array is sorted.
 * @param {Function|Object|string} [iteratee] The function invoked per iteration.
 * @param {*} [thisArg] The `this` binding of `iteratee`.
 * @returns {Array} Returns the new duplicate-value-free array.
 * @example
 *
 * _.uniq([1, 2, 1]);
 * // => [1, 2]
 *
 * // using `isSorted`
 * _.uniq([1, 1, 2], true);
 * // => [1, 2]
 *
 * // using an iteratee function
 * _.uniq([1, 2.5, 1.5, 2], function(n) {
 *   return this.floor(n);
 * }, Math);
 * // => [1, 2.5]
 *
 * // using the `_.property` callback shorthand
 * _.uniq([{ 'x': 1 }, { 'x': 2 }, { 'x': 1 }], 'x');
 * // => [{ 'x': 1 }, { 'x': 2 }]
 */
function uniq(array, isSorted, iteratee, thisArg) {
  var length = array ? array.length : 0;
  if (!length) {
    return [];
  }
  if (isSorted != null && typeof isSorted != 'boolean') {
    thisArg = iteratee;
    iteratee = isIterateeCall(array, isSorted, thisArg) ? null : isSorted;
    isSorted = false;
  }
  iteratee = iteratee == null ? iteratee : baseCallback(iteratee, thisArg, 3);
  return (isSorted)
    ? sortedUniq(array, iteratee)
    : baseUniq(array, iteratee);
}

module.exports = uniq;

},{"../internal/baseCallback":28,"../internal/baseUniq":50,"../internal/isIterateeCall":76,"../internal/sortedUniq":86}],12:[function(require,module,exports){
var arrayFilter = require('../internal/arrayFilter'),
    baseCallback = require('../internal/baseCallback'),
    baseFilter = require('../internal/baseFilter'),
    isArray = require('../lang/isArray');

/**
 * Iterates over elements of `collection`, returning an array of all elements
 * `predicate` returns truthy for. The predicate is bound to `thisArg` and
 * invoked with three arguments; (value, index|key, collection).
 *
 * If a property name is provided for `predicate` the created `_.property`
 * style callback returns the property value of the given element.
 *
 * If a value is also provided for `thisArg` the created `_.matchesProperty`
 * style callback returns `true` for elements that have a matching property
 * value, else `false`.
 *
 * If an object is provided for `predicate` the created `_.matches` style
 * callback returns `true` for elements that have the properties of the given
 * object, else `false`.
 *
 * @static
 * @memberOf _
 * @alias select
 * @category Collection
 * @param {Array|Object|string} collection The collection to iterate over.
 * @param {Function|Object|string} [predicate=_.identity] The function invoked
 *  per iteration.
 * @param {*} [thisArg] The `this` binding of `predicate`.
 * @returns {Array} Returns the new filtered array.
 * @example
 *
 * _.filter([4, 5, 6], function(n) {
 *   return n % 2 == 0;
 * });
 * // => [4, 6]
 *
 * var users = [
 *   { 'user': 'barney', 'age': 36, 'active': true },
 *   { 'user': 'fred',   'age': 40, 'active': false }
 * ];
 *
 * // using the `_.matches` callback shorthand
 * _.pluck(_.filter(users, { 'age': 36, 'active': true }), 'user');
 * // => ['barney']
 *
 * // using the `_.matchesProperty` callback shorthand
 * _.pluck(_.filter(users, 'active', false), 'user');
 * // => ['fred']
 *
 * // using the `_.property` callback shorthand
 * _.pluck(_.filter(users, 'active'), 'user');
 * // => ['barney']
 */
function filter(collection, predicate, thisArg) {
  var func = isArray(collection) ? arrayFilter : baseFilter;
  predicate = baseCallback(predicate, thisArg, 3);
  return func(collection, predicate);
}

module.exports = filter;

},{"../internal/arrayFilter":25,"../internal/baseCallback":28,"../internal/baseFilter":34,"../lang/isArray":90}],13:[function(require,module,exports){
var arrayEach = require('../internal/arrayEach'),
    baseEach = require('../internal/baseEach'),
    bindCallback = require('../internal/bindCallback'),
    isArray = require('../lang/isArray');

/**
 * Iterates over elements of `collection` invoking `iteratee` for each element.
 * The `iteratee` is bound to `thisArg` and invoked with three arguments;
 * (value, index|key, collection). Iterator functions may exit iteration early
 * by explicitly returning `false`.
 *
 * **Note:** As with other "Collections" methods, objects with a `length` property
 * are iterated like arrays. To avoid this behavior `_.forIn` or `_.forOwn`
 * may be used for object iteration.
 *
 * @static
 * @memberOf _
 * @alias each
 * @category Collection
 * @param {Array|Object|string} collection The collection to iterate over.
 * @param {Function} [iteratee=_.identity] The function invoked per iteration.
 * @param {*} [thisArg] The `this` binding of `iteratee`.
 * @returns {Array|Object|string} Returns `collection`.
 * @example
 *
 * _([1, 2]).forEach(function(n) {
 *   console.log(n);
 * }).value();
 * // => logs each value from left to right and returns the array
 *
 * _.forEach({ 'a': 1, 'b': 2 }, function(n, key) {
 *   console.log(n, key);
 * });
 * // => logs each value-key pair and returns the object (iteration order is not guaranteed)
 */
function forEach(collection, iteratee, thisArg) {
  return (typeof iteratee == 'function' && typeof thisArg == 'undefined' && isArray(collection))
    ? arrayEach(collection, iteratee)
    : baseEach(collection, bindCallback(iteratee, thisArg, 3));
}

module.exports = forEach;

},{"../internal/arrayEach":24,"../internal/baseEach":33,"../internal/bindCallback":52,"../lang/isArray":90}],14:[function(require,module,exports){
var baseIndexOf = require('../internal/baseIndexOf'),
    isArray = require('../lang/isArray'),
    isLength = require('../internal/isLength'),
    isString = require('../lang/isString'),
    values = require('../object/values');

/* Native method references for those with the same name as other `lodash` methods. */
var nativeMax = Math.max;

/**
 * Checks if `value` is in `collection` using `SameValueZero` for equality
 * comparisons. If `fromIndex` is negative, it is used as the offset from
 * the end of `collection`.
 *
 * **Note:** `SameValueZero` comparisons are like strict equality comparisons,
 * e.g. `===`, except that `NaN` matches `NaN`. See the
 * [ES spec](https://people.mozilla.org/~jorendorff/es6-draft.html#sec-samevaluezero)
 * for more details.
 *
 * @static
 * @memberOf _
 * @alias contains, include
 * @category Collection
 * @param {Array|Object|string} collection The collection to search.
 * @param {*} target The value to search for.
 * @param {number} [fromIndex=0] The index to search from.
 * @returns {boolean} Returns `true` if a matching element is found, else `false`.
 * @example
 *
 * _.includes([1, 2, 3], 1);
 * // => true
 *
 * _.includes([1, 2, 3], 1, 2);
 * // => false
 *
 * _.includes({ 'user': 'fred', 'age': 40 }, 'fred');
 * // => true
 *
 * _.includes('pebbles', 'eb');
 * // => true
 */
function includes(collection, target, fromIndex) {
  var length = collection ? collection.length : 0;
  if (!isLength(length)) {
    collection = values(collection);
    length = collection.length;
  }
  if (!length) {
    return false;
  }
  if (typeof fromIndex == 'number') {
    fromIndex = fromIndex < 0 ? nativeMax(length + fromIndex, 0) : (fromIndex || 0);
  } else {
    fromIndex = 0;
  }
  return (typeof collection == 'string' || !isArray(collection) && isString(collection))
    ? (fromIndex < length && collection.indexOf(target, fromIndex) > -1)
    : (baseIndexOf(collection, target, fromIndex) > -1);
}

module.exports = includes;

},{"../internal/baseIndexOf":38,"../internal/isLength":77,"../lang/isArray":90,"../lang/isString":97,"../object/values":103}],15:[function(require,module,exports){
var createAggregator = require('../internal/createAggregator');

/**
 * Creates an object composed of keys generated from the results of running
 * each element of `collection` through `iteratee`. The corresponding value
 * of each key is the last element responsible for generating the key. The
 * iteratee function is bound to `thisArg` and invoked with three arguments;
 * (value, index|key, collection).
 *
 * If a property name is provided for `predicate` the created `_.property`
 * style callback returns the property value of the given element.
 *
 * If a value is also provided for `thisArg` the created `_.matchesProperty`
 * style callback returns `true` for elements that have a matching property
 * value, else `false`.
 *
 * If an object is provided for `predicate` the created `_.matches` style
 * callback returns `true` for elements that have the properties of the given
 * object, else `false`.
 *
 * @static
 * @memberOf _
 * @category Collection
 * @param {Array|Object|string} collection The collection to iterate over.
 * @param {Function|Object|string} [iteratee=_.identity] The function invoked
 *  per iteration.
 * @param {*} [thisArg] The `this` binding of `iteratee`.
 * @returns {Object} Returns the composed aggregate object.
 * @example
 *
 * var keyData = [
 *   { 'dir': 'left', 'code': 97 },
 *   { 'dir': 'right', 'code': 100 }
 * ];
 *
 * _.indexBy(keyData, 'dir');
 * // => { 'left': { 'dir': 'left', 'code': 97 }, 'right': { 'dir': 'right', 'code': 100 } }
 *
 * _.indexBy(keyData, function(object) {
 *   return String.fromCharCode(object.code);
 * });
 * // => { 'a': { 'dir': 'left', 'code': 97 }, 'd': { 'dir': 'right', 'code': 100 } }
 *
 * _.indexBy(keyData, function(object) {
 *   return this.fromCharCode(object.code);
 * }, String);
 * // => { 'a': { 'dir': 'left', 'code': 97 }, 'd': { 'dir': 'right', 'code': 100 } }
 */
var indexBy = createAggregator(function(result, value, key) {
  result[key] = value;
});

module.exports = indexBy;

},{"../internal/createAggregator":58}],16:[function(require,module,exports){
var arrayMap = require('../internal/arrayMap'),
    baseCallback = require('../internal/baseCallback'),
    baseMap = require('../internal/baseMap'),
    isArray = require('../lang/isArray');

/**
 * Creates an array of values by running each element in `collection` through
 * `iteratee`. The `iteratee` is bound to `thisArg` and invoked with three
 * arguments; (value, index|key, collection).
 *
 * If a property name is provided for `predicate` the created `_.property`
 * style callback returns the property value of the given element.
 *
 * If a value is also provided for `thisArg` the created `_.matchesProperty`
 * style callback returns `true` for elements that have a matching property
 * value, else `false`.
 *
 * If an object is provided for `predicate` the created `_.matches` style
 * callback returns `true` for elements that have the properties of the given
 * object, else `false`.
 *
 * Many lodash methods are guarded to work as interatees for methods like
 * `_.every`, `_.filter`, `_.map`, `_.mapValues`, `_.reject`, and `_.some`.
 *
 * The guarded methods are:
 * `ary`, `callback`, `chunk`, `clone`, `create`, `curry`, `curryRight`, `drop`,
 * `dropRight`, `fill`, `flatten`, `invert`, `max`, `min`, `parseInt`, `slice`,
 * `sortBy`, `take`, `takeRight`, `template`, `trim`, `trimLeft`, `trimRight`,
 * `trunc`, `random`, `range`, `sample`, `uniq`, and `words`
 *
 * @static
 * @memberOf _
 * @alias collect
 * @category Collection
 * @param {Array|Object|string} collection The collection to iterate over.
 * @param {Function|Object|string} [iteratee=_.identity] The function invoked
 *  per iteration.
 *  create a `_.property` or `_.matches` style callback respectively.
 * @param {*} [thisArg] The `this` binding of `iteratee`.
 * @returns {Array} Returns the new mapped array.
 * @example
 *
 * function timesThree(n) {
 *   return n * 3;
 * }
 *
 * _.map([1, 2], timesThree);
 * // => [3, 6]
 *
 * _.map({ 'a': 1, 'b': 2 }, timesThree);
 * // => [3, 6] (iteration order is not guaranteed)
 *
 * var users = [
 *   { 'user': 'barney' },
 *   { 'user': 'fred' }
 * ];
 *
 * // using the `_.property` callback shorthand
 * _.map(users, 'user');
 * // => ['barney', 'fred']
 */
function map(collection, iteratee, thisArg) {
  var func = isArray(collection) ? arrayMap : baseMap;
  iteratee = baseCallback(iteratee, thisArg, 3);
  return func(collection, iteratee);
}

module.exports = map;

},{"../internal/arrayMap":26,"../internal/baseCallback":28,"../internal/baseMap":43,"../lang/isArray":90}],17:[function(require,module,exports){
var baseProperty = require('../internal/baseProperty'),
    map = require('./map');

/**
 * Gets the value of `key` from all elements in `collection`.
 *
 * @static
 * @memberOf _
 * @category Collection
 * @param {Array|Object|string} collection The collection to iterate over.
 * @param {string} key The key of the property to pluck.
 * @returns {Array} Returns the property values.
 * @example
 *
 * var users = [
 *   { 'user': 'barney', 'age': 36 },
 *   { 'user': 'fred',   'age': 40 }
 * ];
 *
 * _.pluck(users, 'user');
 * // => ['barney', 'fred']
 *
 * var userIndex = _.indexBy(users, 'user');
 * _.pluck(userIndex, 'age');
 * // => [36, 40] (iteration order is not guaranteed)
 */
function pluck(collection, key) {
  return map(collection, baseProperty(key));
}

module.exports = pluck;

},{"../internal/baseProperty":46,"./map":16}],18:[function(require,module,exports){
var isNative = require('../lang/isNative');

/* Native method references for those with the same name as other `lodash` methods. */
var nativeNow = isNative(nativeNow = Date.now) && nativeNow;

/**
 * Gets the number of milliseconds that have elapsed since the Unix epoch
 * (1 January 1970 00:00:00 UTC).
 *
 * @static
 * @memberOf _
 * @category Date
 * @example
 *
 * _.defer(function(stamp) {
 *   console.log(_.now() - stamp);
 * }, _.now());
 * // => logs the number of milliseconds it took for the deferred function to be invoked
 */
var now = nativeNow || function() {
  return new Date().getTime();
};

module.exports = now;

},{"../lang/isNative":94}],19:[function(require,module,exports){
var baseSlice = require('../internal/baseSlice'),
    createWrapper = require('../internal/createWrapper'),
    replaceHolders = require('../internal/replaceHolders');

/** Used to compose bitmasks for wrapper metadata. */
var BIND_FLAG = 1,
    PARTIAL_FLAG = 32;

/**
 * Creates a function that invokes `func` with the `this` binding of `thisArg`
 * and prepends any additional `_.bind` arguments to those provided to the
 * bound function.
 *
 * The `_.bind.placeholder` value, which defaults to `_` in monolithic builds,
 * may be used as a placeholder for partially applied arguments.
 *
 * **Note:** Unlike native `Function#bind` this method does not set the `length`
 * property of bound functions.
 *
 * @static
 * @memberOf _
 * @category Function
 * @param {Function} func The function to bind.
 * @param {*} thisArg The `this` binding of `func`.
 * @param {...*} [args] The arguments to be partially applied.
 * @returns {Function} Returns the new bound function.
 * @example
 *
 * var greet = function(greeting, punctuation) {
 *   return greeting + ' ' + this.user + punctuation;
 * };
 *
 * var object = { 'user': 'fred' };
 *
 * var bound = _.bind(greet, object, 'hi');
 * bound('!');
 * // => 'hi fred!'
 *
 * // using placeholders
 * var bound = _.bind(greet, object, _, '!');
 * bound('hi');
 * // => 'hi fred!'
 */
function bind(func, thisArg) {
  var bitmask = BIND_FLAG;
  if (arguments.length > 2) {
    var partials = baseSlice(arguments, 2),
        holders = replaceHolders(partials, bind.placeholder);

    bitmask |= PARTIAL_FLAG;
  }
  return createWrapper(func, bitmask, thisArg, partials, holders);
}

// Assign default placeholders.
bind.placeholder = {};

module.exports = bind;

},{"../internal/baseSlice":48,"../internal/createWrapper":65,"../internal/replaceHolders":83}],20:[function(require,module,exports){
var isObject = require('../lang/isObject'),
    now = require('../date/now');

/** Used as the `TypeError` message for "Functions" methods. */
var FUNC_ERROR_TEXT = 'Expected a function';

/* Native method references for those with the same name as other `lodash` methods. */
var nativeMax = Math.max;

/**
 * Creates a function that delays invoking `func` until after `wait` milliseconds
 * have elapsed since the last time it was invoked. The created function comes
 * with a `cancel` method to cancel delayed invocations. Provide an options
 * object to indicate that `func` should be invoked on the leading and/or
 * trailing edge of the `wait` timeout. Subsequent calls to the debounced
 * function return the result of the last `func` invocation.
 *
 * **Note:** If `leading` and `trailing` options are `true`, `func` is invoked
 * on the trailing edge of the timeout only if the the debounced function is
 * invoked more than once during the `wait` timeout.
 *
 * See [David Corbacho's article](http://drupalmotion.com/article/debounce-and-throttle-visual-explanation)
 * for details over the differences between `_.debounce` and `_.throttle`.
 *
 * @static
 * @memberOf _
 * @category Function
 * @param {Function} func The function to debounce.
 * @param {number} [wait=0] The number of milliseconds to delay.
 * @param {Object} [options] The options object.
 * @param {boolean} [options.leading=false] Specify invoking on the leading
 *  edge of the timeout.
 * @param {number} [options.maxWait] The maximum time `func` is allowed to be
 *  delayed before it is invoked.
 * @param {boolean} [options.trailing=true] Specify invoking on the trailing
 *  edge of the timeout.
 * @returns {Function} Returns the new debounced function.
 * @example
 *
 * // avoid costly calculations while the window size is in flux
 * jQuery(window).on('resize', _.debounce(calculateLayout, 150));
 *
 * // invoke `sendMail` when the click event is fired, debouncing subsequent calls
 * jQuery('#postbox').on('click', _.debounce(sendMail, 300, {
 *   'leading': true,
 *   'trailing': false
 * }));
 *
 * // ensure `batchLog` is invoked once after 1 second of debounced calls
 * var source = new EventSource('/stream');
 * jQuery(source).on('message', _.debounce(batchLog, 250, {
 *   'maxWait': 1000
 * }));
 *
 * // cancel a debounced call
 * var todoChanges = _.debounce(batchLog, 1000);
 * Object.observe(models.todo, todoChanges);
 *
 * Object.observe(models, function(changes) {
 *   if (_.find(changes, { 'user': 'todo', 'type': 'delete'})) {
 *     todoChanges.cancel();
 *   }
 * }, ['delete']);
 *
 * // ...at some point `models.todo` is changed
 * models.todo.completed = true;
 *
 * // ...before 1 second has passed `models.todo` is deleted
 * // which cancels the debounced `todoChanges` call
 * delete models.todo;
 */
function debounce(func, wait, options) {
  var args,
      maxTimeoutId,
      result,
      stamp,
      thisArg,
      timeoutId,
      trailingCall,
      lastCalled = 0,
      maxWait = false,
      trailing = true;

  if (typeof func != 'function') {
    throw new TypeError(FUNC_ERROR_TEXT);
  }
  wait = wait < 0 ? 0 : (+wait || 0);
  if (options === true) {
    var leading = true;
    trailing = false;
  } else if (isObject(options)) {
    leading = options.leading;
    maxWait = 'maxWait' in options && nativeMax(+options.maxWait || 0, wait);
    trailing = 'trailing' in options ? options.trailing : trailing;
  }

  function cancel() {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
    if (maxTimeoutId) {
      clearTimeout(maxTimeoutId);
    }
    maxTimeoutId = timeoutId = trailingCall = undefined;
  }

  function delayed() {
    var remaining = wait - (now() - stamp);
    if (remaining <= 0 || remaining > wait) {
      if (maxTimeoutId) {
        clearTimeout(maxTimeoutId);
      }
      var isCalled = trailingCall;
      maxTimeoutId = timeoutId = trailingCall = undefined;
      if (isCalled) {
        lastCalled = now();
        result = func.apply(thisArg, args);
        if (!timeoutId && !maxTimeoutId) {
          args = thisArg = null;
        }
      }
    } else {
      timeoutId = setTimeout(delayed, remaining);
    }
  }

  function maxDelayed() {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
    maxTimeoutId = timeoutId = trailingCall = undefined;
    if (trailing || (maxWait !== wait)) {
      lastCalled = now();
      result = func.apply(thisArg, args);
      if (!timeoutId && !maxTimeoutId) {
        args = thisArg = null;
      }
    }
  }

  function debounced() {
    args = arguments;
    stamp = now();
    thisArg = this;
    trailingCall = trailing && (timeoutId || !leading);

    if (maxWait === false) {
      var leadingCall = leading && !timeoutId;
    } else {
      if (!maxTimeoutId && !leading) {
        lastCalled = stamp;
      }
      var remaining = maxWait - (stamp - lastCalled),
          isCalled = remaining <= 0 || remaining > maxWait;

      if (isCalled) {
        if (maxTimeoutId) {
          maxTimeoutId = clearTimeout(maxTimeoutId);
        }
        lastCalled = stamp;
        result = func.apply(thisArg, args);
      }
      else if (!maxTimeoutId) {
        maxTimeoutId = setTimeout(maxDelayed, remaining);
      }
    }
    if (isCalled && timeoutId) {
      timeoutId = clearTimeout(timeoutId);
    }
    else if (!timeoutId && wait !== maxWait) {
      timeoutId = setTimeout(delayed, wait);
    }
    if (leadingCall) {
      isCalled = true;
      result = func.apply(thisArg, args);
    }
    if (isCalled && !timeoutId && !maxTimeoutId) {
      args = thisArg = null;
    }
    return result;
  }
  debounced.cancel = cancel;
  return debounced;
}

module.exports = debounce;

},{"../date/now":18,"../lang/isObject":96}],21:[function(require,module,exports){
var baseDelay = require('../internal/baseDelay');

/**
 * Invokes `func` after `wait` milliseconds. Any additional arguments are
 * provided to `func` when it is invoked.
 *
 * @static
 * @memberOf _
 * @category Function
 * @param {Function} func The function to delay.
 * @param {number} wait The number of milliseconds to delay invocation.
 * @param {...*} [args] The arguments to invoke the function with.
 * @returns {number} Returns the timer id.
 * @example
 *
 * _.delay(function(text) {
 *   console.log(text);
 * }, 1000, 'later');
 * // => logs 'later' after one second
 */
function delay(func, wait) {
  return baseDelay(func, wait, arguments, 2);
}

module.exports = delay;

},{"../internal/baseDelay":32}],22:[function(require,module,exports){
(function (global){
var cachePush = require('./cachePush'),
    isNative = require('../lang/isNative');

/** Native method references. */
var Set = isNative(Set = global.Set) && Set;

/* Native method references for those with the same name as other `lodash` methods. */
var nativeCreate = isNative(nativeCreate = Object.create) && nativeCreate;

/**
 *
 * Creates a cache object to store unique values.
 *
 * @private
 * @param {Array} [values] The values to cache.
 */
function SetCache(values) {
  var length = values ? values.length : 0;

  this.data = { 'hash': nativeCreate(null), 'set': new Set };
  while (length--) {
    this.push(values[length]);
  }
}

// Add functions to the `Set` cache.
SetCache.prototype.push = cachePush;

module.exports = SetCache;

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"../lang/isNative":94,"./cachePush":55}],23:[function(require,module,exports){
/**
 * Copies the values of `source` to `array`.
 *
 * @private
 * @param {Array} source The array to copy values from.
 * @param {Array} [array=[]] The array to copy values to.
 * @returns {Array} Returns `array`.
 */
function arrayCopy(source, array) {
  var index = -1,
      length = source.length;

  array || (array = Array(length));
  while (++index < length) {
    array[index] = source[index];
  }
  return array;
}

module.exports = arrayCopy;

},{}],24:[function(require,module,exports){
/**
 * A specialized version of `_.forEach` for arrays without support for callback
 * shorthands or `this` binding.
 *
 * @private
 * @param {Array} array The array to iterate over.
 * @param {Function} iteratee The function invoked per iteration.
 * @returns {Array} Returns `array`.
 */
function arrayEach(array, iteratee) {
  var index = -1,
      length = array.length;

  while (++index < length) {
    if (iteratee(array[index], index, array) === false) {
      break;
    }
  }
  return array;
}

module.exports = arrayEach;

},{}],25:[function(require,module,exports){
/**
 * A specialized version of `_.filter` for arrays without support for callback
 * shorthands or `this` binding.
 *
 * @private
 * @param {Array} array The array to iterate over.
 * @param {Function} predicate The function invoked per iteration.
 * @returns {Array} Returns the new filtered array.
 */
function arrayFilter(array, predicate) {
  var index = -1,
      length = array.length,
      resIndex = -1,
      result = [];

  while (++index < length) {
    var value = array[index];
    if (predicate(value, index, array)) {
      result[++resIndex] = value;
    }
  }
  return result;
}

module.exports = arrayFilter;

},{}],26:[function(require,module,exports){
/**
 * A specialized version of `_.map` for arrays without support for callback
 * shorthands or `this` binding.
 *
 * @private
 * @param {Array} array The array to iterate over.
 * @param {Function} iteratee The function invoked per iteration.
 * @returns {Array} Returns the new mapped array.
 */
function arrayMap(array, iteratee) {
  var index = -1,
      length = array.length,
      result = Array(length);

  while (++index < length) {
    result[index] = iteratee(array[index], index, array);
  }
  return result;
}

module.exports = arrayMap;

},{}],27:[function(require,module,exports){
var baseCopy = require('./baseCopy'),
    keys = require('../object/keys');

/**
 * The base implementation of `_.assign` without support for argument juggling,
 * multiple sources, and `this` binding `customizer` functions.
 *
 * @private
 * @param {Object} object The destination object.
 * @param {Object} source The source object.
 * @param {Function} [customizer] The function to customize assigning values.
 * @returns {Object} Returns the destination object.
 */
function baseAssign(object, source, customizer) {
  var props = keys(source);
  if (!customizer) {
    return baseCopy(source, object, props);
  }
  var index = -1,
      length = props.length;

  while (++index < length) {
    var key = props[index],
        value = object[key],
        result = customizer(value, source[key], key, object, source);

    if ((result === result ? result !== value : value === value) ||
        (typeof value == 'undefined' && !(key in object))) {
      object[key] = result;
    }
  }
  return object;
}

module.exports = baseAssign;

},{"../object/keys":101,"./baseCopy":30}],28:[function(require,module,exports){
var baseMatches = require('./baseMatches'),
    baseMatchesProperty = require('./baseMatchesProperty'),
    baseProperty = require('./baseProperty'),
    bindCallback = require('./bindCallback'),
    identity = require('../utility/identity'),
    isBindable = require('./isBindable');

/**
 * The base implementation of `_.callback` which supports specifying the
 * number of arguments to provide to `func`.
 *
 * @private
 * @param {*} [func=_.identity] The value to convert to a callback.
 * @param {*} [thisArg] The `this` binding of `func`.
 * @param {number} [argCount] The number of arguments to provide to `func`.
 * @returns {Function} Returns the callback.
 */
function baseCallback(func, thisArg, argCount) {
  var type = typeof func;
  if (type == 'function') {
    return (typeof thisArg != 'undefined' && isBindable(func))
      ? bindCallback(func, thisArg, argCount)
      : func;
  }
  if (func == null) {
    return identity;
  }
  if (type == 'object') {
    return baseMatches(func);
  }
  return typeof thisArg == 'undefined'
    ? baseProperty(func + '')
    : baseMatchesProperty(func + '', thisArg);
}

module.exports = baseCallback;

},{"../utility/identity":107,"./baseMatches":44,"./baseMatchesProperty":45,"./baseProperty":46,"./bindCallback":52,"./isBindable":74}],29:[function(require,module,exports){
var arrayCopy = require('./arrayCopy'),
    arrayEach = require('./arrayEach'),
    baseCopy = require('./baseCopy'),
    baseForOwn = require('./baseForOwn'),
    initCloneArray = require('./initCloneArray'),
    initCloneByTag = require('./initCloneByTag'),
    initCloneObject = require('./initCloneObject'),
    isArray = require('../lang/isArray'),
    isObject = require('../lang/isObject'),
    keys = require('../object/keys');

/** `Object#toString` result references. */
var argsTag = '[object Arguments]',
    arrayTag = '[object Array]',
    boolTag = '[object Boolean]',
    dateTag = '[object Date]',
    errorTag = '[object Error]',
    funcTag = '[object Function]',
    mapTag = '[object Map]',
    numberTag = '[object Number]',
    objectTag = '[object Object]',
    regexpTag = '[object RegExp]',
    setTag = '[object Set]',
    stringTag = '[object String]',
    weakMapTag = '[object WeakMap]';

var arrayBufferTag = '[object ArrayBuffer]',
    float32Tag = '[object Float32Array]',
    float64Tag = '[object Float64Array]',
    int8Tag = '[object Int8Array]',
    int16Tag = '[object Int16Array]',
    int32Tag = '[object Int32Array]',
    uint8Tag = '[object Uint8Array]',
    uint8ClampedTag = '[object Uint8ClampedArray]',
    uint16Tag = '[object Uint16Array]',
    uint32Tag = '[object Uint32Array]';

/** Used to identify `toStringTag` values supported by `_.clone`. */
var cloneableTags = {};
cloneableTags[argsTag] = cloneableTags[arrayTag] =
cloneableTags[arrayBufferTag] = cloneableTags[boolTag] =
cloneableTags[dateTag] = cloneableTags[float32Tag] =
cloneableTags[float64Tag] = cloneableTags[int8Tag] =
cloneableTags[int16Tag] = cloneableTags[int32Tag] =
cloneableTags[numberTag] = cloneableTags[objectTag] =
cloneableTags[regexpTag] = cloneableTags[stringTag] =
cloneableTags[uint8Tag] = cloneableTags[uint8ClampedTag] =
cloneableTags[uint16Tag] = cloneableTags[uint32Tag] = true;
cloneableTags[errorTag] = cloneableTags[funcTag] =
cloneableTags[mapTag] = cloneableTags[setTag] =
cloneableTags[weakMapTag] = false;

/** Used for native method references. */
var objectProto = Object.prototype;

/**
 * Used to resolve the `toStringTag` of values.
 * See the [ES spec](https://people.mozilla.org/~jorendorff/es6-draft.html#sec-object.prototype.tostring)
 * for more details.
 */
var objToString = objectProto.toString;

/**
 * The base implementation of `_.clone` without support for argument juggling
 * and `this` binding `customizer` functions.
 *
 * @private
 * @param {*} value The value to clone.
 * @param {boolean} [isDeep] Specify a deep clone.
 * @param {Function} [customizer] The function to customize cloning values.
 * @param {string} [key] The key of `value`.
 * @param {Object} [object] The object `value` belongs to.
 * @param {Array} [stackA=[]] Tracks traversed source objects.
 * @param {Array} [stackB=[]] Associates clones with source counterparts.
 * @returns {*} Returns the cloned value.
 */
function baseClone(value, isDeep, customizer, key, object, stackA, stackB) {
  var result;
  if (customizer) {
    result = object ? customizer(value, key, object) : customizer(value);
  }
  if (typeof result != 'undefined') {
    return result;
  }
  if (!isObject(value)) {
    return value;
  }
  var isArr = isArray(value);
  if (isArr) {
    result = initCloneArray(value);
    if (!isDeep) {
      return arrayCopy(value, result);
    }
  } else {
    var tag = objToString.call(value),
        isFunc = tag == funcTag;

    if (tag == objectTag || tag == argsTag || (isFunc && !object)) {
      result = initCloneObject(isFunc ? {} : value);
      if (!isDeep) {
        return baseCopy(value, result, keys(value));
      }
    } else {
      return cloneableTags[tag]
        ? initCloneByTag(value, tag, isDeep)
        : (object ? value : {});
    }
  }
  // Check for circular references and return corresponding clone.
  stackA || (stackA = []);
  stackB || (stackB = []);

  var length = stackA.length;
  while (length--) {
    if (stackA[length] == value) {
      return stackB[length];
    }
  }
  // Add the source value to the stack of traversed objects and associate it with its clone.
  stackA.push(value);
  stackB.push(result);

  // Recursively populate clone (susceptible to call stack limits).
  (isArr ? arrayEach : baseForOwn)(value, function(subValue, key) {
    result[key] = baseClone(subValue, isDeep, customizer, key, value, stackA, stackB);
  });
  return result;
}

module.exports = baseClone;

},{"../lang/isArray":90,"../lang/isObject":96,"../object/keys":101,"./arrayCopy":23,"./arrayEach":24,"./baseCopy":30,"./baseForOwn":37,"./initCloneArray":71,"./initCloneByTag":72,"./initCloneObject":73}],30:[function(require,module,exports){
/**
 * Copies the properties of `source` to `object`.
 *
 * @private
 * @param {Object} source The object to copy properties from.
 * @param {Object} [object={}] The object to copy properties to.
 * @param {Array} props The property names to copy.
 * @returns {Object} Returns `object`.
 */
function baseCopy(source, object, props) {
  if (!props) {
    props = object;
    object = {};
  }
  var index = -1,
      length = props.length;

  while (++index < length) {
    var key = props[index];
    object[key] = source[key];
  }
  return object;
}

module.exports = baseCopy;

},{}],31:[function(require,module,exports){
(function (global){
var isObject = require('../lang/isObject');

/**
 * The base implementation of `_.create` without support for assigning
 * properties to the created object.
 *
 * @private
 * @param {Object} prototype The object to inherit from.
 * @returns {Object} Returns the new object.
 */
var baseCreate = (function() {
  function Object() {}
  return function(prototype) {
    if (isObject(prototype)) {
      Object.prototype = prototype;
      var result = new Object;
      Object.prototype = null;
    }
    return result || global.Object();
  };
}());

module.exports = baseCreate;

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"../lang/isObject":96}],32:[function(require,module,exports){
var baseSlice = require('./baseSlice');

/** Used as the `TypeError` message for "Functions" methods. */
var FUNC_ERROR_TEXT = 'Expected a function';

/**
 * The base implementation of `_.delay` and `_.defer` which accepts an index
 * of where to slice the arguments to provide to `func`.
 *
 * @private
 * @param {Function} func The function to delay.
 * @param {number} wait The number of milliseconds to delay invocation.
 * @param {Object} args The `arguments` object to slice and provide to `func`.
 * @returns {number} Returns the timer id.
 */
function baseDelay(func, wait, args, fromIndex) {
  if (typeof func != 'function') {
    throw new TypeError(FUNC_ERROR_TEXT);
  }
  return setTimeout(function() { func.apply(undefined, baseSlice(args, fromIndex)); }, wait);
}

module.exports = baseDelay;

},{"./baseSlice":48}],33:[function(require,module,exports){
var baseForOwn = require('./baseForOwn'),
    isLength = require('./isLength'),
    toObject = require('./toObject');

/**
 * The base implementation of `_.forEach` without support for callback
 * shorthands and `this` binding.
 *
 * @private
 * @param {Array|Object|string} collection The collection to iterate over.
 * @param {Function} iteratee The function invoked per iteration.
 * @returns {Array|Object|string} Returns `collection`.
 */
function baseEach(collection, iteratee) {
  var length = collection ? collection.length : 0;
  if (!isLength(length)) {
    return baseForOwn(collection, iteratee);
  }
  var index = -1,
      iterable = toObject(collection);

  while (++index < length) {
    if (iteratee(iterable[index], index, iterable) === false) {
      break;
    }
  }
  return collection;
}

module.exports = baseEach;

},{"./baseForOwn":37,"./isLength":77,"./toObject":87}],34:[function(require,module,exports){
var baseEach = require('./baseEach');

/**
 * The base implementation of `_.filter` without support for callback
 * shorthands or `this` binding.
 *
 * @private
 * @param {Array|Object|string} collection The collection to iterate over.
 * @param {Function} predicate The function invoked per iteration.
 * @returns {Array} Returns the new filtered array.
 */
function baseFilter(collection, predicate) {
  var result = [];
  baseEach(collection, function(value, index, collection) {
    if (predicate(value, index, collection)) {
      result.push(value);
    }
  });
  return result;
}

module.exports = baseFilter;

},{"./baseEach":33}],35:[function(require,module,exports){
var isArguments = require('../lang/isArguments'),
    isArray = require('../lang/isArray'),
    isLength = require('./isLength'),
    isObjectLike = require('./isObjectLike');

/**
 * The base implementation of `_.flatten` with added support for restricting
 * flattening and specifying the start index.
 *
 * @private
 * @param {Array} array The array to flatten.
 * @param {boolean} [isDeep] Specify a deep flatten.
 * @param {boolean} [isStrict] Restrict flattening to arrays and `arguments` objects.
 * @param {number} [fromIndex=0] The index to start from.
 * @returns {Array} Returns the new flattened array.
 */
function baseFlatten(array, isDeep, isStrict, fromIndex) {
  var index = (fromIndex || 0) - 1,
      length = array.length,
      resIndex = -1,
      result = [];

  while (++index < length) {
    var value = array[index];

    if (isObjectLike(value) && isLength(value.length) && (isArray(value) || isArguments(value))) {
      if (isDeep) {
        // Recursively flatten arrays (susceptible to call stack limits).
        value = baseFlatten(value, isDeep, isStrict);
      }
      var valIndex = -1,
          valLength = value.length;

      result.length += valLength;
      while (++valIndex < valLength) {
        result[++resIndex] = value[valIndex];
      }
    } else if (!isStrict) {
      result[++resIndex] = value;
    }
  }
  return result;
}

module.exports = baseFlatten;

},{"../lang/isArguments":89,"../lang/isArray":90,"./isLength":77,"./isObjectLike":78}],36:[function(require,module,exports){
var toObject = require('./toObject');

/**
 * The base implementation of `baseForIn` and `baseForOwn` which iterates
 * over `object` properties returned by `keysFunc` invoking `iteratee` for
 * each property. Iterator functions may exit iteration early by explicitly
 * returning `false`.
 *
 * @private
 * @param {Object} object The object to iterate over.
 * @param {Function} iteratee The function invoked per iteration.
 * @param {Function} keysFunc The function to get the keys of `object`.
 * @returns {Object} Returns `object`.
 */
function baseFor(object, iteratee, keysFunc) {
  var index = -1,
      iterable = toObject(object),
      props = keysFunc(object),
      length = props.length;

  while (++index < length) {
    var key = props[index];
    if (iteratee(iterable[key], key, iterable) === false) {
      break;
    }
  }
  return object;
}

module.exports = baseFor;

},{"./toObject":87}],37:[function(require,module,exports){
var baseFor = require('./baseFor'),
    keys = require('../object/keys');

/**
 * The base implementation of `_.forOwn` without support for callback
 * shorthands and `this` binding.
 *
 * @private
 * @param {Object} object The object to iterate over.
 * @param {Function} iteratee The function invoked per iteration.
 * @returns {Object} Returns `object`.
 */
function baseForOwn(object, iteratee) {
  return baseFor(object, iteratee, keys);
}

module.exports = baseForOwn;

},{"../object/keys":101,"./baseFor":36}],38:[function(require,module,exports){
var indexOfNaN = require('./indexOfNaN');

/**
 * The base implementation of `_.indexOf` without support for binary searches.
 *
 * @private
 * @param {Array} array The array to search.
 * @param {*} value The value to search for.
 * @param {number} [fromIndex=0] The index to search from.
 * @returns {number} Returns the index of the matched value, else `-1`.
 */
function baseIndexOf(array, value, fromIndex) {
  if (value !== value) {
    return indexOfNaN(array, fromIndex);
  }
  var index = (fromIndex || 0) - 1,
      length = array.length;

  while (++index < length) {
    if (array[index] === value) {
      return index;
    }
  }
  return -1;
}

module.exports = baseIndexOf;

},{"./indexOfNaN":70}],39:[function(require,module,exports){
var baseIsEqualDeep = require('./baseIsEqualDeep');

/**
 * The base implementation of `_.isEqual` without support for `this` binding
 * `customizer` functions.
 *
 * @private
 * @param {*} value The value to compare.
 * @param {*} other The other value to compare.
 * @param {Function} [customizer] The function to customize comparing values.
 * @param {boolean} [isWhere] Specify performing partial comparisons.
 * @param {Array} [stackA] Tracks traversed `value` objects.
 * @param {Array} [stackB] Tracks traversed `other` objects.
 * @returns {boolean} Returns `true` if the values are equivalent, else `false`.
 */
function baseIsEqual(value, other, customizer, isWhere, stackA, stackB) {
  // Exit early for identical values.
  if (value === other) {
    // Treat `+0` vs. `-0` as not equal.
    return value !== 0 || (1 / value == 1 / other);
  }
  var valType = typeof value,
      othType = typeof other;

  // Exit early for unlike primitive values.
  if ((valType != 'function' && valType != 'object' && othType != 'function' && othType != 'object') ||
      value == null || other == null) {
    // Return `false` unless both values are `NaN`.
    return value !== value && other !== other;
  }
  return baseIsEqualDeep(value, other, baseIsEqual, customizer, isWhere, stackA, stackB);
}

module.exports = baseIsEqual;

},{"./baseIsEqualDeep":40}],40:[function(require,module,exports){
var equalArrays = require('./equalArrays'),
    equalByTag = require('./equalByTag'),
    equalObjects = require('./equalObjects'),
    isArray = require('../lang/isArray'),
    isTypedArray = require('../lang/isTypedArray');

/** `Object#toString` result references. */
var argsTag = '[object Arguments]',
    arrayTag = '[object Array]',
    objectTag = '[object Object]';

/** Used for native method references. */
var objectProto = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/**
 * Used to resolve the `toStringTag` of values.
 * See the [ES spec](https://people.mozilla.org/~jorendorff/es6-draft.html#sec-object.prototype.tostring)
 * for more details.
 */
var objToString = objectProto.toString;

/**
 * A specialized version of `baseIsEqual` for arrays and objects which performs
 * deep comparisons and tracks traversed objects enabling objects with circular
 * references to be compared.
 *
 * @private
 * @param {Object} object The object to compare.
 * @param {Object} other The other object to compare.
 * @param {Function} equalFunc The function to determine equivalents of values.
 * @param {Function} [customizer] The function to customize comparing objects.
 * @param {boolean} [isWhere] Specify performing partial comparisons.
 * @param {Array} [stackA=[]] Tracks traversed `value` objects.
 * @param {Array} [stackB=[]] Tracks traversed `other` objects.
 * @returns {boolean} Returns `true` if the objects are equivalent, else `false`.
 */
function baseIsEqualDeep(object, other, equalFunc, customizer, isWhere, stackA, stackB) {
  var objIsArr = isArray(object),
      othIsArr = isArray(other),
      objTag = arrayTag,
      othTag = arrayTag;

  if (!objIsArr) {
    objTag = objToString.call(object);
    if (objTag == argsTag) {
      objTag = objectTag;
    } else if (objTag != objectTag) {
      objIsArr = isTypedArray(object);
    }
  }
  if (!othIsArr) {
    othTag = objToString.call(other);
    if (othTag == argsTag) {
      othTag = objectTag;
    } else if (othTag != objectTag) {
      othIsArr = isTypedArray(other);
    }
  }
  var objIsObj = objTag == objectTag,
      othIsObj = othTag == objectTag,
      isSameTag = objTag == othTag;

  if (isSameTag && !(objIsArr || objIsObj)) {
    return equalByTag(object, other, objTag);
  }
  var valWrapped = objIsObj && hasOwnProperty.call(object, '__wrapped__'),
      othWrapped = othIsObj && hasOwnProperty.call(other, '__wrapped__');

  if (valWrapped || othWrapped) {
    return equalFunc(valWrapped ? object.value() : object, othWrapped ? other.value() : other, customizer, isWhere, stackA, stackB);
  }
  if (!isSameTag) {
    return false;
  }
  // Assume cyclic values are equal.
  // For more information on detecting circular references see https://es5.github.io/#JO.
  stackA || (stackA = []);
  stackB || (stackB = []);

  var length = stackA.length;
  while (length--) {
    if (stackA[length] == object) {
      return stackB[length] == other;
    }
  }
  // Add `object` and `other` to the stack of traversed objects.
  stackA.push(object);
  stackB.push(other);

  var result = (objIsArr ? equalArrays : equalObjects)(object, other, equalFunc, customizer, isWhere, stackA, stackB);

  stackA.pop();
  stackB.pop();

  return result;
}

module.exports = baseIsEqualDeep;

},{"../lang/isArray":90,"../lang/isTypedArray":98,"./equalArrays":66,"./equalByTag":67,"./equalObjects":68}],41:[function(require,module,exports){
/**
 * The base implementation of `_.isFunction` without support for environments
 * with incorrect `typeof` results.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is correctly classified, else `false`.
 */
function baseIsFunction(value) {
  // Avoid a Chakra JIT bug in compatibility modes of IE 11.
  // See https://github.com/jashkenas/underscore/issues/1621 for more details.
  return typeof value == 'function' || false;
}

module.exports = baseIsFunction;

},{}],42:[function(require,module,exports){
var baseIsEqual = require('./baseIsEqual');

/** Used for native method references. */
var objectProto = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/**
 * The base implementation of `_.isMatch` without support for callback
 * shorthands or `this` binding.
 *
 * @private
 * @param {Object} object The object to inspect.
 * @param {Array} props The source property names to match.
 * @param {Array} values The source values to match.
 * @param {Array} strictCompareFlags Strict comparison flags for source values.
 * @param {Function} [customizer] The function to customize comparing objects.
 * @returns {boolean} Returns `true` if `object` is a match, else `false`.
 */
function baseIsMatch(object, props, values, strictCompareFlags, customizer) {
  var length = props.length;
  if (object == null) {
    return !length;
  }
  var index = -1,
      noCustomizer = !customizer;

  while (++index < length) {
    if ((noCustomizer && strictCompareFlags[index])
          ? values[index] !== object[props[index]]
          : !hasOwnProperty.call(object, props[index])
        ) {
      return false;
    }
  }
  index = -1;
  while (++index < length) {
    var key = props[index];
    if (noCustomizer && strictCompareFlags[index]) {
      var result = hasOwnProperty.call(object, key);
    } else {
      var objValue = object[key],
          srcValue = values[index];

      result = customizer ? customizer(objValue, srcValue, key) : undefined;
      if (typeof result == 'undefined') {
        result = baseIsEqual(srcValue, objValue, customizer, true);
      }
    }
    if (!result) {
      return false;
    }
  }
  return true;
}

module.exports = baseIsMatch;

},{"./baseIsEqual":39}],43:[function(require,module,exports){
var baseEach = require('./baseEach');

/**
 * The base implementation of `_.map` without support for callback shorthands
 * or `this` binding.
 *
 * @private
 * @param {Array|Object|string} collection The collection to iterate over.
 * @param {Function} iteratee The function invoked per iteration.
 * @returns {Array} Returns the new mapped array.
 */
function baseMap(collection, iteratee) {
  var result = [];
  baseEach(collection, function(value, key, collection) {
    result.push(iteratee(value, key, collection));
  });
  return result;
}

module.exports = baseMap;

},{"./baseEach":33}],44:[function(require,module,exports){
var baseIsMatch = require('./baseIsMatch'),
    isStrictComparable = require('./isStrictComparable'),
    keys = require('../object/keys');

/** Used for native method references. */
var objectProto = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/**
 * The base implementation of `_.matches` which does not clone `source`.
 *
 * @private
 * @param {Object} source The object of property values to match.
 * @returns {Function} Returns the new function.
 */
function baseMatches(source) {
  var props = keys(source),
      length = props.length;

  if (length == 1) {
    var key = props[0],
        value = source[key];

    if (isStrictComparable(value)) {
      return function(object) {
        return object != null && object[key] === value && hasOwnProperty.call(object, key);
      };
    }
  }
  var values = Array(length),
      strictCompareFlags = Array(length);

  while (length--) {
    value = source[props[length]];
    values[length] = value;
    strictCompareFlags[length] = isStrictComparable(value);
  }
  return function(object) {
    return baseIsMatch(object, props, values, strictCompareFlags);
  };
}

module.exports = baseMatches;

},{"../object/keys":101,"./baseIsMatch":42,"./isStrictComparable":79}],45:[function(require,module,exports){
var baseIsEqual = require('./baseIsEqual'),
    isStrictComparable = require('./isStrictComparable');

/**
 * The base implementation of `_.matchesProperty` which does not coerce `key`
 * to a string.
 *
 * @private
 * @param {string} key The key of the property to get.
 * @param {*} value The value to compare.
 * @returns {Function} Returns the new function.
 */
function baseMatchesProperty(key, value) {
  if (isStrictComparable(value)) {
    return function(object) {
      return object != null && object[key] === value;
    };
  }
  return function(object) {
    return object != null && baseIsEqual(value, object[key], null, true);
  };
}

module.exports = baseMatchesProperty;

},{"./baseIsEqual":39,"./isStrictComparable":79}],46:[function(require,module,exports){
/**
 * The base implementation of `_.property` which does not coerce `key` to a string.
 *
 * @private
 * @param {string} key The key of the property to get.
 * @returns {Function} Returns the new function.
 */
function baseProperty(key) {
  return function(object) {
    return object == null ? undefined : object[key];
  };
}

module.exports = baseProperty;

},{}],47:[function(require,module,exports){
var identity = require('../utility/identity'),
    metaMap = require('./metaMap');

/**
 * The base implementation of `setData` without support for hot loop detection.
 *
 * @private
 * @param {Function} func The function to associate metadata with.
 * @param {*} data The metadata.
 * @returns {Function} Returns `func`.
 */
var baseSetData = !metaMap ? identity : function(func, data) {
  metaMap.set(func, data);
  return func;
};

module.exports = baseSetData;

},{"../utility/identity":107,"./metaMap":81}],48:[function(require,module,exports){
/**
 * The base implementation of `_.slice` without an iteratee call guard.
 *
 * @private
 * @param {Array} array The array to slice.
 * @param {number} [start=0] The start position.
 * @param {number} [end=array.length] The end position.
 * @returns {Array} Returns the slice of `array`.
 */
function baseSlice(array, start, end) {
  var index = -1,
      length = array.length;

  start = start == null ? 0 : (+start || 0);
  if (start < 0) {
    start = -start > length ? 0 : (length + start);
  }
  end = (typeof end == 'undefined' || end > length) ? length : (+end || 0);
  if (end < 0) {
    end += length;
  }
  length = start > end ? 0 : (end - start) >>> 0;
  start >>>= 0;

  var result = Array(length);
  while (++index < length) {
    result[index] = array[index + start];
  }
  return result;
}

module.exports = baseSlice;

},{}],49:[function(require,module,exports){
/**
 * Converts `value` to a string if it is not one. An empty string is returned
 * for `null` or `undefined` values.
 *
 * @private
 * @param {*} value The value to process.
 * @returns {string} Returns the string.
 */
function baseToString(value) {
  if (typeof value == 'string') {
    return value;
  }
  return value == null ? '' : (value + '');
}

module.exports = baseToString;

},{}],50:[function(require,module,exports){
var baseIndexOf = require('./baseIndexOf'),
    cacheIndexOf = require('./cacheIndexOf'),
    createCache = require('./createCache');

/**
 * The base implementation of `_.uniq` without support for callback shorthands
 * and `this` binding.
 *
 * @private
 * @param {Array} array The array to inspect.
 * @param {Function} [iteratee] The function invoked per iteration.
 * @returns {Array} Returns the new duplicate-value-free array.
 */
function baseUniq(array, iteratee) {
  var index = -1,
      indexOf = baseIndexOf,
      length = array.length,
      isCommon = true,
      isLarge = isCommon && length >= 200,
      seen = isLarge ? createCache() : null,
      result = [];

  if (seen) {
    indexOf = cacheIndexOf;
    isCommon = false;
  } else {
    isLarge = false;
    seen = iteratee ? [] : result;
  }
  outer:
  while (++index < length) {
    var value = array[index],
        computed = iteratee ? iteratee(value, index, array) : value;

    if (isCommon && value === value) {
      var seenIndex = seen.length;
      while (seenIndex--) {
        if (seen[seenIndex] === computed) {
          continue outer;
        }
      }
      if (iteratee) {
        seen.push(computed);
      }
      result.push(value);
    }
    else if (indexOf(seen, computed) < 0) {
      if (iteratee || isLarge) {
        seen.push(computed);
      }
      result.push(value);
    }
  }
  return result;
}

module.exports = baseUniq;

},{"./baseIndexOf":38,"./cacheIndexOf":54,"./createCache":61}],51:[function(require,module,exports){
/**
 * The base implementation of `_.values` and `_.valuesIn` which creates an
 * array of `object` property values corresponding to the property names
 * returned by `keysFunc`.
 *
 * @private
 * @param {Object} object The object to query.
 * @param {Array} props The property names to get values for.
 * @returns {Object} Returns the array of property values.
 */
function baseValues(object, props) {
  var index = -1,
      length = props.length,
      result = Array(length);

  while (++index < length) {
    result[index] = object[props[index]];
  }
  return result;
}

module.exports = baseValues;

},{}],52:[function(require,module,exports){
var identity = require('../utility/identity');

/**
 * A specialized version of `baseCallback` which only supports `this` binding
 * and specifying the number of arguments to provide to `func`.
 *
 * @private
 * @param {Function} func The function to bind.
 * @param {*} thisArg The `this` binding of `func`.
 * @param {number} [argCount] The number of arguments to provide to `func`.
 * @returns {Function} Returns the callback.
 */
function bindCallback(func, thisArg, argCount) {
  if (typeof func != 'function') {
    return identity;
  }
  if (typeof thisArg == 'undefined') {
    return func;
  }
  switch (argCount) {
    case 1: return function(value) {
      return func.call(thisArg, value);
    };
    case 3: return function(value, index, collection) {
      return func.call(thisArg, value, index, collection);
    };
    case 4: return function(accumulator, value, index, collection) {
      return func.call(thisArg, accumulator, value, index, collection);
    };
    case 5: return function(value, other, key, object, source) {
      return func.call(thisArg, value, other, key, object, source);
    };
  }
  return function() {
    return func.apply(thisArg, arguments);
  };
}

module.exports = bindCallback;

},{"../utility/identity":107}],53:[function(require,module,exports){
(function (global){
var constant = require('../utility/constant'),
    isNative = require('../lang/isNative');

/** Native method references. */
var ArrayBuffer = isNative(ArrayBuffer = global.ArrayBuffer) && ArrayBuffer,
    bufferSlice = isNative(bufferSlice = ArrayBuffer && new ArrayBuffer(0).slice) && bufferSlice,
    floor = Math.floor,
    Uint8Array = isNative(Uint8Array = global.Uint8Array) && Uint8Array;

/** Used to clone array buffers. */
var Float64Array = (function() {
  // Safari 5 errors when using an array buffer to initialize a typed array
  // where the array buffer's `byteLength` is not a multiple of the typed
  // array's `BYTES_PER_ELEMENT`.
  try {
    var func = isNative(func = global.Float64Array) && func,
        result = new func(new ArrayBuffer(10), 0, 1) && func;
  } catch(e) {}
  return result;
}());

/** Used as the size, in bytes, of each `Float64Array` element. */
var FLOAT64_BYTES_PER_ELEMENT = Float64Array ? Float64Array.BYTES_PER_ELEMENT : 0;

/**
 * Creates a clone of the given array buffer.
 *
 * @private
 * @param {ArrayBuffer} buffer The array buffer to clone.
 * @returns {ArrayBuffer} Returns the cloned array buffer.
 */
function bufferClone(buffer) {
  return bufferSlice.call(buffer, 0);
}
if (!bufferSlice) {
  // PhantomJS has `ArrayBuffer` and `Uint8Array` but not `Float64Array`.
  bufferClone = !(ArrayBuffer && Uint8Array) ? constant(null) : function(buffer) {
    var byteLength = buffer.byteLength,
        floatLength = Float64Array ? floor(byteLength / FLOAT64_BYTES_PER_ELEMENT) : 0,
        offset = floatLength * FLOAT64_BYTES_PER_ELEMENT,
        result = new ArrayBuffer(byteLength);

    if (floatLength) {
      var view = new Float64Array(result, 0, floatLength);
      view.set(new Float64Array(buffer, 0, floatLength));
    }
    if (byteLength != offset) {
      view = new Uint8Array(result, offset);
      view.set(new Uint8Array(buffer, offset));
    }
    return result;
  };
}

module.exports = bufferClone;

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"../lang/isNative":94,"../utility/constant":106}],54:[function(require,module,exports){
var isObject = require('../lang/isObject');

/**
 * Checks if `value` is in `cache` mimicking the return signature of
 * `_.indexOf` by returning `0` if the value is found, else `-1`.
 *
 * @private
 * @param {Object} cache The cache to search.
 * @param {*} value The value to search for.
 * @returns {number} Returns `0` if `value` is found, else `-1`.
 */
function cacheIndexOf(cache, value) {
  var data = cache.data,
      result = (typeof value == 'string' || isObject(value)) ? data.set.has(value) : data.hash[value];

  return result ? 0 : -1;
}

module.exports = cacheIndexOf;

},{"../lang/isObject":96}],55:[function(require,module,exports){
var isObject = require('../lang/isObject');

/**
 * Adds `value` to the cache.
 *
 * @private
 * @name push
 * @memberOf SetCache
 * @param {*} value The value to cache.
 */
function cachePush(value) {
  var data = this.data;
  if (typeof value == 'string' || isObject(value)) {
    data.set.add(value);
  } else {
    data.hash[value] = true;
  }
}

module.exports = cachePush;

},{"../lang/isObject":96}],56:[function(require,module,exports){
/* Native method references for those with the same name as other `lodash` methods. */
var nativeMax = Math.max;

/**
 * Creates an array that is the composition of partially applied arguments,
 * placeholders, and provided arguments into a single array of arguments.
 *
 * @private
 * @param {Array|Object} args The provided arguments.
 * @param {Array} partials The arguments to prepend to those provided.
 * @param {Array} holders The `partials` placeholder indexes.
 * @returns {Array} Returns the new array of composed arguments.
 */
function composeArgs(args, partials, holders) {
  var holdersLength = holders.length,
      argsIndex = -1,
      argsLength = nativeMax(args.length - holdersLength, 0),
      leftIndex = -1,
      leftLength = partials.length,
      result = Array(argsLength + leftLength);

  while (++leftIndex < leftLength) {
    result[leftIndex] = partials[leftIndex];
  }
  while (++argsIndex < holdersLength) {
    result[holders[argsIndex]] = args[argsIndex];
  }
  while (argsLength--) {
    result[leftIndex++] = args[argsIndex++];
  }
  return result;
}

module.exports = composeArgs;

},{}],57:[function(require,module,exports){
/* Native method references for those with the same name as other `lodash` methods. */
var nativeMax = Math.max;

/**
 * This function is like `composeArgs` except that the arguments composition
 * is tailored for `_.partialRight`.
 *
 * @private
 * @param {Array|Object} args The provided arguments.
 * @param {Array} partials The arguments to append to those provided.
 * @param {Array} holders The `partials` placeholder indexes.
 * @returns {Array} Returns the new array of composed arguments.
 */
function composeArgsRight(args, partials, holders) {
  var holdersIndex = -1,
      holdersLength = holders.length,
      argsIndex = -1,
      argsLength = nativeMax(args.length - holdersLength, 0),
      rightIndex = -1,
      rightLength = partials.length,
      result = Array(argsLength + rightLength);

  while (++argsIndex < argsLength) {
    result[argsIndex] = args[argsIndex];
  }
  var pad = argsIndex;
  while (++rightIndex < rightLength) {
    result[pad + rightIndex] = partials[rightIndex];
  }
  while (++holdersIndex < holdersLength) {
    result[pad + holders[holdersIndex]] = args[argsIndex++];
  }
  return result;
}

module.exports = composeArgsRight;

},{}],58:[function(require,module,exports){
var baseCallback = require('./baseCallback'),
    baseEach = require('./baseEach'),
    isArray = require('../lang/isArray');

/**
 * Creates a function that aggregates a collection, creating an accumulator
 * object composed from the results of running each element in the collection
 * through an iteratee.
 *
 * @private
 * @param {Function} setter The function to set keys and values of the accumulator object.
 * @param {Function} [initializer] The function to initialize the accumulator object.
 * @returns {Function} Returns the new aggregator function.
 */
function createAggregator(setter, initializer) {
  return function(collection, iteratee, thisArg) {
    var result = initializer ? initializer() : {};
    iteratee = baseCallback(iteratee, thisArg, 3);

    if (isArray(collection)) {
      var index = -1,
          length = collection.length;

      while (++index < length) {
        var value = collection[index];
        setter(result, value, iteratee(value, index, collection), collection);
      }
    } else {
      baseEach(collection, function(value, key, collection) {
        setter(result, value, iteratee(value, key, collection), collection);
      });
    }
    return result;
  };
}

module.exports = createAggregator;

},{"../lang/isArray":90,"./baseCallback":28,"./baseEach":33}],59:[function(require,module,exports){
var bindCallback = require('./bindCallback'),
    isIterateeCall = require('./isIterateeCall');

/**
 * Creates a function that assigns properties of source object(s) to a given
 * destination object.
 *
 * @private
 * @param {Function} assigner The function to assign values.
 * @returns {Function} Returns the new assigner function.
 */
function createAssigner(assigner) {
  return function() {
    var length = arguments.length,
        object = arguments[0];

    if (length < 2 || object == null) {
      return object;
    }
    if (length > 3 && isIterateeCall(arguments[1], arguments[2], arguments[3])) {
      length = 2;
    }
    // Juggle arguments.
    if (length > 3 && typeof arguments[length - 2] == 'function') {
      var customizer = bindCallback(arguments[--length - 1], arguments[length--], 5);
    } else if (length > 2 && typeof arguments[length - 1] == 'function') {
      customizer = arguments[--length];
    }
    var index = 0;
    while (++index < length) {
      var source = arguments[index];
      if (source) {
        assigner(object, source, customizer);
      }
    }
    return object;
  };
}

module.exports = createAssigner;

},{"./bindCallback":52,"./isIterateeCall":76}],60:[function(require,module,exports){
var createCtorWrapper = require('./createCtorWrapper');

/**
 * Creates a function that wraps `func` and invokes it with the `this`
 * binding of `thisArg`.
 *
 * @private
 * @param {Function} func The function to bind.
 * @param {*} [thisArg] The `this` binding of `func`.
 * @returns {Function} Returns the new bound function.
 */
function createBindWrapper(func, thisArg) {
  var Ctor = createCtorWrapper(func);

  function wrapper() {
    return (this instanceof wrapper ? Ctor : func).apply(thisArg, arguments);
  }
  return wrapper;
}

module.exports = createBindWrapper;

},{"./createCtorWrapper":62}],61:[function(require,module,exports){
(function (global){
var SetCache = require('./SetCache'),
    constant = require('../utility/constant'),
    isNative = require('../lang/isNative');

/** Native method references. */
var Set = isNative(Set = global.Set) && Set;

/* Native method references for those with the same name as other `lodash` methods. */
var nativeCreate = isNative(nativeCreate = Object.create) && nativeCreate;

/**
 * Creates a `Set` cache object to optimize linear searches of large arrays.
 *
 * @private
 * @param {Array} [values] The values to cache.
 * @returns {null|Object} Returns the new cache object if `Set` is supported, else `null`.
 */
var createCache = !(nativeCreate && Set) ? constant(null) : function(values) {
  return new SetCache(values);
};

module.exports = createCache;

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"../lang/isNative":94,"../utility/constant":106,"./SetCache":22}],62:[function(require,module,exports){
var baseCreate = require('./baseCreate'),
    isObject = require('../lang/isObject');

/**
 * Creates a function that produces an instance of `Ctor` regardless of
 * whether it was invoked as part of a `new` expression or by `call` or `apply`.
 *
 * @private
 * @param {Function} Ctor The constructor to wrap.
 * @returns {Function} Returns the new wrapped function.
 */
function createCtorWrapper(Ctor) {
  return function() {
    var thisBinding = baseCreate(Ctor.prototype),
        result = Ctor.apply(thisBinding, arguments);

    // Mimic the constructor's `return` behavior.
    // See https://es5.github.io/#x13.2.2 for more details.
    return isObject(result) ? result : thisBinding;
  };
}

module.exports = createCtorWrapper;

},{"../lang/isObject":96,"./baseCreate":31}],63:[function(require,module,exports){
var arrayCopy = require('./arrayCopy'),
    composeArgs = require('./composeArgs'),
    composeArgsRight = require('./composeArgsRight'),
    createCtorWrapper = require('./createCtorWrapper'),
    reorder = require('./reorder'),
    replaceHolders = require('./replaceHolders');

/** Used to compose bitmasks for wrapper metadata. */
var BIND_FLAG = 1,
    BIND_KEY_FLAG = 2,
    CURRY_BOUND_FLAG = 4,
    CURRY_FLAG = 8,
    CURRY_RIGHT_FLAG = 16,
    PARTIAL_FLAG = 32,
    PARTIAL_RIGHT_FLAG = 64,
    ARY_FLAG = 256;

/* Native method references for those with the same name as other `lodash` methods. */
var nativeMax = Math.max;

/**
 * Creates a function that wraps `func` and invokes it with optional `this`
 * binding of, partial application, and currying.
 *
 * @private
 * @param {Function|string} func The function or method name to reference.
 * @param {number} bitmask The bitmask of flags. See `createWrapper` for more details.
 * @param {*} [thisArg] The `this` binding of `func`.
 * @param {Array} [partials] The arguments to prepend to those provided to the new function.
 * @param {Array} [holders] The `partials` placeholder indexes.
 * @param {Array} [partialsRight] The arguments to append to those provided to the new function.
 * @param {Array} [holdersRight] The `partialsRight` placeholder indexes.
 * @param {Array} [argPos] The argument positions of the new function.
 * @param {number} [ary] The arity cap of `func`.
 * @param {number} [arity] The arity of `func`.
 * @returns {Function} Returns the new wrapped function.
 */
function createHybridWrapper(func, bitmask, thisArg, partials, holders, partialsRight, holdersRight, argPos, ary, arity) {
  var isAry = bitmask & ARY_FLAG,
      isBind = bitmask & BIND_FLAG,
      isBindKey = bitmask & BIND_KEY_FLAG,
      isCurry = bitmask & CURRY_FLAG,
      isCurryBound = bitmask & CURRY_BOUND_FLAG,
      isCurryRight = bitmask & CURRY_RIGHT_FLAG;

  var Ctor = !isBindKey && createCtorWrapper(func),
      key = func;

  function wrapper() {
    // Avoid `arguments` object use disqualifying optimizations by
    // converting it to an array before providing it to other functions.
    var length = arguments.length,
        index = length,
        args = Array(length);

    while (index--) {
      args[index] = arguments[index];
    }
    if (partials) {
      args = composeArgs(args, partials, holders);
    }
    if (partialsRight) {
      args = composeArgsRight(args, partialsRight, holdersRight);
    }
    if (isCurry || isCurryRight) {
      var placeholder = wrapper.placeholder,
          argsHolders = replaceHolders(args, placeholder);

      length -= argsHolders.length;
      if (length < arity) {
        var newArgPos = argPos ? arrayCopy(argPos) : null,
            newArity = nativeMax(arity - length, 0),
            newsHolders = isCurry ? argsHolders : null,
            newHoldersRight = isCurry ? null : argsHolders,
            newPartials = isCurry ? args : null,
            newPartialsRight = isCurry ? null : args;

        bitmask |= (isCurry ? PARTIAL_FLAG : PARTIAL_RIGHT_FLAG);
        bitmask &= ~(isCurry ? PARTIAL_RIGHT_FLAG : PARTIAL_FLAG);

        if (!isCurryBound) {
          bitmask &= ~(BIND_FLAG | BIND_KEY_FLAG);
        }
        var result = createHybridWrapper(func, bitmask, thisArg, newPartials, newsHolders, newPartialsRight, newHoldersRight, newArgPos, ary, newArity);
        result.placeholder = placeholder;
        return result;
      }
    }
    var thisBinding = isBind ? thisArg : this;
    if (isBindKey) {
      func = thisBinding[key];
    }
    if (argPos) {
      args = reorder(args, argPos);
    }
    if (isAry && ary < args.length) {
      args.length = ary;
    }
    return (this instanceof wrapper ? (Ctor || createCtorWrapper(func)) : func).apply(thisBinding, args);
  }
  return wrapper;
}

module.exports = createHybridWrapper;

},{"./arrayCopy":23,"./composeArgs":56,"./composeArgsRight":57,"./createCtorWrapper":62,"./reorder":82,"./replaceHolders":83}],64:[function(require,module,exports){
var createCtorWrapper = require('./createCtorWrapper');

/** Used to compose bitmasks for wrapper metadata. */
var BIND_FLAG = 1;

/**
 * Creates a function that wraps `func` and invokes it with the optional `this`
 * binding of `thisArg` and the `partials` prepended to those provided to
 * the wrapper.
 *
 * @private
 * @param {Function} func The function to partially apply arguments to.
 * @param {number} bitmask The bitmask of flags. See `createWrapper` for more details.
 * @param {*} thisArg The `this` binding of `func`.
 * @param {Array} partials The arguments to prepend to those provided to the new function.
 * @returns {Function} Returns the new bound function.
 */
function createPartialWrapper(func, bitmask, thisArg, partials) {
  var isBind = bitmask & BIND_FLAG,
      Ctor = createCtorWrapper(func);

  function wrapper() {
    // Avoid `arguments` object use disqualifying optimizations by
    // converting it to an array before providing it `func`.
    var argsIndex = -1,
        argsLength = arguments.length,
        leftIndex = -1,
        leftLength = partials.length,
        args = Array(argsLength + leftLength);

    while (++leftIndex < leftLength) {
      args[leftIndex] = partials[leftIndex];
    }
    while (argsLength--) {
      args[leftIndex++] = arguments[++argsIndex];
    }
    return (this instanceof wrapper ? Ctor : func).apply(isBind ? thisArg : this, args);
  }
  return wrapper;
}

module.exports = createPartialWrapper;

},{"./createCtorWrapper":62}],65:[function(require,module,exports){
var baseSetData = require('./baseSetData'),
    createBindWrapper = require('./createBindWrapper'),
    createHybridWrapper = require('./createHybridWrapper'),
    createPartialWrapper = require('./createPartialWrapper'),
    getData = require('./getData'),
    mergeData = require('./mergeData'),
    setData = require('./setData');

/** Used to compose bitmasks for wrapper metadata. */
var BIND_FLAG = 1,
    BIND_KEY_FLAG = 2,
    PARTIAL_FLAG = 32,
    PARTIAL_RIGHT_FLAG = 64;

/** Used as the `TypeError` message for "Functions" methods. */
var FUNC_ERROR_TEXT = 'Expected a function';

/* Native method references for those with the same name as other `lodash` methods. */
var nativeMax = Math.max;

/**
 * Creates a function that either curries or invokes `func` with optional
 * `this` binding and partially applied arguments.
 *
 * @private
 * @param {Function|string} func The function or method name to reference.
 * @param {number} bitmask The bitmask of flags.
 *  The bitmask may be composed of the following flags:
 *     1 - `_.bind`
 *     2 - `_.bindKey`
 *     4 - `_.curry` or `_.curryRight` of a bound function
 *     8 - `_.curry`
 *    16 - `_.curryRight`
 *    32 - `_.partial`
 *    64 - `_.partialRight`
 *   128 - `_.rearg`
 *   256 - `_.ary`
 * @param {*} [thisArg] The `this` binding of `func`.
 * @param {Array} [partials] The arguments to be partially applied.
 * @param {Array} [holders] The `partials` placeholder indexes.
 * @param {Array} [argPos] The argument positions of the new function.
 * @param {number} [ary] The arity cap of `func`.
 * @param {number} [arity] The arity of `func`.
 * @returns {Function} Returns the new wrapped function.
 */
function createWrapper(func, bitmask, thisArg, partials, holders, argPos, ary, arity) {
  var isBindKey = bitmask & BIND_KEY_FLAG;
  if (!isBindKey && typeof func != 'function') {
    throw new TypeError(FUNC_ERROR_TEXT);
  }
  var length = partials ? partials.length : 0;
  if (!length) {
    bitmask &= ~(PARTIAL_FLAG | PARTIAL_RIGHT_FLAG);
    partials = holders = null;
  }
  length -= (holders ? holders.length : 0);
  if (bitmask & PARTIAL_RIGHT_FLAG) {
    var partialsRight = partials,
        holdersRight = holders;

    partials = holders = null;
  }
  var data = !isBindKey && getData(func),
      newData = [func, bitmask, thisArg, partials, holders, partialsRight, holdersRight, argPos, ary, arity];

  if (data && data !== true) {
    mergeData(newData, data);
    bitmask = newData[1];
    arity = newData[9];
  }
  newData[9] = arity == null
    ? (isBindKey ? 0 : func.length)
    : (nativeMax(arity - length, 0) || 0);

  if (bitmask == BIND_FLAG) {
    var result = createBindWrapper(newData[0], newData[2]);
  } else if ((bitmask == PARTIAL_FLAG || bitmask == (BIND_FLAG | PARTIAL_FLAG)) && !newData[4].length) {
    result = createPartialWrapper.apply(undefined, newData);
  } else {
    result = createHybridWrapper.apply(undefined, newData);
  }
  var setter = data ? baseSetData : setData;
  return setter(result, newData);
}

module.exports = createWrapper;

},{"./baseSetData":47,"./createBindWrapper":60,"./createHybridWrapper":63,"./createPartialWrapper":64,"./getData":69,"./mergeData":80,"./setData":84}],66:[function(require,module,exports){
/**
 * A specialized version of `baseIsEqualDeep` for arrays with support for
 * partial deep comparisons.
 *
 * @private
 * @param {Array} array The array to compare.
 * @param {Array} other The other array to compare.
 * @param {Function} equalFunc The function to determine equivalents of values.
 * @param {Function} [customizer] The function to customize comparing arrays.
 * @param {boolean} [isWhere] Specify performing partial comparisons.
 * @param {Array} [stackA] Tracks traversed `value` objects.
 * @param {Array} [stackB] Tracks traversed `other` objects.
 * @returns {boolean} Returns `true` if the arrays are equivalent, else `false`.
 */
function equalArrays(array, other, equalFunc, customizer, isWhere, stackA, stackB) {
  var index = -1,
      arrLength = array.length,
      othLength = other.length,
      result = true;

  if (arrLength != othLength && !(isWhere && othLength > arrLength)) {
    return false;
  }
  // Deep compare the contents, ignoring non-numeric properties.
  while (result && ++index < arrLength) {
    var arrValue = array[index],
        othValue = other[index];

    result = undefined;
    if (customizer) {
      result = isWhere
        ? customizer(othValue, arrValue, index)
        : customizer(arrValue, othValue, index);
    }
    if (typeof result == 'undefined') {
      // Recursively compare arrays (susceptible to call stack limits).
      if (isWhere) {
        var othIndex = othLength;
        while (othIndex--) {
          othValue = other[othIndex];
          result = (arrValue && arrValue === othValue) || equalFunc(arrValue, othValue, customizer, isWhere, stackA, stackB);
          if (result) {
            break;
          }
        }
      } else {
        result = (arrValue && arrValue === othValue) || equalFunc(arrValue, othValue, customizer, isWhere, stackA, stackB);
      }
    }
  }
  return !!result;
}

module.exports = equalArrays;

},{}],67:[function(require,module,exports){
/** `Object#toString` result references. */
var boolTag = '[object Boolean]',
    dateTag = '[object Date]',
    errorTag = '[object Error]',
    numberTag = '[object Number]',
    regexpTag = '[object RegExp]',
    stringTag = '[object String]';

/**
 * A specialized version of `baseIsEqualDeep` for comparing objects of
 * the same `toStringTag`.
 *
 * **Note:** This function only supports comparing values with tags of
 * `Boolean`, `Date`, `Error`, `Number`, `RegExp`, or `String`.
 *
 * @private
 * @param {Object} value The object to compare.
 * @param {Object} other The other object to compare.
 * @param {string} tag The `toStringTag` of the objects to compare.
 * @returns {boolean} Returns `true` if the objects are equivalent, else `false`.
 */
function equalByTag(object, other, tag) {
  switch (tag) {
    case boolTag:
    case dateTag:
      // Coerce dates and booleans to numbers, dates to milliseconds and booleans
      // to `1` or `0` treating invalid dates coerced to `NaN` as not equal.
      return +object == +other;

    case errorTag:
      return object.name == other.name && object.message == other.message;

    case numberTag:
      // Treat `NaN` vs. `NaN` as equal.
      return (object != +object)
        ? other != +other
        // But, treat `-0` vs. `+0` as not equal.
        : (object == 0 ? ((1 / object) == (1 / other)) : object == +other);

    case regexpTag:
    case stringTag:
      // Coerce regexes to strings and treat strings primitives and string
      // objects as equal. See https://es5.github.io/#x15.10.6.4 for more details.
      return object == (other + '');
  }
  return false;
}

module.exports = equalByTag;

},{}],68:[function(require,module,exports){
var keys = require('../object/keys');

/** Used for native method references. */
var objectProto = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/**
 * A specialized version of `baseIsEqualDeep` for objects with support for
 * partial deep comparisons.
 *
 * @private
 * @param {Object} object The object to compare.
 * @param {Object} other The other object to compare.
 * @param {Function} equalFunc The function to determine equivalents of values.
 * @param {Function} [customizer] The function to customize comparing values.
 * @param {boolean} [isWhere] Specify performing partial comparisons.
 * @param {Array} [stackA] Tracks traversed `value` objects.
 * @param {Array} [stackB] Tracks traversed `other` objects.
 * @returns {boolean} Returns `true` if the objects are equivalent, else `false`.
 */
function equalObjects(object, other, equalFunc, customizer, isWhere, stackA, stackB) {
  var objProps = keys(object),
      objLength = objProps.length,
      othProps = keys(other),
      othLength = othProps.length;

  if (objLength != othLength && !isWhere) {
    return false;
  }
  var hasCtor,
      index = -1;

  while (++index < objLength) {
    var key = objProps[index],
        result = hasOwnProperty.call(other, key);

    if (result) {
      var objValue = object[key],
          othValue = other[key];

      result = undefined;
      if (customizer) {
        result = isWhere
          ? customizer(othValue, objValue, key)
          : customizer(objValue, othValue, key);
      }
      if (typeof result == 'undefined') {
        // Recursively compare objects (susceptible to call stack limits).
        result = (objValue && objValue === othValue) || equalFunc(objValue, othValue, customizer, isWhere, stackA, stackB);
      }
    }
    if (!result) {
      return false;
    }
    hasCtor || (hasCtor = key == 'constructor');
  }
  if (!hasCtor) {
    var objCtor = object.constructor,
        othCtor = other.constructor;

    // Non `Object` object instances with different constructors are not equal.
    if (objCtor != othCtor && ('constructor' in object && 'constructor' in other) &&
        !(typeof objCtor == 'function' && objCtor instanceof objCtor && typeof othCtor == 'function' && othCtor instanceof othCtor)) {
      return false;
    }
  }
  return true;
}

module.exports = equalObjects;

},{"../object/keys":101}],69:[function(require,module,exports){
var metaMap = require('./metaMap'),
    noop = require('../utility/noop');

/**
 * Gets metadata for `func`.
 *
 * @private
 * @param {Function} func The function to query.
 * @returns {*} Returns the metadata for `func`.
 */
var getData = !metaMap ? noop : function(func) {
  return metaMap.get(func);
};

module.exports = getData;

},{"../utility/noop":108,"./metaMap":81}],70:[function(require,module,exports){
/**
 * Gets the index at which the first occurrence of `NaN` is found in `array`.
 * If `fromRight` is provided elements of `array` are iterated from right to left.
 *
 * @private
 * @param {Array} array The array to search.
 * @param {number} [fromIndex] The index to search from.
 * @param {boolean} [fromRight] Specify iterating from right to left.
 * @returns {number} Returns the index of the matched `NaN`, else `-1`.
 */
function indexOfNaN(array, fromIndex, fromRight) {
  var length = array.length,
      index = fromRight ? (fromIndex || length) : ((fromIndex || 0) - 1);

  while ((fromRight ? index-- : ++index < length)) {
    var other = array[index];
    if (other !== other) {
      return index;
    }
  }
  return -1;
}

module.exports = indexOfNaN;

},{}],71:[function(require,module,exports){
/** Used for native method references. */
var objectProto = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/**
 * Initializes an array clone.
 *
 * @private
 * @param {Array} array The array to clone.
 * @returns {Array} Returns the initialized clone.
 */
function initCloneArray(array) {
  var length = array.length,
      result = new array.constructor(length);

  // Add array properties assigned by `RegExp#exec`.
  if (length && typeof array[0] == 'string' && hasOwnProperty.call(array, 'index')) {
    result.index = array.index;
    result.input = array.input;
  }
  return result;
}

module.exports = initCloneArray;

},{}],72:[function(require,module,exports){
var bufferClone = require('./bufferClone');

/** `Object#toString` result references. */
var boolTag = '[object Boolean]',
    dateTag = '[object Date]',
    numberTag = '[object Number]',
    regexpTag = '[object RegExp]',
    stringTag = '[object String]';

var arrayBufferTag = '[object ArrayBuffer]',
    float32Tag = '[object Float32Array]',
    float64Tag = '[object Float64Array]',
    int8Tag = '[object Int8Array]',
    int16Tag = '[object Int16Array]',
    int32Tag = '[object Int32Array]',
    uint8Tag = '[object Uint8Array]',
    uint8ClampedTag = '[object Uint8ClampedArray]',
    uint16Tag = '[object Uint16Array]',
    uint32Tag = '[object Uint32Array]';

/** Used to match `RegExp` flags from their coerced string values. */
var reFlags = /\w*$/;

/**
 * Initializes an object clone based on its `toStringTag`.
 *
 * **Note:** This function only supports cloning values with tags of
 * `Boolean`, `Date`, `Error`, `Number`, `RegExp`, or `String`.
 *
 *
 * @private
 * @param {Object} object The object to clone.
 * @param {string} tag The `toStringTag` of the object to clone.
 * @param {boolean} [isDeep] Specify a deep clone.
 * @returns {Object} Returns the initialized clone.
 */
function initCloneByTag(object, tag, isDeep) {
  var Ctor = object.constructor;
  switch (tag) {
    case arrayBufferTag:
      return bufferClone(object);

    case boolTag:
    case dateTag:
      return new Ctor(+object);

    case float32Tag: case float64Tag:
    case int8Tag: case int16Tag: case int32Tag:
    case uint8Tag: case uint8ClampedTag: case uint16Tag: case uint32Tag:
      var buffer = object.buffer;
      return new Ctor(isDeep ? bufferClone(buffer) : buffer, object.byteOffset, object.length);

    case numberTag:
    case stringTag:
      return new Ctor(object);

    case regexpTag:
      var result = new Ctor(object.source, reFlags.exec(object));
      result.lastIndex = object.lastIndex;
  }
  return result;
}

module.exports = initCloneByTag;

},{"./bufferClone":53}],73:[function(require,module,exports){
/**
 * Initializes an object clone.
 *
 * @private
 * @param {Object} object The object to clone.
 * @returns {Object} Returns the initialized clone.
 */
function initCloneObject(object) {
  var Ctor = object.constructor;
  if (!(typeof Ctor == 'function' && Ctor instanceof Ctor)) {
    Ctor = Object;
  }
  return new Ctor;
}

module.exports = initCloneObject;

},{}],74:[function(require,module,exports){
var baseSetData = require('./baseSetData'),
    isNative = require('../lang/isNative'),
    support = require('../support');

/** Used to detect named functions. */
var reFuncName = /^\s*function[ \n\r\t]+\w/;

/** Used to detect functions containing a `this` reference. */
var reThis = /\bthis\b/;

/** Used to resolve the decompiled source of functions. */
var fnToString = Function.prototype.toString;

/**
 * Checks if `func` is eligible for `this` binding.
 *
 * @private
 * @param {Function} func The function to check.
 * @returns {boolean} Returns `true` if `func` is eligible, else `false`.
 */
function isBindable(func) {
  var result = !(support.funcNames ? func.name : support.funcDecomp);

  if (!result) {
    var source = fnToString.call(func);
    if (!support.funcNames) {
      result = !reFuncName.test(source);
    }
    if (!result) {
      // Check if `func` references the `this` keyword and store the result.
      result = reThis.test(source) || isNative(func);
      baseSetData(func, result);
    }
  }
  return result;
}

module.exports = isBindable;

},{"../lang/isNative":94,"../support":105,"./baseSetData":47}],75:[function(require,module,exports){
/**
 * Used as the maximum length of an array-like value.
 * See the [ES spec](https://people.mozilla.org/~jorendorff/es6-draft.html#sec-number.max_safe_integer)
 * for more details.
 */
var MAX_SAFE_INTEGER = Math.pow(2, 53) - 1;

/**
 * Checks if `value` is a valid array-like index.
 *
 * @private
 * @param {*} value The value to check.
 * @param {number} [length=MAX_SAFE_INTEGER] The upper bounds of a valid index.
 * @returns {boolean} Returns `true` if `value` is a valid index, else `false`.
 */
function isIndex(value, length) {
  value = +value;
  length = length == null ? MAX_SAFE_INTEGER : length;
  return value > -1 && value % 1 == 0 && value < length;
}

module.exports = isIndex;

},{}],76:[function(require,module,exports){
var isIndex = require('./isIndex'),
    isLength = require('./isLength'),
    isObject = require('../lang/isObject');

/**
 * Checks if the provided arguments are from an iteratee call.
 *
 * @private
 * @param {*} value The potential iteratee value argument.
 * @param {*} index The potential iteratee index or key argument.
 * @param {*} object The potential iteratee object argument.
 * @returns {boolean} Returns `true` if the arguments are from an iteratee call, else `false`.
 */
function isIterateeCall(value, index, object) {
  if (!isObject(object)) {
    return false;
  }
  var type = typeof index;
  if (type == 'number') {
    var length = object.length,
        prereq = isLength(length) && isIndex(index, length);
  } else {
    prereq = type == 'string' && index in object;
  }
  if (prereq) {
    var other = object[index];
    return value === value ? value === other : other !== other;
  }
  return false;
}

module.exports = isIterateeCall;

},{"../lang/isObject":96,"./isIndex":75,"./isLength":77}],77:[function(require,module,exports){
/**
 * Used as the maximum length of an array-like value.
 * See the [ES spec](https://people.mozilla.org/~jorendorff/es6-draft.html#sec-number.max_safe_integer)
 * for more details.
 */
var MAX_SAFE_INTEGER = Math.pow(2, 53) - 1;

/**
 * Checks if `value` is a valid array-like length.
 *
 * **Note:** This function is based on ES `ToLength`. See the
 * [ES spec](https://people.mozilla.org/~jorendorff/es6-draft.html#sec-tolength)
 * for more details.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a valid length, else `false`.
 */
function isLength(value) {
  return typeof value == 'number' && value > -1 && value % 1 == 0 && value <= MAX_SAFE_INTEGER;
}

module.exports = isLength;

},{}],78:[function(require,module,exports){
/**
 * Checks if `value` is object-like.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
 */
function isObjectLike(value) {
  return (value && typeof value == 'object') || false;
}

module.exports = isObjectLike;

},{}],79:[function(require,module,exports){
var isObject = require('../lang/isObject');

/**
 * Checks if `value` is suitable for strict equality comparisons, i.e. `===`.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` if suitable for strict
 *  equality comparisons, else `false`.
 */
function isStrictComparable(value) {
  return value === value && (value === 0 ? ((1 / value) > 0) : !isObject(value));
}

module.exports = isStrictComparable;

},{"../lang/isObject":96}],80:[function(require,module,exports){
var arrayCopy = require('./arrayCopy'),
    composeArgs = require('./composeArgs'),
    composeArgsRight = require('./composeArgsRight'),
    replaceHolders = require('./replaceHolders');

/** Used to compose bitmasks for wrapper metadata. */
var BIND_FLAG = 1,
    BIND_KEY_FLAG = 2,
    CURRY_BOUND_FLAG = 4,
    CURRY_RIGHT_FLAG = 16,
    REARG_FLAG = 128,
    ARY_FLAG = 256;

/** Used as the internal argument placeholder. */
var PLACEHOLDER = '__lodash_placeholder__';

/* Native method references for those with the same name as other `lodash` methods. */
var nativeMin = Math.min;

/**
 * Merges the function metadata of `source` into `data`.
 *
 * Merging metadata reduces the number of wrappers required to invoke a function.
 * This is possible because methods like `_.bind`, `_.curry`, and `_.partial`
 * may be applied regardless of execution order. Methods like `_.ary` and `_.rearg`
 * augment function arguments, making the order in which they are executed important,
 * preventing the merging of metadata. However, we make an exception for a safe
 * common case where curried functions have `_.ary` and or `_.rearg` applied.
 *
 * @private
 * @param {Array} data The destination metadata.
 * @param {Array} source The source metadata.
 * @returns {Array} Returns `data`.
 */
function mergeData(data, source) {
  var bitmask = data[1],
      srcBitmask = source[1],
      newBitmask = bitmask | srcBitmask;

  var arityFlags = ARY_FLAG | REARG_FLAG,
      bindFlags = BIND_FLAG | BIND_KEY_FLAG,
      comboFlags = arityFlags | bindFlags | CURRY_BOUND_FLAG | CURRY_RIGHT_FLAG;

  var isAry = bitmask & ARY_FLAG && !(srcBitmask & ARY_FLAG),
      isRearg = bitmask & REARG_FLAG && !(srcBitmask & REARG_FLAG),
      argPos = (isRearg ? data : source)[7],
      ary = (isAry ? data : source)[8];

  var isCommon = !(bitmask >= REARG_FLAG && srcBitmask > bindFlags) &&
    !(bitmask > bindFlags && srcBitmask >= REARG_FLAG);

  var isCombo = (newBitmask >= arityFlags && newBitmask <= comboFlags) &&
    (bitmask < REARG_FLAG || ((isRearg || isAry) && argPos.length <= ary));

  // Exit early if metadata can't be merged.
  if (!(isCommon || isCombo)) {
    return data;
  }
  // Use source `thisArg` if available.
  if (srcBitmask & BIND_FLAG) {
    data[2] = source[2];
    // Set when currying a bound function.
    newBitmask |= (bitmask & BIND_FLAG) ? 0 : CURRY_BOUND_FLAG;
  }
  // Compose partial arguments.
  var value = source[3];
  if (value) {
    var partials = data[3];
    data[3] = partials ? composeArgs(partials, value, source[4]) : arrayCopy(value);
    data[4] = partials ? replaceHolders(data[3], PLACEHOLDER) : arrayCopy(source[4]);
  }
  // Compose partial right arguments.
  value = source[5];
  if (value) {
    partials = data[5];
    data[5] = partials ? composeArgsRight(partials, value, source[6]) : arrayCopy(value);
    data[6] = partials ? replaceHolders(data[5], PLACEHOLDER) : arrayCopy(source[6]);
  }
  // Use source `argPos` if available.
  value = source[7];
  if (value) {
    data[7] = arrayCopy(value);
  }
  // Use source `ary` if it's smaller.
  if (srcBitmask & ARY_FLAG) {
    data[8] = data[8] == null ? source[8] : nativeMin(data[8], source[8]);
  }
  // Use source `arity` if one is not provided.
  if (data[9] == null) {
    data[9] = source[9];
  }
  // Use source `func` and merge bitmasks.
  data[0] = source[0];
  data[1] = newBitmask;

  return data;
}

module.exports = mergeData;

},{"./arrayCopy":23,"./composeArgs":56,"./composeArgsRight":57,"./replaceHolders":83}],81:[function(require,module,exports){
(function (global){
var isNative = require('../lang/isNative');

/** Native method references. */
var WeakMap = isNative(WeakMap = global.WeakMap) && WeakMap;

/** Used to store function metadata. */
var metaMap = WeakMap && new WeakMap;

module.exports = metaMap;

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"../lang/isNative":94}],82:[function(require,module,exports){
var arrayCopy = require('./arrayCopy'),
    isIndex = require('./isIndex');

/* Native method references for those with the same name as other `lodash` methods. */
var nativeMin = Math.min;

/**
 * Reorder `array` according to the specified indexes where the element at
 * the first index is assigned as the first element, the element at
 * the second index is assigned as the second element, and so on.
 *
 * @private
 * @param {Array} array The array to reorder.
 * @param {Array} indexes The arranged array indexes.
 * @returns {Array} Returns `array`.
 */
function reorder(array, indexes) {
  var arrLength = array.length,
      length = nativeMin(indexes.length, arrLength),
      oldArray = arrayCopy(array);

  while (length--) {
    var index = indexes[length];
    array[length] = isIndex(index, arrLength) ? oldArray[index] : undefined;
  }
  return array;
}

module.exports = reorder;

},{"./arrayCopy":23,"./isIndex":75}],83:[function(require,module,exports){
/** Used as the internal argument placeholder. */
var PLACEHOLDER = '__lodash_placeholder__';

/**
 * Replaces all `placeholder` elements in `array` with an internal placeholder
 * and returns an array of their indexes.
 *
 * @private
 * @param {Array} array The array to modify.
 * @param {*} placeholder The placeholder to replace.
 * @returns {Array} Returns the new array of placeholder indexes.
 */
function replaceHolders(array, placeholder) {
  var index = -1,
      length = array.length,
      resIndex = -1,
      result = [];

  while (++index < length) {
    if (array[index] === placeholder) {
      array[index] = PLACEHOLDER;
      result[++resIndex] = index;
    }
  }
  return result;
}

module.exports = replaceHolders;

},{}],84:[function(require,module,exports){
var baseSetData = require('./baseSetData'),
    now = require('../date/now');

/** Used to detect when a function becomes hot. */
var HOT_COUNT = 150,
    HOT_SPAN = 16;

/**
 * Sets metadata for `func`.
 *
 * **Note:** If this function becomes hot, i.e. is invoked a lot in a short
 * period of time, it will trip its breaker and transition to an identity function
 * to avoid garbage collection pauses in V8. See [V8 issue 2070](https://code.google.com/p/v8/issues/detail?id=2070)
 * for more details.
 *
 * @private
 * @param {Function} func The function to associate metadata with.
 * @param {*} data The metadata.
 * @returns {Function} Returns `func`.
 */
var setData = (function() {
  var count = 0,
      lastCalled = 0;

  return function(key, value) {
    var stamp = now(),
        remaining = HOT_SPAN - (stamp - lastCalled);

    lastCalled = stamp;
    if (remaining > 0) {
      if (++count >= HOT_COUNT) {
        return key;
      }
    } else {
      count = 0;
    }
    return baseSetData(key, value);
  };
}());

module.exports = setData;

},{"../date/now":18,"./baseSetData":47}],85:[function(require,module,exports){
var isArguments = require('../lang/isArguments'),
    isArray = require('../lang/isArray'),
    isIndex = require('./isIndex'),
    isLength = require('./isLength'),
    keysIn = require('../object/keysIn'),
    support = require('../support');

/** Used for native method references. */
var objectProto = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/**
 * A fallback implementation of `Object.keys` which creates an array of the
 * own enumerable property names of `object`.
 *
 * @private
 * @param {Object} object The object to inspect.
 * @returns {Array} Returns the array of property names.
 */
function shimKeys(object) {
  var props = keysIn(object),
      propsLength = props.length,
      length = propsLength && object.length;

  var allowIndexes = length && isLength(length) &&
    (isArray(object) || (support.nonEnumArgs && isArguments(object)));

  var index = -1,
      result = [];

  while (++index < propsLength) {
    var key = props[index];
    if ((allowIndexes && isIndex(key, length)) || hasOwnProperty.call(object, key)) {
      result.push(key);
    }
  }
  return result;
}

module.exports = shimKeys;

},{"../lang/isArguments":89,"../lang/isArray":90,"../object/keysIn":102,"../support":105,"./isIndex":75,"./isLength":77}],86:[function(require,module,exports){
/**
 * An implementation of `_.uniq` optimized for sorted arrays without support
 * for callback shorthands and `this` binding.
 *
 * @private
 * @param {Array} array The array to inspect.
 * @param {Function} [iteratee] The function invoked per iteration.
 * @returns {Array} Returns the new duplicate-value-free array.
 */
function sortedUniq(array, iteratee) {
  var seen,
      index = -1,
      length = array.length,
      resIndex = -1,
      result = [];

  while (++index < length) {
    var value = array[index],
        computed = iteratee ? iteratee(value, index, array) : value;

    if (!index || seen !== computed) {
      seen = computed;
      result[++resIndex] = value;
    }
  }
  return result;
}

module.exports = sortedUniq;

},{}],87:[function(require,module,exports){
var isObject = require('../lang/isObject');

/**
 * Converts `value` to an object if it is not one.
 *
 * @private
 * @param {*} value The value to process.
 * @returns {Object} Returns the object.
 */
function toObject(value) {
  return isObject(value) ? value : Object(value);
}

module.exports = toObject;

},{"../lang/isObject":96}],88:[function(require,module,exports){
var baseClone = require('../internal/baseClone'),
    bindCallback = require('../internal/bindCallback');

/**
 * Creates a deep clone of `value`. If `customizer` is provided it is invoked
 * to produce the cloned values. If `customizer` returns `undefined` cloning
 * is handled by the method instead. The `customizer` is bound to `thisArg`
 * and invoked with two argument; (value [, index|key, object]).
 *
 * **Note:** This method is loosely based on the structured clone algorithm.
 * The enumerable properties of `arguments` objects and objects created by
 * constructors other than `Object` are cloned to plain `Object` objects. An
 * empty object is returned for uncloneable values such as functions, DOM nodes,
 * Maps, Sets, and WeakMaps. See the [HTML5 specification](http://www.w3.org/TR/html5/infrastructure.html#internal-structured-cloning-algorithm)
 * for more details.
 *
 * @static
 * @memberOf _
 * @category Lang
 * @param {*} value The value to deep clone.
 * @param {Function} [customizer] The function to customize cloning values.
 * @param {*} [thisArg] The `this` binding of `customizer`.
 * @returns {*} Returns the deep cloned value.
 * @example
 *
 * var users = [
 *   { 'user': 'barney' },
 *   { 'user': 'fred' }
 * ];
 *
 * var deep = _.cloneDeep(users);
 * deep[0] === users[0];
 * // => false
 *
 * // using a customizer callback
 * var el = _.cloneDeep(document.body, function(value) {
 *   if (_.isElement(value)) {
 *     return value.cloneNode(true);
 *   }
 * });
 *
 * el === document.body
 * // => false
 * el.nodeName
 * // => BODY
 * el.childNodes.length;
 * // => 20
 */
function cloneDeep(value, customizer, thisArg) {
  customizer = typeof customizer == 'function' && bindCallback(customizer, thisArg, 1);
  return baseClone(value, true, customizer);
}

module.exports = cloneDeep;

},{"../internal/baseClone":29,"../internal/bindCallback":52}],89:[function(require,module,exports){
var isLength = require('../internal/isLength'),
    isObjectLike = require('../internal/isObjectLike');

/** `Object#toString` result references. */
var argsTag = '[object Arguments]';

/** Used for native method references. */
var objectProto = Object.prototype;

/**
 * Used to resolve the `toStringTag` of values.
 * See the [ES spec](https://people.mozilla.org/~jorendorff/es6-draft.html#sec-object.prototype.tostring)
 * for more details.
 */
var objToString = objectProto.toString;

/**
 * Checks if `value` is classified as an `arguments` object.
 *
 * @static
 * @memberOf _
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is correctly classified, else `false`.
 * @example
 *
 * _.isArguments(function() { return arguments; }());
 * // => true
 *
 * _.isArguments([1, 2, 3]);
 * // => false
 */
function isArguments(value) {
  var length = isObjectLike(value) ? value.length : undefined;
  return (isLength(length) && objToString.call(value) == argsTag) || false;
}

module.exports = isArguments;

},{"../internal/isLength":77,"../internal/isObjectLike":78}],90:[function(require,module,exports){
var isLength = require('../internal/isLength'),
    isNative = require('./isNative'),
    isObjectLike = require('../internal/isObjectLike');

/** `Object#toString` result references. */
var arrayTag = '[object Array]';

/** Used for native method references. */
var objectProto = Object.prototype;

/**
 * Used to resolve the `toStringTag` of values.
 * See the [ES spec](https://people.mozilla.org/~jorendorff/es6-draft.html#sec-object.prototype.tostring)
 * for more details.
 */
var objToString = objectProto.toString;

/* Native method references for those with the same name as other `lodash` methods. */
var nativeIsArray = isNative(nativeIsArray = Array.isArray) && nativeIsArray;

/**
 * Checks if `value` is classified as an `Array` object.
 *
 * @static
 * @memberOf _
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is correctly classified, else `false`.
 * @example
 *
 * _.isArray([1, 2, 3]);
 * // => true
 *
 * _.isArray(function() { return arguments; }());
 * // => false
 */
var isArray = nativeIsArray || function(value) {
  return (isObjectLike(value) && isLength(value.length) && objToString.call(value) == arrayTag) || false;
};

module.exports = isArray;

},{"../internal/isLength":77,"../internal/isObjectLike":78,"./isNative":94}],91:[function(require,module,exports){
var isObjectLike = require('../internal/isObjectLike');

/** `Object#toString` result references. */
var boolTag = '[object Boolean]';

/** Used for native method references. */
var objectProto = Object.prototype;

/**
 * Used to resolve the `toStringTag` of values.
 * See the [ES spec](https://people.mozilla.org/~jorendorff/es6-draft.html#sec-object.prototype.tostring)
 * for more details.
 */
var objToString = objectProto.toString;

/**
 * Checks if `value` is classified as a boolean primitive or object.
 *
 * @static
 * @memberOf _
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is correctly classified, else `false`.
 * @example
 *
 * _.isBoolean(false);
 * // => true
 *
 * _.isBoolean(null);
 * // => false
 */
function isBoolean(value) {
  return (value === true || value === false || isObjectLike(value) && objToString.call(value) == boolTag) || false;
}

module.exports = isBoolean;

},{"../internal/isObjectLike":78}],92:[function(require,module,exports){
var baseIsEqual = require('../internal/baseIsEqual'),
    bindCallback = require('../internal/bindCallback'),
    isStrictComparable = require('../internal/isStrictComparable');

/**
 * Performs a deep comparison between two values to determine if they are
 * equivalent. If `customizer` is provided it is invoked to compare values.
 * If `customizer` returns `undefined` comparisons are handled by the method
 * instead. The `customizer` is bound to `thisArg` and invoked with three
 * arguments; (value, other [, index|key]).
 *
 * **Note:** This method supports comparing arrays, booleans, `Date` objects,
 * numbers, `Object` objects, regexes, and strings. Objects are compared by
 * their own, not inherited, enumerable properties. Functions and DOM nodes
 * are **not** supported. Provide a customizer function to extend support
 * for comparing other values.
 *
 * @static
 * @memberOf _
 * @category Lang
 * @param {*} value The value to compare.
 * @param {*} other The other value to compare.
 * @param {Function} [customizer] The function to customize comparing values.
 * @param {*} [thisArg] The `this` binding of `customizer`.
 * @returns {boolean} Returns `true` if the values are equivalent, else `false`.
 * @example
 *
 * var object = { 'user': 'fred' };
 * var other = { 'user': 'fred' };
 *
 * object == other;
 * // => false
 *
 * _.isEqual(object, other);
 * // => true
 *
 * // using a customizer callback
 * var array = ['hello', 'goodbye'];
 * var other = ['hi', 'goodbye'];
 *
 * _.isEqual(array, other, function(value, other) {
 *   if (_.every([value, other], RegExp.prototype.test, /^h(?:i|ello)$/)) {
 *     return true;
 *   }
 * });
 * // => true
 */
function isEqual(value, other, customizer, thisArg) {
  customizer = typeof customizer == 'function' && bindCallback(customizer, thisArg, 3);
  if (!customizer && isStrictComparable(value) && isStrictComparable(other)) {
    return value === other;
  }
  var result = customizer ? customizer(value, other) : undefined;
  return typeof result == 'undefined' ? baseIsEqual(value, other, customizer) : !!result;
}

module.exports = isEqual;

},{"../internal/baseIsEqual":39,"../internal/bindCallback":52,"../internal/isStrictComparable":79}],93:[function(require,module,exports){
(function (global){
var baseIsFunction = require('../internal/baseIsFunction'),
    isNative = require('./isNative');

/** `Object#toString` result references. */
var funcTag = '[object Function]';

/** Used for native method references. */
var objectProto = Object.prototype;

/**
 * Used to resolve the `toStringTag` of values.
 * See the [ES spec](https://people.mozilla.org/~jorendorff/es6-draft.html#sec-object.prototype.tostring)
 * for more details.
 */
var objToString = objectProto.toString;

/** Native method references. */
var Uint8Array = isNative(Uint8Array = global.Uint8Array) && Uint8Array;

/**
 * Checks if `value` is classified as a `Function` object.
 *
 * @static
 * @memberOf _
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is correctly classified, else `false`.
 * @example
 *
 * _.isFunction(_);
 * // => true
 *
 * _.isFunction(/abc/);
 * // => false
 */
var isFunction = !(baseIsFunction(/x/) || (Uint8Array && !baseIsFunction(Uint8Array))) ? baseIsFunction : function(value) {
  // The use of `Object#toString` avoids issues with the `typeof` operator
  // in older versions of Chrome and Safari which return 'function' for regexes
  // and Safari 8 equivalents which return 'object' for typed array constructors.
  return objToString.call(value) == funcTag;
};

module.exports = isFunction;

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"../internal/baseIsFunction":41,"./isNative":94}],94:[function(require,module,exports){
var escapeRegExp = require('../string/escapeRegExp'),
    isObjectLike = require('../internal/isObjectLike');

/** `Object#toString` result references. */
var funcTag = '[object Function]';

/** Used to detect host constructors (Safari > 5). */
var reHostCtor = /^\[object .+?Constructor\]$/;

/** Used for native method references. */
var objectProto = Object.prototype;

/** Used to resolve the decompiled source of functions. */
var fnToString = Function.prototype.toString;

/**
 * Used to resolve the `toStringTag` of values.
 * See the [ES spec](https://people.mozilla.org/~jorendorff/es6-draft.html#sec-object.prototype.tostring)
 * for more details.
 */
var objToString = objectProto.toString;

/** Used to detect if a method is native. */
var reNative = RegExp('^' +
  escapeRegExp(objToString)
  .replace(/toString|(function).*?(?=\\\()| for .+?(?=\\\])/g, '$1.*?') + '$'
);

/**
 * Checks if `value` is a native function.
 *
 * @static
 * @memberOf _
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a native function, else `false`.
 * @example
 *
 * _.isNative(Array.prototype.push);
 * // => true
 *
 * _.isNative(_);
 * // => false
 */
function isNative(value) {
  if (value == null) {
    return false;
  }
  if (objToString.call(value) == funcTag) {
    return reNative.test(fnToString.call(value));
  }
  return (isObjectLike(value) && reHostCtor.test(value)) || false;
}

module.exports = isNative;

},{"../internal/isObjectLike":78,"../string/escapeRegExp":104}],95:[function(require,module,exports){
var isObjectLike = require('../internal/isObjectLike');

/** `Object#toString` result references. */
var numberTag = '[object Number]';

/** Used for native method references. */
var objectProto = Object.prototype;

/**
 * Used to resolve the `toStringTag` of values.
 * See the [ES spec](https://people.mozilla.org/~jorendorff/es6-draft.html#sec-object.prototype.tostring)
 * for more details.
 */
var objToString = objectProto.toString;

/**
 * Checks if `value` is classified as a `Number` primitive or object.
 *
 * **Note:** To exclude `Infinity`, `-Infinity`, and `NaN`, which are classified
 * as numbers, use the `_.isFinite` method.
 *
 * @static
 * @memberOf _
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is correctly classified, else `false`.
 * @example
 *
 * _.isNumber(8.4);
 * // => true
 *
 * _.isNumber(NaN);
 * // => true
 *
 * _.isNumber('8.4');
 * // => false
 */
function isNumber(value) {
  return typeof value == 'number' || (isObjectLike(value) && objToString.call(value) == numberTag) || false;
}

module.exports = isNumber;

},{"../internal/isObjectLike":78}],96:[function(require,module,exports){
/**
 * Checks if `value` is the language type of `Object`.
 * (e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`)
 *
 * **Note:** See the [ES5 spec](https://es5.github.io/#x8) for more details.
 *
 * @static
 * @memberOf _
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an object, else `false`.
 * @example
 *
 * _.isObject({});
 * // => true
 *
 * _.isObject([1, 2, 3]);
 * // => true
 *
 * _.isObject(1);
 * // => false
 */
function isObject(value) {
  // Avoid a V8 JIT bug in Chrome 19-20.
  // See https://code.google.com/p/v8/issues/detail?id=2291 for more details.
  var type = typeof value;
  return type == 'function' || (value && type == 'object') || false;
}

module.exports = isObject;

},{}],97:[function(require,module,exports){
var isObjectLike = require('../internal/isObjectLike');

/** `Object#toString` result references. */
var stringTag = '[object String]';

/** Used for native method references. */
var objectProto = Object.prototype;

/**
 * Used to resolve the `toStringTag` of values.
 * See the [ES spec](https://people.mozilla.org/~jorendorff/es6-draft.html#sec-object.prototype.tostring)
 * for more details.
 */
var objToString = objectProto.toString;

/**
 * Checks if `value` is classified as a `String` primitive or object.
 *
 * @static
 * @memberOf _
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is correctly classified, else `false`.
 * @example
 *
 * _.isString('abc');
 * // => true
 *
 * _.isString(1);
 * // => false
 */
function isString(value) {
  return typeof value == 'string' || (isObjectLike(value) && objToString.call(value) == stringTag) || false;
}

module.exports = isString;

},{"../internal/isObjectLike":78}],98:[function(require,module,exports){
var isLength = require('../internal/isLength'),
    isObjectLike = require('../internal/isObjectLike');

/** `Object#toString` result references. */
var argsTag = '[object Arguments]',
    arrayTag = '[object Array]',
    boolTag = '[object Boolean]',
    dateTag = '[object Date]',
    errorTag = '[object Error]',
    funcTag = '[object Function]',
    mapTag = '[object Map]',
    numberTag = '[object Number]',
    objectTag = '[object Object]',
    regexpTag = '[object RegExp]',
    setTag = '[object Set]',
    stringTag = '[object String]',
    weakMapTag = '[object WeakMap]';

var arrayBufferTag = '[object ArrayBuffer]',
    float32Tag = '[object Float32Array]',
    float64Tag = '[object Float64Array]',
    int8Tag = '[object Int8Array]',
    int16Tag = '[object Int16Array]',
    int32Tag = '[object Int32Array]',
    uint8Tag = '[object Uint8Array]',
    uint8ClampedTag = '[object Uint8ClampedArray]',
    uint16Tag = '[object Uint16Array]',
    uint32Tag = '[object Uint32Array]';

/** Used to identify `toStringTag` values of typed arrays. */
var typedArrayTags = {};
typedArrayTags[float32Tag] = typedArrayTags[float64Tag] =
typedArrayTags[int8Tag] = typedArrayTags[int16Tag] =
typedArrayTags[int32Tag] = typedArrayTags[uint8Tag] =
typedArrayTags[uint8ClampedTag] = typedArrayTags[uint16Tag] =
typedArrayTags[uint32Tag] = true;
typedArrayTags[argsTag] = typedArrayTags[arrayTag] =
typedArrayTags[arrayBufferTag] = typedArrayTags[boolTag] =
typedArrayTags[dateTag] = typedArrayTags[errorTag] =
typedArrayTags[funcTag] = typedArrayTags[mapTag] =
typedArrayTags[numberTag] = typedArrayTags[objectTag] =
typedArrayTags[regexpTag] = typedArrayTags[setTag] =
typedArrayTags[stringTag] = typedArrayTags[weakMapTag] = false;

/** Used for native method references. */
var objectProto = Object.prototype;

/**
 * Used to resolve the `toStringTag` of values.
 * See the [ES spec](https://people.mozilla.org/~jorendorff/es6-draft.html#sec-object.prototype.tostring)
 * for more details.
 */
var objToString = objectProto.toString;

/**
 * Checks if `value` is classified as a typed array.
 *
 * @static
 * @memberOf _
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is correctly classified, else `false`.
 * @example
 *
 * _.isTypedArray(new Uint8Array);
 * // => true
 *
 * _.isTypedArray([]);
 * // => false
 */
function isTypedArray(value) {
  return (isObjectLike(value) && isLength(value.length) && typedArrayTags[objToString.call(value)]) || false;
}

module.exports = isTypedArray;

},{"../internal/isLength":77,"../internal/isObjectLike":78}],99:[function(require,module,exports){
var baseAssign = require('../internal/baseAssign'),
    createAssigner = require('../internal/createAssigner');

/**
 * Assigns own enumerable properties of source object(s) to the destination
 * object. Subsequent sources overwrite property assignments of previous sources.
 * If `customizer` is provided it is invoked to produce the assigned values.
 * The `customizer` is bound to `thisArg` and invoked with five arguments;
 * (objectValue, sourceValue, key, object, source).
 *
 * @static
 * @memberOf _
 * @alias extend
 * @category Object
 * @param {Object} object The destination object.
 * @param {...Object} [sources] The source objects.
 * @param {Function} [customizer] The function to customize assigning values.
 * @param {*} [thisArg] The `this` binding of `customizer`.
 * @returns {Object} Returns `object`.
 * @example
 *
 * _.assign({ 'user': 'barney' }, { 'age': 40 }, { 'user': 'fred' });
 * // => { 'user': 'fred', 'age': 40 }
 *
 * // using a customizer callback
 * var defaults = _.partialRight(_.assign, function(value, other) {
 *   return typeof value == 'undefined' ? other : value;
 * });
 *
 * defaults({ 'user': 'barney' }, { 'age': 36 }, { 'user': 'fred' });
 * // => { 'user': 'barney', 'age': 36 }
 */
var assign = createAssigner(baseAssign);

module.exports = assign;

},{"../internal/baseAssign":27,"../internal/createAssigner":59}],100:[function(require,module,exports){
module.exports = require('./assign');

},{"./assign":99}],101:[function(require,module,exports){
var isLength = require('../internal/isLength'),
    isNative = require('../lang/isNative'),
    isObject = require('../lang/isObject'),
    shimKeys = require('../internal/shimKeys');

/* Native method references for those with the same name as other `lodash` methods. */
var nativeKeys = isNative(nativeKeys = Object.keys) && nativeKeys;

/**
 * Creates an array of the own enumerable property names of `object`.
 *
 * **Note:** Non-object values are coerced to objects. See the
 * [ES spec](https://people.mozilla.org/~jorendorff/es6-draft.html#sec-object.keys)
 * for more details.
 *
 * @static
 * @memberOf _
 * @category Object
 * @param {Object} object The object to inspect.
 * @returns {Array} Returns the array of property names.
 * @example
 *
 * function Foo() {
 *   this.a = 1;
 *   this.b = 2;
 * }
 *
 * Foo.prototype.c = 3;
 *
 * _.keys(new Foo);
 * // => ['a', 'b'] (iteration order is not guaranteed)
 *
 * _.keys('hi');
 * // => ['0', '1']
 */
var keys = !nativeKeys ? shimKeys : function(object) {
  if (object) {
    var Ctor = object.constructor,
        length = object.length;
  }
  if ((typeof Ctor == 'function' && Ctor.prototype === object) ||
     (typeof object != 'function' && (length && isLength(length)))) {
    return shimKeys(object);
  }
  return isObject(object) ? nativeKeys(object) : [];
};

module.exports = keys;

},{"../internal/isLength":77,"../internal/shimKeys":85,"../lang/isNative":94,"../lang/isObject":96}],102:[function(require,module,exports){
var isArguments = require('../lang/isArguments'),
    isArray = require('../lang/isArray'),
    isIndex = require('../internal/isIndex'),
    isLength = require('../internal/isLength'),
    isObject = require('../lang/isObject'),
    support = require('../support');

/** Used for native method references. */
var objectProto = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/**
 * Creates an array of the own and inherited enumerable property names of `object`.
 *
 * **Note:** Non-object values are coerced to objects.
 *
 * @static
 * @memberOf _
 * @category Object
 * @param {Object} object The object to inspect.
 * @returns {Array} Returns the array of property names.
 * @example
 *
 * function Foo() {
 *   this.a = 1;
 *   this.b = 2;
 * }
 *
 * Foo.prototype.c = 3;
 *
 * _.keysIn(new Foo);
 * // => ['a', 'b', 'c'] (iteration order is not guaranteed)
 */
function keysIn(object) {
  if (object == null) {
    return [];
  }
  if (!isObject(object)) {
    object = Object(object);
  }
  var length = object.length;
  length = (length && isLength(length) &&
    (isArray(object) || (support.nonEnumArgs && isArguments(object))) && length) || 0;

  var Ctor = object.constructor,
      index = -1,
      isProto = typeof Ctor == 'function' && Ctor.prototype === object,
      result = Array(length),
      skipIndexes = length > 0;

  while (++index < length) {
    result[index] = (index + '');
  }
  for (var key in object) {
    if (!(skipIndexes && isIndex(key, length)) &&
        !(key == 'constructor' && (isProto || !hasOwnProperty.call(object, key)))) {
      result.push(key);
    }
  }
  return result;
}

module.exports = keysIn;

},{"../internal/isIndex":75,"../internal/isLength":77,"../lang/isArguments":89,"../lang/isArray":90,"../lang/isObject":96,"../support":105}],103:[function(require,module,exports){
var baseValues = require('../internal/baseValues'),
    keys = require('./keys');

/**
 * Creates an array of the own enumerable property values of `object`.
 *
 * **Note:** Non-object values are coerced to objects.
 *
 * @static
 * @memberOf _
 * @category Object
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of property values.
 * @example
 *
 * function Foo() {
 *   this.a = 1;
 *   this.b = 2;
 * }
 *
 * Foo.prototype.c = 3;
 *
 * _.values(new Foo);
 * // => [1, 2] (iteration order is not guaranteed)
 *
 * _.values('hi');
 * // => ['h', 'i']
 */
function values(object) {
  return baseValues(object, keys(object));
}

module.exports = values;

},{"../internal/baseValues":51,"./keys":101}],104:[function(require,module,exports){
var baseToString = require('../internal/baseToString');

/**
 * Used to match `RegExp` special characters.
 * See this [article on `RegExp` characters](http://www.regular-expressions.info/characters.html#special)
 * for more details.
 */
var reRegExpChars = /[.*+?^${}()|[\]\/\\]/g,
    reHasRegExpChars = RegExp(reRegExpChars.source);

/**
 * Escapes the `RegExp` special characters "\", "^", "$", ".", "|", "?", "*",
 * "+", "(", ")", "[", "]", "{" and "}" in `string`.
 *
 * @static
 * @memberOf _
 * @category String
 * @param {string} [string=''] The string to escape.
 * @returns {string} Returns the escaped string.
 * @example
 *
 * _.escapeRegExp('[lodash](https://lodash.com/)');
 * // => '\[lodash\]\(https://lodash\.com/\)'
 */
function escapeRegExp(string) {
  string = baseToString(string);
  return (string && reHasRegExpChars.test(string))
    ? string.replace(reRegExpChars, '\\$&')
    : string;
}

module.exports = escapeRegExp;

},{"../internal/baseToString":49}],105:[function(require,module,exports){
(function (global){
var isNative = require('./lang/isNative');

/** Used to detect functions containing a `this` reference. */
var reThis = /\bthis\b/;

/** Used for native method references. */
var objectProto = Object.prototype;

/** Used to detect DOM support. */
var document = (document = global.window) && document.document;

/** Native method references. */
var propertyIsEnumerable = objectProto.propertyIsEnumerable;

/**
 * An object environment feature flags.
 *
 * @static
 * @memberOf _
 * @type Object
 */
var support = {};

(function(x) {

  /**
   * Detect if functions can be decompiled by `Function#toString`
   * (all but Firefox OS certified apps, older Opera mobile browsers, and
   * the PlayStation 3; forced `false` for Windows 8 apps).
   *
   * @memberOf _.support
   * @type boolean
   */
  support.funcDecomp = !isNative(global.WinRTError) && reThis.test(function() { return this; });

  /**
   * Detect if `Function#name` is supported (all but IE).
   *
   * @memberOf _.support
   * @type boolean
   */
  support.funcNames = typeof Function.name == 'string';

  /**
   * Detect if the DOM is supported.
   *
   * @memberOf _.support
   * @type boolean
   */
  try {
    support.dom = document.createDocumentFragment().nodeType === 11;
  } catch(e) {
    support.dom = false;
  }

  /**
   * Detect if `arguments` object indexes are non-enumerable.
   *
   * In Firefox < 4, IE < 9, PhantomJS, and Safari < 5.1 `arguments` object
   * indexes are non-enumerable. Chrome < 25 and Node.js < 0.11.0 treat
   * `arguments` object indexes as non-enumerable and fail `hasOwnProperty`
   * checks for indexes that exceed their function's formal parameters with
   * associated values of `0`.
   *
   * @memberOf _.support
   * @type boolean
   */
  try {
    support.nonEnumArgs = !propertyIsEnumerable.call(arguments, 1);
  } catch(e) {
    support.nonEnumArgs = true;
  }
}(0, 0));

module.exports = support;

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"./lang/isNative":94}],106:[function(require,module,exports){
/**
 * Creates a function that returns `value`.
 *
 * @static
 * @memberOf _
 * @category Utility
 * @param {*} value The value to return from the new function.
 * @returns {Function} Returns the new function.
 * @example
 *
 * var object = { 'user': 'fred' };
 * var getter = _.constant(object);
 *
 * getter() === object;
 * // => true
 */
function constant(value) {
  return function() {
    return value;
  };
}

module.exports = constant;

},{}],107:[function(require,module,exports){
/**
 * This method returns the first argument provided to it.
 *
 * @static
 * @memberOf _
 * @category Utility
 * @param {*} value Any value.
 * @returns {*} Returns `value`.
 * @example
 *
 * var object = { 'user': 'fred' };
 *
 * _.identity(object) === object;
 * // => true
 */
function identity(value) {
  return value;
}

module.exports = identity;

},{}],108:[function(require,module,exports){
/**
 * A no-operation function which returns `undefined` regardless of the
 * arguments it receives.
 *
 * @static
 * @memberOf _
 * @category Utility
 * @example
 *
 * var object = { 'user': 'fred' };
 *
 * _.noop(object) === undefined;
 * // => true
 */
function noop() {
  // No operation performed.
}

module.exports = noop;

},{}],109:[function(require,module,exports){
"use strict";

var Substance = require('../basics');
var Document = require('../document');

var CoreModule = require("./nodes");
var Reference = require("./nodes/reference");

var schema = new Document.Schema("substance-article", "1.0.0");
schema.addNodes(CoreModule.nodes);

var Article = function(data) {
  Document.call(this, schema, data);
  CoreModule.initialize(this);
};

// Don't do that here, it is application level stuff
// you could provide such a module in writer instead
// Also remember, that this is not 'core', it is substance-article specific
Article.CoreModule = CoreModule;

Article.nodes = {};
Article.nodes.Reference = Reference;

Substance.inherit(Article, Document);

Article.schema = schema;

// TODO: it is not clear how this should be done
// IMO it is not very useful to extend the Article, so it should be enough
// to expose certain nodes so that other implementations can use them.
Article.Paragraph = require('./nodes/paragraph');

module.exports = Article;

},{"../basics":122,"../document":150,"./nodes":113,"./nodes/paragraph":115,"./nodes/reference":116}],110:[function(require,module,exports){
var Article = require("./article");

module.exports = Article;
},{"./article":109}],111:[function(require,module,exports){
var Document = require('../../document');

var DocumentNode = Document.Node.extend({
  name: "document",
  properties: {
    "guid": "string",
    "creator": "string",
    "title": "string",
    "abstract": "string"
  }
});

module.exports = DocumentNode;
},{"../../document":150}],112:[function(require,module,exports){
var Document = require('../../document');

var Emphasis = Document.Annotation.extend({
  name: "emphasis"
});

// Html import
// -----------

Emphasis.static.matchElement = function(el) {
  var tagName = el.tagName.toLowerCase();
  return (tagName === 'i' || tagName === 'em');
};

module.exports = Emphasis;

},{"../../document":150}],113:[function(require,module,exports){
var DocumentNode = require("./document_node");
var Strong = require("./strong");
var Emphasis = require("./emphasis");
var Reference = require("./reference");
var initialize = require("./initialize");

module.exports = {
  nodes: [DocumentNode, Reference, Strong, Emphasis],
  initialize: initialize
};
},{"./document_node":111,"./emphasis":112,"./initialize":114,"./reference":116,"./strong":117}],114:[function(require,module,exports){
var Data = require('../../data');

function initialize(doc) {
  doc.references = doc.addIndex('referenceByTarget', Data.Index.create({
    type: "reference",
    property: "target"
  }));
}

module.exports = initialize;

},{"../../data":129}],115:[function(require,module,exports){
var Substance = require('../../basics');
var Document = require('../../document');

var Paragraph = Document.TextNode.extend({
  name: "paragraph"
});

// Html import
// -----------

Paragraph.static.blockType = true;

Paragraph.static.matchElement = function(el) {
  var tagName = el.tagName.toLowerCase();
  return (tagName === 'p');
};

Paragraph.static.fromHtml = function(el, converter) {
  var paragraph = {
    id: el.dataset.id || Substance.uuid('paragraph'),
    content: ''
  };
  paragraph.content = converter.annotatedText(el, [paragraph.id, 'content']);
  return paragraph;
};

module.exports = Paragraph;

},{"../../basics":122,"../../document":150}],116:[function(require,module,exports){
var Document = require('../../document');

var Reference = Document.Annotation.extend({
  name: "reference"
});

module.exports = Reference;
},{"../../document":150}],117:[function(require,module,exports){
var Document = require('../../document');

var Strong = Document.Annotation.extend({
  name: "strong"
});

Strong.static.matchElement = function(el) {
  var tagName = el.tagName.toLowerCase();
  return (tagName === 'b' || tagName === 'strong');
};

module.exports = Strong;

},{"../../document":150}],118:[function(require,module,exports){
'use strict';

var oo = require('./oo');

function SubstanceError() {
  Error.apply(this, arguments);
};

SubstanceError.Prototype = function() {
};

oo.inherit(SubstanceError, Error);

module.exports = SubstanceError;

},{"./oo":123}],119:[function(require,module,exports){
'use strict';

var oo = require("./oo");

function EventEmitter() {
  this.__events__ = {};
}

EventEmitter.Prototype = function() {

  function validateMethod( method, context ) {
    // Validate method and context
    if ( typeof method === 'string' ) {
      // Validate method
      if ( context === undefined || context === null ) {
        throw new Error( 'Method name "' + method + '" has no context.' );
      }
      if ( !( method in context ) ) {
        // Technically the method does not need to exist yet: it could be
        // added before call time. But this probably signals a typo.
        throw new Error( 'Method not found: "' + method + '"' );
      }
      if ( typeof context[method] !== 'function' ) {
        // Technically the property could be replaced by a function before
        // call time. But this probably signals a typo.
        throw new Error( 'Property "' + method + '" is not a function' );
      }
    } else if ( typeof method !== 'function' ) {
      throw new Error( 'Invalid callback. Function or method name expected.' );
    }
  }

  this.on = function ( event, method, args, context ) {
    var bindings;

    validateMethod( method, context );

    if ( this.__events__.hasOwnProperty( event ) ) {
      bindings = this.__events__[event];
    } else {
      // Auto-initialize bindings list
      bindings = this.__events__[event] = [];
    }
    // Add binding
    bindings.push( {
      method: method,
      args: args,
      context: ( arguments.length < 4 ) ? null : context
    } );
    return this;
  };

  this.once = function ( event, listener ) {
    var eventEmitter = this;
    var listenerWrapper = function () {
      eventEmitter.off( event, listenerWrapper );
      listener.apply( eventEmitter, Array.prototype.slice.call( arguments, 0 ) );
    };
    return this.on( event, listenerWrapper );
  };

  this.off = function ( event, method, context ) {
    var i, bindings;

    if ( arguments.length === 1 ) {
      // Remove all bindings for event
      delete this.__events__[event];
      return this;
    }

    validateMethod( method, context );

    if ( !( event in this.__events__ ) || !this.__events__[event].length ) {
      // No matching bindings
      return this;
    }

    // Default to null context
    if ( arguments.length < 3 ) {
      context = null;
    }

    // Remove matching handlers
    bindings = this.__events__[event];
    i = bindings.length;
    while ( i-- ) {
      if ( bindings[i].method === method && bindings[i].context === context ) {
        bindings.splice( i, 1 );
      }
    }

    // Cleanup if now empty
    if ( bindings.length === 0 ) {
      delete this.__events__[event];
    }
    return this;
  };

  this.emit = function ( event ) {
    var i, len, binding, bindings, args, method;

    if ( event in this.__events__ ) {
      // Slicing ensures that we don't get tripped up by event handlers that add/remove bindings
      bindings = this.__events__[event].slice();
      args = Array.prototype.slice.call( arguments, 1 );
      for ( i = 0, len = bindings.length; i < len; i++ ) {
        binding = bindings[i];
        if ( typeof binding.method === 'string' ) {
          // Lookup method by name (late binding)
          method = binding.context[ binding.method ];
        } else {
          method = binding.method;
        }
        method.apply(
          binding.context,
          binding.args ? binding.args.concat( args ) : args
        );
      }
      return true;
    }
    return false;
  };

  this.connect = function ( context, methods ) {
    var method, args, event;

    for ( event in methods ) {
      method = methods[event];
      // Allow providing additional args
      if ( Array.isArray( method ) ) {
        args = method.slice( 1 );
        method = method[0];
      } else {
        args = [];
      }
      // Add binding
      this.on( event, method, args, context );
    }
    return this;
  };

  this.disconnect = function ( context, methods ) {
    var i, event, bindings;

    if ( methods ) {
      // Remove specific connections to the context
      for ( event in methods ) {
        this.off( event, methods[event], context );
      }
    } else {
      // Remove all connections to the context
      for ( event in this.__events__ ) {
        bindings = this.__events__[event];
        i = bindings.length;
        while ( i-- ) {
          // bindings[i] may have been removed by the previous step's
          // this.off so check it still exists
          if ( bindings[i] && bindings[i].context === context ) {
            this.off( event, bindings[i].method, context );
          }
        }
      }
    }

    return this;
  };
};

oo.initClass( EventEmitter );

module.exports = EventEmitter;

},{"./oo":123}],120:[function(require,module,exports){
'use strict';

var oo = require('./oo');
var Registry = require('./registry');

function Factory() {
  Factory.super.call(this);
}

Factory.Prototype = function() {

  this.create = function ( name ) {
    var constructor = this.get(name);
    if ( !constructor ) {
      throw new Error( 'No class registered by that name: ' + name );
    }
    // call the constructor providing the remaining arguments
    var args = Array.prototype.slice.call( arguments, 1 );
    var obj = Object.create( constructor.prototype );
    constructor.apply( obj, args );
    return obj;
  };

};

oo.inherit(Factory, Registry);

module.exports = Factory;

},{"./oo":123,"./registry":125}],121:[function(require,module,exports){
'use strict';

var Substance = {};

// Lang helpers
Substance.isEqual = require('lodash/lang/isEqual');
Substance.isObject = require('lodash/lang/isObject');
Substance.isArray = require('lodash/lang/isArray');
Substance.isString = require('lodash/lang/isString');
Substance.isNumber = require('lodash/lang/isNumber');
Substance.isBoolean = require('lodash/lang/isBoolean');
Substance.isFunction = require('lodash/lang/isFunction');
Substance.cloneDeep = require('lodash/lang/cloneDeep');

// Function helpers
Substance.bind = require('lodash/function/bind');
Substance.delay = require('lodash/function/delay');
Substance.debounce = require('lodash/function/debounce');

// Object helpers
Substance.extend = require('lodash/object/extend');

// Array helpers
Substance.last = require('lodash/array/last');
Substance.first = require('lodash/array/first');
Substance.compact = require('lodash/array/compact');
Substance.uniq = require('lodash/array/uniq');
Substance.intersection = require('lodash/array/intersection');
Substance.union = require('lodash/array/union');

// Collection helpers
Substance.each = require('lodash/collection/forEach');
Substance.filter = require('lodash/collection/filter');
Substance.includes = require('lodash/collection/includes');
Substance.map = require('lodash/collection/map');
Substance.pluck = require('lodash/collection/pluck');
Substance.indexBy = require('lodash/collection/indexBy');

Substance.isArrayEqual = function(a, b) {
  if (a === b) return true;
  if (a === null || b === null) return false;
  if (a.length != b.length) return false;
  for (var i = 0; i < a.length; ++i) {
    if (a[i] !== b[i]) return false;
  }
  return true;
};

// Removes all occurrence of value in array using Array.splice
// I.e., this changes the array instead of creating a new one
// as _.without() does.
Substance.deleteFromArray = function(array, value) {
  for (var i = 0; i < array.length; i++) {
    if (array[i] === value) {
      array.splice(i, 1);
      i--;
    }
  }
};

Substance.clone = function(obj) {
  if (obj === null || obj === undefined) {
    return obj;
  }
  if (Substance.isFunction(obj.clone)) {
    return obj.clone();
  }
  return Substance.deepclone(obj);
};

Substance.deepclone = Substance.cloneDeep;

module.exports = Substance;

},{"lodash/array/compact":6,"lodash/array/first":7,"lodash/array/intersection":8,"lodash/array/last":9,"lodash/array/union":10,"lodash/array/uniq":11,"lodash/collection/filter":12,"lodash/collection/forEach":13,"lodash/collection/includes":14,"lodash/collection/indexBy":15,"lodash/collection/map":16,"lodash/collection/pluck":17,"lodash/function/bind":19,"lodash/function/debounce":20,"lodash/function/delay":21,"lodash/lang/cloneDeep":88,"lodash/lang/isArray":90,"lodash/lang/isBoolean":91,"lodash/lang/isEqual":92,"lodash/lang/isFunction":93,"lodash/lang/isNumber":95,"lodash/lang/isObject":96,"lodash/lang/isString":97,"lodash/object/extend":100}],122:[function(require,module,exports){
'use strict';

var uuid = require('./uuid');
var oo = require('./oo');
var PathAdapter = require('./path_adapter');
var EventEmitter = require('./event_emitter');
var SubstanceError = require('./error');
var Registry = require('./registry');
var Factory = require('./factory');

var Substance = require('./helpers');

Substance.uuid = uuid;

Substance.initClass = oo.initClass;

Substance.inherit = oo.inherit;
Substance.inheritClass = oo.inheritClass;

Substance.mixin = oo.mixin;
Substance.mixinClass = oo.mixinClass;

Substance.PathAdapter = PathAdapter;

Substance.EventEmitter = EventEmitter;

Substance.Error = SubstanceError;

Substance.Registry = Registry;
Substance.Factory = Factory;

module.exports = Substance;

},{"./error":118,"./event_emitter":119,"./factory":120,"./helpers":121,"./oo":123,"./path_adapter":124,"./registry":125,"./uuid":126}],123:[function(require,module,exports){
'use strict';

var _ = require('./helpers');
var extend;

function initClass(fn) {
  if ( fn.Prototype && !(fn.prototype instanceof fn.Prototype) ) {
    fn.prototype = new fn.Prototype();
    fn.prototype.constructor = fn;
  }
  fn.static = fn.static || {};
  fn.extend = fn.extend || _.bind(extend, null, fn);
}

function inherit(targetFn, originFn) {
  if ( targetFn.prototype instanceof originFn ) {
    throw new Error( 'Target already inherits from origin' );
  }
  var targetConstructor = targetFn.prototype.constructor;
  // Customization: supporting a prototype constructor function
  // defined as a static member 'Prototype' of the target function.
  var TargetPrototypeCtor = targetFn.Prototype;
  // Provide a shortcut to the parent constructor
  targetFn.super = originFn;
  if (TargetPrototypeCtor) {
    TargetPrototypeCtor.prototype = originFn.prototype;
    targetFn.prototype = new TargetPrototypeCtor();
    targetFn.prototype.constructor = targetFn;
  } else {
    targetFn.prototype = Object.create( originFn.prototype, {
      // Restore constructor property of targetFn
      constructor: {
        value: targetConstructor,
        enumerable: false,
        writable: true,
        configurable: true
      }
    } );
  }
  // provide a shortcut to the parent prototype
  targetFn.prototype.super = originFn.prototype;
  // Extend static properties - always initialize both sides
  initClass( originFn );
  targetFn.static = Object.create( originFn.static );
  targetFn.extend = _.bind(extend, null, targetFn);
}

function mixin(targetFn, originFn) {
  var key;
  var prototype = originFn.prototype;
  if (originFn.Prototype) {
    prototype = new originFn.Prototype();
  }
  // Copy prototype properties
  for ( key in prototype ) {
    if ( key !== 'constructor' && prototype.hasOwnProperty( key ) ) {
      targetFn.prototype[key] = prototype[key];
    }
  }
  // Copy static properties - always initialize both sides
  initClass( targetFn );
  if ( originFn.static ) {
    for ( key in originFn.static ) {
      if ( originFn.static.hasOwnProperty( key ) ) {
        targetFn.static[key] = originFn.static[key];
      }
    }
  } else {
    initClass( originFn );
  }
}

extend = function( parent, proto ) {
  var ctor = function $$$() {
    parent.apply(this, arguments);
    if (this.init) {
      this.init();
    }
  };
  inherit(ctor, parent);
  for(var key in proto) {
    if (proto.hasOwnProperty(key)) {
      if (key === "name") {
        continue;
      }
      ctor.prototype[key] = proto[key];
    }
  }
  ctor.static.name = proto.name;
  return ctor;
};

module.exports = {
  initClass: initClass,
  inherit: inherit,
  mixin: mixin
};

},{"./helpers":121}],124:[function(require,module,exports){
'use strict';

var _ = require('./helpers');
var oo = require('./oo');

/**
 * An adapter to access an object via path.
 */
function PathAdapter(obj) {
  if (obj) {
    this.root = obj;
  }
}

PathAdapter.Prototype = function() {

  // use this to create extra scope for children ids
  // Example: {
  //   "foo": {
  //      "bar": true
  //      "children": {
  //          "bla": {
  //            "blupp": true
  //          }
  //      }
  //   }
  // }
  this.childrenScope = false;

  this.getRoot = function() {
    return this.root || this;
  };

  this._resolve = function(path, create) {
    var lastIdx = path.length-1;
    var context = this.getRoot();
    for (var i = 0; i < lastIdx; i++) {
      var key = path[i];
      if (context[key] === undefined) {
        if (create) {
          context[key] = {};
          if (this.childrenScope) {
            context[key].children = {};
          }
        } else {
          return undefined;
        }
      }
      context = context[key];
      if (this.childrenScope) {
        context = context.children;
      }
    }
    return context;
  };

  this.get = function(path) {
    if (_.isString(path)) {
      return this[path];
    } else if (!path || path.length === 0) {
      return this.getRoot();
    } else {
      var key = path[path.length-1];
      var context = this._resolve(path);
      if (context) {
        return context[key];
      } else {
        return undefined;
      }
    }
  };

  this.set = function(path, value) {
    if (_.isString(path)) {
      this[path] = value;
    } else {
      var key = path[path.length-1];
      this._resolve(path, true)[key] = value;
    }
  };

  this.delete = function(path, strict) {
    if (_.isString(path)) {
      delete this[path];
    } else {
      var key = path[path.length-1];
      var obj = this._resolve(path);
      if (strict && !obj || !obj[key]) {
        throw new Error('Invalid path.');
      }
      delete obj[key];
    }
  };

  this.clear = function() {
    var root = this.getRoot();
    for (var key in root) {
      if (root.hasOwnProperty(key)) {
        delete root[key];
      }
    }
  };

  var __traverse = function(root, path, fn, ctx) {
    for (var id in root) {
      if (root.hasOwnProperty(id) && id !== '__values__') {
        var childPath = path.concat([id]);
        fn.call(ctx, childPath, root[id]);
        __traverse(root[id], childPath, fn, ctx);
      }
    }
  };

  this.traverse = function(fn, ctx) {
    __traverse(this.getRoot(), [], fn, ctx);
  };

};

oo.initClass( PathAdapter );

PathAdapter.Arrays = function() {
  PathAdapter.apply(this, arguments);
};

PathAdapter.Arrays.Prototype = function() {

  this.get = function(path) {
    if (_.isString(path)) {
      return this[path];
    } else if (!path || path.length === 0) {
      return this.getRoot();
    } else {
      var key = path[path.length-1];
      var context = this._resolve(path);
      if (context && context[key]) {
        return context[key].__values__;
      } else {
        return undefined;
      }
    }
  };

  this.add = function(path, value) {
    var key = path[path.length-1];
    var context = this._resolve(path, true);
    if (!context[key]) {
      context[key] = {__values__: []};
    }
    var values = context[key].__values__;
    values.push(value);
  };

  this.remove = function(path, value) {
    var values = this.get(path);
    if (values) {
      _.deleteFromArray(values, value);
    } else {
      console.warn('Warning: trying to remove a value for an unknown path.', path, value);
    }
  };

  this.removeAll = function(path) {
    var values = this.get(path);
    values.splice(0, values.length);
  };

  this.set = function() {
    throw new Error('This method is not available for PathAdapter.Arrays');
  };
};

oo.inherit(PathAdapter.Arrays, PathAdapter);

module.exports = PathAdapter;

},{"./helpers":121,"./oo":123}],125:[function(require,module,exports){
'use strict';

var oo = require('./oo');

function Registry() {
  this.entries = {};
  // used to control order
  this.names = [];
}

Registry.Prototype = function() {

  this.contains = function(name) {
    return !!this.entries[name];
  };

  this.add = function(name, data) {
    if (this.contains(name)) {
      this.remove(name);
    }
    this.entries[name] = data;
    this.names.push(name);
  };

  this.remove = function(name) {
    var pos = this.names.indexOf(name);
    if (pos >= 0) {
      this.names.splice(pos, 1);
    }
    delete this.entries[name];
  };

  this.get = function(name) {
    return this.entries[name];
  };

  this.each = function(fn, ctx) {
    for (var i = 0; i < this.names.length; i++) {
      var name = this.names[i];
      var _continue = fn.call(ctx, this.entries[name], name);
      if (_continue === false) {
        break;
      }
    }
  };
};

oo.initClass(Registry);

module.exports = Registry;

},{"./oo":123}],126:[function(require,module,exports){
// UUID Generator
// -----------------

/*!
Math.uuid.js (v1.4)
http://www.broofa.com
mailto:robert@broofa.com

Copyright (c) 2010 Robert Kieffer
Dual licensed under the MIT and GPL licenses.
*/

var uuid = function (prefix, len) {
  var chars = '0123456789abcdefghijklmnopqrstuvwxyz'.split(''),
      uuid = [],
      radix = 16,
      idx;
  len = len || 32;

  if (len) {
    // Compact form
    for (idx = 0; idx < len; idx++) uuid[idx] = chars[0 | Math.random()*radix];
  } else {
    // rfc4122, version 4 form
    var r;

    // rfc4122 requires these characters
    uuid[8] = uuid[13] = uuid[18] = uuid[23] = '-';
    uuid[14] = '4';

    // Fill in random data.  At i==19 set the high bits of clock sequence as
    // per rfc4122, sec. 4.1.5
    for (idx = 0; idx < 36; idx++) {
      if (!uuid[idx]) {
        r = 0 | Math.random()*16;
        uuid[idx] = chars[(idx == 19) ? (r & 0x3) | 0x8 : r];
      }
    }
  }
  return (prefix ? prefix : "") + uuid.join('');
};

// creates a uuid function that generates counting uuids
uuid.generator = function(defaultPrefix) {
  var id = 1;
  defaultPrefix = (defaultPrefix !== undefined) ? defaultPrefix : "uuid_";
  return function(prefix) {
    prefix = prefix || defaultPrefix;
    return prefix+(id++);
  };
};

module.exports = uuid;

},{}],127:[function(require,module,exports){
'use strict';

var Substance = require('../basics');
var PathAdapter = Substance.PathAdapter;
var EventEmitter = Substance.EventEmitter;

function Graph(schema, options) {
  EventEmitter.call(this);

  options = options || {};

  this.schema = schema;

  this.seed = options.seed;
  this.didCreateNode = options.didCreateNode || function() {};
  this.didDeleteNode = options.didDeleteNode || function() {};

  this.nodes = {};
  this.indexes = {};

  this.init();
}

Graph.Prototype = function() {

  this.get = function(path) {
    if (!path) {
      throw new Error('Path or id required');
    }
    return this.nodes.get(path);
  };

  this.getNodes = function() {
    return this.nodes;
  };

  this.create = function(nodeData) {
    var node = this.schema.getNodeFactory().create(nodeData.type, nodeData);
    if (!node) {
      throw new Error('Illegal argument: could not create node for data:', nodeData);
    }
    if (this.contains(node.id)) {
      throw new Error("Node already exists: " + node.id);
    }
    if (!node.id || !node.type) {
      throw new Error("Node id and type are mandatory.");
    }
    this.nodes[node.id] = node;
    this.didCreateNode(node);
    Substance.each(this.indexes, function(index) {
      if (index.select(node)) {
        index.create(node);
      }
    });
    return node;
  };

  this.delete = function(nodeOrId) {
    var node, nodeId;
    if (Substance.isString(nodeOrId)) {
      nodeId = nodeOrId;
      node = this.nodes[nodeId];
    } else {
      node = nodeOrId;
      nodeId = node.id;
    }
    delete this.nodes[nodeId];
    this.didDeleteNode(node);
    Substance.each(this.indexes, function(index) {
      if (index.select(node)) {
        index.delete(node);
      }
    });
    return node;
  };

  this.set = function(path, newValue) {
    var node = this.get(path[0]);
    var oldValue = this.nodes.get(path);
    this.nodes.set(path, newValue);
    Substance.each(this.indexes, function(index) {
      if (index.select(node)) {
        index.update(node, path, newValue, oldValue);
      }
    });
    return oldValue;
  };

  // TODO: it does not make too much sense to use this incremental method
  // on the non-incremental graph
  // We leave it here so that the two versions are compatible API-wise
  this.update = function(path, diff) {
    var oldValue = this.nodes.get(path);
    var newValue;
    if (diff.isOperation) {
      newValue = diff.apply(oldValue);
    } else {
      var start, end, pos, val;
      if (Substance.isString(oldValue)) {
        if (diff['delete']) {
          // { delete: [2, 5] }
          start = diff['delete'].start;
          end = diff['delete'].end;
          newValue = oldValue.split('').splice(start, end-start).join('');
        } else if (diff['insert']) {
          // { insert: [2, "foo"] }
          pos = diff['insert'].offset;
          val = diff['insert'].value;
          newValue = [oldValue.substring(0, pos), val, oldValue.substring(pos)].join('');
        } else {
          throw new Error('Diff is not supported:', JSON.stringify(diff));
        }
      } else if (Substance.isArray(oldValue)) {
        newValue = oldValue.slice(0);
        if (diff['delete']) {
          // { delete: 2 }
          pos = diff['delete'].offset;
          newValue.splice(pos, 1);
        } else if (diff['insert']) {
          // { insert: [2, "foo"] }
          pos = diff['insert'].offset;
          val = diff['insert'].value;
          newValue.splice(pos, 0, val);
        } else {
          throw new Error('Diff is not supported:', JSON.stringify(diff));
        }
      } else {
        throw new Error('Diff is not supported:', JSON.stringify(diff));
      }
    }

    this.nodes.set(path, newValue);
    var node = this.get(path[0]);
    Substance.each(this.indexes, function(index) {
      if (index.select(node)) {
        index.update(node, path, oldValue, newValue);
      }
    });
    return oldValue;
  };

  this.toJSON = function() {
    return {
      schema: [this.schema.id, this.schema.version],
      nodes: Substance.deepclone(this.nodes)
    };
  };

  this.contains = function(id) {
    return (!!this.nodes[id]);
  };

  this.reset = function() {
    this.init();
  };

  // Graph initialization.
  this.init = function() {
    this.nodes = new PathAdapter();
    if (this.seed) {
      var nodes = this.seed.nodes;
      Substance.each(nodes, function(nodeData) {
        this.create(nodeData);
      }, this);
    }
  };

  this.addIndex = function(name, index) {
    if (this.indexes[name]) {
      console.error('Index with name %s already exists.', name);
    }
    index.setGraph(this);
    index.initialize();
    this.indexes[name] = index;
    return index;
  };

  this.getIndex = function(name) {
    return this.indexes[name];
  };


};

Substance.inherit(Graph, EventEmitter);

module.exports = Graph;

},{"../basics":122}],128:[function(require,module,exports){
'use strict';

var Substance = require('../basics');

var Graph = require('./graph');
var Operator = require('../operator');
var ObjectOperation = Operator.ObjectOperation;
var ArrayOperation = Operator.ArrayOperation;
var TextOperation = Operator.TextOperation;

var IncrementalGraph = function(schema, options) {
  IncrementalGraph.super.call(this, schema, options);
};

IncrementalGraph.Prototype = function() {

  this.create = function(nodeData) {
    var op = ObjectOperation.Create([nodeData.id], nodeData);
    this.apply(op);
    return op;
  };

  this.delete = function(nodeId) {
    var op = null;
    var node = this.get(nodeId);
    if (node) {
      var nodeData = node.toJSON();
      op = ObjectOperation.Delete([nodeId], nodeData);
      this.apply(op);
    }
    return op;
  };

  this.update = function(path, diff) {
    var diffOp = this._getDiffOp(path, diff);
    var op = ObjectOperation.Update(path, diffOp);
    this.apply(op);
    return op;
  };

  this.set = function(path, newValue) {
    var oldValue = this.get(path);
    var op = ObjectOperation.Set(path, oldValue, newValue);
    this.apply(op);
    return op;
  };

  this.apply = function(op) {
    if (op.type === ObjectOperation.NOP) return;
    else if (op.type === ObjectOperation.CREATE) {
      // clone here as the operations value must not be changed
      this.super.create.call(this, Substance.clone(op.val));
    } else if (op.type === ObjectOperation.DELETE) {
      this.super.delete.call(this, op.val.id);
    } else if (op.type === ObjectOperation.UPDATE) {
      var oldVal = this.get(op.path);
      var diff = op.diff;
      if (op.propertyType === 'array') {
        if (! (diff instanceof ArrayOperation) ) {
          diff = ArrayOperation.fromJSON(diff);
        }
        // array ops work inplace
        diff.apply(oldVal);
      } else if (op.propertyType === 'string') {
        if (! (diff instanceof TextOperation) ) {
          diff = TextOperation.fromJSON(diff);
        }
        var newVal = diff.apply(oldVal);
        this.super.set.call(this, op.path, newVal);
      } else {
        throw new Error("Unsupported type for operational update.");
      }
    } else if (op.type === ObjectOperation.SET) {
      this.super.set.call(this, op.path, op.val);
    } else {
      throw new Error("Illegal state.");
    }
    this.emit('operation:applied', op, this);
  };

  this._getDiffOp = function(path, diff) {
    var diffOp = null;
    if (diff.isOperation) {
      diffOp = diff;
    } else {
      var value = this.get(path);
      var start, end, pos, val;
      if (Substance.isString(value)) {
        if (diff['delete']) {
          // { delete: [2, 5] }
          start = diff['delete'].start;
          end = diff['delete'].end;
          diffOp = TextOperation.Delete(start, value.substring(start, end));
        } else if (diff['insert']) {
          // { insert: [2, "foo"] }
          pos = diff['insert'].offset;
          val = diff['insert'].value;
          diffOp = TextOperation.Insert(pos, val);
        }
      } else if (Substance.isArray(value)) {
        if (diff['delete']) {
          // { delete: 2 }
          pos = diff['delete'].offset;
          diffOp = ArrayOperation.Delete(pos, value[pos]);
        } else if (diff['insert']) {
          // { insert: [2, "foo"] }
          pos = diff['insert'].offset;
          val = diff['insert'].value;
          diffOp = ArrayOperation.Insert(pos, val);
        }
      }
    }
    if (!diffOp) {
      throw new Error('Unsupported diff: ' + JSON.stringify(diff));
    }
    return diffOp;
  }

};

Substance.inherit(IncrementalGraph, Graph);

module.exports = IncrementalGraph;

},{"../basics":122,"../operator":160,"./graph":127}],129:[function(require,module,exports){
'use strict';

var Data = {};

Data.Graph = require('./graph');
Data.IncrementalGraph = require('./incremental_graph');

Data.Node = require('./node');
Data.Schema = require('./schema');
Data.Index = require('./node_index');

module.exports = Data;

},{"./graph":127,"./incremental_graph":128,"./node":130,"./node_index":132,"./schema":133}],130:[function(require,module,exports){
'use strict';

var Substance = require('../basics');

function Node( data ) {
  Substance.EventEmitter.call(this);

  this.properties = Substance.extend({}, this.getDefaultProperties(), data);
  this.properties.type = this.constructor.static.name;
  this.properties.id = this.properties.id || Substance.uuid(this.properties.type);
}

// Idea for default properties:
// Node.schema = {
//   "foo": {
//     type: "string",
//     default: ""
//   }
// }

Node.Prototype = function() {

  this.toJSON = function() {
    return this.properties;
  };

  this.getDefaultProperties = function() {
    return Substance.deepclone(this.constructor.__defaultProperties__);
  };

  this.isInstanceOf = function(typeName) {
    return Node.static.isInstanceOf(this.constructor, typeName);
  };

  this.getClassNames = function() {
    var classNames = [];
    var staticData = this.constructor.static;
    while (staticData && staticData.name !== "node") {
      classNames.push(staticData.name);
      staticData = Object.getPrototypeOf(staticData);
    }
    return classNames.join(' ');
  };

};

Substance.inherit( Node, Substance.EventEmitter );

/**
 * Symbolic name for this model class. Must be set to a unique string by every subclass.
 */
Node.static.name = "node";

Node.static.schema = {
  type: 'string',
  id: 'string'
};

Node.static.readOnlyProperties = ['type', 'id'];

Node.static.matchFunction = function(/*el*/) {
  return false;
};

Node.static.isInstanceOf = function(NodeClass, typeName) {
  var staticData = NodeClass.static;
  while (staticData && staticData.name !== "node") {
    if (staticData && staticData.name === typeName) {
      return true;
    }
    staticData = Object.getPrototypeOf(staticData);
  }
  return false;
};


var defineProperty = function(prototype, property, readonly) {
  var getter, setter;
  getter = function() {
    return this.properties[property];
  };
  if (readonly) {
    setter = function() {
      throw new Error("Property " + property + " is readonly!");
    };
  } else {
    setter = function(val) {
      this.properties[property] = val;
      return this;
    };
  }
  var spec = {
    get: getter,
    set: setter
  };
  Object.defineProperty(prototype, property, spec);
};

var defineProperties = function(NodeClass) {
  var prototype = NodeClass.prototype;
  if (!NodeClass.static.schema) return;
  var properties = Object.keys(NodeClass.static.schema);
  for (var i = 0; i < properties.length; i++) {
    var property = properties[i];
    if (prototype.hasOwnProperty(property)) continue;
    var readonly = ( NodeClass.static.readOnlyProperties &&
      NodeClass.static.readOnlyProperties.indexOf(property) > 0 );
    defineProperty(prototype, property, readonly);
  }
};

var collectDefaultProperties = function( NodeClass ) {
  var staticData = NodeClass.static;
  var props = [{}];
  while(staticData) {
    if (staticData.hasOwnProperty('defaultProperties')) {
      props.push(staticData.defaultProperties);
    }
    staticData = Object.getPrototypeOf(staticData);
  }
  NodeClass.__defaultProperties__ = Substance.extend.apply(null, props);
};

var extend;

var initNodeClass = function(NodeClass) {
  // add a extend method so that this class can be used to create child models.
  NodeClass.extend = Substance.bind(extend, null, NodeClass);
  // define properties and so on
  defineProperties(NodeClass);
  collectDefaultProperties(NodeClass);
  NodeClass.type = NodeClass.static.name;
};

extend = function( parent, modelSpec ) {
  var ctor = function NodeClass() {
    parent.apply(this, arguments);
  };
  Substance.inherit(ctor, parent);
  for(var key in modelSpec) {
    if (modelSpec.hasOwnProperty(key)) {
      if (key === "name" || key === "properties") {
        continue;
      }
      ctor.prototype[key] = modelSpec[key];
    }
  }
  ctor.static.name = modelSpec.name;
  ctor.static.schema = modelSpec.properties;
  initNodeClass(ctor);
  return ctor;
};

initNodeClass(Node);

module.exports = Node;

},{"../basics":122}],131:[function(require,module,exports){
'use strict';

var Substance = require('../basics');
var Node = require('./node');
var Factory = Substance.Factory;

function NodeFactory() {
  Factory.call(this);
};

NodeFactory.Prototype = function() {

  this.register = function ( constructor ) {
    var name = constructor.static && constructor.static.name;
    if ( typeof name !== 'string' || name === '' ) {
      throw new Error( 'Node names must be strings and must not be empty' );
    }
    if ( !( constructor.prototype instanceof Node) ) {
      throw new Error( 'Nodes must be subclasses of Substance.Data.Node' );
    }
    this.add(name, constructor);
  };

  this.getClassForHtmlElement = function(el) {
    for (var i = 0; i < this.names.length; i++) {
      var name = this.names[i];
      var NodeClass = this.get(name);
      if (NodeClass.matchElement) {
        var match = NodeClass.matchElement(el);
        if (match) {
          return match;
        }
      }
    }
    return null;
  }
};

Substance.inherit(NodeFactory, Factory);

module.exports = NodeFactory;

},{"../basics":122,"./node":130}],132:[function(require,module,exports){
'use strict';

var Substance = require('../basics');
var PathAdapter = Substance.PathAdapter;

var Index = function() {
  this.index = new PathAdapter();
};

Index.Prototype = function() {

  this.setGraph = function(graph) {
    this.graph = graph;
  };

  this.reset = function() {
    this.index.clear();
    this.initialize();
  };

  this.initialize = function() {
    Substance.each(this.graph.getNodes(), function(node) {
      if (this.select(node)) {
        this.create(node);
      }
    }, this);
  };

  this.property = "id";

  this.select = function(node) {
    if(!this.type) {
      return true;
    } else {
      return node.isInstanceOf(this.type);
    }
  },

  this.get = function(path) {
    var res = this.index.get(path);
    // HACK: unwrap objects on the index when method is called without a path
    if (!path) return this.getAll();
    return this.index.get(path) || {};
  };

  // HACK: When there's no path supplied we need to flatten the index to show all objects that are on the index
  this.getAll = function() {
    var result = {};
    Substance.each(this.index, function(values, key) {
      Substance.extend(result, values);
    });
    return result;
  };

  this.create = function(node) {
    var values = node[this.property];
    if (!Substance.isArray(values)) {
      values = [values];
    }
    Substance.each(values, function(value) {
      this.index.set([value, node.id], node);
    }, this);
  };

  this.delete = function(node) {
    var values = node[this.property];
    if (!Substance.isArray(values)) {
      values = [values];
    }
    Substance.each(values, function(value) {
      this.index.delete([value, node.id]);
    }, this);
  };

  this.update = function(node, path, newValue, oldValue) {
    if (!this.select(node) || path[1] !== this.property) return;

    var values = oldValue;
    if (!Substance.isArray(values)) {
      values = [values];
    }
    Substance.each(values, function(value) {
      this.index.delete([value, node.id]);
    }, this);
    values = newValue;
    if (!Substance.isArray(values)) {
      values = [values];
    }
    Substance.each(values, function(value) {
      this.index.set([value, node.id], node);
    }, this);
  };

  this.clone = function() {
    var IndexClass = this.constructor;
    return new IndexClass();
  };
};

Substance.initClass( Index );

Index.create = function(prototype) {
  return Substance.extend(new Index(), prototype);
};

module.exports = Index;

},{"../basics":122}],133:[function(require,module,exports){
'use strict';

var Substance = require('../basics');
var Node = require('./node');
var NodeFactory = require('./node_factory');

function Schema(name, version) {
  this.name = name;
  this.version = version;
  this.nodeFactory = new NodeFactory();
  // add built-in node classes
  this.addNodes(this.getBuiltIns());
}

Schema.Prototype = function() {

  this.addNodes = function(nodes) {
    if (!nodes) return;
    for (var i = 0; i < nodes.length; i++) {
      this.nodeFactory.register(nodes[i]);
    }
  };

  this.getNodeClass = function(name) {
    return this.nodeFactory.get(name);
  };

  this.getNodeFactory = function() {
    return this.nodeFactory;
  };

  function getJsonForNodeClass(nodeClass) {
    var nodeSchema = {};
    if (nodeClass.static.hasOwnProperty('schema')) {
      nodeSchema.properties = Substance.clone(nodeClass.static.schema);
    }
    // add 'parent' attribute if the nodeClass has a parent
    return nodeSchema;
  }

  this.toJSON = function() {
    var data = {
      id: this.name,
      version: this.version,
      types: {}
    };
    this.nodeFactory.each(function(nodeClass, name) {
      data.types[name] = getJsonForNodeClass(nodeClass);
    });
    return data;
  };

  this.createNode = function(type, data) {
    var node = this.nodeFactory.create(type, data);
    return node;
  };

  this.getBuiltIns = function() {
    return [ Node ];
  };

  this.isInstanceOf = function(type, parentType) {
    var NodeClass = this.getNodeClass(type);
    if (NodeClass) {
      return Node.static.isInstanceOf(NodeClass, parentType);
    }
    return false;
  };

  this.each = function() {
    this.nodeFactory.each.apply(this.nodeFactory, arguments);
  };
};

Substance.initClass(Schema);

module.exports = Schema;

},{"../basics":122,"./node":130,"./node_factory":131}],134:[function(require,module,exports){
'use strict';

var Node = require('./node');

// Annotation
// --------
//
// An annotation can be used to overlay text and give it a special meaning.
// Annotations only work on text properties. If you want to annotate multiple
// nodes you have to use a ContainerAnnotation.
// 
// Properties:
//   - path: Identifies a text property in the document (e.g. ["text_1", "content"])
//   - range: Identies annotated characters by its start and end position (e.g. [25, 47])

var Annotation = Node.extend({
  name: "annotation",

  properties: {
    path: ['array', 'string'],
    range: ['array', 'number']
  },

  canSplit: function() {
    return true;
  }
});

module.exports = Annotation;

},{"./node":151}],135:[function(require,module,exports){
'use strict';

var Substance = require('../basics');
var PathAdapter = Substance.PathAdapter;
var Data = require('../data');
var Annotation = require('./annotation');

// Annotation Index
// ----------------
//
// Lets us look up existing annotations by path and type
//
// To get all annotations for the content of a text node
//
//    var aIndex = doc.annotationIndex;
//    aIndex.get(["text_1", "content"]);
//
// You can also scope for a specific range
//
//    aIndex.get(["text_1", "content"], 23, 45);

var AnnotationIndex = function() {
  this.byPath = new PathAdapter();
  this.byType = new PathAdapter();
};

AnnotationIndex.Prototype = function() {

  this.property = "path";

  this.select = function(node) {
    return (node instanceof Annotation);
  };

  this.reset = function() {
    this.byPath.clear();
    this.byType.clear();
    this.initialize();
  };

  // TODO: use object interface? so we can combine filters (path and type)
  this.get = function(path, start, end, type) {
    var annotations = this.byPath.get(path) || {};
    if (Substance.isString(path) || path.length === 1) {
      // flatten annotations if this is called via node id
      var _annos = annotations;
      annotations = [];
      Substance.each(_annos, function(level) {
        annotations = annotations.concat(Substance.map(level, function(anno) {
          return anno;
        }));
      });
    } else {
      annotations = Substance.map(annotations, function(anno) {
        return anno;
      });
    }
    /* jshint eqnull:true */
    // null check for null or undefined
    if (start != null) {
      annotations = Substance.filter(annotations, AnnotationIndex.filterByRange(start, end));
    }
    if (type) {
      annotations = Substance.filter(annotations, AnnotationIndex.filterByType(type));
    }
    return annotations;
  };

  this.create = function(anno) {
    this.byType.set([anno.type, anno.id], anno);
    this.byPath.set(anno.path.concat([anno.id]), anno);
  };

  this.delete = function(anno) {
    this.byType.delete([anno.type, anno.id]);
    this.byPath.delete(anno.path.concat([anno.id]));
  };

  this.update = function(node, path, newValue, oldValue) {
    if (this.select(node) && path[1] === this.property) {
      this.delete({ id: node.id, type: node.type, path: oldValue });
      this.create(node);
    }
  };

};

Substance.inherit(AnnotationIndex, Data.Index);

AnnotationIndex.filterByRange = function(start, end) {
  return function(anno) {
    var aStart = anno.range[0];
    var aEnd = anno.range[1];
    var overlap = (aEnd >= start);
    // Note: it is allowed to omit the end part
    if (end != null) {
      overlap = overlap && (aStart <= end);
    }
    return overlap;
  };
};

AnnotationIndex.filterByType = function(type) {
  return function(anno) {
    return anno.isInstanceOf(type);
  };
};

module.exports = AnnotationIndex;
},{"../basics":122,"../data":129,"./annotation":134}],136:[function(require,module,exports){
"use strict";

var Substance = require('../basics');

// A collection of methods to update annotations
// --------
//
// As we treat annotations as overlay of plain text we need to keep them up-to-date during editing.

var insertedText = function(doc, coordinate, length) {
  if (!length) return;
  var index = doc.getIndex('annotations');
  var annotations = index.get(coordinate.path);
  Substance.each(annotations, function(anno) {
    var pos = coordinate.offset;
    var start = anno.range[0];
    var end = anno.range[1];
    var changed = false;
    if ( (pos < start) ||
         (pos === start && coordinate.after) ) {
      start += length;
      changed = true;
    }
    if ( (pos < end) ||
         (pos === end && !coordinate.after) ) {
      end += length;
      changed = true;
    }
    if (changed) {
      doc.set([anno.id, 'range'], [start, end]);
    }
  });
  // same for container annotation anchors
  index = doc.getIndex('container-annotations');
  var anchors = index.get(coordinate.path);
  Substance.each(anchors, function(anchor) {
    var pos = coordinate.offset;
    var start = anchor.offset;
    var changed = false;
    if ( (pos < start) ||
         (pos === start && coordinate.after) ) {
      start += length;
      changed = true;
    }
    if (changed) {
      var property = (anchor.isStart?'startOffset':'endOffset');
      doc.set([anchor.id, property], start);
    }
  });
};

var deletedText = function(doc, path, startOffset, endOffset) {
  if (startOffset === endOffset) return;
  var index = doc.getIndex('annotations');
  var annotations = index.get(path);
  var length = endOffset - startOffset;
  Substance.each(annotations, function(anno) {
    var pos1 = startOffset;
    var pos2 = endOffset;
    var start = anno.range[0];
    var end = anno.range[1];
    if (pos2 <= start) {
      start -= length;
      end -= length;
      doc.set([anno.id, 'range'], [start, end]);
    } else {
      var changed = false;
      if (pos1 <= start) {
        var newStart = start - Math.min(pos2-pos1, start-pos1);
        if (start !== newStart) {
          start = newStart;
          changed = true;
        }
      }
      if (pos1 <= end) {
        var newEnd = end - Math.min(pos2-pos1, end-pos1);
        if (end !== newEnd) {
          end = newEnd;
          changed = true;
        }
      }
      if (changed) {
        // delete the annotation if it has collapsed by this delete
        if (start === end) {
          doc.delete(anno.id);
        } else {
          doc.set([anno.id, 'range'], [start, end]);
        }
      }
    }
  });
  // same for container annotation anchors
  index = doc.getIndex('container-annotations');
  var anchors = index.get(path);
  Substance.each(anchors, function(anchor) {
    var pos1 = startOffset;
    var pos2 = endOffset;
    var start = anchor.offset;
    var changed = false;
    if (pos2 <= start) {
      start -= length;
      changed = true;
    } else {
      if (pos1 <= start) {
        var newStart = start - Math.min(pos2-pos1, start-pos1);
        if (start !== newStart) {
          start = newStart;
          changed = true;
        }
      }
    }
    if (changed) {
      var property = (anchor.isStart?'startOffset':'endOffset');
      doc.set([anchor.id, property], start);
    }
  });
};

// used when breaking a node to transfer annotations to the new property
var transferAnnotations = function(doc, path, offset, newPath, newOffset) {
  var index = doc.getIndex('annotations');
  var annotations = index.get(path, offset);
  Substance.each(annotations, function(a) {
    var isInside = (offset > a.range[0] && offset < a.range[1]);
    var newRange;
    // 1. if the cursor is inside an annotation it gets either split or truncated
    if (isInside) {
      // create a new annotation if the annotation is splittable
      if (a.canSplit()) {
        var newAnno = Substance.clone(a.properties);
        newAnno.id = Substance.uuid(a.type + "_");
        newAnno.range = [newOffset, newOffset + a.range[1] - offset];
        newAnno.path = newPath;
        doc.create(newAnno);
      }
      // in either cases truncate the first part
      newRange = Substance.clone(a.range);
      newRange[1] = offset;
      // if after truncate the anno is empty, delete it
      if (newRange[1] === newRange[0]) {
        doc.delete(a.id);
      }
      // ... otherwise update the range
      else {
        doc.set([a.id, "range"], newRange);
      }
    }
    // 2. if the cursor is before an annotation then simply transfer the annotation to the new node
    else if (a.range[0] >= offset) {
      // Note: we are preserving the annotation so that anything which is connected to the annotation
      // remains valid.
      newRange = [newOffset + a.range[0] - offset, newOffset + a.range[1] - offset];
      doc.set([a.id, "path"], newPath);
      doc.set([a.id, "range"], newRange);
    }
  });
  // same for container annotation anchors
  index = doc.getIndex('container-annotations');
  var anchors = index.get(path);
  Substance.each(anchors, function(anchor) {
    var start = anchor.offset;
    if (offset <= start) {
      var pathProperty = (anchor.isStart?'startPath':'endPath');
      var offsetProperty = (anchor.isStart?'startOffset':'endOffset');
      doc.set([anchor.id, pathProperty], newPath);
      doc.set([anchor.id, offsetProperty], newOffset + anchor.offset - offset);
    }
  });
};

module.exports = {
  insertedText: insertedText,
  deletedText: deletedText,
  transferAnnotations: transferAnnotations
};

},{"../basics":122}],137:[function(require,module,exports){
"use strict";

var Substance = require('../basics');

var ENTER = 1;
var EXIT = -1;
// Markers are put before other opening tags
var ENTER_EXIT = -2;

// Annotator
// --------
//
// An algorithm that is used to fragment overlapping structure elements
// following a priority rule set.
// E.g., we use this for creating DOM elements for annotations. The annotations
// can partially be overlapping. However this is not allowed in general for DOM elements
// or other hierarchical structures.
//
// Example: For the Annotation use casec consider a 'comment' spanning partially
// over an 'emphasis' annotation.
// 'The <comment>quick brown <bold>fox</comment> jumps over</bold> the lazy dog.'
// We want to be able to create a valid XML structure:
// 'The <comment>quick brown <bold>fox</bold></comment><bold> jumps over</bold> the lazy dog.'
//
// For that one would choose
//
//     {
//        'comment': 0,
//        'bold': 1
//     }
//
// as priority levels.
// In case of structural violations as in the example, elements with a higher level
// would be fragmented and those with lower levels would be preserved as one piece.
//
// TODO: If a violation for nodes of the same level occurs an Error should be thrown.
// Currently, in such cases the first element that is opened earlier is preserved.

var Annotator = function(options) {
  Substance.extend(this, options);
};

Annotator.Prototype = function() {

  // This is a sweep algorithm wich uses a set of ENTER/EXIT entries
  // to manage a stack of active elements.
  // Whenever a new element is entered it will be appended to its parent element.
  // The stack is ordered by the annotation types.
  //
  // Examples:
  //
  // - simple case:
  //
  //       [top] -> ENTER(idea1) -> [top, idea1]
  //
  //   Creates a new 'idea' element and appends it to 'top'
  //
  // - stacked ENTER:
  //
  //       [top, idea1] -> ENTER(bold1) -> [top, idea1, bold1]
  //
  //   Creates a new 'bold' element and appends it to 'idea1'
  //
  // - simple EXIT:
  //
  //       [top, idea1] -> EXIT(idea1) -> [top]
  //
  //   Removes 'idea1' from stack.
  //
  // - reordering ENTER:
  //
  //       [top, bold1] -> ENTER(idea1) -> [top, idea1, bold1]
  //
  //   Inserts 'idea1' at 2nd position, creates a new 'bold1', and appends itself to 'top'
  //
  // - reordering EXIT
  //
  //       [top, idea1, bold1] -> EXIT(idea1)) -> [top, bold1]
  //
  //   Removes 'idea1' from stack and creates a new 'bold1'
  //

  // Orders sweep events according to following precedences:
  //
  // 1. pos
  // 2. EXIT < ENTER
  // 3. if both ENTER: ascending level
  // 4. if both EXIT: descending level

  var _compare = function(a, b) {
    if (a.pos < b.pos) return -1;
    if (a.pos > b.pos) return 1;

    if (a.id === b.id) {
      return b.mode - a.mode;
    }

    if (a.mode < b.mode) return -1;
    if (a.mode > b.mode) return 1;

    if (a.mode === ENTER) {
      if (a.level < b.level) return -1;
      if (a.level > b.level) return 1;
    }

    if (a.mode === EXIT) {
      if (a.level > b.level) return -1;
      if (a.level < b.level) return 1;
    }

    return 0;
  };

  var extractEntries = function(annotations) {
    var entries = [];
    Substance.each(annotations, function(a) {
      // special treatment for zero-width annos such as ContainerAnnotation.Anchors
      if (a.zeroWidth) {
        entries.push({ pos: a.offset, mode: ENTER_EXIT, id: a.id, level: Number.MAX_VALUE, type: 'anchor', node: a });
      } else {
        // use a weak default level when not given
        var l = a.constructor.static.level || 1000;
        var r = a.range;
        entries.push({ pos : r[0], mode: ENTER, level: l, id: a.id, type: a.type, node: a });
        entries.push({ pos : r[1], mode: EXIT, level: l, id: a.id, type: a.type, node: a });
      }
    });
    return entries;
  };

  this.onText = function(/*context, text*/) {};

  // should return the created user context
  this.onEnter = function(/*entry, parentContext*/) {
    return null;
  };

  this.onExit = function(/*entry, context, parentContext*/) {};

  this.enter = function(entry, parentContext) {
    return this.onEnter(entry, parentContext);
  };

  this.exit = function(entry, context, parentContext) {
    this.onExit(entry, context, parentContext);
  };

  this.createText = function(context, text) {
    if (text.length > 0) {
      this.onText(context, text);
    }
  };

  this.start = function(rootContext, text, annotations) {
    var self = this;

    var entries = extractEntries.call(this, annotations);
    entries.sort(_compare.bind(this));
    var stack = [{context: rootContext, entry: null}];
    var pos = 0;

    for (var i = 0; i < entries.length; i++) {
      var entry = entries[i];
      // in any case we add the last text to the current element
      this.createText(stack[stack.length-1].context, text.substring(pos, entry.pos));

      pos = entry.pos;
      var stackLevel, idx;
      if (entry.mode === ENTER || entry.mode === ENTER_EXIT) {
        // find the correct position and insert an entry
        for (stackLevel = 1; stackLevel < stack.length; stackLevel++) {
          if (entry.level < stack[stackLevel].entry.level) {
            break;
          }
        }
        // create elements which are open, and are now stacked ontop of the
        // entered entry
        for (idx = stackLevel; idx < stack.length; idx++) {
          this.exit(stack[idx].entry, stack[idx].context, stack[idx-1].context);
        }
        stack.splice(stackLevel, 0, {entry: entry});
        // create new elements for all lower entries
        for (idx = stackLevel; idx < stack.length; idx++) {
          stack[idx].context = self.enter(stack[idx].entry, stack[idx-1].context);
        }
      }
      if (entry.mode === EXIT || entry.mode === ENTER_EXIT) {
        // find the according entry and remove it from the stack
        for (stackLevel = 1; stackLevel < stack.length; stackLevel++) {
          if (stack[stackLevel].entry.node === entry.node) {
            break;
          }
        }
        for (idx = stackLevel; idx < stack.length; idx++) {
          this.exit(stack[idx].entry, stack[idx].context, stack[idx-1].context);
        }
        stack.splice(stackLevel, 1);
        // create new elements for all lower entries
        for (idx = stackLevel; idx < stack.length; idx++) {
          stack[idx].context = self.enter(stack[idx].entry, stack[idx-1].context);
        }
      }
    }

    // Finally append a trailing text node
    this.createText(rootContext, text.substring(pos));
  };

};

Substance.initClass( Annotator );

module.exports = Annotator;

},{"../basics":122}],138:[function(require,module,exports){
'use strict';

var Substance = require('../basics');
var PathAdapter = Substance.PathAdapter;

// Container
// --------
//
// Holds a sequence of document nodes (see ContainerNode). Well not really.
// since each node can consist of multiple components (e.g. a figure has a
// title and a caption) they need to be flattened to a list of components.
// This flat structure is modelled by this class.


function Container(id) {
  if (!id) {
    throw new Error('Contract: a container must have an id be able to associate container annotations.');
  }
  this.id = id;
  this.components = [];
  this.nodes = {};
  this.byPath = new PathAdapter({});
}

Container.Prototype = function() {

  this._setComponents = function(components) {
    var byPath = new PathAdapter({});
    var nodes = {};
    for (var i = 0; i < components.length; i++) {
      var comp = components[i];
      if (comp.path.length !== 2) {
        throw new Error("Contract: every property path must have 2 elements");
      }
      var nodeId = comp.path[0];
      var node = nodes[nodeId];
      if (!node) {
        node = new Container.Node(nodeId);
        nodes[nodeId] = node;
      }
      comp.parentNode = node;
      node.components.push(comp);
      if (i > 0) {
        components[i-1].next = comp;
        comp.previous = components[i-1];
      }
      byPath.set(comp.path, comp);
    }
    this.components = components;
    this.nodes = nodes;
    this.byPath = byPath;
  };

  this.getComponent = function(path) {
    var comp = this.byPath.get(path);
    return comp;
  };

  this.getComponentsForRange = function(range) {
    var comps = [];
    var startComp = this.byPath.get(range.start.path);
    var endComp = this.byPath.get(range.end.path);
    var startIdx = startComp.getIndex();
    var endIdx = endComp.getIndex();
    comps.push(startComp);
    for (var idx = startIdx+1; idx <= endIdx; idx++) {
      comps.push(this.getComponentAt(idx));
    }
    return comps;
  };

  this.getComponentAt = function(idx) {
    return this.components[idx];
  };

  this.getAnnotationFragments = function(containerAnnotation) {
    var fragments = [];
    var doc = containerAnnotation.getDocument();
    var anno = containerAnnotation;
    var startAnchor = anno.getStartAnchor();
    var endAnchor = anno.getEndAnchor();
    // if start and end anchors are on the same property, then there is only one fragment
    if (Substance.isEqual(startAnchor.path, endAnchor.path)) {
      fragments.push({
        path: startAnchor.path,
        id: anno.id,
        range: [startAnchor.offset, endAnchor.offset],
      });
    }
    // otherwise create a trailing fragment for the property of the start anchor,
    // full-spanning fragments for inner properties,
    // and one for the property containing the end anchor.
    else {
      var text = doc.get(startAnchor.path);
      var startComp = this.getComponent(startAnchor.path);
      var endComp = this.getComponent(endAnchor.path);
      if (!startComp || !endComp) {
        throw new Error('Could not find components of ContainerAnnotation');
      }
      fragments.push({
        path: startAnchor.path,
        id: anno.id,
        range: [startAnchor.offset, text.length],
      });
      for (var idx = startComp.idx + 1; idx < endComp.idx; idx++) {
        var comp = this.getComponentAt(idx);
        text = doc.get(comp.path);
        fragments.push({
          path: comp.path,
          id: anno.id,
          range: [0, text.length],
        });
      }
      fragments.push({
        path: endAnchor.path,
        id: anno.id,
        range: [0, endAnchor.offset],
      });
    }
    return fragments;
  };

};

Substance.initClass(Container);

Container.Component = function Component(path, idx) {
  this.path = path;
  this.idx = idx;
  this.parentNode = null;
  this.previous = null;
  this.next = null;
};

Container.Component.Prototype = function() {

  this.hasPrevious = function() {
    return !!this.previous;
  };

  this.getPrevious = function() {
    return this.previous;
  };

  this.hasNext = function() {
    return !!this.next;
  };

  this.getNext = function() {
    return this.next;
  };

  this.getIndex = function() {
    return this.idx;
  };

  this.getParentNode = function() {
    return this.parentNode;
  };
};

Substance.initClass(Container.Component);

Container.Node = function Node(id) {
  this.id = id;
  this.components = [];
};

Substance.initClass(Container.Node);

module.exports = Container;

},{"../basics":122}],139:[function(require,module,exports){
'use strict';

var Substance = require('../basics');
var Node = require('./node');


// Container Annotation
// ----------------
//
// Describes an annotation sticking on a container that can span over multiple
// nodes.
//
// Here's an example:
//
// {
//   "id": "subject_reference_1",
//   "type": "subject_reference",
//   "container": "content",
//   "startPath": ["text_2", "content"],
//   "startOffset": 100,
//   "endPath": ["text_4", "content"],
//   "endOffset": 40
// }


var ContainerAnnotation = Node.extend({
  name: "container_annotation",

  properties: {
    // id of container node
    container: 'string',
    startPath: ['array', 'string'],
    startOffset: 'number',
    endPath: ['array', 'string'],
    endOffset: 'number'
  },

  getStartAnchor: function() {
    if (!this._startAnchor) {
      this._startAnchor = new ContainerAnnotation.Anchor(this, 'isStart');
    }
    return this._startAnchor;
  },

  getEndAnchor: function() {
    if (!this._endAnchor) {
      this._endAnchor = new ContainerAnnotation.Anchor(this);
    }
    return this._endAnchor;
  },

});

ContainerAnnotation.Anchor = function(node, isStart) {
  this.node = node;
  this.id = node.id;
  this.container = node.container;
  this.isStart = !!isStart;
  Object.freeze(this);
};

ContainerAnnotation.Anchor.Prototype = function() {
  this.zeroWidth = true;
  this.getClassNames = function() {
    return (this.node.getClassNames()+" anchor "+(this.isStart?"start-anchor":"end-anchor"));
  };
};

Substance.initClass(ContainerAnnotation.Anchor);

Object.defineProperties(ContainerAnnotation.Anchor.prototype, {
  path: {
    get: function() {
      return (this.isStart ? this.node.startPath : this.node.endPath);
    },
    set: function() { throw new Error('Immutable!'); }
  },
  offset: {
    get: function() {
      return (this.isStart ? this.node.startOffset : this.node.endOffset);
    },
    set: function() { throw new Error('Immutable!'); }
  },
});

module.exports = ContainerAnnotation;
},{"../basics":122,"./node":151}],140:[function(require,module,exports){
'use strict';

var Substance = require('../basics');
var PathAdapter = Substance.PathAdapter;
var Data = require('../data');
var ContainerAnnotation = require('./container_annotation');

var ContainerAnnotationIndex = function(doc) {
  this.doc = doc;
  this.byPath = new PathAdapter.Arrays();
};

ContainerAnnotationIndex.Prototype = function() {

  this.select = function(node) {
    return (node instanceof ContainerAnnotation);
  };

  this.reset = function() {
    this.byPath.clear();
    this.initialize();
  };

  this.get = function(path, containerName) {
    var anchors = this.byPath.get(path) || [];
    if (containerName) {
      return Substance.filter(anchors, function(anchor) {
        return (anchor.container === containerName);
      });
    } else {
      // return a copy of the array
      return anchors.slice(0);
    }
    return anchors;
  };

  this.create = function(containerAnno) {
    var startAnchor = containerAnno.getStartAnchor();
    var endAnchor = containerAnno.getEndAnchor();
    this.byPath.add(startAnchor.path, startAnchor);
    this.byPath.add(endAnchor.path, endAnchor);
  };

  this.delete = function(containerAnno) {
    var startAnchor = containerAnno.getStartAnchor();
    var endAnchor = containerAnno.getEndAnchor();
    this.byPath.remove(startAnchor.path, startAnchor);
    this.byPath.remove(endAnchor.path, endAnchor);
  };

  this.update = function(node, path, newValue, oldValue) {
    if (this.select(node)) {
      var anchor = null;
      if (path[1] === 'startPath') {
        anchor = node.getStartAnchor();
      } else if (path[1] === 'endPath') {
        anchor = node.getEndAnchor();
      } else {
        return;
      }
      this.byPath.remove(oldValue, anchor);
      this.byPath.add(anchor.path, anchor);
    }
  };

};

Substance.inherit(ContainerAnnotationIndex, Data.Index);

module.exports = ContainerAnnotationIndex;

},{"../basics":122,"../data":129,"./container_annotation":139}],141:[function(require,module,exports){
'use strict';

var Node = require('./node');

var Container = Node.extend({

  name: "container",

  properties: {
    // array of node ids
    nodes: ['array', 'string']
  },

  getPosition: function(nodeId) {
    var pos = this.nodes.indexOf(nodeId);
    return pos;
  },

  show: function(nodeId, pos) {
    var doc = this.getDocument();
    pos = pos || this.nodes.length;
    doc.update([this.id, 'nodes'], {
      insert: { offset: pos, value: nodeId }
    });
  },

  hide: function(nodeId) {
    var doc = this.getDocument();
    var pos = this.nodes.indexOf(nodeId);
    if (pos >= 0) {
      doc.update([this.id, 'nodes'], {
        delete: { offset: pos }
      });
    } else {
      console.error('Could not find node with id %s.', nodeId);
    }
  },

});

module.exports = Container;
},{"./node":151}],142:[function(require,module,exports){
'use strict';

var Substance = require('../basics');
var PropertySelection = require('./property_selection');
var Selection = require('./selection');
var Container = require('./container');

function ContainerSelection(container, range, reverse) {
  if (!(container instanceof Container)) {
    throw new Error('Illegal argument: expected Container instance.');
  }
  // Note: not calling the super ctor as it freezes the instance
  this.container = container;
  this.range = range;
  this.reverse = reverse;
  this.collapsed = range.start.equals(range.end);
  this._internal = {};
  Object.freeze(this);
}

ContainerSelection.Prototype = function() {

  this.isPropertySelection = function() {
    return false;
  };

  this.isContainerSelection = function() {
    return true;
  };

  this.toString = function() {
    return "ContainerSelection("+ JSON.stringify(this.range.start.path) + ":" + this.range.start.offset + " -> " +  JSON.stringify(this.range.end.path) + ":" + this.range.end.offset + (this.reverse ? ", reverse" : "") + ")";
  };

  var _coordinates = function(container, sel) {
    if (sel._internal.coor) {
      return sel._internal.coor;
    }
    var range = sel.getRange();
    var startPos = container.getComponent(range.start.path).getIndex();
    var endPos;
    if (sel.isCollapsed()) {
      endPos = startPos;
    } else {
      endPos = container.getComponent(range.end.path).getIndex();
    }
    var result = {
      start: {
        pos: startPos,
        offset: range.start.offset,
      },
      end: {
        pos: endPos,
        offset: range.end.offset
      },
      collapsed: sel.isCollapsed()
    };
    sel._internal.coor = result;
    return result;
  };

  var _isBefore = function(c1, c2) {
    if (c1.pos > c2.pos) return false;
    if (c1.pos == c2.pos && c1.offset > c2.offset) return false;
    return true;
  };

  var _isStrictBefore = function(c1, c2) {
    if (c1.pos >= c2.pos) return false;
    if (c1.pos == c2.pos && c1.offset >= c2.offset) return false;
    return true;
  };

  var _isEqual = function(c1, c2) {
    return (c1.pos === c2.pos && c1.offset === c2.offset);
  };

  this.overlaps = function(other) {
    var c1 = _coordinates(this.container, this);
    var c2 = _coordinates(this.container, other);
    // it overlaps if they are not disjunct
    return !(_isBefore(c1.end, c2.start) && _isBefore(c2.end, c1.start));
  };

  this.includes = function(other) {
    var c1 = _coordinates(this.container, this);
    var c2 = _coordinates(this.container, other);
    return (_isBefore(c1.start, c2.start) && _isBefore(c2.end, c1.end));
  };

  // includes and at least one boundary
  this.includesWithOneBoundary = function(other) {
    var c1 = _coordinates(this.container, this);
    var c2 = _coordinates(this.container, other);
    return (
      (_isEqual(c1.start, c2.start) && _isBefore(c2.end, c1.end)) ||
      (_isEqual(c1.end, c2.end) && _isBefore(c1.start, c2.start))
    );
  };

  var _createNewSelection = function(container, newCoors) {
    newCoors.start.path = container.getComponentAt(newCoors.start.pos).path;
    newCoors.end.path = container.getComponentAt(newCoors.end.pos).path;
    return Selection.create(container,
      newCoors.start.path, newCoors.start.offset,
      newCoors.end.path, newCoors.end.offset);
  };

  this.expand = function(other) {
    var c1 = _coordinates(this.container, this);
    var c2 = _coordinates(this.container, other);
    var c1s = c1.start;
    var c2s = c2.start;
    var c1e = c1.end;
    var c2e = c2.end;
    var newCoors = {
      start: { pos: c1s.pos, offset: c1s.offset },
      end: { pos: c1e.pos, offset: c1e.offset }
    };
    if (c1s.pos > c2s.pos) {
      newCoors.start.pos = c2s.pos;
      newCoors.start.offset = c2s.offset;
    } else if (c1s.pos === c2s.pos) {
      newCoors.start.offset = Math.min(c1s.offset, c2s.offset);
    }
    if (c1e.pos < c2e.pos) {
      newCoors.end.pos = c2e.pos;
      newCoors.end.offset = c2e.offset;
    } else if (c1e.pos === c2e.pos) {
      newCoors.end.offset = Math.max(c1e.offset, c2e.offset);
    }
    return _createNewSelection(this.container, newCoors);
  };

  // There should be exactly one
  this.truncate = function(other) {
    var c1 = _coordinates(this.container, this);
    var c2 = _coordinates(this.container, other);
    var newCoors = {};
    if (_isStrictBefore(c2.start, c1.start)) {
      newCoors.start = c1.start;
      newCoors.end = c2.end;
    } else if (_isStrictBefore(c1.end, c2.end)) {
      newCoors.start = c2.start;
      newCoors.end = c1.end;
    } else if (_isEqual(c1.start, c2.start)) {
      if (_isEqual(c1.end, c2.end)) {
        return Selection.nullSelection;
      } else {
        newCoors.start = c2.end;
        newCoors.end = c1.end;
      }
    } else if (_isEqual(c1.end, c2.end)) {
      newCoors.start = c1.start;
      newCoors.end = c2.start;
    }
    return _createNewSelection(this.container, newCoors);
  };

};

Substance.inherit(ContainerSelection, PropertySelection);

module.exports = ContainerSelection;
},{"../basics":122,"./container":138,"./property_selection":153,"./selection":155}],143:[function(require,module,exports){
'use strict';

var Substance = require('../basics');

// path: the address of a property, such as ['text_1', 'content']
// offset: the position in the property
// after: an internal flag indicating if the address should be associated to the left or right side
//   Note: at boundaries of annotations there are two possible positions with the same address
//       foo <strong>bar</strong> ...
//     With offset=7 normally we associate this position:
//       foo <strong>bar|</strong> ...
//     With after=true we can describe this position:
//       foo <strong>bar</strong>| ...
function Coordinate(path, offset, after) {
  this.path = path;
  this.offset = offset;
  this.after = after;
  Object.freeze(path);
  Object.freeze(this);
}

Coordinate.Prototype = function() {

  this.equals = function(other) {
    return (other === this ||
      (Substance.isArrayEqual(other.path, this.path) && other.offset === this.offset) );
  };

  this.withCharPos = function(offset) {
    return new Coordinate(this.path, offset);
  };

  this.getNodeId = function() {
    return this.path[0];
  };

};

Substance.initClass( Coordinate );

module.exports = Coordinate;
},{"../basics":122}],144:[function(require,module,exports){
var Substance = require('../basics');
var PropertySelection = require('./property_selection');
var ContainerSelection = require('./container_selection');
var Coordinate = require('./coordinate');
var Range = require('./range');

// create(range, [, reverse]) -> creates a PropertySelection
// create(coor, [, reverse]) -> creates a collapsed PropertySelection
// create(path, offset[, reverse]) -> creates a collapsed PropertySelection
// create(path, startOffset, endOffset[, reverse]) -> creates an expanded PropertySelection
// create(container, startPath, startOffset, endPath, endOffset) -> creates an expanded ContainerSelection
module.exports = function createSelection(/* arguments */) {
  var container, startPath, startOffset, endPath, endOffset, start, end, reverse;
  var a = arguments;
  if (a[0] instanceof Range) {
    if (Substance.isBoolean(a[1])) {
      reverse = a[1];
    }
    return new PropertySelection(a[0], reverse);
  } else if (a[0] instanceof Coordinate) {
    if (Substance.isBoolean(a[1])) {
      reverse = a[1];
    }
    return new PropertySelection(new Range(a[0], a[0]), reverse);
  } else if (a.length < 5) {
    startPath = a[0];
    startOffset = endOffset = a[1];
    start = end = new Coordinate(startPath, startOffset);
    if (a.length > 2) {
      if (Substance.isBoolean(a[2])) {
        endOffset = startOffset;
        reverse = a[2];
      } else if (Substance.isNumber(a[2])) {
        endOffset = a[2];
        reverse = !!a[3];
        end = new Coordinate(startPath, endOffset);
      }
    }
    /* jshint eqnull:true */
    if ( startPath == null || startOffset == null || endOffset == null ) {
      throw new Error('Illegal arguments: expected (path, offset [, reverse]) or (path, startOffset, endOffset[, reverse])');
    }
    return new PropertySelection(new Range(start, end));
  } else {
    if (!Substance.isArray(arguments[1]) || !Substance.isNumber(arguments[2]) || !Substance.isArray(arguments[3]) || !Substance.isNumber(arguments[4])) {
      throw new Error('Illegal arguments: expected (startPath, startOffset, endPath, endOffset)');
    }
    container = arguments[0];
    startPath = arguments[1];
    startOffset = arguments[2];
    endPath = arguments[3];
    endOffset = arguments[4];
    reverse = !!arguments[5];
    start = new Coordinate(startPath, startOffset);
    if (Substance.isArrayEqual(startPath, endPath)) {
      // return a PropertySelection instead if the given paths are equal
      end = new Coordinate(startPath, endOffset);
    } else {
      end = new Coordinate(endPath, endOffset);
    }
    return new ContainerSelection(container, new Range(start, end));
  }
};

},{"../basics":122,"./container_selection":142,"./coordinate":143,"./property_selection":153,"./range":154}],145:[function(require,module,exports){
'use strict';

var Substance = require('../basics');
var Data = require('../data');

var AnnotationIndex = require('./annotation_index');
var ContainerAnnotationIndex = require('./container_annotation_index');

var TransactionDocument = require('./transaction_document');
var DocumentChange = require('./document_change');

var NotifyByPath = require('./notify_by_path');

function Document( schema, seed ) {
  Substance.EventEmitter.call(this);

  this.schema = schema;
  this.seed = seed;

  this.data = new Data.IncrementalGraph(schema, {
    seed: seed,
    didCreateNode: Substance.bind(this._didCreateNode, this),
    didDeleteNode: Substance.bind(this._didDeleteNode, this),
  });

  // all by type
  this.nodeIndex = this.addIndex('type', Substance.Data.Index.create({
    property: "type"
  }));
  // special index for (property-scoped) annotations
  this.annotationIndex = this.addIndex('annotations', new AnnotationIndex());
  // special index for (contaoiner-scoped) annotations
  this.containerAnnotationIndex = this.addIndex('container-annotations', new ContainerAnnotationIndex());

  // the stage is a essentially a clone of this document
  // used to apply a sequence of document operations
  // without touching this document
  this.stage = new TransactionDocument(this);
  this.isTransacting = false;

  this.done = [];
  this.undone = [];

  // change event proxies are triggered after a document change has been applied
  // before the regular document:changed event is fired.
  // They serve the purpose of making the event notification more efficient
  // In earlier days all observers such as node views where listening on the same event 'operation:applied'.
  // This did not scale with increasing number of nodes, as on every operation all listeners where notified.
  // The proxies filter the document change by interest and then only notify a small set of observers.
  // Example: NotifyByPath notifies only observers which are interested in changes to a certain path.
  this.eventProxies = {
    'path': new NotifyByPath()
  };
}

Document.Prototype = function() {

  this.newInstance = function() {
    return new Document(this.schema);
  };

  this.fromSnapshot = function(data) {
    return new Document(this.schema, data);
  };

  this.getSchema = function() {
    return this.schema;
  };

  this.get = function(path) {
    return this.data.get(path);
  };

  this.getNodes = function() {
    return this.data.getNodes();
  };

  this.addIndex = function(name, index) {
    return this.data.addIndex(name, index);
  };

  this.getIndex = function(name) {
    return this.data.getIndex(name);
  };

  this.getEventProxy = function(name) {
    return this.eventProxies[name];
  };

  this.toJSON = function() {
    return {
      schema: [this.schema.name, this.schema.version],
      nodes: this.getNodes()
    };
  };

  // Document manipulation
  //
  // var tx = doc.startTransaction()
  // tx.create(...);
  // ...
  // tx.save();
  //
  // Note: there is no direct manipulation without transaction
  this.startTransaction = function(beforeState) {
    if (this.isTransacting) {
      throw new Error('Nested transactions are not supported.');
    }
    this.isTransacting = true;
    // TODO: maybe we need to prepare the stage
    this.stage.before = beforeState || {};
    this.emit('transaction:started', this.stage);
    return this.stage;
  };

  this.create = function(nodeData) {
    if (this.isTransacting) {
      this.stage.create(nodeData);
    } else {
      this.stage.create(nodeData);
      this.data.create(nodeData);
    }
    return this.data.get(nodeData.id);
  };

  this.delete = function(nodeId) {
    if (this.isTransacting) {
      this.stage.delete(nodeId);
    } else {
      this.stage.delete(nodeId);
      this.data.delete(nodeId);
    }
  };

  this.set = function(path, value) {
    if (this.isTransacting) {
      this.stage.set(path, value);
    } else {
      this.stage.set(path, value);
      this.data.set(path, value);
    }
  };

  this.update = function(path, diff) {
    if (this.isTransacting) {
      this.stage.update(path, diff);
    } else {
      this.stage.update(path, diff);
      this.data.update(path, diff);
    }
  };

  this._saveTransaction = function(beforeState, afterState, info) {
    if (!this.isTransacting) {
      throw new Error('Not in a transaction.');
    }
    this.isTransacting = false;
    var ops = this.stage.getOperations();
    var documentChange = new DocumentChange(ops, beforeState, afterState);
    // apply the change
    this._apply(documentChange, 'skipStage');
    // push to undo queue and wipe the redo queue
    this.done.push(documentChange);
    this.undone = [];
    this._notifyChangeListeners(documentChange, info);
  };

  this._cancelTransaction = function() {
    if (!this.isTransacting) {
      throw new Error('Not in a transaction.');
    }
    this.isTransacting = false;
  };

  this.undo = function() {
    var change = this.done.pop();
    if (change) {
      var inverted = change.invert();
      this._apply(inverted);
      this.undone.push(inverted);
      this._notifyChangeListeners(inverted, { 'replay': true });
    } else {
      console.error('No change can be undone.');
    }
  };

  this.redo = function(){
    var change = this.undone.pop();
    if (change) {
      var inverted = change.invert();
      this._apply(inverted);
      this.done.push(inverted);
      this._notifyChangeListeners(inverted, { 'replay': true });
    } else {
      console.error('No change can be redone.');
    }
  };

  // Called back by Substance.Data after a node instance has been created
  this._didCreateNode = function(node) {
    // create the node from schema
    node.attach(this);
  };

  this._didDeleteNode = function(node) {
    // create the node from schema
    node.detach(this);
  };

  this._apply = function(documentChange, mode) {
    if (this.isTransacting) {
      throw new Error('Can not replay a document change during transaction.');
    }
    // Note: we apply everything doubled, to keep the staging clone up2date.
    if (mode !== 'skipStage') {
      this.stage.apply(documentChange);
    }
    Substance.each(documentChange.ops, function(op) {
      this.data.apply(op);
    }, this);
  };

  this._notifyChangeListeners = function(documentChange, info) {
    info = info || {};
    Substance.each(this.eventProxies, function(proxy) {
      proxy.onDocumentChanged(documentChange, info);
    });
    this.emit('document:changed', documentChange, info);
  };

};

Substance.inherit(Document, Substance.EventEmitter);

Object.defineProperty(Document.prototype, 'id', {
  get: function() {
    return this.get('document').guid;
  },
  set: function() {
    throw new Error("Id is an immutable property.");
  }
});

module.exports = Document;

},{"../basics":122,"../data":129,"./annotation_index":135,"./container_annotation_index":140,"./document_change":146,"./notify_by_path":152,"./transaction_document":157}],146:[function(require,module,exports){
'use strict';

var Substance = require('../basics');
var PathAdapter = Substance.PathAdapter;

function DocumentChange(ops, before, after) {
  this.ops = ops.slice(0);
  this.before = before;
  this.after = after;
  this.updated= null;
  this._init();
  Object.freeze(this);
  Object.freeze(this.ops);
  Object.freeze(this.before);
  Object.freeze(this.after);
  Object.freeze(this.updated);
}

DocumentChange.Prototype = function() {

  this._init = function() {
    var ops = this.ops;
    var deletes = [];
    var updated = new PathAdapter.Arrays();
    var i;
    for (i = 0; i < ops.length; i++) {
      var op = ops[i];
      if (op.type === "delete") {
        deletes.push(op);
      }
      if (op.type === "set" || op.type === "update") {
        // The old as well the new one is affected
        updated.add(op.path, op);
      }
      // HACK: also register changes to 'path' so that a TextProperty reacts
      // to changes where an annotation is attached
      else if ((op.type === "create" || op.type === "delete") && op.val.path) {
        updated.add(op.val.path, op);
      }
      else if (op.type === "set" && op.path[1] === "path") {
        updated.add(op.val, op);
        updated.add(op.original, op);
      }
    }
    // Remove all updates for properties of nodes that got deleted
    // to prevent that an observer is triggered with no model available anymore.
    for (i = 0; i < deletes.length; i++) {
      var del = deletes[i];
      delete updated[del.val.id];
    }
    this.updated = updated;
  };

  this.isAffected = function(path) {
    var ops = this.updated.get(path);
    return ops && ops.length > 0;
  };

  this.invert = function() {
    var ops = [];
    for (var i = this.ops.length - 1; i >= 0; i--) {
      ops.push(this.ops[i].invert());
    }
    var before = this.after;
    var after = this.before;
    return new DocumentChange(ops, before, after);
  };

  this.traverse = function(fn, ctx) {
    this.updated.traverse(function() {
      fn.apply(ctx, arguments);
    });
  };

};

Substance.initClass(DocumentChange);

module.exports = DocumentChange;

},{"../basics":122}],147:[function(require,module,exports){
'use strict';

var Substance = require('../basics');
var Data = require('../data');

var Node = require('./node');
var Annotation = require('./annotation');
var ContainerNode = require('./container_node');
var ContainerAnnotation = require('./container_annotation');
var TextNode = require('./text_node');

function DocumentSchema(name, version) {
  DocumentSchema.super.call(this, name, version);
}

DocumentSchema.Prototype = function() {

  this.isAnnotationType = function(type) {
    var nodeClass = this.getNodeClass(type);
    return (nodeClass && nodeClass.prototype instanceof Annotation);
  };

  this.getBuiltIns = function() {
    return [ Node, Annotation, ContainerNode, ContainerAnnotation, TextNode ];
  };
};

Substance.inherit( DocumentSchema, Data.Schema );

module.exports = DocumentSchema;

},{"../basics":122,"../data":129,"./annotation":134,"./container_annotation":139,"./container_node":141,"./node":151,"./text_node":156}],148:[function(require,module,exports){
"use strict";

var Substance = require('../basics');
var Annotator = require('./annotator');

function HtmlExporter(config) {
  this.config = config || {};
}

HtmlExporter.Prototype = function() {

  this.toHtml = function(document, options) {
    options = {} || options;
    var containers = options.containers || ['content'];

    var state =  {
      document: document,
      options: options,
      output: []
    };

    for (var i = 0; i < containers.length; i++) {
      var container = document.get(containers[i]);
      this.container(state, container);
    }
    return state.output.join('');
  };

  this.container = function(state, containerNode) {
    var nodeIds = containerNode.nodes;
    for (var i = 0; i < nodeIds.length; i++) {
      var node = state.document.get(nodeIds[i]);
      switch(node.type) {
        case "heading":
          return this.heading(state, node);
        case "text":
          return this.text(state, node);
        default:
          console.error('Not yet implemented: ', node.type, node);
      }
    }
  };

  this.heading = function(state, node) {
    var tag = 'h' + node.level;
    state.output.push('<'+tag+'>');
    this.annotatedText(state, [node.id, 'content']);
    state.output.push('</'+tag+'>');
  };

  this.text = function(state, node) {
    state.output.push('<p>');
    this.annotatedText(state, [node.id, 'content']);
    state.output.push('</p>');
  };

  this.annotatedText = function(state, path) {
    var doc = state.document;
    var text = doc.get(path);

    var annotations = doc.getIndex('annotations').get(path);

    // this splits the text and annotations into smaller pieces
    // which is necessary to generate proper HTML.
    var annotator = new Annotator();
    var stack = [];

    annotator.onText = function(context, text) {
      state.output.push(text);
    };

    annotator.onEnter = function(entry) {
      var anno = doc.get(entry.id);
      switch (anno.type) {
        case 'strong':
          state.output.push('<b>');
          break;
        case 'emphasis':
          state.output.push('<i>');
          break;
        case 'entity_reference':
          state.output.push('<span class="'+ anno.type + '" data-target="'+ anno.target +'">');
          break;
        case 'subject_reference':
          state.output.push('<span class="'+ anno.type + '" data-target="'+ anno.target.join(',') +'">');
          break;
        default:
          state.output.push('<span class="'+anno.type);
          console.error('Not yet supported:', anno.type, anno);
      }
      stack.push(anno);
      return anno;
    };

    annotator.onExit = function() {
      var anno = stack.pop();
      switch (anno.type) {
        case 'strong':
          state.output.push('</b>');
          break;
        case 'emphasis':
          break;
        default:
          console.error('Not yet supported:', anno.type, anno);
      }
    };

    // this calls onText and onEnter in turns...
    annotator.start(null, text, annotations);
  };

};

Substance.initClass(HtmlExporter);

module.exports = HtmlExporter;

},{"../basics":122,"./annotator":137}],149:[function(require,module,exports){
var Substance = require('../basics');

function HtmlImporter( config ) {
  this.config = config || {};

  this.nodeTypes = [];

  this.blockTypes = [];

  this.inlineTypes = [];

  // register converters defined in schema
  if (config.schema) {
    config.schema.each(function(NodeClass) {
      // ATM Node.matchElement is required
      if (!NodeClass.static.matchElement) {
        return;
      }
      this.nodeTypes.push(NodeClass);
      if (NodeClass.static.blockType) {
        this.blockTypes.push(NodeClass);
      } else {
        this.inlineTypes.push(NodeClass);
      }
    }, this);
  }
}

HtmlImporter.Prototype = function HtmlImporterPrototype() {

  this.initialize = function(doc, rootEl) {
    var state = {
      doc: doc,
      rootEl: rootEl,
      inlineNodes: [],
      trimWhitespaces: !!this.config.trimWhitespaces,
      // properties
      contexts: [],
      // state for reentrant calls
      reentrant: null,
      lastChar: "",
      skipTypes: {},
      ignoreAnnotations: false,
    };
    if (!doc.get('content')) {
      doc.create({
        'type': 'container',
        'id': 'content',
        nodes: []
      });
    }
    state.containerNode = doc.get('content');
    this.state = state;
  };

  this.convert = function(rootEl, doc) {
    this.initialize(doc, rootEl);
    this.body(rootEl);
    // create annotations afterwards so that the targeted nodes
    // exist for sure
    for (var i = 0; i < this.state.inlineNodes.length; i++) {
      doc.create(this.state.inlineNodes[i]);
    }
  };

  this.convertDocument = function(htmlDoc, doc) {
    var body = htmlDoc.getElementsByTagName( 'body' )[0];
    body = this.sanitizeHtmlDoc(body);
    console.log('Sanitized html:', body.innerHTML);

    this.initialize(doc, body);
    this.body(body);
    // create annotations afterwards so that the targeted nodes
    // exist for sure
    for (var i = 0; i < this.state.inlineNodes.length; i++) {
      doc.create(this.state.inlineNodes[i]);
    }
  };

  this.sanitizeHtmlDoc = function(body) {
    var newRoot = body;
    // Look for paragraphs in <b> which is served by GDocs.
    var gdocs = body.querySelector('b > p');
    if (gdocs) {
      return gdocs.parentNode;
    }
    return newRoot;
  };

  this.convertElement = function(el) {
    var doc = this.state.doc;
    var nodeType = this._getNodeTypeForElement(el);
    if (!nodeType) {
      console.error("Could not find a node class associated to element", el);
      throw new Error("Could not find a node class associated to element");
    }
    var node = nodeType.static.fromHtml(el, this);
    node.type = nodeType.static.name;
    node.id = node.id || Substance.uuid(node.type);
    doc.create(node);
    return node;
  };

  this.body = function(body) {
    var state = this.state;
    var doc = state.doc;
    var containerNode = state.containerNode;
    var childIterator = new HtmlImporter.ChildNodeIterator(body);
    while(childIterator.hasNext()) {
      var el = childIterator.next();
      var blockType = this._getBlockTypeForElement(el);
      if (blockType) {
        var node = blockType.static.fromHtml(el, this);
        if (!node) {
          throw new Error("Contract: a Node's fromHtml() method must return a node");
        } else {
          node.type = blockType.static.name;
          node.id = node.id || Substance.uuid(node.type);
          doc.create(node);
          containerNode.show(node.id);
        }
      } else {
        // TODO: maybe we put that thing just here into a paragraph
        // and then continue?
        console.warn("Skipping node on block level", el);
      }
    }
  };

  /**
   * Parse annotated text
   *
   * Make sure you call this method only for elements where `this.isParagraphish(elements) === true`
   */
  this.annotatedText = function(el, path, options) {
    options = options || {};
    var state = this.state;
    if (path) {
      if (state.reentrant) {
        throw new Error('Contract: it is not allowed to bind a new call annotatedText to a path while the previous has not been completed.');
      }
      state.contexts.push({
        path: path
      });
      state.reentrant = {
        offset:options.offset || 0,
        text: ""
      };
    }
    var iterator = new HtmlImporter.ChildNodeIterator(el);
    var text = this._annotatedText(iterator);
    // append the text of the last reentrant call
    // state.reentrant.text = state.reentrant.text.concat(text);
    if (path) {
      state.contexts.pop();
      state.reentrant = null;
    }
    return text;
  };

  // Internal function for parsing annotated text
  // --------------------------------------------
  //
  this._annotatedText = function(iterator) {
    var state = this.state;
    var context = state.contexts[state.contexts.length-1];
    var reentrant = state.reentrant;
    var plainText = "";
    if (!reentrant) {
      throw new Error('Illegal state: state.reentrant is null.');
    }
    while(iterator.hasNext()) {
      var el = iterator.next();
      // Plain text nodes...
      if (el.nodeType === window.Document.TEXT_NODE) {
        var text = this._prepareText(state, el.textContent);
        if (text.length) {
          // Note: text is not merged into the reentrant state
          // so that we are able to return for this reentrant call
          plainText = plainText.concat(text);
          reentrant.offset += text.length;
        }
      } else if (el.nodeType === window.Document.COMMENT_NODE) {
        // skip comment nodes
        continue;
      } else {
        var inlineType = this._getInlineTypeForElement(el);
        if (!inlineType) {
          var blockType = this._getInlineTypeForElement(el);
          if (blockType) {
            throw new Error('Expected inline element. Found block element:', el);
          }
          console.warn('Unsupported inline element. We will not create an annotation for it, but process its children to extract annotated text.', el);
          plainText = plainText.concat(this.annotatedText(el));
          continue;
        }
        // reentrant: we delegate the conversion to the inline node class
        // it will either call us back (this.annotatedText) or give us a finished
        // node instantly (self-managed)
        var startOffset = reentrant.offset;
        var inlineNode;
        if (inlineType.static.fromHtml) {
          inlineNode = inlineType.static.fromHtml(el, this);
          if (!inlineNode) {
            throw new Error("Contract: a Node's fromHtml() method must return a node");
          }
        } else {
          inlineNode = {};
          plainText = plainText.concat(this.annotatedText(el));
        }
        // in the mean time the offset will probably have changed to reentrant calls
        var endOffset = reentrant.offset;
        inlineNode.type = inlineType.static.name;
        inlineNode.id = inlineType.id || Substance.uuid(inlineNode.type);
        inlineNode.range = [startOffset, endOffset];
        inlineNode.path = context.path.slice(0);
        state.inlineNodes.push(inlineNode);
      }
    }
    // return the plain text collected during this reentrant call
    return plainText;
  };

  this.getCurrentPath = function() {
    var currentContext = this.state.contexts[this.state.contexts.length-1];
    return currentContext.path;
  };

  this._getBlockTypeForElement = function(el) {
    // HACK: tagName does not exist for prmitive nodes such as DOM TextNode.
    if (!el.tagName) return null;
    for (var i = 0; i < this.blockTypes.length; i++) {
      if (this.blockTypes[i].static.matchElement(el)) {
        return this.blockTypes[i];
      }
    }
  };

  this._getInlineTypeForElement = function(el) {
    for (var i = 0; i < this.inlineTypes.length; i++) {
      if (this.inlineTypes[i].static.matchElement(el)) {
        return this.inlineTypes[i];
      }
    }
  };

  this._getNodeTypeForElement = function(el) {
    for (var i = 0; i < this.nodeTypes.length; i++) {
      if (this.nodeTypes[i].static.matchElement(el)) {
        return this.nodeTypes[i];
      }
    }
  };

  this._getDomNodeType = function(el) {
    if (el.nodeType === window.Document.TEXT_NODE) {
      return "text";
    } else if (el.nodeType === window.Document.COMMENT_NODE) {
      return "comment";
    } else if (el.tagName) {
      return el.tagName.toLowerCase();
    } else {
      throw new Error("Unknown node type");
    }
  };

  var WS_LEFT = /^\s+/g;
  var WS_LEFT_ALL = /^\s*/g;
  var WS_RIGHT = /\s+$/g;
  var WS_ALL = /\s+/g;
  // var ALL_WS_NOTSPACE_LEFT = /^[\t\n]+/g;
  // var ALL_WS_NOTSPACE_RIGHT = /[\t\n]+$/g;
  var SPACE = " ";
  var TABS_OR_NL = /[\t\n\r]+/g;

  this._prepareText = function(state, text) {
    if (!state.trimWhitespaces) {
      return text;
    }
    // EXPERIMENTAL: drop all 'formatting' white-spaces (e.g., tabs and new lines)
    // (instead of doing so only at the left and right end)
    //text = text.replace(ALL_WS_NOTSPACE_LEFT, "");
    //text = text.replace(ALL_WS_NOTSPACE_RIGHT, "");
    text = text.replace(TABS_OR_NL, "");
    if (state.lastChar === SPACE) {
      text = text.replace(WS_LEFT_ALL, "");
    } else {
      text = text.replace(WS_LEFT, SPACE);
    }
    text = text.replace(WS_RIGHT, SPACE);
    // EXPERIMENTAL: also remove white-space within
    if (this.config.REMOVE_INNER_WS) {
      text = text.replace(WS_ALL, SPACE);
    }
    state.lastChar = text[text.length-1] || state.lastChar;
    return text;
  };


  // The following is EXPERIMENTAL code that
  // is dealing with specialties of HTML from the clipboard.
  // TODO: needs to be engineered

};
HtmlImporter.prototype = new HtmlImporter.Prototype();

HtmlImporter.ChildNodeIterator = function(arg) {
  this.nodes = arg.childNodes;
  this.length = this.nodes.length;
  this.pos = -1;
};

HtmlImporter.ChildNodeIterator.Prototype = function() {
  this.hasNext = function() {
    return this.pos < this.length - 1;
  };
  this.next = function() {
    this.pos += 1;
    return this.nodes[this.pos];
  };
  this.back = function() {
    if (this.pos >= 0) {
      this.pos -= 1;
    }
    return this;
  };
};
HtmlImporter.ChildNodeIterator.prototype = new HtmlImporter.ChildNodeIterator.Prototype();

module.exports = HtmlImporter;

},{"../basics":122}],150:[function(require,module,exports){
'use strict';

var Document = require('./document');

Document.Schema = require('./document_schema');

Document.Node = require('./node');
Document.Annotation = require('./annotation');
Document.Container = require('./container');
Document.ContainerNode = require('./container_node');
Document.ContainerAnnotation = require('./container_annotation');
Document.TextNode = require('./text_node');

Document.Coordinate = require('./coordinate');
Document.Range = require('./range');
Document.Selection = require('./selection');
Document.Selection.create = require('./create_selection');
Document.NullSelection = Document.Selection.NullSelection;
Document.nullSelection = Document.Selection.NullSelection;
Document.PropertySelection = require('./property_selection');
Document.ContainerSelection = require('./container_selection');

Document.Annotator = require('./annotator');
Document.AnnotationUpdates = require('./annotation_updates');

Document.HtmlImporter = require('./html_importer');
Document.HtmlExporter = require('./html_exporter');

module.exports = Document;

},{"./annotation":134,"./annotation_updates":136,"./annotator":137,"./container":138,"./container_annotation":139,"./container_node":141,"./container_selection":142,"./coordinate":143,"./create_selection":144,"./document":145,"./document_schema":147,"./html_exporter":148,"./html_importer":149,"./node":151,"./property_selection":153,"./range":154,"./selection":155,"./text_node":156}],151:[function(require,module,exports){
'use strict';

var Data = require('../data');

var Node = Data.Node.extend({

  name: "node",

  attach: function( document ) {
    this.document = document;
  },

  detach: function() {
    this.document = null;
  },

  isAttached: function() {
    return this.document !== null;
  },

  getDocument: function() {
    return this.document;
  },

  hasParent: function() {
    return false;
  },

  getParentNode: function() {
    return this.document.get(this.parentId);
  },

  isResilient: function() {
    return false;
  },

});

module.exports = Node;

},{"../data":129}],152:[function(require,module,exports){
'use strict';

var Substance = require('../basics');
var PathAdapter = Substance.PathAdapter;

var NotifyByPathProxy = function() {
  this.listeners = new PathAdapter();
};

NotifyByPathProxy.Prototype = function() {

  this.onDocumentChanged = function(change, info) {
    var listeners = this.listeners;
    change.traverse(function(path, ops) {
      var key = path.concat(['listeners']);
      var scopedListeners = listeners.get(key);
      Substance.each(scopedListeners, function(entry) {
        entry.method.call(entry.listener, change, info);
      });
    }, this);
  };

  this.add = function(path, listener, method) {
    var key = path.concat(['listeners']);
    var listeners = this.listeners.get(key);
    if (!listeners) {
      listeners = [];
      this.listeners.set(key, listeners);
    }
    if (!method) {
      throw new Error('Invalid argument: expected function but got ' + method);
    }
    listeners.push({ method: method, listener: listener });
  };

  // TODO: it would be cool if we would just need to provide the listener instance, no path
  this.remove = function(path, listener) {
    var key = path.concat(['listeners']);
    var listeners = this.listeners.get(key);
    if (listeners) {
      for (var i = 0; i < listeners.length; i++) {
        if (listeners[i].listener === listener) {
          listeners.splice(i, 1);
          return;
        }
      }
    }
  };
};

Substance.initClass(NotifyByPathProxy);

module.exports = NotifyByPathProxy;

},{"../basics":122}],153:[function(require,module,exports){
'use strict';

var Substance = require('../basics');
var Selection = require('./selection');

function PropertySelection(range, reverse) {
  this.range = range;
  this.reverse = reverse;
  this._internal = {};
  Object.freeze(this);
}

PropertySelection.Prototype = function() {

  Substance.extend(this, Selection.prototype);

  this.isNull = function() {
    return false;
  };

  this.getRanges = function() {
    return [this.range];
  };

  this.getRange = function() {
    return this.range;
  };

  this.isCollapsed = function() {
    return this.range.isCollapsed();
  };

  this.isReverse = function() {
    return this.reverse;
  };

  this.isPropertySelection = function() {
    return true;
  };

  this.isMultiSeletion = function() {
    return false;
  };

  this.equals = function(other) {
    return (
      Selection.prototype.equals(other) &&
      this.range.equals(other.range)
    );
  };

  this.collapse = function(direction) {
    var coor;
    if (direction === 'left') {
      coor = this.range.start;
    } else {
      coor = this.range.end;
    }
    return Selection.create(coor);
  };

  // Helper Methods
  // ----------------------

  this.getPath = function() {
    return this.range.start.path;
  };

  this.getTextRange = function() {
    return [this.range.start.offset, this.range.end.offset];
  };

  this.toString = function() {
    return [
      "PropertySelection(", JSON.stringify(this.range.start.path), ", ",
        this.range.start.offset, " -> ", this.range.end.offset,
        (this.reverse?", reverse":""),
        (this.range.start.after?", after":""),
      ")"
    ].join('');
  };
};

Substance.inherit(PropertySelection, Selection);

Object.defineProperties(PropertySelection.prototype, {
  start: {
    get: function() {
      return this.range.start;
    },
    set: function() { throw new Error('immutable.'); }
  },
  end: {
    get: function() {
      return this.range.end;
    },
    set: function() { throw new Error('immutable.'); }
  },
});

module.exports = PropertySelection;

},{"../basics":122,"./selection":155}],154:[function(require,module,exports){
'use strict';

var Substance = require('../basics');

var Range = function(start, end) {
  this.start = start;
  this.end = end;
  Object.freeze(this);
};

Range.Prototype = function() {

  this.isCollapsed = function() {
    return this.start === this.end;
  };

  this.equals = function(other) {
    if (this === other) return true;
    else return (this.start.equals(other.start) && this.end.equals(other.end));
  };

};

Substance.initClass(Range);

module.exports = Range;

},{"../basics":122}],155:[function(require,module,exports){
'use strict';

var Substance = require('../basics');

function Selection() {
}

Selection.Prototype = function() {

  this.getRanges = function() {
    return [];
  };

  this.isNull = function() {
    return true;
  };

  this.isMultiSeletion = function() {
    return false;
  };

  this.isPropertySelection = function() {
    return false;
  };

  this.isContainerSelection = function() {
    return false;
  };

  this.isCollapsed = function() {
    return true;
  };

  this.isReverse = function() {
    return false;
  };

  this.equals = function(other) {
    if (this === other) {
      return true ;
    } else if (!other) {
      return false;
    } else if (this.isNull() !== other.isNull()) {
      return false;
    } else if (this.isReverse() !== other.isReverse()) {
      return false;
    } else if (this.isPropertySelection() !== other.isPropertySelection()) {
      return false;
    }
  };

  this.toString = function() {
    return "null";
  };

};

Substance.initClass(Selection);

Selection.NullSelection = Object.freeze(new Selection());
Selection.nullSelection = Selection.NullSelection;

// this is set in index as it has dependencies to sub-classes
// which can't be required here to avoid cyclic dep.
Selection.create = null;

module.exports = Selection;

},{"../basics":122}],156:[function(require,module,exports){
'use strict';

var Node = require('./node');

// Text Node
// ---------
//
// A base class for all text-ish nodes, such as Paragraphs, Headings,
// Prerendered, etc.

var TextNode = Node.extend({
  name: "text",
  properties: {
    content: 'string'
  },
});

module.exports = TextNode;

},{"./node":151}],157:[function(require,module,exports){
'use strict';

var Substance = require('../basics');
var Data = require('../data');

function TransactionDocument(document) {

  this.document = document;
  this.schema = document.schema;
  this.ops = [];
  // app information state information used to recover the state before the transaction
  // when calling undo
  this.before = {};

  this.data = new Data.IncrementalGraph(document.schema, {
    seed: document.data.seed,
    didCreateNode: Substance.bind(this._didCreateNode, this),
    didDeleteNode: Substance.bind(this._didDeleteNode, this),
  });

  Substance.each(document.data.indexes, function(index, name) {
    this.data.addIndex(name, index.clone());
  }, this);

}

TransactionDocument.Prototype = function() {

  this.reset = function() {
    this.ops = [];
    this.before = {};
  };

  this.get = function(path) {
    return this.data.get(path);
  };

  this.create = function(nodeData) {
    var op = this.data.create(nodeData);
    if (this.document.isTransacting) {
      this.ops.push(op);
    }
    return this.data.get(nodeData.id);
  };

  this.delete = function(nodeId) {
    var op = this.data.delete(nodeId);
    if (this.document.isTransacting) {
      this.ops.push(op);
    }
  };

  this.set = function(path, value) {
    var op = this.data.set(path, value);
    if (this.document.isTransacting) {
      this.ops.push(op);
    }
  };

  this.update = function(path, diffOp) {
    var op = this.data.update(path, diffOp);
    if (this.document.isTransacting) {
      this.ops.push(op);
    }
  };

  this.save = function(afterState, info) {
    var before = this.before;
    var after = Substance.extend({}, before, afterState);
    this.document._saveTransaction(before, after, info);
    // reset after finishing
    this.reset();
  };

  this.cancel = function() {
    // revert all recorded changes
    for (var i = this.ops.length - 1; i >= 0; i--) {
      this.data.apply(this.ops[i].invert());
    }
    this.document._cancelTransaction();
    this.reset();
  };

  this.finish = function() {
    if (this.document.isTransacting) {
      this.cancel();
    }
  };

  this.cleanup = this.finish;

  this.getOperations = function() {
    return this.ops;
  };

  this.apply = function(documentChange) {
    Substance.each(documentChange.ops, function(op) {
      this.data.apply(op);
    }, this);
  };

  this.getIndex = function(name) {
    return this.data.getIndex(name);
  };

  // Called back by Substance.Data after a node instance has been created
  this._didCreateNode = function(node) {
    // create the node from schema
    node.attach(this);
  };

  this._didDeleteNode = function(node) {
    // create the node from schema
    node.detach(this);
  };

};

Substance.initClass(TransactionDocument);

module.exports = TransactionDocument;
},{"../basics":122,"../data":129}],158:[function(require,module,exports){
'use strict';

var Substance = require('../basics');
var Operation = require('./operation');
var Conflict = require('./conflict');

var NOP = "NOP";
var DEL = "delete";
var INS = "insert";

var ArrayOperation = function(options) {

  if (options.type === undefined) {
    throw new Error("Illegal argument: insufficient data.");
  }

  // Insert: '+', Delete: '-', Move: '>>'
  this.type = options.type;

  if (this.type === NOP) return;

  // the position where to apply the operation
  this.pos = options.pos;

  // the string to delete or insert
  this.val = options.val;

  // sanity checks
  if(this.type !== NOP && this.type !== INS && this.type !== DEL) {
    throw new Error("Illegal type.");
  }

  if (this.type === INS || this.type === DEL) {
    if (this.pos === undefined || this.val === undefined) {
      throw new Error("Illegal argument: insufficient data.");
    }
    if (!Substance.isNumber(this.pos) && this.pos < 0) {
      throw new Error("Illegal argument: expecting positive number as pos.");
    }
  }
};

ArrayOperation.fromJSON = function(data) {
  return new ArrayOperation(data);
};

ArrayOperation.Prototype = function() {

  this.apply = function(array) {
    if (this.type === NOP) {
      return array;
    }
    if (this.type === INS) {
      if (array.length < this.pos) {
        throw new Error("Provided array is too small.");
      }
      array.splice(this.pos, 0, this.val);
      return array;
    }
    // Delete
    else if (this.type === DEL) {
      if (array.length < this.pos) {
        throw new Error("Provided array is too small.");
      }
      if (!Substance.isEqual(array[this.pos], this.val)) {
        throw Error("Unexpected value at position " + this.pos + ". Expected " + this.val + ", found " + array[this.pos]);
      }
      array.splice(this.pos, 1);
      return array;
    }
    else {
      throw new Error("Illegal state.");
    }
  };

  this.clone = function() {
    return new ArrayOperation(this);
  };

  this.invert = function() {
    var data = this.toJSON();
    if (this.type === INS) data.type = DEL;
    else if (this.type === DEL) data.type = INS;
    else if (this.type === NOP) data.type = NOP;
    else {
      throw new Error("Illegal state.");
    }
    return new ArrayOperation(data);
  };

  this.hasConflict = function(other) {
    return ArrayOperation.hasConflict(this, other);
  };

  this.toJSON = function() {
    var result = {
      type: this.type,
    };
    if (this.type === NOP) return result;
    result.pos = this.pos;
    result.val = this.val;
    return result;
  };

  this.isInsert = function() {
    return this.type === INS;
  };

  this.isDelete = function() {
    return this.type === DEL;
  };

  this.getOffset = function() {
    return this.pos;
  };

  this.getValue = function() {
    return this.val;
  };

  this.isNOP = function() {
    return this.type === NOP;
  };
};

Substance.inherit(ArrayOperation, Operation);

var _NOP = 0;
var _DEL = 1;
var _INS = 2;

var CODE = {};
CODE[NOP] = _NOP;
CODE[DEL] = _DEL;
CODE[INS] = _INS;

var _hasConflict = [];

_hasConflict[_DEL | _DEL] = function(a,b) {
  return a.pos === b.pos;
};

_hasConflict[_DEL | _INS] = function() {
  return false;
};

_hasConflict[_INS | _INS] = function(a,b) {
  return a.pos === b.pos;
};

/*
  As we provide Move as quasi atomic operation we have to look at it conflict potential.

  A move is realized as composite of Delete and Insert.

  M / I: ( -> I / I conflict)

    m.s < i && m.t == i-1
    else i && m.t == i

  M / D: ( -> D / D conflict)

    m.s === d

  M / M:

    1. M/D conflict
    2. M/I conflict
*/

var hasConflict = function(a, b) {
  if (a.type === NOP || b.type === NOP) return false;
  var caseId = CODE[a.type] | CODE[b.type];
  if (_hasConflict[caseId]) {
    return _hasConflict[caseId](a,b);
  } else {
    return false;
  }
};

var transform0;

function transform_insert_insert(a, b, first) {

  if (a.pos === b.pos) {
    if (first) {
      b.pos += 1;
    } else {
      a.pos += 1;
    }
  }
  // a before b
  else if (a.pos < b.pos) {
    b.pos += 1;
  }

  // a after b
  else  {
    a.pos += 1;
  }

}

function transform_delete_delete(a, b) {

  // turn the second of two concurrent deletes into a NOP
  if (a.pos === b.pos) {
    b.type = NOP;
    a.type = NOP;
    return;
  }

  if (a.pos < b.pos) {
    b.pos -= 1;
  } else {
    a.pos -= 1;
  }

}

function transform_insert_delete(a, b) {

  // reduce to a normalized case
  if (a.type === DEL) {
    var tmp = a;
    a = b;
    b = tmp;
  }

  if (a.pos <= b.pos) {
    b.pos += 1;
  } else {
    a.pos -= 1;
  }

}

transform0 = function(a, b, options) {

  options = options || {};

  if (options.check && hasConflict(a, b)) {
    throw new Conflict(a, b);
  }

  if (!options.inplace) {
    a = Substance.clone(a);
    b = Substance.clone(b);
  }

  if (a.type === NOP || b.type === NOP)  {
    // nothing to transform
  }
  else if (a.type === INS && b.type === INS)  {
    transform_insert_insert(a, b, true);
  }
  else if (a.type === DEL && b.type === DEL) {
    transform_delete_delete(a, b, true);
  }
  else {
    transform_insert_delete(a, b, true);
  }

  return [a, b];
};

ArrayOperation.transform = transform0;
ArrayOperation.hasConflict = hasConflict;

/* Factories */

ArrayOperation.Insert = function(pos, val) {
  return new ArrayOperation({type:INS, pos: pos, val: val});
};

ArrayOperation.Delete = function(pos, val) {
  return new ArrayOperation({ type:DEL, pos: pos, val: val });
};

ArrayOperation.NOP = NOP;
ArrayOperation.DELETE = DEL;
ArrayOperation.INSERT = INS;

// Export
// ========

module.exports = ArrayOperation;

},{"../basics":122,"./conflict":159,"./operation":162}],159:[function(require,module,exports){
'use strict';

function Conflict(a, b) {
  Error.call(this, "Conflict: " + JSON.stringify(a) +" vs " + JSON.stringify(b));
  this.a = a;
  this.b = b;
}
Conflict.prototype = Error.prototype;

module.exports = Conflict;

},{}],160:[function(require,module,exports){
'use strict';

module.exports = {
  Operation: require('./operation'),
  TextOperation: require('./text_operation'),
  ArrayOperation: require('./array_operation'),
  ObjectOperation: require('./object_operation')
};

},{"./array_operation":158,"./object_operation":161,"./operation":162,"./text_operation":163}],161:[function(require,module,exports){
'use strict';

var Substance = require('../basics');
var PathAdapter = Substance.PathAdapter;

var Operation = require('./operation');
var TextOperation = require('./text_operation');
var ArrayOperation = require('./array_operation');

var Conflict = require('./conflict');

var NOP = "NOP";
var CREATE = "create";
var DELETE = 'delete';
var UPDATE = 'update';
var SET = 'set';

var ObjectOperation = function(data) {
  this.type = data.type;
  this.path = data.path;

  if (this.type === CREATE || this.type === DELETE) {
    this.val = data.val;
  }
  // Updates can be given as value or as Operation (Text, Array)
  else if (this.type === UPDATE) {
    if (data.diff !== undefined) {
      this.diff = data.diff;
      this.propertyType = data.propertyType;
    } else {
      throw new Error("Illegal argument: update by value or by diff must be provided");
    }
  }
  else if (this.type === SET) {
    this.val = data.val;
    this.original = data.original;
  }
  this.data = data.data;
};

ObjectOperation.fromJSON = function(data) {
  var op = new ObjectOperation(data);
  if (data.type === "update") {
    switch (data.propertyType) {
    case "string":
      op.diff = TextOperation.fromJSON(op.diff);
      break;
    case "array":
      op.diff = ArrayOperation.fromJSON(op.diff);
      break;
    default:
      throw new Error("Don't know how to deserialize this operation:" + JSON.stringify(data));
    }
  }
  return op;
};

ObjectOperation.Prototype = function() {

  this.apply = function(obj) {
    if (this.type === NOP) return obj;
    var adapter;
    if (obj instanceof PathAdapter) {
      adapter = obj;
    } else {
      adapter = new PathAdapter(obj);
    }
    if (this.type === CREATE) {
      adapter.set(this.path, Substance.clone(this.val));
      return obj;
    }
    if (this.type === DELETE) {
      adapter.delete(this.path, "strict");
    }
    else if (this.type === UPDATE) {
      var diff = this.diff;
      var oldVal = adapter.get(this.path);
      var newVal;
      if (this.propertyType === 'array') {
        if (! (diff instanceof ArrayOperation) ) {
          diff = ArrayOperation.fromJSON(diff);
        }
        newVal = diff.apply(oldVal);
      }
      else if (this.propertyType === 'string') {
        if (! (diff instanceof TextOperation) ) {
          diff = TextOperation.fromJSON(diff);
        }
        newVal = diff.apply(oldVal);
      }
      else {
        throw new Error("Unsupported type for operational update.");
      }
      adapter.set(this.path, newVal);
    }
    else if (this.type === SET) {
      // clone here as the operations value must not be changed
      adapter.set(this.path, Substance.clone(this.val));
    }
    else {
      throw new Error("Illegal state.");
    }
    return obj;
  };

  this.clone = function() {
    return new ObjectOperation(this);
  };

  this.isNOP = function() {
    if (this.type === NOP) return true;
    else if (this.type === UPDATE) return this.diff.isNOP();
  };

  this.invert = function() {

    if (this.type === NOP) {
      return { type: NOP };
    }

    var result = new ObjectOperation(this);

    if (this.type === CREATE) {
      result.type = DELETE;
    }

    else if (this.type === DELETE) {
      result.type = CREATE;
    }

    else if (this.type === UPDATE) {
      var invertedDiff;
      if (this.propertyType === 'string') {
        invertedDiff = TextOperation.fromJSON(this.diff).invert();
      }
      else if (this.propertyType === 'array') {
        invertedDiff = ArrayOperation.fromJSON(this.diff).invert();
      }
      result.diff = invertedDiff;
      result.propertyType = this.propertyType;
    }

    else if (this.type === SET) {
      result.val = this.original;
      result.original = this.val;
    }

    else {
      throw new Error("Illegal state.");
    }

    return result;
  };

  this.hasConflict = function(other) {
    return ObjectOperation.hasConflict(this, other);
  };

  this.toJSON = function() {

    if (this.type === NOP) {
      return { type: NOP };
    }

    var data = {
      type: this.type,
      path: this.path,
      data: this.data
    };

    if (this.type === CREATE || this.type === DELETE) {
      data.val = this.val;
    }

    else if (this.type === UPDATE) {
      data.diff = this.diff;
      if (this.diff instanceof ObjectOperation) {
        data.propertyType = "object";
      } else if (this.diff instanceof ArrayOperation) {
        data.propertyType = "array";
      } else if (this.diff instanceof TextOperation) {
        data.propertyType = "string";
      }
    }

    else if (this.type === SET) {
      data.val = this.val;
      data.original = this.original;
    }

    return data;
  };

};

Substance.inherit(ObjectOperation, Operation);

/* Low level implementation */

var hasConflict = function(a, b) {
  if (a.type === NOP || b.type === NOP) return false;

  return Substance.isEqual(a.path, b.path);
};

var transform_delete_delete = function(a, b) {
  // both operations have the same effect.
  // the transformed operations are turned into NOPs
  a.type = NOP;
  b.type = NOP;
};

var transform_create_create = function() {
  // TODO: maybe it would be possible to create an differntial update that transforms the one into the other
  // However, we fail for now.
  throw new Error("Can not transform two concurring creates of the same property");
};

var transform_delete_create = function(a, b, flipped) {
  if (a.type !== DELETE) {
    return transform_delete_create(b, a, true);
  }

  if (!flipped) {
    a.type = NOP;
  } else {
    a.val = b.val;
    b.type = NOP;
  }
};

var transform_delete_update = function(a, b, flipped) {
  if (a.type !== DELETE) {
    return transform_delete_update(b, a, true);
  }

  var op;
  if (b.propertyType === 'string') {
    op = TextOperation.fromJSON(b.diff);
  } else if (b.propertyType === 'array') {
    op = ArrayOperation.fromJSON(b.diff);
  }

  // (DELETE, UPDATE) is transformed into (DELETE, CREATE)
  if (!flipped) {
    a.type = NOP;
    b.type = CREATE;
    b.val = op.apply(a.val);
  }
  // (UPDATE, DELETE): the delete is updated to delete the updated value
  else {
    a.val = op.apply(a.val);
    b.type = NOP;
  }

};

var transform_create_update = function() {
  // it is not possible to reasonably transform this.
  throw new Error("Can not transform a concurring create and update of the same property");
};

var transform_update_update = function(a, b) {

  // Note: this is a conflict the user should know about

  var op_a, op_b, t;
  if (b.propertyType === 'string') {
    op_a = TextOperation.fromJSON(a.diff);
    op_b = TextOperation.fromJSON(b.diff);
    t = TextOperation.transform(op_a, op_b, {inplace: true});
  } else if (b.propertyType === 'array') {
    op_a = ArrayOperation.fromJSON(a.diff);
    op_b = ArrayOperation.fromJSON(b.diff);
    t = ArrayOperation.transform(op_a, op_b, {inplace: true});
  } else if (b.propertyType === 'object') {
    op_a = ObjectOperation.fromJSON(a.diff);
    op_b = ObjectOperation.fromJSON(b.diff);
    t = ObjectOperation.transform(op_a, op_b, {inplace: true});
  }

  a.diff = t[0];
  b.diff = t[1];
};

var transform_create_set = function(a, b, flipped) {
  if (a.type !== CREATE) return transform_create_set(b, a, true);

  if (!flipped) {
    a.type = NOP;
    b.original = a.val;
  } else {
    a.type = SET;
    a.original = b.val;
    b.type = NOP;
  }

};

var transform_delete_set = function(a, b, flipped) {
  if (a.type !== DELETE) return transform_delete_set(b, a, true);

  if (!flipped) {
    a.type = NOP;
    b.type = CREATE;
    b.original = undefined;
  } else {
    a.val = b.val;
    b.type = NOP;
  }

};

var transform_update_set = function() {
  throw new Error("Can not transform update/set of the same property.");
};

var transform_set_set = function(a, b) {
  a.type = NOP;
  b.original = a.val;
};

var _NOP = 0;
var _CREATE = 1;
var _DELETE = 2;
var _UPDATE = 4;
var _SET = 8;

var CODE = {};
CODE[NOP] =_NOP;
CODE[CREATE] = _CREATE;
CODE[DELETE] = _DELETE;
CODE[UPDATE] = _UPDATE;
CODE[SET] = _SET;

var __transform__ = [];
__transform__[_DELETE | _DELETE] = transform_delete_delete;
__transform__[_DELETE | _CREATE] = transform_delete_create;
__transform__[_DELETE | _UPDATE] = transform_delete_update;
__transform__[_CREATE | _CREATE] = transform_create_create;
__transform__[_CREATE | _UPDATE] = transform_create_update;
__transform__[_UPDATE | _UPDATE] = transform_update_update;
__transform__[_CREATE | _SET   ] = transform_create_set;
__transform__[_DELETE | _SET   ] = transform_delete_set;
__transform__[_UPDATE | _SET   ] = transform_update_set;
__transform__[_SET    | _SET   ] = transform_set_set;

var transform = function(a, b, options) {

  options = options || {};

  var conflict = hasConflict(a, b);

  if (options.check && conflict) {
    throw new Conflict(a, b);
  }

  if (!options.inplace) {
    a = Substance.clone(a);
    b = Substance.clone(b);
  }

  // without conflict: a' = a, b' = b
  if (!conflict) {
    return [a, b];
  }

  __transform__[CODE[a.type] | CODE[b.type]](a,b);

  return [a, b];
};

ObjectOperation.transform = transform;
ObjectOperation.hasConflict = hasConflict;

/* Factories */

ObjectOperation.Create = function(idOrPath, val) {
  var path;
  if (Substance.isString(idOrPath)) {
    path = [idOrPath];
  } else if (Substance.isArray(idOrPath)) {
    path = idOrPath;
  } else {
    throw new Error('Illegal argument');
  }
  return new ObjectOperation({type: CREATE, path: path, val: val});
};

ObjectOperation.Delete = function(idOrPath, val) {
  var path;
  if (Substance.isString(idOrPath)) {
    path = [idOrPath];
  } else if (Substance.isArray(idOrPath)) {
    path = idOrPath;
  } else {
    throw new Error('Illegal argument');
  }
  return new ObjectOperation({type: DELETE, path: path, val: val});
};

ObjectOperation.Update = function(path, op) {
  var propertyType;
  if (op instanceof TextOperation) {
    propertyType = "string";
  }
  else if (op instanceof ArrayOperation) {
    propertyType = "array";
  }
  else if (op instanceof ObjectOperation) {
    propertyType = "object";
  }
  else {
    throw new Error('Unsupported type for operational changes');
  }
  return new ObjectOperation({
    type: UPDATE,
    path: path,
    diff: op,
    propertyType: propertyType
  });
};

ObjectOperation.Set = function(path, oldVal, newVal) {
  return new ObjectOperation({
    type: SET,
    path: path,
    val: Substance.clone(newVal),
    original: Substance.clone(oldVal)
  });
};

ObjectOperation.NOP = NOP;
ObjectOperation.CREATE = CREATE;
ObjectOperation.DELETE = DELETE;
ObjectOperation.UPDATE = UPDATE;
ObjectOperation.SET = SET;

module.exports = ObjectOperation;

},{"../basics":122,"./array_operation":158,"./conflict":159,"./operation":162,"./text_operation":163}],162:[function(require,module,exports){
'use strict';

var Substance = require('../basics');

function Operation() {
}

Operation.Prototype = function() {

  this.isOperation = true;

};

Substance.initClass(Operation);

module.exports = Operation;
},{"../basics":122}],163:[function(require,module,exports){
'use strict';

var Substance = require('../basics');
var Operation = require('./operation');
var Conflict = require('./conflict');

var INS = "+";
var DEL = "-";

function TextOperation(data) {
  if (data.type === undefined || data.pos === undefined || data.str === undefined) {
    throw new Error("Illegal argument: insufficient data.");
  }
  // '+' or '-'
  this.type = data.type;
  // the position where to apply the operation
  this.pos = data.pos;
  // the string to delete or insert
  this.str = data.str;
  // sanity checks
  if(!this.isInsert() && !this.isDelete()) {
    throw new Error("Illegal type.");
  }
  if (!Substance.isString(this.str)) {
    throw new Error("Illegal argument: expecting string.");
  }
  if (!Substance.isNumber(this.pos) && this.pos < 0) {
    throw new Error("Illegal argument: expecting positive number as pos.");
  }
}

TextOperation.fromJSON = function(data) {
  return new TextOperation(data);
};

TextOperation.Prototype = function() {

  this.apply = function(str) {
    if (this.isEmpty()) return str;
    if (this.type === INS) {
      if (str.length < this.pos) {
        throw new Error("Provided string is too short.");
      }
      if (str.splice) {
        return str.splice(this.pos, 0, this.str);
      } else {
        return str.slice(0, this.pos).concat(this.str).concat(str.slice(this.pos));
      }
    }
    else if (this.type === DEL) {
      if (str.length < this.pos + this.str.length) {
        throw new Error("Provided string is too short.");
      }
      if (str.splice) {
        return str.splice(this.pos, this.str.length);
      } else {
        return str.slice(0, this.pos).concat(str.slice(this.pos + this.str.length));
      }
    }
    else {
      throw new Error("Illegal operation type: " + this.type);
    }
  };

  this.clone = function() {
    return new TextOperation(this);
  };

  this.isNOP = function() {
    return this.type === "NOP" || this.str.length === 0;
  };

  this.isInsert = function() {
    return this.type === INS;
  };

  this.isDelete = function() {
    return this.type === DEL;
  };

  this.getLength = function() {
    return this.str.length;
  };

  this.invert = function() {
    var data = {
      type: this.isInsert() ? '-' : '+',
      pos: this.pos,
      str: this.str
    };
    return new TextOperation(data);
  };

  this.hasConflict = function(other) {
    return TextOperation.hasConflict(this, other);
  };

  this.isEmpty = function() {
    return this.str.length === 0;
  };

  this.toJSON = function() {
    return {
      type: this.type,
      pos: this.pos,
      str: this.str
    };
  };

};

Substance.inherit(TextOperation, Operation);

var hasConflict = function(a, b) {
  // Insert vs Insert:
  //
  // Insertions are conflicting iff their insert position is the same.
  if (a.type === INS && b.type === INS)  return (a.pos === b.pos);
  // Delete vs Delete:
  //
  // Deletions are conflicting if their ranges overlap.
  if (a.type === DEL && b.type === DEL) {
    // to have no conflict, either `a` should be after `b` or `b` after `a`, otherwise.
    return !(a.pos >= b.pos + b.str.length || b.pos >= a.pos + a.str.length);
  }
  // Delete vs Insert:
  //
  // A deletion and an insertion are conflicting if the insert position is within the deleted range.
  var del, ins;
  if (a.type === DEL) {
    del = a; ins = b;
  } else {
    del = b; ins = a;
  }
  return (ins.pos >= del.pos && ins.pos < del.pos + del.str.length);
};

// Transforms two Insertions
// --------

function transform_insert_insert(a, b, first) {
  if (a.pos === b.pos) {
    if (first) {
      b.pos += a.str.length;
    } else {
      a.pos += b.str.length;
    }
  }
  else if (a.pos < b.pos) {
    b.pos += a.str.length;
  }
  else {
    a.pos += b.str.length;
  }
}

// Transform two Deletions
// --------
//

function transform_delete_delete(a, b, first) {
  // reduce to a normalized case
  if (a.pos > b.pos) {
    return transform_delete_delete(b, a, !first);
  }
  if (a.pos === b.pos && a.str.length > b.str.length) {
    return transform_delete_delete(b, a, !first);
  }
  // take out overlapping parts
  if (b.pos < a.pos + a.str.length) {
    var s = b.pos - a.pos;
    var s1 = a.str.length - s;
    var s2 = s + b.str.length;
    a.str = a.str.slice(0, s) + a.str.slice(s2);
    b.str = b.str.slice(s1);
    b.pos -= s;
  } else {
    b.pos -= a.str.length;
  }
}

// Transform Insert and Deletion
// --------
//

function transform_insert_delete(a, b) {
  if (a.type === DEL) {
    return transform_insert_delete(b, a);
  }
  // we can assume, that a is an insertion and b is a deletion
  // a is before b
  if (a.pos <= b.pos) {
    b.pos += a.str.length;
  }
  // a is after b
  else if (a.pos >= b.pos + b.str.length) {
    a.pos -= b.str.length;
  }
  // Note: this is a conflict case the user should be noticed about
  // If applied still, the deletion takes precedence
  // a.pos > b.pos && <= b.pos + b.length
  else {
    var s = a.pos - b.pos;
    b.str = b.str.slice(0, s) + a.str + b.str.slice(s);
    a.str = "";
  }
}

var transform = function(a, b, options) {
  options = options || {};
  if (options.check && hasConflict(a, b)) {
    throw new Conflict(a, b);
  }
  if (!options.inplace) {
    a = Substance.clone(a);
    b = Substance.clone(b);
  }
  if (a.type === INS && b.type === INS)  {
    transform_insert_insert(a, b, true);
  }
  else if (a.type === DEL && b.type === DEL) {
    transform_delete_delete(a, b, true);
  }
  else {
    transform_insert_delete(a,b);
  }
  return [a, b];
};

TextOperation.transform = function() {
  return transform.apply(null, arguments);
};

/* Factories */

TextOperation.Insert = function(pos, str) {
  return new TextOperation({ type: INS, pos: pos, str: str });
};

TextOperation.Delete = function(pos, str) {
  return new TextOperation({ type: DEL, pos: pos, str: str });
};

// A helper class to model Text selections and to provide an easy way
// to bookkeep changes by other applied TextOperations
var Range = function(range) {
  if (Substance.isArray(range)) {
    this.start = range[0];
    this.length = range[1];
  } else {
    this.start = range.start;
    this.length = range.length;
  }
};

// Transforms a given range tuple (offset, length) in-place.
// --------
//

var range_transform = function(range, textOp, expandLeft, expandRight) {
  var changed = false;
  var start, end;

  if (Substance.isArray(range)) {
    start = range[0];
    end = range[1];
  } else {
    start = range.start;
    end = start + range.length;
  }
  // Delete
  if (textOp.type === DEL) {
    var pos1 = textOp.pos;
    var pos2 = textOp.pos+textOp.str.length;
    if (pos1 <= start) {
      start -= Math.min(pos2-pos1, start-pos1);
      changed = true;
    }
    if (pos1 <= end) {
      end -= Math.min(pos2-pos1, end-pos1);
      changed = true;
    }
  } else if (textOp.type === INS) {
    var pos = textOp.pos;
    var l = textOp.str.length;
    if ( (pos < start) ||
         (pos === start && !expandLeft) ) {
      start += l;
      changed = true;
    }
    if ( (pos < end) ||
         (pos === end && expandRight) ) {
      end += l;
      changed = true;
    }
  }
  if (changed) {
    if (Substance.isArray(range)) {
      range[0] = start;
      range[1] = end;
    } else {
      range.start = start;
      range.length = end - start;
    }
  }
  return changed;
};

Range.Prototype = function() {

  this.clone = function() {
    return new Range(this);
  };

  this.toJSON = function() {
    var result = {
      start: this.start,
      length: this.length
    };
    // if (this.expand) result.expand = true;
    return result;
  };

  this.transform = function(textOp, expand) {
    return range_transform(this.range, textOp, expand);
  };

};
Range.prototype = new Range.Prototype();

Range.transform = function(range, op, expandLeft, expandRight) {
  return range_transform(range, op, expandLeft, expandRight);
};

Range.fromJSON = function(data) {
  return new Range(data);
};

TextOperation.Range = Range;
TextOperation.INSERT = INS;
TextOperation.DELETE = DEL;

module.exports = TextOperation;

},{"../basics":122,"./conflict":159,"./operation":162}],164:[function(require,module,exports){
var Substance = require('../basics');
var NodeView = require('./node_view');

var AnnotationView = NodeView.extend({
  name: "annotation",

  tagName: 'span',

  getClassNames: function() {
    var classNames = this.node.getClassNames().replace('_', '-');
    if (this.props.classNames) {
      classNames += " " + this.props.classNames.join(' ');
    }
    return classNames;
  }
});

module.exports = AnnotationView;

},{"../basics":122,"./node_view":171}],165:[function(require,module,exports){
"use strict";

var Substance = require('../basics');

// context must have a getSurface() method.
var Clipboard = function(surfaceProvider, element, htmlImporter, htmlExporter) {

  this.surfaceProvider = surfaceProvider;
  this.htmlImporter = htmlImporter;
  this.htmlExporter = htmlExporter;

  this.el = element;
  this.el.setAttribute("contenteditable", "true");
  this.el.classList.add("clipboard");

  // bind a handler to invoke the pasting...
  this.el.onpaste = this.onPaste.bind(this);

  this._contentDoc = null;
  this._contentText = "";

  this._onKeyDown = Substance.bind(this.onKeyDown, this);
  this._onCopy = Substance.bind(this.onCopy, this);
  this._onCut = Substance.bind(this.onCut, this);
  this._onPaste = Substance.bind(this.onPaste, this);
};

Clipboard.Prototype = function() {

  this.attach = function(rootElement) {
    $(rootElement).on('keydown', this._onKeyDown);
    $(rootElement).on('copy', this._onCopy);
    $(rootElement).on('cut', this._onCut);
    $(rootElement).on('paste', this._onPaste);
  };

  this.detach = function(rootElement) {
    $(rootElement).off('keydown', this._onKeyDown);
    $(rootElement).off('copy', this._onCopy);
    $(rootElement).off('cut', this._onCut);
    $(rootElement).off('paste', this._onPaste);
  };

  this.getSurface = function() {
    return this.surfaceProvider.getSurface();
  };

  this.onCopy = function(e) {
    console.log("Clipboard.onCopy", arguments);
    var event = e.originalEvent;
    this._copySelection();
    if (event.clipboardData && this._contentDoc) {
      var html = this.htmlExporter.toHtml(this._contentDoc, { containers: ['content'] });
      console.log('Stored HTML in clipboard', html);
      this._contentDoc.__id__ = Substance.uuid();
      var data = this._contentDoc.toJSON();
      data.__id__ = this._contentDoc.__id__;
      event.clipboardData.setData('application/substance', JSON.stringify(data));
      event.clipboardData.setData('text/plain', $(html).text());
      event.clipboardData.setData('text/html', html);
      event.preventDefault();
    }
  };

  // nothing special for cut.
  this.onCut = function(e) {
    console.log("Clipboard.onCut", arguments);
    this.onCopy();
    e.preventDefault();
  };

  this.onPaste = function($e) {
    console.log("Paste post-processing...", this.el);
    var self = this;
    var e = $e.originalEvent;
    var surface = this.getSurface();
    var editor = surface.getEditor();
    var doc = editor.getDocument();
    var logger = surface.getLogger();

    // Experimental: look into the clipboard data for HTML
    // and use this as preferred input

    // TODO: 1. Fix HTML pasting for internal content
    //  2. detect 'application/substance' and use for internal paste
    //  3. Precedence (in the presence of clipboardData):
    //    1. app/substance,
    //    2. HTML,
    //    3. plain text
    //  4. Legacy for IE and older browsers (using pasting trick)

    if (e.clipboardData) {
      var items = e.clipboardData.items;
      var substanceItem = null;
      var htmlItem = null;
      var plainTextItem = null;
      for (var i = 0; i < items.length; i++) {
        if (items[i].type === "application/substance") {
          substanceItem = items[i];
        }
        if (items[i].type === "text/html") {
          htmlItem = items[i];
        }
        if (items[i].type === "text/plain") {
          plainTextItem = items[i];
        }
      }
      if (substanceItem) {
        substanceItem.getAsString(function(data) {
          console.log("Received Substance JSON via Clipboard", data);
          try {
            var content = doc.fromSnapshot(JSON.parse(data));
            editor.paste(editor.selection, {
              content: content,
              text: "" // TODO: doc.toPlainText()
            });
          } catch (error) {
            console.error(error);
            logger.error(error);
          }
        });
        e.preventDefault();
        return;
      }
      if (htmlItem) {
        htmlItem.getAsString(function(data) {
          // console.log("Received HTML via Clipboard", data);
          try {
            var content = doc.newInstance();
            var htmlDoc = new window.DOMParser().parseFromString(data, "text/html");
            self.htmlImporter.convertDocument(htmlDoc, content);
            editor.paste(editor.selection, {
              content: content,
              text: htmlDoc.body.textContent
            });
          } catch (error) {
            console.error(error);
            logger.error(error);
          }
        });
        e.preventDefault();
        return;
      }
      if (plainTextItem) {
        plainTextItem.getAsString(function(data) {
          try {
            editor.insertText(data, editor.selection);
          } catch (error) {
            console.error(error);
            self.logger.error(error);
          }
        });
        e.preventDefault();
        return;
      }
    }

    // If not processed above use the plain text implementation
    window.setTimeout(function() {
      // Checking if we are pasting internally, i.e., if we have copied a Substance document fragment
      // previously.
      // Note: The browser does not allow to control what is delivered into the native clipboard.
      // The only way to detect if the content in the native and the internal clipboard is
      // to compare the content literally.
      // TODO: add check if content is the same as in fragment
      var wRange = window.document.createRange();
      wRange.selectNode(self.el);
      var plainText = wRange.toString();
      if (plainText === self._contentText) {
        // console.log("This is a substance internal paste.");
        try {
          editor.paste(editor.selection, {
            content: self._contentDoc,
            text: plainText
          });
        } catch (error) {
          console.error(error);
          logger.error(error);
        }
      } else {
        try {
          editor.insertText(plainText, editor.selection);
        } catch (error) {
          console.error(error);
          logger.error(error);
        }
      }
      // clear the pasting area
      self.el.innerHTML = "";
    }, 10);
    e.preventDefault();
  };

  this.onKeyDown = function(e) {
    if (e.keyCode === 88 && (e.metaKey||e.ctrlKey)) {
      // console.log('Handle cut');
      // this.handleCut();
      // e.preventDefault();
      // e.stopPropagation();
    }
    else if (e.keyCode === 86 && (e.metaKey||e.ctrlKey)) {
      // console.log('Handle paste');
      this.handlePaste();
      // e.preventDefault();
      // e.stopPropagation();
    }
    else if (e.keyCode === 67 && (e.metaKey||e.ctrlKey)) {
      // console.log('Handle copy');
      // this.handleCopy(e);
      // e.preventDefault();
      // e.stopPropagation();
    }
  };

  this.handleCut = function() {
    // console.log("Cutting into Clipboard...");
    var wSel = window.getSelection();
    // TODO: deal with multiple ranges
    // first extract the selected content into the hidden element
    var wRange = wSel.getRangeAt(0);
    var frag = wRange.cloneContents();
    this.el.innerHTML = "";
    this.el.appendChild(frag);
    this._copySelection();
    var surface = this.getSurface();
    try {
      console.log("...selection before deletion", surface.getSelection().toString());
      surface.getEditor().delete();
    } catch (error) {
      console.error(error);
      this.logger.error(error);
      return;
    }
    // select the copied content
    var wRangeNew = window.document.createRange();
    wRangeNew.selectNodeContents(this.el);
    wSel.removeAllRanges();
    wSel.addRange(wRangeNew);

    // hacky way to reset the selection which gets lost otherwise
    window.setTimeout(function() {
      // console.log("...restoring the selection");
      surface.rerenderDomSelection();
    }, 10);
  };

  this.handlePaste = function() {
  };

  this.handleCopy = function() {
    // Nothing here
  };

  this._copySelection = function() {
    var wSel = window.getSelection();
    this._contentText = "";
    this._contentDoc = null;
    var surface = this.getSurface();
    var sel = surface.getSelection();
    var editor = surface.getEditor();
    if (wSel.rangeCount > 0 && !sel.isCollapsed()) {
      var wRange = wSel.getRangeAt(0);
      this._contentText = wRange.toString();
      this._contentDoc = editor.copy(sel);
      console.log("Clipboard._copySelection(): created a copy", this._contentDoc);
    } else {
      this._contentDoc = null;
      this._contentText = "";
    }
  };

};

Substance.initClass(Clipboard);

module.exports = Clipboard;

},{"../basics":122}],166:[function(require,module,exports){
'use strict';

var Substance = require('../basics');
var Document = require('../document');
var FormEditor = require('./form_editor');
var Annotations = Document.AnnotationUpdates;
var Selection = Document.Selection;

function ContainerEditor(containerName, doc) {
  FormEditor.call(this, doc);
  this.containerName = containerName;

  this.mergeBehavior = {};
  this.breakBehavior = {};
  this.deleteBehavior = {};
  this.defineBehavior();
}

ContainerEditor.Prototype = function() {

  // TODO: we should make paragraph the default type
  // as this seems to be a more natural choice
  this.defaultTextType = 'paragraph';

  // Define custom editing behavior
  //
  // Register custom handlers for merge and break.
  // Example:
  //
  //  To support text nodes being merged into a figure node:
  //    this.mergeBehavior.figure = { 'text': function() {...} }
  //
  //  To support breaking a figure's caption:
  //    this.breakBehavior.figure = function(doc, node, path, offset) {...}
  //
  this.defineBehavior = function() {};

  this.isContainerEditor = function() {
    return true;
  };

  this.setContainer = function(container) {
    this.container = container;
  };

  this.getContainerName = function() {
    return this.containerName;
  };

  this.break = function(selection, info) {
    // console.log("Breaking at %s", selection.toString());
    info = info || {};
    var tx = this.document.startTransaction({ seleciton: selection });
    tx.selection = selection;
    try {
      if (!this.selection.isCollapsed()) {
        this._delete(tx);
      }
      this._break(tx);
      tx.save({ selection: tx.selection }, info);
      this.selection = tx.selection;
    } finally {
      tx.cleanup();
    }
  };

  this.copyPropertySelection = function(selection) {
    var copy = this.document.newInstance();
    var path = selection.start.path;
    var offset = selection.start.offset;
    var endOffset = selection.end.offset;
    var text = this.document.get(path);
    var containerNode = copy.create({
      type: 'container',
      id: 'content',
      nodes: []
    });
    copy.create({
      type: 'text',
      id: 'text',
      content: text.substring(offset, endOffset)
    });
    containerNode.show('text');
    var annotations = this.document.getIndex('annotations').get(path, offset, endOffset);
    Substance.each(annotations, function(anno) {
      var data = Substance.deepclone(anno.toJSON());
      data.path = ['text', 'content'];
      data.range = [ Math.max(offset, anno.range[0])-offset, Math.min(endOffset, anno.range[1])-offset];
      copy.create(data);
    });
    return copy;
  };

  this._copyContainerSelection = function(selection) {
    var doc = this.document;
    var copy = this.document.newInstance();
    var annotationIndex = doc.getIndex('annotations');

    var container = this.container;
    var startComp = container.getComponent(selection.start.path);
    var endComp = container.getComponent(selection.end.path);
    var containerNode = copy.create({
      type: 'container',
      id: 'content',
      nodes: []
    });

    // 1. Copy nodes and annotations.
    var i, comp;
    var created = {};
    for (i = startComp.getIndex(); i <= endComp.getIndex(); i++) {
      comp = container.getComponentAt(i);
      var nodeId = comp.parentNode.id;
      var node = doc.get(nodeId);
      if (!created[nodeId]) {
        created[nodeId] = copy.create(node.toJSON());
        containerNode.show(nodeId);
      }
      var annotations = annotationIndex.get(comp.path);
      for (var j = 0; j < annotations.length; j++) {
        copy.create(Substance.clone(annotations[j].toJSON()));
      }
    }
    // 2. Truncate properties according to the selection.
    // TODO: we need a more sophisticated concept when we introduce dynamic structures
    // such as lists or tables
    var startNodeComponent = startComp.parentNode;
    var text;
    for (i = 0; i < startNodeComponent.components.length; i++) {
      comp = startNodeComponent.components[i];
      if (comp === startComp) {
        if (selection.start.offset > 0) {
          text = doc.get(comp.path);
          copy.update(comp.path, {
            delete: { start: 0, end: selection.start.offset }
          });
          Annotations.deletedText(copy, comp.path, 0, selection.start.offset);
        }
        break;
      } else {
        copy.set(comp.path, "");
      }
    }
    var endNodeComponent = endComp.parentNode;
    for (i = 0; i < endNodeComponent.components.length; i++) {
      comp = endNodeComponent.components[i];
      if (comp === endComp) {
        text = doc.get(comp.path);
        if (selection.end.offset < text.length) {
          copy.update(comp.path, {
            delete: { start: selection.end.offset, end: text.length }
          });
          Annotations.deletedText(copy, comp.path, selection.end.offset, text.length);
        }
        break;
      } else {
        copy.set(comp.path, "");
      }
    }
    return copy;
  };

  // create a document instance containing only the selected content
  this.copy = function(selection) {
    if (selection.isNull()) {
      return null;
    }
    // return a simplified version if only a piece of text is selected
    if (selection.isPropertySelection() || Substance.isEqual(selection.start.path, selection.end.path)) {
      return this.copyPropertySelection(selection);
    }
    else if (selection.isContainerSelection()) {
      return this._copyContainerSelection(selection);
    }
  };

  this.paste = function(selection, data) {
    if (selection.isNull()) {
      console.error("Can not paste, without selection.");
      return;
    }
    // plain text paste is simple
    if (!data.content) {
      return this.insertText(data.text, selection);
    }
    var pasteDoc = data.content;
    var tx = this.document.startTransaction({ selection: selection });
    tx.selection = selection;
    try {
      if (!selection.isCollapsed()) {
        this._delete(tx);
      }
      var nodes = pasteDoc.get('content').nodes;
      if (nodes.length > 0) {
        var first = pasteDoc.get(nodes[0]);
        if (nodes.length === 1 && first.type === "text") {
          this._pasteAnnotatedText(tx, pasteDoc);
        } else {
          this._pasteDocument(tx, pasteDoc);
        }
      }
      tx.save({selection: tx.selection});
      this.selection = tx.selection;
    } finally {
      tx.cleanup();
    }
  };

  this._pasteAnnotatedText = function(tx, copy) {
    // extract text from the copy
    var nodes = copy.get('content').nodes;
    var textPath = [nodes[0], 'content'];
    var text = copy.get(textPath);
    var annotations = copy.getIndex('annotations').get(textPath);
    // insert plain text
    var selection = tx.selection;
    var path = selection.start.path;
    var offset = selection.start.offset;
    tx.update(path, { insert: { offset: offset, value: text } } );
    Annotations.insertedText(tx, selection.start, text.length);
    // copy annotations
    Substance.each(annotations, function(anno) {
      var data = anno.toJSON();
      data.path = path.slice(0);
      data.range = data.range.slice(0);
      data.range[0] += offset;
      data.range[1] += offset;
      if (tx.get(data.id)) {
        data.id = Substance.uuid(data.type);
      }
      tx.create(data);
    });
  };

  this._pasteDocument = function(tx, doc) {
    var pasteDoc = doc;

    var containerNode = tx.get(this.containerName);

    // Break, unless we are at the last character of a node,
    // then we can simply insert after the node
    var startComp = this.container.getComponent(tx.selection.start.path);
    var startNodeComp = startComp.parentNode;
    var insertPos;
    if ( startComp === Substance.last(startNodeComp.components) &&
      tx.get(startComp.path).length === tx.selection.start.offset )
    {
      insertPos = containerNode.getPosition(tx.selection.start.path[0]) + 1;
    } else {
      this._break(tx);
      // _break() sets a new selection
      insertPos = containerNode.getPosition(tx.selection.start.path[0]);
    }
    if (insertPos < 0) {
      console.error('Could not find insertion position in ContainerNode.');
    }
    // transfer nodes from content document
    // TODO: transfer annotations
    var nodeIds = pasteDoc.get("content").nodes;
    var annoIndex = pasteDoc.getIndex('annotations');
    var insertedNodes = [];
    for (var i = 0; i < nodeIds.length; i++) {
      var nodeId = nodeIds[i];
      var node = pasteDoc.get(nodeId).toJSON();
      // create a new id if the node exists already
      if (tx.get(nodeId)) {
        node.id = Substance.uuid(node.type);
      }
      tx.create(node);
      containerNode.show(node.id, insertPos++);
      insertedNodes.push(node);

      // EXPERIMENTAL also transfer annotations
      // what about nodes that are referenced by annotations?
      // Solve this properly, and test driven
      var annos = annoIndex.get(nodeId);
      for (var j = 0; j < annos.length; j++) {
        var data = annos[j].toJSON();
        if (node.id !== nodeId) {
          data.path[0] = node.id;
        }
        if (tx.get(data.id)) {
          data.id = Substance.uuid(data.type);
        }
        tx.create(data);
      }
    }
  };

  this._getBreakBehavior = function(node) {
    var behavior = null;
    if (this.breakBehavior[node.type]) {
      behavior = this.breakBehavior[node.type];
    } else if (node.isInstanceOf('text')) {
      behavior = this._breakTextNode;
    }
    if (!behavior) {
      console.info("No breaking behavior defined for %s", node.type);
    }
    return behavior;
  };

  this._break = function(tx) {
    var range = tx.selection.getRange();
    var component = this.container.getComponent(range.start.path);
    var node = tx.get(component.path[0]);
    var offset = range.start.offset;
    var breakBehavior = this._getBreakBehavior(node);
    if (breakBehavior) {
      breakBehavior.call(this, tx, node, component.path, offset);
    }
  };

  this._breakTextNode = function(tx, node, path, offset) {
    // split the text property and create a new paragraph node with trailing text and annotations transferred
    var text = node.content;
    var containerNode = tx.get(this.containerName);
    var nodePos = containerNode.getPosition(node.id);
    var id = Substance.uuid(node.type);
    var newPath = [id, 'content'];
    // when breaking at the first position, a new node of the same
    // type will be inserted.
    if (offset === 0) {
      tx.create({
        id: id,
        type: node.type,
        content: ""
      });
      // show the new node
      containerNode.show(id, nodePos);
      tx.selection = Selection.create(path, 0);
    } else {
      // create a new node
      tx.create({
        id: id,
        type: this.defaultTextType,
        content: text.substring(offset)
      });
      if (offset < text.length) {
        // transfer annotations which are after offset to the new node
        Annotations.transferAnnotations(tx, path, offset, [id, 'content'], 0);
        // truncate the original property
        tx.update(path, {
          delete: { start: offset, end: text.length }
        });
      }
      // show the new node
      containerNode.show(id, nodePos+1);
      // update the selection
      tx.selection = Selection.create(newPath, 0);
    }
  };

  this._getMergeBehavior = function(node, otherNode) {
    var merge = this.mergeBehavior;
    var behavior = null;
    if (merge[node.type] && merge[node.type][otherNode.type]) {
      behavior = merge[node.type][otherNode.type];
    }
    // special convenience to define behaviors when text nodes are involved
    // E.g., you might want to define how to merge a text node into a figure
    else if (node.isInstanceOf('text') && otherNode.isInstanceOf('text')) {
      behavior = this._mergeTextNodes;
    } else if (node.isInstanceOf('text') && merge['text']) {
      behavior = merge['text'][otherNode.type];
    } else if (otherNode.isInstanceOf('text') && merge[node.type]) {
      behavior = merge[node.type]['text'];
    }
    if (!behavior) {
      console.info("No merge behavior defined for %s <- %s", node.type, otherNode.type);
    }
    return behavior;
  };

  // low-level merge implementation
  this._merge = function(tx, path, dir) {
    var component = this.container.getComponent(path);
    var otherPath, mergeBehavior;
    if (dir === 'right' && component.next) {
      this._mergeComponents(tx, component, component.next);
    } else if (dir === 'left' && component.previous) {
      this._mergeComponents(tx, component.previous, component);
    } else {
      // No behavior defined for this merge
    }
  };

  this._mergeComponents = function(tx, firstComp, secondComp) {
    var firstNode = tx.get(firstComp.parentNode.id);
    var secondNode = tx.get(secondComp.parentNode.id);
    var mergeBehavior = this._getMergeBehavior(firstNode, secondNode);
    if (mergeBehavior) {
      mergeBehavior.call(this, tx, firstComp, secondComp);
    }
  };


  this._mergeTextNodes = function(tx, firstComp, secondComp) {
    var firstPath = firstComp.path;
    var firstText = tx.get(firstPath);
    var firstLength = firstText.length;
    var secondPath = secondComp.path;
    var secondText = tx.get(secondPath);
    var containerNode = tx.get(this.containerName);
    // append the second text
    tx.update(firstPath, { insert: { offset: firstLength, value: secondText } });
    // transfer annotations
    Annotations.transferAnnotations(tx, secondPath, 0, firstPath, firstLength);
    // hide the second node
    containerNode.hide(secondPath[0]);
    // delete the second node
    tx.delete(secondPath[0]);
    // set the selection to the end of the first component
    tx.selection = Selection.create(firstPath, firstLength);
  };

  this._getDeleteBehavior = function(node) {
    var behavior = null;
    if (this.deleteBehavior[node.type]) {
      behavior = this.deleteBehavior[node.type];
    }
    return behavior;
  };

  this._deleteContainerSelection = function(tx) {
    var sel = tx.selection.getRange();
    var nodeSels = this._getNodeSelection(tx, sel);
    // apply deletion backwards so that we do not to recompute array positions
    for (var idx = nodeSels.length - 1; idx >= 0; idx--) {
      var nodeSel = nodeSels[idx];
      if (nodeSel.isFully && !nodeSel.node.isResilient()) {
        this._deleteNode(tx, nodeSel.node);
      } else {
        this._deleteNodePartially(tx, nodeSel);
      }
    }
    // do a merge
    if (nodeSels.length>1) {
      var firstSel = nodeSels[0];
      var lastSel = nodeSels[nodeSels.length-1];
      if (firstSel.isFully || lastSel.isFully) {
        // TODO: think about if we want to merge in those cases
      } else {
        var firstComp = firstSel.components[0];
        var secondComp = Substance.last(lastSel.components);
        this._mergeComponents(tx, firstComp, secondComp);
      }
    }
  };

  this._deleteNode = function(tx, nodeSel) {
    var deleteBehavior = this._getDeleteBehavior(nodeSel.node);
    if (deleteBehavior) {
      deleteBehavior.call(this, tx, nodeSel);
    } else if (nodeSel.isNested) {
      throw new Error('Contract: you must provide a deleteBehavior for nested node types.');
    } else {
      // otherwise we can just delete the node
      var nodeId = nodeSel.node.id;
      var containerNode = tx.get(this.containerName);
      // remove from view first
      containerNode.hide(nodeId);
      // remove all associated annotations
      var annos = tx.getIndex('annotations').get(nodeId);
      var i;
      for (i = 0; i < annos.length; i++) {
        tx.delete(annos[i].id);
      }
      annos = tx.getIndex('container-annotations').get(nodeId);
      for (i = 0; i < annos.length; i++) {
        tx.delete(annos[i].id);
      }
      // and then permanently delete
      tx.delete(nodeSel.node.id);
    }
  };

  this._deleteNodePartially = function(tx, nodeSel) {
    var deleteBehavior = this._getDeleteBehavior(nodeSel.node);
    if (deleteBehavior) {
      deleteBehavior.call(this, tx, nodeSel);
    } else if (nodeSel.isNested) {
      throw new Error('Contract: you must provide a deleteBehavior for nested node types.');
    } else {
      // Just go through all components and apply a property deletion
      var components = nodeSel.components;
      var length = components.length;
      for (var i = 0; i < length; i++) {
        var comp = components[i];
        var startOffset = 0;
        var endOffset = tx.get(comp.path).length;
        if (i === 0) {
          startOffset = nodeSel.startOffset;
        }
        if (i === length-1) {
          endOffset = nodeSel.endOffset;
        }
        this._deleteProperty(tx, comp.path, startOffset, endOffset);
      }
    }
  };

  this._getNodeSelection = function(doc, range) {
    var result = [];
    var groups = {};
    var container = this.container;
    var components = container.getComponentsForRange(range);
    var isNested;
    function _getRoot(comp) {
      isNested = false;
      var node = doc.get(comp.parentNode.id);
      while (node.hasParent()) {
        isNested = true;
        node = node.getParentNode();
      }
      return node;
    }
    for (var i = 0; i < components.length; i++) {
      var comp = components[i];
      var node = _getRoot(comp);
      var nodeId = node.id;
      var nodeGroup;
      if (!groups[nodeId]) {
        nodeGroup = {
          node: node,
          isFully: true,
          components: []
        };
        groups[nodeId] = nodeGroup;
        result.push(nodeGroup);
      }
      nodeGroup = groups[nodeId];
      nodeGroup.components.push(comp);
      if (isNested) {
        nodeGroup.isNested = true;
      }
    }
    // finally we analyze the first and last node-selection
    // if these
    var startComp = components[0];
    var endComp = components[components.length-1];
    var startNodeSel = result[0];
    var endNodeSel = result[result.length-1];
    var startLen = doc.get(startComp.path).length;
    var endLen = doc.get(endComp.path).length;
    if (range.start.offset > 0 ||
      (startComp.hasPrevious() && _getRoot(startComp.getPrevious()) !== startNodeSel.node))
    {
      startNodeSel.isFully = false;
      startNodeSel.startOffset = range.start.offset;
      startNodeSel.endOffset = startLen;
    }
    if (result.length > 1 &&
        (range.end.offset < endLen ||
          (endComp.hasNext() && _getRoot(endComp.getNext()) !== endNodeSel.node))
       ) {
      endNodeSel.isFully = false;
      endNodeSel.startOffset = 0;
      endNodeSel.endOffset = range.end.offset;
    }
    return result;
  };

};

Substance.inherit(ContainerEditor, FormEditor);

module.exports = ContainerEditor;
},{"../basics":122,"../document":150,"./form_editor":169}],167:[function(require,module,exports){
'use strict';

var Substance = require('../basics');
var Document = require('../document');
var Container = Document.Container;

// DomContainer
// ------------
//
// A Container implementation that extracts the structure information
// from a rendered DOM node.
//
// In an earlier version of Substance we had a Container
// which required the implementation of so called NodeSurfaces which
// expressed the node's layout. This made the implementation of nodes
// more complex.
//
// Using this as approach has the drawback that container related
// things, such as ContainerAnnotations and ContainerEditors can not
// be used without a rendered view, and this Container must be
// updated whenever the view is rerendered.
//
function DomContainer(containerId, element) {
  Container.call(this, containerId);
  this.element = element;
  this.reset();
}

DomContainer.Prototype = function() {
  this.reset = function() {
    var $componentElements = DomContainer.getEditableElements(this.element);
    // console.log('DomContainer: found %s editable components.', $componentElements.length);
    var components = Substance.map($componentElements, function(el, idx) {
      return new DomContainer.Component(el, idx);
    });
    this._setComponents(components);
  };
};

Substance.inherit(DomContainer, Container);

DomContainer.Component = function(element, idx, parentNode) {
  Container.Component.call(this, DomContainer.getPathFromElement(element), idx);
  this.parentNode = parentNode;
  this.element = element;
};

Substance.inherit(DomContainer.Component, Container.Component);

DomContainer.getPathFromElement = function(element) {
  return element.dataset.path.split('.');
};

DomContainer.getEditableElements = function(element) {
  return $(element).find('*[data-path]');
};

module.exports = DomContainer;

},{"../basics":122,"../document":150}],168:[function(require,module,exports){
'use strict';

var Substance = require('../basics');
var Document = require('../document');

//  Helper to map selection between model and DOM
function DomSelection(rootElement, container) {
  this.rootElement = rootElement;
  this.nativeSelectionData = null;
  this.modelSelection = null;
  this.container = container;
}

var _findDomPosition = function(element, offset) {
  var text = $(element).text();
  // not in this element
  if (text.length < offset) {
    return {
      node: null,
      offset: offset - text.length
    };
  // at the right boundary
  } else if (element.nodeType === document.TEXT_NODE) {
    return {
      node: element,
      offset: offset,
      boundary: (text.length === offset)
    };
  // HACK: for empty elements
  } else if (text.length === 0) {
    return {
      node: element,
      offset: offset,
      boundary: true
    };
  // within the node or a child node
  } else {
    for (var child = element.firstChild; child; child = child.nextSibling) {
      var pos = _findDomPosition(child, offset);
      if (pos.node) {
        return pos;
      } else {
        // not found in this child; then pos.offset contains the translated offset
        offset = pos.offset;
      }
    }
    throw new Error("Illegal state: we should not have reached here!");
  }
};

var _getPathFromElement = function(el) {
  var path = [];
  var elements = [];
  var current = el;
  while(current) {
    var $current = $(current);
    // if available extract a path fragment
    var pathProperty = $current.attr("data-path");
    if (pathProperty) {
      path = pathProperty.split('.');
      return {
        path: path,
        element: current
      };
    }
    var nodeId = $current.attr("data-id");
    if (nodeId) {
      // try to take the first property
      var $properties = $current.find('*[data-path]');
      if ($properties.length>0) {
        pathProperty = $($properties[0]).attr("data-path");
        path = pathProperty.split('.');
        return {
          path: path,
          element: $properties[0]
        };
      }
    }
    current = $current.parent()[0];
  }
  return null;
};

var _modelCoordinateFromDomPosition = function(domNode, offset, options) {
  options = options || {};
  var found = _getPathFromElement(domNode);
  if (!found) return null;
  var path = found.path;
  var element = found.element;
  var charPos = 0;
  // TODO: in future we might support other component types than string
  var range = window.document.createRange();
  range.setStart(element, 0);
  range.setEnd(domNode, offset);
  charPos = range.toString().length;
  // TODO: this needs more experiments, at the moment we do not detect these cases correctly
  var after = (options.left && offset === domNode.length) ||
    (options.right && offset === 0) ;
  return {
    domNode: element,
    coordinate: new Document.Coordinate(path, charPos, after)
  };
};

var _modelCoordinateToDomPosition = function(rootElement, coordinate) {
  var componentElement = DomSelection.getDomNodeForPath(rootElement, coordinate.path);
  if (componentElement) {
    var pos = _findDomPosition(componentElement, coordinate.offset);
    if (pos.node) {
      return pos;
    } else {
      return null;
    }
  }
};


DomSelection.Prototype = function() {

  var selectionEquals = function(s1, s2) {
    return (s1.anchorNode === s2.anchorNode && s1.anchorOffset === s2.anchorOffset &&
        s1.focusNode === s2.focusNode && s1.focusOffset === s2.focusOffset);
  };

  var selectionData = function(s) {
    var data = {
      anchorNode: s.anchorNode,
      anchorOffset: s.anchorOffset,
      focusNode: s.focusNode,
      focusOffset: s.focusOffset,
      range: null
    };
    if (s.rangeCount > 0) {
      data.range = s.getRangeAt(0);
    }
    return data;
  };

  this.get = function(options) {
    options = options || {};
    var sel = window.getSelection();
    if (this.nativeSelectionData && selectionEquals(sel, this.nativeSelectionData)) {
      return this.modelSelection;
    }
    var result;
    this.nativeSelectionData = selectionData(sel);
    var rangeCount = sel.rangeCount;
    if (rangeCount === 0) {
      result = Document.nullSelection;
    } else if (rangeCount > 1) {
      throw new Error('Multi-Selections not supported yet!');
    } else {
      options.container = this.container;
      result = DomSelection.getSelectionForDomSelection(sel, options);
    }
    this.modelSelection = result;
    return result;
  };

  this.set = function(modelSelection) {
    var sel = window.getSelection();
    if (modelSelection.isNull()) {
      sel.removeAllRanges();
      return;
    }
    var ranges = modelSelection.getRanges();
    var domRanges = [];
    var i, range;
    for (i = 0; i < ranges.length; i++) {
      range = ranges[i];
      var startPosition = _modelCoordinateToDomPosition(this.rootElement, range.start);
      if (!startPosition) {
        // Not within this surface. Maybe it was in a different surface
        continue;
      }
      var endPosition;
      if (range.isCollapsed()) {
        endPosition = startPosition;
      } else {
        endPosition = _modelCoordinateToDomPosition(this.rootElement, range.end);
      }
      domRanges.push({ start: startPosition, end: endPosition });
    }
    // just do nothing if there is no mapping
    if (domRanges.length === 0) {
      return;
    }
    // if there is a range then set replace the window selection accordingly
    sel.removeAllRanges();
    for (i = 0; i < domRanges.length; i++) {
      var domRange = domRanges[i];
      range = window.document.createRange();
      range.setStart(domRange.start.node, domRange.start.offset);
      range.setEnd(domRange.end.node, domRange.end.offset);
      sel.addRange(range);
    }
  };

  this.clear = function() {
    var sel = window.getSelection();
    sel.removeAllRanges();
    this.nativeSelectionData = null;
  };

  this.isInside = function() {
    var sel = window.getSelection();
    if (sel.rangeCount === 0) {
      return false;
    }
    var range = sel.getRangeAt(0);
    // Note: Node.compareDocumentPosition has an inverse semantic
    // node1.compare(node2) === CONTAINS means 'node2 contains node1'
    var inside = (range.startContainer.compareDocumentPosition(this.rootElement)&window.Node.DOCUMENT_POSITION_CONTAINS);
    if (inside && !range.collapsed) {
      inside = (range.endContainer.compareDocumentPosition(this.rootElement)&window.Node.DOCUMENT_POSITION_CONTAINS);
    }
    return inside;
  };

};

Substance.initClass(DomSelection);

DomSelection.getDomNodeForPath = function(rootElement, path) {
  var componentElement = rootElement.querySelector('*[data-path="'+path.join('.')+'"]');
  if (!componentElement) {
    console.warn('Could not find DOM element for path', path);
    return null;
  }
  return componentElement;
};

DomSelection.findDomPosition = function(rootElement, path, offset) {
  var domNode = DomSelection.getDomNodeForPath(rootElement, path);
  if (domNode) {
    var pos = _findDomPosition(domNode, offset);
    if (pos.node) {
      return pos;
    } else {
      return null;
    }
  }
};

DomSelection.getSelectionForDomSelection = function(sel, options) {
  options = options || {};
  var anchorNode = sel.anchorNode;
  var anchorOffset = sel.anchorOffset;
  var focusNode = sel.focusNode;
  var focusOffset = sel.focusOffset;
  var wRange = sel.getRangeAt(0);
  var isCollapsed = sel.isCollapsed;
  var isReverse = false;
  if (!isCollapsed && focusNode && anchorNode) {
    var cmp = focusNode.compareDocumentPosition(anchorNode);
    isReverse = (
      ( (cmp & (window.document.DOCUMENT_POSITION_FOLLOWING) ) > 0 ) ||
      (cmp === 0 && focusOffset < anchorOffset)
    );
  }
  if (!focusNode || !anchorNode) {
    return Document.nullSelection;
  }
  return DomSelection.getSelectionForDomRange(wRange, isReverse, options);
};

DomSelection.getSelectionForDomRange = function(wRange, isReverse, options) {
  options = options || {};
  var start = _modelCoordinateFromDomPosition(wRange.startContainer, wRange.startOffset, options);
  var end;
  if (wRange.collapsed) {
    end = start;
  } else {
    end = _modelCoordinateFromDomPosition(wRange.endContainer, wRange.endOffset, options);
  }
  if (!start || !end) {
    return;
  }
  var range = new Document.Range(start.coordinate, end.coordinate);
  if (Substance.isArrayEqual(range.start.path, range.end.path)) {
    return new Document.PropertySelection(range, isReverse);
  } else {
    if (!options.container) {
      throw new Error('No container given, but selection is a container selection');
    }
    return new Document.ContainerSelection(options.container, range, isReverse);
  }
};

module.exports = DomSelection;

},{"../basics":122,"../document":150}],169:[function(require,module,exports){
'use strict';

var Substance = require('../basics');
var Document = Substance.Document;
var Selection = Document.Selection;
var Annotations = require('../document/annotation_updates');

function FormEditor(doc) {
  this.document = doc;
  this.selection = Document.nullSelection;
  // TODO:
  // 1. maybe a better name. Container as opposed to ContainerNode is
  // a component container, ie., describing the structure of a surface.
  // 2. Try to get rid of containers in form-editors. Cursor navigation is possible
  // without that structure, as it is done by ContentEditable.
  // This affects some places in the code, for instance, Surface.DomSelection should not
  // map a spanning selection to a ContainerSelection, but instead should create
  // a single or later multiple PropertySelections.
  // Preventing such selections in the browser is probably not possible.
  // Another affected place, is where components (ContainerComponent and TextProperties)
  // register to the containers event proxy.
  this.container = null;
}

FormEditor.Prototype = function() {

  this.isContainerEditor = function() {
    return false;
  };

  this.getContainer = function() {
    return this.container;
  };

  this.setContainer = function(container) {
    this.container = container;
  };

  this.getDocument = function() {
    return this.document;
  };

  this.insertText = function(textInput, selection, info) {
    // console.log("Inserting text: '%s' at %s", textInput, selection.toString());
    var tx = this.document.startTransaction({ selection: selection });
    tx.selection = selection;
    try {
      if (!this.selection.isCollapsed()) {
        this._delete(tx, 'right');
      }
      var range = tx.selection.getRange();
      tx.update(range.start.path, { insert: { offset: range.start.offset, value: textInput } } );
      Annotations.insertedText(tx, range.start, textInput.length);
      tx.selection = Selection.create(range.start.path, range.start.offset + textInput.length);
      tx.save({ selection: tx.selection }, info);
      this.selection = tx.selection;
    } finally {
      tx.cleanup();
    }
  };

  // implements backspace and delete
  this.delete = function(selection, direction, info) {
    var tx = this.document.startTransaction({ selection: selection });
    tx.selection = selection;
    try {
      this._delete(tx, direction);
      tx.save({ selection: tx.selection }, info);
      this.selection = tx.selection;
    } finally {
      tx.cleanup();
    }
  };

  this._delete = function(tx, direction) {
    var selection = tx.selection;
    var range = selection.getRange();
    var startChar, endChar;
    // if collapsed see if we are at the start or the end
    // and try to merge
    if (selection.isCollapsed()) {
      var prop = this.document.get(range.start.path);
      if ((range.start.offset === 0 && direction === 'left') ||
          (range.start.offset === prop.length && direction === 'right')) {
        this._merge(tx, range.start.path, direction);
      } else {
        // simple delete one character
        startChar = (direction === 'left') ? range.start.offset-1 : range.start.offset;
        endChar = startChar+1;
        tx.update(range.start.path, {
          delete: { start: startChar, end: endChar }
        });
        Annotations.deletedText(tx, range.start.path, startChar, endChar);
        tx.selection = Document.Selection.create(range.start.path, startChar);
      }
    } else if (selection.isPropertySelection()) {
      this._deleteProperty(tx, range.start.path, range.start.offset, range.end.offset);
      tx.selection = Document.Selection.create(range.start);
    } else {
      // deal with container deletes
      this._deleteContainerSelection(tx, direction);
      tx.selection = Document.Selection.create(range.start);
    }
  };

  this._deleteProperty = function(tx, path, startOffset, endOffset) {
    // if a property selection but not collapsed
    // simply delete the selected area
    tx.update(path, {
      delete: { start: startOffset, end: endOffset }
    });
    Annotations.deletedText(tx, path, startOffset, endOffset);
  };

  this._deleteContainerSelection = function(/*tx, direction*/) {
    console.info('Deleting ContainerSelections in form-editor is not supported.');
  };

  // no breaking
  this.break = function(selection/*, info*/) {
    // just update the selection
    this.selection = selection;
  };

  this.softBreak = function(selection, info) {
    this.insertText('\n', selection, info);
  };

  this.paste = function(selection, content) {
    if (content.text) {
      this.insertedText(content.text, selection);
    }
  };

  // no merging, just move cursor when pressing backspace
  this._merge = function(tx, path, dir) {
    var component = this.container.getComponent(path);
    if (dir === 'left') {
      // move cursor to end of previous component
      if (component.previous) {
        var content = tx.get(component.previous.path);
        tx.selection = Selection.create(component.previous.path, content.length);
      }
    }
  };

};

Substance.initClass(FormEditor);

module.exports = FormEditor;
},{"../basics":122,"../document/annotation_updates":136}],170:[function(require,module,exports){
'use strict'

var Surface = require('./surface');
Surface.DomSelection = require('./dom_selection');

Surface.FormEditor = require('./form_editor');
Surface.ContainerEditor = require('./container_editor');
Surface.Clipboard = require('./clipboard');

Surface.NodeView = require('./node_view');
Surface.AnnotationView = require('./annotation_view');
Surface.TextProperty = require('./text_property');

module.exports = Surface;

},{"./annotation_view":164,"./clipboard":165,"./container_editor":166,"./dom_selection":168,"./form_editor":169,"./node_view":171,"./surface":172,"./text_property":173}],171:[function(require,module,exports){
var Substance = require('../basics');

function NodeView(props) {
  this.props = props;
  this.doc = props.doc;
  this.node = props.node;
};

NodeView.Prototype = function() {

  this.tagName = 'div';

  this.createElement = function() {
    var element = document.createElement(this.tagName);
    var classNames = this.getClassNames();
    $(element).addClass(classNames);
    element.dataset.id = this.node.id;
    return element;
  };

  this.getClassNames = function() {
    return [];
  };

  this.render = function() {
    var element = this.createElement();
    var children = this.props.children;
    if (children) {
      for (var i = 0; i < children.length; i++) {
        var child = children[i];
        if (Substance.isString(child)) {
          element.appendChild(document.createTextNode(child));
        } else if (child instanceof NodeView) {
          var el = child.render();
          element.appendChild(el);
        }
      }
    }
    return element;
  };

};

Substance.initClass(NodeView);

module.exports = NodeView;

},{"../basics":122}],172:[function(require,module,exports){
'use strict';

var Substance = require('../basics');

// DomSelection is used to map DOM to editor selections and vice versa
var DomSelection = require('./dom_selection');
// DomContainer is used to analyze the component layout, e.g., to implement container-wide editing such as break or merge
var DomContainer = require('./dom_container');
var Document = require('../document');

var __id__ = 0;

function Surface(editor, options) {
  Substance.EventEmitter.call(this);

  options = options || {};

  this.__id__ = __id__++;

  // this.element must be set via surface.attach(element)
  this.element = null;
  this.$element = null;
  this.editor = editor;

  this.domSelection = null;
  this.domContainer = null;

  this.logger = options.logger || window.console;

  // TODO: VE make jquery injectable
  this.$ = $;
  this.$window = this.$( window );
  this.$document = this.$( window.document );

  this.dragging = false;

  var self = this;
  this._onMouseUp = Substance.bind( this.onMouseUp, this );
  this._onMouseDown = Substance.bind( this.onMouseDown, this );
  this._onMouseMove = Substance.bind( this.onMouseMove, this );
  this._onKeyDown = Substance.bind( this.onKeyDown, this );
  this._onKeyPress = Substance.bind( this.onKeyPress, this );
  this._onBlur = Substance.bind( this.onBlur, this );
  this._onFocus = Substance.bind( this.onFocus, this );

  this._onCompositionEnd = Substance.bind( this.onCompositionEnd, this );

  // state used by handleInsertion
  this.insertState = null;
}

Surface.Prototype = function() {

  this.getContainerName = function() {
    if (this.editor.isContainerEditor()) {
      return this.editor.getContainerName();
    }
  };

  this.getContainer = function() {
    if (this.editor.isContainerEditor()) {
      return this.editor.container;
    }
  };

  this.getEditor = function() {
    return this.editor;
  };

  // Call this whenever the content of the root element changes so
  // that the structure should be re-analyzed
  // TODO: think about a different way. For example, a node component could trigger
  // something on this surface whenever the structure has been changed.
  // Examples:
  //   - container component: container nodes have changed
  //   - list node: list item removed or added
  //   - table node: table cell added or removed
  // In most other cases this is not necessary, as the component structure stays the same
  // only the content changes
  this.forceUpdate = function(cb) {
    console.warn("DEPRICATED: use this.update() instead (which is synchronous).");
    if (this.domContainer) {
      this.domContainer.reset();
    }
    if (cb) cb();
  };
  this.update = function() {
    if (this.domContainer) {
      this.domContainer.reset();
    }
  }

  this.dispose = function() {
    this.detach();
  };

  this.attach = function(element) {
    var doc = this.editor.getDocument();

    // Initialization
    this.element = element;
    this.$element = $(element);
    this.$element.prop('contentEditable', 'true');
    var containerId = this.$element.attr('data-id');
    if (!containerId) {
      throw new Error('Contract: a Surface root element must have a "data-id" property to identify its container.');
    }
    this.domContainer = new DomContainer(containerId, element);
    this.domSelection = new DomSelection(element, this.domContainer);
    this.editor.setContainer(this.domContainer);

    // Keyboard Events
    //
    this.$element.on('keydown', this._onKeyDown);
    this.$element.on('keypress', this._onKeyPress);
    // OSX specific handling of dead-keys
    if (this.element.addEventListener) {
      this.element.addEventListener('compositionend', this._onCompositionEnd, false);
    }

    // Mouse Events
    //
    this.$element.on( 'mousemove', this._onMouseMove );
    this.$element.on( 'mousedown', this._onMouseDown );
    this.$element.on('blur', this._onBlur);
    this.$element.on('focus', this._onFocus);

    // Document Change Events
    //
    // listen to updates so that we can set the selection (only for editing not for replay)
    doc.connect(this, { 'document:changed': this.onDocumentChange });
  };

  this.detach = function() {
    var doc = this.editor.getDocument();

    // Document Change Events
    //
    doc.disconnect(this);

    // Mouse Events
    //
    this.$element.off( 'mousemove', this._onMouseMove );
    this.$element.off( 'mousedown', this._onMouseDown );
    this.$element.off('blur', this._onBlur);
    this.$element.off('focus', this._onFocus);

    // Keyboard Events
    //
    this.$element.off('keydown', this._onKeyDown);
    this.$element.off('keypress', this._onKeyPress);
    if (this.element.addEventListener) {
      this.element.removeEventListener('compositionend', this._onCompositionEnd, false);
    }

    // Clean-up
    //
    this.editor.setContainer(null);
    this.element = null;
    this.$element = null;
    this.domSelection = null;
    this.domContainer = null;
  };

  // ###########################################
  // Keyboard Handling
  //

  /**
   * Handle document key down events.
   */
  this.onKeyDown = function( e ) {
    if ( e.which === 229 ) {
      // ignore fake IME events (emitted in IE and Chromium)
      return;
    }
    switch ( e.keyCode ) {
      case Surface.Keys.LEFT:
      case Surface.Keys.RIGHT:
        return this.handleLeftOrRightArrowKey(e);
      case Surface.Keys.UP:
      case Surface.Keys.DOWN:
        return this.handleUpOrDownArrowKey(e);
      case Surface.Keys.ENTER:
        e.preventDefault();
        return this.handleEnterKey(e);
      case Surface.Keys.SPACE:
        e.preventDefault();
        return this.handleSpace(e);
      case Surface.Keys.BACKSPACE:
      case Surface.Keys.DELETE:
        e.preventDefault();
        return this.handleDeleteKey(e);
      default:
        break;
    }
  };

  /**
   * Handle key events not consumed by onKeyDown.
   * Essentially this is used to handle text typing.
   */
  this.onKeyPress = function( e ) {
    // Filter out non-character keys. Doing this prevents:
    // * Unexpected content deletion when selection is not collapsed and the user presses, for
    //   example, the Home key (Firefox fires 'keypress' for it)
    // * Incorrect pawning when selection is collapsed and the user presses a key that is not handled
    //   elsewhere and doesn't produce any text, for example Escape
    if (
      // Catches most keys that don't produce output (charCode === 0, thus no character)
      e.which === 0 || e.charCode === 0 ||
      // Opera 12 doesn't always adhere to that convention
      e.keyCode === Surface.Keys.TAB || e.keyCode === Surface.Keys.ESCAPE ||
      // prevent combinations with meta keys, but not alt-graph which is represented as ctrl+alt
      !!(e.metaKey) || (!!e.ctrlKey^!!e.altKey)
    ) {
      return;
    }
    // TODO: we need to make sure that there actually was content
    this.handleInsertion(e);
  };

  // Handling Dead-keys under OSX
  this.onCompositionEnd = function(e) {
    try {
      var sel = this.editor.selection;
      this.editor.insertText(e.data, this.editor.selection);
    } catch (error) {
      console.error(error);
    }
  };

  this.handleInsertion = function( /*e*/ ) {
    // this.handlingInsertion = true;
    // get the text between the position before insert and after insert
    var sel = this.editor.selection;
    var range = sel.getRange();
    var el = DomSelection.getDomNodeForPath(this.element, range.start.path);
    var self = this;
    setTimeout(function() {
      var text = el.textContent;
      var textInput = text.substring(range.start.offset, range.start.offset+1);
      // Note: providing the source element, so that the TextProperty can decide not to render
      self.editor.insertText(textInput, sel, {source: el, typing: true});
    });
  };

  this.handleLeftOrRightArrowKey = function ( e ) {
    var self = this;
    window.setTimeout(function() {
      self._updateModelSelection({
        left: (e.keyCode === Surface.Keys.LEFT),
        right: (e.keyCode === Surface.Keys.RIGHT)
      });
    });
  };

  this.handleUpOrDownArrowKey = function ( /*e*/ ) {
    var self = this;
    window.setTimeout(function() {
      self._updateModelSelection();
    });
  };

  this.handleEnterKey = function( e ) {
    e.preventDefault();
    var selection = this.domSelection.get();
    if (e.shiftKey) {
      this.editor.softBreak(selection);
    } else {
      this.editor.break(selection);
    }
  };

  this.handleDeleteKey = function ( e ) {
    e.preventDefault();
    var selection = this.domSelection.get();
    var direction = (e.keyCode === Surface.Keys.BACKSPACE) ? 'left' : 'right';
    this.editor.delete(selection, direction);
  };


  this.handleSpace = function( e ) {
    e.preventDefault();
    var selection = this.domSelection.get();
    this.editor.insertText(" ", selection);
  };

  // ###########################################
  // Mouse Handling
  //

  this.onMouseDown = function(e) {
    if ( e.which !== 1 ) {
      return;
    }
    // Bind mouseup to the whole document in case of dragging out of the surface
    this.dragging = true;
    this.$document.on( 'mouseup', this._onMouseUp );
  };

  this.onMouseUp = function(/*e*/) {
    // ... and unbind the temporary handler
    this.$document.off( 'mouseup', this._onMouseUp );
    this.dragging = false;
    this._setModelSelection(this.domSelection.get());
  };

  this.onMouseMove = function() {
    if (this.dragging) {
      // TODO: do we want that?
      // update selection during dragging
      // this._setModelSelection(this.domSelection.get());
    }
  };

  this.onBlur = function() {
    // console.log('Blurring surface', this.name, this.__id__);
    this.isFocused = false;
    this.setSelection(Substance.Document.nullSelection);
  };

  this.onFocus = function() {
    // console.log('Focusing surface', this.name, this.__id__);
    this.isFocused = true;
  };

  // ###########################################
  // Document and Selection Changes
  //

  this.onDocumentChange = function(change, info) {
    if (!this.isFocused) {
      return;
    }
    // update the domSelection first so that we know if we are
    // within this surface at all
    if (!info.replay && !info.typing) {
      var self = this;
      window.setTimeout(function() {
        // GUARD: For cases where the panel/or whatever has been disposed already
        // after changing the doc
        if (!self.domSelection) return;
        var sel = change.after.selection;
        self.editor.selection = sel;
        self.domSelection.set(sel);
        self.emit('selection:changed', sel);
      });
    }
  };

  this.getSelection = function() {
    return this.editor.selection;
  };

  /**
   * Set the model selection and update the DOM selection accordingly
   */
  this.setSelection = function(sel) {
    if (this._setModelSelection(sel)) {
      if (this.domSelection) {
        // also update the DOM selection
        this.domSelection.set(sel);
      }
    }
  };

  this.rerenderDomSelection = function() {
    if (this.isFocused) {
      this.domSelection.set(this.getSelection());
    }
  };

  this._updateModelSelection = function(options) {
    this._setModelSelection(this.domSelection.get(options));
  };

  /**
   * Set the model selection only (without DOM selection update).
   *
   * Used internally if we derive the model selection from the DOM selcection.
   */
  this._setModelSelection = function(sel) {
    sel = sel || Substance.Document.nullSelection;
    if (!this.editor.selection.equals(sel)) {
      // console.log('Surface.setSelection: %s', sel.toString());
      this.editor.selection = sel ;
      this.emit('selection:changed', sel);
      return true;
    }
  };

  this.getLogger = function() {
    return this.logger;
  };

};

Substance.inherit( Surface, Substance.EventEmitter );

Surface.Keys =  {
  UNDEFINED: 0,
  BACKSPACE: 8,
  DELETE: 46,
  LEFT: 37,
  RIGHT: 39,
  UP: 38,
  DOWN: 40,
  ENTER: 13,
  END: 35,
  HOME: 36,
  TAB: 9,
  PAGEUP: 33,
  PAGEDOWN: 34,
  ESCAPE: 27,
  SHIFT: 16,
  SPACE: 32
};

module.exports = Surface;

},{"../basics":122,"../document":150,"./dom_container":167,"./dom_selection":168}],173:[function(require,module,exports){
var Substance = require('../basics');

var Annotator = Substance.Document.Annotator;
var NodeView = require('./node_view');
var AnnotationView = require('./annotation_view');

// Basic implementation of a text property.

function TextProperty() {}

TextProperty.Prototype = function() {

  this.getDocument = function() {
    throw new Error('This is abstract');
  };

  this.getPath = function() {
    throw new Error('This is abstract');
  };

  /*
    Add these when creating the element
      classes: 'text-property'
      css: whiteSpace: "pre-wrap"
      'data-path': path.join('.')
   */
  this.getElement = function() {
    throw new Error('This is abstract');
  };

  // Override this if you want to add app-specific annotations, such as highlights
  this.getAnnotations = function() {
    var doc = this.getDocument();
    var path = this.getPath();
    return doc.getIndex('annotations').get(path);
  };


  this.attach = function() {
    var doc = this.getDocument();
    var path = this.getPath();
    doc.getEventProxy('path').add(path, this, this.propertyDidChange);
  };

  this.detach = function() {
    var doc = this.getDocument();
    var path = this.getPath();
    doc.getEventProxy('path').remove(path, this);
  };

  this.renderContent = function() {
    var doc = this.getDocument();
    var contentView = new TextProperty.ContentView({
      doc: doc,
      children: this.renderChildren()
    });
    var fragment = contentView.render();
    // Add a <br> so that the node gets rendered and Contenteditable will stop when moving the cursor.
    // TODO: probably this is not good when using the property inline.
    fragment.appendChild(document.createElement('br'));
    var domNode = this.getElement();
    domNode.innerHTML = "";
    domNode.appendChild(fragment);
  };

  this.renderChildren = function() {
    var doc = this.getDocument();
    var path = this.getPath();
    var text = doc.get(path) || "";

    var annotations = this.getAnnotations();

    var annotator = new Annotator();
    annotator.onText = function(context, text) {
      context.children.push(text);
    };
    annotator.onEnter = function(entry) {
      var node = entry.node;
      // TODO: we need a component factory, so that we can create the appropriate component
      var ViewClass = AnnotationView;
      var classNames = [];
      return {
        ViewClass: ViewClass,
        props: {
          doc: doc,
          node: node,
          classNames: classNames,
        },
        children: []
      };
    };
    annotator.onExit = function(entry, context, parentContext) {
      var props = context.props;
      props.children = context.children;
      var view = new context.ViewClass(props);
      parentContext.children.push(view);
    };
    var root = { children: [] };
    annotator.start(root, text, annotations);
    return root.children;
  };

  this.propertyDidChange = function(change, info) {
    // Note: Surface provides the source element as element
    // whenever editing is done by Contenteditable (as opposed to programmatically)
    // In that case we trust in CE and do not rerender.
    if (info.source === this.getElement()) {
      // console.log('Skipping update...');
      return;
    }
    // TODO: maybe we want to find an incremental solution
    // However, this is surprisingly fast so that almost no flickering can be observed.
    this.renderContent();
  };
};

Substance.initClass(TextProperty);

TextProperty.ContentView = NodeView.extend({
  createElement: function() {
    return document.createDocumentFragment();
  }
});

module.exports = TextProperty;

},{"../basics":122,"./annotation_view":164,"./node_view":171}],174:[function(require,module,exports){
var Substance = require('substance');
var $$ = React.createElement;
var Surface = Substance.Surface;
var _ = require("substance/helpers");
var TextProperty = require('./text_property');

// Container Node
// ----------------
//
// Represents a flat collection of nodes


// TODO: this is not Substance.Writer but should be in Archivist
// Plan: make this implementation an abstract mixin
// and let the application configure a componentFactory
// that provides a customized version.

var ContainerComponent = React.createClass({
  displayName: "ContainerComponent",

  contextTypes: {
    componentFactory: React.PropTypes.object.isRequired,
    notifications: React.PropTypes.object.isRequired
  },

  childContextTypes: {
    // provided to editor components so that they know in which context they are
    surface: React.PropTypes.object,
  },

  getInitialState: function() {
    var editor = new Surface.ContainerEditor('content', this.props.doc);
    // HACK: this is also Archivist specific
    editor.defaultTextType = 'text';
    var options = {
      logger: this.context.notifications
    };
    this.surface = new Surface(editor, options);
    return {};
  },

  handleToggleSubjectReference: function(e) {
    e.preventDefault();
    var subjectReferenceId = e.currentTarget.dataset.id;
    var writerCtrl = this.props.writerCtrl;
    var state = writerCtrl.state;

    if (state.contextId === "editSubjectReference" && state.subjectReferenceId === subjectReferenceId) {
      writerCtrl.replaceState({
        contextId: "subjects"
      });
    } else {
      writerCtrl.replaceState({
        contextId: "editSubjectReference",
        subjectReferenceId: subjectReferenceId
      });
    }
  },

  getChildContext: function() {
    return {
      surface: this.surface
    };
  },

  render: function() {
    var containerNode = this.props.node;
    var doc = this.props.doc;
    var writerCtrl = this.props.writerCtrl;

    // Prepare subject reference components
    // ---------

    var subjectReferences = doc.getIndex('type').get('subject_reference');
    var subjectRefComponents = [];
    var activeContainerAnnotations = writerCtrl.getActiveContainerAnnotations();

    _.each(subjectReferences, function(sref) {
      subjectRefComponents.push($$('a', {
        className: "subject-reference"+(_.includes(activeContainerAnnotations, sref.id) ? ' selected' : ''),
        href: "#",
        "data-id": sref.id,
        onClick: this.handleToggleSubjectReference
      }));
    }, this);

    // Prepare container components (aka nodes)
    // ---------

    var componentFactory = this.context.componentFactory;
    var components = [$$(TextProperty, {
      doc: this.props.writerCtrl.doc,
      tagName: "div",
      className: "title",
      path: [ "document", "title"],
      writerCtrl: this.props.writerCtrl,
    })];
    components = components.concat(containerNode.nodes.map(function(nodeId) {
      var node = doc.get(nodeId);
      var ComponentClass = componentFactory.get(node.type);
      if (!ComponentClass) {
        throw new Error('Could not resolve a component for type: ' + node.type);
      }
      return $$(ComponentClass, {
        key: node.id,
        doc: doc,
        node: node,
        // TODO: we should use DI instead of coupling to the writer
        writerCtrl: writerCtrl
      });
    }));

    // Top level structure
    // ---------

    var virtualDOM = $$("div", {className: "interview-content", contentEditable: true, "data-id": "content"},
      $$("div", {
          className: "container-node " + this.props.node.id,
          spellCheck: false,
          "data-id": this.props.node.id
        },
        $$('div', {className: "nodes"}, components),
        $$('div', {className: "subject-references", contentEditable: false}, subjectRefComponents)
      )
    );
    return virtualDOM;
  },

  updateBrackets: function() {
    var doc = this.props.doc;
    var subjectReferences = doc.getIndex('type').get('subject_reference');

    _.each(subjectReferences, function(subjRef) {
      var anchors = $(this.getDOMNode()).find('.nodes .anchor[data-id='+subjRef.id+']');

      var startAnchorEl, endAnchorEl;
      if ($(anchors[0]).hasClass('start-anchor')) {
        startAnchorEl = anchors[0];
        endAnchorEl = anchors[1];
      } else {
        startAnchorEl = anchors[1];
        endAnchorEl = anchors[0];
      }

      if (!startAnchorEl || !endAnchorEl) {
        console.warn("FIXME: Could not find anchors for subject reference ", subjRef.id);
        return;
      }

      var startTop = $(startAnchorEl).position().top;
      var endTop = $(endAnchorEl).position().top + $(endAnchorEl).height();
      var height = endTop - startTop;

      var subjectRefEl = $(this.getDOMNode()).find('.subject-references .subject-reference[data-id='+subjRef.id+']');

      subjectRefEl.css({
        top: startTop,
        height: height
      });
    }, this);
  },

  componentDidMount: function() {
    var surface = this.surface;
    var doc = this.props.doc;

    doc.connect(this, {
      'document:changed': this.onDocumentChange
    });

    this.props.writerCtrl.registerSurface(surface, "content");
    surface.attach(this.getDOMNode());

    doc.connect(this, {
      'container-annotation-update': this.handleContainerAnnotationUpdate
    });

    var self = this;

    // HACK: For initial rendering because text view depends on some view-related information
    // that gets available after the first render
    // this.forceUpdate();
    this.forceUpdate(function() {
      self.surface.__prerendering__ = true;
      self.surface.update();
      self.surface.__prerendering__ = false;
      self.forceUpdate(function() {
        self.updateBrackets();
        self.surface.rerenderDomSelection();
      });
    });

    $(window).resize(this.updateBrackets);
  },

  handleContainerAnnotationUpdate: function() {
    var self = this;
    this.forceUpdate(function() {
      self.updateBrackets();
    });
  },

  componentDidUpdate: function() {
    // HACK: when the state is changed this and particularly TextProperties
    // get rerendered (e.g., as the highlights might have changed)
    // Unfortunately we loose the DOM selection then.
    // Thus, we are resetting it here, but(!) delayed as otherwise the surface itself
    // might not have finished setting the selection to the desired and a proper state.
    if (!this.surface.__prerendering__) {
      var self = this;
      setTimeout(function() {
        self.surface.rerenderDomSelection();
      });
    }
  },

  componentWillUnmount: function() {
    var surface = this.surface;
    var doc = this.props.doc;
    doc.disconnect(this);
    this.props.writerCtrl.unregisterSurface(surface);
    surface.detach();
  },

  onDocumentChange: function(change) {
    if (change.isAffected([this.props.node.id, 'nodes'])) {
      var self = this;
      self.surface.__prerendering__ = true;
      this.forceUpdate(function() {
        // self.surface.__prerendering__ = true;
        self.surface.update();
        self.surface.__prerendering__ = false;
        self.forceUpdate(function() {
          self.updateBrackets();
        });
      });
    }
    // eagerly update brackets on every change
    else {
      this.updateBrackets();
    }
  }

});

module.exports = ContainerComponent;
},{"./text_property":176,"substance":5,"substance/helpers":4}],175:[function(require,module,exports){
var $$ = React.createElement;
var TextProperty = require('./text_property')

// TextComponent
// ----------------
//

var TextComponent = React.createClass({

  displayName: "TextComponent",
  render: function() {
    return $$("div", { className: "content-node text", "data-id": this.props.node.id },
      $$(TextProperty, {
        doc: this.props.doc,
        path: [ this.props.node.id, "content"],
        writerCtrl: this.props.writerCtrl,
      })
    );
  }
});

module.exports = TextComponent;

},{"./text_property":176}],176:[function(require,module,exports){
var Substance = require('substance');
var $$ = React.createElement;

var TextProperty = Substance.Surface.TextProperty;

// TextPropertyComponent
// ----------------
//

var TextPropertyComponent = React.createClass(Substance.extend({}, TextProperty.prototype, {

  displayName: "TextProperty",

  contextTypes: {
    surface: React.PropTypes.object.isRequired,
    getHighlightedNodes: React.PropTypes.func.isRequired,
    getHighlightsForTextProperty: React.PropTypes.func.isRequired,
  },

  getInitialState: function() {
    return { highlights: [] };
  },

  // Only necessary when
  shouldComponentUpdate: function() {
    this.renderManually();
    this.updateHighlights();
    return false;
  },

  componentDidMount: function() {
    var doc = this.props.doc;
    doc.getEventProxy('path').add(this.props.path, this, this.textPropertyDidChange);
    // HACK: a guard so that we do not render manually when this is unmounted
    this.__mounted__ = true;
    // Note: even if we don't need to render in surfaces with container (~two-pass rendering)
    // we still need to render this in the context of fornm-editors.
    this.renderManually();
  },

  componentWillUnmount: function() {
    var doc = this.props.doc;
    doc.getEventProxy('path').remove(this.props.path, this);
    this.__mounted__ = false;
  },

  render: function() {
    return $$((this.props.tagName || 'span'), {
      className: "text-property " + (this.props.className || ""),
      contentEditable: true,
      spellCheck: false,
      style: {
        whiteSpace: "pre-wrap"
      },
      "data-path": this.props.path.join('.')
    });
  },

  renderManually: function() {
    // HACK: to achieve two-pass rendering for container backed surfaces
    // we store a state variable and skip 'deep' rendering here.
    if (this.context.surface.__prerendering__) return;
    // HACK: it happened that this is called even after this component had been mounted.
    // We need to track these situations and fix them in the right place.
    // However, we leave it here for a while to increase stability,
    // as these occasions are not critical for the overall functionality.
    if(!this.__mounted__) {
      console.warn('Tried to render an unmounted TextPropertyComponent.');
      return;
    }
    this.renderContent();
    this.updateHighlights();
  },

  getAnnotations: function() {
    var doc = this.props.doc;
    var surface = this.context.surface;
    var path = this.props.path;
    var annotations = doc.getIndex('annotations').get(path);

    var containerName = surface.getContainerName();
    if (containerName) {
      var anchors = doc.getIndex('container-annotations').get(path, containerName);
      annotations = annotations.concat(anchors);
    }
    var highlights = this.context.getHighlightsForTextProperty(this);
    annotations = annotations.concat(highlights);

    return annotations;
  },

  updateHighlights: function() {
    if (!this.context.getHighlightedNodes) return;
    var highlightedAnnotations = this.context.getHighlightedNodes();
    var domNode = this.getDOMNode();
    var els = $(domNode).find('.annotation, .container-annotation');
    for (var i = 0; i < els.length; i++) {
      var el = els[i];
      var activate = highlightedAnnotations.indexOf(el.dataset.id) >= 0;
      if (activate) {
        $(el).addClass('active');
      } else {
        $(el).removeClass('active');
      }
    }
  },

  _rerenderAndRecoverSelection: function() {
    this.renderManually();
    this.context.surface.rerenderDomSelection();
  },

  textPropertyDidChange: function(change, info) {
    // HACK: currently without incremental rendering we need to reset the selection after changes.
    // With high rapid incoming keyboard events the CE acts on temporarily invalid selections
    // making the surface fail to detect the correct text input.
    // Using the source element given by surface when handling inserts, we can skip rendering,
    // as this is done by CE already.
    // However can't skip it completely as we need to fixup rendered annotations.
    // The trick here is to debounce the rerendering, so that we stay out of the way of CE during
    // the rapid input phase, and fixup the rendering a bit delayed.
    if (info.source === this.getDOMNode()) {
      if (!this._debouncedRerender) {
        var INTERVAL = 50; //ms
        this._debouncedRerender = Substance.debounce(Substance.bind(this._rerenderAndRecoverSelection, this), INTERVAL);
      }
      this._debouncedRerender();
      return;
    }
    // This is called whenever the associated property has been updated or set
    // HACK: container might be out of sync and rerender only works when it's updated
    // So we wait a bit...
    setTimeout(function() {
      // TODO: maybe we want to find an incremental solution
      // However, this is surprisingly fast so that almost no flickering can be observed.
      this.renderManually();
    }.bind(this));
  },

  getContainer: function() {
    return this.context.surface.getContainer();
  },

  getDocument: function() {
    return this.props.doc;
  },

  getPath: function() {
    return this.props.path;
  },

  getElement: function() {
    return this.getDOMNode();
  },

}));

TextPropertyComponent.Highlight = function(range, options) {
  options = options || {};
  this.range = range;
  this.id = options.id;
  this.classNames = options.classNames;
};

Substance.initClass(TextPropertyComponent.Highlight);

TextPropertyComponent.Highlight.prototype.getClassNames = function() {
  return this.classNames;
};

TextPropertyComponent.Highlight.static.level = Number.MAX_VALUE;

module.exports = TextPropertyComponent;

},{"substance":5}],177:[function(require,module,exports){
var $$ = React.createElement;
var Substance = require("substance");
var Scrollbar = require("./scrollbar");

var ContentPanel = React.createClass({
  displayName: "ContentPanel",

  // Since component gets rendered multiple times we need to update
  // the scrollbar and reattach the scroll event
  componentDidMount: function() {
    this.updateScrollbar();
    $(window).on('resize', this.updateScrollbar);

    var doc = this.props.writerCtrl.doc;
    doc.connect(this, {
      'document:changed': this.onDocumentChange
    });
  },

  componentWillUnmount: function() {
    doc.disconnect(this);
    $(window).off('resize');
  },

  onDocumentChange: function() {
    setTimeout(function() {
      this.updateScrollbar();
    }.bind(this), 0);
  },

  componentDidUpdate: function() {
    this.updateScrollbar();
  },

  updateScrollbar: function() {
    var scrollbar = this.refs.scrollbar;
    var panelContentEl = this.refs.panelContent.getDOMNode();

    // We need to await next repaint, otherwise dimensions will be wrong
    Substance.delay(function() {
      scrollbar.update(panelContentEl);  
    },0);

    // (Re)-Bind scroll event on new panelContentEl
    $(panelContentEl).off('scroll');
    $(panelContentEl).on('scroll', this._onScroll);
  },

  _onScroll: function(e) {
    var panelContentEl = this.refs.panelContent.getDOMNode();
    this.refs.scrollbar.update(panelContentEl);
  },

  // Rendering
  // -----------------

  getContentEditor: function() {
    var writerCtrl = this.props.writerCtrl;
    var doc = writerCtrl.doc;
    var ContainerClass = writerCtrl.getNodeComponentClass("container");

    return $$(ContainerClass, {
      writerCtrl: writerCtrl,
      doc: doc,
      node: doc.get("content"),
      ref: "contentEditor"
    });
  },

  render: function() {
    var writerCtrl = this.props.writerCtrl;

    return $$("div", {className: "panel content-panel-component"}, // usually absolutely positioned
      $$(Scrollbar, {
        id: "content-scrollbar",
        contextId: writerCtrl.getState().contextId,
        highlights: writerCtrl.getHighlightedNodes.bind(writerCtrl),
        ref: "scrollbar"
      }),

      $$('div', {className: "panel-content", ref: "panelContent"}, // requires absolute positioning, overflow=auto
        this.getContentEditor()
      )
    );
  }
});

module.exports = ContentPanel;
},{"./scrollbar":180,"substance":5}],178:[function(require,module,exports){
var $$ = React.createElement;

// The Content Panel
// ----------------

var ContentTools = React.createClass({
  displayName: "ContentTools",
  render: function() {
    var tools = this.props.writerCtrl.getTools();
    var props = {
      writerCtrl: this.props.writerCtrl,
      doc: this.props.doc,
      switchContext: this.props.switchContext
    };

    var toolComps = tools.map(function(tool, index) {
      props.key = index;
      return $$(tool, props);
    });

    return $$("div", {className: "content-tools-component"},
      $$('div', {className: "tools"},
        toolComps
      )
    );
  }
});

module.exports = ContentTools;
},{}],179:[function(require,module,exports){
"use strict";

var Writer = require("./writer");

var ContainerComponent = require("./components/container_component");
var TextComponent = require("./components/text_component");
var SaveTool = require("./tools/save_tool");
var UndoTool = require("./tools/undo_tool");
var RedoTool = require("./tools/redo_tool");
var StrongTool = require("./tools/strong_tool");
var EmphasisTool = require("./tools/emphasis_tool");

var BasicToolMixin = require("./tools/basic_tool_mixin");
var TextProperty = require("./components/text_property");

Writer.CoreModule = {
  name: "core",
  components: {
    "container": ContainerComponent,
    "text": TextComponent,
  },
  panels: [
    // TODO: TOCPanel
  ],
  stateHandlers: {},
  tools: [
    SaveTool,
    UndoTool,
    RedoTool,
    StrongTool,
    EmphasisTool
  ]
};

Writer.BasicToolMixin = BasicToolMixin;
Writer.TextProperty = TextProperty;

module.exports = Writer;
},{"./components/container_component":174,"./components/text_component":175,"./components/text_property":176,"./tools/basic_tool_mixin":182,"./tools/emphasis_tool":183,"./tools/redo_tool":184,"./tools/save_tool":185,"./tools/strong_tool":186,"./tools/undo_tool":187,"./writer":188}],180:[function(require,module,exports){
"use strict";

var $$ = React.createElement;
var _ = require("substance/helpers");

// A rich scrollbar implementation that supports highlights
// ----------------


var Scrollbar = React.createClass({
  displayName: "Scrollbar",

  getInitialState: function() {
    return {
      thumb: {top: 0, height: 20}, // just render at the top
      highlights: [] // no highlights until state derived
    };
  },

  componentDidMount: function() {
     // HACK global window object!
     $(window).mousemove(this.mouseMove);
     $(window).mouseup(this.mouseUp);
  },

  mouseDown: function(e) {
    this._mouseDown = true;
    var scrollBarOffset = $(this.getDOMNode()).offset().top;
    var y = e.pageY - scrollBarOffset;
    var thumbEl = this.refs.thumb.getDOMNode();

    if (e.target !== thumbEl) {
      // Jump to mousedown position
      this.offset = $(thumbEl).height()/2;
      this.mouseMove(e);
    } else {
      this.offset = y - $(thumbEl).position().top;
    }
    return false;
  },

  // Handle Mouse Up
  // -----------------
  //
  // Mouse lifted, no scroll anymore

  mouseUp: function() {
    this._mouseDown = false;
  },

  // Handle Scroll
  // -----------------
  //
  // Handle scroll event
  // .visible-area handle

  mouseMove: function(e) {
    if (this._mouseDown) {
      var scrollBarOffset = $(this.getDOMNode()).offset().top;
      var y = e.pageY - scrollBarOffset;

      // find offset to visible-area.top
      var scroll = (y-this.offset)*this.factor;
      this.scrollTop = $(this.panelContentEl).scrollTop(scroll);
    }
  },

  update: function(panelContentEl) {
    var self = this;

     this.panelContentEl = panelContentEl;
     // initialized lazily as this element is not accessible earlier (e.g. during construction)
     // get the new dimensions
     // TODO: use outerheight for contentheight determination?
     var contentHeight = 0;

     $(panelContentEl).children().each(function() {
      contentHeight += $(this).outerHeight();
     });

     var panelHeight = $(self.panelContentEl).height();

     // Needed for scrollbar interaction
     this.factor = (contentHeight / panelHeight);
     
     var scrollTop = $(self.panelContentEl).scrollTop();

     var highlights = [];
     // Compute highlights
     this.props.highlights().forEach(function(nodeId) {
       var nodeEl = $(self.panelContentEl).find('*[data-id='+nodeId+']');
       if (!nodeEl.length) return;

       var top = nodeEl.position().top / self.factor;
       var height = nodeEl.outerHeight(true) / self.factor;

       // HACK: make all highlights at least 3 pxls high, and centered around the desired top pos
       if (height < Scrollbar.overlayMinHeight) {
         height = Scrollbar.overlayMinHeight;
         top = top - 0.5 * Scrollbar.overlayMinHeight;
       }

       var data = {
         id: nodeId,
         top: top,
         height: height
       }
       highlights.push(data);
     });

     var thumbProps = {
      top: scrollTop / this.factor,
      height: panelHeight / this.factor
     };

    this.setState({
      thumb: thumbProps,
      highlights: highlights
    });
  },

  render: function() {
    var highlightEls = this.state.highlights.map(function(h) {

     return $$('div', {
        className: 'highlight',
        key: h.id,
        style: {
          top: h.top,
          height: h.height
        }
      });
    });

    var thumbEl = $$('div', {
      ref: "thumb",
      className: "thumb",
      style: {
      top: this.state.thumb.top,
      height: this.state.thumb.height
     }
    });

    return $$("div", {className: "scrollbar-component "+this.props.contextId, onMouseDown: this.mouseDown},
      thumbEl,
      $$('div', {className: 'highlights'}, 
       highlightEls
      )
    );
  }
});

Scrollbar.overlayMinHeight = 5

module.exports = Scrollbar;

},{"substance/helpers":4}],181:[function(require,module,exports){
var $$ = React.createElement;

var ICONS_FOR_TYPE = {
  "error": "fa-exclamation-circle",
  "info": "fa-info",
  "progress": "fa-exchange",
  "success": "fa-check-circle",
};

// The Status Bar
// ----------------

var StatusBar = React.createClass({
  contextTypes: {
    notifications: React.PropTypes.object.isRequired
  },

  displayName: "StatusBar",

  getInitialState: function() {
    return {
      message: null
    };
  },

  componentDidMount: function() {
    var notifications = this.context.notifications;

    notifications.connect(this, {
      'messages:updated': this.handleNotificationUpdate
    });
  },

  handleNotificationUpdate: function(messages) {
    var currentMessage = messages.pop();
    this.setState({
      message: currentMessage
    });
  },

  render: function() {
    var message = this.state.message;
    var notificationsEl;

    var classNames = ["status-bar-component"];

    if (message) {
      classNames.push(message.type);

      notificationsEl = $$('div', {className: 'notifications'},
        $$("div", {
          className: "icon",
          dangerouslySetInnerHTML: {__html: '<i class="fa '+ICONS_FOR_TYPE[message.type]+'"></i>'}
        }),
        $$('div', {className: 'message'}, message.message)
      );
    } else {
      notificationsEl = $$('div');
    }

    return $$("div", {className: classNames.join(" ")},
      $$("div", {className: "document-status"}, this.props.doc.get('document').title),
      notificationsEl
    );
  }
});

module.exports = StatusBar;
},{}],182:[function(require,module,exports){
var $$ = React.createElement;
var Substance = require("substance");


// Invariant: basic annotations can not overlap like there can not be two
// strong annotations for a particular range

var BasicToolMixin = {
  componentDidMount: function() {
    var writerCtrl = this.props.writerCtrl;
    writerCtrl.connect(this, {
      'selection:changed': this.handleSelectionChange
    });
  },

  // When there's no existing annotation overlapping, we create a new one.
  canCreate: function(annoSels) {
    return (annoSels.length === 0);
  },

  // When more than one annotation overlaps with the current selection
  canFusion: function(annoSels) {
    return (annoSels.length >= 2);
  },

  // When the cursor or selection is inside an existing annotation
  canRemove: function(annoSels, sel) {
    if (annoSels.length !== 1) return false;
    var annoSel = annoSels[0];
    return sel.isInside(annoSel);
  },

  // When there's some overlap with only a single annotation we do an expand
  canExpand: function(annoSels, sel) {
    if (annoSels.length !== 1) return false;
    var annoSel = annoSels[0];
    return sel.overlaps(annoSel);
  },

  canTruncate: function(annoSels, sel) {
    if (annoSels.length !== 1) return false;
    var annoSel = annoSels[0];
    return (sel.leftAligned(annoSel) || sel.rightAligned(annoSel)) && !sel.equals(annoSel);
  },

  handleSelectionChange: function(sel) {
    var writerCtrl = this.props.writerCtrl;

    // Note: toggling of a subject reference is only possible when
    // the subject reference is selected and the
    if (sel.isNull() || sel.isCollapsed() || !sel.isPropertySelection()) {
      return this.setState({
        active: false,
        selected: false
      });
    }

    var newState = {
      active: true,
      selected: false,
      mode: undefined
    };

    // Extract range and matching annos of current selection
    var range = sel.getTextRange();
    var annos = writerCtrl.doc.annotationIndex.get(sel.getPath(), range[0], range[1], this.annotationType);

    var annoSels = annos.map(function(anno) {
      var range = range;
      return Substance.Document.Selection.create(anno.path, anno.range[0], anno.range[1]);
    });

    if (this.canCreate(annoSels, sel)) {
      newState.mode = "create";
    } else if (this.canFusion(annoSels, sel)) {
      newState.mode = "fusion";
    } else if (this.canRemove(annoSels, sel)) {
      newState.mode = "remove";
    } else if (this.canTruncate(annoSels, sel)) {
      newState.mode = "truncate";
    } else if (this.canExpand(annoSels, sel)) {
      newState.mode = "expand";
    }

    this.setState(newState);
  },

  handleClick: function(e) {
    e.preventDefault(e);
  },

  handleMouseDown: function(e) {
    e.preventDefault();

    // Toggle annotation
    var writerCtrl = this.props.writerCtrl;
    var sel = writerCtrl.getSelection();

    if (sel.isNull() || !sel.isPropertySelection()) return;

    var range = sel.getTextRange();

    // var annotations = writerCtrl.doc.annotationIndex.get(sel.getPath(), range[0], range[1], this.annotationType);

    if (this.state.mode === "create") {
      writerCtrl.annotate({
        type: this.annotationType
      });
    } else if (this.state.mode === "fusion") {
      console.log('TODO: fusion dance');
    } else if (this.state.mode === "remove") {
      console.log('TODO: remove');
    } else if (this.state.mode === "truncate") {
      console.log('TODO: truncate');
    } else if (this.state.mode === "expand") {
      console.log('TODO: expand');
    }
  },

  getInitialState: function() {
    return {
      active: false,
      selected: false
    };
  },

  render: function() {
    var classNames = [this.annotationType+'-tool-component', 'tool'];
    if (this.state.active) classNames.push("active");
    if (this.state.selected) classNames.push("selected");

    return $$("a", {
      className: classNames.join(' '),
      href: "#",
      title: 'Emphasis',
      onMouseDown: this.handleMouseDown,
      onClick: this.handleClick,
      dangerouslySetInnerHTML: {__html: '<i class="fa '+this.toolIcon+'"></i>'}
    });
  }
};

module.exports = BasicToolMixin;
},{"substance":5}],183:[function(require,module,exports){
var BasicToolMixin = require("./basic_tool_mixin");

var EmphasisTool = React.createClass({
  mixins: [BasicToolMixin],
  displayName: "EmphasisTool",
  annotationType: "emphasis",
  toolIcon: "fa-italic",
});

module.exports = EmphasisTool;
},{"./basic_tool_mixin":182}],184:[function(require,module,exports){
var $$ = React.createElement;


// Redo Tool
// ----------------

var RedoTool = React.createClass({
  displayName: "SaveTool",

  contextTypes: {
    backend: React.PropTypes.object.isRequired
  },

  getDocument: function() {
    return this.props.writerCtrl.doc;
  },

  componentDidMount: function() {
    var doc = this.getDocument();
    doc.connect(this, {
      'document:changed': this.handleDocumentChange
    });
  },

  handleClick: function(e) {
    e.preventDefault();
  },

  handleMouseDown: function(e) {
    e.preventDefault();
    if (!this.state.active) {
      return;
    }
    var doc = this.getDocument();
    doc.redo();
  },

  shouldComponentUpdate: function(nextProps, nextState) {
    return this.state.active !== nextState.active;
  },

  handleDocumentChange: function() {
    this.setState({
      active: (this.getDocument().undone.length > 0)
    });
  },

  getInitialState: function() {
    return {
      active: false
    };
  },

  render: function() {
    var classNames = ['redo-tool-component', 'tool'];
    if (this.state.active) classNames.push('active');

    return $$("a", {
      className: classNames.join(' '),
      href: "#",
      dangerouslySetInnerHTML: {__html: '<i class="fa fa-rotate-right"></i>'},
      title: 'Undo',
      onMouseDown: this.handleMouseDown,
      onClick: this.handleClick
    });
  }
});

module.exports = RedoTool;
},{}],185:[function(require,module,exports){
var $$ = React.createElement;

// Save Tool
// ----------------

var SaveTool = React.createClass({
  displayName: "SaveTool",

  contextTypes: {
    backend: React.PropTypes.object.isRequired,
    notifications: React.PropTypes.object.isRequired
  },

  componentDidMount: function() {
    var writerCtrl = this.props.writerCtrl;
    var doc = writerCtrl.doc;

    doc.connect(this, {
      'document:changed': this.handleDocumentChange,
      'document:saved': this.handleDocumentSaved
    });
  },

  handleMouseDown: function(e) {
    e.preventDefault();
    var backend = this.context.backend;
    var notifications = this.context.notifications;
    var writerCtrl = this.props.writerCtrl;
    var doc = writerCtrl.doc;

    if (this.state.active && !doc.__isSaving) {
      doc.__isSaving = true;

      notifications.addMessage({
        type: "progress",
        message: "Saving document ..."
      });

      backend.saveDocument(doc, function(err) {
        doc.__isSaving = false;
        if (err) {
          notifications.addMessage({
            type: "error",
            message: err.message
          });
        } else {
          notifications.addMessage({
            type: "info",
            message: "No changes"
          });
          this.setState({
            active: false
          });
        }
      }.bind(this));
    }
  },

  shouldComponentUpdate: function(nextProps, nextState) {
    return this.state.active !== nextState.active;
  },

  handleDocumentSaved: function() {
    this.setState({
      active: false
    });    
  },

  handleDocumentChange: function(change) {
    this.setState({
      active: true
    });
  },

  getInitialState: function() {
    return {
      active: false
    }
  },

  render: function() {
    var classNames = ['save-tool-component', 'tool'];
    if (this.state.active) classNames.push('active');

    return $$("a", {
      className: classNames.join(' '),
      href: "#",
      dangerouslySetInnerHTML: {__html: '<i class="fa fa-save"></i>'},
      title: 'Save document',
      onMouseDown: this.handleMouseDown
    });
  }
});

module.exports = SaveTool;
},{}],186:[function(require,module,exports){
var BasicToolMixin = require("./basic_tool_mixin");

var StrongTool = React.createClass({
  mixins: [BasicToolMixin],
  displayName: "StrongTool",
  annotationType: "strong",
  toolIcon: "fa-bold",
});

module.exports = StrongTool;
},{"./basic_tool_mixin":182}],187:[function(require,module,exports){
var $$ = React.createElement;

// Undo Tool
// ----------------

var UndoTool = React.createClass({
  displayName: "SaveTool",

  contextTypes: {
    backend: React.PropTypes.object.isRequired
  },

  getDocument: function() {
    return this.props.writerCtrl.doc;
  },

  componentDidMount: function() {
    var doc = this.getDocument();
    doc.connect(this, {
      'document:changed': this.handleDocumentChange
    });
  },

  handleClick: function(e) {
    e.preventDefault();
  },

  // Do we really need a backend?
  handleMouseDown: function(e) {

    e.preventDefault();
    e.stopPropagation();

    if (!this.state.active) {
      return;
    }
    var doc = this.getDocument();
    doc.undo();
  },

  shouldComponentUpdate: function(nextProps, nextState) {
    return this.state.active !== nextState.active;
  },

  handleDocumentChange: function() {
    this.setState({
      active: (this.getDocument().done.length > 0)
    });
  },

  getInitialState: function() {
    return {
      active: false
    };
  },

  render: function() {
    var classNames = ['undo-tool-component', 'tool'];
    if (this.state.active) classNames.push('active');

    return $$("a", {
      className: classNames.join(' '),
      href: "#",
      dangerouslySetInnerHTML: {__html: '<i class="fa fa-undo"></i>'},
      title: 'Undo',
      onMouseDown: this.handleMouseDown,
      onClick: this.handleClick
    });
  }
});

module.exports = UndoTool;
},{}],188:[function(require,module,exports){
/* global $ */
var $$ = React.createElement;

var Substance = require("substance");
var ContentTools = require("./content_tools");
var ContentPanel = require("./content_panel");
var WriterController = require("./writer_controller");

var StatusBar = require("./status_bar");

// The Substance Writer Component
// ----------------

var Writer = React.createClass({
  displayName: "Writer",

  contextTypes: {
    backend: React.PropTypes.object.isRequired,
    notifications: React.PropTypes.object.isRequired,
    htmlImporter: React.PropTypes.object.isRequired,
    htmlExporter: React.PropTypes.object.isRequired
  },

  childContextTypes: {
    // used by text properties to render 'active' annotations
    // For active container annotations annotation fragments are inserted
    // which can be used to highlight the associated range
    getHighlightedNodes: React.PropTypes.func,
    getHighlightsForTextProperty: React.PropTypes.func
  },

  getChildContext: function() {
    return {
      getHighlightedNodes: this.getHighlightedNodes,
      getHighlightsForTextProperty: this.getHighlightsForTextProperty,
    };
  },

  getInitialState: function() {
    return {"contextId": "entities"};
  },

  // Events
  // ----------------

  componentWillMount: function() {
    // Initialize writer controller, which will serve as a common interface
    // for custom modules
    this.writerCtrl = new WriterController({
      doc: this.props.doc,
      writerComponent: this,
      config: this.props.config
    });
  },

  componentWillUnmount: function() {
    this.clipboard.detach(this.getDOMNode());
  },

  shouldComponentUpdate: function(nextProps, nextState) {
    var sprevState = JSON.stringify(this.state);
    var snextState = JSON.stringify(nextState);
    if (Substance.isEqual(sprevState, snextState)) {
      return false;
    }
    return true;
  },

  componentDidMount: function() {
    if (!window.devMode) {
      setInterval(function() {
        this.requestAutoSave();
      }.bind(this), 10000);
    }
    var rootElement = this.getDOMNode();
    var $clipboard = $(rootElement).find('.clipboard');
    this.clipboard = new Substance.Surface.Clipboard(this.writerCtrl, $clipboard[0],
      this.context.htmlImporter, this.context.htmlExporter);
    this.clipboard.attach(rootElement);
  },

  requestAutoSave: function() {
    var doc = this.props.doc;
    var backend = this.context.backend;
    var notifications = this.context.notifications;

    if (doc.__dirty && !doc.__isSaving) {
      notifications.addMessage({
        type: "info",
        message: "Autosaving ..."
      });

      doc.__isSaving = true;
      backend.saveDocument(doc, function(err) {
        doc.__isSaving = false;
        if (err) {
          notifications.addMessage({
            type: "error",
            message: err.message || err.toString()
          });
          console.error('saving of document failed');
        } else {
          doc.emit('document:saved');
          notifications.addMessage({
            type: "info",
            message: "No changes"
          });
          doc.__dirty = false;
        }
      });
    }
  },

  // E.g. when a tool requests a context switch
  handleContextSwitch: function(contextId) {
    this.replaceState({
      contextId: contextId
    });
  },

  handleCloseDialog: function(e) {
    e.preventDefault();
    console.log('handling close');
    this.replaceState(this.getInitialState());
  },

  // Triggered by Writer UI
  handleContextToggle: function(e) {
    e.preventDefault();
    var newContext = $(e.currentTarget).attr("data-id");
    this.handleContextSwitch(newContext);
  },

  // Rendering
  // ----------------

  // Toggles for explicitly switching between context panels
  createContextToggles: function() {
    var panels = this.writerCtrl.getPanels();
    var contextId = this.state.contextId;
    var self = this;

    var panelComps = panels.map(function(panelClass) {
      // We don't show inactive stuff here
      if (panelClass.isDialog && panelClass.contextId !== contextId) return null;

      var className = ["toggle-context"];
      if (panelClass.contextId === contextId) {
        className.push("active");
      }

      if (panelClass.isDialog) {
        // return $$('div', {
        //   className: 'dialog '+ contextId,
        //   href: "#",
        //   key: panelClass.contextId,
        //   "data-id": panelClass.contextId
        // },
        //   panelClass.displayName,
        //   $$('a', {
        //     href: "#",
        //     onClick: this.handleCloseDialog,
        //     className: "close-dialog",
        //     dangerouslySetInnerHTML: {__html: '<i class="fa fa-close"></i> '}
        //   })
        // );
        return $$('div');
      } else {
        return $$('a', {
          className: className.join(" "),
          href: "#",
          key: panelClass.contextId,
          "data-id": panelClass.contextId,
          onClick: self.handleContextToggle,
          dangerouslySetInnerHTML: {__html: '<i class="fa '+panelClass.icon+'"></i> '+panelClass.displayName}
        });
      }
    }.bind(this));

    return $$('div', {className: "context-toggles"},
      Substance.compact(panelComps)
    );
  },

  // Create a new panel based on current writer state (contextId)
  createContextPanel: function() {
    var panelElement = null;
    var modules = this.writerCtrl.getModules();

    for (var i = 0; i < modules.length && !panelElement; i++) {
      var stateHandlers = modules[i].stateHandlers;
      if (stateHandlers && stateHandlers.handleContextPanelCreation) {
        panelElement = stateHandlers.handleContextPanelCreation(this.writerCtrl);
      }
    }

    if (!panelElement) {
      return $$('div', null, "No panels are registered");
    }
    return panelElement;
  },

  render: function() {
    return $$('div', { className: 'writer-component', onKeyDown: this.handleApplicationKeyCombos},
      $$('div', {className: "main-container"},
        $$(ContentTools, {
          writerCtrl: this.writerCtrl
        }),
        $$(ContentPanel, {
          writerCtrl: this.writerCtrl,
        })
      ),
      $$('div', {className: "resource-container"},
        this.createContextToggles(),
        this.createContextPanel(this)
      ),
      $$(StatusBar, {
        doc: this.props.doc
      }),
      $$('div', {className: "clipboard"})
    );
  },

  getHighlightedNodes: function() {
    return this.writerCtrl.getHighlightedNodes();
  },

  getHighlightsForTextProperty: function() {
    return this.writerCtrl.getHighlightsForTextProperty.apply(this.writerCtrl, arguments);
  },

  // return true when you handled a key combo
  handleApplicationKeyCombos: function(e) {
    // console.log('####', e.keyCode, e.metaKey, e.ctrlKey, e.shiftKey);
    var handled = false;
    // TODO: we could make this configurable via extensions
    // Undo/Redo: cmd+z, cmd+shift+z
    if (e.keyCode === 90 && (e.metaKey||e.ctrlKey)) {
      if (e.shiftKey) {
        this.writerCtrl.redo();
      } else {
        this.writerCtrl.undo();
      }
      handled = true;
    }
    // Reset to default state
    else if (e.keyCode === 27) {
      this.replaceState(this.getInitialState());
      handled = true;
    }
    // Save: cmd+s
    else if (e.keyCode === 83 && (e.metaKey||e.ctrlKey)) {
      this.requestAutoSave();
      handled = true;
    }
    if (handled) {
      e.preventDefault();
      e.stopPropagation();
    }
  },

});

module.exports = Writer;
},{"./content_panel":177,"./content_tools":178,"./status_bar":181,"./writer_controller":189,"substance":5}],189:[function(require,module,exports){
"use strict";

var Substance = require('substance');
var Document = Substance.Document;
var Selection = Document.Selection;
var _ = require("substance/helpers");

var Highlight = require("./components/text_property").Highlight;


// Writer Controller
// ----------------
//
// An common interface for all writer modules

var WriterController = function(opts) {
  Substance.EventEmitter.call(this);

  this.config = opts.config;
  this.doc = opts.doc;
  this.writerComponent = opts.writerComponent;
  this.surfaces = {};

  this.doc.connect(this, {
    'transaction:started': this.transactionStarted,
    'document:changed': this.onDocumentChanged
  });
};

WriterController.Prototype = function() {

  // API method used by writer modules to modify the writer state
  this.replaceState = function(newState) {
    this.writerComponent.replaceState(newState);
  };

  this.transactionStarted = function(tx) {
    // store the state so that it can be recovered when undo/redo
    tx.before.state = this.writerComponent.state;
    tx.before.selection = this.getSelection();
    if (this.activeSurface) {
      tx.before.surfaceName = this.activeSurface.name;
    }
  };

  this.registerSurface = function(surface, name) {
    name = name || Substance.uuid();
    this.surfaces[name] = surface;
    if (surface.name) {
      throw new Error("Surface has already been attached");
    }
    // HACK! we store a name on the surface for later decision making
    surface.name = name;
    surface.connect(this, {
      'selection:changed': function(sel) {
        this.updateSurface(surface);
        this.onSelectionChanged(sel);
        this.emit('selection:changed', sel);
      }
    });
  };

  this.onSelectionChanged = function(sel) {
    var modules = this.getModules();
    var handled = false;
    for (var i = 0; i < modules.length && !handled; i++) {
      var stateHandlers = modules[i].stateHandlers;
      if (stateHandlers && stateHandlers.handleSelectionChange) {
        handled = stateHandlers.handleSelectionChange(this, sel);
      }
    }
  };

  this.onDocumentChanged = function(change, info) {
    this.doc.__dirty = true;
    var notifications = this.writerComponent.context.notifications;

    notifications.addMessage({
      type: "info",
      message: "Unsaved changes"
    });

    if (info.replay) {
      this.replaceState(change.after.state);
      var self = this;
      window.setTimeout(function() {
        if (change.after.surfaceName) {
          var surface = self.surfaces[change.after.surfaceName];
          surface.setSelection(change.after.selection);
        }
      });
    }
  };

  this.updateSurface = function(surface) {
    this.activeSurface = surface;
  };

  this.getSurface = function() {
    return this.activeSurface;
  };

  this.getSelection = function() {
    if (!this.activeSurface) return Document.nullSelection;
    return this.activeSurface.getSelection();
  };

  this.unregisterSurface = function(surface) {
    Substance.each(this.surfaces, function(s, name) {
      if (surface === s) {
        delete this.surfaces[name];
      }
    }, this);

    surface.disconnect(this);
  };

  // Remove since we have a property getter already?
  this.getState = function() {
    return this.writerComponent.state;
  };

  this.getModules = function() {
    return this.config.modules;
  };

  this.getNodeComponentClass = function(nodeType) {
    var modules = this.config.modules;
    var NodeClass;

    for (var i = 0; i < modules.length; i++) {
      var ext = modules[i];
      if (ext.components && ext.components[nodeType]) {
        NodeClass = ext.components[nodeType];
      }
    }

    if (!NodeClass) throw new Error("No component found for "+nodeType);
    return NodeClass;
  };

  this.getPanels = function() {
    var modules = this.config.modules;
    var panels = [];

    for (var i = 0; i < modules.length; i++) {
      var ext = modules[i];
      panels = panels.concat(ext.panels);
    }
    return panels;
  };

  // Get all available tools from modules
  this.getTools = function() {
    var modules = this.config.modules;
    var tools = [];

    for (var i = 0; i < modules.length; i++) {
      var ext = modules[i];
      if (ext.tools) {
        tools = tools.concat(ext.tools);
      }
    }
    return tools;
  };

  // Based on a certain writer state, determine what should be
  // highlighted in the scrollbar. Maybe we need to create custom
  // handlers for highlights in modules, since there's no
  // general way of determining the highlights

  this.getHighlightedNodes = function() {
    var modules = this.getModules();
    var highlightedNodes = null;
    for (var i = 0; i < modules.length && !highlightedNodes; i++) {
      var stateHandlers = modules[i].stateHandlers;
      if (stateHandlers && stateHandlers.getHighlightedNodes) {
        highlightedNodes = stateHandlers.getHighlightedNodes(this);
      }
    }
    return highlightedNodes || [];
  };

  this.getHighlightsForTextProperty = function(textProperty) {
    var doc = this.doc;
    var container = textProperty.getContainer();
    var highlights = [];

    var highlightsIndex = new Substance.PathAdapter.Arrays();

    if (container) {
      var activeContainerAnnotations = this.getActiveContainerAnnotations();

      _.each(activeContainerAnnotations, function(annoId) {
        var anno = doc.get(annoId);
        if (!anno) return;
        var fragments = container.getAnnotationFragments(anno);
        _.each(fragments, function(frag) {
          highlightsIndex.add(frag.path, new Highlight(frag.range, {
            id: anno.id, classNames: anno.getClassNames().replace(/_/g, "-")+" annotation-fragment"
          }));
        });
      });

      return highlightsIndex.get(textProperty.props.path) || [];
    } else {
      return [];
    }
  };

  this.getActiveContainerAnnotations = function() {
    var modules = this.getModules();
    var activeContainerAnnotations = null;
    for (var i = 0; i < modules.length && !activeContainerAnnotations; i++) {
      var stateHandlers = modules[i].stateHandlers;
      if (stateHandlers && stateHandlers.getActiveContainerAnnotations) {
        activeContainerAnnotations = stateHandlers.getActiveContainerAnnotations(this);
      }
    }
    return activeContainerAnnotations || [];
  };

  this.deleteAnnotation = function(annotationId) {
    var anno = this.doc.get(annotationId);
    var tx = this.doc.startTransaction({ selection: this.getSelection() });
    tx.delete(annotationId);
    tx.save({ selection: Selection.create(anno.path, anno.range[0], anno.range[1]) });
  };

  this.annotate = function(annoSpec) {
    var sel = this.getSelection();

    var range = annoSpec.range;
    var path = annoSpec.path;

    // Use active selection for retrieving path and range
    if (!path || !range) {
      if (sel.isNull()) throw new Error("Selection is null");
      if (!sel.isPropertySelection()) throw new Error("Selection is not a PropertySelection");
      path = sel.getPath();
      range = sel.getTextRange();
    }

    var annotation = Substance.extend({}, annoSpec);
    annotation.id = annoSpec.id || annoSpec.type+"_" + Substance.uuid();
    annotation.path = path;
    annotation.range = range;

    // start the transaction with an initial selection
    var tx = this.doc.startTransaction({ selection: this.getSelection() });
    annotation = tx.create(annotation);
    tx.save({ selection: Selection.create(path, range[0], range[1]) });

    return annotation;
  };

  this.undo = function() {
    if (this.doc.done.length>0) {
      this.doc.undo();
    }
  };

  this.redo = function() {
    if (this.doc.undone.length>0) {
      this.doc.redo();
    }
  };

};


Substance.inherit(WriterController, Substance.EventEmitter);

Object.defineProperty(WriterController.prototype, 'state', {
  get: function() {
    return this.writerComponent.state;
  },
  set: function() {
    throw new Error("Immutable property. Use replaceState");
  }
});


module.exports = WriterController;
},{"./components/text_property":176,"substance":5,"substance/helpers":4}],190:[function(require,module,exports){
"use strict";
var writer = require('./src/writer');

module.exports = writer;

},{"./src/writer":179}],191:[function(require,module,exports){
'use strict';

var Substance = require('substance');
var $$ = React.createElement;

var Writer = require("substance/writer");
var Backend = require("./backend");
var LocalBackend = require("./local_backend");
var Interview = require("./interview");

var NotificationService = require("./notification_service");

// Writer Configuration
var writerModules = require("./writer_modules");

// Prepare local cache
window.cache = {};

// extract a component factory from writerModules and expose it via 'context'
var componentFactory = new Substance.Factory();
Substance.each(writerModules, function(module) {
  Substance.each(module.components, function(ComponentClass, name) {
    componentFactory.add(name, ComponentClass);
  });
});

// window.devMode = true;

// Create instance of metadata service
var backend;
if (window.devMode) {
  backend = new LocalBackend();
} else {
  backend = new Backend();
}

// Create notification service
var notifications = new NotificationService();

var htmlImporter = new Substance.Document.HtmlImporter({
    schema: Interview.schema,
    trimWhitespaces: true,
    REMOVE_INNER_WS: true,
});
var htmlExporter = new Substance.Document.HtmlExporter({
  // configuration
});

var globalContext = {
  componentFactory: componentFactory,
  backend: backend,
  notifications: notifications,
  htmlImporter: htmlImporter,
  htmlExporter: htmlExporter
};

var Composer = React.createClass({
  displayName: "Composer",

  childContextTypes: {
    componentFactory: React.PropTypes.object,
    backend: React.PropTypes.object,
    notifications: React.PropTypes.object,
    htmlImporter: React.PropTypes.object,
    htmlExporter: React.PropTypes.object
  },

  getChildContext: function() {
    return globalContext;
  },

  componentDidMount: function() {

    backend.getDocument(this.props.documentId || "example_document", function(err, doc) {
      this.setState({
        doc: doc
      });
    }.bind(this));
  },

  getInitialState: function() {
    return {
      doc: null
    };
  },

  render: function() {
    if (this.state.doc) {
      return $$(Writer, {
        config: {
          modules: writerModules
        },
        doc: this.state.doc,
        id: "writer"
      });
    } else {
      return $$('div', null, 'Loading document...');
    }
  }

});

var app = {
  start: function() {
    React.render(
      $$(Composer, {
        documentId: window.location.hash.slice(1)
      }),
      document.body
    );
  }
};

module.exports = app;
},{"./backend":192,"./interview":193,"./local_backend":208,"./notification_service":209,"./writer_modules":223,"substance":5,"substance/writer":190}],192:[function(require,module,exports){
"use strict";

var Substance = require("substance");
var Interview = require('./interview');
var _ = require("substance/helpers");

// Archivist Backend
// ----------------
//

var Backend = function(opts) {
  this.cache = {
    "entities": {}
  };
};

Backend.Prototype = function() {

  // Document
  // ------------------

  this.getDocument = function(documentId, cb) {
    $.getJSON("/api/documents/"+documentId, function(rawDoc) {
      var doc = new Interview(rawDoc);
      doc.version = rawDoc.__v;
      // For easy reference
      window.doc = doc;
      cb(null, doc);
    });
  };

  this.saveDocument = function(doc, cb) {
    var json = doc.toJSON();
    json.__v = doc.version;

    console.log('saving doc, current version is', doc.version);

    $.ajax({
      type: "PUT",
      url: "/api/documents/"+doc.id,
      contentType: "application/json",
      data: JSON.stringify(json),
      success: function(data) {
        // Remember new document version
        doc.version = data.documentVersion;

        console.log('new doc version', doc.version);
        // Check if subjectsDB changed
        var currentSubjectDBVersion = this.getSubjectDBVersion();
        var newSubjectDBVersion = data.subjectDBVersion;
        
        // Update the subjects cache if outdated
        if (this.cache.subjects && this.cache.subjectDBVersion  !== newSubjectDBVersion) {
          this.fetchSubjects();
        } else {
          cb(null);
        }
      }.bind(this),
      error: function(err) {
        cb(err.responseText);
      }
    });
  };

  // Entities
  // ------------------

  this.getEntities = function(entityIds, cb) {
    var entitiesToFetch = [];
    var entities = [];

    // Try to use cached items
    _.each(entityIds, function(entityId) {
      var entity = this.cache.entities[entityId];
      if (entity) {
        entities.push(entity);
      } else {
        entitiesToFetch.push(entityId);
      }
    }.bind(this));

    this.fetchEntities(entitiesToFetch, function(err, fetchedEntities) {
      // Store in cache
      _.each(fetchedEntities, function(entity) {
        this.cache.entities[entity.id] = entity;
        entities.push(entity);
      }, this);
      cb(null, entities);
    }.bind(this));
  };

  this.fetchEntities = function(entityIds, cb) {
    if (entityIds.length === 0) return cb(null, []);
    console.log('Fetching entities', entityIds);

    $.getJSON("/api/entities?entityIds="+entityIds.join(','), function(entities) {
      cb(null, entities);
    });
  };


  this.getSuggestedEntities = function(cb) {
    $.getJSON("/api/search", function(entities) {
      cb(null, entities);
    });
  };

  this.searchEntities = function(searchStr, cb) {
    $.getJSON("/api/search?query="+encodeURIComponent(searchStr), function(entities) {
      cb(null, entities);
    });
  };


  this.fetchSubjects = function(cb) {
    $.getJSON("/api/metadata", function(subjectDB) {
      // Store in cache
      this.cache.subjectDB = subjectDB;
      cb(null, subjectDB.subjects);
    }.bind(this));  
  };

  // Subjects
  // ------------------

  this.getSubjects = function(cb) {
    if (this.cache.subjectDB) {
      return cb(null, this.cache.subjectDB.subjects);
    } else {
      this.fetchSubjects(cb);
    }
  };

  this.getSubjectDBVersion = function() {
    return this.cache.subjectDB ? this.cache.subjectDB.subjectDBVersion : null;
  };
};


Substance.initClass(Backend);

module.exports = Backend;
},{"./interview":193,"substance":5,"substance/helpers":4}],193:[function(require,module,exports){
var Interview = require("./interview");

module.exports = Interview;
},{"./interview":194}],194:[function(require,module,exports){
"use strict";

var Substance = require('substance');
var Document = Substance.Document;

var SubstanceCore = require("substance/article").CoreModule;
var BaseModule = require("./modules/base");
var SubjectsModule = require("./modules/subjects");
var EntitiesModule = require("./modules/entities");
var TimecodesModule = require("./modules/timecodes");

// We don't need an extension mechanism here.
// TODO: import the nodes directly to setup the schema.
// Put the initializers into the article's contructor.
var modules = [
  SubstanceCore,
  BaseModule,
  SubjectsModule,
  EntitiesModule,
  TimecodesModule
];

var schema = new Document.Schema("substance-interview", "0.1.0");
Substance.each(modules, function(ext) {
  schema.addNodes(ext.nodes);
});

var Interview = function(data) {
  Document.call(this, schema, data);
  // Call initializes of modules
  Substance.each(modules, function(ext) {
    if (ext.initialize) ext.initialize(this);
  }, this);
};

Interview.Prototype = function() {};

Substance.inherit(Interview, Document);

Interview.schema = schema;

module.exports = Interview;

},{"./modules/base":196,"./modules/entities":200,"./modules/subjects":202,"./modules/timecodes":205,"substance":5,"substance/article":3}],195:[function(require,module,exports){
var Substance = require('substance');

var DocumentNode = Substance.Document.Node.extend({
  name: "document",
  properties: {
    "guid": "string",
    "creator": "string",
    "title": "string", // TODO: remove
    "abstract": "string",
    "interview_subject_name": "string",
    "interview_subject_bio": "string"
  }
});

module.exports = DocumentNode;
},{"substance":5}],196:[function(require,module,exports){
var DocumentNode = require("./document_node");
var TextNode = require("./text_node");
var initialize = require("./initialize");

module.exports = {
  nodes: [DocumentNode, TextNode],
  initialize: initialize
};

},{"./document_node":195,"./initialize":197,"./text_node":198}],197:[function(require,module,exports){
var Substance = require('substance');

function initialize(doc) {
}

module.exports = initialize;

},{"substance":5}],198:[function(require,module,exports){
var Article = require('substance/article');
var Paragraph = Article.Paragraph;

// Note: in archivist paragraphs are called text nodes.
var TextNode = Paragraph.extend({
  name: "text"
});

module.exports = TextNode;

},{"substance/article":3}],199:[function(require,module,exports){
var Reference = require('substance/article').nodes.Reference;

var EntityReference = Reference.extend({
  name: "entity_reference",
  properties: {
    "target": "string"
  }
});

module.exports = EntityReference;
},{"substance/article":3}],200:[function(require,module,exports){
var EntityReference = require("./entity_reference");
var initialize = require("./initialize");

module.exports = {
  nodes: [EntityReference],
  initialize: initialize
};
},{"./entity_reference":199,"./initialize":201}],201:[function(require,module,exports){
var Substance = require('substance');

function initialize(doc) {
  // Index only entity references (regular annotations)
  doc.entityReferencesIndex = doc.addIndex('entityReferencesIndex', Substance.Data.Index.create({
    type: "entity_reference",
    property: "target"
  }));
}

module.exports = initialize;

},{"substance":5}],202:[function(require,module,exports){
var SubjectReference = require("./subject_reference");
var initialize = require("./initialize");

module.exports = {
  nodes: [SubjectReference],
  initialize: initialize
};
},{"./initialize":203,"./subject_reference":204}],203:[function(require,module,exports){
var Substance = require('substance');

function initialize(doc) {
  doc.subjectReferencesIndex = doc.addIndex('subjectReferencesIndex', Substance.Data.Index.create({
    type: "subject_reference",
    property: "target"
  }));
};

module.exports = initialize;

},{"substance":5}],204:[function(require,module,exports){
var ContainerAnnotation = require("substance").Document.ContainerAnnotation;

var SubjectReference = ContainerAnnotation.extend({
  name: "subject_reference",
  properties: {
    "target": ["array", "string"]
  }
});

module.exports = SubjectReference;

},{"substance":5}],205:[function(require,module,exports){
var Timecode = require("./timecode");
var initialize = require("./initialize");

module.exports = {
  nodes: [Timecode],
  initialize: initialize
};
},{"./initialize":206,"./timecode":207}],206:[function(require,module,exports){
var Substance = require('substance');

function initialize(doc) {
  // Index only timecode annotations
  doc.timecodesIndex = doc.addIndex('timecodesIndex', Substance.Data.Index.create({
    type: "timecode"
  }));
}

module.exports = initialize;

},{"substance":5}],207:[function(require,module,exports){
var Substance = require('substance');

var Timecode = Substance.Document.Annotation.extend({
  name: "timecode"
});

module.exports = Timecode;
},{"substance":5}],208:[function(require,module,exports){
var Substance = require("substance");
var Interview = require('./interview');
var EXAMPLE_DOC = require("../data/sample_doc");
var _ = require("substance/helpers");

var ENTITIES = [
  // Prisons
  {"id":"54ef1331afda2d3c024e4818","type":"prison","name":"неизвестно /Австрия","nearest_locality":"неизвестно","country":"Австрия","description":"Респондент В. В. Щебетюк (ID 40) не помнит название села, куда был доставлен в сотаве 20 остарбайтеров. Жили в специальном охраняемым помещении, откуда их выводили на работы. Щебетюк был занят на полевых работах. В селе в том числе содержались поляки-военнопленные. ","__v":0,"prison_type":["частная сельскохозяйственная ферма"],"synonyms":["неизвестно /Австрия","\"работали в Австрии\"; \"не помню даже село\"; \"большой бауэр"," который имел более сто гектаров земли"," ферму большую и в деревне шоколадную фабрику\"; \"В селе"," значит"," там были военнопленные","\nвоеннопленные – польские\"; \"Работали у этого бауэра на полю\""],"id":"54ef1331afda2d3c024e4818"},{"id":"54ef1331afda2d3c024e4817","type":"prison","name":"Гоппенраде","nearest_locality":"Гоппенраде","country":"Германия","description":"город в земле Мекленбург-Передняя Померания","point":[12.2736937,53.73019069999999],"__v":0,"prison_type":["частная сельскохозяйственная ферма"],"synonyms":["Гоппенраде"],"id":"54ef1331afda2d3c024e4817"},{"id":"54ef1331afda2d3c024e4816","type":"prison","name":"Нахтигаль","nearest_locality":"Виттенберг","country":"Германия","description":"","point":[12.6279659,51.8739831],"__v":0,"prison_type":["рабочий лагерь"],"synonyms":["Нахтигаль"],"id":"54ef1331afda2d3c024e4816"},{"id":"54ef1331afda2d3c024e4815","type":"prison","name":"неизвестно","nearest_locality":"Франкфурт-на-Маней","country":"Германия","description":"","point":[8.6821267,50.1109221],"__v":0,"prison_type":[""],"synonyms":["неизвестно","\"распределение"," дезинфекция\""],"id":"54ef1331afda2d3c024e4815"},
  // Toponyms
  {"_id":"54ef1e26f505ed9a022fdacd","type":"toponym","name":"село Васильевское ","current_name":"","country":"Россия","description":"","point":[36.58472200000001,55.61],"__v":0,"prison_type":[],"synonyms":[],"id":"54ef1e26f505ed9a022fdacd"},{"_id":"54ef1e26f505ed9a022fdacc","type":"toponym","name":"Копьевка","current_name":"","country":"Украина","description":"","__v":0,"prison_type":[],"synonyms":["Копиевка","укр. Копіївка"],"id":"54ef1e26f505ed9a022fdacc"},{"_id":"54ef1e26f505ed9a022fdacb","type":"toponym","name":"село Рукшин ","current_name":"","country":"Украина","description":"","point":[26.405833,48.4875],"__v":0,"prison_type":[],"synonyms":["укр. Рукшин"],"id":"54ef1e26f505ed9a022fdacb"},{"_id":"54ef1e26f505ed9a022fdaca","type":"toponym","name":"Рухотин","current_name":"","country":"Украина","description":"","point":[26.205,48.517222],"__v":0,"prison_type":[],"synonyms":["укр. Рухотин"],"id":"54ef1e26f505ed9a022fdaca"},{"_id":"54ef1e26f505ed9a022fdac9","type":"toponym","name":"Черновцы","current_name":"","country":"Украина","description":"","point":[25.9358367,48.2920787],"__v":0,"prison_type":[],"synonyms":["укр. Чернівці́"],"id":"54ef1e26f505ed9a022fdac9"},{"_id":"54ef1e26f505ed9a022fdac8","type":"toponym","name":"Негин (село Каменец-Подольского района Хмельницкой области)","current_name":"","country":"Украина","description":"","point":[26.566944,48.8375],"__v":0,"prison_type":[],"synonyms":[],"id":"54ef1e26f505ed9a022fdac8"},
  // Definitions
  {"_id":"54f48370cdc4e45004d97ca6","type": "definition", "title":"управдом","description":"управляющий домом, домами - прежнее название должностного лица, возглавляющего домоуправление","__v":0,"id":"54f48370cdc4e45004d97ca6"},{"_id":"54f48370cdc4e45004d97ca5","type": "definition", "title":"домком","description":"домовый комитет - общественная организация жильцов","__v":0,"id":"54f48370cdc4e45004d97ca5"},
  // Persons
  {"_id":"54f476ba973cfcef0354adab","type": "person", "name":"Мария","description":"Мария, младшая сестра О.Г. Головиной","__v":0,"id":"54f476ba973cfcef0354adab"},{"_id":"54f476ba973cfcef0354adac","type": "person", "name":"Головина Анна Терентьевна","description":"","__v":0,"id":"54f476ba973cfcef0354adac"}
];

// Fixture data
var SUGGESTED_ENTITIES = [
  {"id":"54ef1331afda2d3c024e4818","type":"prison","name":"неизвестно /Австрия","nearest_locality":"неизвестно","country":"Австрия","description":"Респондент В. В. Щебетюк (ID 40) не помнит название села, куда был доставлен в сотаве 20 остарбайтеров. Жили в специальном охраняемым помещении, откуда их выводили на работы. Щебетюк был занят на полевых работах. В селе в том числе содержались поляки-военнопленные. ","__v":0,"prison_type":["частная сельскохозяйственная ферма"],"synonyms":["неизвестно /Австрия","\"работали в Австрии\"; \"не помню даже село\"; \"большой бауэр"," который имел более сто гектаров земли"," ферму большую и в деревне шоколадную фабрику\"; \"В селе"," значит"," там были военнопленные","\nвоеннопленные – польские\"; \"Работали у этого бауэра на полю\""],"id":"54ef1331afda2d3c024e4818"},{"id":"54ef1331afda2d3c024e4817","type":"prison","name":"Гоппенраде","nearest_locality":"Гоппенраде","country":"Германия","description":"город в земле Мекленбург-Передняя Померания","point":[12.2736937,53.73019069999999],"__v":0,"prison_type":["частная сельскохозяйственная ферма"],"synonyms":["Гоппенраде"],"id":"54ef1331afda2d3c024e4817"},{"id":"54ef1331afda2d3c024e4816","type":"prison","name":"Нахтигаль","nearest_locality":"Виттенберг","country":"Германия","description":"","point":[12.6279659,51.8739831],"__v":0,"prison_type":["рабочий лагерь"],"synonyms":["Нахтигаль"],"id":"54ef1331afda2d3c024e4816"},{"id":"54ef1331afda2d3c024e4815","type":"prison","name":"неизвестно","nearest_locality":"Франкфурт-на-Маней","country":"Германия","description":"","point":[8.6821267,50.1109221],"__v":0,"prison_type":[""],"synonyms":["неизвестно","\"распределение"," дезинфекция\""],"id":"54ef1331afda2d3c024e4815"}
];

var SEARCH_RESULT = [
  // Prisons
  {"id":"54ef1331afda2d3c024e4818","type":"prison","name":"неизвестно /Австрия","nearest_locality":"неизвестно","country":"Австрия","description":"Респондент В. В. Щебетюк (ID 40) не помнит название села, куда был доставлен в сотаве 20 остарбайтеров. Жили в специальном охраняемым помещении, откуда их выводили на работы. Щебетюк был занят на полевых работах. В селе в том числе содержались поляки-военнопленные. ","__v":0,"prison_type":["частная сельскохозяйственная ферма"],"synonyms":["неизвестно /Австрия","\"работали в Австрии\"; \"не помню даже село\"; \"большой бауэр"," который имел более сто гектаров земли"," ферму большую и в деревне шоколадную фабрику\"; \"В селе"," значит"," там были военнопленные","\nвоеннопленные – польские\"; \"Работали у этого бауэра на полю\""],"id":"54ef1331afda2d3c024e4818"},{"id":"54ef1331afda2d3c024e4817","type":"prison","name":"Гоппенраде","nearest_locality":"Гоппенраде","country":"Германия","description":"город в земле Мекленбург-Передняя Померания","point":[12.2736937,53.73019069999999],"__v":0,"prison_type":["частная сельскохозяйственная ферма"],"synonyms":["Гоппенраде"],"id":"54ef1331afda2d3c024e4817"},{"id":"54ef1331afda2d3c024e4816","type":"prison","name":"Нахтигаль","nearest_locality":"Виттенберг","country":"Германия","description":"","point":[12.6279659,51.8739831],"__v":0,"prison_type":["рабочий лагерь"],"synonyms":["Нахтигаль"],"id":"54ef1331afda2d3c024e4816"},{"id":"54ef1331afda2d3c024e4815","type":"prison","name":"неизвестно","nearest_locality":"Франкфурт-на-Маней","country":"Германия","description":"","point":[8.6821267,50.1109221],"__v":0,"prison_type":[""],"synonyms":["неизвестно","\"распределение"," дезинфекция\""],"id":"54ef1331afda2d3c024e4815"},
  // Toponyms
  {"_id":"54ef1e26f505ed9a022fdacd","type":"toponym","name":"село Васильевское ","current_name":"","country":"Россия","description":"","point":[36.58472200000001,55.61],"__v":0,"prison_type":[],"synonyms":[],"id":"54ef1e26f505ed9a022fdacd"},{"_id":"54ef1e26f505ed9a022fdacc","type":"toponym","name":"Копьевка","current_name":"","country":"Украина","description":"","__v":0,"prison_type":[],"synonyms":["Копиевка","укр. Копіївка"],"id":"54ef1e26f505ed9a022fdacc"},{"_id":"54ef1e26f505ed9a022fdacb","type":"toponym","name":"село Рукшин ","current_name":"","country":"Украина","description":"","point":[26.405833,48.4875],"__v":0,"prison_type":[],"synonyms":["укр. Рукшин"],"id":"54ef1e26f505ed9a022fdacb"},{"_id":"54ef1e26f505ed9a022fdaca","type":"toponym","name":"Рухотин","current_name":"","country":"Украина","description":"","point":[26.205,48.517222],"__v":0,"prison_type":[],"synonyms":["укр. Рухотин"],"id":"54ef1e26f505ed9a022fdaca"},{"_id":"54ef1e26f505ed9a022fdac9","type":"toponym","name":"Черновцы","current_name":"","country":"Украина","description":"","point":[25.9358367,48.2920787],"__v":0,"prison_type":[],"synonyms":["укр. Чернівці́"],"id":"54ef1e26f505ed9a022fdac9"},{"_id":"54ef1e26f505ed9a022fdac8","type":"toponym","name":"Негин (село Каменец-Подольского района Хмельницкой области)","current_name":"","country":"Украина","description":"","point":[26.566944,48.8375],"__v":0,"prison_type":[],"synonyms":[],"id":"54ef1e26f505ed9a022fdac8"},
  // Definitions
  {"_id":"54f48370cdc4e45004d97ca6","type": "definition", "title":"управдом","description":"управляющий домом, домами - прежнее название должностного лица, возглавляющего домоуправление","__v":0,"id":"54f48370cdc4e45004d97ca6"},{"_id":"54f48370cdc4e45004d97ca5","type": "definition", "title":"домком","description":"домовый комитет - общественная организация жильцов","__v":0,"id":"54f48370cdc4e45004d97ca5"},
  // Persons
  {"_id":"54f476ba973cfcef0354adab","type": "person", "name":"Мария","description":"Мария, младшая сестра О.Г. Головиной","__v":0,"id":"54f476ba973cfcef0354adab"},{"_id":"54f476ba973cfcef0354adac","type": "person", "name":"Головина Анна Терентьевна","description":"","__v":0,"id":"54f476ba973cfcef0354adac"}
];

var SUBJECTS = [{"_id":"54bae4cda868bc6fab4bcd0e","name":"Казни (в том числе потенциальные)","parent":"54bae4cda868bc6fab4bcd0d","__v":0,"id":"54bae4cda868bc6fab4bcd0e"},{"_id":"54bae4d0a868bc6fab4bcd16","name":"Лагеря  военнопленных","parent":"54bae493a868bc6fab4bcc30","__v":0,"id":"54bae4d0a868bc6fab4bcd16"},{"_id":"54bae4cda868bc6fab4bcd0f","name":"экзекуции, издевательства","parent":"54bae4cda868bc6fab4bcd0d","__v":0,"id":"54bae4cda868bc6fab4bcd0f"},{"_id":"54bae4d1a868bc6fab4bcd1b","name":"офлаг /Offizierslager /Oflag— лагерь для офицеров","parent":"54bae4d0a868bc6fab4bcd17","__v":0,"id":"54bae4d1a868bc6fab4bcd1b"},{"_id":"54bae4d5a868bc6fab4bcd24","name":"вербовочный пункт","parent":"54bae4d4a868bc6fab4bcd22","__v":0,"id":"54bae4d5a868bc6fab4bcd24"},{"_id":"54bae4d0a868bc6fab4bcd18","name":"приемные лагеря / Aufgangslager (дивизионные и корпусные)","parent":"54bae4d0a868bc6fab4bcd17","__v":0,"id":"54bae4d0a868bc6fab4bcd18"},{"_id":"54bae4caa868bc6fab4bcd05","name":"несовершеннолетний респондент (введено с ID10)","parent":"54bae4caa868bc6fab4bcd04","__v":0,"id":"54bae4caa868bc6fab4bcd05"},{"_id":"54bae4cfa868bc6fab4bcd14","name":"одиночный протест","parent":"54bae4cea868bc6fab4bcd12","__v":0,"id":"54bae4cfa868bc6fab4bcd14"},{"_id":"54bae4d4a868bc6fab4bcd21","name":"Неустановленный тип","parent":"54bae4d0a868bc6fab4bcd17","__v":0,"id":"54bae4d4a868bc6fab4bcd21"},{"_id":"54bae4cfa868bc6fab4bcd15","name":"организации заключенных, саботаж","parent":"54bae4cea868bc6fab4bcd12","__v":0,"id":"54bae4cfa868bc6fab4bcd15"},{"_id":"54bae4cea868bc6fab4bcd10","name":"помещение в карцер (бункер)","parent":"54bae4cda868bc6fab4bcd0d","__v":0,"id":"54bae4cea868bc6fab4bcd10"},{"_id":"54bae4d2a868bc6fab4bcd1d","name":"лагерь при заводе для рабочей команды\"","parent":"54bae4d0a868bc6fab4bcd17","__v":0,"id":"54bae4d2a868bc6fab4bcd1d"},{"_id":"54bae4d6a868bc6fab4bcd29","name":"Топография лагеря и окрестностей","parent":"54bae4d0a868bc6fab4bcd16","__v":0,"id":"54bae4d6a868bc6fab4bcd29"},{"_id":"54bae4d3a868bc6fab4bcd1f","name":"лагерь при заводе для штрафной команды\"","parent":"54bae4d0a868bc6fab4bcd17","__v":0,"id":"54bae4d3a868bc6fab4bcd1f"},{"_id":"54bae4d5a868bc6fab4bcd25","name":"Администрация и обслуживание лагеря:","parent":"54bae4d0a868bc6fab4bcd16","__v":0,"id":"54bae4d5a868bc6fab4bcd25"},{"_id":"54bae4d7a868bc6fab4bcd2a","name":"лагерь и окрестности","parent":"54bae4d6a868bc6fab4bcd29","__v":0,"id":"54bae4d7a868bc6fab4bcd2a"},{"_id":"54bae4dba868bc6fab4bcd35","name":"самостоятельная добыча пропитания (способы выживания: грабеж, сдача крови за паек )","parent":"54bae4daa868bc6fab4bcd33","__v":0,"id":"54bae4dba868bc6fab4bcd35"},{"_id":"54bae4d8a868bc6fab4bcd2e","name":"Режим (распорядок, банные дни)","parent":"54bae4d8a868bc6fab4bcd2d","__v":0,"id":"54bae4d8a868bc6fab4bcd2e"},{"_id":"54bae4d8a868bc6fab4bcd2d","name":"Регламентация лагерной жизни:","parent":"54bae4d0a868bc6fab4bcd16","__v":0,"id":"54bae4d8a868bc6fab4bcd2d"},{"_id":"54bae4dca868bc6fab4bcd3a","name":"Условия жизни (санитарные, обустройство барака и пр.)","parent":"54bae4d9a868bc6fab4bcd31","__v":0,"id":"54bae4dca868bc6fab4bcd3a"},{"_id":"54bae4d7a868bc6fab4bcd2b","name":"зоны (бараки, комнаты) иных категорий заключенных, в том числе \"смертников\"","parent":"54bae4d6a868bc6fab4bcd29","__v":0,"id":"54bae4d7a868bc6fab4bcd2b"},{"_id":"54bae4dda868bc6fab4bcd3b","name":"Иное   (игра в карты, смена фамилии)","parent":"54bae4d9a868bc6fab4bcd31","__v":0,"id":"54bae4dda868bc6fab4bcd3b"},{"_id":"54bae4dba868bc6fab4bcd36","name":"Переписка, посылки","parent":"54bae4d9a868bc6fab4bcd31","__v":0,"id":"54bae4dba868bc6fab4bcd36"},{"_id":"54bae4dfa868bc6fab4bcd41","name":"Отношения между пленными:","parent":"54bae4d0a868bc6fab4bcd16","__v":0,"id":"54bae4dfa868bc6fab4bcd41"},{"_id":"54bae4daa868bc6fab4bcd34","name":" лагерный паек и добавки (в том числе помощь от немцев)","parent":"54bae4daa868bc6fab4bcd33","__v":0,"id":"54bae4daa868bc6fab4bcd34"},{"_id":"54bae4dea868bc6fab4bcd3e","name":"Деятельность Красного Креста","parent":"54bae4d0a868bc6fab4bcd16","__v":0,"id":"54bae4dea868bc6fab4bcd3e"},{"_id":"54bae50ea868bc6fab4bcdb3","name":"чехи","parent":"54bae50aa868bc6fab4bcdab","__v":0,"id":"54bae50ea868bc6fab4bcdb3"},{"_id":"54bae50fa868bc6fab4bcdb5","name":"сербы (югославы)","parent":"54bae50aa868bc6fab4bcdab","__v":0,"id":"54bae50fa868bc6fab4bcdb5"},{"_id":"54bae50ea868bc6fab4bcdb4","name":"словаки","parent":"54bae50aa868bc6fab4bcdab","__v":0,"id":"54bae50ea868bc6fab4bcdb4"},{"_id":"54bae50da868bc6fab4bcdb1","name":"датчане","parent":"54bae50aa868bc6fab4bcdab","__v":0,"id":"54bae50da868bc6fab4bcdb1"},{"_id":"54bae50fa868bc6fab4bcdb6","name":"англичане","parent":"54bae50aa868bc6fab4bcdab","__v":0,"id":"54bae50fa868bc6fab4bcdb6"},{"_id":"54bae511a868bc6fab4bcdba","name":"евреи","parent":"54bae50aa868bc6fab4bcdab","__v":0,"id":"54bae511a868bc6fab4bcdba"},{"_id":"54bae510a868bc6fab4bcdb8","name":"итальянцы","parent":"54bae50aa868bc6fab4bcdab","__v":0,"id":"54bae510a868bc6fab4bcdb8"},{"_id":"54bae515a868bc6fab4bcdc1","name":"туркмены","parent":"54bae50aa868bc6fab4bcdab","__v":0,"id":"54bae515a868bc6fab4bcdc1"},{"_id":"54bae512a868bc6fab4bcdbc","name":"цыгане","parent":"54bae50aa868bc6fab4bcdab","__v":0,"id":"54bae512a868bc6fab4bcdbc"},{"_id":"54bae513a868bc6fab4bcdbd","name":"армяне","parent":"54bae50aa868bc6fab4bcdab","__v":0,"id":"54bae513a868bc6fab4bcdbd"},{"_id":"54bae323a868bc6fab4bcc08","name":"рабочая команда концлагеря","parent":"54bae0f5a868bc91280a8329","__v":0,"id":"54bae323a868bc6fab4bcc08"},{"_id":"54bae3a0a868bc6fab4bcc1c","name":"Сапожная мастерская","parent":"54bae39fa868bc6fab4bcc18","__v":0,"id":"54bae3a0a868bc6fab4bcc1c"},{"_id":"54bae1f5a868bc96bdab8392","name":"необозначенные","parent":"54bae0f7a868bc91280a8337","description":"","__v":0,"id":"54bae1f5a868bc96bdab8392"},{"_id":"54bae39ea868bc6fab4bcc15","name":"Описание места работы, режима","parent":"54bae39da868bc6fab4bcc0f","__v":0,"id":"54bae39ea868bc6fab4bcc15"},{"_id":"54bae39ea868bc6fab4bcc11","name":"другие категории заключенных (в т.ч.военнопленные,  по национальному признаку)","parent":"54bae39da868bc6fab4bcc0f","__v":0,"id":"54bae39ea868bc6fab4bcc11"},{"_id":"54bae0faa868bc91280a834c","name":"очистка русла реки (в частности, Эльбы)","parent":"54bae0f7a868bc91280a8337","__v":0,"id":"54bae0faa868bc91280a834c"},{"_id":"54bae39fa868bc6fab4bcc1b","name":"Работы временные по дому (дезинфектор)","parent":"54bae39fa868bc6fab4bcc18","__v":0,"id":"54bae39fa868bc6fab4bcc1b"},{"_id":"54bae40ca868bc6fab4bcc29","name":"школа (общественная сфера), уборщица","parent":"54bae40ba868bc6fab4bcc23","__v":0,"id":"54bae40ca868bc6fab4bcc29"},{"_id":"54bae40da868bc6fab4bcc2e","name":"кухня, столовая, ресторан","parent":"54bae40ba868bc6fab4bcc23","__v":0,"id":"54bae40da868bc6fab4bcc2e"},{"_id":"54bae40da868bc6fab4bcc2d","name":"разминирование после бомбёжек","parent":"54bae40ba868bc6fab4bcc23","__v":0,"id":"54bae40da868bc6fab4bcc2d"},{"_id":"54bae494a868bc6fab4bcc34","name":"Внутрилагерные работы","parent":"54bae493a868bc6fab4bcc31","__v":0,"id":"54bae494a868bc6fab4bcc34"},{"_id":"54bae497a868bc6fab4bcc42","name":"зоны (бараки) иных категорий заключенных","parent":"54bae496a868bc6fab4bcc40","__v":0,"id":"54bae497a868bc6fab4bcc42"},{"_id":"54bae499a868bc6fab4bcc4c","name":"самостоятельная добыча пропитания (способы выживания: грабеж, сдача крови за паек )","parent":"54bae498a868bc6fab4bcc4a","__v":0,"id":"54bae499a868bc6fab4bcc4c"},{"_id":"54bae499a868bc6fab4bcc4d","name":"Переписка, посылки","parent":"54bae498a868bc6fab4bcc48","__v":0,"id":"54bae499a868bc6fab4bcc4d"},{"_id":"54bae49aa868bc6fab4bcc52","name":"Иное (игра в карты, смена фамилии)","parent":"54bae498a868bc6fab4bcc48","__v":0,"id":"54bae49aa868bc6fab4bcc52"},{"_id":"54bae49ba868bc6fab4bcc57","name":"Отношения между заключенными:","parent":"54bae495a868bc6fab4bcc3b","__v":0,"id":"54bae49ba868bc6fab4bcc57"},{"_id":"54bae494a868bc6fab4bcc35","name":"сбор опилок (детский труд)","parent":"54bae494a868bc6fab4bcc34","__v":0,"id":"54bae494a868bc6fab4bcc35"},{"_id":"54bae496a868bc6fab4bcc40","name":"Топография лагеря и окрестностей","parent":"54bae495a868bc6fab4bcc3b","__v":0,"id":"54bae496a868bc6fab4bcc40"},{"_id":"54bae494a868bc6fab4bcc32","name":"Распределение на работу (перераспределение, сортировка в сборном лагере)","parent":"54bae493a868bc6fab4bcc31","__v":0,"id":"54bae494a868bc6fab4bcc32"},{"_id":"54bae495a868bc6fab4bcc3b","name":"Рабочие лагеря (трудовые)","parent":"54bae493a868bc6fab4bcc30","__v":0,"id":"54bae495a868bc6fab4bcc3b"},{"_id":"54bae49ba868bc6fab4bcc56","name":"Внутрилагерные работы","parent":"54bae495a868bc6fab4bcc3b","__v":0,"id":"54bae49ba868bc6fab4bcc56"},{"_id":"54bae495a868bc6fab4bcc37","name":"несовершеннолетний респондент (введено с ID10)","parent":"54bae494a868bc6fab4bcc36","__v":0,"id":"54bae495a868bc6fab4bcc37"},{"_id":"54bae497a868bc6fab4bcc45","name":"Режим (распорядок, банные дни)","parent":"54bae497a868bc6fab4bcc44","__v":0,"id":"54bae497a868bc6fab4bcc45"},{"_id":"54bae497a868bc6fab4bcc44","name":"Регламентация лагерной жизни:","parent":"54bae495a868bc6fab4bcc3b","__v":0,"id":"54bae497a868bc6fab4bcc44"},{"_id":"54bae49ba868bc6fab4bcc58","name":"дружба и переписка","parent":"54bae49ba868bc6fab4bcc57","__v":0,"id":"54bae49ba868bc6fab4bcc58"},{"_id":"54bae499a868bc6fab4bcc4f","name":"Свободное время, праздники (бывший досуг)","parent":"54bae498a868bc6fab4bcc48","__v":0,"id":"54bae499a868bc6fab4bcc4f"},{"_id":"54bae496a868bc6fab4bcc3c","name":"Администрация и обслуживание лагеря:","parent":"54bae495a868bc6fab4bcc3b","__v":0,"id":"54bae496a868bc6fab4bcc3c"},{"_id":"54bae49ba868bc6fab4bcc59","name":"любовь, разлука, сексуальные отношения","parent":"54bae49ba868bc6fab4bcc57","__v":0,"id":"54bae49ba868bc6fab4bcc59"},{"_id":"54bae497a868bc6fab4bcc41","name":"лагерь и окрестности","parent":"54bae496a868bc6fab4bcc40","__v":0,"id":"54bae497a868bc6fab4bcc41"},{"_id":"54bae4a1a868bc6fab4bcc73","name":"несовершеннолетний респондент (введено с ID10)","parent":"54bae4a1a868bc6fab4bcc72","__v":0,"id":"54bae4a1a868bc6fab4bcc73"},{"_id":"54bae49ca868bc6fab4bcc5e","name":"межнациональные отношения (в том числе упоминание национальностей)","parent":"54bae49ba868bc6fab4bcc57","__v":0,"id":"54bae49ca868bc6fab4bcc5e"},{"_id":"54bae49ca868bc6fab4bcc5c","name":"воровство (друг у друга), доносы, предательство","parent":"54bae49ba868bc6fab4bcc57","__v":0,"id":"54bae49ca868bc6fab4bcc5c"},{"_id":"54bae498a868bc6fab4bcc4b","name":" лагерный паек и добавки (в том числе помощь благотворительная от немцев)","parent":"54bae498a868bc6fab4bcc4a","__v":0,"id":"54bae498a868bc6fab4bcc4b"},{"_id":"54bae49fa868bc6fab4bcc68","name":"западные украинцы","parent":"54bae49ca868bc6fab4bcc5e","__v":0,"id":"54bae49fa868bc6fab4bcc68"},{"_id":"54bae49aa868bc6fab4bcc51","name":"Условия жизни (санитарные, обустройство барака и пр.)","parent":"54bae498a868bc6fab4bcc48","__v":0,"id":"54bae49aa868bc6fab4bcc51"},{"_id":"54bae4a4a868bc6fab4bcc7e","name":"экзекуции, издевательства","parent":"54bae4a3a868bc6fab4bcc7c","__v":0,"id":"54bae4a4a868bc6fab4bcc7e"},{"_id":"54bae4a1a868bc6fab4bcc71","name":"чернокожие узники","parent":"54bae49ca868bc6fab4bcc5e","__v":0,"id":"54bae4a1a868bc6fab4bcc71"},{"_id":"54bae4a3a868bc6fab4bcc79","name":"психические травмы","parent":"54bae4a2a868bc6fab4bcc75","__v":0,"id":"54bae4a3a868bc6fab4bcc79"},{"_id":"54bae49ba868bc6fab4bcc55","name":"Деятельность Красного Креста","parent":"54bae495a868bc6fab4bcc3b","__v":0,"id":"54bae49ba868bc6fab4bcc55"},{"_id":"54bae4a4a868bc6fab4bcc7f","name":"помещение в карцер (бункер)","parent":"54bae4a3a868bc6fab4bcc7c","__v":0,"id":"54bae4a4a868bc6fab4bcc7f"},{"_id":"54bae4a9a868bc6fab4bcc92","name":"соседние фермы /дома  и лагеря, ","parent":"54bae4a8a868bc6fab4bcc8f","__v":0,"id":"54bae4a9a868bc6fab4bcc92"},{"_id":"54bae49da868bc6fab4bcc5f","name":"немцы (заключенные)","parent":"54bae49ca868bc6fab4bcc5e","__v":0,"id":"54bae49da868bc6fab4bcc5f"},{"_id":"54bae4a7a868bc6fab4bcc8b","name":"Общение с гражданскими, военнопленными и пр.","parent":"54bae4a5a868bc6fab4bcc85","__v":0,"id":"54bae4a7a868bc6fab4bcc8b"},{"_id":"54bae4a9a868bc6fab4bcc94","name":"Режим (распорядок, банные дни)","parent":"54bae4a9a868bc6fab4bcc93","__v":0,"id":"54bae4a9a868bc6fab4bcc94"},{"_id":"54bae4a7a868bc6fab4bcc8a","name":"свободное время, праздники","parent":"54bae4a6a868bc6fab4bcc86","__v":0,"id":"54bae4a7a868bc6fab4bcc8a"},{"_id":"54bae4a5a868bc6fab4bcc83","name":"одиночный протест","parent":"54bae4a4a868bc6fab4bcc81","__v":0,"id":"54bae4a5a868bc6fab4bcc83"},{"_id":"54bae4a5a868bc6fab4bcc85","name":"Проживание по месту работы (например, на аэродроме в бараке)","parent":"54bae493a868bc6fab4bcc30","__v":0,"id":"54bae4a5a868bc6fab4bcc85"},{"_id":"54bae4a5a868bc6fab4bcc84","name":"организации заключенных, саботаж","parent":"54bae4a4a868bc6fab4bcc81","__v":0,"id":"54bae4a5a868bc6fab4bcc84"},{"_id":"54bae4a8a868bc6fab4bcc91","name":"зоны (бараки) иных категорий заключенных /депортированных","parent":"54bae4a8a868bc6fab4bcc8f","__v":0,"id":"54bae4a8a868bc6fab4bcc91"},{"_id":"54bae4a4a868bc6fab4bcc7d","name":"Казни (в том числе потенциальные)","parent":"54bae4a3a868bc6fab4bcc7c","__v":0,"id":"54bae4a4a868bc6fab4bcc7d"},{"_id":"54bae4aaa868bc6fab4bcc97","name":"Питание ( в том числе добыча пищи)","parent":"54bae4a9a868bc6fab4bcc95","__v":0,"id":"54bae4aaa868bc6fab4bcc97"},{"_id":"54bae4aaa868bc6fab4bcc98","name":" хозяйский паек и добавки (в том числе помощь от немцев)","parent":"54bae4aaa868bc6fab4bcc97","__v":0,"id":"54bae4aaa868bc6fab4bcc98"},{"_id":"54bae4a9a868bc6fab4bcc93","name":"Регламентация жизни на ферме /доме:","parent":"54bae4a7a868bc6fab4bcc8d","__v":0,"id":"54bae4a9a868bc6fab4bcc93"},{"_id":"54bae4a8a868bc6fab4bcc8f","name":"Топография фермы / дома и окрестностей ","parent":"54bae4a7a868bc6fab4bcc8d","__v":0,"id":"54bae4a8a868bc6fab4bcc8f"},{"_id":"54bae4aba868bc6fab4bcc9c","name":"Свободное время, праздники","parent":"54bae4a9a868bc6fab4bcc95","__v":0,"id":"54bae4aba868bc6fab4bcc9c"},{"_id":"54bae4aba868bc6fab4bcc99","name":"самостоятельная добыча пропитания (способы выживания: грабеж, сдача крови за паек )","parent":"54bae4aaa868bc6fab4bcc97","__v":0,"id":"54bae4aba868bc6fab4bcc99"},{"_id":"54bae4aea868bc6fab4bcca6","name":"любовь, разлука, сексуальные отношения","parent":"54bae4ada868bc6fab4bcca4","__v":0,"id":"54bae4aea868bc6fab4bcca6"},{"_id":"54bae4aca868bc6fab4bcc9f","name":"Иное (игра в карты, смена фамилии)","parent":"54bae4a9a868bc6fab4bcc95","__v":0,"id":"54bae4aca868bc6fab4bcc9f"},{"_id":"54bae4ada868bc6fab4bcca2","name":"смена национальности","parent":"54bae4aca868bc6fab4bcc9f","__v":0,"id":"54bae4ada868bc6fab4bcca2"},{"_id":"54bae4afa868bc6fab4bccac","name":"немцы (заключенные)","parent":"54bae4afa868bc6fab4bccab","__v":0,"id":"54bae4afa868bc6fab4bccac"},{"_id":"54bae4a8a868bc6fab4bcc90","name":"ферма / дом и окрестности","parent":"54bae4a8a868bc6fab4bcc8f","__v":0,"id":"54bae4a8a868bc6fab4bcc90"},{"_id":"54bae4aba868bc6fab4bcc9a","name":"Переписка, посылки","parent":"54bae4a9a868bc6fab4bcc95","__v":0,"id":"54bae4aba868bc6fab4bcc9a"},{"_id":"54bae4ada868bc6fab4bcca4","name":"Отношения между депортированными","parent":"54bae4a7a868bc6fab4bcc8d","__v":0,"id":"54bae4ada868bc6fab4bcca4"},{"_id":"54bae4afa868bc6fab4bccab","name":"межнациональные отношения (в том числе упоминание национальностей)","parent":"54bae4ada868bc6fab4bcca4","__v":0,"id":"54bae4afa868bc6fab4bccab"},{"_id":"54bae4b7a868bc6fab4bccc7","name":"экзекуции, издевательства","parent":"54bae4b6a868bc6fab4bccc5","__v":0,"id":"54bae4b7a868bc6fab4bccc7"},{"_id":"54bae4b4a868bc6fab4bccbd","name":"несовершеннолетний респондент (введено с ID10)","parent":"54bae4b4a868bc6fab4bccbc","__v":0,"id":"54bae4b4a868bc6fab4bccbd"},{"_id":"54bae4aca868bc6fab4bcc9e","name":"Условия жизни (санитарные, обустройство барака/сарая и пр.)","parent":"54bae4a9a868bc6fab4bcc95","__v":0,"id":"54bae4aca868bc6fab4bcc9e"},{"_id":"54bae4ada868bc6fab4bcca5","name":"дружба и переписка ","parent":"54bae4ada868bc6fab4bcca4","__v":0,"id":"54bae4ada868bc6fab4bcca5"},{"_id":"54bae4b7a868bc6fab4bccc8","name":"помещение в карцер (бункер)","parent":"54bae4b6a868bc6fab4bccc5","__v":0,"id":"54bae4b7a868bc6fab4bccc8"},{"_id":"54bae4b9a868bc6fab4bcccf","name":"Тюрьмы Гестапо, СС, гауптвахты, директория полиции (сюда Головину в Венгрии)","parent":"54bae493a868bc6fab4bcc30","__v":0,"id":"54bae4b9a868bc6fab4bcccf"},{"_id":"54bae4bba868bc6fab4bccd6","name":"Топография лагеря и окрестностей","parent":"54bae4baa868bc6fab4bccd1","__v":0,"id":"54bae4bba868bc6fab4bccd6"},{"_id":"54bae4b8a868bc6fab4bcccc","name":"одиночный протест","parent":"54bae4b8a868bc6fab4bccca","__v":0,"id":"54bae4b8a868bc6fab4bcccc"},{"_id":"54bae4b9a868bc6fab4bcccd","name":"организации заключенных, саботаж","parent":"54bae4b8a868bc6fab4bccca","__v":0,"id":"54bae4b9a868bc6fab4bcccd"},{"_id":"54bae4afa868bc6fab4bcca9","name":"воровство (друг у друга), доносы, предательство","parent":"54bae4ada868bc6fab4bcca4","__v":0,"id":"54bae4afa868bc6fab4bcca9"},{"_id":"54bae4bca868bc6fab4bccd8","name":"зоны (бараки) иных категорий заключенных","parent":"54bae4bba868bc6fab4bccd6","__v":0,"id":"54bae4bca868bc6fab4bccd8"},{"_id":"54bae4b9a868bc6fab4bccce","name":"Общение с гражданскими, военнопленными и пр.","parent":"54bae4a7a868bc6fab4bcc8d","__v":0,"id":"54bae4b9a868bc6fab4bccce"},{"_id":"54bae4baa868bc6fab4bccd2","name":"Администрация и обслуживание лагеря:","parent":"54bae4baa868bc6fab4bccd1","__v":0,"id":"54bae4baa868bc6fab4bccd2"},{"_id":"54bae4b6a868bc6fab4bccc3","name":"психические травмы","parent":"54bae4b5a868bc6fab4bccbf","__v":0,"id":"54bae4b6a868bc6fab4bccc3"},{"_id":"54bae4bda868bc6fab4bccdb","name":"Режим (распорядок, банные дни)","parent":"54bae4bda868bc6fab4bccda","__v":0,"id":"54bae4bda868bc6fab4bccdb"},{"_id":"54bae4b4a868bc6fab4bccbc","name":"Дети (депортированные) в фермерском хозяйстве","parent":"54bae4a7a868bc6fab4bcc8d","__v":0,"id":"54bae4b4a868bc6fab4bccbc"},{"_id":"54bae4b7a868bc6fab4bccc6","name":"Казни (в том числе потенциальные)","parent":"54bae4b6a868bc6fab4bccc5","__v":0,"id":"54bae4b7a868bc6fab4bccc6"},{"_id":"54bae4bfa868bc6fab4bcce2","name":"самостоятельная добыча пропитания (способы выживания: грабеж, сдача крови за паек )","parent":"54bae4bea868bc6fab4bcce0","__v":0,"id":"54bae4bfa868bc6fab4bcce2"},{"_id":"54bae4bda868bc6fab4bccda","name":"Регламентация лагерной жизни:","parent":"54bae4baa868bc6fab4bccd1","__v":0,"id":"54bae4bda868bc6fab4bccda"},{"_id":"54bae4bca868bc6fab4bccd7","name":"лагерь и окрестности","parent":"54bae4bba868bc6fab4bccd6","__v":0,"id":"54bae4bca868bc6fab4bccd7"},{"_id":"54bae4c0a868bc6fab4bcce5","name":"Свободное время, праздники (бывший досуг)","parent":"54bae4bea868bc6fab4bccde","__v":0,"id":"54bae4c0a868bc6fab4bcce5"},{"_id":"54bae4bfa868bc6fab4bcce3","name":"Переписка, посылки","parent":"54bae4bea868bc6fab4bccde","__v":0,"id":"54bae4bfa868bc6fab4bcce3"},{"_id":"54bae4c1a868bc6fab4bcce7","name":"Условия жизни (санитарные, обустройство барака и пр.)","parent":"54bae4bea868bc6fab4bccde","__v":0,"id":"54bae4c1a868bc6fab4bcce7"},{"_id":"54bae4c1a868bc6fab4bcce8","name":"Иное   (игра в карты, смена фамилии)","parent":"54bae4bea868bc6fab4bccde","__v":0,"id":"54bae4c1a868bc6fab4bcce8"},{"_id":"54bae4c3a868bc6fab4bccef","name":"любовь, разлука, сексуальные отношения","parent":"54bae4c3a868bc6fab4bcced","__v":0,"id":"54bae4c3a868bc6fab4bccef"},{"_id":"54bae4bfa868bc6fab4bcce1","name":" лагерный паек и добавки (в том числе помощь от немцев)","parent":"54bae4bea868bc6fab4bcce0","__v":0,"id":"54bae4bfa868bc6fab4bcce1"},{"_id":"54bae4bea868bc6fab4bcce0","name":"Питание ( в том числе добыча пищи)","parent":"54bae4bea868bc6fab4bccde","__v":0,"id":"54bae4bea868bc6fab4bcce0"},{"_id":"54bae4c3a868bc6fab4bcced","name":"Отношения между заключенными:","parent":"54bae4baa868bc6fab4bccd1","__v":0,"id":"54bae4c3a868bc6fab4bcced"},{"_id":"54bae4c5a868bc6fab4bccf4","name":"межнациональные отношения (в том числе упоминание национальностей)","parent":"54bae4c3a868bc6fab4bcced","__v":0,"id":"54bae4c5a868bc6fab4bccf4"},{"_id":"54bae4c2a868bc6fab4bccec","name":"Внутрилагерные работы","parent":"54bae4baa868bc6fab4bccd1","__v":0,"id":"54bae4c2a868bc6fab4bccec"},{"_id":"54bae4c2a868bc6fab4bcceb","name":"Деятельность Красного Креста","parent":"54bae4baa868bc6fab4bccd1","__v":0,"id":"54bae4c2a868bc6fab4bcceb"},{"_id":"54bae4c5a868bc6fab4bccf5","name":"немцы (заключенные)","parent":"54bae4c5a868bc6fab4bccf4","__v":0,"id":"54bae4c5a868bc6fab4bccf5"},{"_id":"54bae4c4a868bc6fab4bccf2","name":"воровство (друг у друга), доносы, предательство","parent":"54bae4c3a868bc6fab4bcced","__v":0,"id":"54bae4c4a868bc6fab4bccf2"},{"_id":"54bae4c3a868bc6fab4bccee","name":"дружба и переписка","parent":"54bae4c3a868bc6fab4bcced","__v":0,"id":"54bae4c3a868bc6fab4bccee"},{"_id":"54bae4cca868bc6fab4bcd0b","name":"психические травмы","parent":"54bae4cba868bc6fab4bcd07","__v":0,"id":"54bae4cca868bc6fab4bcd0b"},{"_id":"54bae4e1a868bc6fab4bcd47","name":"иерархия заключенных (капо, штубовые, старосты, старшие по бараку, блоковые , разница в режимах содержания, категории по винкелями с конкретными правами, \"дно\")","parent":"54bae4dfa868bc6fab4bcd41","__v":0,"id":"54bae4e1a868bc6fab4bcd47"},{"_id":"54bae4dca868bc6fab4bcd39","name":"Несоблюдение режима (самоволки, хождение без винкеля и прочие непротестные для выживания нарушения)","parent":"54bae4d9a868bc6fab4bcd31","__v":0,"id":"54bae4dca868bc6fab4bcd39"},{"_id":"54bae4e9a868bc6fab4bcd5c","name":"Дети в лагере","parent":"54bae4d0a868bc6fab4bcd16","__v":0,"id":"54bae4e9a868bc6fab4bcd5c"},{"_id":"54bae4e7a868bc6fab4bcd57","name":"татары","parent":"54bae4e1a868bc6fab4bcd48","__v":0,"id":"54bae4e7a868bc6fab4bcd57"},{"_id":"54bae4eca868bc6fab4bcd64","name":"Наказания","parent":"54bae4d0a868bc6fab4bcd16","__v":0,"id":"54bae4eca868bc6fab4bcd64"},{"_id":"54bae4f1a868bc6fab4bcd70","name":"Надзиратели","parent":"54bae4f0a868bc6fab4bcd6e","__v":0,"id":"54bae4f1a868bc6fab4bcd70"},{"_id":"54bae4f1a868bc6fab4bcd6f","name":"Администрация","parent":"54bae4f0a868bc6fab4bcd6e","__v":0,"id":"54bae4f1a868bc6fab4bcd6f"},{"_id":"54bae4eba868bc6fab4bcd61","name":"общие болезни","parent":"54bae4eaa868bc6fab4bcd5f","__v":0,"id":"54bae4eba868bc6fab4bcd61"},{"_id":"54bae4f7a868bc6fab4bcd7e","name":"Одежда, обувь","parent":"54bae4f6a868bc6fab4bcd7d","__v":0,"id":"54bae4f7a868bc6fab4bcd7e"},{"_id":"54bae4f9a868bc6fab4bcd85","name":"футбол, бокс","parent":"54bae4f9a868bc6fab4bcd84","__v":0,"id":"54bae4f9a868bc6fab4bcd85"},{"_id":"54bae4eea868bc6fab4bcd69","name":"Сопротивление:","parent":"54bae4d0a868bc6fab4bcd16","__v":0,"id":"54bae4eea868bc6fab4bcd69"},{"_id":"54bae4f1a868bc6fab4bcd71","name":"Вольнонаёмные","parent":"54bae4f0a868bc6fab4bcd6e","__v":0,"id":"54bae4f1a868bc6fab4bcd71"},{"_id":"54bae4eea868bc6fab4bcd68","name":"Публичный дом","parent":"54bae4d0a868bc6fab4bcd16","__v":0,"id":"54bae4eea868bc6fab4bcd68"},{"_id":"54bae4f3a868bc6fab4bcd75","name":"соседние лагеря","parent":"54bae4f2a868bc6fab4bcd72","__v":0,"id":"54bae4f3a868bc6fab4bcd75"},{"_id":"54bae4f9a868bc6fab4bcd83","name":"Обмен","parent":"54bae4f6a868bc6fab4bcd7d","__v":0,"id":"54bae4f9a868bc6fab4bcd83"},{"_id":"54bae4fea868bc6fab4bcd8f","name":"парник","parent":"54bae4fda868bc6fab4bcd8e","__v":0,"id":"54bae4fea868bc6fab4bcd8f"},{"_id":"54bae4f6a868bc6fab4bcd7d","name":"Повседневность:","parent":"54bae4f0a868bc6fab4bcd6d","__v":0,"id":"54bae4f6a868bc6fab4bcd7d"},{"_id":"54bae4fba868bc6fab4bcd89","name":"игра в карты","parent":"54bae4fba868bc6fab4bcd88","__v":0,"id":"54bae4fba868bc6fab4bcd89"},{"_id":"54bae502a868bc6fab4bcd9a","name":"штрафкоманда","parent":"54bae4fda868bc6fab4bcd8d","__v":0,"id":"54bae502a868bc6fab4bcd9a"},{"_id":"54bae4ffa868bc6fab4bcd92","name":"крематорий","parent":"54bae4fda868bc6fab4bcd8d","__v":0,"id":"54bae4ffa868bc6fab4bcd92"},{"_id":"54bae4fca868bc6fab4bcd8a","name":"смена фамилии","parent":"54bae4fba868bc6fab4bcd88","__v":0,"id":"54bae4fca868bc6fab4bcd8a"},{"_id":"54bae501a868bc6fab4bcd98","name":"прачечная","parent":"54bae4fda868bc6fab4bcd8d","__v":0,"id":"54bae501a868bc6fab4bcd98"},{"_id":"54bae4faa868bc6fab4bcd86","name":"Несоблюдение режима (самоволки, хождение без винкеля и прочие непротестные для выживания нарушения или намерения к тому)","parent":"54bae4f6a868bc6fab4bcd7d","__v":0,"id":"54bae4faa868bc6fab4bcd86"},{"_id":"54bae4fea868bc6fab4bcd90","name":"работа в поле","parent":"54bae4fda868bc6fab4bcd8e","__v":0,"id":"54bae4fea868bc6fab4bcd90"},{"_id":"54bae4ffa868bc6fab4bcd93","name":"медпункт","parent":"54bae4fda868bc6fab4bcd8d","__v":0,"id":"54bae4ffa868bc6fab4bcd93"},{"_id":"54bae503a868bc6fab4bcd9b","name":"переводчик","parent":"54bae4fda868bc6fab4bcd8d","__v":0,"id":"54bae503a868bc6fab4bcd9b"},{"_id":"54bae501a868bc6fab4bcd96","name":"оркестр","parent":"54bae4fda868bc6fab4bcd8d","__v":0,"description":"","id":"54bae501a868bc6fab4bcd96"},{"_id":"54bae502a868bc6fab4bcd99","name":"транспорт (принятие при прибытии, при бане, сбор одежды прибывших, умерщвленных в бане / не в крематории/, доставка ослабевших с места работы и т.п.)","parent":"54bae4fda868bc6fab4bcd8d","__v":0,"id":"54bae502a868bc6fab4bcd99"},{"_id":"54bae503a868bc6fab4bcd9c","name":"банщик-мойщик","parent":"54bae4fda868bc6fab4bcd8d","__v":0,"id":"54bae503a868bc6fab4bcd9c"},{"_id":"54bae505a868bc6fab4bcda1","name":"вывоз трупов","parent":"54bae4fda868bc6fab4bcd8d","__v":0,"id":"54bae505a868bc6fab4bcda1"},{"_id":"54bae509a868bc6fab4bcdaa","name":"иерархия заключенных (капо, штубовые, старосты, старшие по бараку, блоковые , разница в режимах содержания, категории по винкелями с конкретными правами, \"дно\")","parent":"54bae506a868bc6fab4bcda3","__v":0,"id":"54bae509a868bc6fab4bcdaa"},{"_id":"54bae4fea868bc6fab4bcd91","name":"развоз еды","parent":"54bae4fda868bc6fab4bcd8d","__v":0,"id":"54bae4fea868bc6fab4bcd91"},{"_id":"54bae508a868bc6fab4bcda7","name":"взаимопомощь","parent":"54bae506a868bc6fab4bcda3","__v":0,"id":"54bae508a868bc6fab4bcda7"},{"_id":"54bae507a868bc6fab4bcda6","name":"землячества","parent":"54bae506a868bc6fab4bcda3","__v":0,"id":"54bae507a868bc6fab4bcda6"},{"_id":"54bae50ca868bc6fab4bcdaf","name":"бельгийцы","parent":"54bae50aa868bc6fab4bcdab","__v":0,"id":"54bae50ca868bc6fab4bcdaf"},{"_id":"54bae50ca868bc6fab4bcdb0","name":"голландцы","parent":"54bae50aa868bc6fab4bcdab","__v":0,"id":"54bae50ca868bc6fab4bcdb0"},{"_id":"54bae510a868bc6fab4bcdb7","name":"французы","parent":"54bae50aa868bc6fab4bcdab","__v":0,"id":"54bae510a868bc6fab4bcdb7"},{"_id":"54bae51fa868bc6fab4bcdd7","name":"при экзекуциях, работах, в бане (при прибытии транспорта -газ, но не крематорий), в прачечных, при этапировании ( но не марш смерти)","parent":"54bae51fa868bc6fab4bcdd5","__v":0,"id":"54bae51fa868bc6fab4bcdd7"},{"_id":"54baea7da868bc81751d8adb","name":"Проверки НКВД, МГБ","parent":"54baea7ca868bc81751d8ad9","__v":0,"id":"54baea7da868bc81751d8adb"},{"_id":"54baea7ba868bc81751d8ad8","name":"Перемена места жительства","parent":"54baea7aa868bc81751d8ad6","__v":0,"id":"54baea7ba868bc81751d8ad8"},{"_id":"54baea7fa868bc81751d8ae0","name":"Отношения с родственниками после возвращения","parent":"54baea7ea868bc81751d8add","__v":0,"id":"54baea7fa868bc81751d8ae0"},{"_id":"54baea82a868bc81751d8ae5","name":"Организация повседневной жизни","parent":"54baea79a868bc81751d8ad4","__v":0,"id":"54baea82a868bc81751d8ae5"},{"_id":"54baea85a868bc81751d8aea","name":"В сельской местности","parent":"54baea84a868bc81751d8ae8","__v":0,"id":"54baea85a868bc81751d8aea"},{"_id":"54bae9a2a868bc3ec7fb5ae2","name":"в группе советских войск в Европе  (с ID10)","parent":"54bae9a1a868bc3ec7fb5ae1","__v":0,"id":"54bae9a2a868bc3ec7fb5ae2"},{"_id":"54baea83a868bc81751d8ae7","name":"В сельской местности","parent":"54baea82a868bc81751d8ae5","__v":0,"id":"54baea83a868bc81751d8ae7"},{"_id":"54baea80a868bc81751d8ae1","name":"Отношения с земляками, соседями, коллегами (в том числе гонения)","parent":"54baea79a868bc81751d8ad4","__v":0,"id":"54baea80a868bc81751d8ae1"},{"_id":"54baea7ea868bc81751d8add","name":"Семейные отношения","parent":"54baea79a868bc81751d8ad4","__v":0,"id":"54baea7ea868bc81751d8add"},{"_id":"54baea84a868bc81751d8ae8","name":"Снабжение, карточная система","parent":"54baea79a868bc81751d8ad4","__v":0,"id":"54baea84a868bc81751d8ae8"},{"_id":"54baeaafa868bc81751d8af8","name":"иные формы антисоветской деятельности","parent":"54baeaaca868bc81751d8af3","__v":0,"id":"54baeaafa868bc81751d8af8"},{"_id":"54baea89a868bc81751d8af1","name":"формы дискриминации в условиях послевоенной жизни","parent":"54baea86a868bc81751d8aec","__v":0,"id":"54baea89a868bc81751d8af1"},{"_id":"54baeab0a868bc81751d8afa","name":"социализация (участие в различных комитетах, сюда же отношение к религии)","parent":"54bae9e6a868bc3ec7fb5ae6","__v":0,"id":"54baeab0a868bc81751d8afa"},{"_id":"54baeaaca868bc81751d8af3","name":"Сопротивление советскому режиму","parent":"54bae9e6a868bc3ec7fb5ae6","__v":0,"id":"54baeaaca868bc81751d8af3"},{"_id":"54baeab6a868bc81751d8b04","name":"в настоящее время","parent":"54baeab4a868bc81751d8b02","__v":0,"id":"54baeab6a868bc81751d8b04"},{"_id":"54baeab2a868bc81751d8afe","name":"память о союзниках","parent":"54baeab0a868bc81751d8afb","__v":0,"id":"54baeab2a868bc81751d8afe"},{"_id":"54baea86a868bc81751d8aed","name":"реабилитация","parent":"54baea86a868bc81751d8aec","__v":0,"id":"54baea86a868bc81751d8aed"},{"_id":"54baea88a868bc81751d8aef","name":"ГУЛаг","parent":"54baea86a868bc81751d8aec","__v":0,"id":"54baea88a868bc81751d8aef"},{"_id":"54baeaada868bc81751d8af5","name":"РОА (январь-май 1945)","parent":"54baeaaca868bc81751d8af4","__v":0,"id":"54baeaada868bc81751d8af5"},{"_id":"54baeab4a868bc81751d8b01","name":"личные архивы","parent":"54bae9e6a868bc3ec7fb5ae6","__v":0,"id":"54baeab4a868bc81751d8b01"},{"_id":"54baea7ea868bc81751d8ade","name":"Судьбы семей во время войны","parent":"54baea7ea868bc81751d8add","__v":0,"id":"54baea7ea868bc81751d8ade"},{"_id":"54baea88a868bc81751d8af0","name":"депортации","parent":"54baea86a868bc81751d8aec","__v":0,"id":"54baea88a868bc81751d8af0"},{"_id":"54baeab3a868bc81751d8aff","name":"последствия принудительного труда и пребывания в концлагерях Германии","parent":"54bae9e6a868bc3ec7fb5ae6","__v":0,"id":"54baeab3a868bc81751d8aff"},{"_id":"54baeab5a868bc81751d8b03","name":"во время пребывания в Германии","parent":"54baea79a868bc81751d8ad4","__v":0,"id":"54baeab5a868bc81751d8b03"},{"_id":"54baeab3a868bc81751d8b00","name":"эмиграция (современность)","parent":"54bae9e6a868bc3ec7fb5ae6","__v":0,"id":"54baeab3a868bc81751d8b00"},{"_id":"54baeab2a868bc81751d8afd","name":"память о Германии, отношение к немцам, к немецкому языку","parent":"54baeab0a868bc81751d8afb","__v":0,"id":"54baeab2a868bc81751d8afd"},{"_id":"54baeaada868bc81751d8af6","name":"участие в национально-освободительных военнизированных формированиях","parent":"54baeaaca868bc81751d8af3","__v":0,"id":"54baeaada868bc81751d8af6"},{"_id":"54baeaafa868bc81751d8af9","name":"выплата компенсаций, льготы; сбор свидетельских показаний","parent":"54bae9e6a868bc3ec7fb5ae6","__v":0,"id":"54baeaafa868bc81751d8af9"},{"_id":"54baeab4a868bc81751d8b02","name":"Сновидения","parent":"54bae9e6a868bc3ec7fb5ae6","__v":0,"id":"54baeab4a868bc81751d8b02"},{"_id":"54baeaaea868bc81751d8af7","name":"помощь участникам национально-освободительных формирований","parent":"54baeaaca868bc81751d8af3","__v":0,"id":"54baeaaea868bc81751d8af7"},{"_id":"54baeab0a868bc81751d8afb","name":"оценка прошлого","parent":"54bae9e6a868bc3ec7fb5ae6","__v":0,"id":"54baeab0a868bc81751d8afb"},{"_id":"54c6b4c5a868bc5ffc71bfba","name":"ccccc","parent":"54c90609451f25f4d943a04f","__v":0,"id":"54c6b4c5a868bc5ffc71bfba"},{"_id":"54c79270451f25da9c2930f5","name":"hahaha","parent":"54bad419a868bca4e8cc65ca","__v":0,"id":"54c79270451f25da9c2930f5"},{"_id":"54bae4e0a868bc6fab4bcd43","name":"любовь, разлука, сексуальные отношения","parent":"54bae4dfa868bc6fab4bcd41","__v":0,"id":"54bae4e0a868bc6fab4bcd43"},{"_id":"54bae4eaa868bc6fab4bcd5d","name":"несовершеннолетний респондент (введено с ID10)","parent":"54bae4e9a868bc6fab4bcd5c","__v":0,"id":"54bae4eaa868bc6fab4bcd5d"},{"_id":"54bae4eda868bc6fab4bcd66","name":"экзекуции, издевательства","parent":"54bae4eca868bc6fab4bcd64","__v":0,"id":"54bae4eda868bc6fab4bcd66"},{"_id":"54bae4f5a868bc6fab4bcd7b","name":"Лагерь при заводе для учебной команды","parent":"54bae4f3a868bc6fab4bcd76","__v":0,"id":"54bae4f5a868bc6fab4bcd7b"},{"_id":"54bae4f0a868bc6fab4bcd6e","name":"Администрация и обслуживание лагеря:","parent":"54bae4f0a868bc6fab4bcd6d","__v":0,"id":"54bae4f0a868bc6fab4bcd6e"},{"_id":"54bae4f7a868bc6fab4bcd7f","name":"Питание ( в том числе добыча пищи, сигарет)","parent":"54bae4f6a868bc6fab4bcd7d","__v":0,"id":"54bae4f7a868bc6fab4bcd7f"},{"_id":"54bae4fba868bc6fab4bcd88","name":"Иное  (игра в карты, смена фамилии)","parent":"54bae4f6a868bc6fab4bcd7d","__v":0,"id":"54bae4fba868bc6fab4bcd88"},{"_id":"54bae4faa868bc6fab4bcd87","name":"Условия жизни (санитарные, обустройство барака и пр.)","parent":"54bae4f6a868bc6fab4bcd7d","__v":0,"id":"54bae4faa868bc6fab4bcd87"},{"_id":"54bae504a868bc6fab4bcd9f","name":"уборка территории","parent":"54bae4fda868bc6fab4bcd8d","__v":0,"id":"54bae504a868bc6fab4bcd9f"},{"_id":"54bae509a868bc6fab4bcda9","name":"убийства, расправы","parent":"54bae506a868bc6fab4bcda3","__v":0,"id":"54bae509a868bc6fab4bcda9"},{"_id":"54bae50ba868bc6fab4bcdad","name":"немцы (заключенные)","parent":"54bae50aa868bc6fab4bcdab","__v":0,"id":"54bae50ba868bc6fab4bcdad"},{"_id":"54bae512a868bc6fab4bcdbb","name":"украинцы","parent":"54bae50aa868bc6fab4bcdab","__v":0,"id":"54bae512a868bc6fab4bcdbb"},{"_id":"54bae4daa868bc6fab4bcd33","name":"Питание ( в том числе добыча пищи)","parent":"54bae4d9a868bc6fab4bcd31","__v":0,"id":"54bae4daa868bc6fab4bcd33"},{"_id":"54bae4e2a868bc6fab4bcd49","name":"немцы (заключенные)","parent":"54bae4e1a868bc6fab4bcd48","__v":0,"id":"54bae4e2a868bc6fab4bcd49"},{"_id":"54bae4efa868bc6fab4bcd6a","name":"побеги ( в том числе замысел)","parent":"54bae4eea868bc6fab4bcd69","__v":0,"id":"54bae4efa868bc6fab4bcd6a"},{"_id":"54bae4f3a868bc6fab4bcd76","name":"Регламентация лагерной жизни:","parent":"54bae4f0a868bc6fab4bcd6d","__v":0,"id":"54bae4f3a868bc6fab4bcd76"},{"_id":"54bae4f0a868bc6fab4bcd6d","name":"Концентрационный лагерь","parent":"54bae493a868bc6fab4bcc30","__v":0,"id":"54bae4f0a868bc6fab4bcd6d"},{"_id":"54bae4f4a868bc6fab4bcd77","name":"Режим (распорядок, банные дни)","parent":"54bae4f3a868bc6fab4bcd76","__v":0,"id":"54bae4f4a868bc6fab4bcd77"},{"_id":"54bae500a868bc6fab4bcd94","name":"иное (делать новые рубрики по мере надобности)","parent":"54bae4fda868bc6fab4bcd8d","__v":0,"id":"54bae500a868bc6fab4bcd94"},{"_id":"54bae4f8a868bc6fab4bcd81","name":"самостоятельная добыча пропитания (способы выживания: грабеж, сдача крови за паек )","parent":"54bae4f7a868bc6fab4bcd7f","__v":0,"id":"54bae4f8a868bc6fab4bcd81"},{"_id":"54bae504a868bc6fab4bcd9e","name":"плетение верёвок, маскировочных сеток, сумок","parent":"54bae4fda868bc6fab4bcd8d","__v":0,"id":"54bae504a868bc6fab4bcd9e"},{"_id":"54bae505a868bc6fab4bcda0","name":"уборка территории у стены расстрелов","parent":"54bae4fda868bc6fab4bcd8d","__v":0,"id":"54bae505a868bc6fab4bcda0"},{"_id":"54bae508a868bc6fab4bcda8","name":"воровство (друг у друга), доносы, предательство","parent":"54bae506a868bc6fab4bcda3","__v":0,"id":"54bae508a868bc6fab4bcda8"},{"_id":"54bae4dea868bc6fab4bcd3f","name":"Внутрилагерные работы","parent":"54bae4d0a868bc6fab4bcd16","__v":0,"id":"54bae4dea868bc6fab4bcd3f"},{"_id":"54bae516a868bc6fab4bcdc3","name":"греки","parent":"54bae50aa868bc6fab4bcdab","__v":0,"id":"54bae516a868bc6fab4bcdc3"},{"_id":"54bae4dfa868bc6fab4bcd42","name":"дружба и переписка","parent":"54bae4dfa868bc6fab4bcd41","__v":0,"id":"54bae4dfa868bc6fab4bcd42"},{"_id":"54bae4eda868bc6fab4bcd65","name":"Казни (в том числе потенциальные)","parent":"54bae4eca868bc6fab4bcd64","__v":0,"id":"54bae4eda868bc6fab4bcd65"},{"_id":"54bae513a868bc6fab4bcdbe","name":"хорваты","parent":"54bae50aa868bc6fab4bcdab","__v":0,"id":"54bae513a868bc6fab4bcdbe"},{"_id":"54bae514a868bc6fab4bcdbf","name":"белорусы","parent":"54bae50aa868bc6fab4bcdab","__v":0,"id":"54bae514a868bc6fab4bcdbf"},{"_id":"54bae4efa868bc6fab4bcd6b","name":"одиночный протест","parent":"54bae4eea868bc6fab4bcd69","__v":0,"id":"54bae4efa868bc6fab4bcd6b"},{"_id":"54bae4f7a868bc6fab4bcd80","name":"лагерный паек и добавки (в том числе помощь от немцев)","parent":"54bae4f7a868bc6fab4bcd7f","__v":0,"id":"54bae4f7a868bc6fab4bcd80"},{"_id":"54bae4f2a868bc6fab4bcd73","name":"лагерь и окрестности ","parent":"54bae4f2a868bc6fab4bcd72","__v":0,"id":"54bae4f2a868bc6fab4bcd73"},{"_id":"54bae4f9a868bc6fab4bcd84","name":"Свободное время, праздники (бывший досуг)","parent":"54bae4f6a868bc6fab4bcd7d","__v":0,"id":"54bae4f9a868bc6fab4bcd84"},{"_id":"54bae504a868bc6fab4bcd9d","name":"табуретки, козлы (сидячее производство для доходяг)","parent":"54bae4fda868bc6fab4bcd8d","__v":0,"id":"54bae504a868bc6fab4bcd9d"},{"_id":"54bae4fca868bc6fab4bcd8b","name":"Магазин, киоск на территории лагеря","parent":"54bae4f6a868bc6fab4bcd7d","__v":0,"id":"54bae4fca868bc6fab4bcd8b"},{"_id":"54bae506a868bc6fab4bcda3","name":"Отношения между заключенными:","parent":"54bae4f0a868bc6fab4bcd6d","__v":0,"id":"54bae506a868bc6fab4bcda3"},{"_id":"54bae506a868bc6fab4bcda2","name":"уборка бараков, блоков","parent":"54bae4fda868bc6fab4bcd8d","__v":0,"id":"54bae506a868bc6fab4bcda2"},{"_id":"54bae50da868bc6fab4bcdb2","name":"чернокожие узники","parent":"54bae50aa868bc6fab4bcdab","__v":0,"id":"54bae50da868bc6fab4bcdb2"},{"_id":"54bae511a868bc6fab4bcdb9","name":"поляки","parent":"54bae50aa868bc6fab4bcdab","__v":0,"id":"54bae511a868bc6fab4bcdb9"},{"_id":"54bae519a868bc6fab4bcdc9","name":"Болезни, медицина","parent":"54bae4f0a868bc6fab4bcd6d","__v":0,"id":"54bae519a868bc6fab4bcdc9"},{"_id":"54bd6ba7a868bc5c03693032","name":"История семьи (предки) (в том числе жизнь,быт и пр.)","parent":"54b8f267a868bc4fd8ca4a49","description":"","__v":0,"id":"54bd6ba7a868bc5c03693032"},{"_id":"54bae4dca868bc6fab4bcd38","name":"Свободное время, праздники (бывший досуг)","parent":"54bae4d9a868bc6fab4bcd31","__v":0,"id":"54bae4dca868bc6fab4bcd38"},{"_id":"54bae4eca868bc6fab4bcd63","name":"психические травмы","parent":"54bae4eaa868bc6fab4bcd5f","__v":0,"id":"54bae4eca868bc6fab4bcd63"},{"_id":"54bae51da868bc6fab4bcdd1","name":"Наказания","parent":"54bae4f0a868bc6fab4bcd6d","__v":0,"id":"54bae51da868bc6fab4bcdd1"},{"_id":"54bae960a868bc3ec7fb5ad0","name":"самостоятельное перемещение по освобожденной союзниками территории","parent":"54bae95ea868bc3ec7fb5acd","__v":0,"id":"54bae960a868bc3ec7fb5ad0"},{"_id":"54bae4e1a868bc6fab4bcd46","name":"воровство (друг у друга), доносы, предательство","parent":"54bae4dfa868bc6fab4bcd41","__v":0,"id":"54bae4e1a868bc6fab4bcd46"},{"_id":"54bae4e1a868bc6fab4bcd48","name":"межнациональные отношения (в том числе упоминание национальностей)","parent":"54bae4dfa868bc6fab4bcd41","__v":0,"id":"54bae4e1a868bc6fab4bcd48"},{"_id":"54bae4efa868bc6fab4bcd6c","name":"организации заключенных, саботаж, , распространение антинемецкой новостной информации","parent":"54bae4eea868bc6fab4bcd69","__v":0,"id":"54bae4efa868bc6fab4bcd6c"},{"_id":"54bae4f5a868bc6fab4bcd79","name":"Дезинфекция, карантин","parent":"54bae4f3a868bc6fab4bcd76","__v":0,"id":"54bae4f5a868bc6fab4bcd79"},{"_id":"54bae4f2a868bc6fab4bcd72","name":"Топография лагеря и окрестностей","parent":"54bae4f0a868bc6fab4bcd6d","__v":0,"id":"54bae4f2a868bc6fab4bcd72"},{"_id":"54bae4f6a868bc6fab4bcd7c","name":"Пересыльный  лагерь","parent":"54bae4f3a868bc6fab4bcd76","__v":0,"id":"54bae4f6a868bc6fab4bcd7c"},{"_id":"54bae4f8a868bc6fab4bcd82","name":"Переписка, посылки","parent":"54bae4f6a868bc6fab4bcd7d","__v":0,"id":"54bae4f8a868bc6fab4bcd82"},{"_id":"54bae4fca868bc6fab4bcd8c","name":"Деятельность Красного Креста","parent":"54bae4f0a868bc6fab4bcd6d","__v":0,"id":"54bae4fca868bc6fab4bcd8c"},{"_id":"54bae507a868bc6fab4bcda4","name":"дружба и переписка","parent":"54bae506a868bc6fab4bcda3","__v":0,"id":"54bae507a868bc6fab4bcda4"},{"_id":"54bae50aa868bc6fab4bcdab","name":"межнациональные отношения (в том числе упоминание национальностей)","parent":"54bae506a868bc6fab4bcda3","__v":0,"id":"54bae50aa868bc6fab4bcdab"},{"_id":"54bae518a868bc6fab4bcdc7","name":"несовершеннолетний респондент, пребывание (введено с ID10)","parent":"54bae517a868bc6fab4bcdc6","__v":0,"id":"54bae518a868bc6fab4bcdc7"},{"_id":"54bae50ba868bc6fab4bcdae","name":"австрийцы (заключенные)","parent":"54bae50aa868bc6fab4bcdab","__v":0,"id":"54bae50ba868bc6fab4bcdae"},{"_id":"54bae516a868bc6fab4bcdc4","name":"русские","parent":"54bae50aa868bc6fab4bcdab","__v":0,"id":"54bae516a868bc6fab4bcdc4"},{"_id":"54bae51ba868bc6fab4bcdce","name":"Медицинские опыты (селекция)","parent":"54bae4f0a868bc6fab4bcd6d","__v":0,"id":"54bae51ba868bc6fab4bcdce"},{"_id":"54bae95ea868bc3ec7fb5acc","name":"Освобождение советскими войсками","parent":"54bae95da868bc3ec7fb5acb","__v":0,"id":"54bae95ea868bc3ec7fb5acc"},{"_id":"54bae51ca868bc6fab4bcdd0","name":"в целом без конкретики","parent":"54bae51ba868bc6fab4bcdce","__v":0,"id":"54bae51ca868bc6fab4bcdd0"},{"_id":"54bae51ea868bc6fab4bcdd3","name":"экзекуции, издевательства","parent":"54bae51da868bc6fab4bcdd1","__v":0,"id":"54bae51ea868bc6fab4bcdd3"},{"_id":"54bae523a868bc6fab4bcdde","name":"организации заключенных, саботаж","parent":"54bae522a868bc6fab4bcddb","__v":0,"id":"54bae523a868bc6fab4bcdde"},{"_id":"54bae8cfa868bc291f123781","name":"Отношение немцев к войне, политическому режиму в Германии и пр.","parent":"54bad419a868bca4e8cc65ca","__v":0,"id":"54bae8cfa868bc291f123781"},{"_id":"54bae517a868bc6fab4bcdc5","name":"советские","parent":"54bae50aa868bc6fab4bcdab","__v":0,"id":"54bae517a868bc6fab4bcdc5"},{"_id":"54bae8d0a868bc291f123782","name":"Переходный период, безвластие, самоосвобождение, при помощи немцев","parent":"54bad419a868bca4e8cc65ca","__v":0,"id":"54bae8d0a868bc291f123782"},{"_id":"54bae51da868bc6fab4bcdd2","name":"Казни (в том числе потенциальные)","parent":"54bae51da868bc6fab4bcdd1","__v":0,"id":"54bae51da868bc6fab4bcdd2"},{"_id":"54bae99fa868bc3ec7fb5add","name":"работа в воинских частях (в том числе детей)","parent":"54bae99ca868bc3ec7fb5ad8","__v":0,"id":"54bae99fa868bc3ec7fb5add"},{"_id":"54bae519a868bc6fab4bcdca","name":"гинекология","parent":"54bae519a868bc6fab4bcdc9","__v":0,"id":"54bae519a868bc6fab4bcdca"},{"_id":"54bae51ba868bc6fab4bcdcf","name":"донорская команда (\"лимфа\")","parent":"54bae51ba868bc6fab4bcdce","__v":0,"id":"54bae51ba868bc6fab4bcdcf"},{"_id":"54bae51fa868bc6fab4bcdd5","name":"Уничтожение\"","parent":"54bae4f0a868bc6fab4bcd6d","__v":0,"id":"54bae51fa868bc6fab4bcdd5"},{"_id":"54bae518a868bc6fab4bcdc8","name":"другие дети","parent":"54bae517a868bc6fab4bcdc6","__v":0,"id":"54bae518a868bc6fab4bcdc8"},{"_id":"54bae523a868bc6fab4bcddd","name":"одиночный протест (в том числе самоубийства)","parent":"54bae522a868bc6fab4bcddb","__v":0,"id":"54bae523a868bc6fab4bcddd"},{"_id":"54bae95fa868bc3ec7fb5acf","name":"бывшие немецкие рабочие и прочие лагеря под охраной союзников","parent":"54bae95ea868bc3ec7fb5acd","__v":0,"id":"54bae95fa868bc3ec7fb5acf"},{"_id":"54bae51aa868bc6fab4bcdcb","name":"общие болезни","parent":"54bae519a868bc6fab4bcdc9","__v":0,"id":"54bae51aa868bc6fab4bcdcb"},{"_id":"54bae99da868bc3ec7fb5ada","name":"воинская часть","parent":"54bae99ca868bc3ec7fb5ad8","__v":0,"id":"54bae99da868bc3ec7fb5ada"},{"_id":"54bae522a868bc6fab4bcddc","name":"побеги ( в том числе замышляемые)","parent":"54bae522a868bc6fab4bcddb","__v":0,"id":"54bae522a868bc6fab4bcddc"},{"_id":"54bae4eda868bc6fab4bcd67","name":"помещение в карцер (бункер)","parent":"54bae4eca868bc6fab4bcd64","__v":0,"id":"54bae4eda868bc6fab4bcd67"},{"_id":"54bae962a868bc3ec7fb5ad3","name":"эмиграция в другие страны (в том числе «вербовка»)","parent":"54bae95ea868bc3ec7fb5acd","__v":0,"id":"54bae962a868bc3ec7fb5ad3"},{"_id":"54bae4f3a868bc6fab4bcd74","name":"зоны (бараки) иных категорий заключенных","parent":"54bae4f2a868bc6fab4bcd72","__v":0,"id":"54bae4f3a868bc6fab4bcd74"},{"_id":"54bae99ca868bc3ec7fb5ad8","name":"Фильтрация","parent":"54bad419a868bca4e8cc65ca","__v":0,"id":"54bae99ca868bc3ec7fb5ad8"},{"_id":"54bae961a868bc3ec7fb5ad1","name":"встреча с советскими войсками","parent":"54bae960a868bc3ec7fb5ad0","__v":0,"id":"54bae961a868bc3ec7fb5ad1"},{"_id":"54bae4f5a868bc6fab4bcd7a","name":"Лагерь при заводе (или ином объекте)  для рабочей команды","parent":"54bae4f3a868bc6fab4bcd76","__v":0,"id":"54bae4f5a868bc6fab4bcd7a"},{"_id":"54bae99ea868bc3ec7fb5adb","name":"пересыльные пункты советские В ДАЛЬНЕЙШЕМ ОБЪЕДИНИТЬ С фильтрационными лагерями","parent":"54bae99ca868bc3ec7fb5ad8","__v":0,"id":"54bae99ea868bc3ec7fb5adb"},{"_id":"54bae4f4a868bc6fab4bcd78","name":"Сортировка (по физ состоянию, отсылка в ревир, крематорий и т.д.)","parent":"54bae4f3a868bc6fab4bcd76","__v":0,"id":"54bae4f4a868bc6fab4bcd78"},{"_id":"54bae9a1a868bc3ec7fb5ae0","name":"справки (выдача документов о пребывании в Германии, проверены, сожгли документы, назначения и пр.)","parent":"54bae99fa868bc3ec7fb5ade","__v":0,"id":"54bae9a1a868bc3ec7fb5ae0"},{"_id":"54bae4fda868bc6fab4bcd8d","name":"Внутрилагерные работы (в т.ч. крематорий)","parent":"54bae4f0a868bc6fab4bcd6d","__v":0,"id":"54bae4fda868bc6fab4bcd8d"},{"_id":"54bae521a868bc6fab4bcdda","name":"Публичный дом, принудительная проституция","parent":"54bae4f0a868bc6fab4bcd6d","__v":0,"id":"54bae521a868bc6fab4bcdda"},{"_id":"54bae4fda868bc6fab4bcd8e","name":"общее - хозяйственно-земляные работы","parent":"54bae4fda868bc6fab4bcd8d","__v":0,"id":"54bae4fda868bc6fab4bcd8e"},{"_id":"54bae964a868bc3ec7fb5ad7","name":"День Победы, 8-9 мая 1945","parent":"54bae95da868bc3ec7fb5acb","__v":0,"id":"54bae964a868bc3ec7fb5ad7"},{"_id":"54bae500a868bc6fab4bcd95","name":"погрузка угля, песка, строительство дорог","parent":"54bae4fda868bc6fab4bcd8d","__v":0,"id":"54bae500a868bc6fab4bcd95"},{"_id":"54bae522a868bc6fab4bcddb","name":"Сопротивление:","parent":"54bae4f0a868bc6fab4bcd6d","__v":0,"id":"54bae522a868bc6fab4bcddb"},{"_id":"54bae9a3a868bc3ec7fb5ae4","name":"демобилизация из армии  (с ID10)","parent":"54bae9a1a868bc3ec7fb5ae1","__v":0,"id":"54bae9a3a868bc3ec7fb5ae4"},{"_id":"54bae507a868bc6fab4bcda5","name":"любовь, разлука, сексуальные отношения","parent":"54bae506a868bc6fab4bcda3","__v":0,"id":"54bae507a868bc6fab4bcda5"},{"_id":"54bae520a868bc6fab4bcdd8","name":"крематорий (введено 15.10.2014 для ID19) и сжигание в ямах","parent":"54bae51fa868bc6fab4bcdd5","__v":0,"id":"54bae520a868bc6fab4bcdd8"},{"_id":"54bae50aa868bc6fab4bcdac","name":"всякие национальности (без вычленения)","parent":"54bae50aa868bc6fab4bcdab","__v":0,"id":"54bae50aa868bc6fab4bcdac"},{"_id":"54bae517a868bc6fab4bcdc6","name":"Дети в лагере","parent":"54bae4f0a868bc6fab4bcd6d","__v":0,"id":"54bae517a868bc6fab4bcdc6"},{"_id":"54baea79a868bc81751d8ad5","name":"Транспортировка в СССР (отправка, отъезд)","parent":"54baea79a868bc81751d8ad4","__v":0,"id":"54baea79a868bc81751d8ad5"},{"_id":"54bae99da868bc3ec7fb5ad9","name":"Передача в советскую зону (в том числе случайный самостоятельный переход)","parent":"54bae99ca868bc3ec7fb5ad8","__v":0,"id":"54bae99da868bc3ec7fb5ad9"},{"_id":"54bae514a868bc6fab4bcdc0","name":"латыши","parent":"54bae50aa868bc6fab4bcdab","__v":0,"id":"54bae514a868bc6fab4bcdc0"},{"_id":"54bae99fa868bc3ec7fb5ade","name":"СМЕРШ","parent":"54bae99ca868bc3ec7fb5ad8","__v":0,"id":"54bae99fa868bc3ec7fb5ade"},{"_id":"54bae515a868bc6fab4bcdc2","name":"татары","parent":"54bae50aa868bc6fab4bcdab","__v":0,"id":"54bae515a868bc6fab4bcdc2"},{"_id":"54baea7ba868bc81751d8ad7","name":"Получение документов, прописки","parent":"54baea7aa868bc81751d8ad6","__v":0,"id":"54baea7ba868bc81751d8ad7"},{"_id":"54bae963a868bc3ec7fb5ad6","name":"Отношение  бывших узников и OSTов с немцами /и прочими после освобождения, по пути транспортировки/ - гражданским населением","parent":"54bae95da868bc3ec7fb5acb","__v":0,"id":"54bae963a868bc3ec7fb5ad6"},{"_id":"54bae9a1a868bc3ec7fb5ae1","name":"служба в советской армии","parent":"54bae99ca868bc3ec7fb5ad8","__v":0,"id":"54bae9a1a868bc3ec7fb5ae1"},{"_id":"54baea7ca868bc81751d8ad9","name":"Контакты с НКВД (МВД), МГБ и советскими партийными органами","parent":"54baea79a868bc81751d8ad4","__v":0,"id":"54baea7ca868bc81751d8ad9"},{"_id":"54bae963a868bc3ec7fb5ad5","name":"Отношение советских войск к освобожденным узникам и OSTам","parent":"54bae95da868bc3ec7fb5acb","__v":0,"id":"54bae963a868bc3ec7fb5ad5"},{"_id":"54bae9a3a868bc3ec7fb5ae5","name":"переписка после освобождения до возвращения","parent":"54bae99ca868bc3ec7fb5ad8","__v":0,"id":"54bae9a3a868bc3ec7fb5ae5"},{"_id":"54baea7da868bc81751d8adc","name":"Помощь НКВД, МГБ, советских партийных органов","parent":"54baea7ca868bc81751d8ad9","__v":0,"id":"54baea7da868bc81751d8adc"},{"_id":"54baea79a868bc81751d8ad4","name":"Репатриация","parent":"54bae9e6a868bc3ec7fb5ae6","__v":0,"id":"54baea79a868bc81751d8ad4"},{"_id":"54baea82a868bc81751d8ae4","name":"работа и карьера","parent":"54baea80a868bc81751d8ae2","__v":0,"id":"54baea82a868bc81751d8ae4"},{"_id":"54baea80a868bc81751d8ae2","name":"Социализация","parent":"54baea79a868bc81751d8ad4","__v":0,"id":"54baea80a868bc81751d8ae2"},{"_id":"54bae493a868bc6fab4bcc30","name":"Проживание / место проживания","parent":"54bad419a868bca4e8cc65ca","__v":0,"id":"54bae493a868bc6fab4bcc30"},{"_id":"54bae99ea868bc3ec7fb5adc","name":"фильтрационные лагеря","parent":"54bae99ca868bc3ec7fb5ad8","__v":0,"id":"54bae99ea868bc3ec7fb5adc"},{"_id":"54baea7aa868bc81751d8ad6","name":"Устройство жизни на новом месте","parent":"54baea79a868bc81751d8ad4","__v":0,"id":"54baea7aa868bc81751d8ad6"},{"_id":"54baea7ca868bc81751d8ada","name":"Вступление в партию, комсомол (в том числе попытки или неприятие)","parent":"54baea7ca868bc81751d8ad9","__v":0,"id":"54baea7ca868bc81751d8ada"},{"_id":"54baea7fa868bc81751d8adf","name":"Семейные отношения (брак, вдовство, одиночество, сексуальные отношения)","parent":"54baea7ea868bc81751d8add","__v":0,"id":"54baea7fa868bc81751d8adf"},{"_id":"54baea83a868bc81751d8ae6","name":"В городе","parent":"54baea82a868bc81751d8ae5","__v":0,"id":"54baea83a868bc81751d8ae6"},{"_id":"54baea87a868bc81751d8aee","name":"арест","parent":"54baea86a868bc81751d8aec","__v":0,"id":"54baea87a868bc81751d8aee"},{"_id":"54baea85a868bc81751d8aeb","name":"Голод 1946—1947","parent":"54baea79a868bc81751d8ad4","__v":0,"id":"54baea85a868bc81751d8aeb"},{"_id":"54b8f2c3a868bc4fd8ca4a4d","name":"Город (если сельский быт на окраине города — то в деревню)","description":"","parent":"54b8f28aa868bc4fd8ca4a4b","__v":0,"id":"54b8f2c3a868bc4fd8ca4a4d"},{"_id":"54baeaaca868bc81751d8af4","name":"Упоминание о действующих национально-освободительных и военных формированиях  (например, упоминание про бандеровцев, но не участие, сюда же упоминаемое отношение)","parent":"54baeaaca868bc81751d8af3","__v":0,"id":"54baeaaca868bc81751d8af4"},{"_id":"54baea84a868bc81751d8ae9","name":"В городе","parent":"54baea84a868bc81751d8ae8","__v":0,"id":"54baea84a868bc81751d8ae9"},{"_id":"54baeab1a868bc81751d8afc","name":"отношение к  власти / оценка, переоценка/ ( к войне, репрессиям, деятельности руководящих и партийных органов, политическим деятелям)","parent":"54baeab0a868bc81751d8afb","__v":0,"id":"54baeab1a868bc81751d8afc"},{"_id":"54b8f28aa868bc4fd8ca4a4b","name":"Организация повседневной жизни","description":"","parent":"54b8f267a868bc4fd8ca4a49","__v":0,"id":"54b8f28aa868bc4fd8ca4a4b"},{"_id":"54baea8aa868bc81751d8af2","name":"иное (принудительный труд как последствие фильтрации) например, на восстановлении шахт Донбасса, с лишением документов ; при  попытке побега как дезертиры оказывались в лагерях","parent":"54baea86a868bc81751d8aec","__v":0,"id":"54baea8aa868bc81751d8af2"},{"_id":"54b8f2b2a868bc4fd8ca4a4c","name":"Снабжение продовольствием, в т.ч. карточная система","description":"","parent":"54b8f267a868bc4fd8ca4a49","__v":0,"id":"54b8f2b2a868bc4fd8ca4a4c"},{"_id":"54bae51aa868bc6fab4bcdcc","name":"травматология","parent":"54bae519a868bc6fab4bcdc9","__v":0,"id":"54bae51aa868bc6fab4bcdcc"},{"_id":"54bae521a868bc6fab4bcdd9","name":"затопление барж с узниками и пр.; при подходе советских войск","parent":"54bae51fa868bc6fab4bcdd5","__v":0,"id":"54bae521a868bc6fab4bcdd9"},{"_id":"54bae51aa868bc6fab4bcdcd","name":"психические травмы","parent":"54bae519a868bc6fab4bcdc9","__v":0,"id":"54bae51aa868bc6fab4bcdcd"},{"_id":"54bae95ea868bc3ec7fb5acd","name":"Освобождение союзническими войсками","parent":"54bae95da868bc3ec7fb5acb","__v":0,"id":"54bae95ea868bc3ec7fb5acd"},{"_id":"54b8f46fa868bc7ce1755372","name":"Образование и воспитание","description":"","parent":"54b8f267a868bc4fd8ca4a49","__v":0,"id":"54b8f46fa868bc7ce1755372"},{"_id":"54b8f2d4a868bc4fd8ca4a4e","name":"Сельская местность","description":"","parent":"54b8f28aa868bc4fd8ca4a4b","__v":0,"id":"54b8f2d4a868bc4fd8ca4a4e"},{"_id":"54b8f75da868bc87881bb786","name":"Комсомол","description":"","parent":"54b8f74ba868bc87881bb784","__v":0,"id":"54b8f75da868bc87881bb786"},{"_id":"54bae962a868bc3ec7fb5ad4","name":"Отношение советских войск к местному населению","parent":"54bae95da868bc3ec7fb5acb","__v":0,"id":"54bae962a868bc3ec7fb5ad4"},{"_id":"54bae95fa868bc3ec7fb5ace","name":"встреча с союзниками","parent":"54bae95ea868bc3ec7fb5acd","__v":0,"id":"54bae95fa868bc3ec7fb5ace"},{"_id":"54bae95da868bc3ec7fb5acb","name":"Освобождение","parent":"54bad419a868bca4e8cc65ca","__v":0,"id":"54bae95da868bc3ec7fb5acb"},{"_id":"54bae51ea868bc6fab4bcdd4","name":"помещение в карцер (бункер)","parent":"54bae51da868bc6fab4bcdd1","__v":0,"id":"54bae51ea868bc6fab4bcdd4"},{"_id":"54bae961a868bc3ec7fb5ad2","name":"сборно-пересыльные лагеря перемещенных лиц (союзнические) (американские и т. п.; в том  числе русские финской войны - «шведы»)","parent":"54bae95ea868bc3ec7fb5acd","__v":0,"id":"54bae961a868bc3ec7fb5ad2"},{"_id":"54bae9a0a868bc3ec7fb5adf","name":"допросы","parent":"54bae99fa868bc3ec7fb5ade","__v":0,"id":"54bae9a0a868bc3ec7fb5adf"},{"_id":"54bae9a2a868bc3ec7fb5ae3","name":"на территории СССР (с ID10)","parent":"54bae9a1a868bc3ec7fb5ae1","__v":0,"id":"54bae9a2a868bc3ec7fb5ae3"},{"_id":"54bae9e6a868bc3ec7fb5ae6","name":"Возвращение в СССР, современность","parent":"","description":"laljalskdfjalsdf","__v":0,"id":"54bae9e6a868bc3ec7fb5ae6"},{"_id":"54baea81a868bc81751d8ae3","name":"образование","parent":"54baea80a868bc81751d8ae2","__v":0,"id":"54baea81a868bc81751d8ae3"},{"_id":"54baea86a868bc81751d8aec","name":"Репрессии","parent":"54baea79a868bc81751d8ad4","__v":0,"id":"54baea86a868bc81751d8aec"},{"_id":"54b8f32ca868bc2304d90677","name":"Город","description":"","parent":"54b8f2b2a868bc4fd8ca4a4c","__v":0,"id":"54b8f32ca868bc2304d90677"},{"_id":"54b8f74ba868bc87881bb784","name":"Молодежные организации","description":"","parent":"54b8f46fa868bc7ce1755372","__v":0,"id":"54b8f74ba868bc87881bb784"},{"_id":"54b8f423a868bc7ce1755370","name":"Коллективизация, колхозы","description":"","parent":"54b8f267a868bc4fd8ca4a49","__v":0,"id":"54b8f423a868bc7ce1755370"},{"_id":"54b8f33aa868bc2304d90678","name":"Сельская местность","description":"","parent":"54b8f2b2a868bc4fd8ca4a4c","__v":0,"id":"54b8f33aa868bc2304d90678"},{"_id":"54b8f43fa868bc7ce1755371","name":"Голод в 20-30-е годы","description":"","parent":"54b8f267a868bc4fd8ca4a49","__v":0,"id":"54b8f43fa868bc7ce1755371"},{"_id":"54b8fb41a868bcacb1e16992","name":"Воспитание в семье","description":"","parent":"54b8f46fa868bc7ce1755372","__v":0,"id":"54b8fb41a868bcacb1e16992"},{"_id":"54b8fb20a868bcacb1e16990","name":"Идеологическое воспитание","description":"","parent":"54b8f46fa868bc7ce1755372","__v":0,"id":"54b8fb20a868bcacb1e16990"},{"_id":"54b90358a868bcb9a6c11bea","name":"Политические репрессии","description":"","parent":"54b8f267a868bc4fd8ca4a49","__v":0,"id":"54b90358a868bcb9a6c11bea"},{"_id":"54b90337a868bcb9a6c11be7","name":"Религия","description":"","parent":"54b8f267a868bc4fd8ca4a49","__v":0,"id":"54b90337a868bcb9a6c11be7"},{"_id":"54b984f5a868bc8ef1307b4c","name":"Депортации","parent":"54b984b2a868bcf41d8fa713","description":"","__v":0,"id":"54b984f5a868bc8ef1307b4c"},{"_id":"54b8f485a868bc7ce1755373","name":"Школа","description":"","parent":"54b8f46fa868bc7ce1755372","__v":0,"id":"54b8f485a868bc7ce1755373"},{"_id":"54b985c8a868bc7952ea751a","name":"Паника","parent":"54b98512a868bc8ef1307b4f","description":"","__v":0,"id":"54b985c8a868bc7952ea751a"},{"_id":"54b986b4a868bc31dfb76071","name":"Военные действия (армия)","parent":"54b984b2a868bcf41d8fa713","description":"","__v":0,"id":"54b986b4a868bc31dfb76071"},{"_id":"54b98602a868bc70829a8561","name":"Государственных учреждений","parent":"54b985e7a868bc7952ea751d","description":"","__v":0,"id":"54b98602a868bc70829a8561"},{"_id":"54b9850fa868bc8ef1307b4e","name":"Начало войны, 22 июня 1941 г.","parent":"54b984b2a868bcf41d8fa713","description":"","__v":0,"id":"54b9850fa868bc8ef1307b4e"},{"_id":"54b98771a868bc12403f2b01","name":"В \"регулярных\" войсках","parent":"54b986b4a868bc31dfb76070","description":"","__v":0,"id":"54b98771a868bc12403f2b01"},{"_id":"54ba9bf4a868bc317a7aff07","name":"евреев (в том числе расстрелы)","parent":"54ba9bc9a868bc317a7aff04","description":"","__v":0,"id":"54ba9bf4a868bc317a7aff07"},{"_id":"54ba9baca868bc317a7aff02","name":"западные украинцы","parent":"54ba9b5fa868bc317a7afefb","description":"","__v":0,"id":"54ba9baca868bc317a7aff02"},{"_id":"54ba9b80a868bc317a7afefd","name":"Итальянцы","parent":"54ba9b5fa868bc317a7afefb","description":"","__v":0,"id":"54ba9b80a868bc317a7afefd"},{"_id":"54ba9c11a868bc317a7aff0c","name":"Расстрелы, повешения","parent":"54ba9bf4a868bc317a7aff07","description":"","__v":0,"id":"54ba9c11a868bc317a7aff0c"},{"_id":"54b8f41ca868bc7ce175536f","name":"Болезни, медицина","description":"","parent":"54b8f267a868bc4fd8ca4a49","__v":0,"id":"54b8f41ca868bc7ce175536f"},{"_id":"54b8facea868bc2b8276ad2a","name":"Прочие","description":"","parent":"54b8f74ba868bc87881bb784","__v":0,"id":"54b8facea868bc2b8276ad2a"},{"_id":"54b903aca868bcb9a6c11bec","name":"раскулачивание и высылка ","description":"","parent":"54b90358a868bcb9a6c11bea","__v":0,"id":"54b903aca868bcb9a6c11bec"},{"_id":"54b9000ba868bcfde92a36eb","name":"Национальная политика, русификация, русский язык","description":"","parent":"54b8f267a868bc4fd8ca4a49","__v":0,"id":"54b9000ba868bcfde92a36eb"},{"_id":"54b984b2a868bcf41d8fa713","name":"Война и оккупация","parent":"","description":"","__v":0,"id":"54b984b2a868bcf41d8fa713"},{"_id":"54b98616a868bc70829a8563","name":"Партийных органов","parent":"54b985e7a868bc7952ea751d","description":"","__v":0,"id":"54b98616a868bc70829a8563"},{"_id":"54b9864fa868bc70829a8566","name":"Бомбежки, военные действия (упоминание, описание стороннее)","parent":"54b98512a868bc8ef1307b4f","description":"","__v":0,"id":"54b9864fa868bc70829a8566"},{"_id":"54b9855aa868bc7952ea7516","name":"Изменения в быту с началом войны","parent":"54b98512a868bc8ef1307b4f","description":"","__v":0,"id":"54b9855aa868bc7952ea7516"},{"_id":"54b8f49fa868bc7ce1755375","name":"ВУЗы","description":"","parent":"54b8f46fa868bc7ce1755372","__v":0,"id":"54b8f49fa868bc7ce1755375"},{"_id":"54ba9ba1a868bc317a7aff01","name":"словаки","parent":"54ba9b5fa868bc317a7afefb","description":"","__v":0,"id":"54ba9ba1a868bc317a7aff01"},{"_id":"54b984e8a868bc8ef1307b4b","name":"Вооруженные конфликты с Японией (Халкин-Гол; оз. Хасан) и в 1945","parent":"54b984b2a868bcf41d8fa713","description":"","__v":0,"id":"54b984e8a868bc8ef1307b4b"},{"_id":"54b9877da868bc12403f2b03","name":"Самостоятельный выход из окружения (в том числе в гражданской одежде)","parent":"54b986b4a868bc31dfb76070","description":"","__v":0,"id":"54b9877da868bc12403f2b03"},{"_id":"54b90362a868bcb9a6c11beb","name":"Чистки, аресты, расстрелы","description":"","parent":"54b90358a868bcb9a6c11bea","__v":0,"id":"54b90362a868bcb9a6c11beb"},{"_id":"54ba9bcda868bc317a7aff06","name":"казни неназванных категорий населения","parent":"54ba9bbaa868bc317a7aff03","description":"","__v":0,"id":"54ba9bcda868bc317a7aff06"},{"_id":"54ba9b72a868bc317a7afefc","name":"Немцы","parent":"54ba9b5fa868bc317a7afefb","description":"","__v":0,"id":"54ba9b72a868bc317a7afefc"},{"_id":"54b903d0a868bc4c5cf78a0a","name":"депортация","description":"","parent":"54b90358a868bcb9a6c11bea","__v":0,"id":"54b903d0a868bc4c5cf78a0a"},{"_id":"54b98615a868bc70829a8562","name":"Промышленности","parent":"54b985e7a868bc7952ea751d","description":"","__v":0,"id":"54b98615a868bc70829a8562"},{"_id":"54b9856ca868bc7952ea7517","name":"Снабжение продовольствием, Карточная система 1941-1945","parent":"54b98512a868bc8ef1307b4f","description":"","__v":0,"id":"54b9856ca868bc7952ea7517"},{"_id":"54b985dba868bc7952ea751c","name":"Учеба в тылу","parent":"54b98512a868bc8ef1307b4f","description":"","__v":0,"id":"54b985dba868bc7952ea751c"},{"_id":"54b984caa868bc8ef1307b4a","name":"Финская война, мобилизация","parent":"54b984b2a868bcf41d8fa713","description":"","__v":0,"id":"54b984caa868bc8ef1307b4a"},{"_id":"54b8f751a868bc87881bb785","name":"Пионерская организация","description":"","parent":"54b8f74ba868bc87881bb784","__v":0,"id":"54b8f751a868bc87881bb785"},{"_id":"54b90351a868bcb9a6c11be9","name":"Настроения общества перед войной","description":"","parent":"54b8f267a868bc4fd8ca4a49","__v":0,"id":"54b90351a868bcb9a6c11be9"},{"_id":"54b98616a868bc70829a8564","name":"Гражданского населения","parent":"54b985e7a868bc7952ea751d","description":"","__v":0,"id":"54b98616a868bc70829a8564"},{"_id":"54b98512a868bc8ef1307b4f","name":"Тыловая повседневность","parent":"54b984b2a868bcf41d8fa713","description":"","__v":0,"id":"54b98512a868bc8ef1307b4f"},{"_id":"54b9877da868bc12403f2b02","name":"Участие в ополчении","parent":"54b986b4a868bc31dfb76070","description":"","__v":0,"id":"54b9877da868bc12403f2b02"},{"_id":"54ba9b81a868bc317a7afeff","name":"румыны","parent":"54ba9b5fa868bc317a7afefb","description":"","__v":0,"id":"54ba9b81a868bc317a7afeff"},{"_id":"54ba9bf4a868bc317a7aff08","name":"коммунистов и активистов, членов их семей (в том числе казни)","parent":"54ba9bc9a868bc317a7aff04","description":"","__v":0,"id":"54ba9bf4a868bc317a7aff08"},{"_id":"54b985c0a868bc7952ea7519","name":"Грабежи","parent":"54b98512a868bc8ef1307b4f","description":"","__v":0,"id":"54b985c0a868bc7952ea7519"},{"_id":"54ba9b30a868bc317a7afefa","name":"Оккупация","parent":"54b984b2a868bcf41d8fa713","description":"","__v":0,"id":"54ba9b30a868bc317a7afefa"},{"_id":"54b903dfa868bc4c5cf78a0b","name":"Сотрудничество с НКВД (или уклонение от такового)","description":"","parent":"54b90358a868bcb9a6c11bea","__v":0,"id":"54b903dfa868bc4c5cf78a0b"},{"_id":"54b986b4a868bc31dfb76070","name":"Участие в военных действиях (не только респондента, но других героев рассказа)","parent":"54b986b4a868bc31dfb76071","description":"","__v":0,"id":"54b986b4a868bc31dfb76070"},{"_id":"54b8fb4aa868bcacb1e16993","name":"Детский дом","description":"","parent":"54b8f46fa868bc7ce1755372","__v":0,"id":"54b8fb4aa868bcacb1e16993"},{"_id":"54b9875ea868bc98a53dfc2a","name":"Пленение","parent":"54b986b4a868bc31dfb76071","description":"","__v":0,"id":"54b9875ea868bc98a53dfc2a"},{"_id":"54b985d5a868bc7952ea751b","name":"Работа в тылу","parent":"54b98512a868bc8ef1307b4f","description":"","__v":0,"id":"54b985d5a868bc7952ea751b"},{"_id":"54ba9bbaa868bc317a7aff03","name":"Репрессии оккупационных властей","parent":"54ba9b30a868bc317a7afefa","description":"","__v":0,"id":"54ba9bbaa868bc317a7aff03"},{"_id":"54ba9b80a868bc317a7afefe","name":"Венгры","parent":"54ba9b5fa868bc317a7afefb","description":"","__v":0,"id":"54ba9b80a868bc317a7afefe"},{"_id":"54ba9c70a868bc317a7aff13","name":"карательные операции","parent":"54ba9c45a868bc317a7aff0e","description":"","__v":0,"id":"54ba9c70a868bc317a7aff13"},{"_id":"54ba9bf4a868bc317a7aff09","name":"гражданских лиц без документов","parent":"54ba9bc9a868bc317a7aff04","description":"","__v":0,"id":"54ba9bf4a868bc317a7aff09"},{"_id":"54ba9c3fa868bc317a7aff0d","name":"военнопленные","parent":"54ba9bcda868bc317a7aff05","description":"","__v":0,"id":"54ba9c3fa868bc317a7aff0d"},{"_id":"54ba9bc9a868bc317a7aff04","name":"Против мирного населения:","parent":"54ba9bbaa868bc317a7aff03","description":"","__v":0,"id":"54ba9bc9a868bc317a7aff04"},{"_id":"54b8fac0a868bc2b8276ad29","name":"Военно-спортивные, военная подготовка","description":"","parent":"54b8f74ba868bc87881bb784","__v":0,"id":"54b8fac0a868bc2b8276ad29"},{"_id":"54ba9c45a868bc317a7aff0e","name":"партизаны и участники сопротивления ( в том числе гестапо, избиения)","parent":"54ba9bcda868bc317a7aff05","description":"","__v":0,"id":"54ba9c45a868bc317a7aff0e"},{"_id":"54ba9c5ba868bc317a7aff10","name":"карательные операции (например, против десанта)","parent":"54ba9c3fa868bc317a7aff0d","description":"","__v":0,"id":"54ba9c5ba868bc317a7aff10"},{"_id":"54ba9c11a868bc317a7aff0b","name":"Гетто","parent":"54ba9bf4a868bc317a7aff07","description":"","__v":0,"id":"54ba9c11a868bc317a7aff0b"},{"_id":"54ba9c70a868bc317a7aff12","name":" тюрьмы, Гестапо, наказания  (в том числе аресты, избиения, пытки, режим, казни)","parent":"54ba9c45a868bc317a7aff0e","description":"","__v":0,"id":"54ba9c70a868bc317a7aff12"},{"_id":"54b8fff8a868bcfde92a36ea","name":"Иное","description":"","parent":"54b8f46fa868bc7ce1755372","__v":0,"id":"54b8fff8a868bcfde92a36ea"},{"_id":"54b903e7a868bc4c5cf78a0c","name":"ГУЛАГ","description":"","parent":"54b90358a868bcb9a6c11bea","__v":0,"id":"54b903e7a868bc4c5cf78a0c"},{"_id":"54ba9ceea868bc317a7aff17","name":"надзиратели","parent":"54ba9ce7a868bc317a7aff15","description":"","__v":0,"id":"54ba9ceea868bc317a7aff17"},{"_id":"54b984f9a868bc8ef1307b4d","name":"Трудармия","parent":"54b984b2a868bcf41d8fa713","description":"","__v":0,"id":"54b984f9a868bc8ef1307b4d"},{"_id":"54b9033ca868bcb9a6c11be8","name":"Работа, профессия","description":"","parent":"54b8f267a868bc4fd8ca4a49","__v":0,"id":"54b9033ca868bcb9a6c11be8"},{"_id":"54b985e7a868bc7952ea751d","name":"Эвакуация","parent":"54b98512a868bc8ef1307b4f","description":"","__v":0,"id":"54b985e7a868bc7952ea751d"},{"_id":"54b98616a868bc70829a8565","name":"Мобилизация","parent":"54b98512a868bc8ef1307b4f","description":"","__v":0,"id":"54b98616a868bc70829a8565"},{"_id":"54b98755a868bc98a53dfc29","name":"Этапирование задержанных (воннопленных, гражданских без документов и т.п.) до сборного пункта","parent":"54b986b4a868bc31dfb76071","description":"","__v":0,"id":"54b98755a868bc98a53dfc29"},{"_id":"54ba9c5ba868bc317a7aff11","name":"евреи военнопленные (издевательства, казни)","parent":"54ba9c3fa868bc317a7aff0d","description":"","__v":0,"id":"54ba9c5ba868bc317a7aff11"},{"_id":"54ba9b5fa868bc317a7afefb","name":"Образ оккупанта (т. е. военных, хотя бы венгры армейские действовали на территории Венгрии)","parent":"54ba9b30a868bc317a7afefa","description":"","__v":0,"id":"54ba9b5fa868bc317a7afefb"},{"_id":"54ba9bcda868bc317a7aff05","name":"Против военных:","parent":"54ba9bbaa868bc317a7aff03","description":"","__v":0,"id":"54ba9bcda868bc317a7aff05"},{"_id":"54ba9bf7a868bc317a7aff0a","name":"цыган","parent":"54ba9bc9a868bc317a7aff04","description":"","__v":0,"id":"54ba9bf7a868bc317a7aff0a"},{"_id":"54b98572a868bc7952ea7518","name":"Хаос начала войны","parent":"54b98512a868bc8ef1307b4f","description":"","__v":0,"id":"54b98572a868bc7952ea7518"},{"_id":"54ba9ceba868bc317a7aff16","name":"администрация","parent":"54ba9ce7a868bc317a7aff15","description":"","__v":0,"id":"54ba9ceba868bc317a7aff16"},{"_id":"54ba9c55a868bc317a7aff0f","name":"тюрьмы, Гестапо, наказания  (в том числе избиения, пытки, режим, казни)","parent":"54ba9c3fa868bc317a7aff0d","description":"","__v":0,"id":"54ba9c55a868bc317a7aff0f"},{"_id":"54ba9d63a868bc317a7aff24","name":"лазарет","parent":"54ba9d59a868bc317a7aff21","description":"","__v":0,"id":"54ba9d63a868bc317a7aff24"},{"_id":"54ba9b81a868bc317a7aff00","name":"чехи","parent":"54ba9b5fa868bc317a7afefb","description":"","__v":0,"id":"54ba9b81a868bc317a7aff00"},{"_id":"54ba9d29a868bc317a7aff1d","name":"дезинфекция","parent":"54ba9d02a868bc317a7aff19","description":"","__v":0,"id":"54ba9d29a868bc317a7aff1d"},{"_id":"54ba9ce7a868bc317a7aff15","name":"Администрация и обслуживание лагеря","parent":"54ba9ccba868bc317a7aff14","description":"","__v":0,"id":"54ba9ce7a868bc317a7aff15"},{"_id":"54ba9d94a868bc317a7aff28","name":"мусульмане (в прямом смысле)","parent":"54ba9d78a868bc317a7aff26","description":"","__v":0,"id":"54ba9d94a868bc317a7aff28"},{"_id":"54ba9d0ba868bc317a7aff1b","name":"лагерь и окрестности","parent":"54ba9d01a868bc317a7aff18","description":"","__v":0,"id":"54ba9d0ba868bc317a7aff1b"},{"_id":"54ba9df2a868bc317a7aff2e","name":"побеги","parent":"54ba9ddba868bc317a7aff2c","description":"","__v":0,"id":"54ba9df2a868bc317a7aff2e"},{"_id":"54ba9da3a868bc317a7aff29","name":"общие болезни","parent":"54ba9d59a868bc317a7aff23","description":"","__v":0,"id":"54ba9da3a868bc317a7aff29"},{"_id":"54ba9d78a868bc317a7aff27","name":"евреи","parent":"54ba9d78a868bc317a7aff26","description":"","__v":0,"id":"54ba9d78a868bc317a7aff27"},{"_id":"54ba9e39a868bc317a7aff33","name":"помощь евреям","parent":"54ba9e1da868bc317a7aff2f","description":"","__v":0,"id":"54ba9e39a868bc317a7aff33"},{"_id":"54ba9d43a868bc317a7aff1f","name":"лагерный паек","parent":"54ba9d39a868bc317a7aff1e","description":"","__v":0,"id":"54ba9d43a868bc317a7aff1f"},{"_id":"54ba9eaaa868bc317a7aff3d","name":"Работа на оккупированной территории (в том числе биржа труда)","parent":"54ba9b30a868bc317a7afefa","description":"","__v":0,"id":"54ba9eaaa868bc317a7aff3d"},{"_id":"54ba9f29a868bc317a7aff47","name":"церковь","parent":"54ba9eaaa868bc317a7aff3e","description":"","__v":0,"id":"54ba9f29a868bc317a7aff47"},{"_id":"54ba9f45a868bc317a7aff4c","name":"иное ","parent":"54ba9eaaa868bc317a7aff3e","description":"","__v":0,"id":"54ba9f45a868bc317a7aff4c"},{"_id":"54ba9eeaa868bc317a7aff43","name":"полиция (в т.ч. Доброволец в немецкой одежде)","parent":"54ba9eaaa868bc317a7aff3e","description":"","__v":0,"id":"54ba9eeaa868bc317a7aff43"},{"_id":"54ba9e70a868bc317a7aff38","name":"Дивизия СС «Галичина»","parent":"54ba9e52a868bc317a7aff36","description":"","__v":0,"id":"54ba9e70a868bc317a7aff38"},{"_id":"54ba9d01a868bc317a7aff18","name":"Топография лагеря и окрестностей","parent":"54ba9ccba868bc317a7aff14","description":"","__v":0,"id":"54ba9d01a868bc317a7aff18"},{"_id":"54ba9d59a868bc317a7aff21","name":"Внутрилагерные работы","parent":"54ba9ccba868bc317a7aff14","description":"","__v":0,"id":"54ba9d59a868bc317a7aff21"},{"_id":"54ba9d78a868bc317a7aff26","name":"межнациональные отношения:","parent":"54ba9d59a868bc317a7aff22","description":"","__v":0,"id":"54ba9d78a868bc317a7aff26"},{"_id":"54ba9d03a868bc317a7aff1a","name":"Повседневность","parent":"54ba9ccba868bc317a7aff14","description":"","__v":0,"id":"54ba9d03a868bc317a7aff1a"},{"_id":"54bad419a868bca4e8cc65ca","name":"Остарбайтеры в Германии","parent":"","description":"","__v":0,"id":"54bad419a868bca4e8cc65ca"},{"_id":"54ba9ea9a868bc317a7aff3c","name":"Болезни, медицина (не в больницах)","parent":"54ba9b30a868bc317a7afefa","description":"","__v":0,"id":"54ba9ea9a868bc317a7aff3c"},{"_id":"54ba9e1da868bc317a7aff30","name":"Сотрудничество с оккупационными властями","parent":"54ba9b30a868bc317a7afefa","description":"","__v":0,"id":"54ba9e1da868bc317a7aff30"},{"_id":"54ba9ec9a868bc317a7aff41","name":"в сельской местности","parent":"54ba9eaaa868bc317a7aff3d","description":"","__v":0,"id":"54ba9ec9a868bc317a7aff41"},{"_id":"54ba9e52a868bc317a7aff35","name":"выдача евреев, партизан, членов партии, беглых","parent":"54ba9e1da868bc317a7aff30","description":"","__v":0,"id":"54ba9e52a868bc317a7aff35"},{"_id":"54ba9ddba868bc317a7aff2b","name":"Наказания","parent":"54ba9ccba868bc317a7aff14","description":"","__v":0,"id":"54ba9ddba868bc317a7aff2b"},{"_id":"54ba9d39a868bc317a7aff1e","name":"питание","parent":"54ba9d03a868bc317a7aff1a","description":"","__v":0,"id":"54ba9d39a868bc317a7aff1e"},{"_id":"54ba9ccba868bc317a7aff14","name":"Сборный пункт для взятых в плен военных + гражданских (на оккупированной территории СССР)","parent":"54ba9b30a868bc317a7afefa","description":"","__v":0,"id":"54ba9ccba868bc317a7aff14"},{"_id":"54ba9eeaa868bc317a7aff46","name":"театры","parent":"54ba9eaaa868bc317a7aff3e","description":"","__v":0,"id":"54ba9eeaa868bc317a7aff46"},{"_id":"54ba9d02a868bc317a7aff19","name":"Регламентация лагерной жизни","parent":"54ba9ccba868bc317a7aff14","description":"","__v":0,"id":"54ba9d02a868bc317a7aff19"},{"_id":"54ba9d59a868bc317a7aff22","name":"Отношения между заключенными","parent":"54ba9ccba868bc317a7aff14","description":"","__v":0,"id":"54ba9d59a868bc317a7aff22"},{"_id":"54ba9e52a868bc317a7aff37","name":"РОА","parent":"54ba9e52a868bc317a7aff36","description":"","__v":0,"id":"54ba9e52a868bc317a7aff37"},{"_id":"54ba9ea9a868bc317a7aff3b","name":"голод и способы выживания (обмен, воровство, грабежи)","parent":"54ba9b30a868bc317a7afefa","description":"","__v":0,"id":"54ba9ea9a868bc317a7aff3b"},{"_id":"54badd15a868bcff4803cbd3","name":"облава","parent":"54badd14a868bcff4803cbd0","__v":0,"id":"54badd15a868bcff4803cbd3"},{"_id":"54ba9db6a868bc317a7aff2a","name":"Смерть и похороны","parent":"54ba9ccba868bc317a7aff14","description":"","__v":0,"id":"54ba9db6a868bc317a7aff2a"},{"_id":"54ba9e39a868bc317a7aff32","name":"Партизанское движение и подпольная деятельность","parent":"54ba9e1da868bc317a7aff2f","description":"","__v":0,"id":"54ba9e39a868bc317a7aff32"},{"_id":"54ba9d59a868bc317a7aff23","name":"Болезни, медицина","parent":"54ba9ccba868bc317a7aff14","description":"","__v":0,"id":"54ba9d59a868bc317a7aff23"},{"_id":"54ba9ddba868bc317a7aff2c","name":"Сопротивление","parent":"54ba9ccba868bc317a7aff14","description":"","__v":0,"id":"54ba9ddba868bc317a7aff2c"},{"_id":"54ba9eaaa868bc317a7aff3f","name":"медицинские учреждения","parent":"54ba9eaaa868bc317a7aff3e","description":"","__v":0,"id":"54ba9eaaa868bc317a7aff3f"},{"_id":"54ba9f61a868bc317a7aff4f","name":"Политические настроения во время войны","parent":"54ba9f5ba868bc317a7aff4d","description":"","__v":0,"id":"54ba9f61a868bc317a7aff4f"},{"_id":"54ba9eeaa868bc317a7aff42","name":"местная администрация","parent":"54ba9eaaa868bc317a7aff3e","description":"","__v":0,"id":"54ba9eeaa868bc317a7aff42"},{"_id":"54ba9d14a868bc317a7aff1c","name":"зоны (бараки) иных категорий заключенных","parent":"54ba9d01a868bc317a7aff18","description":"","__v":0,"id":"54ba9d14a868bc317a7aff1c"},{"_id":"54ba9d77a868bc317a7aff25","name":"взаимопомощь","parent":"54ba9d59a868bc317a7aff22","description":"","__v":0,"id":"54ba9d77a868bc317a7aff25"},{"_id":"54ba9f45a868bc317a7aff4b","name":"украинизация","parent":"54ba9eaaa868bc317a7aff3e","description":"","__v":0,"id":"54ba9f45a868bc317a7aff4b"},{"_id":"54ba9d4ea868bc317a7aff20","name":"условия жизни","parent":"54ba9d03a868bc317a7aff1a","description":"","__v":0,"id":"54ba9d4ea868bc317a7aff20"},{"_id":"54ba9f32a868bc317a7aff49","name":"агитация, газеты, листовки","parent":"54ba9eaaa868bc317a7aff3e","description":"","__v":0,"id":"54ba9f32a868bc317a7aff49"},{"_id":"54ba9e1da868bc317a7aff2f","name":"Сопротивление местного населения","parent":"54ba9b30a868bc317a7afefa","description":"","__v":0,"id":"54ba9e1da868bc317a7aff2f"},{"_id":"54ba9e39a868bc317a7aff34","name":"помощь партизанам (в том числе десанту и бывшим военным, окруженцам)","parent":"54ba9e1da868bc317a7aff2f","description":"","__v":0,"id":"54ba9e39a868bc317a7aff34"},{"_id":"54ba9ec9a868bc317a7aff40","name":"в городе","parent":"54ba9eaaa868bc317a7aff3d","description":"","__v":0,"id":"54ba9ec9a868bc317a7aff40"},{"_id":"54ba9e7aa868bc317a7aff39","name":"Иное","parent":"54ba9e52a868bc317a7aff36","description":"","__v":0,"id":"54ba9e7aa868bc317a7aff39"},{"_id":"54ba9eeaa868bc317a7aff44","name":"городские службы (управдом, например)","parent":"54ba9eaaa868bc317a7aff3e","description":"","__v":0,"id":"54ba9eeaa868bc317a7aff44"},{"_id":"54ba9f29a868bc317a7aff48","name":"торговля","parent":"54ba9eaaa868bc317a7aff3e","description":"","__v":0,"id":"54ba9f29a868bc317a7aff48"},{"_id":"54badd14a868bcff4803cbcf","name":"Отправка на принудительные работы","parent":"54bad419a868bca4e8cc65ca","__v":0,"id":"54badd14a868bcff4803cbcf"},{"_id":"54badd15a868bcff4803cbd7","name":"эшелон (для ОСТов), этапирование (не только ОСТОВ)","parent":"54badd15a868bcff4803cbd6","__v":0,"id":"54badd15a868bcff4803cbd7"},{"_id":"54ba9f5ba868bc317a7aff4d","name":"Настроения общества и идеология в военный период","parent":"54b984b2a868bcf41d8fa713","description":"","__v":0,"id":"54ba9f5ba868bc317a7aff4d"},{"_id":"54badd15a868bcff4803cbd4","name":"добровольный отъезд","parent":"54badd14a868bcff4803cbd0","__v":0,"id":"54badd15a868bcff4803cbd4"},{"_id":"54badd16a868bcff4803cbdd","name":"ОСТы","parent":"54badd16a868bcff4803cbdc","__v":0,"id":"54badd16a868bcff4803cbdd"},{"_id":"54badd15a868bcff4803cbd8","name":"питание","parent":"54badd15a868bcff4803cbd6","__v":0,"id":"54badd15a868bcff4803cbd8"},{"_id":"54badd15a868bcff4803cbd5","name":"случайность","parent":"54badd14a868bcff4803cbd0","__v":0,"id":"54badd15a868bcff4803cbd5"},{"_id":"54badd16a868bcff4803cbdc","name":"нашивки, винкели, лагерные номера","parent":"54badd16a868bcff4803cbdb","__v":0,"id":"54badd16a868bcff4803cbdc"},{"_id":"54badd14a868bcff4803cbd0","name":"Способы отправки","parent":"54badd14a868bcff4803cbcf","__v":0,"id":"54badd14a868bcff4803cbd0"},{"_id":"54badd16a868bcff4803cbda","name":"Способы избежать отправки в Германию","parent":"54badd14a868bcff4803cbcf","__v":0,"id":"54badd16a868bcff4803cbda"},{"_id":"54badd16a868bcff4803cbd9","name":"медицинское освидетельствование и санобработка","parent":"54badd15a868bcff4803cbd6","__v":0,"id":"54badd16a868bcff4803cbd9"},{"_id":"54ba9de4a868bc317a7aff2d","name":"Казни (в том числе потенциальные)","parent":"54ba9ddba868bc317a7aff2b","description":"","__v":0,"id":"54ba9de4a868bc317a7aff2d"},{"_id":"54badd17a868bcff4803cbe2","name":"гомосексуалисты","parent":"54badd16a868bcff4803cbdc","__v":0,"id":"54badd17a868bcff4803cbe2"},{"_id":"54ba9e52a868bc317a7aff36","name":"участие в созданных оккупационными властями военных формированиях","parent":"54ba9e1da868bc317a7aff30","description":"","__v":0,"id":"54ba9e52a868bc317a7aff36"},{"_id":"54ba9ea9a868bc317a7aff3a","name":"снабжение продовольствием (магазины, карточки)","parent":"54ba9b30a868bc317a7afefa","description":"","__v":0,"id":"54ba9ea9a868bc317a7aff3a"},{"_id":"54badd14a868bcff4803cbd1","name":"по повестке","parent":"54badd14a868bcff4803cbd0","__v":0,"id":"54badd14a868bcff4803cbd1"},{"_id":"54ba9f60a868bc317a7aff4e","name":"Военная цензура","parent":"54ba9f5ba868bc317a7aff4d","description":"","__v":0,"id":"54ba9f60a868bc317a7aff4e"},{"_id":"54ba9eeaa868bc317a7aff45","name":"школы","parent":"54ba9eaaa868bc317a7aff3e","description":"","__v":0,"id":"54ba9eeaa868bc317a7aff45"},{"_id":"54badd16a868bcff4803cbde","name":"военнопленные","parent":"54badd16a868bcff4803cbdc","__v":0,"id":"54badd16a868bcff4803cbde"},{"_id":"54badd17a868bcff4803cbe4","name":"религиозные ","parent":"54badd16a868bcff4803cbdc","__v":0,"id":"54badd17a868bcff4803cbe4"},{"_id":"54ba9e1ea868bc317a7aff31","name":"Организация повседневной жизни (жилье, соседи)","parent":"54ba9b30a868bc317a7afefa","description":"","__v":0,"id":"54ba9e1ea868bc317a7aff31"},{"_id":"54ba9eaaa868bc317a7aff3e","name":"Функционирование властных и общественных институтов на оккупированной территории","parent":"54ba9b30a868bc317a7afefa","description":"","__v":0,"id":"54ba9eaaa868bc317a7aff3e"},{"_id":"54badd16a868bcff4803cbdb","name":"Осты – общие характеристики / также и общие хар-ки военнопленных и пр./","parent":"54bad419a868bca4e8cc65ca","__v":0,"id":"54badd16a868bcff4803cbdb"},{"_id":"54ba9f33a868bc317a7aff4a","name":"детские дома","parent":"54ba9eaaa868bc317a7aff3e","description":"","__v":0,"id":"54ba9f33a868bc317a7aff4a"},{"_id":"54badd15a868bcff4803cbd2","name":"арест","parent":"54badd14a868bcff4803cbd0","__v":0,"id":"54badd15a868bcff4803cbd2"},{"_id":"54badd15a868bcff4803cbd6","name":"Доставка в Германию или на оккупированные зоны","parent":"54badd14a868bcff4803cbcf","__v":0,"id":"54badd15a868bcff4803cbd6"},{"_id":"54badd17a868bcff4803cbe7","name":"эмигранты (упомянут синий винкель ID10)","parent":"54badd16a868bcff4803cbdc","__v":0,"id":"54badd17a868bcff4803cbe7"},{"_id":"54ba9f61a868bc317a7aff50","name":"Советская пропаганда, агитация, идеологическое воспитание, особые отделы НКВД, трибуналы","parent":"54ba9f5ba868bc317a7aff4d","description":"","__v":0,"id":"54ba9f61a868bc317a7aff50"},{"_id":"54badd16a868bcff4803cbdf","name":"цыгане","parent":"54badd16a868bcff4803cbdc","__v":0,"id":"54badd16a868bcff4803cbdf"},{"_id":"54badd16a868bcff4803cbe0","name":"евреи","parent":"54badd16a868bcff4803cbdc","__v":0,"id":"54badd16a868bcff4803cbe0"},{"_id":"54badd17a868bcff4803cbe3","name":"уголовники","parent":"54badd16a868bcff4803cbdc","__v":0,"id":"54badd17a868bcff4803cbe3"},{"_id":"54badd17a868bcff4803cbe6","name":"иные","parent":"54badd16a868bcff4803cbdc","__v":0,"id":"54badd17a868bcff4803cbe6"},{"_id":"54badd17a868bcff4803cbe8","name":"Общение с гражданским населением вне работы и лагерей /не только ОСТов, но и военнопленных и пр./","parent":"54badd16a868bcff4803cbdb","__v":0,"id":"54badd17a868bcff4803cbe8"},{"_id":"54badd17a868bcff4803cbe1","name":"политические  (участники Сопротивления, в том числе, могли быть и военнопленные)","parent":"54badd16a868bcff4803cbdc","__v":0,"id":"54badd17a868bcff4803cbe1"},{"_id":"54badf67a868bcfa52e66a5d","name":"Надежда выжить или ее осутствие","parent":"54badd16a868bcff4803cbdb","__v":0,"id":"54badf67a868bcfa52e66a5d"},{"_id":"54badf68a868bcfa52e66a61","name":"Детские дома","parent":"54badd16a868bcff4803cbdb","__v":0,"id":"54badf68a868bcfa52e66a61"},{"_id":"54badf67a868bcfa52e66a5e","name":"Перемена хозяев","parent":"54badd16a868bcff4803cbdb","__v":0,"id":"54badf67a868bcfa52e66a5e"},{"_id":"54badd18a868bcff4803cbe9","name":"Бомбежки в Германии (вне зависимости от типа лагеря, на всей территории Вермахта)","parent":"54badd16a868bcff4803cbdb","__v":0,"id":"54badd18a868bcff4803cbe9"},{"_id":"54badd17a868bcff4803cbe5","name":"национальности (обозначение) /начала заполнять с ID10/","parent":"54badd16a868bcff4803cbdc","__v":0,"id":"54badd17a868bcff4803cbe5"},{"_id":"54badf68a868bcfa52e66a62","name":"Вербовка и участие в прогерманских военных организациях","parent":"54badd16a868bcff4803cbdb","__v":0,"id":"54badf68a868bcfa52e66a62"},{"_id":"54badf68a868bcfa52e66a60","name":"Сексуальные домогательства","parent":"54badd16a868bcff4803cbdb","__v":0,"id":"54badf68a868bcfa52e66a60"},{"_id":"54badf67a868bcfa52e66a5f","name":"нелегальная продажа остов","parent":"54badf67a868bcfa52e66a5e","__v":0,"id":"54badf67a868bcfa52e66a5f"},{"_id":"54badf69a868bcfa52e66a67","name":"«Зеленая полиция» / «полиция правопорядка»","parent":"54badf68a868bcfa52e66a64","__v":0,"id":"54badf69a868bcfa52e66a67"},{"_id":"54badf68a868bcfa52e66a63","name":"вербовка","parent":"54badf68a868bcfa52e66a62","__v":0,"id":"54badf68a868bcfa52e66a63"},{"_id":"54badf69a868bcfa52e66a6c","name":"«Русская освободительная народная армия»","parent":"54badf68a868bcfa52e66a64","__v":0,"id":"54badf69a868bcfa52e66a6c"},{"_id":"54badf69a868bcfa52e66a6d","name":"Казачьи формирования","parent":"54badf68a868bcfa52e66a62","__v":0,"id":"54badf69a868bcfa52e66a6d"},{"_id":"54badf67a868bcfa52e66a5c","name":"Немецкий язык","parent":"54badd16a868bcff4803cbdb","__v":0,"id":"54badf67a868bcfa52e66a5c"},{"_id":"54badf69a868bcfa52e66a68","name":"войска охраны / «шума» / Schutzmannschaften","parent":"54badf68a868bcfa52e66a64","__v":0,"id":"54badf69a868bcfa52e66a68"},{"_id":"54badf6aa868bcfa52e66a71","name":"Перемещения из лагеря в лагерь (не связанные с сортировкой, т.е. переезды – не только концлагерь, но и из Гестапо в пересылочный лагерь, сортировочный  и пр)","parent":"54badd16a868bcff4803cbdb","__v":0,"id":"54badf6aa868bcfa52e66a71"},{"_id":"54bae0f6a868bc91280a8330","name":"поляки","parent":"54bae0f6a868bc91280a832d","__v":0,"id":"54bae0f6a868bc91280a8330"},{"_id":"54badf69a868bcfa52e66a69","name":"Ostlegionen (Восточные легионы) и Osttruppen (Восточные войска) /Фрайвиллиге / Freiwillige /добровольческие соединения","parent":"54badf68a868bcfa52e66a64","__v":0,"id":"54badf69a868bcfa52e66a69"},{"_id":"54bae0f5a868bc91280a832a","name":"Начальство","parent":"54bae0f5a868bc91280a8329","__v":0,"id":"54bae0f5a868bc91280a832a"},{"_id":"54badf69a868bcfa52e66a6e","name":"национальные  «добровольческие» формирования","parent":"54badf68a868bcfa52e66a62","__v":0,"id":"54badf69a868bcfa52e66a6e"},{"_id":"54badf69a868bcfa52e66a6a","name":"«Зондерштаб Р» («Россия»)","parent":"54badf68a868bcfa52e66a64","__v":0,"id":"54badf69a868bcfa52e66a6a"},{"_id":"54bae0f8a868bc91280a833a","name":"коксохимический завод","parent":"54bae0f7a868bc91280a8339","__v":0,"id":"54bae0f8a868bc91280a833a"},{"_id":"54badf68a868bcfa52e66a66","name":"«Организация Тодт»","parent":"54badf68a868bcfa52e66a64","__v":0,"id":"54badf68a868bcfa52e66a66"},{"_id":"54badf68a868bcfa52e66a64","name":"военнизированные соединения","parent":"54badf68a868bcfa52e66a62","__v":0,"id":"54badf68a868bcfa52e66a64"},{"_id":"54badf6aa868bcfa52e66a72","name":"Марши смерти","parent":"54badd16a868bcff4803cbdb","__v":0,"id":"54badf6aa868bcfa52e66a72"},{"_id":"54bae0f7a868bc91280a8335","name":"Обслуживание","parent":"54bae0f7a868bc91280a8334","__v":0,"id":"54bae0f7a868bc91280a8335"},{"_id":"54bae0f7a868bc91280a8333","name":"итальянцы","parent":"54bae0f6a868bc91280a832d","__v":0,"id":"54bae0f7a868bc91280a8333"},{"_id":"54bae0f8a868bc91280a833f","name":"железные дороги (грузчики; ремонтные)","parent":"54bae0f7a868bc91280a8337","description":"","__v":0,"id":"54bae0f8a868bc91280a833f"},{"_id":"54badf6aa868bcfa52e66a70","name":"Неустановленный тип","parent":"54badf68a868bcfa52e66a62","__v":0,"id":"54badf6aa868bcfa52e66a70"},{"_id":"54bae0f5a868bc91280a8328","name":"Принудительный труд в Германии","parent":"54bad419a868bca4e8cc65ca","__v":0,"id":"54bae0f5a868bc91280a8328"},{"_id":"54bae0f6a868bc91280a832d","name":"Другие категории заключенных, в том числе по национальному признаку)","parent":"54bae0f5a868bc91280a8329","__v":0,"id":"54bae0f6a868bc91280a832d"},{"_id":"54bae0f7a868bc91280a8332","name":"немцы","parent":"54bae0f6a868bc91280a832d","__v":0,"id":"54bae0f7a868bc91280a8332"},{"_id":"54bae0f8a868bc91280a833b","name":"шахта","parent":"54bae0f7a868bc91280a8339","__v":0,"id":"54bae0f8a868bc91280a833b"},{"_id":"54bae0f7a868bc91280a8336","name":"Конвой","parent":"54bae0f7a868bc91280a8334","__v":0,"id":"54bae0f7a868bc91280a8336"},{"_id":"54bae0f7a868bc91280a8338","name":"вооружение","parent":"54bae0f7a868bc91280a8337","__v":0,"id":"54bae0f7a868bc91280a8338"},{"_id":"54bae0f6a868bc91280a832b","name":"Мастер, контролер, надзиратель","parent":"54bae0f5a868bc91280a832a","__v":0,"id":"54bae0f6a868bc91280a832b"},{"_id":"54bae0f6a868bc91280a832c","name":"Высокое начальство","parent":"54bae0f5a868bc91280a832a","__v":0,"id":"54bae0f6a868bc91280a832c"},{"_id":"54badf68a868bcfa52e66a65","name":"Хильфсвиллиге / Hilfswillige («хиви»)","parent":"54badf68a868bcfa52e66a64","__v":0,"id":"54badf68a868bcfa52e66a65"},{"_id":"54bae0f8a868bc91280a8340","name":"строительство (заводов)","parent":"54bae0f7a868bc91280a8337","__v":0,"id":"54bae0f8a868bc91280a8340"},{"_id":"54bae0f6a868bc91280a832f","name":"чехи","parent":"54bae0f6a868bc91280a832d","__v":0,"id":"54bae0f6a868bc91280a832f"},{"_id":"54bae0f8a868bc91280a833d","name":"каменоломни","parent":"54bae0f7a868bc91280a8337","__v":0,"id":"54bae0f8a868bc91280a833d"},{"_id":"54bae0f7a868bc91280a8334","name":"Вольнонаёмные немцы (австрийцы и пр.)","parent":"54bae0f5a868bc91280a8329","__v":0,"id":"54bae0f7a868bc91280a8334"},{"_id":"54bae0f8a868bc91280a833e","name":"клепальные работы (на транспортере для вывоза грунта из штольни)\"","parent":"54bae0f7a868bc91280a8337","__v":0,"id":"54bae0f8a868bc91280a833e"},{"_id":"54bae0f9a868bc91280a8344","name":"Строительство [дорог]","parent":"54bae0f7a868bc91280a8337","__v":0,"id":"54bae0f9a868bc91280a8344"},{"_id":"54bae0f7a868bc91280a8339","name":"Шахты","parent":"54bae0f7a868bc91280a8337","__v":0,"id":"54bae0f7a868bc91280a8339"},{"_id":"54bae0faa868bc91280a8348","name":"Автомобильный завод Фольксваген - ремонт самолетов","parent":"54bae0f7a868bc91280a8337","__v":0,"id":"54bae0faa868bc91280a8348"},{"_id":"54bae0f9a868bc91280a8341","name":"Строительство [бараков]","parent":"54bae0f7a868bc91280a8337","__v":0,"id":"54bae0f9a868bc91280a8341"},{"_id":"54badf69a868bcfa52e66a6b","name":"«Русская Народная Национальная Армия»","parent":"54badf68a868bcfa52e66a64","__v":0,"id":"54badf69a868bcfa52e66a6b"},{"_id":"54bae0f9a868bc91280a8343","name":"Строительство аэродрома","parent":"54bae0f7a868bc91280a8337","__v":0,"id":"54bae0f9a868bc91280a8343"},{"_id":"54badf69a868bcfa52e66a6f","name":"«власовцы» / Русская Освободительная армия (РОА)  под командованием А. А. Власова и Комитет Освобождения народов России (КОНР) ","parent":"54badf69a868bcfa52e66a6e","__v":0,"id":"54badf69a868bcfa52e66a6f"},{"_id":"54bae0f7a868bc91280a8337","name":"Виды работ","parent":"54bae0f5a868bc91280a8329","__v":0,"id":"54bae0f7a868bc91280a8337"},{"_id":"54bae0f6a868bc91280a8331","name":"русские военнопленные","parent":"54bae0f6a868bc91280a832d","__v":0,"id":"54bae0f6a868bc91280a8331"},{"_id":"54bae0f9a868bc91280a8345","name":"Железные дороги","parent":"54bae0f7a868bc91280a8337","__v":0,"id":"54bae0f9a868bc91280a8345"},{"_id":"54bae0f5a868bc91280a8329","name":"Промышленность (бывш. «работа в рабочих лагерях»)","parent":"54bae0f5a868bc91280a8328","__v":0,"id":"54bae0f5a868bc91280a8329"},{"_id":"54bae0f8a868bc91280a833c","name":"контора (констр. бюро)","parent":"54bae0f7a868bc91280a8339","__v":0,"id":"54bae0f8a868bc91280a833c"},{"_id":"54bae0f6a868bc91280a832e","name":"французы","parent":"54bae0f6a868bc91280a832d","__v":0,"id":"54bae0f6a868bc91280a832e"},{"_id":"54bae0f9a868bc91280a8347","name":"Авиационный завод","parent":"54bae0f7a868bc91280a8337","__v":0,"id":"54bae0f9a868bc91280a8347"},{"_id":"54bae0f9a868bc91280a8342","name":"Строительство (укреплений, в частности на Балтике)","parent":"54bae0f7a868bc91280a8337","__v":0,"id":"54bae0f9a868bc91280a8342"},{"_id":"54bae0f9a868bc91280a8346","name":"Судоверфи","parent":"54bae0f7a868bc91280a8337","__v":0,"id":"54bae0f9a868bc91280a8346"},{"_id":"54bae0faa868bc91280a834d","name":"лесозаготовки","parent":"54bae0f7a868bc91280a8337","__v":0,"id":"54bae0faa868bc91280a834d"},{"_id":"54bae323a868bc6fab4bcc0b","name":"наказания ","parent":"54bae323a868bc6fab4bcc0a","__v":0,"id":"54bae323a868bc6fab4bcc0b"},{"_id":"54bae39da868bc6fab4bcc0f","name":"Сельское хозяйство","parent":"54bae0f5a868bc91280a8328","__v":0,"id":"54bae39da868bc6fab4bcc0f"},{"_id":"54bae0faa868bc91280a8349","name":"Станкостроительный завод (производство металлообрабатывающих станков)","parent":"54bae0f7a868bc91280a8337","__v":0,"id":"54bae0faa868bc91280a8349"},{"_id":"54bae324a868bc6fab4bcc0e","name":"Женский труд (специально обозначенный как отсутствие мужчин на работах)","parent":"54bae0f5a868bc91280a8329","__v":0,"id":"54bae324a868bc6fab4bcc0e"},{"_id":"54bae3a0a868bc6fab4bcc1f","name":"частный дрожжевой завод","parent":"54bae39fa868bc6fab4bcc18","__v":0,"id":"54bae3a0a868bc6fab4bcc1f"},{"_id":"54bae0faa868bc91280a834a","name":"Необозначенный завод (литейный или тракторный?","parent":"54bae0f7a868bc91280a8337","__v":0,"id":"54bae0faa868bc91280a834a"},{"_id":"54bae3a0a868bc6fab4bcc1d","name":"Пекарня","parent":"54bae39fa868bc6fab4bcc18","__v":0,"id":"54bae3a0a868bc6fab4bcc1d"},{"_id":"54bae39fa868bc6fab4bcc19","name":"Домашняя прислуга","parent":"54bae39fa868bc6fab4bcc18","__v":0,"id":"54bae39fa868bc6fab4bcc19"},{"_id":"54bae0faa868bc91280a834b","name":"Глинозёмный завод (производство кирпичей)","parent":"54bae0f7a868bc91280a8337","__v":0,"id":"54bae0faa868bc91280a834b"},{"_id":"54bae39ea868bc6fab4bcc13","name":"Виды работ","parent":"54bae39da868bc6fab4bcc0f","__v":0,"id":"54bae39ea868bc6fab4bcc13"},{"_id":"54bae2dda868bc6fab4bcc04","name":"Условия труда ","parent":"54bae0f5a868bc91280a8329","__v":0,"id":"54bae2dda868bc6fab4bcc04"},{"_id":"54bae2dda868bc6fab4bcc06","name":"зарплата, боны","parent":"54bae2dda868bc6fab4bcc04","__v":0,"id":"54bae2dda868bc6fab4bcc06"},{"_id":"54bae40ba868bc6fab4bcc24","name":"Переводчик, пропагандист","parent":"54bae40ba868bc6fab4bcc23","__v":0,"id":"54bae40ba868bc6fab4bcc24"},{"_id":"54bae323a868bc6fab4bcc09","name":"учебная  команда","parent":"54bae0f5a868bc91280a8329","__v":0,"id":"54bae323a868bc6fab4bcc09"},{"_id":"54bae1f7a868bc96bdab8394","name":"квалифицированный труд","parent":"54bae0f7a868bc91280a8337","description":"","__v":0,"id":"54bae1f7a868bc96bdab8394"},{"_id":"54bae323a868bc6fab4bcc0a","name":"Описание места работы, режима","parent":"54bae0f5a868bc91280a8329","__v":0,"id":"54bae323a868bc6fab4bcc0a"},{"_id":"54bae1f6a868bc96bdab8393","name":"чернорабочие","parent":"54bae0f7a868bc91280a8337","description":"","__v":0,"id":"54bae1f6a868bc96bdab8393"},{"_id":"54bae323a868bc6fab4bcc0d","name":"Детский труд","parent":"54bae0f5a868bc91280a8329","__v":0,"id":"54bae323a868bc6fab4bcc0d"},{"_id":"54bae39da868bc6fab4bcc10","name":"начальство","parent":"54bae39da868bc6fab4bcc0f","__v":0,"id":"54bae39da868bc6fab4bcc10"},{"_id":"54bae3a0a868bc6fab4bcc20","name":"уход за детьми хозяев","parent":"54bae39fa868bc6fab4bcc18","__v":0,"id":"54bae3a0a868bc6fab4bcc20"},{"_id":"54bae39ea868bc6fab4bcc14","name":"Условия труда","parent":"54bae39da868bc6fab4bcc0f","__v":0,"id":"54bae39ea868bc6fab4bcc14"},{"_id":"54bae39fa868bc6fab4bcc1a","name":"Ресторанная прислуга","parent":"54bae39fa868bc6fab4bcc18","__v":0,"id":"54bae39fa868bc6fab4bcc1a"},{"_id":"54bae3a0a868bc6fab4bcc1e","name":"работа в частном магазине","parent":"54bae39fa868bc6fab4bcc18","__v":0,"id":"54bae3a0a868bc6fab4bcc1e"},{"_id":"54bae39fa868bc6fab4bcc17","name":"детский труд","parent":"54bae39da868bc6fab4bcc0f","__v":0,"id":"54bae39fa868bc6fab4bcc17"},{"_id":"54bae2dda868bc6fab4bcc05","name":"трудоемкость","parent":"54bae2dda868bc6fab4bcc04","__v":0,"id":"54bae2dda868bc6fab4bcc05"},{"_id":"54bae3a0a868bc6fab4bcc21","name":"условия труда","parent":"54bae39fa868bc6fab4bcc18","__v":0,"id":"54bae3a0a868bc6fab4bcc21"},{"_id":"54bae39ea868bc6fab4bcc12","name":"вольнонаёмные","parent":"54bae39da868bc6fab4bcc0f","__v":0,"id":"54bae39ea868bc6fab4bcc12"},{"_id":"54bae40ca868bc6fab4bcc26","name":"церковная","parent":"54bae40ca868bc6fab4bcc25","__v":0,"id":"54bae40ca868bc6fab4bcc26"},{"_id":"54bae323a868bc6fab4bcc0c","name":"Саботаж","parent":"54bae0f5a868bc91280a8329","__v":0,"id":"54bae323a868bc6fab4bcc0c"},{"_id":"54bae39fa868bc6fab4bcc18","name":"Частный сектор","parent":"54bae0f5a868bc91280a8328","__v":0,"id":"54bae39fa868bc6fab4bcc18"},{"_id":"54bae40ba868bc6fab4bcc23","name":"Иное","parent":"54bae0f5a868bc91280a8328","__v":0,"id":"54bae40ba868bc6fab4bcc23"},{"_id":"54bae40ca868bc6fab4bcc28","name":"Детский дом","parent":"54bae40ba868bc6fab4bcc23","__v":0,"id":"54bae40ca868bc6fab4bcc28"},{"_id":"54bae39ea868bc6fab4bcc16","name":"саботаж","parent":"54bae39da868bc6fab4bcc0f","__v":0,"id":"54bae39ea868bc6fab4bcc16"},{"_id":"54bae322a868bc6fab4bcc07","name":"штрафная команда","parent":"54bae0f5a868bc91280a8329","__v":0,"id":"54bae322a868bc6fab4bcc07"},{"_id":"54bae40ca868bc6fab4bcc27","name":"госпиталь","parent":"54bae40ca868bc6fab4bcc25","__v":0,"id":"54bae40ca868bc6fab4bcc27"},{"_id":"54bae3a1a868bc6fab4bcc22","name":"зарплата","parent":"54bae3a0a868bc6fab4bcc21","__v":0,"id":"54bae3a1a868bc6fab4bcc22"},{"_id":"54bae40da868bc6fab4bcc2b","name":"Разведка","parent":"54bae40ba868bc6fab4bcc23","__v":0,"id":"54bae40da868bc6fab4bcc2b"},{"_id":"54bae40da868bc6fab4bcc2c","name":"гестапо, уборщик","parent":"54bae40ba868bc6fab4bcc23","__v":0,"id":"54bae40da868bc6fab4bcc2c"},{"_id":"54bae40da868bc6fab4bcc2a","name":"Бани","parent":"54bae40ba868bc6fab4bcc23","__v":0,"id":"54bae40da868bc6fab4bcc2a"},{"_id":"54bae40ea868bc6fab4bcc2f","name":"осушение болот","parent":"54bae40ba868bc6fab4bcc23","__v":0,"id":"54bae40ea868bc6fab4bcc2f"},{"_id":"54bae40ca868bc6fab4bcc25","name":"Больницы","parent":"54bae40ba868bc6fab4bcc23","__v":0,"id":"54bae40ca868bc6fab4bcc25"},{"_id":"54bae495a868bc6fab4bcc38","name":"другие дети","parent":"54bae494a868bc6fab4bcc36","__v":0,"id":"54bae495a868bc6fab4bcc38"},{"_id":"54bae496a868bc6fab4bcc3d","name":"Администрация","parent":"54bae496a868bc6fab4bcc3c","__v":0,"id":"54bae496a868bc6fab4bcc3d"},{"_id":"54bae498a868bc6fab4bcc47","name":"Дезинфекция","parent":"54bae497a868bc6fab4bcc44","__v":0,"id":"54bae498a868bc6fab4bcc47"},{"_id":"54bae493a868bc6fab4bcc31","name":"Сборный лагерь","parent":"54bae493a868bc6fab4bcc30","__v":0,"id":"54bae493a868bc6fab4bcc31"},{"_id":"54bae495a868bc6fab4bcc3a","name":"побеги","parent":"54bae495a868bc6fab4bcc39","__v":0,"id":"54bae495a868bc6fab4bcc3a"},{"_id":"54bae496a868bc6fab4bcc3e","name":"Надзиратели","parent":"54bae496a868bc6fab4bcc3c","__v":0,"id":"54bae496a868bc6fab4bcc3e"},{"_id":"54bae497a868bc6fab4bcc43","name":"соседние лагеря","parent":"54bae496a868bc6fab4bcc40","__v":0,"id":"54bae497a868bc6fab4bcc43"},{"_id":"54bae494a868bc6fab4bcc33","name":"Биржа труда (как передают хозяевам по прибытии, бежали от хозяев и приходя на биржу труда)","parent":"54bae493a868bc6fab4bcc31","__v":0,"id":"54bae494a868bc6fab4bcc33"},{"_id":"54bae494a868bc6fab4bcc36","name":"Дети в лагере","parent":"54bae493a868bc6fab4bcc31","__v":0,"id":"54bae494a868bc6fab4bcc36"},{"_id":"54bae498a868bc6fab4bcc48","name":"Повседневность:","parent":"54bae495a868bc6fab4bcc3b","__v":0,"id":"54bae498a868bc6fab4bcc48"},{"_id":"54bae49aa868bc6fab4bcc50","name":"Несоблюдение режима (самоволки, хождение без винкеля и прочие непротестные для выживания нарушения или намерения к тому)","parent":"54bae498a868bc6fab4bcc48","__v":0,"id":"54bae49aa868bc6fab4bcc50"},{"_id":"54bae499a868bc6fab4bcc4e","name":"Обмен","parent":"54bae498a868bc6fab4bcc48","__v":0,"id":"54bae499a868bc6fab4bcc4e"},{"_id":"54bae498a868bc6fab4bcc49","name":"Одежда, обувь","parent":"54bae498a868bc6fab4bcc48","__v":0,"id":"54bae498a868bc6fab4bcc49"},{"_id":"54bae496a868bc6fab4bcc3f","name":"Вольнонаёмные","parent":"54bae496a868bc6fab4bcc3c","__v":0,"id":"54bae496a868bc6fab4bcc3f"},{"_id":"54bae495a868bc6fab4bcc39","name":"Сопротивление","parent":"54bae493a868bc6fab4bcc31","__v":0,"id":"54bae495a868bc6fab4bcc39"},{"_id":"54bae49ca868bc6fab4bcc5a","name":"землячества","parent":"54bae49ba868bc6fab4bcc57","__v":0,"id":"54bae49ca868bc6fab4bcc5a"},{"_id":"54bae49aa868bc6fab4bcc53","name":"игра в карты","parent":"54bae49aa868bc6fab4bcc52","__v":0,"id":"54bae49aa868bc6fab4bcc53"},{"_id":"54bae498a868bc6fab4bcc4a","name":"Питание","parent":"54bae498a868bc6fab4bcc48","__v":0,"id":"54bae498a868bc6fab4bcc4a"},{"_id":"54bae49ca868bc6fab4bcc5d","name":"иерархия заключенных (капо, штубовые, старосты, старшие по бараку, блоковые , разница в режимах содержания, категории по винкелями с конкретными правами, \"дно\")","parent":"54bae49ba868bc6fab4bcc57","__v":0,"id":"54bae49ca868bc6fab4bcc5d"},{"_id":"54bae49da868bc6fab4bcc62","name":"сербы (югославы)","parent":"54bae49ca868bc6fab4bcc5e","__v":0,"id":"54bae49da868bc6fab4bcc62"},{"_id":"54bae49ea868bc6fab4bcc65","name":"поляки","parent":"54bae49ca868bc6fab4bcc5e","__v":0,"id":"54bae49ea868bc6fab4bcc65"},{"_id":"54bae49ea868bc6fab4bcc67","name":"украинцы","parent":"54bae49ca868bc6fab4bcc5e","__v":0,"id":"54bae49ea868bc6fab4bcc67"},{"_id":"54bae49aa868bc6fab4bcc54","name":"смена фамилии","parent":"54bae49aa868bc6fab4bcc52","__v":0,"id":"54bae49aa868bc6fab4bcc54"},{"_id":"54bae49da868bc6fab4bcc60","name":"чехи","parent":"54bae49ca868bc6fab4bcc5e","__v":0,"id":"54bae49da868bc6fab4bcc60"},{"_id":"54bae49fa868bc6fab4bcc6a","name":"армяне","parent":"54bae49ca868bc6fab4bcc5e","__v":0,"id":"54bae49fa868bc6fab4bcc6a"},{"_id":"54bae49ea868bc6fab4bcc63","name":"англичане","parent":"54bae49ca868bc6fab4bcc5e","__v":0,"id":"54bae49ea868bc6fab4bcc63"},{"_id":"54bae4a1a868bc6fab4bcc72","name":"Дети в лагере","parent":"54bae495a868bc6fab4bcc3b","__v":0,"id":"54bae4a1a868bc6fab4bcc72"},{"_id":"54bae4a0a868bc6fab4bcc6f","name":"бельгийцы","parent":"54bae49ca868bc6fab4bcc5e","__v":0,"id":"54bae4a0a868bc6fab4bcc6f"},{"_id":"54bae4a0a868bc6fab4bcc6d","name":"туркмены","parent":"54bae49ca868bc6fab4bcc5e","__v":0,"id":"54bae4a0a868bc6fab4bcc6d"},{"_id":"54bae498a868bc6fab4bcc46","name":"Сортировка","parent":"54bae497a868bc6fab4bcc44","__v":0,"id":"54bae498a868bc6fab4bcc46"},{"_id":"54bae4a3a868bc6fab4bcc7c","name":"Наказания","parent":"54bae495a868bc6fab4bcc3b","__v":0,"id":"54bae4a3a868bc6fab4bcc7c"},{"_id":"54bae4a2a868bc6fab4bcc77","name":"общие болезни","parent":"54bae4a2a868bc6fab4bcc75","__v":0,"id":"54bae4a2a868bc6fab4bcc77"},{"_id":"54bae49ea868bc6fab4bcc66","name":"евреи","parent":"54bae49ca868bc6fab4bcc5e","__v":0,"id":"54bae49ea868bc6fab4bcc66"},{"_id":"54bae4a0a868bc6fab4bcc6c","name":"белорусы","parent":"54bae49ca868bc6fab4bcc5e","__v":0,"id":"54bae4a0a868bc6fab4bcc6c"},{"_id":"54bae49fa868bc6fab4bcc6b","name":"хорваты","parent":"54bae49ca868bc6fab4bcc5e","__v":0,"id":"54bae49fa868bc6fab4bcc6b"},{"_id":"54bae4a4a868bc6fab4bcc81","name":"Сопротивление:","parent":"54bae495a868bc6fab4bcc3b","__v":0,"id":"54bae4a4a868bc6fab4bcc81"},{"_id":"54bae4a3a868bc6fab4bcc7b","name":"Смерть и похороны","parent":"54bae495a868bc6fab4bcc3b","__v":0,"id":"54bae4a3a868bc6fab4bcc7b"},{"_id":"54bae49da868bc6fab4bcc61","name":"словаки","parent":"54bae49ca868bc6fab4bcc5e","__v":0,"id":"54bae49da868bc6fab4bcc61"},{"_id":"54bae49ca868bc6fab4bcc5b","name":"взаимопомощь","parent":"54bae49ba868bc6fab4bcc57","__v":0,"id":"54bae49ca868bc6fab4bcc5b"},{"_id":"54bae4a2a868bc6fab4bcc76","name":"гинекология","parent":"54bae4a2a868bc6fab4bcc75","__v":0,"id":"54bae4a2a868bc6fab4bcc76"},{"_id":"54bae4a6a868bc6fab4bcc86","name":"Повседневность","parent":"54bae4a5a868bc6fab4bcc85","__v":0,"id":"54bae4a6a868bc6fab4bcc86"},{"_id":"54bae4a7a868bc6fab4bcc8c","name":"Болезни, медицина","parent":"54bae4a5a868bc6fab4bcc85","__v":0,"id":"54bae4a7a868bc6fab4bcc8c"},{"_id":"54bae49ea868bc6fab4bcc64","name":"французы","parent":"54bae49ca868bc6fab4bcc5e","__v":0,"id":"54bae49ea868bc6fab4bcc64"},{"_id":"54bae49fa868bc6fab4bcc69","name":"цыгане","parent":"54bae49ca868bc6fab4bcc5e","__v":0,"id":"54bae49fa868bc6fab4bcc69"},{"_id":"54bae4a0a868bc6fab4bcc6e","name":"татары","parent":"54bae49ca868bc6fab4bcc5e","__v":0,"id":"54bae4a0a868bc6fab4bcc6e"},{"_id":"54bae4a0a868bc6fab4bcc70","name":"голландцы","parent":"54bae49ca868bc6fab4bcc5e","__v":0,"id":"54bae4a0a868bc6fab4bcc70"},{"_id":"54bae4a2a868bc6fab4bcc75","name":"Болезни, медицина","parent":"54bae495a868bc6fab4bcc3b","__v":0,"id":"54bae4a2a868bc6fab4bcc75"},{"_id":"54bae4a3a868bc6fab4bcc7a","name":"беременность","parent":"54bae4a2a868bc6fab4bcc75","__v":0,"id":"54bae4a3a868bc6fab4bcc7a"},{"_id":"54bae4aaa868bc6fab4bcc96","name":"Одежда, обувь","parent":"54bae4a9a868bc6fab4bcc95","__v":0,"id":"54bae4aaa868bc6fab4bcc96"},{"_id":"54bae4a4a868bc6fab4bcc80","name":"Публичный дом","parent":"54bae495a868bc6fab4bcc3b","__v":0,"id":"54bae4a4a868bc6fab4bcc80"},{"_id":"54bae4a8a868bc6fab4bcc8e","name":"Хозяева","parent":"54bae4a7a868bc6fab4bcc8d","__v":0,"id":"54bae4a8a868bc6fab4bcc8e"},{"_id":"54bae4a7a868bc6fab4bcc89","name":"питание","parent":"54bae4a6a868bc6fab4bcc86","__v":0,"id":"54bae4a7a868bc6fab4bcc89"},{"_id":"54bae4a6a868bc6fab4bcc87","name":"одежда, обувь","parent":"54bae4a6a868bc6fab4bcc86","__v":0,"id":"54bae4a6a868bc6fab4bcc87"},{"_id":"54bae4a1a868bc6fab4bcc74","name":"другие дети","parent":"54bae4a1a868bc6fab4bcc72","__v":0,"id":"54bae4a1a868bc6fab4bcc74"},{"_id":"54bae4a5a868bc6fab4bcc82","name":"побеги","parent":"54bae4a4a868bc6fab4bcc81","__v":0,"id":"54bae4a5a868bc6fab4bcc82"},{"_id":"54bae4a2a868bc6fab4bcc78","name":"травматология","parent":"54bae4a2a868bc6fab4bcc75","__v":0,"id":"54bae4a2a868bc6fab4bcc78"},{"_id":"54bae4a7a868bc6fab4bcc8d","name":"Проживание в частном с/х секторе / Проживание в частном секторе (прислуга у врача - ID35); вообще в частном секторе, в т.ч. в городе (ID14)","parent":"54bae493a868bc6fab4bcc30","__v":0,"id":"54bae4a7a868bc6fab4bcc8d"},{"_id":"54bae4aba868bc6fab4bcc9d","name":"Несоблюдение режима (самоволки, хождение без винкеля и прочие непротестные для выживания нарушения)","parent":"54bae4a9a868bc6fab4bcc95","__v":0,"id":"54bae4aba868bc6fab4bcc9d"},{"_id":"54bae4aba868bc6fab4bcc9b","name":"Обмен","parent":"54bae4a9a868bc6fab4bcc95","__v":0,"id":"54bae4aba868bc6fab4bcc9b"},{"_id":"54bae4b0a868bc6fab4bccaf","name":"сербы (югославы)","parent":"54bae4afa868bc6fab4bccab","__v":0,"id":"54bae4b0a868bc6fab4bccaf"},{"_id":"54bae4b0a868bc6fab4bccad","name":"чехи","parent":"54bae4afa868bc6fab4bccab","__v":0,"id":"54bae4b0a868bc6fab4bccad"},{"_id":"54bae4b1a868bc6fab4bccb4","name":"украинцы","parent":"54bae4afa868bc6fab4bccab","__v":0,"id":"54bae4b1a868bc6fab4bccb4"},{"_id":"54bae4b2a868bc6fab4bccb8","name":"белорусы","parent":"54bae4afa868bc6fab4bccab","__v":0,"id":"54bae4b2a868bc6fab4bccb8"},{"_id":"54bae4aea868bc6fab4bcca7","name":"землячества","parent":"54bae4ada868bc6fab4bcca4","__v":0,"id":"54bae4aea868bc6fab4bcca7"},{"_id":"54bae4b4a868bc6fab4bccbe","name":"другие дети","parent":"54bae4b4a868bc6fab4bccbc","__v":0,"id":"54bae4b4a868bc6fab4bccbe"},{"_id":"54bae4b1a868bc6fab4bccb1","name":"французы","parent":"54bae4afa868bc6fab4bccab","__v":0,"id":"54bae4b1a868bc6fab4bccb1"},{"_id":"54bae4b2a868bc6fab4bccb6","name":"армяне","parent":"54bae4afa868bc6fab4bccab","__v":0,"id":"54bae4b2a868bc6fab4bccb6"},{"_id":"54bae4b3a868bc6fab4bccbb","name":"русские","parent":"54bae4afa868bc6fab4bccab","__v":0,"id":"54bae4b3a868bc6fab4bccbb"},{"_id":"54bae4aca868bc6fab4bcca0","name":"игра в карты","parent":"54bae4aca868bc6fab4bcc9f","__v":0,"id":"54bae4aca868bc6fab4bcca0"},{"_id":"54bae4b5a868bc6fab4bccc1","name":"общие болезни","parent":"54bae4b5a868bc6fab4bccbf","__v":0,"id":"54bae4b5a868bc6fab4bccc1"},{"_id":"54bae4b6a868bc6fab4bccc4","name":"Смерть и похороны","parent":"54bae4a7a868bc6fab4bcc8d","__v":0,"id":"54bae4b6a868bc6fab4bccc4"},{"_id":"54bae4b6a868bc6fab4bccc5","name":"Наказания","parent":"54bae4a7a868bc6fab4bcc8d","__v":0,"id":"54bae4b6a868bc6fab4bccc5"},{"_id":"54bae4b1a868bc6fab4bccb3","name":"евреи","parent":"54bae4afa868bc6fab4bccab","__v":0,"id":"54bae4b1a868bc6fab4bccb3"},{"_id":"54bae4b3a868bc6fab4bccb9","name":"туркмены","parent":"54bae4afa868bc6fab4bccab","__v":0,"id":"54bae4b3a868bc6fab4bccb9"},{"_id":"54bae4b0a868bc6fab4bccae","name":"словаки","parent":"54bae4afa868bc6fab4bccab","__v":0,"id":"54bae4b0a868bc6fab4bccae"},{"_id":"54bae4a9a868bc6fab4bcc95","name":"Повседневность","parent":"54bae4a7a868bc6fab4bcc8d","__v":0,"id":"54bae4a9a868bc6fab4bcc95"},{"_id":"54bae4b5a868bc6fab4bccc2","name":"травматология","parent":"54bae4b5a868bc6fab4bccbf","__v":0,"id":"54bae4b5a868bc6fab4bccc2"},{"_id":"54bae4aca868bc6fab4bcca1","name":"смена фамилии","parent":"54bae4aca868bc6fab4bcc9f","__v":0,"id":"54bae4aca868bc6fab4bcca1"},{"_id":"54bae4afa868bc6fab4bccaa","name":"иерархия заключенных (капо, штубовые, старосты, старшие по бараку, блоковые , разница в режимах содержания, категории по винкелями с конкретными правами, \"дно\")","parent":"54bae4ada868bc6fab4bcca4","__v":0,"id":"54bae4afa868bc6fab4bccaa"},{"_id":"54bae4b0a868bc6fab4bccb0","name":"англичане","parent":"54bae4afa868bc6fab4bccab","__v":0,"id":"54bae4b0a868bc6fab4bccb0"},{"_id":"54bae4aea868bc6fab4bcca8","name":"взаимопомощь","parent":"54bae4ada868bc6fab4bcca4","__v":0,"id":"54bae4aea868bc6fab4bcca8"},{"_id":"54bae4ada868bc6fab4bcca3","name":"причёска","parent":"54bae4aca868bc6fab4bcc9f","__v":0,"id":"54bae4ada868bc6fab4bcca3"},{"_id":"54bae4b8a868bc6fab4bcccb","name":"побеги","parent":"54bae4b8a868bc6fab4bccca","__v":0,"id":"54bae4b8a868bc6fab4bcccb"},{"_id":"54bae4b2a868bc6fab4bccb5","name":"цыгане","parent":"54bae4afa868bc6fab4bccab","__v":0,"id":"54bae4b2a868bc6fab4bccb5"},{"_id":"54bae4b3a868bc6fab4bccba","name":"татары","parent":"54bae4afa868bc6fab4bccab","__v":0,"id":"54bae4b3a868bc6fab4bccba"},{"_id":"54bae4bba868bc6fab4bccd4","name":"Надзиратели","parent":"54bae4baa868bc6fab4bccd2","__v":0,"id":"54bae4bba868bc6fab4bccd4"},{"_id":"54bae4b7a868bc6fab4bccc9","name":"Публичный дом","parent":"54bae4a7a868bc6fab4bcc8d","__v":0,"id":"54bae4b7a868bc6fab4bccc9"},{"_id":"54bae4b5a868bc6fab4bccbf","name":"Болезни, медицина","parent":"54bae4a7a868bc6fab4bcc8d","__v":0,"id":"54bae4b5a868bc6fab4bccbf"},{"_id":"54bae4baa868bc6fab4bccd3","name":"Администрация","parent":"54bae4baa868bc6fab4bccd2","__v":0,"id":"54bae4baa868bc6fab4bccd3"},{"_id":"54bae4bca868bc6fab4bccd9","name":"соседние лагеря","parent":"54bae4bba868bc6fab4bccd6","__v":0,"id":"54bae4bca868bc6fab4bccd9"},{"_id":"54bae4baa868bc6fab4bccd1","name":"Штрафные лагеря","parent":"54bae493a868bc6fab4bcc30","__v":0,"id":"54bae4baa868bc6fab4bccd1"},{"_id":"54bae4bda868bc6fab4bccdd","name":"Дезинфекция","parent":"54bae4bda868bc6fab4bccda","__v":0,"id":"54bae4bda868bc6fab4bccdd"},{"_id":"54bae4b2a868bc6fab4bccb7","name":"хорваты","parent":"54bae4afa868bc6fab4bccab","__v":0,"id":"54bae4b2a868bc6fab4bccb7"},{"_id":"54bae4b1a868bc6fab4bccb2","name":"поляки","parent":"54bae4afa868bc6fab4bccab","__v":0,"id":"54bae4b1a868bc6fab4bccb2"},{"_id":"54bae4b8a868bc6fab4bccca","name":"Сопротивление:","parent":"54bae4a7a868bc6fab4bcc8d","__v":0,"id":"54bae4b8a868bc6fab4bccca"},{"_id":"54bae4b5a868bc6fab4bccc0","name":"гинекология","parent":"54bae4b5a868bc6fab4bccbf","__v":0,"id":"54bae4b5a868bc6fab4bccc0"},{"_id":"54bae4bba868bc6fab4bccd5","name":"Вольнонаёмные","parent":"54bae4baa868bc6fab4bccd2","__v":0,"id":"54bae4bba868bc6fab4bccd5"},{"_id":"54bae4baa868bc6fab4bccd0","name":"казни","parent":"54bae4b9a868bc6fab4bcccf","__v":0,"id":"54bae4baa868bc6fab4bccd0"},{"_id":"54bae4bda868bc6fab4bccdc","name":"Сортировка","parent":"54bae4bda868bc6fab4bccda","__v":0,"id":"54bae4bda868bc6fab4bccdc"},{"_id":"54bae4bea868bc6fab4bccdf","name":"Одежда, обувь","parent":"54bae4bea868bc6fab4bccde","__v":0,"id":"54bae4bea868bc6fab4bccdf"},{"_id":"54bae4bea868bc6fab4bccde","name":"Повседневность:","parent":"54bae4baa868bc6fab4bccd1","__v":0,"id":"54bae4bea868bc6fab4bccde"},{"_id":"54bae4c0a868bc6fab4bcce4","name":"Обмен","parent":"54bae4bea868bc6fab4bccde","__v":0,"id":"54bae4c0a868bc6fab4bcce4"},{"_id":"54bae4c1a868bc6fab4bcce9","name":"игра в карты","parent":"54bae4c1a868bc6fab4bcce8","__v":0,"id":"54bae4c1a868bc6fab4bcce9"},{"_id":"54bae4c2a868bc6fab4bccea","name":"смена фамилии","parent":"54bae4c1a868bc6fab4bcce8","__v":0,"id":"54bae4c2a868bc6fab4bccea"},{"_id":"54bae4c0a868bc6fab4bcce6","name":"Несоблюдение режима (самоволки, хождение без винкеля и прочие непротестные для выживания нарушения)","parent":"54bae4bea868bc6fab4bccde","__v":0,"id":"54bae4c0a868bc6fab4bcce6"},{"_id":"54bae4c4a868bc6fab4bccf1","name":"взаимопомощь","parent":"54bae4c3a868bc6fab4bcced","__v":0,"id":"54bae4c4a868bc6fab4bccf1"},{"_id":"54bae4c6a868bc6fab4bccf9","name":"англичане","parent":"54bae4c5a868bc6fab4bccf4","__v":0,"id":"54bae4c6a868bc6fab4bccf9"},{"_id":"54bae4c6a868bc6fab4bccf7","name":"словаки","parent":"54bae4c5a868bc6fab4bccf4","__v":0,"id":"54bae4c6a868bc6fab4bccf7"},{"_id":"54bae4c7a868bc6fab4bccfc","name":"евреи","parent":"54bae4c5a868bc6fab4bccf4","__v":0,"id":"54bae4c7a868bc6fab4bccfc"},{"_id":"54bae4c8a868bc6fab4bccfe","name":"цыгане","parent":"54bae4c5a868bc6fab4bccf4","__v":0,"id":"54bae4c8a868bc6fab4bccfe"},{"_id":"54bae4c5a868bc6fab4bccf6","name":"чехи","parent":"54bae4c5a868bc6fab4bccf4","__v":0,"id":"54bae4c5a868bc6fab4bccf6"},{"_id":"54bae4c7a868bc6fab4bccfa","name":"французы","parent":"54bae4c5a868bc6fab4bccf4","__v":0,"id":"54bae4c7a868bc6fab4bccfa"},{"_id":"54bae4cda868bc6fab4bcd0d","name":"Наказания","parent":"54bae4baa868bc6fab4bccd1","__v":0,"id":"54bae4cda868bc6fab4bcd0d"},{"_id":"54bae4c8a868bc6fab4bccfd","name":"украинцы","parent":"54bae4c5a868bc6fab4bccf4","__v":0,"id":"54bae4c8a868bc6fab4bccfd"},{"_id":"54bae4cba868bc6fab4bcd08","name":"гинекология","parent":"54bae4cba868bc6fab4bcd07","__v":0,"id":"54bae4cba868bc6fab4bcd08"},{"_id":"54bae4c4a868bc6fab4bccf3","name":"иерархия заключенных (капо, штубовые, старосты, старшие по бараку, блоковые , разница в режимах содержания, категории по винкелями с конкретными правами, \"дно\")","parent":"54bae4c3a868bc6fab4bcced","__v":0,"id":"54bae4c4a868bc6fab4bccf3"},{"_id":"54bae4c6a868bc6fab4bccf8","name":"сербы (югославы)","parent":"54bae4c5a868bc6fab4bccf4","__v":0,"id":"54bae4c6a868bc6fab4bccf8"},{"_id":"54bae4c9a868bc6fab4bcd00","name":"хорваты","parent":"54bae4c5a868bc6fab4bccf4","__v":0,"id":"54bae4c9a868bc6fab4bcd00"},{"_id":"54bae4cca868bc6fab4bcd09","name":"общие болезни","parent":"54bae4cba868bc6fab4bcd07","__v":0,"id":"54bae4cca868bc6fab4bcd09"},{"_id":"54bae4caa868bc6fab4bcd03","name":"татары","parent":"54bae4c5a868bc6fab4bccf4","__v":0,"id":"54bae4caa868bc6fab4bcd03"},{"_id":"54bae4cca868bc6fab4bcd0a","name":"травматология","parent":"54bae4cba868bc6fab4bcd07","__v":0,"id":"54bae4cca868bc6fab4bcd0a"},{"_id":"54bae4cba868bc6fab4bcd07","name":"Болезни, медицина","parent":"54bae4baa868bc6fab4bccd1","__v":0,"id":"54bae4cba868bc6fab4bcd07"},{"_id":"54bae4cba868bc6fab4bcd06","name":"другие дети","parent":"54bae4caa868bc6fab4bcd04","__v":0,"id":"54bae4cba868bc6fab4bcd06"},{"_id":"54bae4cfa868bc6fab4bcd13","name":"побеги","parent":"54bae4cea868bc6fab4bcd12","__v":0,"id":"54bae4cfa868bc6fab4bcd13"},{"_id":"54bae4c4a868bc6fab4bccf0","name":"землячества","parent":"54bae4c3a868bc6fab4bcced","__v":0,"id":"54bae4c4a868bc6fab4bccf0"},{"_id":"54bae4c7a868bc6fab4bccfb","name":"поляки","parent":"54bae4c5a868bc6fab4bccf4","__v":0,"id":"54bae4c7a868bc6fab4bccfb"},{"_id":"54bae4c9a868bc6fab4bcd01","name":"белорусы","parent":"54bae4c5a868bc6fab4bccf4","__v":0,"id":"54bae4c9a868bc6fab4bcd01"},{"_id":"54bae4c8a868bc6fab4bccff","name":"армяне","parent":"54bae4c5a868bc6fab4bccf4","__v":0,"id":"54bae4c8a868bc6fab4bccff"},{"_id":"54bae4d1a868bc6fab4bcd19","name":"армейские сборные пункты /Armeekriegsgefangenensammelstelle и фроншталаги / Frontstammlager (крупные лагеря фронотового уровня)","parent":"54bae4d0a868bc6fab4bcd17","__v":0,"id":"54bae4d1a868bc6fab4bcd19"},{"_id":"54bae4caa868bc6fab4bcd04","name":"Дети в лагере","parent":"54bae4baa868bc6fab4bccd1","__v":0,"id":"54bae4caa868bc6fab4bcd04"},{"_id":"54bae4cea868bc6fab4bcd12","name":"Сопротивление:","parent":"54bae4baa868bc6fab4bccd1","__v":0,"id":"54bae4cea868bc6fab4bcd12"},{"_id":"54bae4cea868bc6fab4bcd11","name":"Публичный дом","parent":"54bae4baa868bc6fab4bccd1","__v":0,"id":"54bae4cea868bc6fab4bcd11"},{"_id":"54bae4d4a868bc6fab4bcd22","name":"Иные","parent":"54bae4d0a868bc6fab4bcd17","__v":0,"id":"54bae4d4a868bc6fab4bcd22"},{"_id":"54bae4d2a868bc6fab4bcd1c","name":"Шталаг / Stammlager — для рядовых и нижних чинов (из шталагов военнопленные могли переводиться в рабочие лагеря или в штрафные лагеря)","parent":"54bae4d0a868bc6fab4bcd17","__v":0,"id":"54bae4d2a868bc6fab4bcd1c"},{"_id":"54bae4d0a868bc6fab4bcd17","name":"тип лагеря","parent":"54bae4d0a868bc6fab4bcd16","__v":0,"id":"54bae4d0a868bc6fab4bcd17"},{"_id":"54bae4c9a868bc6fab4bcd02","name":"туркмены","parent":"54bae4c5a868bc6fab4bccf4","__v":0,"id":"54bae4c9a868bc6fab4bcd02"},{"_id":"54bae4d4a868bc6fab4bcd23","name":"образовательный","parent":"54bae4d4a868bc6fab4bcd22","__v":0,"id":"54bae4d4a868bc6fab4bcd23"},{"_id":"54bae4cca868bc6fab4bcd0c","name":"Смерть и похороны","parent":"54bae4baa868bc6fab4bccd1","__v":0,"id":"54bae4cca868bc6fab4bcd0c"},{"_id":"54bae4d6a868bc6fab4bcd27","name":"Надзиратели","parent":"54bae4d5a868bc6fab4bcd25","__v":0,"id":"54bae4d6a868bc6fab4bcd27"},{"_id":"54bae4d1a868bc6fab4bcd1a","name":"дулаг / Durchgangslager — транзитный (пересыльный) (фильтрация по признакам национальности, профессии, степени лояльности)","parent":"54bae4d0a868bc6fab4bcd17","__v":0,"id":"54bae4d1a868bc6fab4bcd1a"},{"_id":"54bae4daa868bc6fab4bcd32","name":"Одежда, обувь","parent":"54bae4d9a868bc6fab4bcd31","__v":0,"id":"54bae4daa868bc6fab4bcd32"},{"_id":"54bae4d9a868bc6fab4bcd30","name":"Дезинфекция","parent":"54bae4d8a868bc6fab4bcd2d","__v":0,"id":"54bae4d9a868bc6fab4bcd30"},{"_id":"54bae4d8a868bc6fab4bcd2f","name":"Сортировка","parent":"54bae4d8a868bc6fab4bcd2d","__v":0,"id":"54bae4d8a868bc6fab4bcd2f"},{"_id":"54bae4dda868bc6fab4bcd3c","name":"игра в карты","parent":"54bae4dda868bc6fab4bcd3b","__v":0,"id":"54bae4dda868bc6fab4bcd3c"},{"_id":"54bae4d5a868bc6fab4bcd26","name":"Администрация","parent":"54bae4d5a868bc6fab4bcd25","__v":0,"id":"54bae4d5a868bc6fab4bcd26"},{"_id":"54bae4d7a868bc6fab4bcd2c","name":"соседние лагеря","parent":"54bae4d6a868bc6fab4bcd29","__v":0,"id":"54bae4d7a868bc6fab4bcd2c"},{"_id":"54bae4d9a868bc6fab4bcd31","name":"Повседневность:","parent":"54bae4d0a868bc6fab4bcd16","__v":0,"id":"54bae4d9a868bc6fab4bcd31"},{"_id":"54bae4dba868bc6fab4bcd37","name":"Обмен","parent":"54bae4d9a868bc6fab4bcd31","__v":0,"id":"54bae4dba868bc6fab4bcd37"},{"_id":"54bae4e0a868bc6fab4bcd45","name":"взаимопомощь","parent":"54bae4dfa868bc6fab4bcd41","__v":0,"id":"54bae4e0a868bc6fab4bcd45"},{"_id":"54bae4e5a868bc6fab4bcd51","name":"украинцы","parent":"54bae4e1a868bc6fab4bcd48","__v":0,"id":"54bae4e5a868bc6fab4bcd51"},{"_id":"54bae4d6a868bc6fab4bcd28","name":"Вольнонаёмные","parent":"54bae4d5a868bc6fab4bcd25","__v":0,"id":"54bae4d6a868bc6fab4bcd28"},{"_id":"54bae4dea868bc6fab4bcd40","name":"оркестр","parent":"54bae4dea868bc6fab4bcd3f","__v":0,"id":"54bae4dea868bc6fab4bcd40"},{"_id":"54bae4e0a868bc6fab4bcd44","name":"землячества","parent":"54bae4dfa868bc6fab4bcd41","__v":0,"id":"54bae4e0a868bc6fab4bcd44"},{"_id":"54bae4dda868bc6fab4bcd3d","name":"смена фамилии","parent":"54bae4dda868bc6fab4bcd3b","__v":0,"id":"54bae4dda868bc6fab4bcd3d"},{"_id":"54bae4e2a868bc6fab4bcd4a","name":"чехи","parent":"54bae4e1a868bc6fab4bcd48","__v":0,"id":"54bae4e2a868bc6fab4bcd4a"},{"_id":"54bae4e3a868bc6fab4bcd4c","name":"сербы (югославы)","parent":"54bae4e1a868bc6fab4bcd48","__v":0,"id":"54bae4e3a868bc6fab4bcd4c"},{"_id":"54bae4e4a868bc6fab4bcd4f","name":"поляки","parent":"54bae4e1a868bc6fab4bcd48","__v":0,"id":"54bae4e4a868bc6fab4bcd4f"},{"_id":"54bae4e6a868bc6fab4bcd54","name":"хорваты","parent":"54bae4e1a868bc6fab4bcd48","__v":0,"id":"54bae4e6a868bc6fab4bcd54"},{"_id":"54bae4e9a868bc6fab4bcd5b","name":"грузины","parent":"54bae4e1a868bc6fab4bcd48","__v":0,"id":"54bae4e9a868bc6fab4bcd5b"},{"_id":"54bae4e7a868bc6fab4bcd56","name":"туркмены","parent":"54bae4e1a868bc6fab4bcd48","__v":0,"id":"54bae4e7a868bc6fab4bcd56"},{"_id":"54bae4e6a868bc6fab4bcd53","name":"армяне","parent":"54bae4e1a868bc6fab4bcd48","__v":0,"id":"54bae4e6a868bc6fab4bcd53"},{"_id":"54bae4eaa868bc6fab4bcd5e","name":"другие дети","parent":"54bae4e9a868bc6fab4bcd5c","__v":0,"id":"54bae4eaa868bc6fab4bcd5e"},{"_id":"54bae4e7a868bc6fab4bcd55","name":"белорусы","parent":"54bae4e1a868bc6fab4bcd48","__v":0,"id":"54bae4e7a868bc6fab4bcd55"},{"_id":"54bae4e5a868bc6fab4bcd50","name":"евреи","parent":"54bae4e1a868bc6fab4bcd48","__v":0,"id":"54bae4e5a868bc6fab4bcd50"},{"_id":"54bae4e8a868bc6fab4bcd59","name":"бельгийцы","parent":"54bae4e1a868bc6fab4bcd48","__v":0,"id":"54bae4e8a868bc6fab4bcd59"},{"_id":"54bae4eaa868bc6fab4bcd5f","name":"Болезни, медицина","parent":"54bae4d0a868bc6fab4bcd16","__v":0,"id":"54bae4eaa868bc6fab4bcd5f"},{"_id":"54bae4eba868bc6fab4bcd60","name":"гинекология","parent":"54bae4eaa868bc6fab4bcd5f","__v":0,"id":"54bae4eba868bc6fab4bcd60"},{"_id":"54bae4e3a868bc6fab4bcd4b","name":"словаки","parent":"54bae4e1a868bc6fab4bcd48","__v":0,"id":"54bae4e3a868bc6fab4bcd4b"},{"_id":"54bae4e8a868bc6fab4bcd58","name":"итальянцы","parent":"54bae4e1a868bc6fab4bcd48","__v":0,"id":"54bae4e8a868bc6fab4bcd58"},{"_id":"54bae4e3a868bc6fab4bcd4d","name":"англичане","parent":"54bae4e1a868bc6fab4bcd48","__v":0,"id":"54bae4e3a868bc6fab4bcd4d"},{"_id":"54bae4e8a868bc6fab4bcd5a","name":"голландцы","parent":"54bae4e1a868bc6fab4bcd48","__v":0,"id":"54bae4e8a868bc6fab4bcd5a"},{"_id":"54bae4e4a868bc6fab4bcd4e","name":"французы","parent":"54bae4e1a868bc6fab4bcd48","__v":0,"id":"54bae4e4a868bc6fab4bcd4e"},{"_id":"54bae4eca868bc6fab4bcd62","name":"травматология","parent":"54bae4eaa868bc6fab4bcd5f","__v":0,"id":"54bae4eca868bc6fab4bcd62"},{"_id":"54bae4e5a868bc6fab4bcd52","name":"цыгане","parent":"54bae4e1a868bc6fab4bcd48","__v":0,"id":"54bae4e5a868bc6fab4bcd52"},{"_id":"54c905c8451f2549eee4b310","name":"New Subject","parent":"","__v":0,"id":"54c905c8451f2549eee4b310"},{"_id":"54c90609451f25f4d943a04f","name":"bbbbb","parent":"","__v":0,"id":"54c90609451f25f4d943a04f"},{"_id":"54c906c7451f2503304dddaf","name":"aaaadf","parent":"54c90609451f25f4d943a04f","__v":0,"id":"54c906c7451f2503304dddaf"},{"_id":"54c9116c972f4f931205ff32","name":"New Subject","parent":"54c906c7451f2503304dddaf","__v":0,"id":"54c9116c972f4f931205ff32"},{"_id":"54c91201972f4f931205ff33","name":"New Subject","parent":"54c905c8451f2549eee4b310","__v":0,"id":"54c91201972f4f931205ff33"},{"_id":"54c91221972f4f931205ff34","name":"New Subject","parent":"54c91201972f4f931205ff33","__v":0,"id":"54c91221972f4f931205ff34"},{"_id":"54c91238972f4f931205ff35","name":"New Subject","parent":"54c91201972f4f931205ff33","__v":0,"id":"54c91238972f4f931205ff35"},{"_id":"54c9125a451f25d0ccdb81ae","name":"New Subject","parent":"54c91221972f4f931205ff34","__v":0,"id":"54c9125a451f25d0ccdb81ae"},{"_id":"54c913ad451f25aa8fabccd3","name":"New Subject","parent":"54c91201972f4f931205ff33","__v":0,"id":"54c913ad451f25aa8fabccd3"},{"_id":"54c913cd451f25ff41364739","name":"New Subject","parent":"54c91221972f4f931205ff34","__v":0,"id":"54c913cd451f25ff41364739"},{"_id":"54c91404451f25150fe9c439","name":"klasdjfadsf","parent":"54c91221972f4f931205ff34","__v":0,"id":"54c91404451f25150fe9c439"},{"_id":"54b8f267a868bc4fd8ca4a49","name":"Довоенный период","description":"","parent":"","__v":0,"id":"54b8f267a868bc4fd8ca4a49"},{"_id":"54ce8847aca33cdb82a05e0a","name":"Организация повседневной жизни","parent":"54bae9e6a868bc3ec7fb5ae6","__v":0,"id":"54ce8847aca33cdb82a05e0a"},{"_id":"54ce885caca33cdb82a05e0b","name":"Сельская местность","parent":"54ce8847aca33cdb82a05e0a","__v":0,"id":"54ce885caca33cdb82a05e0b"},{"_id":"54d8aab4a868bc0e08306a67","name":"New Subject 5","parent":"","__v":0,"id":"54d8aab4a868bc0e08306a67"},{"_id":"550035582c1b8368cc1ab2cf","name":"New Subject","parent":"","__v":0,"id":"550035582c1b8368cc1ab2cf"},{"_id":"550039d72c1b83e60cc36973","name":"New Subject","parent":"","__v":0,"id":"550039d72c1b83e60cc36973"},{"_id":"55003b5e2c1b8399f9323af4","name":"New Subject","parent":"","__v":0,"id":"55003b5e2c1b8399f9323af4"},{"_id":"55003b822c1b8399f9323af5","name":"New Subject","parent":"","__v":0,"id":"55003b822c1b8399f9323af5"}];


var LocalBackend = function(opts) {
};

LocalBackend.Prototype = function() {

  // Document
  // ------------------

  this.getDocument = function(documentId, cb) {
    var doc = new Interview(EXAMPLE_DOC);
    window.doc = doc;
    cb(null, doc);
  };

  this.saveDocument = function(doc, cb) {
    cb(new Error("Saving not supported in dev mode"));
  };

  // Entities
  // ------------------

  this.getEntities = function(entityIds, cb) {
    // Clone array so we can make
    var entities = Substance.filter(ENTITIES, function(entity) {
      return Substance.includes(entityIds, entity.id);
    });
    cb(null, entities);
  };

  this.getSuggestedEntities = function(cb) {
    cb(null, SUGGESTED_ENTITIES);
  };

  this.searchEntities = function(searchStr, cb) {
    cb(null, SEARCH_RESULT);
  };

  // Subjects
  // ------------------

  this.getSubjects = function(cb) {
    cb(null, SUBJECTS);
  };

};

Substance.initClass(LocalBackend);

module.exports = LocalBackend;
},{"../data/sample_doc":2,"./interview":193,"substance":5,"substance/helpers":4}],209:[function(require,module,exports){
"use strict";

var Substance = require("substance");


// Notification service
// ----------------
//

var NotificationService = function() {
  NotificationService.super.call(this);
  this.messages = [];
};

NotificationService.Prototype = function() {

  this.addMessage = function(msg) {
    this.messages.push(msg);
    this.emit('messages:updated', this.messages);
  };

  this.log = function(msg) {
    this.addMessage({
      type: 'info',
      message: msg
    });
  };

  this.error = function(msg) {
    this.addMessage({
      type: 'error',
      message: msg
    });
  };

  this.warn = this.log;
  this.info = this.log;

  this.clearMessages = function() {
    this.messages = [];
    this.emit('messages:updated', this.messages);
  };
};

Substance.inherit(NotificationService, Substance.EventEmitter);

module.exports = NotificationService;
},{"substance":5}],210:[function(require,module,exports){
"use strict";

var stateHandlers = require("./state_handlers");

module.exports = {
  name: "archivist",
  panels: [],
  stateHandlers: stateHandlers,
  tools: []
};

},{"./state_handlers":211}],211:[function(require,module,exports){
var $$ = React.createElement;

var stateHandlers = {

  handleSelectionChange: function(writerCtrl, sel) {
    var surface = writerCtrl.getSurface();
    if (surface.name !== "content") return;

    if (sel.isNull() || !sel.isPropertySelection()) return;

    var range = sel.getTextRange();
    var annotations = writerCtrl.doc.annotationIndex.get(sel.getPath(), range[0], range[1], "reference");
    

    // Switch to a neutral state if no annotation matches have been found
    if (annotations.length === 0 && writerCtrl.state.contextId !== "editSubjectReference") {
      var prevContextId = writerCtrl.state.contextId;
      var nextContextId = "entities";

      if (prevContextId === "editSubjectReference" || prevContextId === "subjects") {
        nextContextId = "subjects";
      }

      writerCtrl.replaceState({
        contextId: nextContextId
      });
      return true;
    }
  }
};

module.exports = stateHandlers;
},{}],212:[function(require,module,exports){
var Substance = require("substance");
var $$ = React.createElement;

// Entity types
var Prison = require("./entity_types/prison");
var Toponym = require("./entity_types/toponym");
var Person = require("./entity_types/person");
var Definition = require("./entity_types/definition");

var _ = require("substance/helpers");

var EntitiesPanel = React.createClass({
  displayName: "Entities",

  contextTypes: {
    backend: React.PropTypes.object.isRequired
  },

  getReferencedEntityIds: function() {
    var doc = this.props.writerCtrl.doc;
    var entityReferences = doc.entityReferencesIndex.get();
    return _.map(entityReferences, function(entityRef, key) {
      return entityRef.target;
    });
  },

  // Data loading methods
  // ------------

  loadEntities: function() {
    var self = this;

    var backend = this.context.backend;
    var entityIds = self.getReferencedEntityIds();

    backend.getEntities(entityIds, function(err, entities) {
      // window.cache.entities = entities;

      // Finished simulated loading of entities
      self.setState({
        entities: entities
      });
    });
  },


  // State relevant things
  // ------------

  getInitialState: function() {
    return {
      entities: []
    };
  },

  // Events
  // ------------

  componentDidMount: function() {
    this.loadEntities();
  },

  componentWillReceiveProps: function() {
    this.loadEntities();
  },

  handleToggle: function(entityId) {
    var writerCtrl = this.props.writerCtrl;

    if (writerCtrl.state.entityId === entityId) {
      writerCtrl.replaceState({
        contextId: "entities"
      });
    } else {
      writerCtrl.replaceState({
        contextId: "entities",
        entityId: entityId
      });
    }
  },

  // Rendering
  // -------------------

  getEntityElement: function(entity) {
    entity.handleToggle = this.handleToggle;

    if (entity.type === "prison") {
      return $$(Prison, entity);
    } else if (entity.type === "toponym") {
      return $$(Toponym, entity);
    } else if (entity.type === "person") {
      return $$(Person, entity);
    } else if (entity.type === "definition") {
      return $$(Definition, entity);
    }
    throw new Error('No view component for '+ entity.type);
  },

  render: function() {
    var state = this.state;
    var props = this.props;

    var getElem = this.getEntityElement;
    var entityNodes = state.entities.map(function(entity, index) {
      // Dynamically assign active state
      entity.active = entity.id === props.entityId;
      entity.key = entity.id;
      return getElem(entity);
    });

    return $$("div", {className: "panel entities-panel-component"},
      $$('div', {className: 'panel-content'},
        $$('div', {className: 'entities'},
          entityNodes
        )
      )
    );
  }
});

EntitiesPanel.contextId = "entities";
EntitiesPanel.icon = "fa-bullseye";

module.exports = EntitiesPanel;

},{"./entity_types/definition":213,"./entity_types/person":215,"./entity_types/prison":216,"./entity_types/toponym":217,"substance":5,"substance/helpers":4}],213:[function(require,module,exports){
var $$ = React.createElement;
var EntityMixin = require("./entity_mixin");

// Definition view
// ----------------

var Definition = React.createClass({
  displayName: "Definition",
  mixins: [EntityMixin],
  render: function() {
    var className = ["entity definition"];
    if (this.props.active) className.push("active");

    return $$("div", {className: className.join(" "), onClick: this.handleToggle},
      $$("div", {className: "type"}, "Definition"),
      $$("div", {className: "title"}, this.props.title),
      $$("div", {className: "description"}, this.props.description)
    );
  }
});

module.exports = Definition;
},{"./entity_mixin":214}],214:[function(require,module,exports){
var EntityMixin = {
  // Handles click to activate an entity
  handleToggle: function(e) {
    console.log('handle toggle');
    this.props.handleToggle(this.props.id);
    e.preventDefault();
  }
};

module.exports = EntityMixin;
},{}],215:[function(require,module,exports){
var $$ = React.createElement;
var EntityMixin = require("./entity_mixin");

// Prison view
// ----------------

var Person = React.createClass({
  displayName: "Person",
  mixins: [EntityMixin],
  render: function() {
    var className = ["entity person"];
    if (this.props.active) className.push("active");

    return $$("div", {className: className.join(" "), onClick: this.handleToggle},
      $$("div", {className: "type"}, "Person"),
      $$("div", {className: "name"}, this.props.name),
      $$("div", {className: "description"}, this.props.description)
    );
  }
});

module.exports = Person;
},{"./entity_mixin":214}],216:[function(require,module,exports){
var $$ = React.createElement;
var EntityMixin = require("./entity_mixin");

// Prison view
// ----------------

var Prison = React.createClass({
  displayName: "Prison",
  mixins: [EntityMixin],
  render: function() {
    var className = ["entity prison"];
    if (this.props.active) className.push("active");

    return $$("div", {className: className.join(" "), onClick: this.handleToggle},
      $$("div", {className: "type"}, "Prison"),
      $$("div", {className: "name"}, this.props.name),
      $$("div", {className: "synonyms"}, "Also known as: "+ this.props.synonyms),
      $$("div", {className: "country"}, "Country: "+this.props.country),
      $$("div", {className: "description"}, this.props.description)
    );
  }
});

module.exports = Prison;
},{"./entity_mixin":214}],217:[function(require,module,exports){
var $$ = React.createElement;
var EntityMixin = require("./entity_mixin");

// Toponym view
// ----------------

var Toponym = React.createClass({
  displayName: "Toponym",
  mixins: [EntityMixin],
  render: function() {
    var className = ["entity toponym"];
    if (this.props.active) className.push("active");

    return $$("div", {className: className.join(" "), onClick: this.handleToggle},
      $$("div", {className: "type"}, "Toponym"),
      $$("div", {className: "name"}, this.props.name),
      $$("div", {className: "synonyms"}, "Also known as: "+ this.props.synonyms),
      $$("div", {className: "country"}, "Country: "+this.props.country),
      $$("div", {className: "description"}, this.props.description)
    );
  }
});

module.exports = Toponym;
},{"./entity_mixin":214}],218:[function(require,module,exports){
var EntitiesPanel = require("./entities_panel");
var TagEntityPanel = require("./tag_entity_panel");
var TagEntityTool = require("./tag_entity_tool");
var ShowEntityReferencePanel = require("./show_entity_reference_panel");
var stateHandlers = require("./state_handlers");

module.exports = {
  name: "entities",
  panels: [
    EntitiesPanel,
    TagEntityPanel,
    ShowEntityReferencePanel
  ],
  stateHandlers: stateHandlers,
  tools: [
    TagEntityTool
  ]
};

},{"./entities_panel":212,"./show_entity_reference_panel":219,"./state_handlers":220,"./tag_entity_panel":221,"./tag_entity_tool":222}],219:[function(require,module,exports){
var Substance = require("substance");
var $$ = React.createElement;

// Entity types
var Prison = require("./entity_types/prison");
var Toponym = require("./entity_types/toponym");
var Person = require("./entity_types/person");
var Definition = require("./entity_types/definition");
var _ = require("substance/helpers");

var ShowEntityReferencePanel = React.createClass({
  displayName: "Entity",

  contextTypes: {
    backend: React.PropTypes.object.isRequired
  },

  // Data loading methods
  // ------------

  loadEntity: function(props) {
    props = props || this.props;
    var doc = props.writerCtrl.doc;
    var self = this;
    var entityRef = doc.get(props.entityReferenceId);

    var backend = this.context.backend;

    backend.getEntities([entityRef.target], function(err, entities) {
      // Finished simulated loading of entities
      self.setState({
        entity: entities[0]
      });
    }.bind(this));
  },

  // State relevant things
  // ------------

  getInitialState: function() {
    return {
      entity: null
    };
  },

  // Events
  // ------------

  componentDidMount: function() {
    this.loadEntity();
  },

  componentWillReceiveProps: function(nextProps) {
    this.loadEntity(nextProps);
  },

  handleToggle: function(entityId) {
    // do nothing...
  },

  // Rendering
  // -------------------

  getEntityElement: function(entity) {
    entity.handleToggle = this.handleToggle;

    if (entity.type === "prison") {
      return $$(Prison, entity);
    } else if (entity.type === "toponym") {
      return $$(Toponym, entity);
    } else if (entity.type === "person") {
      return $$(Person, entity);
    } else if (entity.type === "definition") {
      return $$(Definition, entity);
    }
    throw new Error('No view component for '+ entity.type);
  },

  handleCancel: function(e) {
    e.preventDefault();
    this.props.writerCtrl.replaceState({
      contextId: "entities"
    });
  },

  handleEdit: function(e) {
    e.preventDefault();
    this.props.writerCtrl.replaceState({
      contextId: "tagentity",
      entityReferenceId: this.props.entityReferenceId
    });
  },

  handleDeleteReference: function(e) {
    e.preventDefault();
    var writerCtrl = this.props.writerCtrl;
    var doc = this.props.writerCtrl.doc;
    var tx = doc.startTransaction();

    try {
      tx.delete(this.props.entityReferenceId);
      tx.save();
      writerCtrl.replaceState({
        contextId: "entities"
      });
    } finally {
      tx.cleanup();
    }
  },

  render: function() {
    var state = this.state;
    var props = this.props;

    var entityItem;

    if (this.state.entity) {
      entityItem = this.getEntityElement(this.state.entity);
    } else {
      entityItem = $$('div', null, 'loading...');
    }

    return $$("div", {className: "panel dialog show-entity-reference-panel-component"},
      // Dialog Header
      $$('div', {className: "dialog-header"},
        $$('a', {
          href: "#",
          className: 'back',
          onClick: this.handleCancel,
          dangerouslySetInnerHTML: {__html: '<i class="fa fa-chevron-left"></i>'}
        }),
        $$('div', {className: 'label'}, "Related entity"),
        $$('div', {className: 'actions'},
          $$('a', {
            href: "#",
            className: "edit-reference",
            onClick: this.handleEdit,
            dangerouslySetInnerHTML: {__html: '<i class="fa fa-pencil"></i> Edit'}
          }),
          $$('a', {
            href: "#",
            className: "delete-reference",
            onClick: this.handleDeleteReference,
            dangerouslySetInnerHTML: {__html: '<i class="fa fa-trash"></i> Remove'}
          })
        )
      ),
      // Panel Content
      $$('div', {className: 'panel-content'},
        $$('div', {className: 'entities'},
          entityItem
        )
      )
    );
  }
});

ShowEntityReferencePanel.contextId = "showEntityReference";
ShowEntityReferencePanel.icon = "fa-bullseye";

// No toggle is shown
ShowEntityReferencePanel.isDialog = true;

module.exports = ShowEntityReferencePanel;

},{"./entity_types/definition":213,"./entity_types/person":215,"./entity_types/prison":216,"./entity_types/toponym":217,"substance":5,"substance/helpers":4}],220:[function(require,module,exports){
var EntitiesPanel = require("./entities_panel");
var TagEntityPanel = require("./tag_entity_panel");

var ShowEntityReferencePanel = require("./show_entity_reference_panel")
var $$ = React.createElement;

var stateHandlers = {

  // Handle Context Panel creation
  // -----------------
  //
  // Returns a new panel element if a particular state is matched

  handleContextPanelCreation: function(writerCtrl) {
    var state = writerCtrl.getState();

    if (state.contextId === "entities") {
      return $$(EntitiesPanel, {
        writerCtrl: writerCtrl,
        entityId: state.entityId
      });
    } else if (state.contextId === "showEntityReference") {
      return $$(ShowEntityReferencePanel, {
        writerCtrl: writerCtrl,
        entityReferenceId: state.entityReferenceId
      });
    } else if (state.contextId === "tagentity") {
      return $$(TagEntityPanel, {
        writerCtrl: writerCtrl,
        path: state.path,
        range: state.range,
        entityReferenceId: state.entityReferenceId,
        searchString: state.searchString
      });
    }
  },

  // Handle selection change
  // -----------------
  //
  // => modifies state
  //
  // When user navigates over a reference somewhere, the extension gets the chance to
  // manipulate writer state (e.g. switching the contextId) so a custom panel
  // can display contextual information.

  handleSelectionChange: function(writerCtrl, sel, annotations) {
    if (sel.isNull() || !sel.isPropertySelection() || !sel.isCollapsed()) return;
    var range = sel.getTextRange();
    var annotations = writerCtrl.doc.annotationIndex.get(sel.getPath(), range[0], range[1], "entity_reference");
    var surface = writerCtrl.getSurface();
    if (surface.name !== "content") return false;
    if (annotations.length > 0) {
      var ref = annotations[0];
      writerCtrl.replaceState({
        contextId: ShowEntityReferencePanel.contextId,
        entityReferenceId: ref.id
      });
      return true;
    }
  },

  // Determine highlighted nodes
  // -----------------
  //
  // => inspects state
  //
  // Based on writer state, determine which nodes should be highlighted in the content panel
  // @returns a list of nodes to be highlighted

  getHighlightedNodes: function(writerCtrl) {
    var doc = writerCtrl.doc;
    var state = writerCtrl.getState();

    // Let the extension handle which nodes should be highlighted
    if (state.contextId === "entities" && state.entityId) {
      // Use reference handler
      var references = Object.keys(doc.references.get(state.entityId));
      return references;
    } else if (state.entityReferenceId) {
      return [state.entityReferenceId];
    }
  }
};

module.exports = stateHandlers;
},{"./entities_panel":212,"./show_entity_reference_panel":219,"./tag_entity_panel":221}],221:[function(require,module,exports){
var $$ = React.createElement;

var TYPE_LABELS = {
  "prison": "Prison",
  "toponym": "Toponym",
  "person": "Person",
  "definition": "Definition"
};

// Example of a sub view
// ----------------

var EntityView = React.createClass({
  displayName: "Entity",

  handleClick: function(e) {
    e.preventDefault();
    this.props.handleSelection(this.props.id);
  },

  render: function() {
    var className = ["entity", this.props.type];
    if (this.props.active) className.push("active");

    var props = [
      $$("div", {className: "type"}, TYPE_LABELS[this.props.type]),
      $$("div", {className: "name"}, this.props.name || this.props.title)
    ];

    if (this.props.synonyms) {
      props.push($$("div", {className: "synonyms"}, "Also known as: "+this.props.synonyms));
    }

    if (this.props.country) {
      props.push($$("div", {className: "country"}, "Country: "+this.props.country));
    }

    if (this.props.type == 'person') {
      var description = this.props.description;
      // Trim person description if it's too long
      if (description.length > 100) description = description.substring(0, 100) + '...';
      props.push($$("div", {className: "description"}, description));
    }

    return $$("div", {
      className: className.join(" "),
      onClick: this.handleClick
    }, props);
  }
});

// Entities Panel extension
// ----------------

var TagEntityPanel = React.createClass({
  displayName: "Tag Entity",

  contextTypes: {
    backend: React.PropTypes.object.isRequired
  },

  handleCancel: function(e) {
    e.preventDefault();
    console.log('props', this.props);
    if (this.props.entityReferenceId) {
      // Go back to show entities panel
      this.props.writerCtrl.replaceState({
        contextId: "showEntityReference",
        entityReferenceId: this.props.entityReferenceId
      });
    } else {
      // Go to regular entities panel
      this.props.writerCtrl.replaceState({
        contextId: "entities"
      });
    }
  },

  // Data loading methods
  // ------------

  loadEntities: function(searchString) {
    var self = this;

    var backend = this.context.backend;

    if (searchString) {
      backend.searchEntities(searchString, function(err, entities) {
        self.setState({
          entities: entities
        });
      });
    } else {
      backend.getSuggestedEntities(function(err, entities) {
        self.setState({
          entities: entities
        });
      });
    }
  },

  // State relevant things
  // ------------

  getInitialState: function() {
    return {
      searchString: this.props.searchString,
      entities: []
    };
  },

  // Events
  // ------------

  componentDidMount: function() {
    this.loadEntities("");
  },

  handleSearchStringChange: function(e) {
    var searchString = e.target.value;
    this.setState({searchString: searchString});
    this.loadEntities(searchString);
  },

  // Called with entityId when an entity has been clicked
  handleSelection: function(entityId) {
    var writerCtrl = this.props.writerCtrl;
    var entityReferenceId = this.props.entityReferenceId;

    if (entityReferenceId) {
      var tx = writerCtrl.doc.startTransaction();
      try {
        tx.set([entityReferenceId, "target"], entityId);
        tx.save({});
      } finally {
        tx.cleanup();
      }

      writerCtrl.replaceState({
        contextId: "showEntityReference",
        entityReferenceId: entityReferenceId
      });

    } else {
      var path = this.props.path;
      var range = this.props.range;

      var annotation = writerCtrl.annotate({
        type: "entity_reference",
        target: entityId,
        path: path,
        range: range
      });

      // Switch state to highlight newly created reference
      writerCtrl.replaceState({
        contextId: "showEntityReference",
        entityReferenceId: annotation.id
      });
    }

  },

  // Rendering
  // -------------------

  render: function() {
    var self = this;
    var entities = this.state.entities;
    var entityNodes;

    if (entities.length > 0) {
      entityNodes = entities.map(function(entity) {
        entity.handleSelection = self.handleSelection;
        return $$(EntityView, entity);
      });
    } else {
      entityNodes = [$$('div', {className: "no-results", text: "Loading suggestions"})];
    }

    return $$("div", {className: "panel dialog tag-entity-panel-component"},
      $$('div', {className: "dialog-header"},
        $$('a', {
          href: "#",
          className: 'back',
          onClick: this.handleCancel,
          dangerouslySetInnerHTML: {__html: '<i class="fa fa-chevron-left"></i>'}
        }),
        $$('div', {className: 'label'}, "Select entity")
      ),

      $$('div', {className: "panel-content"},
        $$('div', {className: "search", html: ""},
          $$('input', {
            className: "search-str",
            type: "text",
            placeholder: "Type to search for entities",//,
            value: this.state.searchString,
            onChange: this.handleSearchStringChange
          }) // ,
          // $$('select', {className: "entity-type"},
          //   $$('option', {value: ""}, "All"),
          //   $$('option', {value: "prison"}, "Prison"),
          //   $$('option', {value: "toponym"}, "Toponym"),
          //   $$('option', {value: "person"}, "Person"),
          //   $$('option', {value: "definition"}, "Definition")
          // )
        ),
        $$('div', {className: "entities"},
          entityNodes
        )
      )
    );
  }
});

// Panel configuration
// ----------------

TagEntityPanel.contextId = "tagentity";
TagEntityPanel.icon = "fa-bullseye";

// No context switch toggle is shown
TagEntityPanel.isDialog = true;

module.exports = TagEntityPanel;
},{}],222:[function(require,module,exports){
var $$ = React.createElement;

var TagEntityTool = React.createClass({
  displayName: "TagEntityTool",

  componentDidMount: function() {
    var writerCtrl = this.props.writerCtrl;
    writerCtrl.connect(this, {
      'selection:changed': this.handleSelectionChange
    });
  },

  handleSelectionChange: function(sel) {
    var writerCtrl = this.props.writerCtrl;

    if (sel.isNull() || !sel.isPropertySelection()) {
      this.setState({
        active: false,
        selected: false
      });
    } else {
      var range = sel.getTextRange();
      var annotations = writerCtrl.doc.annotationIndex.get(sel.getPath(), range[0], range[1], "entity_reference");
      var selected = false;
      var active = annotations.length === 0 && !sel.isCollapsed();

      this.setState({
        active: active,
        selected: selected
      });
    }
  },

  handleMouseDown: function(e) {
    e.preventDefault();
      
    var searchString = window.getSelection().toString();

    if (!this.state.active) return;

    var writerCtrl = this.props.writerCtrl;
    var sel = writerCtrl.getSelection();

    if (sel.isNull() || !sel.isPropertySelection()) return;

    var range = sel.getTextRange();
    var annotations = writerCtrl.doc.annotationIndex.get(sel.getPath(), range[0], range[1], "entity_reference");

    if (annotations.length > 0) {
      writerCtrl.deleteAnnotation(annotations[0].id);
      writerCtrl.replaceState({
        contextId: "entities"
      });
    } else {
      // Do nothing if selection is collapsed
      if (sel.isCollapsed()) return;
      writerCtrl.replaceState({
        contextId: "tagentity",
        path: sel.getPath(),
        range: sel.getTextRange(),
        searchString: searchString
      });
    }
  },

  handleClick: function(e) {
    e.preventDefault(e);
  },

  getInitialState: function() {
    return {
      active: false,
      selected: false
    };
  },

  render: function() {
    var classNames = ['tag-entity-tool-component', 'tool'];
    if (this.state.active) classNames.push("active");
    if (this.state.selected) classNames.push("selected");

    return $$("a", {
      className: classNames.join(' '),
      href: "#",
      title: 'Tag Entity',
      onMouseDown: this.handleMouseDown,
      onClick: this.handleClick,
      dangerouslySetInnerHTML: {__html: '<i class="fa fa-bullseye"></i>'}
    });
  }
});

module.exports = TagEntityTool;
},{}],223:[function(require,module,exports){
var CoreModule = require("substance/writer").CoreModule;

var ArchivistModule = require("./archivist");
var SubjectsModule = require("./subjects");
var EntitiesModule = require("./entities");
var MetadataModule = require("./metadata");
var TimecodesModule = require("./timecodes");

module.exports = [
  ArchivistModule,
  EntitiesModule,
  SubjectsModule,
  TimecodesModule,
  CoreModule// ,
  // MetadataModule
];

},{"./archivist":210,"./entities":218,"./metadata":224,"./subjects":228,"./timecodes":236,"substance/writer":190}],224:[function(require,module,exports){
var MetadataPanel = require("./metadata_panel");
var stateHandlers = require("./state_handlers");

module.exports = {
  name: "metadata",
  panels: [
    MetadataPanel
  ],
  stateHandlers: stateHandlers,
  tools: []
};

},{"./metadata_panel":225,"./state_handlers":226}],225:[function(require,module,exports){
var Substance = require("substance");
var $$ = React.createElement;
var Surface = Substance.Surface;

var TextProperty = require("substance/writer").TextProperty;

// Metadat Panel
// ------------------


var MetadataPanel = React.createClass({
  displayName: "Info",

  // State relevant things
  // ------------

  childContextTypes: {
    surface: React.PropTypes.object
  },

  getChildContext: function() {
    return {
      surface: this.surface
    };
  },

  getInitialState: function() {
    this.surface = new Surface(new Surface.FormEditor(this.props.writerCtrl.doc));
    return {};
  },

  componentDidMount: function() {
    this.props.writerCtrl.registerSurface(this.surface, "metadata");
    this.surface.attach(this.getDOMNode());
  },

  componentWillUnmount: function() {
    this.props.writerCtrl.unregisterSurface(this.surface);
    this.surface.detach();
  },

  createTextProperty: function(property) {
    return $$(TextProperty, {
      doc: this.props.writerCtrl.doc,
      path: [ "document", property],
      writerCtrl: this.props.writerCtrl,
    });
  },

  render: function() {
    var props = this.props;

    return $$("div", {className: "panel metadata-panel-component", contentEditable: true, 'data-id': "metadata"},
      $$('div', {className: 'panel-content'},
        $$('div', {className: 'biography'},
          $$('div', {className: 'label', contentEditable: false}, "Interview Subject Name"),
          this.createTextProperty("interview_subject_name"),
          $$('div', {className: 'label', contentEditable: false}, "Biography"),
          this.createTextProperty("interview_subject_bio"),
          $$('div', {className: 'label', contentEditable: false}, "Biography"),
          this.createTextProperty("interview_subject_bio")
        )
      )
    );
  }
});

MetadataPanel.contextId = "metadata";
MetadataPanel.icon = "fa-info";

module.exports = MetadataPanel;

},{"substance":5,"substance/writer":190}],226:[function(require,module,exports){
var MetadataPanel = require("./metadata_panel");
var $$ = React.createElement;

var stateHandlers = {

  // Handle Context Panel creation
  // -----------------
  // 
  // Returns a new panel element if a particular state is matched

  handleContextPanelCreation: function(writerCtrl) {
    var state = writerCtrl.getState();

    if (state.contextId === "metadata") {
      return $$(MetadataPanel, {
        writerCtrl: writerCtrl
      });
    }
  }
};

module.exports = stateHandlers;
},{"./metadata_panel":225}],227:[function(require,module,exports){
var $$ = React.createElement;

var SubjectsModel = require("./subjects_model");
var _ = require("substance/helpers");
var Tree = require("./tree_component");

// Edit Subject Reference Panel
// ----------------

var EditSubjectReferencePanel = React.createClass({
  displayName: "Tag subjects",

  contextTypes: {
    backend: React.PropTypes.object.isRequired
  },

  handleCancel: function(e) {
    e.preventDefault();
    // Go to regular entities panel
    this.props.writerCtrl.replaceState({
      contextId: "subjects"
    });
  },

  // Data loading methods
  // ------------

  loadSubjects: function() {
    var writerCtrl = this.props.writerCtrl;
    var backend = this.context.backend;

    backend.getSubjects(function(err, subjects) {
      this.setState({
        subjects: new SubjectsModel(writerCtrl.doc, subjects)
      });
    }.bind(this));
  },

  // State relevant things
  // ------------

  getInitialState: function() {
    return {
      subjects: null
    };
  },

  // Events
  // ------------

  componentDidMount: function() {
    var doc = this.props.writerCtrl.doc;
    doc.connect(this, {
      'document:changed': this.handleDocumentChange
    });
    this.loadSubjects();
  },

  handleDocumentChange: function(change, info) {
    // console.log('handle document change');
    var refId = this.props.subjectReferenceId;

    if (info.updateSubjectReference) return;

    if (change.isAffected([refId, "target"])) {
      this.forceUpdate();
    }
  },

  handleDeleteReference: function(e) {
    var writerCtrl = this.props.writerCtrl;
    var doc = this.props.writerCtrl.doc;
    var tx = doc.startTransaction();

    try {
      tx.delete(this.props.subjectReferenceId);
      tx.save();
      writerCtrl.replaceState({
        contextId: "subjects"
      });
    } finally {
      tx.cleanup();
    }
  },

  componentWillUnmount: function() {
    this.props.writerCtrl.doc.disconnect(this);
  },

  // Write changes in selection to document model
  // ------------

  updateSubjectReference: function(selectedNodes) {
    var subjectIds = Object.keys(selectedNodes);
    var tx = this.props.writerCtrl.doc.startTransaction();
    try {
      tx.set([this.props.subjectReferenceId, "target"], subjectIds);
      tx.save({}, {updateSubjectReference: true});
    } finally {
      tx.cleanup();
    }
  },

  // Rendering
  // -------------------

  render: function() {
    var treeEl;
    var doc = this.props.writerCtrl.doc;

    if (this.state.subjects) {
      treeEl = $$(Tree, {
        ref: "treeWidget",
        selectedNodes: doc.get(this.props.subjectReferenceId).target,
        tree: this.state.subjects.tree,
        onSelectionChanged: this.updateSubjectReference
      });
    } else {
      treeEl = $$('div', {className: "subjects-tree", ref: 'subjectsTree'}, "Loading subjects");
    }

    return $$("div", {className: "panel dialog edit-subject-reference-panel-component"},
      $$('div', {className: "dialog-header"},
        $$('a', {
          href: "#",
          className: 'back',
          onClick: this.handleCancel,
          dangerouslySetInnerHTML: {__html: '<i class="fa fa-chevron-left"></i>'}
        }),
        $$('div', {className: 'label'}, "Related subjects"),
        $$('div', {className: 'actions'},
          $$('a', {
            href: "#",
            className: "delete-reference",
            onClick: this.handleDeleteReference,
            dangerouslySetInnerHTML: {__html: '<i class="fa fa-trash"></i> Remove'}
          })
        )
      ),
      $$('div', {className: "panel-content"},
        treeEl
      )
    );
  }
});

// Panel configuration
// ----------------

EditSubjectReferencePanel.contextId = "editSubjectReference";
EditSubjectReferencePanel.icon = "fa-tag";

// No toggle is shown
EditSubjectReferencePanel.isDialog = true;

module.exports = EditSubjectReferencePanel;
},{"./subjects_model":231,"./tree_component":235,"substance/helpers":4}],228:[function(require,module,exports){
var SubjectsPanel = require("./subjects_panel");
var EditSubjectReferencePanel = require("./edit_subject_reference_panel");
var TagSubjectTool = require("./tag_subject_tool");
var stateHandlers = require("./state_handlers");

module.exports = {
  name: "subjects",
  panels: [
    SubjectsPanel,
    EditSubjectReferencePanel
  ],
  stateHandlers: stateHandlers,
  tools: [
  	TagSubjectTool
  ]
};

},{"./edit_subject_reference_panel":227,"./state_handlers":229,"./subjects_panel":232,"./tag_subject_tool":233}],229:[function(require,module,exports){
var SubjectsPanel = require("./subjects_panel");
var EditSubjectReferencePanel = require("./edit_subject_reference_panel");
var $$ = React.createElement;
var _ = require("substance/helpers");

var stateHandlers = {

  // Handle Context Panel creation
  // -----------------
  //
  // => inspects state
  //
  // Returns a new panel element if a particular state is matched

  handleContextPanelCreation: function(writerCtrl) {
    var s = writerCtrl.getState();

    if (s.contextId === SubjectsPanel.contextId) {
      return $$(SubjectsPanel, {
        writerCtrl: writerCtrl,
        // documentId: writer.props.doc.get('document').guid,
        subjectId: s.subjectId
      });
    } else if (s.contextId === EditSubjectReferencePanel.contextId && s.subjectReferenceId) {
      return $$(EditSubjectReferencePanel, {
        writerCtrl: writerCtrl,
        subjectReferenceId: s.subjectReferenceId
      });
    }
  },

  // Determine highlighted nodes
  // -----------------
  //
  // => inspects state
  //
  // Based on writer state, determine which nodes should be highlighted in the content panel
  // @returns a list of nodes to be highlighted

  getHighlightedNodes: function(writerCtrl) {
    var doc = writerCtrl.doc;
    var state = writerCtrl.getState();

    // When a subject has been clicked in the subjects panel
    if (state.contextId === "subjects" && state.subjectId) {
      var references = Object.keys(doc.subjectReferencesIndex.get(state.subjectId));
      return references;
    }

    // When a subject reference has been clicked and an edit dialog came up
    if (state.contextId === EditSubjectReferencePanel.contextId && state.subjectReferenceId) {
      return [state.subjectReferenceId];
    }
  },

  // Determine active subject reference nodes
  // -----------------
  //
  // => inspects state
  //
  // Based on writer state, determine which container nodes should be highlighted in the content panel
  // @returns a list of nodes to be highlighted

  getActiveContainerAnnotations: function(writerCtrl) {
    var state = writerCtrl.getState();

    // When a subject has been clicked in the subjects panel
    if (state.contextId === EditSubjectReferencePanel.contextId && state.subjectReferenceId) {
      return [ state.subjectReferenceId ];
    }
    if (state.contextId === "subjects" && state.subjectId) {
      var doc = writerCtrl.doc;
      var references = Object.keys(doc.subjectReferencesIndex.get(state.subjectId));
      return references;
    }
  }
};

module.exports = stateHandlers;
},{"./edit_subject_reference_panel":227,"./subjects_panel":232,"substance/helpers":4}],230:[function(require,module,exports){
var $$ = React.createElement;

// Subject view
// ----------------

var Subject = React.createClass({
  displayName: "Subject",

  handleToggle: function(e) {
    this.props.handleToggle(this.props.id);
    e.preventDefault();
  },

  render: function() {
    var className = ["subject", this.props.type];
    if (this.props.active) className.push("active");

    return $$("div", {className: className.join(" "), onClick: this.handleToggle},
      $$('div', {className: 'full-path'}, this.props.fullPath.join(" > "))
    );
  }
});


module.exports = Subject;
},{}],231:[function(require,module,exports){
var Tree = require("./tree");
var Substance = require("substance");

var SubjectsModel = function(doc, subjects) {
  this.doc = doc;

  // Convert subjects to hash
  this.subjects = {};

  Substance.each(subjects, function(subject) {
    this.subjects[subject.id] = subject;
  }, this);

  this.tree = new Tree(this.subjects);
};

// Get tree representation suitable for jsTree widget
// ----------------

SubjectsModel.prototype.getTree = function() {
  var tree = this.tree;

  function getChildren(parentId) {
    var res = [];
    var nodes = tree.getChildren(parentId);
    if (nodes.length === 0) return res; // exit condition

    Substance.each(nodes, function(node) {
      var entry = {
        id: node.id,
        text: node.name,
        children: getChildren(node.id) // get children for subj
      };
      res.push(entry);
    });
    return res;
  }

  return getChildren("root");
};


SubjectsModel.prototype.getAllReferencedSubjects = function() {
  var doc = this.doc;
  var subjectRefs = doc.subjectReferencesIndex.get();
  var subjects = [];

  Substance.each(subjectRefs, function(subjectRef) {
    Substance.each(subjectRef.target, function(subjectId) {
      var subject = this.tree.get(subjectId);
      if (!Substance.includes(subjects, subject)) {
        subjects.push(subject);  
      }
    }, this);
  }, this);

  return subjects;
};

SubjectsModel.prototype.getFullPathForSubject = function(subjectId) {
  var tree = this.tree;
  var res = [];

  function getParent(nodeId) {
    var node = tree.get(nodeId);
    var parent = tree.getParent(nodeId);
    if (parent) getParent(parent.id);

    res.push(node.name);
    return res;
  }
  return getParent(subjectId);
};

module.exports = SubjectsModel;
},{"./tree":234,"substance":5}],232:[function(require,module,exports){
var $$ = React.createElement;
var Substance = require("substance");
var SubjectsModel = require("./subjects_model");

// Sub component
var Subject = require("./subject");

// Subjects Panel extension
// ----------------
//
// TODO: make stateful something like this: http://blog.mgechev.com/2015/03/05/persistent-state-reactjs/

var SubjectsPanel = React.createClass({
  displayName: "Subjects",

  contextTypes: {
    backend: React.PropTypes.object.isRequired
  },

  // Data loading methods
  // ------------

  loadSubjects: function() {
    var writerCtrl = this.props.writerCtrl;
    var backend = this.context.backend;

    console.log('loading subjects...');
    
    backend.getSubjects(function(err, subjects) {
      this.setState({
        subjects: new SubjectsModel(writerCtrl.doc, subjects)
      });
    }.bind(this));
  },

  // State relevant things
  // ------------

  getInitialState: function() {
    // var writerCtrl = this.props.writerCtrl;
    // var subjects = new SubjectsModel(writerCtrl.doc, SUBJECTS);

    // return {
    //   subjects: subjects
    // };
    return {
      subjects: null
    }
  },

  // Events
  // ------------

  componentDidMount: function() {
    if (!this.state.subjects) {
      this.loadSubjects();
    }
  },

  handleToggle: function(subjectId) {
    var writerCtrl = this.props.writerCtrl;

    if (writerCtrl.state.subjectId === subjectId) {
      writerCtrl.replaceState({
        contextId: "subjects"
      });
    } else {
      writerCtrl.replaceState({
        contextId: "subjects",
        subjectId: subjectId
      });
    }
  },

  // Rendering
  // -------------------

  render: function() {
  	var state = this.state;
  	var props = this.props;
    var self = this;

    if (!state.subjects) {
      return $$("div", null, "Loading subjects ...");
    }

    // Only get referenced subjects
    var referencedSubjects = state.subjects.getAllReferencedSubjects();
    var subjectNodes = referencedSubjects.map(function(subject) {
      // Dynamically assign active state and a few other things
      subject.active = subject.id === props.subjectId;
      subject.key = subject.id;
      subject.handleToggle = self.handleToggle;
      subject.fullPath = state.subjects.getFullPathForSubject(subject.id);
      return $$(Subject, subject);
    });

    return $$("div", {className: "panel subjects-panel-component"},
      $$('div', {className: 'panel-content'},
        $$('div', {className: 'subjects'},
          subjectNodes
        )
      )
    );
  }
});

// Panel Configuration
// -----------------

SubjectsPanel.contextId = "subjects";
SubjectsPanel.icon = "fa-tag";

module.exports = SubjectsPanel;
},{"./subject":230,"./subjects_model":231,"substance":5}],233:[function(require,module,exports){
'use strict';

var Substance = require('substance');
var $$ = React.createElement;

// TagSubjectTool
// ----------------

var TagSubjectTool = React.createClass({
  displayName: "TagSubjectTool",

  componentDidMount: function() {
    var writerCtrl = this.props.writerCtrl;
    writerCtrl.connect(this, {
      'selection:changed': this.handleSelectionChange
    });
  },

  handleSelectionChange: function(sel) {
    var writerCtrl = this.props.writerCtrl;
    // Note: toggling of a subject reference is only possible when
    // the subject reference is selected and the
    if (sel.isNull() || sel.isCollapsed() ) {
      return this.setState({
        active: false,
        selected: false
      });
    } else {
      var container = writerCtrl.getSurface().getContainer();
      if (!container) {
        return this.setState({
          active: false,
          selected: false
        });
      }
      var newState = {
        active: true,
        selected: false,
        containerId: container.id
      };
      if (writerCtrl.state.contextId === "editSubjectReference") {
        var anno = writerCtrl.doc.get(writerCtrl.state.subjectReferenceId);
        if (!anno) {
          console.error("Ooops. Could not find subject-reference while being in 'editSubjectReference'.");
          return this.setState({
            active: false,
            selected: false
          });
        }
        var annoSel = Substance.Document.Selection.create(container,
          anno.startPath, anno.startOffset, anno.endPath, anno.endOffset);
        if (!annoSel.overlaps(sel)) {
          return this.setState({
            active: false,
            selected: false
          });
        }
        if (annoSel.includesWithOneBoundary(sel)) {
          newState.mode = 'truncate';
          newState.selected = true;
        } else if (annoSel.includes(sel)) {
          newState.mode = 'delete';
          newState.selected = false; // true;
          newState.active = false;
        } else {
          newState.mode = 'expand';
        }
        newState.annotationSelection = annoSel;
      } else {
        newState.mode = 'create';
      }
      this.setState(newState);
    }
  },

  handleClick: function(e) {
    e.preventDefault(e);
  },

  handleMouseDown: function(e) {
    e.preventDefault();
    if (!this.state.active) {
      return;
    }
    // toggle subject_reference on or off
    var writerCtrl = this.props.writerCtrl;
    var doc = writerCtrl.doc;
    var sel = writerCtrl.getSelection();
    if (sel.isNull() || sel.isCollapsed()) return;
    var range = sel.getRange();

    var tx = doc.startTransaction({selection: sel});
    if (this.state.mode === 'create') {
      try {
        var subjectReference = {
          type: "subject_reference",
          id: Substance.uuid("subject_reference"),
          container: this.state.containerId,
          startPath: range.start.path,
          startOffset: range.start.offset,
          endPath: range.end.path,
          endOffset: range.end.offset,
          target: []
        };
        tx.create(subjectReference);
        tx.save({selection: sel.collapse('left')});
        writerCtrl.replaceState({
          contextId: "editSubjectReference",
          subjectReferenceId: subjectReference.id,
          range: range
        });
      } finally {
        tx.cleanup();
      }
    } else if (this.state.mode === 'delete') {
      try {
        tx.delete(writerCtrl.state.subjectReferenceId);
        tx.save({selection: sel.collapse('left')});
        writerCtrl.replaceState({
          contextId: "subjects"
        });
      } finally {
        tx.cleanup();
      }
    } else if (this.state.mode === 'expand' || this.state.mode === 'truncate') {
      try {
        var anno = writerCtrl.doc.get(writerCtrl.state.subjectReferenceId);
        if (this.state.mode === 'expand') {
          sel = this.state.annotationSelection.expand(sel);
        } else {
          sel = this.state.annotationSelection.truncate(sel);
        }
        var newRange = sel.getRange();
        if (!Substance.isEqual(anno.startPath, newRange.start.path)) {
          tx.set([anno.id, 'startPath'], newRange.start.path);
        }
        if (!Substance.isEqual(anno.endPath, newRange.end.path)) {
          tx.set([anno.id, 'endPath'], newRange.end.path);
        }
        if (!Substance.isEqual(anno.startOffset, newRange.start.offset)) {
          tx.set([anno.id, 'startOffset'], newRange.start.offset);
        }
        if (!Substance.isEqual(anno.endOffset, newRange.end.offset)) {
          tx.set([anno.id, 'endOffset'], newRange.end.offset);
        }
        tx.save({});
      } finally {
        tx.cleanup();
      }
    } else  {
      throw new Error('Illegal state');
    }

    // HACK: using a custom event instead of automatic data bindings
    doc.emit('container-annotation-update');
  },

  getInitialState: function() {
    return {
      active: false,
      selected: false
    };
  },

  render: function() {
    var classNames = ['tag-subject-tool-component', 'tool'];
    if (this.state.active) classNames.push("active");
    if (this.state.selected) classNames.push("selected");
    return $$("a", {
      className: classNames.join(' '),
      href: "#",
      dangerouslySetInnerHTML: {__html: '<i class="fa fa-tag"></i>'},
      title: 'Tag Subject',
      onMouseDown: this.handleMouseDown,
      onClick: this.handleClick
    });
  }
});

module.exports = TagSubjectTool;
},{"substance":5}],234:[function(require,module,exports){
var Substance = require("substance");

// A simple tree implementation
// -------------

var Tree = function(nodes) {
  this.nodes = nodes;
  this.buildIndexes();
};

Tree.Prototype = function() {

  this.buildIndexes = function() {
    // Build a map of parents referencing their kids
    this.parentIndex = {};
    Substance.each(this.nodes, function(node) {
      var parent = node.parent || "root";
      if (!this.parentIndex[parent]) {
        this.parentIndex[parent] = [ node ];
      } else {
        this.parentIndex[parent].push(node);
      }
    }, this);
  };

  // Get a node by id
  this.get = function(id) {
    return this.nodes[id];
  };

  // Get children nodes for a given node using our parentIndex
  this.getChildren = function(nodeId) {
    return this.parentIndex[nodeId] || [];
  };

  // Get parent node for a given nodeId
  this.getParent = function(nodeId) {
    var node = this.nodes[nodeId];
    return this.nodes[node.parent];
  };

  // Walk the tree
  this.walkTree = function(fn, ctx) {
    var self = this;
    if (!ctx) ctx = this;

    function _walkTree(rootNode, fn, ctx) {
      if (rootNode !== "root") {
        fn.call(ctx, rootNode);
      }
      var children = self.getChildren(rootNode.id);
      Substance.each(self.getChildren(rootNode.id || rootNode), function(child) {
        _walkTree(child, fn, ctx);
      });
    }

    return _walkTree("root", fn, ctx);
  };
};

Tree.prototype = new Tree.Prototype();

module.exports = Tree;
},{"substance":5}],235:[function(require,module,exports){
var $$ = React.createElement;

var SubjectsModel = require("./subjects_model");
var _ = require("substance/helpers");

// Tree Node Component
// ---------------

var TreeNode = React.createClass({
  displayName: "TreeNode",

  render: function() {
    var node = this.props.node;
    var treeComp = this.props.treeComp;
    var tree = treeComp.props.tree;
    var childNodes = tree.getChildren(node.id);

    var childrenEls = [];
    if (this.props.node._expanded) {
      childrenEls = childNodes.map(function(node) {
        return $$(TreeNode, {
          treeComp: treeComp,
          key: node.id,
          node: node,
          handleSelection: this.props.handleSelection,
          handleExpansion: this.props.handleExpansion
        });
      }.bind(this));

      _.each(this.props.children, function(childNode) {
        childrenEls($$(TreeNode, {
          node: childNode
        }));
      });
    }

    var expandedIcon = node._expanded ? "fa-caret-down" : "fa-caret-right";
    var selectedIcon = node._selected ? "fa-check-square-o" : "fa-square-o";
    var hideExpand = childNodes.length === 0;

    return $$("div", {className: 'tree-node'+ (node._selected ? ' selected' : '') + (node._expanded ? ' expanded' : '')},
      $$('a', {
        "data-id": node.id,
        className: 'expand-toggle'+ (hideExpand ? ' hidden' : ''),
        onClick: this.props.handleExpansion,
        href: "#",
        dangerouslySetInnerHTML: {__html: '<i class="fa '+expandedIcon+'"></i>'}
      }),
      $$('a', {
        href: "#",
        "data-id": node.id,
        className: 'select-toggle',
        onClick: this.props.handleSelection,
        dangerouslySetInnerHTML: {__html: '<i class="fa '+selectedIcon+'"></i>'}
      }),
      $$('a', {
        href: "#",
        className: 'name',
        "data-id": node.id,
        onClick: this.props.handleSelection,
      }, node.name),
      $$('div', {className: 'children'}, childrenEls)
    );
  }
});

// Tree Component
// ---------------

var Tree = React.createClass({
  displayName: "Tree",

  componentWillMount: function() {
    this._prepare(this.props.selectedNodes);
  },

  componentWillReceiveProps: function(nextProps) {
    this._prepare(nextProps.selectedNodes);
  },

  // Preprocess tree to flag nodes accordingly
  // This prepares the state element, before a render happens
  _prepare: function(newSelectedNodes) {
    var tree = this.props.tree;

    // Reset everything
    tree.walkTree(function(node) {
      delete node._selected;
      delete node._expanded;
    });

    // Preprocess tree to flag nodes accordingly
    var selectedNodes = {};

    _.each(newSelectedNodes, function(nodeId) {
      selectedNodes[nodeId] = true;
    });

    function __expand(node) {
      if (!node) return;
      node._expanded = true;
      __expand(tree.get(node.parent));
    }

    tree.walkTree(function(node) {
      node._selected = selectedNodes[node.id];
      if (node._selected) {
        __expand(tree.get(node.parent));
      }
    });

    this.state = {
      tree: tree,
      selectedNodes: selectedNodes
    };
  },

  getInitialState: function() {
    return {
      selectedNodes: null,
      tree: null
    };
  },

  handleExpansion: function(e) {
    e.preventDefault();
    var nodeId = e.currentTarget.dataset.id;
    var tree = this.state.tree;
    var node = tree.get(nodeId);
    var selectedNodes = this.state.selectedNodes;

    if (node._expanded) {
      // Collapse
      node._expanded = false;
    } else {
      // Expand
      node._expanded = true;
    }

    this.setState({
      selectedNodes: selectedNodes,
      tree: tree
    });
  },

  handleSelection: function(e) {
    e.preventDefault();
    var nodeId = e.currentTarget.dataset.id;
    var tree = this.state.tree;
    var node = tree.get(nodeId);
    var selectedNodes = this.state.selectedNodes;

    if (selectedNodes[nodeId]) {
      // Deselect
      node._selected = false;
      delete selectedNodes[nodeId];
    } else {
      // Select
      node._selected = true;
      selectedNodes[nodeId] = true;
    }

    this.setState({
      selectedNodes: selectedNodes,
      tree: tree
    });
    
    this.props.onSelectionChanged(selectedNodes);
  },

  render: function() {
    var tree = this.state.tree;
    var childNodes = tree.getChildren("root");

    var childEls = childNodes.map(function(node) {
      return $$(TreeNode, {
        treeComp: this,
        key: node.id,
        node: node,
        handleSelection: this.handleSelection,
        handleExpansion: this.handleExpansion
      });
    }.bind(this));
    return $$("div", {className: 'tree-component'}, childEls);    
  }
});

module.exports = Tree;
},{"./subjects_model":231,"substance/helpers":4}],236:[function(require,module,exports){
var TimecodeTool = require("./timecode_tool");

module.exports = {
  name: "timecodes",
  panels: [
  
  ],
  tools: [
    TimecodeTool
  ]
};

},{"./timecode_tool":237}],237:[function(require,module,exports){
var BasicToolMixin = require("substance/writer").BasicToolMixin;

var TimecodeTool = React.createClass({
  mixins: [BasicToolMixin],
  displayName: "TimecodeTool",
  annotationType: "timecode",
  toolIcon: "fa-clock-o"
});

module.exports = TimecodeTool;
},{"substance/writer":190}]},{},[1]);
