import React from "react";
import {ID, Planet} from "../../domain/types";
import {Link} from "react-router-dom";
import {Icon, Table, TableRow} from "@vismaux/react-nc4";

interface Props {
  actions: { handleDeleteButtonClick: (planetId: ID) => void };
  planets: Array<Planet>;
}

export const PlanetListView = ({actions, planets}: Props) => (<article id={"planets-article"}>
  <h1>Planets</h1>
  <Table>
    <thead>
    <tr>
      <th>{"Name"}</th>
      <th>{"Actions"}</th>
    </tr>
    </thead>
    <tbody>
    {planets.map((planet) => (<TableRow key={planet.name}>
      <td><Link to={`/planet/edit/${planet.id}`}>{planet.name}</Link></td>
      <td>
        <button onClick={() => actions.handleDeleteButtonClick(planet.id)}>
          <Icon name="trash" size="lg"/>
        </button>
      </td>
    </TableRow>))}
    </tbody>
  </Table>

  <button type="button" className="btn btn-primary">
    <Link to={"/planet/create"}>{"Add a planet"}</Link>
  </button>
</article>);
