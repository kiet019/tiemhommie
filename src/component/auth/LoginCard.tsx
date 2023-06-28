import React, { useContext, useState } from "react";
import GoogleIcon from "@mui/icons-material/Google";
import { UserContext } from "./AuthContext";
import { useForm } from "react-hook-form";
import StyledLink from "../theme/navLink/Link";
import StyledOutlinedInput from "../theme/input/StyledInput";
import StyledLoadingButton from "../theme/button/StyledLoadingButton";
import LineText from "../theme/text/LineText";
import { UseLogin } from "../../../package/function/auth/use-login";
import { auth } from "@/config/firebase";
import { useAppDispatch } from "@/feature/Hooks";
import { setOpen } from "@/feature/Alert";
import { setup } from "@/config/setup";
import { useRouter } from "next/router";
import { Typography } from "@mui/material";
import { ggProvider } from './../../config/firebase';
import { UseLoginGoogle } from "../../../package/function/auth/use-login-google";
import SocialButton from "./SocialButton";

export default function LoginCard() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const router = useRouter()
  const dispatch = useAppDispatch()
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = async (fields: any) => {
    try {
      setIsLoading(true);
      const data = await UseLogin({
        email: fields.email,
        password: fields.password,
        auth: auth
      });
      dispatch(setOpen({
        message: data.message,
        open: true,
        severity: data.status
      }))
      data.data !== null ? router.push("/") : router.push("/information")
    } catch (error: any) {
      dispatch(setOpen({
        message: error.message,
        open: true,
        severity: "error"
      }))
    } finally {
      setIsLoading(false);
    }
  };

  const handleLoginGoogle = async () => {
    try {
      setIsLoading(true)
      const data = await UseLoginGoogle({ auth, provider: ggProvider })
      if (data.data === null) {
        router.push("/information")
      } else {
        dispatch(setOpen({
          message: data.message,
          open: true,
          severity: data.status
        }))
        router.push("/")
      }
    } catch (error: any) {
      dispatch(setOpen({
        message: error.message,
        open: true,
        severity: "error"
      }))
    } finally {
      setIsLoading(false);
    }
  }
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <StyledOutlinedInput
        label="Email"
        id="input-login"
        error={errors.email !== undefined}
        helperText={errors.email !== undefined ? "bắt buộc" : ""}
        // icon={<EmailIcon />}
        {...register("email", {
          required: true,
        })}
      />
      <br />
      <StyledOutlinedInput
        label="Password"
        id="input-login"
        error={errors.password !== undefined}
        helperText={errors.password !== undefined ? "bắt buộc" : ""}
        {...register("password", {
          required: true,
        })}
        type="password"
      />
      <StyledLoadingButton
        loading={isLoading}
        sx={{
          backgroundColor: setup.inside
        }}
        type="submit"
        fullWidth
        variant="contained"
      >
        Đăng nhập
      </StyledLoadingButton>
      <Typography sx={{
        fontWeight: "500",
        textAlign: "center",
        fontSize: "0.9rem"
      }}>
        Chưa có tài khoản?{"  "}
        <StyledLink
          style={{
            color: "#1818ad",
            textDecoration: "underline",
            display: "inline",
            fontWeight: "600"
          }}
          href="/register"
        >
          đăng kí
        </StyledLink>
      </Typography>
      <LineText text="Or" />
      <div
        style={{
          marginTop: "1rem",
        }}
      >
        <SocialButton handleLoginGoogle={handleLoginGoogle} isLoading={isLoading}/>
        <StyledLink
          style={{
            fontSize: "0.9rem",
            color: "#1818ad",
            textDecoration: "underline",
            fontWeight: "600",
            textAlign: "center"
          }}
          href="/"
        >
          Trang chủ
        </StyledLink>
      </div>
    </form>
  );
}
