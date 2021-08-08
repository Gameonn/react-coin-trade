import { useEffect, useState } from "react";
import { useSelector } from 'react-redux';
import classes from "./HeaderCartButton.module.css";

const HeaderCartButton = ({onClick}) => {

  const [btnHighlighted, setBtnHighlighted] = useState(false);
  const items = useSelector(state => state.items);

  const numberofCartItems = items.reduce((curNumber, item) => curNumber + parseFloat(item.quantity), 0);
  
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
      <span className={classes.badge}>{numberofCartItems.toFixed(1)}</span>
    </button>
  );
};

export default HeaderCartButton;
