import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { SafeParseReturnType } from "zod/lib/types";
//
import { ID, ReactChangeEvent } from "../../domain/general";
import { PlanetSchema } from "../../domain/types";
import {
  useGetPlanetByIdQuery,
  usePutPlanetMutation,
} from "../../common/apiSlice";
//
import { PlanetFormView } from "./PlanetFormView";
import {
  createFormDataFromDomain,
  createPlanetFromFormData,
  initialFormData,
  updateFormData,
} from "./planetUtils";
import { PlanetFormDataMap } from "./planetTypes";

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

  const handleInputChange = (evt: ReactChangeEvent) => {
    setLocalFormData(updateFormData(localFormData, evt));
  };

  const handleSaveForm = (formDataMap: PlanetFormDataMap) => {
    const planet = createPlanetFromFormData(formDataMap);
    const validationResult = PlanetSchema.safeParse(planet);
    if (validationResult.success) {
      putPlanet(planet);
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
