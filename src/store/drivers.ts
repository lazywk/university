// ** Redux Imports
import { DriversState } from '@/interfaces/app'
import { API_ENDPOINTS } from '@/utils/api_endpoints'
import http from '@/utils/http'
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

export const fetchDrivers = createAsyncThunk('settings/fetchDrivers', async (page?: number) => {
    return (await http.get(API_ENDPOINTS.DRIVERS + `?page=${page || 1}`)).data
})

export const fetchDriverDetail = createAsyncThunk('settings/fetchDriverDetail', async (id: number) => {
    return (await http.get(`${API_ENDPOINTS.DRIVERS}${id}/`)).data
})

export const createDriver = createAsyncThunk('settings/fetchDrivers', async (data: any, { rejectWithValue }) => {
    try {
        const response = await http.post(API_ENDPOINTS.DRIVERS, data);
        return response.data;
    } catch (err: any) {
        if (err.response) {
            return rejectWithValue(err.response.data);
        }
        return rejectWithValue(err.message);
    }
})

export const updateDriver = createAsyncThunk('settings/updateDriver', async (data: any, { rejectWithValue }) => {
    try {
        const response = await http.patch(API_ENDPOINTS.DRIVERS + `${data.id}/`, data.data);
        return response.data;
    } catch (err: any) {
        if (err.response) {
            return rejectWithValue(err.response.data);
        }
        return rejectWithValue(err.message);
    }
})

export const deleteDriver = createAsyncThunk('settings/deleteDriver', async (id: number | null) => {
    return (await http.delete(API_ENDPOINTS.DRIVERS + `${id}/`)).data
})



const initialState: DriversState = {
    isPending: false,
    drivers: [],
    driverData: null,
    pageCount: 1,
}


export const driversSlice = createSlice({
    name: 'drivers',
    initialState,
    reducers: {
        setDriverData: (state, action) => {
            state.driverData = action.payload
        }
    },
    extraReducers: builder => {
        builder.
            addCase(fetchDrivers.pending, (state) => {
                state.isPending = true
            })
            .addCase(fetchDrivers.fulfilled, (state, action) => {
                state.drivers = action.payload?.results
                state.pageCount = action.payload?.count
                state.isPending = false
            })
            .addCase(fetchDriverDetail.pending, (state) => {
                state.isPending = true
            })
            .addCase(fetchDriverDetail.fulfilled, (state, action) => {
                state.driverData = action.payload
                state.isPending = false
            })
    }
})

export const {
    setDriverData
} = driversSlice.actions


export default driversSlice.reducer
