import React from "react";
import { useNavigate } from "react-router-dom";
//
import { ID, Spaceship, SpaceshipSchema } from "../../domain/types";
import { hasValue } from "../../common/utils";
//
import {useGetSpaceshipByIdQuery, usePostSpaceshipMutation, usePutSpaceshipMutation} from "./spaceshipApi";
import { SpaceshipFormView } from "./SpaceshipFormView";
import {createSpaceship} from "./spaceshipUtils";

interface Props {
  spaceshipId: ID;
}

/**
 * Is used for both edit and create
 * @param {ID} spaceshipId - use when loading a saved Spaceship
 */
export const SpaceshipFormContainer = ({ spaceshipId }: Props) => {
  const navigate = useNavigate();
  //
  const { data, error, isFetching, isLoading } =
    useGetSpaceshipByIdQuery(spaceshipId);

  const [putSpaceship] = usePutSpaceshipMutation();
  const [postSpaceship] = usePostSpaceshipMutation();


  const handleSaveForm = (localSpaceship: Spaceship) => {
    const validationResult = SpaceshipSchema.safeParse(localSpaceship);
    if (validationResult.success) {
      if (hasValue(spaceshipId)) {
        putSpaceship(localSpaceship);
      } else {
        postSpaceship(localSpaceship);
      }
      navigate("/spaceship");
    } else {
      // TODO inline feedback as per Visma ux
      alert(`F*ck you buddy! ${validationResult.error}`);
    }
  };

  return <SpaceshipFormView handleSaveForm={handleSaveForm} spaceship={data ?? createSpaceship() } />;
};
