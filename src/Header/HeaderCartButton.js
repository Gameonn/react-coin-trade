import { useContext, useEffect, useState } from "react";
import CartContext from "../store/cart-context";
import classes from "./HeaderCartButton.module.css";

const HeaderCartButton = ({onClick}) => {

  const [btnHighlighted, setBtnHighlighted] = useState(false);
  const cartCtx = useContext(CartContext);
  const {items} = cartCtx;

  const numberofCartItems = items.reduce((curNumber, item) => curNumber + item.amount, 0);
  
  const btnClasses = `${classes.button} ${btnHighlighted ? classes.bump : ''}`;

  useEffect(() => {
    if(!items.length) return;

    setBtnHighlighted(true);
    const timer = setTimeout(() => setBtnHighlighted(false), 300);

    return () => clearTimeout(timer);
  }, [items])

  return (
    <button className={btnClasses} onClick={onClick}>
      <span className={classes.icon}>
        <i className="fas fa-cart-plus"></i>
      </span>
      <span>Your Cart</span>
      <span className={classes.badge}>{numberofCartItems}</span>
    </button>
  );
};

export default HeaderCartButton;
