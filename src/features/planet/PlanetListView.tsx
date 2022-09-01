import React from "react";
import { ID, Planet } from "../../domain/types";
import { Link } from "react-router-dom";
import { Icon, Table, TableRow } from "@vismaux/react-nc4";

interface Props {
  events: { handleDeleteButtonClick: (planetId: ID) => void };
  planets: Array<Planet>;
}

export const PlanetListView = ({ events, planets }: Props) => (
  <article>
    <h1>Planets</h1>
    <Table data-test={"table-list-planet"}>
      <thead>
        <tr>
          <th>{"Name"}</th>
          <th>{"Coordinates"}</th>
          <th>{"Actions"}</th>
        </tr>
      </thead>
      <tbody>
        {planets.map((planet) => (
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
                data-test={"btn-delete-planet"}
                onClick={() => events.handleDeleteButtonClick(planet.id)}
              >
                <Icon name="trash" size="lg" />
              </button>
            </td>
          </TableRow>
        ))}
      </tbody>
    </Table>

    <Link to={"/planet/create"}>
      <button
        type="button"
        className="btn btn-primary"
        data-test={"btn-add-planet"}
      >
        {"Add a planet"}
      </button>
    </Link>
  </article>
);
