import React from "react";
import { match } from "ts-pattern";
//
import { Planet } from "../../domain/types";
import { ReactChangeEvent } from "../../domain/general";
import { PlanetHtmlInputType, PlanetFormDataMap } from "./planetTypes";

/**
 * Is a 'backing bean' for a form with initial values,
 *  does not adhere to the domain model logic rules.
 * Has default values to minimally initialize the form.
 */
export const initialFormData: PlanetFormDataMap = new Map()
  .set("coordinateLat", 0)
  .set("coordinateLong", 0)
  .set("id", "")
  .set("name", "");

/**
 * Maps from View Model to Domain Model
 */
export const createFormDataFromDomain = (planet?: Planet) =>
  new Map()
    .set("coordinateLat", planet?.coordinates?.lat)
    .set("coordinateLong", planet?.coordinates?.long)
    .set("id", planet?.id)
    .set("name", planet?.name);

export const createPlanetFromFormData = (
  formDataMap: PlanetFormDataMap
): Planet => ({
  coordinates: {
    lat: formDataMap.get("coordinateLat") as number,
    long: formDataMap.get("coordinateLong") as number,
  },
  id: formDataMap.get("id"),
  name: formDataMap.get("name"),
});

/**
 * Takes an HTML event and a ViewModel Map and updates the Map with the event data
 */
export const updateFormData = (
  localFormData: PlanetFormDataMap,
  evt: ReactChangeEvent
) => {
  console.log("updateFormData", evt);
  const htmlFieldName = evt.target.name as any; // TODO narrow type
  const htmlInputType = evt.target.type as PlanetHtmlInputType;
  const value = evt.target.value;
  const newMap = new Map(localFormData); // clone

  match(htmlInputType)
    .with("number", () => newMap.set(htmlFieldName, Number(value)))
    .with("text", () => newMap.set(htmlFieldName, value))
    .exhaustive();

  return newMap;
};
