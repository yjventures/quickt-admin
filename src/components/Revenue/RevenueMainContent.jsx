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

const RevenueMainContent = () => {
  const columns = [
    { field: "id", headerName: "ID", width: 70 },
    {
      field: "TransferNumber",
      headerName: "Transfer Number",
      width: 130,
    },
    {
      field: "BaseAmount",
      headerName: "Base Amount",
      width: 130,
    },
    {
      field: "TransactionFees",
      headerName: "Transaction Fees",
      width: 150,
    },
    {
      field: "Totalamount",
      headerName: "Total amount",
      width: 200,
    },
    {
      field: "PartnerAmount",
      headerName: "Partner Amount",
      width: 200,
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
            backgroundColor: `${
              params.row.status == true ? "#DCFDD4" : "#FAFDD4"
            }`,
            borderRadius: "15px",
            // border: `${params.row.enabled == true ? '1px solid #007FFF' : '1px solid #FFA800'}`,
            color: `${params.row.status == true ? "#4FAC16" : "#AC9D16"}`,
            fontFamily: "Open Sans",
            fontSize: "14px",
            fontStyle: "normal",
          }}
        >
          {params.row.status == true ? "Paid" : "Pending"}
        </div>
      ),
    },
    {
      field: "paymentstatus",
      headerName: "Parter Payout Status",
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
            backgroundColor: `${
              params.row.paymentstatus == true ? "#DCFDD4" : "#FAFDD4"
            }`,
            borderRadius: "15px",
            // border: `${params.row.enabled == true ? '1px solid #007FFF' : '1px solid #FFA800'}`,
            color: `${
              params.row.paymentstatus == true ? "#4FAC16" : "#AC9D16"
            }`,
            fontFamily: "Open Sans",
            fontSize: "14px",
            fontStyle: "normal",
          }}
        >
          {params.row.paymentstatus == true ? "Paid" : "Pending"}
        </div>
      ),
    },
    {
      field: "action",
      headerName: "Action",
      width: 150,
      type: "number",
      sortable: false,
      filterable: false,
      disableColumnMenu: true,
      renderCell: (params) => (
        <select
          // onClick={() => alert('Show action popup')}
          style={{
            display: "flex",
            justifyContent: "space-around",
            flexDirection: "column",
            alignItems: "center",
            height: "25px",
            width: "75px",
            backgroundColor: "#fff",
            borderRadius: "15px",
            border: "1px solid #E9E9EA",
            color: "#1D1929",
            fontFamily: "Open Sans",
            fontSize: "14px",
            fontStyle: "normal",
          }}
        >
          <option value="view" selected>
            Action
          </option>
          <option
            value="edit"
            onClick={() => {
              alert("Edit");
            }}
          >
            Edit
          </option>
          <option
            value="delete"
            onClick={() => {
              alert("Delete");
            }}
          >
            Delete
          </option>
        </select>
      ),
    },
  ];

  const rows = [
    {
      id: 1,
      TransferNumber: 200,
      BaseAmount: 20,
      TransactionFees: 4,
      Totalamount: 204,
      PartnerAmount: 20,
      status: true,
      paymentstatus: true,
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
export default RevenueMainContent;
