/**
 * Created by abdul on 8/26/15.
 */

var RestClient = require('../lib/CarbonClient')
var nock = require('nock');

/**********************************************************************
 * build the nock service
 */

var testUrl = "http://localhost:9088"

/**********************************************************************
 * /Hello
 */
nock(testUrl).get('/Hello').reply(200, "Hello!")



/**********************************************************************
 * testClient
 */
var testClient = new RestClient(testUrl)

module.exports = testClient


