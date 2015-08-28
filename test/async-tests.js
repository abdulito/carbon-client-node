/**
 * Created by abdul on 8/26/15.
 */

var assert = require('assert');
var testClient = require('./setup')

testClient.getEndpoint("Hello").get(function(e, res) {
  assert( e == null)
  assert(res != null)
  assert(res.body === "Hello!")
  console.log("Hello endpoint async get result: " + res.body)
})

testClient.getCollection("users").find(function(e, data) {
  assert(data != null)
  console.log("users collection async find result: ")
  console.log(data)
  assert(data.length === 1)
  assert(data[0].username === "abdul")
})
