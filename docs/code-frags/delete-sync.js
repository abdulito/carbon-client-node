var __ = require('@carbon-io/fibers').__(module)
var CarbonClient = require('@carbon-io/carbon-client-node')

var client = new CarbonClient("http://localhost:8888")

__(function() {
    var response = client.getEndpoint("test-delete").delete()
    console.log("Response from /test-delete:")
    console.log(response.body)
  }
)



