var request = require('request');
var util = require('util');
var EJSON = require('mongodb-extended-json')
var Endpoint = require('./Endpoint')
var syncInvoke = require('fibers-utils').syncInvoke


/******************************************************************************
 * @class CarbonClient
 * @constructor
 *
 * @param url
 * @param options
 */
function CarbonClient(url, options) { // XXX what are the options?
  this.restClient = new RestClient(url, options)
}

util.inherits(CarbonClient, Endpoint)

/****************************************************************************************************
 * exports
 */
module.exports = RestClient
