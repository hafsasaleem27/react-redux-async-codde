import { useEffect, Fragment } from "react";

import Cart from "./components/Cart/Cart";
import Layout from "./components/Layout/Layout";
import Products from "./components/Shop/Products";
import { useSelector, useDispatch } from "react-redux";
import { uiActions } from "./store/ui";
import Notification from "./components/UI/Notification";
import { sendCartData } from "./store/cart";

let isInitial = true;

function App() {
  const isCartOpen = useSelector((state) => state.ui.isCartOpen);
  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const notification = useSelector((state) => state.ui.notification);

  useEffect(() => {
    if (isInitial) {
      isInitial = false;
      return;
    }
    dispatch(sendCartData(cart));
  }, [cart, dispatch]);

  return (
    <Fragment>
      {notification && (
        <Notification
          status={notification.status}
          title={notification.title}
          message={notification.message}
        />
      )}
      <Layout>
        {isCartOpen && <Cart />}
        <Products />
      </Layout>
    </Fragment>
  );
}

export default App;
