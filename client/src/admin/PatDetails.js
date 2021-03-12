import React, {useEffect, useState} from 'react'
import Layout from '../core/Layout';
//import { listUsers, deleteUser  } from '../actions/userActions'
import { useDispatch, useSelector } from 'react-redux'
import {Link} from "react-router-dom";
import "../styles.css";
import { patientsDetailsUser } from '../actions/patientActions'








const PatDetails = ({ history, match }) => {

    const id = match.params.id
    

    const dispatch = useDispatch()

    const userLogin = useSelector((state) => state.userLogin)
    const { userInfo } = userLogin

    const patientDetailsUser = useSelector((state) => state.patientDetailsUser)
    const { patient } = patientDetailsUser

    console.log(patient)

    useEffect(() => {
        if (userInfo && userInfo.role === 0) {
            dispatch(patientsDetailsUser(id))
        } else {
            history.push('/login')
        }
    }, [dispatch, history, userInfo])
    

    return (
        <Layout title="Profile" description="Update your profile" className="container-fluid">

            <div className="container">
                <div className="row">
                    <div className="col-xs-12 col-sm-9">


                        <div className="card">
                            <div className="card-header">
                                <h4 className="card-title">User profile</h4>
                            </div>
                            <div className="card-body">
                                <div className="profile__avatar">
                                    <img src="https://bootdey.com/img/Content/avatar/avatar5.png" alt="..."/>
                                </div>
                                <div className="profile__header">
                                    <h4><small>Administrator</small></h4>
                                    <p className="text-muted">
                                        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Non nostrum odio cum
                                        repellat veniam eligendi rem cumque magnam autem delectus qui.
                                    </p>
                                    <p>
                                        <a href="#">bootdey.com</a>
                                    </p>
                                </div>

                            </div>
                           
                        </div>



                        <div className="card">
                            <div className="card-header">
                                <h4 className="card-title">User info</h4>
                            </div>
                            <div className="card-body">
                                <table className="table profile__table">
                                    <tbody>
                                    <tr>
                                        <th><strong>Location</strong></th>
                                        <td>United States</td>
                                    </tr>
                                    <tr>
                                        <th><strong>Company name</strong></th>
                                        <td>Simpleqode.com</td>
                                    </tr>
                                    <tr>
                                        <th><strong>Position</strong></th>
                                        <td>Front-end developer</td>
                                    </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>


                        <div className="card">
                            <div className="card-header">
                                <h4 className="card-title">Community</h4>
                            </div>
                            <div className="card-body">
                                <table className="table profile__table">
                                    <tbody>
                                    <tr>
                                        <th><strong>Comments</strong></th>
                                        <td>58584</td>
                                    </tr>
                                    <tr>
                                        <th><strong>Member since</strong></th>
                                        <td>Jan 01, 2016</td>
                                    </tr>
                                    <tr>
                                        <th><strong>Last login</strong></th>
                                        <td>1 day ago</td>
                                    </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>



                    </div>

                </div>
            </div>

        </Layout>
    )
}




export default PatDetails