import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import Layout from "../core/Layout";
import { createTest, listCatTests, listPaidEnums } from '../actions/testActions'
import { listUsers  } from '../actions/userActions'
import { TEST_CREATE_RESET } from '../constants/testConstants'





const CreateTest = ({ history }) => {

    const [user, setUser] = useState('')
    const [testName, setTestName] = useState('')
    const [result, setResult] = useState("")
    const [description, setDescription] = useState('')
    const [paid, setPaid] = useState("")


    const dispatch = useDispatch()

    const userList = useSelector((state) => state.userList)
    const { users } = userList

    const catTestList = useSelector((state) => state.catTestList)
    const { tests } = catTestList

    const userLogin = useSelector((state) => state.userLogin)
    const { userInfo } = userLogin

    const createTests = useSelector((state) => state.createTests)
    const { success, error, loading } = createTests

    const testPaidList = useSelector((state) => state.testPaidList)
    const { pays } = testPaidList

    useEffect(() => {
        
        if (userInfo && userInfo.role === 0) {
            dispatch(listUsers())
            dispatch(listCatTests())
            dispatch(listPaidEnums())

            if(success) {
                dispatch({ type: TEST_CREATE_RESET })
                history.push('/test-result')
            }
        } else {
            history.push('/login')
        }

        
    }, [success, dispatch, userInfo])

    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(createTest({ user, testName, result, description, paid}))
    }

    const showError = () => (
        <div className="alert alert-danger" style={{ display: error ? '' : 'none' }}>
            {error}
        </div>
    );
    //
    const showLoading = () =>
        loading && (
            <div className="d-flex justify-content-center">
                <div className="spinner-border" role="status">
                    <span className="sr-only">Loading...</span>
                </div>
            </div>
        );

    const TestForm = () => (
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
                    <button className="btn btn-primary btn-block">Create Test </button></div>
            </div>
        </form>

    );


    return (
        <Layout title="Category test Form">
            <h2 className="mb-4">Create Test Result</h2>

            {showLoading()}
            {showError()}
            {TestForm()}
        </Layout>
    )
}




export default CreateTest