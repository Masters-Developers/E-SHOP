import axios from "axios"

import { 
    CREATE_ORDER_REQUEST, 
    CREATE_ORDER_SUCCESS, 
    CREATE_ORDER_FAIL, 
    FIX_ERRORS 
} from "../constants/ordersConstants"

export const createOrder = (order) => async (dispatch)=>{
    try{
        dispatch({type: CREATE_ORDER_REQUEST})

        const config={
            headers:{
                "Content-Type":"application/json"
            }
        }

        const {data} = await axios.post("/api/orders/new", order, config)

        dispatch({
            type: CREATE_ORDER_SUCCESS,
            payload: data
        })
    } catch(error){
        dispatch({
            type: CREATE_ORDER_FAIL,
            payload: error.response.data.message
        })
    }
}

//Clear Errors
export const fixErrors = ()=> async (dispatch) =>{
    dispatch({
        type: FIX_ERRORS
    })
}