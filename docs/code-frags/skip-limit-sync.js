var __ = require('@carbon-io/fibers').__(module)
var CarbonClient = require('@carbon-io/carbon-client-node')

var client = new CarbonClient("http://localhost:8888")

__(
  function() {

    var usersCollection = client.getCollection("users")
    var data = usersCollection.find({}, {skip:1, limit:1}).toArray()
    for( var i=0; i < data.length; i++) {
      console.log(data[i])
    }

  }
)

