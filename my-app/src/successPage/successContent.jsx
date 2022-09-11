import React, { useState, useEffect } from "react";
import { Paper, Typography, CircularProgress } from "@mui/material";
import { styled } from "@mui/material/styles";
import ScannerDetailsRow from "./scannersDetailsRow";
import { getScanners } from "../service/httpFunction";
const MainContainer = styled(Paper)(() => ({
  width: "auto",
  maxWidth: "auto",
  alignSelf: "center",
  padding: "20px",
}));

export default function SuccessContent({ isSuccess = true }) {
  const [noOfScanners, setNoOfScanners] = useState(0);
  const [loading, setLoading] = useState(true);
  const [scannerData, setScannerData] = useState([]);
  const [noScanner, setNoScanner] = useState();

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      const response = await getScanners();
      if (response.status === 200) {
        setScannerData(response.data);
        setNoOfScanners(response.data.length);
        setNoScanner(false);
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
            <CircularProgress style={{ color: "black", margin: "10px" }} />
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
              <div
                style={{
                  height: "1px",
                  width: "100%",
                  color: "black",
                  backgroundColor: "black",
                }}
              ></div>
              {noScanner && (
                <Typography variant="h7" component="div">
                  No Scanner data found.
                </Typography>
              )}
              <div
                style={{
                  height: "1px",
                  width: "100%",
                  color: "black",
                  backgroundColor: "black",
                }}
              ></div>
              {scannerData.map((data, index) => {
                return (
                  <div key={index}>
                    <ScannerDetailsRow
                      scannerName={data.scannerName}
                      IPAddress={data.ipAddress}
                      ScannerSpeed={data.scannerSpeed}
                      ScannerStatus={data.isAvailable}
                    />
                    {/* divider */}
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
