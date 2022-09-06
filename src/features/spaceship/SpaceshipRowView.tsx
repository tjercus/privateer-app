import React from "react";
import { Link } from "react-router-dom";
import { Icon, TableRow } from "@vismaux/react-nc4";
import { ID, Spaceship } from "../../domain/types";

interface Props {
  events: { handleDeleteButtonClick: (spaceshipId: ID) => void };
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
      <td>{spaceship.weapons.toString()}</td>
      <td>
        <button
          data-test={"btn-delete-spaceship"}
          onClick={() => events.handleDeleteButtonClick(spaceship.id)}
        >
          <Icon name="vismaicon vismaicon-trash" size="lg" /> {"Delete"}
        </button>
      </td>
    </TableRow>
  );
