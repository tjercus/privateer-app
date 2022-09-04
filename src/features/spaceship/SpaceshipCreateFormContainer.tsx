import React from "react";
import { useNavigate } from "react-router-dom";
//
import { Spaceship, SpaceshipSchema } from "../../domain/types";
//
import { usePostSpaceshipMutation } from "./spaceshipApi";
import { SpaceshipFormView } from "./SpaceshipFormView";

export const SpaceshipCreateFormContainer = () => {
  const navigate = useNavigate();

  const [postSpaceship] = usePostSpaceshipMutation();

  const handleSaveForm = (localSpaceship: Spaceship) => {
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

  return <SpaceshipFormView handleSaveForm={handleSaveForm} />;
};
