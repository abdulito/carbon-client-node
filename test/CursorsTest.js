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
    name: 'SyncCursorTest',


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
          assert.equal(cursor.items.length, 50)
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
            assert.equal(item.itemNumber, count)
          })
          assert.equal(count, 300)
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
          assert.equal(data.length, 300)
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
          assert.equal(data.length, 40)

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
          assert.equal(data.length, 110)
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
          assert.equal(data.length, 300)
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
          assert.equal(data.length, 200)
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
          assert.equal(data.length, 0)
        }
      }),


      o({
        _type: testtube.Test,
        name: 'SmallBatchSizeTest',
        description: 'testing small custom limit',
        doTest: function(ctx) {
          var cursor = ctx.global.testClient.getCollection('items-large', {paginated: true}).find().limit(400)
          var data = cursor.toArray()
          assert(data != null)
          assert.equal(data.length, 300)
        }
      }),

      o({
        _type: testtube.Test,
        name: 'LimitInCursorOptionsTest',
        description: 'testing limit in cursor options',
        doTest: function(ctx) {
          var cursor = ctx.global.testClient.getCollection('items', {paginated: true}).find({limit: 40})

          var data = cursor.toArray()
          assert(data != null)
          assert.equal(data.length, 40)
        }
      }),

      o({
        _type: testtube.Test,
        name: 'LimitInCollectionOptionsTest',
        description: 'testing limit in collection options',
        doTest: function(ctx) {
          var cursor = ctx.global.testClient.getCollection('items', {paginated: true, limit: 40}).find()

          var data = cursor.toArray()
          assert(data != null)
          assert.equal(data.length, 40)

        }
      }),

      o({
        _type: testtube.Test,
        name: 'SkipInCursorOptionsTest',
        description: 'testing skip in cursor options',
        doTest: function(ctx) {
          var cursor = ctx.global.testClient.getCollection('items', {paginated: true}).find({skip: 60})

          var data = cursor.toArray()
          assert(data != null)
          assert.equal(data.length, 240)
        }
      }),

      o({
        _type: testtube.Test,
        name: 'SkipInCollectionOptionsTest',
        description: 'testing skip in collection options',
        doTest: function(ctx) {
          var cursor = ctx.global.testClient.getCollection('items', {paginated: true, skip: 60}).find()
          var data = cursor.toArray()
          assert.equal(data.length, 240)
        }
      }),

      o({
        _type: testtube.Test,
        name: 'CursorOptionsShadowTest',
        description: 'testing options shadowing',
        doTest: function(ctx) {
          var cursor = ctx.global.testClient.getCollection('items', {paginated: true, skip: 60, limit: 10}).find(
            {skip: 1, limit: 1})

          var data = cursor.toArray()
          assert(data != null)
          assert.equal(data.length, 1)
          assert.equal(cursor.options.skip, 1)
          assert.equal(cursor.options.limit, 1)
          assert.equal(data[0].itemNumber, 2)
        }
      }),

      o({
        _type: testtube.Test,
        name: 'DefaultBatchSizeTest',
        description: 'testing default batch size',
        doTest: function(ctx) {
          var cursor = ctx.global.testClient.getCollection('items', {paginated: true}).find()

          var data = cursor.toArray()

          assert(data != null)
          assert.equal(data.length, 300)
          // default batch size is 100 but since max page size on the server is 50 it will change to 5
          // after the first trip
          // fetch trips = 300/50 + additional fetch that will return an empty set
          assert.equal(cursor.totalFetchTrips, 7)

        }
      }),

      o({
        _type: testtube.Test,
        name: 'CustomBatchSizeTest',
        description: 'testing custom batch size',
        doTest: function(ctx) {
          var cursor = ctx.global.testClient.getCollection('items', {paginated: true, batchSize: 10}).find()

          var data = cursor.toArray()
          assert(data != null)
          assert.equal(data.length, 300)
          // fetch trips = 300/10 + additional fetch that will return an empty set
          assert.equal(cursor.totalFetchTrips, 31)
        }
      })
    ]
  })
})
