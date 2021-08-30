import axios from "axios";
import {API} from "../config";
import {logout} from "./userActions";
import {
    SPECIALIZE_CREATE_FAIL,
    SPECIALIZE_CREATE_REQUEST,
    SPECIALIZE_CREATE_RESET,
    SPECIALIZE_CREATE_SUCCESS,
    LIST_SPECIALIZE_FAIL,
    LIST_SPECIALIZE_REQUEST,
    LIST_SPECIALIZE_RESET,
    LIST_SPECIALIZE_SUCCESS,
    SPECIALIZE_DELETE_FAIL,
    SPECIALIZE_DELETE_REQUEST,
    SPECIALIZE_DELETE_SUCCESS,
    SPECIALIZE_UPDATE_FAIL,
    SPECIALIZE_UPDATE_REQUEST,
    SPECIALIZE_UPDATE_RESET,
    SPECIALIZE_UPDATE_SUCCESS,
    SPECIALIZE_DETAILS_FAIL,
    SPECIALIZE_DETAILS_REQUEST,
    SPECIALIZE_DETAILS_SUCCESS

} from '../constants/specializationConstants'








export const createSpecialize = (special) => async (dispatch, getState) => {
    try {
        dispatch({
            type: SPECIALIZE_CREATE_REQUEST,
        })

        const {
            userLogin: { userInfo },
        } = getState()

        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`,
            },
        }

        const { data } = await axios.post(`${API}/specialize-create/${userInfo._id}`, special, config)

        dispatch({
            type: SPECIALIZE_CREATE_SUCCESS,
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
            type: SPECIALIZE_CREATE_FAIL,
            payload: message,
        })
    }
}


export const listSpecialize = () => async (dispatch, getState) => {
    try {
        dispatch({
            type: LIST_SPECIALIZE_REQUEST,
        })

        const {
            userLogin: { userInfo },
        } = getState()

        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`,
            },
        }

        const { data } = await axios.get(`${API}/specialize-list/${userInfo._id}`, config)

        dispatch({
            type: LIST_SPECIALIZE_SUCCESS,
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
            type: LIST_SPECIALIZE_FAIL,
            payload: message,
        })
    }
}


export const deleteSpecialize = (id) => async (dispatch, getState) => {
    try {
        dispatch({
            type: SPECIALIZE_DELETE_REQUEST,
        })

        const {
            userLogin: { userInfo },
        } = getState()

        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`,
            },
        }

        await axios.delete(`${API}/specialize-remove/${id}/${userInfo._id}`, config)

        dispatch({ type: SPECIALIZE_DELETE_SUCCESS })
    } catch (error) {
        const message =
            error.response && error.response.data.message
                ? error.response.data.message
                : error.message
        if (message === 'Not authorized, token failed') {
            dispatch(logout())
        }
        dispatch({
            type: SPECIALIZE_DELETE_FAIL,
            payload: message,
        })
    }
}


export const updateSpecialize = (speciali) => async (dispatch, getState) => {
    try {
        dispatch({
            type: SPECIALIZE_UPDATE_REQUEST,
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

        console.log(speciali)
        const { data } = await axios.put(
            `${API}/specialize-update/${speciali._id}/${userInfo._id}`,
            speciali,
            config
        )

        dispatch({
            type: SPECIALIZE_UPDATE_SUCCESS,
            payload: data,
        })
        dispatch({ type: SPECIALIZE_DETAILS_SUCCESS, payload: data })
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
            type: SPECIALIZE_UPDATE_FAIL,
            payload: message,
        })
    }
}

export const detailsSpecialize = (id) => async (dispatch, getState) => {
    try {
        dispatch({ type: SPECIALIZE_DETAILS_REQUEST })

        const {
            userLogin: { userInfo },
        } = getState()


        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`,
            },
        }


        const { data } = await axios.get(`${API}/specialize-detail/${id}/${userInfo._id}`, config)

        dispatch({
            type: SPECIALIZE_DETAILS_SUCCESS,
            payload: data,
        })
        console.log(data)
    } catch (error) {
        console.log(error)
        dispatch({
            type: SPECIALIZE_DETAILS_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        })
    }
}