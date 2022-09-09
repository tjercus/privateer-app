import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { SafeParseReturnType } from "zod/lib/types";
//
import { ID, Spaceship, SpaceshipSchema } from "../../domain/types";
import {
  useGetPlanetsQuery,
  useGetSpaceshipByIdQuery,
  usePutSpaceshipMutation,
} from "../../common/apiSlice";
//
import { SpaceshipFormView } from "./SpaceshipFormView";

interface Props {
  spaceshipId: ID;
}

export const SpaceshipEditFormContainer = ({ spaceshipId }: Props) => {
  const navigate = useNavigate();
  //
  const getPlanetsQuery = useGetPlanetsQuery();
  const { data } = useGetSpaceshipByIdQuery(spaceshipId);
  const [putSpaceship] = usePutSpaceshipMutation();
  const [localValidationResult, setLocalValidationResult] = useState(
    {} as SafeParseReturnType<any, any>
  );

  const handleSaveForm = (localSpaceship: Spaceship) => {
    console.log("handling saving edit spaceship", localSpaceship);
    const validationResult = SpaceshipSchema.safeParse(localSpaceship);
    if (validationResult.success) {
      putSpaceship(localSpaceship);
      navigate("/spaceship");
    } else {
      // facilitate inline feedback as per Visma ux
      setLocalValidationResult(validationResult);
    }
  };

  return (
    <SpaceshipFormView
      handleSaveForm={handleSaveForm}
      spaceship={data}
      planets={getPlanetsQuery.data ?? []}
      validationResult={localValidationResult}
    />
  );
};
