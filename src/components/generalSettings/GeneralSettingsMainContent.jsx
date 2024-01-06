import React, { useState } from "react";
import "./generalSettingsContent.css";
import imageTemplate from "../../assets/img/generalSettings/imageIcon.png";
import styles from "../../assets/css/country.module.css";
import { styled } from "@mui/system";
import { Tabs } from "@mui/base/Tabs";
import { TabsList as BaseTabsList } from "@mui/base/TabsList";
import { TabPanel as BaseTabPanel } from "@mui/base/TabPanel";
import { buttonClasses } from "@mui/base/Button";
import { Tab as BaseTab, tabClasses } from "@mui/base/Tab";
import {
  Autocomplete,
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";
import quickStyle from "../../assets/css/quickTransfer.module.css";
import updateIcon from "../../assets/img/generalSettings/update.svg";
import plusIcon from "../../assets/img/generalSettings/plus.svg";
import axios from "axios";
import { useQuery } from "react-query";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Modal,
  Backdrop,
  Fade,
  TextField,
  Button,
  Typography,
} from '@mui/material';


const GeneralSettingsMainContent = () => {
  const [serviceBoxes, setServiceBoxes] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [editedServiceBox, setEditedServiceBox] = useState({});
  // const classes = useStyles();
  const openEditModal = (index) => {
    let num = index + 1;
    // convert number to one, two, three
    if (num === 1) {
      num = "one";
    } else if (num === 2) {
      num = "two";
    } else if (num === 3) {
      num = "three";
    }

    setEditedServiceBox({
      title: serviceBoxes[index][`service_box_${num}_title`],
      icon: `https://api.quickt.com.au${serviceBoxes[index][`service_box_${num}_icon`]}`,
      description: serviceBoxes[index][`service_box_${num}_desc`],
      index,
    });

    setModalOpen(true);
  };

  const handleModalClose = () => {
    setModalOpen(false);
  };

  const handleSaveChanges = async () => {
    if (
      editedServiceBox.title === "" ||
      editedServiceBox.description === "" ||
      editedServiceBox.icon === null
    ) {
      alert("Please enter title, description, and icon");
      return;
    }

    let serviceBoxData = {};
    if (editedServiceBox.index === 0) {
      serviceBoxData = {
        data: {
          service_box_one_title: editedServiceBox.title,
          service_box_one_desc: editedServiceBox.description,
          service_box_one_icon: strapiImage ? strapiImage : editedServiceBox.icon,
        },
      };
    } else if (editedServiceBox.index === 1) {
      serviceBoxData = {
        data: {
          service_box_two_title: editedServiceBox.title,
          service_box_two_desc: editedServiceBox.description,
          service_box_two_icon: strapiImage ? strapiImage : editedServiceBox.icon,
        },
      };
    } else {
      serviceBoxData = {
        data: {
          service_box_three_title: editedServiceBox.title,
          service_box_three_desc: editedServiceBox.description,
          service_box_three_icon: strapiImage ? strapiImage : editedServiceBox.icon,
        },
      };
    }

    // Send the updated data to the server using axios.put
    try {
      const res = await axios.put(
        `https://api.quickt.com.au/api/general-settings/1`,
        serviceBoxData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("jwt")}`,
          },
        }
      );

      if (res.data?.data?.id) {
        setServiceTitle("");
        setServiceDescription("");
        setSelectedImage(imageTemplate);
        setStrapiImage(null);
        alert("Service box updated successfully");
      } else {
        alert("Something went wrong");
      }
    } catch (error) {
      console.error('Error updating service box:', error);
      alert("Error updating service box");
    }

    // Close the modal after saving changes
    setModalOpen(false);
  };

  const [box, setBox] = React.useState(1);
  const [newTransfer, setNewTransfer] = useState(false);
  const handleChange = (event) => {
    setBox(event.target.value);
  };
  const [quickAmount, setQuickAmount] = React.useState("");
  const [quickFee, setQuickFee] = React.useState("");
  const [visibility, setVisibility] = React.useState("");
  const [fee, setFee] = useState("");
  const [mainTitle, setMainTitle] = useState("");
  const [mainDescription, setMainDescription] = useState("");
  const [serviceTitle, setServiceTitle] = useState("");
  const [serviceDescription, setServiceDescription] = useState("");
  const [newTransferAmount, setNewTransferAmount] = useState("");
  const [newTransferFee, setNewTransferFee] = useState("");
  const [newTransferVisibility, setNewTransferVisibility] = useState("");
  const [selectedImage, setSelectedImage] = useState(imageTemplate);
  const [strapiImage, setStrapiImage] = useState(null);
  // const [generalSettings, setGeneralSettings] = useState(null);
  console.log(newTransferVisibility, newTransferFee, newTransferAmount);
  const createQuickTransfer = async () => {
    if (
      newTransferAmount === "" ||
      newTransferFee === "" ||
      newTransferVisibility === ""
    ) {
      alert("Please enter amount, fee and visibility");
      return;
    }
    const res = await axios.post(
      `https://api.quickt.com.au/api/quick-transfers`,
      {
        data: {
          amount: Number(newTransferAmount),
          fee: Number(newTransferFee),
          enabled: newTransferVisibility,
        },
      },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("jwt")}`,
        },
      }
    );
    console.log(res.data?.data?.id);
    if (res.data?.data?.id) {
      setNewTransferAmount("");
      setNewTransferFee("");
      setNewTransferVisibility("");
      alert("Quick transfer created successfully");
      setNewTransfer(false);
    } else {
      alert("Something went wrong");
    }
  };

  const {
    data: generalSettings,
    isLoading: isgeneralSettingLoading,
    isError: isgeneralSettingError,
  } = useQuery("generalSettings", async () => {
    const res = await axios.get(
      `https://api.quickt.com.au/api/general-settings/1`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("jwt")}`,
        },
      }
    );
    console.log(res.data.data.attributes)
    return res.data.data.attributes;
  });
  // console.log(generalSettings?.transfer_percentage)
  // get quick transfers
  const {
    data: quickTransfers,
    isLoading,
    isError,
  } = useQuery("quickTransfers", async () => {
    const res = await axios.get(
      `https://api.quickt.com.au/api/quick-transfers`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("jwt")}`,
        },
      }
    );
    // console.log(res.data.data)
    return res.data.data;
  });

  React.useEffect(() => {
    if (quickTransfers) {
      setVisibility(quickTransfers?.[box - 1]?.attributes?.enabled);
      setQuickAmount(quickTransfers?.[box - 1]?.attributes?.amount);
      setQuickFee(quickTransfers?.[box - 1]?.attributes?.fee);
    }
  }, [box, quickTransfers]);
  React.useEffect(() => {
    if (generalSettings) {
      setServiceBoxes([
        {
          service_box_one_title: generalSettings?.service_box_one_title,
          service_box_one_desc: generalSettings?.service_box_one_desc,
          service_box_one_icon: generalSettings?.service_box_one_icon,
        },
        {
          service_box_two_title: generalSettings?.service_box_two_title,
          service_box_two_desc: generalSettings?.service_box_two_desc,
          service_box_two_icon: generalSettings?.service_box_two_icon,
        },
        {
          service_box_three_title: generalSettings?.service_box_three_title,
          service_box_three_desc: generalSettings?.service_box_three_desc,
          service_box_three_icon: generalSettings?.service_box_three_icon,
        },
      ]);
    }
  }, [generalSettings]);
  // console.log(quickTransfers.length)
  /////////////////////////////
  //image uploading
  /////////////////////////////

  const updateQuickTransfer = async () => {
    if (quickAmount === "" || quickFee === "") {
      alert("Please enter amount and fee");
      return;
    }
    const res = await axios.put(
      `https://api.quickt.com.au/api/quick-transfers/${quickTransfers?.[box - 1]?.id
      }`,
      {
        data: {
          amount: Number(quickAmount),
          fee: Number(quickFee),
          enabled: visibility,
        },
      },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("jwt")}`,
        },
      }
    );
    console.log(res.data?.data?.id);
    if (res.data?.data?.id) {
      alert("Quick transfer updated successfully");
    } else {
      alert("Something went wrong");
    }
  };

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
  // update transfer fee percentage
  const handleFeeUpdate = async () => {
    if (fee === "") {
      alert("Please enter fee");
      return;
    }
    // /api/general-settings/:id
    const res = await axios.put(
      `https://api.quickt.com.au/api/general-settings/1`,
      {
        data: {
          transfer_percentage: Number(fee),
        },
      },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("jwt")}`,
        },
      }
    );
    console.log(res.data?.data?.id);
    if (res.data?.data?.id) {
      setFee("");
      alert("Fee updated successfully");
    } else {
      alert("Something went wrong");
    }
  };

  // update main banner
  const handleMainBannerUpdate = async () => {
    if (mainTitle === "" || mainDescription === "") {
      alert("Please enter title and description");
      return;
    }
    // if title is empty then remove title from object
    // if (mainTitle === "") {
    //   mainBannerData.data.main_banner_description = mainDescription;
    // }
    // // if description is empty then remove description from object
    // if (mainDescription === "") {
    //   mainBannerData.data.main_banner_title = mainTitle;
    // }
    // // if both are not empty then add both in object
    // if (mainTitle !== "" && mainDescription !== "") {
    //   mainBannerData.data.main_banner_title = mainTitle;
    //   mainBannerData.data.main_banner_description = mainDescription;
    // }else if(mainTitle === "" && mainDescription === ""){
    //   alert("Please enter title or description");
    //   return;
    // }

    const res = await axios.put(
      `https://api.quickt.com.au/api/general-settings/1`,
      {
        data: {
          main_banner_title: mainTitle,
          main_banner_desc: mainDescription,
        },
      },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("jwt")}`,
        },
      }
    );
    // console.log(res.data?.data);
    if (res.data?.data?.id) {
      setMainTitle("");
      setMainDescription("");
      alert("Main banner updated successfully");
    } else {
      alert("Something went wrong");
    }
  };

  const handleServiceBoxUpdate = async () => {
    if (
      serviceTitle === "" ||
      serviceDescription === "" ||
      strapiImage === null
    ) {
      alert("Please enter title, description and icon");
      return;
    }
    let serviceBoxData = {};
    if (box === 1) {
      serviceBoxData = {
        data: {
          service_box_one_title: serviceTitle,
          service_box_one_desc: serviceDescription,
          service_box_one_icon: strapiImage
        },
      };
    } else if (box === 2) {
      serviceBoxData = {
        data: {
          service_box_two_title: serviceTitle,
          service_box_two_desc: serviceDescription,
          service_box_two_icon: strapiImage
        },
      };
    } else {
      serviceBoxData = {
        data: {
          service_box_three_title: serviceTitle,
          service_box_three_desc: serviceDescription,
          service_box_three_icon: strapiImage
        },
      };
    }

    console.log(serviceBoxData);
    // /api/general-settings/:id
    const res = await axios.put(
      `https://api.quickt.com.au/api/general-settings/1`,
      serviceBoxData,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("jwt")}`,
        },
      }
    );
    console.log(res.data?.data);
    if (res.data?.data?.id) {
      setServiceTitle("");
      setServiceDescription("");
      setSelectedImage(imageTemplate);
      setStrapiImage(null);
      alert("Service box updated successfully");
    } else {
      alert("Something went wrong");
    }
  };

  return (
    <div className={styles.parent}>
      <Tabs defaultValue={1}>
        <TabsList>
          <Tab value={1}>Basic information</Tab>
          <Tab value={2}>Quick Transfers</Tab>
        </TabsList>
        <TabPanel value={1}>
          <div style={{ height: "auto", width: "100%", marginTop: "-30px" }}>
            <p className="generalSettings_TextHeading">
              Transfer Fee Percentage
            </p>
            <div className="generalSettings_CustomAmmount">
              <input
                type="number"
                value={fee}
                onChange={(e) => setFee(e.target.value)}
                placeholder={`Enter amount (current fee is ${generalSettings?.transfer_percentage}%)`}
                style={{ border: "1px solid #999" }}
              />
              <button onClick={handleFeeUpdate}>Update</button>
            </div>

            <div className="generalSettings_MainBanner">
              <p className="generalSettings_TextHeading">Main Banner info</p>
              <p className="generalSettings_SubTextHeading">Title</p>
              <input
                type="text"
                value={mainTitle}
                onChange={(e) => setMainTitle(e.target.value)}
                placeholder={`Current title : ${generalSettings?.main_banner_title} || We recommend title length less than 10 words`}
                style={{ border: "1px solid #999" }}
              />
              <p className="generalSettings_SubTextHeading">Description</p>
              <textarea
                value={mainDescription}
                onChange={(e) => setMainDescription(e.target.value)}
                placeholder={`Current description : ${generalSettings?.main_banner_desc} || We recommend description length less than 15-20 words`}
                rows={6}
                cols={10}
              ></textarea>
              <button onClick={handleMainBannerUpdate}>Update</button>
            </div>

            <h2 style={{ marginBottom: '10px' }}>Service Boxs</h2>
            <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Title</TableCell>
                    <TableCell>Icon</TableCell>
                    <TableCell>Description</TableCell>
                    <TableCell>Action</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {serviceBoxes.map((serviceBox, index) => {
                    let num = index + 1;
                    // convert number to one, two, three
                    if (num === 1) {
                      num = "one";
                    } else if (num === 2) {
                      num = "two";
                    } else if (num === 3) {
                      num = "three";
                    }

                    return (
                      <TableRow key={index}>
                        <TableCell>{serviceBox[`service_box_${num}_title`]}</TableCell>
                        <TableCell style={{

                        }}>
                          <img
                            src={`https://api.quickt.com.au${serviceBox[`service_box_${num}_icon`]}`}
                            alt="icon"
                            style={{ width: "50px", height: "50px", borderRadius: "10px" }}
                          />
                        </TableCell>
                        <TableCell >{serviceBox[`service_box_${num}_desc`]}</TableCell>
                        <TableCell>
                          <Button onClick={() => openEditModal(index)}>Edit</Button>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </TableContainer>
            <Modal
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: '10px'
              }}
              open={modalOpen}
              onClose={handleModalClose}
              closeAfterTransition
            >
              <Fade in={modalOpen} style={{
                borderRadius: '10px',
              }}>
                <div style={{
                  backgroundColor: 'white',
                  border: '2px solid #fff',
                  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                  padding: '16px',
                  outline: 'none'
                }}>
                  <Typography variant="h6" sx={{ my: 2 }}>Edit Service Box</Typography>
                  <TextField
                    label="Title"
                    fullWidth
                    value={editedServiceBox.title}
                    onChange={(e) => setEditedServiceBox({ ...editedServiceBox, title: e.target.value })}
                  />
                  <div style={{
                    width: '100%',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginTop: '10px',
                    marginBottom: '10px',
                    gap: '10px'
                  }}>
                    
                    <div>
                      <p>Current image </p>
                      <img
                        src={editedServiceBox.icon }
                        alt="icon"
                        style={{
                          width: "283px", height: "193px", borderRadius: "10px", objectFit: 'cover', marginTop: '10px', marginBottom: '10px', 
                        }}
                      />
                    </div>
                    <div>
                      <p>Click here to update</p>
                      <img
                        src={selectedImage}
                        onClick={handleImageClick}
                        style={{
                          width: "283px",
                          height: "193px",
                          borderRadius: "10px",
                          cursor: "pointer",
                          objectFit: "cover",
                          border: "1px solid #999",
                        }}
                        alt="icon"

                      />
                    </div>
                  </div>
                  <TextField
                    label="Description"
                    fullWidth
                    multiline
                    rows={4}
                    value={editedServiceBox.description}
                    onChange={(e) => setEditedServiceBox({ ...editedServiceBox, description: e.target.value })}
                  />
                  <Button variant="contained" sx={{ mt: 2, ml: 'auto' }} color="success" onClick={handleSaveChanges}>
                    Save Changes
                  </Button>
                </div>
              </Fade>
            </Modal>
          </div>
        </TabPanel>
        {/* quick transfer */}
        <TabPanel value={2}>
          {/* header */}
          <div className={quickStyle.headerBox}>
            <p className={quickStyle.header}>Update Quick Transfers</p>
            <div className="generalSettings_serviceBox">
              <div style={{ width: "230px" }}>
                <FormControl
                  fullWidth
                  style={{
                    height: "40px",
                  }}
                >
                  <InputLabel
                    id="demo-simple-select-label"
                    style={{
                      marginTop: "-7px",
                    }}
                  >
                    Select existing transfers
                  </InputLabel>
                  <Select
                    style={{
                      height: "40px",
                    }}
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={box}
                    label="Select existing transfers"
                    onChange={handleChange}
                  >
                    {[...Array(quickTransfers?.length)].map((item, index) => (
                      <MenuItem key={index} value={index + 1}>
                        Quick Transfer No {index + 1}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </div>
            </div>
          </div>
          {/* update quickTransfer body */}
          <Box className={quickStyle.body}>
            {/* upper inputs */}
            <Box className={quickStyle.inputParent}>
              <div className={quickStyle.inputBox}>
                <label htmlFor="amount">Amount</label>
                <input
                  type="text"
                  className={quickStyle.textInput}
                  value={quickAmount}
                  onChange={(e) => handleW}
                />
              </div>
              {/* fee */}
              <div className={quickStyle.inputBox}>
                <label htmlFor="amount">Fee</label>
                <input
                  type="text"
                  className={quickStyle.textInput}
                  value={quickFee}
                  onChange={(e) => {
                    setQuickFee(e.target.value);
                  }}
                />
              </div>
            </Box>
            {/* lower inputs */}
            <Box className={quickStyle.inputParent} sx={{ mt: 3 }}>
              <div
                className={quickStyle.inputBox}
                style={{ width: "50%", position: "relative" }}
              >
                <label htmlFor="amount">User Visibility</label>
                {/* <input type="text" className={quickStyle.textInput} /> */}
                <select
                  name="visibility"
                  className={quickStyle.textInput}
                  value={visibility}
                  onChange={(e) => {
                    setVisibility(e.target.value);
                    // setBox(e.target.value)
                  }}
                >
                  <option value="true">Visible </option>
                  <option value="false">Invisible </option>
                </select>
                <div className={quickStyle.absDiv}>{/* asd */}</div>
              </div>
              {/* update button */}
              <button
                className={quickStyle.updateButton}
                onClick={updateQuickTransfer}
              >
                <span> Update quick transfer {box}</span>
                <img src={updateIcon} alt="icon" />
              </button>
            </Box>
          </Box>
          {
            <button
              className={quickStyle.updateButton}
              onClick={() => {
                setNewTransfer(!newTransfer);
              }}
            >
              <span>
                {newTransfer
                  ? "Hide making transfer"
                  : "Create another transfer"}
              </span>
              <img src={plusIcon} alt="icon" />
            </button>
          }
          {newTransfer && (
            <Box className={quickStyle.body} style={{ marginTop: "20px" }}>
              {/* upper inputs */}
              <Box className={quickStyle.inputParent}>
                <div className={quickStyle.inputBox}>
                  <label htmlFor="amount">Amount</label>
                  <input
                    type="text"
                    className={quickStyle.textInput}
                    value={newTransferAmount}
                    onChange={(e) => {
                      setNewTransferAmount(e.target.value);
                    }}
                  />
                </div>
                <div className={quickStyle.inputBox}>
                  <label htmlFor="amount">Fee</label>
                  <input
                    type="text"
                    className={quickStyle.textInput}
                    value={newTransferFee}
                    onChange={(e) => {
                      setNewTransferFee(e.target.value);
                    }}
                  />
                </div>
              </Box>
              {/* lower inputs */}
              <Box className={quickStyle.inputParent} sx={{ mt: 3 }}>
                <div
                  className={quickStyle.inputBox}
                  style={{ width: "50%", position: "relative" }}
                >
                  <label htmlFor="amount">User Visibility</label>
                  {/* <input type="text" className={quickStyle.textInput} /> */}
                  <select
                    name="visibility"
                    className={quickStyle.textInput}
                    value={newTransferVisibility}
                    onChange={(e) => {
                      setNewTransferVisibility(e.target.value);
                    }}
                  >
                    <option value="true">Visible</option>
                    <option value="false">Invisible</option>
                  </select>
                  <div className={quickStyle.absDiv}>{/* asd */}</div>
                </div>
                {/* create button */}
                <button
                  className={quickStyle.updateButton}
                  style={{ width: "200px" }}
                  const
                  onClick={createQuickTransfer}
                >
                  <span> Confirm Creation</span>
                  <img src={plusIcon} alt="icon" />
                </button>
              </Box>
            </Box>
          )}
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
  justify-content: flex-start;

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
    text-align: start;
    // background: ${theme.palette.mode === "dark" ? grey[900] : "#fff"};
    // border: 1px solid ${theme.palette.mode === "dark" ? grey[700] : grey[200]
    };
    border-radius: 12px;
    `
);

const TabsList = styled(BaseTabsList)(
  ({ theme }) => `
    max-width: 320px;
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
export default GeneralSettingsMainContent;
