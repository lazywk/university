// ** Redux Imports
import { AppAuthTypes } from '@/interfaces/app'
import { createSlice } from '@reduxjs/toolkit'

const initialState: AppAuthTypes = {
    isLogin: !!localStorage.getItem('isLogin'),
    token: localStorage.getItem('token') || null,
    role: localStorage.getItem('role') || null
}

export const appAuthSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        loginSuccess: (state, action) => {
            state.isLogin = true
            state.token = action.payload.token
            state.role = action.payload.role

            localStorage.setItem('isLogin', 'true')
            localStorage.setItem('token', action.payload.token)
            localStorage.setItem('role', action.payload.role)
        },
        logoutSuccess: (state) => {
            localStorage.clear()
            state.isLogin = false
            state.token = null
            state.role = null
        }
    },
})

export const {
    loginSuccess,
    logoutSuccess
} = appAuthSlice.actions

export default appAuthSlice.reducer
