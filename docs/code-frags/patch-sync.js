var __ = require('@carbon-io/fibers').__(module)
var CarbonClient = require('@carbon-io/carbon-client-node')

var client = new CarbonClient("http://localhost:8888")

__(
  function() {

    var body = {
      msg: "Welcome to carbon-io!"
    }

    var response = client.getEndpoint("users").patch({
      "_id": "1234",
      "name": "bob"
    })

    console.log("Response from /users:")
    console.log(response.body)


  }
)
