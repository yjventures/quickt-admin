import React, { useState } from "react";
import { Box, textAlign } from "@mui/system";
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
import useAuth from "../../hook/useAuth";
import { useEffect } from "react";
import DoneIcon from '@mui/icons-material/Done';
import RevenueExport from "../ExportButton/RevenueExport";
import PrintButton from "../PrintButton/PrintButton";
import { RevenuePrint } from "../PrintButton/RevenuePrint";
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const RevenueMainContent = () => {
  const queryClient = useQueryClient();
  const { filterRevenue, filteredName } = useAuth();
  const [isWhish, setIsWhish] = useState(null);
  const [isPartner, setIsPartner] = useState(null);
  const [filterMood, setFilterMood] = useState(false);
  // if filter country is not empty
  useEffect(() => {
    // console.log('test', filterCountry)
    setFilterMood(filterRevenue.filterMood);
    setIsWhish(filterRevenue.isWhish);
    setIsPartner(filterRevenue.isPartner);
  }, [filterRevenue]);

  const [selectedRows, setSelectedRows] = useState([]);
  console.log(selectedRows);
  const [open, setOpen] = React.useState(false);
  const [selectedAction, setSelectedAction] = React.useState("");
  const handleClearRows = () => {
    setSelectedRows([]);
  };
  const handleClickOpen = (action) => {
    if (selectedRows.length > 1) {
      console.log('Multiple rows selected')
      alert('Please use header action to perform multiple action')
      return;
    };
    setSelectedAction(action);
    // console.log(action);
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
    isLoading: transactionLoading,
    error: transactionError,
    data: transactions,
  } = useQuery("allTransaction", fetchesTransaction);
  // Check if transactions is an array before calling map
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
      GatewayFees: item.attributes?.gateway_fees,
      WhishFees: item.attributes?.whish_fees,
      convertedAmount: item.attributes?.converted_amount,
      Date: item.attributes?.transaction_date,
      Currency: item.attributes?.currency,
      // is payment complete from QuickT
      payoutStatus:
        item.attributes?.transfer?.data?.attributes?.payout_complete,
      transferStatus: item.attributes?.transfer?.data?.attributes?.status,
      transactionNumber: item.attributes.payment_intent_id,
      createdAt: item.attributes?.createdAt.slice(0, 10),
      flag: item.attributes?.transfer?.data?.attributes?.flag,
    }))
    : [];
  const completeTransactions = Array.isArray(transactions)
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
        GatewayFees: item.attributes?.gateway_fees,
        WhishFees: item.attributes?.whish_fees,
        convertedAmount: item.attributes?.converted_amount,
        Date: item.attributes?.transaction_date,
        Currency: item.attributes?.currency,
        // is payment complete from QuickT
        payoutStatus:
          item.attributes?.transfer?.data?.attributes?.payout_complete,
        transferStatus: item.attributes?.transfer?.data?.attributes?.status,
        transactionNumber: item.attributes.payment_intent_id,
        createdAt: item.attributes?.createdAt.slice(0, 10),
        flag: item.attributes?.transfer?.data?.attributes?.flag,
      }))
    : [];
  // get only pending transactions
  const pendingTransactions = Array.isArray(transactions)
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
        GatewayFees: item.attributes?.gateway_fees,
        WhishFees: item.attributes?.whish_fees,
        convertedAmount: item.attributes?.converted_amount,
        Date: item.attributes?.transaction_date,
        Currency: item.attributes?.currency,
        // is payment complete from QuickT
        payoutStatus:
          item.attributes?.transfer?.data?.attributes?.payout_complete,
        transferStatus: item.attributes?.transfer?.data?.attributes?.status,
        transactionNumber: item.attributes.payment_intent_id,
        // partnerAmount is 1.005% of total amount
        partnerAmount: item.attributes?.amount_total * 0.01005,
        createdAt: item.attributes?.createdAt.slice(0, 10),
        // quicktAmount is total amount - (2.5% of partnerAmount)
        quicktAmount:
          parseFloat(item.attributes?.amount_total) -
          parseFloat(item.attributes?.amount_total) * 0.01005 * 0.025,
        // remaining amount is total amount - (partnerAmount + quicktAmount)
        remainingAmount:
          item.attributes?.amount_total -
          item.attributes?.amount_total * 0.01005 -
          (item.attributes?.amount_total -
            item.attributes?.amount_total * 0.01005 * 0.025),
        flag: item.attributes?.transfer?.data?.attributes?.flag,
      }))
    : [];
  // get only flaged transactions
  const flagedTransactions = Array.isArray(transactions)
    ? transactions
      ?.filter((item) => {
        return (
          item.attributes?.transfer?.data?.attributes?.flag == true
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
        GatewayFees: item.attributes?.gateway_fees,
        WhishFees: item.attributes?.whish_fees,
        convertedAmount: item.attributes?.converted_amount,
        Date: item.attributes?.transaction_date,
        Currency: item.attributes?.currency,
        // is payment complete from QuickT
        payoutStatus:
          item.attributes?.transfer?.data?.attributes?.payout_complete,
        transferStatus: item.attributes?.transfer?.data?.attributes?.status,
        transactionNumber: item.attributes.payment_intent_id,
        createdAt: item.attributes?.createdAt.slice(0, 10),
        flag: item.attributes?.transfer?.data?.attributes?.flag,
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
      field: "BaseAmount",
      headerName: "Base Amount",
      width: 120,
    },
    {
      field: "TransactionFees",
      headerName: "QuickT Fees",
      width: 130,
    },
    {
      field: "GatewayFees",
      headerName: "Gateway Fees",
      width: 130,
    },
    {
      field: "WhishFees",
      headerName: "Whish Fees",
      width: 130,
    },
    {
      field: "Totalamount",
      headerName: "Total Amount",
      width: 120,
    },
    {
      field: "transferStatus",
      headerName: "Whish Status",
      width: 140,
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
                return params.row.transferStatus;
            }
          })()}
        </div>
      ),
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
      field: "flag",
      headerName: "Flag Status",
      width: 100,
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
              switch (params.row.flag) {
                case true:
                  return "red";
                case false:
                  return "green";
                default:
                  return "#FAFDD4"; // Default color for unknown status
              }
            })(),
            borderRadius: "15px",
            color: 'white',
            fontSize: "14px",
            fontStyle: "normal",
          }}
        >
          {params.row.flag == true ? "Flagged" : "Safe"}
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
          event.stopPropagation();
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
                marginLeft: "-60px",
                boxShadow: "none",
              }}
            >
              <MenuItem onClick={(e) => {
                e.stopPropagation();
                handleClickOpen("edit")
                setSelectedRows([params.row]);
                handleClose();
              }}>
                <img
                  style={{ marginRight: "10px" }}
                  src={editIcon}
                  alt="icon"
                />
                Update Status
              </MenuItem>
              <MenuItem
                style={{ color: "red" }}
                onClick={(e) => {
                  e.stopPropagation();
                  handleClickOpen("flag")
                  setSelectedRows([params.row]);
                  handleClose();
                }}
              >
                <img
                  style={{ marginRight: "10px" }}
                  src={deleteIcon}
                  alt="icon"
                />
                Mark flag
              </MenuItem>
              <MenuItem
                style={{ color: "green" }}
                onClick={(e) => {
                  e.stopPropagation();
                  handleClickOpen("unflag")
                  setSelectedRows([params.row]);
                  handleClose();
                }}
              >
                <DoneIcon style={{ marginRight: "10px", color: 'blue', width: '16px' }} />
                Mark as safe
              </MenuItem>
            </Menu>
          </div>
        );
      },
    }
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

  // make status complete
  const handleUpdateTransferStatus = async () => {
    console.log("Transfer Status:", transferStatus);
    console.log("selectedRows:", selectedRows);

    try {
      // Use Promise.all to send all requests concurrently
      const updateRequests = selectedRows.map((row) =>
        axios.put(`https://api.quickt.com.au/api/transfers/${row.id}`, {
          data: {
            payout_complete: transferStatus,
          },
        }, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("jwt")}`,
          },
        })
      );

      const responses = await Promise.all(updateRequests);

      // Check if all responses are successful
      if (responses.every(response => response.status === 200)) {
        queryClient.invalidateQueries("allTransaction");
        handleClose();
        setSelectedRows([]);
      }

      // Create CSV data for the selected rows
      const csvData = selectedRows.map((row) => ({
        "Sender Name": row.senders.name,
        "Receiver Name": row.receiverName,
        "Transaction No": row.transactionNumber,
        "Base Amount": row.BaseAmount,
        "QuickT Fees": row.TransactionFees,
        "Gateway Fees": row.GatewayFees,
        "Whish Fees": row.WhishFees,
        "Total Amount": row.Totalamount,
        "Whish Status": row.transferStatus,
        "Partner Payout Status": row.payoutStatus ? 'true' : 'false',
        "Flag Status": row.flag ? 'true' : 'false',
        "Payout Print Date": new Date().toLocaleString('en-US')
      }));

      // Convert the CSV data to a string
      const csvContent = [
        [
          'Sender Name',
          'Receiver Name',
          'Transaction No',
          'Base Amount',
          'QuickT Fees',
          'Gateway Fees',
          'Whish Fees',
          'Total Amount',
          'Whish Status',
          'Partner Payout Status',
          'Flag Status',
          'Payout Print Date'
        ]
      ].concat(
        csvData.map(row => [
          row["Sender Name"],
          row["Receiver Name"],
          row["Transaction No"],
          row["Base Amount"],
          row["QuickT Fees"],
          row["Gateway Fees"],
          row["Whish Fees"],
          row["Total Amount"],
          row["Whish Status"],
          row["Partner Payout Status"],
          row["Flag Status"],
          row["Payout Print Date"]
        ])
      );

      const csvString = csvContent.map(row => row.join(',')).join('\n');

      // Create a Blob containing the CSV data
      const blob = new Blob([csvString], { type: 'text/csv;charset=utf-8;' });

      // Create a download link and trigger a click to download the file
      const link = document.createElement('a');
      const url = URL.createObjectURL(blob);
      link.href = url;
      link.setAttribute('download', 'payout_transactions.csv');
      document.body.appendChild(link);
      link.click();

      // Clean up
      document.body.removeChild(link);
      URL.revokeObjectURL(url);

    } catch (error) {
      console.error("Error updating transfer status:", error);
    }
  };

  // make status pending
  const handleRetriveTransferStatus = async () => {
    console.log("Transfer Status:", transferStatus);
    console.log("selectedRows:", selectedRows);

    try {
      // Use Promise.all to send all requests concurrently
      const updateRequests = selectedRows.map((row) =>
        axios.put(`https://api.quickt.com.au/api/transfers/${row.id}`, {
          data: {
            payout_complete: 'false',
          },
        }, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("jwt")}`,
          },
        })
      );

      const responses = await Promise.all(updateRequests);

      // Check if all responses are successful
      if (responses.every(response => response.status === 200)) {
        queryClient.invalidateQueries("allTransaction");
        handleClose();
        setSelectedRows([]);
      }

      // Create CSV data for the selected rows
      const csvData = selectedRows.map((row) => ({
        "Sender Name": row.senders.name,
        "Receiver Name": row.receiverName,
        "Transaction No": row.transactionNumber,
        "Base Amount": row.BaseAmount,
        "QuickT Fees": row.TransactionFees,
        "Gateway Fees": row.GatewayFees,
        "Whish Fees": row.WhishFees,
        "Total Amount": row.Totalamount,
        "Whish Status": row.transferStatus,
        "Partner Payout Status": row.payoutStatus ? 'true' : 'false',
        "Flag Status": row.flag ? 'true' : 'false',
        "Payout Print Date": new Date().toLocaleString('en-US')
      }));

      // Convert the CSV data to a string
      const csvContent = [
        [
          'Sender Name',
          'Receiver Name',
          'Transaction No',
          'Base Amount',
          'QuickT Fees',
          'Gateway Fees',
          'Whish Fees',
          'Total Amount',
          'Whish Status',
          'Partner Payout Status',
          'Flag Status',
          'Payout Print Date'
        ]
      ].concat(
        csvData.map(row => [
          row["Sender Name"],
          row["Receiver Name"],
          row["Transaction No"],
          row["Base Amount"],
          row["QuickT Fees"],
          row["Gateway Fees"],
          row["Whish Fees"],
          row["Total Amount"],
          row["Whish Status"],
          row["Partner Payout Status"],
          row["Flag Status"],
          row["Payout Print Date"]
        ])
      );

      const csvString = csvContent.map(row => row.join(',')).join('\n');

      // Create a Blob containing the CSV data
      const blob = new Blob([csvString], { type: 'text/csv;charset=utf-8;' });

      // Create a download link and trigger a click to download the file
      const link = document.createElement('a');
      const url = URL.createObjectURL(blob);
      link.href = url;
      link.setAttribute('download', 'retrived_transactions.csv');
      document.body.appendChild(link);
      link.click();

      // Clean up
      document.body.removeChild(link);
      URL.revokeObjectURL(url);

    } catch (error) {
      console.error("Error updating transfer status:", error);
    }
  };

  ////////////////////////////////////////////////////////////////////////
  //delete integration with backend
  ////////////////////////////////////////////////////////////////////////
  const handleFlagTransaction = async () => {
    const response = await axios.put(
      `https://api.quickt.com.au/api/transfers/${selectedRows[0].id}`,
      {
        data: {
          flag: true,
        },
      },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("jwt")}`,
        }
      })

    if (response.status === 200) {
      queryClient.invalidateQueries("allTransaction");
      handleClose();
      setSelectedRows([]);
    }
  };

  const handleUnflagTransaction = async () => {
    const response = await axios.put(
      `https://api.quickt.com.au/api/transfers/${selectedRows[0].id}`,
      {
        data: {
          flag: false,
        },
      },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("jwt")}`,
        }
      })

    if (response.status === 200) {
      queryClient.invalidateQueries("allTransaction");
      handleClose();
      setSelectedRows([]);
    }
  };

  const result = allTransaction.filter((item) => {
    // console.log("Item transferStatus:", item.transferStatus); // Check the case of "pending"
    // console.log("Expected isPartner:", isPartner);

    return (
      item.transferStatus === isPartner &&
      item.payoutStatus === isWhish &&
      item.createdAt >= filterRevenue.from &&
      item.createdAt <= filterRevenue.to
    );
  });

  // console.log(result);

  return (
    <div className={styles.parent} style={{ position: "relative" }}>
      <Box sx={{ display: "flex", alignItems: "center", position: 'absolute', right: '0', top: '-60px' }}>
        <RevenueExport allData={allTransaction} completedData={completeTransactions} pendingData={pendingTransactions} flaggedData={flagedTransactions} />
        <span style={{ marginLeft: "10px" }}></span>
        {/* <PrintButton data={allTransaction} /> */}
        <RevenuePrint allData={allTransaction} completedData={completeTransactions} pendingData={pendingTransactions} flaggedData={flagedTransactions} />
        <span style={{ marginLeft: "10px" }}></span>
      </Box>
      <Tabs defaultValue={1}>
        <TabsList>
          <Tab value={1}>All - {allTransaction?.length}</Tab>

          {filterMood !== true && (
            <Tab value={2}>COMPLETE - {completeTransactions?.length}</Tab>
          )}
          {filterMood !== true && (
            <Tab value={3}>PENDING - {pendingTransactions.length}</Tab>
          )}
          {filterMood !== true && (
            <Tab value={4} >FLAGGED - {flagedTransactions.length}</Tab>
          )}
        </TabsList>

        <Box
          sx={{
            display: "flex",
            gap: 1,
            position: "absolute",
            top: "-60px",
            right: "235px",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-around",
              alignItems: "center",
              height: "40px",
              width: "300px",
              cursor: "pointer",
              backgroundColor: "#fff",
              borderRadius: "15px",
              border: "1px solid #E9E9EA",
              color: "#1D1929",
              fontFamily: "Open Sans",
              fontSize: "14px",
              fontStyle: "normal",
              padding: "0 10px",
            }}
          >
            <p>Total selected: {selectedRows.length}</p> |
            <p>
              Total amount:
              {/* {selectedRows.reduce((a, b) => a + b.Totalamount * 0.01005, 0)} */}
              {selectedRows.reduce((a, b) => a + b.GatewayFees, 0)}
            </p>
          </div>
          <button
            onClick={() => {
              setTransferStatus("true")
              handleUpdateTransferStatus();
            }}
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "40px",
              width: "150px",
              cursor: selectedRows.length === 0 ? "not-allowed" : "pointer",
              backgroundColor: selectedRows.length === 0 ? "#E9E9EA" : "#fff",
              color: selectedRows.length === 0 ? "#ccc" : "#1D1929",
              borderRadius: "15px",
              border: "1px solid #E9E9EA",
              fontSize: "14px",
              fontStyle: "normal",
            }}
            disabled={selectedRows.length === 0}
          >
            Payout complete
          </button>

          <button
            onClick={() => {
              setTransferStatus("true")
              handleRetriveTransferStatus();
            }}
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "40px",
              width: "150px",
              cursor: selectedRows.length === 0 ? "not-allowed" : "pointer",
              backgroundColor: selectedRows.length === 0 ? "#E9E9EA" : "#fff",
              color: selectedRows.length === 0 ? "#ccc" : "#1D1929",
              borderRadius: "15px",
              border: "1px solid #E9E9EA",
              fontSize: "14px",
              fontStyle: "normal",
            }}
            disabled={selectedRows.length === 0}
          >
            Payout retrive
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

        {filterMood == true ? (
          <TabPanel value={1} onClick={handleClearRows}>
            <div style={{ height: "auto", width: "100%" }}>
              <DataGrid
                rows={allTransaction.filter(
                  (item) =>
                    item.transferStatus === isPartner &&
                    item.payoutStatus === isWhish &&
                    item.createdAt >= filterRevenue.from &&
                    item.createdAt <= filterRevenue.to
                )}
                columns={columns}
                initialState={{
                  pagination: {
                    paginationModel: { page: 0, pageSize: 10 },
                  },
                }}
                pageSizeOptions={[10, 20]}
                checkboxSelection disableRowSelectionOnClick
                // by default seleted row is first row
                onRowSelectionModelChange={(ids) => {
                  const selectedIDs = new Set(ids);
                  console.log(selectedIDs);
                  const selectedRowData = allTransaction.filter((row) =>
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
                  rows={
                    filteredName === ''
                      ? allTransaction
                      : allTransaction.filter(sender => sender.firstName.includes(filteredName))
                  }
                  columns={columns}
                  initialState={{
                    pagination: {
                      paginationModel: { page: 0, pageSize: 10 },
                    },
                  }}
                  pageSizeOptions={[10, 20]}
                  checkboxSelection disableRowSelectionOnClick
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
                rows={
                  filteredName === ''
                    ? completeTransactions
                    : completeTransactions.filter(sender => sender.firstName.includes(filteredName))
                }
                columns={columns}
                initialState={{
                  pagination: {
                    paginationModel: { page: 0, pageSize: 10 },
                  },
                }}
                pageSizeOptions={[10, 20]}
                checkboxSelection disableRowSelectionOnClick
                onRowSelectionModelChange={(ids) => {
                  const selectedIDs = new Set(ids);
                  console.log(selectedIDs);

                  const selectedRowData = completeTransactions.filter((row) =>
                    // selectedIDs.has(row.id.toString())
                    selectedIDs.has(row.id)
                  );
                  setSelectedRows(selectedRowData);
                }}
              />
            </TabPanel>
            <TabPanel value={3}>
              <DataGrid
                rows={
                  filteredName === ''
                    ? pendingTransactions
                    : pendingTransactions.filter(sender => sender.firstName.includes(filteredName))
                }
                columns={columns}
                initialState={{
                  pagination: {
                    paginationModel: { page: 0, pageSize: 10 },
                  },
                }}
                pageSizeOptions={[10, 20]}
                checkboxSelection disableRowSelectionOnClick
                onRowSelectionModelChange={(ids) => {
                  const selectedIDs = new Set(ids);
                  console.log(selectedIDs);
                  const selectedRowData = pendingTransactions.filter((row) =>
                    // selectedIDs.has(row.id.toString())
                    selectedIDs.has(row.id)
                  );
                  setSelectedRows(selectedRowData);
                }}
              />
            </TabPanel>
            <TabPanel value={4}>
              <DataGrid
                rows={
                  filteredName === ''
                    ? flagedTransactions
                    : flagedTransactions.filter(sender => sender.firstName.includes(filteredName))
                }
                columns={columns}
                initialState={{
                  pagination: {
                    paginationModel: { page: 0, pageSize: 10 },
                  },
                }}
                pageSizeOptions={[10, 20]}
                checkboxSelection disableRowSelectionOnClick
                onRowSelectionModelChange={(ids) => {
                  const selectedIDs = new Set(ids);
                  console.log(selectedIDs);
                  const selectedRowData = flagedTransactions.filter((row) =>
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
        fullWidth={true}
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
                  <option value="true">Complete </option>
                  <option value="false">Pending </option>
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
                      onClick={() => {
                        handleUpdateTransferStatus()
                        handleClose()
                      }}
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
              <Box style={{
                textAlign: "center",
              }}>
                <p style={{
                  fontSize: "1.5rem",
                }}>ARE YOU SURE YOU WANT TO <span style={{
                  fontWeight: 'bold'
                }}>FLAG</span> THIS TRANSACTION?</p>
                <Box sx={{ mt: 3 }}>
                  <Button
                    variant="contained"
                    color="error"
                    onClick={handleFlagTransaction}
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
            {selectedAction === "unflag" && (
              <Box
                style={{
                  textAlign: "center",
                }}
              >
                <p style={{
                  fontSize: "1.5rem",
                }}>ARE YOU SURE YOU WANT TO <span style={{
                  fontWeight: 'bold'
                }}>UNFLAG</span> THIS TRANSACTION?</p>
                <Box sx={{ mt: 3 }}>
                  <Button
                    variant="contained"
                    color="success"
                    onClick={handleUnflagTransaction}
                  >
                    unflag
                  </Button>
                  <Button
                    variant="contained"
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
export default RevenueMainContent;
