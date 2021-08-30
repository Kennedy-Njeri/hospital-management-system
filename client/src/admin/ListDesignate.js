import React, {Fragment, useEffect} from 'react'
import Layout from '../core/Layout';
import { listDesignate, deleteDesignate } from '../actions/designateActions'
import { useDispatch, useSelector } from 'react-redux'
import {Link} from "react-router-dom";




const ListDesignate = ({ history }) => {

    const dispatch = useDispatch()

    const designateList = useSelector((state) => state.designateList)
    const { loading, error, designations } = designateList

    console.log(designations)

    const userLogin = useSelector((state) => state.userLogin)
    const { userInfo } = userLogin

    const designateDelete = useSelector((state) => state.designateDelete)
    const { success: successDelete } = designateDelete

    useEffect(() => {
        if (userInfo && userInfo.role === 0) {
            dispatch(listDesignate())
        } else {
            history.push('/login')
        }
    }, [dispatch, history, successDelete, userInfo])


    const deleteHandler = (id) => {
        console.log(id)
        if (window.confirm('Are you sure')) {
            dispatch(deleteDesignate(id))
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

            <h4><Link to="/add-designate"><button>Add Designation</button></Link></h4>

            <h2 className="mb-4">List Designations</h2>

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
                                designations && designations.map((desig, i) => (
                                    <tr key={i}>
                                        <Fragment>
                                            <th scope="row">{desig._id}</th>
                                            <td>{desig.name}</td>
                                            <td>{desig.description}</td>
                                            <td><Link to={`/update-designation/${desig._id}`}><i className="bi bi-pencil-square"></i></Link></td>
                                            <td><i className="bi bi-trash" onClick={() => deleteHandler(desig._id)}></i></td>
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






export default ListDesignate