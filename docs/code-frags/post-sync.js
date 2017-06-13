var __ = require('@carbon-io/fibers').__(module)
var CarbonClient = require('@carbon-io/carbon-client-node')

var client = new CarbonClient("http://localhost:8888")

__(
  function() {

    var body = {
      msg: "Welcome to carbon-io!"
    }

    var res = client.getEndpoint("hello").post(body)
    console.log("Response from /hello: ")
    console.log(res.body)


  }
)
