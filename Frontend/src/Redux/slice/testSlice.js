import { createAsyncThunk,createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../../helper/axiosInstance";
import {toast} from 'sonner'

const initialState = {
    loading: false,
    error: null,
    testData: [],
    testDetailData:[],
    testSpecificDetail:[],
    testTotalPage:1,
    testTotalData:0,
    pathologyTest:[],
    pathologyDetail:{},
    pathologyTag:[],
    conversation:[],
    opening:[],
    openingDetail:{}
}


// Async thunks
export const fetchTestData = createAsyncThunk(
    'testData/fetchTestData',
    async (_, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.get('/test');
            console.log(response);
            
            return response.data;
        } catch (error) {
            toast.error(error?.response?.data?.message || 'Failed to fetch Test Data');
            return rejectWithValue(error.response.data);
        }
    }
);


export const fetchTestDetail = createAsyncThunk(
    'testDetail/fetchTestDetail',
    async (slug, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.get(`/test/service/scan/${slug}`);            
            return response.data;
        } catch (error) {
            // toast.error(error?.response?.data?.message || 'Failed to fetch Test Data');
            return rejectWithValue(error.response.data);
        }
    }
);

export const fetchTestSpecificDetail = createAsyncThunk(
    'testDetailSpecific/fetchTestDetailSpecific',
    async (slug, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.get(`/test/detail/specific/${slug}`);
            console.log(response);
            
            return response.data;
        } catch (error) {
            toast.error(error?.response?.data?.message || 'Failed to fetch Test Data');
            return rejectWithValue(error.response.data);
        }
    }
);


export const addTestDetail = createAsyncThunk(
    'testaddData/addTestDetail',
    async ({data}, { rejectWithValue }) => {


        try {
           
            console.log("slice is",data);
                        
            const response = await axiosInstance.post(`/test/detail/${data.testId}`,data);
            console.log(response);
            
            // // console.log(response);
            
            return response.data;
        } catch (error) {
            toast.error(error?.response?.data?.message || 'Failed to fetch rates');
            return rejectWithValue(error.response.data);
        }
    }
);


export const addTest = createAsyncThunk(
    'testData/addTest',
    async ({testName}, { rejectWithValue }) => {
        try {
            

            console.log("slice test name is ",testName);
            
            const formData=new FormData()
            
            formData.append("testName",testName)


            const response = await axiosInstance.post('/test',formData);
            console.log(response);
            
            return response.data;
        } catch (error) {
            toast.error(error?.response?.data?.message || 'Failed to fetch rates');
            return rejectWithValue(error.response.data);
        }
    }
);

export const fetchPathologyTest = createAsyncThunk(
    'pathologyDetail/fetchPathologyTestDetail',
    async (_, { rejectWithValue }) => {
        try {

            const response = await axiosInstance.get(`/pathology`);
                    
            return response.data;
        } catch (error) {
            // toast.error(error?.response?.data?.message || 'Failed to fetch Test Data');
            return rejectWithValue(error.response.data);
        }
    }
);

export const fetchPathologyDetails = createAsyncThunk(
    'pathologyDetail/fetchPathologyDetails',
    async (slug, { rejectWithValue }) => {
        try {
       
          const response = await axiosInstance.get(`/pathology/${slug}`);
       
            return response.data;
        } catch (error) {
            // toast.error(error?.response?.data?.message || 'Failed to fetch rates');
            return rejectWithValue(error.response.data);
        }
    }
);

export const fetchPathologyTag = createAsyncThunk(
    'pathologyTag/fetchPathologyTag',
    async (_, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.get(`/pathology/tag`);      
            return response.data;

        } catch (error) {
            // toast.error(error?.response?.data?.message || 'Failed to fetch Test Data');
            return rejectWithValue(error.response.data);
        }
    }
);




export const addConversation = createAsyncThunk(
    'conversation/addConversation',
    async (data1, { rejectWithValue }) => {
        try {
         
            const response = await axiosInstance.post(`/conversation`, data1);      
            return response.data;

        } catch (error) {
            // toast.error(error?.response?.data?.message || 'Failed to fetch Test Data');
            return rejectWithValue(error.response.data);
        }
    }
);


export const fetchConversation = createAsyncThunk(
    'conversation/addConversation',
    async (_, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.get(`/conversation`);      
            return response.data;

        } catch (error) {
            // toast.error(error?.response?.data?.message || 'Failed to fetch Test Data');
            return rejectWithValue(error.response.data);
        }
    }
);

export const deleteConversation = createAsyncThunk(
    'conversation/addConversation',
    async (_, { rejectWithValue }) => {
        try {
         
            const response = await axiosInstance.delete(`/conversation`);      
            return response.data;

        } catch (error) {
            // toast.error(error?.response?.data?.message || 'Failed to fetch Test Data');
            return rejectWithValue(error.response.data);
        }
    }
);




export const fetchOpening = createAsyncThunk(
    'opening/fetchOpening',
    async (_, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.get(`/opening`);      
            return response.data;

        } catch (error) {
            // toast.error(error?.response?.data?.message || 'Failed to fetch Test Data');
            return rejectWithValue(error.response.data);
        }
    }
);


export const fetchOpeningDetail = createAsyncThunk(
    'opening/fetchOpeningDetail',
    async (title, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.get(`/opening/${title}`);      
            return response.data;

        } catch (error) {
            // toast.error(error?.response?.data?.message || 'Failed to fetch Test Data');
            return rejectWithValue(error.response.data);
        }
    }
);




const testSlice = createSlice({
    name: 'test',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchTestData .pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchTestDetail .pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchTestSpecificDetail .pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchPathologyTest.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchPathologyDetails.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchPathologyTag.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchConversation.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchOpening.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchOpeningDetail.pending, (state) => {
                state.loading = true;
                state.error = null;
            })



            
            .addCase(fetchTestData .fulfilled, (state, action) => {
                state.loading = false;
                console.log(action)
                
                state.testData = action?.payload?.data;
            })
            .addCase(fetchTestDetail .fulfilled, (state, action) => {
                state.loading = false;
                state. testDetailData = action?.payload?.data;
                state.testTotalPage=action?.payload?.totalPages
                state.testTotalData=action?.payload?.total
   
            })
            .addCase(fetchTestSpecificDetail .fulfilled, (state, action) => {
                state.loading = false;               
                state.testSpecificDetail = action?.payload?.data;
            })
            .addCase(fetchPathologyTest .fulfilled, (state, action) => {
                state.loading = false;
                state.pathologyTest = action?.payload?.data;
            })
            .addCase(fetchPathologyDetails.fulfilled, (state,action) => {
                state.loading = false;
                state.pathologyDetail = action?.payload?.data;
                
            })
            .addCase(fetchPathologyTag.fulfilled, (state,action) => {
                state.loading = false;
                state.pathologyTag = action?.payload?.data;
            })
            .addCase(fetchConversation.fulfilled, (state,action) => {
                state.loading = false;
                state.conversation = action?.payload?.data;
            })
            .addCase(fetchOpening.fulfilled, (state,action) => {
                state.loading = false;
                state.opening = action?.payload?.data;
            })
            .addCase(fetchOpeningDetail.fulfilled, (state,action) => {
                state.loading = false;
                state.openingDetail = action?.payload?.data;
            })



            .addCase(fetchTestData.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(fetchTestDetail.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(fetchTestSpecificDetail.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(fetchPathologyTest.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(fetchPathologyDetails.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(fetchPathologyTag.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(fetchConversation.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(fetchOpening.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(fetchOpeningDetail.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })





           









    }
});
















export default testSlice.reducer;
