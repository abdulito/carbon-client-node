/**
 * Created by abdul on 8/26/15.
 */

var fiber = require('fiber')
var __  = fiber.__(module, true);

__(
  function() {

    require('./path-tests');
    require('./async-tests');
    require('./sync-tests');
    require('./auth-tests');

  }
)



console.log("All tests passed")