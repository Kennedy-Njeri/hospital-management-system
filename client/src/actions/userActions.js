import axios from 'axios'
import {
    USER_DETAILS_FAIL,
    USER_DETAILS_REQUEST,
    USER_DETAILS_SUCCESS,
    USER_DETAILS_RESET,
    USER_LOGIN_FAIL,
    USER_LOGIN_REQUEST,
    USER_LOGIN_SUCCESS,
    USER_LOGOUT,
    USER_REGISTER_FAIL,
    USER_REGISTER_REQUEST,
    USER_REGISTER_SUCCESS,
    USER_UPDATE_PROFILE_FAIL,
    USER_UPDATE_PROFILE_REQUEST,
    USER_UPDATE_PROFILE_SUCCESS,
    USER_LIST_FAIL,
    USER_LIST_SUCCESS,
    USER_LIST_REQUEST,
    USER_LIST_RESET,
    USER_DELETE_REQUEST,
    USER_DELETE_SUCCESS,
    USER_DELETE_FAIL,
    USERS_DETAILS_FAIL,
    USERS_DETAILS_REQUEST,
    USERS_DETAILS_RESET,
    USERS_DETAILS_SUCCESS,
    USERS_REGISTER_FAIL,
    USERS_REGISTER_REQUEST,
    USERS_REGISTER_SUCCESS,
    USERS_REGISTER_RESET,
    USERS_UPDATE_PROFILE_FAIL,
    USERS_UPDATE_PROFILE_REQUEST,
    USERS_UPDATE_PROFILE_RESET,
    USERS_UPDATE_PROFILE_SUCCESS
} from '../constants/userConstants'
import { API } from "../config";




export const login = (email, password) => async (dispatch) => {
    try {
        dispatch({
            type: USER_LOGIN_REQUEST,
        })

        const config = {
            headers: {
                'Content-Type': 'application/json',
            },
        }

        const {data} = await axios.post(
            `${API}/signin`,
            {email, password},
            config
        )

        dispatch({
            type: USER_LOGIN_SUCCESS,
            payload: data,
        })


        console.log(data)
        localStorage.setItem('userInfo', JSON.stringify(data))
    } catch (error) {
        //console.log()
        dispatch({
            type: USER_LOGIN_FAIL,
            payload: error.response && error.response.data.message
                ? error.response.data.message
                : error.message

        })
    }
}



export const logout = () => (dispatch) => {
    localStorage.removeItem('userInfo')
    // localStorage.removeItem('cartItems')
    // localStorage.removeItem('shippingAddress')
    // localStorage.removeItem('paymentMethod')
    dispatch({ type: USER_LOGOUT })
    dispatch({ type: USER_DETAILS_RESET })
    //dispatch({ type: ORDER_LIST_MY_RESET })
    //dispatch({ type: USER_LIST_RESET })
    document.location.href = '/signin'
}


export const register = (name, email, password) => async (dispatch) => {
    try {
        dispatch({
            type: USER_REGISTER_REQUEST,
        })

        const config = {
            headers: {
                'Content-Type': 'application/json',
            },
        }

        const { data } = await axios.post(
            `${API}/signup`,
            { name, email, password },
            config
        )

        dispatch({
            type: USER_REGISTER_SUCCESS,
            payload: data,
        })

        dispatch({
            type: USER_LOGIN_SUCCESS,
            payload: data,
        })

        localStorage.setItem('userInfo', JSON.stringify(data))
    } catch (error) {
        dispatch({
            type: USER_REGISTER_FAIL,
            payload: error.response && error.response.data.message
                ? error.response.data.message
                : error.message
        })
    }
}


