class RestClient
----------

A ```RestClient``` is a client object used for accessing RESTFul resources such as Endpoints and Collections.

Constructor
----------
#### RestClient(url, options)
**Parameters**
url: Url for RESTFul server. e.g. http://localhost:8888
options: An object for specifiing client options. e.g. ```authentication```


Methods
----------

#### getEndpoint(path)

**Parameters**
path: relative path of endpoint

**Returns** (```Endpoint```): An ```Endpoint```.


Examples
----------

```node
// require the client
var RestClient = require('carbon-client-node');

// create the client object
var client = new RestClient("http://localhost:8888")

// request the /hello endpoint
client.getEndpoint("hello").get(function(e, res) {
   console.log("Response from /hello: " + res.body)
})
```


