import counterReducers from "../components/Slices/sliceCounter"
import { configureStore } from "@reduxjs/toolkit";
import addtocart from "../components/Addtocart/cart"

export const store = configureStore ({
    reducer :{ 
        counter: counterReducers,
        cart:addtocart,
    }
});