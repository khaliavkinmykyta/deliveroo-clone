import { configureStore } from '@reduxjs/toolkit'
import basketReducer from './features/basketSlice'

// we create our global store and specify our reducer-> name store A : reducer export Slice
export const store = configureStore({
  reducer: {
    basket: basketReducer,
  },
})