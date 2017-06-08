var __ = require('@carbon-io/fibers').__(module)
var CarbonClient = require('@carbon-io/carbon-client-node')

var client = new CarbonClient("http://localhost:8888")

__(
  function() {

    var usersCollection = client.getCollection("users")
    // find all users sort by name descending
    var data = usersCollection.find({}, {sort:{"name": -1}}).toArray()
    for(var i=0; i < data.length; i++) {
      console.log(data[i])
    }

  }
)

