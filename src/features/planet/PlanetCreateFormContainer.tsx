import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { v4 as uuid } from "uuid";
import { SafeParseReturnType } from "zod/lib/types";
//
import { ReactChangeEvent } from "../../domain/general";
import { PlanetSchema } from "../../domain/types";
import { usePostPlanetMutation } from "../../common/apiSlice";
//
import { PlanetFormView } from "./PlanetFormView";
import {
  createPlanetFromFormData,
  initialFormData,
  updateFormData,
} from "./planetUtils";
import { PlanetFormDataMap } from "./planetTypes";

export const PlanetCreateFormContainer = () => {
  const navigate = useNavigate();

  const [postPlanet] = usePostPlanetMutation();

  const [localFormData, setLocalFormData] = useState(initialFormData);
  const [localValidationResult, setLocalValidationResult] = useState(
    {} as SafeParseReturnType<any, any>
  );

  const handleInputChange = (evt: ReactChangeEvent) => {
    setLocalFormData(updateFormData(localFormData, evt));
  };

  const handleSaveForm = (formDataMap: PlanetFormDataMap) => {
    const planet = createPlanetFromFormData(formDataMap);
    planet.id = uuid();
    const validationResult = PlanetSchema.safeParse(planet);
    if (validationResult.success) {
      postPlanet(planet).unwrap()
        .then((payload) => console.log('fulfilled', payload))
        .catch((error) => console.error('rejected', error))
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
