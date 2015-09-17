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

console.log("testing users collection async find")
testClient.getCollection("users").find().toArray(function(e, data) {
  assert(data != null)
  assert(e == null)
  console.log("users collection async find result: ")
  console.log(data)
  assert(data.length === 1)
  assert(data[0].username === "abdul")
})


// test insert users

console.log("testing users collection async insert")

var result = testClient.getCollection("users").insert({
  username: "joe"
}, function(e, result){
  assert(e == null)
  assert(result != null)
  assert(result.ok)
  console.log("async insert result:")
  console.log(result)
})

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




