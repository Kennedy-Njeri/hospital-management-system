import axios from "axios";
import {API} from "../config";
import {logout} from "./userActions";
import {
    DOCTOR_CREATE_FAIL,
    DOCTOR_CREATE_REQUEST,
    DOCTOR_CREATE_SUCCESS,
    DOCTOR_DELETE_FAIL,
    DOCTOR_DELETE_REQUEST,
    DOCTOR_DELETE_SUCCESS,
    LIST_DOCTOR_FAIL,
    LIST_DOCTOR_REQUEST,
    LIST_DOCTOR_SUCCESS,
    LIST_GENDER_ENUMS_FAIL,
    LIST_GENDER_ENUMS_REQUEST,
    LIST_GENDER_ENUMS_SUCCESS,
    LIST_DUTY_ENUMS_FAIL,
    LIST_DUTY_ENUMS_REQUEST,
    LIST_DUTY_ENUMS_SUCCESS,
    LIST_DAYS_ENUMS_FAIL,
    LIST_DAYS_ENUMS_REQUEST,
    LIST_DAYS_ENUMS_SUCCESS,
    UPDATE_DOCTOR_FAIL,
    UPDATE_DOCTOR_REQUEST,
    UPDATE_DOCTOR_SUCCESS,
    DOCTOR_DETAILS_FAIL,
    DOCTOR_DETAILS_REQUEST,
    DOCTOR_DETAILS_SUCCESS

} from '../constants/doctorsDetailsConstants'







export const createDoctor = (doctor) => async (dispatch, getState) => {
    try {
        dispatch({
            type: DOCTOR_CREATE_REQUEST,
        })

        console.log(doctor)
        const {
            userLogin: { userInfo },
        } = getState()

        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`,
            },
        }

        const { data } = await axios.post(`${API}/doctor-create/${userInfo._id}`, doctor, config)

        dispatch({
            type: DOCTOR_CREATE_SUCCESS,
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
            type: DOCTOR_CREATE_FAIL,
            payload: message,
        })
    }
}


export const listDoctors = () => async (dispatch, getState) => {
    try {
        dispatch({
            type: LIST_DOCTOR_REQUEST,
        })

        const {
            userLogin: { userInfo },
        } = getState()

        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`,
            },
        }

        const { data } = await axios.get(`${API}/doctor-list/${userInfo._id}`, config)

        dispatch({
            type: LIST_DOCTOR_SUCCESS,
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
            type: LIST_DOCTOR_FAIL,
            payload: message,
        })
    }
}

export const deleteDoctors = (id) => async (dispatch, getState) => {
    try {
        dispatch({
            type: DOCTOR_DELETE_REQUEST,
        })

        const {
            userLogin: { userInfo },
        } = getState()

        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`,
            },
        }

        await axios.delete(`${API}/doctor-remove/${id}`, config)

        dispatch({ type: DOCTOR_DELETE_SUCCESS })
    } catch (error) {
        const message =
            error.response && error.response.data.message
                ? error.response.data.message
                : error.message
        if (message === 'Not authorized, token failed') {
            dispatch(logout())
        }
        dispatch({
            type: DOCTOR_DELETE_FAIL ,
            payload: message,
        })
    }
}


export const listGenderEnums = () => async (dispatch, getState) => {
    try {
        dispatch({
            type: LIST_GENDER_ENUMS_REQUEST,
        })

        const {
            userLogin: { userInfo },
        } = getState()

        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`,
            },
        }

        const { data } = await axios.get(`${API}/doctor/gender-values/${userInfo._id}`, config)

        dispatch({
            type: LIST_GENDER_ENUMS_SUCCESS,
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
            type: LIST_GENDER_ENUMS_FAIL,
            payload: message,
        })
    }
}


export const listDaysEnums = () => async (dispatch, getState) => {
    try {
        dispatch({
            type: LIST_DAYS_ENUMS_REQUEST,
        })

        const {
            userLogin: { userInfo },
        } = getState()

        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`,
            },
        }

        const { data } = await axios.get(`${API}/doctor/days-values/${userInfo._id}`, config)

        dispatch({
            type: LIST_DAYS_ENUMS_SUCCESS,
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
            type: LIST_DAYS_ENUMS_FAIL,
            payload: message,
        })
    }
}


export const listDutyEnums = () => async (dispatch, getState) => {
    try {
        dispatch({
            type: LIST_DUTY_ENUMS_REQUEST,
        })

        const {
            userLogin: { userInfo },
        } = getState()

        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`,
            },
        }

        const { data } = await axios.get(`${API}/doctor/duty-values/${userInfo._id}`, config)

        dispatch({
            type: LIST_DUTY_ENUMS_SUCCESS,
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
            type: LIST_DUTY_ENUMS_FAIL,
            payload: message,
        })
    }
}


export const updateDoctors = (doc) => async (dispatch, getState) => {
    try {
        dispatch({
            type: UPDATE_DOCTOR_REQUEST,
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

        console.log(doc)
        const { data } = await axios.put(
            `${API}/doctor-update/${doc._id}/${userInfo._id}`,
            doc,
            config
        )

        dispatch({
            type: UPDATE_DOCTOR_SUCCESS,
            payload: data,
        })
        dispatch({ type: DOCTOR_DETAILS_SUCCESS, payload: data })
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
            type: UPDATE_DOCTOR_FAIL,
            payload: message,
        })
    }
}


export const doctorDetails = (id) => async (dispatch, getState) => {
    try {
        dispatch({ type: DOCTOR_DETAILS_REQUEST })

        const {
            userLogin: { userInfo },
        } = getState()


        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`,
            },
        }


        const { data } = await axios.get(`${API}/doctor-detail/${id}/${userInfo._id}`, config)

        dispatch({
            type: DOCTOR_DETAILS_SUCCESS,
            payload: data,
        })
        console.log(data)
    } catch (error) {
        console.log(error)
        dispatch({
            type: DOCTOR_DETAILS_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        })
    }
}