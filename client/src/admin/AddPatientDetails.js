import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import Layout from "../core/Layout";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";







const  AddPatientDetails = () => {

    const [user, setUser] = useState('')
    const [lastName, setLastName] = useState('')
    const [idNumber, setidNumber] = useState()
    const [regDate, setRegDate] = useState(new Date());
    const [address, setAdress] = useState('')
    const [cell, setCell] = useState()
    const [birthDate, setBirthDate] = useState(new Date())
    const [residence, setResidence] = useState('')
    const [email, setEmail] = useState('')
    const [guardian, setGuardian] = useState('')
    const [relation, setRelation] = useState('')
    const [gender, setGender] = useState('')
    const [statusPatient, setStatusPatient] = useState('')
    const [patientType, setPatientType] = useState('')
    const [image, setImage] = useState('')





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
                        <input type="text" className="form-control"  placeholder="Last Number"/>
                    </div>
                    <div className="form-group col-md-3">
                        <label htmlFor="inputAddress">Id Number</label>
                        <input type="text" className="form-control"  placeholder="Id Number"/>
                    </div>
                    <div className="form-group col-md-3">
                        <label htmlFor="inputAddress">Registration date</label>
                        <DatePicker selected={regDate} onChange={date => setRegDate(date)} className="form-control" />
                    </div>
                </div>

                <div className="form-row">
                    <div className="form-group col-md-3">
                        <label htmlFor="exampleFormControlTextarea1">Address</label>
                        <textarea className="form-control"
                                   placeholder="write address" rows="3"></textarea>
                    </div>

                    <div className="form-group col-md-3">
                        <label htmlFor="inputAddress">Cell No</label>
                        <input type="text" className="form-control"  placeholder="cell no"/>
                    </div>

                    <div className="form-group col-md-3">
                        <label htmlFor="inputAddress">Date of Birth</label>

                        <DatePicker selected={birthDate} onChange={date => setBirthDate(date)} className="form-control" />
                    </div>

                    <div className="form-group col-md-3">
                        <label htmlFor="inputAddress">Residence</label>
                        <input type="text" className="form-control"  placeholder="residence"/>
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
                            <option>Please Select</option>
                            <option>Male</option>
                            <option>Female</option>
                        </select>
                    </div>

                </div>

                <div className="form-row">
                    <div className="form-group col-md-4">
                    <label htmlFor="exampleFormControlSelect1">Patient Status</label>
                    <select className="form-control" id="exampleFormControlSelect1">
                        <option>Please Select</option>
                        <option>Cured</option>
                        <option>Under Treatment</option>
                    </select>
                    </div>

                    <div className="form-group col-md-4">
                        <label htmlFor="exampleFormControlSelect1">Inpatient/Outpatient</label>
                        <select className="form-control" id="exampleFormControlSelect1">
                            <option>Please Select</option>
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
                <h2 className="mb-4">Add Patient Details</h2>
                {patientDetailsForm()}
            </>

        </Layout>
    )
}







export default AddPatientDetails