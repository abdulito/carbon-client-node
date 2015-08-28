/**
 * Created by abdul on 8/26/15.
 */

var fiber = require('fiber')
var __  = fiber.__(module);

var assert = require('assert');
var testClient = require('./setup')

__(
  function() {

    // test hello
    var res = testClient.getEndpoint("Hello").get()
    assert(res != null)
    assert(res.body === "Hello!")
    console.log("Hello endpoint sync get result: " + res.body)

    // test users

    var data = testClient.getCollection("users").find()
    assert(data != null)
    console.log("users collection sync find result: ")
    console.log(data)
    assert(data.length === 1)
    assert(data[0].username === "abdul")

  }
)



