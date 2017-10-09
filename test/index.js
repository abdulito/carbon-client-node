var __ = require('@carbon-io/fibers').__(module)
var _o = require('@carbon-io/bond')._o(module)
var o = require('@carbon-io/atom').o(module)
var testtube = require('@carbon-io/test-tube')


/******************************************************************************
 * All tests
 */
__(function() {
  module.exports = o.main({

    /**********************************************************************
     * _type
     */
    _type: testtube.Test,

    /**********************************************************************
     * name
     */
    name: "Carbon Client Node tests",

    /**********************************************************************
     * tests
     */
    tests: [
      _o('./HttpMethodsTest'),
      _o('./CollectionsTest'),
      _o('./CursorsTest'),
      _o('./ErrorTest')
    ]
  })
})
