CarbonClient
==========
***

Overview
---------

CarbonClient is the client-component for Carbon.io. It is a light-weight RESTFul client For NodeJS that can connect to any REST API.
It uses the standard node ```request``` module to make http calls.


Main features:


* Support for all HTTP methods: ```GET```, ```PUT```, ```POST```, ```CREATE```, ```DELETE```, ```HEAD```, ```OPTIONS```.
* Support for all Carbon.io collections endpoint methods: ```find()```, ```insert()```, ```update()```, ```remove()```.
* Support for both asynchronous/synchronous programming styles.
* Support API Key based authentication



Installation
---------

```
<path-to-your-app>/
    package.json
```

Your package.json should include ```carbon-client-node```

```node
{
    ...

    "dependencies": {
        "carbon-client-node": "git+ssh://git@github.com:carbon-io/carbon-client-node.git"
    }

    ...
}
```

Then install the package dependencies like this:

```
% cd <path-to-your-app>
% npm install .
```


Quick Start
---------



```node
// require the client
var RestClient = require('carbon-client-node');

// create the client object
var client = new RestClient("http://localhost:8888")

// GET http://localhost:8888/hello
client.getEndpoint("hello").get(function(e, response) {
  console.log("Response from /hello: " + response.body)
})

```


Use
---------

### Basic HTTP calls

All http methods are supported through  ```Endpoint``` object. Each http method has a matching ```Endpoint``` method with same name all lowercase. e.g.
```GET``` is done by ```Endpoint.get()```, ```POST``` with ```Endpoint.post()```, etc...



### HTTP GET

```node
// require the client
var RestClient = require('carbon-client-node');

// create the client object
var client = new RestClient("http://localhost:8888")

// GET http://localhost:8888/hello
client.getEndpoint("hello").get(function(e, response) {
  console.log("Response from /hello: " + response.body)
})

```

### Passing query string params
Query string params are passed as an object through the ```options.params``` argument of each http method
```node


// request the /hello endpoint
var endpoint = client.getEndpoint("hello");
var options = {
  params: {
    x: 1,
    y: 2

  }
}

// GET http://localhost:8888/hello?x=1&y=2
endpoint.get(options, function(e, response) {
  console.log("Response from /hello: " + response.body)
})

```


### HTTP POST

```node
//  post to /users
client.getEndpoint("users").post({"name": "bob"}, function(e, response) {
  console.log("Response from /users:")
  console.log(response.body)
})
```


### PUT/PATCH/HEAD/OPTIONS

```PUT```, ```PATCH```, ```HEAD```, ```OPTIONS``` can be performed with ```Endpoint.put()```, ```Endpoint.patch()```, ```Endpoint.head()```, ```Endpoint.options()``` methods
 respectively. Arguments of these methods are similar to the ```Endpoint.post()``` method.

```node
//  put to /users
client.getEndpoint("users").put({
    "id": 1234,
    "name": "bob"
  },
  function(e, response) {
    console.log("Response from /users:")
    console.log(response.body)
})
```

### Collections and Cursors
CarbonClient provides convenient interfaces to access collections. It provides classes similar to MongoDB Driver Collection/Cursor classes.
 you can perform ```find()```, ```insert()```, ```update()```, and ```remove()```.
 The ```find()``` method returns a ```Cursor``` object which is used to iterate over results.


```find()``` supports the following calling forms

```node
 *   find(cb)
 *   find(query, cb)
 *   find(query, options, cb)
```


```node
// find all users
var usersCollection = client.getCollection("users")
usersCollection.find().toArray(function(e, data) {
  console.log("All users")
  console.log(data)
})

// find by query
usersCollection.find({"name": "joe"}).toArray(function(e, data) {
  console.log("All users matching name 'joe'")
  console.log(data)
})

})
```

The ```find()``` method returns a ```Cursor``` object which is used to iterate over results.


### Cursor iteration
The ```Cursor.toArray()``` loads all results into a single array object which could be memory consuming.
To avoid that, use the ```Cursor.each()``` method which takes a function to iterate over each item of results.
It will return ```null``` when the cursor finishes.

```node
// find all users
var usersCollection = client.getCollection("users")
var cursor = usersCollection.find()
cursor.each(function(e, item) {
  if (item == null) {
    console.log("Finish!")
  } else {
     console.log(item)
  }


})

```

Cursors also provide a ```next()``` method to iterate over a single item. It will return ```null``` when the cursor finishes.

