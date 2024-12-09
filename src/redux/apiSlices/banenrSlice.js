import { api } from "../api/baseApi";

const bannerSlice = api.injectEndpoints({
  endpoints: (builder) => ({
    allBanner: builder.query({
      query: () => {
        return {
          url: `/others/banner`,
          method: "GET",
        };
      },
    }),
  }),
});

export const { useAllBannerQuery } = bannerSlice;
