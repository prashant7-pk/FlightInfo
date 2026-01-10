import { useEffect, useState } from "react";
import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { LineChart } from '@mui/x-charts/LineChart';

const dateFormatter = Intl.DateTimeFormat(undefined, {
  hour: '2-digit',
  minute: '2-digit',
  second: '2-digit',
  timeZone: 'UTC'
});
console.log(dateFormatter.format(new Date()));
const twoSeconds = 2000;

export  function FlightGraph() {
    const [flightData , setFlightData] = useState([]);
    const [date, setDate] = useState([]);
    const [isRunning, setIsRunning] =useState(false);

    useEffect( () => {
        if (!isRunning) return;

        const interval = setInterval( () => 
        {
            setDate((prev) => {
                return [ ...prev.slice(-15), dateFormatter.format(new Date())] 
        }) ;
            setFlightData((prev) => {
                const last = prev[prev.length - 1];

                const newData = {
                    latitude: last ? Math.round(last.latitude + 0.1) : 22.57,
                    longitude: last ? Math.round(last.longitude + 0.2) : 88.36,
                    altitude: last ? last.altitude + Math.round( Math.random() * 200 - 100) : 30000,
                    speed: 450 + Math.round( Math.random() * 20 ),
                };
                return [ ...prev.slice(-15) , newData];

            }) ;

        } , 2000 );
        return  () => clearInterval(interval);
    } , [isRunning]);

    const startSimulation = () => setIsRunning(true);
    const stopSimulation = () => setIsRunning(false);
    return (
        <Box sx={{  height: '300' , textAlign: 'center'}}>
            {console.log(date)}
            <LineChart
            padding={200}
            height= {300}
            width={1000}
            dataset={flightData}
            xAxis={[
                {
                    scaleType: "point",
                    data: date,
                    label: 'Timestamp (UTC)'
                },
            ]}          
            yAxis={[{ dataKey: 'altitude', label: 'Altitude (ft)', showMark: false }]}
            /*series={[
                { dataKey: 'altitude', label: 'Altitude (ft)', showMark: false },
                { dataKey: 'speed', label: 'Speed (km/h)', showMark: false }
            ]}*/
           series={[
                { dataKey: 'altitude', label: 'Altitude (ft)', showMark: false }
           ]}>
            </LineChart>
            <LineChart

            padding={200}
            height= {300}
            dataset={flightData}
            xAxis={[
                {
                    scaleType: "point",
                    data: date,
                    label: 'Timestamp (UTC)'
                }
                    
            ]}          
            yAxis={[{ dataKey: 'speed', label: 'Speed (km/h)', showMark: false }]}
            /*series={[
                { dataKey: 'altitude', label: 'Altitude (ft)', showMark: false },
                { dataKey: 'speed', label: 'Speed (km/h)', showMark: false }
            ]}*/
           series={[
                { dataKey: 'speed', label: 'Speed (km/h)', showMark: false }
           ]}
            width={1000}>
            </LineChart>
            {console.log(flightData)}
            <Button size='small' variant="contained" xs={{ margin: '20%'}} onClick={() => startSimulation()}>START</Button>
            <Button size='small' variant="contained" xs={{ margin: '20%'}} onClick={() => stopSimulation()}>STOP</Button>
        </Box>
    )
}