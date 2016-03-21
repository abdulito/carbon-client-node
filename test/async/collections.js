/**
 * Created by abdul on 3/17/2016.
 */

var assert = require('assert');
var testClient = require('../setup')

// test hello async
console.log("testing Hello async get")

var usersCollection = testClient.getCollection("users")


testClient.getEndpoint("Hello").get(function(e, res) {
  assert( e == null)
  assert(res != null)
  assert(res.body === "Hello!")
  console.log("Hello endpoint async get result: " + res.body)
})

// test find.toArray()

console.log("testing users collection async find toArray")

usersCollection.find().toArray(function(e, data) {
  assert(data != null)
  assert(e == null)
  console.log("users collection async find result: ")
  console.log(data)
  assert(data.length > 0)
  assert(data[0].username === "abdul")
  assert(data[1].username === "bob")
})

// test limit
usersCollection.find({}, {limit: 1}).toArray(function(e, data) {
  assert(data != null)
  assert(e == null)
  console.log("users collection async find (limit:1) result: ")
  console.log(data)
  assert(data.length == 1)
  assert(data[0].username === "abdul")
})

// test skip
usersCollection.find({}, {limit: 1, skip: 1}).toArray(function(e, data) {
  assert(data != null)
  assert(e == null)
  console.log("users collection async find (limit:1) result: ")
  console.log(data)
  assert(data.length == 1)
  assert(data[0].username === "bob")
})

// Cursor test
var cursor = usersCollection.find()

cursor.next(function(e, obj) {
  assert(obj != null)
  assert(e == null)
  console.log("testing cursor.next()")
  console.log(obj)

  assert(obj.username === "abdul")

  console.log("testing cursor.toArray() after next()!!!")
  cursor.toArray(function(e, data) {
      assert(data != null)
      assert(e == null)
      console.log("cursor.toArray() after next():")
      console.log(data)
      assert(data.length == 1)
      assert(data[0].username === "bob")
    }
  )
})

// test find.each()
console.log("testing users collection async find toArray")

usersCollection.find().each(function(e, item) {
  assert(item != null)
  assert(e == null)
  console.log("Users find.each() item")
  console.log(item)
  assert(item.username === "abdul" || item.username === "bob")
})


// test insert users
console.log("testing users collection async insert")

usersCollection.insert({
    username: "joe"
  },
  function(e, result) {
    assert(e == null)
    assert(result != null)
    assert(result.ok)
    console.log("async insert result:")
    console.log(result)
  }
)

// error test
console.log("testing async error...")

testClient.getEndpoint("error").get(function (e, res) {
  assert(e != null)
  console.log("Caught expected error:")
  console.log(e)
  assert(e.message === "ERROR")
  assert(e.code === 500)
  console.log("Error test passed!")
})




