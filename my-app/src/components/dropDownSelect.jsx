import React, { useState } from "react";
import { Select, MenuItem } from "@mui/material";

const DropDownSelect = ({
  title = "",
  fieldName = "",
  handleChangeCallBack = () => console.log("Handle Change Props."),
  options = [],
}) => {
  const [selectedValue, setSelectedValue] = useState("");

  const handleChange = (event) => {
    handleChangeCallBack(event);
    setSelectedValue(event.target.value);
  };

  return (
    <div style={{ width: "100%" }}>
      <p>{title}</p>
      <Select
        style={{
          width: "100%",
        }}
        value={selectedValue}
        onChange={handleChange}
        name={fieldName}
      >
        {options.map((option, index) => {
          return (
            <MenuItem key={index} value={option}>
              {option}
            </MenuItem>
          );
        })}
      </Select>
    </div>
  );
};

export default DropDownSelect;
