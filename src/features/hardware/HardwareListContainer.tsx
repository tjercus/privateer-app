import React, { useEffect, useState } from "react";
import { NoData } from "@vismaux/react-nc4";
//
import { useAppDispatch, useAppSelector } from "../../hooks";
import { ID } from "../../domain/types";
import { hasValue } from "../../common/utils";
import {
  closeModal,
  configureModal,
  ModalTypes,
  openModal,
} from "../modal/modalSlice";
//
import { deleteHardware, selectHardwares } from "./hardwareSlice";
import { HardwareListView } from "./HardwareListView";

export const HardwareListContainer = () => {
  const dispatch = useAppDispatch();
  const hardwares = useAppSelector(selectHardwares);
  const [localHardwareId, setLocalHardwareId] = useState("");

  useEffect(() => {
    dispatch(
      configureModal({
        handleCloseEvent: () => {
          dispatch(closeModal());
        },
        handleConfirmEvent: () => {
          dispatch(deleteHardware(localHardwareId));
          dispatch(closeModal());
        },
        title: "Are you sure?",
        modalType: ModalTypes.CONFIRM,
      })
    );
  }, [dispatch, localHardwareId]);

  /**
   * When the user clicks on the trashcan icon and has not confirmed deletion yet
   */
  const handleDeleteButtonClick = (hardwareId: ID) => {
    console.log("delete id", hardwareId);
    setLocalHardwareId(hardwareId);
    dispatch(openModal());
  };

  return hasValue(hardwares.length) ? (
    <HardwareListView
      eventHandlers={{ handleDeleteButtonClick }}
      hardwares={hardwares}
    />
  ) : (
    <NoData title={"No data"} description={"There are no hardwares"} />
  );
};
