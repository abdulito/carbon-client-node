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
* ```body``` - body of request
* ```options```
* ```cb``` - Callback function for asynchronous calls.

**Supported calling forms**
* ```post(cb)``` - asynchronous call
* ```post(body, cb)``` - asynchronous call with body
* ```post(body, options, cb)``` - asynchronous call with body and options
* ```post()``` - synchronous call
* ```post(body)``` - synchronous call with body
* ```post(body, options)``` - synchronous call with body and options

**Returns** (```Response```): A ```Response``` object (only for sync calls).


#### put()

Performs an http ```PUT```

**Parameters**
* ```body``` - body of request
* ```options```
* ```cb``` - Callback function for asynchronous calls.

**Supported calling forms**
* ```put(cb)``` - asynchronous call
* ```put(body, cb)``` - asynchronous call with body
* ```put(body, options, cb)``` - asynchronous call with body and options
* ```put()``` - synchronous call
* ```put(body)``` - synchronous call with body
* ```put(body, options)``` - synchronous call with body and options

**Returns** (```Response```): A ```Response``` object (only for sync calls).

#### patch()

Performs an http ```PATCH```

**Parameters**
* ```body``` - body of request
* ```options```
* ```cb``` - Callback function for asynchronous calls.

**Supported calling forms**
* ```patch(cb)``` - asynchronous call
* ```patch(body, cb)``` - asynchronous call with body
* ```patch(body, options, cb)``` - asynchronous call with body and options
* ```patch()``` - synchronous call
* ```patch(body)``` - synchronous call with body
* ```patch(body, options)``` - synchronous call with body and options

**Returns** (```Response```): A ```Response``` object (only for sync calls).


#### delete()

Performs an http ```DELETE```

**Parameters**
* ```options```
* ```cb``` - Callback function for asynchronous calls.

**Supported calling forms**
* ```delete(cb)``` - asynchronous call
* ```delete(options, cb)``` - asynchronous call with options
* ```delete()``` - synchronous call
* ```delete(options)``` - synchronous call with options

**Returns** (```Response```): A ```Response``` object (only for sync calls).

#### head()

Performs an http ```HEAD```

**Parameters**
* ```options```
* ```cb``` - Callback function for asynchronous calls.

**Supported calling forms**
* ```head(cb)``` - asynchronous call
* ```head(options, cb)``` - asynchronous call with options
* ```head()``` - synchronous call
* ```head(options)``` - synchronous call with options

**Returns** (```Response```): A ```Response``` object (only for sync calls).

#### head()

Performs an http ```HEAD```

**Parameters**
* ```options```
* ```cb``` - Callback function for asynchronous calls.

**Supported calling forms**
* ```head(cb)``` - asynchronous call
* ```head(options, cb)``` - asynchronous call with options
* ```head()``` - synchronous call
* ```head(options)``` - synchronous call with options

**Returns** (```Response```): A ```Response``` object (only for sync calls).


#### options()

Performs an http ```OPTIONS```

**Parameters**
* ```body``` - body of request
* ```options```
* ```cb``` - Callback function for asynchronous calls.

**Supported calling forms**
* ```options(cb)``` - asynchronous call
* ```options(body, cb)``` - asynchronous call with body
* ```options(body, options, cb)``` - asynchronous call with body and options
* ```options()``` - synchronous call
* ```options(body)``` - synchronous call with body
* ```options(body, options)``` - synchronous call with body and options

**Returns** (```Response```): A ```Response``` object (only for sync calls).

#### getEndpoint(path)

**Parameters**
* ```path``` - relative path of endpoint

**Returns** (```Endpoint```): A child endpoint ```Endpoint```.

#### getCollection(path)

**Parameters**
* ```path``` - relative path of collection

**Returns** (```Collection```): A ```Collection```.

#### getAbsolutePath()

**Parameters**
_none_

**Returns** (```string```): Absolute path for endpoint

#### getFullUrl()



**Parameters**
_none_
**Returns** (```string```): Returns the full url for accessing the endpoint (client url + absolute path)

Examples
----------
**Async examples**

```node
// require the client
var RestClient = require('carbon-client-node')

// create the client object
var client = new RestClient("http://localhost:8888")

// async get /hello
var helloEndpoint = client.getEndpoint("hello")
helloEndpoint.get(function(e, res) {
  console.log("Response from /hello:")
  console.log(res.body)
})

// async post /user
var usersEndpoint = client.getEndpoint("users")
usersEndpoint.post({"name": "bob"}, function(e, res) {
  console.log("Response from /users:")
  console.log(res.body)
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

    // sync get /hello
    var endpoint = client.getEndpoint("hello")
    var res = endpoint.get()
    console.log("Response from /hello:")
    console.log(res.body)


    // sync post /user
    var usersEndpoint = client.getEndpoint("users")
    var res = usersEndpoint.post({"name": "bob"})
    console.log("Response from /users:")
    console.log(res.body)

  }
)


```


