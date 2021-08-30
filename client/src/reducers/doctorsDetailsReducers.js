import {
    DOCTOR_CREATE_FAIL,
    DOCTOR_CREATE_REQUEST,
    DOCTOR_CREATE_RESET,
    DOCTOR_CREATE_SUCCESS,
    DOCTOR_DELETE_FAIL,
    DOCTOR_DELETE_REQUEST,
    DOCTOR_DELETE_SUCCESS,
    LIST_DOCTOR_FAIL,
    LIST_DOCTOR_REQUEST,
    LIST_DOCTOR_RESET,
    LIST_DOCTOR_SUCCESS,
    LIST_GENDER_ENUMS_FAIL,
    LIST_GENDER_ENUMS_REQUEST,
    LIST_GENDER_ENUMS_RESET,
    LIST_GENDER_ENUMS_SUCCESS,
    LIST_DUTY_ENUMS_FAIL,
    LIST_DUTY_ENUMS_REQUEST,
    LIST_DUTY_ENUMS_RESET,
    LIST_DUTY_ENUMS_SUCCESS,
    LIST_DAYS_ENUMS_FAIL,
    LIST_DAYS_ENUMS_REQUEST,
    LIST_DAYS_ENUMS_RESET,
    LIST_DAYS_ENUMS_SUCCESS,
    UPDATE_DOCTOR_FAIL,
    UPDATE_DOCTOR_REQUEST,
    UPDATE_DOCTOR_RESET,
    UPDATE_DOCTOR_SUCCESS,
    DOCTOR_DETAILS_FAIL,
    DOCTOR_DETAILS_REQUEST,
    DOCTOR_DETAILS_SUCCESS

} from '../constants/doctorsDetailsConstants'









export const doctorCreateReducer = (state = {}, action) => {
    switch (action.type) {
        case DOCTOR_CREATE_REQUEST:
            return { loading: true }
        case DOCTOR_CREATE_SUCCESS:
            return { loading: false, success: true, doctor: action.payload }
        case DOCTOR_CREATE_FAIL:
            return { loading: false, error: action.payload }
        case DOCTOR_CREATE_RESET:
            return {}
        default:
            return state
    }
}


export const doctorListReducer = (state = { doctors: [] }, action) => {
    switch (action.type) {
        case LIST_DOCTOR_REQUEST:
            return {
                loading: true,
            }
        case LIST_DOCTOR_SUCCESS:
            return {
                loading: false,
                doctors: action.payload,
            }
        case LIST_DOCTOR_FAIL:
            return {
                loading: false,
                error: action.payload,
            }
        case LIST_DOCTOR_RESET:
            return { doctors: [] }
        default:
            return state
    }
}

export const doctorsDeleteReducer = (state = {}, action) => {
    switch (action.type) {
        case DOCTOR_DELETE_REQUEST:
            return { loading: true }
        case DOCTOR_DELETE_SUCCESS:
            return { loading: false, success: true }
        case DOCTOR_DELETE_FAIL:
            return { loading: false, error: action.payload }
        default:
            return state
    }
}


export const doctorGenderListReducer = (state = { genders: [] }, action) => {
    switch (action.type) {
        case LIST_GENDER_ENUMS_REQUEST:
            return {
                loading: true,
            }
        case LIST_GENDER_ENUMS_SUCCESS:
            return {
                loading: false,
                genders: action.payload,
            }
        case LIST_GENDER_ENUMS_FAIL:
            return {
                loading: false,
                error: action.payload,
            }
        case LIST_GENDER_ENUMS_RESET:
            return { genders: [] }
        default:
            return state
    }
}


export const doctorDutyListReducer = (state = { duties: [] }, action) => {
    switch (action.type) {
        case LIST_DUTY_ENUMS_REQUEST:
            return {
                loading: true,
            }
        case LIST_DUTY_ENUMS_SUCCESS:
            return {
                loading: false,
                duties: action.payload,
            }
        case LIST_DUTY_ENUMS_FAIL:
            return {
                loading: false,
                error: action.payload,
            }
        case LIST_DUTY_ENUMS_RESET:
            return { duties: [] }
        default:
            return state
    }
}

export const doctorDaysListReducer = (state = { dayes: [] }, action) => {
    switch (action.type) {
        case LIST_DAYS_ENUMS_REQUEST:
            return {
                loading: true,
            }
        case LIST_DAYS_ENUMS_SUCCESS:
            return {
                loading: false,
                dayes: action.payload,
            }
        case LIST_DAYS_ENUMS_FAIL:
            return {
                loading: false,
                error: action.payload,
            }
        case LIST_DAYS_ENUMS_RESET:
            return { dayes: [] }
        default:
            return state
    }
}


export const doctorUpdateReducer = (state = { doc: {} }, action) => {

    switch (action.type) {
        case UPDATE_DOCTOR_REQUEST:
            return { loading: true }
        case UPDATE_DOCTOR_SUCCESS:
            return { loading: false, success: true, doc: action.payload }
        case UPDATE_DOCTOR_FAIL:
            return { loading: false, error: action.payload }
        case UPDATE_DOCTOR_RESET:
            return { doc: {} }
        default:
            return state
    }
}

export const doctorDetailsReducer = (
    state = { doctor: {} },
    action
) => {
    switch (action.type) {
        case DOCTOR_DETAILS_REQUEST:
            return { ...state, loading: true }
        case DOCTOR_DETAILS_SUCCESS:
            return { loading: false, doctor: action.payload }
        case DOCTOR_DETAILS_FAIL:
            return { loading: false, error: action.payload }
        default:
            return state
    }
}