

//import {configureStore} from '@reduxjs/toolkit'
import { itemReducer, itemDetailsReducer, newItemReducer ,itemUpdateandDeleteReducer} from './reducers/itemReducer';
import { authReducer , forgotPasswordReducer, userReducer } from './reducers/userReducer';
import { cartReducer } from './reducers/cartReducer';
import { newOrderReducer } from './reducers/orderReducer';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
const reduce= combineReducers ({
    items:itemReducer,
    itemDetails: itemDetailsReducer,
    auth : authReducer,
    user: userReducer,
    forgotPassword: forgotPasswordReducer,
    cart: cartReducer,
    newItem: newItemReducer,
    updateDelete:itemUpdateandDeleteReducer,
    neworder:newOrderReducer,
})
let initialState = {
    cart: {
        cartItems: localStorage.getItem('cartItems')
            ? JSON.parse(localStorage.getItem('cartItems'))
            : [],
        shippingInfo: localStorage.getItem('shippingInfo')
            ? JSON.parse(localStorage.getItem('shippingInfo'))
            : {}
    }
}
const middleware = [thunk]
const shop= createStore(reduce, initialState, composeWithDevTools(applyMiddleware(...middleware)))
//const shop = configureStore({reducer:reduce,initialState})
export default shop;