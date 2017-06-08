var __ = require('@carbon-io/fibers').__(module)
var CarbonClient = require('@carbon-io/carbon-client-node')

var client = new CarbonClient("http://localhost:8888")

__(
  function() {
    // call get() which will call GET on http://localhost:8888/hello
    var response = client.getEndpoint("hello").get()
    console.log("Response from /hello: ")
    console.log(response.body)
  }
)


