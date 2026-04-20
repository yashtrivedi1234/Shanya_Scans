import { createApi } from "@reduxjs/toolkit/query/react";
import axiosBaseQuery from "./axiosBaseQuery";

export const authApi = createApi({
    reducerPath: "authApi",
    baseQuery: axiosBaseQuery,
    tagTypes: ["login"], // ✅ Ensure it matches invalidatesTags

    endpoints: (builder) => ({


        login: builder.mutation({
            query: (data) => ({
                url: `/admin/login`,
                method: "POST",
                data,
                credentials: 'include'
            }),
            invalidatesTags: ["login"], // ✅ Ensure it matches tagTypes
        }),

        logout: builder.mutation({
            query: () => ({
                url: `/admin/logout`,
                method: "POST",
                credentials: 'include'
            }),
            invalidatesTags: ["login1"], // ✅ Ensure it matches tagTypes
        }),

        isLogin: builder.mutation({
            query: () => ({
                url: `/admin/isLogin`,
                method: "POST",
                credentials: 'include'
            }),
            invalidatesTags: ["login2"], // ✅ Ensure it matches tagTypes
        }),



    }),
});

export const {
    useLoginMutation,
    useLogoutMutation,
    useIsLoginMutation
} = authApi;