```node
// find all users
var usersCollection = client.getCollection("users")
var cursor = usersCollection.find()
cursor.next(function(e, item) {
  if (item == null) {
    console.log("Finish!")
  } else {
    console.log("Next item:")
    console.log(item)
  }

})

```

### Cursor pagination

Pagination for results returned by ```find()``` can be achieved  with ```skip``` and ```limit``` options through the ```options``` argument:

```node

var usersCollection = client.getCollection("users")
var cursor = usersCollection.find({}, {skip:100, limit:100}).toArray(function(e, data) {
  for( var i=0; i < data.length; i++) {
     console.log(data[i])
  }

})

```


### Sorting find() results

```options``` argument also allows ```sort``` which takes a key to sort on:

```node

var usersCollection = client.getCollection("users")

// find all users sort by name descending
var cursor = usersCollection.find({}, {sort:{"name": -1}}).toArray(function(e, data) {
  for( var i=0; i < data.length; i++) {
     console.log(data[i])
  }

})

```


### Limiting fields within find() results

You can limit the set of fields returned by find using ```options.projection``` argument. The ```projection``` argument
can be specified in the following form:

```

{
  <field-path>: 0 | 1
}

```
set field value to be 1 to include, 0 to exclude.


```node

var usersCollection = client.getCollection("users")

// find all users and get _id and name, address.city only
usersCollection.find({}, {
    projection: {
      _id
      "name": 1,
      "address.city": 1
    }
   }).toArray(function(e, data) {
  for(var i=0; i < data.length; i++) {
     console.log(data[i])
  }

})

// exclude "address" only

// find all users and get _id and name, address.city only
usersCollection.find({}, {
    projection: {
      "address": 0
    }
   }).toArray(function(e, data) {
  for(var i=0; i < data.length; i++) {
     console.log(data[i])
  }

})

```


### Synchronized calls (calling with no callbacks)
It is super easy to make sync calls with CarbonClient. All you have do is just call same methods but just without passing a callback function.
sync calls must be made within a fiber.

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

### Authentication

Currently, CarbonClient only supports api-key authentication model.

##### api-key authentication

CarbonClient allows Api key authentication by passing the api key value in the header or query string. This will make the client send the api key parameter in every request.
See following example:

```node

var client = new RestClient("http://localhost:8888", {
  authentication: {
    type: "api-key",
    apiKey:"123",
    apiKeyParameterName: "API_KEY", // the parameter name of the api key
    apiKeyLocation: "header" // use "query" for passing API_KEY using query string
  }
})


```


### Error handling
Errors raised by CarbonClient are instances of the HttpError class defined in [HttpErrors](https://github.com/carbon-io/http-errors) module of carbon.
An HttpError contains the http error code, message, and description.

For asynchronous calls, The error object will be the first argument of the callback function.

```node

// GET http://localhost:8888/hello
client.getEndpoint("doesnotexit").get(function(e, response) {
  if(e) {
      console.log("Caught an error")
      console.log("code: " + e.code);
      console.log("message: " + e.message);
      console.log("description: " + e.description);
  }
})
```

For synchronous calls, the errors are raised back so it will have to be caught within a try-catch.

```node

// GET http://localhost:8888/hello

try {
    client.getEndpoint("doesnotexit").get()
} catch(e) {
    console.log("Caught an error")
    console.log("code: " + e.code);
    console.log("message: " + e.message);
    console.log("description: " + e.description);
}

```


### More Options
You can get more control with the ```options``` argument:

 ```
 options.json,
 headers: options.headers,
 strictSSL: options.strictSSL,
 cert: options.cert,
 key: options.key,
     ca: options.ca,
     forever: options.forever,
```
##### json/plain-text results

All results are in JSON by default. For plain text, set ```options.json``` to false:

```node
 // Plain text
 client.getEndpoint("hello").get({json: false}, function(e, response) {
   console.log("Response from /hello: " + response.body)
 })
```

##### passing headers

Headers can be passed as JSON with the ```options.headers``` to false:

```node
 // Plain text
 client.getEndpoint("hello").get({headers: {"Cache-Control": "no-cache"}},
     function(e, response) {
       console.log("Response from /hello: " + response.body)
   }
 )
```

##### SSL

```node
strictSSL: If true, requires SSL certificates be valid
cert: cert file content
key: key file content
ca: ca file content
```

##### And more

```node
- forever: set to true to pass keepAlive true
```
Class reference
---------

* [RestClient](doc/classes/RestClient.md)
* [Endpoint](doc/classes/Endpoint.md)
* [Collection](doc/classes/Collection.md)
* [Cursor](doc/classes/Cursor.md)





