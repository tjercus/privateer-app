import { Planet, Spaceship, SpaceshipType } from "../../domain/types";
import { byId, hasValue } from "../../common/utils";
import { find } from "ramda";

export const createSpaceship = (spaceship: Spaceship = {} as Spaceship) => {
  const newSpaceship: Spaceship = {
    armour: 0,
    id: "",
    landedOnId: "",
    name: "",
    type: SpaceshipType.NONE,
    weapons: [],
  };
  if (hasValue(spaceship.name)) {
    newSpaceship.name = spaceship.name;
  }
  // TODO etc.

  return newSpaceship;
};

export const findPlanetForSpaceship = (
  spaceship: Spaceship,
  planets: Array<Planet>
) => find(byId(spaceship.landedOnId), planets);
