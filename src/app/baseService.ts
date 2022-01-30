import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { RootState } from "./store";

export const baseService = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: `https://graphql.contentful.com/content/v1/spaces/ojpqlra32uom/environments/`,
    prepareHeaders: (headers, { getState }) => {
      const token = getState() as RootState;
      if (token) {
        headers.set(
          "authorization",
          `Bearer wO9AhZ3Ig3-aFGAJ3SEj1vtKJ6DuYhvnwDHTJfsQX5w`
        );
      }
      return headers;
    },
  }),
  tagTypes: [],
  endpoints: () => ({}),
});
