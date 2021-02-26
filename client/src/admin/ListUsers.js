import React, {useEffect, useState} from 'react'
import Layout from '../core/Layout';
import { listUsers, deleteUser  } from '../actions/userActions'
import { useDispatch, useSelector } from 'react-redux'
import {Link} from "react-router-dom";



const ListUsers = ({ history }) => {
    
    const dispatch = useDispatch()

    const userList = useSelector((state) => state.userList)
    const { loading, error, users } = userList

    const userLogin = useSelector((state) => state.userLogin)
    const { userInfo } = userLogin

    const userDelete = useSelector((state) => state.userDelete)
    const { success: successDelete } = userDelete

    const [keyword, setKeyword] = useState('')
    console.log(keyword)
    
    useEffect(() => {
        if (userInfo && userInfo.role === 0) {
            dispatch(listUsers())
        } else {
            history.push('/login')
        }
    }, [dispatch, history, successDelete, userInfo])

    const deleteHandler = (id) => {
        console.log(id)
        if (window.confirm('Are you sure')) {
            dispatch(deleteUser(id))
        }
    }

    const handleChange = (e) => {
        e.preventDefault()
        setKeyword(e.target.value)
    }


    const submitHandler = (e) => {
        e.preventDefault()
        if (keyword.trim()) {

            dispatch(listUsers(keyword))
        } else {
            dispatch(listUsers())
        }
    }

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
            <h4><Link to="/add-users"><button>Add User</button></Link></h4>
            <h2 className="mb-4">List Users</h2>

            {loading ? (
                showLoading()
            ) : error ? (
                showError()
            ) : (
                <div className="row">

                    <div className="col-lg-8">
                        <form onSubmit={submitHandler}>
                            <div className="input-group">
                                <input className="form-control" type="text" value={keyword}  onChange={handleChange} name="q" placeholder="Search for..." aria-label="Search"
                                       aria-describedby="basic-addon2"/>
                                <div className="input-group-append">
                                    <button className="btn btn-primary" type="button"><i className="fas fa-search"></i>
                                    </button>
                                </div>
                            </div>
                        </form>

                    </div>
                    
                    
                    <div className="col-sm-8">
                <table className="table">
                    <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">First</th>
                        <th scope="col">Email</th>
                        <th scope="col">Role</th>
                        <th scope="col">Edit</th>
                        <th scope="col">Delete</th>
                    </tr>
                    </thead>
                    <tbody>
                    {users &&
                    users.map((user, i) => (
                        <tr key={i}>
                        <th scope="row">{user._id}</th>
                        <td>{user.name}</td>
                        <td>{user.email}</td>
                            <td>
                                {user.role === 0 ? (
                                        <button type="button" className="btn btn-primary btn-sm">Admin</button>
                                    ) : user.role === 1 ? (
                                    <button type="button" className="btn btn-secondary btn-sm">Doctor</button>
                                    ): user.role === 2  ? (
                                    <button type="button" className="btn btn-info btn-sm">Patient</button>
                                ) : (
                                    <button type="button" className="btn btn-warning btn-sm">Staff</button>
                                )}
                            </td>
                            <td><Link to={`/update/users/${user._id}`}><i className="bi bi-pencil-square"></i></Link></td>
                            <td><i className="bi bi-trash" onClick={() => deleteHandler(user._id)}></i></td>
                        </tr>

                    ))}
                    </tbody>
                </table>
                    </div>
                </div>
            )}

        </Layout>
    )
}




export default ListUsers

