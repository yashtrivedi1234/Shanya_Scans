import { createApi } from "@reduxjs/toolkit/query/react";
import axiosBaseQuery from "./axiosBaseQuery";

export const labTestApi = createApi({
    reducerPath: "labTestApi",   // ✅ Redux Store in  Reducer Name
    baseQuery: axiosBaseQuery, // ✅ Custom Axios Query
    tagTypes: ["lab"],  // ✅ Caching tag
    endpoints: (builder) => ({
        // ✅ GET All Tests (Fetch)
        getAllLabTestTag: builder.query({
            query: () => ({
                url: "/pathology/tag",
                method: "GET",
            }),
            providesTags: ["lab"],  // ✅ Caching Enable
        }),

        getAllLabTest: builder.query({
            query: () => ({
                url: "/pathology",
                method: "GET",
            }),
            providesTags: ["lab"],  // ✅ Caching Enable
        }),
        

        // ✅ ADD New Banner (POST)
        addLabTestTag: builder.mutation({
            query: ({formData,pathologyId:slug}) => {
           
                return {
                    url: `/pathology/tag/${slug}`,
                    method: "POST",
                    data: formData, // ✅ Change from `body` to `data`
                    formData: true, // ✅ Ensure FormData is properly handled
                };
            },
            invalidatesTags: ["lab"],
        }),


        addLabTest: builder.mutation({
            query: ({data}) => ({
                url: `/pathology`,
                method: "POST",
                data
            }),
            invalidatesTags: ["lab"],
        }),

        editLabTest: builder.mutation({
            query: ({ data,id:id }) => ({
                url: `/pathology/${id}`,
                method: "PUT",
                data
            }),
            invalidatesTags: ["lab"], // ✅ Cache Refresh
        }),
        
        
        
        

        // ✅ EDIT Test (PUT)
        editLabTag: builder.mutation({
            query: ({ formData,pathologyId:id }) => ({
                url: `/pathology/tag/${id}`,
                method: "PUT",
                data: formData, // ✅ Change from `body` to `data`
                formData: true, // ✅ Ensure FormData is properly handled
            }),
            invalidatesTags: ["lab"], // ✅ Cache Refresh
        }),

        // ✅ DELETE Banner (DELETE)
        deleteLabTag: builder.mutation({
            query: (id) => ({
                url: `/pathology/tag/${id}`,
                method: "DELETE",
            }),
            invalidatesTags: ["lab"], // ✅ Cache Refresh
        }),

        deleteLabTest: builder.mutation({
            query: (id) => ({
                url: `/pathology/${id}`,
                method: "DELETE",
            }),
            invalidatesTags: ["lab"], // ✅ Cache Refresh
        }),

    }),
});

// ✅ Hooks Export (Use in Components)
export const {
    useGetAllLabTestTagQuery,
    useGetAllLabTestQuery,
    useAddLabTestTagMutation,
    useAddLabTestMutation,
    useEditLabTagMutation,
    useEditLabTestMutation,
    useDeleteLabTagMutation,
    useDeleteLabTestMutation
} = labTestApi;
