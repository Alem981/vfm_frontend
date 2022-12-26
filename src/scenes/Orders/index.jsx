 import React from 'react'
import { useEffect, useState } from 'react';
import AddOrderForm from '../forms/addOrder'
import Axios from 'axios'
import axios from 'axios'
 
 export default function Orders() {

  const [orders, setOrders] = useState([]);

    //get Orders from db
   
 //get Vehicles
 
 useEffect(() => {
   const getOrders = async () => {
     const { data: res } = await Axios.get(
       "https://localhost:7263/api/Orders"
     );
     /* console.log(res.length) */
     setOrders(res);
   };
   getOrders();
 }, []);
  //Delete orders from db(by id)
  const handleDelete = async (order) => {
    await axios.delete(`https://localhost:7263/api/Orders/${order.id}`);
    setOrders(orders.filter((o) => o.id !== orders.id));
  };


   return (
    <div className="container">
     
      
      <div className="crud shadow-lg p-3 mb-5 mt-5 bg-body rounded">
        <div className="row ">
          <div className="col-sm-3 mt-5 mb-4 text-gred">
            <div className="search">
              <form className="form-inline">
                <input
                  className="form-control mr-sm-2"
                  type="search"
                  placeholder="Search"
                  aria-label="Search"
                />
              </form>
            </div>
          </div>
          <div
            className="col-sm-3 offset-sm-2 mt-5 mb-4 text-gred"
            style={{ color: "green" }}
          >
            <h2>
              <b>Drivers Details</b>
            </h2>
          </div>
          <div className="col-sm-3 offset-sm-1  mt-5 mb-4 text-gred">
            
          </div>
        </div>
        <div className="row">
          <div className="table-responsive ">
            <table className="table table-striped table-hover table-bordered">
              <thead>
                <tr>
                  <th>Id</th>
                  <th>Transport Orderer</th>
                  <th>Transport Price</th> 
                  <th>Detination</th>
                  <th>Driver</th>  
                  <th>Actions</th>

                </tr>
              </thead>
              <tbody>
                {orders.map((order) => (
                  <tr key={order.id}>
                       <td>{order.id}</td>
                    <td>{order.transportOrderer}</td>
                    <td>{order.transportPrice}</td>
                    <td>{order.destination}</td>
                    <td>{order.chooseDriver}</td>                  
                   
                    <td>
                      <button
                        className="me-md-3  btn btn-info btn-sm"
                        onClick={() => handleDelete(order)}
                      >
                        {" "}
                        Update
                      </button>
                      <button
                        className="btn btn-danger btn-sm"
                        onClick={() => handleDelete(order)}
                      >
                        {" "}
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

   <AddOrderForm />
        </div> 
        </div>
 
   )
 }
 