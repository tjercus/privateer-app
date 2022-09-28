import { Middleware, ThunkDispatch } from "@reduxjs/toolkit";
import { ZodSchema } from "zod";
//
import { RootState } from "../store";
import {
  Planet,
  PlanetSchema,
  Spaceship,
  SpaceshipSchema,
} from "../domain/types";
import { QueryTypeNames } from "./apiSlice";
import { match } from "ts-pattern";

// Sanitizing functions will remove any objects that do not pass validation to a schema
const sanitizeSingularPayload = <T>(payload: T, schema: ZodSchema) =>
  schema.safeParse(payload).success ? payload : ({} as T);
const sanitizeListPayload = <T>(payload: Array<T>, schema: ZodSchema) =>
  payload.filter((item: T | any) => schema.safeParse(item).success);
const sanitizePayload = <T>(
  payload: T | Array<T>,
  schema: ZodSchema
): T | Array<T> =>
  Array.isArray(payload)
    ? sanitizeListPayload(payload, schema)
    : sanitizeSingularPayload(payload, schema);

/**
 * After a query returns from the server, this middleware intercepts
 *  the dispatch of the Action from HTTP layer to the Redux store.
 *  Then validates the data to guard the integrity of the domain.
 *  If data is invalid, it is excluded from the Action payload.
 */
export const responseValidatingMiddleware: Middleware<
  {}, // do not modify the dispatch return value
  RootState,
  ThunkDispatch
> = (_) => (next) => (action) => {
  const actionClone = { ...action };
  if (action.type === "apiSlice/executeQuery/fulfilled") {
    console.log("responseValidatingMiddleware fired for", action);

    actionClone.payload = match(action.meta?.arg.endpointName as QueryTypeNames)
      .with("getPlanets", () =>
        sanitizePayload<Planet>(action.payload, PlanetSchema)
      )
      .with("getPlanetById", () =>
        sanitizePayload<Planet>(action.payload, PlanetSchema)
      )
      .with("getSpaceships", () =>
        sanitizePayload<Spaceship>(action.payload, SpaceshipSchema)
      )
      .with("getSpaceshipById", () =>
        sanitizePayload<Spaceship>(action.payload, SpaceshipSchema)
      ).exhaustive();
  }
  return next(actionClone);
};
