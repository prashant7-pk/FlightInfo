import Box from '@mui/material/Box';
import { useEffect, useState, useRef } from 'react';
import axios from "axios";
import FlightLand from '@mui/icons-material/FlightLand';
import FlightTakeoff from '@mui/icons-material/FlightTakeoff';

export function VerticleBox({ isRunning, setIsRunning }) {

    const [flightAnalysisInfo, setFlightAnalysisInfo] = useState();
    const [prevflightAnalysisInfo, setPrevFlightAnalysisInfo] = useState();
    const [avgSpeedDiff, setavgSpeedDiff] = useState(0);
    const [avgAltitudeDiff, setavgAltitudeDiff] = useState(0);
    const prevAvgSpeed = useRef(null);
    const prevAvgAltitude = useRef(null);

    useEffect(() => {
        console.log(isRunning);
        if (!isRunning) return;

        const fetchFlightAverageDetails = async () => {
            try {
                const response = await axios.get("http://localhost:8081/api/flights/getflightstats?flightId=FL001")
                    .then(response => {
                        console.log("Incoming speed :" + response.data.avgSpeed);

                        if (prevAvgSpeed.current !== null && prevAvgAltitude.current !== null) {
                            console.log(" flightAnalysisInfo.avgSpeed : " + response.data.avgSpeed);
                            console.log(" prevAvgSpeed.current : " + prevAvgSpeed.current);
                            console.log(" Diff :" + (response.data.avgSpeed - prevAvgSpeed.current));
                            setavgSpeedDiff(response.data.avgSpeed - prevAvgSpeed.current);
                            setavgAltitudeDiff(response.data.avgAltitude - prevAvgAltitude.current);
                        }
                        setFlightAnalysisInfo(response.data);

                        prevAvgAltitude.current = response.data.avgAltitude;
                        prevAvgSpeed.current = response.data.avgSpeed;

                        console.log("Previous speed: " + prevAvgSpeed + " altitude :" + prevAvgAltitude);
                    })
            } catch (error) {
                console.error("Error fetching Flight Tracking details ", error);
            }

        }
        const interval = setInterval(fetchFlightAverageDetails, 15000);
        return () => clearInterval(interval);
    }, [isRunning]);

    /*useEffect( () => {
         console.log("diff starting to calculate");
         if( !prevflightAnalysisInfo || !flightAnalysisInfo) return;
 
         setavgSpeedDiff(flightAnalysisInfo.avgSpeed - prevflightAnalysisInfo.avgSpeed);
         setavgAltitudeDiff(flightAnalysisInfo.avgAltitude - prevflightAnalysisInfo.avgAltitude);
     
     }, [flightAnalysisInfo]) ;*/

    function Item(props) {
        const { sx, ...other } = props;
        return (
            <Box
                sx={[
                    (theme) => ({
                        p: 6,
                        m: 3,
                        border: '1px solid',
                        borderColor: 'grey.300',
                        borderRadius: 2,
                        fontSize: '0.875rem',
                    }),
                    ...(Array.isArray(sx) ? sx : [sx]),
                ]}
                {...other}
            />
        );
    }


    return (

        <Box
            sx={{
                display: 'flex',
                alignItems: 'flex-start',
                flexDirection: 'column',
                p: 2,
                m: 1,
                bgcolor: 'background.paper',
                borderRadius: 1,
            }}
        >
            <Item> <div style={{ textAlign: "center" }}><h3 style={{ textAlign: "top" }}>Average Speed</h3>
                <p>
                    <span style={{ color: avgSpeedDiff > 0 ? "green" : "red", fontSize: 25 }}>
                        {avgSpeedDiff > 0 ? <FlightTakeoff /> : <FlightLand />} {Math.abs(avgSpeedDiff).toFixed(2)} km/h
                    </span>
                </p>
            </div>
                <div style={{ textAlign: "center" }}>(Last 2 min..)</div>
            </Item>
            <Item> <div style={{ textAlign: "center" }}><h3 style={{ textAlign: "top" }}>Average Altitude</h3>
                <p>
                    <span style={{ color: avgAltitudeDiff > 0 ? "green" : "red", fontSize: 25 }}>
                        {avgAltitudeDiff > 0 ? <FlightTakeoff /> : <FlightLand />} {Math.abs(avgAltitudeDiff).toFixed(2)} ft
                    </span>
                </p>
            </div>
            <div style={{ textAlign: "center" }}>(Last 2 min..)</div>
            <p style={{ marginTop: 15}}>Max Height: {flightAnalysisInfo ? Math.abs(flightAnalysisInfo.maxAltitude).toFixed(2) : ".."} ft</p>
            </Item>
        </Box>
    );
}