import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import axiosInstance from "../../helper/axiosInstance";

const initialState = {
  key: "",
  orderId: "",
  isPaymentsVerified: false,
  isLogin: false,
  token: localStorage.getItem("authToken") || "",
  otpSent: false,
  loading: false,
  error: null,
};

export const getRazorpayId = createAsyncThunk("/razorpay/key", async () => {
  try {
    const response = await axiosInstance.get("/payment/key");
    return response.data;
  } catch (e) {
    return e?.response?.data?.message;
  }
});

export const order = createAsyncThunk("/razorpay/purchase", async (data) => {
  try {
    const response = await axiosInstance.post("/payment/checkout", data);

    return response.data;
  } catch (e) {
    return e?.response?.data?.message;
  }
});

export const verifyPayment = createAsyncThunk(
  "/razorpay/payment-verify",
  async ({ razorpay_payment_id, razorpay_order_id, razorpay_signature }) => {
    try {
      const response = await axiosInstance.post("/payment/status", {
        razorpay_payment_id: razorpay_payment_id,
        razorpay_signature: razorpay_signature,
        razorpay_order_id: razorpay_order_id,
      });
      return response.data;
    } catch (e) {
      return e?.response?.data?.message;
    }
  }
);

export const placeOrder = createAsyncThunk("/placed/order", async (data) => {
  try {
    const response = await axiosInstance.post("/order", data);

    return response.data;
  } catch (e) {
    return e?.response?.data?.message;
  }
});

export const login = createAsyncThunk("/user/login", async (data) => {
  try {
    const response = await axiosInstance.post("/user/login/order", data);
    return response.data;
  } catch (e) {
    return e?.response?.data?.message;
  }
});

export const verification = createAsyncThunk("/user/verify", async (data) => {
  try {
    const response = await axiosInstance.post("/user/verify", data);
    return response.data;
  } catch (e) {
    return e?.response?.data?.message;
  }
});

export const isVerifyLogin = createAsyncThunk("/user/islogin", async () => {
  try {
    const response = await axiosInstance.post(
      "/user/islogin",
      {},
      { withCredentials: true }
    );
    return response.data;
  } catch (e) {
    return e?.response?.data?.message;
  }
});

export const logout = createAsyncThunk("/user/logout", async (data) => {
  try {
    const response = await axiosInstance.post("/user/logout");
    return response.data;
  } catch (e) {
    return e?.response?.data?.message;
  }
});

export const orderDetails = createAsyncThunk("/user/all/order", async () => {
  try {
    const response = await axiosInstance.get(
      "/user/all/order",
      {},
      { withCredentials: true }
    );

    return response.data;
  } catch (e) {
    return e?.response?.data?.message;
  }
});

export const phoneLogin = createAsyncThunk(
  "/auth/login",
  async (data, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post("/auth/login", data);
      return response.data;
    } catch (e) {
      return rejectWithValue(e?.response?.data);
    }
  }
);
export const phoneVerification = createAsyncThunk(
  "/auth/verify",
  async (data, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post("/auth/verify", data);
      return response.data;
    } catch (e) {
      return rejectWithValue(e?.response?.data);
    }
  }
);

const razorpaySlice = createSlice({
  name: "razorpay",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getRazorpayId.fulfilled, (state, action) => {
        state.key = action?.payload?.key;
      })
      .addCase(order.fulfilled, (state, action) => {
        // toast.success(action?.payload?.message)
        state.orderId = action?.payload?.order?.id;
      })

      .addCase(verifyPayment.fulfilled, (state, action) => {
        state.isPaymentsVerified = true;
      })

      .addCase(verifyPayment.rejected, (state, action) => {
        // toast.error(action?.payload?.message)
        state.isPaymentsVerified = action?.payload?.success;
      })
      // PHONE LOGIN (SEND OTP)
      .addCase(phoneLogin.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(phoneLogin.fulfilled, (state) => {
        state.loading = false;
        state.otpSent = true;
      })
      .addCase(phoneLogin.rejected, (state, action) => {
        state.loading = false;
        state.otpSent = false;
        state.error = action.payload;
      })

      // PHONE OTP VERIFICATION
      .addCase(phoneVerification.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(phoneVerification.fulfilled, (state, action) => {
        state.loading = false;
        state.isLogin = true;
        state.otpSent = false;
        state.token = action.payload?.token || "";

        if (action.payload?.token) {
          localStorage.setItem("authToken", action.payload.token);
        }
      })
      .addCase(phoneVerification.rejected, (state, action) => {
        state.loading = false;
        state.isLogin = false;
        state.error = action.payload;
      });
  },
});

export default razorpaySlice.reducer;
