import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import Layout from "../core/Layout";
import { treatCatCreate } from '../actions/treatmentActions'






const AddPrescription = () => {


    const addPrescriptionForm = () => (

        <div className="form-group col-md-12">
            <form>
                <div className="form-row">
                    <div className="form-group col-md-6">
                        <label className="text-muted">Patient</label>
                        <select className="form-control">
                            <option>Select patient</option>
                            <option>
                            </option>
                        </select>
                    </div>
                    <div className="form-group col-md-6">
                        <label className="text-muted">Treatment for</label>
                        <select className="form-control">
                            <option>Select Treatment</option>
                                <option>
                                </option>
                        </select>
                    </div>
                </div>

                <div className="form-row">
                <div className="form-group col-md-3">
                    <label htmlFor="inputAddress">Medicine</label>
                    <input type="text" className="form-control"  placeholder="Medicine"/>
                </div>
                <div className="form-group col-md-3">
                    <label htmlFor="inputAddress2">Time's as day</label>
                    <input type="text" className="form-control" id="inputAddress2"
                           placeholder="e.g 2 or 3"/>
                </div>
                    <div className="form-group col-md-3">
                        <label htmlFor="inputAddress">No of days</label>
                        <input type="text" className="form-control"  placeholder="Medicine"/>
                    </div>
                    <div className="form-group col-md-3">
                        <label className="text-muted">When to take</label>
                        <select className="form-control">
                            <option>please select</option>
                            <option>
                            </option>
                        </select>
                    </div>
                </div>

                
                <div className="form-row">
                    <div className="form-group col-md-6">
                        <label htmlFor="exampleFormControlSelect2">Tests</label>
                        <select multiple className="form-control" id="exampleFormControlSelect2">
                            <option>1</option>
                            <option>2</option>
                            <option>3</option>
                            <option>4</option>
                            <option>5</option>
                        </select>
                    </div>
                    <div className="form-group col-md-6">
                        <label htmlFor="exampleFormControlTextarea1">Case History</label>
                        <textarea className="form-control" id="exampleFormControlTextarea1" placeholder="write case history" rows="3"></textarea>
                    </div>

                </div>

                <button type="submit" className="btn btn-primary">Save</button>
            </form>
        </div>
    )


    return  (
        <Layout title="Category treatment Form">
            
            <>
            <h2 className="mb-4">Add Prescription</h2>
            
            {addPrescriptionForm()}
            </>

        </Layout>
    )

}




export default AddPrescription