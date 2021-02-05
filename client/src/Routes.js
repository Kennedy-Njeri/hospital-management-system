import React from "react"
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import AdminDashboard from './user/AdminDashboard';



const Routes = () => {
    return (
        <BrowserRouter>
            <Switch>
                <Route path="/" exact component={AdminDashboard} />
            </Switch>
        </BrowserRouter>
    )
}


export default Routes;