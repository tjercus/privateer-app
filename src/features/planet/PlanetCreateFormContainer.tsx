import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { v4 as uuid } from "uuid";
//
import { hasNoValue, makeValidationIssues } from "../../common/utils";
import { ReactChangeEvent, ValidationIssues } from "../../domain/general";
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

  const [mutationError, setMutationError] = useState({});
  const [localFormData, setLocalFormData] = useState(initialFormData);
  const [localValidationIssues, setLocalValidationIssues] = useState(
    [] as ValidationIssues
  );

  const handleInputChange = (evt: ReactChangeEvent) => {
    setLocalFormData(updateFormData(localFormData, evt));
  };

  const handleSaveForm = (formDataMap: PlanetFormDataMap) => {
    const planet = createPlanetFromFormData(formDataMap);
    planet.id = uuid();
    const validationIssues = makeValidationIssues(
      PlanetSchema.safeParse(planet)
    );
    if (hasNoValue(validationIssues)) {
      postPlanet(planet)
        .unwrap()
        .then(() => {
          setMutationError({});
          navigate("/planet");
        })
        .catch((err) => {
          console.error("rejected", err);
          setMutationError(err);
        });
    }
    // facilitate inline feedback as per Visma ux
    setLocalValidationIssues(validationIssues);
  };

  return (
    <PlanetFormView
      error={mutationError}
      handleInputChange={handleInputChange}
      handleSaveForm={handleSaveForm}
      formDataMap={localFormData}
      validationIssues={localValidationIssues}
    />
  );
};
