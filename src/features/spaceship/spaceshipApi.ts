// Need to use the React-specific entry point to import createApi
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { ID, Spaceship } from "../../domain/types";

// TODO move baseurl to config
const API_BASE_URL = "http://localhost:3001/api/";

// Define a service using a base URL and expected endpoints
export const spaceshipApi = createApi({
  reducerPath: "spaceshipApi",
  baseQuery: fetchBaseQuery({ baseUrl: API_BASE_URL }),
  endpoints: (builder) => ({
    getSpaceships: builder.query<Array<Spaceship>, void>({
      query: () => `spaceships`,
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
    }),
    postSpaceship: builder.mutation<Spaceship, Partial<Spaceship>>({
      query(body) {
        return {
          url: `spaceships`,
          method: 'POST',
          body,
        }
      },
      // Invalidates all Post-type queries providing the `LIST` id - after all, depending of the sort order,
      // that newly created post could show up in any lists.
      // invalidatesTags: [{ type: 'Spaceships', id: 'LIST' }],
    }),
    putSpaceship: builder.mutation<Spaceship, Partial<Spaceship>>({
      query(data) {
        const { id, ...body } = data
        return {
          url: `spaceships/${id}`,
          method: 'PUT',
          body,
        }
      },
      // Invalidates all queries that subscribe to this Post `id` only.
      // In this case, `getPost` will be re-run. `getPosts` *might*  rerun, if this id was under its results.
      // invalidatesTags: (result, error, { id }) => [{ type: 'Posts', id }],
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
} = spaceshipApi;
