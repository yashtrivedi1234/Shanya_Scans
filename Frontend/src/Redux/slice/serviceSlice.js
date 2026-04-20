import { createAsyncThunk,createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../../helper/axiosInstance";
import {toast} from 'sonner'

const initialState = {
    loading: false,
    error: null,
    serviceData: [],
    serviceDetailData:[],
    moreServiceData:[]
}


// Async thunks
export const fetchServiceData = createAsyncThunk(
    'serviceData/fetchServiceData',
    async (_, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.get('/service');
            console.log(response);
            
            return response.data;
        } catch (error) {
            toast.error(error?.response?.data?.message || 'Failed to fetch rates');
            return rejectWithValue(error.response.data);
        }
    }
);

export const fetchServiceDetails = createAsyncThunk(
    'serviceDetailSpeciificData/fetchServicesSpecificDetail',
    async (id, { rejectWithValue }) => {
        try {

            const response = await axiosInstance.get(`/service/detail/${id}`);
            console.log(response);
            
            return response.data;
        } catch (error) {
            toast.error(error?.response?.data?.message || 'Failed to fetch Service Id');
            return rejectWithValue(error.response.data);
        }
    }
);

export const fetchServiceSpecificDetails = createAsyncThunk(
    'serviceDetailData/fetchServicesDetail',
    async (slug, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.get(`/service/detail/specific/${slug}`);
        
            return response.data;
        } catch (error) {
            // toast.error(error?.response?.data?.message || 'Failed to fetch Service Details');
            return rejectWithValue(error.response.data);
        }
    }
);

export const fetchServiceDetailMore = createAsyncThunk(
    'serviceDetailSpeciificDataMore/fetchServicesSpecificDetailMore',
    async (id, { rejectWithValue }) => {
        try {
            
            const response = await axiosInstance.get(`/service/detail/service`);
            return response.data;

        } catch (error) {
            toast.error(error?.response?.data?.message || 'Failed to fetch Service Id');
            return rejectWithValue(error.response.data);
        }
    }
);


export const addService = createAsyncThunk(
    'serviceData/addService',
    async (serviceName, { rejectWithValue }) => {


        try {

            // console.log("add package is",data);
            
            const response = await axiosInstance.post('/service',serviceName);
            console.log(response);
            
            return response.data;
        } catch (error) {
            toast.error(error?.response?.data?.message || 'Failed to fetch rates');
            return rejectWithValue(error.response.data);
        }
    }
);

export const addServiceDetail = createAsyncThunk(
    'serviceDetailData/addServiceDetail',
    async ({data}, { rejectWithValue }) => {


        try {

            // console.log("add package is",data);

            console.log(data);
             
            const formData=new FormData()

            formData.append("serviceDetailName",data.serviceName)
            formData.append("serviceDetail",data.description)
            formData.append("servicePhoto",data.servicePhoto)

            console.log("form data is",formData);
            
            
            const response = await axiosInstance.post(`/service/detail/${data.serviceId}`,formData);
            console.log("responsive completed");
            
            console.log(response);
            
            return response.data;
        } catch (error) {
            console.log(error);
            
            toast.error(error?.response?.data?.message || 'Failed to Add Service Details');
            return rejectWithValue(error.response.data);
        }
    }
);


const serviceSlice = createSlice({
    name: 'services',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchServiceData .pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchServiceDetails .pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchServiceSpecificDetails .pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchServiceDetailMore .pending, (state) => {
                state.loading = true;
                state.error = null;
            })




            .addCase(fetchServiceData .fulfilled, (state, action) => {
                state.loading = false;
                state.serviceData = action?.payload?.data;
            })
            .addCase(fetchServiceDetails .fulfilled, (state, action) => {
                state.loading = false;
                state.serviceDetailData = action?.payload?.data;
            })
            .addCase(fetchServiceSpecificDetails .fulfilled, (state, action) => {
                state.loading = false;
                state.serviceDetailData = action?.payload?.data;
            })
            .addCase(fetchServiceDetailMore .fulfilled, (state, action) => {
                state.loading = false;
                state.moreServiceData = action?.payload?.data;
            })



            
            .addCase(fetchServiceData .rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(fetchServiceDetails .rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(fetchServiceSpecificDetails.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(fetchServiceDetailMore.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
    }
});

export default serviceSlice.reducer;
