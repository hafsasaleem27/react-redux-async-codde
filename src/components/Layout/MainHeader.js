import CartButton from "../Cart/CartButton";
import Cart from "../Cart/Cart";
import classes from "./MainHeader.module.css";
import { useDispatch, useSelector } from "react-redux";
import { cartActions } from "../../store/cart";
import React from "react";

const MainHeader = (props) => {
  const dispatch = useDispatch();
  const isCartOpen = useSelector((state) => state.cart.isOpen);

  const toggleCartHandler = () => {
    dispatch(cartActions.toggle());
  };

  return (
    <React.Fragment>
      {isCartOpen && <Cart/>}
      <header className={classes.header}>
        <h1>ReduxCart</h1>
        <nav>
          <ul>
            <li>
              <CartButton onClick={toggleCartHandler} />
            </li>
          </ul>
        </nav>
      </header>
    </React.Fragment>
  );
};

export default MainHeader;
