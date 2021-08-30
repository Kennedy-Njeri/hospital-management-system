import axios from "axios";
import {API} from "../config";
import {logout} from "./userActions";
import {
    CREATE_VACCINE_FAIL,
    CREATE_VACCINE_REQUEST,
    CREATE_VACCINE_RESET,
    CREATE_VACCINE_SUCCESS,
    LIST_VACCINE_FAIL,
    LIST_VACCINE_REQUEST,
    LIST_VACCINE_RESET,
    LIST_VACCINE_SUCCESS,
    UPDATE_VACCINE_FAIL,
    UPDATE_VACCINE_REQUEST,
    UPDATE_VACCINE_RESET,
    UPDATE_VACCINE_SUCCESS,
    DELETE_VACCINE_FAIL,
    DELETE_VACCINE_REQUEST,
    DELETE_VACCINE_SUCCESS,
    DETAILS_VACCINE_FAIL,
    DETAILS_VACCINE_REQUEST,
    DETAILS_VACCINE_SUCCESS,
    LIST_TYPE_ENUMS_FAIL,
    LIST_TYPE_ENUMS_SUCCESS,
    LIST_TYPE_ENUMS_REQUEST,
    LIST_TYPE_ENUMS_RESET
} from '../constants/vaccineCat'







export const createVacCat = (vac) => async (dispatch, getState) => {
    try {
        dispatch({
            type: CREATE_VACCINE_REQUEST,
        })

        const {
            userLogin: { userInfo },
        } = getState()

        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`,
            },
        }

        const { data } = await axios.post(`${API}/vaccine-create/${userInfo._id}`, vac, config)

        dispatch({
            type: CREATE_VACCINE_SUCCESS,
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
            type: CREATE_VACCINE_FAIL,
            payload: message,
        })
    }
}


export const listVacCat = () => async (dispatch, getState) => {
    try {
        dispatch({
            type: LIST_VACCINE_REQUEST,
        })

        const {
            userLogin: { userInfo },
        } = getState()

        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`,
            },
        }

        const { data } = await axios.get(`${API}/vaccine-list/${userInfo._id}`, config)

        dispatch({
            type: LIST_VACCINE_SUCCESS,
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
            type: LIST_VACCINE_FAIL,
            payload: message,
        })
    }
}


export const deleteVacCat = (id) => async (dispatch, getState) => {
    try {
        dispatch({
            type: DELETE_VACCINE_REQUEST,
        })

        const {
            userLogin: { userInfo },
        } = getState()

        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`,
            },
        }

        await axios.delete(`${API}/vaccine-remove/${id}/${userInfo._id}`, config)

        dispatch({ type: DELETE_VACCINE_SUCCESS })
    } catch (error) {
        const message =
            error.response && error.response.data.message
                ? error.response.data.message
                : error.message
        if (message === 'Not authorized, token failed') {
            dispatch(logout())
        }
        dispatch({
            type: DELETE_VACCINE_FAIL,
            payload: message,
        })
    }
}


export const updateVacCat = (vac) => async (dispatch, getState) => {
    try {
        dispatch({
            type: UPDATE_VACCINE_REQUEST,
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

        console.log(vac)
        const { data } = await axios.put(
            `${API}/vaccine-update/${vac._id}/${userInfo._id}`,
            vac,
            config
        )

        dispatch({
            type: UPDATE_VACCINE_SUCCESS,
            payload: data,
        })
        dispatch({ type: DETAILS_VACCINE_SUCCESS, payload: data })
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
            type: UPDATE_VACCINE_FAIL,
            payload: message,
        })
    }
}


export const detailsVacCat = (id) => async (dispatch, getState) => {
    try {
        dispatch({ type: DETAILS_VACCINE_REQUEST })

        const {
            userLogin: { userInfo },
        } = getState()


        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`,
            },
        }


        const { data } = await axios.get(`${API}/vaccine-detail/${id}/${userInfo._id}`, config)

        dispatch({
            type: DETAILS_VACCINE_SUCCESS,
            payload: data,
        })
        //console.log(data)
    } catch (error) {
        console.log(error)
        dispatch({
            type: DETAILS_VACCINE_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        })
    }
}


export const listVacTypesEnums = () => async (dispatch, getState) => {
    try {
        dispatch({
            type: LIST_TYPE_ENUMS_REQUEST,
        })

        const {
            userLogin: { userInfo },
        } = getState()

        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`,
            },
        }

        const { data } = await axios.get(`${API}/vaccine/vaccine-type-values/${userInfo._id}`, config)

        dispatch({
            type: LIST_TYPE_ENUMS_SUCCESS,
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
            type: LIST_TYPE_ENUMS_FAIL,
            payload: message,
        })
    }
}