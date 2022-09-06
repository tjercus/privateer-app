import { Spaceship, SpaceshipType } from "../../domain/types";
import { hasValue } from "../../common/utils";

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
