var __ = require('@carbon-io/fibers').__(module)
var CarbonClient = require('@carbon-io/carbon-client-node')

var client = new CarbonClient("http://localhost:8888")

__(function() {
    var res = client.getEndpoint("test-options").options()
    console.log("Response from /test-options:")
    console.log(res.body)
  }
)



