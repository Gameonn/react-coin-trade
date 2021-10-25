import {ADD_ITEM, REMOVE_ITEM, CLEAR_CART} from './actionTypes';

const initialState = {
    items: [],
    totalAmount: 0,
}

const reducer = (state = initialState, action) => {
    if(action.type === ADD_ITEM) {
        const { price, quantity, id } = action.payload;
        const updatedTotalAmount = state.totalAmount + price*quantity;
        const cartItemIndex = state.items.findIndex(obj => obj.id === id);
        const cartItem = state.items[cartItemIndex];

        let updatedItems;
        if(cartItem) {
            const updatedQuantity = parseFloat(cartItem.quantity) + quantity
            const updatedItem = {...cartItem, quantity: updatedQuantity.toFixed(2)};
            updatedItems = [...state.items];
            updatedItems[cartItemIndex] = updatedItem;
        } else updatedItems = state.items.concat(action.payload);

        return { items: updatedItems, totalAmount: updatedTotalAmount };
    }
    if(action.type === REMOVE_ITEM) {
        const cartItemIndex = state.items.findIndex(obj => obj.id === action.payload.id);
        const cartItem = state.items[cartItemIndex];
        const quantity = (cartItem.quantity<action.payload.quantity) ? cartItem.quantity : action.payload.quantity;
        const updatedTotalAmount = state.totalAmount - cartItem.price*quantity;
        const updatedQuantity = cartItem.quantity - quantity;
        
        let updatedItems;
        if(updatedQuantity) {
            const updatedItem = {...cartItem, quantity: updatedQuantity.toFixed(2)};
            updatedItems = [...state.items];
            updatedItems[cartItemIndex] = updatedItem;
        } else updatedItems = state.items.filter(item => item.id !== action.payload.id);

        return {items: updatedItems, totalAmount: updatedTotalAmount};
    }
    if(action.type === CLEAR_CART) return initialState;

    return state;
}

export default reducer;