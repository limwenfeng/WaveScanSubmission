import React, { useState } from "react";
import { Paper, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import ScannerDetailsRow from "./scannersDetailsRow";
import { useEffect } from "react";
import { getScanners } from "../service/httpFunction";
import { CircularProgress } from "@mui/material";

const MainContainer = styled(Paper)((props) => ({
  width: "auto",
  maxWidth: "auto",
  alignSelf: "center",
  padding: "20px",
}));

export default function SuccessContent({ isSuccess = true }) {
  const [noOfScanners, setNoOfScanners] = useState(0);
  const [loading, setLoading] = useState(true);
  const [scannerData, setScannerData] = useState([]);
  const [noScanner, setNoScanner] = useState(false);

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      const response = await getScanners();
      // slot ranking data in
      console.log(response.data);
      if (response.status === 200) {
        console.log("Populate table");
        setScannerData(response.data);
        setNoOfScanners(response.data.length);
        if (response.data.length === 0) {
          setNoScanner(true);
        }
        setLoading(false);
      } else {
        throw new Error(response);
      }
    }
    try {
      fetchData();
    } catch (err) {
      console.log(err.response.data);
      setLoading(false);
    }
  }, []);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        width: "100vw",
        minHeight: "100vh",
        height: "auto",
        justifyContent: "center",
        padding: "30px 0px",
      }}
    >
      <MainContainer elevation={3}>
        {loading === true ? (
          <>
            <CircularProgress />
            <Typography variant="h6" component="div">
              Fetching data
            </Typography>
          </>
        ) : (
          <>
            <Typography variant="h6" align="left" component="div">
              Scanners found: {noOfScanners}
            </Typography>
            <div
              style={{
                height: "1px",
                width: "100%",
                color: "black",
                backgroundColor: "black",
              }}
            ></div>
            <div>
              <div
                className="rowComponent"
                style={{
                  display: "grid",
                  columnGap: "30px",
                  gridTemplateColumns: "1fr 1fr 1fr 1fr 1fr",
                  gridTemplateRows: "auto",
                  paddingBottom: "10px",
                }}
              >
                <Typography variant="h7" component="div">
                  Scanner Name
                </Typography>
                <Typography variant="h7" component="div">
                  IP Address
                </Typography>
                <Typography variant="h7" component="div">
                  Scanner Speed
                </Typography>
                <Typography variant="h7" component="div">
                  Status
                </Typography>
              </div>
              {noScanner && (
                <Typography variant="h7" component="div">
                  No Scanner data found.
                </Typography>
              )}
              {scannerData.map((data, index) => {
                return (
                  <div key={index}>
                    <ScannerDetailsRow
                      scannerName={data.scannerName}
                      IPAddress={data.ipAddress}
                      ScannerSpeed={data.scannerSpeed}
                      ScannerStatus={data.isAvailable}
                    />
                    <div
                      style={{
                        height: "1px",
                        width: "100%",
                        color: "black",
                        backgroundColor: "black",
                      }}
                    ></div>
                  </div>
                );
              })}
            </div>
          </>
        )}
      </MainContainer>
    </div>
  );
}
