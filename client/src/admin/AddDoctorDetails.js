import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import Layout from "../core/Layout";
import DatePicker from "react-datepicker";
import { listUsers  } from '../actions/userActions'
import { listGenderEnums, listDaysEnums, listDutyEnums, createDoctor } from '../actions/doctorActions'
import { listSpecialize } from '../actions/specializeActions'
import { listDeparts } from '../actions/departmentActions'
import { listDesignate } from '../actions/designateActions'
import axios from "axios";
import TimePicker from 'react-time-picker';
import "react-time-picker/dist/TimePicker.css";
import "react-clock/dist/Clock.css";
import { PATIENT_CREATE_RESET } from '../constants/patientDetailsConstants'










const  AddDoctorsDetails = ({ history: history1}) => {


    const [user, setUser] = useState('')
    const [lastName, setLastName] = useState('curry')
    const [idNumber, setIdNumber] = useState(2222556)
    const [regDate, setRegDate] = useState(new Date());
    const [address, setAddress] = useState('Nairobi')
    const [cell, setCell] = useState(56755575)
    const [specialization, setSpecialization] = useState("")
    const [department, setDepartment] = useState('')
    const [designation, setDesignation] = useState('')
    const [residence, setResidence] = useState('Kilimani')
    const [email, setEmail] = useState('steph@gmail.com')
    const [gender, setGender] = useState('Male')
    const [duty, setDuty] = useState('')
    const [room, setRoom] = useState('')
    const [fee, setFee] = useState(2000)
    const [time_in, setTimeIn] = useState('10:00')
    const [time_out, setTimeOut] = useState('10:00')
    const [days, setDays] = useState('')


    const [image, setImage] = useState('')
    const [uploading, setUploading] = useState(false)

    console.log(image)

    const dispatch = useDispatch()

    const userList = useSelector((state) => state.userList)
    const { users } = userList

    const userLogin = useSelector((state) => state.userLogin)
    const { userInfo } = userLogin

    const doctorGender = useSelector((state) => state.doctorGender)
    const { genders } = doctorGender

    const doctorDays = useSelector((state) => state.doctorDays)
    const { dayes } = doctorDays

    const doctorDuty = useSelector((state) => state.doctorDuty)
    const { duties } = doctorDuty

    const  doctorCreate = useSelector((state) => state.doctorCreate)
    const { error, loading, success } =  doctorCreate

    const specializeList = useSelector((state) => state.specializeList)
    const { specializations } = specializeList

    const departsList = useSelector((state) => state.departsList)
    const { departments } = departsList

    const designateList = useSelector((state) => state.designateList)
    const { designations } = designateList


    useEffect(() => {

        if (userInfo && userInfo.role === 0) {
            dispatch(listUsers())
            dispatch(listDutyEnums())
            dispatch(listDaysEnums())
            dispatch(listGenderEnums())
            dispatch(listSpecialize())
            dispatch(listDeparts())
            dispatch(listDesignate())

            if(success) {
                dispatch({ type: PATIENT_CREATE_RESET })
                history1.push('/list-doctors')
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

        dispatch(createDoctor({ user, lastName, idNumber, regDate,
            address, cell, specialization, department, designation, residence, email, gender, duty, room, fee, time_in, time_out, days, image }))

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
                        <label className="text-muted font-weight-bold">User</label>
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
                        <label className="text-muted font-weight-bold">Specialization</label>
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
                        <label className="text-muted font-weight-bold">Department</label>
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
                        <label className="text-muted font-weight-bold">Designation</label>
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
                        <label className="font-weight-bold" htmlFor="inputAddress">Residence</label>
                        <input type="text" className="form-control"  placeholder="residence" value={residence}
                               onChange={(e) => setResidence(e.target.value)}/>
                    </div>

                    <div className="form-group col-md-3">
                        <label className="font-weight-bold" htmlFor="inputAddress">Email</label>
                        <input type="email" className="form-control"  placeholder="email" value={email}
                               onChange={(e) => setEmail(e.target.value)}/>
                    </div>

                    <div className="form-group col-md-3">
                        <label className="font-weight-bold" htmlFor="exampleFormControlSelect1">Gender</label>
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
                        <label className="font-weight-bold" htmlFor="exampleFormControlSelect1">Duty</label>
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
                        <label className="font-weight-bold" htmlFor="inputAddress">Room</label>
                        <input type="text" className="form-control"  placeholder="guardian" value={room}
                               onChange={(e) => setRoom(e.target.value)}/>
                    </div>

                    <div className="form-group col-md-4">
                        <label className="font-weight-bold" htmlFor="inputAddress">Fee</label>
                        <input type="text" className="form-control"  placeholder="relation" value={fee}
                               onChange={(e) => setFee(e.target.value)}/>
                    </div>

                </div>



                <div className="form-row">

                    <div className="form-group col-md-3">
                        <label className="font-weight-bold" htmlFor="inputAddress">Time In</label>
                        <TimePicker
                            onChange={setTimeIn}
                            value={time_in}
                            className="class1 class2"
                        />
                    </div>

                    <div className="form-group col-md-3">
                        <label className="font-weight-bold" htmlFor="inputAddress">Time Out</label>
                        <TimePicker
                            onChange={setTimeOut}
                            value={time_out}
                            clockClassName="class1 class2"
                        />
                    </div>

                    <div className="form-group col-md-3">
                        <label className="font-weight-bold" htmlFor="exampleFormControlSelect2">Day</label>
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
                <h2 className="mb-4">Add Doctor Details</h2>
                {showError()}
                {showLoading()}
                {doctorDetailsForm()}
            </>

        </Layout>
    )
}







export default AddDoctorsDetails