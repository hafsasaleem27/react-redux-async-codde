import { cartActions } from "./cart";
import { uiActions } from "./ui";

export const fetchCartData = () => {
  return async (dispatch) => {
    dispatch(
      uiActions.showNotification({
        status: "Pending",
        title: "Pending...",
        message: "Fetching cart data",
      })
    );

    const fetchData = async () => {
      const response = await fetch(
        "https://react-http-fe5e1-default-rtdb.firebaseio.com/cart.json"
      );

      if (!response.ok) {
        throw new Error("Fetching cart data failed!");
      }

      const data = await response.json();
      dispatch(cartActions.replaceCart(data));

      dispatch(
        uiActions.showNotification({
          status: "success",
          title: "Success!",
          message: "Fetched cart data successfully!",
        })
      );
    };

    try {
      await fetchData();
    } catch (error) {
      dispatch(
        uiActions.showNotification({
          status: "error",
          title: "Error!",
          message: "Fetching cart data failed!",
        })
      );
    }
  };
};

export const sendCartData = (cart) => {
  return async (dispatch) => {
    dispatch(
      uiActions.showNotification({
        status: "Pending",
        title: "Pending...",
        message: "Sending cart data",
      })
    );

    const sendData = async () => {
      const response = await fetch(
        "https://react-http-fe5e1-default-rtdb.firebaseio.com/cart.json",
        {
          method: "PUT",
          body: JSON.stringify(cart),
        }
      );
      if (!response.ok) {
        throw new Error("Something went wrong!");
      }
    };

    try {
      await sendData();
      dispatch(
        uiActions.showNotification({
          status: "success",
          title: "Success!",
          message: "Cart data sent successfully!",
        })
      );
    } catch (error) {
      dispatch(
        uiActions.showNotification({
          status: "error",
          title: "Error!",
          message: "Sending cart data failed!",
        })
      );
    }
  };
};
