import {
    PRESCRIPTION__CREATE_RESET,
    PRESCRIPTION_CREATE_FAIL,
    PRESCRIPTION_CREATE_REQUEST,
    PRESCRIPTION_CREATE_SUCCESS,
    LIST_PRESCRIPTION_FAIL,
    LIST_PRESCRIPTION_REQUEST,
    LIST_PRESCRIPTION_RESET,
    LIST_PRESCRIPTION_SUCCESS,
    PRESCRIPTION_DELETE_FAIL,
    PRESCRIPTION_DELETE_REQUEST,
    PRESCRIPTION_DELETE_SUCCESS,
    LIST_PRESCRIPTION_ENUMS_FAIL,
    LIST_PRESCRIPTION_ENUMS_REQUEST,
    LIST_PRESCRIPTION_ENUMS_RESET,
    LIST_PRESCRIPTION_ENUMS_SUCCESS,
    UPDATE_PRESCRIPTION_FAIL,
    UPDATE_PRESCRIPTION_REQUEST,
    UPDATE_PRESCRIPTION_RESET,
    UPDATE_PRESCRIPTION_SUCCESS,
    PRESCRIPTION_DETAILS_REQUEST,
    PRESCRIPTION_DETAILS_SUCCESS,
    PRESCRIPTION_DETAILS_FAIL,
    LIST_PAID_ENUMS_FAIL,
    LIST_PAID_ENUMS_REQUEST,
    LIST_PAID_ENUMS_RESET,
    LIST_PAID_ENUMS_SUCCESS,
    PRESCRIPTION_USER_DETAILS_FAIL,
    PRESCRIPTION_USER_DETAILS_REQUEST,
    PRESCRIPTION_USER_DETAILS_SUCCESS
} from '../constants/prescriptionConstants'







export const prescriptionCreateReducer = (state = {}, action) => {
    switch (action.type) {
        case PRESCRIPTION_CREATE_REQUEST:
            return { loading: true }
        case PRESCRIPTION_CREATE_SUCCESS:
            return { loading: false, success: true, prescription: action.payload }
        case PRESCRIPTION_CREATE_FAIL:
            return { loading: false, error: action.payload }
        case PRESCRIPTION__CREATE_RESET:
            return {}
        default:
            return state
    }
}

export const prescriptionListReducer = (state = { prescriptions: [] }, action) => {
    switch (action.type) {
        case LIST_PRESCRIPTION_REQUEST:
            return {
                loading: true,
            }
        case LIST_PRESCRIPTION_SUCCESS:
            return {
                loading: false,
                prescriptions: action.payload,
            }
        case LIST_PRESCRIPTION_FAIL:
            return {
                loading: false,
                error: action.payload,
            }
        case LIST_PRESCRIPTION_RESET:
            return { prescriptions: [] }
        default:
            return state
    }
}


export const prescriptionDeleteReducer = (state = {}, action) => {
    switch (action.type) {
        case PRESCRIPTION_DELETE_REQUEST:
            return { loading: true }
        case PRESCRIPTION_DELETE_SUCCESS:
            return { loading: false, success: true }
        case PRESCRIPTION_DELETE_FAIL:
            return { loading: false, error: action.payload }
        default:
            return state
    }
}


export const prescriptionEnumsListReducer = (state = { enums: [] }, action) => {
    switch (action.type) {
        case LIST_PRESCRIPTION_ENUMS_REQUEST:
            return {
                loading: true,
            }
        case LIST_PRESCRIPTION_ENUMS_SUCCESS:
            return {
                loading: false,
                enums: action.payload,
            }
        case LIST_PRESCRIPTION_ENUMS_FAIL:
            return {
                loading: false,
                error: action.payload,
            }
        case LIST_PRESCRIPTION_ENUMS_RESET:
            return { enums: [] }
        default:
            return state
    }
}

export const prescriptionUpdateReducer = (state = { prescription: {} }, action) => {

    switch (action.type) {
        case UPDATE_PRESCRIPTION_REQUEST:
            return { loading: true }
        case UPDATE_PRESCRIPTION_SUCCESS:
            return { loading: false, success: true, prescription: action.payload }
        case UPDATE_PRESCRIPTION_FAIL:
            return { loading: false, error: action.payload }
        case UPDATE_PRESCRIPTION_RESET:
            return { prescription: {} }
        default:
            return state
    }
}

export const prescriptionDetailsReducer = (
    state = { presc: {} },
    action
) => {
    switch (action.type) {
        case PRESCRIPTION_DETAILS_REQUEST:
            return { ...state, loading: true }
        case PRESCRIPTION_DETAILS_SUCCESS:
            return { loading: false, presc: action.payload }
        case PRESCRIPTION_DETAILS_FAIL:
            return { loading: false, error: action.payload }
        default:
            return state
    }
}

export const prescriptionDetailsUserReducer = (
    state = { prescriptions: {} },
    action
) => {
    switch (action.type) {
        case PRESCRIPTION_USER_DETAILS_REQUEST:
            return { ...state, loading: true }
        case PRESCRIPTION_USER_DETAILS_SUCCESS:
            return { loading: false, prescriptions: action.payload }
        case PRESCRIPTION_USER_DETAILS_FAIL:
            return { loading: false, error: action.payload }
        default:
            return state
    }
}

export const presPaidListReducer = (state = { pays: [] }, action) => {
    switch (action.type) {
        case LIST_PAID_ENUMS_REQUEST:
            return {
                loading: true,
            }
        case LIST_PAID_ENUMS_SUCCESS:
            return {
                loading: false,
                pays: action.payload,
            }
        case LIST_PAID_ENUMS_FAIL:
            return {
                loading: false,
                error: action.payload,
            }
        case LIST_PAID_ENUMS_RESET:
            return { pays: [] }
        default:
            return state
    }
}