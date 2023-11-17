import * as React from 'react';
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MuiDrawer from '@mui/material/Drawer';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import { NavLink, Outlet, useLocation } from 'react-router-dom';
// logo and images
import quicktLogo from '../../assets/img/quick-t-icon.svg';
import dashboardIcon from '../../assets/img/drawer/dashboard.svg';
import dashboardIconWhite from '../../assets/img/drawer/dashboard-white.svg';
import generalIcon from '../../assets/img/drawer/general.svg';
import generalIconWhite from '../../assets/img/drawer/general-white.svg';
import pendingIcon from '../../assets/img/drawer/pending-post.svg';
import pendingIconWhite from '../../assets/img/drawer/pending-post-white.svg';
import countryIcon from '../../assets/img/drawer/country.svg';
import countryIconWhite from '../../assets/img/drawer/country-white.svg';
import revenueIcon from '../../assets/img/drawer/revenue.svg';
import revenueIconWhite from '../../assets/img/drawer/revenue-white.svg';
import usersIcon from '../../assets/img/drawer/users.svg';
import usersIconWhite from '../../assets/img/drawer/users-white.svg';
import { AuthContext } from '../../provider/AuthProvider';
import LogoutIcon from '@mui/icons-material/Logout';

const drawerWidth = 240;

const openedMixin = (theme) => ({
    width: drawerWidth,
    transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
    }),
    overflowX: 'hidden',
});

const closedMixin = (theme) => ({
    transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
    width: `calc(${theme.spacing(7)} + 1px)`,
    [theme.breakpoints.up('sm')]: {
        width: `calc(${theme.spacing(8)} + 1px)`,
    },
});

const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    }),
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
    ({ theme, open }) => ({
        width: drawerWidth,
        flexShrink: 0,
        whiteSpace: 'nowrap',
        boxSizing: 'border-box',
        ...(open && {
            ...openedMixin(theme),
            '& .MuiDrawer-paper': openedMixin(theme),
        }),
        ...(!open && {
            ...closedMixin(theme),
            '& .MuiDrawer-paper': closedMixin(theme),
        }),
    }),
);


export default function MiniDrawer() {
    const { logout, user } = React.useContext(AuthContext)
    // console.log(user)

    const theme = useTheme();
    const [open, setOpen] = React.useState(true);
    const location = useLocation();
    // console.log(location.pathname)
    const pathText = location.pathname.split('/')[2].toUpperCase();
    const [headerPath, setHeaderPath] = React.useState(pathText);


    function CustomList({ icon, whiteIcon, text, link, pathText }) {

        // remove spaces and convert to lowercase then check for the path is active
        const cleanedPathText = pathText.toLowerCase().replace(/\s/g, '');
        const cleanedText = text.toLowerCase().replace(/\s/g, '');
        const isActive = cleanedPathText === cleanedText;


        return (
            <ListItem key={1} disablePadding sx={{ display: 'flex', justifyContent: 'flex-start' }}>
                <NavLink
                    to={`/dashboard/${link}`}
                    style={({ isActive }) => {
                        return {
                            color: isActive ? "white" : "inherit",
                            textDecoration: "none",
                            width: "100%",
                            borderBottom: isActive ? "1px solid #E5E5E5" : "none",
                            backgroundColor: isActive ? "#0D55DF" : "#fff",
                            borderRadius: "0 5px 5px 0",
                        };
                    }}
                    onClick={() => setHeaderPath(text)}
                >
                    <ListItemButton
                        sx={{
                            minHeight: 48,
                            justifyContent: open ? 'initial' : 'center',
                            pl: 4,
                        }}
                    >

                        {isActive ?
                            <img src={whiteIcon} alt="icon" style={{ marginRight: '25px', width: '20px' }} /> :
                            <img src={icon} alt="icon" style={{ marginRight: '25px', width: '20px' }} />
                        }

                        <ListItemText sx={{ opacity: open ? 1 : 0 }} > {text} </ListItemText>
                    </ListItemButton>
                </NavLink>

            </ListItem>

        )
    }

    const toggleDrawer = () => {
        setOpen(!open);
    };

    return (
        <Box sx={{ display: 'flex' }}>
            {/* <CssBaseline /> */}
            {/* <AppBar position="fixed" open={open} style={{
                background: '#fff',
                boxShadow: 'none',
                borderBottom: '1px solid #e0e0e0'
            }}>
                <Toolbar >
                    <IconButton onClick={toggleDrawer} >
                        {
                            open ? <ChevronLeftIcon /> : <MenuIcon />
                        }
                    </IconButton>
                </Toolbar>
            </AppBar> */}
            <Drawer variant="permanent" open={open} style={{ background: '#000', position: 'relative' }}>
                <DrawerHeader>
                    {
                        open && <img src={quicktLogo} alt="NIR Logo" style={{ width: '100%', height: '50px', marginRight: '40px' }} />
                    }
                </DrawerHeader>
                {/* here is icon and text for sidebar */}
                <List style={{ marginTop: '-7px' }}>
                    <CustomList icon={dashboardIcon} whiteIcon={dashboardIconWhite} text="Dashboard" link="dashboard" pathText={pathText} />
                    <CustomList icon={generalIcon} whiteIcon={generalIconWhite} text="General Settings" link="generalSettings" pathText={pathText} />
                    <CustomList icon={countryIcon} whiteIcon={countryIconWhite} text="Country" link="country" pathText={pathText} />
                    <CustomList icon={usersIcon} whiteIcon={usersIconWhite} text="Senders" link="senders" pathText={pathText} />
                    <CustomList icon={pendingIcon} whiteIcon={pendingIconWhite} text="Receivers" link="receivers" pathText={pathText} />
                    <CustomList icon={revenueIcon} whiteIcon={revenueIconWhite} text="Revenue" link="revenue" pathText={pathText} />
                </List>
                {/* logout button */}
                <List sx={{ position: 'absolute', bottom: 0, left: 10, width: '100%' }}>
                    <Divider />
                    <ListItemButton
                        sx={{
                            minHeight: 48,
                            justifyContent: open ? 'initial' : 'center',
                            pl: 4,
                            width: '100%',
                        }}
                        onClick={() => {
                            logout()
                        }}
                    >
                        <ListItemIcon>
                            <LogoutIcon />
                        </ListItemIcon>
                        <ListItemText > Logout </ListItemText>

                    </ListItemButton>
                </List>
            </Drawer>
            <Box component="main" sx={{ flexGrow: 1, p:1 }}>
                <Outlet />
            </Box>
        </Box>
    );
}