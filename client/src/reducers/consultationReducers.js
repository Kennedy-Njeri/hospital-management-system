import {
    LIST_PAID_ENUMS_FAIL,
    LIST_PAID_ENUMS_REQUEST,
    LIST_PAID_ENUMS_RESET,
    LIST_PAID_ENUMS_SUCCESS,
    LIST_CONSULT_FAIL,
    LIST_CONSULT_REQUEST,
    LIST_CONSULT_RESET,
    LIST_CONSULT_SUCCESS,
    CONSULT_CREATE_FAIL,
    CONSULT_CREATE_REQUEST,
    CONSULT_CREATE_RESET,
    CONSULT_CREATE_SUCCESS,
    CONSULT_DELETE_FAIL,
    CONSULT_DELETE_REQUEST,
    CONSULT_DELETE_SUCCESS,
    CONSULT_DETAILS_FAIL,
    CONSULT_DETAILS_REQUEST,
    CONSULT_DETAILS_SUCCESS,
    CONSULT_UPDATE_FAIL,
    CONSULT_UPDATE_REQUEST,
    CONSULT_UPDATE_RESET,
    CONSULT_UPDATE_SUCCESS,
    CONSULT_USER_DETAILS_FAIL,
    CONSULT_USER_DETAILS_REQUEST,
    CONSULT_USER_DETAILS_SUCCESS
} from '../constants/consultationConstants'





export const listConsultMyReducer = (state = { consults: [] }, action) => {
    switch (action.type) {
        case LIST_CONSULT_REQUEST:
            return {
                loading: true,
            }
        case LIST_CONSULT_SUCCESS:
            return {
                loading: false,
                consults: action.payload,
            }
        case LIST_CONSULT_FAIL:
            return {
                loading: false,
                error: action.payload,
            }
        case LIST_CONSULT_RESET:
            return { consults: [] }
        default:
            return state
    }
}



export const consultDeleteReducer = (state = {}, action) => {
    switch (action.type) {
        case CONSULT_DELETE_REQUEST:
            return { loading: true }
        case CONSULT_DELETE_SUCCESS:
            return { loading: false, success: true }
        case CONSULT_DELETE_FAIL:
            return { loading: false, error: action.payload }
        default:
            return state
    }
}


export const consultUpdateReducer = (state = { consult: {} }, action) => {

    switch (action.type) {
        case CONSULT_UPDATE_REQUEST:
            return { loading: true }
        case CONSULT_UPDATE_SUCCESS:
            return { loading: false, success: true, consult: action.payload }
        case CONSULT_UPDATE_FAIL:
            return { loading: false, error: action.payload }
        case CONSULT_UPDATE_RESET:
            return { consult: {} }
        default:
            return state
    }
}

export const createConsultReducer = (state = {}, action) => {
    switch (action.type) {
        case CONSULT_CREATE_REQUEST:
            return { loading: true }
        case CONSULT_CREATE_SUCCESS:
            return { loading: false, success: true, consult: action.payload }
        case CONSULT_CREATE_FAIL:
            return { loading: false, error: action.payload }
        case CONSULT_CREATE_RESET:
            return {}
        default:
            return state
    }
}


export const consultDetailsReducer = (
    state = { consult: {} },
    action
) => {
    switch (action.type) {
        case CONSULT_DETAILS_REQUEST:
            return { ...state, loading: true }
        case CONSULT_DETAILS_SUCCESS:
            return { loading: false, consult: action.payload }
        case CONSULT_DETAILS_FAIL:
            return { loading: false, error: action.payload }
        default:
            return state
    }
}


export const consultDetailsUserReducer = (
    state = { consult: {} },
    action
) => {
    switch (action.type) {
        case CONSULT_USER_DETAILS_REQUEST:
            return { ...state, loading: true }
        case CONSULT_USER_DETAILS_SUCCESS:
            return { loading: false, consult: action.payload }
        case CONSULT_USER_DETAILS_FAIL:
            return { loading: false, error: action.payload }
        default:
            return state
    }
}


export const consultPaidListReducer = (state = { pays: [] }, action) => {
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