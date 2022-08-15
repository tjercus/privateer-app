import React from "react";
import { useAppSelector } from "../../app/hooks";
import { selectPlanets } from "./planetSlice";
//
export const PlanetListView = () => {
  const planets = useAppSelector(selectPlanets);
  //const dispatch = useAppDispatch();

  return (
    <article id={"planets-article"}>
      <h1>Planets</h1>
      <ol className="list-group">
        {planets.map((planet) => (
          <li className="list-group-item" key={planet.name}>
            {planet.name}
          </li>
        ))}
      </ol>
      <button
        type="button"
        className="btn"
        onClick={() => {
          console.log("button click");
        }}
      >
        Add Random
      </button>
    </article>
  );
};
