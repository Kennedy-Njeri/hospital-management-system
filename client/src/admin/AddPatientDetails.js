import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import Layout from "../core/Layout";







const  AddPatientDetails = () => {





    const patientDetailsForm = () => (

        <div className="form-group col-md-12">
            <form>
                <div className="form-row">
                    <div className="form-group col-md-3">
                        <label className="text-muted">User</label>
                        <select className="form-control">
                            <option>Select Patient</option>

                                <option>

                                </option>
                        </select>
                    </div>
                    <div className="form-group col-md-3">
                        <label htmlFor="inputAddress">Last Name</label>
                        <input type="text" className="form-control"  placeholder="Medicine"/>
                    </div>
                    <div className="form-group col-md-3">
                        <label htmlFor="inputAddress">Id Number</label>
                        <input type="text" className="form-control"  placeholder="Medicine"/>
                    </div>
                    <div className="form-group col-md-3">
                        <label htmlFor="inputAddress">Registration date</label>
                        <input type="text" className="form-control"  placeholder="Medicine"/>
                    </div>
                </div>

                <div className="form-row">
                    <div className="form-group col-md-4">
                        <label htmlFor="exampleFormControlTextarea1">Address</label>
                        <textarea className="form-control"
                                   placeholder="write address" rows="3"></textarea>
                    </div>
                    <div className="form-group col-md-4">
                        <label htmlFor="inputAddress">Date of Birth</label>
                        <input type="text" className="form-control"  placeholder="D.O.B"/>
                    </div>
                    <div className="form-group col-md-4">
                        <label htmlFor="inputAddress">Cell No</label>
                        <input type="text" className="form-control"  placeholder=""/>
                    </div>

                </div>


                <div className="form-row">
                    <div className="form-group col-md-3">
                        <label htmlFor="inputAddress">Email</label>
                        <input type="text" className="form-control"  placeholder="email"/>
                    </div>

                    <div className="form-group col-md-3">
                        <label htmlFor="inputAddress">Gurdian</label>
                        <input type="text" className="form-control"  placeholder="gurdian"/>
                    </div>
                    <div className="form-group col-md-3">
                        <label htmlFor="inputAddress">Relation</label>
                        <input type="text" className="form-control"  placeholder="relation"/>
                    </div>


                    <div className="form-group col-md-3">
                        <label htmlFor="exampleFormControlSelect1">Gender</label>
                        <select className="form-control" id="exampleFormControlSelect1">
                            <option>Male</option>
                            <option>Female</option>
                        </select>
                    </div>

                </div>

                <div className="form-row">
                    <div className="form-group col-md-4">
                    <label htmlFor="exampleFormControlSelect1">Patient Status</label>
                    <select className="form-control" id="exampleFormControlSelect1">
                        <option>Cured</option>
                        <option>Under Treatment</option>
                    </select>
                    </div>

                    <div className="form-group col-md-4">
                        <label htmlFor="exampleFormControlSelect1">Inpatient/Outpatient</label>
                        <select className="form-control" id="exampleFormControlSelect1">
                            <option>In Patient</option>
                            <option>Outpatient</option>
                        </select>
                    </div>

                    <div className="form-group col-md-4">
                        <label htmlFor="exampleFormControlFile1">Upload Photo</label>
                        <input type="file" className="form-control-file" id="exampleFormControlFile1"/>
                    </div>

                </div>


                <button type="submit" className="btn btn-primary">Save</button>
            </form>
        </div>
    )


    return  (
        <Layout title="Category treatment Form">

            <>
                {patientDetailsForm()}
                <h2 className="mb-4">Add Patient Details</h2>

            </>

        </Layout>
    )
}







export default AddPatientDetails