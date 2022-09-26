import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
//
import {ID, ReactChangeEvent, ValidationIssues} from "../../domain/general";
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
import {hasNoValue, makeValidationIssues} from "../../common/utils";

interface Props {
  planetId: ID;
}

export const PlanetEditFormContainer = ({ planetId }: Props) => {
  const navigate = useNavigate();
  //
  const { data, error: fetchError } = useGetPlanetByIdQuery(planetId);
  const [putPlanet] = usePutPlanetMutation();

  const [mutationError, setMutationError] = useState({});
  const [localFormData, setLocalFormData] = useState(initialFormData);
  const [localValidationIssues, setLocalValidationIssues] = useState(
    [] as ValidationIssues
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
    const validationIssues = makeValidationIssues(PlanetSchema.safeParse(planet));
    if (hasNoValue(validationIssues)) {
      putPlanet(planet)
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
      error={fetchError || mutationError}
      handleInputChange={handleInputChange}
      handleSaveForm={handleSaveForm}
      formDataMap={localFormData}
      validationIssues={localValidationIssues}
    />
  );
};
