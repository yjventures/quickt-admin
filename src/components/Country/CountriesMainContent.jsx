import React from "react";
import { Box } from "@mui/system";
import styles from "../../assets/css/country.module.css";
import { styled } from "@mui/system";
import { Tabs } from "@mui/base/Tabs";
import { TabsList as BaseTabsList } from "@mui/base/TabsList";
import { TabPanel as BaseTabPanel } from "@mui/base/TabPanel";
import { buttonClasses } from "@mui/base/Button";
import { Tab as BaseTab, tabClasses } from "@mui/base/Tab";
import { DataGrid } from "@mui/x-data-grid";
import { Button, Menu, MenuItem } from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import ArrowIcon from '../../assets/img/country/arrow.svg';
import disableIcon from '../../assets/img/country/disable.svg';
import editIcon from '../../assets/img/country/edit.svg';
import deleteIcon from '../../assets/img/country/delete.svg';
import Dialog from '@mui/material/Dialog';
import ListItemText from '@mui/material/ListItemText';
import ListItem from '@mui/material/ListItem';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import CloseIcon from '@mui/icons-material/Close';
import Slide from '@mui/material/Slide';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const CountriesMainContent = () => {

  const [open, setOpen] = React.useState(false);
  const [selectedAction, setSelectedAction] = React.useState('');
  const handleClickOpen = (action) => {
    setSelectedAction(action);
    console.log(action);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };


  const columns = [
    { field: "id", headerName: "ID", width: 70 },
    {
      field: "name",
      headerName: "Country name",
      width: 130,
    },
    { field: "code", headerName: "Code", width: 130 },
    {
      field: "image",
      headerName: "Icon",
      width: 90,
      sortable: false,
      filterable: false,
      disableColumnMenu: true,

      renderCell: (params) => (
        <img
          style={{
            height: 35,
            width: 35,
            borderRadius: "50%",
            marginRight: 10,
          }}
          src={`${params.row.image}`}
        // alt="user-image"
        />
      ),
    },
    {
      field: "enabled",
      headerName: "Status",
      // description: 'This column has a value getter and is not sortable.',
      // sortable: false,
      width: 160,
      // disable sorting
      sortable: false,
      renderCell: (params) => (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "25px",
            width: "75px",
            backgroundColor: `${params.row.enabled == true ? "#DCFDD4" : "#FDD4D4"}`,
            borderRadius: "15px",
            // border: `${params.row.enabled == true ? '1px solid #007FFF' : '1px solid #FFA800'}`,
            color: `${params.row.enabled == true ? "#4FAC16" : "#AC1616"}`,
            fontFamily: "Open Sans",
            fontSize: "14px",
            fontStyle: "normal",
          }}
        >
          {params.row.enabled == true ? "Enabled" : "Disabled"}
        </div>
      ),
    },
    {
      field: 'action',
      headerName: 'Action',
      width: 150,
      type: 'number',
      renderCell: (params) => {
        const [anchorEl, setAnchorEl] = React.useState(null);

        const handleClick = (event) => {
          setAnchorEl(event.currentTarget);
        };

        const handleClose = () => {
          setAnchorEl(null);
        };

        return (
          <div>
            <div
              style={{
                background: 'transparent',
                border: '1px solid #999',
                borderRadius: '25px',
                outline: 'none',
                cursor: 'pointer',
                width: '100px',
                fontSize: '12px',
                color: '#000',
                fontFamily: 'Open Sans',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                padding: '5px 10px',
              }}
              onClick={handleClick}
            >
              Action
              <img src={ArrowIcon} alt="icon" style={{ marginLeft: '10px' }} />
            </div>
            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleClose}
              style={{
                marginLeft: '-20px',
                boxShadow: 'none',
              }}
            >
              <MenuItem onClick={() => handleClickOpen('disable')}>
                <img style={{ marginRight: "10px" }} src={disableIcon} alt="icon" />
                Disable
              </MenuItem>
              <MenuItem onClick={() => handleClickOpen('edit')}>
                <img style={{ marginRight: "10px" }} src={editIcon} alt="icon" />
                Edit
              </MenuItem>
              <MenuItem onClick={() => handleClickOpen('delete')}>
                <img style={{ marginRight: "10px" }} src={deleteIcon} alt="icon" />
                Delete
              </MenuItem>
            </Menu>
          </div>
        );
      },
    },
    // {
    // field: "action",
    // headerName: "Action",
    // width: 100,
    // type: "number",
    // sortable: false,
    // filterable: false,
    // disableColumnMenu: true,
    // renderCell: (params) => (
    //   <select
    //     // onClick={() => alert('Show action popup')}
    //     style={{
    //       display: "flex",
    //       justifyContent: "space-around",
    //       flexDirection: "column",
    //       alignItems: "center",
    //       width: "105px",
    //       backgroundColor: "#fff",
    //       borderRadius: "15px",
    //       border: "1px solid #E9E9EA",
    //       color: "#1D1929",
    //       fontFamily: "Open Sans",
    //       fontSize: "14px",
    //       fontStyle: "normal",
    //       padding: "7px",
    //     }}
    //   >
    //     <option value="view" selected>
    //       Action
    //     </option>
    //     <option
    //       value="edit"
    //       onClick={() => {
    //         alert("Edit");
    //       }}
    //     >
    //       Edit
    //     </option>
    //     <option
    //       value="delete"
    //       onClick={() => {
    //         alert("Delete");
    //       }}
    //     >
    //       Delete
    //     </option>
    //   </select>
    // ),
    // },
  ];

  const rows = [
    {
      id: 1,
      name: "Australia",
      code: "AU",
      image:
        "https://upload.wikimedia.org/wikipedia/commons/b/b9/Flag_of_Australia.svg",
      enabled: true,
    },
    {
      id: 2,
      name: "Lannister",
      code: "LI",
      image:
        "https://upload.wikimedia.org/wikipedia/commons/b/b9/Flag_of_Australia.svg",
      enabled: true,
    },
    {
      id: 4,
      name: "Stark",
      code: "SN",
      image:
        "https://upload.wikimedia.org/wikipedia/commons/b/b9/Flag_of_Australia.svg",
      enabled: false,
    },
    {
      id: 5,
      name: "Targaryen",
      code: "SN",
      image:
        "https://upload.wikimedia.org/wikipedia/commons/b/b9/Flag_of_Australia.svg",
      enabled: true,
    },
    {
      id: 6,
      name: "Melisandre",
      code: "SN",
      image:
        "https://upload.wikimedia.org/wikipedia/commons/b/b9/Flag_of_Australia.svg",
      enabled: true,
    },
    {
      id: 7,
      name: "Clifford",
      code: "SN",
      image:
        "https://upload.wikimedia.org/wikipedia/commons/b/b9/Flag_of_Australia.svg",
      enabled: true,
    },
    {
      id: 8,
      name: "Frances",
      code: "SN",
      image:
        "https://upload.wikimedia.org/wikipedia/commons/b/b9/Flag_of_Australia.svg",
      enabled: true,
    },
    {
      id: 9,
      name: "Roxie",
      code: "SN",
      image:
        "https://upload.wikimedia.org/wikipedia/commons/b/b9/Flag_of_Australia.svg",
      enabled: false,
    },
  ];

  return (
    <div className={styles.parent}>
      <Tabs defaultValue={1}>
        <TabsList>
          <Tab value={1}>All - 30</Tab>
          <Tab value={2}>Enabled - 10</Tab>
          <Tab value={3}>Disabled - 5</Tab>
        </TabsList>
        <TabPanel value={1}>
          <div style={{ height: "auto", width: "100%" }}>
            <DataGrid
              rows={rows}
              columns={columns}
              initialState={{
                pagination: {
                  paginationModel: { page: 0, pageSize: 10 },
                },
              }}
              pageSizeOptions={[10, 20]}
              checkboxSelection
            />
          </div>
        </TabPanel>
        <TabPanel value={2}>Second page</TabPanel>
        <TabPanel value={3}>Third page</TabPanel>
      </Tabs>
      <Dialog
        fullScreen
        open={open}
        onClose={handleClose}
        TransitionComponent={Transition}
      >
        <AppBar sx={{ position: 'relative' }}>
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={handleClose}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
            <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
              {selectedAction}
            </Typography>
            <Button autoFocus color="inherit" onClick={handleClose}>
              save
            </Button>
          </Toolbar>
        </AppBar>
        <List>
          <ListItem button>
            <ListItemText primary="Phone ringtone" secondary="Titania" />
          </ListItem>
          <Divider />
          <ListItem button>
            <ListItemText
              primary="Default notification ringtone"
              secondary="Tethys"
            />
          </ListItem>
        </List>
      </Dialog>
    </div>
  );
};

