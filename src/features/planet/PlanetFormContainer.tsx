import React from "react";
import {ID, Planet} from "../../domain/types";
import { PlanetFormView } from "./PlanetFormView";
import {useAppSelector} from "../../app/hooks";
import {selectPlanets} from "./planetSlice";
import {find} from "ramda";
import {byId} from "../../common/utils";

interface Props {
  planetId?: ID;
}

/**
 * Is used for both edit and create
 * @param {ID} planetId
 */
export const PlanetFormContainer = ({ planetId }: Props) => {
  const planets = useAppSelector(selectPlanets);
  const planet = find(byId(planetId), planets) || {} as Planet;

  return <PlanetFormView {...planet} />;
};
