import React, { useContext } from "react";
import EmailIcon from "@mui/icons-material/Email";
import LockPersonIcon from "@mui/icons-material/LockPerson";
import GoogleIcon from "@mui/icons-material/Google";
import { useRouter } from "next/router";
import { UserContext } from "./AuthContext";
import { useForm } from "react-hook-form";
import { useAppDispatch } from "@/feature/Hooks";
import StyledLink from "../theme/navLink/Link";
import { StyledButton } from "../theme/button/StyledButton";
import StyledOutlinedInput from "../theme/input/StyledInput";
import StyledLoadingButton from "../theme/button/StyledLoadingButton";
import LineText from "../theme/text/LineText";

export default function LoginCard() {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { loginGoogle, login } = useContext(UserContext);
  const onSubmit = (data: any) => {
    console.log(data)
    const errors = login(data.email, data.password);
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <StyledOutlinedInput
        label="Email"
        id="input-login"
        error={errors.email !== undefined}
        icon={<EmailIcon />}
        {...register("email", {
          required: true,
        })} />
      <br />
      <StyledOutlinedInput
        label="Password"
        id="input-login"
        error={errors.password !== undefined}
        icon={<LockPersonIcon />}
        {...register("password", {
          required: true,
        })}
        type="password"
      />
      <div
        style={{
          justifyContent: "space-between",
          display: "flex",
          alignItems: "center",
        }}
      >

      </div>
      <StyledLoadingButton
        loading={false}
        type="submit"
        fullWidth
        variant="contained"
      >
        Đăng nhập
      </StyledLoadingButton>
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
          <GoogleIcon sx={{ fontSize: "1.5rem", marginRight: "1rem" }} />
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
            href="/register"
          >
            Đăng kí
          </StyledLink>
        </div>
      </div>
    </form>
  );
}
