import { v4 as uuidv4 } from "uuid";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { find, findIndex, without } from "ramda";
//
import { RootState } from "../../app/store";
import { ID } from "../../domain/types";
import { byId } from "../../common/utils";
//
import { createHardware } from "./hardwareUtils";
import { Hardware, HardwareType } from "./hardwareTypes";

export interface HardwareState {
  hardwares: Array<Hardware>;
}

/**
 * This slice has offline and hardcoded data
 */
const initialState: HardwareState = {
  hardwares: [
    {
      cost: 114.95,
      id: "5678dcba-6884-411d-88f1-94d3fd4deed6",
      name: "Bosch H-j456",
      type: HardwareType.DRILLS,
    },
    {
      cost: 78,
      id: "1234abcd-bdb8-4e48-abda-5d862199184a",
      name: "Asus Intel i7 Motherboard",
      type: HardwareType.ELECTRONICS,
    },
  ],
};

/*
 * Redux Toolkit's createSlice utility will auto-generate action creators and
 *  action types based on the reducer functions you provide,
 *  with the same Immer-powered update capabilities inside.
 */
const hardwareSlice = createSlice({
  name: "hardware",
  initialState,
  reducers: {
    deleteHardware: (state, action: PayloadAction<ID>) => {
      const foundHardware =
        find(byId(action.payload), state.hardwares) || createHardware();
      state.hardwares = without([foundHardware], state.hardwares);
    },
    saveHardware: (state, action: PayloadAction<Hardware>) => {
      console.log("action", action);
      // update versus insert logic
      const saveableHardware = action.payload;
      const foundHardwarePosition: number = findIndex(
        byId(saveableHardware.id),
        state.hardwares
      );
      console.log("found hardware position", foundHardwarePosition);
      if (foundHardwarePosition === -1) {
        // add new hardware to array with hardwares
        // Immer allows you to write mutable-as-immutable updates
        state.hardwares.push({ ...action.payload, id: uuidv4() });
      } else {
        // replace value in array mutable-as-immutable
        state.hardwares[foundHardwarePosition] = saveableHardware;
      }
    },
  },
});

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.counter.value)`
export const selectHardwares = (state: RootState) =>
  state.hardware.hardwares || [];

export const { deleteHardware, saveHardware } = hardwareSlice.actions;
export default hardwareSlice.reducer;
