import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { v4 as uuid } from "uuid";
import { SafeParseReturnType } from "zod/lib/types";
//
import { Planet, PlanetSchema } from "../../domain/types";
import { usePostPlanetMutation } from "../../common/apiSlice";
//
import {initialFormData, updateFormData} from "./planetUtils";
import { PlanetFormView } from "./PlanetFormView";

export const PlanetCreateFormContainer = () => {
  const navigate = useNavigate();

  const [postPlanet] = usePostPlanetMutation();

  const [localFormData, setLocalFormData] = useState(initialFormData);
  const [localValidationResult, setLocalValidationResult] = useState(
    {} as SafeParseReturnType<any, any>
  );

  const handleInputChange = (
    evt:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLSelectElement>
  ) => {
    setLocalFormData(updateFormData(localFormData, evt));
  };

  const handleSaveForm = (localPlanet: Planet) => {
    console.log("handling saving create planet", localPlanet);
    localPlanet.id = uuid();
    const validationResult = PlanetSchema.safeParse(localPlanet);
    if (validationResult.success) {
      postPlanet(localPlanet);
      navigate("/planet");
    } else {
      // facilitate inline feedback as per Visma ux
      setLocalValidationResult(validationResult);

      // for debugging an alert might be useful
      // alert(`That is a shame! ${validationResult.error}`);
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
