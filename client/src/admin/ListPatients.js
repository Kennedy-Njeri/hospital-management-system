import React, {Fragment, useEffect, useRef } from 'react'
import Layout from '../core/Layout';
import { listPatients, deletePatients } from '../actions/patientActions'
import { useDispatch, useSelector } from 'react-redux'
import {Link} from "react-router-dom";
import ReactToPrint from 'react-to-print';
import moment from "moment";





const ListPatients = ({ history }) => {

    const dispatch = useDispatch()

    const patientList = useSelector((state) => state.patientList)
    const { loading, error, patients } = patientList

    console.log(patients)

    const userLogin = useSelector((state) => state.userLogin)
    const { userInfo } = userLogin

    console.log(userInfo._id)

    const patientDelete = useSelector((state) => state.patientDelete)
    const { success: successDelete } = patientDelete

    useEffect(() => {
        if (userInfo && userInfo.role === 0) {
            dispatch(listPatients())
            //console.log(tests)
        } else {
            history.push('/login')
        }
    }, [dispatch, history, successDelete, userInfo])


    const deleteHandler = (id) => {
        console.log(id)
        if (window.confirm('Are you sure')) {
            dispatch(deletePatients(id))
        }
    }

    const linkToPrint = () => {
        return (
            <button>Click To Print Patients</button>
        )
    }

    const componentRef = useRef();

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
        <Layout title="List Prescriptions" className="container-fluid">
            <h4><Link to="/add-patient-details"><button>Add Patient Details</button></Link></h4>
            <ReactToPrint trigger={linkToPrint} content={() => componentRef.current} />
            <h2 className="mb-4">List Patients Profile</h2>

            {loading ? (
                showLoading()
            ) : error ? (
                showError()
            ) : (
                <div className="row" ref={componentRef}>
                    <div className="col-sm-8">
                        <table className="table">
                            <thead>
                            <tr>
                                <th scope="col">Id</th>
                                <th scope="col">profile</th>
                                <th scope="col">User</th>
                                <th scope="col">Patient Status</th>
                                <th scope="col">Inpatient/Outpatient</th>
                                <th scope="col">cell</th>
                                <th scope="col">Reg Date</th>
                                <th scope="col">Gender</th>
                                <th scope="col">Edit</th>
                                <th scope="col">Delete</th>
                            </tr>
                            </thead>
                            <tbody>
                            {
                                patients && patients.map((patient, i) => (
                                    <tr key={i}>
                                        <Fragment>
                                            <th scope="row">{patient._id.substring(0, 6)}</th>
                                            <td><img src={`http://localhost:8000${patient.image}`} className="img-fluid rounded-circle"/></td>
                                            <td>{patient.user.name}</td>
                                            <td>{patient.statusPatient}</td>
                                            <td>{patient.patientType}</td>
                                            <td>{patient.cell}</td>
                                            <td>{moment(patient.regDate).format("YYYY-MM-DD HH:mm Z")}</td>
                                         
                                            <td>{patient.gender}</td>

                                            <td><Link to={`/update-patient/${patient._id}`}><i className="bi bi-pencil-square"></i></Link></td>
                                            <td><i className="bi bi-trash" onClick={() => deleteHandler(patient._id)}></i></td>
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






export default ListPatients