import React, { useState } from "react";
import { Box } from "@mui/system";
import styles from "../../assets/css/country.module.css";
import { styled } from "@mui/system";
import { Tabs } from "@mui/base/Tabs";
import { TabsList as BaseTabsList } from "@mui/base/TabsList";
import { TabPanel as BaseTabPanel } from "@mui/base/TabPanel";
import { buttonClasses } from "@mui/base/Button";
import { Tab as BaseTab, tabClasses } from "@mui/base/Tab";
import { DataGrid } from "@mui/x-data-grid";
import { useQuery } from "react-query";
import { Button, Modal, Typography } from "@mui/material";
import axios from "axios";
import { useQueryClient } from "react-query";
import useAuth from "../../hook/useAuth";
import { useEffect } from "react";

const ReceiversMainContent = () => {
  const queryClient = useQueryClient();
  const { filterReceiver } = useAuth();
  const [filterMood, setFilterMood] = useState(false);
  // if filter country is not empty
  useEffect(() => {
    // console.log('test', filterReceiver)
    setFilterMood(filterReceiver.filterMood);
  }, [filterReceiver]);
  const [selectedRows, setSelectedRows] = useState([]);
  const handleClearRows = () => {
    setSelectedRows([]);
  };

  const fetchesReceivers = async () => {
    const response = await fetch(
      "http://localhost:1337/api/saved-receivers?populate=*",
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("jwt")}`,
        },
      }
    );
    const data = await response.json();
    // return data.data
    console.log(data.data);
    if (data.data) {
      // console.log(data.data.data)
      return data.data;
    } else {
      return [];
      // throw new Error('Could not fetch users')
    }
  };
  const {
    isLoading: receiversLoading,
    error: receiversError,
    data: receivers,
  } = useQuery("allReceivers", fetchesReceivers);
  // Check if countries is an array before calling map
  console.log();
  const allReceivers = Array.isArray(receivers)
    ? receivers?.map((item) => ({
        id: item.id,
        firstName: item.attributes?.first_name,
        lastName: item.attributes?.last_name,
        phone: item.attributes?.phone,
        address: item.attributes?.street_address + " " + item.attributes?.city,
        details: {
          image:
            item.attributes?.users_permissions_user?.data?.attributes?.image, // Replace with the actual path or URL to the user's image
          name: item.attributes?.users_permissions_user?.data?.attributes
            ?.username,
        },
        createdAt: item.attributes?.createdAt.slice(0, 10),
      }))
    : [];

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
      field: "phone",
      headerName: "Phone",
      width: 150,
    },
    {
      field: "address",
      headerName: "Address",
      width: 200,
    },
    {
      field: "details",
      headerName: "Associated User",
      width: 200,
      renderCell: (params) => (
        <div style={{ display: "flex", alignItems: "center" }}>
          <img
            src={params.value.image ? `https://api.quickt.com.au${params.value.image}` : 
            "https://www.pngitem.com/pimgs/m/146-1468479_my-profile-icon-blank-profile-picture-circle-hd.png"
          } // Access the image property from the details object
            alt="User"
            style={{
              borderRadius: "50%",
              marginRight: "8px",
              width: "30px",
              height: "30px",
            }}
          />
          <div>
            <p style={{ marginTop: "20px" }}>{params.value.name ? params.value.name : 'None'}</p>
            <br />
            {/* Add other details as needed */}
          </div>
        </div>
      ),
    },
  ];

  ////////////////////////////////////////////////////////////////
  //for delete the transaction with multirow
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
        .delete(`http://localhost:1337/api/saved-receivers/${item.id}`)
        .then((res) => console.log(res))
        .catch((error) => console.error(error))
    );

    // Wait for all delete promises to resolve or reject
    Promise.all(deletePromises)
      .then((results) => {
        // Handle the results if needed
        console.log(results);
        handleDeleteModalClose();
        queryClient.invalidateQueries("allReceivers");
      })
      .catch((error) => {
        // Handle errors from any of the delete requests
        console.error(error);
      });
  };

  return (
    <div className={styles.parent} style={{ position: "relative" }}>
      <Tabs defaultValue={1}>
        <TabsList>
          <Tab value={1}>All - {allReceivers?.length}</Tab>
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
              Delete Receivers
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
                  Are you sure you want to delete those Receivers?
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
        
        {filterMood == true ? (
          <TabPanel value={1} onClick={handleClearRows}>
            <div style={{ height: "auto", width: "100%" }}>
              <DataGrid
                rows={allReceivers.filter(
                  (item) =>
                    item.createdAt >= filterReceiver.from &&
                    item.createdAt <= filterReceiver.to
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
                  const selectedRowData = allReceivers.filter((row) =>
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
            <TabPanel value={1} onClick={handleClearRows}>
              <div style={{ height: "auto", width: "100%" }}>
                <DataGrid
                  rows={allReceivers}
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
                    const selectedRowData = allReceivers.filter((row) =>
                      // selectedIDs.has(row.id.toString())
                      selectedIDs.has(row.id)
                    );
                    setSelectedRows(selectedRowData);
                  }}
                />
              </div>
            </TabPanel>
          </>
        )}
      </Tabs>
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
export default ReceiversMainContent;
