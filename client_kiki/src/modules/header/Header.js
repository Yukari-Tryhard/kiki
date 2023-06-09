import React from "react";
import { NavLink } from "react-router-dom";
import Search from "../../components/input/Search";
import IconAccount from "../../components/icons/IconAccount";
import IconCart from "../../components/icons/IconCart";
import { useDispatch, useSelector } from "react-redux";
import { IconNavBarLogin } from "../../components/icons";
import logo from "../../image/logo_header.png";
import { useEffect } from "react";
import { getUserById } from "../../app/features/authSlice";

const Header = () => {
  const { userInfo } = useSelector((state) => ({ ...state.auth }));
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getUserById());
  }, [dispatch]);
  return (
    <header id="main-header" className="relative bg-[#4897E0] z-[999] lg:p-3">
      {/* Start Top Header */}
      <div
        id="top-header"
        className="tracking-normal px-36 w-full"
      >
        <div className="middle-wrap flex pt-3 pb-3 px-[0] h-auto relative z-[2] items-center justify-between">
                <NavLink
                  to="/"
                  className="w-[50px] h-[52px] block tracking-normal text-[#0b74e5] no-underline cursor-pointer"
                >
                  <img
                    className="absolute w-[50px] h-[50px] "
                    src={logo}
                    alt="super_fresh-logo"
                  />
                </NavLink>
          {/* Start Search */}
          <Search></Search>
            {/* End Search */}
          <div className="box-border flex items-center justify-end tracking-normal header-user">
            {userInfo?.user?.name ? (
              <IconAccount></IconAccount>
            ) : (
              <IconNavBarLogin></IconNavBarLogin>
            )}

            {/* End Account */}

            {/* Start Cart */}
            <IconCart></IconCart>
            {/* End Cart */}
          </div>
          {/* End Content Header */}
        </div>
      </div>
      {/* End Top Header */}
    </header>
  );
};

export default Header;
