var assert = require('assert')

var __  = require('@carbon-io/fibers').__(module)
var _o  = require('@carbon-io/bond')._o(module)
var o   = require('@carbon-io/atom').o(module)
var testtube = require('@carbon-io/test-tube')

/******************************************************************************
 *
 */
__(function() {
  module.exports = o.main({

    /********************************************************************
     * _type
     */
    _type: _o('@carbon-io/carbon-client/test/TestBase'),

    /********************************************************************
     * name
     */
    name: "ErrorTest",

    /********************************************************************
     * doTest
     */
    doTest: function (ctx) {
        assert.throws(function() {
          ctx.global.testClient.getEndpoint("error").get()
        }, function(err) {
          assert.equal(err.message, "ERROR")
          assert.equal(err.code, 500)
          return true
        })
    }
  })
})
