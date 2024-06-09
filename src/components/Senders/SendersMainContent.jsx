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
import { Button, Menu, MenuItem, Modal, Typography } from "@mui/material";
import ArrowIcon from "../../assets/img/country/arrow.svg";
import disableIcon from "../../assets/img/country/disable.svg";
import avatarDemo from "../../assets/img/senders/avatarDemo.png";
import editIcon from "../../assets/img/country/edit.svg";
import deleteIcon from "../../assets/img/country/delete.svg";
import Dialog from "@mui/material/Dialog";
import Slide from "@mui/material/Slide";
import { useState } from "react";
import { useQuery } from "react-query";
import enableIcon from "../../assets/img/country/enable.svg";
import axios from "axios";
import { useEffect } from "react";
import { useQueryClient } from "react-query";
import useAuth from "../../hook/useAuth";
import ExportButton from "../ExportButton/ExportButton";
import PrintButton from "../PrintButton/PrintButton";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});
const SendersMainContent = () => {
  const queryClient = useQueryClient();

  const { filterSender } = useAuth();
  const [isStatus, setIsStatus] = useState(null);
  const [isKyc, setIsKyc] = useState(null);
  const [filterMood, setFilterMood] = useState(false);
  const [firstClick, setFirstClick] = useState(false);

  useEffect(() => {
    // console.log('test', filterCountry)
    setFilterMood(filterSender.filterMood);
    setIsStatus(filterSender.isStatus);
    setIsKyc(filterSender.isKyc);
  }, [filterSender]);
  ////////////////////////////////////////////////////////////////
  //for focusing image
  ////////////////////////////////////////////////////////////////

  const [isProfileFullSize, setIsProfileFullSize] = useState(false);

  const toggleProfileFullSize = () => {
    setIsProfileFullSize(!isProfileFullSize);
  };
  const [isFrontFullSize, setIsFrontFullSize] = useState(false);

  const toggleFrontFullSize = () => {
    setIsFrontFullSize(!isFrontFullSize);
  };

  const [isBackFullSize, setIsBackFullSize] = useState(false);

  const toggleBackFullSize = () => {
    setIsBackFullSize(!isBackFullSize);
  };
  ////////////////////////////////////////////////////////////////////////
  //action buttons
  ////////////////////////////////////////////////////////////////////////
  const [selectedRows, setSelectedRows] = useState([]);
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const [selectedAction, setSelectedAction] = React.useState("");
  const handleClickOpen = (action) => {
    setSelectedAction(action);
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
  ////////////////////////////////////////////////////////////////////////
  //fatches the senders info from the server
  ////////////////////////////////////////////////////////////////////////
  const fetchesSender = async () => {
    const response = await fetch("https://api.quickt.com.au/api/users", {
      headers: {
        Authorization: `${localStorage.getItem("jwt")}`,
      },
    });
    const data = await response.json();
    // console.log(data);
    // return data.data
    if (data) {
      // console.log(data.data.data)
      return data;
    } else {
      return [];
      // throw new Error('Could not fetch users')
    }
  };
  const {
    isLoading: sendersLoading,
    error: sendersError,
    data: senders,
  } = useQuery("allSenders", fetchesSender);

  const allSenders = Array.isArray(senders)
    ? senders?.map((item) => ({
      id: item.id,
      firstName: item.first_name,
      lastName: item.last_name,
      email: item.email,
      phone: item.phone,
      DOB: item.dob,
      kyc: item.kyc_approved,
      status: item.blocked,
      createdAt: item.createdAt.slice(0, 10),
    }))
    : [];

  ////////////////////////////////////////////////////////////////
  //for only status enabled list
  ////////////////////////////////////////////////////////////////////////
  const enabledSender = Array.isArray(senders)
    ? senders
      ?.filter((item) => item.blocked == false)
      .map((item) => ({
        id: item.id,
        firstName: item.first_name,
        lastName: item.last_name,
        email: item.email,
        phone: item.phone,
        DOB: item.dob,
        kyc: item.kyc_approved,
        status: item.blocked,
        createdAt: item.createdAt.slice(0, 10),
      }))
    : [];

  ////////////////////////////////////////////////////////////////
  //for only status enabled list
  ////////////////////////////////////////////////////////////////////////
  const disabledSender = Array.isArray(senders)
    ? senders
      ?.filter((item) => item.blocked === true)
      .map((item) => ({
        id: item.id,
        firstName: item.first_name,
        lastName: item.last_name,
        email: item.email,
        phone: item.phone,
        DOB: item.dob,
        kyc: item.kyc_approved,
        status: item.blocked,
        createdAt: item.createdAt.slice(0, 10),
      }))
    : [];

  // for only kyc pending list
  ////////////////////////////////////////////////////////////////////////
  const pendingKycSender = Array.isArray(senders)
    ? senders
      ?.filter((item) => item.kyc_approved === false)
      .map((item) => ({
        id: item.id,
        firstName: item.first_name,
        lastName: item.last_name,
        email: item.email,
        phone: item.phone,
        DOB: item.dob,
        kyc: item.kyc_approved,
        status: item.blocked,
        createdAt: item.createdAt.slice(0, 10),
      }))
    : [];


  // console.log(allSenders);
  const columns = [
    { field: "id", headerName: "ID", width: 70 },
    {
      field: "firstName",
      headerName: "First Name",
      width: 130,
    },
    {
      field: "lastName",
      headerName: "Last Name",
      width: 130,
    },
    {
      field: "email",
      headerName: "Email",
      width: 150,
    },
    {
      field: "phone",
      headerName: "Phone",
      width: 130,
    },
    {
      field: "DOB",
      headerName: "DOB",
      width: 150,
    },
    {
      field: "kyc",
      headerName: "KYC",
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
            backgroundColor: `${params.row.kyc == true ? "#DCFDD4" : "#FDD4D4"
              }`,
            borderRadius: "15px",
            // border: `${params.row.enabled == true ? '1px solid #007FFF' : '1px solid #FFA800'}`,
            color: `${params.row.kyc == true ? "#4FAC16" : "#AC1616"}`,
            fontFamily: "Open Sans",
            fontSize: "14px",
            fontStyle: "normal",
          }}
        >
          {params.row.kyc == true ? "Approved" : "Pending"}
        </div>
      ),
    },
    {
      field: "status",
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
            backgroundColor: `${params.row.status == true ? "#FDD4D4" : "#DCFDD4"
              }`,
            color: `${params.row.status == true ? "#AC1616" : "#4FAC16"}`,
            borderRadius: "15px",
            // border: `${params.row.enabled == true ? '1px solid #007FFF' : '1px solid #FFA800'}`,
            fontFamily: "Open Sans",
            fontSize: "14px",
            fontStyle: "normal",
          }}
        >
          {params.row.status == false ? "Enabled" : "Disabled"}
        </div>
      ),
    },
    {
      field: "KYC",
      headerName: "KYC",
      // description: 'This column has a value getter and is not sortable.',
      // sortable: false,
      width: 160,
      // disable sorting
      sortable: false,
      renderCell: (params) => (
        <MenuItem
          // disabled={selectedRows.length >= 1 ? true : false}
          onClick={() => {
            setFirstClick(true)
            console.log(selectedRows)

            if (selectedRows.length >= 1) {
              alert("Please select only one sender to view KYC details")
              return
            }
            handleClickOpen("edit")

          }} >
          <img
            style={{ marginRight: "10px" }}
            src={editIcon}
            alt="icon"
          />
          View KYC
        </MenuItem>
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
              {params.row.status == true ? (
                <MenuItem onClick={() => {

                  handleClickOpen("enable")
                }}>
                  <img
                    style={{
                      marginRight: "10px",
                      width: "15px",
                      height: "15px",
                    }}
                    src={enableIcon}
                    alt="icon"
                  />
                  Enable
                </MenuItem>
              ) : (
                <MenuItem onClick={() => handleClickOpen("disable")}>
                  <img
                    style={{ marginRight: "10px" }}
                    src={disableIcon}
                    alt="icon"
                  />
                  Disable
                </MenuItem>
              )}
              {/* <MenuItem onClick={() => handleClickOpen("edit")}>
                <img
                  style={{ marginRight: "10px" }}
                  src={editIcon}
                  alt="icon"
                />
                View KYC
              </MenuItem> */}
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
  //for delete the senders with multirow
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
        .delete(`https://api.quickt.com.au/api/users/${item.id}`)
        .then((res) => console.log(res))
        .catch((error) => console.error(error))
    );

    Promise.all(deletePromises)
      .then((results) => {
        console.log(results);
        handleDeleteModalClose();
        queryClient.invalidateQueries("allSenders");
        // close the modal
        handleClose();
      })
      .catch((error) => {
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
          `https://api.quickt.com.au/api/users/${item.id}`,
          {
            blocked: true,
          },
          {
            headers: {
              Authorization: `${localStorage.getItem("jwt")}`,
              // Add other headers if needed
            },
          }
        )
        .then((res) => console.log(res))
        .catch((error) => console.error(error.response))
    );

    // Wait for all disable promises to resolve or reject
    Promise.all(disablePromises)
      .then((results) => {
        // Handle the results if needed
        console.log(results);
        handleDeleteModalClose();
        queryClient.invalidateQueries("allSenders");
        handleClose();
      })
      .catch((error) => {
        // Handle errors from any of the disable requests
        console.error(error);
      });
  };

  ////////////////////////////////////////////////////////////////
  //for Enable the sender with multirow
  ////////////////////////////////////////////////////////////////
  const [enableModalOpen, setEnableModalOpen] = React.useState(false);
  const handleEnableModalOpen = () => setEnableModalOpen(true);
  const handleEnableModalClose = () => setEnableModalOpen(false);
  const enableModalStyle = {
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
  const callEnableApi = () => {
    const disablePromises = selectedRows.map((item) =>
      axios
        .put(
          `https://api.quickt.com.au/api/users/${item.id}`,
          {
            blocked: false,
          },
          {
            headers: {
              Authorization: `${localStorage.getItem("jwt")}`,
              // Add other headers if needed
            },
          }
        )
        .then((res) => console.log(res))
        .catch((error) => console.error(error.response))
    );

    // Wait for all disable promises to resolve or reject
    Promise.all(disablePromises)
      .then((results) => {
        // Handle the results if needed
        console.log(results);
        handleDeleteModalClose();
        queryClient.invalidateQueries("allSenders");
        handleClose();
      })
      .catch((error) => {
        // Handle errors from any of the disable requests
        console.error(error);
      });
  };

  ////////////////////////////////
  //fetching kyc value
  ////////////////////////////////
  const [fetchKyc, setFetchKyc] = useState(null);

  useEffect(() => {
    console.log(selectedRows)
    console.log(selectedRows.length)
    // if(selectedRows.length < 1){

    // }
    console.log(firstClick)
    axios
      .get(
        `https://api.quickt.com.au/api/users/${selectedRows[selectedRows.length - 1]?.id}?populate=*`,
        {
          headers: {
            Authorization: `${localStorage.getItem("jwt")}`,
          },
        }
      )
      .then((res) => {
        console.log(res.data);
        // console.log(res.data.image);
        setFetchKyc(res.data);
      });
  }, [selectedRows]);

  //approve kyc
  const approveKyc = () => {
    axios
      .put(`https://api.quickt.com.au/api/users/${selectedRows[0]?.id}`, {
        kyc_approved: true,
      })
      .then((res) => {
        // console.log(res)
        queryClient.invalidateQueries("allSenders");
        handleClose();
      });
  };

  //approve kyc
  const declineKyc = () => {
    axios
      .put(`https://api.quickt.com.au/api/users/${selectedRows[0]?.id}`, {
        kyc_approved: false,
      })
      .then((res) => {
        // console.log(res)
        queryClient.invalidateQueries("allSenders");
        handleClose(false);
      });
  };

  // console.log("isEnabled:", isStatus);
  // console.log("isKyc:", isKyc);
  // console.log("fromDate:", filterSender.from);
  // console.log("toDate:", filterSender.to);

  // console.log(
  //   "Status values in allSenders:",
  //   allSenders.map((item) => item.status)
  // );
  // console.log(
  //   "Filtered Senders:",
  //   allSenders.filter(
  //     (item) =>
  //       item.kyc === isKyc &&
  //       item.createdAt >= filterSender.from &&
  //       item.createdAt <= filterSender.to
  //   )
  // );
  return (
    <div className={styles.parent} style={{ position: "relative" }}>
      <Box sx={{ display: "flex", alignItems: "center", position: 'absolute', right: '0', top: '-55px' }}>
          <ExportButton data={senders} />
          <span style={{ marginLeft: "10px" }}></span>
          <PrintButton data={senders} />
          <span style={{ marginLeft: "10px" }}></span>
          {/* <CreateNewButton text={"sender"} /> */}
        </Box>
      <Tabs defaultValue={1}>
        <TabsList>
          <Tab value={1} onClick={handleClearRows}>
            All - {senders?.length}
          </Tab>
          {filterMood !== true && (
            <Tab value={2}>Enabled - {enabledSender?.length}</Tab>
          )}
          {filterMood !== true && (
            <Tab value={3}>Disabled - {disabledSender.length}</Tab>
          )}
          {filterMood !== true && (
            <Tab value={4}>Pending KYC- {pendingKycSender.length}</Tab>
          )}
          {/* <Tab value={2}>Enabled - {enabledSender?.length}</Tab>
          <Tab value={3}>Disabled - {disabledSender?.length}</Tab> */}
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
              Enable Senders
              {/* <img src={plusIcon} alt="icon" /> */}
            </button>
            <Modal
              open={enableModalOpen}
              onClose={handleEnableModalClose}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
            >
              <Box sx={enableModalStyle}>
                <Typography id="" sx={{ fontSize: 30 }}>
                  Are you sure you want to enable those senders?
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
                  Yes
                </Button>
                <Button
                  variant="contained"
                  color="error"
                  onClick={handleEnableModalClose}
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
              Disable Senders
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
                  Are you sure you want to disable those senders?
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
              Delete senders
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
                  Are you sure you want to delete those senders?
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

        {filterMood === true ? (
          <TabPanel value={1}>
            <div style={{ height: "auto", width: "100%" }}>
              <DataGrid
                rows={allSenders.filter(
                  (item) =>
                    item.status == isStatus &&
                    item.kyc == isKyc &&
                    item.createdAt >= filterSender.from &&
                    item.createdAt <= filterSender.to
                )}
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
                  const selectedRowData = allSenders.filter((row) =>
                    // selectedIDs.has(row.id.toString())
                    selectedIDs.has(row.id)
                  );
                  setSelectedRows(selectedRowData);
                }}
              />
            </div>
          </TabPanel>
        ) : (
          <>
            <TabPanel value={1}>
              <div style={{ height: "auto", width: "100%" }}>
                <DataGrid
                  rows={allSenders}
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
                    const selectedRowData = allSenders.filter((row) =>
                      // selectedIDs.has(row.id.toString())
                      selectedIDs.has(row.id)
                    );
                    setSelectedRows(selectedRowData);
                  }}
                />
              </div>
            </TabPanel>
            <TabPanel value={2}>
              <DataGrid
                rows={enabledSender}
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
                  const selectedRowData = enabledSender.filter((row) =>
                    // selectedIDs.has(row.id.toString())
                    selectedIDs.has(row.id)
                  );
                  setSelectedRows(selectedRowData);
                }}
              />
            </TabPanel>
            <TabPanel value={3}>
              <DataGrid
                rows={disabledSender}
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
                  const selectedRowData = disabledSender.filter((row) =>
                    // selectedIDs.has(row.id.toString())
                    selectedIDs.has(row.id)
                  );
                  setSelectedRows(selectedRowData);
                }}
              />
            </TabPanel>
            <TabPanel value={4}>
              <DataGrid
                rows={pendingKycSender}
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
                  const selectedRowData = pendingKycSender.filter((row) =>
                    // selectedIDs.has(row.id.toString())
                    selectedIDs.has(row.id)
                  );
                  setSelectedRows(selectedRowData);
                }}
              />
            </TabPanel>
          </>
        )}
      </Tabs>
      <Dialog
        maxWidth="md"
        fullWidth={selectedAction === "edit" ? true : false}
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
                <h2>Are you sure you want to DISABLE this user?</h2>
                <Box sx={{ mt: 3 }}>
                  <Button
                    variant="contained"
                    color="error"
                    onClick={() => callDisableApi()}
                  >
                    Confirm Disable
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
                <h2>Are you sure you want to Enable this?</h2>
                <Box sx={{ mt: 3 }}>
                  <Button
                    variant="contained"
                    color="error"
                    onClick={() => callEnableApi()}
                  >
                    Confirm Enable
                  </Button>
                  <Button
                    variant="contained"
                    color="success"
                    sx={{ ml: 2 }}
                    onClick={handleClose}
                  >
                    Do not Enable
                  </Button>
                </Box>
              </Box>
            )}
            {selectedAction === "edit" && (
              <Box sx={{ ml: 2 }}>
                <h2>View KYC</h2>
                {fetchKyc && (
                  <>
                    <div
                      style={{ display: "flex", justifyContent: "spce-around" }}
                    >
                      <div style={{ marginTop: "30px" }}>
                        <p
                          style={{
                            fontSize: "20px",
                            fontWeight: "500",
                            color: "#2F80ED",
                            marginLeft: "20px",
                          }}
                        >
                          Personal Details
                        </p>
                        <div
                          style={{
                            display: "flex",
                            gap: "20px",
                            marginTop: "10px",
                          }}
                        >
                          <div style={{ position: "relative" }}>
                            <img
                              src={
                                fetchKyc?.image ?
                                  `https://api.quickt.com.au` + fetchKyc?.image :
                                  avatarDemo
                              }
                              alt="icon"
                              style={{
                                height: "298px",
                                width: "255px",
                                borderRadius: "24px",
                                objectFit: 'cover'
                              }}
                            />
                            <div
                              style={{
                                position: "absolute",
                                width: "70%",
                                bottom: "40px",
                                padding: "12px 20px",
                                backgroundColor: "rgba(255, 255, 255, 0.80)",
                                borderRadius: "50px",
                                left: "40px",
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                              }}
                            >
                              <div>
                                <p
                                  style={{
                                    fontSize: "15px",
                                    fontWeight: "500",
                                    color: "#000",
                                  }}
                                >
                                  Verification Photo
                                </p>
                              </div>
                            </div>
                          </div>
                          <div style={{ paddingTop: "20px" }}>
                            <p
                              style={{
                                fontSize: "15px",
                                fontWeight: "600",
                                marginBottom: "8px",
                              }}
                            >
                              Name
                            </p>
                            <p
                              style={{
                                fontSize: "18px",
                                fontWeight: "500",
                                marginBottom: "20px",
                              }}
                            >
                              {fetchKyc?.username}
                            </p>
                            <p
                              style={{
                                fontSize: "15px",
                                fontWeight: "600",
                                marginBottom: "8px",
                              }}
                            >
                              Date of Birth
                            </p>
                            <p
                              style={{
                                fontSize: "18px",
                                fontWeight: "500",
                                marginBottom: "20px",
                              }}
                            >
                              {fetchKyc?.dob}
                            </p>
                            <p
                              style={{
                                fontSize: "15px",
                                fontWeight: "600",
                                marginBottom: "8px",
                              }}
                            >
                              Nationality
                            </p>
                            <p
                              style={{
                                fontSize: "18px",
                                fontWeight: "500",
                                marginBottom: "20px",
                              }}
                            >
                              {fetchKyc?.kyc?.country}
                            </p>
                          </div>
                        </div>
                        <div style={{ display: "flex", padding: "20px" }}>
                          <div>
                            <p
                              style={{
                                fontSize: "20px",
                                fontWeight: "500",
                                color: "#2F80ED",
                                marginBottom: "10px",
                              }}
                            >
                              Address
                            </p>
                            <p
                              style={{
                                fontSize: "15px",
                                fontWeight: "600",
                                marginBottom: "8px",
                              }}
                            >
                              Address Line
                            </p>
                            <p
                              style={{
                                fontSize: "18px",
                                fontWeight: "500",
                                marginBottom: "20px",
                              }}
                            >
                              {fetchKyc?.kyc?.street_address}
                            </p>
                            <p
                              style={{
                                fontSize: "15px",
                                fontWeight: "600",
                                marginBottom: "8px",
                              }}
                            >
                              City
                            </p>
                            <p
                              style={{
                                fontSize: "18px",
                                fontWeight: "500",
                                marginBottom: "20px",
                              }}
                            >
                              {fetchKyc?.kyc?.city}
                            </p>
                            <p
                              style={{
                                fontSize: "15px",
                                fontWeight: "600",
                                marginBottom: "8px",
                              }}
                            >
                              State
                            </p>
                            <p
                              style={{
                                fontSize: "18px",
                                fontWeight: "500",
                                marginBottom: "20px",
                              }}
                            >
                              {fetchKyc?.kyc?.city}
                            </p>
                            <p
                              style={{
                                fontSize: "15px",
                                fontWeight: "600",
                                marginBottom: "8px",
                              }}
                            >
                              Country
                            </p>
                            <p
                              style={{
                                fontSize: "18px",
                                fontWeight: "500",
                                marginBottom: "20px",
                              }}
                            >
                              {fetchKyc?.kyc?.country}
                            </p>
                          </div>
                          <div style={{ paddingLeft: "70px" }}>
                            <p
                              style={{
                                fontSize: "20px",
                                fontWeight: "500",
                                color: "#2F80ED",
                                marginBottom: "10px",
                              }}
                            >
                              Contact Details
                            </p>
                            <p
                              style={{
                                fontSize: "15px",
                                fontWeight: "600",
                                marginBottom: "8px",
                              }}
                            >
                              Phone Number
                            </p>
                            <p
                              style={{
                                fontSize: "18px",
                                fontWeight: "500",
                                marginBottom: "20px",
                              }}
                            >
                              {fetchKyc?.phone}
                            </p>
                            <p
                              style={{
                                fontSize: "15px",
                                fontWeight: "600",
                                marginBottom: "8px",
                              }}
                            >
                              Email
                            </p>
                            <p
                              style={{
                                fontSize: "18px",
                                fontWeight: "500",
                                marginBottom: "20px",
                              }}
                            >
                              {fetchKyc?.email}
                            </p>
                          </div>
                        </div>
                      </div>
                      <div style={{ marginTop: "30px", marginRight: "10px" }}>
                        <p
                          style={{
                            fontSize: "20px",
                            fontWeight: "500",
                            color: "#2F80ED",
                            marginTop: "-5px",
                            marginBottom: "10px",
                          }}
                        >
                          Submitted Documents
                        </p>
                        <div style={{ position: "relative" }}>
                          <img
                            src={
                              fetchKyc?.kyc?.id_front ?
                              `https://api.quickt.com.au` +
                              fetchKyc?.kyc?.id_front : avatarDemo
                            }
                            alt="icon"
                            style={{
                              height: isFrontFullSize ? "100%" : "286px",
                              width: isFrontFullSize ? "100%" : "350px",
                              borderRadius: "24px",
                              marginBottom: "20px",
                              cursor: "pointer",
                              objectFit: 'cover'

                            }}
                            onClick={toggleFrontFullSize}
                          />
                          {isFrontFullSize && (
                            <div
                              style={{
                                position: "fixed",
                                top: 0,
                                left: 0,
                                width: "100%",
                                height: "100%",
                                backgroundColor: "rgba(0, 0, 0, 0.8)",
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                                zIndex: 9999,
                              }}
                              onClick={toggleFrontFullSize}
                            >
                              <img
                                src={
                                  fetchKyc?.kyc?.id_front ?
                                  `https://api.quickt.com.au` +
                                  fetchKyc?.kyc?.id_front : avatarDemo
                                }
                                alt="icon"
                                style={{
                                  maxHeight: "90%",
                                  maxWidth: "90%",
                                  borderRadius: "24px",
                                  objectFit: 'cover'
                                }}
                              />
                            </div>
                          )}
                          <div
                            style={{
                              position: "absolute",
                              width: "90%",
                              bottom: "40px",
                              padding: "12px 20px",
                              backgroundColor: "rgba(255, 255, 255, 0.80)",
                              borderRadius: "30px",
                              left: "18px",
                              display: "flex",
                              justifyContent: "space-between",
                              alignItems: "center",
                            }}
                          >
                            <div>
                              <p
                                style={{
                                  fontSize: "15px",
                                  fontWeight: "500",
                                  color: "#000",
                                }}
                              >
                                ID Front
                              </p>
                            </div>
                            <div>
                              <p
                                style={{
                                  backgroundColor: "rgba(255, 255, 255, 0.80)",
                                  border: "1px solid black",
                                  borderRadius: "16px",
                                  padding: "4px 14px",
                                  cursor: "pointer",
                                }}
                                onClick={toggleFrontFullSize}
                              >
                                view
                              </p>
                            </div>
                          </div>
                        </div>
                        <div style={{ position: "relative" }}>
                          <img
                            src={
                              fetchKyc?.kyc?.id_back ?
                              `https://api.quickt.com.au` +
                              fetchKyc?.kyc?.id_back : avatarDemo
                            }
                            alt="icon"
                            style={{
                              height: isBackFullSize ? "100%" : "286px",
                              width: isBackFullSize ? "100%" : "350px",
                              borderRadius: "24px",
                              marginBottom: "20px",
                              cursor: "pointer",
                              objectFit: 'cover'
                            }}
                            onClick={toggleBackFullSize}
                          />
                          {isBackFullSize && (
                            <div
                              style={{
                                position: "fixed",
                                top: 0,
                                left: 0,
                                width: "100%",
                                height: "100%",
                                backgroundColor: "rgba(0, 0, 0, 0.8)",
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                                zIndex: 9999,
                              }}
                              onClick={toggleBackFullSize}
                            >
                              <img
                                src={
                                  fetchKyc?.kyc?.id_back ?
                                  `https://api.quickt.com.au` +
                                  fetchKyc?.kyc?.id_back : avatarDemo
                                }
                                alt="icon"
                                style={{
                                  maxHeight: "90%",
                                  maxWidth: "90%",
                                  borderRadius: "24px",
                                  objectFit: 'cover'
                                }}
                              />
                            </div>
                          )}
                          <div
                            style={{
                              position: "absolute",
                              width: "90%",
                              bottom: "40px",
                              padding: "12px 20px",
                              backgroundColor: "rgba(255, 255, 255, 0.80)",
                              borderRadius: "30px",
                              left: "18px",
                              display: "flex",
                              justifyContent: "space-between",
                              alignItems: "center",
                            }}
                          >
                            <div>
                              <p
                                style={{
                                  fontSize: "15px",
                                  fontWeight: "500",
                                  color: "#000",
                                }}
                              >
                                ID Back
                              </p>
                            </div>
                            <div>
                              <p
                                style={{
                                  backgroundColor: "rgba(255, 255, 255, 0.80)",
                                  border: "1px solid black",
                                  borderRadius: "16px",
                                  padding: "4px 14px",
                                  cursor: "pointer",
                                }}
                                onClick={toggleBackFullSize}
                              >
                                view
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div>
                      <button
                        style={{
                          padding: "16px 36px",
                          borderRadius: "16px",
                          cursor: "pointer",
                          border: "none",
                          color: "white",
                          backgroundColor: "#003CFF",
                          marginLeft: "16px",
                          marginRight: "16px",
                        }}
                        onClick={() => approveKyc()}
                      >
                        Approve KYC
                      </button>
                      <button
                        style={{
                          padding: "16px 56px",
                          borderRadius: "16px",
                          cursor: "pointer",
                          border: "none",
                          color: "white",
                          backgroundColor: "#A7A7A7",
                        }}
                        onClick={declineKyc}
                      >
                        Deny KYC
                      </button>
                    </div>
                  </>
                )}
              </Box>
            )}
            {selectedAction === "delete" && (
              <Box>
                <h2>Are you sure you want to DELETE this?</h2>
                <Box sx={{ mt: 3 }}>
                  <Button
                    variant="contained"
                    color="error"
                    onClick={() => callDeleteApi()}
                  >
                    Confirm delete
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
    max-width: 600px;
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
export default SendersMainContent;
