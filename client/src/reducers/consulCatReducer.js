import {
    CREATE_CONSUL_FAIL,
    CREATE_CONSUL_REQUEST,
    CREATE_CONSUL_RESET,
    CREATE_CONSUL_SUCCESS,
    LIST_CONSUL_FAIL,
    LIST_CONSUL_REQUEST,
    LIST_CONSUL_RESET,
    LIST_CONSUL_SUCCESS,
    DELETE_CONSUL_FAIL,
    DELETE_CONSUL_REQUEST,
    DELETE_CONSUL_SUCCESS,
    DETAILS_CONSUL_FAIL,
    DETAILS_CONSUL_REQUEST,
    DETAILS_CONSUL_SUCCESS,
    UPDATE_CONSUL_FAIL,
    UPDATE_CONSUL_REQUEST,
    UPDATE_CONSUL_RESET,
    UPDATE_CONSUL_SUCCESS
} from '../constants/consulCat'









export const consultCatCreateReducer = (state = {}, action) => {
    switch (action.type) {
        case CREATE_CONSUL_REQUEST:
            return { loading: true }
        case CREATE_CONSUL_SUCCESS:
            return { loading: false, success: true, consult: action.payload }
        case CREATE_CONSUL_FAIL:
            return { loading: false, error: action.payload }
        case CREATE_CONSUL_RESET:
            return {}
        default:
            return state
    }
}


export const cunsultCatListReducer = (state = { consultations: [] }, action) => {
    switch (action.type) {
        case LIST_CONSUL_REQUEST:
            return {
                loading: true,
            }
        case LIST_CONSUL_SUCCESS:
            return {
                loading: false,
                consultations: action.payload,
            }
        case LIST_CONSUL_FAIL:
            return {
                loading: false,
                error: action.payload,
            }
        case LIST_CONSUL_RESET:
            return { consultations: [] }
        default:
            return state
    }
}

export const consultCatDeleteReducer = (state = {}, action) => {
    switch (action.type) {
        case DELETE_CONSUL_REQUEST:
            return { loading: true }
        case DELETE_CONSUL_SUCCESS:
            return { loading: false, success: true }
        case DELETE_CONSUL_FAIL:
            return { loading: false, error: action.payload }
        default:
            return state
    }
}


export const consultCatUpdateReducer = (state = { consul: {} }, action) => {

    switch (action.type) {
        case UPDATE_CONSUL_REQUEST:
            return { loading: true }
        case UPDATE_CONSUL_SUCCESS:
            return { loading: false, success: true, consul: action.payload }
        case UPDATE_CONSUL_FAIL:
            return { loading: false, error: action.payload }
        case UPDATE_CONSUL_RESET:
            return { consul: {} }
        default:
            return state
    }
}


export const consultCatDetailsReducer = (
    state = { consult: {} },
    action
) => {
    switch (action.type) {
        case DETAILS_CONSUL_REQUEST:
            return { ...state, loading: true }
        case DETAILS_CONSUL_SUCCESS:
            return { loading: false, consult: action.payload }
        case DETAILS_CONSUL_FAIL:
            return { loading: false, error: action.payload }
        default:
            return state
    }
}


