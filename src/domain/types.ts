import {Maybe} from "purify-ts";

export type Coordinates = { lat: number; long: number };

export type ID = string;

export const ZERO_COORD: Coordinates = { lat: 0, long: 0 };

export type Planet = {
  name: string;
  coordinates: Coordinates;
  id: ID;
};

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
  TACHYON_CANNON = "Tachyon Cannon",
}

type ArmourLevel = number;

export interface Spaceship {
  armour: ArmourLevel;
  id: ID;
  landedOn: Maybe<Planet>;
  name: string;
  type: SpaceshipType;
  weapons: Array<Weapon>;
}

