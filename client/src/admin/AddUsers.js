import React, { useState, useEffect } from 'react';
import Layout from '../core/Layout';
import {  usersRegister } from '../actions/userActions'
import { useDispatch, useSelector } from 'react-redux'



const AddUsers = ({ history }) => {


    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [role, setRole] = useState(0)
    const [confirmPassword, setConfirmPassword] = useState('')
    const [message, setMessage] = useState(null)

    const dispatch = useDispatch()



    const usersCreate = useSelector((state) => state.usersCreate)
    const { success, error, loading } = usersCreate


    useEffect(() => {
        // if (success) {
        //     history.push('/list/users')
        // }
    }, [dispatch, success])

    const submitHandler = (e) => {
        e.preventDefault()
        if (password !== confirmPassword) {
            setMessage('Passwords do not match')
        } else {

            dispatch(usersRegister({ name, email, password, role }))
            history.push('/list/users')
        }

    }

    const usersForm = () => (
        <form onSubmit={submitHandler}>
            <div className="form-row">
                <div className="col-md-8">
                    <div className="form-group">
                        <label className="small mb-1" htmlFor="inputFirstName">Enter Name</label>
                        <input className="form-control py-4" id="inputFirstName" type="name"
                               placeholder="Enter name" value={name}
                               onChange={(e) => setName(e.target.value)}/>
                    </div>
                </div>

            </div>
            <div className="form-row">
                <div className="col-md-8">
                    <div className="form-group">
                        <label className="small mb-1" htmlFor="inputFirstName">Enter role</label>
                        <input className="form-control py-4" id="inputFirstName" type="role"
                               placeholder="Enter name" value={role}
                               onChange={(e) => setRole(e.target.value)}/>
                    </div>
                </div>

            </div>
            <div className="form-row">
                <div className="col-md-8">
                    <div className="form-group">
                        <label className="small mb-1" htmlFor="inputEmailAddress">Email</label>
                        <input className="form-control py-4"  type="email" aria-describedby="emailHelp"
                               placeholder="Enter email address" value={email}
                               onChange={(e) => setEmail(e.target.value)}/>
                    </div>
                </div>
            </div>
            <div className="form-row">
                <div className="col-md-8">
                    <div className="form-group">
                        <label className="small mb-1" htmlFor="inputPassword">Password</label>
                        <input className="form-control py-4" type="password"
                               placeholder="Enter password" value={password}
                               onChange={(e) => setPassword(e.target.value)}/>
                    </div>
                </div>
                <div className="col-md-8">
                    <div className="form-group">
                        <label className="small mb-1" htmlFor="inputConfirmPassword">Confirm Password</label>
                        <input className="form-control py-4"  type="password"
                               placeholder="Confirm password" value={confirmPassword}
                               onChange={(e) => setConfirmPassword(e.target.value)}/>
                    </div>
                </div>
            </div>
            
            <div className="col-md-8">
                <div className="form-group mt-4 mb-0">
                    <button className="btn btn-primary btn-block">Add
                        User</button></div>
            </div>

        </form>

    );

    const showError = () => (
        <div className="alert alert-danger" style={{ display: error ? '' : 'none' }}>
            {error}
        </div>
    );

    const showLoading = () =>
        loading && (
            <div className="d-flex justify-content-center">
                <div className="spinner-border" role="status">
                    <span className="sr-only">Loading...</span>
                </div>
            </div>
        );



    return (
        <Layout className="container-fluid">
            <h2 className="mb-4">Add User</h2>
            {email}
            {message && <div className="alert alert-danger" style={{ display: error ? '' : 'none' }}>
                {message}
            </div>}
            {showError()}
            {showLoading()}
            {usersForm()}
        </Layout>
    )
}





export default AddUsers