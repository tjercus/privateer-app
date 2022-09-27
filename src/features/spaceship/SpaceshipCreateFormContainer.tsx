import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { v4 as uuid } from "uuid";
//
import { PlanetSchema, Spaceship } from "../../domain/types";
import {
  FormDataMap,
  ReactChangeEvent,
  ValidationIssues,
} from "../../domain/general";
import { hasNoValue, makeValidationIssues } from "../../common/utils";
import {
  useGetPlanetsQuery,
  usePostSpaceshipMutation,
} from "../../common/apiSlice";
//
import { SpaceshipFormView } from "./SpaceshipFormView";
import { initialFormData, updateFormData } from "./spaceshipUtils";

export const SpaceshipCreateFormContainer = () => {
  const navigate = useNavigate();

  const getPlanetsQuery = useGetPlanetsQuery();
  const [postSpaceship] = usePostSpaceshipMutation();

  const [mutationError, setMutationError] = useState({});
  const [localFormData, setLocalFormData] = useState(initialFormData);
  const [localValidationIssues, setLocalValidationIssues] = useState(
    [] as ValidationIssues
  );

  const handleInputChange = (evt: ReactChangeEvent) => {
    setLocalFormData(updateFormData(localFormData, evt));
  };

  const handleSaveForm = (formDataMap: FormDataMap<Spaceship>) => {
    formDataMap.set("id", uuid());
    console.log("handling saving create spaceship", formDataMap);
    const spaceship = Object.fromEntries<Spaceship>(formDataMap);
    const validationIssues = makeValidationIssues(
      PlanetSchema.safeParse(spaceship)
    );
    if (hasNoValue(validationIssues)) {
      postSpaceship(spaceship)
        .unwrap()
        .then(() => {
          setMutationError({});
          navigate("/spaceship");
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
    <SpaceshipFormView
      error={mutationError}
      handleInputChange={handleInputChange}
      handleSaveForm={handleSaveForm}
      formDataMap={localFormData}
      planets={getPlanetsQuery.data ?? []}
      validationIssues={localValidationIssues}
    />
  );
};
