import React, {Fragment, useEffect, useRef } from 'react'
import Layout from '../core/Layout';
import { listDoctors, deleteDoctors } from '../actions/doctorActions'
import { useDispatch, useSelector } from 'react-redux'
import {Link} from "react-router-dom";
import ReactToPrint from 'react-to-print';
import moment from "moment";






const ListDoctors = ({ history }) => {

    const dispatch = useDispatch()

    const doctorList = useSelector((state) => state.doctorList)
    const { loading, error, doctors } = doctorList

    console.log(doctors)

    const userLogin = useSelector((state) => state.userLogin)
    const { userInfo } = userLogin

    console.log(userInfo._id)

    const doctorDelete = useSelector((state) => state.doctorDelete)
    const { success: successDelete } = doctorDelete

    useEffect(() => {
        if (userInfo && userInfo.role === 0) {
            dispatch(listDoctors())
        } else {
            history.push('/login')
        }
    }, [dispatch, history, successDelete, userInfo])


    const deleteHandler = (id) => {
        console.log(id)
        if (window.confirm('Are you sure')) {
            dispatch(deleteDoctors(id))
        }
    }

    const linkToPrint = () => {
        return (
            <button>Click To Print Doctors</button>
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
            <h4><Link to="/add-doctor"><button>Add Doctor Profile</button></Link></h4>
            <ReactToPrint trigger={linkToPrint} content={() => componentRef.current} />
            <h2 className="mb-4">List Doctors Profile</h2>

            {loading ? (
                showLoading()
            ) : error ? (
                showError()
            ) : doctors.length === 0 ? (
                <div className="row">
                    <div className="col-sm-8">
                        <table className="table">
                            <thead>
                            <tr>
                                <th scope="col">Id</th>
                                <th scope="col">profile</th>
                                <th scope="col">User</th>
                                <th scope="col">Id Number</th>
                                <th scope="col">Specialization</th>
                                <th scope="col">Department</th>
                                <th scope="col">Designation</th>
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
                <div className="row" ref={componentRef}>
                    <div className="col-sm-8">
                        <table className="table">
                            <thead>
                            <tr>
                                <th scope="col">Id</th>
                                <th scope="col">profile</th>
                                <th scope="col">User</th>
                                <th scope="col">Id Number</th>
                                <th scope="col">Specialization</th>
                                <th scope="col">Department</th>
                                <th scope="col">Designation</th>
                                <th scope="col">cell</th>
                                <th scope="col">Reg Date</th>
                                <th scope="col">Gender</th>
                                <th scope="col">Edit</th>
                                <th scope="col">Delete</th>
                            </tr>
                            </thead>
                            <tbody>
                            {
                                doctors && doctors.map((doctor, i) => (
                                    <tr key={i}>
                                        <Fragment>
                                            <th scope="row">{doctor._id.substring(0, 6)}</th>
                                            <td><img src={`http://localhost:8000${doctor.image}`} className="img-fluid rounded-circle"/></td>
                                            <td>{doctor.user.name}</td>
                                            <td>{doctor.idNumber}</td>
                                            <td>{doctor.specialization.name}</td>
                                            <td>{doctor.department.name}</td>
                                            <td>{doctor.designation.name}</td>
                                            <td>{doctor.cell}</td>
                                            <td>{moment(doctor.regDate).format("YYYY-MM-DD")}</td>

                                            <td>{doctor.gender}</td>

                                            <td><Link to={`/update-doctor/${doctor._id}`}><i className="bi bi-pencil-square"></i></Link></td>
                                            <td><i className="bi bi-trash" onClick={() => deleteHandler(doctor._id)}></i></td>
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






export default ListDoctors