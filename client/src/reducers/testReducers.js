import {
    TEST_CATEGORY__CREATE_RESET,
    TEST_CATEGORY_CREATE_FAIL,
    TEST_CATEGORY_CREATE_REQUEST,
    TEST_CATEGORY_CREATE_SUCCESS,
    LIST_CAT_FAIL,
    LIST_CAT_REQUEST,
    LIST_CAT_RESET,
    LIST_CAT_SUCCESS
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