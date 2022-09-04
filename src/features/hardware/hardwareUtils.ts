import { Hardware, HardwareType } from "./hardwareTypes";
//
import { hasValue } from "../../common/utils";

export const createHardware = (hardware: Hardware = {} as Hardware) => {
  const newHardware: Hardware = {
    cost: 0,
    id: "",
    name: "",
    type: HardwareType.NONE,
  };
  if (hasValue(hardware.cost)) {
    newHardware.cost = hardware.cost;
  }
  if (hasValue(hardware.id)) {
    newHardware.id = hardware.id;
  }
  if (hasValue(hardware.name)) {
    newHardware.name = hardware.name;
  }
  if (hasValue(hardware.type)) {
    newHardware.type = hardware.type;
  }
  return newHardware;
};
