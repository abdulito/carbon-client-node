/**
 * Created by abdul on 3/22/16.
 */

var assert = require('assert');
var testClient = require('../setup')
var __ = require('@carbon-io/fibers').__(module)

module.exports = function() {
  // error test
  console.log("Error test (SYNC")

  try {
    testClient.getEndpoint("error").get()
    // should never get here
    assert(false)
  } catch (e) {
    assert(e != null)
    console.log("Caught expected error:")
    console.log(e)
    assert(e.message === "ERROR")
    assert(e.code === 500)
  }

  console.log("Error test (SYNC) passed!")
}


