import React from "react";
import "./generalSettingsContent.css";
import imageTemplate from "../../assets/img/generalSettings/imageIcon.png";
import styles from "../../assets/css/country.module.css";
import { styled } from "@mui/system";
import { Tabs } from "@mui/base/Tabs";
import { TabsList as BaseTabsList } from "@mui/base/TabsList";
import { TabPanel as BaseTabPanel } from "@mui/base/TabPanel";
import { buttonClasses } from "@mui/base/Button";
import { Tab as BaseTab, tabClasses } from "@mui/base/Tab";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";

const GeneralSettingsMainContent = () => {
  const [box, setBox] = React.useState("");

  const handleChange = (event) => {
    setBox(event.target.value);
  };

  return (
    <div className={styles.parent}>
      <Tabs defaultValue={1}>
        <TabsList>
          <Tab value={1}>Basic</Tab>
          <Tab value={2}>Quick Transfers</Tab>
        </TabsList>
        <TabPanel value={1}>
          <div style={{ height: "auto", width: "100%" }}>
            <p className="generalSettings_TextHeading">
              Custom ammount Transfer Percentage
            </p>
            <div className="generalSettings_CustomAmmount">
              <input type="text" placeholder="Enter percentage" />
              <button>Update</button>
            </div>

            <div className="generalSettings_MainBanner">
              <p className="generalSettings_TextHeading">Main Banner info</p>
              <p className="generalSettings_SubTextHeading">Title</p>
              <input type="text" placeholder="Enter title" />
              <p className="generalSettings_SubTextHeading">Description</p>
              <textarea
                placeholder="Enter description"
                rows={6}
                cols={10}
              ></textarea>
              <button>Update</button>
            </div>

            <div className="generalSettings_MainBanner">
              <div className="generalSettings_serviceBox">
                <div>
                  <p className="generalSettings_TextHeading">
                    Service box info
                  </p>
                </div>
                <div style={{ width: "200px" }}>
                  <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">
                      Select Box No
                    </InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      value={box}
                      label="Select Box No"
                      onChange={handleChange}
                    >
                      <MenuItem value={10}>Box 1</MenuItem>
                      <MenuItem value={20}>Box 2</MenuItem>
                      <MenuItem value={30}>Box 3</MenuItem>
                    </Select>
                  </FormControl>
                </div>
              </div>
              <p className="generalSettings_SubTextHeading">Title</p>
              <input
                type="text"
                placeholder="Enter title here (We recommend title length less than 10)"
              />
              <div className="generalSettings_MainServices">
                <div>
                  <p className="generalSettings_SubTextHeading">Icon</p>
                  <img
                    src={imageTemplate}
                    style={{ width: "283px", height: "193px" }}
                    alt=""
                  />
                </div>
                <div>
                  <p className="generalSettings_SubTextHeading">Description</p>
                  <textarea
                    placeholder="Enter description"
                    rows={6}
                    cols={60}
                  ></textarea>
                </div>
              </div>
              <button>Update Service Box 1</button>
            </div>
          </div>
        </TabPanel>
        <TabPanel value={2}>quick transfer page</TabPanel>
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
export default GeneralSettingsMainContent;
