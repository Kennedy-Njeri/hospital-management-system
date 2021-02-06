import React from "react";
import "../styles.css";
import Menu from "./Menu";




const Layout = ({
                    children,
                    links,
                    loggedin,
                }) => {
    
    return (
        <div>
            <Menu/>
            <div id="layoutSidenav">
                <div id="layoutSidenav_nav">
                    <nav className="sb-sidenav accordion sb-sidenav-dark" id="sidenavAccordion">
                        <div className="sb-sidenav-menu">
                            <div className="nav">
                            {links}
                            </div>
                        </div>
                        <div className="sb-sidenav-footer">
                            {loggedin}
                            Start Bootstrap
                        </div>
                    </nav>
                </div>
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