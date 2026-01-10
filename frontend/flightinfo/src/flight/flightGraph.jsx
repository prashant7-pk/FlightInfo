import { useEffect, useState } from "react";
import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { LineChart } from '@mui/x-charts/LineChart';
import axios from "axios";
import Tab from "@mui/material/Tab";
import TabList from "@mui/lab/TabList";
import TabContext from "@mui/lab/TabContext";
import TabPanel from "@mui/lab/TabPanel";

const dateFormatter = Intl.DateTimeFormat(undefined, {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    timeZone: 'UTC'
});

export function FlightGraph( {isRunning, setIsRunning}) {
    const [flightTrackingData, setFlightTrackingData] = useState([]);
    const [date, setDate] = useState([]);
    const [value, setValue] = React.useState('AltitudeTab');

    const handleTabChange = (event, value) => {
        setValue(value);
    }

    useEffect(() => {
        if (!isRunning) return;

        const fetchFlightTrackingData = async () => {
            try {
                const response = await axios.get("http://localhost:8081/api/flights/trackFlight?flightId=FL001");
                setFlightTrackingData(response.data.data);

                const formattedDate = response.data.data.map((item) => {
                    const formatdate = dateFormatter.format(new Date(item.timestamp));
                    return formatdate;
                });
                setDate(formattedDate);
            } catch (error) {
                console.error("Error fetching Flight Tracking details ", error);
            }
        };
        // const interval = setDate(dateFormatter.format(fetchFlightTrackingData.timestamp)) ;
        const interval = setInterval(fetchFlightTrackingData, 2000);
        return () => clearInterval(interval);
    }, [isRunning]);


    const renderStartStopButton = () => {
        return ( 
            <Box
  sx={{
    display: "flex",
    justifyContent: "center",   
    gap: 2,                                           
  }}
>
            <Button
                variant="contained"
                onClick={startSimulation}
            >
                START
            </Button>

            <Button
                variant="contained"
                onClick={stopSimulation}
            >
                STOP
            </Button>
            </Box>
        );
    }


    const altitudeData = () => {
        return (
            <Box sx={{ height:"60vh" , width: "75vh" , }}>
                    <LineChart
                        width={700}
                        dataset={flightTrackingData}
                        xAxis={[
                            {
                                scaleType: "point",
                                data: date,
                                label: 'Timestamp (UTC)'
                            },
                        ]}
                        yAxis={[{ dataKey: 'altitude', label: 'Altitude (ft)', showMark: false }]}
                        series={[
                            { dataKey: 'altitude', label: 'Altitude (ft)', showMark: false }
                        ]}>
                    </LineChart>
            </Box>
                    
        );
    }

    const speedData = () => {
        return (
            <Box sx={{ height:"60vh" , width: "75vh"}}>
                    <LineChart
                        width={700}
                        dataset={flightTrackingData}
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
                        ]}>
                    </LineChart>

                </Box>
        )
    }
    const startSimulation = () => setIsRunning(true);
    const stopSimulation = () => setIsRunning(false);
    return (
        <Box sx={{ width: "50vw", height: "70vh", }}>
        <TabContext value={value} >
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <TabList onChange={handleTabChange}>
                    <Tab label="Altitude Data" value="AltitudeTab" />
                    <Tab label="Speed Data" value="SpeedTab" />
                </TabList>
            </Box>
            <TabPanel value="AltitudeTab">
                    {altitudeData()}
            </TabPanel>
            <TabPanel value="SpeedTab">
                {speedData()}
            </TabPanel>
        </TabContext>
        {renderStartStopButton()}
        </Box >

    )
}