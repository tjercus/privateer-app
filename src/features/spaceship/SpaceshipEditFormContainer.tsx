import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { SafeParseReturnType } from "zod/lib/types";
//
import { FormDataMap, ID } from "../../domain/general";
import {Spaceship, SpaceshipSchema, SpaceshipType} from "../../domain/types";
import {
  useGetPlanetsQuery,
  useGetSpaceshipByIdQuery,
  usePutSpaceshipMutation,
} from "../../common/apiSlice";
//
import { SpaceshipFormView } from "./SpaceshipFormView";
import {createFormData, initialFormData} from "./spaceshipUtils";

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
    setLocalFormData(createFormData(data))
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
    const htmlFieldName = evt.target.name;
    const htmlFieldType = evt.target.type;
    const value = evt.target.value;
    const newMap = new Map(localFormData); // clone
    newMap.set(
      htmlFieldName as any,
      htmlFieldType === "number" ? Number(value) : value
    );
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
