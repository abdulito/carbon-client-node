/**
 * Created by abdul on 3/17/2016.
 */

var assert = require('assert');
var testClient = require('../setup')

var fiber = require('fiber')
var __  = fiber.__(module, true);

__(
  function() {


    console.log("Collections test ASYNC")

    var usersCollection = testClient.getCollection("users")

    // test find.toArray()

    console.log("testing users collection sync find toArray")

    var data = usersCollection.find().toArray()
    assert(data != null)

    console.log("users collection async find result: ")
    console.log(data)
    assert(data.length > 0)
    assert(data[0].username === "abdul")
    assert(data[1].username === "bob")

    // test limit
    data = usersCollection.find({}, {limit: 1}).toArray()
    assert(data != null)
    console.log("users collection async find (limit:1) result: ")
    console.log(data)
    assert(data.length == 1)
    assert(data[0].username === "abdul")

    // test skip
    data = usersCollection.find({}, {limit: 1, skip: 1}).toArray()
    assert(data != null)
    console.log("users collection async find (limit:1) result: ")
    console.log(data)
    assert(data.length == 1)
    assert(data[0].username === "bob")

    // Cursor test
    var cursor = usersCollection.find()

    var obj = cursor.next()
    assert(obj != null)

    console.log("testing cursor.next()")
    console.log(obj)

    assert(obj.username === "abdul")

    console.log("testing cursor.toArray() after next()!!!")
    data = cursor.toArray()
    assert(data != null)
    console.log("cursor.toArray() after next():")
    console.log(data)
    assert(data.length == 1)
    assert(data[0].username === "bob")


    // no need to test find.each() because there is not sync version of it
    // test iteration with next()



    // test insert users
    console.log("testing users collection async insert")

    var result = usersCollection.insert({
        username: "joe"
      })


    assert(result != null)
    assert(result.ok)
    console.log("async insert result:")
    console.log(result)


    // error test
    console.log("testing async error...")

    try {
      testClient.getEndpoint("error").get()
      // should never get to this
      assert(false)
    } catch(e) {
      assert(e != null)
      console.log("Caught expected error:")
      console.log(e)
      assert(e.message === "ERROR")
      assert(e.code === 500)
      console.log("Error test passed!")
    }

})




