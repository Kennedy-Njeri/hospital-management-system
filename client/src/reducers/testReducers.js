import {
    TEST_CATEGORY__CREATE_RESET,
    TEST_CATEGORY_CREATE_FAIL,
    TEST_CATEGORY_CREATE_REQUEST,
    TEST_CATEGORY_CREATE_SUCCESS,
    LIST_CAT_FAIL,
    LIST_CAT_REQUEST,
    LIST_CAT_RESET,
    LIST_CAT_SUCCESS,
    TEST_CAT_DELETE_FAIL,
    TEST_CAT_DELETE_REQUEST,
    TEST_CAT_DELETE_SUCCESS,
    TEST_UPDATE_CAT_FAIL,
    TEST_UPDATE_CAT_REQUEST,
    TEST_UPDATE_CAT_RESET,
    TEST_UPDATE_CAT_SUCCESS,
    TEST_CAT_DETAILS_FAIL,
    TEST_CAT_DETAILS_REQUEST,
    TEST_CAT_DETAILS_SUCCESS,
    LIST_TEST_FAIL,
    LIST_TEST_REQUEST,
    LIST_TEST_RESET,
    LIST_TEST_SUCCESS,
    TEST_DELETE_FAIL,
    TEST_DELETE_REQUEST,
    TEST_DELETE_SUCCESS,
    TEST_UPDATE_FAIL,
    TEST_UPDATE_REQUEST,
    TEST_UPDATE_RESET,
    TEST_UPDATE_SUCCESS,
    TEST_CREATE_FAIL,
    TEST_CREATE_REQUEST,
    TEST_CREATE_RESET,
    TEST_CREATE_SUCCESS,
    TEST_DETAILS_FAIL,
    TEST_DETAILS_REQUEST,
    TEST_DETAILS_SUCCESS,
    LIST_PAID_ENUMS_FAIL,
    LIST_PAID_ENUMS_REQUEST,
    LIST_PAID_ENUMS_RESET,
    LIST_PAID_ENUMS_SUCCESS,
    TEST_USER_DETAILS_FAIL,
    TEST_USER_DETAILS_REQUEST,
    TEST_USER_DETAILS_SUCCESS
} from '../constants/testConstants'




export const catCreateTestReducer = (state = {}, action) => {
    switch (action.type) {
        case TEST_CATEGORY_CREATE_REQUEST:
            return { loading: true }
        case TEST_CATEGORY_CREATE_SUCCESS:
            return { loading: false, success: true, product: action.payload }
        case TEST_CATEGORY_CREATE_FAIL:
            return { loading: false, error: action.payload }
        case TEST_CATEGORY__CREATE_RESET:
            return {}
        default:
            return state
    }
}


export const catListMyReducer = (state = { tests: [] }, action) => {
    switch (action.type) {
        case LIST_CAT_REQUEST:
            return {
                loading: true,
            }
        case LIST_CAT_SUCCESS:
            return {
                loading: false,
                tests: action.payload,
            }
        case LIST_CAT_FAIL:
            return {
                loading: false,
                error: action.payload,
            }
        case LIST_CAT_RESET:
            return { tests: [] }
        default:
            return state
    }
}


export const testCatDeleteReducer = (state = {}, action) => {
    switch (action.type) {
        case TEST_CAT_DELETE_REQUEST:
            return { loading: true }
        case TEST_CAT_DELETE_SUCCESS:
            return { loading: false, success: true }
        case TEST_CAT_DELETE_FAIL:
            return { loading: false, error: action.payload }
        default:
            return state
    }
}


export const testCatUpdateReducer = (state = { test: {} }, action) => {
    
    switch (action.type) {
        case TEST_UPDATE_CAT_REQUEST:
            return { loading: true }
        case TEST_UPDATE_CAT_SUCCESS:
            return { loading: false, success: true, test: action.payload }
        case TEST_UPDATE_CAT_FAIL:
            return { loading: false, error: action.payload }
        case TEST_UPDATE_CAT_RESET:
            return { test: {} }
        default:
            return state
    }
}

export const catTestDetailsReducer = (
    state = { cat: {} },
    action
) => {
    switch (action.type) {
        case TEST_CAT_DETAILS_REQUEST:
            return { ...state, loading: true }
        case TEST_CAT_DETAILS_SUCCESS:
            return { loading: false, cat: action.payload }
        case TEST_CAT_DETAILS_FAIL:
            return { loading: false, error: action.payload }
        default:
            return state
    }
}


export const listTestMyReducer = (state = { tests: [] }, action) => {
    switch (action.type) {
        case LIST_TEST_REQUEST:
            return {
                loading: true,
            }
        case LIST_TEST_SUCCESS:
            return {
                loading: false,
                tests: action.payload,
            }
        case LIST_TEST_FAIL:
            return {
                loading: false,
                error: action.payload,
            }
        case LIST_TEST_RESET:
            return { tests: [] }
        default:
            return state
    }
}



export const testDeleteReducer = (state = {}, action) => {
    switch (action.type) {
        case TEST_DELETE_REQUEST:
            return { loading: true }
        case TEST_DELETE_SUCCESS:
            return { loading: false, success: true }
        case TEST_DELETE_FAIL:
            return { loading: false, error: action.payload }
        default:
            return state
    }
}


export const testUpdateReducer = (state = { result: {} }, action) => {

    switch (action.type) {
        case TEST_UPDATE_REQUEST:
            return { loading: true }
        case TEST_UPDATE_SUCCESS:
            return { loading: false, success: true, result: action.payload }
        case TEST_UPDATE_FAIL:
            return { loading: false, error: action.payload }
        case TEST_UPDATE_RESET:
            return { result: {} }
        default:
            return state
    }
}

export const createTestReducer = (state = {}, action) => {
    switch (action.type) {
        case TEST_CREATE_REQUEST:
            return { loading: true }
        case TEST_CREATE_SUCCESS:
            return { loading: false, success: true, test: action.payload }
        case TEST_CREATE_FAIL:
            return { loading: false, error: action.payload }
        case TEST_CREATE_RESET:
            return {}
        default:
            return state
    }
}

export const testDetailsReducer = (
    state = { test: {} },
    action
) => {
    switch (action.type) {
        case TEST_DETAILS_REQUEST:
            return { ...state, loading: true }
        case TEST_DETAILS_SUCCESS:
            return { loading: false, test: action.payload }
        case TEST_DETAILS_FAIL:
            return { loading: false, error: action.payload }
        default:
            return state
    }
}


export const testDetailsUserReducer = (
    state = { test: {} },
    action
) => {
    switch (action.type) {
        case TEST_USER_DETAILS_REQUEST:
            return { ...state, loading: true }
        case TEST_USER_DETAILS_SUCCESS:
            return { loading: false, test: action.payload }
        case TEST_USER_DETAILS_FAIL:
            return { loading: false, error: action.payload }
        default:
            return state
    }
}


export const testPaidListReducer = (state = { pays: [] }, action) => {
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