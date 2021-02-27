import {
    DESIGNATE_CREATE_FAIL,
    DESIGNATE_CREATE_REQUEST,
    DESIGNATE_CREATE_RESET,
    DESIGNATE_CREATE_SUCCESS,
    LIST_DESIGNATE_FAIL,
    LIST_DESIGNATE_REQUEST,
    LIST_DESIGNATE_RESET,
    LIST_DESIGNATE_SUCCESS,
    DESIGNATE_DELETE_FAIL,
    DESIGNATE_DELETE_REQUEST,
    DESIGNATE_DELETE_SUCCESS,
    DESIGNATE_DETAILS_FAIL,
    DESIGNATE_DETAILS_REQUEST,
    DESIGNATE_DETAILS_SUCCESS,
    DESIGNATE_UPDATE_FAIL,
    DESIGNATE_UPDATE_REQUEST,
    DESIGNATE_UPDATE_RESET,
    DESIGNATE_UPDATE_SUCCESS
} from '../constants/designationConstants'







export const designateCreateReducer = (state = {}, action) => {
    switch (action.type) {
        case DESIGNATE_CREATE_REQUEST:
            return { loading: true }
        case DESIGNATE_CREATE_SUCCESS:
            return { loading: false, success: true, designate: action.payload }
        case DESIGNATE_CREATE_FAIL:
            return { loading: false, error: action.payload }
        case DESIGNATE_CREATE_RESET:
            return {}
        default:
            return state
    }
}


export const designateListReducer = (state = { designations: [] }, action) => {
    switch (action.type) {
        case LIST_DESIGNATE_REQUEST:
            return {
                loading: true,
            }
        case LIST_DESIGNATE_SUCCESS:
            return {
                loading: false,
                designations: action.payload,
            }
        case LIST_DESIGNATE_FAIL:
            return {
                loading: false,
                error: action.payload,
            }
        case LIST_DESIGNATE_RESET:
            return { designations: [] }
        default:
            return state
    }
}

export const designateDeleteReducer = (state = {}, action) => {
    switch (action.type) {
        case DESIGNATE_DELETE_REQUEST:
            return { loading: true }
        case DESIGNATE_DELETE_SUCCESS:
            return { loading: false, success: true }
        case DESIGNATE_DELETE_FAIL:
            return { loading: false, error: action.payload }
        default:
            return state
    }
}


export const designateDetailsReducer = (
    state = { designate: {} },
    action
) => {
    switch (action.type) {
        case DESIGNATE_DETAILS_REQUEST:
            return { ...state, loading: true }
        case DESIGNATE_DETAILS_SUCCESS:
            return { loading: false, designate: action.payload }
        case DESIGNATE_DETAILS_FAIL:
            return { loading: false, error: action.payload }
        default:
            return state
    }
}


export const designateUpdateReducer = (state = { designate: {} }, action) => {

    switch (action.type) {
        case DESIGNATE_UPDATE_REQUEST:
            return { loading: true }
        case DESIGNATE_UPDATE_SUCCESS:
            return { loading: false, success: true, designate: action.payload }
        case DESIGNATE_UPDATE_FAIL:
            return { loading: false, error: action.payload }
        case DESIGNATE_UPDATE_RESET:
            return { designate: {} }
        default:
            return state
    }
}