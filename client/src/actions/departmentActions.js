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
import axios from "axios";
import {API} from "../config";
import {logout} from "./userActions";







export const createDepart = (departs) => async (dispatch, getState) => {
    try {
        dispatch({
            type: DEPARTMENT_CREATE_REQUEST,
        })

        const {
            userLogin: { userInfo },
        } = getState()

        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`,
            },
        }

        const { data } = await axios.post(`${API}/depart-create/${userInfo._id}`, departs, config)

        dispatch({
            type: DEPARTMENT_CREATE_SUCCESS,
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
            type: DEPARTMENT_CREATE_FAIL,
            payload: message,
        })
    }
}


export const listDeparts  = () => async (dispatch, getState) => {
    try {
        dispatch({
            type: LIST_DEPARTMENT_REQUEST,
        })

        const {
            userLogin: { userInfo },
        } = getState()

        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`,
            },
        }

        const { data } = await axios.get(`${API}/depart-list/${userInfo._id}`, config)

        dispatch({
            type: LIST_DEPARTMENT_SUCCESS,
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
            type: LIST_DEPARTMENT_FAIL,
            payload: message,
        })
    }
}

export const deleteDeparts = (id) => async (dispatch, getState) => {
    try {
        dispatch({
            type: DEPARTMENT_DELETE_REQUEST,
        })

        const {
            userLogin: { userInfo },
        } = getState()

        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`,
            },
        }

        await axios.delete(`${API}/depart-remove/${id}/${userInfo._id}`, config)

        dispatch({ type: DEPARTMENT_DELETE_SUCCESS })
    } catch (error) {
        const message =
            error.response && error.response.data.message
                ? error.response.data.message
                : error.message
        if (message === 'Not authorized, token failed') {
            dispatch(logout())
        }
        dispatch({
            type: DEPARTMENT_DELETE_FAIL,
            payload: message,
        })
    }
}


export const updateDeparts = (departm) => async (dispatch, getState) => {
    try {
        dispatch({
            type: DEPARTMENT_UPDATE_REQUEST,
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

        console.log(departm)
        const { data } = await axios.put(
            `${API}/depart-update/${departm._id}/${userInfo._id}`,
            departm,
            config
        )

        dispatch({
            type: DEPARTMENT_UPDATE_SUCCESS,
            payload: data,
        })
        dispatch({ type: DEPARTMENT_DETAILS_SUCCESS, payload: data })
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
            type: DEPARTMENT_UPDATE_FAIL,
            payload: message,
        })
    }
}


export const departDetails = (id) => async (dispatch, getState) => {
    try {
        dispatch({ type: DEPARTMENT_DETAILS_REQUEST })

        const {
            userLogin: { userInfo },
        } = getState()


        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`,
            },
        }


        const { data } = await axios.get(`${API}/depart-detail/${id}/${userInfo._id}`, config)

        dispatch({
            type: DEPARTMENT_DETAILS_SUCCESS,
            payload: data,
        })
        console.log(data)
    } catch (error) {
        console.log(error)
        dispatch({
            type: DEPARTMENT_DETAILS_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        })
    }
}