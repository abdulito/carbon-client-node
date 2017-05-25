// require the client
var CarbonClient = require('@carbon-io/carbon-client-node')

// Service for this example: https://github.com/carbon-io/examples/blob/master/parameters/Service.js

var client = new CarbonClient("http://localhost:8888")

// create an endpoint object for /hello
var endpoint = client.getEndpoint("hello")

var options = {
  params: {
    message: "Welcome to carbon-io!"

  }
}

// GET http://localhost:8888/hello?message="Welcome to carbon-io!"
endpoint.get(options, function(e, response) {
  console.log("Response from /hello: ")
  console.log(response.body)
})