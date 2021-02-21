import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import Layout from "../core/Layout";
import { buildingsDetails, updateBuilding } from '../actions/buildingsActions'
import { BUILDING_UPDATE_RESET } from '../constants/building-floor'




const UpdateBuilding = ({ history, match }) => {

    const id = match.params.id

    const dispatch = useDispatch()

    const [name, setName] = useState('')
    const [code, setCode] = useState('')
    const [description, setDescription] = useState('')
    
    

    const buildingDetails = useSelector((state) => state.buildingDetails)
    const { loading, error, building } = buildingDetails
    
    console.log(building)

    const buildingUpdate = useSelector((state) => state.buildingUpdate)
    const {
        loading: loadingUpdate,
        error: errorUpdate,
        success: successUpdate,
    } = buildingUpdate


    useEffect(() => {
        if (successUpdate) {
            dispatch({ type: BUILDING_UPDATE_RESET })
            history.push('/list-buildings')
        } else {
            if (building._id !== id) {
                dispatch(buildingsDetails(id))
            } else {
                setName(building.name)
                setCode(building.code)
                setDescription(building.description)
            }
        }
    }, [dispatch, history, id, building, successUpdate])

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


    const UpdateBuildingForm = () => (

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
                        <button className="btn btn-primary btn-block">Update Building </button></div>
                </div>
            </form>

        </div>

    );

    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(updateBuilding({ _id: id, name, code, description}))
    }

    return (
        <Layout title="Update test Form">
            <>
                <h2 className="mb-4">Update Building For: </h2>
              
                <h4>Name: {name}</h4>
                {errorUpdate && <div className="alert alert-danger" role="alert">
                    {errorUpdate}
                </div>}
                {showLoadingData()}
                {showLoading()}
                {showError()}
                {UpdateBuildingForm()}
            </>
        </Layout>
    )



}



export default UpdateBuilding