import classes from "./CartButton.module.css";
import { useSelector } from "react-redux";

const CartButton = (props) => {
  const cartItems = useSelector((state) => state.cart.items);
  const quantity = cartItems.reduce(
    (prevItem, currItem) => prevItem.quantity + currItem.quantity,
    { quantity: 0 }
  );

  return (
    <button className={classes.button} onClick={props.onClick}>
      <span>My Cart</span>
      <span className={classes.badge}>{quantity}</span>
    </button>
  );
};

export default CartButton;
