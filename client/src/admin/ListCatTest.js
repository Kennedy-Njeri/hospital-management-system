import React, {Fragment, useEffect} from 'react'
import Layout from '../core/Layout';
import { listCatTests, deleteTestCat } from '../actions/testActions'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'





const ListCatTest = ({ history }) => {

    const dispatch = useDispatch()

    const catTestList = useSelector((state) => state.catTestList)
    const { loading, error, tests } = catTestList

    const userLogin = useSelector((state) => state.userLogin)
    const { userInfo } = userLogin


    const catTestDelete = useSelector((state) => state.catTestDelete)
    const { success: successDelete } = catTestDelete

    useEffect(() => {
        if (userInfo && userInfo.role === 0) {
            dispatch(listCatTests())
            //console.log(tests)
        } else {
            history.push('/login')
        }
    }, [dispatch, history, successDelete, userInfo])

    
    const deleteHandler = (id) => {
        console.log(id)
        if (window.confirm('Are you sure')) {
            dispatch(deleteTestCat(id))
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
        <Layout title="Profile" description="Update your profile" className="container-fluid">
            <h4><Link to="/create/cat-test"><button>Add Category Test</button></Link></h4>

            <h2 className="mb-4">List Category tests</h2>

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
                                <th scope="col">MinValue</th>
                                <th scope="col">MaxValue</th>
                                <th scope="col">Cost</th>
                                <th scope="col">Test Name</th>
                                <th scope="col">Description</th>
                                <th scope="col">Edit</th>
                                <th scope="col">Delete</th>
                            </tr>
                            </thead>
                            <tbody>
                            {
                              tests && tests.map((cat, i) => (
                                <tr key={i}>
                                    <Fragment>
                                    <th scope="row">{cat._id}</th>
                                    <td>{cat.minValue && (cat.minValue)}</td>
                                    <td>{cat.maxValue}</td>
                                    <td>{cat.cost}</td>
                                    <td>{cat.testName}</td>
                                    <td>{cat.description}</td>
                                        <td><Link to={`/update-cat-test/${cat._id}`}><i className="bi bi-pencil-square"/></Link></td>
                                    <td><i className="bi bi-trash" onClick={() => deleteHandler(cat._id)}/></td>
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




export default ListCatTest