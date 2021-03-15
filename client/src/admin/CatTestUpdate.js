import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import Layout from "../core/Layout";
import { cateTestDetails, updateTestCat } from '../actions/testActions'
import { TEST_UPDATE_CAT_RESET } from '../constants/testConstants'



const CatTestUpdate = ({ history, match }) => {

    const catTestId = match.params.catTestId

    const dispatch = useDispatch()

    const [testName, setTestName] = useState('')
    const [minValue, setMinValue] = useState(0)
    const [maxValue, setMaxValue] = useState(0)
    const [cost, setCost] = useState(0)
    const [description, setDescription] = useState('')

    const catTestDetails = useSelector((state) => state.catTestDetails)
    const { loading, error, cat } = catTestDetails

    console.log(cat)
    console.log(catTestId)

    const catTestUpdate = useSelector((state) => state.catTestUpdate)
    const {
        loading: loadingUpdate,
        error: errorUpdate,
        success: successUpdate,
    } = catTestUpdate


    useEffect(() => {
        if (successUpdate) {
            dispatch({ type: TEST_UPDATE_CAT_RESET })
            history.push('/list-cat-test')
        } else {
            if (cat._id !== catTestId) {

                dispatch(cateTestDetails(catTestId))
            } else {
                setTestName(cat.testName)
                setMinValue(cat.minValue)
                setMaxValue(cat.maxValue)
                setCost(cat.cost)
                setDescription(cat.description)
            }
        }
    }, [dispatch, history, catTestId, cat, successUpdate])

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
                    <button className="btn btn-primary btn-block">Update Test Category</button></div>
            </div>
        </form>

    );

    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(updateTestCat({ _id: catTestId, testName, minValue, maxValue, cost, description}))
    }

    return (
        <Layout title="Category test Form">
            <h2 className="mb-4">Update Test Category</h2>
            {errorUpdate && <div className="alert alert-danger" role="alert">
                {errorUpdate}
            </div>}
            {showLoadingData()}
            {showLoading()}
            {showError()}
            {categoryTestForm()}
        </Layout>
    )
    
    
    
}



export default CatTestUpdate