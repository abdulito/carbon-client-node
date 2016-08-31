/**
 * Created by abdul on 8/26/15.
 */

var RestClient = require('../lib/CarbonClient')
var nock = require('nock');

/**********************************************************************
 * build the nock service
 */

var testUrl = "http://localhost:9088"

// setup nock endpoints
// NOTE: we call persist() to persist the endpoint so it can be called more than once.
console.log("Setting up nock endpoints...")

/**********************************************************************
 * HTTP METHODS
 */
nock(testUrl).get('/get-test').reply(200, "GET").persist()
nock(testUrl).post('/post-test').reply(200, "POST").persist()
nock(testUrl).put('/put-test').reply(200, "PUT").persist()
nock(testUrl).patch('/patch-test').reply(200, "PATCH").persist()
nock(testUrl).delete('/delete-test').reply(200, "DELETE").persist()
nock(testUrl).head('/head-test').reply(200, "HEAD").persist()
// OPTIONS http method not supported by nock
nock(testUrl).options('/options-test').reply(200, "OPTIONS").persist()

// test 201 status code
nock(testUrl).get('/201-test').reply(201, "201 http status code").persist()

// test response headers
nock(testUrl).get('/response-headers-test').reply(200, "response headers", {"carbon-client": "cool"}).persist()

/**********************************************************************
 * /users
 */
// test users list
var TEST_USERS = [{
  _id: '123',
  username: 'abdul',
  email: 'abdul@carbon-io.com'
},
  {
    _id: '456',
    username: 'bob',
    email: 'bob@test.test'
  }
]

/**********************************************************************
 *
 * @param uri
 * @param requestBody
 * @returns {*[]}
 */
function get_request_test_users(uri, requestBody) {
  var query = parseQueryString(uri)
  var start = 0
  var end = TEST_USERS.length

  if (query.skip) {
    start = parseInt(query.skip)
  }

  if (query.limit) {
    end = start + parseInt(query.limit)
  }

  return TEST_USERS.slice(start, end)
}

/**********************************************************************
 *
 * @param uri
 */
function parseQueryString(uri) {
  var result = {}

  if (uri.indexOf("?")) {
    var qs = uri.substring(uri.indexOf("?") + 1).split("&")
    for ( var pairIndex in qs) {
      var pair = qs[pairIndex].split("=")
      var key = pair[0]
      var value = pair[1]
      result[key] = value
    }
  }

  return result
}
/**********************************************************************
 * users.find(): GET /users
 */

nock(testUrl).get('/users')
  .reply(200, get_request_test_users).persist();

/**********************************************************************
 * users.find(): GET /users and allow queries
 */

nock(testUrl).get('/users').query(true)
  .reply(200, get_request_test_users).persist();

/**********************************************************************
 * users.insert(): POST /users
 */
nock(testUrl).post('/users')
.reply(200, {
    ok: true
  }).persist();

/**********************************************************************
 * users.remove(): DELETE /users
 */
nock(testUrl).delete('/users')
  .reply(200, {
    ok: true
  }).persist();

/**********************************************************************
 * users.remove(): DELETE /users
 */
nock(testUrl).delete('/users')
  .reply(200, {
    ok: true
  }).persist();

/**********************************************************************
 * users.removeObject("123"): DELETE /users/123
 */
nock(testUrl).delete('/users/123')
  .reply(200, {
    ok: true
  }).persist();

/**********************************************************************
 * error
 */
nock(testUrl).get('/error')
  .reply(500, "ERROR").persist();

/**********************************************************************
 * testClient
 */
var testClient = new RestClient(testUrl)

module.exports = testClient


