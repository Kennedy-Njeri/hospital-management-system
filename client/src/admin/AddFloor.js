import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import Layout from "../core/Layout";
import { createFloor } from '../actions/floorActions'
import { listBuildings } from '../actions/buildingsActions'
import { FLOOR_CREATE_RESET } from '../constants/floorConstants'






const AddFloor = ({ history }) => {

    const [name, setName] = useState('')
    const [floorcode, setFloorCode] = useState('')
    const [building, setBuilding] = useState("")


    const dispatch = useDispatch()

    
    const buildingList = useSelector((state) => state.buildingList)
    const { buildings } = buildingList


    const userLogin = useSelector((state) => state.userLogin)
    const { userInfo } = userLogin



    const floorCreate = useSelector((state) => state.floorCreate)
    const { success, error, loading } = floorCreate



    useEffect(() => {
        
        if (userInfo && userInfo.role === 0) {
            dispatch(listBuildings())

            if(success) {
                dispatch({ type: FLOOR_CREATE_RESET })
                history.push('/list-floors')
            }
        }
        


    }, [success, dispatch, userInfo])

    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(createFloor({  name, floorcode, building}))
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

    const AddFloorForm = () => (
        <form onSubmit={submitHandler}>

            <div className="form-row">
                <div className="col-md-8">
                    <div className="form-group">
                        <label className="small mb-1" htmlFor="description">Name</label>
                        <input className="form-control py-4"   type="name" aria-describedby="emailHelp"
                               placeholder="Enter name" value={name}
                               onChange={(e) => setName(e.target.value)}/>
                    </div>
                </div>
            </div>

            <div className="form-row">
                <div className="col-md-8">
                    <div className="form-group">
                        <label className="small mb-1" htmlFor="description">Floor Code</label>
                        <input className="form-control py-4"   type="name" aria-describedby="emailHelp"
                               placeholder="Enter Floor Code" value={floorcode}
                               onChange={(e) => setFloorCode(e.target.value)}/>
                    </div>
                </div>
            </div>

            <div className="form-row">
                <div className="col-md-8">
                    <div className="form-group">
                        <label className="text-muted">Select Building</label>
                        <select onChange={(e) => setBuilding(e.target.value)}  className="form-control">
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
                    <button className="btn btn-primary btn-block">Add Floor </button></div>
            </div>
        </form>

    );


    return (
        <Layout title="Category test Form">
            <h2 className="mb-4">Add A floor</h2>
            
            {showLoading()}
            {showError()}
            {AddFloorForm()}
        </Layout>
    )
}




export default AddFloor