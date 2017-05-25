// require the client
var CarbonClient = require('@carbon-io/carbon-client-node')

// Service for this example: https://github.com/carbon-io/examples/blob/master/hello-world/HelloService.js

var client = new CarbonClient("http://localhost:8888")

// create an endpoint object for /hello
var endpoint = client.getEndpoint("hello")

var body = {
  msg: "Welcome to carbon-io!"
}

endpoint.post(body, function(e, response) {
  console.log("Response from /hello: ")
  console.log(response.body)
})