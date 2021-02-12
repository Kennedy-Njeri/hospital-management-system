import React, {Fragment} from "react";
import "../styles.css";
import Menu from "./Menu";
import {Link, withRouter} from "react-router-dom";
import {useSelector} from "react-redux";



// history must match with path which is /signup e.g
const isActive = (history, path) => {
    if (history.location.pathname === path) {
        return { color: "#ff9900" };
    } else {
        return { color: "#ffffff" };
    }
};


const Layout = ({
                    children,
                    history

                }) => {

    const userLogin = useSelector((state) => state.userLogin)
    const { userInfo } = userLogin
    

    const adminLinks = () => {
        return (
            <Fragment>
                <div className="sb-sidenav-menu-heading">Core</div>
                <Link className="nav-link" style={isActive(history, '/')} to="/">
                    <div className="sb-nav-link-icon"><i className="fas fa-tachometer-alt"></i></div>
                    Dashboard
                </Link>


                <Link className="nav-link" style={isActive(history, `/profile/${userInfo._id}`)} to={`/profile/${userInfo._id}`}>
                    <div className="sb-nav-link-icon"><i className="bi bi-person-badge-fill"></i></div>
                    Update Profile
                </Link>

                <Link className="nav-link" style={isActive(history, '/list/users')} to="/list/users">
                    <div className="sb-nav-link-icon"><i className="bi bi-people"></i></div>
                    List Users
                </Link>




                <div className="sb-sidenav-menu-heading">Modules</div>
                <a className="nav-link collapsed" href="#" data-toggle="collapse"
                   data-target="#collapseLayouts" aria-expanded="false" aria-controls="collapseLayouts">
                    <div className="sb-nav-link-icon"><i className="bi bi-eyedropper"></i></div>
                    Laboratory
                    <div className="sb-sidenav-collapse-arrow"><i className="fas fa-angle-down"></i></div>
                </a>
                <div className="collapse" id="collapseLayouts" aria-labelledby="headingOne"
                     data-parent="#sidenavAccordion">
                    <nav className="sb-sidenav-menu-nested nav">
                        <Link className="nav-link" style={isActive(history, '/create/cat-test')} to="/create/cat-test">Add Test Category</Link>
                        <Link className="nav-link" style={isActive(history, '/list-cat-test')} to="/list-cat-test">Category Test List</Link>
                        <Link className="nav-link" style={isActive(history, '/test-result')} to="/test-result">List Result</Link>
                        <Link className="nav-link" style={isActive(history, '/create-test')} to="/create-test">Create Test</Link>
                    </nav>
                </div>










                <a className="nav-link collapsed" href="#" data-toggle="collapse"
                   data-target="#collapsePages" aria-expanded="false" aria-controls="collapsePages">
                    <div className="sb-nav-link-icon"><i className="bi bi-journal-medical"></i></div>
                    Modules Mgmt
                    <div className="sb-sidenav-collapse-arrow"><i className="fas fa-angle-down"></i></div>
                </a>
                <div className="collapse" id="collapsePages" aria-labelledby="headingTwo"
                     data-parent="#sidenavAccordion">
                    <nav className="sb-sidenav-menu-nested nav accordion" id="sidenavAccordionPages">
                        <a className="nav-link collapsed" href="#" data-toggle="collapse"
                           data-target="#pagesCollapseAuth" aria-expanded="false"
                           aria-controls="pagesCollapseAuth">
                            Medication
                            <div className="sb-sidenav-collapse-arrow"><i className="fas fa-angle-down"></i>
                            </div>
                        </a>
                        <div className="collapse" id="pagesCollapseAuth" aria-labelledby="headingOne"
                             data-parent="#sidenavAccordionPages">
                            <nav className="sb-sidenav-menu-nested nav">
                                <Link className="nav-link" style={isActive(history, '/list-treat-cat')} to="/list-treat-cat">Treatment List</Link>
                                <Link className="nav-link" style={isActive(history, '/create/cat-treatment')} to='/create/cat-treatment'>Add Treatment</Link>
                                <Link className="nav-link" style={isActive(history, '/add-prescription')} to="/add-prescription">Add Prescription</Link>
                                <Link className="nav-link" style={isActive(history, '/list-prescriptions')} to="/list-prescriptions">Prescription List</Link>
                            </nav>
                        </div>
                        <a className="nav-link collapsed" href="#" data-toggle="collapse"
                           data-target="#pagesCollapseError" aria-expanded="false"
                           aria-controls="pagesCollapseError">
                            Error
                            <div className="sb-sidenav-collapse-arrow"><i className="fas fa-angle-down"></i>
                            </div>
                        </a>
                        <div className="collapse" id="pagesCollapseError" aria-labelledby="headingOne"
                             data-parent="#sidenavAccordionPages">
                            <nav className="sb-sidenav-menu-nested nav">
                                <a className="nav-link" href="401.html">401 Page</a>
                                <a className="nav-link" href="404.html">404 Page</a>
                                <a className="nav-link" href="500.html">500 Page</a>
                            </nav>
                        </div>
                    </nav>
                </div>





                <div className="sb-sidenav-menu-heading">Patient Details</div>
                <Link className="nav-link" to="/add-patient-details">
                    <div className="sb-nav-link-icon"><i className="fas fa-chart-area"></i></div>
                    Add Patient
                </Link>
                <a className="nav-link" href="tables.html">
                    <div className="sb-nav-link-icon"><i className="fas fa-table"></i></div>
                    Tables
                </a>





            </Fragment>

        );
    };


    const loggedIn = () => (
        <div className="small">Logged in as:{userInfo.name}</div>

    ) 
    return (
        <div>
            <Menu/>
            <div id="layoutSidenav">
                <div id="layoutSidenav_nav">
                    <nav className="sb-sidenav accordion sb-sidenav-dark" id="sidenavAccordion">
                        <div className="sb-sidenav-menu">
                            <div className="nav">
                            {adminLinks()}
                            </div>
                        </div>
                        <div className="sb-sidenav-footer">
                            {loggedIn()}
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

export default withRouter(Layout);