import { createApi } from "@reduxjs/toolkit/query/react";
import axiosBaseQuery from "./axiosBaseQuery";

export const scanTestApi = createApi({
    reducerPath: "scanTestApi",   // ✅ Redux Store in  Reducer Name
    baseQuery: axiosBaseQuery, // ✅ Custom Axios Query
    tagTypes: ["scanTest"],  // ✅ Caching tag
    endpoints: (builder) => ({
        // ✅ GET All Tests (Fetch)
        getAllScanTest: builder.query({
            query: (slug) => ({
                url: `/test/service/scan/${slug}`,
                method: "GET",
            }),
            providesTags: ["scanTest"],  // ✅ Caching Enable
        }),
        

        // ✅ ADD New Test (POST)
        addScanTest: builder.mutation({
            query: ({formData,slug}) => {
                console.log("RTK Query Received FormData:", formData);
                return {
                    url: `/test/add/details/${slug}`,
                    method: "POST",
                    data:formData
                 
                };
            },
            invalidatesTags: ["scanTest"],
        }),
        
        
        

        // ✅ EDIT Test (PUT)
        editScan: builder.mutation({
            query: ({ id, data }) => ({
                url: `/service/detail/service/${id}`,
                method: "PUT",
                data,
            }),
            invalidatesTags: ["scanTest"], // ✅ Cache Refresh
        }),

        editScanTest: builder.mutation({
            query: ({ id, data }) => ({
                url: `/test/detail/${id}`,
                method: "PUT",
                data,
            }),
            invalidatesTags: ["scanTest"], // ✅ Cache Refresh
        }),

        // ✅ DELETE Test (DELETE)
        deleteScanTest: builder.mutation({
            
            query: (slugName) => ({
                url: `/test/detail/specific/${slugName}`,
                method: "DELETE",
            }),
            invalidatesTags: ["scanTest"], // ✅ Cache Refresh
        }),
    }),
});

// ✅ Hooks Export (Use in Components)
export const {
    useGetAllScanTestQuery,
    useAddScanTestMutation,
    useEditScanMutation,
    useDeleteScanTestMutation,
    useEditScanTestMutation
} = scanTestApi;
