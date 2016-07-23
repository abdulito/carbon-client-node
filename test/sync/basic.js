/**
 * Created by abdul on 3/22/16.
 */

var assert = require('assert');
var testClient = require('../setup')
var __ = require('@carbon-io/fibers').__(module)

__(function() {

    console.log("Basic test (SYNC)")


    // GET
    var res = testClient.getEndpoint("get-test").get()
    assert(res != null)
    assert(res.body === "GET")
    console.log("get-test endpoint sync get result: " + res.body)



    // POST
    res = testClient.getEndpoint("post-test").post()
    assert(res != null)
    assert(res.body === "POST")
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
    console.log("patch-test endpoint sync patch result: " + res.body)

    // DELETE
    res = testClient.getEndpoint("delete-test").delete()
    assert(res != null)
    assert(res.body === "DELETE")
    console.log("delete-test endpoint sync delete result: " + res.body)

    // HEAD
    res = testClient.getEndpoint("head-test").head()
    assert(res != null)
    assert(res.body === "HEAD")
    console.log("head-test endpoint sync head result: " + res.body)


})

