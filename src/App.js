import { useEffect } from "react";

import Cart from "./components/Cart/Cart";
import Layout from "./components/Layout/Layout";
import Products from "./components/Shop/Products";
import { useSelector, useDispatch } from "react-redux";
import { uiActions } from "./store/ui";

function App() {
  const isCartOpen = useSelector((state) => state.ui.isCartOpen);
  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  useEffect(() => { 
    const sendCartData = async () => {
      dispatch(uiActions.showNotification({
        status: 'Pending',
        title: 'Pending...',
        message: 'Sending cart data'
      }));

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
      const responseData = await response.json();

    };
    sendCartData().catch(error => dispatch({
      status: "error",
      title: "Error!",
      message: "Sending cart data failed!",
    }));
  }, [cart, dispatch]);

  return (
    <Layout>
      {isCartOpen && <Cart />}
      <Products />
    </Layout>
  );
}

export default App;
