var request = require('request')
var HttpErrors = require('http-errors')
var Collection = require('./Collection')

/******************************************************************************
 * @class Endpoint
 * @constructor
 *
 * This is a private class. Should not call Endpoint constructor directly, 
 * but should use RestClient.getEndpoint(path)
 */
function Endpoint(endpoint) {
  this.endpoint
}

/**********************************************************************
 * getAbsolutePath
 */
Endpoint.prototype.getAbsolutePath = function() {
  return this.endpoint.getAbsolutePath()
}

/**********************************************************************
 * getFullUrl
 */
Endpoint.prototype.getFullUrl = function() {
  return this.endpoint.getFullUrl()
}

/**********************************************************************
 * getEndpoint
 * 
 * @param path - (i.e. 'foo' or 'foo/bar')
 * @returns {*}
 */
Endpoint.prototype.getEndpoint = function(path) {
  return new Endpoint(this.endpoint.getEndpoint(path))
}

/**********************************************************************
 * getCollection
 */
Endpoint.prototype.getCollection = function(path) {
  return new Collection(this.endpoint.getCollection(path))
}

/**********************************************************************
 * get
 *
 * @param {Object} options (optional)
 * @param {Function} cb
 * 
 * Supported calling forms:
 *   get(cb)
 *   get(options, cb)
 */
Endpoint.prototype.get = function() {
  return this.endpoint.get.apply(this, arguments)
}

/**********************************************************************
 * post
 *
 * @param body (optional)
 * @param options (optional)
 * @param cb
 *
 * Supported calling forms:
 *   post(cb)
 *   post(body, cb)
 *   post(body, options, cb)
 */
Endpoint.prototype.post = function() {
  return this.endpoint.post.apply(this, arguments)
}

/**********************************************************************
 * put
 *
 * @param body (optional)
 * @param options (optional)
 * @param cb
 *
 * Supported calling forms:
 *   put(cb)
 *   put(body, cb)
 *   put(body, options, cb)
 */
Endpoint.prototype.put = function() {
  return this.endpoint.put.apply(this, arguments)
}

/**********************************************************************
 * patch
 *
 * @param body (optional)
 * @param options (optional)
 * @param cb
 *
 * Supported calling forms:
 *   patch(cb)
 *   patch(body, cb)
 *   patch(body, options, cb)
 */
Endpoint.prototype.patch = function() {
  return this.endpoint.patch.apply(this, arguments)
}

/**********************************************************************
 * delete
 *
 * @param body (optional)
 * @param options (optional)
 * @param cb
 *
 * Supported calling forms:
 *   delete(cb)
 *   delete(options, cb)
 */
Endpoint.prototype.delete = function() {
  return this.endpoint.delete.apply(this, arguments)
}

/**********************************************************************
 * head
 *
 * @param body (optional)
 * @param options (optional)
 * @param cb
 *
 * Supported calling forms:
 *   head(cb)
 *   head(options, cb)
 */
Endpoint.prototype.head = function() {
  return this.endpoint.head.apply(this, arguments)
}

/**********************************************************************
 * options
 *
 * @param body (optional)
 * @param options (optional)
 * @param cb
 *
 * Supported calling forms:
 *   options(cb)
 *   options(options, cb)
 */
Endpoint.prototype.options = function() {
  return this.endpoint.options.apply(this, arguments)
}

/**********************************************************************
 * httpError
 */
Endpoint.prototype.httpError = function(code, message) {
  return this.endpoint.httpError(code, message)
}

/**********************************************************************
 * exports
 */
module.exports = Endpoint

