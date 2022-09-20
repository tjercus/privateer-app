import React, {useEffect, useState} from "react";
import { useNavigate } from "react-router-dom";
import { SafeParseReturnType } from "zod/lib/types";
//
import { ID } from "../../domain/general";
import { Planet, PlanetSchema } from "../../domain/types";
import {
  useGetPlanetByIdQuery,
  usePutPlanetMutation,
} from "../../common/apiSlice";
//
import { PlanetFormView } from "./PlanetFormView";
import {createFormDataFromDomain, initialFormData} from "./planetUtils";
import {updateFormData} from "../spaceship/spaceshipUtils";

interface Props {
  planetId: ID;
}

export const PlanetEditFormContainer = ({ planetId }: Props) => {
  const navigate = useNavigate();
  //
  const { data } = useGetPlanetByIdQuery(planetId);
  const [putPlanet] = usePutPlanetMutation();

  const [localFormData, setLocalFormData] = useState(initialFormData);
  const [localValidationResult, setLocalValidationResult] = useState(
    {} as SafeParseReturnType<any, any>
  );

  // Set the loaded store data in localFormData
  useEffect(() => {
    setLocalFormData(createFormDataFromDomain(data));
  }, [data]);

  const handleInputChange = (
    evt:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLSelectElement>
  ) => {
    setLocalFormData(updateFormData(localFormData, evt));
  };

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
      handleInputChange={handleInputChange}
      handleSaveForm={handleSaveForm}
      formDataMap={localFormData}
      validationResult={localValidationResult}
     />
  );
};
