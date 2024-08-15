// ** Redux Imports
import { OrdersState } from '@/interfaces/app'
import { API_ENDPOINTS } from '@/utils/api_endpoints'
import http from '@/utils/http'
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

export const fetchOrders = createAsyncThunk('settings/fetchOrders', async () => {
    return (await http.get(API_ENDPOINTS.ORDERS)).data
})

export const fetchRooms = createAsyncThunk('settings/fetchRooms', async (floorId: number) => {
    return (await http.get(`common/room-list/${floorId}/`)).data
})

export const fetchStudents = createAsyncThunk('settings/fetchStudents', async (_floorId: any) => {
    return (await http.get(`users/student/list/?pk=${_floorId}`)).data.results
})

export const createAttendence = createAsyncThunk('settings/createAttendence', async (data: any, { rejectWithValue }) => {
    try {
        const response = await http.post('', data);
        return response.data;
    } catch (err: any) {
        if (err.response) {
            return rejectWithValue(err.response.data);
        }
        return rejectWithValue(err.message);
    }
})

export const createOrders = createAsyncThunk('settings/fetchOrders', async (data: any, { rejectWithValue }) => {
    try {
        const response = await http.post(API_ENDPOINTS.ORDERS, data);
        return response.data;
    } catch (err: any) {
        if (err.response) {
            return rejectWithValue(err.response.data);
        }
        return rejectWithValue(err.message);
    }
})


const initialState: OrdersState = {
    isPending: false,
    orders: [],
    pageCount: 1,
    rooms: [],
    students: []
}


export const ordersSlice = createSlice({
    name: 'orders',
    initialState,
    reducers: {},
    extraReducers: builder => {
        builder.
            addCase(fetchOrders.pending, (state) => {
                state.isPending = true
            })
            .addCase(fetchOrders.fulfilled, (state, action) => {
                state.orders = action.payload
                state.isPending = false
            })
            .addCase(fetchRooms.pending, (state) => {
                state.isPending = true
            })
            .addCase(fetchRooms.fulfilled, (state, action) => {
                state.rooms = action.payload
                state.isPending = false
            })
            .addCase(fetchStudents.pending, (state) => {
                state.isPending = true
            })
            .addCase(fetchStudents.fulfilled, (state, action) => {
                state.students = action.payload
                state.isPending = false
            })
    }
})

export const { } = ordersSlice.actions


export default ordersSlice.reducer
