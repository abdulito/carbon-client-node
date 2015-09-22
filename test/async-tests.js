/**
 * Created by abdul on 8/26/15.
 */

var assert = require('assert');
var testClient = require('./setup')

console.log("testing Hello async get")
testClient.getEndpoint("Hello").get(function(e, res) {
  assert( e == null)
  assert(res != null)
  assert(res.body === "Hello!")
  console.log("Hello endpoint async get result: " + res.body)
})

// test find.toArray()
var usersCollection = testClient.getCollection("users")
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




