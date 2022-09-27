import React from "react";
import { Link } from "react-router-dom";
import { includes } from "ramda";
//
import ValidationErrorsList from "../../common/components/ValidationIssuesList";
import {
  createObjectsOptionList,
  createStringsOptionList,
} from "../../common/components/OptionLists";
import { Planet, Spaceship, SpaceshipType, Weapon } from "../../domain/types";
import { FormDataMap, ReactChangeEvent } from "../../domain/general";
//
import { initialFormData } from "./spaceshipUtils";
import { hasIssues, hasValue } from "../../common/utils";
import { Alert } from "@vismaux/react-nc4";
import Conditional from "../../common/components/Conditional";
import { useTranslation } from "react-i18next";

interface Props {
  error: SomeErrorType;
  handleInputChange: (evt: ReactChangeEvent) => void;
  handleSaveForm: (formData: FormDataMap<Spaceship>) => void;
  planets: Array<Planet>;
  formDataMap?: FormDataMap<Spaceship>;
  validationIssues: [];
}

export const SpaceshipFormView = ({
  error = {},
  handleInputChange = () => {
    /* default fn body */
  },
  handleSaveForm = () => {
    /* default fn body */
  },
  planets = [],
  formDataMap = initialFormData,
  validationIssues = [],
}: Props) => {
  const { t } = useTranslation();

  const handleSaveButtonClick = (evt: React.MouseEvent<HTMLButtonElement>) => {
    evt.preventDefault();
    window?.scrollTo(0, 0);
    handleSaveForm(formDataMap);
  };

  return (
    <>
      <Conditional condition={hasValue(error)}>
        <Alert type="danger">{t("spaceship.form.error")}</Alert>
      </Conditional>

      <form className="form-horizontal" data-test={"form-spaceship"}>
        <h2>{"Spaceship Form View"}</h2>

        <ValidationErrorsList validationIssues={validationIssues} />

        <div
          className={`form-group required ${
            hasIssues(validationIssues, "name") ? "has-error" : "has-no-error"
          }`}
        >
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

        <div
          className={`form-group ${
            hasIssues(validationIssues, "landedOnId")
              ? "has-error"
              : "has-no-error"
          }`}
        >
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

        <div
          className={`form-group required ${
            hasIssues(validationIssues, "armour") ? "has-error" : "has-no-error"
          }`}
        >
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

        <div
          className={`form-group required ${
            hasIssues(validationIssues, "type") ? "has-error" : "has-no-error"
          }`}
        >
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

        <div
          className={`form-group required ${
            hasIssues(validationIssues, "weapons")
              ? "has-error"
              : "has-no-error"
          }`}
        >
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
    </>
  );
};
