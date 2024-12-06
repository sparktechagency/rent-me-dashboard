import { api } from "../api/baseApi";

const dashboardSlice = api.injectEndpoints({
  endpoints: (builder) => ({
    generalStats: builder.query({
      query: () => {
        return {
          method: "GET",
          url: "/dashboard/general-stat",
        };
      },
    }),
  }),
});

export const { useGeneralStatsQuery } = dashboardSlice;
