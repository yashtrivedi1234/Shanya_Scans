import { createApi } from "@reduxjs/toolkit/query/react";
import axiosBaseQuery from "./axiosBaseQuery";

export const galleryApi = createApi({
    reducerPath: "carrerApi",   // ✅ Redux Store in  Reducer Name
    baseQuery: axiosBaseQuery, // ✅ Custom Axios Query
    tagTypes: ["gallery"],  // ✅ Caching tag
    endpoints: (builder) => ({
        // ✅ GET All Tests (Fetch)
        getAllGallery: builder.query({
            query: () => ({
                url: "/gallery",
                method: "GET",
            }),
            providesTags: ["gallery"],  // ✅ Caching Enable
        }),

        addGallery: builder.mutation({
            query: (formData) => {
                return {
                    url: "/gallery",
                    method: "POST",
                    data: formData, 
                    formData: true,
                };
            },
            invalidatesTags: ["gallery"],
        }),

        editGallery: builder.mutation({
            query: ({formData,id}) => {
                return {
                    url: `/gallery/${id}`,
                    method: "PUT",
                    data: formData, 
                    formData: true,
                };
            },
            invalidatesTags: ["gallery"],
        }),
        

      
        // ✅ DELETE Banner (DELETE)
        deleteGallery: builder.mutation({
            query: (id) => ({
                url: `/gallery/${id}`,
                method: "DELETE",
            }),
            invalidatesTags: ["gallery"], 
        }),


        getCarrerOpening: builder.query({
            query: () => ({
                url: "/opening",
                method: "GET",
            }),
            providesTags: ["gallery"],  // ✅ Caching Enable
        }),


        addCarrerOpening: builder.mutation({
            query: ({data}) => {
                return {
                    url: "/opening",
                    method: "POST",
                    data
                      
                };
            },
            invalidatesTags: ["gallery"],
        }),


        editCarrerOpening: builder.mutation({
            query: ({data,id}) => {
                return {
                    url: `/opening/${id}`,
                    method: "PUT",
                    data
                    
                };
            },
            invalidatesTags: ["gallery"],
        }),


        deleteCarrerOpening: builder.mutation({
            query: (id) => ({
                url: `/opening/${id}`,
                method: "DELETE",
            }),
            invalidatesTags: ["gallery"], 
        }),



        


    }),
});

// ✅ Hooks Export (Use in Components)
export const {
    useGetAllGalleryQuery,
    useDeleteCarrerMutation,
    useAddGalleryMutation,
    useDeleteGalleryMutation,
    useEditGalleryMutation,
    useGetCarrerOpeningQuery,
    useAddCarrerOpeningMutation,
    useEditCarrerOpeningMutation,
    useDeleteCarrerOpeningMutation
} = galleryApi;
