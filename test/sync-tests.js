/**
 * Created by abdul on 8/26/15.
 */

var fiber = require('fiber')
var __  = fiber.__(module, true);

var assert = require('assert');
var testClient = require('./setup')

__(
  function() {

    // test hello
    console.log("testing Hello sync get")
    var res = testClient.getEndpoint("Hello").get()
    assert(res != null)
    assert(res.body === "Hello!")
    console.log("Hello endpoint sync get result: " + res.body)

    // test find users
    console.log("testing users collection sync find")
    var data = testClient.getCollection("users").find()
    assert(data != null)
    console.log("users collection sync find result: ")
    console.log(data)
    assert(data.length > 0)
    assert(data[0].username === "abdul")

    // test insert users

    console.log("testing users collection sync insert")

    var result = testClient.getCollection("users").insert({
      username: "joe"
    })
    assert(result != null)
    assert(result.ok)
    console.log("sync insert result:")
    console.log(result)


  }
)



