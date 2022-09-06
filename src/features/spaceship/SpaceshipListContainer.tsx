import * as React from "react";
import { useEffect, useState } from "react";
import { find } from "ramda";
//
import { useAppDispatch } from "../../hooks";
import { ID, Planet, Spaceship } from "../../domain/types";
//
import {
  useDeleteSpaceshipMutation,
  useGetPlanetsQuery,
  useGetSpaceshipsQuery,
} from "../../common/apiSlice";
import {
  closeModal,
  configureModal,
  ModalTypes,
  openModal,
} from "../modal/modalSlice";
//
import { SpaceshipListView } from "./SpaceshipListView";
import { byId } from "../../common/utils";

const findPlanetForSpaceship = (spaceship: Spaceship, planets: Array<Planet>) =>
  find(byId(spaceship.landedOnId), planets);

export const SpaceshipListContainer = () => {
  const dispatch = useAppDispatch();
  const getPlanetsQuery = useGetPlanetsQuery();
  // note that the result from the query is modified with the result of another
  const getSpaceshipsQuery = useGetSpaceshipsQuery(undefined, {
    selectFromResult: ({ data = [], error, isLoading }) => ({
      data: data.map((spaceship) => ({
        ...spaceship,
        landedOnPlanet: findPlanetForSpaceship(
          spaceship,
          getPlanetsQuery.data ?? []
        ),
      })),
      error,
      isLoading,
    }),
  });

  const [localSpaceshipId, setLocalSpaceShipId] = useState("");
  const [deleteSpaceship] = useDeleteSpaceshipMutation();

  useEffect(() => {
    dispatch(
      configureModal({
        handleCloseEvent: () => {
          dispatch(closeModal());
        },
        handleConfirmEvent: () => {
          deleteSpaceship(localSpaceshipId);
          dispatch(closeModal());
        },
        title: "Are you sure?",
        modalType: ModalTypes.CONFIRM,
      })
    );
  }, [deleteSpaceship, dispatch, localSpaceshipId]);

  /**
   * When the user clicks on the trashcan icon and has not confirmed deletion yet
   */
  const handleDeleteButtonClick = (spaceshipId: ID) => {
    console.log("delete id", spaceshipId);
    setLocalSpaceShipId(spaceshipId);
    dispatch(openModal());
  };

  return (
    <SpaceshipListView
      error={getSpaceshipsQuery.error}
      eventHandlers={{ handleDeleteButtonClick }}
      isLoading={getSpaceshipsQuery.isLoading}
      spaceships={getSpaceshipsQuery.data}
    />
  );
};
