import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import { Planet } from "../../domain/types";

export interface PlanetState {
  planets: Array<Planet>;
}

const initialState: PlanetState = {
  planets: [
    {
      coordinates: { lat: 12.4, long: -18.9 },
      id: "abc-123-def",
      name: "Kamino",
    },
    {
      coordinates: { lat: -22.18, long: 111.2 },
      id: "ghi-456-klm",
      name: "Tatooine",
    },
  ],
};

const planetSlice = createSlice({
  name: "planet",
  initialState,
  reducers: {
    savePlanet: (state, action: PayloadAction<Planet>) => {
      console.log("action", action);
      // const saveablePlanet = action.payload;
      // TODO do update versus insert logic
      state.planets = [...state.planets, action.payload];
    },
  },
});

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.counter.value)`
export const selectPlanets = (state: RootState) => state.planet.planets || [];

export const { savePlanet } = planetSlice.actions;
export default planetSlice.reducer;
