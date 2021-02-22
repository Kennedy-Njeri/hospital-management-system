import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import Layout from "../core/Layout";
import { floorsDetails, updateFloor } from '../actions/floorActions'
import { FLOOR_UPDATE_RESET } from '../constants/floorConstants'
import { listBuildings } from '../actions/buildingsActions'



const UpdateFloor = ({ history, match }) => {

    const id = match.params.id

    const dispatch = useDispatch()

    const [name, setName] = useState('')
    const [floorcode, setFloorCode] = useState('')
    const [building, setBuilding] = useState('')

    const buildingList = useSelector((state) => state.buildingList)
    const { buildings } = buildingList
    

    const floorDetails = useSelector((state) => state.floorDetails)
    const { loading, error, floor } = floorDetails
    
    console.log(floor)

    const floorUpdate = useSelector((state) => state.floorUpdate)
    const {
        loading: loadingUpdate,
        error: errorUpdate,
        success: successUpdate,
    } = floorUpdate


    useEffect(() => {
        if (successUpdate) {
            dispatch({ type: FLOOR_UPDATE_RESET })
            history.push('/list-floors')
        } else {
            if (floor._id !== id) {
                dispatch(listBuildings())
                dispatch(floorsDetails(id))
            } else {
                setName(floor.name)
                setBuilding(floor.building)
                setFloorCode(floor.floorcode)
            }
        }
    }, [dispatch, history, id, floor, successUpdate])

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


    const UpdateFloorForm = () => (
        
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
                            <label className="small mb-1" htmlFor="description">Floor Code</label>
                            <input className="form-control py-4"  type="name" aria-describedby="emailHelp"
                                   placeholder="Enter Floor Code" value={floorcode}
                                   onChange={(e) => setFloorCode(e.target.value)}/>
                        </div>
                    </div>
                </div>

                <div className="form-row">
                    <div className="col-md-8">
                        <div className="form-group">
                            <label className="text-muted">Select Building</label>
                            <select onChange={(e) => setBuilding(e.target.value)} className="form-control">
                                <option>Please select a Building</option>
                                {buildings &&
                                buildings.map((c, i) => (
                                    <option key={i} value={c._id}>
                                        {c.name}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>

                </div>


                <div className="col-md-8">
                    <div className="form-group mt-4 mb-0">
                        <button className="btn btn-primary btn-block">Update Floor </button></div>
                </div>
            </form>
        

    );

    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(updateFloor({ _id: id, name, floorcode, building }))
    }

    return (
        <Layout title="Update test Form">
            <div>
                <h2 className="mb-4">Update Floor For: </h2>
                <h3>Name: {name} </h3>
              
                {errorUpdate && <div className="alert alert-danger" role="alert">
                    {errorUpdate}
                </div>}
                {showLoadingData()}
                {showLoading()}
                {showError()}
                {UpdateFloorForm()}
            </div>
        </Layout>
    )



}



export default UpdateFloor