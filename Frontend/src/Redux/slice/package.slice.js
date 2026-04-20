import { createAsyncThunk,createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../../helper/axiosInstance";
import {toast} from 'sonner'

const initialState = {
    loading: false,
    error: null,
    packageData: [],
    packageDetail:[],
    packageTag:[]
}


// Async thunks
export const fetchPackageData = createAsyncThunk(
    'packageData/fetchPackageData',
    async (_, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.get('/package');
            console.log(response);
            
            return response.data;
        } catch (error) {
            toast.error(error?.response?.data?.message || 'Failed to fetch rates');
            return rejectWithValue(error.response.data);
        }
    }
);


export const fetchPackageDetails = createAsyncThunk(
    'packageData/fetchPackageDetail',
    async (slug, { rejectWithValue }) => {
        try {
       
            const response = await axiosInstance.get(`/package/more/${slug}`);
            console.log(response);
            
            return response.data;
        } catch (error) {
            // toast.error(error?.response?.data?.message || 'Failed to fetch rates');
            return rejectWithValue(error.response.data);
        }
    }
);

export const fetchPackageTag = createAsyncThunk(
    'packageTag/fetchPackageTag',
    async (slug, { rejectWithValue }) => {
        try {       
            const response = await axiosInstance.get(`/package/tag`);
        
            return response.data;
        } catch (error) {
            // toast.error(error?.response?.data?.message || 'Failed to fetch rates');
            return rejectWithValue(error.response.data);
        }
    }
);




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

export const fetchTestData = createAsyncThunk(
    'testData/fetchTestData',
    async (_, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.get('/test');
            console.log(response);
            
            return response.data;
        } catch (error) {
            toast.error(error?.response?.data?.message || 'Failed to fetch rates');
            return rejectWithValue(error.response.data);
        }
    }
);



export const addPackage = createAsyncThunk(
    'packageData/addPackage',
    async (packageName, { rejectWithValue }) => {


        try {

            // console.log("add package is",data);
            
            const response = await axiosInstance.post('/package',packageName);
            console.log(response);
            
            return response.data;
        } catch (error) {
            toast.error(error?.response?.data?.message || 'Failed to fetch rates');
            return rejectWithValue(error.response.data);
        }
    }
);


export const addPackageDetail = createAsyncThunk(
    'packageData/addPackageDetail',
    async ({data}, { rejectWithValue }) => {


        try {

            // console.log("add package is",data);
 

            const formData=new FormData()

            formData.append("packageCategory",data?.packageCategory)
            formData.append("packageDiscount",data?.packageDiscount)
            formData.append("packageName",data?.packageName)
            formData.append("packageOverview",data?.packageOverview)
            formData.append("packagePhoto",data?.packagePhoto)
            formData.append("packageRate",data?.packageRate)
            formData.append("parameterInclude",data?.parameterInclude)
            formData.append("report",data?.report)
            formData.append('parameters', JSON.stringify(data?.parameters)); // Serialize parameters

            //  formData.parameters.forEach((param, index) => {
            //     formDataToSubmit.append(`parameters[${index}][parameterName]`, param.parameterName);
            //     formDataToSubmit.append(`parameters[${index}][description]`, param.description);
            // });
          
            
            
            const response = await axiosInstance.post(`/package/detail/${data.packageId}`,formData);
            console.log(response);
            
            // console.log(response);
            
            return response.data;
        } catch (error) {
            toast.error(error?.response?.data?.message || 'Failed to fetch rates');
            return rejectWithValue(error.response.data);
        }
    }
);

export const addCv = createAsyncThunk(
    'cvData/addResume',
    async ({data}, { rejectWithValue }) => {
        try {
            

            console.log(data);
            
            const formData=new FormData()

            formData.append("contact",data?.contact)
            formData.append("currentCompany",data?.currentCompany)
            formData.append("currentDesignation",data?.currentDesignation)
            formData.append("email",data?.email)
            formData.append("highestQualification",data?.highestQualification)
            formData.append("name",data?.name)
            formData.append("position",data?.position)
            formData.append("resume",data?.resume)
            formData.append("totalExperience",data?.totalExperience)
            
            
            const response = await axiosInstance.post('/carrer',formData);
       
            
            return response.data;
        } catch (error) {
            toast.error(error?.response?.data?.message || 'Failed to fetch rates');
            return rejectWithValue(error.response.data);
        }
    }
);


export const addContact = createAsyncThunk(
    'contactData/fetchContactData',
    async ({data}, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.post('/contact',data);  

            return response.data;
        } catch (error) {
            toast.error(error?.response?.data?.message || 'Failed to add Contact');
            return rejectWithValue(error.response.data);
        }
    }
);



export const orderPlaced = createAsyncThunk(
    'checkout/orderData',
    async (formData, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.post('/order',formData);

            return response.data;
        } catch (error) {
            toast.error(error?.response?.data?.message || 'Failed to Placed Order');
            return rejectWithValue(error.response.data);
        }
    }
);


const packageSlice = createSlice({
    name: 'airpotCityRates',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchPackageData .pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchPackageDetails .pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchPackageTag .pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchPackageData .fulfilled, (state, action) => {
            
                state.loading = false;
                state.packageData = action?.payload?.data;
            })
            .addCase(fetchPackageDetails.fulfilled, (state, action) => {
            
                state.loading = false;
                state.packageDetail = action?.payload?.data;
            })
            .addCase(fetchPackageTag.fulfilled, (state, action) => {
                state.loading = false;
                state.packageTag = action?.payload?.data;
            })
            .addCase(fetchPackageData .rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(fetchPackageDetails .rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
    },
});

export default packageSlice.reducer;