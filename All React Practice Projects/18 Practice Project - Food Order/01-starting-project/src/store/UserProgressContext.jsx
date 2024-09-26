import { createContext, useState } from "react";

 export const UserProgressContex = createContext({
  progress: "", // 'cart' 'checkout
  showCart: () => {},
  hideCart: () => {},
  showCheckout: () => {},
  hideCheckout: () => {},
});

export default function UserProgressProvider({ children }) {
  const [userProgress, setUserProgress] = useState("");

  function showCart() {
    setUserProgress("cart");
  }

  function hideCart() {
    setUserProgress("");
  }

  function showCheckout() {
    setUserProgress("checkout");
  }

  function hideCheckout() {
    setUserProgress("");
  }

  const usercntx = {
    progress: userProgress, // 'cart' 'checkout
    showCart,
    hideCart,
    showCheckout,
    hideCheckout,
  };

  return (
    <UserProgressContex.Provider value={usercntx}>
      {children}
    </UserProgressContex.Provider>
  );
}
