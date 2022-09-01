import React, { useEffect, useState } from "react";
import { NoData } from "@vismaux/react-nc4";
//
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { ID } from "../../domain/types";
import { hasValue } from "../../common/utils";
import {
  closeModal,
  configureModal,
  ModalTypes,
  openModal,
} from "../modal/modalSlice";
//
import { deletePlanet, selectPlanets } from "./planetSlice";
import { PlanetListView } from "./PlanetListView";

export const PlanetListContainer = () => {
  const dispatch = useAppDispatch();
  const planets = useAppSelector(selectPlanets);
  const [localPlanetId, setLocalPlanetId] = useState("");

  useEffect(() => {
    dispatch(
      configureModal({
        handleCloseEvent: () => {
          dispatch(closeModal());
        },
        handleConfirmEvent: () => {
          dispatch(deletePlanet(localPlanetId));
          dispatch(closeModal());
        },
        title: "Are you sure?",
        modalType: ModalTypes.CONFIRM,
      })
    );
  }, [dispatch, localPlanetId]);

  /**
   * When the user clicks on the trashcan icon and has not confirmed deletion yet
   */
  const handleDeleteButtonClick = (planetId: ID) => {
    console.log("delete id", planetId);
    setLocalPlanetId(planetId);
    dispatch(openModal());
  };

  return hasValue(planets.length) ? (
    <PlanetListView events={{ handleDeleteButtonClick }} planets={planets} />
  ) : (
    <NoData title={"No data"} description={"There are no planets"} />
  );
};
