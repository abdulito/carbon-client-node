Authentication
----------



Examples
----------

**API Key authentication**
```node

// API_KEY in headers
var client = new RestClient(testUrl, {
  authentication: {
    type: "api-key",
    apiKey:"123",
    apiKeyParameterName: "API_KEY",
    apiKeyLocation: "header" // or "query"
  }
});

```
