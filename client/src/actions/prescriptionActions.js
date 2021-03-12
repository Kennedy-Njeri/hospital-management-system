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
    PRESCRIPTION_DELETE_SUCCESS,
    LIST_PRESCRIPTION_ENUMS_REQUEST,
    LIST_PRESCRIPTION_ENUMS_RESET,
    LIST_PRESCRIPTION_ENUMS_SUCCESS,
    LIST_PRESCRIPTION_ENUMS_FAIL,
    UPDATE_PRESCRIPTION_FAIL,
    UPDATE_PRESCRIPTION_REQUEST,
    UPDATE_PRESCRIPTION_RESET,
    UPDATE_PRESCRIPTION_SUCCESS,
    PRESCRIPTION_DETAILS_REQUEST,
    PRESCRIPTION_DETAILS_SUCCESS,
    PRESCRIPTION_DETAILS_FAIL,
    LIST_PAID_ENUMS_FAIL,
    LIST_PAID_ENUMS_REQUEST,
    LIST_PAID_ENUMS_RESET,
    LIST_PAID_ENUMS_SUCCESS,
    PRESCRIPTION_USER_DETAILS_FAIL,
    PRESCRIPTION_USER_DETAILS_REQUEST,
    PRESCRIPTION_USER_DETAILS_SUCCESS
} from '../constants/prescriptionConstants'
import { logout } from './userActions'
import { API } from "../config";



export const listPaidEnums = () => async (dispatch, getState) => {
    try {
        dispatch({
            type: LIST_PAID_ENUMS_REQUEST,
        })

        const {
            userLogin: { userInfo },
        } = getState()

        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`,
            },
        }

        const { data } = await axios.get(`${API}/pres/paid-values/${userInfo._id}`, config)

        dispatch({
            type: LIST_PAID_ENUMS_SUCCESS,
            payload: data,
        })
        //console.log(data)
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
            type: LIST_PAID_ENUMS_FAIL,
            payload: message,
        })
    }
}



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
        //console.log(data)
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

export const listEnumsPrescriptions = () => async (dispatch, getState) => {
    try {
        dispatch({
            type: LIST_PRESCRIPTION_ENUMS_REQUEST,
        })

        const {
            userLogin: { userInfo },
        } = getState()

        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`,
            },
        }

        const { data } = await axios.get(`${API}/pres/take-values/${userInfo._id}`, config)

        dispatch({
            type: LIST_PRESCRIPTION_ENUMS_SUCCESS,
            payload: data,
        })
        //console.log(data)
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
            type: LIST_PRESCRIPTION_ENUMS_FAIL,
            payload: message,
        })
    }
}

export const updatePrescription = (pres) => async (dispatch, getState) => {
    try {
        dispatch({
            type: UPDATE_PRESCRIPTION_REQUEST,
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

        console.log(pres)
        const { data } = await axios.put(
            `${API}/pres-update/${pres._id}/${userInfo._id}`,
            pres,
            config
        )

        dispatch({
            type: UPDATE_PRESCRIPTION_SUCCESS,
            payload: data,
        })
        dispatch({ type: PRESCRIPTION_DETAILS_SUCCESS, payload: data })
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
            type: UPDATE_PRESCRIPTION_FAIL,
            payload: message,
        })
    }
}

export const prescriptionDetails = (id) => async (dispatch, getState) => {
    try {
        dispatch({ type: PRESCRIPTION_DETAILS_REQUEST })

        const {
            userLogin: { userInfo },
        } = getState()


        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`,
            },
        }


        const { data } = await axios.get(`${API}/pres-detail/${id}/${userInfo._id}`, config)

        dispatch({
            type: PRESCRIPTION_DETAILS_SUCCESS,
            payload: data,
        })
        console.log(data)
    } catch (error) {
        console.log(error)
        dispatch({
            type: PRESCRIPTION_DETAILS_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        })
    }
}


export const prescriptionUsersDetails = (id) => async (dispatch, getState) => {
    try {
        dispatch({ type: PRESCRIPTION_USER_DETAILS_REQUEST })

        const {
            userLogin: { userInfo },
        } = getState()


        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`,
            },
        }


        const { data } = await axios.get(`${API}/pres-detail-user/${id}/${userInfo._id}`, config)

        dispatch({
            type: PRESCRIPTION_USER_DETAILS_SUCCESS,
            payload: data,
        })
        console.log(data)
    } catch (error) {
        console.log(error)
        dispatch({
            type: PRESCRIPTION_USER_DETAILS_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        })
    }
}