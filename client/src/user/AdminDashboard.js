import React, {useEffect, useState} from "react";
import Layout from "../core/Layout";
import {useSelector, useDispatch} from "react-redux";
import { listUsers } from '../actions/userActions'
import { listPrescriptions } from '../actions/prescriptionActions'
import { listExpenses } from '../actions/expensesActions'
import { listTestsResults } from '../actions/testActions'
import { listVacApp } from '../actions/vaccineAppointmentActions'
import {Link} from "react-router-dom";
import { Pie, Doughnut, } from 'react-chartjs-2';




const AdminDashboard = () => {

    

    const dispatch = useDispatch()

    const userList = useSelector((state) => state.userList)
    const { loading, error, users } = userList



    // calculate number of user types
    const countAdmins = () => {
        return users.filter((user) => user.role === 0).length
    }

    const countDoctors = () => {
        return users.filter((user) => user.role === 1).length
    }

    const countPatients = () => {
        return users.filter((user) => user.role === 2).length
    }


    // expenses list
    const expenseList = useSelector((state) => state.expenseList)
    const { expenses } = expenseList

    console.log(expenses)


    //  appointments
    const vaccineAppList = useSelector((state) => state.vaccineAppList)
    let {  appointments } = vaccineAppList

    console.log(appointments)



    // calculate total amount of expenses
    const totalExpenses = () => {

        let totalExpe = expenses && expenses.reduce((acc, curr) => {

            acc += parseInt(curr.amount)

            return acc
        }, 0)

        return totalExpe
    }


    // prescription list Data
    const prescList = useSelector((state) => state.prescList)
    const { prescriptions } = prescList

    console.log(prescriptions)

    // calculate total amount paid in prescription Module
    const totalCollected = () => {

        let total = prescriptions && prescriptions.reduce((acc, curr) => {
            if (curr.paid === 'Paid') {
                acc += parseInt(curr.treatment.cost)
            }

            return acc
        }, 0)

        return total
    }

    // tests list Data
    const listTestResult = useSelector((state) => state.listTestResult)
    const { tests } = listTestResult
    console.log(tests)

    // calculate total amount paid in tests Module
    const totalCollected1 = () => {

        let total = tests && tests.reduce((acc, curr) => {
            if (curr.paid === 'Paid') {
                acc += parseInt(curr.testName.cost)
            }

            return acc
        }, 0)

        return total
    }




    useEffect(() => {

        dispatch(listUsers())
        dispatch(listPrescriptions())
        dispatch(listTestsResults())
        dispatch(listExpenses())
        dispatch(listVacApp())
        //getExpensesData()
        //getAppointmentData()

    },[dispatch])



    const getVaccineData = ()=> {

        let malaria = 0
        let coronaVirus = 0
        let vaccineCount = []

        appointments && appointments.forEach((data) => {
            if (data.vaccine.name === 'CoronaVirus') {
                coronaVirus++
            } else if (data.vaccine.name === 'Malaria') {
                malaria++
            }
        })

        vaccineCount.push(coronaVirus, malaria)

        let labels = ["Covid", "Malaria"]
        let customLabels = labels.map((label, index) => `${label}: ${vaccineCount[index]}`)


        return { vaccineCount, customLabels}
    }



    // get appointment data
    const getAppointmentData = () => {

        let vaccinated = 0
        let notVaccinated = 0

        appointments && appointments.filter((filtered) => filtered.vaccine.name === 'CoronaVirus')
            .forEach((data) => {
                if (data.taken === 'Yes') {
                    vaccinated++
                } else {
                    notVaccinated++
                }

            })


        console.log(`total vaccinated number is`, vaccinated)
        console.log(`total Notvaccinated number is`, notVaccinated)
        return { vaccinated, notVaccinated}
    }


    // chart for appointments
    const chartAppointment =  () => {

        let data = getAppointmentData()

        let appointmentList = []

        appointmentList.push(data.vaccinated, data.notVaccinated)



        let labels = ["Vaccinated", "Not Vaccinated"]
        let customLabels = labels.map((label, index) => `${label}: ${appointmentList[index]}`)



        return {labels, customLabels, appointmentList}
    }




    

    // get data for charts
    const getData =  () => {

        let admin = 0
        let doc = 0
        let patient = 0
        let staff  = 0
        let nurse = 0

        for (let user of  users ) {
            //console.log(users)
            if (user.role === 0) {
                admin++
            } else if (user.role === 1) {
                doc++
            } else if (user.role === 2) {
                patient++
            } else if (user.role === 3) {
                staff++
            } else if (user.role === 4) {
                nurse++
            } else {
                return null
            }
        }

        console.log(admin, doc, patient, staff)

        return { admin, doc, patient, staff, nurse}

    }


    
    
    // chart data
    const chart =  () => {

        let data = getData()

        let usersList = []

        usersList.push(data.admin, data.doc, data.patient, data.staff, data.nurse)



        let labels = ["Admin", "Doctors", "Patients", "Staff", "Nurses"]
        let customLabels = labels.map((label, index) => `${label}: ${usersList[index]}`)


        console.log(usersList)

        return {labels, customLabels, usersList}
    }


    // expense data
    const getExpensesData = () => {

        let amountList = []
        let expenseNames = []

        expenses && expenses.forEach((expense) => {
            amountList.push(expense.amount)
            expenseNames.push(expense.name)
        })

        console.log(`the amount list is ` , amountList)

        return { amountList, expenseNames}

    }

    // chart expense data
    const expenseChart =  () => {

       // let data = getExpensesData()

        let labels = getExpensesData().expenseNames
        let customLabels = labels.map((label, index) => `${label}: ${getExpensesData().amountList[index]}`)


        return {customLabels}
    }


    
    const showLoading = () =>
        loading && (
            <div className="d-flex justify-content-center">
                <div className="spinner-border" role="status">
                    <span className="sr-only">Loading...</span>
                </div>
            </div>
        )

    const showError = () => (
        <div className="alert alert-danger" style={{ display: error ? '' : 'none' }}>
            {error}
        </div>
    );


    
    
    return (
        <Layout title="Dashboard">

            <>
                { loading ? (
                    showLoading()
                ) : error ? (
                    showError()
                ) : (
                    
                    <div className="row">
            <div className="col-xl-3 col-md-6">
                            <div className="card bg-primary text-white mb-4">
                                <div className="card-body">Admin Users</div>
                                <div className="card-footer d-flex align-items-center justify-content-between">
                                    <Link className="small text-white stretched-link" to={`/list/users`}>{countAdmins()}</Link>
                                    <div className="small text-white"><i className="fas fa-angle-right"/>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-xl-3 col-md-6">
                            <div className="card bg-warning text-white mb-4">
                                <div className="card-body">Doctors</div>
                                <div className="card-footer d-flex align-items-center justify-content-between">
                                    <Link className="small text-white stretched-link" to={`/list/users`}>{countDoctors()}</Link>
                                    <div className="small text-white"><i className="fas fa-angle-right"/>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-xl-3 col-md-6">
                            <div className="card bg-success text-white mb-4">
                                <div className="card-body">Payments</div>
                                <div className="card-footer d-flex align-items-center justify-content-between">
                                    <a className="small text-white stretched-link" href="#">Ksh {totalCollected() + totalCollected1()}</a>
                                    <div className="small text-white"><i className="fas fa-angle-right"/>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-xl-3 col-md-6">
                            <div className="card bg-danger text-white mb-4">
                                <div className="card-body">Expenses {getAppointmentData().vaccinated}</div>
                                <div className="card-footer d-flex align-items-center justify-content-between">
                                    <a className="small text-white stretched-link" href="#">Ksh {totalExpenses()}</a>
                                    <div className="small text-white"><i className="fas fa-angle-right"/>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="col-lg-6">
                            <div className="card mb-4">
                                <div className="card-header">
                                    <i className="fas fa-chart-pie mr-1"/>
                                    User Types
                                </div>
                                <div className="card-body">
                                    <Pie data={{
                                        labels: chart().customLabels,
                                        datasets: [{
                                        backgroundColor: ['#007bff', '#dc3545', '#ffc107', '#28a745', '#11ede9'],
                                        data: chart().usersList
                                    }]
                                    }}/>
                                    
                                </div>
                                <div className="card-footer small text-muted">Updated yesterday at 11:59 PM</div>
                            </div>
                        </div>

                        <div className="col-lg-6">
                            <div className="card mb-4">
                                <div className="card-header">
                                    <i className="fas fa-chart-pie mr-1"/>
                                    Expenses Types
                                </div>
                                <div className="card-body">
                                    <Doughnut data={{
                                        labels: expenseChart().customLabels,
                                        datasets: [{
                                            backgroundColor: ['#007bff', '#dc3545', '#ffc107', '#28a745'],
                                            data: getExpensesData().amountList
                                        }]
                                    }}/>

                                </div>
                                <div className="card-footer small text-muted">Updated yesterday at 11:59 PM</div>
                            </div>
                        </div>


                        <div className="col-lg-6">
                            <div className="card mb-4">
                                <div className="card-header">
                                    <i className="fas fa-chart-pie mr-1"/>
                                    CoronaVirus
                                </div>
                                <div className="card-body">
                                    <Doughnut data={{
                                        labels: chartAppointment().customLabels,
                                        datasets: [{
                                            backgroundColor: ['#28a745', '#dc3545', '#ffc107', '#28a745'],
                                            data: chartAppointment().appointmentList
                                        }]
                                    }}/>

                                </div>
                                <div className="card-footer small text-muted">Updated yesterday at 11:59 PM</div>
                            </div>
                        </div>

                        <div className="col-lg-6">
                            <div className="card mb-4">
                                <div className="card-header">
                                    <i className="fas fa-chart-pie mr-1"/>
                                    Types of Vaccines Taken
                                </div>
                                <div className="card-body">
                                    <Pie data={{
                                        labels: getVaccineData().customLabels,
                                        datasets: [{
                                            backgroundColor: ['#007bff', '#dc3545', '#ffc107', '#28a745', '#11ede9'],
                                            data: getVaccineData().vaccineCount
                                            }],
                                    }}/>

                                </div>
                                <div className="card-footer small text-muted">Updated yesterday at 11:59 PM</div>
                            </div>
                        </div>



                        <div className="col-sm-12">
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
                                            ) : user.role === 4  ? (
                                                <button type="button" className="btn btn-dark btn-sm">Nurse</button>
                                            ): (
                                                <button type="button" className="btn btn-warning btn-sm">Staff</button>
                                            )}
                                        </td>
                                        <td><Link to={`/update/users/${user._id}`}><i className="bi bi-pencil-square"></i></Link></td>
                                        <td><i className="bi bi-trash"/></td>
                                    </tr>

                                ))}
                                </tbody>
                            </table>
                        </div>



                    </div>

                ) }
</>
        </Layout>
    )

}




export default AdminDashboard