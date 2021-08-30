import axios from "axios";
import {API} from "../config";
import {logout} from "./userActions";
import {
    CREATE_MEDICINE_FAIL,
    CREATE_MEDICINE_REQUEST,
    CREATE_MEDICINE_RESET,
    CREATE_MEDICINE_SUCCESS,
    LIST_MEDICINE_FAIL,
    LIST_MEDICINE_REQUEST,
    LIST_MEDICINE_RESET,
    LIST_MEDICINE_SUCCESS,
    DELETE_MEDICINE_FAIL,
    DELETE_MEDICINE_REQUEST,
    DELETE_MEDICINE_SUCCESS,
    UPDATE_MEDICINE_FAIL,
    UPDATE_MEDICINE_REQUEST,
    UPDATE_MEDICINE_RESET,
    UPDATE_MEDICINE_SUCCESS,
    DETAILS_MEDICINE_FAIL,
    DETAILS_MEDICINE_REQUEST,
    DETAILS_MEDICINE_SUCCESS,
    LIST_TYPE_ENUMS_FAIL,
    LIST_TYPE_ENUMS_REQUEST,
    LIST_TYPE_ENUMS_RESET,
    LIST_TYPE_ENUMS_SUCCESS
} from '../constants/medicineConstants'








export const createMedicine = (med) => async (dispatch, getState) => {
    try {
        dispatch({
            type: CREATE_MEDICINE_REQUEST,
        })

        const {
            userLogin: { userInfo },
        } = getState()

        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`,
            },
        }

        const { data } = await axios.post(`${API}/medicine-create/${userInfo._id}`, med, config)

        dispatch({
            type: CREATE_MEDICINE_SUCCESS,
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
            type: CREATE_MEDICINE_FAIL,
            payload: message,
        })
    }
}



export const listMedicines = () => async (dispatch, getState) => {
    try {
        dispatch({
            type: LIST_MEDICINE_REQUEST,
        })

        const {
            userLogin: { userInfo },
        } = getState()

        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`,
            },
        }

        const { data } = await axios.get(`${API}/medicine-list/${userInfo._id}`, config)

        dispatch({
            type: LIST_MEDICINE_SUCCESS,
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
            type: LIST_MEDICINE_FAIL,
            payload: message,
        })
    }
}


export const deleteMedicine = (id) => async (dispatch, getState) => {
    try {
        dispatch({
            type: DELETE_MEDICINE_REQUEST,
        })

        const {
            userLogin: { userInfo },
        } = getState()

        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`,
            },
        }

        await axios.delete(`${API}/medicine-remove/${id}/${userInfo._id}`, config)

        dispatch({ type: DELETE_MEDICINE_SUCCESS })
    } catch (error) {
        const message =
            error.response && error.response.data.message
                ? error.response.data.message
                : error.message
        if (message === 'Not authorized, token failed') {
            dispatch(logout())
        }
        dispatch({
            type: DELETE_MEDICINE_FAIL,
            payload: message,
        })
    }
}


export const updateMedicine = (med) => async (dispatch, getState) => {
    try {
        dispatch({
            type: UPDATE_MEDICINE_REQUEST,
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

        console.log(med)
        const { data } = await axios.put(
            `${API}/medicine-update/${med._id}/${userInfo._id}`,
            med,
            config
        )

        dispatch({
            type: UPDATE_MEDICINE_SUCCESS,
            payload: data,
        })
        dispatch({ type: DETAILS_MEDICINE_SUCCESS, payload: data })
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
            type: UPDATE_MEDICINE_FAIL,
            payload: message,
        })
    }
}


export const detailsMedicine = (id) => async (dispatch, getState) => {
    try {
        dispatch({ type: DETAILS_MEDICINE_REQUEST })

        const {
            userLogin: { userInfo },
        } = getState()


        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`,
            },
        }


        const { data } = await axios.get(`${API}/medicine-detail/${id}/${userInfo._id}`, config)

        dispatch({
            type: DETAILS_MEDICINE_SUCCESS,
            payload: data,
        })
        //console.log(data)
    } catch (error) {
        console.log(error)
        dispatch({
            type: DETAILS_MEDICINE_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        })
    }
}


export const listTypesEnums = () => async (dispatch, getState) => {
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

        const { data } = await axios.get(`${API}/medicine/medicine-type-values/${userInfo._id}`, config)

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