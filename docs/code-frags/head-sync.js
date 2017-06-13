var __ = require('@carbon-io/fibers').__(module)
var CarbonClient = require('@carbon-io/carbon-client-node')

var client = new CarbonClient("http://localhost:8888")

__(
  function() {
    //  call http HEAD method
    var res = client.getEndpoint("test-head").head(null)
    console.log("Response from /test-head:")
    console.log(res.body)
  }
)



