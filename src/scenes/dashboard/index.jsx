import { Box, Button, Typography, useTheme } from "@mui/material";
import { tokens } from "../../theme";
import DownloadOutlinedIcon from "@mui/icons-material/DownloadOutlined";
import EmailIcon from "@mui/icons-material/Email";
import DirectionsCarFilledIcon from "@mui/icons-material/DirectionsCarFilled";
import Header from "../../components/Header";
import GeographyChart from "../../components/GeographyChart";
import StatBox from "../../components/StatBox";
import { useEffect, useState } from "react";
import axios from "axios";
import Constants from "../../utilities/Constants";

const Dashboard = () => {
  const apiGetVehiclesEndPoint = Constants.API_URL_GET_ALL_VEHICLES;
  const apiGetBrandsEndPoint = Constants.API_URL_GET_ALL_BRANDS;
  const apiGetModelsEndPoint = Constants.API_URL_GET_ALL_MODELS;
  //get brands

  //get Vehicles
  const [brands, setBrands] = useState([]);
  useEffect(() => {
    const getBrands = async () => {
      const { data: res } = await axios.get(apiGetBrandsEndPoint);
      /* console.log(res.length) */
      setBrands(res);
    };
    getBrands();
  }, [apiGetBrandsEndPoint]);

  //get models
  const [models, setModels] = useState([]);

  useEffect(() => {
    const getModels = async () => {
      const { data: res } = await axios.get(apiGetModelsEndPoint);
      setModels(res);
    };
    getModels();
  }, [apiGetModelsEndPoint]);

  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  //get Vehicles
  const [vehicles, setVehicles] = useState([]);
  useEffect(() => {
    const getVehicles = async () => {
      const { data: res } = await axios.get(apiGetVehiclesEndPoint);
      /* console.log(res.length) */
      setVehicles(res);
    };
    getVehicles();
  }, [apiGetVehiclesEndPoint]);
  //get VehiclesByModel
  const [vehiclesByModel, setVehiclesByModel] = useState([]);
  const [brandId, setBrandId] = useState("");
  const handleBrand = (event) => {
    const getBrandid = event.target.value;
    setBrandId(getBrandid);
  };
  useEffect(() => {
    const getVehiclesByModel = async () => {
      const { data: res } = await axios.get(
        `https://localhost:7146/Vehicle/${brandId}/vehicle`
      );
      /* console.log(res.length) */
      setVehiclesByModel(res);
    };
    getVehiclesByModel();
  }, [brandId]);

  return (
    <Box m="20px">
      {/* HEADER */}
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Header title="DASHBOARD" subtitle="Welcome to your dashboard" />

        <Box>
          <Button
            sx={{
              backgroundColor: colors.blueAccent[700],
              color: colors.grey[100],
              fontSize: "14px",
              fontWeight: "bold",
              padding: "10px 20px",
            }}
          >
            <DownloadOutlinedIcon sx={{ mr: "10px" }} />
            Download Reports
          </Button>
        </Box>
      </Box>

      {/* GRID & CHARTS */}
      <Box
        display="grid"
        gridTemplateColumns="repeat(12, 1fr)"
        gridAutoRows="140px"
        gap="20px"
      >
        {/* ROW 1 */}
        <Box
          gridColumn="span 3"
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <StatBox
            title="12,361"
            subtitle="Emails Sent"
            increase="+14%"
            icon={
              <EmailIcon
                sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
              />
            }
          />
        </Box>
        <Box
          gridColumn="span 3"
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <StatBox
            title="Number of Vehicles"
            subtitle={vehicles.map((vehicle) => (
              <div key={vehicle.id} className="hideEl">
                <p>{vehicles.length + 1}</p>
              </div>
            ))}
            icon={
              <DirectionsCarFilledIcon
                sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
              />
            }
          />
        </Box>
        <Box
          gridColumn="span 3"
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <StatBox
            title="Number of Brands"
            subtitle={brands.map((brand) => (
              <div key={brand.id} className="hideEl">
                <p>{brands.length}</p>
              </div>
            ))}
            icon={
              <DirectionsCarFilledIcon
                sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
              />
            }
          />
        </Box>
        <Box
          gridColumn="span 3"
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <StatBox
            title="Number of Models"
            subtitle={models.map((model) => (
              <div key={model.id} className="hideEl">
                <p>{models.length}</p>
              </div>
            ))}
            icon={
              <DirectionsCarFilledIcon
                sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
              />
            }
          />
        </Box>
        {/* ROW 2 */}
        <Box
          gridColumn="span 4"
          gridRow="span 2"
          backgroundColor={colors.primary[400]}
          overflow="auto"
        >
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            borderBottom={`4px solid ${colors.primary[500]}`}
            colors={colors.grey[100]}
            p="15px"
          >
            <Typography color={colors.grey[100]} variant="h5" fontWeight="600">
              Vehicle By Brand -  {brandId}
              <select
                name="brand"
                className="form-control"
                /* handleBrand */ onChange={(e) => handleBrand(e)}
              >  <option>
            --Select Brand--
            </option>
                {brands.map((getBrand) => (
                  <option key={getBrand.id} value={getBrand.id}>
                    {getBrand.name}
                  </option>
                ))}
              </select>
            </Typography>
          </Box>

          {vehiclesByModel.map((vehicleByModel) => (
            <Box
              key={vehicleByModel.id}
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              borderBottom={`4px solid ${colors.primary[500]}`}
              p="15px"
            >
              <Box>
                <Typography
                  color={colors.greenAccent[500]}
                  variant="h5"
                  fontWeight="600"
                >
                  {vehicleByModel.enginPower}[kW]
                </Typography>

                <Typography
                  color={colors.greenAccent[500]}
                  variant="h5"
                  fontWeight="600"
                >
                  {vehicleByModel.registration}
                </Typography>
              </Box>
            </Box>
          ))}
        </Box>

        {/* DIJAGRAM */}

        <Box
          gridColumn="span 4"
          gridRow="span 2"
          backgroundColor={colors.primary[400]}
          padding="30px"
        >
          <Typography
            variant="h5"
            fontWeight="600"
            sx={{ marginBottom: "15px" }}
          >
            Geography Based Traffic
          </Typography>
          <Box height="200px">
            <GeographyChart isDashboard={true} />
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Dashboard;
