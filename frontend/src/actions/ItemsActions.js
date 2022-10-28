import axios from 'axios';
import { ALL_ITEMS_REQUEST,ALL_ITEMS_SUCCES,ALL_ITEMS_FAIL,FIX_ERRORS,ITEM_DETAILS_REQUEST,ITEM_DETAILS_SUCCESS,ITEM_DETAILS_FAIL } from "../constants/itemsConstants";

export const getItems = () => async(dispatch) => {
    try{
        dispatch({type:ALL_ITEMS_REQUEST})
        const {data} = await axios.get('/api/items')
        dispatch({
            type:ALL_ITEMS_SUCCES,
            payload:data
        })
        return data;
    }catch(error){
        dispatch({
            type:ALL_ITEMS_FAIL,
            payload:error.response.data.message
        })
        return error;
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

//FIX_ERRORS
export const fixErrors = () => async(dispatch) =>{
    dispatch({
        type:FIX_ERRORS
    })

}