"use client"

import {Provider} from "react-redux" 
import { PersistGate } from 'redux-persist/integration/react';
import { persistor, store } from "./store"
import Loading from "../../app/loading"

export default function storeProvider({children}:{children:React.ReactNode}){
      console.log("StoreProvider Mounted - Redux is connected.");
    return(
     <Provider  store={store}>
      <PersistGate loading={<Loading/>} persistor={persistor}></PersistGate>
        {children}

     </Provider>
    )
}