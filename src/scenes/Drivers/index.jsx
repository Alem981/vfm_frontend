import { useState, useEffect } from "react";
import Axios from "axios";
import axios from "axios";
import { Button } from "react-bootstrap";
import AddDriverForm from "../forms/addDriver";

const Drivers = () => {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [drivers, setDrivers] = useState([]);

  //get Drivers from db
  //Koristiti drugi paket za refatch - swr
  useEffect(() => {
    const getDrivers = async () => {
      const { data: res } = await Axios.get(
        "https://localhost:7263/api/Drivers"
      );
      setDrivers(res);
    };
    getDrivers();
  }, []);

  //Delete driver from db(by id)
  const handleDelete = async (driver) => {
    await axios.delete(`https://localhost:7263/api/Drivers/${driver.id}`);
    setDrivers(drivers.filter((d) => d.id !== driver.id));
  };

  return (
    <div className="container ">
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
            <Button variant="primary" onClick={handleShow}>
              Add New Driver
            </Button>
          </div>
        </div>
        <div className="row">
          <div className="table-responsive ">
            <table className="table table-striped table-hover table-bordered">
              <thead>
                <tr>
                  <th>Id</th>
                  <th>First Name</th>
                  <th>Last Name</th>
                  <th>Mobile Phone</th>
                  <th>Salary $</th>
                  <th>Age</th>
                  <th>Bank Account</th>
                  <th>Licence Number</th>
                  <th>Driving Category</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {drivers.map((driver) => (
                  <tr key={driver.id}>
                    <td>{driver.id}</td>
                    <td>{driver.firstName}</td>
                    <td>{driver.lastName}</td>
                    <td>{driver.mobilePhone}</td>
                    <td>{driver.salary}</td>
                    <td>{driver.age}</td>
                    <td>{driver.bankAccount}</td>
                    <td>{driver.licenceNumber}</td>
                    <td>{driver.drivingCategories}</td>
                    <td>
                      <button
                        className="me-md-3  btn btn-info btn-sm"
                        onClick={() => handleDelete(driver)}
                      >
                        {" "}
                        Update
                      </button>
                      <button
                        className="btn btn-danger btn-sm"
                        onClick={() => handleDelete(driver)}
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

        {/* <!--- Model Box ---> */}

        <div className="model_box">

          <AddDriverForm show={show} handleClose={handleClose}/>

          {/* Model Box Finsihs */}
        </div>
      </div>
    </div>
  );
};
export default Drivers;
