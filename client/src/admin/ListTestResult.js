import React, {Fragment, useEffect} from 'react'
import Layout from '../core/Layout';
import { listTestsResults, deleteTests } from '../actions/testActions'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'





const ListTestResult = ({ history }) => {

    const dispatch = useDispatch()

    const listTestResult = useSelector((state) => state.listTestResult)
    const { loading, error, tests } = listTestResult

    const userLogin = useSelector((state) => state.userLogin)
    const { userInfo } = userLogin


    const testsdelete = useSelector((state) => state.testsdelete)
    const { success: successDelete } = testsdelete

    useEffect(() => {
        if (userInfo && userInfo.role === 0) {
            dispatch(listTestsResults())
            //console.log(tests[0])
        } else {
            history.push('/login')
        }
    }, [history, dispatch, successDelete, userInfo])


    const totalCollected = () => {

        let total = tests && tests.reduce((acc, curr) => {
                if (curr.paid === 'Paid') {
                    acc += parseInt(curr.testName.cost)
                }

                return acc
            }, 0)
        
        return total
    }
    
    const deleteHandler = (id) => {
        console.log(id)
        if (window.confirm('Are you sure')) {
            dispatch(deleteTests(id))
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
            <h2 className="font-weight-bold">Total Paid:Ksh {totalCollected()}</h2>
            <h4><Link to="/create-test"><button>Add Test</button></Link></h4>
            <h2 className="mb-4">List Result tests</h2>


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
                                <th scope="col">User</th>
                                <th scope="col">Test Name</th>
                                <th scope="col">Result</th>
                                <th scope="col">Description</th>
                                <th scope="col">Cost</th>
                                <th scope="col">Paid</th>
                                <th scope="col">Edit</th>
                                <th scope="col">Delete</th>
                            </tr>
                            </thead>
                            <tbody>

                            {
                                tests && tests.map((test, i) => (
                                    <tr key={i}>
                                        <Fragment>
                                            <th scope="row">{test._id.substring(0, 7)}</th>
                                            <td>{test.user.name}</td>
                                            <td>{test.testName.testName}</td>
                                            <td>{test.result}</td>
                                            <td>{test.description}</td>
                                            <td>{test.testName.cost}</td>
                                            <td>{test.paid === "Paid" ? (<button type="button" className="btn btn-success btn-sm">{test.paid}</button>) :
                                                (<button type="button" className="btn btn-danger btn-sm">{test.paid}</button>) }</td>
                                            <td><Link to={`/update-test/${test._id}`}><i className="bi bi-pencil-square"/></Link></td>
                                            <td><i className="bi bi-trash" onClick={() => deleteHandler(test._id)}/></td>
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




export default ListTestResult