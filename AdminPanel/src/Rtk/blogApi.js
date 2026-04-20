import { createApi } from "@reduxjs/toolkit/query/react";
import axiosBaseQuery from "./axiosBaseQuery";

export const blogApi = createApi({
    reducerPath: "blogApi",   // ✅ Redux Store in  Reducer Name
    baseQuery: axiosBaseQuery, // ✅ Custom Axios Query
    tagTypes: ["blog"],  // ✅ Caching tag
    endpoints: (builder) => ({
        // ✅ GET All Tests (Fetch)
        getAllBlog: builder.query({
            query: () => ({
                url: "/blog",
                method: "GET",
            }),
            providesTags: ["blog"],  // ✅ Caching Enable
        }),
        

        // ✅ ADD New Banner (POST)
        addBlog: builder.mutation({
            query: (formData) => {
                return {
                    url: "/blog",
                    method: "POST",
                    data:formData,
                    formData:true
    
                };
            },
            invalidatesTags: ["blog"],
        }),
        
        
        

        // ✅ EDIT Test (PUT)
        editBlog: builder.mutation({
            query: ({ id, formData }) => ({
                url: `/blog/${id}`,
                method: "PUT",
                data: formData, // ✅ Change from `body` to `data`
                formData: true, // ✅ Ensure FormData is properly handled
            }),
            invalidatesTags: ["blog"], // ✅ Cache Refresh
        }),

        // ✅ DELETE Banner (DELETE)
        deleteBlog: builder.mutation({
            query: (id) => ({
                url: `/blog/${id}`,
                method: "DELETE",
            }),
            invalidatesTags: ["blog"], // ✅ Cache Refresh
        }),
    }),
});

// ✅ Hooks Export (Use in Components)
export const {
    useGetAllBlogQuery,
    useAddBlogMutation,
    useEditBlogMutation,
    useDeleteBlogMutation
} = blogApi;
