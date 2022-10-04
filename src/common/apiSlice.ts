// Need to use the React-specific entry point to import createApi
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Planet, Spaceship } from "../domain/types";
import { byId, byNotId } from "./utils";
import { filter, find, without } from "ramda";
import { ID } from "../domain/general";

// TODO move baseurl to config
const API_BASE_URL = "http://localhost:3001/api/";

export type QueryTypeNames =
  | "getPlanets"
  | "getPlanetById"
  | "getSpaceships"
  | "getSpaceshipById";

// Define a service using a base URL and expected endpoints
export const apiSlice = createApi({
  reducerPath: "apiSlice",
  baseQuery: fetchBaseQuery({ baseUrl: API_BASE_URL }),
  tagTypes: ["Spaceships", "Planets"],
  // refetchOnFocus: true, // for now disable aggressive caching
  endpoints: (builder) => ({
    getSpaceships: builder.query<Array<Spaceship>, void>({
      query: () => `spaceships`,
      providesTags: ["Spaceships"],
    }),
    getSpaceshipByName: builder.query<Spaceship, string>({
      query: (name) => `spaceships/?name=${name}`,
    }),
    getSpaceshipById: builder.query<Spaceship, string>({
      query: (id) => `spaceships/${id}`,
    }),
    deleteSpaceship: builder.mutation<{ success: boolean; id: ID }, string>({
      query(id) {
        return {
          url: `spaceships/${id}`,
          method: "DELETE",
        };
      },
      invalidatesTags: ["Spaceships"],
      onQueryStarted(id, { dispatch, queryFulfilled }) {
        // Optimistic caching with rollback on error
        const patchResult = dispatch(
          apiSlice.util.updateQueryData("getSpaceships", undefined, (cache) =>
            // kill the item from the cache
            Object.assign(without([find(byId(id), cache)], cache))
          )
        );
        queryFulfilled.catch(patchResult.undo);
      },
    }),
    postSpaceship: builder.mutation<Spaceship, Partial<Spaceship>>({
      query(body) {
        return {
          url: `spaceships`,
          method: "POST",
          body,
        };
      },
      invalidatesTags: ["Spaceships"],
      onQueryStarted(body, { dispatch, queryFulfilled }) {
        // Optimistic caching with rollback on error
        const patchResult = dispatch(
          apiSlice.util.updateQueryData("getSpaceships", undefined, (cache) =>
            // add the item in the cache
            Object.assign([...cache, body])
          )
        );
        queryFulfilled.catch(patchResult.undo);
      },
    }),
    putSpaceship: builder.mutation<Spaceship, Partial<Spaceship>>({
      query(body) {
        return {
          url: `spaceships/${body.id}`,
          method: "PUT",
          body,
        };
      },
      invalidatesTags: ["Spaceships"],
      onQueryStarted(body, { dispatch, queryFulfilled }) {
        // Optimistic caching with rollback on error
        const patchResult = dispatch(
          apiSlice.util.updateQueryData("getSpaceships", undefined, (cache) => {
            // update the item in the cache
            return Object.assign([...filter(byNotId(body.id), cache), body]);
          })
        );
        queryFulfilled.catch(patchResult.undo);
      },
    }),

    patchSpaceship: builder.mutation<void, { id: ID; landedOnId: ID }>({
      query(body) {
        return {
          url: `spaceships/${body.id}`,
          method: "PATCH",
          body,
        };
      },
      invalidatesTags: ["Spaceships"],
      onQueryStarted(body, { dispatch, queryFulfilled }) {
        // Optimistic caching with rollback on error
        const patchResult = dispatch(
          apiSlice.util.updateQueryData("getSpaceships", undefined, (cache) => {
            // ask immer to update the item in the cache
            const storageIndex = cache.findIndex(byId(body.id));
            if (storageIndex > -1) {
              const prevSpaceship =
                find(byId(body.id), cache) ?? ({} as Spaceship);
              cache[storageIndex] = {
                ...prevSpaceship,
                ...body,
              };
            }
          })
        );
        queryFulfilled.catch(patchResult.undo);
      },
    }),

    getPlanets: builder.query<Array<Planet>, void>({
      query: () => `planets`,
      providesTags: ["Planets"],
    }),
    getPlanetsByName: builder.query<Planet, string>({
      query: (name) => `planets/?name=${name}`,
    }),
    getPlanetById: builder.query<Planet, string>({
      query: (id) => `planets/${id}`,
    }),
    deletePlanet: builder.mutation<{ success: boolean; id: ID }, string>({
      query(id) {
        return {
          url: `planets/${id}`,
          method: "DELETE",
        };
      },
      invalidatesTags: ["Planets", "Spaceships"],
      onQueryStarted(id, { dispatch, queryFulfilled }) {
        // Optimistic caching with rollback on error
        const patchResult = dispatch(
          apiSlice.util.updateQueryData("getPlanets", undefined, (cache) =>
            // kill the item from the cache
            Object.assign(without([find(byId(id), cache)], cache))
          )
        );
        queryFulfilled.catch(patchResult.undo);
      },
    }),
    postPlanet: builder.mutation<Planet, Partial<Planet>>({
      query(body) {
        return {
          url: `planets`,
          method: "POST",
          body,
        };
      },
      invalidatesTags: ["Planets"],
      onQueryStarted(body, { dispatch, queryFulfilled }) {
        // Optimistic caching with rollback on error
        const patchResult = dispatch(
          apiSlice.util.updateQueryData("getPlanets", undefined, (cache) =>
            // add the item in the cache
            Object.assign([...cache, body])
          )
        );
        queryFulfilled.catch(patchResult.undo);
      },
    }),
    putPlanet: builder.mutation<Planet, Partial<Planet>>({
      query(data) {
        return {
          url: `planets/${data.id}`,
          method: "PUT",
          body: data,
        };
      },
      invalidatesTags: ["Planets", "Spaceships"],
      onQueryStarted(body, { dispatch, queryFulfilled }) {
        // Optimistic caching with rollback on error
        const patchResult = dispatch(
          apiSlice.util.updateQueryData("getPlanets", undefined, (cache) => {
            // update the item in the cache
            return Object.assign([...filter(byNotId(body.id), cache), body]);
          })
        );
        queryFulfilled.catch(patchResult.undo);
      },
    }),
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const {
  useDeleteSpaceshipMutation,
  useGetSpaceshipByIdQuery,
  useGetSpaceshipsQuery,
  usePostSpaceshipMutation,
  usePutSpaceshipMutation,
  usePatchSpaceshipMutation,

  useDeletePlanetMutation,
  useGetPlanetByIdQuery,
  useGetPlanetsQuery,
  usePostPlanetMutation,
  usePutPlanetMutation,
} = apiSlice;
