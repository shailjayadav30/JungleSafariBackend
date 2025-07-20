"use client"
import {configureStore} from "@reduxjs/toolkit"
import authReducer from "./features/auth/authSlice"
export const store=configureStore({
    reducer:{
        auth:authReducer
    }
})
console.log("Initial Redux Store State:", store.getState());

store.subscribe(() => {
  console.log("Redux Store Updated:", store.getState());
});


export type Rootstate=ReturnType<typeof store.getState>
export type AppDispatch=typeof store.dispatch

