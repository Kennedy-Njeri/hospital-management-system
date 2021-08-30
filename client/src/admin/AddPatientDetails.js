import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import Layout from "../core/Layout";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { listUsers  } from '../actions/userActions'
import { listGenderEnums, listStatusEnums, createPatient, listTypeEnums } from '../actions/patientActions'
import axios from "axios";
import {PATIENT_CREATE_RESET} from "../constants/patientDetailsConstants";









const  AddPatientDetails = ({ history: history1}) => {
    
    
    const [user, setUser] = useState('')
    const [lastName, setLastName] = useState('curry')
    const [idNumber, setIdNumber] = useState(2222556)
    const [regDate, setRegDate] = useState(new Date());
    const [address, setAddress] = useState('Nairobi')
    const [cell, setCell] = useState(56755575)
    const [birthDate, setBirthDate] = useState(new Date())
    const [residence, setResidence] = useState('Kilimani')
    const [email, setEmail] = useState('steph@gmail.com')
    const [guardian, setGuardian] = useState('smart')
    const [relation, setRelation] = useState('cousin')
    const [gender, setGender] = useState('Male')
    const [statusPatient, setStatusPatient] = useState('Cured')
    const [patientType, setPatientType] = useState('In Patient')

    const [image, setImage] = useState('')
    const [uploading, setUploading] = useState(false)

    console.log(image)

    const dispatch = useDispatch()

    const userList = useSelector((state) => state.userList)
    const { users } = userList

    const userLogin = useSelector((state) => state.userLogin)
    const { userInfo } = userLogin

    const patientGender = useSelector((state) => state.patientGender)
    const { genders } = patientGender

    const patientStatus = useSelector((state) => state.patientStatus)
    const { status } = patientStatus

    const patientTypes = useSelector((state) => state.patientTypes)
    const { types } = patientTypes

    const patientCreate = useSelector((state) => state.patientCreate)
    const { error, loading, success } = patientCreate


    useEffect(() => {


        if (userInfo && userInfo.role === 0) {
            dispatch(listUsers())
            dispatch(listTypeEnums())
            dispatch(listStatusEnums())
            dispatch(listGenderEnums())

            if(success) {
                dispatch({ type: PATIENT_CREATE_RESET })
                history1.push('/list-patients')
            }
            
        } else {
            history1.push('/login')
        }


    }, [ dispatch, userInfo, success])


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

    const submitHandler = (e) => {
        e.preventDefault()

     dispatch(createPatient({ user, lastName, idNumber, regDate,
          address, cell, birthDate, residence, email, guardian, relation, gender, statusPatient, patientType, image }))

    }

    const uploadFileHandler = async (e) => {
        const file = e.target.files[0]
        const formData = new FormData()
        formData.append('image', file)
        console.log(formData)
        setUploading(true)

        try {
            const config = {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            }

            const { data } = await axios.post(` http://localhost:8000/upload`, formData, config)

            setImage(data)
            console.log(data)
            setUploading(false)
        } catch (error) {
            console.error(error)
            setUploading(false)
        }
    }
    





    const patientDetailsForm = () => (

        <div className="form-group col-md-12">
            <form onSubmit={submitHandler}>
                <div className="form-row">
                    <div className="form-group col-md-3">
                        <label className="text-muted font-weight-bold">User</label>
                        <select onChange={(e) => setUser(e.target.value)} className="form-control">
                            <option>Select Patient</option>
                            {users &&
                            users.filter(filtered => filtered.role === 2).map((c, i) => (
                                <option key={i} value={c._id}>
                                    {c.name}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="form-group col-md-3">
                        <label className="font-weight-bold" htmlFor="inputAddress">Last Name</label>
                        <input type="text" className="form-control"  placeholder="Last Number" value={lastName}
                               onChange={(e) => setLastName(e.target.value)}/>
                    </div>
                    <div className="form-group col-md-3">
                        <label className="font-weight-bold" htmlFor="inputAddress">Id Number</label>
                        <input type="text" className="form-control"  placeholder="Id Number" value={idNumber}
                               onChange={(e) => setIdNumber(e.target.value)}/>
                    </div>
                    <div className="form-group col-md-3">
                        <label className="font-weight-bold" htmlFor="inputAddress">Registration date</label>
                        <DatePicker selected={regDate} onChange={date => setRegDate(date)} className="form-control" />
                    </div>
                </div>

                <div className="form-row">
                    <div className="form-group col-md-3">
                        <label className="font-weight-bold" htmlFor="exampleFormControlTextarea1">Address</label>
                        <textarea className="form-control"
                                  placeholder="write address" rows="3" value={address}
                                  onChange={(e) => setAddress(e.target.value)}/>
                    </div>

                    <div className="form-group col-md-3">
                        <label className="font-weight-bold" htmlFor="inputAddress">Cell No</label>
                        <input type="text" className="form-control"  placeholder="cell no" value={cell}
                               onChange={(e) => setCell(e.target.value)}/>
                    </div>

                    <div className="form-group col-md-3">
                        <label className="font-weight-bold" htmlFor="inputAddress">Date of Birth</label>

                        <DatePicker selected={birthDate} onChange={date => setBirthDate(date)} className="form-control" />
                    </div>

                    <div className="form-group col-md-3">
                        <label className="font-weight-bold" htmlFor="inputAddress">Residence</label>
                        <input type="text" className="form-control"  placeholder="residence" value={residence}
                               onChange={(e) => setResidence(e.target.value)}/>
                    </div>

                </div>


                <div className="form-row">
                    <div className="form-group col-md-3">
                        <label className="font-weight-bold" htmlFor="inputAddress">Email</label>
                        <input type="email" className="form-control"  placeholder="email" value={email}
                               onChange={(e) => setEmail(e.target.value)}/>
                    </div>

                    <div className="form-group col-md-3">
                        <label className="font-weight-bold" htmlFor="inputAddress">Gurdian</label>
                        <input type="text" className="form-control"  placeholder="guardian" value={guardian}
                               onChange={(e) => setGuardian(e.target.value)}/>
                    </div>
                    <div className="form-group col-md-3">
                        <label className="font-weight-bold" htmlFor="inputAddress">Relation</label>
                        <input type="text" className="form-control"  placeholder="relation" value={relation}
                               onChange={(e) => setRelation(e.target.value)}/>
                    </div>


                    <div className="form-group col-md-3">
                        <label className="font-weight-bold" htmlFor="exampleFormControlSelect1">Gender</label>
                        <select onChange={(e) => setGender(e.target.value)} className="form-control" id="exampleFormControlSelect1">
                            {genders &&
                            genders.map((c, i) => (
                                <option key={i} value={c}>
                                    {c}
                                </option>
                            ))}
                        </select>
                    </div>

                </div>

                <div className="form-row">
                    <div className="form-group col-md-4">
                        <label className="font-weight-bold" htmlFor="exampleFormControlSelect1">Patient Status</label>
                        <select onChange={(e) => setStatusPatient(e.target.value)} className="form-control" id="exampleFormControlSelect1">
                            <option>Please Select</option>
                            {status &&
                            status.map((c, i) => (
                                <option key={i} value={c}>
                                    {c}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="form-group col-md-4">
                        <label className="font-weight-bold" htmlFor="exampleFormControlSelect1">Inpatient/Outpatient</label>
                        <select onChange={(e) => setPatientType(e.target.value)}  className="form-control" id="exampleFormControlSelect1">
                            <option>Please Select</option>
                            {types &&
                            types.map((c, i) => (
                                <option key={i} value={c}>
                                    {c}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="form-group col-md-4">
                        <label className="font-weight-bold" htmlFor="exampleFormControlFile1">Upload Photo</label>
                        <input type="file"
                                onChange={uploadFileHandler} className="form-control-file" id="exampleFormControlFile1"/>
                        {uploading && (
                            <div className="d-flex justify-content-center">
                                <div className="spinner-border" role="status">
                                    <span className="sr-only">Loading...</span>
                                </div>
                            </div>
                        )}
                        <button className="invisible" >Submit</button>
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
                {showError()}
                {showLoading()}
                {patientDetailsForm()}
            </>

        </Layout>
    )
}







export default AddPatientDetails