// ** Redux Imports
import { TrafficsState } from '@/interfaces/app'
import { API_ENDPOINTS } from '@/utils/api_endpoints'
import http from '@/utils/http'
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

const initialState: TrafficsState = {
    isPending: false,
    traffics: [],
    pageCount: 1,
}

export const fetchTraffics = createAsyncThunk('settings/fetchTraffics', async ({ page, search }: { page: number, search: string }) => {
    return (await http.get(`${API_ENDPOINTS.TRAFFICS}?page=${page}&search=${search}`)).data
})



export const clientsSlice = createSlice({
    name: 'traffics',
    initialState,
    reducers: {},
    extraReducers: builder => {
        builder.
            addCase(fetchTraffics.pending, (state) => {
                state.isPending = true
            })
            .addCase(fetchTraffics.fulfilled, (state, action) => {
                state.traffics = action.payload?.results
                state.pageCount = action.payload?.count
                state.isPending = false
            })
    }
})

export const { } = clientsSlice.actions


export default clientsSlice.reducer
