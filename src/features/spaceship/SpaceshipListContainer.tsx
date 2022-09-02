import * as React from "react";
import { useEffect, useState } from "react";
//
import { useAppDispatch } from "../../app/hooks";
import { ID } from "../../domain/types";
//
import {
  closeModal,
  configureModal,
  ModalTypes,
  openModal,
} from "../modal/modalSlice";
//
import { SpaceshipListView } from "./SpaceshipListView";
import {
  useDeleteSpaceshipMutation,
  useGetSpaceshipsQuery,
} from "./spaceshipApi";

export const SpaceshipListContainer = () => {
  const dispatch = useAppDispatch();
  const { data, error, isLoading } = useGetSpaceshipsQuery();
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
  const handleDeleteButtonClick = (spaceShipId: ID) => {
    console.log("delete id", spaceShipId);
    setLocalSpaceShipId(spaceShipId);
    dispatch(openModal());
  };

  return (
    <SpaceshipListView
      error={error}
      events={{ handleDeleteButtonClick }}
      isLoading={isLoading}
      spaceships={data}
    />
  );
};
