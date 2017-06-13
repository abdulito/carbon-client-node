var __ = require('@carbon-io/fibers').__(module)
var CarbonClient = require('@carbon-io/carbon-client-node')

var client = new CarbonClient("http://localhost:8888")

__(
  function() {

    var options = {
      params: {
        who: "carbon"

      }
    }

    // GET http://localhost:8888/hello?who=carbon
    var res = client.getEndpoint("hello").get(options)
    console.log("Response from /hello: ")
    console.log(res.body)


  }
)

