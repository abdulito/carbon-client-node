var RestClient = require('@carbon-io/carbon-client')
var util = require('util')

// this will require fiberous so that syncifyClassMethod works
var __ = require('@carbon-io/fibers').__(module)

/***********************************************************************************************************************
 * monkey patch the endpoint class to support sync get/post/put/delete/head/patch
 */

var Endpoint = RestClient.super_

/***********************************************************************************************************************
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
/***********************************************************************************************************************
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

/***********************************************************************************************************************
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

/***********************************************************************************************************************
 * syncify Cursor methods
 */

syncifyClassMethod(Cursor, "next")
syncifyClassMethod(Cursor, "toArray")


/***********************************************************************************************************************
 *
 * @param cb
 * eachSync: sync version of each()
 * TODO: XXX this method is causing program to hang
 */
Cursor.prototype.eachSync = function(cb) {
  return this.each.sync.apply(this, arguments)
}
/***********************************************************************************************************************
 * exports
 */
module.exports = RestClient
