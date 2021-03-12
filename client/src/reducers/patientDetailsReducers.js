import {
    PATIENT_CREATE_FAIL,
    PATIENT_CREATE_REQUEST,
    PATIENT_CREATE_RESET,
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









export const patientCreateReducer = (state = {}, action) => {
    switch (action.type) {
        case PATIENT_CREATE_REQUEST:
            return { loading: true }
        case PATIENT_CREATE_SUCCESS:
            return { loading: false, success: true, patient: action.payload }
        case PATIENT_CREATE_FAIL:
            return { loading: false, error: action.payload }
        case PATIENT_CREATE_RESET:
            return {}
        default:
            return state
    }
}


export const patientListReducer = (state = { patients: [] }, action) => {
    switch (action.type) {
        case LIST_PATIENT_REQUEST:
            return {
                loading: true,
            }
        case LIST_PATIENT_SUCCESS:
            return {
                loading: false,
                patients: action.payload,
            }
        case LIST_PATIENT_FAIL:
            return {
                loading: false,
                error: action.payload,
            }
        case LIST_PATIENT_RESET:
            return { patients: [] }
        default:
            return state
    }
}


export const patientDeleteReducer = (state = {}, action) => {
    switch (action.type) {
        case PATIENT_DELETE_REQUEST:
            return { loading: true }
        case PATIENT_DELETE_SUCCESS:
            return { loading: false, success: true }
        case PATIENT_DELETE_FAIL:
            return { loading: false, error: action.payload }
        default:
            return state
    }
}


export const patientStatusListReducer = (state = { status: [] }, action) => {
    switch (action.type) {
        case LIST_STATUS_ENUMS_REQUEST:
            return {
                loading: true,
            }
        case LIST_STATUS_ENUMS_SUCCESS:
            return {
                loading: false,
                status: action.payload,
            }
        case LIST_STATUS_ENUMS_FAIL:
            return {
                loading: false,
                error: action.payload,
            }
        case LIST_STATUS_ENUMS_RESET:
            return { status: [] }
        default:
            return state
    }
}

export const patientGenderListReducer = (state = { genders: [] }, action) => {
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


export const patientTypesListReducer = (state = { types: [] }, action) => {
    switch (action.type) {
        case LIST_TYPES_ENUMS_REQUEST:
            return {
                loading: true,
            }
        case LIST_TYPES_ENUMS_SUCCESS:
            return {
                loading: false,
                types: action.payload,
            }
        case LIST_TYPES_ENUMS_FAIL:
            return {
                loading: false,
                error: action.payload,
            }
        case LIST_TYPES_ENUMS_RESET:
            return { types: [] }
        default:
            return state
    }
}

export const patientUpdateReducer = (state = { pat: {} }, action) => {

    switch (action.type) {
        case UPDATE_PATIENT_REQUEST:
            return { loading: true }
        case UPDATE_PATIENT_SUCCESS:
            return { loading: false, success: true, pat: action.payload }
        case UPDATE_PATIENT_FAIL:
            return { loading: false, error: action.payload }
        case UPDATE_PATIENT_RESET:
            return { pat: {} }
        default:
            return state
    }
}

export const patientDetailsReducer = (
    state = { patient: {} },
    action
) => {
    switch (action.type) {
        case PATIENT_DETAILS_REQUEST:
            return { ...state, loading: true }
        case PATIENT_DETAILS_SUCCESS:
            return { loading: false, patient: action.payload }
        case PATIENT_DETAILS_FAIL:
            return { loading: false, error: action.payload }
        default:
            return state
    }
}


export const patientDetailsUserReducer = (
    state = { patient: {} },
    action
) => {
    switch (action.type) {
        case PATIENT_DETAILS_USER_REQUEST:
            return { ...state, loading: true }
        case PATIENT_DETAILS_USER_SUCCESS:
            return { loading: false, patient: action.payload }
        case PATIENT_DETAILS_USER_FAIL:
            return { loading: false, error: action.payload }
        default:
            return state
    }
}