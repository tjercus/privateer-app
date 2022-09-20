import React from "react";
import {match} from "ts-pattern";
//
import {Coordinates, Planet } from "../../domain/types";
import {FormDataMap, HtmlInputType} from "../../domain/general";

/**
 * Is a 'backing bean' for a form with initial values,
 *  does not adhere to the domain model logic rules.
 * Has default values to minimally initialize the form.
 */
export const initialFormData: FormDataMap<Planet> = new Map()
  .set("coordinateLat", 0)
  .set("coordinateLong", 0)
  .set("id", "")
  .set("name", "")

/**
 * Maps from View Model to Domain Model
 */
export const createFormDataFromDomain = (planet?: Planet) =>
  new Map()
    .set("coordinateLat", planet?.coordinates?.lat)
    .set("coordinateLong", planet?.coordinates?.long)
    .set("id", planet?.id)
    .set("name", planet?.name)

/**
 * Takes an HTML event and a ViewModel Map and updates the Map with the event data
 */
export const updateFormData = (
  localFormData = initialFormData,
  evt:
    | React.ChangeEvent<HTMLInputElement>
    | React.ChangeEvent<HTMLSelectElement>
) => {
  console.log("updateFormData", evt);
  const htmlFieldName = evt.target.name as keyof Planet;
  const htmlInputType = evt.target.type as HtmlInputType;
  const value = evt.target.value;
  const newMap = new Map(localFormData); // clone

  match(htmlInputType)
    .with("checkbox", () => {
      // no checkbox in this form
    })
    .with("number", () => newMap.set(htmlFieldName, Number(value)))
    .with("select-one", () => newMap.set(htmlFieldName, value))
    .with("text", () => newMap.set(htmlFieldName, value))
    .exhaustive();

  return newMap;

  /*
  switch (htmlFieldName) {
    case "name":
      setLocalPlanet({...localPlanet, name: evt.target.value});
      break;
    case "coordinateLat":
      setLocalPlanet({
        ...localPlanet,
        coordinates: {
          lat: Number(evt.target.value),
          long: localPlanet.coordinates.long,
        } as Coordinates,
      });
      break;
    case "coordinateLong":
      setLocalPlanet({
        ...localPlanet,
        coordinates: {
          lat: localPlanet.coordinates.lat,
          long: Number(evt.target.value),
        } as Coordinates,
      });
      break;
    default:
      console.log("invalid field name used for change");
      break;
  }
   */
}