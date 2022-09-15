import { z } from "zod";

export const NameSchema = z.string().min(3);
export const IDSchema = z.string().min(3).uuid().default("");
export type ID = z.infer<typeof IDSchema>;

export type FormDataMap<T> = Map<keyof T, any>