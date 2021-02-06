import React, { useEffect } from 'react'
import Layout from '../core/Layout';
import { listUsers  } from '../actions/userActions'
import { useDispatch, useSelector } from 'react-redux'




const ListUsers = ({ history }) => {
    const dispatch = useDispatch()

    const userList = useSelector((state) => state.userList)
    const { loading, error, users } = userList

    const userLogin = useSelector((state) => state.userLogin)
    const { userInfo } = userLogin


    useEffect(() => {
        if (userInfo && userInfo.role === 0) {
            dispatch(listUsers())
        } else {
            history.push('/login')
        }
    }, [dispatch, history, userInfo])


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
            <h2 className="mb-4">List Users</h2>

            {loading ? (
                showLoading()
            ) : error ? (
                showError()
            ) : (
                <div className="row">
                    <div className="col-sm-8">
                <table className="table">
                    <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">First</th>
                        <th scope="col">Last</th>
                        <th scope="col">Role</th>
                    </tr>
                    </thead>
                    <tbody>
                    {users.map((user, i) => (
                        <tr key={i}>
                        <th scope="row">{user._id}</th>
                        <td>{user.name}</td>
                        <td>{user.email}</td>
                            <td>
                                {user.role === 0 ? (
                                        <button type="button" className="btn btn-primary btn-sm">Admin</button>
                                    ) : (
                                    <button type="button" className="btn btn-secondary btn-sm">Patient</button>
                                    )}
                            </td>
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

