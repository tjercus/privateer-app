import {createSlice} from "@reduxjs/toolkit";
import {Planet} from "../planet/planetSlice";
import {Maybe} from "purify-ts";

enum SpaceshipType {
  BROADSWORD = "Broadsword",
  CENTURION = "Centurion",
  DEMON = "Demon",
  GALAXY = "Galaxy",
  ORION = "Orion",
  TARSUS = "Tarsus",
}

enum Weapon {
  LASER = "Laser",
  MASS_DRIVER = "Mass Driver",
  MESON_BLASTER = "Meson Blaster",
  NEUTRON_GUN = "Neutron Gun",
  PARTICLE_CANNON = "Particle Cannon",
  TACHYON_CANNON = "Tachyon Cannon"
}

type ArmourLevel = number;

interface Spaceship {
  armour: ArmourLevel;
  landedOn: Maybe<Planet>;
  name: string;
  type: SpaceshipType;
  weapons: Array<Weapon>;
}

interface SpaceshipState {
  spaceships: Array<Spaceship>
}

const initialState: SpaceshipState = {
  spaceships: []
}

const spaceshipSlice = createSlice({
    name: "spaceship",
    initialState,
    reducers: {},
  }
);