const blue = {
  50: "#F0F7FF",
  100: "#C2E0FF",
  200: "#80BFFF",
  300: "#66B2FF",
  400: "#3399FF",
  500: "#007FFF",
  600: "#0072E5",
  700: "#0059B2",
  800: "#004C99",
  900: "#003A75",
};

const grey = {
  50: "#F3F6F9",
  100: "#E5EAF2",
  200: "#DAE2ED",
  300: "#C7D0DD",
  400: "#B0B8C4",
  500: "#9DA8B7",
  600: "#6B7A90",
  700: "#434D5B",
  800: "#303740",
  900: "#1C2025",
};

const Tab = styled(BaseTab)`
  font-family: "IBM Plex Sans", sans-serif;
  color: #1d1929;
  cursor: pointer;
  font-size: 0.875rem;
  font-weight: 600;
  background-color: transparent;
  width: 100%;
  padding: 10px 12px;
  margin: 6px;
  border: none;
  border-radius: 7px;
  display: flex;
  justify-content: center;

  &:hover {
    //   background-color: ${blue[400]};
  }

  // &:focus {
  //   color: #fff;
  //   outline: 3px solid ${blue[200]};
  // }

  &.${tabClasses.selected} {
    border-bottom: 3px solid ${blue[600]};
    color: ${blue[600]};
    border-radius: 0;
  }

  &.${buttonClasses.disabled} {
    opacity: 1;
    cursor: not-allowed;
    color: ${blue[600]};
  }
`;

const TabPanel = styled(BaseTabPanel)(
  ({ theme }) => `
    width: 100%;
    min-width: 1200px;
    font-family: IBM Plex Sans, sans-serif;
    font-size: 0.875rem;
    padding: 20px 12px;
    // background: ${theme.palette.mode === "dark" ? grey[900] : "#fff"};
    // border: 1px solid ${theme.palette.mode === "dark" ? grey[700] : grey[200]
    };
    border-radius: 12px;
    `
);

const TabsList = styled(BaseTabsList)(
  ({ theme }) => `
    max-width: 500px;
    // background-color: ${blue[500]};
    border-radius: 12px;
    margin-bottom: 16px;
    display: flex;
    align-items: center;
    justify-content: center;
    align-content: space-between;
    // box-shadow: 0px 4px 30px ${theme.palette.mode === "dark" ? grey[900] : grey[200]
    };
    `
);
export default CountriesMainContent;
