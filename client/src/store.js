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
} from './reducers/testReducers'




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