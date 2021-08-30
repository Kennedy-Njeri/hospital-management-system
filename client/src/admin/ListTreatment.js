import React, {Fragment, useEffect} from 'react'
import Layout from '../core/Layout';
import { listTreatments, deleteTreatmentCat } from '../actions/treatmentActions'
import { useDispatch, useSelector } from 'react-redux'
import {Link} from "react-router-dom";




const ListTreatment = ({ history }) => {

    const dispatch = useDispatch()

    const treatLists = useSelector((state) => state.treatLists)
    const { loading, error, treatments } = treatLists

    console.log(treatments)

    const userLogin = useSelector((state) => state.userLogin)
    const { userInfo } = userLogin

    const treatDelete = useSelector((state) => state.treatDelete)
    const { success: successDelete } = treatDelete

    useEffect(() => {
        if (userInfo && userInfo.role === 0) {
            dispatch(listTreatments())
            //console.log(tests)
        } else {
            history.push('/login')
        }
    }, [dispatch, history, successDelete, userInfo])


    const deleteHandler = (id) => {
        console.log(id)
        if (window.confirm('Are you sure')) {
            dispatch(deleteTreatmentCat(id))
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
            <h4><Link to="/create/cat-treatment"><button>Add Treatment</button></Link></h4>
            <h2 className="mb-4">List Treatment Categories</h2>

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
                                <th scope="col">Cost</th>
                                <th scope="col">Edit</th>
                                <th scope="col">Delete</th>
                            </tr>
                            </thead>
                            <tbody>
                            {
                                treatments && treatments.map((cat, i) => (
                                    <tr key={i}>
                                        <Fragment>
                                            <th scope="row">{cat._id}</th>
                                            <td>{cat.name}</td>
                                            <td>{cat.cost}</td>
                                            <td><Link to={`/update-treatment/${cat._id}`}><i className="bi bi-pencil-square"></i></Link></td>
                                            <td><i className="bi bi-trash" onClick={() => deleteHandler(cat._id)}></i></td>
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






export default ListTreatment