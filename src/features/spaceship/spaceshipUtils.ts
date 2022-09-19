import { find } from "ramda";
//
import { Planet, Spaceship, SpaceshipType } from "../../domain/types";
import { byId, hasValue } from "../../common/utils";
import { FormDataMap } from "../../domain/general";

const newSpaceship: Spaceship = {
  armour: 0,
  id: "",
  landedOnId: "",
  name: "",
  type: SpaceshipType.NONE,
  weapons: [],
};

export const createSpaceship = (spaceship: Spaceship = {} as Spaceship) => {
  const sc = { ...newSpaceship };
  if (hasValue(spaceship.name)) {
    sc.name = spaceship.name;
  }
  // TODO etc.
  return sc;
};

export const findPlanetForSpaceship = (
  spaceship: Spaceship,
  planets: Array<Planet>
) => find(byId(spaceship.landedOnId), planets);

/**
 * Create a 'backing bean' for a form with initial values,
 *  does not adhere to the domain model logic rules.
 */
export const initialFormData: FormDataMap<Spaceship> =
  new Map()
    .set("armour", 0)
    .set("id", "")
    .set("landedOnId", "")
    .set("name", "")
    .set("type", SpaceshipType.NONE)
    .set("weapons", [])

export const createFormData = (spaceship?: Spaceship) => new Map()
  .set("armour", spaceship?.armour)
  .set("id", spaceship?.id)
  .set("landedOnId", spaceship?.landedOnId)
  .set("name", spaceship?.name)
  .set("type", spaceship?.type)
  .set("weapons", spaceship?.weapons);