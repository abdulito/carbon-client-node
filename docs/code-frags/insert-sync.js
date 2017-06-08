var __ = require('@carbon-io/fibers').__(module)
var CarbonClient = require('@carbon-io/carbon-client-node')

var client = new CarbonClient("http://localhost:8888")

__(
  function() {

    var usersCollection = client.getCollection("users")
    var result = usersCollection.insert({
        _id: "123456",
        name: "joe",
        address: {
          city: "San Francisco",
          zipcode: 94401
        }
      })

    console.log(result)
  }
)