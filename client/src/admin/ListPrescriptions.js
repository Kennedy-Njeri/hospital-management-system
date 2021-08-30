import React, {Fragment, useEffect, useRef } from 'react'
import Layout from '../core/Layout';
import { listPrescriptions, deletePrescription } from '../actions/prescriptionActions'
import { useDispatch, useSelector } from 'react-redux'
import {Link} from "react-router-dom";
import ReactToPrint from 'react-to-print';




const ListPrescriptions = ({ history }) => {

    const dispatch = useDispatch()

    const prescList = useSelector((state) => state.prescList)
    const { loading, error, prescriptions } = prescList

    console.log(prescriptions)

    const userLogin = useSelector((state) => state.userLogin)
    const { userInfo } = userLogin

    const prescDelete = useSelector((state) => state.prescDelete)
    const { success: successDelete } = prescDelete

    useEffect(() => {
        if (userInfo && userInfo.role === 0) {
            dispatch(listPrescriptions())
            //console.log(tests)
        } else {
            history.push('/login')
        }
    }, [dispatch, history, successDelete, userInfo])

    const totalCollected = () => {

        let total = prescriptions && prescriptions.reduce((acc, curr) => {
            if (curr.paid === 'Paid') {
                acc += parseInt(curr.treatment.cost)
            }

            return acc
        }, 0)

        return total
    }

    const deleteHandler = (id) => {
        console.log(id)
        if (window.confirm('Are you sure')) {
            dispatch(deletePrescription(id))
        }
    }

    const linkToPrint = () => {
        return (
            <button>Click To Prescriptions</button>
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
            <h4><Link to="add-prescription"><button>Add Prescription</button></Link></h4>
            <ReactToPrint trigger={linkToPrint} content={() => componentRef.current} />
            <h2 className="font-weight-bold">Total Paid:Ksh {totalCollected()}</h2>
            <h2 className="mb-4">List Prescriptions</h2>

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
                                <th scope="col">User</th>
                                <th scope="col">Treatment</th>
                                <th scope="col">Medicine</th>
                                <th scope="col">Time</th>
                                <th scope="col">Days</th>
                                <th scope="col">Take</th>
                                <th scope="col">Test</th>
                                <th scope="col">Cost</th>
                                <th scope="col">Paid</th>
                                <th scope="col">History</th>
                                <th scope="col">Edit</th>
                                <th scope="col">Delete</th>
                            </tr>
                            </thead>
                            <tbody>
                            {
                                prescriptions && prescriptions.map((pres, i) => (
                                    <tr key={i}>
                                        <Fragment>
                                            <th scope="row">{pres._id.substring(0, 6)}</th>
                                            <td>{pres.user.name}</td>
                                            <td>{pres.treatment.name}</td>
                                            <td>{pres.medicine}</td>
                                            <td>{pres.time}</td>
                                            <td>{pres.days}</td>
                                            <td>{pres.take}</td>
                                            <td>{pres.test.testName}</td>
                                            <td>{pres.treatment.cost}</td>
                                            <td>{pres.paid === "Paid" ? (<button type="button" className="btn btn-success btn-sm">{pres.paid}</button>) :
                                                (<button type="button" className="btn btn-danger btn-sm">{pres.paid}</button>) }</td>
                                            <td>{pres.history}</td>
                                            <td><Link to={`/update-prescription/${pres._id}`}><i className="bi bi-pencil-square"></i></Link></td>
                                            <td><i className="bi bi-trash" onClick={() => deleteHandler(pres._id)}></i></td>
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






export default ListPrescriptions