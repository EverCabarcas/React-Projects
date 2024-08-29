import { configureStore } from "@reduxjs/toolkit";
import CartReducer from '../store/slice/cart'
import UiReducer from '../store/slice/ui-slice'


const generalStore = configureStore({
    reducer: {cart: CartReducer, ui: UiReducer}
});

export default generalStore;