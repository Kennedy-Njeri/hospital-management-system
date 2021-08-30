import {
    BUILDING_CREATE_FAIL,
    BUILDING_CREATE_REQUEST,
    BUILDING_CREATE_SUCCESS,
    LIST_BUILDING_FAIL,
    LIST_BUILDING_REQUEST,
    LIST_BUILDING_SUCCESS,
    BUILDING_DELETE_FAIL,
    BUILDING_DELETE_REQUEST,
    BUILDING_DELETE_SUCCESS,
    BUILDING_UPDATE_FAIL,
    BUILDING_UPDATE_REQUEST,
    BUILDING_UPDATE_SUCCESS,
    BUILDING_DETAILS_FAIL,
    BUILDING_DETAILS_REQUEST,
    BUILDING_DETAILS_SUCCESS,
} from '../constants/building-floor'

import { logout } from './userActions'
import { API } from "../config";
import axios from "axios";






export const createBuilding = (build) => async (dispatch, getState) => {
    try {
        dispatch({
            type: BUILDING_CREATE_REQUEST,
        })

        const {
            userLogin: { userInfo },
        } = getState()

        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`,
            },
        }

        const { data } = await axios.post(`${API}/building-create/${userInfo._id}`, build, config)

        dispatch({
            type: BUILDING_CREATE_SUCCESS,
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
            type: BUILDING_CREATE_FAIL,
            payload: message,
        })
    }
}

export const listBuildings = () => async (dispatch, getState) => {
    try {
        dispatch({
            type: LIST_BUILDING_REQUEST,
        })

        const {
            userLogin: { userInfo },
        } = getState()

        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`,
            },
        }

        const { data } = await axios.get(`${API}/building-list/${userInfo._id}`, config)

        dispatch({
            type: LIST_BUILDING_SUCCESS,
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
            type: LIST_BUILDING_FAIL,
            payload: message,
        })
    }
}

export const deleteBuilding = (id) => async (dispatch, getState) => {
    try {
        dispatch({
            type: BUILDING_DELETE_REQUEST,
        })

        const {
            userLogin: { userInfo },
        } = getState()

        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`,
            },
        }

        await axios.delete(`${API}/building-remove/${id}/${userInfo._id}`, config)

        dispatch({ type: BUILDING_DELETE_SUCCESS })
    } catch (error) {
        const message =
            error.response && error.response.data.message
                ? error.response.data.message
                : error.message
        if (message === 'Not authorized, token failed') {
            dispatch(logout())
        }
        dispatch({
            type: BUILDING_DELETE_FAIL,
            payload: message,
        })
    }
}


export const updateBuilding = (build) => async (dispatch, getState) => {
    try {
        dispatch({
            type: BUILDING_UPDATE_REQUEST,
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

        console.log(build)
        const { data } = await axios.put(
            `${API}/building-update/${build._id}/${userInfo._id}`,
            build,
            config
        )

        dispatch({
            type: BUILDING_UPDATE_SUCCESS,
            payload: data,
        })
        dispatch({ type: BUILDING_DETAILS_SUCCESS, payload: data })
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
            type: BUILDING_UPDATE_FAIL,
            payload: message,
        })
    }
}


export const buildingsDetails = (id) => async (dispatch, getState) => {
    try {
        dispatch({ type: BUILDING_DETAILS_REQUEST })

        const {
            userLogin: { userInfo },
        } = getState()


        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`,
            },
        }


        const { data } = await axios.get(`${API}/building-detail/${id}/${userInfo._id}`, config)

        dispatch({
            type: BUILDING_DETAILS_SUCCESS,
            payload: data,
        })
        console.log(data)
    } catch (error) {
        console.log(error)
        dispatch({
            type: BUILDING_DETAILS_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        })
    }
}