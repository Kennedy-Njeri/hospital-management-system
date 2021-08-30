import {
    TREAT_CATEGORY__CREATE_RESET,
    TREAT_CATEGORY_CREATE_FAIL,
    TREAT_CATEGORY_CREATE_REQUEST,
    TREAT_CATEGORY_CREATE_SUCCESS,
    LIST_TREAT_FAIL,
    LIST_TREAT_REQUEST,
    LIST_TREAT_RESET,
    LIST_TREAT_SUCCESS,
    TREAT_CAT_DELETE_FAIL,
    TREAT_CAT_DELETE_REQUEST,
    TREAT_CAT_DELETE_SUCCESS,
    TREAT_CAT_DETAILS_FAIL,
    TREAT_CAT_DETAILS_REQUEST,
    TREAT_CAT_DETAILS_SUCCESS,
    TREAT_UPDATE_CAT_REQUEST,
    TREAT_UPDATE_CAT_SUCCESS,
    TREAT_UPDATE_CAT_RESET,
    TREAT_UPDATE_CAT_FAIL
   
} from '../constants/treatmentConstants'







export const treatCreateReducer = (state = {}, action) => {
    switch (action.type) {
        case TREAT_CATEGORY_CREATE_REQUEST:
            return { loading: true }
        case TREAT_CATEGORY_CREATE_SUCCESS:
            return { loading: false, success: true, product: action.payload }
        case TREAT_CATEGORY_CREATE_FAIL:
            return { loading: false, error: action.payload }
        case TREAT_CATEGORY__CREATE_RESET:
            return {}
        default:
            return state
    }
}


export const treatListMyReducer = (state = { treatments: [] }, action) => {
    switch (action.type) {
        case LIST_TREAT_REQUEST:
            return {
                loading: true,
            }
        case LIST_TREAT_SUCCESS:
            return {
                loading: false,
                treatments: action.payload,
            }
        case LIST_TREAT_FAIL:
            return {
                loading: false,
                error: action.payload,
            }
        case LIST_TREAT_RESET:
            return { treatments: [] }
        default:
            return state
    }
}


export const treatCatDeleteReducer = (state = {}, action) => {
    switch (action.type) {
        case TREAT_CAT_DELETE_REQUEST:
            return { loading: true }
        case TREAT_CAT_DELETE_SUCCESS:
            return { loading: false, success: true }
        case TREAT_CAT_DELETE_FAIL:
            return { loading: false, error: action.payload }
        default:
            return state
    }
}


export const treatmentDetailsReducer = (
    state = { treatment: {} },
    action
) => {
    switch (action.type) {
        case TREAT_CAT_DETAILS_REQUEST:
            return { ...state, loading: true }
        case TREAT_CAT_DETAILS_SUCCESS:
            return { loading: false, treatment: action.payload }
        case TREAT_CAT_DETAILS_FAIL:
            return { loading: false, error: action.payload }
        default:
            return state
    }
}


export const treatmentUpdateReducer = (state = { treatment: {} }, action) => {

    switch (action.type) {
        case TREAT_UPDATE_CAT_REQUEST:
            return { loading: true }
        case TREAT_UPDATE_CAT_SUCCESS:
            return { loading: false, success: true, treatment: action.payload }
        case TREAT_UPDATE_CAT_FAIL:
            return { loading: false, error: action.payload }
        case TREAT_UPDATE_CAT_RESET:
            return { treatment: {} }
        default:
            return state
    }
}