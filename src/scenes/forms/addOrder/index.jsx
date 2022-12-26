import axios from 'axios';
import Axios from 'axios'
import React, { useEffect } from "react";
import { useState } from "react";


export default function AddOrderForm() {
  const [driver, setDriver] = useState('');
  const [transportOrderer, setTransportOrderer] = useState('');
  const [transportPrice, setTransportPrice] = useState('');
  const [destination, setDestination] = useState('');
  const [chooseDriver, setChooseDriver] = useState('');


  const handleTransportOrderer = (value) => {
    setTransportOrderer(value);

  }


  const handleTransportPrice = (value) => {
    setTransportPrice(value);

  }

  const handleDestination = (value) => {
    setDestination(value);

  }
  const handleChooseDriver = (value) => {
    setChooseDriver(value);

  }


  const handleSave = () => {
    const data = {
      TransportOrderer: transportOrderer,
      TransportPrice: transportPrice,
      Destination: destination,
      ChooseDriver: chooseDriver,



    };

    axios.post('https://localhost:7263/api/Orders', data).then((result) => {
      console.log("inserted");
    }).catch((error) => {
      console.log(error);
    })
  }

  const [drivers, setDrivers] = useState([]);
  //get drivers
  useEffect(() => {
    const getDrivers = async () => {
      const { data: res } = await Axios.get(
        "https://localhost:7263/api/Drivers"
      );
      /*  console.log(res.length) */
      setDrivers(res);
    };
    getDrivers();
  }, []);


  return (
    <div className="container">
      <form>
        <div className="form-group">Orders</div>
        <label>Transport Orderer</label>
        <input
          required
          className="form-control"
          type="text"
          name="transportOrderer"
          placeholder="Transport Orderer"
          onChange={(e) => handleTransportOrderer(e.target.value)}

        />
        <br></br>

        <label>Transportation price</label>
        <input
          required
          className="form-control"
          type="number"
          name="transportPrice"
          placeholder="Enter transportation price"
          onChange={(e) => handleTransportPrice(e.target.value)}
        />
        <br></br>

        <label>Destination</label>
        <input
          required
          className="form-control"
          type="text"
          name="destination"
          placeholder="Enter Destination"
          onChange={(e) => handleDestination(e.target.value)}
        />





        {/* <label>Driver</label>
         <select  name="chooseDriver"          
              onChange={(e) => handleChooseDriver(e.target.value)}  className="form-select" aria-label="Default select example"        
         >         
          {drivers.map((driver) => (       
              <option name="chooseDriver"          
              onChange={(e) => handleChooseDriver(e.target.value)}  key={driver.id} value = {driver.firstName}>
              {driver.firstName}  
              </option>         
            ))}
           
         
        </select>     */}
        <br />

        <label>Driver Name</label>
        <input
          className="form-control"
          type="text"
          name="chooseDriver"
          placeholder='Enter driver name'
          onChange={(e) => handleChooseDriver(e.target.value)}

        />
        <br></br>
        <button className='btn btn-primary' onClick={() => handleSave()} >Save</button>


      </form>
    </div>
  );
}
