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

const ReceiversMainContent = () => {
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
            <p style={{marginTop: "20px"}}>{params.value.name}</p>
            <br />
            {/* Add other details as needed */}
          </div>
        </div>
      ),
    },
  ];

  const rows = [
    {
      id: 1,
      firstName: "ahad ",
      lastName: "chowdhury",
      email: "ahadalichowdhury@gmail.com",
      phone: "01700000000",
      address: "15/17, syedpur house, shahi EidGah, Sylhet",
      details: {
        image:
          "data:image/jpeg;base64,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", // Replace with the actual path or URL to the user's image
        name: "ahad chowdhury",
      },
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
export default ReceiversMainContent;
