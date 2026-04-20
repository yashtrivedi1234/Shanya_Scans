import { createApi } from "@reduxjs/toolkit/query/react";
import axiosBaseQuery from "./axiosBaseQuery";

export const bannerApi = createApi({
    reducerPath: "bannerApi",   // ✅ Redux Store in  Reducer Name
    baseQuery: axiosBaseQuery, // ✅ Custom Axios Query
    tagTypes: ["banner"],  // ✅ Caching tag
    endpoints: (builder) => ({
        // ✅ GET All Tests (Fetch)
        getAllBanner: builder.query({
            query: () => ({
                url: "/banner",
                method: "GET",
            }),
            providesTags: ["banner"],  // ✅ Caching Enable
        }),
        

        // ✅ ADD New Banner (POST)
        addBanner: builder.mutation({
            query: (formData) => {
                console.log("RTK Query Received FormData:", formData);
                return {
                    url: "/banner",
                    method: "POST",
                    data: formData, // ✅ Change from `body` to `data`
                    formData: true, // ✅ Ensure FormData is properly handled
                };
            },
            invalidatesTags: ["banner"],
        }),
        
        
        

        // ✅ EDIT Test (PUT)
        editBanner: builder.mutation({
            query: ({ id, formData }) => ({
                url: `/banner/${id}`,
                method: "PUT",
                data: formData, // ✅ Change from `body` to `data`
                formData: true, // ✅ Ensure FormData is properly handled
            }),
            invalidatesTags: ["banner"], // ✅ Cache Refresh
        }),

        // ✅ DELETE Banner (DELETE)
        deleteBanner: builder.mutation({
            query: (id) => ({
                url: `/banner/${id}`,
                method: "DELETE",
            }),
            invalidatesTags: ["banner"], // ✅ Cache Refresh
        }),
    }),
});

// ✅ Hooks Export (Use in Components)
export const {
    useGetAllBannerQuery,
    useAddBannerMutation,
    useEditBannerMutation,
    useDeleteBannerMutation,
} = bannerApi;
