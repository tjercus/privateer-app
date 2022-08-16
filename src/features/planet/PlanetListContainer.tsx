import React from "react";
import { useAppSelector } from "../../app/hooks";
import { selectPlanets } from "./planetSlice";
import { PlanetListView } from "./PlanetListView";
//
export const PlanetListContainer = () => {
  const planets = useAppSelector(selectPlanets);
  //const dispatch = useAppDispatch();

  return <PlanetListView planets={planets} />;
};
