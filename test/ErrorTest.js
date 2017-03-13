var testClient = require('./setup')
var carbon_core = require('@carbon-io/carbon-core')

var o   = carbon_core.atom.o(module).main
var _o   = carbon_core.bond._o(module)
var testtube = carbon_core.testtube
var assert = require('assert')

/***********************************************************************************************************************
 *
 */
module.exports = o({

  /*********************************************************************************************************************
   * _type
   */
  _type: testtube.Test,

  /*********************************************************************************************************************
   * name
   */
  name: "ErrorTest",


  /*********************************************************************************************************************
   *
   */
  doTest: function () {

    // error test

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
  }
})
