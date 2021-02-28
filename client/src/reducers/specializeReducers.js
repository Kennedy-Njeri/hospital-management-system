import {
    SPECIALIZE_CREATE_FAIL,
    SPECIALIZE_CREATE_REQUEST,
    SPECIALIZE_CREATE_RESET,
    SPECIALIZE_CREATE_SUCCESS,
    LIST_SPECIALIZE_FAIL,
    LIST_SPECIALIZE_REQUEST,
    LIST_SPECIALIZE_RESET,
    LIST_SPECIALIZE_SUCCESS,
    SPECIALIZE_DELETE_FAIL,
    SPECIALIZE_DELETE_REQUEST,
    SPECIALIZE_DELETE_SUCCESS,
    SPECIALIZE_UPDATE_FAIL,
    SPECIALIZE_UPDATE_REQUEST,
    SPECIALIZE_UPDATE_RESET,
    SPECIALIZE_UPDATE_SUCCESS,
    SPECIALIZE_DETAILS_FAIL,
    SPECIALIZE_DETAILS_REQUEST,
    SPECIALIZE_DETAILS_SUCCESS
    
} from '../constants/specializationConstants'






export const specializeCreateReducer = (state = {}, action) => {
    switch (action.type) {
        case SPECIALIZE_CREATE_REQUEST:
            return { loading: true }
        case SPECIALIZE_CREATE_SUCCESS:
            return { loading: false, success: true, specialize: action.payload }
        case SPECIALIZE_CREATE_FAIL:
            return { loading: false, error: action.payload }
        case SPECIALIZE_CREATE_RESET:
            return {}
        default:
            return state
    }
}


export const specializeListReducer = (state = { specializations: [] }, action) => {
    switch (action.type) {
        case LIST_SPECIALIZE_REQUEST:
            return {
                loading: true,
            }
        case LIST_SPECIALIZE_SUCCESS:
            return {
                loading: false,
                specializations: action.payload,
            }
        case LIST_SPECIALIZE_FAIL:
            return {
                loading: false,
                error: action.payload,
            }
        case LIST_SPECIALIZE_RESET:
            return {specializations: []}
        default:
            return state
    }

}


export const specializeDeleteReducer = (state = {}, action) => {
    switch (action.type) {
        case SPECIALIZE_DELETE_REQUEST:
            return { loading: true }
        case SPECIALIZE_DELETE_SUCCESS:
            return { loading: false, success: true }
        case SPECIALIZE_DELETE_FAIL:
            return { loading: false, error: action.payload }
        default:
            return state
    }
}


export const specializeUpdateReducer = (state = { specialize: {} }, action) => {

    switch (action.type) {
        case SPECIALIZE_UPDATE_REQUEST:
            return { loading: true }
        case SPECIALIZE_UPDATE_SUCCESS:
            return { loading: false, success: true, specialize: action.payload }
        case SPECIALIZE_UPDATE_FAIL:
            return { loading: false, error: action.payload }
        case SPECIALIZE_UPDATE_RESET:
            return { specialize: {} }
        default:
            return state
    }
}



export const specializeDetailsReducer = (
    state = { specialize: {} },
    action
) => {
    switch (action.type) {
        case SPECIALIZE_DETAILS_REQUEST:
            return { ...state, loading: true }
        case SPECIALIZE_DETAILS_SUCCESS:
            return { loading: false, specialize: action.payload }
        case SPECIALIZE_DETAILS_FAIL:
            return { loading: false, error: action.payload }
        default:
            return state
    }
}