import { Box, Modal, Typography } from "@mui/material";
import { light } from "@mui/material/styles/createPalette";
import React from "react";
import PathName from "../../components/PathName/PathName";
import ExportButton from "../../components/ExportButton/ExportButton";
import PrintButton from "../../components/PrintButton/PrintButton";
import searchIcon from "../../assets/img/country/search.svg";
import filterIcon from "../../assets/img/country/filter.svg";
import TransactionMainContent from "../../components/Transaction/TransactionMainContent";
import { useState } from "react";
import plusIcon from "../../assets/img/generalSettings/plus.svg";
import senderStyle from "../../assets/css/sender.module.css";
import useAuth from "../../hook/useAuth";

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
const Transaction = () => {
  const path = window.location.pathname.split("/")[2].toUpperCase();
  const { handleFilterTransaction, filterTransaction, handleFilteredName } = useAuth();

  //handle filter popup open
  const [filterOpen, setFilterOpen] = useState(false);
  const handleFilterOpen = () => setFilterOpen(true);
  const handleFilterClose = () => setFilterOpen(false);
  const [kycStatus, setKycStatus] = useState("");
  const [userStatus, setUserStatus] = useState("");
  const payoutStatusRef = React.useRef();
  const transferStatusRef = React.useRef();
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const handleFilterUpdate = () => {
    if (fromDate == "" || toDate == "") {
      alert("Please select from date and to date");
      return;
    }

    handleFilterTransaction({
      filterMood: true,
      from: fromDate,
      to: toDate,
      isPayoutStatus: payoutStatusRef.current.value === "true" ? true : false,
      isTransferStatus:
        transferStatusRef.current.value === "complete" ? "complete" : "pending",
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
            onChange={(e) => {
              handleFilteredName(e.target.value)
            }}
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
        {filterTransaction.filterMood == true && (
          <button
            onClick={() => {
              handleFilterTransaction({
                filterMood: false,
                from: "",
                to: "",
                istransferStatus: "",
                isPayoutStatus: "",
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
              position: "absolute",
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
                  onChange={(e) => setFromDate(e.target.value)}
                  placeholder="D/M/YYYY H:MM M"
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
                  onChange={(e) => setToDate(e.target.value)}
                  placeholder="D/M/YYYY H:MM M"
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
              Filter by Payout Status
            </p>

            <select
              name="payout Status"
              className={senderStyle.textInput}
              ref={payoutStatusRef}
            >
              <option value="true">Complete </option>
              <option value="false">Pending </option>
            </select>

            <p
              style={{
                fontSize: "14px",
                fontWeight: "700",
                color: "#262E36",
                marginBottom: "10px",
                marginTop: "20px",
              }}
            >
              Filter by Transfer Status
            </p>

            <select
              name="user Status"
              className={senderStyle.textInput}
              ref={transferStatusRef}
            >
              <option value="complete">Complete </option>
              <option value="pending">Pending </option>
            </select>

            <button className={senderStyle.button} onClick={handleFilterUpdate}>
              Apply Filters <img src={plusIcon} alt="icon" />{" "}
            </button>
          </Typography>
        </Box>
      </Modal>
      {/* main contents */}
      <TransactionMainContent />
    </Box>
  );
};

export default Transaction;
