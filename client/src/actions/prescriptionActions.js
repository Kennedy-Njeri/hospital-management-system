import axios from 'axios'
import {
    PRESCRIPTION_CREATE_FAIL,
    PRESCRIPTION_CREATE_REQUEST,
    PRESCRIPTION_CREATE_SUCCESS,
    LIST_PRESCRIPTION_FAIL,
    LIST_PRESCRIPTION_REQUEST,
    LIST_PRESCRIPTION_RESET,
    LIST_PRESCRIPTION_SUCCESS,
    PRESCRIPTION_DELETE_FAIL,
    PRESCRIPTION_DELETE_REQUEST,
    PRESCRIPTION_DELETE_SUCCESS
} from '../constants/prescriptionConstants'
import { logout } from './userActions'
import { API } from "../config";





export const createPrescription = (prescrp) => async (dispatch, getState) => {
    try {
        dispatch({
            type: PRESCRIPTION_CREATE_REQUEST,
        })

        const {
            userLogin: { userInfo },
        } = getState()

        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`,
            },
        }

        const { data } = await axios.post(`${API}/pres-create/${userInfo._id}`, prescrp, config)

        dispatch({
            type: PRESCRIPTION_CREATE_SUCCESS,
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
            type: PRESCRIPTION_CREATE_FAIL,
            payload: message,
        })
    }
}


export const listPrescriptions = () => async (dispatch, getState) => {
    try {
        dispatch({
            type: LIST_PRESCRIPTION_REQUEST,
        })

        const {
            userLogin: { userInfo },
        } = getState()

        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`,
            },
        }

        const { data } = await axios.get(`${API}/pres-list/${userInfo._id}`, config)

        dispatch({
            type: LIST_PRESCRIPTION_SUCCESS,
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
            type: LIST_PRESCRIPTION_FAIL,
            payload: message,
        })
    }
}

export const deletePrescription = (id) => async (dispatch, getState) => {
    try {
        dispatch({
            type: PRESCRIPTION_DELETE_REQUEST,
        })

        const {
            userLogin: { userInfo },
        } = getState()

        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`,
            },
        }

        await axios.delete(`${API}/pres-remove/${id}`, config)

        dispatch({ type: PRESCRIPTION_DELETE_SUCCESS })
    } catch (error) {
        const message =
            error.response && error.response.data.message
                ? error.response.data.message
                : error.message
        if (message === 'Not authorized, token failed') {
            dispatch(logout())
        }
        dispatch({
            type: PRESCRIPTION_DELETE_FAIL ,
            payload: message,
        })
    }
}