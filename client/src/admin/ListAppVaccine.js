import React, {Fragment, useEffect} from 'react'
import Layout from '../core/Layout';
import { listVacApp, deleteVacApp } from '../actions/vaccineAppointmentActions'
import { useDispatch, useSelector } from 'react-redux'
import {Link} from "react-router-dom";
import moment from "moment";




const ListAppVaccine = ({ history }) => {

    const dispatch = useDispatch()

    const vaccineAppList = useSelector((state) => state.vaccineAppList)
    const { loading, error, appointments } = vaccineAppList

    console.log(appointments)

    const userLogin = useSelector((state) => state.userLogin)
    const { userInfo } = userLogin

    const vaccineAppDelete = useSelector((state) => state.vaccineAppDelete)
    const { success: successDelete } = vaccineAppDelete

    useEffect(() => {
        if (userInfo && userInfo.role === 0) {
            dispatch(listVacApp())
        } else {
            history.push('/login')
        }
    }, [dispatch, history, successDelete, userInfo])


    const deleteHandler = (id) => {
        console.log(id)
        if (window.confirm('Are you sure')) {
            dispatch(deleteVacApp(id))
        }
    }


    const showError = () => (
        <div className="alert alert-danger" style={{ display: error ? '' : 'none' }}>
            {error}
        </div>
    );

    const showLoading = () =>
        loading && (
            <div className="d-flex justify-content-center">
                <div className="spinner-border" role="status">
                    <span className="sr-only">Loading...</span>
                </div>
            </div>
        );


    return (
        <Layout title="Profile" description="list treatment categories" className="container-fluid">

            <h4><Link to="/add-vacc-app"><button>Add Appointment</button></Link></h4>

            <h2 className="mb-4">List Appointments</h2>

            {loading ? (
                showLoading()
            ) : error ? (
                showError()
            ) : appointments.length === 0 ? (
                <div className="row">
                    <div className="col-sm-8">
                        <table className="table">
                            <thead>
                            <tr>
                                <th scope="col">Id</th>
                                <th scope="col">Patient</th>
                                <th scope="col">Nurse</th>
                                <th scope="col">Vaccine</th>
                                <th scope="col">Date</th>
                                <th scope="col">Time In</th>
                                <th scope="col">Taken</th>
                                <th scope="col">Day</th>
                                <th scope="col">room</th>
                                <th scope="col">remarks</th>
                                <th scope="col">Edit</th>
                                <th scope="col">Delete</th>
                            </tr>
                            </thead>
                            <tbody>
                            <tr>
                                <td className="text-center">No Data</td>
                            </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            ): (
                <div className="row">
                    <div className="col-sm-8">
                        <table className="table">
                            <thead>
                            <tr>
                                <th scope="col">Id</th>
                                <th scope="col">Patient</th>
                                <th scope="col">Nurse</th>
                                <th scope="col">Vaccine</th>
                                <th scope="col">Date</th>
                                <th scope="col">Time In</th>
                                <th scope="col">Taken</th>
                                <th scope="col">Day</th>
                                <th scope="col">room</th>
                                <th scope="col">remarks</th>
                                <th scope="col">Edit</th>
                                <th scope="col">Delete</th>
                            </tr>
                            </thead>
                            <tbody>
                            {
                                appointments && appointments.map((app, i) => (
                                    <tr key={i}>
                                        <Fragment>
                                            <th scope="row">{app._id.substring(0, 7)}</th>
                                            <td>{app.patient.name}</td>
                                            <td>{app.nurse.name}</td>
                                            <td>{app.vaccine.name}</td>
                                            <td>{moment(app.date).format("YYYY-MM-DD")}</td>
                                            <td>{app.time_in}</td>
                                            <td>{app.taken === "Yes" ? (<button type="button" className="btn btn-success btn-sm">{app.taken}</button>) :
                                                (<button type="button" className="btn btn-danger btn-sm">{app.taken}</button>) }</td>
                                            <td>{app.room}</td>
                                            <td>{app.day}</td>
                                            <td>{app.remarks}</td>

                                            <td><Link to={`/update-vacc-app/${app._id}`}><i className="bi bi-pencil-square"/></Link></td>
                                            <td><i className="bi bi-trash" onClick={() => deleteHandler(app._id)}/></td>
                                        </Fragment>
                                    </tr>
                                ))

                            }
                            </tbody>
                        </table>
                    </div>
                </div>
            )}
        </Layout>
    )

}






export default ListAppVaccine