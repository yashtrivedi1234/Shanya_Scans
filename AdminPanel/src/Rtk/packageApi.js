import { createApi } from "@reduxjs/toolkit/query/react";
import axiosBaseQuery from "./axiosBaseQuery";

export const packageApi = createApi({
    reducerPath: "packageApi",   // ✅ Redux Store in  Reducer Name
    baseQuery: axiosBaseQuery, // ✅ Custom Axios Query
    tagTypes: ["package"],  // ✅ Caching tag
    endpoints: (builder) => ({
        // ✅ GET All Tests (Fetch)
        getAllPackage: builder.query({
            query: () => ({
                url: "/package",
                method: "GET",
            }),
            providesTags: ["package"],  // ✅ Caching Enable
        }),
        

        getAllPackageTag: builder.query({
            query: () => ({
                url: "/package/tag",
                method: "GET",
            }),
            providesTags: ["package"],  // ✅ Caching Enable
        }),

        addPackageTag: builder.mutation({
            query: ({formData,pathologyId:slug}) => {
           
                return {
                    url: `/package/tag/${slug}`,
                    method: "POST",
                    data: formData, // ✅ Change from `body` to `data`
                    formData: true, // ✅ Ensure FormData is properly handled
                };
            },
            invalidatesTags: ["package"],
        }),

         // ✅ DELETE Test (DELETE)
         deletePackageTag: builder.mutation({
            query: (id) => ({
                url: `/package/tag/${id}`,
                method: "DELETE",
            }),
            invalidatesTags: ["package"], // ✅ Cache Refresh
        }),

        // ✅ ADD New Test (POST)
        addPackage: builder.mutation({
            query: (formData) => {
            
                return {
                    url: "/package/detail",
                    method: "POST",
                    data: formData, // ✅ Change from `body` to `data`
                    formData: true, // ✅ Ensure FormData is properly handled
                };
            },
            invalidatesTags: ["package"],
        }),
        
        // ✅ EDIT Test (PUT)
        editPackageTag: builder.mutation({
            query: ({formData,id}) => ({
                url: `/package/tag/${id}`,
                method: "PUT",
                data: formData, // ✅ Change from `body` to `data`
                formData: true, // ✅ Ensure FormData is properly handled
            }),
            invalidatesTags: ["package"], // ✅ Cache Refresh
        }),

        updatePackage: builder.mutation({
            query: ({formData,id}) => ({
                url: `/package/detail/${id}`,
                method: "PUT",
                data: formData, // ✅ Change from `body` to `data`
                formData: true, // ✅ Ensure FormData is properly handled
            }),
            invalidatesTags: ["package"], // ✅ Cache Refresh
        }),

        deletePackage: builder.mutation({
            query: (id) => ({
                url: `/package/detail/${id}`,
                method: "DELETE",
            }),
            invalidatesTags: ["package"], // ✅ Cache Refresh
        }),

       
    }),
});

// ✅ Hooks Export (Use in Components)
export const {
    useGetAllPackageQuery,
    useGetAllPackageTagQuery,
    useAddPackageTagMutation,
    useAddPackageMutation,
    useEditPackageTagMutation,
    useDeletePackageTagMutation,
    useDeletePackageMutation,
    useUpdatePackageMutation
} = packageApi;
