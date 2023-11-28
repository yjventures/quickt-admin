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
import Dialog from "@mui/material/Dialog";
import { useQuery, useQueryClient } from "react-query";
import editIcon from "../../assets/img/country/edit.svg";
import deleteIcon from "../../assets/img/country/delete.svg";
import ArrowIcon from "../../assets/img/country/arrow.svg";
import { Button, Menu, MenuItem, Modal, Typography } from "@mui/material";
import axios from "axios";
import Slide from "@mui/material/Slide";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import quickStyle from "../../assets/css/quickTransfer.module.css";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const TransactionMainContent = () => {
  const queryClient = useQueryClient()
  const [selectedRows, setSelectedRows] = useState([]);
  console.log(selectedRows);
  const [open, setOpen] = React.useState(false);
  const [selectedAction, setSelectedAction] = React.useState("");
  const handleClearRows = () => {
    setSelectedRows([]);
  };
  const handleClickOpen = (action) => {
    setSelectedAction(action);
    console.log(action);
    setOpen(true);
  };

  const handleOpen = () => setOpen(true);

  const handleClose = () => {
    setOpen(false);
  };

  const fetchesTransaction = async () => {
    const response = await fetch(
      "https://api.quickt.com.au/api/transactions?populate=*",
      {
        headers: {
          Authorization: `${localStorage.getItem("jwt")}`,
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
    isLoading: transactionLoading,
    error: transactionError,
    data: transactions,
  } = useQuery("allTransaction", fetchesTransaction);
  // Check if countries is an array before calling map
  const allTransaction = Array.isArray(transactions)
    ? transactions?.map((item) => ({
        id: item.attributes?.transfer?.data?.id,
        senders: {
          image:
            item.attributes?.users_permissions_user?.data?.attributes?.image, // Replace with the actual path or URL to the user's image
          name: item.attributes?.users_permissions_user?.data?.attributes
            ?.username,
        },
        receiverName: item.attributes?.receiver_name,
        phone: item.attributes?.users_permissions_user?.data?.attributes?.phone,
        BaseAmount: item.attributes?.transfer_amount,
        Totalamount: item.attributes?.amount_total,
        TransactionFees: item.attributes?.transfer_fees,
        Date: item.attributes?.transaction_date,
        Currency: item.attributes?.currency,
        // is payment complete from QuickT
        payoutStatus:
          item.attributes?.transfer?.data?.attributes?.payout_complete,
        transferStatus: item.attributes?.transfer?.data?.attributes?.status,
        transactionNumber: item.id,
      }))
    : [];
  const completeCountries = Array.isArray(transactions)
    ? transactions
        ?.filter(
          (item) =>
            item.attributes?.transfer?.data?.attributes?.payout_complete == true
        )
        .map((item) => ({
          id: item.attributes?.transfer?.data?.id,
          senders: {
            image:
              item.attributes?.users_permissions_user?.data?.attributes?.image, // Replace with the actual path or URL to the user's image
            name: item.attributes?.users_permissions_user?.data?.attributes
              ?.username,
          },
          receiverName: item.attributes?.receiver_name,
          phone:
            item.attributes?.users_permissions_user?.data?.attributes?.phone,
          BaseAmount: item.attributes?.transfer_amount,
          Totalamount: item.attributes?.amount_total,
          TransactionFees: item.attributes?.transfer_fees,
          Date: item.attributes?.transaction_date,
          Currency: item.attributes?.currency,
          // is payment complete from QuickT
          payoutStatus:
            item.attributes?.transfer?.data?.attributes?.payout_complete,
          transferStatus: item.attributes?.transfer?.data?.attributes?.status,
          transactionNumber: item.id,
        }))
    : [];
  // get only pending countries
  const pendingCountries = Array.isArray(transactions)
    ? transactions
        ?.filter((item) => {
          return (
            item.attributes?.transfer?.data?.attributes?.payout_complete ==
            false
          );
        })
        .map((item) => ({
          id: item.attributes?.transfer?.data?.id,
          senders: {
            image:
              item.attributes?.users_permissions_user?.data?.attributes?.image, // Replace with the actual path or URL to the user's image
            name: item.attributes?.users_permissions_user?.data?.attributes
              ?.username,
          },
          receiverName: item.attributes?.receiver_name,
          phone:
            item.attributes?.users_permissions_user?.data?.attributes?.phone,
          BaseAmount: item.attributes?.transfer_amount,
          Totalamount: item.attributes?.amount_total,
          TransactionFees: item.attributes?.transfer_fees,
          Date: item.attributes?.transaction_date,
          Currency: item.attributes?.currency,
          // is payment complete from QuickT
          payoutStatus:
            item.attributes?.transfer?.data?.attributes?.payout_complete,
          transferStatus: item.attributes?.transfer?.data?.attributes?.status,
          transactionNumber: item.id,
        }))
    : [];

  const columns = [
    {
      field: "id",
      headerName: "Transfer No",
      width: 100,
      renderCell: (params) => <p>QT-{params.row.transactionNumber}</p>,
    },
    {
      field: "senders",
      headerName: "Sender",
      width: 200,
      renderCell: (params) => (
        <div style={{ display: "flex", alignItems: "center" }}>
          <img
            src={params.value.image} // Access the image property from the details object
            alt="User"
            style={{
              borderRadius: "50%",
              marginRight: "8px",
              width: "30px",
              height: "30px",
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
      field: "phone",
      headerName: "Senders Phone",
      width: 130,
    },
    {
      field: "receiverName",
      headerName: "Receiver Name",
      width: 160,
    },
    {
      field: "BaseAmount",
      headerName: "Base Amount",
      width: 100,
    },
    {
      field: "Totalamount",
      headerName: "Total amount",
      width: 100,
    },
    {
      field: "TransactionFees",
      headerName: "Fees",
      width: 100,
    },
    {
      field: "Date",
      headerName: "Date",
      width: 100,
      renderCell: (params) => {
        const unixTimestamp = params.value * 1000; // Convert to milliseconds
        const localDate = new Date(unixTimestamp).toLocaleDateString();

        return <div>{localDate}</div>;
      },
    },

    {
      field: "payoutStatus",
      headerName: "Partner Payout Status",
      width: 200,
      sortable: false,
      renderCell: (params) => (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "25px",
            width: "80px",
            padding: "5px 10px",
            backgroundColor: (() => {
              switch (params.row.payoutStatus) {
                case true:
                  return "#DCFDD4";
                case false:
                  return "#FAFDD4";
                default:
                  return "#FAFDD4"; // Default color for unknown status
              }
            })(),
            borderRadius: "15px",
            color: (() => {
              switch (params.row.payoutStatus) {
                case true:
                  return "#4FAC16";
                case false:
                  return "#AC9D16";
                default:
                  return "#AC9D16"; // Default color for unknown status
              }
            })(),
            fontFamily: "Open Sans",
            fontSize: "14px",
            fontStyle: "normal",
          }}
        >
          {params.row.payoutStatus == true ? "Complete" : "Pending"}
        </div>
      ),
    },
    {
      field: "transferStatus",
      headerName: "Transfer Status",
      width: 130,
      sortable: false,
      renderCell: (params) => (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "25px",
            width: "75px",
            backgroundColor: (() => {
              switch (params.row.transferStatus) {
                case "complete":
                  return "#DCFDD4";
                case "pending":
                  return "#FAFDD4";
                default:
                  return "#FAFDD4"; // Default color for unknown status
              }
            })(),
            borderRadius: "15px",
            color: (() => {
              switch (params.row.transferStatus) {
                case "complete":
                  return "#4FAC16";
                case "pending":
                  return "#AC9D16";
                default:
                  return "#000000"; // Default color for unknown status
              }
            })(),
            fontFamily: "Open Sans",
            fontSize: "14px",
            fontStyle: "normal",
          }}
        >
          {(() => {
            switch (params.row.transferStatus) {
              case "complete":
                return "Complete";
              case "pending":
                return "Pending";
              default:
                return "Pending";
            }
          })()}
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
              <MenuItem onClick={() => handleClickOpen("edit")}>
                <img
                  style={{ marginRight: "10px" }}
                  src={editIcon}
                  alt="icon"
                />
                Update Status
              </MenuItem>
              <MenuItem onClick={() => handleClickOpen("flag")}>
                <img
                  style={{ marginRight: "10px" }}
                  src={deleteIcon}
                  alt="icon"
                />
                Flag
              </MenuItem>
            </Menu>
          </div>
        );
      },
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
        .delete(`https://api.quickt.com.au/api/transactions/${item.id}`)
        .then((res) => console.log(res))
        .catch((error) => console.error(error))
    );

    // Wait for all delete promises to resolve or reject
    Promise.all(deletePromises)
      .then((results) => {
        // Handle the results if needed
        console.log(results);
        handleDeleteModalClose();
        queryClient.invalidateQueries("allTransaction");
      })
      .catch((error) => {
        // Handle errors from any of the delete requests
        console.error(error);
      });
  };

  ////////////////////////////////////////////////////////////////
  //update integration with backend
  ////////////////////////////////////////////////////////////////
  const [transferStatus, setTransferStatus] = React.useState("true");

  const handleUpdateTransferStatus = () => {
    console.log("Transfer Status:", transferStatus);
    axios
      .put(`https://api.quickt.com.au/api/transfers/${selectedRows[0].id}`, {
        data: {
          payout_complete: transferStatus,
        },
      })
      .then((response) => {
        console.log(response, "res");
        queryClient.invalidateQueries("allTransaction");
        handleClose();
      })
      .catch((err) => {
        console.error(err.message);
      });
  };

  ////////////////////////////////////////////////////////////////////////
  //delete integration with backend
  ////////////////////////////////////////////////////////////////////////
  const handleDeleteTransaction = () => {
    axios
      .delete(
        `https://api.quickt.com.au/api/transactions/${selectedRows[0].id}`
      )
      .then((response) => {
        // console.log(response);
        queryClient.invalidateQueries("allTransaction");
        handleClose();
      })
      .catch((err) => {
        console.error(err.message);
      });
  };

  return (
    <div className={styles.parent} style={{ position: "relative" }}>
      <Tabs defaultValue={1}>
        <TabsList>
          <Tab value={1}>All - {allTransaction?.length}</Tab>
          <Tab value={2}>Complete - {completeCountries?.length}</Tab>
          <Tab value={3}>Pending - {pendingCountries?.length}</Tab>
        </TabsList>
        {/* {selectedRows.length > 1 && (
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
              Delete Transaction
            </button>
            <Modal
              open={deleteModalOpen}
              onClose={handleDeleteModalClose}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
            >
              <Box sx={deleteModalStyle}>
                <Typography id="" sx={{ fontSize: 30 }}>
                  Are you sure you want to delete those transaction?
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
        )} */}
        <TabPanel value={1} onClick={handleClearRows}>
          <div style={{ height: "auto", width: "100%" }}>
            <DataGrid
              rows={allTransaction}
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
                const selectedRowData = allTransaction.filter((row) =>
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
            rows={completeCountries}
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
              const selectedRowData = completeCountries.filter((row) =>
                // selectedIDs.has(row.id.toString())
                selectedIDs.has(row.id)
              );
              setSelectedRows(selectedRowData);
            }}
          />
        </TabPanel>
        <TabPanel value={3}>
          <DataGrid
            rows={pendingCountries}
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
              const selectedRowData = pendingCountries.filter((row) =>
                // selectedIDs.has(row.id.toString())
                selectedIDs.has(row.id)
              );
              setSelectedRows(selectedRowData);
            }}
          />
        </TabPanel>
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
            {selectedAction === "edit" && (
              <Box sx={{ ml: 2 }}>
                <h2 style={{ marginTop: "20px", marginBottom: "20px" }}>
                  Update Transfer Status
                </h2>
                <select
                  name="visibility"
                  className={quickStyle.textInput}
                  value={transferStatus}
                  onChange={(e) => {
                    setTransferStatus(e.target.value);
                  }}
                  style={{ marginBottom: "20px", marginTop: "20px" }}
                >
                  <option value="true">complete </option>
                  <option value="false">pending </option>
                </select>
                <Box sx={{ mt: 3, mb: 3 }}>
                  <Typography
                    id="modal-modal-description"
                    sx={{ mt: 2 }}
                  ></Typography>

                  <Box sx={{ mt: 3 }}>
                    <Button
                      variant="contained"
                      color="success"
                      onClick={handleUpdateTransferStatus}
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
            {selectedAction === "flag" && (
              <Box>
                <h2>Are you sure you want to FLAG this transaction?</h2>
                <Box sx={{ mt: 3 }}>
                  <Button
                    variant="contained"
                    color="error"
                    onClick={handleDeleteTransaction}
                  >
                    Confim Flag
                  </Button>
                  <Button
                    variant="contained"
                    color="success"
                    sx={{ ml: 2 }}
                    onClick={handleClose}
                  >
                    Cancel
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
export default TransactionMainContent;
