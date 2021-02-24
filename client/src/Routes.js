import React from "react"
import { BrowserRouter , Switch, Route } from 'react-router-dom';
import AdminDashboard from './user/AdminDashboard';
import Signup from './user/Signup';
import Signin from './user/Signin';
import PrivateRoute from './auth/PrivateRoute';
import AdminRoute from './auth/AdminRoute';
import Profile from './user/Profile';
import ListUsers from './admin/ListUsers'
import ListCatTest from './admin/ListCatTest'
import CreateTestCat from './admin/CreateTestCat'
import CatTestUpdate from './admin/CatTestUpdate'
import ListTestResult from './admin/ListTestResult'
import CreateTest from './admin/CreateTest'
import TestUpdate from './admin/TestUpdate'
import ListTreatment from './admin/ListTreatment'
import CreateTreatment from './admin/CreateTreatment'
import TreatmentUpdate from './admin/TreatmentUpdate'
import AddPrescription from './admin/AddPrescription'
import ListPrescriptions from './admin/ListPrescriptions'
import UpdatePrescriptions from './admin/UpdatePrescriptions'
import AddPatientDetails from './admin/AddPatientDetails'
import ListPatients from './admin/ListPatients'
import UpdatePatientProfile from './admin/UpdatePatientProfile'
import ListBuildings from './admin/ListBuildings'
import AddBuilding from './admin/AddBuilding'
import UpdateBuilding from './admin/UpdateBuilding'
import ListFloors from './admin/ListFloors'
import AddFloor from './admin/AddFloor'
import UpdateFloor from './admin/UpdateFloor'
import UpdateUsers from './admin/UpdateUsers'
import AddUsers from './admin/AddUsers'
import ListDeparts from './admin/ListDeparts'



const Routes = () => {
    return (
        <BrowserRouter>
            <Switch>
                <Route path="/signup" exact component={Signup} />
                <Route path="/signin" exact component={Signin} />
                <AdminRoute path="/" exact component={AdminDashboard} />
                <AdminRoute path="/profile/:userId" exact component={Profile} />
                <AdminRoute path="/update/users/:id" exact component={UpdateUsers} />
                <AdminRoute path="/test-result" exact component={ListTestResult} />
                <AdminRoute path="/list-prescriptions" exact component={ListPrescriptions} />
                <AdminRoute path="/update-cat-test/:catTestId" exact component={CatTestUpdate} />
                <AdminRoute path="/update-test/:testId" exact component={TestUpdate} />
                <AdminRoute path="/update-prescription/:id" exact component={UpdatePrescriptions} />
                <AdminRoute path="/update-building/:id" exact component={UpdateBuilding} />
                <AdminRoute path="/update-floor/:id" exact component={UpdateFloor} />
                <AdminRoute path="/update-patient/:id" exact component={UpdatePatientProfile} />
                <AdminRoute path="/update-treatment/:treatmentId" exact component={TreatmentUpdate} />
                <AdminRoute path="/list/users" exact component={ListUsers} />
                <AdminRoute path="/list-cat-test" exact component={ListCatTest} />
                <AdminRoute path="/list-patients" exact component={ListPatients} />
                <AdminRoute path="/list-treat-cat" exact component={ListTreatment} />
                <AdminRoute path="/list-buildings" exact component={ListBuildings} />
                <AdminRoute path="/list-floors" exact component={ListFloors} />
                <AdminRoute path="/list-departs" exact component={ListDeparts} />
                <AdminRoute path="/create/cat-test" exact component={CreateTestCat} />
                <AdminRoute path="/add-prescription" exact component={AddPrescription} />
                <AdminRoute path="/create/cat-treatment" exact component={CreateTreatment} />
                <AdminRoute path="/create-test" exact component={CreateTest} />
                <AdminRoute path="/add-patient-details" exact component={AddPatientDetails} />
                <AdminRoute path="/add-building" exact component={AddBuilding} />
                <AdminRoute path="/add-floor" exact component={AddFloor} />
                <AdminRoute path="/add-users" exact component={AddUsers} />
                <PrivateRoute path="/profile/:userId" exact component={Profile} />
            </Switch>
        </BrowserRouter>
    )
}


export default Routes;