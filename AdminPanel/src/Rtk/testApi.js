import { createApi } from "@reduxjs/toolkit/query/react";
import axiosBaseQuery from "./axiosBaseQuery";

export const testApi = createApi({
    reducerPath: "testApi",   // ✅ Redux Store in  Reducer Name
    baseQuery: axiosBaseQuery, // ✅ Custom Axios Query
    tagTypes: ["test"],  // ✅ Caching tag
    endpoints: (builder) => ({
        // ✅ GET All Tests (Fetch)
        getAllTests: builder.query({
            query: () => ({
                url: "/test",
                method: "GET",
            }),
            providesTags: ["test"],  // ✅ Caching Enable
        }),

        // ✅ ADD New Test (POST)
        addTest: builder.mutation({
            query: (data) => ({
                url: "/test",
                method: "POST",
                data,
            }),
            invalidatesTags: ["test"], // ✅ Cache Refresh
        }),

        // ✅ EDIT Test (PUT)
        editTest: builder.mutation({
            query: ({ id, data }) => ({
                url: `/test/${id}`,
                method: "PUT",
                data,
            }),
            invalidatesTags: ["test"], // ✅ Cache Refresh
        }),

        // ✅ DELETE Test (DELETE)
        deleteTest: builder.mutation({
            query: (id) => ({
                url: `/test/${id}`,
                method: "DELETE",
            }),
            invalidatesTags: ["test"], // ✅ Cache Refresh
        }),

        socketTesting: builder.mutation({
            query: (data) => ({
                url: `/doctor/testing`,
                method: "POST",
                data
            }),
            
        }),

    }),
});

// ✅ Hooks Export (Use in Components)
export const {
    useGetAllTestsQuery,
    useAddTestMutation,
    useEditTestMutation,
    useDeleteTestMutation,
    useSocketTestingMutation
} = testApi;
