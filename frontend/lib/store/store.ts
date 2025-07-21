'use client';
import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; 
import authReducer from './features/auth/authSlice';


const rootReducer = combineReducers({
  auth: authReducer,
});


const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['auth'], 
};


const persistedReducer = persistReducer(persistConfig, rootReducer);


export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, 
    }),
});


export const persistor = persistStore(store);

console.log("Initial Redux Store State:", store.getState());

store.subscribe(() => {
  console.log("Redux Store Updated:", store.getState());
});


export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
