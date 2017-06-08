// This example uses the carbon-io fibers module to create a fiber.
// For more info, see https://docs.carbon.io/en/latest/packages/carbon-core/docs/packages/fibers/docs/guide/index.html

var __ = require('@carbon-io/fibers').__(module)
var CarbonClient = require('@carbon-io/carbon-client-node')

var client = new CarbonClient("http://localhost:8888")

__(
  function() {
      // call get sync!
      var response = client.getEndpoint("hello").get()
      console.log("Response from /hello: ")
      console.log(response.body)

  }
)
