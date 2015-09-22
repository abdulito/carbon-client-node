var RestClient = require('carbon-client')
var util = require('util')
var fibrous = require('fibrous');

/****************************************************************************************************
 * monkey patch the endpoint class to support sync get/post/put/delete/head/patch
 */

var Endpoint = RestClient.super_

/****************************************************************************************************
 * syncifyClassMethod
 *
 * @param clazz the class
 * @param methodName name of the method to syncify
 */

function syncifyClassMethod(clazz, methodName) {

  var asyncMethod = clazz.prototype[methodName]

  clazz.prototype[methodName] = function() {
    // if last argument is a callback then run async
    if (arguments && (typeof(arguments[arguments.length-1]) === 'function') ) {
      asyncMethod.apply(this, arguments);
    } else { // sync call!
      return asyncMethod.sync.apply(this, arguments);
    }

  }

}
/****************************************************************************************************
 * syncify all Endpoint methods
 */
var ENDPOINT_METHODS = [
  "get",
  "post",
  "head",
  "put",
  "delete",
  "patch"
]

ENDPOINT_METHODS.forEach(function(m) { syncifyClassMethod(Endpoint, m) })

/****************************************************************************************************
 * syncify Collection methods
 */

var COLLECTION_METHODS = [
  "insert",
  "update",
  "remove"
]

var Collection = Endpoint.collectionClass
var CollectionCursor = Collection.collectionCursorClass
COLLECTION_METHODS.forEach(function(m) { syncifyClassMethod(Collection, m) })

/****************************************************************************************************
 * syncify CollectionCursor methods
 */

syncifyClassMethod(CollectionCursor, "next")
syncifyClassMethod(CollectionCursor, "toArray")


CollectionCursor.prototype.eachSync = function(cb) {
  return this.each.sync.apply(this, arguments)
}
/****************************************************************************************************
 * exports
 */
module.exports = RestClient
