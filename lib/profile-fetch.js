module.exports = profileFetch

var get = require('lodash/get')
var merge = require('lodash/merge')
var set = require('lodash/set')

var internals = module.exports.internals = {}
internals.fetchProperties = require('../utils/fetch-properties')
internals.saveAccount = require('../utils/save-account')

function profileFetch (state, path) {
  return internals.fetchProperties({
    url: state.baseUrl + '/session/account/profile',
    bearerToken: get(state, 'account.session.id'),
    path: path
  })

  .then(function (properties) {
    if (typeof path === 'string') {
      set(state.account.profile, path, properties)
    } else {
      merge(state.account.profile, properties)
    }

    internals.saveAccount({
      cacheKey: state.cacheKey,
      account: state.account
    })

    return properties
  })
}
