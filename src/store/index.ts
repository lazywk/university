// ** Toolkit imports
import { configureStore } from '@reduxjs/toolkit'
import { useDispatch } from 'react-redux'
import { TypedUseSelectorHook, useSelector } from 'react-redux'

// ** Reducers
import theme from './theme'
import auth from './auth'
import drivers from './drivers'
import clients from './clients'
import orders from './orders'
import ordersDrivers from './orders-drivers'
import traffics from './traffics'


// ** Reducers

export const store = configureStore({
    reducer: {
        theme,
        auth,
        drivers,
        clients,
        orders,
        ordersDrivers,
        traffics,

    },
    middleware: getDefaultMiddleware =>
        getDefaultMiddleware({
            serializableCheck: false
        })
})

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>

export const useAppDispatch = () => useDispatch<AppDispatch>()
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
