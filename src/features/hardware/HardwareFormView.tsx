import React, { useState } from "react";
import { Link } from "react-router-dom";
import { equals } from "ramda";
//
import { hasValue } from "../../common/utils";
//
import { createHardware } from "./hardwareUtils";
import { Hardware, HardwareType } from "./hardwareTypes";

interface Props {
  handleSaveForm: (hardware: Hardware) => void;
  hardware: Hardware;
}

export const HardwareFormView = ({ handleSaveForm, hardware }: Props) => {
  const [localHardware, setLocalHardware] = useState(createHardware());

  if (hasValue(hardware.id) && !equals(hardware.id, localHardware.id)) {
    // copy the existing hardware from props to state
    setLocalHardware(hardware);
  }

  const handleInputChange = (
    evt:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLSelectElement>
  ) => {
    const htmlFieldName = evt.target.name;
    setLocalHardware({ ...localHardware, [htmlFieldName]: evt.target.value });
  };

  const handleSaveButtonClick = (evt: React.MouseEvent<HTMLButtonElement>) => {
    evt.preventDefault();
    handleSaveForm(localHardware);
  };

  console.log("HardwareFormView", localHardware);

  return (
    <form className="form-horizontal" data-test={"form-hardware"}>
      <h2>{"Hardware Form View"}</h2>
      <div className="form-group">
        <label className="col-sm-3 control-label" htmlFor="input-name">
          {"Name"}
        </label>
        <div className="col-sm-9">
          <input
            className="form-control"
            data-test={"textfield-hardware-name"}
            id="input-name"
            name={"name"}
            onChange={handleInputChange}
            placeholder="Name"
            type="text"
            value={localHardware.name}
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
            data-test={"select-hardware-type"}
            id="input-type"
            name={"type"}
            onChange={handleInputChange}
            value={localHardware.type}
          >
            {Object.values(HardwareType).map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="form-group">
        <label className="col-sm-3 control-label" htmlFor="input-cost">
          {"Cost"}
        </label>
        <div className="col-sm-9">
          <input
            className="form-control"
            data-test={"textfield-hardware-cost"}
            id="input-cost"
            name={"cost"}
            onChange={handleInputChange}
            placeholder="cost"
            type="number"
            value={localHardware.cost}
          />
        </div>
      </div>

      <div className="form-group">
        <div className="col-md-9 offset-md-3">
          <button
            className="btn btn-primary"
            data-test={"btn-save-hardware"}
            onClick={handleSaveButtonClick}
            type="submit"
          >
            {"Save"}
          </button>
          <Link to={"/hardware"}>
            <button
              className={"btn btn-secondary"}
              data-test={"btn-save-hardware-cancel"}
            >
              {"Cancel"}
            </button>
          </Link>
        </div>
      </div>
    </form>
  );
};
