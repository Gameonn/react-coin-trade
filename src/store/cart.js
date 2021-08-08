import * as actionTypes from './actionTypes';

const initialState = {
    coins: []
}

const reducer = (state = initialState, action) => {
    if(action.type === ADD_ITEM)
        return { ...state, counter: state.counter + 1 }

    return state;
}

export default reducer;