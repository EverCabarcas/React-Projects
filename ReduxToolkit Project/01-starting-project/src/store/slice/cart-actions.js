import { cartAtions } from "./cart";
import { uiActions } from "./ui-slice";

const DUMMY_PRODUCTS = [
    {
      id: "p1",
      price: 6,
      title: "My First Book",
      description: "The first book I ever wrote",
    },
    {
      id: "p2",
      price: 5,
      title: "My Second Book",
      description: "The second book I ever wrote",
    },
  ];

export const fetCartData = () => {
  return async (dispatch) => {
    const fetchData = async () => {
      const response = await fetch("https://api.restful-api.dev/objects");

      if(!response.ok){
        throw new Error('error fetching data')
      }
      const data = await response.json()

      return data;
    };

    try {
        const cartData = await fetchData(); // esto debe tener la estructura para el replace
        console.log(cartData)
        //dispatch(cartAtions.replaceCart(cartData)) // lo voy a comentar por que en el ejemplo la respuesta del backend nos trae la estrcutura pero aca no
    } catch (error) {
        dispatch(
            uiActions.showNotification({
              status: 'error',
              title: 'Error!',
              message: 'Fetching cart data failed!',
            })
          );
    }
  };
};


export const sendCartData = (cart) => {
    return async (dispatch) => {
      dispatch(
        uiActions.showNotification({
          status: 'pending',
          title: 'Sending...',
          message: 'Sending cart data!',
        })
      );
  
      const sendRequest = async () => {
        const response = await fetch(
          'https://react-http-6b4a6.firebaseio.com/cart.json',
          {
            method: 'PUT',
            body: JSON.stringify({
              items: cart.items,
              totalQuantity: cart.totalQuantity,
            }),
          }
        );
  
        if (!response.ok) {
          throw new Error('Sending cart data failed.');
        }
      };
  
      try {
        await sendRequest();
  
        dispatch(
          uiActions.showNotification({
            status: 'success',
            title: 'Success!',
            message: 'Sent cart data successfully!',
          })
        );
      } catch (error) {
        dispatch(
          uiActions.showNotification({
            status: 'error',
            title: 'Error!',
            message: 'Sending cart data failed!',
          })
        );
      }
    };
  };
