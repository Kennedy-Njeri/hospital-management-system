import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import Layout from "../core/Layout";
import { listMedicines } from '../actions/medicineActions'
import { listVacTypesEnums, createVacCat } from '../actions/vaccineCatActions'
import { CREATE_VACCINE_RESET } from '../constants/vaccineCat'
import {TEST_CREATE_RESET} from "../constants/testConstants";










const  AddVaccineCat = ({ history: history1}) => {


    const [name, setName] = useState('CoronaVirus')
    const [type, setType] = useState('')
    const [description, setDescription] = useState("covid vaccine");
    const [medicine, setMedicine] = useState("");
    const [effects, setEffects] = useState('Dizzy')


    const dispatch = useDispatch()

    const medicineList = useSelector((state) => state.medicineList)
    const { medicines } = medicineList

    console.log(medicines)


    const userLogin = useSelector((state) => state.userLogin)
    const { userInfo } = userLogin


    const vaccineCatType = useSelector((state) => state.vaccineCatType)
    const { types } = vaccineCatType
    console.log(types)


    const vaccineCatCreate = useSelector((state) => state.vaccineCatCreate)

    const { error, loading, success } = vaccineCatCreate



    useEffect(() => {

        if (userInfo && userInfo.role === 0) {
            dispatch(listVacTypesEnums())
            dispatch(listMedicines())

            if(success) {
                dispatch({ type: CREATE_VACCINE_RESET })
                history1.push('/list-vaccine-cat')
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

        dispatch(createVacCat({ name, type, description, medicine, effects }))

    }



    const AddVaccineCatForm = () => (


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
                        <label className="text-muted">Vaccine</label>
                        <select onChange={(e) => setMedicine(e.target.value)} className="form-control">
                            <option>Select Vaccine</option>
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
                        <button className="btn btn-primary btn-block">Add Vaccine Category </button></div>
                </div>
            </form>

    )


    return  (

        <Layout title="Category treatment Form">
            <>
                <h2 className="mb-4">Add Vaccine Category</h2>
                {showError()}
                {showLoading()}
                {AddVaccineCatForm()}
            </>

        </Layout>
    )
}







export default AddVaccineCat