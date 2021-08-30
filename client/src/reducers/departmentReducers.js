import {
    DEPARTMENT_CREATE_FAIL,
    DEPARTMENT_CREATE_REQUEST,
    DEPARTMENT_CREATE_RESET,
    DEPARTMENT_CREATE_SUCCESS,
    LIST_DEPARTMENT_FAIL,
    LIST_DEPARTMENT_REQUEST,
    LIST_DEPARTMENT_RESET,
    LIST_DEPARTMENT_SUCCESS,
    DEPARTMENT_DELETE_FAIL,
    DEPARTMENT_DELETE_REQUEST,
    DEPARTMENT_DELETE_SUCCESS,
    DEPARTMENT_UPDATE_FAIL,
    DEPARTMENT_UPDATE_REQUEST,
    DEPARTMENT_UPDATE_RESET,
    DEPARTMENT_UPDATE_SUCCESS,
    DEPARTMENT_DETAILS_FAIL,
    DEPARTMENT_DETAILS_REQUEST,
    DEPARTMENT_DETAILS_SUCCESS
} from '../constants/departmentConstants'







export const departCreateReducer = (state = {}, action) => {
    switch (action.type) {
        case DEPARTMENT_CREATE_REQUEST:
            return { loading: true }
        case DEPARTMENT_CREATE_SUCCESS:
            return { loading: false, success: true, depart: action.payload }
        case DEPARTMENT_CREATE_FAIL:
            return { loading: false, error: action.payload }
        case DEPARTMENT_CREATE_RESET:
            return {}
        default:
            return state
    }
}

export const departListReducer = (state = { departments: [] }, action) => {
    switch (action.type) {
        case LIST_DEPARTMENT_REQUEST:
            return {
                loading: true,
            }
        case LIST_DEPARTMENT_SUCCESS:
            return {
                loading: false,
                departments: action.payload,
            }
        case LIST_DEPARTMENT_FAIL:
            return {
                loading: false,
                error: action.payload,
            }
        case LIST_DEPARTMENT_RESET:
            return { departments: [] }
        default:
            return state
    }
}


export const departDeleteReducer = (state = {}, action) => {
    switch (action.type) {
        case DEPARTMENT_DELETE_REQUEST:
            return { loading: true }
        case DEPARTMENT_DELETE_SUCCESS:
            return { loading: false, success: true }
        case DEPARTMENT_DELETE_FAIL:
            return { loading: false, error: action.payload }
        default:
            return state
    }
}

export const departUpdateReducer = (state = { depart: {} }, action) => {

    switch (action.type) {
        case DEPARTMENT_UPDATE_REQUEST:
            return { loading: true }
        case DEPARTMENT_UPDATE_SUCCESS:
            return { loading: false, success: true, depart: action.payload }
        case DEPARTMENT_UPDATE_FAIL:
            return { loading: false, error: action.payload }
        case DEPARTMENT_UPDATE_RESET:
            return { depart: {} }
        default:
            return state
    }
}

export const departDetailsReducer = (
    state = { depart: {} },
    action
) => {
    switch (action.type) {
        case DEPARTMENT_DETAILS_REQUEST:
            return { ...state, loading: true }
        case DEPARTMENT_DETAILS_SUCCESS:
            return { loading: false, depart: action.payload }
        case DEPARTMENT_DETAILS_FAIL:
            return { loading: false, error: action.payload }
        default:
            return state
    }
}