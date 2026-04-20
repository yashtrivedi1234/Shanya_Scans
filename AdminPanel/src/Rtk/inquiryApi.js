import { createApi } from "@reduxjs/toolkit/query/react";
import axiosBaseQuery from "./axiosBaseQuery";

export const inquiryApi = createApi({
    reducerPath: "inquiryApi",   // ✅ Redux Store in  Reducer Name
    baseQuery: axiosBaseQuery, // ✅ Custom Axios Query
    tagTypes: ["contact"],  // ✅ Caching tag
    endpoints: (builder) => ({
        // ✅ GET All Tests (Fetch)
        getAllInquiry: builder.query({
            query: () => ({
                url: "/contact",
                method: "GET",
            }),
            providesTags: ["contact"],  // ✅ Caching Enable
        }),
    

        // ✅ DELETE Banner (DELETE)
        deleteInquriry: builder.mutation({
            query: (id) => ({
                url: `/contact/${id}`,
                method: "DELETE",
            }),
            invalidatesTags: ["contact"], // ✅ Cache Refresh
        }),
    }),
});

// ✅ Hooks Export (Use in Components)
export const {
    useGetAllInquiryQuery,
    useDeleteInquriryMutation,
} = inquiryApi;
