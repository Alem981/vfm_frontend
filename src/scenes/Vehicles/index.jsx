import { useState, useEffect } from "react";
import axios from "axios";
import Constants from "../../utilities/Constants";
import { useTheme } from "@material-ui/core";
import { tokens } from "../../theme";
export default function Vehicles() {
  const [vehicles, setVehicles] = useState([]);
  const apiGetVehiclesEndPoint = Constants.API_URL_GET_ALL_VEHICLES;

  useEffect(() => {
    const getVehicles = async () => {
      const { data: res } = await axios.get(apiGetVehiclesEndPoint);
      setVehicles(res);
    };
    getVehicles();
  }, [apiGetVehiclesEndPoint]);
  //Delete Vehicle from db(by id)

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
          <div className="col-sm-3 offset-sm-1  mt-5 mb-4 text-gred"></div>
          <table className="table table-striped table-hover table-bordered">
            <thead>
              <tr>
                <th>Vehicle Id</th>
                <th>Vehicle Registration</th>
                <th>Seats Number</th>
                <th>Vehicle Weight [t]</th>
                <th>Engine Power [kW]</th>
                <th>Model Id</th>
                <th>Edit</th>
              </tr>
            </thead>
            <tbody>
              {vehicles.map((vehicle) => (
                <tr key={vehicle.id}>
                  <td>{vehicle.id}</td>
                  <td>{vehicle.registration}</td>
                  <td>{vehicle.seats}</td>
                  <td>{vehicle.vehicleWeight}</td>
                  <td>{vehicle.enginPower}</td>
                  <td>{vehicle.modelId}</td>
                  <td>
                    <button className="btn btn-danger btn-sm"> Delete</button>
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
