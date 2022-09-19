import { z } from "zod";

export const NameSchema = z.string().min(3).max(100);
export const IDSchema = z.string().length(36).uuid().default("");
export type ID = z.infer<typeof IDSchema>;

export type FormDataMap<T> = Map<keyof T, any>;

export type ValueOf<T> = T[keyof T];
