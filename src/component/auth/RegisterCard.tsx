import { Typography, TextField, InputAdornment } from "@mui/material";
import React, { useContext, useState } from "react";
import EmailIcon from "@mui/icons-material/Email";
import LockPersonIcon from "@mui/icons-material/LockPerson";
import GoogleIcon from "@mui/icons-material/Google";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import { UserContext } from "./AuthContext";
import { useAppDispatch } from "@/feature/Hooks";
import { setOpen } from "@/feature/Alert";
import StyledLink from "../theme/navLink/Link";
import { StyledButton } from "../theme/button/StyledButton";
import LineText from "../theme/text/LineText";
import StyledOutlinedInput from "../theme/input/StyledInput";
import StyledLoadingButton from "../theme/button/StyledLoadingButton";
export default function RegisterCard() {
  const { register, handleSubmit, formState: { errors }, } = useForm()
  const [error, setError] = useState<any>(null)
  const dispatch = useAppDispatch()
  const { registerFirebase, loginGoogle } = useContext(UserContext)
  const router = useRouter();
  const onSubmit = async (data: any) => {
    const error: any = registerFirebase(data.email, data.password)
    error === undefined ? dispatch(
      setOpen({
        open: true,
        message: "Register success",
        severity: "success",
      })
    ) : setError(error)
  }
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <StyledOutlinedInput
        id="login"
        label="Email"
        error={errors.email !== undefined}
        helperText={errors.email !== undefined ? "bắt buộc" : ""}
        icon={<EmailIcon />}
        {...register("email", {
          required: true
        })}

      />
      <StyledOutlinedInput
        label="Password"
        error={errors.password !== undefined}
        helperText={errors.password !== undefined ? "bắt buộc ít nhất 6 kí tự" : ""}
        id="2"
        icon={<LockPersonIcon />}
        {...register("password", {
          required: true,
          minLength: 6
        })}

      />
      <StyledLoadingButton
        loading={false}
        type="submit"
        fullWidth
        variant="contained"
      >
        Đăng kí
      </StyledLoadingButton>
      {error !== null ? <Typography color="error">{error}</Typography> : null}
      <LineText text="Hoặc" />
      <div
        style={{
          marginTop: "1rem",
        }}
      >
        <StyledButton
          variant="contained"
          style={{ backgroundColor: "#F5A524" }}
          fullWidth
          onClick={() => {
            loginGoogle();
          }}
        >
          <GoogleIcon style={{ fontSize: "1.5rem", marginRight: "1rem" }} />
          Đăng nhập bằng google
        </StyledButton>
        <div style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center"
        }}>
          <StyledLink
            style={{
              color: "black",
            }}
            href="/"
          >
            Quay về
          </StyledLink>
          <StyledLink
            style={{
              color: "black",
            }}
            href="/login"
          >
            Đăng nhập
          </StyledLink>
        </div>
      </div>
    </form>
  );
}
