var RestClient = require('@carbon-io/carbon-client')
var util = require('util')

/***************************************************************************************************
 * @namespace carbon-client-node
 */

// this will require fiberous so that syncifyClassMethod works
var __ = require('@carbon-io/fibers').__(module)

/***************************************************************************************************
 * monkey patch the endpoint class to support sync get/post/put/delete/head/patch
 */

var Endpoint = RestClient.super_

/***************************************************************************************************
 * @method syncifyClassMethod
 * @description syncifyClassMethod
 * @memberof carbon-client-node
 * @param {object} clazz -- the class
 * @param {string} methodName -- name of the method to syncify
 * @returns {function} -- xxx
 */

function syncifyClassMethod(clazz, methodName) {

  var asyncMethod = clazz.prototype[methodName]

  clazz.prototype[methodName] = function() {
    // if last argument is a callback then run async
    if (arguments && (typeof(arguments[arguments.length-1]) === 'function') ) {
      asyncMethod.apply(this, arguments)
    } else { // sync call!
      return asyncMethod.sync.apply(this, arguments)
    }
  }

}
/***************************************************************************************************
 * syncify all Endpoint methods
 */
var ENDPOINT_METHODS = [
  "get",
  "post",
  "head",
  "put",
  "delete",
  "patch",
  "options"
]

ENDPOINT_METHODS.forEach(function(m) { syncifyClassMethod(Endpoint, m) })

/***************************************************************************************************
 * syncify Collection methods
 */

var COLLECTION_METHODS = [
  "insert",
  "update",
  "remove",
  "removeObject",
  "findObject",
  "updateObject",
  "saveObject"
]

var Collection = Endpoint.collectionClass
var Cursor = Collection.cursorClass

COLLECTION_METHODS.forEach(function(m) { syncifyClassMethod(Collection, m) })

/***************************************************************************************************
 * syncify Cursor methods
 */

syncifyClassMethod(Cursor, "next")
syncifyClassMethod(Cursor, "toArray")

// Manually syncify Cursor.forEach because syncifyClassMethod cannot handle it since the last arg of the sync call
// is also a function
var asyncForEach = Cursor.prototype.forEach
Cursor.prototype.forEach = function(iterator, cb) {
  if (cb) {
    asyncForEach.apply(this, arguments)
  } else {
    asyncForEach.sync.apply(this, arguments)
  }
}

/***************************************************************************************************
 * exports
 */
module.exports = RestClient

if (typeof RestClient.$Test === "undefined") {
  Object.defineProperty(module.exports, '$Test', {
    enumerable: false,
    configurable: false,
    get: function() {
      return require('../test/index.js')
    }
  })
}
