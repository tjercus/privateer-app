import * as React from "react";
import { useEffect, useState } from "react";
//
import { useAppDispatch } from "../../hooks";
import { ID } from "../../domain/types";
import {
  useDeletePlanetMutation,
  useGetPlanetsQuery,
} from "../../common/apiSlice";
import {
  closeModal,
  configureModal,
  ModalTypes,
  openModal,
} from "../modal/modalSlice";
//
import { PlanetListView } from "./PlanetListView";

export const PlanetListContainer = () => {
  const dispatch = useAppDispatch();
  const { data, error, isLoading } = useGetPlanetsQuery();
  const [localPlanetId, setLocalSpaceShipId] = useState("");
  const [deletePlanet] = useDeletePlanetMutation();

  useEffect(() => {
    dispatch(
      configureModal({
        handleCloseEvent: () => {
          dispatch(closeModal());
        },
        handleConfirmEvent: () => {
          deletePlanet(localPlanetId);
          dispatch(closeModal());
        },
        title: "Are you sure?",
        modalType: ModalTypes.CONFIRM,
      })
    );
  }, [deletePlanet, dispatch, localPlanetId]);

  /**
   * When the user clicks on the trashcan icon and has not confirmed deletion yet
   */
  const handleDeleteButtonClick = (planetId: ID) => {
    console.log("delete id", planetId);
    setLocalSpaceShipId(planetId);
    dispatch(openModal());
  };

  return (
    <PlanetListView
      error={error}
      eventHandlers={{ handleDeleteButtonClick }}
      isLoading={isLoading}
      planets={data}
    />
  );
};
