import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
//
import { Planet, PlanetSchema } from "../../domain/types";
import {
  useGetPlanetByIdQuery,
  usePutPlanetMutation,
} from "../../common/apiSlice";
//
import { PlanetFormView } from "./PlanetFormView";
import { SafeParseReturnType } from "zod/lib/types";
import { ID } from "../../domain/general";

interface Props {
  planetId: ID;
}

export const PlanetEditFormContainer = ({ planetId }: Props) => {
  const navigate = useNavigate();
  //
  const { data } = useGetPlanetByIdQuery(planetId);
  const [putPlanet] = usePutPlanetMutation();
  const [localValidationResult, setLocalValidationResult] = useState(
    {} as SafeParseReturnType<any, any>
  );

  const handleSaveForm = (localPlanet: Planet) => {
    console.log("handling saving edit planet", localPlanet);
    const validationResult = PlanetSchema.safeParse(localPlanet);
    if (validationResult.success) {
      putPlanet(localPlanet);
      navigate("/planet");
    } else {
      // facilitate inline feedback as per Visma ux
      setLocalValidationResult(validationResult);
    }
  };

  return (
    <PlanetFormView
      handleSaveForm={handleSaveForm}
      planet={data}
      validationResult={localValidationResult}
    />
  );
};
