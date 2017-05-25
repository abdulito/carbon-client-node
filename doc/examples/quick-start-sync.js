/**
 * Created by abdul on 5/24/17.
 */

// This example uses the carbon-io fibers module to create a fiber.
// For more info, see https://docs.carbon.io/en/latest/packages/carbon-core/docs/packages/fibers/docs/guide/index.html

var __ = require('@carbon-io/fibers').__(module)

// require the client
var CarbonClient = require('@carbon-io/carbon-client-node')

// Service for this example: https://github.com/carbon-io/examples/blob/master/hello-world/HelloService.js

__(
  function() {
    var client = new CarbonClient("http://localhost:8888")

    // Synchronized call, not how
    var response = client.getEndpoint("hello").get()
    console.log("Response from /hello: ")
    console.log(response.body)

  })