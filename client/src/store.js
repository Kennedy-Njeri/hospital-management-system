import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import {
    userLoginReducer,
    userRegisterReducer,
    userDetailsReducer,
    userUpdateProfileReducer,
    userListReducer,
    userDeleteReducer,
    usersDetailsReducer,
    usersRegisterReducer,
    usersUpdateProfileReducer
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
    testDetailsReducer,
    testPaidListReducer,
    testDetailsUserReducer
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
    prescriptionUpdateReducer,
    presPaidListReducer,
    prescriptionDetailsUserReducer
} from './reducers/prescriptionReducers'

import {
    patientCreateReducer,
    patientListReducer,
    patientDeleteReducer,
    patientGenderListReducer,
    patientStatusListReducer,
    patientTypesListReducer,
    patientDetailsReducer,
    patientUpdateReducer,
    patientDetailsUserReducer
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

import {
    departCreateReducer,
    departDeleteReducer,
    departDetailsReducer,
    departListReducer,
    departUpdateReducer
} from './reducers/departmentReducers'


import {
    designateCreateReducer,
    designateListReducer,
    designateDetailsReducer,
    designateDeleteReducer,
    designateUpdateReducer
} from './reducers/designationReducers'


import {
    specializeCreateReducer,
    specializeDeleteReducer,
    specializeDetailsReducer,
    specializeListReducer,
    specializeUpdateReducer
} from './reducers/specializeReducers'

import {
    vendorsDeleteReducer,
    vendorsListReducer
} from './reducers/vendorsReducers'

import {
    doctorCreateReducer,
    doctorDaysListReducer,
    doctorDetailsReducer,
    doctorDutyListReducer,
    doctorGenderListReducer,
    doctorListReducer,
    doctorsDeleteReducer,
    doctorUpdateReducer
} from './reducers/doctorsDetailsReducers'


import {
    expenseCreateReducer,
    expensesDeleteReducer,
    expensesDetailsReducer,
    expensesListReducer,
    expensesPaidListReducer,
    expensesUpdateReducer
} from './reducers/expensesReducers'

import {
    medicineCreateReducer,
    medicineDeleteReducer,
    medicineDetailsReducer,
    medicineListReducer,
    medicineTypeListReducer,
    medicineUpdateReducer
} from './reducers/medicineReducers'


import {
    vaccineCatCreateReducer,
    vaccineCatDeleteReducer,
    vaccineCatDetailsReducer,
    vaccineCatListReducer,
    vaccineCatTypeListReducer,
    vaccineCatUpdateReducer
} from './reducers/vaccineCatReducers'


import {
    vaccineAppCreateReducer,
    vaccineAppDeleteReducer,
    vaccineAppDetailsReducer,
    vaccineAppListReducer,
    vaccineAppUpdateReducer,
    vaccineDayTypeListReducer,
    vaccineTakenTypeListReducer
} from './reducers/vaccineAppointmentReducers'



const reducer = combineReducers({
    userLogin: userLoginReducer,
    userRegister: userRegisterReducer,
    userDetails: userDetailsReducer,
    userUpdateProfile: userUpdateProfileReducer,
    userList: userListReducer,
    userDelete: userDeleteReducer,
    usersUpdate: usersUpdateProfileReducer,
    usersCreate: usersRegisterReducer,
    usersDetails: usersDetailsReducer,
    catTestCreate: catCreateTestReducer,
    catTestList: catListMyReducer,
    catTestDelete: testCatDeleteReducer,
    catTestUpdate: testCatUpdateReducer,
    catTestDetails: catTestDetailsReducer,
    listTestResult: listTestMyReducer,
    testsdelete: testDeleteReducer,
    testUpdate: testUpdateReducer,
    testPaidList: testPaidListReducer,
    createTests: createTestReducer,
    testDetails: testDetailsReducer,
    testDetailsUser: testDetailsUserReducer,
    treatCreate: treatCreateReducer,
    treatLists: treatListMyReducer,
    treatDelete: treatCatDeleteReducer,
    treatDetails: treatmentDetailsReducer,
    treatUpdate: treatmentUpdateReducer,
    prescCreate: prescriptionCreateReducer,
    prescList: prescriptionListReducer,
    prescDelete: prescriptionDeleteReducer,
    prescEnumsList: prescriptionEnumsListReducer,
    presPaidList: presPaidListReducer,
    prescDetails: prescriptionDetailsReducer,
    prescDetailsUser: prescriptionDetailsUserReducer,
    prescUpdate: prescriptionUpdateReducer,
    patientCreate: patientCreateReducer,
    patientList: patientListReducer,
    patientDelete: patientDeleteReducer,
    patientGender: patientGenderListReducer,
    patientStatus: patientStatusListReducer,
    patientTypes: patientTypesListReducer,
    patientUpdate: patientUpdateReducer,
    patientDetails:patientDetailsReducer,
    patientDetailsUser: patientDetailsUserReducer,
    buidingCreate: buildingCreateReducer,
    buildingList: buildingListReducer,
    buildingUpdate: buildingUpdateReducer,
    buildingDelete: buildingDeleteReducer,
    buildingDetails: bildingDetailsReducer,
    floorCreate: floorCreateReducer,
    floorList: floorListReducer,
    floorDetails: floorDetailsReducer,
    floorUpdate: floorUpdateReducer,
    floorDelete: floorDeleteReducer,
    departsCreate: departCreateReducer,
    departsList: departListReducer,
    departsDetails: departDetailsReducer,
    departsDelete: departDeleteReducer,
    departsUpdate: departUpdateReducer,
    designateCreate:designateCreateReducer,
    designateList: designateListReducer,
    designateDetails: designateDetailsReducer,
    designateDelete: designateDeleteReducer,
    designateUpdate: designateUpdateReducer,
    specializeCreate: specializeCreateReducer,
    specializeList: specializeListReducer,
    specializeDetails: specializeDetailsReducer,
    specializeUpdate: specializeUpdateReducer,
    specializeDelete: specializeDeleteReducer,
    vendorsList: vendorsListReducer,
    vendorsDelete: vendorsDeleteReducer,
    doctorCreate: doctorCreateReducer,
    doctorList: doctorListReducer,
    doctorDetail: doctorDetailsReducer,
    doctorDelete: doctorsDeleteReducer,
    doctorUpdate: doctorUpdateReducer,
    doctorGender: doctorGenderListReducer,
    doctorDays: doctorDaysListReducer,
    doctorDuty: doctorDutyListReducer,
    expenseCreate: expenseCreateReducer,
    expenseList: expensesListReducer,
    expenseDetail: expensesDetailsReducer,
    expensesUpdate: expensesUpdateReducer,
    expensesDelete: expensesDeleteReducer,
    expensesPaid: expensesPaidListReducer,
    medicineCreate: medicineCreateReducer,
    medicineList: medicineListReducer,
    medicineUpdate: medicineUpdateReducer,
    medicineDetail: medicineDetailsReducer,
    medicineType: medicineTypeListReducer,
    medicineDelete: medicineDeleteReducer,
    vaccineCatCreate: vaccineCatCreateReducer,
    vaccineCatList: vaccineCatListReducer,
    vaccineCatDetail: vaccineCatDetailsReducer,
    vaccineCatDelete: vaccineCatDeleteReducer,
    vaccineCatUpdate: vaccineCatUpdateReducer,
    vaccineCatType: vaccineCatTypeListReducer,
    vaccineAppCreate: vaccineAppCreateReducer,
    vaccineAppList: vaccineAppListReducer,
    vaccineAppDetails: vaccineAppDetailsReducer,
    vaccineAppDelete: vaccineAppDeleteReducer,
    vaccineAppUpdate: vaccineAppUpdateReducer,
    vaccineAppTaken: vaccineTakenTypeListReducer,
    vaccineAppDays: vaccineDayTypeListReducer
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