import { api } from "../api/baseApi";

const orderSlice = api.injectEndpoints({
  endpoints: (builder) => ({
    orders: builder.query({
      query: () => {
        return {
          method: "GET",
          url: "/order",
        };
      },
    }),
  }),
});

export const { useOrdersQuery } = orderSlice;
