import { configureStore } from "@reduxjs/toolkit";
import { testApi } from "./testApi";

export const store1 = configureStore({
    reducer: {
        [testApi.reducerPath]: testApi.reducer, // ✅ API Reducer जोड़ना
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(testApi.middleware), // ✅ API Middleware जोड़ना
});
