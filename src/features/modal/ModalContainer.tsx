import React from "react";
import { Modal } from "@vismaux/react-nc4";
//
import { useAppSelector } from "../../hooks";
//
import { ModalTypes, selectModalState } from "./modalSlice";
import { ConfirmView } from "./ConfirmView";

const ModalContainer = () => {
  const modalState = useAppSelector(selectModalState);

  return modalState.isOpen ? (
    <Modal
      bodyContent={
        modalState.modalConfig.modalType === ModalTypes.CONFIRM ? (
          <ConfirmView
            handleCloseEvent={modalState.modalConfig.handleCloseEvent}
            handleConfirmEvent={modalState.modalConfig.handleConfirmEvent}
          />
        ) : null
      }
      modalSize={"modal-sm"}
      onModalClose={modalState.modalConfig.handleCloseEvent}
      title={modalState.modalConfig.title}
    />
  ) : null;
};

export default ModalContainer;
