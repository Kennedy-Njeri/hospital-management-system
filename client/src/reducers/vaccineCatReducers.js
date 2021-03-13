import {
    CREATE_VACCINE_FAIL,
    CREATE_VACCINE_REQUEST,
    CREATE_VACCINE_RESET,
    CREATE_VACCINE_SUCCESS,
    LIST_VACCINE_FAIL,
    LIST_VACCINE_REQUEST,
    LIST_VACCINE_RESET,
    LIST_VACCINE_SUCCESS,
    UPDATE_VACCINE_FAIL,
    UPDATE_VACCINE_REQUEST,
    UPDATE_VACCINE_RESET,
    UPDATE_VACCINE_SUCCESS,
    DELETE_VACCINE_FAIL,
    DELETE_VACCINE_REQUEST,
    DELETE_VACCINE_SUCCESS,
    DETAILS_VACCINE_FAIL,
    DETAILS_VACCINE_REQUEST,
    DETAILS_VACCINE_SUCCESS,
    LIST_TYPE_ENUMS_FAIL,
    LIST_TYPE_ENUMS_SUCCESS,
    LIST_TYPE_ENUMS_REQUEST,
    LIST_TYPE_ENUMS_RESET
} from '../constants/vaccineCat'









export const vaccineCatCreateReducer = (state = {}, action) => {
    switch (action.type) {
        case CREATE_VACCINE_REQUEST:
            return { loading: true }
        case CREATE_VACCINE_SUCCESS:
            return { loading: false, success: true, vaccine: action.payload }
        case CREATE_VACCINE_FAIL:
            return { loading: false, error: action.payload }
        case CREATE_VACCINE_RESET:
            return {}
        default:
            return state
    }
}


export const vaccineCatListReducer = (state = { vaccines: [] }, action) => {
    switch (action.type) {
        case LIST_VACCINE_REQUEST:
            return {
                loading: true,
            }
        case LIST_VACCINE_SUCCESS:
            return {
                loading: false,
                vaccines: action.payload,
            }
        case LIST_VACCINE_FAIL:
            return {
                loading: false,
                error: action.payload,
            }
        case LIST_VACCINE_RESET:
            return { vaccines: [] }
        default:
            return state
    }
}

export const vaccineCatDeleteReducer = (state = {}, action) => {
    switch (action.type) {
        case DELETE_VACCINE_REQUEST:
            return { loading: true }
        case DELETE_VACCINE_SUCCESS:
            return { loading: false, success: true }
        case DELETE_VACCINE_FAIL:
            return { loading: false, error: action.payload }
        default:
            return state
    }
}


export const vaccineCatUpdateReducer = (state = { vaccine: {} }, action) => {

    switch (action.type) {
        case UPDATE_VACCINE_REQUEST:
            return { loading: true }
        case UPDATE_VACCINE_SUCCESS:
            return { loading: false, success: true, vaccine: action.payload }
        case UPDATE_VACCINE_FAIL:
            return { loading: false, error: action.payload }
        case UPDATE_VACCINE_RESET:
            return { vaccine: {} }
        default:
            return state
    }
}


export const vaccineCatDetailsReducer = (
    state = { vaccine: {} },
    action
) => {
    switch (action.type) {
        case DETAILS_VACCINE_REQUEST:
            return { ...state, loading: true }
        case DETAILS_VACCINE_SUCCESS:
            return { loading: false, vaccine: action.payload }
        case DETAILS_VACCINE_FAIL:
            return { loading: false, error: action.payload }
        default:
            return state
    }
}



export const vaccineCatTypeListReducer = (state = { types: [] }, action) => {
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