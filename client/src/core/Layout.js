import React from "react";
import "../styles.css";
import Menu from "./Menu";




const Layout = ({
                    children,
                    links,
                }) => {

    
    
    return (
        <div>
            <Menu/>
            <div id="layoutSidenav">
                {links}
                <div id="layoutSidenav_content">
                    <main>
                        <div className="container-fluid">
                            <h1 className="mt-4">Dashboard</h1>
                            <ol className="breadcrumb mb-4">
                                <li className="breadcrumb-item active">Dashboard</li>
                            </ol>
                            {children}
                        </div>
                    </main>
                </div>
            </div>
        </div>
    )
}

export default Layout;