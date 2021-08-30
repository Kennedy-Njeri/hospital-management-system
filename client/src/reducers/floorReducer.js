import {
    FLOOR_CREATE_FAIL,
    FLOOR_CREATE_REQUEST,
    FLOOR_CREATE_RESET,
    FLOOR_CREATE_SUCCESS,
    LIST_FLOOR_FAIL,
    LIST_FLOOR_REQUEST,
    LIST_FLOOR_RESET,
    LIST_FLOOR_SUCCESS,
    FLOOR_DELETE_FAIL,
    FLOOR_DELETE_REQUEST,
    FLOOR_DELETE_SUCCESS,
    FLOOR_DETAILS_FAIL,
    FLOOR_DETAILS_REQUEST,
    FLOOR_DETAILS_SUCCESS,
    FLOOR_UPDATE_FAIL,
    FLOOR_UPDATE_REQUEST,
    FLOOR_UPDATE_RESET,
    FLOOR_UPDATE_SUCCESS
} from '../constants/floorConstants'








export const floorCreateReducer = (state = {}, action) => {
    switch (action.type) {
        case FLOOR_CREATE_REQUEST:
            return { loading: true }
        case FLOOR_CREATE_SUCCESS:
            return { loading: false, success: true, floor: action.payload }
        case FLOOR_CREATE_FAIL:
            return { loading: false, error: action.payload }
        case FLOOR_CREATE_RESET:
            return {}
        default:
            return state
    }
}

export const floorListReducer = (state = { floors: [] }, action) => {
    switch (action.type) {
        case LIST_FLOOR_REQUEST:
            return {
                loading: true,
            }
        case LIST_FLOOR_SUCCESS:
            return {
                loading: false,
                floors: action.payload,
            }
        case LIST_FLOOR_FAIL:
            return {
                loading: false,
                error: action.payload,
            }
        case LIST_FLOOR_RESET:
            return { floors: [] }
        default:
            return state
    }
}

export const floorDeleteReducer = (state = {}, action) => {
    switch (action.type) {
        case FLOOR_DELETE_REQUEST:
            return { loading: true }
        case FLOOR_DELETE_SUCCESS:
            return { loading: false, success: true }
        case FLOOR_DELETE_FAIL:
            return { loading: false, error: action.payload }
        default:
            return state
    }
}


export const floorDetailsReducer = (
    state = { floor: {} },
    action
) => {
    switch (action.type) {
        case FLOOR_DETAILS_REQUEST:
            return { ...state, loading: true }
        case FLOOR_DETAILS_SUCCESS:
            return { loading: false, floor: action.payload }
        case FLOOR_DETAILS_FAIL:
            return { loading: false, error: action.payload }
        default:
            return state
    }
}


export const floorUpdateReducer = (state = { floor: {} }, action) => {

    switch (action.type) {
        case FLOOR_UPDATE_REQUEST:
            return { loading: true }
        case FLOOR_UPDATE_SUCCESS:
            return { loading: false, success: true, floor: action.payload }
        case FLOOR_UPDATE_FAIL:
            return { loading: false, error: action.payload }
        case FLOOR_UPDATE_RESET:
            return { floor: {} }
        default:
            return state
    }
}