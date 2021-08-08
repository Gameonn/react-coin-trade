import classes from './CartItem.module.css';

const CartItem = (props) => {
  const price = `$${parseFloat(props.price).toFixed(2)}`;

  return (
    <li className={classes['cart-item']}>
      <div>
        <h5>{props.name}</h5>
        <div className={classes.summary}>
          <span className={classes.price}>{price}</span>
          <span className={classes.amount}>x {props.amount}</span>
        </div>
      </div>
      <div className={classes.actions}>
        <button onClick={props.onRemove}>−</button>
        <button onClick={props.onAdd}>+</button>
      </div>
    </li>
  );
};

export default CartItem;