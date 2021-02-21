import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import {
    userLoginReducer,
    userRegisterReducer,
    userDetailsReducer,
    userUpdateProfileReducer,
    userListReducer,
    userDeleteReducer
} from './reducers/userReducers'
import {
    catCreateTestReducer,
    catListMyReducer,
    testCatDeleteReducer,
    testCatUpdateReducer,
    catTestDetailsReducer,
    listTestMyReducer,
    testDeleteReducer,
    testUpdateReducer,
    createTestReducer,
    testDetailsReducer
} from './reducers/testReducers'

import {
    treatCreateReducer,
    treatListMyReducer,
    treatCatDeleteReducer,
    treatmentDetailsReducer,
    treatmentUpdateReducer
} from './reducers/treatmentReducers'

import {
    prescriptionCreateReducer,
    prescriptionListReducer,
    prescriptionDeleteReducer,
    prescriptionEnumsListReducer,
    prescriptionDetailsReducer,
    prescriptionUpdateReducer
} from './reducers/prescriptionReducers'

import {
    patientCreateReducer,
    patientListReducer,
    patientDeleteReducer,
    patientGenderListReducer,
    patientStatusListReducer,
    patientTypesListReducer,
    patientDetailsReducer,
    patientUpdateReducer
} from './reducers/patientDetailsReducers'

import {
    bildingDetailsReducer,
    buildingCreateReducer,
    buildingDeleteReducer,
    buildingListReducer,
    buildingUpdateReducer
} from './reducers/building-floorReducers'

import {
    floorCreateReducer,
    floorDeleteReducer,
    floorDetailsReducer,
    floorListReducer,
    floorUpdateReducer
} from './reducers/floorReducer'




const reducer = combineReducers({
    userLogin: userLoginReducer,
    userRegister: userRegisterReducer,
    userDetails: userDetailsReducer,
    userUpdateProfile: userUpdateProfileReducer,
    userList: userListReducer,
    userDelete: userDeleteReducer,
    catTestCreate: catCreateTestReducer,
    catTestList: catListMyReducer,
    catTestDelete: testCatDeleteReducer,
    catTestUpdate: testCatUpdateReducer,
    catTestDetails: catTestDetailsReducer,
    listTestResult: listTestMyReducer,
    testsdelete: testDeleteReducer,
    testUpdate: testUpdateReducer,
    createTests: createTestReducer,
    testDetails: testDetailsReducer,
    treatCreate: treatCreateReducer,
    treatLists: treatListMyReducer,
    treatDelete: treatCatDeleteReducer,
    treatDetails: treatmentDetailsReducer,
    treatUpdate: treatmentUpdateReducer,
    prescCreate: prescriptionCreateReducer,
    prescList: prescriptionListReducer,
    prescDelete: prescriptionDeleteReducer,
    prescEnumsList: prescriptionEnumsListReducer,
    prescDetails: prescriptionDetailsReducer,
    prescUpdate: prescriptionUpdateReducer,
    patientCreate: patientCreateReducer,
    patientList: patientListReducer,
    patientDelete: patientDeleteReducer,
    patientGender: patientGenderListReducer,
    patientStatus: patientStatusListReducer,
    patientTypes: patientTypesListReducer,
    patientUpdate: patientUpdateReducer,
    patientDetails:patientDetailsReducer,
    buidingCreate: buildingCreateReducer,
    buildingList: buildingListReducer,
    buildingUpdate: buildingUpdateReducer,
    buildingDelete: buildingDeleteReducer,
    buildingDetails: bildingDetailsReducer,
    floorCreate: floorCreateReducer,
    floorList: floorListReducer,
    floorDetails: floorDetailsReducer,
    floorUpdate: floorUpdateReducer,
    floorDelete: floorDeleteReducer
})

const userInfoFromStorage = localStorage.getItem('userInfo')
    ? JSON.parse(localStorage.getItem('userInfo'))
    : null

const initialState = {
    userLogin: { userInfo: userInfoFromStorage }
}


const middleware = [thunk]

const store = createStore(
    reducer,
    initialState,
    composeWithDevTools(applyMiddleware(...middleware))
)




export default store