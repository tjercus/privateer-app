import React, { useState } from "react";
import { savePlanet } from "./planetSlice";
import { useAppDispatch } from "../../app/hooks";
import { createPlanet } from "../../app/utils";
import {Coordinates, Planet} from "../../domain/types";

export const PlanetFormView = (planet: Planet) => {
  const dispatch = useAppDispatch();
  const [localPlanet, setLocalPlanet] = useState(createPlanet());

  // TODO make fn or import Ramda fn
  if (planet.id.length > 0 && planet.id !== localPlanet.id) {
    // copy the existing planet from props to state
    setLocalPlanet(planet);
  }

  const handleChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
    const htmlFieldName = evt.target.name;
    switch (htmlFieldName) {
      case "name":
        setLocalPlanet({ ...localPlanet, name: evt.target.value });
        break;
      case "coordinateLat":
        setLocalPlanet({
          ...localPlanet,
          coordinates: {
            lat: Number(evt.target.value),
            long: localPlanet.coordinates.long
            } as Coordinates,
        });
        break;
      case "coordinateLong":
        setLocalPlanet({
          ...localPlanet,
          coordinates: {
            lat: localPlanet.coordinates.lat,
            long: Number(evt.target.value),
          } as Coordinates,
        });
        break;
      default:
        console.log("invalid field name used for change");
        break;
    }
  };

  const handleSaveButtonClick = (evt: React.MouseEvent<HTMLButtonElement>) => {
    evt.preventDefault();
    dispatch(savePlanet(localPlanet));
  };

  return (
    <form className="form-horizontal">
      <h2>Planet Form View</h2>
      <div className="form-group">
        <label className="col-sm-3 control-label" htmlFor="inputName">
          Name
        </label>
        <div className="col-sm-9">
          <input
            className="form-control"
            id="inputName"
            name={"name"}
            onChange={handleChange}
            placeholder="Name"
            type="text"
            value={localPlanet.name}
          />
        </div>
      </div>

      <div className="form-group">
        <label
          className="col-sm-3 control-label"
          htmlFor="coordinates"
        >
          Coordinates
        </label>
        <div className="col-sm-9">
          <input
            className="form-control"
            id="inputCoordinateLat"
            name={"coordinateLat"}
            onChange={handleChange}
            placeholder="latitude"
            type="number"
            value={localPlanet.coordinates.lat}
          />
        </div>
        <div className="col-sm-9">
          <input
            className="form-control"
            id="inputCoordinateLong"
            name={"coordinateLong"}
            onChange={handleChange}
            placeholder="longitude"
            type="number"
            value={localPlanet.coordinates.long}
          />
        </div>
      </div>

      <div className="form-group">
        <div className="col-md-9 offset-md-3">
          <button className="btn" onClick={handleSaveButtonClick} type="submit">
            Save
          </button>
        </div>
      </div>
    </form>
  );
};
