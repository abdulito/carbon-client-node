class Collection
----------

An ```Endpoint``` is a client-side representation of a RESTFul ```Collection``` resource. Collections can access server-side collection resources via find(), insert(), update(), remove() methods.
```Collection```s allow both asynchronous/synchronous calls


Creation
----------
Collections are created by ```RestClient```s through the ```getCollection(path)``` method of ```RestClient```

```node
var client = new RestClient(url)

var collection = client.getCollection(path);
  ....
})

```



Methods
----------

#### find()


**Parameters**
* ```query```
* ```options```

**Supported calling forms**
* ```find()```
* ```find(query)```
* ```find(query, options)``` - asynchronous call with query and options

**Returns** (```Cursor```): A [Cursor](Cursor.md) object.


#### insert()


**Parameters**
* ```obj``` - object to insert
* ```cb``` - Callback function for asynchronous calls.

**Supported calling forms**
* ```insert(obj, cb)``` - asynchronous call
* ```insert(obj)``` - synchronous call


**Returns** (```object```): An ```object``` with response body.


#### update()

Performs update() to the server-side collection resource with the specified query and obj
**Parameters**
* ```query```
* ```obj```
* ```options```
* ```cb``` - Callback function for asynchronous calls.

**Supported calling forms**
* ```update(query, obj, cb)``` - asynchronous call
* ```update(query, obj, options, cb)``` - asynchronous call with options
* ```update(query, obj)``` - synchronous call
* ```update(query, obj, options)``` - synchronous call with options

**Returns** (```object```): An ```object``` with response body.

#### remove()


**Parameters**
* ```query```
* ```options```
* ```cb``` - Callback function for asynchronous calls.

**Supported calling forms**
* ```remove(query, cb)``` - asynchronous call
* ```remove(query, options, cb)``` - asynchronous call with options
* ```remove(query)``` - synchronous call
* ```remove(query, options)``` - synchronous call with options

**Returns** (```object```): An ```object``` with response body.


Examples
----------
**Async examples**

```node
// require the client
var RestClient = require('carbon-client-node')

// create the client object
var client = new RestClient("http://localhost:8888")

// async find all users
var usersCollection = client.getCollection("users")
usersCollection.find().toArray(function(e, data) {
  console.log("All users")
  console.log(data)
})

// async find by query
usersCollection.find({name:"joe"}).toArray(function(e, data) {
  console.log("Find result:")
  console.log(data)
})

// async insert
usersEndpoint.insert({name: "bob"}, function(e, result) {
  console.log("User bob inserted. Result":)
  console.log(result)
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

    // sync find all users
    var usersCollection = client.getCollection("users")
    var users = usersCollection.find().toArray()
    console.log("All users")
    console.log(users)

    // async find by query
    users = usersCollection.find({name:"joe"}).toArray()

    console.log("Find result:")
    console.log(users)


    // sync insert
    var result = usersCollection.insert({"name": "bob"})
    console.log("User bob inserted. Result":)
    console.log(result)


  }
)


```


