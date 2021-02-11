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



const Routes = () => {
    return (
        <BrowserRouter>
            <Switch>
                <Route path="/signup" exact component={Signup} />
                <Route path="/signin" exact component={Signin} />
                <AdminRoute path="/" exact component={AdminDashboard} />
                <AdminRoute path="/profile/:userId" exact component={Profile} />
                <AdminRoute path="/test-result" exact component={ListTestResult} />
                <AdminRoute path="/update-cat-test/:catTestId" exact component={CatTestUpdate} />
                <AdminRoute path="/update-test/:testId" exact component={TestUpdate} />
                <AdminRoute path="/update-treatment/:treatmentId" exact component={TreatmentUpdate} />
                <AdminRoute path="/list/users" exact component={ListUsers} />
                <AdminRoute path="/list-cat-test" exact component={ListCatTest} />
                <AdminRoute path="/list-treat-cat" exact component={ListTreatment} />
                <AdminRoute path="/create/cat-test" exact component={CreateTestCat} />
                <AdminRoute path="/add-prescription" exact component={AddPrescription} />
                <AdminRoute path="/create/cat-treatment" exact component={CreateTreatment} />
                <AdminRoute path="/create-test" exact component={CreateTest} />
                <PrivateRoute path="/profile/:userId" exact component={Profile} />
            </Switch>
        </BrowserRouter>
    )
}


export default Routes;