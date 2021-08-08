import React, { useReducer } from 'react';

import CartContext from './cart-context';

const defaultCartState = { items: [], totalAmount: 0  };

const cartReducer = (state, action) => {
    
    if(action.type === 'ADD') {
        const updatedTotalAmount = state.totalAmount + action.item.price * action.item.amount;
        const cartItemIndex = state.items.findIndex((obj => obj.id === action.item.id));
        const cartItem = state.items[cartItemIndex];
        let updatedItems;
        if(cartItem) {
            const updatedItem = {...cartItem, amount: cartItem.amount + action.item.amount }
            updatedItems = [...state.items];
            updatedItems[cartItemIndex] = updatedItem;
        } else updatedItems = state.items.concat(action.item);

        return { items: updatedItems, totalAmount: updatedTotalAmount };
    }
    if(action.type === 'REMOVE') {
        const cartItemIndex = state.items.findIndex((obj => obj.id === action.id));
        const cartItem = state.items[cartItemIndex];
        const updatedTotalAmount = state.totalAmount - cartItem.price;
        let updatedItems;
        if(cartItem.amount === 1) updatedItems = state.items.filter(item => item.id !== action.id)
        else {
            const updatedItem = {...cartItem, amount: cartItem.amount-1};
            updatedItems = [...state.items];
            updatedItems[cartItemIndex] = updatedItem;
        }

        return { items: updatedItems, totalAmount: updatedTotalAmount };
    }
    if(action.type === 'CLEAR') return defaultCartState;

    return defaultCartState;
};

const CartProvider = (props) => {
    const [cartState, dispatchCartAction] = useReducer(cartReducer, defaultCartState);

    const addItemToCartHandler = (item) => dispatchCartAction({type: 'ADD', item: item});

    const removeItemFromCartHandler = (id) => dispatchCartAction({type: 'REMOVE', id: id});
    const clearCartHandler = () => dispatchCartAction({type: 'CLEAR'});

    const cartContext = {
        items: cartState.items,
        totalAmount: cartState.totalAmount,
        addItem: addItemToCartHandler,
        removeItem: removeItemFromCartHandler,
        clearCart: clearCartHandler,
    }

    return (
        <CartContext.Provider value={cartContext}>
            {props.children}
        </CartContext.Provider>
    );
}

export default CartProvider;
