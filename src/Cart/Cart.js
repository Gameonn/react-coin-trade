import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import Modal from '../UI/Modal';
import CartItem from './CartItem';
import classes from './Cart.module.css';
import { ADD_ITEM, REMOVE_ITEM, CLEAR_CART } from '../store/actionTypes';
import Checkout from './Checkout';

const Cart = ({onClose}) => {
    const dispatch = useDispatch();
    const items = useSelector(state => state.items);
    const amount = useSelector(state => state.totalAmount);
    const totalAmount = amount.toFixed(2);
    const [isCheckout, setIsCheckout] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [didSubmit, setDidSubmit] = useState(false);
    const hasItems = items.length > 0;

    const cartItemRemoveHandler = id => {
      dispatch({type: REMOVE_ITEM, 'payload': {id, quantity: 0.2}});
    }

    const cartItemAddHandler = ({ id, name, price }) => {
      dispatch({type: ADD_ITEM, 'payload': {id, name, price, quantity: 0.2}});
    }

    const cartItems = (
        <ul className={classes['cart-items']}>
          {items.map((item) => (
            <CartItem
              key={item.id}
              name={item.name}
              amount={item.quantity}
              price={item.price}
              onRemove={() => cartItemRemoveHandler(item.id)}
              onAdd={() => cartItemAddHandler(item)}
            />
          ))}
        </ul>
    );

    const submitOrderHandler = async (userData) => {
      setIsSubmitting(true);
      await fetch('https://react-my-burger-ef74e.firebaseio.com/cartData.json',{
        method: 'POST', body: JSON.stringify({user: userData, items})
      })
      setIsSubmitting(false);
      setDidSubmit(true);
      dispatch({type: CLEAR_CART});
    };
    
    const cartContent = (
      <>
        {cartItems}
        <div className={classes.total}>
          <span>Total Amount</span>
          <span>{totalAmount}</span>
        </div>
        {isCheckout && <Checkout onConfirm={submitOrderHandler} onCancel={onClose} />}
        {!isCheckout && <div className={classes.actions}>
          <button className={classes['button--alt']} onClick={onClose}>
            Close
          </button>
          {hasItems && <button className={classes.button} onClick={()=> setIsCheckout(true)}>Order</button>}
        </div>}
      </>
    );

    const isSubmittingModalContent = <p>Sending order data...</p>;

    const didSubmitModalContent = (
      <>
        <p>Successfully sent the order!</p>
        <div className={classes.actions}>
          <button className={classes.button} onClick={onClose}> Close </button>
        </div>
      </>
    );
    

  return (
    <Modal onConfirm={onClose}>
      { !isSubmitting && !didSubmit && cartContent}
      { isSubmitting && !didSubmit && isSubmittingModalContent}
      { !isSubmitting && didSubmit && didSubmitModalContent}
    </Modal>
  );
};

export default Cart;