import React from "react";
import { Route, Redirect } from "react-router-dom";
import { useSelector, } from 'react-redux'



const PrivateRoute = ({ component: Component, ...rest }) => {

    const userLogin = useSelector((state) => state.userLogin)
    const { userInfo } = userLogin


    return <Route
        {...rest}
        render={props =>
            userInfo && userInfo.user.role === 0 ? (
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

export default PrivateRoute;