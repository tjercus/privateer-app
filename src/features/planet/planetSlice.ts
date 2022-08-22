import { v4 as uuidv4 } from "uuid";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {RootState} from "../../app/store";
import {ID, Planet} from "../../domain/types";
import {find, findIndex, without} from "ramda";
import {byId, createPlanet} from "../../common/utils";

export interface PlanetState {
  planets: Array<Planet>;
}

const initialState: PlanetState = {
  planets: [{
    coordinates: {lat: 12.4, long: -18.9}, id: "abc-123-def", name: "Kamino",
  }, {
    coordinates: {lat: -22.18, long: 111.2}, id: "ghi-456-klm", name: "Tatooine",
  },],
};

const planetSlice = createSlice({
  name: "planet", initialState, reducers: {
    deletePlanet: (state, action: PayloadAction<ID>) => {
      const foundPlanet = find(byId(action.payload), state.planets) || createPlanet();
      state.planets = without([foundPlanet], state.planets);
    }, savePlanet: (state, action: PayloadAction<Planet>) => {
      console.log("action", action);
      // update versus insert logic
      const saveablePlanet = action.payload;
      const foundPlanetPosition: number = findIndex(byId(saveablePlanet.id), state.planets)
      if (foundPlanetPosition === -1) {
        // add new planet to array with planets
        const newPlanet = {...action.payload, id: uuidv4()}
        state.planets = [...state.planets, newPlanet];
      } else {
        // replace value in array
        const savedPlanetsClone = [...state.planets];
        savedPlanetsClone[foundPlanetPosition] = saveablePlanet;
        state.planets = savedPlanetsClone;
      }
    },
  },
});

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.counter.value)`
export const selectPlanets = (state: RootState) => state.planet.planets || [];

export const {deletePlanet, savePlanet} = planetSlice.actions;
export default planetSlice.reducer;