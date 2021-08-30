import {
    EXPENSES_CREATE_FAIL,
    EXPENSES_CREATE_REQUEST,
    EXPENSES_CREATE_RESET,
    EXPENSES_CREATE_SUCCESS,
    LIST_EXPENSES_FAIL,
    LIST_EXPENSES_REQUEST,
    LIST_EXPENSES_RESET,
    LIST_EXPENSES_SUCCESS,
    EXPENSES_DELETE_FAIL,
    EXPENSES_DELETE_REQUEST,
    EXPENSES_DELETE_SUCCESS,
    EXPENSES_UPDATE_FAIL,
    EXPENSES_UPDATE_REQUEST,
    EXPENSES_UPDATE_RESET,
    EXPENSES_UPDATE_SUCCESS,
    EXPENSES_DETAILS_FAIL,
    EXPENSES_DETAILS_REQUEST,
    EXPENSES_DETAILS_SUCCESS,
    LIST_PAID_ENUMS_FAIL,
    LIST_PAID_ENUMS_SUCCESS,
    LIST_PAID_ENUMS_REQUEST,
    LIST_PAID_ENUMS_RESET
} from '../constants/expensesConstants'







export const expenseCreateReducer = (state = {}, action) => {
    switch (action.type) {
        case EXPENSES_CREATE_REQUEST:
            return { loading: true }
        case EXPENSES_CREATE_SUCCESS:
            return { loading: false, success: true, expense: action.payload }
        case EXPENSES_CREATE_FAIL:
            return { loading: false, error: action.payload }
        case EXPENSES_CREATE_RESET:
            return {}
        default:
            return state
    }
}

export const expensesListReducer = (state = { expenses: [] }, action) => {
    switch (action.type) {
        case LIST_EXPENSES_REQUEST:
            return {
                loading: true,
            }
        case LIST_EXPENSES_SUCCESS:
            return {
                loading: false,
                expenses: action.payload,
            }
        case LIST_EXPENSES_FAIL:
            return {
                loading: false,
                error: action.payload,
            }
        case LIST_EXPENSES_RESET:
            return { expenses: [] }
        default:
            return state
    }
}

export const expensesDeleteReducer = (state = {}, action) => {
    switch (action.type) {
        case EXPENSES_DELETE_REQUEST:
            return { loading: true }
        case EXPENSES_DELETE_SUCCESS:
            return { loading: false, success: true }
        case EXPENSES_DELETE_FAIL:
            return { loading: false, error: action.payload }
        default:
            return state
    }
}



export const expensesDetailsReducer = (
    state = { expense: {} },
    action
) => {
    switch (action.type) {
        case EXPENSES_DETAILS_REQUEST:
            return { ...state, loading: true }
        case EXPENSES_DETAILS_SUCCESS:
            return { loading: false, expense: action.payload }
        case EXPENSES_DETAILS_FAIL:
            return { loading: false, error: action.payload }
        default:
            return state
    }
}


export const expensesUpdateReducer = (state = { expense: {} }, action) => {

    switch (action.type) {
        case EXPENSES_UPDATE_REQUEST:
            return { loading: true }
        case EXPENSES_UPDATE_SUCCESS:
            return { loading: false, success: true, expense: action.payload }
        case EXPENSES_UPDATE_FAIL:
            return { loading: false, error: action.payload }
        case EXPENSES_UPDATE_RESET:
            return { expense: {} }
        default:
            return state
    }
}

export const expensesPaidListReducer = (state = { pays: [] }, action) => {
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
