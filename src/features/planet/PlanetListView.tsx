import React from "react";
import { ID, Planet } from "../../domain/types";
import { Link } from "react-router-dom";
import { Icon } from "@vismaux/react-nc4";

//
interface Props {
  actions: { handleDeleteButtonClick: (planetId: ID) => void };
  planets: Array<Planet>;
}

export const PlanetListView = ({ actions, planets }: Props) => (
  <article id={"planets-article"}>
    <h1>Planets</h1>
    <ol className="list-group">
      {planets.map((planet) => (
        <li className="list-group-item" key={planet.name}>
          <Link to={`/planet/edit/${planet.id}`}>{planet.name}</Link>
          <button onClick={() => actions.handleDeleteButtonClick(planet.id)}>
            <Icon name="trash" size="lg" />
          </button>
        </li>
      ))}
    </ol>

    <p>And ...</p>

    <button type="button" className="btn btn-primary">
      <Link to={"/planet/create"}>{"Add a planet"}</Link>
    </button>
  </article>
);
