import React from "react";
import { Planet } from "../../domain/types";
import {Link} from "react-router-dom";
//
interface Props {
  planets: Array<Planet>;
}
export const PlanetListView = ({ planets }: Props) => (
  <article id={"planets-article"}>
    <h1>Planets</h1>
    <ol className="list-group">
      {planets.map((planet) => (
        <li className="list-group-item" key={planet.name}>
          <Link to={`/planet/edit/${planet.id}`}>{planet.name}</Link>
        </li>
      ))}
    </ol>

    <button
      type="button"
      className="btn btn-primary"
    >
      <Link to={"/planet/create"}>{"Add a planet"}</Link>
    </button>
  </article>
);
