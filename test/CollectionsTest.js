var assert = require('assert')

var _ = require('lodash')

var __ = require('@carbon-io/fibers').__(module)
var o = require('@carbon-io/atom').o(module)
var _o = require('@carbon-io/bond')._o(module)
var testtube = require('@carbon-io/test-tube')

/******************************************************************************
 * 
 */
__.main(function() {
  module.exports = o.main({
    /********************************************************************
     * _type
     */
    _type: testtube.Test,

    /********************************************************************
     * name
     */
    name: "CollectionTest",

    /********************************************************************
     * setup
     */
    setup: function(ctx) {
      ctx.global.testClient = require('./setup')
      ctx.global.usersCollection = ctx.global.testClient.getCollection("users")
    },

    /********************************************************************
     * teardown
     */
    teardown: function(ctx) {
      delete ctx.global.testClient
      delete ctx.global.usersCollection
    },

    /********************************************************************
     *
     */
    tests: [
      o({
        _type: testtube.Test,
        name: 'SyncFindToArrayTest',
        description: 'testing users collection sync find toArray',
        doTest: function(ctx) {
          var data = ctx.global.usersCollection.find().toArray()
          assert(!_.isNull(data))
          assert(data.length > 0)
          assert.equal(data[0].username, "abdul")
          assert.equal(data[1].username, "bob")
        }
      }),
      o({
        _type: testtube.Test,
        name: 'FindLimitTest',
        description: 'test find limit',
        doTest: function(ctx) {
          var data = ctx.global.usersCollection.find({}, {limit: 1}).toArray()
          assert(!_.isNull(data))
          assert.equal(data.length, 1)
          assert.equal(data[0].username, "abdul")
        }
      }),
      o({
        _type: testtube.Test,
        name: 'FindSkipTest',
        description: 'test find skip',
        doTest: function(ctx) {
          var data = ctx.global.usersCollection.find({}, {limit: 1, skip: 1}).toArray()
          assert(!_.isNull(data))
          assert.equal(data.length, 1)
          assert.equal(data[0].username, "bob")
        }
      }),
      o({
        _type: testtube.Test,
        name: 'CursorTest',
        description: 'cursor test',
        doTest: function(ctx) {
          var cursor = ctx.global.usersCollection.find()

          var obj = cursor.next()
          assert(!_.isNull(obj))
          assert.equal(obj.username, "abdul")

          var data = cursor.toArray()
          assert(!_.isNull(data))
          assert.equal(data.length, 1)
          assert.equal(data[0].username, "bob")
          // no need to test find.each() because there is not sync version of it
          // test iteration with next()
        }
      }),
      o({
        _type: testtube.Test,
        name: 'InsertTest',
        description: 'testing users collection sync insert',
        doTest: function(ctx) {
          var result = ctx.global.usersCollection.insert({
            username: "joe"
          })
          assert(!_.isNull(result))
          assert(!_.isNull(result["_id"]))
        }
      }),
      o({
        _type: testtube.Test,
        name: 'RemoveTest',
        description: 'test users collection sync remove',
        doTest: function(ctx) {
          var result = ctx.global.usersCollection.remove({
            username: "joe"
          })
          assert(!_.isNull(result))
          assert(result.ok)
        }
      }),
      o({
        _type: testtube.Test,
        name: 'RemoveObjectTest',
        description: 'test remove object',
        doTest: function(ctx) {
          var result = ctx.global.usersCollection.removeObject("123")
          assert(!_.isNull(result))
          assert(result.ok)
        }
      }),
      o({
        _type: testtube.Test,
        name: 'UpdateTest',
        description: 'test update',
        doTest: function(ctx) {
          var result = ctx.global.usersCollection.update({
            username: "joe"
          }, {
            "$set": {
              email: "joe@foo.com"
            }
          })
          assert(!_.isNull(result))
          assert(result.ok)
        }
      }),
      o({
        _type: testtube.Test,
        name: 'SaveObjectTest',
        description: 'test save object',
        doTest: function(ctx) {
          var result = ctx.global.usersCollection.saveObject("123", {username: "joe"})
          assert(!_.isNull(result))
          assert(result.ok)
        }
      }),
      o({
        _type: testtube.Test,
        name: 'UpdateObjectTest',
        description: 'test update object',
        doTest: function(ctx) {
          var result = ctx.global.usersCollection.updateObject("123", {
            "$set": {
              email: "joe@foo.com"
            }
          })
          assert(!_.isNull(result))
          assert(result.ok)
        }
      }),
    ]
  })
})
