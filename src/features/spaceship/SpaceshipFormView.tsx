import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { equals, includes } from "ramda";
import { SafeParseReturnType } from "zod/lib/types";
//
import {
  createValidationResult,
  hasValue,
  updateArray,
} from "../../common/utils";
import ValidationErrorsList from "../../common/components/ValidationErrorsList";
import { Planet, Spaceship, SpaceshipType, Weapon } from "../../domain/types";
//
import { createSpaceship } from "./spaceshipUtils";

interface Props {
  handleSaveForm: (spaceship: Spaceship) => void;
  planets: Array<Planet>;
  spaceship?: Spaceship;
  validationResult: SafeParseReturnType<any, any>; // TODO replace any
}

export const SpaceshipFormView = ({
  handleSaveForm = () => {
    /* empty fn body */
  },
  planets = [],
  spaceship = createSpaceship(),
  validationResult = createValidationResult(),
}: Props) => {
  const [localSpaceship, setLocalSpaceship] = useState(createSpaceship());

  useEffect(() => {
    if (hasValue(spaceship.id) && !equals(spaceship.id, localSpaceship.id)) {
      // copy the existing spaceship from props to state
      setLocalSpaceship(spaceship);
    }
  }, [spaceship, localSpaceship]);

  /**
   * Handles changes in text and number fields
   */
  const handleInputChange = (
    evt:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLSelectElement>
  ) => {
    const htmlFieldName = evt.target.name;
    const htmlFieldType = evt.target.type;
    const value = evt.target.value;
    setLocalSpaceship({
      ...localSpaceship,
      [htmlFieldName]: htmlFieldType === "number" ? Number(value) : value,
    });
  };

  /**
   * Handles changes in checkbox groups
   */
  const handleCheckboxGroupItemChange = (
    evt: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = evt.target.value;
    const arr = localSpaceship.weapons;
    const updatedArr = updateArray<Weapon>(arr, value);
    setLocalSpaceship({
      ...localSpaceship,
      weapons: updatedArr,
    });
  };

  const handleSaveButtonClick = (evt: React.MouseEvent<HTMLButtonElement>) => {
    evt.preventDefault();
    window?.scrollTo(0, 0);
    handleSaveForm(localSpaceship);
  };

  return (
    <form className="form-horizontal" data-test={"form-spaceship"}>
      <h2>{"Spaceship Form View"}</h2>

      <ValidationErrorsList validationResult={validationResult} />

      <div className="form-group">
        <label className="col-sm-3 control-label" htmlFor="input-name">
          {"Name"}
        </label>
        <div className="col-sm-9">
          <input
            className="form-control"
            data-test={"textfield-spaceship-name"}
            id="input-name"
            name={"name"}
            onChange={handleInputChange}
            placeholder="Name"
            type="text"
            value={localSpaceship.name}
          />
        </div>
      </div>

      <div className="form-group">
        <label className="col-sm-3 control-label" htmlFor="input-landed-on">
          {"Landed on"}
        </label>
        <div className="col-sm-9">
          <select
            className="form-control"
            data-test={"select-spaceship-landed-on"}
            id="input-landed-on"
            name={"landedOnId"}
            onChange={handleInputChange}
            value={localSpaceship.landedOnId}
          >
            <option value={""}>{"None"}</option>
            {planets.map((planet) => (
              <option key={planet.id} value={planet.id}>
                {planet.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="form-group">
        <label className="col-sm-3 control-label" htmlFor="input-armour">
          {"Armour"}
        </label>
        <div className="col-sm-9">
          <input
            className="form-control"
            data-test={"textfield-spaceship-armour"}
            id="input-armour"
            name={"armour"}
            onChange={handleInputChange}
            placeholder="armour"
            type="number"
            value={localSpaceship.armour}
          />
        </div>
      </div>

      <div className="form-group">
        <label className="col-sm-3 control-label" htmlFor="input-type">
          {"Type"}
        </label>
        <div className="col-sm-9">
          <select
            className="form-control"
            data-test={"select-spaceship-type"}
            id="input-type"
            name={"type"}
            onChange={handleInputChange}
            value={localSpaceship.type}
          >
            {Object.values(SpaceshipType).map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="form-group">
        <label className="col-sm-3 control-label" htmlFor="input-weapons">
          {"Weapons"}
        </label>
        <div className="col-sm-9">
          <ul>
            {Object.values(Weapon).map((weapon) => (
              <li className="checkbox" key={weapon}>
                <input
                  checked={includes(weapon, localSpaceship.weapons)}
                  id={`checkbox-${weapon}`}
                  name={`${weapon}`}
                  onChange={handleCheckboxGroupItemChange}
                  type="checkbox"
                  value={`${weapon}`}
                />
                <label htmlFor={`checkbox-${weapon}`}>{weapon}</label>
              </li>
            ))}
          </ul>
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
