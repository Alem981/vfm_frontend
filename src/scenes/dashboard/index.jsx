import { Box, Button,  Typography, useTheme } from "@mui/material";
import { tokens } from "../../theme";
import DownloadOutlinedIcon from "@mui/icons-material/DownloadOutlined";
import EmailIcon from "@mui/icons-material/Email";
import PointOfSaleIcon from "@mui/icons-material/PointOfSale";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import DirectionsCarFilledIcon from '@mui/icons-material/DirectionsCarFilled';
import Header from "../../components/Header";
import LineChart from "../../components/LineCharts";
import GeographyChart from "../../components/GeographyChart";
import BarChart from "../../components/BarChart";
import StatBox from "../../components/StatBox";
import ProgressCircle from "../../components/ProgressCircle";
import { useEffect, useState } from "react";
import axios from "axios";
import Constants from "../../utilities/Constants";

const Dashboard = () => {
  const apiGetVehiclesEndPoint = Constants.API_URL_GET_ALL_VEHICLES;
  const apiGetDriversEndPoint = Constants.API_URL_GET_ALL_DRIVERS;
  const apiGetOrdersEndPoint = Constants.API_URL_GET_ALL_ORDERS;

  const [drivers, setDrivers] = useState([]);
  //get drivers
  useEffect(() => {
    const getDrivers = async () => {
      const { data: res } = await axios.get(
        apiGetDriversEndPoint
      );
      /*  console.log(res.length) */
      setDrivers(res);
    };
    getDrivers();
  }, [apiGetDriversEndPoint]);

    //get orders
    const [orders, setOrders] = useState([]);
    useEffect(() => {
      const getOrders = async () => {
        const { data: res } = await axios.get(
          apiGetOrdersEndPoint
        );
        /*  console.log(res.length) */
        setOrders(res);
      };
      getOrders();
    }, [apiGetOrdersEndPoint]);
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  //get Vehicles
  const [vehicles, setVehicles] = useState([]);
  useEffect(() => {
    const getVehicles = async () => {
      const { data: res } = await axios.get(
        apiGetVehiclesEndPoint
      );
      /* console.log(res.length) */
      setVehicles(res);
    };
    getVehicles();
  }, [apiGetVehiclesEndPoint]);



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
            title="Orders"
            subtitle={orders.map((order) => (
              <div key={orders.id} className="hideEl">
                <p>{orders.length}</p>
              </div>  ))}
            /* subtitle="Sales Obtained" */
 
            icon={
              <PointOfSaleIcon
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
                <p >{vehicles.length}</p>
              </div>
            ))}
 
            icon={
              <DirectionsCarFilledIcon
                sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
              />
            }
          />


          <Box
            gridColumn="span 3"
            backgroundColor={colors.primary[400]}
            display="flex"
            alignItems="center"
            justifyContent="center"
          ></Box>



        </Box>
        <Box
          gridColumn="span 3"
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >


          <StatBox
            title="Employeed Drivers"
            subtitle={drivers.map((driver) => (
              <div key={driver.id} className="hideEl">
                <p>{drivers.length}</p>
              </div>
            ))}


            icon={
              <PersonAddIcon
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
              Drivers contact phone
            </Typography>
          </Box>

          {drivers.map((driver) => (
            <Box
              key={driver.id}
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
                  {driver.firstName}
                </Typography>
                <Typography color={colors.grey[100]}>
                  {driver.lastName}
                </Typography>
              </Box>
              <Box color={colors.grey[100]}>{driver.mobilePhone}</Box>
              <Box
                backgroundColor={colors.greenAccent[500]}
                p="5px 10px"
                borderRadius="4px"
              >
                Licence: {driver.licenceNumber}
              </Box>
            </Box>
          ))}
        </Box>

        {/* ROW 3 */}
        <Box
          gridColumn="span 4"
          gridRow="span 2"
          backgroundColor={colors.primary[400]}
          p="30px"
        >
          <Typography variant="h5" fontWeight="600">
            Campaign
          </Typography>
          <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            mt="25px"
          >
            <ProgressCircle size="125" />
            <Typography
              variant="h5"
              color={colors.greenAccent[500]}
              sx={{ mt: "15px" }}
            >
              $48,352 revenue generated
            </Typography>
            <Typography>Includes extra misc expenditures and costs</Typography>
          </Box>
        </Box>

        {/* DIJAGRAM */}
        <Box
          gridColumn="span 4"
          gridRow="span 2"
          backgroundColor={colors.primary[400]}
        >
          <Typography
            variant="h5"
            fontWeight="600"
            sx={{ padding: "30px 30px 0 30px" }}
          >
            Salary per driver
          </Typography>
          <Box height="250px" mt="-20px">
            <BarChart isDashboard={true} />
          </Box>
        </Box>

        <Box
          gridColumn="span 4"
          gridRow="span 2"
          backgroundColor={colors.primary[400]}
        >
          <Typography
            variant="h5"
            fontWeight="600"
            sx={{ padding: "30px 30px 0 30px" }}
          >
          Revenues$
          </Typography>
          <Box height="250px" mt="-20px">
            <LineChart isDashboard={true} />
          </Box>
        </Box>


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
