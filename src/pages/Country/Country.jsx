import React, { useState } from "react";
import { Box } from "@mui/material";
import { light } from "@mui/material/styles/createPalette";

import PathName from "../../components/PathName/PathName";
import ExportButton from "../../components/ExportButton/ExportButton";
import PrintButton from "../../components/PrintButton/PrintButton";
import searchIcon from "../../assets/img/country/search.svg";
import filterIcon from "../../assets/img/country/filter.svg";
import plusIcon from "../../assets/img/generalSettings/plus.svg";
import CountriesMainContent from "../../components/Country/CountriesMainContent";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import IconImage from "../../assets/img/country/iconImage.png";
import Switch from "react-switch";
import axios from "axios";
import senderStyle from "../../assets/css/sender.module.css";
import useAuth from "../../hook/useAuth";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 900,
  height: 600,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
  borderRadius: "12px",
  overflowY: "scroll",
};

//for filter modal
const FilterStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 500,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
  borderRadius: "14px",
};

const Country = () => {
  // set data to global state
  const { handleFilterCountry, filterCountry } = useAuth();
  // console.log(filterCountry)
  const path = window.location.pathname.split("/")[2].toUpperCase();
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [checked, setChecked] = useState(true);
  const handleChange = (isChecked) => {
    setChecked(isChecked);
  };
  const [countryName, setCountryName] = useState("");
  const [countryCode, setCountryCode] = useState("");

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

  // create country
  const handelCreateCountry = () => {
    const data = {
      data: {
        name: countryName,
        code: countryCode,
        icon: strapiImage,
        enabled: checked,
      },
    };
    console.log(data);
    axios
      .post("https://api.quickt.com.au/api/countries", data)
      .then((response) => {
        console.log(response);
        alert("Country created successfully");
        handleClose();
      })
      .catch((error) => {
        console.log(error);
        alert("Something went wrong");
      });
  };

  ////////////////////////////////////////////////////////////////
  //for filter modal
  ////////////////////////////////////////////////////////////////
  //handle filter popup open
  const [filterOpen, setFilterOpen] = useState(false);
  const handleFilterOpen = () => setFilterOpen(true);
  const handleFilterClose = () => setFilterOpen(false);
  // const [countryStatus, setCountryStatus] = useState(null);
  const cuntryRef = React.useRef();
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const handleStatusUpdate = (e) => {
    setCountryStatus(e.target.value);
    console.log(countryStatus)
  };
  const handleFilterUpdate = () => {
    if (fromDate == "" || toDate == "") {
      alert("Please select from date and to date");
      return;
    }
    handleFilterCountry({
      filterMood: true,
      from: fromDate,
      to: toDate,
      // isEnabled: cuntryRef.current.value
      // convert string to boolean
      isEnabled: cuntryRef.current.value == "true" ? true : false
    });
    handleFilterClose();
  };
  return (
    <Box sx={{ height: "100vh", px: 3, overflow: "scroll" }}>
      {/* pathname */}
      <PathName path={path} />
      {/* searchbar and other buttons */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mt: 3,
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            position: "relative",
          }}
        >
          <img
            src={searchIcon}
            alt="searchIcon"
            style={{
              height: "15px",
              width: "15px",
              position: "absolute",
              top: "13px",
              left: "15px",
              color: "#ccc",
            }}
          />
          <input
            type="text"
            placeholder="Search"
            style={{
              height: "40px",
              width: "500px",
              borderRadius: "25px",
              border: "1px solid #E9E9EA",
              color: "#1D1929",
              outline: "none",
              padding: "0 45px",
            }}
          />
          {/* filter icon */}
          <img
            src={filterIcon}
            onClick={handleFilterOpen}
            alt="filter-icon"
            style={{
              height: "15px",
              width: "15px",
              position: "absolute",
              top: "13px",
              right: "35px",
              color: "#ccc",
              cursor: "pointer",
            }}
          />

        </Box>
        {/* remove filter if filterCountry.filterMood is true */}
        {filterCountry.filterMood == true && (
          <button
            onClick={() => {
              handleFilterCountry({
                filterMood: false,
                from: "",
                to: "",
                isEnabled: ""
              });
            }}
            style={{
              height: "40px",
              width: "130px",
              borderRadius: "25px",
              border: "1px solid #E9E9EA",
              color: "red",
              outline: "none",
              padding: "0 20px",
              backgroundColor: "#fff",
              cursor: "pointer",
              position: 'absolute',
            }}
          >
            Remove Filter
          </button>
        )}
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <ExportButton />
          <span style={{ marginLeft: "10px" }}></span>
          <PrintButton />
          <span style={{ marginLeft: "10px" }}></span>
          {/* <CreateNewButton text={"Country"} /> */}
          <button
            onClick={handleOpen}
            style={{
              padding: "12px 50px",
              border: "none",
              borderRadius: "20px",
              backgroundColor: "#003CFF",
              color: "#fff",
              fontSize: "16px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
              gap: "15px",
            }}
          >
            Create new Country <img src={plusIcon} alt="icon" />
          </button>
          <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={style}>
              <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                <p className="generalSettings_SubTextHeading">Icon</p>
                <img
                  src={selectedImage}
                  style={{ width: "270px", height: "180px", cursor: "pointer" }}
                  alt=""
                  onClick={handleImageClick}
                />
                <p className="generalSettings_SubTextHeading">
                  Country Name <span style={{ color: "red" }}>*</span>
                </p>
                <input
                  type="text"
                  onChange={(e) => setCountryName(e.target.value)}
                  placeholder="ex: United States of America"
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
                  onChange={(e) => setCountryCode(e.target.value)}
                  placeholder="ex: USA"
                  style={{
                    padding: "16px 20px",
                    width: "100%",
                    fontSize: "20px",
                    borderRadius: "16px",
                    border: "1px solid #E9E9EA",
                    outline: "none",
                  }}
                />
                <p className="generalSettings_SubTextHeading">Enabled</p>
                <Switch onChange={handleChange} checked={checked} />

                <button
                  onClick={handelCreateCountry}
                  style={{
                    // padding: "16px 18px",
                    width: "140px",
                    height: "45px",
                    border: "none",
                    borderRadius: "25px",
                    backgroundColor: "#003CFF",
                    color: "#fff",
                    fontSize: "20px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    cursor: "pointer",
                    gap: "15px",
                    marginTop: "20px",
                  }}
                >
                  Save <img src={plusIcon} alt="icon" />
                </button>
              </Typography>
            </Box>
          </Modal>
        </Box>
      </Box>
      <Modal
        open={filterOpen}
        onClose={handleFilterClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={FilterStyle}>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            <p
              style={{
                fontSize: "14px",
                fontWeight: "700",
                color: "#262E36",
              }}
            >
              Filter by created date
            </p>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <div>
                <p
                  style={{
                    fontSize: "14px",
                    fontWeight: "400",
                    marginTop: "18px",
                    marginBottom: "10px",
                  }}
                >
                  From
                </p>
                <input
                  type="date"
                  placeholder="D/M/YYYY H:MM M"
                  onChange={(e) => {
                    setFromDate(e.target.value);
                  }}
                  style={{
                    paddingRight: "20px",
                    paddingLeft: "10px",
                    paddingTop: "10px",
                    paddingBottom: "10px",
                    borderRadius: "10px",
                    width: "200px",
                    outline: "none",
                    border: "1px solid #999",
                    fontSize: "14px",
                  }}
                />
              </div>
              <div>
                <p
                  style={{
                    fontSize: "14px",
                    fontWeight: "400",
                    marginTop: "18px",
                    marginBottom: "10px",
                  }}
                >
                  To
                </p>
                <input
                  type="date"
                  placeholder="D/M/YYYY H:MM M"
                  onChange={(e) => {
                    setToDate(e.target.value);
                  }}
                  style={{
                    paddingRight: "20px",
                    paddingLeft: "10px",
                    paddingTop: "10px",
                    paddingBottom: "10px",
                    borderRadius: "10px",
                    width: "200px",
                    outline: "none",
                    border: "1px solid #999",
                    fontSize: "14px",
                  }}
                />
              </div>
            </div>
            <p
              style={{
                fontSize: "14px",
                fontWeight: "700",
                color: "#262E36",
                marginBottom: "10px",
                marginTop: "20px",
              }}
            >
              Filter by Country Status
            </p>

            <select
              name="kyc Status"
              className={senderStyle.textInput}
              // value={countryStatus}
              // onChange={handleStatusUpdate}
              ref={cuntryRef}
            >
              <option value="true">Enable </option>
              <option value="false">Disable </option>
            </select>


            <button className={senderStyle.button} onClick={handleFilterUpdate}>
              Apply Filters <img src={plusIcon} alt="icon" />{" "}
            </button>
          </Typography>
        </Box>
      </Modal>

      {/* main contents */}
      <CountriesMainContent />
    </Box>
  );
};

export default Country;
