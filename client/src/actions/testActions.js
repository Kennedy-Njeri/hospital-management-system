import axios from 'axios'
import {
    TEST_CATEGORY_CREATE_FAIL,
    TEST_CATEGORY_CREATE_REQUEST,
    TEST_CATEGORY_CREATE_SUCCESS,
    LIST_CAT_FAIL,
    LIST_CAT_REQUEST,
    LIST_CAT_RESET,
    LIST_CAT_SUCCESS,
    TEST_CAT_DELETE_FAIL,
    TEST_CAT_DELETE_SUCCESS,
    TEST_CAT_DELETE_REQUEST,
    TEST_UPDATE_CAT_RESET,
    TEST_UPDATE_CAT_FAIL,
    TEST_UPDATE_CAT_SUCCESS,
    TEST_UPDATE_CAT_REQUEST,
    TEST_CAT_DETAILS_FAIL,
    TEST_CAT_DETAILS_SUCCESS,
    TEST_CAT_DETAILS_REQUEST,
    LIST_TEST_FAIL,
    LIST_TEST_REQUEST,
    LIST_TEST_SUCCESS,
    TEST_DELETE_FAIL,
    TEST_DELETE_REQUEST,
    TEST_DELETE_SUCCESS
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


export const deleteTestCat = (id) => async (dispatch, getState) => {
    try {
        dispatch({
            type: TEST_CAT_DELETE_REQUEST,
        })

        const {
            userLogin: { userInfo },
        } = getState()

        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`,
            },
        }

        await axios.delete(`${API}/test-category/${id}`, config)

        dispatch({ type: TEST_CAT_DELETE_SUCCESS })
    } catch (error) {
        const message =
            error.response && error.response.data.message
                ? error.response.data.message
                : error.message
        if (message === 'Not authorized, token failed') {
            dispatch(logout())
        }
        dispatch({
            type: TEST_CAT_DELETE_FAIL,
            payload: message,
        })
    }
}

export const updateTestCat = (cat) => async (dispatch, getState) => {
    try {
        dispatch({
            type: TEST_UPDATE_CAT_REQUEST,
        })

        const {
            userLogin: { userInfo },
        } = getState()

        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`,
            },
        }

        console.log(cat)
        const { data } = await axios.put(
            `${API}/test-category-update/${cat._id}`,
            cat,
            config
        )

        dispatch({
            type: TEST_UPDATE_CAT_SUCCESS,
            payload: data,
        })
        dispatch({ type: TEST_CAT_DETAILS_SUCCESS, payload: data })
    } catch (error) {
        console.log(error.response)
        const message =
            error.response && error.response.data.message
                ? error.response.data.message
                : error.message
        if (message === 'Not authorized, token failed') {
            dispatch(logout())
        }
        dispatch({
            type: TEST_UPDATE_CAT_FAIL,
            payload: message,
        })
    }
}

export const cateTestDetails = (id) => async (dispatch, getState) => {
    try {
        dispatch({ type: TEST_CAT_DETAILS_REQUEST })

        const {
            userLogin: { userInfo },
        } = getState()


        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`,
            },
        }


        const { data } = await axios.get(`${API}/test-category-detail/${id}/${userInfo._id}`, config)

        dispatch({
            type: TEST_CAT_DETAILS_SUCCESS,
            payload: data,
        })
        console.log(data)
    } catch (error) {
        console.log(error)
        dispatch({
            type: TEST_CAT_DETAILS_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        })
    }
}


export const listTestsResults = () => async (dispatch, getState) => {
    try {
        dispatch({
            type: LIST_TEST_REQUEST,
        })

        const {
            userLogin: { userInfo },
        } = getState()

        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`,
            },
        }

        const { data } = await axios.get(`${API}/test-list/${userInfo._id}`, config)

        dispatch({
            type: LIST_TEST_SUCCESS,
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
            type: LIST_TEST_FAIL,
            payload: message,
        })
    }
}


export const deleteTests = (id) => async (dispatch, getState) => {
    try {
        dispatch({
            type: TEST_DELETE_REQUEST,
        })

        const {
            userLogin: { userInfo },
        } = getState()

        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`,
            },
        }

        await axios.delete(`${API}/test-remove/${id}`, config)

        dispatch({ type: TEST_DELETE_SUCCESS })
    } catch (error) {
        const message =
            error.response && error.response.data.message
                ? error.response.data.message
                : error.message
        if (message === 'Not authorized, token failed') {
            dispatch(logout())
        }
        dispatch({
            type: TEST_DELETE_FAIL,
            payload: message,
        })
    }
}