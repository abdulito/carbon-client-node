CarbonClient
==========
***

Overview
---------

CarbonClient is the client-component for Carbon.io. It is a light-weight RESTFul client For NodeJS that can connect to any REST API.
CarbonClient uses the standard node ```request``` module to make http calls.


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


Usages
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
endpoint.get(options function(e, response) {
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
```

### Cursor iteration
The ```Cursor.toArray()``` loads all results into a single array object which could be memory consuming.
To avoid that, use the ```Cursor.each()``` method which takes a function to iterate over each item of results

```node
// find all users
var usersCollection = client.getCollection("users")
var cursor = usersCollection.find()
cursor.each(function(e, item) {
  console.log(item)

})

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

### More options

### Error handling

Class reference
---------

* [RestClient](doc/classes/RestClient.md)
* [Endpoint](doc/classes/Endpoint.md)
* [Collection](doc/classes/Collection.md)
* [Cursor](doc/classes/Cursor.md)





