import React, { useState } from "react";
import { Link } from "react-router-dom";
import { equals } from "ramda";
//
import { hasValue } from "../../common/utils";
import { Coordinates, Planet } from "../../domain/types";
//
import { createPlanet } from "./planetUtils";

interface Props {
  handleSaveForm: (planet: Planet) => void;
  planet?: Planet;
}

export const PlanetFormView = ({
  handleSaveForm = () => {
    /* empty fn body */
  },
  planet = createPlanet(),
}: Props) => {
  const [localPlanet, setLocalPlanet] = useState(createPlanet());

  if (hasValue(planet.id) && !equals(planet.id, localPlanet.id)) {
    // copy the existing planet from props to state
    setLocalPlanet(planet);
  }

  const handleInputChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
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
            long: localPlanet.coordinates.long,
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
    handleSaveForm(localPlanet);
  };

  return (
    <form className="form-horizontal" data-test={"form-planet"}>
      <h2>{"Planet Form View"}</h2>
      <div className="form-group">
        <label className="col-sm-3 control-label" htmlFor="input-name">
          {"Name"}
        </label>
        <div className="col-sm-9">
          <input
            className="form-control"
            data-test={"textfield-planet-name"}
            id="input-name"
            name={"name"}
            onChange={handleInputChange}
            placeholder="Name"
            type="text"
            value={localPlanet.name}
          />
        </div>
      </div>

      <div className="form-group">
        <label
          className="col-sm-3 control-label"
          htmlFor="input-coordinate-lat"
        >
          {"Coordinates"}
        </label>
        <div className="col-sm-9">
          <input
            className="form-control"
            data-test={"textfield-planet-coordinate-lat"}
            id="input-coordinate-lat"
            name={"coordinateLat"}
            onChange={handleInputChange}
            placeholder="latitude"
            type="number"
            value={localPlanet.coordinates.lat}
          />
          <input
            className="form-control"
            data-test={"textfield-planet-coordinate-long"}
            id="input-coordinate-long"
            name={"coordinateLong"}
            onChange={handleInputChange}
            placeholder="longitude"
            type="number"
            value={localPlanet.coordinates.long}
          />
        </div>
      </div>

      <div className="form-group">
        <div className="col-md-9 offset-md-3">
          <button
            className="btn btn-primary"
            data-test={"btn-save-planet"}
            onClick={handleSaveButtonClick}
            type="submit"
          >
            {"Save"}
          </button>
          <Link to={"/planet"}>
            <button
              className={"btn btn-secondary"}
              data-test={"btn-save-planet-cancel"}
            >
              {"Cancel"}
            </button>
          </Link>
        </div>
      </div>
    </form>
  );
};
