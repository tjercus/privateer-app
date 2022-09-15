import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { v4 as uuid } from "uuid";
import { SafeParseReturnType } from "zod/lib/types";
//
import {Spaceship, SpaceshipSchema } from "../../domain/types";
import {
  useGetPlanetsQuery,
  usePostSpaceshipMutation,
} from "../../common/apiSlice";
//
import { SpaceshipFormView } from "./SpaceshipFormView";
import {FormDataMap} from "../../domain/general";
import {createSpaceship} from "./spaceshipUtils";

export const SpaceshipCreateFormContainer = () => {
  const navigate = useNavigate();

  const getPlanetsQuery = useGetPlanetsQuery();
  const [postSpaceship] = usePostSpaceshipMutation();

  const [localFormData, setLocalFormData] = useState(new Map());
  const [localValidationResult, setLocalValidationResult] = useState(
    {} as SafeParseReturnType<any, any>
  );

  /**
   * Handles changes in text and number fields
   */
  const handleInputChange = (
    evt:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLSelectElement>
  ) => {
    const htmlFieldName = evt.target.name;
    const htmlFieldType = evt.target.type;
    const value = evt.target.value;
    const newMap = new Map(localFormData); // clone
    newMap.set(
      htmlFieldName, htmlFieldType === "number" ? Number(value) : value,
    );
    setLocalFormData(newMap)
  };

  /**
   * Handles changes in checkbox groups
   */
  // const handleCheckboxGroupItemChange = (
  //   evt: React.ChangeEvent<HTMLInputElement>
  // ) => {
  //   const value = evt.target.value;
  //   const arr = formDataMap.get("weapons");
  //   const updatedArr = updateArray<Weapon>(arr, value);
  //   setLocalSpaceship({
  //     ...localSpaceship,
  //     weapons: updatedArr,
  //   });
  // };

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
      planets={getPlanetsQuery.data ?? []}
      validationResult={localValidationResult}
    />
  );
};
