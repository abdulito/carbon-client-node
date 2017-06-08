var __ = require('@carbon-io/fibers').__(module)
var CarbonClient = require('@carbon-io/carbon-client-node')

var client = new CarbonClient("http://localhost:8888")

__(
  function() {

    try {
      // GET http://localhost:8888/doesnotexit
      client.getEndpoint("doesnotexit").get()

    } catch(e) {
      console.log("Caught an error")
      console.log("code: " + e.code) // 404
      console.log("message: " + e.message)
      console.log("description: " + e.description)

    }

  }
)
