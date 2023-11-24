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
import { Button, Menu, MenuItem } from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import ArrowIcon from "../../assets/img/country/arrow.svg";
import disableIcon from "../../assets/img/country/disable.svg";
import editIcon from "../../assets/img/country/edit.svg";
import deleteIcon from "../../assets/img/country/delete.svg";
import Dialog from "@mui/material/Dialog";
import ListItemText from "@mui/material/ListItemText";
import ListItem from "@mui/material/ListItem";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import CloseIcon from "@mui/icons-material/Close";
import Slide from "@mui/material/Slide";
import { useState } from "react";
import Switch from "react-switch";
import IconImage from "../../assets/img/country/iconImage.png";
import plusIcon from "../../assets/img/generalSettings/plus.svg";
import axios from "axios";
import { useQuery } from "react-query";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const PartnersMainContent = () => {
  const [open, setOpen] = React.useState(false);
  const [selectedRows, setSelectedRows] = useState([]);
  const handleClearRows = () => {
    setSelectedRows([]);
  };
  const handleOpen = () => setOpen(true);
  const [selectedAction, setSelectedAction] = React.useState("");
  const handleClickOpen = (action) => {
    setSelectedAction(action);
    console.log(action);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const [checked, setChecked] = useState(true);

  const handleChange = (isChecked) => {
    setChecked(isChecked);
  };

  const [selectedImage, setSelectedImage] = useState(IconImage);
  const [strapiImage, setStrapiImage] = useState("");
  const handleImageClick = () => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "image/*";
    input.onchange = (e) => {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onload = (event) => {
        setSelectedImage(event.target.result);

        const formData = new FormData();
        formData.append("files", file);

        axios
          .post("https://api.quickt.com.au/api/upload", formData)
          .then((response) => {
            console.log("File uploaded successfully: ", response.data);
            // showSuccessAlert("Image uploaded successfully");
            console.log(response.data[0].url);
            setStrapiImage(response.data[0].url);
          })
          .catch((error) => {
            console.error("Error uploading file: ", error.message);
          });
      };
      reader.readAsDataURL(file);
    };
    input.click();
  };

  const fetchePartners = async () => {
    const response = await fetch(
      "https://api.quickt.com.au/api/partners?populate=*"
      // {
      //   headers: {
      //     Authorization: `Bearer ${localStorage.getItem("jwt")}`,
      //   },
      // }
    );
    const data = await response.json();
    console.log("partners", data.data);
    if (data) {
      return data?.data;
    } else {
      return [];
    }
  };

  const {
    isLoading: partnersLoading,
    error: partnersError,
    data: partners,
  } = useQuery("allPartners", fetchePartners);

  const allPartners = Array.isArray(partners)
    ? partners?.map((item) => ({
        id: item.id,
        name: item.attributes?.name,
        image: item.attributes?.image,
        location: item.attributes?.location,
        percentage: item.attributes?.partner_percentage,
        details: {
          image:
            item.attributes?.users_permissions_users?.data[0]?.attributes
              ?.image,
          name: item.attributes?.users_permissions_users?.data[0]?.attributes
            ?.username,
        },
      }))
    : [];
  console.log(allPartners, "allPartners");

  const columns = [
    { field: "id", headerName: "ID", width: 40 },
    {
      field: "name",
      headerName: "Name",
      width: 200,
    },

    {
      field: "image",
      headerName: "Image",
      width: 90,
      sortable: false,
      filterable: false,
      disableColumnMenu: true,

      renderCell: (params) => (
        <img
          style={{
            marginRight: "8px",
            width: "35px",
            height: "35px",
          }}
          src={`${params.row.image}`}
        />
      ),
    },
    {
      field: "location",
      headerName: "Location",
      width: 200,
    },
    {
      field: "percentage",
      headerName: "Percentage sharing",
      width: 150,
    },
    {
      field: "details",
      headerName: "Associated User",
      width: 200,
      renderCell: (params) => (
        <div style={{ display: "flex", alignItems: "center" }}>
          <img
            src={params.value.image} // Access the image property from the details object
            alt="User"
            style={{
              borderRadius: "50%",
              marginRight: "8px",
              width: "35px",
              height: "35px",
            }}
          />
          <div>
            <p style={{ marginTop: "20px" }}>{params.value.name}</p>
            <br />
            {/* Add other details as needed */}
          </div>
        </div>
      ),
    },
    {
      field: "action",
      headerName: "Action",
      width: 150,
      type: "number",
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
                background: "transparent",
                border: "1px solid #999",
                borderRadius: "25px",
                outline: "none",
                cursor: "pointer",
                width: "100px",
                fontSize: "12px",
                color: "#000",
                fontFamily: "Open Sans",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                padding: "5px 10px",
              }}
              onClick={handleClick}
            >
              Action
              <img src={ArrowIcon} alt="icon" style={{ marginLeft: "10px" }} />
            </div>
            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleClose}
              style={{
                marginLeft: "-20px",
                boxShadow: "none",
              }}
            >
              <MenuItem onClick={() => handleClickOpen("delete")}>
                <img
                  style={{ marginRight: "10px" }}
                  src={deleteIcon}
                  alt="icon"
                />
                Remove
              </MenuItem>
              <MenuItem onClick={() => handleClickOpen("edit")}>
                <img
                  style={{ marginRight: "10px" }}
                  src={editIcon}
                  alt="icon"
                />
                Update
              </MenuItem>
            </Menu>
          </div>
        );
      },
    },
  ];

  return (
    <div className={styles.parent} style={{ position: "relative" }}>
      <Tabs defaultValue={1}>
        <TabsList>
          <Tab value={1}>All - {allPartners?.length}</Tab>
        </TabsList>
        {selectedRows.length > 1 && (
          <Box
            sx={{
              display: "flex",
              gap: 1,
              position: "absolute",
              top: "15px",
              right: "35px",
            }}
          >
            <button
              onClick={() => {
                alert("Call disable api here");
                setSelectedRows([]);
              }}
              style={{
                padding: "12px 20px",
                width: "170px",
                border: "none",
                borderRadius: "20px",
                backgroundColor: "#FDD4D4",
                color: "#AC1616",
                fontSize: "16px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
                gap: "15px",
              }}
            >
              Disable Partners
              {/* <img src={plusIcon} alt="icon" /> */}
            </button>
            <button
              onClick={() => {
                alert("Call delete api here");
                setSelectedRows([]);
              }}
              style={{
                padding: "12px 20px",
                width: "170px",
                border: "none",
                borderRadius: "20px",
                backgroundColor: "#BE3144",
                color: "#fff",
                fontSize: "16px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
                gap: "15px",
              }}
            >
              Delete Partners
              {/* <img src={plusIcon} alt="icon" /> */}
            </button>
          </Box>
        )}
        <TabPanel value={1} onClick={handleClearRows}>
          <div style={{ height: "auto", width: "100%" }}>
            <DataGrid
              rows={allPartners}
              columns={columns}
              initialState={{
                pagination: {
                  paginationModel: { page: 0, pageSize: 10 },
                },
              }}
              pageSizeOptions={[10, 20]}
              checkboxSelection
              // by default seleted row is first row
              onRowSelectionModelChange={(ids) => {
                const selectedIDs = new Set(ids);
                const selectedRowData = allPartners.filter((row) =>
                  // selectedIDs.has(row.id.toString())
                  selectedIDs.has(row.id)
                );
                setSelectedRows(selectedRowData);
              }}
            />
          </div>
        </TabPanel>
      </Tabs>
      <Dialog
        maxWidth="md"
        fullWidth
        open={open}
        onClose={handleClose}
        TransitionComponent={Transition}
      >
        <Box
          style={{
            height: "100%",
            padding: "10px",
          }}
        >
          <IconButton
            style={{ position: "absolute", right: "5px", top: "5px" }}
            edge="start"
            color="inherit"
            onClick={handleClose}
            aria-label="close"
          >
            <CloseIcon />
          </IconButton>
          <Box sx={{ ml: 1 }}>
            {selectedAction === "edit" && (
              <Box sx={{ ml: 2 }}>
                <h2>Update Partner Details</h2>
                <Box sx={{ mt: 3 }}>
                  <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                    <p className="generalSettings_SubTextHeading">Image</p>
                    <img
                      src={selectedImage}
                      style={{
                        width: "270px",
                        height: "180px",
                        cursor: "pointer",
                      }}
                      alt=""
                      onClick={handleImageClick}
                    />
                    <p className="generalSettings_SubTextHeading">
                      Partner Name <span style={{ color: "red" }}>*</span>
                    </p>
                    <input
                      type="text"
                      placeholder="Enter the Partner Name"
                      style={{
                        padding: "16px 20px",
                        width: "100%",
                        fontSize: "20px",
                        borderRadius: "16px",
                        border: "1px solid #E9E9EA",
                        outline: "none",
                      }}
                    />

                    <p className="generalSettings_SubTextHeading">
                      Partner Location <span style={{ color: "red" }}>*</span>
                    </p>

                    <input
                      type="text"
                      placeholder="ex: USA"
                      style={{
                        padding: "16px 20px",
                        width: "100%",
                        fontSize: "20px",
                        borderRadius: "16px",
                        border: "1px solid #E9E9EA",
                        outline: "none",
                      }}
                    />
                    <p className="generalSettings_SubTextHeading">
                      Percentage <span style={{ color: "red" }}>*</span>
                    </p>

                    <input
                      type="text"
                      placeholder="Percentage"
                      style={{
                        padding: "16px 20px",
                        width: "50%",
                        fontSize: "20px",
                        borderRadius: "16px",
                        border: "1px solid #E9E9EA",
                        outline: "none",
                      }}
                    />
                  </Typography>
                  <Box sx={{ mt: 3 }}>
                    <Button
                      variant="contained"
                      color="success"
                      onClick={() => alert("Call edit api here")}
                    >
                      Confim Update
                    </Button>
                    <Button
                      variant="outlined"
                      sx={{ ml: 2 }}
                      onClick={handleClose}
                    >
                      Cancel
                    </Button>
                  </Box>
                </Box>
              </Box>
            )}
            {selectedAction === "delete" && (
              <Box>
                <h2>Are you sure you want to DELETE this Partner?</h2>
                <Box sx={{ mt: 3 }}>
                  <Button
                    variant="contained"
                    color="error"
                    onClick={() => alert("Call disbale api here")}
                  >
                    Confim delete
                  </Button>
                  <Button
                    variant="contained"
                    color="success"
                    sx={{ ml: 2 }}
                    onClick={handleClose}
                  >
                    Do not delete
                  </Button>
                </Box>
              </Box>
            )}
          </Box>
        </Box>
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
    // border: 1px solid ${
      theme.palette.mode === "dark" ? grey[700] : grey[200]
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
    // box-shadow: 0px 4px 30px ${
      theme.palette.mode === "dark" ? grey[900] : grey[200]
    };
    `
);
export default PartnersMainContent;
