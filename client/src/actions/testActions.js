import axios from 'axios'
import {
    TEST_CATEGORY_CREATE_FAIL,
    TEST_CATEGORY_CREATE_REQUEST,
    TEST_CATEGORY_CREATE_SUCCESS,
    LIST_CAT_FAIL,
    LIST_CAT_REQUEST,
    LIST_CAT_RESET,
    LIST_CAT_SUCCESS
} from '../constants/testConstants'
import { logout } from './userActions'
import { API } from "../config";
import {USER_LIST_FAIL, USER_LIST_REQUEST, USER_LIST_SUCCESS} from "../constants/userConstants";




export const createCatTest = (cat) => async (dispatch, getState) => {
    try {
        dispatch({
            type: TEST_CATEGORY_CREATE_REQUEST,
        })

        const {
            userLogin: { userInfo },
        } = getState()

        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`,
            },
        }

        const { data } = await axios.post(`${API}/test-category/create/${userInfo._id}`, cat, config)

        dispatch({
            type: TEST_CATEGORY_CREATE_SUCCESS,
            payload: data,
        })
    } catch (error) {
        console.log(error.response)
        console.log(error.response.data.error.message)
        const message = error.response.data.error.message
        if (message === 'Not authorized, token failed') {
            dispatch(logout())
        }
        dispatch({
            type: TEST_CATEGORY_CREATE_FAIL,
            payload: message,
        })
    }
}


export const listCatTests = () => async (dispatch, getState) => {
    try {
        dispatch({
            type: LIST_CAT_REQUEST,
        })

        const {
            userLogin: { userInfo },
        } = getState()

        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`,
            },
        }

        const { data } = await axios.get(`${API}/test-categories/${userInfo._id}`, config)

        dispatch({
            type: LIST_CAT_SUCCESS,
            payload: data,
        })
        console.log(data)
    } catch (error) {
        console.log(error)
        const message =
            error.response && error.response.data.message
                ? error.response.data.message
                : error.message
        if (message === 'Not authorized, token failed') {
            dispatch(logout())
        }
        dispatch({
            type: LIST_CAT_FAIL,
            payload: message,
        })
    }
}


