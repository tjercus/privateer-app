import React from "react";
import { useNavigate } from "react-router-dom";
import { find } from "ramda";
//
import { byId } from "../../common/utils";
import { ID } from "../../domain/types";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
//
import { HardwareFormView } from "./HardwareFormView";
import { saveHardware, selectHardwares } from "./hardwareSlice";
import { Hardware, HardwareSchema } from "./hardwareTypes";

interface Props {
  hardwareId?: ID;
}

/**
 * Is used for both edit and create
 * @param {ID} hardwareId - use when loading a saved Hardware
 */
export const HardwareFormContainer = ({ hardwareId }: Props) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  //
  const hardwares = useAppSelector(selectHardwares);
  const hardware = find(byId(hardwareId), hardwares) || ({} as Hardware);

  console.log("found hardware", hardware);

  const handleSaveForm = (localHardware: Hardware) => {
    const validationResult = HardwareSchema.safeParse(localHardware);
    if (validationResult.success) {
      dispatch(saveHardware(localHardware));
      navigate("/hardware");
    } else {
      // TODO either inline feedback or use The Modal
      alert(`Bad data! ${validationResult.error}`);
    }
  };

  return (
    <HardwareFormView handleSaveForm={handleSaveForm} hardware={hardware} />
  );
};
