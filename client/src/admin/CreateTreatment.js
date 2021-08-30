import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import Layout from "../core/Layout";
import { treatCatCreate } from '../actions/treatmentActions'





const CreateTreatment = ({ history }) => {

    const [name, setName] = useState('')
    const [cost, setCost] = useState(0)
    //const [message, setMessage] = useState(null)

    const dispatch = useDispatch()


    const treatCreate = useSelector((state) => state.treatCreate)
    const { success, error, loading } = treatCreate

    useEffect(() => {
        if (success) {
            history.push('/list-treat-cat')
            //setMessage('category test was created')
        }
    }, [success, dispatch])

    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(treatCatCreate({ name ,cost }))
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
                        <label className="small mb-1" htmlFor="inputTestName">Enter Treatment Name</label>
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
                    <button className="btn btn-primary btn-block">Create Treatment Category</button></div>
            </div>
        </form>

    );


    return (
        <Layout title="Category treatment Form">
            <h2 className="mb-4">Create Treatment Category</h2>
            {success &&  <div className="alert alert-success" role="alert">
                Treatment created
            </div>}

            {showLoading()}
            {showError()}
            {categoryTestForm()}
        </Layout>
    )
}




export default CreateTreatment