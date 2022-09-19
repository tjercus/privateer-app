import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { v4 as uuid } from "uuid";
import { SafeParseReturnType } from "zod/lib/types";
//
import { Spaceship, SpaceshipSchema, Weapon } from "../../domain/types";
import {FormDataMap, HtmlInputType} from "../../domain/general";
import { updateArray } from "../../common/utils";

import {
  useGetPlanetsQuery,
  usePostSpaceshipMutation,
} from "../../common/apiSlice";
//
import { SpaceshipFormView } from "./SpaceshipFormView";
import {initialFormData} from "./spaceshipUtils";
import {match} from "ts-pattern";

export const SpaceshipCreateFormContainer = () => {
  const navigate = useNavigate();

  const getPlanetsQuery = useGetPlanetsQuery();
  const [postSpaceship] = usePostSpaceshipMutation();

  const [localFormData, setLocalFormData] = useState(
    initialFormData
  );
  const [localValidationResult, setLocalValidationResult] = useState(
    {} as SafeParseReturnType<any, any>
  );

  /**
   * Handles changes in text and number fields
   * TODO move to custom hook
   */
  const handleInputChange = (
    evt:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLSelectElement>
  ) => {
    console.log("handleInputChange", evt);
    const htmlFieldName = evt.target.name as keyof Spaceship;
    const htmlInputType = evt.target.type as HtmlInputType;
    const value = evt.target.value;
    const newMap = new Map(localFormData); // clone

    match(htmlInputType)
      .with("checkbox", () => {
        const arr = (localFormData.get("weapons") as Array<Weapon>) ?? [];
        const updatedArr = updateArray<Weapon>(arr, value);
        newMap.set("weapons", updatedArr);
      })
      .with("number", () => newMap.set(htmlFieldName, Number(value)))
      .with("select-one", () => newMap.set(htmlFieldName, value))
      .with("text", () => newMap.set(htmlFieldName, value))
      .exhaustive();

    setLocalFormData(newMap);
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
