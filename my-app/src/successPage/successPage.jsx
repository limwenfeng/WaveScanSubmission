import React from "react";
import SuccessContent from "./successContent";
import { useLocation } from "react-router-dom";

const SuccessPage = () => {
  const location = useLocation();

  return (
    <>
      <SuccessContent isSuccess={location.state.isSuccess} />
    </>
  );
};

export default SuccessPage;
