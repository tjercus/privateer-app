const { curry, prop } = require("ramda");

/**
 * Typically used in a 'find'
 * @returns {(id: any) => (thing: any) => boolean} that takes a thing to compare
 */
const byId = curry((id, thing) => id === prop("id", thing));

/**
 * The inverse of byId
 */
const byNotId = curry((id, thing) => id !== prop("id", thing));

module.exports = {
  byId,
  byNotId,
};
