import React from "react";
import { Link } from "react-router-dom";
import { SafeParseReturnType } from "zod/lib/types";
//
import { ReactChangeEvent } from "../../domain/general";
import {createValidationResult, hasValue} from "../../common/utils";
import ValidationErrorsList from "../../common/components/ValidationErrorsList";
//
import { initialFormData } from "./planetUtils";
import { PlanetFormDataMap } from "./planetTypes";
import {FetchBaseQueryError} from "@reduxjs/toolkit/query";
import {SerializedError} from "@reduxjs/toolkit";
import {Alert} from "@vismaux/react-nc4";
import Conditional from "../../common/components/Conditional";

interface Props {
  error: FetchBaseQueryError | SerializedError | undefined; // TODO extract type
  handleInputChange: (evt: ReactChangeEvent) => void;
  handleSaveForm: (formDataMap: PlanetFormDataMap) => void;
  formDataMap?: PlanetFormDataMap;
  validationResult: SafeParseReturnType<any, any>; // TODO replace any
}

export const PlanetFormView = ({
  error,
  handleInputChange = () => {
    /* empty fn body */
  },
  handleSaveForm = () => {
    /* empty fn body */
  },
  formDataMap = initialFormData,
  validationResult = createValidationResult(),
}: Props) => {
  const handleSaveButtonClick = (evt: React.MouseEvent<HTMLButtonElement>) => {
    evt.preventDefault();
    handleSaveForm(formDataMap);
  };

  return (
    <>
    <Conditional condition={hasValue(error)}>
      <Alert type="danger">{"There was an error mutating the planet"}</Alert>
    </Conditional>

    <form className="form-horizontal" data-test={"form-planet"}>
      <h2>{"Planet Form View"}</h2>

      <ValidationErrorsList validationResult={validationResult} />

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
            value={formDataMap.get("name")}
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
