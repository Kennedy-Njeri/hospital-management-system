import React, { useState, useEffect } from 'react';
import Layout from '../core/Layout';
//import { Link, Redirect } from 'react-router-dom';
import { getUserDetails, updateUserProfile } from '../actions/userActions'
import { useDispatch, useSelector } from 'react-redux'
import { USER_UPDATE_PROFILE_RESET } from '../constants/userConstants'


const Profile = ({ match, history }) => {

    const userId = match.params.userId
    
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [role, setRole] = useState(0)
    const [confirmPassword, setConfirmPassword] = useState('')
    const [message, setMessage] = useState(null)

    const dispatch = useDispatch()

    const userDetails = useSelector((state) => state.userDetails)
    const { loading, error, user} = userDetails

    const userLogin = useSelector((state) => state.userLogin)
    const { userInfo } = userLogin

    const userUpdateProfile = useSelector((state) => state.userUpdateProfile)
    const { success } = userUpdateProfile



    useEffect(() => {
        if (!user) {
            history.push('/login')
        } else {
            if (!user.name || !user || success) {
                dispatch({ type: USER_UPDATE_PROFILE_RESET })
                //console.log(user)
                dispatch(getUserDetails(userId))
            } else {
                setName(user.name)
                setEmail(user.email)
            }
        }
    }, [dispatch, history, userInfo, user, success, userId])

    const submitHandler = (e) => {
        e.preventDefault()
        if (password !== confirmPassword) {
            setMessage('Passwords do not match')
        } else {
            dispatch(updateUserProfile({ _id: user._id, name, email, role, password }))
        }
    }

    const userForm = () => (
        <form onSubmit={submitHandler}>
            <div className="form-row">
                <div className="col-md-8">
                    <div className="form-group">
                        <label className="small mb-1 font-weight-bold" htmlFor="inputFirstName">Enter Name</label>
                        <input className="form-control py-4" id="inputFirstName" type="name"
                               placeholder="Enter name" value={name}
                               onChange={(e) => setName(e.target.value)} disabled/>
                    </div>
                </div>

            </div>
            <div className="form-row">
                <div className="col-md-8">
                    <div className="form-group">
                        <label className="small mb-1 font-weight-bold" htmlFor="inputFirstName">Enter role</label>
                        <input className="form-control py-4" id="inputFirstName" type="role"
                               placeholder="Enter name" value={role}
                               onChange={(e) => setRole(e.target.value)} disabled/>
                    </div>
                </div>

            </div>
            <div className="form-row">
            <div className="col-md-8">
            <div className="form-group">
                <label className="small mb-1 font-weight-bold" htmlFor="inputEmailAddress">Email</label>
                <input className="form-control py-4"  type="email" aria-describedby="emailHelp"
                       placeholder="Enter email address" value={email}
                       onChange={(e) => setEmail(e.target.value)} disabled/>
            </div>
            </div>
            </div>
            <div className="form-row">
                <div className="col-md-8">
                    <div className="form-group">
                        <label className="small mb-1 font-weight-bold" htmlFor="inputPassword">Password</label>
                        <input className="form-control py-4" type="password"
                               placeholder="Enter password" value={password}
                               onChange={(e) => setPassword(e.target.value)} disabled/>
                    </div>
                </div>
                <div className="col-md-8">
                    <div className="form-group">
                        <label className="small mb-1 font-weight-bold" htmlFor="inputConfirmPassword">Confirm Password</label>
                        <input className="form-control py-4"  type="password"
                               placeholder="Confirm password" value={confirmPassword}
                               onChange={(e) => setConfirmPassword(e.target.value)} disabled/>
                    </div>
                </div>
            </div>
            <div className="col-md-8">
            <div className="form-group mt-4 mb-0">
                <button className="btn btn-primary btn-block" disabled>Update
                    Account</button></div>
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
        <Layout title="Profile" description="Update your profile" className="container-fluid">
            <h2 className="mb-4">Profile update</h2>
            {success &&  <div className="alert alert-success" role="alert">
                Updated
            </div>}
            {message && <div className="alert alert-danger" style={{ display: error ? '' : 'none' }}>
                {message}

            </div>}
            {showError()}
            {showLoading()}
            {userForm()}
        </Layout>
    )
}





export default Profile