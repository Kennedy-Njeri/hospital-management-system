import React from "react";
import "../styles.css";
import Menu from "./Menu";




const Layout = ({
                    children
                }) => {
    return (
        <div>
            <Menu/>
            <div>{children}</div>
        </div>
    )
}

export default Layout;