class Endpoint
----------

An ```Endpoint``` is a client-side representation of a RESTFul resource. Endpoints can access server-side endpoints with all HTTP methods: ```GET```, ```PUT```, ```POST```, ```CREATE```, ```DELETE```, ```HEAD```, ```OPTIONS```.
```Endpoint```s allow both asynchronous/synchronous calls


Creation
----------
Endpoints are created by ```RestClient```s through the ```getEndpoint(path)``` method of ```RestClient```

```node
var client = new RestClient(url)

var endpoint = client.getEndpoint(path);
  ....
})

```



Methods
----------

#### get()

Performs an http ```GET```.

**Parameters**
* ```options``` - options for GET. See "options"
* ```cb``` - Callback function for asynchronous calls.

**Supported calling forms**
* ```get(cb)``` - asynchronous call
* ```get(options, cb)``` - asynchronous call with options
* ```get()``` - synchronous call
* ```get(options)``` - synchronous call with options

**Returns** (```Response```): A ```Response``` object (only for sync calls).


#### post()

Performs an http ```POST```

**Parameters**
* ```body``` - body for post
* ```options``` (optional)
* ```cb``` - Callback function for asynchronous calls.

**Supported calling forms**
* ```post(cb)``` - asynchronous call
* ```post(body, cb)``` - asynchronous call with body
* ```post(body, options, cb)``` - asynchronous call with body and options
* ```post()``` - synchronous call
* ```post(body)``` - synchronous call with body
* ```post(body, options)``` - synchronous call with body and options

**Returns** (```Response```): A ```Response``` object (only for sync calls).

Examples
----------
**Async examples**

```node
// require the client
var RestClient = require('carbon-client-node')

// create the client object
var client = new RestClient("http://localhost:8888")

// async get /hello
var endpoint = client.getEndpoint("hello")
endpoint.get(function(e, res) {
  console.log("Response from /hello: " + res.body)
})


```

**Sync examples**

```node
var fiber = require('fiber')
var __  = fiber.__(module, true)

var RestClient = require('carbon-client-node')



// create the client object
var client = new RestClient("http://localhost:8888")

__(
  function() {
    // async get /hello
    var endpoint = client.getEndpoint("hello")
    var res = endpoint.get()
    console.log("Response from /hello: " + res.body)
  }
)

```


