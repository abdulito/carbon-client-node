var assert = require('assert')

var _ = require('lodash')

var __ = require('@carbon-io/fibers').__(module)
var _o   = require('@carbon-io/bond')._o(module)
var o   = require('@carbon-io/atom').o(module)
var testtube = require('@carbon-io/test-tube')

/******************************************************************************
 *
 */
__(function() {
  module.exports = o.main({

    /****************************************************************************
     * _type
     */
    _type: _o("./TestBase"),

    /****************************************************************************
     * name
     */
    name: 'AsyncCursorTest',


    /****************************************************************************
     *
     */
    tests: [

      o({
        _type: testtube.Test,
        name: 'NoPaginationTest',
        description: 'testing non paginated collection',
        doTest: function(ctx) {
          var cursor = ctx.global.testClient.getCollection('items', {paginated: false}).find()
          var data = cursor.toArray()
          assert(data != null)

          // since the collection is not paginated, we only get what the collection returns from the first fetch
          assert(data.length == 50)
        }
      }),

      o({
        _type: testtube.Test,
        name: 'NoPaginationSkipTest',
        description: 'testing skip with non paginated collection',
        doTest: function(ctx) {
          var ex = null
          try {
            // test that skip is not allowed with non-paginated collections
            var cursor = ctx.global.testClient.getCollection('items', {paginated: false}).find().skip()
          } catch(e) {
            ex = e
          }
          assert(ex != null)
        }
      }),

      o({
        _type: testtube.Test,
        name: 'NoPaginationSkipParamTest',
        description: 'testing skip param with non paginated collection',
        doTest: function(ctx) {
          var ex = null
          try {
            // test that skip is not allowed with non-paginated collections
            var cursor = ctx.global.testClient.getCollection('items', {paginated: false}).find({
              parameters: {
                skip: 1
              }
            })
          } catch(e) {
            ex = e
          }
          assert(ex != null)
        }
      }),

      o({
        _type: testtube.Test,
        name: 'NoPaginationLimitParamTest',
        description: 'testing limit param with non paginated collection',
        doTest: function(ctx) {
          var ex = null
          try {
            // test that skip is not allowed with non-paginated collections
            var cursor = ctx.global.testClient.getCollection('items', {paginated: false}).find({
              parameters: {
                limit: 1
              }
            })
          } catch(e) {
            ex = e
          }
          assert(ex != null)
        }
      }),

      o({
        _type: testtube.Test,
        name: 'NoPaginationLimitTest',
        description: 'testing limit with non paginated collection',
        doTest: function(ctx) {
          var ex = null
          try {
            // test that skip is not allowed with non-paginated collections
            var cursor = ctx.global.testClient.getCollection('items', {paginated: false}).find().limit()
          } catch(e) {
            ex = e
          }
          assert(ex != null)
        }
      }),

      o({
        _type: testtube.Test,
        name: 'Cursor buffer',
        description: 'Testing cursor buffer max',
        doTest: function(ctx) {
          var cursor = ctx.global.testClient.getCollection('items', {paginated: true}).find()
          var obj = cursor.next()
          assert(obj != null)
          assert(cursor.items != null)
          // confirm server-side collection has a max of 50 items per page, although client has 100
          assert(cursor.items.length == 50)
          // confirm that we still need more
          assert(cursor.needToGetMore())
        }
      }),

      o({
        _type: testtube.Test,
        name: 'ForEach test',
        description: 'Testing forEach',
        doTest: function(ctx) {
          var cursor = ctx.global.testClient.getCollection('items', {paginated: true}).find()
          var count = 0
          cursor.forEach(function(item) {
            count++
            assert(item.itemNumber == count)
          })
          assert(count == 300)
        }
      }),

      o({
        _type: testtube.Test,
        name: 'ToArrayTest',
        description: 'testing toArray',
        doTest: function(ctx) {
          var cursor = ctx.global.testClient.getCollection('items', {paginated: true}).find()

          var data  = cursor.toArray()
          assert(data != null)
          assert(data.length == 300)
        }
      }),

      o({
        _type: testtube.Test,
        name: 'SmallLimitTest',
        description: 'testing small custom limit',
        doTest: function(ctx) {
          var cursor = ctx.global.testClient.getCollection('items', {paginated: true}).find().limit(40)
          var data = cursor.toArray()
          assert(data != null)
          assert(data.length == 40)

        }
      }),

      o({
        _type: testtube.Test,
        name: 'MidLimitTest',
        description: 'testing mid custom limit',
        doTest: function(ctx) {
          var cursor = ctx.global.testClient.getCollection('items', {paginated: true}).find().limit(110)

          var data = cursor.toArray()
          assert(data != null)
          assert(data.length == 110)
        }
      }),

      o({
        _type: testtube.Test,
        name: 'LargeLimitTest',
        description: 'testing large custom limit',
        doTest: function(ctx) {
          var cursor = ctx.global.testClient.getCollection('items', {paginated: true}).find().limit(400)
          var data = cursor.toArray()
          assert(data != null)
          assert(data.length == 300)
        }
      }),

      o({
        _type: testtube.Test,
        name: 'SmallSkipTest',
        description: 'testing small custom skip',
        doTest: function(ctx) {
          var cursor = ctx.global.testClient.getCollection('items', {paginated: true}).find().skip(100)

          var data = cursor.toArray()
          assert(data != null)
          assert(data.length == 200)
        }
      }),

      o({
        _type: testtube.Test,
        name: 'LargeSkipTest',
        description: 'testing large custom skip',
        doTest: function(ctx) {
          var cursor = ctx.global.testClient.getCollection('items', {paginated: true}).find().skip(400)
          var data = cursor.toArray()
          assert(data != null)
          assert(data.length == 0)
        }
      })
    ]
  })
})
