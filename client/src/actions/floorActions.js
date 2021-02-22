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
import axios from "axios";
import {API} from "../config";
import {logout} from "./userActions";







export const createFloor = (floor) => async (dispatch, getState) => {
    try {
        dispatch({
            type: FLOOR_CREATE_REQUEST,
        })

        const {
            userLogin: { userInfo },
        } = getState()

        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`,
            },
        }

        const { data } = await axios.post(`${API}/floor-create/${userInfo._id}`, floor, config)

        dispatch({
            type: FLOOR_CREATE_SUCCESS,
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
            type: FLOOR_CREATE_FAIL,
            payload: message,
        })
    }
}


export const listFloors = () => async (dispatch, getState) => {
    try {
        dispatch({
            type: LIST_FLOOR_REQUEST,
        })

        const {
            userLogin: { userInfo },
        } = getState()

        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`,
            },
        }

        const { data } = await axios.get(`${API}/floor-list/${userInfo._id}`, config)

        dispatch({
            type: LIST_FLOOR_SUCCESS,
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
            type: LIST_FLOOR_FAIL,
            payload: message,
        })
    }
}


export const deleteFloors = (id) => async (dispatch, getState) => {
    try {
        dispatch({
            type: FLOOR_DELETE_REQUEST,
        })

        const {
            userLogin: { userInfo },
        } = getState()

        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`,
            },
        }

        await axios.delete(`${API}/floor-remove/${id}/${userInfo._id}`, config)

        dispatch({ type: FLOOR_DELETE_SUCCESS })
    } catch (error) {
        const message =
            error.response && error.response.data.message
                ? error.response.data.message
                : error.message
        if (message === 'Not authorized, token failed') {
            dispatch(logout())
        }
        dispatch({
            type: FLOOR_DELETE_FAIL,
            payload: message,
        })
    }
}


export const updateFloor = (flor) => async (dispatch, getState) => {
    try {
        dispatch({
            type: FLOOR_UPDATE_REQUEST,
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

        console.log(flor)
        const { data } = await axios.put(
            `${API}/floor-update/${flor._id}/${userInfo._id}`,
            flor,
            config
        )

        dispatch({
            type: FLOOR_UPDATE_SUCCESS,
            payload: data,
        })
        dispatch({ type: FLOOR_DETAILS_SUCCESS, payload: data })
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
            type: FLOOR_UPDATE_FAIL,
            payload: message,
        })
    }
}


export const floorsDetails = (id) => async (dispatch, getState) => {
    try {
        dispatch({ type: FLOOR_DETAILS_REQUEST })

        const {
            userLogin: { userInfo },
        } = getState()


        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`,
            },
        }


        const { data } = await axios.get(`${API}/floor-detail/${id}/${userInfo._id}`, config)

        dispatch({
            type: FLOOR_DETAILS_SUCCESS,
            payload: data,
        })
        console.log(data)
    } catch (error) {
        console.log(error)
        dispatch({
            type: FLOOR_DETAILS_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        })
    }
}