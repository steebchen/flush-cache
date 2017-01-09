'use strict'

module.exports = () => {
  for (const item of Object.keys(require.cache)) {
    delete require.cache[item]
  }
}
