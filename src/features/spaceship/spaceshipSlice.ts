import { createSlice } from "@reduxjs/toolkit";
import { Spaceship } from "../../domain/types";

export interface SpaceshipState {
  spaceships: Array<Spaceship>;
}

const initialState: SpaceshipState = {
  spaceships: [],
};

const spaceshipSlice = createSlice({
  name: "spaceship",
  initialState,
  reducers: {},
});
