import React from "react";
import PropTypes from "prop-types";

const Label = ({ children, htmlFor = "", className = "" }) => {
  return (
    <label
      htmlFor={htmlFor}
      className={`inline-block text-base  font-semibold cursor-pointer text-black ${className}`}
    >
      {children}
    </label>
  );
};
Label.propTypes = {
  // value: PropTypes.string
  children: PropTypes.node,
  htmlFor: PropTypes.string,
  className: PropTypes.string,
};
export default Label;
