import React from "react";
import { useNavigate } from "react-router-dom";
import { v4 as uuid } from "uuid";
//
import { Spaceship, SpaceshipSchema } from "../../domain/types";
import {
  useGetPlanetsQuery,
  usePostSpaceshipMutation,
} from "../../common/apiSlice";
//
import { SpaceshipFormView } from "./SpaceshipFormView";

export const SpaceshipCreateFormContainer = () => {
  const navigate = useNavigate();

  const getPlanetsQuery = useGetPlanetsQuery();
  const [postSpaceship] = usePostSpaceshipMutation();

  const handleSaveForm = (localSpaceship: Spaceship) => {
    localSpaceship.id = uuid();
    console.log("handling saving create spaceship", localSpaceship);
    const validationResult = SpaceshipSchema.safeParse(localSpaceship);
    if (validationResult.success) {
      postSpaceship(localSpaceship);
      navigate("/spaceship");
    } else {
      // TODO inline feedback as per Visma ux
      alert(`That is a shame! ${validationResult.error}`);
    }
  };

  return (
    <SpaceshipFormView
      handleSaveForm={handleSaveForm}
      planets={getPlanetsQuery.data ?? []}
    />
  );
};
