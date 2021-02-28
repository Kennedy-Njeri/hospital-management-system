import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import Layout from "../core/Layout";
import { detailsSpecialize, updateSpecialize } from '../actions/specializeActions'
import { SPECIALIZE_UPDATE_RESET } from '../constants/specializationConstants'




const UpdateSpecialize = ({ history, match }) => {

    const id = match.params.id

    const dispatch = useDispatch()

    const [name, setName] = useState('')
    const [description, setDescription] = useState('')



    const specializeDetails = useSelector((state) => state.specializeDetails)
    const { loading, error, specialize } = specializeDetails

    console.log(specialize)

    const specializeUpdate = useSelector((state) => state.specializeUpdate)
    const {
        loading: loadingUpdate,
        error: errorUpdate,
        success: successUpdate,
    } = specializeUpdate


    useEffect(() => {
        if (successUpdate) {
            dispatch({ type: SPECIALIZE_UPDATE_RESET })
            history.push('/list-specialize')
        } else {
            if (specialize._id !== id) {
                dispatch(detailsSpecialize(id))
            } else {
                setName(specialize.name)
                setDescription(specialize.description)
            }
        }
    }, [dispatch, history, id, specialize, successUpdate])

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


    const UpdateSpecializeForm = () => (

        <div>
            <form onSubmit={submitHandler}>


                <div className="form-row">
                    <div className="col-md-8">
                        <div className="form-group">
                            <label className="small mb-1" htmlFor="name">Name</label>
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
                        <button className="btn btn-primary btn-block">Update Specialization </button></div>
                </div>
            </form>

        </div>

    );

    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(updateSpecialize({ _id: id, name,  description}))
    }

    return (
        <Layout title="Update test Form">
            <>
                <h2 className="mb-4">Update Specialization </h2>

                {errorUpdate && <div className="alert alert-danger" role="alert">
                    {errorUpdate}
                </div>}
                {showLoadingData()}
                {showLoading()}
                {showError()}
                {UpdateSpecializeForm()}
            </>
        </Layout>
    )



}



export default UpdateSpecialize