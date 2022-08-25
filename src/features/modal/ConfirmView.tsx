import React from "react";

interface Props {
  handleCloseEvent: () => void;
  handleConfirmEvent: () => void;
}

/**
 * Can be used as the body of a modal container
 */
export const ConfirmView = ({
  handleCloseEvent,
  handleConfirmEvent,
}: Props) => {
  /**
   * When the user is sure
   */
  // const handleConfirmClick = () => {
  //   dispatch(deletePlanet(planetId));
  //   eventHandlers.handleCloseEvent();
  // };

  return (
    <div>
      <button
        className={"btn btn-primary"}
        data-test={"btn-delete-planet"}
        onClick={handleConfirmEvent}
      >
        {"Yes"}
      </button>
      <button
        className={"btn btn-warning"}
        data-test={"btn-cancel-delete"}
        onClick={handleCloseEvent}
      >
        {"No"}
      </button>
    </div>
  );
};
