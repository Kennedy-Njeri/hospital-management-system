import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import Layout from "../core/Layout";
import { updateTreatmentCat, treatmentDetails } from '../actions/treatmentActions'
import { TREAT_UPDATE_CAT_RESET } from '../constants/treatmentConstants'



const TreatmentUpdate = ({ history, match }) => {

    const treatmentId = match.params.treatmentId

    const dispatch = useDispatch()

    const [name, setName] = useState('')
    const [cost, setCost] = useState(0)
    

    const treatDetails = useSelector((state) => state.treatDetails)
    const { loading, error, treatment } = treatDetails

    //console.log(treatment)
    //console.log(treatmentId)

    const treatUpdate = useSelector((state) => state.treatUpdate)
    const {
        loading: loadingUpdate,
        error: errorUpdate,
        success: successUpdate,
    } = treatUpdate


    useEffect(() => {
        if (successUpdate) {
            dispatch({ type: TREAT_UPDATE_CAT_RESET })
            history.push('/list-treat-cat')
        } else {
            if (treatment._id !== treatmentId) {

                dispatch(treatmentDetails(treatmentId))
            } else {
                setName(treatment.name)
                setCost(treatment.cost)
              
            }
        }
    }, [dispatch, history, treatmentId, treatment, successUpdate])

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
                        <label className="small mb-1" htmlFor="inputTestName">Enter Category Name</label>
                        <input className="form-control py-4" id="inputFirstName" type="name"
                               placeholder="Enter name" value={name}
                               onChange={(e) => setName(e.target.value)}/>
                    </div>
                </div>

            </div>
           
            <div className="form-row">
                
                <div className="col-md-8">
                    <div className="form-group">
                        <label className="small mb-1" htmlFor="cost">Cost</label>
                        <input className="form-control py-4"  type="name"
                               placeholder="Cost" value={cost}
                               onChange={(e) => setCost(e.target.value)}/>
                    </div>
                </div>
            </div>
            <div className="col-md-8">
                <div className="form-group mt-4 mb-0">
                    <button className="btn btn-primary btn-block">Update Treatment Category</button></div>
            </div>
        </form>

    );

    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(updateTreatmentCat({ _id: treatmentId, name, cost}))
    }

    return (
        <Layout title="Category test Form">
            <h2 className="mb-4">Update Treatment Category</h2>
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



export default TreatmentUpdate