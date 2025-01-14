import React, { useEffect } from "react";
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
import enableIcon from "../../assets/img/country/enable.svg";
import editIcon from "../../assets/img/country/edit.svg";
import deleteIcon from "../../assets/img/country/delete.svg";
import Dialog from "@mui/material/Dialog";
import { Modal, Typography } from "@mui/material";
import Slide from "@mui/material/Slide";
import { useState } from "react";
import IconImage from "../../assets/img/country/iconImage.png";
import { useQuery, useQueryClient } from "react-query";
import axios from "axios";
import useAuth from "../../hook/useAuth";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const CountriesMainContent = () => {
  const queryClient = useQueryClient()
  // get filtered data from filter component
  const { filterCountry } = useAuth();
  const [isEnabled, setIsEnabled] = useState(null);
  const [filterMood, setFilterMood] = useState(false);
  // if filter country is not empty
  useEffect(() => {
    // console.log('test', filterCountry)
    setFilterMood(filterCountry.filterMood)
    setIsEnabled(filterCountry.isEnabled)
  }, [filterCountry])

  const [selectedRows, setSelectedRows] = useState([]);
  const [countryName, setCountryName] = useState("");
  const [countryCode, setCountryCode] = useState("");
  // console.log(selectedRows);
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const [selectedAction, setSelectedAction] = React.useState("");
  const handleClickOpen = (action) => {
    setSelectedAction(action);
    // console.log(action);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const [checked, setChecked] = useState(true);

  const handleChange = (isChecked) => {
    setChecked(isChecked);
  };
  const handleClearRows = () => {
    setSelectedRows([]);
  };

  const fetchCounties = async () => {
    const response = await fetch("https://api.quickt.com.au/api/countries", {
      headers: {
        Authorization: `${localStorage.getItem("jwt")}`,
      },
    });
    const data = await response.json();
    // return data.data
    if (data.data) {
      // console.log(data.data)
      return data.data;
    } else {
      return [];
      // throw new Error('Could not fetch users')
    }
  };
  const {
    isLoading: countriesLoading,
    error: countriesError,
    data: countries,
  } = useQuery("allCountry", fetchCounties);
  // Check if countries is an array before calling map
  const allCountry = Array.isArray(countries)
    ? countries?.map((item) => ({
      id: item.id,
      name: item.attributes?.name,
      code: item.attributes?.code,
      image: item.attributes?.icon,
      enabled: item.attributes?.enabled,
      createdAt: item.attributes?.createdAt.slice(0, 10)
    }))
    : [];
  // get only enabled countries
  const enabledCountries = Array.isArray(countries)
    ? countries
      ?.filter((item) => item.attributes?.enabled === true)
      .map((item) => ({
        id: item.id,
        name: item.attributes?.name,
        code: item.attributes?.code,
        image: item.attributes?.icon,
        enabled: item.attributes?.enabled,
        createdAt: item.attributes?.createdAt.slice(0, 10)
      }))
    : [];
  // get only disabled countries
  const disabledCountries = Array.isArray(countries)
    ? countries
      ?.filter((item) => {
        return item.attributes?.enabled === false;
      })
      .map((item) => ({
        id: item.id,
        name: item.attributes?.name,
        code: item.attributes?.code,
        image: item.attributes?.icon,
        enabled: item.attributes?.enabled,
        createdAt: item.attributes?.createdAt.slice(0, 10)
      }))
    : [];

  // console.log(allCountry)
  console.log(selectedRows)
  ////////////////////////////////////////////////////////////////////////
  //upload image and show preview
  ////////////////////////////////////////////////////////////////////////
  const [selectedImage, setSelectedImage] = useState(IconImage);
  const [strapiImage, setStrapiImage] = useState(null);
  // console.log(selectedImage);
  // console.log(strapiImage);
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
            // console.log("File uploaded successfully: ", response.data);
            // showSuccessAlert("Image uploaded successfully");
            // console.log(response.data[0].url);
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
  const handleCountryUpdate = () => {
    // if empty field
    if (countryName === "" || countryCode === "") {
      alert("Please fill all the fields");
      return;
    }
    const data = {
      "data": {
        "name": countryName,
        "code": countryCode,
        "icon": strapiImage
      },
    };

    // console.log(data);
    axios.put(`https://api.quickt.com.au/api/countries/${selectedRows[0]?.id}`, data, {
      headers: {
        Authorization: `${localStorage.getItem("jwt")}`,
      },
    })
      .then((response) => {
        // console.log(response);
        alert("Country updated successfully");
        handleClose();
      })
      .catch((error) => {
        alert("Someting went wrong");
        // console.log(error);
      });
  };
  // columns for data grid
  const columns = [
    { field: "id", headerName: "ID", width: 70 },
    {
      field: "name",
      headerName: "Country name",
      width: 130,
    },
    {
      field: "code",
      headerName: "Code",
      width: 130,
      renderCell: (params) => (
        <div style={{ display: "flex", alignItems: "center" }}>
          {params.row.code ? params.row.code : "Not available"}
        </div>
      ),
    },
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
            objectFit: 'cover'
          }}
          src={`https://api.quickt.com.au${params.row.image}`}
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
            backgroundColor: `${params.row.enabled == true ? "#DCFDD4" : "#FDD4D4"
              }`,
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
              {
                params.row.enabled == true ? <MenuItem onClick={() => handleClickOpen("disable")}>
                  <img
                    style={{ marginRight: "10px" }}
                    src={disableIcon}
                    alt="icon"
                  />
                  Disable
                </MenuItem> : <MenuItem onClick={() => handleClickOpen("enable")}>
                  <img
                    style={{ marginRight: "10px", width: '15px', height: '15px' }}
                    src={enableIcon}
                    alt="icon"
                  />
                  Enable
                </MenuItem>
              }

              <MenuItem onClick={() => handleClickOpen("edit")}>
                <img
                  style={{ marginRight: "10px" }}
                  src={editIcon}
                  alt="icon"
                />
                Edit
              </MenuItem>
              <MenuItem onClick={() => handleClickOpen("delete")}>
                <img
                  style={{ marginRight: "10px" }}
                  src={deleteIcon}
                  alt="icon"
                />
                Delete
              </MenuItem>
            </Menu>
          </div>
        );
      },
    },
  ];

  ////////////////////////////////////////////////////////////////
  //for delete the contries with multirow
  ////////////////////////////////////////////////////////////////
  const [deleteModalOpen, setDeleteModalOpen] = React.useState(false);
  const handleDeleteModalOpen = () => setDeleteModalOpen(true);
  const handleDeleteModalClose = () => setDeleteModalOpen(false);
  const deleteModalStyle = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 600,
    bgcolor: "background.paper",
    boxShadow: 24,
    borderRadius: "24px",
    p: 4,
  };

  const callDeleteApi = () => {
    const deletePromises = selectedRows.map((item) =>
      axios
        .delete(`https://api.quickt.com.au/api/countries/${item.id}`)
        .then((res) => console.log(res))
        .catch((error) => console.error(error))
    );

    // Wait for all delete promises to resolve or reject
    Promise.all(deletePromises)
      .then((results) => {
        // Handle the results if needed
        console.log(results);
        handleDeleteModalClose();
        queryClient.invalidateQueries("allCountry");
        handleClose();
      })
      .catch((error) => {
        // Handle errors from any of the delete requests
        console.error(error);
      });
  };

  ////////////////////////////////////////////////////////////////
  //for disable the countries with multirow
  ////////////////////////////////////////////////////////////////
  const [disableModalOpen, setDisableModalOpen] = React.useState(false);
  const handleDisableModalOpen = () => setDisableModalOpen(true);
  const handleDisableModalClose = () => setDisableModalOpen(false);
  const disableModalStyle = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 600,
    bgcolor: "background.paper",
    boxShadow: 24,
    borderRadius: "24px",
    p: 4,
  };

  const callDisableApi = () => {
    const disablePromises = selectedRows.map((item) =>
      axios
        .put(
          `https://api.quickt.com.au/api/countries/${item.id}`,
          {
            data: {
              enabled: false,
            },
          },
          {
            headers: {
              Authorization: `${localStorage.getItem("jwt")}`,
              // Add other headers if needed
            },
          }
        )
        .then((res) => console.log(res))
        .catch((error) => console.error(error))
    );

    // Wait for all disable promises to resolve or reject
    Promise.all(disablePromises)
      .then((results) => {
        // Handle the results if needed
        console.log(results);
        handleDeleteModalClose();
        queryClient.invalidateQueries("allCountry");
        handleClose();

      })
      .catch((error) => {
        // Handle errors from any of the disable requests
        console.error(error);
      });
  };
  const [enableModalOpen, setEnableModalOpen] = React.useState(false);
  const handleEnableModalOpen = () => setEnableModalOpen(true);
  const handleEnableModalClose = () => setEnableModalOpen(false);
  // handle enable api for multirow
  const callEnableApi = () => {
    const enablePromises = selectedRows.map((item) =>
      axios
        .put(
          `https://api.quickt.com.au/api/countries/${item.id}`,
          {
            data: {
              enabled: true,
            },
          },
          {
            headers: {
              Authorization: `${localStorage.getItem("jwt")}`,
              // Add other headers if needed
            },
          }
        )
        .then((res) => console.log(res))
        .catch((error) => console.error(error))
    );

    // Wait for all enable promises to resolve or reject
    Promise.all(enablePromises)
      .then((results) => {
        // Handle the results if needed
        console.log(results);
        handleEnableModalClose();
        queryClient.invalidateQueries("allCountry");
        handleClose();
      })
      .catch((error) => {
        // Handle errors from any of the enable requests
        console.error(error);
      });
  };

  return (
    <div className={styles.parent} style={{ position: "relative" }}>
      <Tabs defaultValue={1}>
        <TabsList>
          <Tab onClick={handleClearRows} value={1}>
            All- {countries?.length}
          </Tab>
          {
            filterMood !== true && <Tab value={2}>Enabled - {enabledCountries?.length}</Tab>
          }
          {
            filterMood !== true && <Tab value={3}>Disabled - {disabledCountries.length}</Tab>
          }

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
                handleEnableModalOpen();
              }}
              style={{
                padding: "12px 20px",
                width: "170px",
                border: "none",
                borderRadius: "20px",
                backgroundColor: "#DCFDD3",
                color: "#4FAC15",
                fontSize: "16px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
                gap: "15px",
              }}
            >
              Enable Countries
              {/* <img src={plusIcon} alt="icon" /> */}
            </button>

            {/* enable modal */}
            <Modal
              open={enableModalOpen}
              onClose={handleDisableModalClose}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
            >
              <Box sx={disableModalStyle}>
                <Typography id="" sx={{ fontSize: 30 }}>
                  Are you sure you want to enable those Countries?
                </Typography>
                <Button
                  variant="contained"
                  color="success"
                  onClick={() => {
                    callEnableApi();
                    setSelectedRows([]);
                  }}
                  style={{
                    padding: "10px 30px",
                    marginTop: "20px",
                  }}
                >
                  Confim
                </Button>
                <Button
                  variant="contained"
                  color="error"
                  onClick={handleDisableModalClose}
                  style={{
                    marginLeft: "20px",
                    padding: "10px 30px",
                    marginTop: "20px",
                  }}
                >
                  No
                </Button>
              </Box>
            </Modal>
            {/* disable */}
            <button
              onClick={() => {
                handleDisableModalOpen();
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
              Disable Countries
              {/* <img src={plusIcon} alt="icon" /> */}
            </button>

            {/* disable modal */}
            <Modal
              open={disableModalOpen}
              onClose={handleDisableModalClose}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
            >
              <Box sx={disableModalStyle}>
                <Typography id="" sx={{ fontSize: 30 }}>
                  Are you sure you want to disable those Countries?
                </Typography>
                <Button
                  variant="contained"
                  color="success"
                  onClick={() => {
                    callDisableApi();
                    setSelectedRows([]);
                  }}
                  style={{
                    padding: "10px 30px",
                    marginTop: "20px",
                  }}
                >
                  Yes
                </Button>
                <Button
                  variant="contained"
                  color="error"
                  onClick={handleDisableModalClose}
                  style={{
                    marginLeft: "20px",
                    padding: "10px 30px",
                    marginTop: "20px",
                  }}
                >
                  No
                </Button>
              </Box>
            </Modal>
            <button
              onClick={() => {
                handleDeleteModalOpen();
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
              Delete Countries
              {/* <img src={plusIcon} alt="icon" /> */}
            </button>
            {/* delete modal */}
            <Modal
              open={deleteModalOpen}
              onClose={handleDeleteModalClose}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
            >
              <Box sx={deleteModalStyle}>
                <Typography id="" sx={{ fontSize: 30 }}>
                  Are you sure you want to delete those Countries?
                </Typography>
                <Button
                  variant="contained"
                  color="success"
                  onClick={() => {
                    callDeleteApi();
                    setSelectedRows([]);
                  }}
                  style={{
                    padding: "10px 30px",
                    marginTop: "20px",
                  }}
                >
                  Yes
                </Button>
                <Button
                  variant="contained"
                  color="error"
                  onClick={handleDeleteModalClose}
                  style={{
                    marginLeft: "20px",
                    padding: "10px 30px",
                    marginTop: "20px",
                  }}
                >
                  No
                </Button>
              </Box>
            </Modal>
          </Box>
        )}
        {/* common component of tab countries */}
        {/* {
          filterMood == false && <>
           
          </>
        } */}


        {
          filterMood == true ? (
            <TabPanel value={1}>
              <div style={{ height: "auto", width: "100%" }}>
                <DataGrid
                  rows={allCountry.filter(item => item.enabled == isEnabled && item.createdAt >= filterCountry.from && item.createdAt <= filterCountry.to)}
                  columns={columns}
                  initialState={{
                    pagination: {
                      paginationModel: { page: 0, pageSize: 10 },
                    },
                  }}
                  noRowsOverlay={
                    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", height: "100%", width: "100%" }}>
                      <h1 style={{ fontSize: "30px", color: "#AC1616" }}>No data available</h1>
                    </div>
                  }
                  pageSizeOptions={[10, 20]}
                  checkboxSelection
                  onRowSelectionModelChange={(ids) => {
                    const selectedIDs = new Set(ids);
                    const selectedRowData = allCountry.filter((row) =>
                      selectedIDs.has(row.id)
                    );
                    setSelectedRows(selectedRowData);
                  }}
                />
              </div>
            </TabPanel>

          ) : <>
            {/* for enabled countries */}
            <TabPanel value={1}>
              <div style={{ height: "auto", width: "100%" }}>
                <DataGrid
                  rows={allCountry}
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
                    const selectedRowData = countries.filter((row) =>
                      // selectedIDs.has(row.id.toString())
                      selectedIDs.has(row.id)
                    );
                    setSelectedRows(selectedRowData);
                  }}
                />
              </div>
            </TabPanel>
            {/* for enabled countries */}
            <TabPanel value={2}>
              <DataGrid
                rows={enabledCountries}
                columns={columns}
                initialState={{
                  pagination: {
                    paginationModel: { page: 0, pageSize: 10 },
                  },
                }}
                pageSizeOptions={[10, 20]}
                checkboxSelection
                onRowSelectionModelChange={(ids) => {
                  const selectedIDs = new Set(ids);
                  const selectedRowData = enabledCountries.filter((row) =>
                    // selectedIDs.has(row.id.toString())
                    selectedIDs.has(row.id)
                  );
                  setSelectedRows(selectedRowData);
                }}
              />
            </TabPanel>
            {/* for enabled country */}
            <TabPanel value={3}>
              <DataGrid
                rows={disabledCountries}
                columns={columns}
                initialState={{
                  pagination: {
                    paginationModel: { page: 0, pageSize: 10 },
                  },
                }}
                pageSizeOptions={[10, 20]}
                checkboxSelection
                onRowSelectionModelChange={(ids) => {
                  const selectedIDs = new Set(ids);
                  const selectedRowData = disabledCountries.filter((row) =>
                    // selectedIDs.has(row.id.toString())
                    selectedIDs.has(row.id)
                  );
                  setSelectedRows(selectedRowData);
                }}
              />
            </TabPanel>

          </>
        }

      </Tabs>
      <Dialog
        maxWidth="md"
        fullWidth={selectedAction == "edit" ? true : false}
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
          {/* <IconButton
            style={{ position: "absolute", right: "5px", top: "5px" }}
            edge="start"
            color="inherit"
            onClick={handleClose}
            aria-label="close"
          >
            <CloseIcon />
          </IconButton> */}
          <Box sx={{ ml: 1 }}>
            {selectedAction === "disable" && (
              <Box>
                <h2>Are you sure you want to DISABLE this country?</h2>
                <Box sx={{ mt: 3 }}>
                  <Button
                    variant="contained"
                    color="error"
                    onClick={() => callDisableApi()}
                  >
                    Confim Disable
                  </Button>
                  <Button
                    variant="contained"
                    color="success"
                    sx={{ ml: 2 }}
                    onClick={handleClose}
                  >
                    Do not disable
                  </Button>
                </Box>
              </Box>
            )}
            {selectedAction === "enable" && (
              <Box>
                <h2>Are you sure you want to Enable this country?</h2>
                <Box sx={{ mt: 3 }}>
                  <Button
                    variant="contained"
                    color="success"
                    onClick={() => callEnableApi()}
                  >
                    Confim Enable
                  </Button>
                  <Button
                    variant="contained"
                    color="error"
                    sx={{ ml: 2 }}
                    onClick={handleClose}
                  >
                    cancel
                  </Button>
                </Box>
              </Box>
            )}
            {selectedAction === "edit" && (
              <Box sx={{ ml: 2 }}>
                <h2>Edit country</h2>
                <Box sx={{ mt: 3 }}>
                  <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                    <p className="generalSettings_SubTextHeading">Icon</p>
                    <img
                      src={selectedImage}
                      style={{
                        width: "270px",
                        height: "180px",
                        cursor: "pointer",
                        objectFit: 'cover'
                      }}
                      alt="icon"
                      onClick={handleImageClick}
                    />
                    <p className="generalSettings_SubTextHeading">
                      Country Name <span style={{ color: "red" }}>*</span>
                    </p>
                    <input
                      type="text"
                      placeholder="ex: United States of America"
                      onChange={(e) => setCountryName(e.target.value)}
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
                      Country Code <span style={{ color: "red" }}>*</span>
                    </p>

                    <input
                      type="text"
                      placeholder="ex: USA"
                      onChange={(e) => setCountryCode(e.currentTarget.value)}
                      style={{
                        padding: "16px 20px",
                        width: "100%",
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
                      onClick={() => handleCountryUpdate()}
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
                <h2>Are you sure you want to DELETE this country?</h2>
                <Box sx={{ mt: 3 }}>
                  <Button
                    variant="contained"
                    color="error"
                    onClick={() => callDeleteApi()}
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
