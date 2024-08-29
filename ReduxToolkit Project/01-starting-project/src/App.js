import { useDispatch, useSelector } from "react-redux";
import Cart from "./components/Cart/Cart";
import Layout from "./components/Layout/Layout";
import Products from "./components/Shop/Products";
import { useEffect } from "react";
import Notification from "./components/UI/Notification";
import { uiActions } from "./store/slice/ui-slice";
import { fetCartData } from "./store/slice/cart-actions";

let isInitial = true;

function App() {
  const shownCart = useSelector((state) => state.cart.showCart);
  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const notification = useSelector((state) => state.ui.notification);

  useEffect(() => {
    const sendCartData = async () => {
      dispatch(
        uiActions.showNotification({
          status: 'pending',
          title: 'Sending...',
          message: 'Sending cart data!',
        })
      );

      const response = await fetch('https://api.restful-api.dev/objects');


      // if (!response.ok) {
      //   throw new Error('Sending cart data failed.');
      // }

      dispatch(
        uiActions.showNotification({
          status: 'success',
          title: 'Success!',
          message: 'Sent cart data successfully!',
        })
      );
    };

    if (isInitial) {
      isInitial = false;
      return;
    }

    sendCartData().catch((error) => {
      dispatch(
        uiActions.showNotification({
          status: 'error',
          title: 'Error!',
          message: 'Sending cart data failed!',
        })
      );
    });
  }, [cart, dispatch]);

  useEffect(()=>{
    dispatch(fetCartData())
  },[dispatch])

  return (
    <>
      {notification && (
        <Notification
          status={notification.status}
          title={notification.title}
          message={notification.message}
        />
      )}
      <Layout>
        {shownCart && <Cart />}
        <Products />
      </Layout>
    </>
  );
}

export default App;
