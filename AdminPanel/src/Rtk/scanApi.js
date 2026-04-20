import { createApi } from "@reduxjs/toolkit/query/react";
import axiosBaseQuery from "./axiosBaseQuery";

export const scanApi = createApi({
    reducerPath: "scanApi",   // ✅ Redux Store in  Reducer Name
    baseQuery: axiosBaseQuery, // ✅ Custom Axios Query
    tagTypes: ["scan"],  // ✅ Caching tag
    endpoints: (builder) => ({
        // ✅ GET All Tests (Fetch)
        getAllScan: builder.query({
            query: () => ({
                url: "/service/detail/service",
                method: "GET",
            }),
            providesTags: ["scan"],  // ✅ Caching Enable
        }),
        

        // ✅ ADD New Test (POST)
        addScan: builder.mutation({
            query: (formData) => {
                console.log("RTK Query Received FormData:", formData);
                return {
                    url: "/service/detail/service",
                    method: "POST",
                    data: formData, // ✅ Change from `body` to `data`
                    formData: true, // ✅ Ensure FormData is properly handled
                };
            },
            invalidatesTags: ["scan"],
        }),
        
        
        

        // ✅ EDIT Test (PUT)
        editScan: builder.mutation({
            query: ({ id, formData }) => ({
                url: `/service/detail/${id}`,
                method: "PUT",
                data: formData, // ✅ Change from `body` to `data`
                formData: true, // ✅ Ensure FormData is properly handled
            }),
            invalidatesTags: ["scan"], // ✅ Cache Refresh
        }),

        // ✅ DELETE Test (DELETE)
        deleteScan: builder.mutation({
            query: (id) => ({
                url: `/service/detail/${id}`,
                method: "DELETE",
            }),
            invalidatesTags: ["scan"], // ✅ Cache Refresh
        }),
    }),
});

// ✅ Hooks Export (Use in Components)
export const {
    useGetAllScanQuery,
    useAddScanMutation,
    useEditScanMutation,
    useDeleteScanMutation,
} = scanApi;
