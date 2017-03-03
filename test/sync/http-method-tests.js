/**
 * Created by abdul on 3/22/16.
 */

var assert = require('assert');
var testClient = require('../setup')
var __ = require('@carbon-io/carbon-core').fibers.__(module)

module.exports = function() {

    console.log("http method tests (SYNC)")


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

