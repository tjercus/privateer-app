import {
  always,
  concat,
  curry,
  filter,
  identity,
  ifElse,
  includes,
  isNil,
  last,
  pipe,
  prop,
  split,
  tail,
  without,
} from "ramda";
import { SafeParseReturnType } from "zod/lib/types";
import { ZodIssue } from "zod";
//
import { ValidationIssues } from "../domain/general";

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
export const byNotId = curry((id, thing) => id !== prop("id", thing));

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
 * If not-Array wrap it in an Array, else return original Array
 */
const asArray = <T>(singleOrMultiple: T | Array<T>) =>
  Array.isArray(singleOrMultiple) ? singleOrMultiple : [singleOrMultiple];

/**
 * Add or remove a value to a copy of an array
 */
export const updateArray = <T>(arr: Array<T>, value: any) =>
  includes(value, arr ?? []) ? without([value], arr) : concat([value], arr);

// /**
//  * Make the identity (null) type for a validation result
//  */
// export const createValidationResult = () =>
//   ({ data: {}, success: true } as SafeParseReturnType<any, any>);

/**
 * Map Zod's validation result Object to an Array of ZodIssue Objects
 */
export const makeValidationIssues = (
  safeParse: SafeParseReturnType<any, any>
): ValidationIssues => (safeParse.success ? [] : safeParse.error?.issues);

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

/**
 * Is a field or one of many fields to be found in a list of error Objects?
 */
export const hasIssues = (
  vi: ValidationIssues = [],
  fieldOrFields: string | Array<string> = []
) =>
  hasValue(
    vi.filter((issue: ZodIssue) =>
      includes(issue.path[0], asArray(fieldOrFields))
    )
  );