export const getUserDetails = (userId) => async (dispatch, getState) => {
    try {
        dispatch({
            type: USER_DETAILS_REQUEST,
        })

        const {
            userLogin: { userInfo },
        } = getState()

        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`,
            },
        }

        console.log(userInfo.token)

        const { data } = await axios.get(`${API}/user/${userId}`, config)
        console.log(data)

        dispatch({
            type: USER_DETAILS_SUCCESS,
            payload: data,
        })
    } catch (error) {
        const message = error.response && error.response.data.message
            ? error.response.data.message
            : error.message
        // if (message === 'Not authorized, token failed') {
        //     dispatch(logout())
        // }
        dispatch({
            type: USER_DETAILS_FAIL,
            payload: message,
        })
    }
}

export const updateUserProfile = (user) => async (dispatch, getState) => {
    try {
        dispatch({
            type: USER_UPDATE_PROFILE_REQUEST,
        })

        const {
            userLogin: {userInfo},
        } = getState()

        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`,
            },
        }

        const {data} = await axios.put(`${API}/user/${userInfo._id}`, user, config)

        dispatch({
            type: USER_UPDATE_PROFILE_SUCCESS,
            payload: data,
        })

        dispatch({
            type: USER_LOGIN_SUCCESS,
            payload: data,
        })

        localStorage.setItem('userInfo', JSON.stringify(data))
    }
    catch (error) {
            const message =
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message
            if (message === 'Not authorized, token failed') {
                dispatch(logout())
            }
            dispatch({
                type: USER_UPDATE_PROFILE_FAIL,
                payload: message,
            })
        }
}


export const listUsers = () => async (dispatch, getState) => {
    try {
        dispatch({
            type: USER_LIST_REQUEST,
        })

        const {
            userLogin: { userInfo },
        } = getState()

        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`,
            },
        }

        const { data } = await axios.get(`${API}/users/get`, config)

        dispatch({
            type: USER_LIST_SUCCESS,
            payload: data,
        })
    } catch (error) {
        const message =
            error.response && error.response.data.message
                ? error.response.data.message
                : error.message
        if (message === 'Not authorized, token failed') {
            dispatch(logout())
        }
        dispatch({
            type: USER_LIST_FAIL,
            payload: message,
        })
    }
}



export const deleteUser = (id) => async (dispatch, getState) => {
    try {
        dispatch({
            type: USER_DELETE_REQUEST,
        })

        const {
            userLogin: { userInfo },
        } = getState()

        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`,
            },
        }

        await axios.delete(`${API}/users/delete/${id}`, config)

        dispatch({ type: USER_DELETE_SUCCESS })
    } catch (error) {
        const message =
            error.response && error.response.data.message
                ? error.response.data.message
                : error.message
        if (message === 'Not authorized, token failed') {
            dispatch(logout())
        }
        dispatch({
            type: USER_DELETE_FAIL,
            payload: message,
        })
    }
}


export const updateUsersProfile = (user) => async (dispatch, getState) => {
    try {
        dispatch({
            type: USERS_UPDATE_PROFILE_REQUEST,
        })

        const {
            userLogin: {userInfo},
        } = getState()

        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`,
            },
        }

        const {data} = await axios.put(`${API}/users/update/${user._id}/${userInfo._id}`, user, config)

        dispatch({
            type: USERS_UPDATE_PROFILE_SUCCESS,
            payload: data,
        })

        dispatch({ type: USERS_DETAILS_SUCCESS, payload: data })
    }
    catch (error) {
        const message =
            error.response && error.response.data.message
                ? error.response.data.message
                : error.message
        if (message === 'Not authorized, token failed') {
            dispatch(logout())
        }
        dispatch({
            type: USERS_UPDATE_PROFILE_FAIL,
            payload: message,
        })
    }
}

export const usersRegister = (details) => async (dispatch, getState) => {
    try {
        dispatch({
            type: USERS_REGISTER_REQUEST,
        })

        const {
            userLogin: {userInfo},
        } = getState()

        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`,
            },
        }

        const { data } = await axios.post(`${API}/register-users/${userInfo._id}`, details, config )

        dispatch({
            type: USERS_REGISTER_SUCCESS,
            payload: data,
        })

    } catch (error) {
        dispatch({
            type: USERS_REGISTER_FAIL,
            payload: error.response && error.response.data.message
                ? error.response.data.message
                : error.message
        })
    }
}


export const getUsersDetails = (id) => async (dispatch, getState) => {
    try {
        dispatch({
            type: USERS_DETAILS_REQUEST,
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

        const { data } = await axios.get(`${API}/users/other/${id}/${userInfo._id}`, config)
        console.log(data)

        dispatch({
            type: USERS_DETAILS_SUCCESS,
            payload: data,
        })
    } catch (error) {
        const message = error.response && error.response.data.message
            ? error.response.data.message
            : error.message
        if (message === 'Not authorized, token failed') {
            dispatch(logout())
        }
        dispatch({
            type: USERS_DETAILS_FAIL,
            payload: message,
        })
    }
}