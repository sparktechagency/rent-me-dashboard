import { api } from "../api/baseApi";

const userSlice = api.injectEndpoints({
  endpoints: (builder) => ({
    admin: builder.query({
      query: () => {
        return {
          method: "GET",
          url: "/user?role=ADMIN",
        };
      },
      providesTags: ["User"],
    }),
    users: builder.query({
      query: () => {
        return {
          method: "GET",
          url: "/user",
        };
      },
      providesTags: ["User"],
    }),
    vendors: builder.query({
      query: () => {
        return {
          method: "GET",
          url: "/user?role=VENDOR",
        };
      },
      providesTags: ["User"],
    }),
    userById: builder.query({
      query: (id) => {
        return {
          method: "GET",
          url: `/user/profile/${id}`,
        };
      },
      providesTags: ["User"],
    }),

    changeStatus: builder.mutation({
      query: (id) => {
        return {
          method: "POST",
          url: `dashboard/restrict-active-user/${id}`,
        };
      },
      invalidatesTags: ["User"],
    }),

    restrictUser: builder.mutation({
      query: (id) => {
        return {
          method: "POST",
          url: `/auth/restrict-user/${id}`,
        };
      },
      invalidatesTags: ["User"],
    }),
  }),
});

export const {
  useAdminQuery,
  useUsersQuery,
  useVendorsQuery,
  useUserByIdQuery,
  useChangeStatusMutation,
} = userSlice;
