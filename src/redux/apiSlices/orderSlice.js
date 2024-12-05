import { api } from "../api/baseApi";

const orderSlice = api.injectEndpoints({
  endpoints: (build) => ({
    orders: build.query({
      query: () => {
        return {
          method: "GET",
          url: "/dashboard/orders",
        };
      },
      transformResponse: ({ orders }) => {
        return orders;
      },
    }),
  }),
});

export const { useOrdersQuery } = orderSlice;
