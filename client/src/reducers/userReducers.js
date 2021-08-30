import {
    USER_DETAILS_FAIL,
    USER_DETAILS_REQUEST,
    USER_DETAILS_RESET,
    USER_DETAILS_SUCCESS,
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
    USER_LIST_REQUEST,
    USER_LIST_SUCCESS,
    USER_LIST_FAIL,
    USER_LIST_RESET,
    USER_DELETE_REQUEST,
    USER_DELETE_SUCCESS,
    USER_DELETE_FAIL,
    USER_UPDATE_PROFILE_RESET,
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
import {
    FLOOR_DETAILS_FAIL,
    FLOOR_DETAILS_REQUEST,
    FLOOR_DETAILS_SUCCESS, FLOOR_UPDATE_FAIL,
    FLOOR_UPDATE_REQUEST, FLOOR_UPDATE_RESET, FLOOR_UPDATE_SUCCESS
} from "../constants/floorConstants";





export const userLoginReducer = (state = {}, action) => {
    switch (action.type) {
        case USER_LOGIN_REQUEST:
            return { loading: true }
        case USER_LOGIN_SUCCESS:
            return { loading: false, userInfo: action.payload }
        case USER_LOGIN_FAIL:
            return { loading: false, error: action.payload }
        case USER_LOGOUT:
            return {}
        default:
            return state
    }
}


export const userRegisterReducer = (state = {}, action) => {
    switch (action.type) {
        case USER_REGISTER_REQUEST:
            return { loading: true }
        case USER_REGISTER_SUCCESS:
            return { loading: false, userInfo: action.payload }
        case USER_REGISTER_FAIL:
            return { loading: false, error: action.payload }
        case USER_LOGOUT:
            return {}
        default:
            return state
    }
}


export const userDetailsReducer = (state = { user: {} }, action) => {
    switch (action.type) {
        case USER_DETAILS_REQUEST:
            return { ...state, loading: true }
        case USER_DETAILS_SUCCESS:
            return { loading: false, user: action.payload }
        case USER_DETAILS_FAIL:
            return { loading: false, error: action.payload }
        case USER_DETAILS_RESET:
            return { user: {} }
        default:
            return state
    }
}


export const userUpdateProfileReducer = (state = {}, action) => {
    switch (action.type) {
        case USER_UPDATE_PROFILE_REQUEST:
            return { loading: true }
        case USER_UPDATE_PROFILE_SUCCESS:
            return { loading: false, success: true, userInfo: action.payload }
        case USER_UPDATE_PROFILE_FAIL:
            return { loading: false, error: action.payload }
        case USER_UPDATE_PROFILE_RESET:
            return {}
        default:
            return state
    }
}


export const userListReducer = (state = { users: [] }, action) => {
    switch (action.type) {
        case USER_LIST_REQUEST:
            return { loading: true }
        case USER_LIST_SUCCESS:
            return { loading: false, users: action.payload }
        case USER_LIST_FAIL:
            return { loading: false, error: action.payload }
        case USER_LIST_RESET:
            return { users: [] }
        default:
            return state
    }
}

export const userDeleteReducer = (state = {}, action) => {
    switch (action.type) {
        case USER_DELETE_REQUEST:
            return { loading: true }
        case USER_DELETE_SUCCESS:
            return { loading: false, success: true }
        case USER_DELETE_FAIL:
            return { loading: false, error: action.payload }
        default:
            return state
    }
}


export const usersDetailsReducer = (state = { users: {} }, action) => {
    switch (action.type) {
        case USERS_DETAILS_REQUEST:
            return { ...state, loading: true }
        case USERS_DETAILS_SUCCESS:
            return { loading: false, users: action.payload }
        case USERS_DETAILS_FAIL:
            return { loading: false, error: action.payload }
        default:
            return state
    }
}



export const usersRegisterReducer = (state = {}, action) => {
    switch (action.type) {
        case USERS_REGISTER_REQUEST:
            return { loading: true }
        case USERS_REGISTER_SUCCESS:
            return { loading: false, success: true, user: action.payload }
        case USERS_REGISTER_FAIL:
            return { loading: false, error: action.payload }
        case USERS_REGISTER_RESET:
            return {}
        default:
            return state
    }
}



export const usersUpdateProfileReducer = (state = { user: {} }, action) => {
    switch (action.type) {
        case USERS_UPDATE_PROFILE_REQUEST:
            return { loading: true }
        case USERS_UPDATE_PROFILE_SUCCESS:
            return { loading: false, success: true, user: action.payload }
        case USERS_UPDATE_PROFILE_FAIL:
            return { loading: false, error: action.payload }
        case USERS_UPDATE_PROFILE_RESET:
            return { user: {} }
        default:
            return state
    }
}