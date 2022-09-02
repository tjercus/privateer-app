import { Planet, ZERO_COORD } from "../../domain/types";
import { hasValue } from "../../common/utils";

export const createPlanet = (planet: Planet = {} as Planet) => {
  const newPlanet: Planet = { coordinates: ZERO_COORD, id: "", name: "" };
  if (hasValue(planet.coordinates) && planet.coordinates !== ZERO_COORD) {
    newPlanet.coordinates = planet.coordinates;
  }
  if (hasValue(planet.name)) {
    newPlanet.name = planet.name;
  }
  if (hasValue(planet.id)) {
    newPlanet.id = planet.id;
  }
  return newPlanet;
};
