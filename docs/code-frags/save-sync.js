var __ = require('@carbon-io/fibers').__(module)
var CarbonClient = require('@carbon-io/carbon-client-node')

var client = new CarbonClient("http://localhost:8888")

__(function() {
    // CAUTION! save operation will replace the whole user collection with the following list
    var usersCollection = client.getCollection("users")
    var result = usersCollection.save(
      [{
        name: "joe",
        address: {
          city: "San Francisco",
          zipcode: 94401
        }
      }])
    console.log(result)
  }
)


