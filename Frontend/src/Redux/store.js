import { configureStore } from '@reduxjs/toolkit';
import packageSliceReducer from './slice/package.slice';
import serviceSliceReducer from './slice/serviceSlice';
import testSliceReducer from './slice/testSlice';
import teamSliceReducer from './slice/teamSlice';
import cartSliceReducer from './slice/addCart.slice';
import razorpaySliceReducer from './slice/razorSlice';
import { testApi } from '../pages/rtk/testApi'; // ✅ RTK Query import

const store = configureStore({
  reducer: {
    package: packageSliceReducer,
    service: serviceSliceReducer,
    test: testSliceReducer,
    team: teamSliceReducer,
    cart: cartSliceReducer,
    razorpay: razorpaySliceReducer,
    [testApi.reducerPath]: testApi.reducer, // ✅ RTK Query reducer add kiya
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(testApi.middleware), // ✅ Middleware bhi add kiya
  devTools: true,
});

export default store;
