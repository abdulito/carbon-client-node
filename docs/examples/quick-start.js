// require the client
var CarbonClient = require('@carbon-io/carbon-client-node')

// Service for this example: https://github.com/carbon-io/example__hello-world-service/blob/master/lib/HelloService.js

// create the client object
var client = new CarbonClient("http://localhost:8888")

// GET http://localhost:8888/hello
client.getEndpoint("hello").get(function(e, response) {
  console.log("Response from /hello: ")
  console.log(response.body)
})