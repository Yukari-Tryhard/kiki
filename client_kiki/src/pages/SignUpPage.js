import useToggleValue from "../hooks/useToggleValue";
import React, { useEffect } from "react";
import LayoutAnthentication from "../layouts/LayoutAnthentication";
import FormGroup from "../components/common/FormGroup";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { IconEyeToggle } from "../components/icons";
import { Button } from "../components/button";
import { Label } from "../components/label";
import { Input } from "../components/input";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { gapi } from "gapi-script";
import { toast } from "react-toastify";
import {
  loginByGoogle,
  register,
  resetError,
  setPassword,
} from "../app/features/authSlice";
import GoogleLogin from "react-google-login";
import IconPassword from "../components/icons/IconPassword";
import IconAcLogin from "../components/icons/IconAcLogin";

const schema = yup
  .object()
  .shape({
    name: yup.string().required("Vui lòng nhập tên tài khoản"),
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

const SignUpPage = () => {
  const { isLoading, errorMessage } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    mode: "onSubmit",
  });

  const handleSignUp = (formValue) => {
    dispatch(setPassword(formValue?.password));
    dispatch(register({ formValue, navigate, toast }));
  };
  const handleLoginByGoogle = async (googleData) => {
    await dispatch(loginByGoogle({ token: googleData.tokenId }));
    navigate("/");
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
  }, [dispatch, errorMessage]);

  const { value: showPassword, handleToggleValue: handleTogglePassword } =
    useToggleValue(false);
  return (
    <>
      <LayoutAnthentication heading="ĐĂNG KÝ TÀI KHOẢN" >
        <form onSubmit={handleSubmit(handleSignUp)} method="post">
          <FormGroup>
            <Label htmlFor="email">Tài khoản</Label>
            <Input
              control={control}
              name="email"
              type="email"
              placeholder="example@gmail.com"
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
              placeholder="Create a password"
              error={errors.password?.message}
            >
              <IconPassword></IconPassword>
            </Input>
          </FormGroup>

          <FormGroup>
            <Label htmlFor="re-password">Nhập lại mật khẩu </Label>
            <Input
              control={control}
              name="re-password"
              type={`${showPassword ? "text" : "password"}`}
              placeholder="Create a password"
              error={errors.password?.message}
            >
              <IconPassword></IconPassword>
            </Input>
          </FormGroup>

          <Button
            type="submit"
            className="w-full my-2 rounded-lg bg-[#1359CC] shadow-sdbutton mt-14"
          >
            {isLoading ? (
              <div class="pointer-events-none spinner-border animate-spin inline-block w-8 h-8 border-4 rounded-full border-t-transparent"></div>
            ) : (
              "Đăng ký"
            )}
          </Button>
          <p className="w-full mt-5 mb-4 text-center text-[#717171]">Hoặc</p>

          <GoogleLogin
            clientId="1032921802021-3v44l6mpbiikeiqbuo1pn0ji25tsr809.apps.googleusercontent.com"
            buttonText="Tiếp tục với Google"
            onSuccess={handleLoginByGoogle}
            onFailure={() => alert("Đăng nhập không thành công")}
            cookiePolicy={"single_host_origin"}
            className="flex justify-center w-full h-full !text-black !font-inter !font-bold mb-3"
          />
        </form>
        <Link to={"/sign-in"} className="z-[-1] absolute top-[3rem] right-[-7rem] border-2 border-white px-4 pl-10 py-2 rounded text-white font-semibold bookmark">Đăng Nhập</Link>
      </LayoutAnthentication>
    </>
  );
};

export default SignUpPage;
