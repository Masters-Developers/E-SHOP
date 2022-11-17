import { CREATE_ORDER_SUCCESS,
    CREATE_ORDER_REQUEST, CREATE_ORDER_FAIL, FIX_ERRORS} from "../constants/ordersConstants";
    
    export const newOrderReducer = (state = {}, action)=>{
        switch (action.type){
    
            case CREATE_ORDER_REQUEST:
                return{
                    ...state,
                    loading: true
                }
            case CREATE_ORDER_SUCCESS:
                return{
                    loading:false,
                    success: action.payload.success,
                    order: action.payload
                }
            case CREATE_ORDER_FAIL:
                return{
                    loading: false,
                    error: action.payload
                }
            case FIX_ERRORS:
                return{
                    ...state,
                    error:null
                }
    
            default:
                return state;
        }
    }