import React, { useEffect } from "react";
import LayoutAnthentication from "../layouts/LayoutAnthentication";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import useToggleValue from "../hooks/useToggleValue";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "../components/button";
import FormGroup from "../components/common/FormGroup";
import { IconEyeToggle } from "../components/icons";
import { Input } from "../components/input";
import { toast } from "react-toastify";
import { useSelector, useDispatch } from "react-redux";
import { Label } from "../components/label";
import {
  login,
  loginByGoogle,
  resetError,
  setPassword,
} from "../app/features/authSlice";
import GoogleLogin from "react-google-login";
import { gapi } from "gapi-script";
import IconAcLogin from "../components/icons/IconAcLogin";
import IconPassword from "../components/icons/IconPassword";

const schema = yup
  .object()
  .shape({
    email: yup
      .string()
      .required("Vui lòng nhập email")
      .email("Vui lòng nhập email hợp lệ"),
    password: yup
      .string()
      .required("Vui lòng nhập mật khẩu")
      .min(8, "Mật khẩu phải có độ dài tối đa 8 ký tự"),
  })
  .required();
const SignInPage = () => {
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    mode: "onSubmit",
  });
  const { isLoading, errorMessage } = useSelector((state) => state.auth);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSignIn = (formValue) => {
    dispatch(setPassword(formValue?.password));
    dispatch(login({ formValue, navigate, toast }));
  };
  const handleLoginByGoogle = async (googleData) => {
    await dispatch(loginByGoogle({ token: googleData.tokenId }));
    navigate("/");
  };
  const responseGoogle = (response) => {
    console.log(response);
  };

  useEffect(() => {
    gapi.load("client:auth2", () => {
      gapi.auth2.init({
        clientId:
          "1032921802021-3v44l6mpbiikeiqbuo1pn0ji25tsr809.apps.googleusercontent.com",
      });
    });
    if (errorMessage !== null) {
      toast.error(errorMessage);
      dispatch(resetError());
    }
  }, [errorMessage, dispatch]);

  const { value: showPassword, handleToggleValue: handleTogglePassword } =
    useToggleValue(false);
  return (
    <>
      <LayoutAnthentication heading="ĐĂNG NHẬP TÀI KHOẢN">
        <form onSubmit={handleSubmit(handleSignIn)}>
          <FormGroup>
            <Label htmlFor="email">Tài khoản</Label>
            <Input
              control={control}
              name="email"
              type="email"
              error={errors.email?.message}
              autoComplete="off"
            >
              <IconAcLogin></IconAcLogin>
            </Input>
          </FormGroup>
          <FormGroup>
            <Label htmlFor="password">Mật khẩu </Label>
            <Input
              control={control}
              name="password"
              type={`${showPassword ? "text" : "password"}`}
              error={errors.password?.message}
            >
              <IconPassword></IconPassword>
            </Input>
          </FormGroup>

          <Button
            type="submit"
            className="w-full my-2 rounded-lg bg-[#1359CC] shadow-sdbutton mt-16"
          >
            {isLoading ? (
              <div class="pointer-events-none spinner-border animate-spin inline-block w-8 h-8 border-4 rounded-full border-t-transparent"></div>
            ) : (
              "Đăng nhập"
            )}
          </Button>
          <p className="w-full mt-5 mb-4 text-center text-[#717171]">Hoặc</p>

          <GoogleLogin
            clientId="1032921802021-3v44l6mpbiikeiqbuo1pn0ji25tsr809.apps.googleusercontent.com"
            buttonText="Tiếp tục với Google"
            onSuccess={handleLoginByGoogle}
            onFailure={responseGoogle}
            cookiePolicy={"single_host_origin"}
            className="flex justify-center w-full h-full !text-black !font-inter !font-bold mb-12"
          />
        </form>
      </LayoutAnthentication>
    </>
  );
};

export default SignInPage;
