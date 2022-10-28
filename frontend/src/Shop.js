//import { createStore, applyMiddleware} from 'redux';
import { combineReducers } from '@reduxjs/toolkit'
//import thunk from 'redux-thunk';
import {configureStore} from '@reduxjs/toolkit'
//import { composeWithDevTools} from 'redux-devtools-extension';
import { itemReducer, itemDetailsReducer } from './reducers/itemReducer';

const reduce= combineReducers ({
    items:itemReducer,
    itemDetails: itemDetailsReducer
})

//let initialState = {}

//const middleware= [thunk]
//const Shop = createStore (reducer, initialState, composeWithDevTools(applyMiddleware(...middleware)))
const shop = configureStore({reducer:reduce})
//export default Shop;
export default shop;