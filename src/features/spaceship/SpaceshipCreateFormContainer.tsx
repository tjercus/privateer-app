import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { v4 as uuid } from "uuid";
import { SafeParseReturnType } from "zod/lib/types";
//
import { Spaceship, SpaceshipSchema } from "../../domain/types";
import { FormDataMap, ReactChangeEvent } from "../../domain/general";
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

  const [localFormData, setLocalFormData] = useState(initialFormData);
  const [localValidationResult, setLocalValidationResult] = useState(
    {} as SafeParseReturnType<any, any>
  );

  const handleInputChange = (evt: ReactChangeEvent) => {
    setLocalFormData(updateFormData(localFormData, evt));
  };

  const handleSaveForm = (formDataMap: FormDataMap<Spaceship>) => {
    formDataMap.set("id", uuid());
    console.log("handling saving create spaceship", formDataMap);
    const spaceship = Object.fromEntries<Spaceship>(formDataMap);
    const validationResult = SpaceshipSchema.safeParse(spaceship);
    if (validationResult.success) {
      postSpaceship(spaceship);
      navigate("/spaceship");
    } else {
      // facilitate inline feedback as per Visma ux
      setLocalValidationResult(validationResult);

      // for debugging an alert might be useful
      // alert(`That is a shame! ${validationResult.error}`);
    }
  };

  return (
    <SpaceshipFormView
      handleInputChange={handleInputChange}
      handleSaveForm={handleSaveForm}
      formDataMap={localFormData}
      planets={getPlanetsQuery.data ?? []}
      validationResult={localValidationResult}
    />
  );
};
