import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import Layout from "../core/Layout";
import { createBuilding } from '../actions/buildingsActions'






const AddBuilding = ({ history }) => {

    const [name, setName] = useState('')
    const [code, setCode] = useState('')
    const [description, setDescription] = useState('')


    const dispatch = useDispatch()


    const buidingCreate = useSelector((state) => state.buidingCreate)
    const { success, error, loading } = buidingCreate

    useEffect(() => {
        if (success) {
            history.push('/list-buildings')
        }
    }, [success, dispatch])

    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(createBuilding({ name, code, description}))
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

    const BuildingForm = () => (
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
                        <label className="small mb-1" htmlFor="inputMinValue">Code</label>
                        <input className="form-control py-4"  type="name" aria-describedby="emailHelp"
                               placeholder="room code" value={code}
                               onChange={(e) => setCode(e.target.value)}/>
                    </div>
                </div>
            </div>
            <div className="form-row">
                <div className="col-md-8">
                    <div className="form-group">
                        <label className="small mb-1" htmlFor="description">Description</label>
                        <input className="form-control py-4"  type="name" aria-describedby="emailHelp"
                               placeholder="Enter description" value={description}
                               onChange={(e) => setDescription(e.target.value)}/>
                    </div>
                </div>
            </div>
            <div className="col-md-8">
                <div className="form-group mt-4 mb-0">
                    <button className="btn btn-primary btn-block">Create Building </button></div>
            </div>
        </form>

    );


    return (
        <Layout title="Category test Form">
            <h2 className="mb-4">Create Building</h2>

            {showLoading()}
            {showError()}
            {BuildingForm()}
        </Layout>
    )
}




export default AddBuilding