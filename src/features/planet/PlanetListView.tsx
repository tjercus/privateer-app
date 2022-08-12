import React from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { addPlanet, Planet, selectPlanets } from "./planetSlice";
//
export const PlanetListView = () => {
  const planets = useAppSelector(selectPlanets) as Array<Planet>;
  const dispatch = useAppDispatch();

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
          dispatch(addPlanet({ name: "yo", coordinates: [1, 2] }));
        }}
      >
        Add Random
      </button>
    </article>
  );
};
