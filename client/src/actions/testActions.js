import axios from 'axios'
import {
    TEST_CATEGORY_CREATE_FAIL,
    TEST_CATEGORY_CREATE_REQUEST,
    TEST_CATEGORY_CREATE_SUCCESS
} from '../constants/testConstants'
import { logout } from './userActions'
import { API } from "../config";




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
        const message =
            error.response && error.response.data.message
                ? error.response.data.message
                : error.message
        if (message === 'Not authorized, token failed') {
            dispatch(logout())
        }
        dispatch({
            type: TEST_CATEGORY_CREATE_FAIL,
            payload: message,
        })
    }
}



