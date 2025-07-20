"use client"

import {Provider} from "react-redux" 
import { store } from "./store"

export default function storeProvider({children}:{children:React.ReactNode}){
      console.log("StoreProvider Mounted - Redux is connected.");
    return(
     <Provider  store={store}>
        {children}
     </Provider>
    )
}