import { Dialog, DialogTitle, DialogContent,DialogActions } from "@mui/material";
import Button from '@mui/material/Button';
import { FlightGraph } from "./flightGraph.jsx";
import React from "react";
import { VerticleBox } from "./verticleBox.jsx";
import Box from '@mui/material/Box';
import { useState } from "react";

export default function PopupInfo( {open , flight, closePopup} ) {
    const [isRunning, setIsRunning] = useState(false);
    const renderGraphAndDetialBox = () => {
       return ( <Box
            sx={{
                display: "flex",
                flexDirection: "row",      // side by side
                gap: 2,                    // space between them
                width: "100%",
            }}
        >
            <Box sx={{ flex: 1 }}>
                <FlightGraph isRunning={isRunning} setIsRunning={setIsRunning}/>      {/* your graph function/component */}
            </Box>

            <Box sx={{ flex: 1 }}>
                <VerticleBox isRunning={isRunning} setIsRunning={setIsRunning}/>   {/* your 3 boxes in column */}
            </Box>
        </Box>
   ) };

    return (
        <Dialog open={open} closePopup={closePopup} maxWidth>
            <DialogTitle>Flight Details</DialogTitle>
                {console.log(flight)}
                <DialogContent dividers>
                    {flight ? (
                        <>
                            <p>
                            <strong>Flight:</strong> {flight.flightNumber}
                            </p>
                            {renderGraphAndDetialBox()}
                            {/*<FlightGraph />
                            <VerticleBox />*/}
                        </>
                        
                    ) 
                    : ( <p>No Data to display </p> )
                    }
                </DialogContent>
                <DialogActions>
                     <Button variant="contained" onClick={closePopup}>
                    Close
                </Button>
      </DialogActions>
        </Dialog>
    );
}