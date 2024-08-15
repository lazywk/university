// ** Redux Imports
import { AppStateTypes } from '@/interfaces/app'
import { createSlice } from '@reduxjs/toolkit'

const defaultTheme: any = localStorage.getItem('theme')
const menuType: any = localStorage.getItem('menuType')

const initialState: AppStateTypes = {
    theme: defaultTheme ? defaultTheme : 'light',
    defaultTheme: 'light',
    menuType: menuType || 'full'
}

export const appThemeSlice = createSlice({
    name: 'theme',
    initialState,
    reducers: {
        setTheme: (state, action) => {
            localStorage.setItem('theme', action.payload)
            state.theme = action.payload
        },
        collepseMenu: (state) => {
            if (state.menuType === 'full') {
                localStorage.setItem('menuType', 'collepse')
                state.menuType = 'collepse'
            } else {
                localStorage.setItem('menuType', 'full')
                state.menuType = 'full'
            }
        }
    },
})

export const {
    setTheme,
    collepseMenu
} = appThemeSlice.actions


export default appThemeSlice.reducer
