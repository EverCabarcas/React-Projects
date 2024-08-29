import { createContext, useReducer } from "react";

export const CartContext = createContext({
  items: [],
  addItemToCart: () => {},
  updateItemQuantity: () => {},
  clearCart: () => {},
});

function CartReducer(state, actions) {
  if (actions.type === "ADD_ITEM") {
    const items = [...state.items];
    const itemIndex = items.findIndex((item) => item.id === actions.payload.id);
    const existingItem = items[itemIndex];
    if (existingItem) {
      const updatedItem = {
        ...existingItem,
        quantity: existingItem.quantity + 1,
      };
      items[itemIndex] = updatedItem;
    } else {
      items.push({
        ...actions.payload,
        quantity: 1,
      });
    }

   

    return {
      ...state,
      items,
    };
  }

  if(actions.type === 'REMOVE_ITEM'){
    const items = [...state.items]
    const itemIndex = items.findIndex((item) => item.id === actions.payload.id);
    const item = items[itemIndex];
    if(item.quantity === 1){
      items.splice(itemIndex, 1)
    } else {
      const updatedItem = {
        ...item,
        quantity: item.quantity - 1,
      };
      items[itemIndex] = updatedItem;
    }

    return {
      ...state,
      items,
    }
  }

  if(actions.type === 'CLEAR_CART'){
    return {...state, items: []}
  }

  return state;
}

export default function CartContextProvider({ children }) {
  const [cartState, cartDispatch] = useReducer(CartReducer, {
    items: [],
  });

  function handleAddToCart(item) {
    cartDispatch({
      type: "ADD_ITEM",
      payload: item,
    });
  }

  function handleRemoveFromCart(item){
    cartDispatch({
      type: 'REMOVE_ITEM',
      payload: item
    })
  }

  function handleClearCart(){
    cartDispatch({
      type: "CLEAR_CART"
    })
  }

  const ctxValue = {
    items: cartState.items,
    addItemToCart: handleAddToCart,
    removeFromCart: handleRemoveFromCart,
    clearCart: handleClearCart,
  };

  return (
    <CartContext.Provider value={ctxValue}>{children}</CartContext.Provider>
  );
}
