import { z } from "zod";
import { Maybe } from "purify-ts";

export const NameSchema = z.string().min(3);
export const IDSchema = z.string().min(3).uuid().default("");
export type ID = z.infer<typeof IDSchema>;

export const CoordinatesSchema = z.object({
  lat: z.number(),
  long: z.number(),
});

export type Coordinates = z.infer<typeof CoordinatesSchema>;

export const ZERO_COORD: Coordinates = { lat: 0, long: 0 };

export const PlanetSchema = z.object({
  coordinates: CoordinatesSchema,
  id: IDSchema,
  name: NameSchema,
});

export type Planet = z.infer<typeof PlanetSchema>;

export enum SpaceshipType {
  BROADSWORD = "Broadsword",
  CENTURION = "Centurion",
  DEMON = "Demon",
  GALAXY = "Galaxy",
  NONE = "",
  ORION = "Orion",
  TARSUS = "Tarsus",
}

export enum Weapon {
  LASER = "Laser",
  MASS_DRIVER = "Mass Driver",
  MESON_BLASTER = "Meson Blaster",
  NEUTRON_GUN = "Neutron Gun",
  PARTICLE_CANNON = "Particle Cannon",
  TACHYON_CANNON = "Tachyon Cannon",
}

const ArmourLevelSchema = z.number();
export type ArmourLevel = z.infer<typeof ArmourLevelSchema>;

export const MaybePlanetSchema: z.ZodType<Maybe<Planet>> = z.any();

export type MaybePlanet = z.infer<typeof MaybePlanetSchema>;

export const SpaceshipSchema = z.object({
  armour: ArmourLevelSchema,
  id: IDSchema,
  // landedOnPlanet: MaybePlanetSchema, // TODO figure out how to do Maybe<Planet> more elegantly
  landedOnId: IDSchema,
  landedOnPlanet: PlanetSchema.optional(),
  name: NameSchema,
  type: z.nativeEnum(SpaceshipType),
  weapons: z.array(z.nativeEnum(Weapon)),
});

export type Spaceship = z.infer<typeof SpaceshipSchema>;
