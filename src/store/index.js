import { createStore, applyMiddleware, compose } from 'redux';
import cartReducer from './cart';

// const rootReducer = combineReducers({
//     cartReducer,
// });

const logger = store => {
    return next => {
       return action => {
        //   console.log('[middleware] dispatching ', action);
          const result = next(action);
        //   console.log('[Middleware] next state ', store.getState());
          return result;
       }
    }
 }

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(cartReducer, composeEnhancers(applyMiddleware(logger)));

export default store;