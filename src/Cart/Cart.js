import { useContext, useState } from 'react';

import Modal from '../UI/Modal';
import CartItem from './CartItem';
import classes from './Cart.module.css';
import CartContext from '../store/cart-context';
import Checkout from './Checkout';

const Cart = ({onClose, items}) => {
    const cartCtx = useContext(CartContext);
    const [isCheckout, setIsCheckout] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [didSubmit, setDidSubmit] = useState(false);
    const totalAmount = `$${cartCtx.totalAmount.toFixed(2)}`;
    const hasItems = cartCtx.items.length > 0;

    const cartItemRemoveHandler = id => {
      return cartCtx.removeItem(id);
    }

    const cartItemAddHandler = item => {
      return cartCtx.addItem({...item, amount: 1});
    }

    const cartItems = (
        <ul className={classes['cart-items']}>
          {cartCtx.items.map((item) => (
            <CartItem
              key={item.id}
              name={item.name}
              amount={item.amount}
              price={item.price}
              onRemove={cartItemRemoveHandler.bind(null, item.id)}
              onAdd={cartItemAddHandler.bind(null, item)}
            />
          ))}
        </ul>
    );

    const submitOrderHandler = async (userData) => {
      setIsSubmitting(true);
      await fetch('https://react-my-burger-ef74e.firebaseio.com/cartData.json',{
        method: 'POST', body: JSON.stringify({user: userData, items: cartCtx.items})
      })
      setIsSubmitting(false);
      setDidSubmit(true);
      cartCtx.clearCart();
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