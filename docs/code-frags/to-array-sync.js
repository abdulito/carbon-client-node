var __ = require('@carbon-io/fibers').__(module)
var CarbonClient = require('@carbon-io/carbon-client')

var client = new CarbonClient("http://localhost:8888")

__(function() {
  // find all users
  var usersCollection = client.getCollection("users")
  var data = usersCollection.find().toArray()
  console.log("All users")
  console.log(data)
})


