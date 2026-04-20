import { createAsyncThunk,createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../../helper/axiosInstance";
import {toast} from 'sonner'

const initialState = {
    loading: false,
    error: null,
    teamData: [],
    blogData:[],
    galleryData:[],
    bannerData:[]
}


export const fetchTeamData = createAsyncThunk(
    'teamData/fetchTeamData',
    async (_, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.get('/doctor');
            console.log(response);
            
            return response.data;
        } catch (error) {
            toast.error(error?.response?.data?.message || 'Failed to fetch Team');
            return rejectWithValue(error.response.data);
        }
    }
);

export const fetchBlogData = createAsyncThunk(
    'blogData/fetchBlogData',
    async (_, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.get('/blog');
            console.log(response);
            
            return response.data;
        } catch (error) {
            toast.error(error?.response?.data?.message || 'Failed to fetch Team');
            return rejectWithValue(error.response.data);
        }
    }
);

export const fetchGallery = createAsyncThunk(
    'galleryData/fetchGalleryData',
    async (_, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.get('/gallery');
    
            return response.data;
        } catch (error) {
            toast.error(error?.response?.data?.message || 'Failed to fetch Team');
            return rejectWithValue(error.response.data);
        }
    }
);


export const fetchBanner = createAsyncThunk(
    'bannerData/fetchBannerData',
    async (banner, { rejectWithValue }) => {
        try {
         
            console.log("mai aa gaya hu ");
            

            const response = await axiosInstance.get(`/banner/${banner}`)

            console.log(response);
            
    
            return response.data;
        } catch (error) {
            toast.error(error?.response?.data?.message || 'Failed to fetch Banner');
            return rejectWithValue(error.response.data);
        }
    }
);






const teamSlice = createSlice({
    name: 'teams',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchTeamData .pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchBlogData .pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchGallery .pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchBanner .pending, (state) => {
                state.loading = true;
                state.error = null;
            })



            
            .addCase(fetchTeamData .fulfilled, (state, action) => {
                state.loading = false;
                state.teamData = action?.payload?.data;
            })
            .addCase(fetchBlogData .fulfilled, (state, action) => {
                state.loading = false;
                state.blogData = action?.payload?.data;

                
            })
            .addCase(fetchGallery.fulfilled, (state, action) => {    
                state.loading = false;
                state.galleryData = action?.payload?.data;  
            })

            .addCase(fetchBanner .fulfilled, (state,action) => {
                state.loading = false;
                state.bannerData = action?.payload?.data
            })
            
            .addCase(fetchTeamData.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(fetchBlogData.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(fetchGallery.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(fetchBanner .rejected, (state,action) => {
                state.loading = false;
                state.error = action.payload;
            })
    }
});

export default teamSlice.reducer;
