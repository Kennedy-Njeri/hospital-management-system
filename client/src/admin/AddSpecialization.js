import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import Layout from "../core/Layout";
import { createSpecialize } from '../actions/specializeActions'







const AddSpecialization = ({ history }) => {

    const [name, setName] = useState('')
    const [description, setDescription] = useState('')



    const dispatch = useDispatch()



    const specializeCreate = useSelector((state) => state.specializeCreate)
    const { success, error, loading } = specializeCreate

    useEffect(() => {
        if (success) {
            history.push('/list-specialize')
        } else {
            history.push("/add-specialize")
        }
    }, [success, dispatch])

    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(createSpecialize({  name, description}))
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

    const AddSpecializeForm = () => (
        <form onSubmit={submitHandler}>

            <div className="form-row">
                <div className="col-md-8">
                    <div className="form-group">
                        <label className="small mb-1" htmlFor="description">Name</label>
                        <input className="form-control py-4"  type="name" aria-describedby="emailHelp"
                               placeholder="Enter name" value={name}
                               onChange={(e) => setName(e.target.value)}/>
                    </div>
                </div>
            </div>

            <div className="form-row">
                <div className="col-md-8">
                    <div className="form-group">
                        <label className="small mb-1" htmlFor="description">Description</label>
                        <textarea className="form-control"
                                  placeholder="write description" rows="3" value={description}
                                  onChange={(e) => setDescription(e.target.value)}/>
                    </div>
                </div>
            </div>


            <div className="col-md-8">
                <div className="form-group mt-4 mb-0">
                    <button className="btn btn-primary btn-block">Add Specialization </button></div>
            </div>
        </form>

    );


    return (
        <Layout title="Category test Form">
            <h2 className="mb-4">Add Specialization</h2>


            {showLoading()}
            {showError()}
            {AddSpecializeForm()}
        </Layout>
    )
}




export default AddSpecialization