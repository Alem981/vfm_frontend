import { useState, useEffect } from "react";
import axios from "axios";
import { Button } from "react-bootstrap";
import Constants from "../../utilities/Constants";
import { useNavigate } from "react-router-dom";
import { useTheme } from "@material-ui/core";
import { tokens } from "../../theme";
export default function Vehicles() {
  let navigate = useNavigate();
  const routeChange = () => {
    let path = `/AddVehicleForm`;
    navigate(path);
  };
  const [vehicles, setVehicles] = useState([]);
  const apiGetEndPoint = Constants.API_URL_GET_ALL_VEHICLES;
  const apiDeleteEndPoint = Constants.API_URL_DELETE_VEHICLE;
  const apiGetBrandsEndPoint = Constants.API_URL_GET_ALL_BRANDS;
  const apiGetModelsEndPoint = Constants.API_URL_GET_ALL_MODELS;
  const [brand, setBrand] = useState([]);
  useEffect(() => {
    const getBrand = async () => {
      const { data: res } = await axios.get(apiGetBrandsEndPoint);
      console.log(res);
      setBrand(res);
    };
    getBrand();
  }, [apiGetBrandsEndPoint]);

  useEffect(() => {
    const getVehicles = async () => {
      const { data: res } = await axios.get(apiGetEndPoint);
      setVehicles(res);
    };
    getVehicles();
  }, [apiGetEndPoint]);
  //Delete driver from db(by id)
  const handleDelete = async (vehicle) => {
    await axios.delete(`${apiDeleteEndPoint}/${vehicle.vehicleId}`);
    setVehicles(vehicles.filter((v) => v.vehicleId !== vehicle.vehicleId));
  };
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  return (
    <div className="container ">
      <div className="crud shadow-lg p-3 mb-5 mt-5 bg-body rounded">
        <div className="row ">
          <div
            className="col-sm-3 offset-sm-2 mt-5 mb-4 text-gred"
            style={{ color: colors.primary[500] }}
          >
            <h2>
              <b>Vehicles Details</b>
            </h2>
          </div>
          <div className="col-sm-3 offset-sm-1  mt-5 mb-4 text-gred">
            <Button variant="primary" onClick={routeChange}>
              Add Vehicle
            </Button>
          </div>
          <table className="table table-striped table-hover table-bordered">
            <thead>
              <tr>
                <th>Vehicle Brand</th>
                <th>Vehicle Model</th>
                <th>Vehicle Color</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {vehicles.map((vehicle) => (
                <tr key={vehicle.vehicleId}>
                  <td>{vehicle.vehicleId}</td>
                  <td>{vehicle.modelCode}</td>
                  <td>{vehicle.color}</td>
                  <td>
                    <button
                      className="me-md-3  btn btn-info btn-sm"
                      onClick={() => handleDelete(vehicle)}
                    >
                      {" "}
                      Update
                    </button>
                    <button
                      className="btn btn-danger btn-sm"
                      onClick={() => handleDelete(vehicle)}
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
    </div>
  );
}
