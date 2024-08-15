// ** Redux Imports
import { ClientsState } from '@/interfaces/app'
import { API_ENDPOINTS } from '@/utils/api_endpoints'
import http from '@/utils/http'
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

const initialState: ClientsState = {
    isPending: false,
    clients: [],
    pageCount: 1,
}

export const fetchClients = createAsyncThunk('settings/fetchClients', async () => {
    return (await http.get(`${API_ENDPOINTS.CLIENTS}/list/`)).data
})



export const clientsSlice = createSlice({
    name: 'clients',
    initialState,
    reducers: {},
    extraReducers: builder => {
        builder.
            addCase(fetchClients.pending, (state) => {
                state.isPending = true
            })
            .addCase(fetchClients.fulfilled, (state, action) => {
                state.clients = action.payload?.results
                state.pageCount = action.payload?.count
                state.isPending = false
            })
    }
})

export const { } = clientsSlice.actions


export default clientsSlice.reducer
