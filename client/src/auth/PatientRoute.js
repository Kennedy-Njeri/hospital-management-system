import React from "react";
import { Route, Redirect } from "react-router-dom";
import { useSelector, } from 'react-redux'




const PatientRoute = ({ component: Component, ...rest }) => {

    const userLogin = useSelector((state) => state.userLogin)
    const { userInfo } = userLogin


    return <Route
        {...rest}
        render={props =>
            userInfo && userInfo.role === 2 ? (
                <Component {...props} />
            ) : (
                <Redirect
                    to={{
                        pathname: "/signin",
                        state: {from: props.location}
                    }}
                />
            )
        }
    />
}

export default PatientRoute;