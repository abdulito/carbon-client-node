var __ = require('@carbon-io/fibers').__(module)
var CarbonClient = require('@carbon-io/carbon-client-node')

var client = new CarbonClient("http://localhost:8888")

__(function() {
    var usersCollection = client.getCollection("users")
    var result = usersCollection.update({
        "$set": {
          "name": "jack"
        }
      }, {
        parameters: {
          query: {
            _id: "123456"
          }
        }
      }
    )
    console.log(result)
  }
)

