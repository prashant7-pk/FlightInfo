import { Toolbar, AppBar, Container, Typography, Button, Box, Tooltip, IconButton, Menu, MenuItem } from "@mui/material";
import { Flight, AccountCircle } from "@mui/icons-material";
import React, { useState } from "react"


const pages = ['Home', 'Services', 'Demo', 'Contact Us'];
const settings = ['Profile', 'Account', 'Dashboard', 'Logout'];
export default function NavigationAppBar() {

    const [anchorNav, setAnchorNav] = React.useState(null);
    const [anchorUser, setAnchorUser] = React.useState(null);

    const handleOpenNavMenu = (event) => {
        setAnchorNav(event.currentTarget);
    };
    const handleOpenUserMenu = (event) => {
        setAnchorUser(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorNav(null);
    };

    const handleCloseUserMenu = () => {
        setAnchorUser(null);
    };

    return (
        <div>
            <AppBar position="static">
                <Container maxWidth="xl">
                    <Toolbar disableGutters>
                        <Flight sx={{ display: { xs: 'none', md: 'flex' }, mr: 2 }} />
                        <Typography
                            variant="h6"
                            noWrap
                            component="a"
                            sx={{
                                mr: 7,
                                display: { xs: 'none', md: 'flex' },
                                fontWeight: 700,
                                color: 'inherit',
                            }}
                        >
                            FLYINFO
                        </Typography>
                        <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                            {pages.map((page) => (
                                <Button key={page} onClick={handleCloseNavMenu}
                                    sx={{ my: 2, color: 'white', display: 'block', mx: 2.5, fontWeight: 'bold' }}>
                                    {page}
                                </Button>
                            ))}
                        </Box>
                        <Box sx={{ flexGrow: 0 }}>
                            <Tooltip title="Settings">
                                <IconButton>
                                    <AccountCircle onClick={handleOpenUserMenu} >
                                    </AccountCircle>
                                </IconButton>
                            </Tooltip>
                            <Menu
                                sx={{ mt: '45px' }}
                                id="menu-appbar"
                                anchorEl={anchorUser}
                                anchorOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                                keepMounted
                                transformOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                                open={Boolean(anchorUser)}
                                onClose={handleCloseUserMenu}
                            >
                            {settings.map( (setting) => (
                                <MenuItem key={setting} onClick={handleCloseUserMenu}>
                                    <Typography sx={{ textAlign: 'center' }}>
                                        {setting}
                                    </Typography>
                                </MenuItem>
                            ) )}
                            </Menu>
                        </Box>
                    </Toolbar>
                </Container>
            </AppBar>
        </div>
    )
}