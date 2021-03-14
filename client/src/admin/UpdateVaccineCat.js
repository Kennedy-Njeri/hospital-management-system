import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import Layout from "../core/Layout";
import { listMedicines } from '../actions/medicineActions'
import { listVacTypesEnums, updateVacCat, detailsVacCat } from '../actions/vaccineCatActions'
import {UPDATE_VACCINE_RESET} from "../constants/vaccineCat";







const  UpdateVaccineCat = ({ history: history1, match}) => {

    const id = match.params.id

    const [name, setName] = useState('')
    const [type, setType] = useState('')
    const [description, setDescription] = useState("");
    const [medicine, setMedicine] = useState("");
    const [effects, setEffects] = useState('')


    const dispatch = useDispatch()

    const vaccineCatDetail = useSelector((state) => state.vaccineCatDetail)
    const { loading, error, vaccine } = vaccineCatDetail

    console.log(vaccine)

    const vaccineCatUpdate = useSelector((state) => state.vaccineCatUpdate)
    const {
        loading: loadingUpdate,
        error: errorUpdate,
        success: successUpdate,
    } = vaccineCatUpdate


    const vaccineCatType = useSelector((state) => state.vaccineCatType)
    const { types } = vaccineCatType
    console.log(types)

    const medicineList = useSelector((state) => state.medicineList)
    const { medicines } = medicineList

    console.log(medicines)




    useEffect(() => {

        if (successUpdate) {
            dispatch({ type: UPDATE_VACCINE_RESET })
            history1.push('/list-vaccine-cat')

        } else {

            if (vaccine._id !== id) {
                dispatch(listMedicines())
                dispatch(detailsVacCat(id))
                dispatch(listVacTypesEnums())


            } else {
                setName(vaccine.name)
                setType(vaccine.type)
                setDescription(vaccine.description)
                setMedicine(vaccine.medicine)
                setEffects(vaccine.effects)
            }

        }
    }, [ dispatch, history1, id, vaccine, successUpdate])




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
        dispatch(updateVacCat({ _id: id, name, type, description, medicine, effects }))
    }


    const UpdateVaccineCatForm = () => (
        <form onSubmit={submitHandler}>
            <div className="form-row">
                <div className="col-md-8">
                    <div className="form-group">
                        <label htmlFor="inputAddress">Name</label>
                        <input type="text" className="form-control"  placeholder="e.g Malaria" value={name}
                               onChange={(e) => setName(e.target.value)}/>
                    </div>
                </div>
            </div>

            <div className="form-row">
                <div className="col-md-8">
                    <div className="form-group">
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
            </div>

            <div className="form-row">
                <div className="col-md-8">
                    <div className="form-group">
                        <label htmlFor="exampleFormControlTextarea1">Description</label>
                        <textarea className="form-control" id="exampleFormControlTextarea1" value={description}
                                  onChange={(e) => setDescription(e.target.value)} placeholder="write description" rows="3"/>
                    </div>
                </div>
            </div>


            <div className="form-row">
                <div className="col-md-8">
                    <div className="form-group">
                        <label className="text-muted">Medicine</label>
                        <select onChange={(e) => setMedicine(e.target.value)} className="form-control">
                            <option>Select Medicine</option>
                            {medicines &&
                            medicines.map((c, i) => (
                                <option key={i} value={c._id}>
                                    {c.name}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>
            </div>

            <div className="form-row">
                <div className="col-md-8">
                    <div className="form-group">
                        <label htmlFor="exampleFormControlTextarea1">Effects</label>
                        <textarea className="form-control" id="exampleFormControlTextarea1" value={effects}
                                  onChange={(e) => setEffects(e.target.value)} placeholder="write effects" rows="3"/>
                    </div>
                </div>
            </div>




            <div className="col-md-8">
                <div className="form-group mt-4 mb-0">
                    <button className="btn btn-primary btn-block">Update Vaccine Category </button></div>
            </div>
        </form>

    )

    return  (

        <Layout title="Category treatment Form">
            <>
                <h2 className="mb-4">Update Vaccine Category</h2>
                {errorUpdate && <div className="alert alert-danger" role="alert">
                    {errorUpdate}
                </div>}
                {showError()}
                {showLoadingData()}
                {showLoading()}
                {UpdateVaccineCatForm()}
            </>

        </Layout>
    )
}







export default UpdateVaccineCat