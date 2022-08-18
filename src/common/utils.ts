import {curry, always, identity, ifElse, isNil, last, pipe, prop, split} from "ramda";

import { Coordinates, ID, Planet, ZERO_COORD } from "../domain/types";


/**
 * Fastest way to deep clone an Object in JavaScript
 * @param {*} obj - subject
 * @returns {*} - cloned subject
 */
const clone = (obj: any) => typeof obj === "object" ? JSON.parse(JSON.stringify(obj)) : obj;

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
 * Perhaps move to domain/domainUtils.ts
 * @param coordinates
 * @param id
 * @param name
 */
export const createPlanet = (
  coordinates: Coordinates = ZERO_COORD,
  id: ID = "",
  name: string = ""
) => {
  const newPlanet: Planet = { coordinates: ZERO_COORD, id: "", name: "" };
  if (coordinates !== ZERO_COORD) {
    newPlanet.coordinates = coordinates;
  }
  if (name !== "") {
    newPlanet.name = name;
  }
  if (id !== "") {
    newPlanet.id = id;
  }
  return newPlanet;
};

/**
 * To find the
 */
export const lastUrlSegment = pipe(split("/"), last, ifElse(isNil, always(""), identity));