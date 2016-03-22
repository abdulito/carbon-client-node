/**
 * Created by abdul on 3/22/16.
 */

var assert = require('assert');
var testClient = require('../setup')

// error test
console.log("Error test (ASYNC")

testClient.getEndpoint("error").get(function (e, res) {
  assert(e != null)
  console.log("Caught expected error:")
  console.log(e)
  assert(e.message === "ERROR")
  assert(e.code === 500)
  console.log("Error test passed!")
})

