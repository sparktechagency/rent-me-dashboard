import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const api = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://192.168.10.8:5001/api/v1",
    // baseUrl: "http://192.168.10.195:5000/api"
  }),
  prepareHeaders: (headers) => {
    const token = localStorage.getItem("authToken");
    if (token) {
      headers.set("Authorization", `Bearer ${token}`);
    }
    return headers;
  },
  endpoints: () => ({}),
});

// export const imageUrl = "http://206.189.231.81:5000";
export const imageUrl = "http://206.189.231.81:5000";
