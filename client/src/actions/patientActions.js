import axios from "axios";
import {API} from "../config";
import {logout} from "./userActions";
import {
    PATIENT_CREATE_FAIL,
    PATIENT_CREATE_REQUEST,
    PATIENT_CREATE_SUCCESS,
    LIST_PATIENT_FAIL,
    LIST_PATIENT_REQUEST,
    LIST_PATIENT_RESET,
    LIST_PATIENT_SUCCESS,
    PATIENT_DELETE_FAIL,
    PATIENT_DELETE_REQUEST,
    PATIENT_DELETE_SUCCESS,
    LIST_STATUS_ENUMS_FAIL,
    LIST_STATUS_ENUMS_REQUEST,
    LIST_STATUS_ENUMS_RESET,
    LIST_STATUS_ENUMS_SUCCESS,
    LIST_GENDER_ENUMS_FAIL,
    LIST_GENDER_ENUMS_REQUEST,
    LIST_GENDER_ENUMS_RESET,
    LIST_GENDER_ENUMS_SUCCESS,
    LIST_TYPES_ENUMS_FAIL,
    LIST_TYPES_ENUMS_REQUEST,
    LIST_TYPES_ENUMS_RESET,
    LIST_TYPES_ENUMS_SUCCESS,
    UPDATE_PATIENT_FAIL,
    UPDATE_PATIENT_REQUEST,
    UPDATE_PATIENT_RESET,
    UPDATE_PATIENT_SUCCESS,
    PATIENT_DETAILS_FAIL,
    PATIENT_DETAILS_REQUEST,
    PATIENT_DETAILS_SUCCESS,
    PATIENT_DETAILS_USER_FAIL,
    PATIENT_DETAILS_USER_REQUEST,
    PATIENT_DETAILS_USER_SUCCESS
} from '../constants/patientDetailsConstants'








export const createPatient = (patient) => async (dispatch, getState) => {
    try {
        dispatch({
            type: PATIENT_CREATE_REQUEST,
        })

        console.log(patient)
        const {
            userLogin: { userInfo },
        } = getState()

        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`,
            },
        }

        const { data } = await axios.post(`${API}/patient-create/${userInfo._id}`, patient, config)

        dispatch({
            type: PATIENT_CREATE_SUCCESS,
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
            type: PATIENT_CREATE_FAIL,
            payload: message,
        })
    }
}

export const listPatients = () => async (dispatch, getState) => {
    try {
        dispatch({
            type: LIST_PATIENT_REQUEST,
        })

        const {
            userLogin: { userInfo },
        } = getState()

        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`,
            },
        }

        const { data } = await axios.get(`${API}/patient-list/${userInfo._id}`, config)

        dispatch({
            type: LIST_PATIENT_SUCCESS,
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
            type: LIST_PATIENT_FAIL,
            payload: message,
        })
    }
}


export const deletePatients = (id) => async (dispatch, getState) => {
    try {
        dispatch({
            type: PATIENT_DELETE_REQUEST,
        })

        const {
            userLogin: { userInfo },
        } = getState()

        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`,
            },
        }

        await axios.delete(`${API}/patient-remove/${id}`, config)

        dispatch({ type: PATIENT_DELETE_SUCCESS })
    } catch (error) {
        const message =
            error.response && error.response.data.message
                ? error.response.data.message
                : error.message
        if (message === 'Not authorized, token failed') {
            dispatch(logout())
        }
        dispatch({
            type: PATIENT_DELETE_FAIL ,
            payload: message,
        })
    }
}


export const listStatusEnums = () => async (dispatch, getState) => {
    try {
        dispatch({
            type: LIST_STATUS_ENUMS_REQUEST,
        })

        const {
            userLogin: { userInfo },
        } = getState()

        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`,
            },
        }

        const { data } = await axios.get(`${API}/patient/status-values/${userInfo._id}`, config)

        dispatch({
            type: LIST_STATUS_ENUMS_SUCCESS,
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
            type: LIST_STATUS_ENUMS_FAIL,
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

        const { data } = await axios.get(`${API}/patient/gender-values/${userInfo._id}`, config)

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

export const listTypeEnums = () => async (dispatch, getState) => {
    try {
        dispatch({
            type: LIST_TYPES_ENUMS_REQUEST,
        })

        const {
            userLogin: { userInfo },
        } = getState()

        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`,
            },
        }

        const { data } = await axios.get(`${API}/patient/patient-type-values/${userInfo._id}`, config)

        dispatch({
            type: LIST_TYPES_ENUMS_SUCCESS,
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
            type: LIST_TYPES_ENUMS_FAIL,
            payload: message,
        })
    }
}

export const updatePatients = (pat) => async (dispatch, getState) => {
    try {
        dispatch({
            type: UPDATE_PATIENT_REQUEST,
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

        console.log(pat)
        const { data } = await axios.put(
            `${API}/patient-update/${pat._id}/${userInfo._id}`,
            pat,
            config
        )

        dispatch({
            type: UPDATE_PATIENT_SUCCESS,
            payload: data,
        })
        dispatch({ type: PATIENT_DETAILS_SUCCESS, payload: data })
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
            type: UPDATE_PATIENT_FAIL,
            payload: message,
        })
    }
}

export const patientsDetails = (id) => async (dispatch, getState) => {
    try {
        dispatch({ type: PATIENT_DETAILS_REQUEST })

        const {
            userLogin: { userInfo },
        } = getState()


        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`,
            },
        }


        const { data } = await axios.get(`${API}/patient-detail/${id}/${userInfo._id}`, config)

        dispatch({
            type: PATIENT_DETAILS_SUCCESS,
            payload: data,
        })
        console.log(data)
    } catch (error) {
        console.log(error)
        dispatch({
            type: PATIENT_DETAILS_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        })
    }
}


export const patientsDetailsUser = (id) => async (dispatch, getState) => {
    try {
        dispatch({ type: PATIENT_DETAILS_USER_REQUEST })

        const {
            userLogin: { userInfo },
        } = getState()


        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`,
            },
        }


        const { data } = await axios.get(`${API}/patient-detail-user/${id}/${userInfo._id}`, config)

        dispatch({
            type: PATIENT_DETAILS_USER_SUCCESS,
            payload: data,
        })
        console.log(data)
    } catch (error) {
        console.log(error)
        dispatch({
            type: PATIENT_DETAILS_USER_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        })
    }
}