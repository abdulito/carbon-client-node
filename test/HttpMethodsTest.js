var assert = require('assert')

var _ = require('lodash')

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
    name: "HttpMethodsTest",

    /********************************************************************
     * setup
     */
    setup: function(ctx) {
      ctx.global.testClient = require('./setup')
    },

    /********************************************************************
     * teardown
     */
    teardown: function(ctx) {
      delete ctx.global.testClient
    },

    /********************************************************************
     * tests
     */
    tests: [
      o({
        _type: testtube.Test,
        name: 'GetTest',
        description: 'get test',
        doTest: function(ctx) {
          var res = ctx.global.testClient.getEndpoint("get-test").get()
          assert(!_.isNull(res))
          assert.equal(res.body, "GET")
          assert.equal(res.statusCode, 200)
        }
      }),
      o({
        _type: testtube.Test,
        name: 'PostTest',
        description: 'post test',
        doTest: function(ctx) {
          var res = ctx.global.testClient.getEndpoint("post-test").post()
          assert(!_.isNull(res))
          assert.equal(res.body, "POST")
          assert.equal(res.statusCode, 200)
        }
      }),
      o({
        _type: testtube.Test,
        name: 'PutTest',
        description: 'put test',
        doTest: function(ctx) {
          var res = ctx.global.testClient.getEndpoint("put-test").put()
          assert(!_.isNull(res))
          assert.equal(res.body, "PUT")
        }
      }),
      o({
        _type: testtube.Test,
        name: 'PatchTest',
        description: 'patch test',
        doTest: function(ctx) {
          var res = ctx.global.testClient.getEndpoint("patch-test").patch()
          assert(!_.isNull(res))
          assert.equal(res.body, "PATCH")
          assert.equal(res.statusCode, 200)
        }
      }),
      o({
        _type: testtube.Test,
        name: 'DeleteTest',
        description: 'delete test',
        doTest: function(ctx) {
          var res = ctx.global.testClient.getEndpoint("delete-test").delete()
          assert(!_.isNull(res))
          assert.equal(res.body, "DELETE")
          assert.equal(res.statusCode, 200)
        }
      }),
      o({
        _type: testtube.Test,
        name: 'HeadTest',
        description: 'head test',
        doTest: function(ctx) {
          var res = ctx.global.testClient.getEndpoint("head-test").head()
          assert(!_.isNull(res))
          assert.equal(res.body, "HEAD")
          assert.equal(res.statusCode, 200)
        }
      }),
      o({
        _type: testtube.Test,
        name: 'OptionsTest',
        description: 'options test',
        doTest: function(ctx) {
          var res = ctx.global.testClient.getEndpoint("options-test").options()
          assert(!_.isNull(res))
          assert.equal(res.body, "OPTIONS")
          assert.equal(res.statusCode, 200)
        }
      }),
      o({
        _type: testtube.Test,
        name: '201Test',
        description: '201 test',
        doTest: function(ctx) {
          var res = ctx.global.testClient.getEndpoint("201-test").get()
          assert(!_.isNull(res))
          assert.equal(res.statusCode, 201)
        }
      }),
      o({
        _type: testtube.Test,
        name: 'ResponseHeadersTest',
        description: 'response headers test',
        doTest: function(ctx) {
          var res = ctx.global.testClient.getEndpoint("response-headers-test").get()
          assert(!_.isNull(res))
          assert.equal(res.statusCode, 200)
          assert.equal(res.headers["carbon-client"], "cool")
        }
      }),
    ],
  })
})
