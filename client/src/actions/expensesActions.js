import axios from "axios";
import {API} from "../config";
import {logout} from "./userActions";
import {
    EXPENSES_CREATE_FAIL,
    EXPENSES_CREATE_REQUEST,
    EXPENSES_CREATE_RESET,
    EXPENSES_CREATE_SUCCESS,
    LIST_EXPENSES_FAIL,
    LIST_EXPENSES_REQUEST,
    LIST_EXPENSES_RESET,
    LIST_EXPENSES_SUCCESS,
    EXPENSES_DELETE_FAIL,
    EXPENSES_DELETE_REQUEST,
    EXPENSES_DELETE_SUCCESS,
    EXPENSES_UPDATE_FAIL,
    EXPENSES_UPDATE_REQUEST,
    EXPENSES_UPDATE_RESET,
    EXPENSES_UPDATE_SUCCESS,
    EXPENSES_DETAILS_FAIL,
    EXPENSES_DETAILS_REQUEST,
    EXPENSES_DETAILS_SUCCESS,
    LIST_PAID_ENUMS_FAIL,
    LIST_PAID_ENUMS_SUCCESS,
    LIST_PAID_ENUMS_REQUEST,
    LIST_PAID_ENUMS_RESET
} from '../constants/expensesConstants'








export const createExpenses = (expense) => async (dispatch, getState) => {
    try {
        dispatch({
            type: EXPENSES_CREATE_REQUEST,
        })

        const {
            userLogin: { userInfo },
        } = getState()

        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`,
            },
        }

        const { data } = await axios.post(`${API}/expenses-create/${userInfo._id}`, expense, config)

        dispatch({
            type: EXPENSES_CREATE_SUCCESS,
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
            type: EXPENSES_CREATE_FAIL,
            payload: message,
        })
    }
}


export const listExpenses = () => async (dispatch, getState) => {
    try {
        dispatch({
            type: LIST_EXPENSES_REQUEST,
        })

        const {
            userLogin: { userInfo },
        } = getState()

        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`,
            },
        }

        const { data } = await axios.get(`${API}/expenses-list/${userInfo._id}`, config)

        dispatch({
            type: LIST_EXPENSES_SUCCESS,
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
            type: LIST_EXPENSES_FAIL,
            payload: message,
        })
    }
}


export const deleteExpenses = (id) => async (dispatch, getState) => {
    try {
        dispatch({
            type: EXPENSES_DELETE_REQUEST,
        })

        const {
            userLogin: { userInfo },
        } = getState()

        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`,
            },
        }

        await axios.delete(`${API}/expenses-remove/${id}/${userInfo._id}`, config)

        dispatch({ type: EXPENSES_DELETE_SUCCESS })
    } catch (error) {
        const message =
            error.response && error.response.data.message
                ? error.response.data.message
                : error.message
        if (message === 'Not authorized, token failed') {
            dispatch(logout())
        }
        dispatch({
            type: EXPENSES_DELETE_FAIL,
            payload: message,
        })
    }
}


export const updateExpense = (expe) => async (dispatch, getState) => {
    try {
        dispatch({
            type: EXPENSES_UPDATE_REQUEST,
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

        console.log(expe)
        const { data } = await axios.put(
            `${API}/expenses-update/${expe._id}/${userInfo._id}`,
            expe,
            config
        )

        dispatch({
            type: EXPENSES_UPDATE_SUCCESS,
            payload: data,
        })
        dispatch({ type: EXPENSES_DETAILS_SUCCESS, payload: data })
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
            type: EXPENSES_UPDATE_FAIL,
            payload: message,
        })
    }
}


export const expensesDetails = (id) => async (dispatch, getState) => {
    try {
        dispatch({ type: EXPENSES_DETAILS_REQUEST })

        const {
            userLogin: { userInfo },
        } = getState()


        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`,
            },
        }


        const { data } = await axios.get(`${API}/expenses-detail/${id}/${userInfo._id}`, config)

        dispatch({
            type: EXPENSES_DETAILS_SUCCESS,
            payload: data,
        })
        //console.log(data)
    } catch (error) {
        console.log(error)
        dispatch({
            type: EXPENSES_DETAILS_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        })
    }
}


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

        const { data } = await axios.get(`${API}/expenses/paid-values/${userInfo._id}`, config)

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