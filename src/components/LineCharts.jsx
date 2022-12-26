import {useEffect, useState} from 'react';
import { tokens } from "../theme";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
  } from 'chart.js';

import { Bar, Line } from 'react-chartjs-2';
import { Box } from '@mui/material';
import { useTheme } from '@emotion/react';
ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
  );
const options = {
    indexAxis: 'x',
    elements: {
      bar: {
        borderWidth: 2,
      },
    },
    responsive: true,
    plugins: {
      legend: {
        position: 'right',
      },
      title: {
        display: true,
        text: 'Salary /Ages Chart',
      },
    },
  };

const Horizontalchart =() => {
  
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
    const [data, setData] = useState({
        labels:[],
        datasets: [
          {
            label: 'Dataset 1',
            data:[],
            borderColor: 'rgba(25, 90, 13, 0.5)',
            backgroundColor: 'rgba(25, 90, 13, 0.5)',
          },
          {
            label: 'Dataset 2',
            data:[],
            borderColor: 'rgb(53, 162, 235)',
            backgroundColor: 'rgba(53, 162, 235, 0.5)',
          },
        ],
      });
    useEffect(()=> {
       const fetchData= async()=> {
           const url = 'https://localhost:7263/api/Orders'
           const labelSet = []
           const dataSet1 = [];
           const dataSet2 = [];
         await fetch(url).then((data)=> {
             
             const res = data.json();
             return res
         }).then((res) => {
              
            for (const val of res) {
                dataSet1.push(val.transportOrderer);
               dataSet2.push(val.transportPrice)
                labelSet.push(val.destination)
            }
            setData({
                labels:labelSet,
                datasets: [
                  {
                    label: 'revenues',
                    data:dataSet2,
                    borderColor: colors.grey[100],
                    backgroundColor: colors.grey[400],
                  }
                   
                ],
              })
            
         }).catch(e => {
                console.log("error", e)
            })
        }
        
        fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])
   
    return(
  <>
       <Bar data={data} options={options}/>
      </>
         )
}
export default Horizontalchart;