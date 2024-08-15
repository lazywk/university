// ** Redux Imports
import { OrdersStateDrivers } from '@/interfaces/app'
import { API_ENDPOINTS } from '@/utils/api_endpoints'
import http from '@/utils/http'
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

const initialState: OrdersStateDrivers = {
    isPending: false,
    ordersDrivers: [],
    pageCount: 1,
}

export const fetchOrdersDrivers = createAsyncThunk('settings/fetchOrdersDrivers', async (page: number) => {
    return (await http.get(API_ENDPOINTS.ORDERS_DRIVERS + `?page=${page}`)).data
})


export const ordersDriversSlice = createSlice({
    name: 'ordersDrivers',
    initialState,
    reducers: {},
    extraReducers: builder => {
        builder.
            addCase(fetchOrdersDrivers.pending, (state) => {
                state.isPending = true
            })
            .addCase(fetchOrdersDrivers.fulfilled, (state, action) => {
                state.ordersDrivers = action.payload?.results
                state.pageCount = action.payload?.count
                state.isPending = false
            })
    }
})

export const { } = ordersDriversSlice.actions


export default ordersDriversSlice.reducer
