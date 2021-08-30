import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import Layout from "../core/Layout";
import { createDepart } from '../actions/departmentActions'
import { listFloors } from '../actions/floorActions'






const AddDepartment = ({ history }) => {

    const [name, setName] = useState('')
    const [head, setHead] = useState('')
    const [address, setAddress] = useState("")
    const [floor, setFloor] = useState("")
    const [phone, setPhone] = useState("")


    const dispatch = useDispatch()


    const floorList = useSelector((state) => state.floorList)
    const { floors } = floorList

    const userLogin = useSelector((state) => state.userLogin)
    const { userInfo } = userLogin

    const departsCreate = useSelector((state) => state.departsCreate)
    const { success, error, loading } = departsCreate

    useEffect(() => {

        if (userInfo && userInfo.role === 0) {
            dispatch(listFloors())
        } else {
            history.push('/login')
        }


    }, [success, dispatch, userInfo])

    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(createDepart({  name, head, address, floor, phone}))
        history.push('/list-departs')
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

    const AddDepartForm = () => (
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
                        <label className="small mb-1" htmlFor="description">Head</label>
                        <input className="form-control py-4"  type="name" aria-describedby="emailHelp"
                               placeholder="Enter Head" value={head}
                               onChange={(e) => setHead(e.target.value)}/>
                    </div>
                </div>
            </div>

            <div className="form-row">
                <div className="col-md-8">
                    <div className="form-group">
                        <label className="small mb-1" htmlFor="description">Address</label>
                        <input className="form-control py-4"  type="name" aria-describedby="emailHelp"
                               placeholder="Enter Address" value={address}
                               onChange={(e) => setAddress(e.target.value)}/>
                    </div>
                </div>
            </div>

            <div className="form-row">
                <div className="col-md-8">
                    <div className="form-group">
                        <label className="small mb-1" htmlFor="description">Phone</label>
                        <input className="form-control py-4"  type="name" aria-describedby="emailHelp"
                               placeholder="Enter phone No" value={phone}
                               onChange={(e) => setPhone(e.target.value)}/>
                    </div>
                </div>
            </div>

            <div className="form-row">
                <div className="col-md-8">
                    <div className="form-group">
                        <label className="text-muted">Select Floor</label>
                        <select onChange={(e) => setFloor(e.target.value)} className="form-control">
                            <option>Please select a Floor</option>
                            {floors &&
                            floors.map((c, i) => (
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
                    <button className="btn btn-primary btn-block">Add Depart </button></div>
            </div>
        </form>

    );


    return (
        <Layout title="Category test Form">
            <h2 className="mb-4">Add A Department</h2>

            {showLoading()}
            {showError()}
            {AddDepartForm()}
        </Layout>
    )
}




export default AddDepartment