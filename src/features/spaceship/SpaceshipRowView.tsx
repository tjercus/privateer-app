import React from "react";
import { Link } from "react-router-dom";
import { TableRow } from "@vismaux/react-nc4";
import {join} from "ramda";
//
import { ID } from "../../domain/general";
import { Spaceship } from "../../domain/types";

interface Props {
  events: {
    handleDeleteButtonClick: (spaceshipId: ID) => void;
  };
  isLoading: boolean;
  spaceship: Spaceship;
}

export const SpaceshipRowView = ({ events, isLoading, spaceship }: Props) =>
  isLoading ? (
    <TableRow>
      <td>{"Loading ..."}</td>
    </TableRow>
  ) : (
    <TableRow key={spaceship.name}>
      <td>
        <Link
          data-test={"link-spaceship"}
          to={`/spaceship/edit/${spaceship.id}`}
        >
          {spaceship.name}
        </Link>
      </td>
      <td>{spaceship.landedOnPlanet?.name}</td>
      <td>{spaceship.type}</td>
      <td>{spaceship.armour}</td>
      <td>{join(", ", spaceship.weapons)}</td>
      <td>
        <Link to={`/spaceship/move/${spaceship.id}`}>
          <button
            type="button"
            className="btn btn-primary"
            data-test={"btn-move-spaceship"}
          >
            <span className="vismaicon vismaicon-move-up-circle vismaicon-sm mr-8"></span>
            {"Move the spaceship"}
          </button>
        </Link>
        <button
          className={"btn"}
          data-test={"btn-delete-spaceship"}
          onClick={() => events.handleDeleteButtonClick(spaceship.id)}
        >
          <span className="vismaicon vismaicon-delete vismaicon-sm mr-8"></span>
          {"Retire the spaceship"}
        </button>
      </td>
    </TableRow>
  );
