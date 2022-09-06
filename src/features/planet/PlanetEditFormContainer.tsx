import React from "react";
import { useNavigate } from "react-router-dom";
//
import { ID, Planet, PlanetSchema } from "../../domain/types";
import {
  useGetPlanetByIdQuery,
  usePutPlanetMutation,
} from "../../common/apiSlice";
//
import { PlanetFormView } from "./PlanetFormView";

interface Props {
  planetId: ID;
}

export const PlanetEditFormContainer = ({ planetId }: Props) => {
  const navigate = useNavigate();
  //
  const { data, error, isFetching, isLoading } =
    useGetPlanetByIdQuery(planetId);

  const [putPlanet] = usePutPlanetMutation();

  const handleSaveForm = (localPlanet: Planet) => {
    console.log("handling saving edit planet", localPlanet);
    const validationResult = PlanetSchema.safeParse(localPlanet);
    if (validationResult.success) {
      putPlanet(localPlanet);
      navigate("/planet");
    } else {
      // TODO inline feedback as per Visma ux
      alert(`That is a shame! ${validationResult.error}`);
    }
  };

  return <PlanetFormView handleSaveForm={handleSaveForm} planet={data} />;
};
