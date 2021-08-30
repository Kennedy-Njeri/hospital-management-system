import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import Layout from "../core/Layout";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import {UPDATE_APPOINTMENT_VACCINE_RESET} from "../constants/vaccineAppointmentConstants";
import moment from "moment";
import { listVacDaysEnums, listVacTakenEnums, updateVacApp, detailsVacApp } from '../actions/vaccineAppointmentActions'
import { listUsers  } from '../actions/userActions'
import { listVacCat  } from '../actions/vaccineCatActions'
import TimePicker from 'react-time-picker';
import "react-time-picker/dist/TimePicker.css";
import "react-clock/dist/Clock.css";











const  UpdateVaccApp = ({ history: history1, match}) => {

    const id = match.params.id

    const [patient, setPatient] = useState('')
    const [nurse, setNurse] = useState('')
    const [vaccine, setVaccine] = useState('')
    const [date, setDate] = useState(new Date());
    const [time_in, setTimeIn] = useState('')
    const [taken, setTaken] = useState('')
    const [day, setDay] = useState('')
    const [room, setRoom] = useState('105')
    const [remarks, setRemarks] = useState('')


    const dispatch = useDispatch()

    const vaccineCatList = useSelector((state) => state.vaccineCatList)
    const { vaccines } = vaccineCatList

    console.log(vaccines)

    const userList = useSelector((state) => state.userList)
    const { users } = userList
    console.log(users)


    const medicineType = useSelector((state) => state.medicineType)
    const { types } = medicineType
    console.log(types)

    const vaccineAppUpdate = useSelector((state) => state.vaccineAppUpdate)
    const {
        loading: loadingUpdate,
        error: errorUpdate,
        success: successUpdate,
    } = vaccineAppUpdate


    const vaccineAppTaken = useSelector((state) => state.vaccineAppTaken)
    const { takes } = vaccineAppTaken

    const vaccineAppDays = useSelector((state) => state.vaccineAppDays)
    const { days } = vaccineAppDays

    const vaccineAppDetails = useSelector((state) => state.vaccineAppDetails)
    const { loading, error, appointment } = vaccineAppDetails

    console.log(appointment)




    useEffect(() => {

        if (successUpdate) {
            dispatch({ type: UPDATE_APPOINTMENT_VACCINE_RESET })
            history1.push('/list-app-vaccine')

        } else {

            if (appointment._id !== id) {
                dispatch(listUsers())
                dispatch(listVacTakenEnums())
                dispatch(listVacDaysEnums())
                dispatch(listVacCat())
                dispatch(detailsVacApp(id))


            } else {
                setPatient(appointment.patient)
                setNurse(appointment.nurse)
                setVaccine(appointment.vaccine)
                setDate(moment(appointment.date).format("YYYY-MM-DD"))
                setTimeIn(appointment.time_in)
                setTaken(appointment.taken)
                setDay(appointment.day)
                setRoom(appointment.room)
                setRemarks(appointment.remarks)

            }

        }
    }, [ dispatch, history1, id, appointment, successUpdate])




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
        dispatch(updateVacApp({ _id: id, patient, nurse, vaccine, date, time_in, taken, day, room, remarks }))
    }


    const UpdateAppointmentForm = () => (

        <div className="form-group col-md-12">
            <form onSubmit={submitHandler}>
                <div className="form-row">
                    <div className="form-group col-md-4">
                        <label className="text-muted">User</label>
                        <select onChange={(e) => setPatient(e.target.value)} className="form-control">
                            <option>Select Patient</option>
                            {users &&
                            users.filter(filtered => filtered.role === 2).map((c, i) => (
                                <option key={i} value={c._id}>
                                    {c.name}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="form-group col-md-4">
                        <label className="text-muted">User</label>
                        <select onChange={(e) => setNurse(e.target.value)} className="form-control">
                            <option>Select Nurse</option>
                            {users &&
                            users.filter(filtered => filtered.role === 4).map((c, i) => (
                                <option key={i} value={c._id}>
                                    {c.name}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="form-group col-md-4">
                        <label className="text-muted">Vaccine</label>
                        <select onChange={(e) => setVaccine(e.target.value)} className="form-control">
                            <option>Select Vaccine</option>
                            {vaccines &&
                            vaccines.map((c, i) => (
                                <option key={i} value={c._id}>
                                    {c.name}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>



                <div className="form-row">
                    <div className="form-group col-md-6">
                        <label htmlFor="inputAddress">Time In</label>
                        <TimePicker
                            onChange={setTimeIn}
                            value={time_in}
                            className="class1 class2"
                        />
                    </div>

                    <div className="form-group col-md-6">
                        <label htmlFor="inputAddress">Date</label>

                        <DatePicker   value={date}   onChange={date => setDate(moment(date).format("YYYY-MM-DD"))} className="form-control" />

                    </div>
                </div>


                <div className="form-row">
                    <div className="form-group col-md-6">
                        <label htmlFor="exampleFormControlSelect1">Taken</label>
                        <select onChange={(e) => setTaken(e.target.value)} className="form-control" id="exampleFormControlSelect1">
                            <option>Select Takes</option>
                            {takes && takes.map((c, i) => (
                                <option key={i} value={c}>
                                    {c}
                                </option>
                            ))}
                        </select>
                    </div>


                    <div className="form-group col-md-6">
                        <label htmlFor="exampleFormControlSelect1">Day</label>
                        <select onChange={(e) => setDay(e.target.value)} className="form-control" id="exampleFormControlSelect1">
                            <option>Select Day</option>
                            {days && days.map((c, i) => (
                                <option key={i} value={c}>
                                    {c}
                                </option>
                            ))}
                        </select>
                    </div>

                </div>


                <div className="form-row">

                    <div className="form-group col-md-6">
                        <label htmlFor="inputAddress">Room</label>
                        <input type="text" className="form-control"  placeholder="e.g 105" value={room}
                               onChange={(e) => setRoom(e.target.value)}/>
                    </div>


                    <div className="form-group col-md-6">
                        <label htmlFor="exampleFormControlTextarea1">Remarks</label>
                        <textarea className="form-control" id="exampleFormControlTextarea1" value={remarks}
                                  onChange={(e) => setRemarks(e.target.value)} placeholder="write description" rows="3"/>
                    </div>

                </div>

                <button type="submit" className="btn btn-primary">Save</button>
            </form>
        </div>
    )

    return  (

        <Layout title="Category treatment Form">
            <>
                <h2 className="mb-4">Update Appointment</h2>
                {errorUpdate && <div className="alert alert-danger" role="alert">
                    {errorUpdate}
                </div>}
                {showError()}
                {showLoadingData()}
                {showLoading()}
                {UpdateAppointmentForm()}
            </>

        </Layout>
    )
}







export default UpdateVaccApp