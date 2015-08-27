/**
 * Created by abdul on 8/26/15.
 */

var assert = require('assert');
var testClient = require('./setup')

testClient.getEndpoint("Hello").get(function(e, res) {
  assert(res != null)
  assert(res.body === "Hello!")
})
