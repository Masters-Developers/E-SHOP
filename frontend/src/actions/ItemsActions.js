import axios from 'axios';

import { ALL_ITEMS_REQUEST,ALL_ITEMS_SUCCES,ALL_ITEMS_FAIL,FIX_ERRORS,ITEM_DETAILS_REQUEST,ITEM_DETAILS_SUCCESS,ITEM_DETAILS_FAIL, MANAGEMENT_ITEMS_REQUEST, MANAGEMENT_ITEMS_SUCCES, MANAGEMENT_ITEMS_FAIL, NEW_ITEM_REQUEST ,NEW_ITEM_SUCCES,NEW_ITEM_FAIL
       ,UPDATE_ITEM_REQUEST,UPDATE_ITEM_SUCCESS,UPDATE_ITEM_FAIL,DELETE_ITEM_REQUEST,DELETE_ITEM_SUCCES,DELETE_ITEM_FAIL} from "../constants/itemsConstants";

export const getItems = (currentPage = 1, keyword = '',price) => async(dispatch) => {
    try{
        dispatch({type:ALL_ITEMS_REQUEST})

        let link =`/api/items?keyword=${keyword}&page=${currentPage}&price[gte]=${price[0]}&price[lte]=${price[1]}`
        const {data} = await axios.get(link)

        dispatch({
            type:ALL_ITEMS_SUCCES,
            payload:data
        })
        return data;
    }catch(error){
        dispatch({
            type:ALL_ITEMS_FAIL,
            payload: error.response.data.message
        })
        
    }
}
export const getItemDetails = (id) => async(dispatch)=>{
    try {
        dispatch({type:ITEM_DETAILS_REQUEST})

        const {data} = await axios.get(`/api/items/${id}`)

        dispatch({
            type:ITEM_DETAILS_SUCCESS,
            payload: data.item
        })
    }catch (error){
        dispatch({
            type:ITEM_DETAILS_FAIL,
            payload: error.response.data.message
        })
    }
}
export const getItemsManagement = () => async(dispatch) =>{
    try{
        dispatch({type:MANAGEMENT_ITEMS_REQUEST})
        const {data} = await axios.get('api/management/items');
        dispatch({
            type:MANAGEMENT_ITEMS_SUCCES,
            payload:data.items
        })
    }catch(error){
        dispatch({
            type:MANAGEMENT_ITEMS_FAIL,
            payload: error.response.data.message
        })
        
    }
}
export const newItem = (itemData) => async(dispatch) => {
    try{
        dispatch({type:NEW_ITEM_REQUEST})
        const config ={
            header:{'Content-Type':'application/json'}
        }
        const {data} = await axios.post('api/items/new',itemData,config)
        dispatch({
            type: NEW_ITEM_SUCCES,
            payload: data

        })
    }catch(error){
        dispatch({
            type: NEW_ITEM_FAIL,
            payload: error.response.data.message
        })
    }
}
export const updateItem = (id, itemData) => async (dispatch) =>{
    try{
        dispatch ({type: UPDATE_ITEM_REQUEST})

        const config={
            headers: {
                "Content-Type": "application/json"
            }
        }
        const {data} = await axios.put(`/api/items/${id}`,itemData, config)

        dispatch({
            type: UPDATE_ITEM_SUCCESS,
            payload: data.success
        })
        
    } catch(error){
        dispatch({
            type: UPDATE_ITEM_FAIL,
            payload: error.response.data.message
        })
    }
}
export const deleteItem= (id) => async(dispatch)=>{
    try{
        dispatch ({type: DELETE_ITEM_REQUEST})
        const {data} = await axios.delete(`/api/items/${id}`)

        dispatch({
            type: DELETE_ITEM_SUCCES,
            payload: data.success
        })
    } catch(error){
        dispatch({
            type: DELETE_ITEM_FAIL,
            payload: error.response.data.message
        })
    }
}
//FIX_ERRORS
export const fixErrors = () => async(dispatch) =>{
    dispatch({
        type:FIX_ERRORS
    })

}
