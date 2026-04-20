import { configureStore } from "@reduxjs/toolkit";
import { testApi } from "./testApi";
import { scanApi } from "./scanApi";
import { scanTestApi } from "./scanTestApi";
import { bannerApi } from "./bannerApi";
import { labTestApi } from "./labTestTag";
import { packageApi } from "./packageApi";
import { orderApi } from "./orderApi";
import { carrerApi } from "./carrerApi";
import { blogApi } from "./blogApi";
import { teamApi } from "./teamApi";
import { inquiryApi } from "./inquiryApi";
import { collectionApi } from "./collectionApi";
import { authApi } from "./authApi";
import { galleryApi } from "./galleryApi";

export const store = configureStore({
    reducer: {
        [testApi.reducerPath]: testApi.reducer, // ✅ API Reducer 
        [scanApi.reducerPath]: scanApi.reducer,
        [scanTestApi.reducerPath]: scanTestApi.reducer,
        [bannerApi.reducerPath]:bannerApi.reducer,
        [labTestApi.reducerPath]:labTestApi.reducer,
        [packageApi.reducerPath]:packageApi.reducer,
        [orderApi.reducerPath]:orderApi.reducer,
        [carrerApi.reducerPath]:carrerApi.reducer,
        [blogApi.reducerPath]:blogApi.reducer,
        [teamApi.reducerPath]:teamApi.reducer,
        [inquiryApi.reducerPath]:inquiryApi.reducer,
        [collectionApi.reducerPath]:collectionApi.reducer,
        [authApi.reducerPath]:authApi.reducer,
        [galleryApi.reducerPath]:galleryApi.reducer
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(testApi.middleware, scanApi.middleware,scanTestApi.middleware, bannerApi.middleware, 
            labTestApi.middleware,packageApi.middleware,orderApi.middleware,carrerApi.middleware,blogApi.middleware,
            teamApi.middleware,inquiryApi.middleware,collectionApi.middleware,authApi.middleware,galleryApi.middleware),
});
