import React from "react";
import { useNavigate } from "react-router-dom";
import { find } from "ramda";
//
import { byId } from "../../common/utils";
import { ID, Planet, PlanetSchema } from "../../domain/types";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
//
import { PlanetFormView } from "./PlanetFormView";
import { savePlanet, selectPlanets } from "./planetSlice";

interface Props {
  planetId?: ID;
}

/**
 * Is used for both edit and create
 * @param {ID} planetId - use when loading a saved Planet
 */
export const PlanetFormContainer = ({ planetId }: Props) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  //
  const planets = useAppSelector(selectPlanets);
  const planet = find(byId(planetId), planets) || ({} as Planet);

  console.log("found planet", planet);

  const handleSaveForm = (localPlanet: Planet) => {
    const validationResult = PlanetSchema.safeParse(localPlanet);
    if (validationResult.success) {
      dispatch(savePlanet(localPlanet));
      navigate("/planet");
    } else {
      // TODO either inline feedback or use The Modal
      alert(`Bad data! ${validationResult.error}`);
    }
  };

  return <PlanetFormView handleSaveForm={handleSaveForm} planet={planet} />;
};
