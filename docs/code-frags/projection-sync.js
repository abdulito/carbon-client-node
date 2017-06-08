var __ = require('@carbon-io/fibers').__(module)
var CarbonClient = require('@carbon-io/carbon-client-node')

var client = new CarbonClient("http://localhost:8888")

__(
  function() {

    var usersCollection = client.getCollection("users")
    // find all users and get _id and name, address.city only
    var data = usersCollection.find({}, {
      projection: {
        _id: 1,
        name: 1,
        "address.city": 1
      }
    }).toArray()

    for(var i=0; i < data.length; i++) {
      console.log(data[i])
    }



  // exclude "address" only

    data = usersCollection.find({}, {
      projection: {
        address: 0
      }
    }).toArray()

    for(i=0; i < data.length; i++) {
      console.log(data[i])
    }



  }
)

