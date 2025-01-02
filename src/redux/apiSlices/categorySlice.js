import { api } from "../api/baseApi";

const categorySlice = api.injectEndpoints({
  endpoints: (builder) => ({
    allCategories: builder.query({
      query: () => {
        return {
          url: "/category",
          method: "GET",
        };
      },
      providesTags: ["Categories"],
    }),
    addCategory: builder.mutation({
      query: (data) => {
        console.log("api slice", data);
        return {
          method: "POST",
          url: "/category",
          body: data,
        };
      },
      invalidatesTags: ["Categories"],
    }),
    updateCategory: builder.mutation({
      query: ({ data, id }) => {
        return {
          method: "PATCH",
          url: `/category/${id}`,
          body: data,
        };
      },
      invalidatesTags: ["Categories"],
    }),
    deleteCategory: builder.mutation({
      query: (id) => {
        return {
          method: "DELETE",
          url: `/category/${id}`,
        };
      },
      invalidatesTags: ["Categories"],
    }),
  }),
});

export const {
  useAllCategoriesQuery,
  useAddCategoryMutation,
  useUpdateCategoryMutation,
  useDeleteCategoryMutation,
} = categorySlice;
