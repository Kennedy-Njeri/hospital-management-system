import React, {Fragment, useEffect} from 'react'
import Layout from '../core/Layout';
import { listMedicines, deleteMedicine } from '../actions/medicineActions'
import { useDispatch, useSelector } from 'react-redux'
import {Link} from "react-router-dom";
import moment from "moment";




const ListMedicine = ({ history }) => {

    const dispatch = useDispatch()

    const medicineList = useSelector((state) => state.medicineList)
    const { loading, error, medicines } = medicineList

    console.log(medicines)

    const userLogin = useSelector((state) => state.userLogin)
    const { userInfo } = userLogin

    const medicineDelete = useSelector((state) => state.medicineDelete)
    const { success: successDelete } = medicineDelete

    useEffect(() => {
        if (userInfo && userInfo.role === 0) {
            dispatch(listMedicines())
        } else {
            history.push('/login')
        }
    }, [dispatch, history, successDelete, userInfo])


    const deleteHandler = (id) => {
        console.log(id)
        if (window.confirm('Are you sure')) {
            dispatch(deleteMedicine(id))
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

            <h4><Link to="/add-medicine"><button>Add Medicine</button></Link></h4>

            <h2 className="mb-4">List Medicine</h2>

            {loading ? (
                showLoading()
            ) : error ? (
                showError()
            ) : medicines.length === 0 ? (
                <div className="row">
                    <div className="col-sm-8">
                        <table className="table">
                            <thead>
                            <tr>
                                <th scope="col">Id</th>
                                <th scope="col">name</th>
                                <th scope="col">Generic Name</th>
                                <th scope="col">Batch No</th>
                                <th scope="col">Bar Code</th>
                                <th scope="col">Quantity</th>
                                <th scope="col">Type</th>
                                <th scope="col">Man Date</th>
                                <th scope="col">Expiry Date</th>
                                <th scope="col">Cost</th>
                                <th scope="col">Vendors</th>
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
                                <th scope="col">name</th>
                                <th scope="col">Generic Name</th>
                                <th scope="col">Batch No</th>
                                <th scope="col">Bar Code</th>
                                <th scope="col">Quantity</th>
                                <th scope="col">Type</th>
                                <th scope="col">Man Date</th>
                                <th scope="col">Expiry Date</th>
                                <th scope="col">Cost</th>
                                <th scope="col">Vendors</th>
                                <th scope="col">Edit</th>
                                <th scope="col">Delete</th>
                            </tr>
                            </thead>
                            <tbody>
                            {
                                medicines && medicines.map((med, i) => (
                                    <tr key={i}>
                                        <Fragment>
                                            <th scope="row">{med._id.substring(0, 7)}</th>
                                            <td>{med.name}</td>
                                            <td>{med.genericName}</td>
                                            <td>{med.batchNo}</td>
                                            <td>{med.barCode}</td>
                                            <td>{med.quantity}</td>
                                            <td>{med.type}</td>
                                            <td>{moment(med.manDate).format("YYYY-MM-DD")}</td>
                                            <td>{moment(med.expDate).format("YYYY-MM-DD")}</td>
                                            <td>{med.cost}</td>
                                            <td>{med.vendor.name}</td>
                                            <td><Link to={`/update-medicine/${med._id}`}><i className="bi bi-pencil-square"/></Link></td>
                                            <td><i className="bi bi-trash" onClick={() => deleteHandler(med._id)}/></td>
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






export default ListMedicine