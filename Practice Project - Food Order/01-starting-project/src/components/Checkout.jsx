import { useContext } from "react";
import Modal from "../UI/Modal";
import { CartContext } from "../store/CartContextProvider";
import { currencyFormatter } from "../util/formatting";
import Input from "../UI/Input";
import Button from "../UI/Button";
import { UserProgressContex } from "../store/UserProgressContext";
import { createOrder } from "../http";
import useHttp from "../hooks/useHttp";
import Error from './Error'

const config = {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
};

export default function Checkout() {
  const { items: cartElements, clearCart} = useContext(CartContext);
  const { progress, hideCheckout } = useContext(UserProgressContex);

  const { data, isLoading, error, sendRequest, clearData } = useHttp(
    "http://localhost:3000/orders",
    config);

  const cartTotal = cartElements.reduce((total, item) => {
    return total + item.quantity * item.price;
  }, 0);

  function handleClose() {
    hideCheckout();
  }

  function handleFinish(){
    hideCheckout();
    clearCart();
    clearData();
  }

  function handleSubmmit(event) {
    event.preventDefault();
    const data = new FormData(event.target);
    const customerData = Object.fromEntries(data.entries());

    sendRequest(
      JSON.stringify({
        order: {
          items: cartElements,
          customer: customerData,
        },
      })
    );
  }

  let actions = <>
  <Button type="button" textOnly onClick={handleClose}>
            Close
          </Button>
          <Button>Submit Order</Button>
  </>

  if(isLoading){
    actions = <span>Sending order data</span>
  }

  if(data && !error){
    return <Modal open={progress === 'checkout'} onClose={handleFinish}>
      <h2>Sucess!</h2>
      <p>Your order was submmited successfully.</p>
      <p>We will get back to you with more details via email within the next few minutes. </p>
      <p className="modal-actions">
        <Button onClick={handleFinish}>Okay</Button>
      </p>
    </Modal>
  }
  return (
    <Modal open={progress === "checkout"} onClose={handleClose}>
      <form onSubmit={handleSubmmit}>
        <h2>title</h2>
        <p>Total Amount: {currencyFormatter.format(cartTotal)}</p>
        <Input label="Full Name" type="text" id="name" />
        <Input label="E-Mail Address" type="email" id="email" />
        <Input label="Street" type="text" id="street" />
        <div className="control-row">
          <Input label="Postal Code" type="text" id="postal-code" />
          <Input label="City" type="text" id="city" />
        </div>
        {error && <Error title="Failed to submit order" message={error} />}
        <p className="modal-actions">
          {actions}
        </p>
      </form>
    </Modal>
  );
}
