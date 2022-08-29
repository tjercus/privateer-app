// Need to use the React-specific entry point to import createApi
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Spaceship } from "../../domain/types";

// TODO move baseurl to config
const API_BASE_URL = "https://localhost:3001/api/v2/";

// Define a service using a base URL and expected endpoints
export const spaceshipApi = createApi({
  reducerPath: "spaceshipApi",
  baseQuery: fetchBaseQuery({ baseUrl: API_BASE_URL }),
  endpoints: (builder) => ({
    getSpaceships: builder.query<Array<Spaceship>, void>({
      query: () => `spaceships`,
    }),
    getSpaceshipByName: builder.query<Spaceship, string>({
      query: (name) => `spaceship/?name=${name}`,
    }),
    getSpaceshipById: builder.query<Spaceship, string>({
      query: (id) => `spaceship/${id}`,
    }),
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useGetSpaceshipByNameQuery } = spaceshipApi;
