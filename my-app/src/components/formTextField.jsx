import React from "react";
import { TextField } from "@mui/material";

const FormTextField = ({
  fieldName = "",
  handleChangeCallBack = () => console.log("Handle Change Props."),
}) => {
  const handleChange = (event) => {
    handleChangeCallBack(event);
  };

  return (
    <TextField variant="outlined" name={fieldName} onChange={handleChange} />
  );
};

export default FormTextField;
