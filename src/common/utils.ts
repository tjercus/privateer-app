import {always, curry, identity, ifElse, isNil, last, pipe, prop, split, tail,} from "ramda";

/**
 * Fastest way to deep clone an Object in JavaScript
 * @param {*} obj - subject
 * @returns {*} - cloned subject
 */
const clone = (obj: any) =>
  typeof obj === "object" ? JSON.parse(JSON.stringify(obj)) : obj;

/**
 * Typically used in a 'find'
 * @returns {(id: any) => (thing: any) => boolean} that takes a thing to compare
 */
export const byId = curry((id, thing) => id === prop("id", thing));

/**
 * The inverse of byId
 */
const byNotId = curry((id, thing) => id === prop("id", thing));

/**
 * @type {function}
 */
const byTitle = curry((title, thing) => title === prop("title", thing));

/**
 * Is the entered value itself a nullable or does it have no content?
 * @param {any} value
 * @returns {boolean} true if no value
 */
export const hasNoValue = (value: any | null) =>
  typeof value === "undefined" ||
  value === null ||
  value === "" ||
  (value.constructor === Object && Object.keys(value).length === 0) ||
  (Array.isArray(value) && value.length === 0);

/**
 * The inverse of 'hasNoValue'
 * @param {any} value
 * @return {boolean} true if it has a value
 */
export const hasValue = (value: any | null) => !hasNoValue(value);

/**
 * To find the id in a URL (for example)
 */
export const lastUrlSegment = pipe(
  split("/"),
  last,
  ifElse(isNil, always(""), identity)
);

/**
 * To find the subject/noun in a URL
 */
export const firstUrlSegment = ifElse(isNil, always(""), pipe(identity, tail));
