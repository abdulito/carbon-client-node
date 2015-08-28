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
nock(testUrl)
  .get('/users')
  .reply(200, [{
    _id: '123',
    username: 'abdul',
    email: 'abdul@carbon-io.com'
  }]).persist();



/**********************************************************************
 * testClient
 */
var testClient = new RestClient(testUrl)

module.exports = testClient


