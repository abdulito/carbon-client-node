/**
 * Created by abdul on 8/26/15.
 */

var fiber = require('fiber')
var __  = fiber.__(module, true)

__(
  function() {

    require('./path-tests')
    require('./async/basic')
    require('./sync/basic')
    require('./async/collections')
    require('./sync/collections')
    require('./auth-tests')

  }
)



console.log("All tests passed")