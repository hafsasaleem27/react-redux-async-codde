import Card from "../UI/Card";
import classes from "./Cart.module.css";
import CartItem from "./CartItem";
import ReactDOM from "react-dom";
import React from "react";
import { useDispatch } from "react-redux";
import { cartActions } from "../../store/cart";

const Cart = (props) => {
  const dispatch = useDispatch();
  const toggleCartHandler = () => {
    dispatch(cartActions.toggle());
  };

  const Backdrop = (props) => <div className={classes.backdrop} onClick={toggleCartHandler}></div>;

  const ModalBody = () => (
    <Card className={classes.cart}>
      <h2>Your Shopping Cart</h2>
      <ul>
        <CartItem
          item={{ title: "Test Item", quantity: 3, total: 18, price: 6 }}
        />
        <button onClick={toggleCartHandler}>Close Cart</button>
      </ul>
    </Card>
  );

  return (
    <React.Fragment>
      {ReactDOM.createPortal(<Backdrop/>, document.getElementById("backdrop"))}
      {ReactDOM.createPortal(<ModalBody/>, document.getElementById("modal-root"))}
    </React.Fragment>
  );
};

export default Cart;
