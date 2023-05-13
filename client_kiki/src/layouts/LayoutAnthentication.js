import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { withErrorBoundary } from "react-error-boundary";
import ErrorComponent from "../components/common/ErrorComponent";

const LayoutAnthentication = (props) => {
  const { children, heading } = props;
  return (
    <div className="relative w-full h-full min-h-screen px-10 pt-4 pb-10 bg-fixed bg-center bg-no-repeat bg-cover dark:bg-darkbg isolate bg-bg-login">
      <div className="w-full max-w-[556px] bg-bg-form rounded-xl px-5 py-8 lg:px-12 lg:py-8  mx-auto mt-[134px] bg-no-repeat bg-cover">
        {/* <h1 className="mb-1 text-lg font-semibold text-center lg:text-xl lg:mb-3 text-text1 dark:text-white">
          {heading}
        </h1> */}

        <Link to={"/"} className="flex items-center justify-center mb-[47px]">
          <img
            className="object-cover h-full mt-8"
            srcSet="/logo.png"
            alt="crowfunding-app"
          />
        </Link>

        {children}
      </div>
    </div>
  );
};

LayoutAnthentication.propTypes = {
  heading: PropTypes.string,
  children: PropTypes.node,
};
export default withErrorBoundary(LayoutAnthentication, {
  FallbackComponent: ErrorComponent,
});
