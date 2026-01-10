import * as React from 'react';
import Box from '@mui/material/Box';
import { DataGrid, GridActionsCellItem } from '@mui/x-data-grid';
import { Button, Collapse, Divider, IconButton, Typography,TableRow , TableCell } from '@mui/material';
import PopupInfo from './PopUpInfo';
import { DeleteForever, KeyboardArrowDown, KeyboardArrowUp } from "@mui/icons-material";



export default function FlightDataTable() {

    React.useEffect ( () => {} , []);


    const defaultrows = [
        { id: 1, flightNumber: "0001", airline: "6E", source: "BBI", destination: "DEL", status: "ACTIVE" },
        { id: 2, flightNumber: "0001", airline: "6E", source: "BBI", destination: "DEL", status: "ACTIVE" },
        { id: 3, flightNumber: "0001", airline: "6E", source: "BBI", destination: "DEL", status: "ACTIVE" },
        { id: 4, flightNumber: "0001", airline: "6E", source: "BBI", destination: "DEL", status: "ACTIVE" },
        { id: 5, flightNumber: "0001", airline: "6E", source: "BBI", destination: "DEL", status: "ACTIVE" },
        { id: 6, flightNumber: "0001", airline: "6E", source: "BBI", destination: "DEL", status: "ACTIVE" }
    ];

    const [initialrows, setInitialrows] = React.useState(defaultrows);
    const [selectedFlight, setSelectedFlight] = React.useState(null);
    const [openPopup, setOpenPopup] = React.useState(false);
    const [open, setOpen] = React.useState(false);


    const handleOpenPopup = React.useCallback((row) => {
        setSelectedFlight(row);
        setOpenPopup(true);
    }, []);

    const handleClosePopup = React.useCallback(() => {
        setSelectedFlight(null);
        setOpenPopup(false);
    }, []);



    const deleteFlight = React.useCallback(
        (id) => () => {
            setTimeout(() => {
                setInitialrows((prevRows) => prevRows.filter((row) => row.id !== id));
            });
        },
        [],
    );

    // const toogleRow = (id) => {
    //     console.log(id);
    //     setOpenRow(openRow === id ? null : id);
    // }

    const showMoreInfo = (info) => {
        return (
            <>
                <TableRow>
                    <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
                            <Box>
                                <Collapse in={open} timeout="auto" unmountOnExit>
                                    <Divider />
                                    <Box sx={{
                                        px: 3,
                                        py: 1.5,
                                        bgcolor: "#fafafa",
                                        borderRadius: 1,
                                        display: "flex",
                                        flexDirection: "column",
                                        gap: 0.5,
                                    }}>
                                        <Typography variant="body2">
                                            <b>Average Speed:</b> {info.avgSpeed} km/h
                                        </Typography>
                                        <Typography variant="body2">
                                            <b>Average Altitude:</b> {info.avgAltitude} ft
                                        </Typography>
                                        <Typography variant="body2">
                                            <b>Max Altitude:</b> {info.maxAltitude} ft
                                        </Typography>
                                    </Box>
                                </Collapse>
                            </Box>
                    </TableCell>
                </TableRow>
            </>
        )
    }

    const columns = React.useMemo(
        () => [
            {
                field: 'id',
                headerName: 'ID',
                width: 100,
            },
            {
                field: 'flightNumber',
                headerName: 'Flight Number',
                width: 150,
                renderCell: (params) => {
                    console.log("Params :" + params);
                    const { flightNumber, airline, source, destination } = params.row;
                    return (
                        <Box display="flex" flexDirection="column">
                            <Typography variant="body2" fontWeight="bold">
                                {airline} {flightNumber}
                            </Typography>
                            <Typography variant="caption" color="text.secondary">
                                {source} → {destination}
                            </Typography>
                        </Box>
                    );
                }


            },
            {
                field: 'status',
                headerName: 'Status',
                width: 100,
            },
            {
                field: 'Info',
                width: 100,
                headerName: 'Info',
                renderCell: (params) => <Button
                    onClick={() => handleOpenPopup(params.row)}
                    sx={{
                        backgroundColor: 'blue',
                        ":hover": { backgroundColor: 'red' }
                    }}
                    variant="contained"
                    size="small"
                    style={{ marginLeft: 2, marginRight: 2 }}
                >
                    Open
                </Button>
            },
            {

                field: "Delete",
                headerName: "",
                width: 20,
                renderCell: (params) => (
                    <GridActionsCellItem
                        icon={<DeleteForever />}
                        label="Delete"
                        onClick={deleteFlight(params.id)}
                    >
                    </GridActionsCellItem>
                )
            },
            {
                field: "expand",
                headerName: "",
                width: 20,
                sortable: false,
                renderCell: (params) => {
                    <IconButton
                        aria-label="expand row"
                        size='small'
                        onClick={() => setOpen(!open)} >
                        {open ? <KeyboardArrowUp /> : <KeyboardArrowDown />}
                    </IconButton>
                }
            }
        ], [deleteFlight]);


    return (
        <div>
            <Box sx={{ height: '100%', width: '100%', outlineWidth: '20px' }}>
                <DataGrid
                    rows={initialrows}
                    columns={columns}
                    getRowHeight={(params) =>
                        open ? 150 : "auto" // expand row height
                    }
                    initialState={
                        {
                            pagination: {
                                paginationModel: {
                                    pageSize: 5,
                                }
                            }
                        }
                    }
                    pageSizeOptions={[5]}
                    disableRowSelectionOnClick
                    checkboxSelection
                /*slots={{
                    row: (initialrows) => {
                        const { row } = initialrows;
                        //const isOpen = open === row.id;

                        
                        )
                    }
                }}*/
                >
                </DataGrid>
            </Box>
            <PopupInfo
                open={openPopup}
                flight={selectedFlight}
                closePopup={handleClosePopup}
            />
        </div>
    );
}