import Card from "../UI/Card";
import classes from "./Cart.module.css";
import CartItem from "./CartItem";
import ReactDOM from "react-dom";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { cartActions } from "../../store/cart";

const Cart = (props) => {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);

  const toggleCartHandler = () => {
    dispatch(cartActions.toggle());
  };

  const addToCartHandler = (id) => {
    dispatch(cartActions.addItem({ id }));
  };

  const removeFromCartHandler = (id) => {
    dispatch(cartActions.removeItem({ id }));
  };

  const displayCart = () => {
    const items = cartItems.filter(item => item.quantity > 0);

    if (items.length > 0) {
      return (
        <ul>
          {items.map((item) => (
            <CartItem
              item={item}
              onAddToCart={addToCartHandler.bind(this, item.id)}
              onRemoveFromCart={removeFromCartHandler.bind(this, item.id)}
            />
          ))}
          <button onClick={toggleCartHandler}>Close Cart</button>
        </ul>
      );
    } else {
      return <p>Your cart is empty!</p>
    }
  };

  const Backdrop = (props) => (
    <div className={classes.backdrop} onClick={toggleCartHandler}></div>
  );

  const ModalBody = () => (
    <Card className={classes.cart}>
      <h2>Your Shopping Cart</h2>
      {displayCart()}
    </Card>
  );

  return (
    <React.Fragment>
      {ReactDOM.createPortal(<Backdrop />, document.getElementById("backdrop"))}
      {ReactDOM.createPortal(
        <ModalBody />,
        document.getElementById("modal-root")
      )}
    </React.Fragment>
  );
};

export default Cart;
