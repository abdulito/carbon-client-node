var __  = require('@carbon-io/fibers').__(module)
var _o  = require('@carbon-io/bond')._o(module)
var o   = require('@carbon-io/atom').o(module)

var CarbonClient = require('../lib/CarbonClient')

/***********************************************************************************************************************
 * Base class for CarbonClient tests
 */
module.exports = o.main({

  /*********************************************************************************************************************
   * _type
   */
  _type: _o('@carbon-io/carbon-client/test/TestBase'),

  /*********************************************************************************************************************
   * clientClass
   */
  clientClass: CarbonClient

})

