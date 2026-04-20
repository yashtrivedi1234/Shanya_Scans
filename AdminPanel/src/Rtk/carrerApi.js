import { createApi } from "@reduxjs/toolkit/query/react";
import axiosBaseQuery from "./axiosBaseQuery";

export const carrerApi = createApi({
    reducerPath: "carrerApi",
    baseQuery: axiosBaseQuery,
    tagTypes: ["open"],
    endpoints: (builder) => ({
        getAllCarrer: builder.query({
            query: () => ({
                url: "/carrer",
                method: "GET",
            }),
            providesTags: ["open"],
        }),




        getAllOpening: builder.query({
            query: () => {
                console.log("all opening");
                return {
                    url: "/opening",
                    method: "GET",
                };
            },
            providesTags: ["open"],
        }),

        deleteCarrer: builder.mutation({
            query: (id) => ({
                url: `/carrer/${id}`,
                method: "DELETE",
            }),
            invalidatesTags: ["open"],
        }),
    }),
});

export const {
    useGetAllCarrerQuery,
    useDeleteCarrerMutation,
    useGetAllOpeningQuery,
} = carrerApi;
