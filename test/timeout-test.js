/**
 * Created by abdul on 11/09/16.
 */

var assert = require('assert');
var testUrl = require('./setup').url
var RestClient = require('../lib/CarbonClient')
var nock = require('nock');

/**********************************************************************
 * header based authentication tests
 */

module.exports = function() {
  // create the nock timeout endpoint. delay response for 5 seconds
  nock(testUrl).get('/timeout').delay(5000).reply(200, {
    "ok": 1
  }).persist();

  // create the client with a 3 second timeout
  var client = new RestClient(testUrl, {
    timeout: 3000
  });

  console.log("testing /timeout with a 3 second timeout")

  var then = Date.now()
  client.getEndpoint("timeout").get(function(e, res) {
    if (Date.now() - then >= 5000) {
      console.error('nock is broken, see ' +
                    'https://github.com/node-nock/nock/issues/754 and ' +
                    'https://github.com/node-nock/nock/pull/802')
      console.error('SKIPPING!!!')
      return
    }
    assert(e != null)
    assert(e.message === "ETIMEDOUT")
    console.log("3 second timeout test passed!. Got the ETIMEDOUT error")
  })

  console.log("testing /timeout with a 6 second timeout")
  client.getEndpoint("timeout").get({timeout: 6000}, function(e, res) {
    assert(e == null)
    assert(res.body.ok == 1)
    console.log("6 second timeout test passed. Response body: ")
    console.log(res.body)
  })
}
