import { z } from "zod";
import { IDSchema, NameSchema } from "../../domain/types";

export enum HardwareType {
  DRILLS = "Drills",
  ELECTRONICS = "Electronics",
  NONE = "",
  NUTS_AND_BOLTS = "Nuts and bolts",
}

export const HardwareSchema = z.object({
  cost: z.number().default(0),
  id: IDSchema,
  name: NameSchema,
  type: z.nativeEnum(HardwareType),
});

export type Hardware = z.infer<typeof HardwareSchema>;
