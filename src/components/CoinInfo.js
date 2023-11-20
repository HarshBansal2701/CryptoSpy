import React, {useState} from 'react';
import { CryptoState } from '../CryptoContext';
import  axios  from 'axios';
import { HistoricalChart } from '../config/api';
import { useEffect } from 'react';
import { CircularProgress, ThemeProvider, createTheme } from '@mui/material';
import { Chart as ChartJS } from 'chart.js/auto'
import { Line } from 'react-chartjs-2';
import { chartDays } from '../config/data';
import SelectButton from './SelectButton';


const CoinInfo = ({ coin }) => {

  const [historic, sethistoric] = useState();

  const [days, setdays] = useState(1);

  const { currency } = CryptoState();

  const fetchHistoricData = async () =>{
    const { data } = await axios.get(HistoricalChart(coin.id, days, currency ))

    sethistoric(data.prices);
  }

  useEffect(()=>{
    fetchHistoricData();
  }, [currency, days]);


  const darkTheme = createTheme({
    palette: {
      primary: {
        main: "#fff",
      },
      type: "dark",
    },
  });

  return (
    // <></>
    <ThemeProvider theme={darkTheme}>
      <div style={{width: "75%" , display:"flex" , flexDirection: "column" , alignItems: "center" , justifyContent:"center" , marginTop: 25 , padding: 40}}>

          {
            !historic? (
              <CircularProgress
              style={{color:"gold"}}
              size={250}
              thickness={1}
              />
              
            ):(<>
                <Line
                  data={{
                    labels: historic.map((coin)=>{
                      let date = new Date(coin[0]);
                      let time = date.getHours()>12 ? `${date.getHours() - 12}:${date.getMinutes()} PM` :`${date.getHours()}:${date.getMinutes()} AM`;

                      return days===1?time : date.toLocaleDateString()
                    }),

                    datasets:[
                      {data:historic.map((coin)=> coin[1]),
                        label: `Price (Past ${days} Days ) in ${currency}`,
                        borderColor: "#EEBC1D",
                         
                      }],

                  }}
                  options={{
                    elements : {
                      point:{ 
                        radius: 1,
                      },
                    },
                  }}
                />

                <div style={{
                  display:"flex",
                  marginTop: 20,
                  justifyContent: "space-around",
                  width: "100%",
                }}>
                  {chartDays.map((day) =>(
                    // <SelectButton key={(day.value)} onClick = {()=>setdays(day.value)}
                    // selected = {day.value == days}
                    // >
                    //   {day.label}
                    // </SelectButton>
                    <button onClick = {()=>setdays(day.value)}
                    style={{
                      border : "1px solid gold",
                      borderRadius: 5,
        padding: 10,
        paddingLeft: 20,
        paddingRight: 20,
        fontFamily: "Montserrat",
        cursor: "pointer",
        backgroundColor: day.value == days? "gold" : "",
        color: day.value == days? 'black': "",
        fontWeight: day.value == days? 700 : 600,
        width: "22%",
        height: "40px"
                    }}>{day.label}</button>
                  ))}
                </div>            
            </>)
          }



      </div>
    </ThemeProvider>
  )
}

export default CoinInfo;


