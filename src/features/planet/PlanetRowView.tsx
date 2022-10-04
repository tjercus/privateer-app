import React from "react";
import { Link } from "react-router-dom";
import { TableRow } from "@vismaux/react-nc4";
import { Planet } from "../../domain/types";
import { ID } from "../../domain/general";

interface Props {
  events: { handleDeleteButtonClick: (planetId: ID) => void };
  isLoading: boolean;
  planet: Planet;
}

export const PlanetRowView = ({ events, isLoading, planet }: Props) =>
  isLoading ? (
    <TableRow>
      <td>{"Loading ..."}</td>
    </TableRow>
  ) : (
    <TableRow key={planet.name}>
      <td>
        <Link data-test={"link-planet"} to={`/planet/edit/${planet.id}`}>
          {planet.name}
        </Link>
      </td>
      <td>
        {planet.coordinates.lat} {"by"} {planet.coordinates.long}
      </td>
      <td>
        <button
          className={"btn"}
          data-test={"btn-delete-planet"}
          onClick={() => events.handleDeleteButtonClick(planet.id)}
        >
          {"Destroy the planet"}
        </button>
      </td>
    </TableRow>
  );
