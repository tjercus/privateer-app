import React, { useState } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { deletePlanet, selectPlanets } from "./planetSlice";
import { PlanetListView } from "./PlanetListView";
import { ID } from "../../domain/types";
import { Modal, NoData } from "@vismaux/react-nc4";
import { hasValue } from "../../common/utils";

interface Props {
  actions: { handleCloseButtonClick: () => void };
  planetId: ID;
}

// inline component
const ModalView = ({ actions, planetId }: Props) => {
  const dispatch = useAppDispatch();

  /**
   * When the user is sure he wants to delete
   */
  const handleDeleteClick = () => {
    dispatch(deletePlanet(planetId));
    actions.handleCloseButtonClick();
  };
  return (
    <div>
      <button className={"btn btn-primary"} onClick={() => handleDeleteClick()}>
        {"delete"}
      </button>
      <button
        className={"btn btn-warning"}
        onClick={actions.handleCloseButtonClick}
      >
        {"cancel"}
      </button>
    </div>
  );
};

export const PlanetListContainer = () => {
  const planets = useAppSelector(selectPlanets);
  const [showConfirmDeleteModal, setShowConfirmDeleteModal] = useState(false);
  const [localPlanetId, setLocalPlanetId] = useState("");

  /**
   * When the user clicks on the trashcan icon and has not confirmed deletion yet
   */
  const handleDeleteButtonClick = (planetId: ID) => {
    console.log("delete id", planetId);
    setLocalPlanetId(planetId);
    setShowConfirmDeleteModal(true);
  };

  const handleCloseModalEvent = () => {
    setShowConfirmDeleteModal(false);
  };

  const showPlanetListView = () =>
    hasValue(planets.length) ? (
      <PlanetListView actions={{ handleDeleteButtonClick }} planets={planets} />
    ) : (
      <NoData title={"No data"} description={"There are no planets"} />
    );

  return showConfirmDeleteModal ? (
    <Modal
      bodyContent={
        <ModalView
          actions={{ handleCloseButtonClick: handleCloseModalEvent }}
          planetId={localPlanetId}
        />
      }
      onModalClose={handleCloseModalEvent}
      modalSize={"modal-sm"}
      title={"Delete planet?"}
    />
  ) : (
    showPlanetListView()
  );
};
