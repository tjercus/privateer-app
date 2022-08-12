import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import { RootState } from "../../app/store";

export type Planet = {
  name: string;
  coordinates: [number, number];
};

export interface PlanetState {
  planets: Array<Planet>;
}

const initialState: PlanetState = {
  planets: [
    { name: "Kamino", coordinates: [12.4, -18.9] },
    { name: "Tatooine", coordinates: [-22.18, 111.2] },
  ],
};

const planetSlice = createSlice({
  name: "planet",
  initialState,
  reducers: {
    addPlanet: (state, action: PayloadAction<Planet>) => {
      console.log("action", action)
      state.planets = [...state.planets, action.payload];
    },
  },
});

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.counter.value)`
export const selectPlanets = (state: RootState) => state.planet.planets;

export const { addPlanet } = planetSlice.actions;
export default planetSlice.reducer;
