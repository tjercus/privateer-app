import { z, ZodIssue } from "zod";
import React from "react";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { SerializedError } from "@reduxjs/toolkit";

export const NameSchema = z.string().min(3).max(100);
export const IDSchema = z.string().length(36).uuid().default("");
export type ID = z.infer<typeof IDSchema>;

export type ValueOf<T> = T[keyof T];

export type FormDataMap<T> = Map<keyof T, any>;
export type ReactChangeEvent =
  | React.ChangeEvent<HTMLInputElement>
  | React.ChangeEvent<HTMLSelectElement>;

export type ValidationIssues = Array<ZodIssue>;

export type SomeErrorType =
  | ObjectWithIssues
  | FetchBaseQueryError
  | SerializedError
  | undefined;

export type ObjectWithIssues = { issues: ValidationIssues };
