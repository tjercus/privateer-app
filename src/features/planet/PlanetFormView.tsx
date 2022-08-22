import React, {useState} from "react";
import {savePlanet} from "./planetSlice";
import {useAppDispatch} from "../../app/hooks";
import {createPlanet, hasValue} from "../../common/utils";
import {Coordinates, Planet, PlanetSchema} from "../../domain/types";
import {Link, useNavigate} from "react-router-dom";
import {equals} from "ramda";

export const PlanetFormView = (planet: Planet) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [localPlanet, setLocalPlanet] = useState(createPlanet());

  if (hasValue(planet.id) && !equals(planet.id, localPlanet.id)) {
    // copy the existing planet from props to state
    setLocalPlanet(planet);
  }

  const handleChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
    const htmlFieldName = evt.target.name;
    switch (htmlFieldName) {
      case "name":
        setLocalPlanet({...localPlanet, name: evt.target.value});
        break;
      case "coordinateLat":
        setLocalPlanet({
          ...localPlanet, coordinates: {
            lat: Number(evt.target.value), long: localPlanet.coordinates.long,
          } as Coordinates,
        });
        break;
      case "coordinateLong":
        setLocalPlanet({
          ...localPlanet, coordinates: {
            lat: localPlanet.coordinates.lat, long: Number(evt.target.value),
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
    const validationResult = PlanetSchema.safeParse(localPlanet);
    if (validationResult.success) {
      dispatch(savePlanet(localPlanet));
      navigate("/planet");
    } else {
      alert(`Fuck you buddy! ${validationResult.error}`);
    }
  };

  return (<form className="form-horizontal">
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
        <label className="col-sm-3 control-label" htmlFor="coordinates">
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
          <button
            className="btn btn-primary"
            onClick={handleSaveButtonClick}
            type="submit"
          >
            {"Save"}
          </button>
          <button className={"btn btn-secondary"}>
            <Link to={"/planet"}>{"Cancel"}</Link>
          </button>
        </div>
      </div>
    </form>);
};
