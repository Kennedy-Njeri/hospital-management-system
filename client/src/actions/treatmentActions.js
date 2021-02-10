import axios from "axios";
import {
    TREAT_CATEGORY_CREATE_FAIL,
    TREAT_CATEGORY_CREATE_REQUEST,
    TREAT_CATEGORY_CREATE_SUCCESS,
    LIST_TREAT_FAIL,
    LIST_TREAT_REQUEST,
    LIST_TREAT_RESET,
    LIST_TREAT_SUCCESS,
    TREAT_CAT_DELETE_FAIL,
    TREAT_CAT_DELETE_SUCCESS,
    TREAT_CAT_DELETE_REQUEST,
    TREAT_CAT_DETAILS_FAIL,
    TREAT_CAT_DETAILS_REQUEST,
    TREAT_CAT_DETAILS_SUCCESS,
    TREAT_UPDATE_CAT_REQUEST,
    TREAT_UPDATE_CAT_SUCCESS,
    TREAT_UPDATE_CAT_RESET,
    TREAT_UPDATE_CAT_FAIL

} from '../constants/treatmentConstants'

import { logout } from './userActions'
import { API } from "../config";








export const treatCatCreate = (treatment) => async (dispatch, getState) => {
    try {
        dispatch({
            type: TREAT_CATEGORY_CREATE_REQUEST,
        })

        const {
            userLogin: { userInfo },
        } = getState()

        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`,
            },
        }

        const { data } = await axios.post(`${API}/treatment-cat/create/${userInfo._id}`, treatment, config)

        dispatch({
            type: TREAT_CATEGORY_CREATE_SUCCESS,
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
            type: TREAT_CATEGORY_CREATE_FAIL,
            payload: message,
        })
    }
}

export const listTreatments = () => async (dispatch, getState) => {
    try {
        dispatch({
            type: LIST_TREAT_REQUEST,
        })

        const {
            userLogin: { userInfo },
        } = getState()

        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`,
            },
        }

        const { data } = await axios.get(`${API}/treatment-cat-list/${userInfo._id}`, config)

        dispatch({
            type: LIST_TREAT_SUCCESS,
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
            type: LIST_TREAT_FAIL,
            payload: message,
        })
    }
}


export const deleteTreatmentCat = (id) => async (dispatch, getState) => {
    try {
        dispatch({
            type: TREAT_CAT_DELETE_REQUEST,
        })

        const {
            userLogin: { userInfo },
        } = getState()

        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`,
            },
        }

        await axios.delete(`${API}/treatment-cat/${id}`, config)

        dispatch({ type: TREAT_CAT_DELETE_SUCCESS })
    } catch (error) {
        const message =
            error.response && error.response.data.message
                ? error.response.data.message
                : error.message
        if (message === 'Not authorized, token failed') {
            dispatch(logout())
        }
        dispatch({
            type: TREAT_CAT_DELETE_FAIL,
            payload: message,
        })
    }
}


export const treatmentDetails = (id) => async (dispatch, getState) => {
    try {
        dispatch({ type: TREAT_CAT_DETAILS_REQUEST })

        const {
            userLogin: { userInfo },
        } = getState()


        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`,
            },
        }


        const { data } = await axios.get(`${API}/treatment-cat-detail/${id}/${userInfo._id}`, config)

        dispatch({
            type: TREAT_CAT_DETAILS_SUCCESS,
            payload: data,
        })
        console.log(data)
    } catch (error) {
        console.log(error)
        dispatch({
            type: TREAT_CAT_DETAILS_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        })
    }
}


export const updateTreatmentCat = (cat) => async (dispatch, getState) => {
    try {
        dispatch({
            type: TREAT_UPDATE_CAT_REQUEST,
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
            `${API}/treatment-cat-update/${cat._id}`,
            cat,
            config
        )

        dispatch({
            type: TREAT_UPDATE_CAT_SUCCESS,
            payload: data,
        })
        dispatch({ type: TREAT_CAT_DETAILS_SUCCESS, payload: data })
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
            type: TREAT_UPDATE_CAT_FAIL,
            payload: message,
        })
    }
}