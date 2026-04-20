import { createApi } from "@reduxjs/toolkit/query/react";
import axiosBaseQuery from "./axiosBaseQuery";

export const teamApi = createApi({
    reducerPath: "teamApi",   // ✅ Redux Store in  Reducer Name
    baseQuery: axiosBaseQuery, // ✅ Custom Axios Query
    tagTypes: ["team"],  // ✅ Caching tag
    endpoints: (builder) => ({
        // ✅ GET All Tests (Fetch)
        getAllTeam: builder.query({
            query: () => ({
                url: "/doctor",
                method: "GET",
            }),
            providesTags: ["team"],  // ✅ Caching Enable
        }),

        
        

        // ✅ ADD New Banner (POST)
        addTeam: builder.mutation({
            query: (formData) => {
                return {
                    url: "/doctor",
                    method: "POST",
                    data: formData, // ✅ Change from `body` to `data`
                    formData: true, // ✅ Ensure FormData is properly handled
                };
            },
            invalidatesTags: ["team"],
        }),
        
        
        

        // ✅ EDIT Test (PUT)
        editTeam: builder.mutation({
            query: ({ id, formData }) => ({
                url: `/doctor/${id}`,
                method: "PUT",
                data: formData, // ✅ Change from `body` to `data`
                formData: true, // ✅ Ensure FormData is properly handled
            }),
            invalidatesTags: ["team"], // ✅ Cache Refresh
        }),

        // ✅ DELETE Banner (DELETE)
        deleteDoctor: builder.mutation({
            query: (id) => ({
                url: `/doctor/${id}`,
                method: "DELETE",
            }),
            invalidatesTags: ["team"], // ✅ Cache Refresh
        }),
    }),
});

// ✅ Hooks Export (Use in Components)
export const {
    useGetAllTeamQuery,
    useAddTeamMutation,
    useEditTeamMutation,
    useDeleteDoctorMutation,
} = teamApi;
