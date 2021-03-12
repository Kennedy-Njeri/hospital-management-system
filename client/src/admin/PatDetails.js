import React, {useEffect, useState} from 'react'
import Layout from '../core/Layout';
//import { listUsers, deleteUser  } from '../actions/userActions'
import { useDispatch, useSelector } from 'react-redux'
import {Link} from "react-router-dom";
import "../styles.css";
import { patientsDetailsUser } from '../actions/patientActions'
import {listUsers} from "../actions/userActions";








const PatDetails = ({ history, match }) => {

    const id = match.params.id
    

    const dispatch = useDispatch()

    const userLogin = useSelector((state) => state.userLogin)
    const { userInfo } = userLogin

   


    useEffect(() => {
        if (userInfo && userInfo.role === 0) {
            dispatch(patientsDetailsUser(id))
        } else {
            history.push('/login')
        }
    }, [dispatch, history, userInfo])


    const patientDetailsUser = useSelector((state) => state.patientDetailsUser)
    const { patient } = patientDetailsUser


    console.log(patient)


    const showUserProfile = ()=> (

        Array.from(patient).map((pat, i) => (

                <div className="card" key={i}>
                    <div className="card-header">
                        <h4 className="card-title">User profile</h4>
                    </div>
                    <div className="card-body">
                        <div className="profile__avatar">

                            <img src={`http://localhost:8000${pat.image}`} className="img-fluid rounded-circle"/>
                        </div>

                        <table className="table profile__table">
                            <tbody>
                            <tr>
                                <th><strong>Username</strong></th>
                                <td>{pat.user.name}</td>
                            </tr>
                            <tr>
                                <th><strong>Last Name</strong></th>
                                <td>{pat.lastName}</td>
                            </tr>
                            <tr>
                                <th><strong>Gender</strong></th>
                                <td>{pat.gender}</td>
                            </tr>
                            <tr>
                                <th><strong>Patient Type</strong></th>
                                <td>{pat.patientType}</td>
                            </tr>
                            <tr>
                                <th><strong>Id No</strong></th>
                                <td>{pat.idNumber}</td>
                            </tr>
                            <tr>
                                <th><strong>Cell</strong></th>
                                <td>{pat.cell}</td>
                            </tr>
                            <tr>
                                <th><strong>Reg Date</strong></th>
                                <td>{pat.regDate}</td>
                            </tr>
                            <tr>
                                <th><strong>D.O.B</strong></th>
                                <td>{pat.birthDate}</td>
                            </tr>
                            <tr>
                                <th><strong>Residence</strong></th>
                                <td>{pat.residence}</td>
                            </tr>
                            <tr>
                                <th><strong>Guardian</strong></th>
                                <td>{pat.guardian}</td>
                            </tr>
                            <tr>
                                <th><strong>Address</strong></th>
                                <td>{pat.address}</td>
                            </tr>
                            
                            </tbody>
                        </table>

                    </div>

                </div>
            ))

)
    

    return (
        <Layout title="Profile" description="Update your profile" className="container-fluid">

            <div className="container">
                <div className="row">
                    <div className="col-xs-12 col-sm-9">

                        {showUserProfile()}



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