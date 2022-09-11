import React, { useState, useReducer } from "react";
import { Paper, Button, CircularProgress, Typography } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { red } from "@mui/material/colors";
import { styled } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
import DropDownSelect from "../components/dropDownSelect";
import FormTextField from "../components/formTextField";
import { submitForm } from "../service/httpFunction";

const theme = createTheme({
  palette: {
    Error: {
      main: red[500],
    },
  },
});

const MainContainer = styled(Paper)(() => ({
  width: "80%",
  maxWidth: "500px",
  alignSelf: "center",
  alignItems: "center",
  padding: "15px",
}));

const formReducer = (state, event) => {
  return {
    ...state,
    [event.name]: event.value,
  };
};

export default function MainContent() {
  const navigate = useNavigate();
  const [submitting, setSubmitting] = useState(false);
  const [redirecting, setRedirecting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [formData, setFormData] = useReducer(formReducer, {});

  const handleSubmit = async (event) => {
    try {
      event.preventDefault();
      setSubmitting(true);
      const submissionData = {
        projectName: formData.projectName,
        scanningMode: formData.scanningMode,
        scanDimensionsX: parseInt(formData.scanDimensionsX, 10),
        scanDimensionsY: parseInt(formData.scanDimensionsY, 10),
        scannerFrequency: parseFloat(formData.scannerFrequency),
      };
      const response = await submitForm(submissionData);
      if (response.status === 200) {
        setRedirecting(true);
        setTimeout(() => {
          setSubmitting(false);
          navigate("../success", { state: { isSuccess: true } });
        }, 1000);
      } else {
        throw new Error(response);
      }
    } catch (err) {
      console.log(err.response.data);
      setErrorMessage(
        err.response.data || "Something went wrong, please try again."
      );
    } finally {
      setSubmitting(false);
    }
  };

  const handleChange = (event) => {
    setFormData({
      name: event.target.name,
      value: event.target.value,
    });
  };

  return (
    <ThemeProvider theme={theme}>
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
          {redirecting ? (
            <>
              <CircularProgress style={{ color: "black", margin: "10px" }} />
              <Typography variant="h7" align="center" component="div">
                Redirecting to success page...
              </Typography>
            </>
          ) : (
            <form onSubmit={handleSubmit}>
              <fieldset
                style={{
                  border: "0px",
                  padding: "0px 0px 15px 0px",
                }}
              >
                <label
                  style={{
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <p>Project Name</p>
                  <FormTextField
                    handleChangeCallBack={handleChange}
                    fieldName="projectName"
                  />
                  <DropDownSelect
                    title="Scanning Mode"
                    fieldName="scanningMode"
                    handleChangeCallBack={handleChange}
                    options={["GANTRY", "CRAWLER", "AUTO", "MANUAL", "ARM"]}
                  />
                  <p>Scan Dimensions (cm)</p>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      justifyContent: "space-between",
                    }}
                  >
                    <p>X</p>
                    <FormTextField
                      handleChangeCallBack={handleChange}
                      fieldName="scanDimensionsX"
                    />
                    <p>Y</p>
                    <FormTextField
                      handleChangeCallBack={handleChange}
                      fieldName="scanDimensionsY"
                    />
                  </div>
                  <p>Scanner Frequency(Ghz)</p>
                  <FormTextField
                    handleChangeCallBack={handleChange}
                    fieldName="scannerFrequency"
                  />
                </label>
              </fieldset>
              {!submitting && (
                <Button
                  variant="contained"
                  type="submit"
                  fullWidth
                  style={{
                    color: "white",
                    backgroundColor: "black",
                  }}
                >
                  Submit
                </Button>
              )}
              {submitting && (
                <CircularProgress style={{ color: "black", margin: "10px" }} />
              )}
              {!submitting && (
                <Typography
                  variant="h7"
                  align="center"
                  component="div"
                  color="error"
                >
                  {errorMessage}
                </Typography>
              )}
            </form>
          )}
        </MainContainer>
      </div>
    </ThemeProvider>
  );
}
