import React, {Fragment, useEffect} from 'react'
import Layout from '../core/Layout';
import { listVendors, deleteVendors } from '../actions/vendorsActions'
import { useDispatch, useSelector } from 'react-redux'
import {Link} from "react-router-dom";




const ListVendors = ({ history }) => {

    const dispatch = useDispatch()

    const vendorsList = useSelector((state) => state.vendorsList)
    const { loading, error, vendors } = vendorsList

    console.log(vendors)

    const [searchTerm, setSearchTerm] = React.useState("");

    const handleChange = event => {
        setSearchTerm(event.target.value);
    };


    const userLogin = useSelector((state) => state.userLogin)
    const { userInfo } = userLogin

    const vendorsDelete = useSelector((state) => state.vendorsDelete)
    const { success: successDelete } = vendorsDelete

    useEffect(() => {
        if (userInfo && userInfo.role === 0) {
            dispatch(listVendors())
        } else {
            history.push('/login')
        }
    }, [dispatch, history, successDelete, userInfo])


    const deleteHandler = (id) => {
        console.log(id)
        if (window.confirm('Are you sure')) {
            dispatch(deleteVendors(id))
        }
    }

    const results = !searchTerm ? vendors : vendors && vendors.filter(vendor =>
        vendor.name.toString().toLowerCase().includes(searchTerm)
    )


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
        <Layout title="Profile" className="container-fluid">

            <h4><Link to="/file-upload"><button>Add Vendors</button></Link></h4>

            <h2 className="mb-4">List Vendors</h2>

            {loading ? (
                showLoading()
            ) : error ? (
                showError()
            ) : (
                <div className="row">

                    <div className="col-lg-8">
                        <form>
                            <div className="input-group">
                                <input className="form-control" type="text" value={searchTerm} onChange={handleChange}  name="q" placeholder="Search for..." aria-label="Search"
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
                                <th scope="col">Id</th>
                                <th scope="col">name</th>
                                <th scope="col">Address</th>
                                <th scope="col">Email</th>
                                <th scope="col">Number</th>
                                <th scope="col">Delete</th>
                            </tr>
                            </thead>
                            <tbody>
                            {
                                results && results.map((vend, i) => (
                                    <tr key={i}>
                                        <Fragment>
                                            <th scope="row">{vend._id}</th>
                                            <td>{vend.name}</td>
                                            <td>{vend.address}</td>
                                            <td>{vend.email}</td>
                                            <td>{vend.number}</td>
                                            <td><i className="bi bi-trash" onClick={() => deleteHandler(vend._id)}></i></td>
                                        </Fragment>
                                    </tr>
                                ))

                            }
                            </tbody>
                        </table>
                    </div>
                </div>
            )}

        </Layout>
    )

}






export default ListVendors