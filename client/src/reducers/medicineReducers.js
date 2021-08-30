import {
    CREATE_MEDICINE_FAIL,
    CREATE_MEDICINE_REQUEST,
    CREATE_MEDICINE_RESET,
    CREATE_MEDICINE_SUCCESS,
    LIST_MEDICINE_FAIL,
    LIST_MEDICINE_REQUEST,
    LIST_MEDICINE_RESET,
    LIST_MEDICINE_SUCCESS,
    DELETE_MEDICINE_FAIL,
    DELETE_MEDICINE_REQUEST,
    DELETE_MEDICINE_SUCCESS,
    UPDATE_MEDICINE_FAIL,
    UPDATE_MEDICINE_REQUEST,
    UPDATE_MEDICINE_RESET,
    UPDATE_MEDICINE_SUCCESS,
    DETAILS_MEDICINE_FAIL,
    DETAILS_MEDICINE_REQUEST,
    DETAILS_MEDICINE_SUCCESS,
    LIST_TYPE_ENUMS_FAIL,
    LIST_TYPE_ENUMS_REQUEST,
    LIST_TYPE_ENUMS_RESET,
    LIST_TYPE_ENUMS_SUCCESS
} from '../constants/medicineConstants'









export const medicineCreateReducer = (state = {}, action) => {
    switch (action.type) {
        case CREATE_MEDICINE_REQUEST:
            return { loading: true }
        case CREATE_MEDICINE_SUCCESS:
            return { loading: false, success: true, medicine: action.payload }
        case CREATE_MEDICINE_FAIL:
            return { loading: false, error: action.payload }
        case CREATE_MEDICINE_RESET:
            return {}
        default:
            return state
    }
}


export const medicineListReducer = (state = { medicines: [] }, action) => {
    switch (action.type) {
        case LIST_MEDICINE_REQUEST:
            return {
                loading: true,
            }
        case LIST_MEDICINE_SUCCESS:
            return {
                loading: false,
                medicines: action.payload,
            }
        case LIST_MEDICINE_FAIL:
            return {
                loading: false,
                error: action.payload,
            }
        case LIST_MEDICINE_RESET:
            return { medicines: [] }
        default:
            return state
    }
}


export const medicineDeleteReducer = (state = {}, action) => {
    switch (action.type) {
        case DELETE_MEDICINE_REQUEST:
            return { loading: true }
        case DELETE_MEDICINE_SUCCESS:
            return { loading: false, success: true }
        case DELETE_MEDICINE_FAIL:
            return { loading: false, error: action.payload }
        default:
            return state
    }
}


export const medicineUpdateReducer = (state = { medicine: {} }, action) => {

    switch (action.type) {
        case UPDATE_MEDICINE_REQUEST:
            return { loading: true }
        case UPDATE_MEDICINE_SUCCESS:
            return { loading: false, success: true, medicine: action.payload }
        case UPDATE_MEDICINE_FAIL:
            return { loading: false, error: action.payload }
        case UPDATE_MEDICINE_RESET:
            return { medicine: {} }
        default:
            return state
    }
}


export const medicineDetailsReducer = (
    state = { medicine: {} },
    action
) => {
    switch (action.type) {
        case DETAILS_MEDICINE_REQUEST:
            return { ...state, loading: true }
        case DETAILS_MEDICINE_SUCCESS:
            return { loading: false, medicine: action.payload }
        case DETAILS_MEDICINE_FAIL:
            return { loading: false, error: action.payload }
        default:
            return state
    }
}


export const medicineTypeListReducer = (state = { types: [] }, action) => {
    switch (action.type) {
        case LIST_TYPE_ENUMS_REQUEST:
            return {
                loading: true,
            }
        case LIST_TYPE_ENUMS_SUCCESS:
            return {
                loading: false,
                types: action.payload,
            }
        case LIST_TYPE_ENUMS_FAIL:
            return {
                loading: false,
                error: action.payload,
            }
        case LIST_TYPE_ENUMS_RESET:
            return { types: [] }
        default:
            return state
    }
}