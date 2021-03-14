import {
    CREATE_APPOINTMENT_VACCINE_FAIL,
    CREATE_APPOINTMENT_VACCINE_REQUEST,
    CREATE_APPOINTMENT_VACCINE_RESET,
    CREATE_APPOINTMENT_VACCINE_SUCCESS,
    LIST_APPOINTMENT_VACCINE_FAIL,
    LIST_APPOINTMENT_VACCINE_REQUEST,
    LIST_APPOINTMENT_VACCINE_RESET,
    LIST_APPOINTMENT_VACCINE_SUCCESS,
    UPDATE_APPOINTMENT_VACCINE_FAIL,
    UPDATE_APPOINTMENT_VACCINE_REQUEST,
    UPDATE_APPOINTMENT_VACCINE_RESET,
    UPDATE_APPOINTMENT_VACCINE_SUCCESS,
    DELETE_APPOINTMENT_VACCINE_FAIL,
    DELETE_APPOINTMENT_VACCINE_REQUEST,
    DELETE_APPOINTMENT_VACCINE_SUCCESS,
    DETAILS_APPOINTMENT_VACCINE_FAIL,
    DETAILS_APPOINTMENT_VACCINE_REQUEST,
    DETAILS_APPOINTMENT_VACCINE_SUCCESS,
    LIST_DAY_ENUMS_FAIL,
    LIST_DAY_ENUMS_REQUEST,
    LIST_DAY_ENUMS_RESET,
    LIST_DAY_ENUMS_SUCCESS,
    LIST_TAKEN_ENUMS_FAIL,
    LIST_TAKEN_ENUMS_REQUEST,
    LIST_TAKEN_ENUMS_RESET,
    LIST_TAKEN_ENUMS_SUCCESS
} from '../constants/vaccineAppointmentConstants'









export const vaccineAppCreateReducer = (state = {}, action) => {
    switch (action.type) {
        case CREATE_APPOINTMENT_VACCINE_REQUEST:
            return { loading: true }
        case CREATE_APPOINTMENT_VACCINE_SUCCESS:
            return { loading: false, success: true, appointment: action.payload }
        case CREATE_APPOINTMENT_VACCINE_FAIL:
            return { loading: false, error: action.payload }
        case CREATE_APPOINTMENT_VACCINE_RESET:
            return {}
        default:
            return state
    }
}


export const vaccineAppListReducer = (state = { appointments: [] }, action) => {
    switch (action.type) {
        case LIST_APPOINTMENT_VACCINE_REQUEST:
            return {
                loading: true,
            }
        case LIST_APPOINTMENT_VACCINE_SUCCESS:
            return {
                loading: false,
                appointments: action.payload,
            }
        case LIST_APPOINTMENT_VACCINE_FAIL:
            return {
                loading: false,
                error: action.payload,
            }
        case LIST_APPOINTMENT_VACCINE_RESET:
            return { appointments: [] }
        default:
            return state
    }
}

export const vaccineAppDeleteReducer = (state = {}, action) => {
    switch (action.type) {
        case DELETE_APPOINTMENT_VACCINE_REQUEST:
            return { loading: true }
        case DELETE_APPOINTMENT_VACCINE_SUCCESS:
            return { loading: false, success: true }
        case DELETE_APPOINTMENT_VACCINE_FAIL:
            return { loading: false, error: action.payload }
        default:
            return state
    }
}

export const vaccineAppUpdateReducer = (state = { appointment: {} }, action) => {

    switch (action.type) {
        case UPDATE_APPOINTMENT_VACCINE_REQUEST:
            return { loading: true }
        case UPDATE_APPOINTMENT_VACCINE_SUCCESS:
            return { loading: false, success: true, appointment: action.payload }
        case UPDATE_APPOINTMENT_VACCINE_FAIL:
            return { loading: false, error: action.payload }
        case UPDATE_APPOINTMENT_VACCINE_RESET:
            return { appointment: {} }
        default:
            return state
    }
}

export const vaccineAppDetailsReducer = (
    state = { appointment: {} },
    action
) => {
    switch (action.type) {
        case DETAILS_APPOINTMENT_VACCINE_REQUEST:
            return { ...state, loading: true }
        case DETAILS_APPOINTMENT_VACCINE_SUCCESS:
            return { loading: false, appointment: action.payload }
        case DETAILS_APPOINTMENT_VACCINE_FAIL:
            return { loading: false, error: action.payload }
        default:
            return state
    }
}

export const vaccineDayTypeListReducer = (state = { days: [] }, action) => {
    switch (action.type) {
        case LIST_DAY_ENUMS_REQUEST:
            return {
                loading: true,
            }
        case LIST_DAY_ENUMS_SUCCESS:
            return {
                loading: false,
                days: action.payload,
            }
        case LIST_DAY_ENUMS_FAIL:
            return {
                loading: false,
                error: action.payload,
            }
        case LIST_DAY_ENUMS_RESET:
            return { days: [] }
        default:
            return state
    }
}

export const vaccineTakenTypeListReducer = (state = { takes: [] }, action) => {
    switch (action.type) {
        case LIST_TAKEN_ENUMS_REQUEST:
            return {
                loading: true,
            }
        case LIST_TAKEN_ENUMS_SUCCESS:
            return {
                loading: false,
                takes: action.payload,
            }
        case LIST_TAKEN_ENUMS_FAIL:
            return {
                loading: false,
                error: action.payload,
            }
        case LIST_TAKEN_ENUMS_RESET:
            return { takes: [] }
        default:
            return state
    }
}