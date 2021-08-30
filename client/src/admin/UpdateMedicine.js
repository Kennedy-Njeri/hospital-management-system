import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import Layout from "../core/Layout";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { listVendors } from '../actions/vendorsActions'
import { listTypesEnums, detailsMedicine, updateMedicine } from '../actions/medicineActions'
import {UPDATE_MEDICINE_RESET} from "../constants/medicineConstants";
import moment from "moment";











const  UpdateMedicine = ({ history: history1, match}) => {

    const id = match.params.id

    const [name, setName] = useState('')
    const [genericName, setGenericName] = useState('')
    const [batchNo, setBatchNo] = useState(0)
    const [barCode, setBarCode] = useState(0)
    const [description, setDescription] = useState('')
    const [quantity, setQuantity] = useState(0)
    const [unitWeight, setUnitWeight] = useState(0)
    const [type, setType] = useState('')
    const [manDate, setManDate] = useState(new Date());
    const [expDate, setExpDate] = useState(new Date());
    const [cost, setCost] = useState(2200);
    const [retailCost, setRetailCost] = useState(0);
    const [effects, setEffects] = useState('')
    const [vendor, setVendor] = useState('')


    const dispatch = useDispatch()

    const medicineDetail = useSelector((state) => state.medicineDetail)
    const { loading, error, medicine } = medicineDetail

    console.log(medicine)

    const medicineUpdate = useSelector((state) => state.medicineUpdate)
    const {
        loading: loadingUpdate,
        error: errorUpdate,
        success: successUpdate,
    } = medicineUpdate



    const medicineType = useSelector((state) => state.medicineType)
    const { types } = medicineType
    console.log(types)


    const vendorsList = useSelector((state) => state.vendorsList)
    const { vendors } = vendorsList




    useEffect(() => {

        if (successUpdate) {
            dispatch({ type: UPDATE_MEDICINE_RESET })
            history1.push('/list/medicine')

        } else {

            if (medicine._id !== id) {
                dispatch(listVendors())
                dispatch(listTypesEnums())
                dispatch(detailsMedicine(id))


            } else {
                setName(medicine.name)
                setGenericName(medicine.genericName)
                setBatchNo(medicine.batchNo)
                setBarCode(medicine.barCode)
                setDescription(medicine.description)
                setQuantity(medicine.quantity)
                setUnitWeight(medicine.unitWeight)
                setType(medicine.type)
                setManDate(moment(medicine.manDate).format("YYYY-MM-DD"))
                setExpDate(moment(medicine.expDate).format("YYYY-MM-DD"))
                setCost(medicine.cost)
                setRetailCost(medicine.retailCost)
                setEffects(medicine.effects)
                setVendor(medicine.vendor)
            }

        }
    }, [ dispatch, history1, id, medicine, successUpdate])




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

        dispatch(updateMedicine({ _id: id, name, genericName, batchNo, barCode, description, quantity, unitWeight,
            type, manDate, expDate, cost, retailCost, vendor, effects }))
    }


    const UpdateMedicineForm = () => (

        <div className="form-group col-md-12">
            <form onSubmit={submitHandler}>
                <div className="form-row">
                    <div className="form-group col-md-3">
                        <label htmlFor="inputAddress">Name</label>
                        <input type="text" className="form-control"  placeholder="e.g Panadol" value={name}
                               onChange={(e) => setName(e.target.value)}/>
                    </div>
                    <div className="form-group col-md-3">
                        <label htmlFor="inputAddress">Generic Name</label>
                        <input type="text" className="form-control"  placeholder="e.g Paracetamol" value={genericName}
                               onChange={(e) => setGenericName(e.target.value)}/>
                    </div>
                    <div className="form-group col-md-3">
                        <label htmlFor="inputAddress">Batch No</label>
                        <input type="text" className="form-control"  placeholder="batch no" value={batchNo}
                               onChange={(e) => setBatchNo(e.target.value)}/>
                    </div>
                    <div className="form-group col-md-3">
                        <label htmlFor="inputAddress">Bar Code</label>
                        <input type="text" className="form-control"  placeholder="barcode no" value={barCode}
                               onChange={(e) => setBarCode(e.target.value)}/>
                    </div>
                </div>

                <div className="form-row">
                    <div className="form-group col-md-4">
                        <label htmlFor="inputAddress">Quantity</label>
                        <input type="text" className="form-control"  placeholder="quantity" value={quantity}
                               onChange={(e) => setQuantity(e.target.value)}/>
                    </div>

                    <div className="form-group col-md-4">
                        <label htmlFor="inputAddress">Unit Weight</label>
                        <input type="text" className="form-control"  placeholder="weight" value={unitWeight}
                               onChange={(e) => setUnitWeight(e.target.value)}/>
                    </div>

                    <div className="form-group col-md-4">
                        <label htmlFor="exampleFormControlSelect1">Type</label>
                        <select onChange={(e) => setType(e.target.value)} className="form-control" id="exampleFormControlSelect1">
                            <option>Select Type</option>
                            {types && types.map((c, i) => (
                                <option key={i} value={c}>
                                    {c}
                                </option>
                            ))}
                        </select>
                    </div>

                </div>



                <div className="form-row">

                    <div className="form-group col-md-6">
                        <label htmlFor="inputAddress">Manufacture </label>
                        
                        <DatePicker  value={manDate} onChange={date => setManDate(moment(date).format("YYYY-MM-DD"))} className="form-control" />
                    </div>

                    <div className="form-group col-md-6">
                        <label htmlFor="inputAddress">Expiry</label>
                        <DatePicker  value={expDate} onChange={date => setExpDate(moment(date).format("YYYY-MM-DD"))} className="form-control" />
                    </div>



                </div>


                <div className="form-row">

                    <div className="form-group col-md-6">
                        <label htmlFor="inputAddress">Cost</label>
                        <input type="text" className="form-control"  placeholder="e.g ksh 2500" value={cost}
                               onChange={(e) => setCost(e.target.value)}/>
                    </div>

                    <div className="form-group col-md-6">
                        <label htmlFor="inputAddress">Retail Cost</label>
                        <input type="text" className="form-control"  placeholder="e.g ksh 1700" value={retailCost}
                               onChange={(e) => setRetailCost(e.target.value)}/>
                    </div>
                </div>


                <div className="form-row">
                    <div className="form-group col-md-4">
                        <label className="text-muted">Vendor</label>
                        <select onChange={(e) => setVendor(e.target.value)} className="form-control">
                            <option>Select Vendor</option>
                            {vendors &&
                            vendors.map((c, i) => (
                                <option key={i} value={c._id}>
                                    {c.name}
                                </option>
                            ))}
                        </select>
                    </div>


                    <div className="form-group col-md-4">
                        <label htmlFor="exampleFormControlTextarea1">Description</label>
                        <textarea className="form-control" id="exampleFormControlTextarea1" value={description}
                                  onChange={(e) => setDescription(e.target.value)} placeholder="write description" rows="3"/>
                    </div>


                    <div className="form-group col-md-4">
                        <label htmlFor="exampleFormControlTextarea1">Effects</label>
                        <textarea className="form-control" id="exampleFormControlTextarea1" value={effects}
                                  onChange={(e) => setEffects(e.target.value)} placeholder="write effects" rows="3"/>
                    </div>


                </div>


                <button type="submit" className="btn btn-primary">Save</button>
            </form>
        </div>
    )

    return  (

        <Layout title="Category treatment Form">
            <>
                <h2 className="mb-4">Update Medicine</h2>
                {errorUpdate && <div className="alert alert-danger" role="alert">
                    {errorUpdate}
                </div>}
                {showError()}
                {showLoadingData()}
                {showLoading()}
                {UpdateMedicineForm()}
            </>

        </Layout>
    )
}







export default UpdateMedicine