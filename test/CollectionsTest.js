var assert = require('assert')

var _ = require('lodash')

var __ = require('@carbon-io/fibers').__(module)
var o = require('@carbon-io/atom').o(module)
var _o = require('@carbon-io/bond')._o(module)
var testtube = require('@carbon-io/test-tube')

/******************************************************************************
 * 
 */
__(function() {
  module.exports = o.main({
    /********************************************************************
     * _type
     */
    _type: _o('./TestBase'),

    /********************************************************************
     * name
     */
    name: "CollectionTest",

    /********************************************************************
     *
     */
    tests: [
      o({
        _type: testtube.Test,
        name: 'SyncFindToArrayTest',
        description: 'testing users collection sync find toArray',
        doTest: function(ctx) {
          var data = ctx.global.testClient.getCollection("users").find().toArray()
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
          var data = ctx.global.testClient.getCollection("users").find({}, {parameters: {limit: 1}}).toArray()
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
          var data = ctx.global.testClient.getCollection("users").find({}, {parameters: {limit: 1, skip: 1}}).toArray()
          assert(!_.isNull(data))
          assert.equal(data.length, 1)
          assert.equal(data[0].username, "bob")
        }
      }),
      o({
        _type: testtube.Test,
        name: 'ProjectionTest',
        description: 'test projection',
        doTest: function(ctx) {
          var data = ctx.global.testClient.getCollection("users").find({}, {
            parameters: {
              projection: {_id: 1, username: 1},
              limit: 1}
          }).toArray()
          assert(!_.isNull(data))
          assert.equal(data.length, 1)
          assert(_.keys(data[0]).length == 2)
        }
      }),
      o({
        _type: testtube.Test,
        name: 'CursorTest',
        description: 'cursor test',
        doTest: function(ctx) {
          var cursor = ctx.global.testClient.getCollection("users").find()

          var obj = cursor.next()
          assert(!_.isNull(obj))
          assert.equal(obj.username, "abdul")

          var data = cursor.toArray()
          assert(!_.isNull(data))
          assert.equal(data.length, 1)
          assert.equal(data[0].username, "bob")
          // no need to test find.forEach()
          // test iteration with next()
        }
      }),

      o({
        _type: testtube.Test,
        name: 'InsertTest',
        description: 'testing users collection sync insert',
        doTest: function(ctx) {
          var result = ctx.global.testClient.getCollection("users").insert([{
            username: "joe"
          }])
          assert(!_.isNull(result))
          assert(!_.isNull(result["_id"]))
        }
      }),

      o({
        _type: testtube.Test,
        name: 'InsertObjectTest',
        description: 'testing users collection sync insertObject',
        doTest: function(ctx) {
          var result = ctx.global.testClient.getCollection("users").insertObject({
            username: "joe"
          })
          assert(!_.isNull(result))
          assert(!_.isNull(result["_id"]))
        }
      }),

      o({
        _type: testtube.Test,
        name: 'UpdateTest',
        description: 'test update',
        doTest: function(ctx) {
          var result = ctx.global.testClient.getCollection("users").update({
            username: "abdul"
          }, {
            "$set": {
              lastLogin: new Date()
            }
          })
          assert(!_.isNull(result))
          assert(result.n == 1)
        }
      }),

      o({
        _type: testtube.Test,
        name: 'UpdateObjectTest',
        description: 'test update object',
        doTest: function(ctx) {
          var result = ctx.global.testClient.getCollection("users").updateObject("123", {
            "$set": {
              lastLogin: new Date()
            }
          })
          assert(_.isNil(result))
        }
      }),

      o({
        _type: testtube.Test,
        name: 'RemoveTest',
        description: 'test users collection sync remove',
        doTest: function(ctx) {
          var result = ctx.global.testClient.getCollection("users").remove({
            username: "bob"
          })
          assert(!_.isNil(result))
          assert.equal(result.n, 1)
        }
      }),
      o({
        _type: testtube.Test,
        name: 'RemoveObjectTest',
        description: 'test remove object',
        doTest: function(ctx) {
          var result = ctx.global.testClient.getCollection("users").removeObject("123")
          assert(_.isNull(result))
        }
      }),

      o({
        _type: testtube.Test,
        name: 'SaveObjectTest',
        description: 'test save object',
        doTest: function(ctx) {
          // XXX: this should include id in the request body
          var result = ctx.global.testClient.getCollection("users").saveObject("123", {
            _id: "123",
            username: "joe"})
          assert.equal(result.username, 'joe')
        }
      }),

      /*
       * IMPORTANT
       *  the save test was put last since save() replaces the whole collection.
       */
      o({
        _type: testtube.Test,
        name: 'SaveTest',
        description: 'test save',
        doTest: function(ctx) {
          // XXX: this should include id in the request body
          var result = ctx.global.testClient.getCollection("users").save([{
            _id: "777",
            username: "joe"}])
          assert(_.isArray(result))
          assert(result.length == 1)
          assert.equal(result[0].username, 'joe')
        }
      })
    ]
  })
})
