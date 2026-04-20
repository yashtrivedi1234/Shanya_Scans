import { createApi } from "@reduxjs/toolkit/query/react";
import axiosBaseQuery from "./axiosBaseQuery";

export const collectionApi = createApi({
    reducerPath: "collectionApi",   // ✅ Redux Store in  Reducer Name
    baseQuery: axiosBaseQuery, // ✅ Custom Axios Query
    tagTypes: ["collection"],  // ✅ Caching tag
    endpoints: (builder) => ({
        // ✅ GET All Tests (Fetch)

        addCollectionSales: builder.mutation({
            query: ({data}) => ({
                url: "/collection",
                method: "POST",
                data,
            }),
            invalidatesTags: ["collection"], // ✅ Cache Refresh
        }),
      

      
        getCollectionSales: builder.query({
            query: () => ({
                url: "/collection",
                method: "GET",
            }),
            providesTags: ["collection"],  // ✅ Caching Enable
        }),


        assignedCollectionSales: builder.mutation({
            query: (data) => ({
                url: "/collection/assigned",
                method: "POST",
                data,
            }),
            invalidatesTags: ["collection"], // ✅ Cache Refresh
        }),
        salesManDelete: builder.mutation({
            query: ({id}) => ({
                url: `/collection/${id}`,
                method: "DELETE",
            }),
            invalidatesTags: ["collection"], 
        }),

        getHomeCollectionDetail: builder.query({
            query: (id) => ({
                url: `/order/home-collection/${id}`,
                method: "GET",
            }),
            providesTags: ["collection"],  // ✅ Caching Enable
        }),

        
        getHomeCollectionSalesDetail: builder.query({
            query: (id) => ({
                url: `/collection/detail/${id}`,
                method: "GET",
            }),
            providesTags: ["collection"],  // ✅ Caching Enable
        }),

    }),
});

// ✅ Hooks Export (Use in Components)
export const {
    useAddCollectionSalesMutation, // ✅ Correct,
     useGetCollectionSalesQuery,
     useAssignedCollectionSalesMutation,
     useGetHomeCollectionDetailQuery,
     useGetHomeCollectionSalesDetailQuery,
     useSalesManDeleteMutation
} = collectionApi;
