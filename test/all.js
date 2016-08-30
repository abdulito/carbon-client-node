/**
 * Created by abdul on 8/26/15.
 */

var __ = require('@carbon-io/fibers').__(module)

__(
  function() {

    require('./path-tests')
    require('./async/http-method-tests')
    require('./async/collections')
    require('./async/error')
    require('./sync/http-method-tests')
    require('./sync/collections')
    require('./sync/error')
    require('./auth-tests')

  }
)



console.log("All tests passed")
