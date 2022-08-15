import React from "react";
import { ID } from "../../domain/types";
import {createPlanet} from "../../app/utils";
import {PlanetFormView} from "./PlanetFormView";

// coordinates={{lat: 1, long: 2}} id="sdf-450-dfg" name="wobble"
export const PlanetFormContainer = (planetId: ID = "abc-123") => {
  // TODO use planet ID to get the planet data
  // for now a static Planet is created
  const planet = createPlanet({lat: 234, long: 3498.332}, planetId, "Wobble");

  return (<PlanetFormView {...planet} />);
}