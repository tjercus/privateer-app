import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
//
import { ID, ReactChangeEvent } from "../../domain/general";
import {
  useGetPlanetsQuery,
  useGetSpaceshipByIdQuery,
  usePatchSpaceshipMutation,
} from "../../common/apiSlice";
//
import { SpaceshipMoveFormView } from "./SpaceShipMoveFormView";

interface Props {
  spaceshipId: ID;
}

export const SpaceshipMoveFormContainer = ({ spaceshipId }: Props) => {
  const navigate = useNavigate();
  //
  const getPlanetsQuery = useGetPlanetsQuery();
  const { data, error: fetchError } = useGetSpaceshipByIdQuery(spaceshipId);
  const [patchSpaceship] = usePatchSpaceshipMutation();

  const [mutationError, setMutationError] = useState({});
  const [localLandedOnId, setLocalLandedOnId] = useState("" as ID);

  // Set the loaded store data in local state
  useEffect(() => {
    setLocalLandedOnId(data?.landedOnId ?? "");
  }, [data]);

  const handleInputChange = (evt: ReactChangeEvent) => {
    setLocalLandedOnId(evt.target.value ?? "");
  };

  const handleSaveForm = () => {
    patchSpaceship({ id: data?.id || spaceshipId, landedOnId: localLandedOnId })
      .unwrap()
      .then(() => {
        setMutationError({});
        console.log("Succes!", localLandedOnId);
        navigate("/spaceship");
      })
      .catch((err) => {
        console.error("rejected", err);
        setMutationError(err);
      });
  };

  return (
    <SpaceshipMoveFormView
      error={fetchError || mutationError}
      handleInputChange={handleInputChange}
      handleSaveForm={handleSaveForm}
      landedOnId={localLandedOnId}
      planets={getPlanetsQuery.data ?? []}
    />
  );
};
