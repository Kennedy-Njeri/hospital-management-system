import React from "react"
import { BrowserRouter , Switch, Route } from 'react-router-dom';
import AdminDashboard from './user/AdminDashboard';
import Signup from './user/Signup';
import Signin from './user/Signin';
import PrivateRoute from './auth/PrivateRoute';
import AdminRoute from './auth/AdminRoute';
import PatientRoute from './auth/PatientRoute';
import DoctorRoute from './auth/DoctorRoute';
import Profile from './user/Profile';
import ListUsers from './admin/ListUsers'
import ListCatTest from './admin/ListCatTest'
import CreateTestCat from './admin/CreateTestCat'
import CatTestUpdate from './admin/CatTestUpdate'
import ListTestResult from './admin/ListTestResult'
import CreateTest from './admin/CreateTest'
import TestUpdate from './admin/TestUpdate'
import ListTreatment from './admin/ListTreatment'
import CreateTreatment from './admin/CreateTreatment'
import TreatmentUpdate from './admin/TreatmentUpdate'
import AddPrescription from './admin/AddPrescription'
import ListPrescriptions from './admin/ListPrescriptions'
import UpdatePrescriptions from './admin/UpdatePrescriptions'
import AddPatientDetails from './admin/AddPatientDetails'
import ListPatients from './admin/ListPatients'
import UpdatePatientProfile from './admin/UpdatePatientProfile'
import ListBuildings from './admin/ListBuildings'
import AddBuilding from './admin/AddBuilding'
import UpdateBuilding from './admin/UpdateBuilding'
import ListFloors from './admin/ListFloors'
import AddFloor from './admin/AddFloor'
import UpdateFloor from './admin/UpdateFloor'
import UpdateUsers from './admin/UpdateUsers'
import AddUsers from './admin/AddUsers'
import ListDeparts from './admin/ListDeparts'
import AddDepartment from './admin/AddDepartment'
import UpdateDepartment from './admin/UpdateDepartment'
import ListDesignate from './admin/ListDesignate'
import AddDesignation from './admin/AddDesignation'
import UpdateDesignation from './admin/UpdateDesignation'
import ListSpecialize from './admin/ListSpecialize'
import AddSpecialization from './admin/AddSpecialization'
import UpdateSpecialize from './admin/UpdateSpecialize'
import FileUpload from './admin/FileUpload'
import ListVendors from './admin/ListVendors'
import ListDoctors from './admin/ListDoctors'
import AddDoctorDetails from './admin/AddDoctorDetails'
import UpdateDoctorProfile from './admin/UpdateDoctorProfile'
import ListExpenses from "./admin/ListExpenses"  
import AddExpense from './admin/AddExpense'
import UpdateExpenses from './admin/UpdateExpenses'
import PatDetails from './admin/PatDetails'
import ListMedicine from "./admin/ListMedicine"
import AddMedicine from './admin/AddMedicine'
import UpdateMedicine from './admin/UpdateMedicine'
import ListVaccineCat from "./admin/ListVaccineCat"
import AddVaccineCat from './admin/AddVaccineCat'
import UpdateVaccineCat from './admin/UpdateVaccineCat'
import ListAppVaccine from "./admin/ListAppVaccine"
import AddAppVaccine from './admin/AddAppVaccine'
import UpdateVaccApp from './admin/UpdateVaccApp'



