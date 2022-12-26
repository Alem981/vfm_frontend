import axios from "axios";
import { useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import Constants from "../../../utilities/Constants";

const AddVehicleForm = () => {
  let navigate = useNavigate(); 
  const routeChange = () =>{ 
    let path = `/vehicles`; 
    navigate(path);
  }

  const apiGetBrandsEndPoint = Constants.API_URL_GET_ALL_BRANDS;
  const apiGetModelsEndPoint = Constants.API_URL_GET_ALL_MODELS;

  //Add Driver
  /*   const [registration, setRegistration] = useState('');
  const [vehicleBrand, setVehicleBrand] = useState('');
  const [vehicleModel, setVehicleModel] = useState('');
 
  const handleRegistration = (value) => {
    setRegistration(value);
  }

  const handleVehicleBrand = (value) => {
    setVehicleBrand(value);
  }
  const handleVehicleModel = (value) => {
    setVehicleModel(value);
  }
  

  const handleSave = (e) => {
    
    Axios.post('https://localhost:7298/api/Vehicle', {
      Registration: registration,
      VehicleBrand: vehicleBrand,
      VehicleModel: vehicleModel,
    }).then(res => e.preventDefault() ('Posted')).catch((error) => {
console.log(error)
    })
  }
  */
  /*--------------*/

  const [brand, setBrand] = useState([]);

  useEffect(() => {
    const getBrand = async () => {
      const { data: res } = await axios.get(apiGetBrandsEndPoint);
      console.log(res);
      setBrand(res);
    };
    getBrand();
  }, [apiGetBrandsEndPoint]);

  const [loading, setLoading] = useState(false);
  const [models, setModels] = useState([]);
  const [searchModel, setSearchModel] = useState("");
  useEffect(() => {
    const loadPosts = async () => {
      setLoading(true);
      const response = await axios.get(apiGetModelsEndPoint);
      setModels(response.data);
      setLoading(false);
    };
    loadPosts();
  }, [apiGetModelsEndPoint]);
  return (
    <div className="container w-75 p-3">
      <form style={{ color: "black" }}>
        {/* onChange={(e) => setSearchModel(e.target.value)} */}
        <select
          name="brand"
          className="form-control"
          /* handleBrand */ onChange={(e) => setSearchModel(e.target.value)}
        >
          <option value="">--Select Brand--</option>
          {brand.map((getBrand) => (
            <option key={getBrand.code} value={getBrand.code}>
              {getBrand.name}
            </option>
          ))}
        </select>
        <br />
        <br />
        <select className="form-control">
          <option value="">--Select Model--</option>
          {loading ? (
            <h4>loading..</h4>
          ) : (
            models
              // eslint-disable-next-line array-callback-return
              .filter((value) => {
                if (searchModel === "") {
                  return value;
                } else if (value.brandCode.includes(searchModel)) {
                  return value;
                }
              })
              .map((item) => (
                <option key={item.code} value={item.code}>
                  {item.name}
                </option>
              ))
          )}
        </select>
        <br />
        <br />
        <div className='w-50 p-3 	'>

        
        <button className="btn btn-primary">Save</button>  
        <button className="btn btn-primary m-3 " onClick={routeChange}>Close</button>
        </div>
      </form>
    </div>
  );
};

export default AddVehicleForm;
