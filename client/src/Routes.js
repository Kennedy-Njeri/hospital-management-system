import React from "react"
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import AdminDashboard from './user/AdminDashboard';
import Signup from './user/Signup';
import Signin from './user/Signin';
import PrivateRoute from './auth/PrivateRoute';
import Profile from './user/Profile';



const Routes = () => {
    return (
        <BrowserRouter>
            <Switch>
                <Route path="/signup" exact component={Signup} />
                <Route path="/signin" exact component={Signin} />
                <PrivateRoute path="/" exact component={AdminDashboard} />
                <PrivateRoute path="/profile/:userId" exact component={Profile} />
            </Switch>
        </BrowserRouter>
    )
}


export default Routes;