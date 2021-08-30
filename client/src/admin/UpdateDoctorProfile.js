import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import Layout from "../core/Layout";
import DatePicker from "react-datepicker";
import { listUsers  } from '../actions/userActions'
import { listGenderEnums, listDaysEnums, listDutyEnums,  updateDoctors, doctorDetails } from '../actions/doctorActions'
import { listSpecialize } from '../actions/specializeActions'
import { listDeparts } from '../actions/departmentActions'
import { listDesignate } from '../actions/designateActions'
import axios from "axios";
import TimePicker from 'react-time-picker';
import "react-time-picker/dist/TimePicker.css";
import "react-clock/dist/Clock.css";
import {UPDATE_DOCTOR_RESET} from "../constants/doctorsDetailsConstants";
import moment from "moment";









const  UpdateDoctorProfile = ({ history: history1, match}) => {


    const id = match.params.id

    const [user, setUser] = useState('')
    const [lastName, setLastName] = useState('')
    const [idNumber, setIdNumber] = useState(0)
    const [regDate, setRegDate] = useState(new Date());
    const [address, setAddress] = useState('')
    const [cell, setCell] = useState(0)
    const [specialization, setSpecialization] = useState("")
    const [department, setDepartment] = useState('')
    const [designation, setDesignation] = useState('')
    const [residence, setResidence] = useState('')
    const [email, setEmail] = useState('')
    const [gender, setGender] = useState('')
    const [duty, setDuty] = useState('')
    const [room, setRoom] = useState('')
    const [fee, setFee] = useState(0)
    const [time_in, setTimeIn] = useState('')
    const [time_out, setTimeOut] = useState('')
    const [days, setDays] = useState('')


    const [image, setImage] = useState('')
    const [uploading, setUploading] = useState(false)

    console.log(image)

    const dispatch = useDispatch()

    const userList = useSelector((state) => state.userList)
    const { users } = userList

    const doctorGender = useSelector((state) => state.doctorGender)
    const { genders } = doctorGender

    const doctorDays = useSelector((state) => state.doctorDays)
    const { dayes } = doctorDays

    const doctorDuty = useSelector((state) => state.doctorDuty)
    const { duties } = doctorDuty


    const specializeList = useSelector((state) => state.specializeList)
    const { specializations } = specializeList

    const departsList = useSelector((state) => state.departsList)
    const { departments } = departsList

    const designateList = useSelector((state) => state.designateList)
    const { designations } = designateList

    const doctorDetail = useSelector((state) => state.doctorDetail)
    const { loading, error, doctor } = doctorDetail
    console.log(doctor)

    const doctorUpdate = useSelector((state) => state.doctorUpdate)
    const {
        loading: loadingUpdate,
        error: errorUpdate,
        success: successUpdate,
    } = doctorUpdate


    useEffect(() => {

        if (successUpdate) {
            dispatch({ type: UPDATE_DOCTOR_RESET })
            history1.push('/list-doctors')

        } else {

            if (doctor._id !== id) {
                dispatch(listUsers())
                dispatch(listDutyEnums())
                dispatch(listDaysEnums())
                dispatch(listGenderEnums())
                dispatch(listSpecialize())
                dispatch(listDeparts())
                dispatch(listDesignate())
                dispatch(doctorDetails(id))

            } else {
                setUser(doctor.user)
                setLastName(doctor.lastName)
                setIdNumber(doctor.idNumber)
                setRegDate(moment(doctor.regDate).format("YYYY-MM-DD"))
                setAddress(doctor.address)
                setCell(doctor.cell)
                setSpecialization(doctor.specialization)
                setDepartment(doctor.department)
                setDesignation(doctor.designation)
                setResidence(doctor.residence)
                setEmail(doctor.email)
                setGender(doctor.gender)
                setDuty(doctor.duty)
                setRoom(doctor.room)
                setFee(doctor.fee)
                setTimeIn(doctor.time_in)
                setTimeOut(doctor.time_out)
                setDays(doctor.days)
                setImage(doctor.image)

            }

        }
    }, [ dispatch, history1, id, doctor, successUpdate])


    const showError = () => (
        <div className="alert alert-danger" style={{ display: error ? '' : 'none' }}>
            {error}
        </div>
    );

    const showLoadingData = () =>
        loading && (
            <div className="d-flex justify-content-center">
                <div className="spinner-border" role="status">
                    <span className="sr-only">Loading...</span>
                </div>
            </div>
        );

    const showLoading = () =>
        loadingUpdate && (
            <div className="d-flex justify-content-center">
                <div className="spinner-border" role="status">
                    <span className="sr-only">Loading...</span>
                </div>
            </div>
        );

    const submitHandler = (e) => {
        e.preventDefault()

        dispatch(updateDoctors({ _id: id, user, lastName, idNumber, regDate,
            address, cell, specialization, department, designation, residence, email, gender, duty, room, fee, time_in, time_out, days, image }))
        //history1.push('/list-doctors')
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






    const doctorDetailsForm = () => (

        <div className="form-group col-md-12">
            <form onSubmit={submitHandler}>
                <div className="form-row">
                    <div className="form-group col-md-3">
                        <label className="text-muted">User</label>
                        <select onChange={(e) => setUser(e.target.value)} className="form-control">
                            <option>Select Doctor</option>
                            {users &&
                            users.filter(filtered => filtered.role === 1).map((c, i) => (
                                <option key={i} value={c._id}>
                                    {c.name}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="form-group col-md-3">
                        <label htmlFor="inputAddress">Last Name</label>
                        <input type="text" className="form-control"  placeholder="Last Number" value={lastName}
                               onChange={(e) => setLastName(e.target.value)}/>
                    </div>
                    <div className="form-group col-md-3">
                        <label htmlFor="inputAddress">Id Number</label>
                        <input type="text" className="form-control"  placeholder="Id Number" value={idNumber}
                               onChange={(e) => setIdNumber(e.target.value)}/>
                    </div>
                    <div className="form-group col-md-3">
                        <label htmlFor="inputAddress">Registration date</label>
                        <DatePicker   value={regDate}   onChange={date => setRegDate(moment(date).format("YYYY-MM-DD"))} className="form-control" />
                    </div>
                </div>

                <div className="form-row">
                    <div className="form-group col-md-3">
                        <label htmlFor="exampleFormControlTextarea1">Address</label>
                        <textarea className="form-control"
                                  placeholder="write address" rows="3" value={address}
                                  onChange={(e) => setAddress(e.target.value)}/>
                    </div>

                    <div className="form-group col-md-3">
                        <label htmlFor="inputAddress">Cell No</label>
                        <input type="text" className="form-control"  placeholder="cell no" value={cell}
                               onChange={(e) => setCell(e.target.value)}/>
                    </div>

                    <div className="form-group col-md-3">
                        <label className="text-muted">Specialization</label>
                        <select onChange={(e) => setSpecialization(e.target.value)} className="form-control">
                            <option>Select</option>
                            {specializations &&
                            specializations.map((c, i) => (
                                <option key={i} value={c._id}>
                                    {c.name}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="form-group col-md-3">
                        <label className="text-muted">Department</label>
                        <select onChange={(e) => setDepartment(e.target.value)} className="form-control">
                            <option>Select</option>
                            {departments &&
                            departments.map((c, i) => (
                                <option key={i} value={c._id}>
                                    {c.name}
                                </option>
                            ))}
                        </select>
                    </div>


                </div>

                <div className="form-row">

                    <div className="form-group col-md-3">
                        <label className="text-muted">Designation</label>
                        <select onChange={(e) => setDesignation(e.target.value)} className="form-control">
                            <option>Select</option>
                            {designations &&
                            designations.map((c, i) => (
                                <option key={i} value={c._id}>
                                    {c.name}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="form-group col-md-3">
                        <label htmlFor="inputAddress">Residence</label>
                        <input type="text" className="form-control"  placeholder="residence" value={residence}
                               onChange={(e) => setResidence(e.target.value)}/>
                    </div>

                    <div className="form-group col-md-3">
                        <label htmlFor="inputAddress">Email</label>
                        <input type="email" className="form-control"  placeholder="email" value={email}
                               onChange={(e) => setEmail(e.target.value)}/>
                    </div>

                    <div className="form-group col-md-3">
                        <label htmlFor="exampleFormControlSelect1">Gender</label>
                        <select onChange={(e) => setGender(e.target.value)} className="form-control" id="exampleFormControlSelect1">
                            <option>Select Gender</option>
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
                        <label htmlFor="exampleFormControlSelect1">Duty</label>
                        <select onChange={(e) => setDuty(e.target.value)} className="form-control" id="exampleFormControlSelect1">
                            <option>Select Duty</option>
                            {duties &&
                            duties.map((c, i) => (
                                <option key={i} value={c}>
                                    {c}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="form-group col-md-4">
                        <label htmlFor="inputAddress">Room</label>
                        <input type="text" className="form-control"  placeholder="guardian" value={room}
                               onChange={(e) => setRoom(e.target.value)}/>
                    </div>

                    <div className="form-group col-md-4">
                        <label htmlFor="inputAddress">Fee</label>
                        <input type="text" className="form-control"  placeholder="relation" value={fee}
                               onChange={(e) => setFee(e.target.value)}/>
                    </div>

                </div>



                <div className="form-row">

                    <div className="form-group col-md-3">
                        <label htmlFor="inputAddress">Time In</label>
                        <TimePicker
                            onChange={setTimeIn}
                            value={time_in}
                            className="class1 class2"
                        />
                    </div>

                    <div className="form-group col-md-3">
                        <label htmlFor="inputAddress">Time Out</label>
                        <TimePicker
                            onChange={setTimeOut}
                            value={time_out}
                            clockClassName="class1 class2"
                        />
                    </div>

                    <div className="form-group col-md-3">
                        <label htmlFor="exampleFormControlSelect2">Day</label>
                        <select multiple className="form-control" id="exampleFormControlSelect2" onChange={(e) => setDays(e.target.value)} >
                            <option>Select Day</option>
                            {dayes &&
                            dayes.map((c, i) => (
                                <option key={i} value={c}>
                                    {c}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="form-group col-md-3">
                        <label htmlFor="exampleFormControlFile1">Upload Photo</label>
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
                <h2 className="mb-4">Update Patient Info</h2>
                {errorUpdate && <div className="alert alert-danger" role="alert">
                    {errorUpdate}
                </div>}
                {showError()}
                {showLoadingData()}
                {showLoading()}
                {doctorDetailsForm()}
            </>

        </Layout>
    )
}







export default UpdateDoctorProfile