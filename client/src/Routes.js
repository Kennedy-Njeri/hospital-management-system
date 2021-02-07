import React from "react"
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import AdminDashboard from './user/AdminDashboard';
import Signup from './user/Signup';
import Signin from './user/Signin';
import PrivateRoute from './auth/PrivateRoute';
import AdminRoute from './auth/AdminRoute';
import Profile from './user/Profile';
import ListUsers from './admin/ListUsers'
import CreateTestCat from './admin/CreateTestCat'



const Routes = () => {
    return (
        <BrowserRouter>
            <Switch>
                <Route path="/signup" exact component={Signup} />
                <Route path="/signin" exact component={Signin} />
                <AdminRoute path="/" exact component={AdminDashboard} />
                <AdminRoute path="/profile/:userId" exact component={Profile} />
                <AdminRoute path="/list/users" exact component={ListUsers} />
                <AdminRoute path="/create/cat-test" exact component={CreateTestCat} />
                <PrivateRoute path="/profile/:userId" exact component={Profile} />
            </Switch>
        </BrowserRouter>
    )
}


export default Routes;