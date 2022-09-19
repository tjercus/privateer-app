import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { SafeParseReturnType } from "zod/lib/types";
//
import { FormDataMap, ID } from "../../domain/general";
import {Spaceship, SpaceshipSchema, Weapon} from "../../domain/types";
import {updateArray} from "../../common/utils";

import {
  useGetPlanetsQuery,
  useGetSpaceshipByIdQuery,
  usePutSpaceshipMutation,
} from "../../common/apiSlice";
//
import { SpaceshipFormView } from "./SpaceshipFormView";
import {createFormDataFromDomain, initialFormData} from "./spaceshipUtils";

interface Props {
  spaceshipId: ID;
}

export const SpaceshipEditFormContainer = ({ spaceshipId }: Props) => {
  const navigate = useNavigate();
  //
  const getPlanetsQuery = useGetPlanetsQuery();
  const { data } = useGetSpaceshipByIdQuery(spaceshipId);
  const [putSpaceship] = usePutSpaceshipMutation();

  const [localFormData, setLocalFormData] = useState(initialFormData);
  const [localValidationResult, setLocalValidationResult] = useState(
    {} as SafeParseReturnType<any, any>
  );

  // Set loaded data in localFormData
  useEffect(() => {
    setLocalFormData(createFormDataFromDomain(data))
  }, [data]);

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
    const htmlFieldType = evt.target.type;
    const value = evt.target.value;
    const newMap = new Map(localFormData); // clone

    // TODO use exhaustiveness checking
    if (htmlFieldType === "checkbox") {
      const arr = (localFormData.get("weapons") as Array<Weapon>) ?? [];
      const updatedArr = updateArray<Weapon>(arr, value);
      newMap.set("weapons", updatedArr);
    } else if (htmlFieldType === "number") {
      newMap.set(
        htmlFieldName,
        Number(value)
      );
    } else {
      newMap.set(htmlFieldName, value);
    }
    console.log("newMap", newMap);
    setLocalFormData(newMap);
  };

  const handleSaveForm = (formDataMap: FormDataMap<Spaceship>) => {
    console.log("handling saving edit spaceship", formDataMap);
    const spaceship = Object.fromEntries<Spaceship>(formDataMap);
    const validationResult = SpaceshipSchema.safeParse(spaceship);
    if (validationResult.success) {
      // copy ID as requested from the parent component to the local data
      putSpaceship({ ...spaceship, id: spaceshipId });
      navigate("/spaceship");
    } else {
      // facilitate inline feedback as per Visma ux
      setLocalValidationResult(validationResult);
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
