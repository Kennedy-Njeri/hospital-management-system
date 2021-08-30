import React, {Fragment, useEffect} from 'react'
import Layout from '../core/Layout';
import { listSpecialize, deleteSpecialize } from '../actions/specializeActions'
import { useDispatch, useSelector } from 'react-redux'
import {Link} from "react-router-dom";




const ListSpecialize = ({ history }) => {

    const dispatch = useDispatch()

    const specializeList = useSelector((state) => state.specializeList)
    const { loading, error, specializations } = specializeList

    console.log(specializations)

    const userLogin = useSelector((state) => state.userLogin)
    const { userInfo } = userLogin

    const specializeDelete = useSelector((state) => state.specializeDelete)
    const { success: successDelete } = specializeDelete

    useEffect(() => {
        if (userInfo && userInfo.role === 0) {
            dispatch(listSpecialize())
        } else {
            history.push('/login')
        }
    }, [dispatch, history, successDelete, userInfo])


    const deleteHandler = (id) => {
        console.log(id)
        if (window.confirm('Are you sure')) {
            dispatch(deleteSpecialize(id))
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
        <Layout title="Profile" className="container-fluid">

            <h4><Link to="/add-specialize"><button>Add Specialization</button></Link></h4>

            <h2 className="mb-4">List Specializations</h2>

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
                                <th scope="col">Description</th>
                                <th scope="col">Edit</th>
                                <th scope="col">Delete</th>
                            </tr>
                            </thead>
                            <tbody>
                            {
                                specializations && specializations.map((special, i) => (
                                    <tr key={i}>
                                        <Fragment>
                                            <th scope="row">{special._id}</th>
                                            <td>{special.name}</td>
                                            <td>{special.description}</td>
                                            <td><Link to={`/update-specialize/${special._id}`}><i className="bi bi-pencil-square"></i></Link></td>
                                            <td><i className="bi bi-trash" onClick={() => deleteHandler(special._id)}></i></td>
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






export default ListSpecialize