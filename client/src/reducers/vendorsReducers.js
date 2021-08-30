import {
    VENDORS_DELETE_FAIL,
    VENDORS_DELETE_REQUEST,
    VENDORS_DELETE_SUCCESS,
    LIST_VENDORS_FAIL,
    LIST_VENDORS_REQUEST,
    LIST_VENDORS_RESET,
    LIST_VENDORS_SUCCESS
} from '../constants/vendorsConstants'





export const vendorsListReducer = (state = { vendors: [] }, action) => {
    switch (action.type) {
        case LIST_VENDORS_REQUEST:
            return {
                loading: true,
            }
        case LIST_VENDORS_SUCCESS:
            return {
                loading: false,
                vendors: action.payload,
            }
        case LIST_VENDORS_FAIL:
            return {
                loading: false,
                error: action.payload,
            }
        case LIST_VENDORS_RESET:
            return { vendors: [] }
        default:
            return state
    }
}


export const vendorsDeleteReducer = (state = {}, action) => {
    switch (action.type) {
        case VENDORS_DELETE_REQUEST:
            return { loading: true }
        case VENDORS_DELETE_SUCCESS:
            return { loading: false, success: true }
        case VENDORS_DELETE_FAIL:
            return { loading: false, error: action.payload }
        default:
            return state
    }
}