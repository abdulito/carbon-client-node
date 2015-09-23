Getting started (Hello World)
----------

### Creating your first API

The first step is to create a standard Node.js package

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


### Creating the client

```
// require the client
var RestClient = require('carbon-client-node');

// create the client object
var client = new RestClient("http://localhost:8888")

// request the /hello endpoint
client.getEndpoint("hello").get(function(e, res) {
   console.log("Response from /hello: " + res.body)
})

```


