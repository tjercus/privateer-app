import React from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Alert } from "@vismaux/react-nc4";
//
import {
  ReactChangeEvent,
  SomeErrorType,
  ValidationIssues,
} from "../../domain/general";
import { hasIssues, hasValue } from "../../common/utils";
import ValidationIssuesList from "../../common/components/ValidationIssuesList";
import Conditional from "../../common/components/Conditional";
//
import { initialFormData } from "./planetUtils";
import { PlanetFormDataMap } from "./planetTypes";

interface Props {
  error: SomeErrorType;
  handleInputChange: (evt: ReactChangeEvent) => void;
  handleSaveForm: (formDataMap: PlanetFormDataMap) => void;
  formDataMap?: PlanetFormDataMap;
  validationIssues: ValidationIssues;
}

export const PlanetFormView = ({
  error = {},
  handleInputChange = () => {
    /* default fn body */
  },
  handleSaveForm = () => {
    /* default fn body */
  },
  formDataMap = initialFormData,
  validationIssues = [],
}: Props) => {
  const { t } = useTranslation();

  const handleSaveButtonClick = (evt: React.MouseEvent<HTMLButtonElement>) => {
    evt.preventDefault();
    handleSaveForm(formDataMap);
  };

  return (
    <>
      <Conditional condition={hasValue(error)}>
        <Alert type="danger">{t("planet.form.error")}</Alert>
      </Conditional>

      <form className="form-horizontal" data-test={"form-planet"}>
        <h2>{"Planet Form View"}</h2>

        <ValidationIssuesList validationIssues={validationIssues} />

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
              data-test={"textfield-planet-name"}
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
          className={`form-group required ${
            hasIssues(validationIssues, "name") ? "has-error" : "has-no-error"
          }`}
        >
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
              value={formDataMap.get("coordinateLat")}
            />
            <input
              className="form-control"
              data-test={"textfield-planet-coordinate-long"}
              id="input-coordinate-long"
              name={"coordinateLong"}
              onChange={handleInputChange}
              placeholder="longitude"
              type="number"
              value={formDataMap.get("coordinateLong")}
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
    </>
  );
};
