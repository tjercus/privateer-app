// Need to use the React-specific entry point to import createApi
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { ID, Planet, Spaceship } from "../domain/types";

// TODO move baseurl to config
const API_BASE_URL = "http://localhost:3001/api/";

// Define a service using a base URL and expected endpoints
export const apiSlice = createApi({
  reducerPath: "apiSlice",
  baseQuery: fetchBaseQuery({ baseUrl: API_BASE_URL }),
  tagTypes: ["Spaceships", "Planets"],
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
    }),
    putSpaceship: builder.mutation<Spaceship, Partial<Spaceship>>({
      query(data) {
        const { id, ...body } = data;
        return {
          url: `spaceships/${id}`,
          method: "PUT",
          body,
        };
      },
      invalidatesTags: ["Spaceships"],
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
    }),
    postPlanet: builder.mutation<Planet, Partial<Planet>>({
      query(body) {
        return {
          url: `planets`,
          method: "POST",
          body,
        };
      },
      invalidatesTags: ["Planets", "Spaceships"],
    }),
    putPlanet: builder.mutation<Planet, Partial<Planet>>({
      query(data) {
        const { id, ...body } = data;
        return {
          url: `planets/${id}`,
          method: "PUT",
          body,
        };
      },
      invalidatesTags: ["Planets", "Spaceships"],
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

  useDeletePlanetMutation,
  useGetPlanetByIdQuery,
  useGetPlanetsQuery,
  usePostPlanetMutation,
  usePutPlanetMutation,
} = apiSlice;
