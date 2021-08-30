import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import Layout from "../core/Layout";
import { testsDetails, updateTest, listCatTests, listPaidEnums} from '../actions/testActions'
import { TEST_UPDATE_RESET } from '../constants/testConstants'
import { listUsers  } from '../actions/userActions'



const TestUpdate = ({ history, match }) => {

    const testId = match.params.testId

    const dispatch = useDispatch()

    const [user, setUser] = useState('')
    const [testName, setTestName] = useState('')
    const [result, setResult] = useState("")
    const [description, setDescription] = useState('')
    const [paid, setPaid] = useState("")
    //const [message, setMessage] = useState(null)
    

    const userList = useSelector((state) => state.userList)
    const { users } = userList

    const catTestList = useSelector((state) => state.catTestList)
    const { tests } = catTestList

    const testDetails = useSelector((state) => state.testDetails)
    const { loading, error, test } = testDetails

    const testPaidList = useSelector((state) => state.testPaidList)
    const { pays } = testPaidList

    //console.log(cat)
    //console.log(testId)
    console.log(test)

    const testUpdate = useSelector((state) => state.testUpdate)
    const {
        loading: loadingUpdate,
        error: errorUpdate,
        success: successUpdate,
    } = testUpdate


    useEffect(() => {
        if (successUpdate) {
            dispatch({ type: TEST_UPDATE_RESET })
            history.push('/test-result')
        } else {
            if (test._id !== testId) {
                dispatch(listUsers())
                dispatch(testsDetails(testId))
                dispatch(listCatTests())
                dispatch(listPaidEnums())
            } else {
                setUser(test.user)
                setTestName(test.testName)
                setResult(test.result)
                setDescription(test.description)
                setPaid(test.paid)
            }
        }
    }, [dispatch, history, testId, test, successUpdate])

    const showError = () => (
        <div className="alert alert-danger" style={{ display: error ? '' : 'none' }}>
            {error}
        </div>
    );

    const showLoadingData = () =>
        loading && (
            <div className="d-flex justify-content-center">
                <div className="spinner-border" role="status">
                    <span className="sr-only">Loading...</span>
                </div>
            </div>
        );

    const showLoading = () =>
        loadingUpdate && (
            <div className="d-flex justify-content-center">
                <div className="spinner-border" role="status">
                    <span className="sr-only">Loading...</span>
                </div>
            </div>
        );


    const UpdateTestForm = () => (

        <div>
        <form onSubmit={submitHandler}>

            <div className="form-row">
                <div className="col-md-8">
                    <div className="form-group">
                        <label className="text-muted font-weight-bold">Select User</label>
                        <select onChange={(e) => setUser(e.target.value)} className="form-control">
                            <option>Please select User</option>
                            {users &&
                            users.filter(filtered => filtered.role === 2).map((c, i) => (
                                <option key={i} value={c._id}>
                                    {c.name}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>

            </div>

            <div className="form-row">
                <div className="col-md-8">
                    <div className="form-group">
                        <label className="text-muted font-weight-bold">Select TestName</label>
                        <select onChange={(e) => setTestName(e.target.value)} className="form-control">
                            <option>Please select Test Name</option>
                            {tests &&
                            tests.map((c, i) => (
                                <option key={i} value={c._id}>
                                    {c.testName}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>

            </div>


            <div className="form-row">
                <div className="col-md-8">
                    <div className="form-group">
                        <label className="small mb-1 font-weight-bold" htmlFor="inputMinValue">Result</label>
                        <input className="form-control py-4"  type="name" aria-describedby="emailHelp"
                               placeholder="result" value={result}
                               onChange={(e) => setResult(e.target.value)}/>
                    </div>
                </div>
            </div>
            <div className="form-row">
                <div className="col-md-8">
                    <div className="form-group">
                        <label className="small mb-1 font-weight-bold" htmlFor="description">Description</label>
                        <input className="form-control py-4"  type="name" aria-describedby="emailHelp"
                               placeholder="Enter description" value={description}
                               onChange={(e) => setDescription(e.target.value)}/>
                    </div>
                </div>
            </div>
            <div className="form-row">
                <div className="col-md-8">
                    <div className="form-group">
                        <label className="font-weight-bold" htmlFor="exampleFormControlSelect1">Paid</label>
                        <select onChange={(e) => setPaid(e.target.value)} className="form-control" id="exampleFormControlSelect1">
                            <option>Select Pay</option>
                            {pays &&
                            pays.map((p, i) => (
                                <option key={i} value={p}>
                                    {p}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>
            </div>
            <div className="col-md-8">
                <div className="form-group mt-4 mb-0">
                    <button className="btn btn-primary btn-block">Update Test </button></div>
            </div>
        </form>

        </div>

    );

    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(updateTest({ _id: testId, user, testName, result, description, paid }))
    }

    return (
        <Layout title="Update test Form">
            <>
            <h2 className="mb-4">Update Test Category For: </h2>
                <h3>User: {user} </h3>
                <h4>TestName: {testName}</h4>
            {errorUpdate && <div className="alert alert-danger" role="alert">
                {errorUpdate}
            </div>}
            {showLoadingData()}
            {showLoading()}
            {showError()}
            {UpdateTestForm()}
            </>
        </Layout>
    )



}



export default TestUpdate