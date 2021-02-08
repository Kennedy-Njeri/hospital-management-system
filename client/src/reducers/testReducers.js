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
    TEST_CAT_DELETE_SUCCESS
} from '../constants/testConstants'
import {USER_DELETE_FAIL, USER_DELETE_REQUEST, USER_DELETE_SUCCESS} from "../constants/userConstants";


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


