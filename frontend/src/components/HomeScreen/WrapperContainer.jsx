import React from "react";
import "./WrapperContaner.scss"
const WrapperContainer = ({ children }) => {
  return <div className="inner__container">{children}</div>;
};

export default WrapperContainer;
