import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
//
import {
  FormDataMap,
  ID,
  ReactChangeEvent,
  ValidationIssues,
} from "../../domain/general";
import { Spaceship, SpaceshipSchema } from "../../domain/types";
import { hasNoValue, makeValidationIssues } from "../../common/utils";
import {
  useGetPlanetsQuery,
  useGetSpaceshipByIdQuery,
  usePutSpaceshipMutation,
} from "../../common/apiSlice";
//
import { SpaceshipFormView } from "./SpaceshipFormView";
import {
  createFormDataFromDomain,
  initialFormData,
  updateFormData,
} from "./spaceshipUtils";

interface Props {
  spaceshipId: ID;
}

export const SpaceshipEditFormContainer = ({ spaceshipId }: Props) => {
  const navigate = useNavigate();
  //
  const getPlanetsQuery = useGetPlanetsQuery();
  const { data, error: fetchError } = useGetSpaceshipByIdQuery(spaceshipId);
  const [putSpaceship] = usePutSpaceshipMutation();

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

  const handleSaveForm = (formDataMap: FormDataMap<Spaceship>) => {
    const spaceship = Object.fromEntries<Spaceship>(formDataMap);
    const validationIssues = makeValidationIssues(
      SpaceshipSchema.safeParse(spaceship)
    );
    if (hasNoValue(validationIssues)) {
      putSpaceship(spaceship)
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
      error={fetchError || mutationError}
      handleInputChange={handleInputChange}
      handleSaveForm={handleSaveForm}
      formDataMap={localFormData}
      planets={getPlanetsQuery.data ?? []}
      validationIssues={localValidationIssues}
    />
  );
};
