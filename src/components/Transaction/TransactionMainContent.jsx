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
import editIcon from "../../assets/img/country/edit.svg";
import deleteIcon from "../../assets/img/country/delete.svg";
import ArrowIcon from "../../assets/img/country/arrow.svg";
import { Menu, MenuItem } from "@mui/material";
const TransactionMainContent = () => {
  const [selectedRows, setSelectedRows] = useState([]);
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
  console.log();
  const allTransaction = Array.isArray(transactions)
    ? transactions?.map((item) => ({
        id: item.id,
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
        paymentStatus: item.attributes?.payment_status,
        transferStatus: item.attributes?.transfer?.data?.attributes?.status,
        TransferNumber: item.attributes?.receiver_number,
      }))
    : [];

  const columns = [
    { field: "id", headerName: "ID", width: 70 },
    {
      field: "senders",
      headerName: "Sender",
      width: 170,
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
      field: "receiverName",
      headerName: "Receiver Details",
      width: 130,
    },
    {
      field: "phone",
      headerName: "Phone",
      width: 150,
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
      headerName: "Transaction Fees",
      width: 100,
    },
    {
      field: "Date",
      headerName: "Date",
      width: 130,
    },
    {
      field: "Currency",
      headerName: "Currency",
      width: 70,
    },

    {
      field: "paymentStatus",
      headerName: "payment Status",
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
              switch (params.row.paymentStatus) {
                case "complete":
                  return "#DCFDD4";
                case "pending":
                  return "#FAFDD4";
                case "cancel":
                  return "#FDDCDC";
                default:
                  return "#FFFFFF"; // Default color for unknown status
              }
            })(),
            borderRadius: "15px",
            color: (() => {
              switch (params.row.paymentStatus) {
                case "complete":
                  return "#4FAC16";
                case "pending":
                  return "#AC9D16";
                case "cancel":
                  return "#FF0000"; // Red for canceled status
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
            switch (params.row.paymentStatus) {
              case "complete":
                return "Complete";
              case "pending":
                return "Pending";
              case "cancel":
                return "Cancel";
              default:
                return "Unknown";
            }
          })()}
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
                case "cancel":
                  return "#FDDCDC";
                default:
                  return "#FFFFFF"; // Default color for unknown status
              }
            })(),
            borderRadius: "15px",
            color: (() => {
              switch (params.row.transferStatus) {
                case "complete":
                  return "#4FAC16";
                case "pending":
                  return "#AC9D16";
                case "cancel":
                  return "#FF0000"; // Red for canceled status
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
              case "cancel":
                return "Cancel";
              default:
                return "Unknown";
            }
          })()}
        </div>
      ),
    },

    {
      field: "TransferNumber",
      headerName: "Transfer Number",
      width: 100,
    },
    {
      field: "action",
      headerName: "Action",
      width: 130,
      type: "number",
      renderCell: (params) => {
        const [anchorEl, setAnchorEl] = useState(null);

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

  return (
    <div className={styles.parent} style={{ position: "relative" }}>
      <Tabs defaultValue={1}>
        <TabsList>
          <Tab value={1}>All - {allTransaction?.length}</Tab>
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
              Disable Transactions
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
              Delete Transaction
              {/* <img src={plusIcon} alt="icon" /> */}
            </button>
          </Box>
        )}
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
export default TransactionMainContent;
