import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import Layout from "../core/Layout";
import { detailsDesignate, updateDesignate } from '../actions/designateActions'
import { DESIGNATE_UPDATE_RESET } from '../constants/designationConstants'




const UpdateDesignation = ({ history, match }) => {

    const id = match.params.id

    const dispatch = useDispatch()

    const [name, setName] = useState('')
    const [description, setDescription] = useState('')



    const designateDetails = useSelector((state) => state.designateDetails)
    const { loading, error, designate } = designateDetails

    console.log(designate)

    const designateUpdate = useSelector((state) => state.designateUpdate)
    const {
        loading: loadingUpdate,
        error: errorUpdate,
        success: successUpdate,
    } = designateUpdate


    useEffect(() => {
        if (successUpdate) {
            dispatch({ type: DESIGNATE_UPDATE_RESET })
            history.push('/list-designate')
        } else {
            if (designate._id !== id) {
                dispatch(detailsDesignate(id))
            } else {
                setName(designate.name)
                setDescription(designate.description)
            }
        }
    }, [dispatch, history, id, designate, successUpdate])

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


    const UpdateDesignateForm = () => (

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
                        <button className="btn btn-primary btn-block">Update Designation </button></div>
                </div>
            </form>

        </div>

    );

    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(updateDesignate({ _id: id, name,  description}))
    }

    return (
        <Layout title="Update test Form">
            <>
                <h2 className="mb-4">Update Designation </h2>
                
                {errorUpdate && <div className="alert alert-danger" role="alert">
                    {errorUpdate}
                </div>}
                {showLoadingData()}
                {showLoading()}
                {showError()}
                {UpdateDesignateForm()}
            </>
        </Layout>
    )



}



export default UpdateDesignation