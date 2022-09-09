import React from "react";

/**
 * Render a list of HTML option elements from an array of strings, for example an enum
 */
export function createStringsOptionList<T>(arr: Array<T>) {
  return arr.map((item) =>
    typeof item === "string" ? (
      <option key={item} value={item}>
        {item}
      </option>
    ) : null
  );
}

/**
 * Render a list of HTML option elements from an Object which has at least id and name
 */
export const createObjectsOptionList = (
  arr: Array<{ id: string; name: string }>
) =>
  arr.map((obj) => (
    <option key={obj.id} value={obj.id}>
      {obj.name}
    </option>
  ));
