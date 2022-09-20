import { find } from "ramda";
import { match } from "ts-pattern";
//
import { byId, updateArray } from "../../common/utils";
import { Planet, Spaceship, SpaceshipType, Weapon } from "../../domain/types";
import { FormDataMap, ReactChangeEvent } from "../../domain/general";
import { SpaceshipHtmlInputType } from "./spaceshipTypes";

/*
const newSpaceship: Spaceship = {
  armour: 0,
  id: "",
  landedOnId: "",
  name: "",
  type: SpaceshipType.NONE,
  weapons: [],
};
*/

export const findPlanetForSpaceship = (
  spaceship: Spaceship,
  planets: Array<Planet>
) => find(byId(spaceship.landedOnId), planets);

/**
 * Is a 'backing bean' for a form with initial values,
 *  does not adhere to the domain model logic rules.
 * Has default values to minimally initialize the form.
 */
export const initialFormData: FormDataMap<Spaceship> = new Map()
  .set("armour", 0)
  .set("id", "")
  .set("landedOnId", "")
  .set("name", "")
  .set("type", SpaceshipType.NONE)
  .set("weapons", []);

/**
 * Maps from View Model to Domain Model
 */
export const createFormDataFromDomain = (spaceship?: Spaceship) =>
  new Map()
    .set("armour", spaceship?.armour)
    .set("id", spaceship?.id)
    .set("landedOnId", spaceship?.landedOnId)
    .set("name", spaceship?.name)
    .set("type", spaceship?.type)
    .set("weapons", spaceship?.weapons);

/**
 * Takes an HTML event and a ViewModel Map and updates the Map with the event data
 */
export const updateFormData = (
  localFormData = initialFormData,
  evt: ReactChangeEvent
) => {
  console.log("updateFormData", evt);
  const htmlFieldName = evt.target.name as keyof Spaceship;
  const htmlInputType = evt.target.type as SpaceshipHtmlInputType;
  const value = evt.target.value;
  const newMap = new Map(localFormData); // clone

  match(htmlInputType)
    .with("checkbox", () => {
      const arr = (localFormData.get("weapons") as Array<Weapon>) ?? [];
      const updatedArr = updateArray<Weapon>(arr, value);
      newMap.set("weapons", updatedArr);
    })
    .with("number", () => newMap.set(htmlFieldName, Number(value)))
    .with("select-one", () => newMap.set(htmlFieldName, value))
    .with("text", () => newMap.set(htmlFieldName, value))
    .exhaustive();

  return newMap;
};
