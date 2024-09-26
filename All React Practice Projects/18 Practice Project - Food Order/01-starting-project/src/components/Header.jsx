import { useContext } from "react";
import Logo from "../assets/logo.jpg";
import { CartContext } from "../store/CartContextProvider";
import Button from "../UI/Button";
import { UserProgressContex } from "../store/UserProgressContext";

export default function Header() {
  const { items } = useContext(CartContext);
  const { showCart } = useContext(UserProgressContex);

  
  function handleShowCart() {
    console.log('holllaaa')
    showCart()
  }
  

  const totalCartItems = items.reduce((totalOfItems, item) => {
    return totalOfItems + item.quantity;
  }, 0);
  return (
    <header id="main-header">
      <div id="title">
        <img src={Logo} alt="Food logo" />
        <h1>ReactFood</h1>
      </div>

      <nav>
        <Button textOnly onClick={handleShowCart}>
          Cart ({totalCartItems})
        </Button>
      </nav>
    </header>
  );
}
