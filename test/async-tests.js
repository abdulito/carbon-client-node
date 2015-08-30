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
testClient.getCollection("users").find(function(e, data) {
  assert(data != null)
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
  assert(result != null)
  assert(result.ok)
  console.log("async insert result:")
  console.log(result)
})

