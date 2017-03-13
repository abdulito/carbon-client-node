var testClient = require('./setup')

var carbon_core = require('@carbon-io/carbon-core')

var o   = carbon_core.atom.o(module).main
var _o   = carbon_core.bond._o(module)
var testtube = carbon_core.testtube
var assert = require('assert')

/***********************************************************************************************************************
 *
 */
module.exports = o({

  /*********************************************************************************************************************
   * _type
   */
  _type: testtube.Test,

  /*********************************************************************************************************************
   * name
   */
  name: "HttpMethodsTest",


  /*********************************************************************************************************************
   *
   */
  doTest: function () {

    // GET
    var res = testClient.getEndpoint("get-test").get()
    assert(res != null)
    assert(res.body === "GET")
    assert(res.statusCode == 200)
    console.log("get-test endpoint sync get result: " + res.body)



    // POST
    res = testClient.getEndpoint("post-test").post()
    assert(res != null)
    assert(res.body === "POST")
    assert(res.statusCode == 200)
    console.log("get-test endpoint sync get result: " + res.body)

    // PUT
    res = testClient.getEndpoint("put-test").put()
    assert(res != null)
    assert(res.body === "PUT")
    console.log("put-test endpoint sync put result: " + res.body)

    // PATCH
    res = testClient.getEndpoint("patch-test").patch()
    assert(res != null)
    assert(res.body === "PATCH")
    assert(res.statusCode == 200)
    console.log("patch-test endpoint sync patch result: " + res.body)

    // DELETE
    res = testClient.getEndpoint("delete-test").delete()
    assert(res != null)
    assert(res.body === "DELETE")
    assert(res.statusCode == 200)
    console.log("delete-test endpoint sync delete result: " + res.body)

    // HEAD
    res = testClient.getEndpoint("head-test").head()
    assert(res != null)
    assert(res.body === "HEAD")
    assert(res.statusCode == 200)
    console.log("head-test endpoint sync head result: " + res.body)

    // OPTIONS
    res = testClient.getEndpoint("options-test").options()
    assert(res != null)
    assert(res.body === "OPTIONS")
    assert(res.statusCode == 200)
    console.log("options-test endpoint sync options result: " + res.body)


    // 201 status
    res = testClient.getEndpoint("201-test").get()
    assert(res != null)
    assert(res.statusCode == 201)
    console.log("201-test endpoint sync result: " + res.body)


    // response headers test
    res = testClient.getEndpoint("response-headers-test").get()
    assert(res != null)
    assert(res.statusCode == 200)
    assert(res.headers["carbon-client"] === "cool")
    console.log("response headers test sync result: " + res.headers)

  }
})


