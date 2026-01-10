import { AppBar, Button, Box, Divider, Drawer, IconButton, List, ListItem, ListItemButton, ListItemText, Toolbar, ListItemIcon, Collapse } from "@mui/material";
import React from "react";
import { ExpandLess, ExpandMore, Dashboard, Inbox, Settings, AccountCircle, Support} from "@mui/icons-material";


const drawerWidth = 240;
const navItems = ['Home', 'About', 'Contact'];

function NestedListItems({ label, icon, subItems }) {
    const [open, setOpen] = React.useState(false);

    const handleClick = () => {
        setOpen(!open);
    }

    return (
        <>
            <ListItemButton onClick={handleClick}>
                <ListItemIcon>{icon}</ListItemIcon>
                <ListItemText primary={label} />
                {open ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>
            <Collapse in={open} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                    {subItems.map((subItem) => (
                        <ListItemButton key={subItem} sx={{ pl: 10 }}>
                            <ListItemText primary={subItem.label} />
                        </ListItemButton>
                    ))}
                </List>
            </Collapse>
        </>
    )
}


export default function SideBar() {

    const menuItems = [
        {
            label: 'Dashboard',
            icon: <Dashboard />,
            subItems: [{ label: 'Analytics' }, { label: 'Reports' }],
        },
        {
            label: 'Inbox',
            icon: <Inbox />,
            subItems: [{ label: 'Starred' }, { label: 'Sent' }],
        },
        {
            label: 'Settings',
            icon: <Settings />,
            subItems: [{ label: 'Profile' }, { label: 'Security' }],
        },
        {
            label: 'User Account',
            icon: <AccountCircle />,
            subItems: [{ label: 'My Account' }, { label: 'Logout' }],
        },
    ];

    return (
        <Drawer sx={{
            width: drawerWidth,
            '& .MuiDrawer-paper': {
                width: drawerWidth,
                boxSizing: 'border-box',
                mt: '64px',
                height: 'calc(100vh - 20px)',
            },
        }}
            variant="permanent"
            anchor="left"
        >
            <List>
                {menuItems.map((item, index) => (
                    <NestedListItems
                        key={index}
                        label={item.label}
                        icon={item.icon}
                        subItems={item.subItems}
                    />
                ))}
                <Divider />
                <ListItemButton>
                    <ListItemIcon>
                        <Support />
                    </ListItemIcon>
                    <ListItemText primary="Support" />
                </ListItemButton>
            </List>
        </Drawer>
    )
}