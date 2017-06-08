var __ = require('@carbon-io/fibers').__(module)
var CarbonClient = require('@carbon-io/carbon-client-node')

var client = new CarbonClient("http://localhost:8888")

__(
  function() {

    // find user by id
    var usersCollection = client.getCollection("users")
    var obj = usersCollection.findObject("123456")
    console.log("Object found:")
    console.log(obj)


  }
)



