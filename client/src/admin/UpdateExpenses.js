import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import Layout from "../core/Layout";
import { listPaidEnums, updateExpense, expensesDetails} from '../actions/expensesActions'
import { listDeparts } from '../actions/departmentActions'
import DatePicker from "react-datepicker";
import {EXPENSES_UPDATE_RESET} from "../constants/expensesConstants";
import moment from "moment";






const UpdateExpenses = ({ history: history1, match }) => {

    const id = match.params.id

    const [name, setName] = useState('')
    const [department, setDepartment] = useState('')
    const [amount, setAmount] = useState(0)
    const [description, setDescription] = useState('')
    const [fromDate, setFromDate] = useState(new Date())
    const [to, setTo] = useState(new Date())
    const [paid, setPaid] = useState("")

    const dispatch = useDispatch()


    const departsList = useSelector((state) => state.departsList)
    const { departments } = departsList


    const expensesPaid = useSelector((state) => state.expensesPaid)
    const { pays } = expensesPaid

    const expensesUpdate = useSelector((state) => state.expensesUpdate)
    const {
        loading: loadingUpdate,
        error: errorUpdate,
        success: successUpdate,
    } = expensesUpdate

    const expenseDetail = useSelector((state) => state.expenseDetail)
    const { loading, error, expense } = expenseDetail

    console.log(expense)

    useEffect(() => {
        if (successUpdate) {
            dispatch({ type: EXPENSES_UPDATE_RESET })
            history1.push('/list-expenses')
        } else {
            if (expense._id !== id) {
                dispatch(listPaidEnums())
                dispatch(listDeparts())
                dispatch(expensesDetails(id))

            } else {
               setName(expense.name)
                setDepartment(expense.department)
                setAmount(expense.amount)
                setDescription(expense.description)
                setFromDate(moment(expense.fromDate).format("YYYY-MM-DD"))
                setTo(moment(expense.to).format("YYYY-MM-DD"))
                setPaid(expense.paid)
            }
        }
    }, [dispatch, history1, id, expense, successUpdate])


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
        dispatch(updateExpense({ _id: id, name, department, amount, description, fromDate, to,  paid }))
    }

    const UpdateExpenseForm = () => (

        <div className="form-group col-md-12">
            <form onSubmit={submitHandler}>
                <div className="form-row">
                    <div className="form-group col-md-6">
                        <label className="font-weight-bold" htmlFor="inputAddress2">Name</label>
                        <input type="text" className="form-control" id="inputAddress2"
                               placeholder="name" value={name}
                               onChange={(e) => setName(e.target.value)}/>
                    </div>
                    <div className="form-group col-md-6">
                        <label className="font-weight-bold" htmlFor="inputAddress">Amount</label>
                        <input type="text" className="form-control"  placeholder="Amount" value={amount}
                               onChange={(e) => setAmount(e.target.value)}/>
                    </div>

                </div>

                <div className="form-row">

                    <div className="form-group col-md-6">
                        <label className="font-weight-bold" htmlFor="inputAddress">From date</label>
                        <DatePicker   value={fromDate}   onChange={date => setFromDate(moment(date).format("YYYY-MM-DD"))} className="form-control" />
                    </div>

                    <div className="form-group col-md-6">
                        <label className="font-weight-bold" htmlFor="inputAddress">To date</label>

                        <DatePicker  value={to}   onChange={date => setTo(moment(date).format("YYYY-MM-DD"))} className="form-control" />
                    </div>


                </div>


                <div className="form-row">

                    <div className="form-group col-md-6">
                        <label className="font-weight-bold" htmlFor="exampleFormControlSelect2">Department</label>
                        <select multiple className="form-control" id="exampleFormControlSelect2" onChange={(e) => setDepartment(e.target.value)}>
                            <option>Select Department</option>
                            {departments &&
                            departments.map((c, i) => (
                                <option key={i} value={c._id}>
                                    {c.name}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="form-group col-md-6">
                        <label className="font-weight-bold" htmlFor="exampleFormControlTextarea1">Description</label>
                        <textarea className="form-control" id="exampleFormControlTextarea1" value={description}
                                  onChange={(e) => setDescription(e.target.value)} placeholder="write a description" rows="3"/>
                    </div>


                </div>

                <div className="form-row">
                    <div className="form-group col-md-3">
                        <div className="form-group">
                            <label className="font-weight-bold" htmlFor="exampleFormControlSelect1">Paid</label>
                            <select onChange={(e) => setPaid(e.target.value)} className="form-control" id="exampleFormControlSelect1">
                                <option>Select Pays</option>
                                {pays &&
                                pays.map((p, i) => (
                                    <option key={i} value={p}>
                                        {p}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>
                </div>

                <button type="submit" className="btn btn-primary">Save</button>
            </form>
        </div>
    )


    return  (
        <Layout title="Category treatment Form">

            <>
                <h2 className="mb-4">Update Expense</h2>
                {errorUpdate && <div className="alert alert-danger" role="alert">
                    {errorUpdate}
                </div>}
                {showLoading()}
                {showError()}
                {showLoadingData()}
                {UpdateExpenseForm()}
            </>

        </Layout>
    )

}




export default UpdateExpenses