const Routes = () => {
    return (
        <BrowserRouter>
            <Switch>
                <Route path="/signup" exact component={Signup} />
                <Route path="/signin" exact component={Signin} />
                <AdminRoute path="/" exact component={AdminDashboard} />
                <AdminRoute path="/profile/:userId" exact component={Profile} />
                <AdminRoute path="/update/users/:id" exact component={UpdateUsers} />
                <AdminRoute path="/test-result" exact component={ListTestResult} />
                <AdminRoute path="/list-prescriptions" exact component={ListPrescriptions} />
                <AdminRoute path="/update-cat-test/:catTestId" exact component={CatTestUpdate} />
                <AdminRoute path="/update-test/:testId" exact component={TestUpdate} />
                <AdminRoute path="/update-prescription/:id" exact component={UpdatePrescriptions} />
                <AdminRoute path="/update-building/:id" exact component={UpdateBuilding} />
                <AdminRoute path="/update-designation/:id" exact component={UpdateDesignation} />
                <AdminRoute path="/update-floor/:id" exact component={UpdateFloor} />
                <AdminRoute path="/update-expenses/:id" exact component={UpdateExpenses} />
                <AdminRoute path="/update-doctor/:id" exact component={UpdateDoctorProfile} />
                <AdminRoute path="/update-depart/:id" exact component={UpdateDepartment} />
                <AdminRoute path="/update-patient/:id" exact component={UpdatePatientProfile} />
                <AdminRoute path="/update-specialize/:id" exact component={UpdateSpecialize} />
                <AdminRoute path="/update-medicine/:id" exact component={UpdateMedicine} />
                <AdminRoute path="/update-vaccine-cat/:id" exact component={UpdateVaccineCat} />
                <AdminRoute path="/update-vacc-app/:id" exact component={UpdateVaccApp} />
                <AdminRoute path="/update-treatment/:treatmentId" exact component={TreatmentUpdate} />
                <AdminRoute path="/list/users" exact component={ListUsers} />
                <AdminRoute path="/list/medicine" exact component={ListMedicine} />
                <AdminRoute path="/list-cat-test" exact component={ListCatTest} />
                <AdminRoute path="/list-patients" exact component={ListPatients} />
                <AdminRoute path="/list-treat-cat" exact component={ListTreatment} />
                <AdminRoute path="/list-buildings" exact component={ListBuildings} />
                <AdminRoute path="/list-floors" exact component={ListFloors} />
                <AdminRoute path="/list-departs" exact component={ListDeparts} />
                <AdminRoute path="/list-vendors" exact component={ListVendors} />
                <AdminRoute path="/list-doctors" exact component={ListDoctors} />
                <AdminRoute path="/list-app-vaccine" exact component={ListAppVaccine} />
                <AdminRoute path="/list-designate" exact component={ListDesignate} />
                <AdminRoute path="/list-expenses" exact component={ListExpenses} />
                <AdminRoute path="/list-specialize" exact component={ListSpecialize} />
                <AdminRoute path="/list-vaccine-cat" exact component={ListVaccineCat} />
                <AdminRoute path="/create/cat-test" exact component={CreateTestCat} />
                <AdminRoute path="/add-prescription" exact component={AddPrescription} />
                <AdminRoute path="/create/cat-treatment" exact component={CreateTreatment} />
                <AdminRoute path="/create-test" exact component={CreateTest} />
                <AdminRoute path="/add-patient-details" exact component={AddPatientDetails} />
                <AdminRoute path="/pat-details/:id" exact component={PatDetails} />
                <AdminRoute path="/add-building" exact component={AddBuilding} />
                <AdminRoute path="/add-floor" exact component={AddFloor} />
                <AdminRoute path="/add-users" exact component={AddUsers} />
                <AdminRoute path="/add-vacc-app" exact component={AddAppVaccine} />
                <AdminRoute path="/add-medicine" exact component={AddMedicine} />
                <AdminRoute path="/add-expenses" exact component={AddExpense} />
                <AdminRoute path="/add-vac-cat" exact component={AddVaccineCat} />
                <AdminRoute path="/add-depart" exact component={AddDepartment} />
                <AdminRoute path="/add-designate" exact component={AddDesignation} />
                <AdminRoute path="/add-doctor" exact component={AddDoctorDetails} />
                <AdminRoute path="/add-specialize" exact component={AddSpecialization} />
                <AdminRoute path="/file-upload" exact component={FileUpload} />
                <PrivateRoute path="/profile/:userId" exact component={Profile} />
            </Switch>
        </BrowserRouter>
    )
}


export default Routes;