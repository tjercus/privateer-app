import React from "react";
import { Link } from "react-router-dom";
import { includes } from "ramda";
import { SafeParseReturnType } from "zod/lib/types";
//
import { createValidationResult } from "../../common/utils";
import ValidationErrorsList from "../../common/components/ValidationErrorsList";
import {
  createObjectsOptionList,
  createStringsOptionList,
} from "../../common/components/OptionLists";
import { Planet, Spaceship, SpaceshipType, Weapon } from "../../domain/types";
import {FormDataMap} from "../../domain/general";
//
import { initialFormData } from "./spaceshipUtils";

interface Props {
  handleInputChange: (
    evt:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLSelectElement>
  ) => void;
  handleSaveForm: (formData: FormDataMap<Spaceship>) => void;
  planets: Array<Planet>;
  formDataMap?: FormDataMap<Spaceship>;
  validationResult: SafeParseReturnType<any, any>; // TODO replace any
}

export const SpaceshipFormView = ({
  handleInputChange = () => {
    /* empty fn body */
  },
  handleSaveForm = () => {
    /* empty fn body */
  },
  planets = [],
  formDataMap = initialFormData,
  validationResult = createValidationResult(),
}: Props) => {
  const handleSaveButtonClick = (evt: React.MouseEvent<HTMLButtonElement>) => {
    evt.preventDefault();
    window?.scrollTo(0, 0);
    handleSaveForm(formDataMap);
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
            value={formDataMap.get("name")}
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
            value={formDataMap.get("landedOnId")}
          >
            <option value={""}>{""}</option>
            {createObjectsOptionList(planets)}
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
            value={formDataMap.get("armour")}
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
            value={formDataMap.get("type")}
          >
            {createStringsOptionList<SpaceshipType>(
              Object.values(SpaceshipType)
            )}
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
                  checked={includes(weapon, formDataMap.get("weapons") ?? [])}
                  id={`checkbox-${weapon}`}
                  name={`${weapon}`}
                  onChange={handleInputChange}
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
