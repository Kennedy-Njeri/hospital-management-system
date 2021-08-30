import React, {Fragment, useEffect} from 'react'
import Layout from '../core/Layout';
import { listDeparts, deleteDeparts } from '../actions/departmentActions'
import { useDispatch, useSelector } from 'react-redux'
import {Link} from "react-router-dom";




const ListDeparts = ({ history }) => {

    const dispatch = useDispatch()

    const departsList = useSelector((state) => state.departsList)
    const { loading, error, departments } = departsList

    console.log(departments)

    const userLogin = useSelector((state) => state.userLogin)
    const { userInfo } = userLogin

    const departsDelete = useSelector((state) => state.departsDelete)
    const { success: successDelete } = departsDelete

    useEffect(() => {
        if (userInfo && userInfo.role === 0) {
            dispatch(listDeparts())
        } else {
            history.push('/login')
        }
    }, [dispatch, history, successDelete, userInfo])


    const deleteHandler = (id) => {
        console.log(id)
        if (window.confirm('Are you sure')) {
            dispatch(deleteDeparts(id))
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

            <h4><Link to="/add-depart"><button>Add Department</button></Link></h4>

            <h2 className="mb-4">List Departments</h2>

            {loading ? (
                showLoading()
            ) : error ? (
                showError()
            ) : (
                <div className="row">
                    <div className="col-sm-8">
                        <table className="table">
                            <thead>
                            <tr>
                                <th scope="col">Id</th>
                                <th scope="col">name</th>
                                <th scope="col">Head</th>
                                <th scope="col">Address</th>
                                <th scope="col">Floor</th>
                                <th scope="col">Phone No</th>
                                <th scope="col">Edit</th>
                                <th scope="col">Delete</th>
                            </tr>
                            </thead>
                            <tbody>
                            {
                                departments && departments.map((dep, i) => (
                                    <tr key={i}>
                                        <Fragment>
                                            <th scope="row">{dep._id}</th>
                                            <td>{dep.name}</td>
                                            <td>{dep.head}</td>
                                            <td>{dep.address}</td>
                                            <td>{dep.floor.name}</td>
                                            <td>{dep.phone}</td>
                                            <td><Link to={`/update-depart/${dep._id}`}><i className="bi bi-pencil-square"></i></Link></td>
                                            <td><i className="bi bi-trash" onClick={() => deleteHandler(dep._id)}></i></td>
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






export default ListDeparts