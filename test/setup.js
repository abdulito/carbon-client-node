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
 * /Hello
 */
nock(testUrl).get('/Hello').reply(200, "Hello!").persist()

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
    start = query.skip
  }

  if (query.limit) {
    end = start + query.limit
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
 * GET /users
 */

nock(testUrl).get('/users')
  .reply(200, get_request_test_users).persist();

/**********************************************************************
 * GET /users and allow queries
 */

nock(testUrl).get('/users').query(true)
  .reply(200, get_request_test_users).persist();

/**********************************************************************
 * POST /users
 */
nock(testUrl).post('/users')
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


