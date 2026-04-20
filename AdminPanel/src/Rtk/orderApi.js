import { createApi } from "@reduxjs/toolkit/query/react";
import axiosBaseQuery from "./axiosBaseQuery";

export const orderApi = createApi({
    reducerPath: "orderApi",   // ✅ Redux Store in  Reducer Name
    baseQuery: axiosBaseQuery, // ✅ Custom Axios Query
    tagTypes: ["order"],  // ✅ Caching tag
    endpoints: (builder) => ({
        // ✅ GET All Tests (Fetch)
        getAllOrder: builder.query({
            query: () => ({
                url: "/order",
                method: "GET",
            }),
            providesTags: ["order"],  // ✅ Caching Enable
        }),

        getAllTotalOrder: builder.query({
            query: () => ({
                url: "/order/summary",
                method: "GET",
            }),
            providesTags: ["order"],  // ✅ Caching Enable
        }),
        
        getAllLatest: builder.query({
            query: () => ({
                url: "/order/latest",
                method: "GET",
            }),
            providesTags: ["order"],  // ✅ Caching Enable
        }),

        getAllHomeCollection: builder.query({
            query: () => ({
                url: "/order/home-collection",
                method: "GET",
            }),
            providesTags: ["order"],  // ✅ Caching Enable
        }),

        getHomeCollectionDetail: builder.query({
            query: (id) => ({
                url: `/order/home-collection/${id}`,
                method: "GET",
            }),
            providesTags: ["order"],  // ✅ Caching Enable
        }),

        getOrderDetail: builder.query({
            query: (id) => ({
                url: `/order/${id}`,
                method: "GET",
            }),
            providesTags: ["order"],  // ✅ Caching Enable
        }),


        orderReport: builder.mutation({
            query: ({formData,id}) => {
                return {
                    url: `/order/report/${id}`,
                    method: "POST",
                    data: formData, 
                    formData: true,
                };
            },
            invalidatesTags: ["order"],
        }),

        orderStatus: builder.mutation({
            query: ({data,id}) => {
                return {
                    url: `/order/change-status/${id}`,
                    method: "POST",
                    data
                
                };
            },
            invalidatesTags: ["order"],
        }),



        getLatestHomeCollectionOrder:builder.query({
            query: () => ({
                url: `/order/latest/home-collection`,
                method: "GET",
            }),
            providesTags: ["order"],  // ✅ Caching Enable
        }),

getWeeklyOrders: builder.query({
            query: () => ({
                url: `/order/weekly`,
                method: "GET",
            }),
            providesTags: ["order"],
        }),

        // ✅ Monthly Orders
        getMonthlyOrders: builder.query({
            query: () => ({
                url: `/order/monthly`,
                method: "GET",
            }),
            providesTags: ["order"],
        }),
        getTotalOrders: builder.query({
            query: () => ({
                url: `/order/total`,
                method: "GET",
            }),
            providesTags: ["order"],
        }),
      
    }),
});

// ✅ Hooks Export (Use in Components)
export const {
    useGetAllOrderQuery,
    useGetAllTotalOrderQuery,
    useGetAllLatestQuery,
    useGetAllHomeCollectionQuery,
    useGetOrderDetailQuery,
    useOrderReportMutation,
    useOrderStatusMutation,
    useGetLatestHomeCollectionOrderQuery,
    useGetWeeklyOrdersQuery,
    useGetMonthlyOrdersQuery,
    useGetTotalOrdersQuery
} = orderApi;
