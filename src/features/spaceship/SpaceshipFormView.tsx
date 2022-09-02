import React, { useEffect, useState } from "react";
import { hasValue } from "../../common/utils";
import { Spaceship } from "../../domain/types";
import { Link } from "react-router-dom";
import { equals } from "ramda";
import { createSpaceship } from "./spaceshipUtils";

interface Props {
  handleSaveForm: (spaceship: Spaceship) => void;
  spaceship?: Spaceship;
}

const SpaceshipFormView = ({
  handleSaveForm = () => {},
  spaceship = createSpaceship(),
}: Props) => {
  const [localSpaceship, setLocalSpaceship] = useState(createSpaceship());

  console.log("SpaceshipFormView local spaceship", localSpaceship);

  useEffect(() => {
    if (hasValue(spaceship.id) && !equals(spaceship.id, localSpaceship.id)) {
      // copy the existing spaceship from props to state
      console.log("SpaceshipFormView copying from props to state");
      setLocalSpaceship(spaceship);
    }
  }, [spaceship, localSpaceship]);

  const handleInputChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
    const htmlFieldName = evt.target.name;
    setLocalSpaceship({ ...localSpaceship, [htmlFieldName]: evt.target.value });
  };

  const handleSaveButtonClick = (evt: React.MouseEvent<HTMLButtonElement>) => {
    evt.preventDefault();
    handleSaveForm(localSpaceship);
  };

  console.log("SpaceshipFormView local spaceship v2", localSpaceship);

  return (
    <form className="form-horizontal" data-test={"form-spaceship"}>
      <h2>{"Spaceship Form View"}</h2>
      <div className="form-group">
        <label className="col-sm-3 control-label" htmlFor="inputName">
          {"Name"}
        </label>
        <div className="col-sm-9">
          <input
            className="form-control"
            data-test={"textfield-spaceship-name"}
            id="inputName"
            name={"name"}
            onChange={handleInputChange}
            placeholder="Name"
            type="text"
            value={localSpaceship.name}
          />
        </div>
      </div>

      <div className="form-group">
        <label className="col-sm-3 control-label" htmlFor="coordinates">
          {"Landed on"}
        </label>
        <div className="col-sm-9">
          <input
            className="form-control"
            data-test={"textfield-spaceship-landed-on"}
            id="inputLandedOn"
            name={"landedOn"}
            onChange={handleInputChange}
            placeholder="landed on"
            type="text"
            value={localSpaceship.landedOn}
          />
        </div>
      </div>

      <div className="form-group">
        <div className="col-md-9 offset-md-3">
          <button
            className="btn btn-primary"
            data-test={"btn-save-spaceship"}
            onClick={handleSaveButtonClick}
            type="submit"
          >
            {"Save"}
          </button>
          <Link to={"/spaceship"}>
            <button
              className={"btn btn-secondary"}
              data-test={"btn-save-spaceship-cancel"}
            >
              {"Cancel"}
            </button>
          </Link>
        </div>
      </div>
    </form>
  );
};

export default React.memo(SpaceshipFormView);
