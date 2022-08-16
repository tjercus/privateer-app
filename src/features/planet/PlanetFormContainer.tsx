import React from "react";
import {ID, Planet} from "../../domain/types";
import { PlanetFormView } from "./PlanetFormView";
import {useAppSelector} from "../../app/hooks";
import {selectPlanets} from "./planetSlice";

interface Props {
  planetId?: ID;
}

/**
 * Is used for both edit and create
 * @param {ID} planetId
 */
export const PlanetFormContainer = ({ planetId }: Props) => {
  const planets = useAppSelector(selectPlanets);
  const planet = planets.find(p => p.id === planetId) || {} as Planet;

  return <PlanetFormView {...planet} />;
};
