import {z} from "zod";
import {Maybe} from "purify-ts";

export const CoordinatesSchema = z.object({
  lat: z.number(),
  long: z.number(),
});

export type Coordinates = z.infer<typeof CoordinatesSchema>;

export const IDSchema = z.string();

export type ID = z.infer<typeof IDSchema>;

export const ZERO_COORD: Coordinates = { lat: 0, long: 0 };

export const PlanetSchema = z.object({
  coordinates: CoordinatesSchema,
  id: IDSchema.optional().default(""),
  name: z.string().default(""),
});

export type Planet = z.infer<typeof PlanetSchema>;

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

const ArmourLevelSchema = z.number();
type ArmourLevel = z.infer<typeof ArmourLevelSchema>;

export const MaybePlanetSchema: z.ZodType<Maybe<Planet>> = z.any();
export type MaybePlanet = z.infer<typeof MaybePlanetSchema>;

export const SpaceshipSchema = z.object({
  armour: ArmourLevelSchema,
  id: IDSchema,
  landedOn: MaybePlanetSchema, // TODO figure out how to do Maybe<Planet> more elegantly
  name: z.string(),
  type: z.nativeEnum(SpaceshipType),
  weapons: z.array(z.nativeEnum(Weapon)),
})

export type Spaceship = z.infer<typeof SpaceshipSchema>;

/*
export interface Spaceship {
  armour: ArmourLevel;
  id: ID;
  landedOn: Maybe<Planet>;
  name: string;
  type: SpaceshipType;
  weapons: Array<Weapon>;
}
*/