import React, {useEffect} from "react";
import Layout from "../core/Layout";
import {useSelector, useDispatch} from "react-redux";
import { listUsers } from '../actions/userActions'
import {Link} from "react-router-dom";
import { Bar, Pie } from 'react-chartjs-2';




const AdminDashboard = () => {

    const dispatch = useDispatch()

    const userList = useSelector((state) => state.userList)
    const { loading, error, users } = userList


    const countAdmins = () => {
       // let count = 0
       //
       //  for (const user of users) {
       //      if (user.role === 0) count++
       //      //console.log(count)
       //  }
       //
       //  return count
        return users.filter((user) => user.role === 0).length
    }

    const countDoctors = () => {
        return users.filter((user) => user.role === 1).length
    }

    const countPatients = () => {
        return users.filter((user) => user.role === 2).length
    }


    

    const data = {
        labels: ["Blue", "Red", "Yellow", "Green"],
        datasets: [
            {
                data: [12.21, 15.58, 11.25, 8.32],
                backgroundColor: ['#007bff', '#dc3545', '#ffc107', '#28a745'],
            }
        ]
    };

    


    
    const showLoading = () =>
        loading && (
            <div className="d-flex justify-content-center">
                <div className="spinner-border" role="status">
                    <span className="sr-only">Loading...</span>
                </div>
            </div>
        )

    const showError = () => (
        <div className="alert alert-danger" style={{ display: error ? '' : 'none' }}>
            {error}
        </div>
    );

    
    

    useEffect(() => {
        dispatch(listUsers())
    },[])

    return (
        <Layout title="Dashboard">

                {loading ? (
                    showLoading()
                ) : error ? (
                    showError()
                ) : (
                    <div className="row">
            <div className="col-xl-3 col-md-6">
                            <div className="card bg-primary text-white mb-4">
                                <div className="card-body">Admin Users</div>
                                <div className="card-footer d-flex align-items-center justify-content-between">
                                    <Link className="small text-white stretched-link" to={`/list/users`}>{countAdmins()}</Link>
                                    <div className="small text-white"><i className="fas fa-angle-right"></i>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-xl-3 col-md-6">
                            <div className="card bg-warning text-white mb-4">
                                <div className="card-body">Doctors</div>
                                <div className="card-footer d-flex align-items-center justify-content-between">
                                    <Link className="small text-white stretched-link" to={`/list/users`}>{countDoctors()}</Link>
                                    <div className="small text-white"><i className="fas fa-angle-right"></i>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-xl-3 col-md-6">
                            <div className="card bg-success text-white mb-4">
                                <div className="card-body">Payments</div>
                                <div className="card-footer d-flex align-items-center justify-content-between">
                                    <a className="small text-white stretched-link" href="#">Ksh 4,0000</a>
                                    <div className="small text-white"><i className="fas fa-angle-right"></i>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-xl-3 col-md-6">
                            <div className="card bg-danger text-white mb-4">
                                <div className="card-body">Expenses</div>
                                <div className="card-footer d-flex align-items-center justify-content-between">
                                    <a className="small text-white stretched-link" href="#">Ksh 3,000</a>
                                    <div className="small text-white"><i className="fas fa-angle-right"></i>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="col-lg-6">
                            <div className="card mb-4">
                                <div className="card-header">
                                    <i className="fas fa-chart-pie mr-1"></i>
                                    Pie Chart Example
                                </div>
                                <div className="card-body">
                                    <Pie data={data}/>

                                </div>
                                <div className="card-footer small text-muted">Updated yesterday at 11:59 PM</div>
                            </div>
                        </div>

                    </div>

                ) }

        </Layout>
    )

}




export default AdminDashboard