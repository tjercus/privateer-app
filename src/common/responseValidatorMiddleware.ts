import { Middleware, ThunkDispatch } from "@reduxjs/toolkit";
//
import { RootState } from "../store";

export const responseValidatorMiddleware: Middleware<
  {}, // do not modify the dispatch return value
  RootState,
  ThunkDispatch
> = (_) => (next) => (action) => {
  // middleware logic here
  console.log("custom example middleware fired for", action);
  return next(action);
};
