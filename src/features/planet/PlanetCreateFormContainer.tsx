import React from "react";
import { useNavigate } from "react-router-dom";
import { v4 as uuid } from "uuid";
//
import { Planet, PlanetSchema } from "../../domain/types";
import { usePostPlanetMutation } from "../../common/apiSlice";
//
import { PlanetFormView } from "./PlanetFormView";

export const PlanetCreateFormContainer = () => {
  const navigate = useNavigate();

  const [postPlanet] = usePostPlanetMutation();

  const handleSaveForm = (localPlanet: Planet) => {
    console.log("handling saving create planet", localPlanet);
    localPlanet.id = uuid();
    const validationResult = PlanetSchema.safeParse(localPlanet);
    if (validationResult.success) {
      postPlanet(localPlanet);
      navigate("/planet");
    } else {
      // TODO inline feedback as per Visma ux
      alert(`That is a shame! ${validationResult.error}`);
    }
  };

  return <PlanetFormView handleSaveForm={handleSaveForm} />;
};
