import React from "react";
import { useNavigate } from "react-router-dom";
//
import { ID, Spaceship, SpaceshipSchema } from "../../domain/types";
//
import {
  useGetSpaceshipByIdQuery,
  usePutSpaceshipMutation,
} from "./spaceshipApi";
import { SpaceshipFormView } from "./SpaceshipFormView";

interface Props {
  spaceshipId: ID;
}

export const SpaceshipEditFormContainer = ({ spaceshipId }: Props) => {
  const navigate = useNavigate();
  //
  const { data, error, isFetching, isLoading } =
    useGetSpaceshipByIdQuery(spaceshipId);

  const [putSpaceship] = usePutSpaceshipMutation();

  const handleSaveForm = (localSpaceship: Spaceship) => {
    console.log("handling saving edit spaceship", localSpaceship);
    const validationResult = SpaceshipSchema.safeParse(localSpaceship);
    if (validationResult.success) {
      putSpaceship(localSpaceship);
      navigate("/spaceship");
    } else {
      // TODO inline feedback as per Visma ux
      alert(`That is a shame! ${validationResult.error}`);
    }
  };

  return <SpaceshipFormView handleSaveForm={handleSaveForm} spaceship={data} />;
};
