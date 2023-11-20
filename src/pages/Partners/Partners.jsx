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
import PartnersMainContent from "../../components/Partners/PartnersMainContent";
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

const Partners = () => {
  const path = window.location.pathname.split("/")[2].toUpperCase();
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [checked, setChecked] = useState(false);

  const handleChange = (isChecked) => {
    setChecked(isChecked);
  };

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
            onClick={() => alert("Show filtering popup")}
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
            Create new Partner <img src={plusIcon} alt="icon" />
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
                  Partner Name <span style={{ color: "red" }}>*</span>
                </p>
                <input
                  type="text"
                  placeholder="Enter Partner Name"
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
                  Partner Location <span style={{ color: "red" }}>*</span>
                </p>

                <input
                  type="text"
                  placeholder="Enter Partner Location Here"
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
                  Percentage <span style={{ color: "red" }}>*</span>
                </p>

                <input
                  type="text"
                  placeholder="Percentage"
                  style={{
                    padding: "16px 20px",
                    width: "50%",
                    fontSize: "20px",
                    borderRadius: "16px",
                    border: "1px solid #E9E9EA",
                    outline: "none",
                  }}
                />

                <button
                  onClick={handleOpen}
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

      {/* main contents */}
      <PartnersMainContent />
    </Box>
  );
};

export default Partners;
