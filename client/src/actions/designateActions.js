import {
    DESIGNATE_CREATE_FAIL,
    DESIGNATE_CREATE_REQUEST,
    DESIGNATE_CREATE_RESET,
    DESIGNATE_CREATE_SUCCESS,
    LIST_DESIGNATE_FAIL,
    LIST_DESIGNATE_REQUEST,
    LIST_DESIGNATE_RESET,
    LIST_DESIGNATE_SUCCESS,
    DESIGNATE_DELETE_FAIL,
    DESIGNATE_DELETE_REQUEST,
    DESIGNATE_DELETE_SUCCESS,
    DESIGNATE_DETAILS_FAIL,
    DESIGNATE_DETAILS_REQUEST,
    DESIGNATE_DETAILS_SUCCESS,
    DESIGNATE_UPDATE_FAIL,
    DESIGNATE_UPDATE_REQUEST,
    DESIGNATE_UPDATE_RESET,
    DESIGNATE_UPDATE_SUCCESS
} from '../constants/designationConstants'
import axios from "axios";
import {API} from "../config";
import {logout} from "./userActions";







export const createDesignate = (designate) => async (dispatch, getState) => {
    try {
        dispatch({
            type: DESIGNATE_CREATE_REQUEST,
        })

        const {
            userLogin: { userInfo },
        } = getState()

        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`,
            },
        }

        const { data } = await axios.post(`${API}/designate-create/${userInfo._id}`, designate, config)

        dispatch({
            type: DESIGNATE_CREATE_SUCCESS,
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
            type: DESIGNATE_CREATE_FAIL,
            payload: message,
        })
    }
}



export const listDesignate = () => async (dispatch, getState) => {
    try {
        dispatch({
            type: LIST_DESIGNATE_REQUEST,
        })

        const {
            userLogin: { userInfo },
        } = getState()

        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`,
            },
        }

        const { data } = await axios.get(`${API}/designate-list/${userInfo._id}`, config)

        dispatch({
            type: LIST_DESIGNATE_SUCCESS,
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
            type: LIST_DESIGNATE_FAIL,
            payload: message,
        })
    }
}


export const deleteDesignate = (id) => async (dispatch, getState) => {
    try {
        dispatch({
            type: DESIGNATE_DELETE_REQUEST,
        })

        const {
            userLogin: { userInfo },
        } = getState()

        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`,
            },
        }

        await axios.delete(`${API}/designate-remove/${id}/${userInfo._id}`, config)

        dispatch({ type: DESIGNATE_DELETE_SUCCESS })
    } catch (error) {
        const message =
            error.response && error.response.data.message
                ? error.response.data.message
                : error.message
        if (message === 'Not authorized, token failed') {
            dispatch(logout())
        }
        dispatch({
            type: DESIGNATE_DELETE_FAIL,
            payload: message,
        })
    }
}

export const updateDesignate = (desig) => async (dispatch, getState) => {
    try {
        dispatch({
            type: DESIGNATE_UPDATE_REQUEST,
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

        console.log(desig)
        const { data } = await axios.put(
            `${API}/designate-update/${desig._id}/${userInfo._id}`,
            desig,
            config
        )

        dispatch({
            type: DESIGNATE_UPDATE_SUCCESS,
            payload: data,
        })
        dispatch({ type: DESIGNATE_DETAILS_SUCCESS, payload: data })
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
            type: DESIGNATE_UPDATE_FAIL,
            payload: message,
        })
    }
}


export const detailsDesignate = (id) => async (dispatch, getState) => {
    try {
        dispatch({ type: DESIGNATE_DETAILS_REQUEST })

        const {
            userLogin: { userInfo },
        } = getState()


        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`,
            },
        }


        const { data } = await axios.get(`${API}/designate-detail/${id}/${userInfo._id}`, config)

        dispatch({
            type: DESIGNATE_DETAILS_SUCCESS,
            payload: data,
        })
        console.log(data)
    } catch (error) {
        console.log(error)
        dispatch({
            type: DESIGNATE_DETAILS_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        })
    }
}