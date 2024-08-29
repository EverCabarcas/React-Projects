import { useContext } from "react";
import Modal from "../UI/Modal";
import { CartContext } from "../store/CartContextProvider";
import { currencyFormatter } from "../util/formatting";
import Button from "../UI/Button";
import { UserProgressContex } from "../store/UserProgressContext";
import CartItem from "./CartItem";

export default function CartModal() {
  const { items: cartElements, addItemToCart, removeFromCart } = useContext(CartContext);
  const { progress, hideCart, showCheckout } = useContext(UserProgressContex);

  function handleClose() {
    hideCart()
  }

  function handleGoToCheckout() {
    showCheckout()
  }

  const cartTotal = cartElements.reduce((total, item)=> {
    return total + item.quantity * item.price
  }, 0)

  return (
    <Modal className="cart"
    open={progress === 'cart'}
    onClose={progress === 'cart' ? handleClose : null}>
      <h2>Your Cart</h2>
      <ul>
        {cartElements.length > 0 &&
          cartElements.map((item) => (
           <CartItem key={item.id} item={item} increase={()=> addItemToCart(item)} decrease={()=> removeFromCart(item)}/>
          ))}
      </ul>
      <p className="cart-total">{currencyFormatter.format(cartTotal)}</p>
      <p className="modal-actions">
        <Button textOnly onClick={handleClose}>
          Close
        </Button>
        {cartElements.length > 0 && <Button onClick={handleGoToCheckout} >
          Go to Checkout
        </Button>}
      </p>
    </Modal>
  );
}
