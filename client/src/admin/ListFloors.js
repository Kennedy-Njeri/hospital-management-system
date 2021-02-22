import React, {Fragment, useEffect} from 'react'
import Layout from '../core/Layout';
import { listFloors, deleteFloors } from '../actions/floorActions'
import { useDispatch, useSelector } from 'react-redux'
import {Link} from "react-router-dom";




const ListFloors = ({ history }) => {

    const dispatch = useDispatch()

    const floorList = useSelector((state) => state.floorList)
    const { loading, error, floors } = floorList

    console.log(floors)

    const userLogin = useSelector((state) => state.userLogin)
    const { userInfo } = userLogin

    const floorDelete = useSelector((state) => state.floorDelete)
    const { success: successDelete } = floorDelete

    useEffect(() => {
        if (userInfo && userInfo.role === 0) {
            dispatch(listFloors())
        } else {
            history.push('/login')
        }
    }, [dispatch, history, successDelete, userInfo])


    const deleteHandler = (id) => {
        console.log(id)
        if (window.confirm('Are you sure')) {
            dispatch(deleteFloors(id))
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

            <h4><Link to="/add-floor"><button>Add Floor</button></Link></h4>

            <h2 className="mb-4">List Floors</h2>

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
                                <th scope="col">Floor Code</th>
                                <th scope="col">Building</th>
                                <th scope="col">Edit</th>
                                <th scope="col">Delete</th>
                            </tr>
                            </thead>
                            <tbody>
                            {
                                floors && floors.map((flo, i) => (
                                    <tr key={i}>
                                        <Fragment>
                                            <th scope="row">{flo._id}</th>
                                            <td>{flo.name}</td>
                                            <td>{flo.floorcode}</td>
                                            <td>{flo.building.name}</td>
                                            <td><Link to={`/update-floor/${flo._id}`}><i className="bi bi-pencil-square"></i></Link></td>
                                            <td><i className="bi bi-trash" onClick={() => deleteHandler(flo._id)}></i></td>
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






export default ListFloors