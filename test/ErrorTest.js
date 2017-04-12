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
    _type: testtube.Test,

    /********************************************************************
     * name
     */
    name: "ErrorTest",

    /********************************************************************
     * setup
     */
    setup: function(ctx) {
      ctx.local.testClient = require('./setup')
    },

    /********************************************************************
     * doTest
     */
    doTest: function (ctx) {
        assert.throws(function() {
          ctx.local.testClient.getEndpoint("error").get()
        }, function(err) {
          assert.equal(err.message, "ERROR")
          assert.equal(err.code, 500)
          return true
        })
    }
  })
})
