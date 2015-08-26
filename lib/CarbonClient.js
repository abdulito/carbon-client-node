var RestClient = require('carbon-client')
var util = require('util')
var fibrous = require('fibrous');

/****************************************************************************************************
 * monkey patch the endpoint class to support sync get/post/put/delete/head/patch
 */

var Endpoint = RestClient.super_

function syncifyClassMethod(clazz, methodName){

  var asyncMethod = clazz.prototype[methodName]

  clazz.prototype[methodName] = function() {
    // if last argument is a callback then run async
    if(arguments && (typeof(arguments[arguments.length-1]) === 'function') ) {
      asyncMethod.apply(this, arguments);
    } else { // sync call!
      return asyncMethod.sync.apply(this, arguments);
    }

  }

}

syncifyClassMethod(Endpoint, "get")

syncifyClassMethod(Endpoint, "post")

syncifyClassMethod(Endpoint, "put")

syncifyClassMethod(Endpoint, "delete")

syncifyClassMethod(Endpoint, "head")

syncifyClassMethod(Endpoint, "patch")





/****************************************************************************************************
 * exports
 */
module.exports = RestClient
