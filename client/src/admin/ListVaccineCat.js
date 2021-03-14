import React, {Fragment, useEffect} from 'react'
import Layout from '../core/Layout';
import { listVacCat, deleteVacCat } from '../actions/vaccineCatActions'
import { useDispatch, useSelector } from 'react-redux'
import {Link} from "react-router-dom";





const ListVaccineCat = ({ history }) => {

    const dispatch = useDispatch()

    const vaccineCatList = useSelector((state) => state.vaccineCatList)
    const { loading, error, vaccines } = vaccineCatList

    console.log(vaccines)

    const userLogin = useSelector((state) => state.userLogin)
    const { userInfo } = userLogin

    const vaccineCatDelete = useSelector((state) => state.vaccineCatDelete)
    const { success: successDelete } = vaccineCatDelete

    useEffect(() => {
        if (userInfo && userInfo.role === 0) {
            dispatch(listVacCat())
        } else {
            history.push('/login')
        }
    }, [dispatch, history, successDelete, userInfo])


    const deleteHandler = (id) => {
        console.log(id)
        if (window.confirm('Are you sure')) {
            dispatch(deleteVacCat(id))
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

            <h4><Link to="/add-vac-cat"><button>Add Vaccine Category</button></Link></h4>

            <h2 className="mb-4">List Vaccine Category</h2>

            {loading ? (
                showLoading()
            ) : error ? (
                showError()
            ) : vaccines.length === 0 ? (
                <div className="row">
                    <div className="col-sm-8">
                        <table className="table">
                            <thead>
                            <tr>
                                <th scope="col">Id</th>
                                <th scope="col">name</th>
                                <th scope="col">Type</th>
                                <th scope="col">Description</th>
                                <th scope="col">Medicine</th>
                                <th scope="col">Effects</th>
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
                                <th scope="col">Type</th>
                                <th scope="col">Description</th>
                                <th scope="col">Medicine</th>
                                <th scope="col">Effects</th>
                                <th scope="col">Edit</th>
                                <th scope="col">Delete</th>
                            </tr>
                            </thead>
                            <tbody>
                            {
                                vaccines && vaccines.map((vac, i) => (
                                    <tr key={i}>
                                        <Fragment>
                                            <th scope="row">{vac._id.substring(0, 7)}</th>
                                            <td>{vac.name}</td>
                                            <td>{vac.type}</td>
                                            <td>{vac.description}</td>
                                            <td>{vac.medicine.name}</td>
                                            <td>{vac.effects}</td>
                                            <td><Link to={`/update-vaccine-cat/${vac._id}`}><i className="bi bi-pencil-square"/></Link></td>
                                            <td><i className="bi bi-trash" onClick={() => deleteHandler(vac._id)}/></td>
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






export default ListVaccineCat