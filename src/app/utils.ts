import {always, identity, ifElse, isNil, last, pipe, split} from "ramda";

import { Coordinates, ID, Planet, ZERO_COORD } from "../domain/types";

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

export const lastUrlSegment = pipe(split("/"), last, ifElse(isNil, always(""), identity));