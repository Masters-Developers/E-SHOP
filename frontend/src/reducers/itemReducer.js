import { ALL_ITEMS_REQUEST,ALL_ITEMS_SUCCES,ALL_ITEMS_FAIL,FIX_ERRORS,ITEM_DETAILS_SUCCESS,ITEM_DETAILS_FAIL, ITEM_DETAILS_REQUEST } from "../constants/itemsConstants";

export const itemReducer = (state ={items:[]},action)=>{
    switch(action.type){
        case ALL_ITEMS_REQUEST:
            return{
                loading:true,
                items:[]
            }
        case ALL_ITEMS_SUCCES:
            return{
                loading:false,
                items:action.payload.items,
                amount:action.payload.amount
                
            }
        case ALL_ITEMS_FAIL:
            return{
                loading:false,
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
export const itemDetailsReducer = (state ={ item: {}}, action)=>{
    switch(action.type){
        case ITEM_DETAILS_REQUEST:
            return{
                ...state,
                loading:true
            }

        case ITEM_DETAILS_SUCCESS:
            return{
                loading:false,
                item: action.payload,
            }

        case ITEM_DETAILS_FAIL:
            return{
                ...state,
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
 
 
