import React from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Alert } from "@vismaux/react-nc4";
//
import { createObjectsOptionList } from "../../common/components/OptionLists";
import { Planet } from "../../domain/types";
import { ID, ReactChangeEvent, SomeErrorType } from "../../domain/general";
//
import { hasValue } from "../../common/utils";
import Conditional from "../../common/components/Conditional";

const selectPlanetName = (id: ID, planets: Array<Planet>) => {
  const possiblyPlanet = planets.find((p) => p.id === id);
  // @ts-ignore // ts does not understand
  return hasValue(possiblyPlanet) ? possiblyPlanet.name : "";
};

interface Props {
  error: SomeErrorType;
  handleInputChange: (evt: ReactChangeEvent) => void;
  handleSaveForm: (landedOnId: ID) => void;
  landedOnId?: ID;
  planets: Array<Planet>;
}

export const SpaceshipMoveFormView = ({
  error = {},
  handleInputChange = () => {
    /* default fn body */
  },
  handleSaveForm = () => {
    /* default fn body */
  },
  landedOnId = "" as ID,
  planets = [],
}: Props) => {
  const { t } = useTranslation();

  const handleSaveButtonClick = (evt: React.MouseEvent<HTMLButtonElement>) => {
    evt.preventDefault();
    window?.scrollTo(0, 0);
    handleSaveForm(landedOnId);
  };

  return (
    <>
      <Conditional condition={hasValue(error)}>
        <Alert type="danger">{t("spaceship.form.error")}</Alert>
      </Conditional>

      <form className="form-horizontal" data-test={"form-spaceship"}>
        <div className={`form-group`}>
          <label className="col-sm-3 control-label" htmlFor="input-landed-on">
            {"Current location"}
          </label>
          <div className="col-sm-9">
            {selectPlanetName(landedOnId, planets)}
          </div>
        </div>

        <div className={`form-group`}>
          <label className="col-sm-3 control-label" htmlFor="input-landed-on">
            {"Move to"}
          </label>
          <div className="col-sm-9">
            <select
              className="form-control"
              data-test={"select-spaceship-landed-on"}
              id="input-landed-on"
              name={"landedOnId"}
              onChange={handleInputChange}
              value={landedOnId}
            >
              {createObjectsOptionList(planets)}
            </select>
          </div>
        </div>

        <div className="form-group">
          <div className="col-md-9 offset-md-3">
            <button
              className="btn btn-primary"
              data-test={"btn-move-spaceship"}
              onClick={handleSaveButtonClick}
              type="submit"
            >
              <span className="vismaicon vismaicon-move-up-circle vismaicon-sm mr-8"></span>
              {"Move"}
            </button>
            <Link to={"/spaceship"}>
              <button
                className={"btn btn-secondary"}
                data-test={"btn-move-spaceship-cancel"}
              >
                <span className="vismaicon vismaicon-cancel-circle vismaicon-sm mr-8"></span>
                {"Cancel"}
              </button>
            </Link>
          </div>
        </div>
      </form>
    </>
  );
};
