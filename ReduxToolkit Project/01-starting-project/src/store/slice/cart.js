import { createSlice } from "@reduxjs/toolkit";

const cartInitialState = {
  items: [],
  showCart: false,
  totalQuantity: 0,
  totalAmount: 0,
  notification: null,
};
const cartSlice = createSlice({
  name: "cart",
  initialState: cartInitialState,
  reducers: {
    replaceCart(state, action) {
      state.totalQuantity = action.payload.totalQuantity;
      state.items = action.payload.items;
    },
    addItem(state, action) {
      const items = state.items;
      const newItem = action.payload;
      const itemFind = items.find((item) => item.id === newItem.id);
      state.totalQuantity++;

      if (itemFind) {
        itemFind.quantity++;
        itemFind.totalPrice = itemFind.totalPrice + newItem.price;
      } else {
        state.items.push({
          id: newItem.id,
          price: newItem.price,
          quantity: 1,
          totalPrice: newItem.price,
          title: newItem.title,
        });
      }
    },
    deleteItem(state, action) {
      const id = action.payload;
      const existingItem = state.items.find((item) => item.id === id);
      state.totalQuantity--;
      if (existingItem.quantity === 1) {
        state.items = state.items.filter((item) => item.id !== id);
      } else {
        existingItem.quantity--;
        existingItem.totalPrice = existingItem.totalPrice - existingItem.price;
      }
    },
    showCart(state) {
      state.showCart = !state.showCart;
    },
    showNotification(state, action) {
      state.notification = {
        status: action.payload.status,
        title: action.payload.title,
        message: action.payload.message,
      };
    },
  },
});

export const cartAtions = cartSlice.actions;

export default cartSlice.reducer;
