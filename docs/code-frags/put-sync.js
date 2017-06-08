var __ = require('@carbon-io/fibers').__(module)
var CarbonClient = require('@carbon-io/carbon-client-node')

var client = new CarbonClient("http://localhost:8888")

__(
  function() {

    //  put to /users
    var response = client.getEndpoint("users/1234").put({
        "_id": "1234",
        "name": "bob"
      })

    console.log("Response from /users:")
    console.log(response.body)

  }
)

