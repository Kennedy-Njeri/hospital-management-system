import axios from "axios";
import {API} from "../config";
import {logout} from "./userActions";
import {
    VENDORS_DELETE_FAIL,
    VENDORS_DELETE_REQUEST,
    VENDORS_DELETE_SUCCESS,
    LIST_VENDORS_FAIL,
    LIST_VENDORS_REQUEST,
    LIST_VENDORS_RESET,
    LIST_VENDORS_SUCCESS
} from '../constants/vendorsConstants'






export const listVendors = () => async (dispatch, getState) => {
    try {
        dispatch({
            type: LIST_VENDORS_REQUEST,
        })

        const {
            userLogin: { userInfo },
        } = getState()

        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`,
            },
        }

        const { data } = await axios.get(`${API}/vendor-list/${userInfo._id}`, config)

        dispatch({
            type: LIST_VENDORS_SUCCESS,
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
            type: LIST_VENDORS_FAIL,
            payload: message,
        })
    }
}


export const deleteVendors = (id) => async (dispatch, getState) => {
    try {
        dispatch({
            type: VENDORS_DELETE_REQUEST,
        })

        const {
            userLogin: { userInfo },
        } = getState()

        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`,
            },
        }

        await axios.delete(`${API}/vendor-remove/${id}/${userInfo._id}`, config)

        dispatch({ type: VENDORS_DELETE_SUCCESS })
    } catch (error) {
        const message =
            error.response && error.response.data.message
                ? error.response.data.message
                : error.message
        if (message === 'Not authorized, token failed') {
            dispatch(logout())
        }
        dispatch({
            type: VENDORS_DELETE_FAIL,
            payload: message,
        })
    }
}