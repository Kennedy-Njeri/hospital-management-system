import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import Layout from "../core/Layout";
import { createCatTest } from '../actions/testActions'





const CreateTestCat = ({ history }) => {

    const [testName, setTestName] = useState('')
    const [minValue, setMinValue] = useState(0)
    const [maxValue, setMaxValue] = useState(0)
    const [cost, setCost] = useState(0)
    const [description, setDescription] = useState('')
    //const [message, setMessage] = useState(null)

    const dispatch = useDispatch()


    const catTestCreate = useSelector((state) => state.catTestCreate)
    const { success, error, loading } = catTestCreate

    useEffect(() => {
        if (success) {
            history.push('/')
            //setMessage('category test was created')
        }
        }, [success, dispatch])

    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(createCatTest({ testName, minValue, maxValue, cost, description}))
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

    const categoryTestForm = () => (
        <form onSubmit={submitHandler}>
            <div className="form-row">
                <div className="col-md-8">
                    <div className="form-group">
                        <label className="small mb-1 font-weight-bold" htmlFor="inputTestName">Enter Test Name</label>
                        <input className="form-control py-4" id="inputFirstName" type="name"
                               placeholder="Enter name" value={testName}
                               onChange={(e) => setTestName(e.target.value)}/>
                    </div>
                </div>

            </div>
            <div className="form-row">
                <div className="col-md-8">
            <div className="form-group">
                <label className="small mb-1 font-weight-bold" htmlFor="inputMinValue">Minimun Value</label>
                <input className="form-control py-4"  type="name" aria-describedby="emailHelp"
                       placeholder="Enter minimum value" value={minValue}
                       onChange={(e) => setMinValue(e.target.value)}/>
            </div>
                </div>
            </div>
            <div className="form-row">
                <div className="col-md-8">
                    <div className="form-group">
                        <label className="small mb-1 font-weight-bold" htmlFor="inputMaxValue">Maximum Value</label>
                        <input className="form-control py-4"  type="name" aria-describedby="emailHelp"
                               placeholder="Enter maximum value" value={maxValue}
                               onChange={(e) => setMaxValue(e.target.value)}/>
                    </div>
                </div>
                <div className="col-md-8">
                    <div className="form-group">
                        <label className="small mb-1 font-weight-bold" htmlFor="cost">Cost</label>
                        <input className="form-control py-4"  type="name"
                               placeholder="Cost" value={cost}
                               onChange={(e) => setCost(e.target.value)}/>
                    </div>
                </div>
                <div className="col-md-8">
                    <div className="form-group">
                        <label className="small mb-1 font-weight-bold" htmlFor="description">Description</label>
                        <input className="form-control py-4"  type="name" aria-describedby="emailHelp"
                               placeholder="Enter description" value={description}
                               onChange={(e) => setDescription(e.target.value)}/>
                    </div>
                </div>
            </div>
            <div className="col-md-8">
            <div className="form-group mt-4 mb-0">
                <button className="btn btn-primary btn-block">Create Test Category</button></div>
            </div>
        </form>

    );


    return (
        <Layout title="Category test Form">
            <h2 className="mb-4">Create Test Category</h2>
            {success &&  <div className="alert alert-success" role="alert">
                Category test created
            </div>}
            
            {showLoading()}
            {showError()}
            {categoryTestForm()}
        </Layout>
    )
}




export default CreateTestCat