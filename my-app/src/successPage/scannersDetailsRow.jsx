import React from "react";
import { Typography, Button } from "@mui/material";

const ScannerDetailsRow = ({
  scannerName = "",
  IPAddress = "",
  ScannerSpeed = "",
  ScannerStatus = "",
}) => {
  return (
    <div
      className="rowComponent"
      style={{
        display: "grid",
        columnGap: "30px",
        gridTemplateColumns: "1fr 1fr 1fr 1fr 1fr",
        gridTemplateRows: "auto",
        padding: "10px 0px",
      }}
    >
      <Typography variant="subtitle2" component="div">
        {scannerName}
      </Typography>
      <Typography variant="subtitle2" component="div">
        {IPAddress}
      </Typography>
      <Typography variant="subtitle2" component="div">
        {ScannerSpeed}
      </Typography>
      <Typography variant="subtitle2" component="div">
        {ScannerStatus === "true" ? "Available" : "Engaged"}
      </Typography>
      <Button
        variant="contained"
        type="submit"
        fullWidth
        disabled={ScannerStatus === "true" ? true : false}
      >
        Connect
      </Button>
    </div>
  );
};

export default ScannerDetailsRow;
