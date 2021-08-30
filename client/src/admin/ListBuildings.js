import React, {Fragment, useEffect} from 'react'
import Layout from '../core/Layout';
import { listBuildings, deleteBuilding } from '../actions/buildingsActions'
import { useDispatch, useSelector } from 'react-redux'
import {Link} from "react-router-dom";




const ListBuildings = ({ history }) => {

    const dispatch = useDispatch()

    const buildingList = useSelector((state) => state.buildingList)
    const { loading, error, buildings } = buildingList

    console.log(buildings)

    const userLogin = useSelector((state) => state.userLogin)
    const { userInfo } = userLogin

    const buildingDelete = useSelector((state) => state.buildingDelete)
    const { success: successDelete } = buildingDelete

    useEffect(() => {
        if (userInfo && userInfo.role === 0) {
            dispatch(listBuildings())
            //console.log(tests)
        } else {
            history.push('/login')
        }
    }, [dispatch, history, successDelete, userInfo])


    const deleteHandler = (id) => {
        console.log(id)
        if (window.confirm('Are you sure')) {
            dispatch(deleteBuilding(id))
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

            <h4><Link to="/add-building"><button>Add Building</button></Link></h4>

            <h2 className="mb-4">List Buildings</h2>

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
                                <th scope="col">Code</th>
                                <th scope="col">Description</th>
                                <th scope="col">Edit</th>
                                <th scope="col">Delete</th>
                            </tr>
                            </thead>
                            <tbody>
                            {
                                buildings && buildings.map((build, i) => (
                                    <tr key={i}>
                                        <Fragment>
                                            <th scope="row">{build._id}</th>
                                            <td>{build.name}</td>
                                            <td>{build.code}</td>
                                            <td>{build.description}</td>
                                            <td><Link to={`/update-building/${build._id}`}><i className="bi bi-pencil-square"></i></Link></td>
                                            <td><i className="bi bi-trash" onClick={() => deleteHandler(build._id)}/></td>
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






export default ListBuildings