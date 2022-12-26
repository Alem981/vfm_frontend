import axios from 'axios';

import React, { useState } from 'react'
import { Modal, Button } from 'react-bootstrap';

const AddDriverForm = ({ show, handleClose }) => {
  //Add Driver 

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [age, setAge] = useState('');
  const [salary, setSalary] = useState('');
  const [mobile, setMobile] = useState('');
  const [bankAccount, setBankAccount] = useState('');
  const [drivingCategories, setDrivingCategories] = useState('');
  const [licenceNumber, setLicenceNumber] = useState('');


  const handleFirstName = (value) => {
    setFirstName(value);

  }


  const handleLastName = (value) => {
    setLastName(value);

  }

  const handleAge = (value) => {
    setAge(value);

  }
  const handleSalary = (value) => {
    setSalary(value);

  }
  const handleMobilePhone = (value) => {
    setMobile(value);

  }


  const handleBankAccount = (value) => {
    setBankAccount(value);

  }

  const handleDrivingCategories = (value) => {
    setDrivingCategories(value);

  }

  const handleLicenseNumber = (value) => {
    setLicenceNumber(value);

  }


  const handleSave = () => {
    const data = {
      FirstName: firstName,
      LastName: lastName,
      Age: age,
      MobilePhone: mobile,
      Salary: salary,
      BankAccount: bankAccount,
      DrivingCategories: drivingCategories,
      LicenceNumber: licenceNumber


    };

    axios.post('https://localhost:7263/api/Drivers', data).then((result) => {

    }).catch((error) => {

    })
  }

  return (
    <div>
      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
        style={{ color: "black" }}
      >
        <Modal.Header closeButton>
          <Modal.Title>Add Record</Modal.Title>
        </Modal.Header>
        <Modal.Body>


          <form>

            <div className="form-group">Registration</div>
            <label>First Name</label>
            <input required className="form-control" type="text" name="firstName" placeholder='Enter Your First Name' onChange={(e) => handleFirstName(e.target.value)} /><br></br>
            <label>Last Name</label>
            <input required className="form-control" type="text" name="lastName" placeholder='Enter Your Last Name' onChange={(e) => handleLastName(e.target.value)} /><br></br>
            <label >Age</label>

            <input required className="form-control" type="number" name="age" placeholder='Enter Your Age' onChange={(e) => handleAge(e.target.value)} /><br></br>
            <label>Salary</label>
            <input required className="form-control" type="number" name="salary" placeholder='Enter Your Salary' onChange={(e) => handleSalary(e.target.value)} /><br></br>
            <label>Mobile Phone</label>
            <input required className="form-control" type="text" name="mobile" placeholder='Enter Your Contact Phone' onChange={(e) => handleMobilePhone(e.target.value)} /><br></br>


            <label>Bank Account</label>
            <input className="form-control" type="text" name="bankAccount" placeholder='Enter Your Bank Acc' onChange={(e) => handleBankAccount(e.target.value)} /><br></br>

            <label>Drivign Categories</label>
            <input className="form-control" type="text" name="drivingCategories" placeholder='Enter Your Driving Categories' onChange={(e) => handleDrivingCategories(e.target.value)} /><br></br>

            <label>Licence Number</label>
            <input className="form-control" type="text" name="licenceNumber" placeholder='Enter Your Licence Number' onChange={(e) => handleLicenseNumber(e.target.value)} /><br></br>



            <button className='btn btn-primary' onClick={() => handleSave()} >Save</button>


          </form>

        </ Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>

  )
}

export default AddDriverForm;
