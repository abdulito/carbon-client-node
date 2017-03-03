/**
 * Created by abdul on 8/26/15.
 */

var __ = require('@carbon-io/carbon-core').fibers.__(module)

__(
  function() {
    __(require('./path-tests'))
    __(require('./async/http-method-tests'))
    __(require('./async/collections'))
    __(require('./async/error'))
    __(require('./sync/http-method-tests'))
    __(require('./sync/collections'))
    __(require('./sync/error'))
    __(require('./auth-tests'))
    __(require('./timeout-test'))
  },
  function() {
    console.log("All tests passed")
  }
)



